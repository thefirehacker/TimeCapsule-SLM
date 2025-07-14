import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Global DynamoDB client cache for performance
declare global {
  // eslint-disable-next-line no-var
  var dynamoDb: {
    client: DynamoDBClient | undefined;
    documentClient: DynamoDBDocumentClient | undefined;
  };
}

// Initialize global DynamoDB object
if (!global.dynamoDb) {
  global.dynamoDb = {
    client: undefined,
    documentClient: undefined,
  };
}

// Initialize DynamoDB clients with caching
const initializeDynamoDBClients = () => {
  if (!global.dynamoDb.client || !global.dynamoDb.documentClient) {
    try {
      // Check if we can find AWS credentials
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.ACCESS_KEY_ID_AWS || "";
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.SECRET_ACCESS_KEY_AWS || "";
      const region = process.env.AWS_REGION || process.env.REGION_AWS || "ap-south-1";

      if (!accessKeyId || !secretAccessKey) {
        throw new Error(`Missing AWS credentials for DynamoDB`);
      }

      // Initialize the DynamoDB client
      const dynamoClient = new DynamoDBClient({
        region: region,
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
      });

      // Create a document client for easier data handling
      const docClient = DynamoDBDocumentClient.from(dynamoClient, {
        marshallOptions: {
          removeUndefinedValues: true,
        },
      });

      // Store in global cache
      global.dynamoDb.client = dynamoClient;
      global.dynamoDb.documentClient = docClient;

      console.log("DynamoDB clients initialized successfully");
    } catch (error) {
      console.error("Error initializing DynamoDB clients:", error);

      // Fallback initialization
      console.warn("Using fallback DynamoDB client - authentication may fail");
      const fallbackClient = new DynamoDBClient({ region: "us-east-1" });
      const fallbackDocClient = DynamoDBDocumentClient.from(fallbackClient, {
        marshallOptions: { removeUndefinedValues: true },
      });

      global.dynamoDb.client = fallbackClient;
      global.dynamoDb.documentClient = fallbackDocClient;
    }
  }
};

// Initialize clients
initializeDynamoDBClients();

// Export the clients
export const dynamoClient = global.dynamoDb.client as DynamoDBClient;
export const docClient = global.dynamoDb
  .documentClient as DynamoDBDocumentClient;

// Helper function to handle DynamoDB errors
export const handleDynamoDBError = (error: unknown): string => {
  if (error instanceof Error) {
    console.error("DynamoDB operation failed:", error);

    // Return user-friendly error messages
    switch (error.name) {
      case "ConditionalCheckFailedException":
        return "The requested operation couldn't be completed due to a condition check failure.";
      case "ResourceNotFoundException":
        return "The requested resource was not found.";
      case "ProvisionedThroughputExceededException":
        return "The request rate is too high. Please try again later.";
      case "ValidationException":
        return "Invalid request parameters provided.";
      case "ItemCollectionSizeLimitExceededException":
        return "Item collection size limit exceeded.";
      default:
        return "An unexpected error occurred with the database operation.";
    }
  }
  return "An unknown error occurred.";
};
