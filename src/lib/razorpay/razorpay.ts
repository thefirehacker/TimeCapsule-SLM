import { UpdateCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getUserByIndex } from "./dynamodb-payments";
import { docClient } from "../aws/dynamodb";

// Define strict types for better type safety
interface PaymentDetails {
  amount: number;
  currency: string;
  paymentId: string;
  email: string;
  contact: string;
}

interface RazorpaySubscriptionData {
  subscriptionId: string;
  customerId: string;
  status: string;
  planId: string;
  paymentDetails?: PaymentDetails;
  startDate: string;
  endDate: string;
  createdAt: number;
  notes?: Record<string, string>;
  totalCount?: number;
  paidCount?: number;
  remainingCount?: number;
}

// Define all possible webhook events
export type RazorpayWebhookEvent =
  | "subscription.authenticated"
  | "subscription.activated"
  | "subscription.charged"
  | "subscription.completed"
  | "subscription.pending"
  | "subscription.halted"
  | "subscription.cancelled"
  | "subscription.paused"
  | "subscription.resumed"
  | "subscription.updated";

export interface RazorpayPayload {
  subscription: {
    entity: {
      id: string;
      customer_id: string;
      status: string;
      plan_id: string;
      current_start: string;
      current_end: string;
      createdAt: number;
      notes?: Record<string, string>;
      total_count?: number;
      paid_count?: number;
      remaining_count?: number;
    };
  };
  payment?: {
    entity: {
      amount: number;
      currency: string;
      id: string;
      email: string;
      contact: string;
    };
  };
}

export interface WebhookRequest {
  event: RazorpayWebhookEvent;
  payload: RazorpayPayload;
}

interface UpdateUserStatusParams {
  subscriptionId: string;
  razorpay_payload: WebhookRequest;
  status: string;
}

// Define user types mapping with clear conditions
const USER_TYPE_MAPPING: Record<RazorpayWebhookEvent, string> = {
  "subscription.authenticated": "RegularPro",
  "subscription.activated": "RegularPro",
  "subscription.charged": "RegularPro",
  "subscription.completed": "RegularPro",
  "subscription.resumed": "RegularPro",
  "subscription.updated": "RegularPro",
  "subscription.pending": "RegularFree",
  "subscription.halted": "RegularFree",
  "subscription.cancelled": "RegularFree",
  "subscription.paused": "RegularFree",
};

