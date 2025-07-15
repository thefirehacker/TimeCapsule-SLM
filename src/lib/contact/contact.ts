import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { docClient } from "../aws/dynamodb";

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phoneNumber?: string;
  subject: string;
  message: string;
}

export interface ContactRecord extends ContactFormData {
  contactUserId: string;
  formType: "contact";
  submittedAt: string;
  status: string;
}

const TABLE_NAME = "Contact";

/**
 * Save contact form submission to DynamoDB
 */
export async function saveContactToDynamoDB(
  formData: ContactFormData
): Promise<ContactRecord> {
  try {
    const contactUserId = uuidv4();
    const submittedAt = new Date().toISOString();

    const contactRecord: ContactRecord = {
      contactUserId,
      formType: "contact",
      submittedAt,
      status: "new",
      ...formData,
    };

    const putParams: PutCommandInput = {
      TableName: TABLE_NAME,
      Item: contactRecord,
      // Prevent overwriting existing records with same contactUserId
      ConditionExpression: "attribute_not_exists(contactUserId)",
    };

    const command = new PutCommand(putParams);
    await docClient.send(command);

    console.log(
      `Successfully saved contact form submission with ID: ${contactUserId}`
    );
    return contactRecord;
  } catch (error) {
    console.error("Error saving contact form to DynamoDB:", error);
    throw new Error(
      `Failed to save contact form submission: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
