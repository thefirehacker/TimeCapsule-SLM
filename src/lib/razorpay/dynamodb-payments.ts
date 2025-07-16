import {
  QueryCommand,
  UpdateCommand,
  UpdateCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "../aws/dynamodb";

const TABLE_NAME = "Users";

export async function getUserByIndex(
  indexName: string,
  keyName: string,
  keyValue: string
) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: indexName,
    KeyConditionExpression: `${keyName} = :value`,
    ExpressionAttributeValues: {
      ":value": keyValue,
    },
  };

  try {
    const { Items } = await docClient.send(new QueryCommand(params));
    return Items && Items.length > 0 ? Items[0] : null;
  } catch (error) {
    console.error(`Error querying user by ${keyName} from DynamoDB:`, error);
    throw error;
  }
}

export async function updateCheckoutUserInfo(params: {
  userId: string;
  subscriptionId: string;
  razorpay_name: string;
  razorpay_email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  pincode: string;
  updatedAt: string;
}): Promise<any> {
  // Prepare the update parameters
  const updateParams = {
    TableName: "Users",
    Key: {
      userId: params.userId,
    },
    UpdateExpression:
      "SET updatedAt = :lu, subscriptionId = :sid, phone = :p, address = :a, country = :c, #st = :s, pincode = :pc, razorpay_name = :rn, razorpay_email = :re",
    ExpressionAttributeNames: {
      "#st": "state",
    },
    ExpressionAttributeValues: {
      ":lu": params.updatedAt,
      ":sid": params.subscriptionId,
      ":p": params.phone,
      ":a": params.address,
      ":c": params.country,
      ":s": params.state,
      ":pc": params.pincode,
      ":rn": params.razorpay_name,
      ":re": params.razorpay_email,
    },
    ReturnValues: "ALL_NEW" as const,
  };

  try {
    const result = (await docClient.send(
      new UpdateCommand(updateParams)
    )) as UpdateCommandOutput;

    if (!result.Attributes) {
      throw new Error(`Failed to update user with ID ${params.userId}`);
    }

    return result.Attributes;
  } catch (error) {
    console.error("Error in updateCheckoutUserInfo:", error);
    throw error;
  }
}