export async function updateUserStatus(
  params: UpdateUserStatusParams
): Promise<any> {
  try {
    // Get user by subscription ID
    const user = await getUserByIndex(
      "subscriptionId-index",
      "subscriptionId",
      params.subscriptionId
    );

    if (!user) {
      throw new Error(
        `No user found with subscription ID: ${params.subscriptionId}`
      );
    }

    // Extract subscription and payment details
    const subscription = params.razorpay_payload.payload.subscription.entity;
    const payment = params.razorpay_payload.payload.payment?.entity;

    // Create subscription data object
    const subscriptionData: RazorpaySubscriptionData = {
      subscriptionId: subscription.id,
      customerId: subscription.customer_id,
      status: subscription.status,
      planId: subscription.plan_id,
      paymentDetails: payment
        ? {
            amount: payment.amount,
            currency: payment.currency,
            paymentId: payment.id,
            email: payment.email,
            contact: payment.contact,
          }
        : undefined,
      startDate: subscription.current_start,
      endDate: subscription.current_end,
      createdAt: subscription.createdAt,
      notes: subscription.notes,
      totalCount: subscription.total_count,
      paidCount: subscription.paid_count,
      remainingCount: subscription.remaining_count,
    };

    // Determine user type based on event
    const userType =
      USER_TYPE_MAPPING[params.razorpay_payload.event] || "RegularFree";

    // Calculate subscription metrics
    const metrics = {
      isTrialPeriod: subscription.total_count === 1,
      subscriptionAge: Math.floor(
        (Date.now() - subscription.createdAt * 1000) / (1000 * 60 * 60 * 24)
      ), // in days
      renewalsRemaining: subscription.remaining_count,
      totalPayments: subscription.paid_count,
    };

    // Prepare update expression with additional fields
    const updateExpression = `
      SET updatedAt = :lu,
          subscriptionId = :sid,
          subscription_data = :sd,
          userType = :ut,
          subscription_status = :ss,
          payment_status = :ps,
          subscription_metrics = :sm,
          last_webhook_event = :lwe,
          ${payment ? "last_payment_date = :lpd," : ""}
          ${subscription.notes ? "subscription_notes = :sn," : ""}
          updatedAt = :ua
    `.trim();

    const expressionAttributeValues = {
      ":lu": new Date().toISOString(),
      ":sid": params.subscriptionId,
      ":sd": subscriptionData,
      ":ut": userType,
      ":ss": subscription.status,
      ":ps": subscription.status,
      ":sm": metrics,
      ":lwe": params.razorpay_payload.event,
      ":ua": new Date().toISOString(),
      ...(payment && { ":lpd": new Date().toISOString() }),
      ...(subscription.notes && { ":sn": subscription.notes }),
    };

    // Update user record
    const updateParams = {
      TableName: "Users",
      Key: { userId: user.userId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW" as const,
    };

    const result = await docClient.send(new UpdateCommand(updateParams));

    if (!result.Attributes) {
      throw new Error(`Failed to update user with ID ${user.userId}`);
    }

    // Log successful update
    console.log(
      `Successfully updated user ${user.userId} for event ${params.razorpay_payload.event}`
    );

    // Store order information if this is a payment event
    if (
      params.razorpay_payload.event === "subscription.charged" ||
      params.razorpay_payload.event === "subscription.activated" ||
      params.razorpay_payload.payload.payment
    ) {
      await storeOrderInformation({
        userId: user.userId,
        subscriptionId: params.subscriptionId,
        razorpay_payload: params.razorpay_payload,
      });
    }

    return result.Attributes;
  } catch (error) {
    console.error("Error in updateUserStatus:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;

    const enhancedError = new Error(
      `Failed to update user status: ${errorMessage}. SubscriptionId: ${params.subscriptionId}, Event: ${params.razorpay_payload.event}`
    );
    enhancedError.stack = errorStack;
    throw enhancedError;
  }
}

// Order interface
export interface RazorpayOrder {
  orderId: string;
  userId: string;
  subscriptionId: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  planId?: string;
  planName?: string;
  paymentDetails?: any;
  razorpayEvent?: RazorpayWebhookEvent;
  customerEmail?: string;
  customerPhone?: string;
}

/**
 * Stores order information in the Orders table
 */
export async function storeOrderInformation(params: {
  userId: string;
  subscriptionId: string;
  razorpay_payload: WebhookRequest;
}): Promise<any> {
  try {
    const { userId, subscriptionId, razorpay_payload } = params;
    const subscription = razorpay_payload.payload.subscription.entity;
    const payment = razorpay_payload.payload.payment?.entity;

    // Generate a unique order ID (using timestamp and random string)
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const orderData: RazorpayOrder = {
      orderId,
      userId,
      subscriptionId,
      paymentId: payment?.id,
      amount: payment?.amount,
      currency: payment?.currency,
      status: subscription.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      planId: subscription.plan_id,
      paymentDetails: payment ? { ...payment } : undefined,
      razorpayEvent: razorpay_payload.event,
      customerEmail: payment?.email,
      customerPhone: payment?.contact,
    };

    // Store in DynamoDB
    const putParams = {
      TableName: "Orders",
      Item: orderData,
    };

    await docClient.send(new PutCommand(putParams));

    console.log(`Successfully stored order information, orderId: ${orderId}`);
    return orderData;
  } catch (error) {
    console.error("Error storing order information:", error);
    throw new Error(
      `Failed to store order information: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
