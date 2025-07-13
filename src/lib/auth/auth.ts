import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "../aws/dynamodb";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";

const TABLE_NAME = "Users";

export interface User {
  userId: string;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  userType: "RegularPro" | "Free";
  company: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpiry: number;
  payment_verified: boolean;
  immediate_access_until: number;
  subscriptionId: string;
  createdBy?: string;
}

export async function createUser(user: {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  company: string;
  createdBy?: string;
  status: "active" | "suspended";
  userType: "RegularPro" | "Free" | "OrgUser";
}) {
  const userId = createHash("sha256")
    .update(user.email)
    .digest("hex")
    .substring(0, 25);

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const params = {
    TableName: TABLE_NAME,
    Item: {
      userId,
      email: user.email.toLowerCase(),
      name: user.name,
      password: hashedPassword,
      role: user.role,
      company: user.company,
      userType: user.userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: user.status,
      isVerified: false,
      ...(user.createdBy && { createdBy: user.createdBy }),
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    return {
      userId,
      email: user.email,
      name: user.name,
      role: user.role,
      company: user.company,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email.toLowerCase(),
    },
    Limit: 1,
  };

  try {
    const { Items } = await docClient.send(new QueryCommand(params));
    return Items && Items.length > 0 ? (Items[0] as User) : null;
  } catch (error) {
    console.error("Error querying user by email:", error);
    throw error;
  }
}

export async function verifyUserPassword(user: User, password: string) {
  return bcrypt.compare(password, user.password);
}

export async function getAllUsers() {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const { Items } = await docClient.send(new ScanCommand(params));
    return Items as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function updateUser(
  userId: string,
  updates: { email?: string; name?: string; role?: string; company?: string }
) {
  const params: {
    TableName: string;
    Key: { userId: string };
    UpdateExpression: string;
    ExpressionAttributeNames: Record<string, string>;
    ExpressionAttributeValues: Record<string, any>;
    ReturnValues:
      | "ALL_NEW"
      | "ALL_OLD"
      | "NONE"
      | "UPDATED_NEW"
      | "UPDATED_OLD";
  } = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression: "set #updatedAt = :updatedAt",
    ExpressionAttributeNames: { "#updatedAt": "updatedAt" },
    ExpressionAttributeValues: { ":updatedAt": new Date().toISOString() },
    ReturnValues: "ALL_NEW" as const,
  };

  // Add update fields dynamically
  if (updates.email) {
    params.UpdateExpression += ", email = :email";
    params.ExpressionAttributeValues[":email"] = updates.email.toLowerCase();
  }
  if (updates.name) {
    params.UpdateExpression += ", #name = :name";
    params.ExpressionAttributeNames["#name"] = "name";
    params.ExpressionAttributeValues[":name"] = updates.name;
  }
  if (updates.role) {
    params.UpdateExpression += ", #role = :role";
    params.ExpressionAttributeNames["#role"] = "role";
    params.ExpressionAttributeValues[":role"] = updates.role;
  }
  if (updates.company) {
    params.UpdateExpression += ", #company = :company";
    params.ExpressionAttributeNames["#company"] = "company";
    params.ExpressionAttributeValues[":company"] = updates.company;
  }

  try {
    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return Attributes as User;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
  };

  try {
    await docClient.send(new DeleteCommand(params));
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function setVerificationToken(
  userId: string,
  token: string,
  expiry: number
) {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression:
      "SET verificationToken = :token, verificationTokenExpiry = :expiry",
    ExpressionAttributeValues: {
      ":token": token,
      ":expiry": expiry,
    },
  };

  try {
    await docClient.send(new UpdateCommand(params));
  } catch (error) {
    console.error("Error setting verification token:", error);
    throw error;
  }
}

export async function verifyUser(userId: string) {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression:
      "SET isVerified = :verified, #status = :status, #updatedAt = :updatedAt",
    ExpressionAttributeNames: {
      "#updatedAt": "updatedAt",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":verified": true,
      ":status": "active",
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW" as const,
  };

  try {
    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return Attributes as User;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

export async function getUserByVerificationToken(token: string) {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "verificationToken = :token",
    ExpressionAttributeValues: {
      ":token": token,
    },
  };

  try {
    const { Items } = await docClient.send(new ScanCommand(params));
    return Items && Items.length > 0 ? (Items[0] as User) : null;
  } catch (error) {
    console.error("Error getting user by verification token:", error);
    throw error;
  }
}

export async function getLatestBubblspaceIdForUser(userId: string) {
  const params = {
    TableName: "bubblspace",
    IndexName: "userId-index",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    ScanIndexForward: false, // descending order (newest first)
    Limit: 1,
  };

  try {
    const { Items } = await docClient.send(new QueryCommand(params));
    return Items && Items.length > 0 ? Items[0].bubblspaceid : null;
  } catch (error) {
    console.error("Error getting bubblspace for user:", error);
    return null;
  }
}

export async function getAllUsersCreatedBy(adminUserId: string) {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "createdBy = :adminId",
    ExpressionAttributeValues: {
      ":adminId": adminUserId,
    },
  };

  try {
    const { Items } = await docClient.send(new ScanCommand(params));
    return (Items as User[]) || [];
  } catch (error) {
    console.error("Error fetching users created by admin:", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
  };

  try {
    const { Item } = await docClient.send(new GetCommand(params));
    return Item as User | undefined;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
}

// Admin-specific functions for comprehensive user management
export async function adminUpdateUser(
  userId: string,
  updates: {
    email?: string;
    name?: string;
    role?: "admin" | "user";
    company?: string;
    userType?: "RegularPro" | "Free";
    status?: string;
    isVerified?: boolean;
    payment_verified?: boolean;
  }
) {
  const params: {
    TableName: string;
    Key: { userId: string };
    UpdateExpression: string;
    ExpressionAttributeNames: Record<string, string>;
    ExpressionAttributeValues: Record<string, any>;
    ReturnValues:
      | "ALL_NEW"
      | "ALL_OLD"
      | "NONE"
      | "UPDATED_NEW"
      | "UPDATED_OLD";
  } = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression: "set #updatedAt = :updatedAt",
    ExpressionAttributeNames: { "#updatedAt": "updatedAt" },
    ExpressionAttributeValues: { ":updatedAt": new Date().toISOString() },
    ReturnValues: "ALL_NEW" as const,
  };

  // Add update fields dynamically
  if (updates.email) {
    params.UpdateExpression += ", email = :email";
    params.ExpressionAttributeValues[":email"] = updates.email.toLowerCase();
  }
  if (updates.name) {
    params.UpdateExpression += ", #name = :name";
    params.ExpressionAttributeNames["#name"] = "name";
    params.ExpressionAttributeValues[":name"] = updates.name;
  }
  if (updates.role) {
    params.UpdateExpression += ", #role = :role";
    params.ExpressionAttributeNames["#role"] = "role";
    params.ExpressionAttributeValues[":role"] = updates.role;
  }
  if (updates.company) {
    params.UpdateExpression += ", #company = :company";
    params.ExpressionAttributeNames["#company"] = "company";
    params.ExpressionAttributeValues[":company"] = updates.company;
  }
  if (updates.userType) {
    params.UpdateExpression += ", #userType = :userType";
    params.ExpressionAttributeNames["#userType"] = "userType";
    params.ExpressionAttributeValues[":userType"] = updates.userType;
  }
  if (updates.status) {
    params.UpdateExpression += ", #status = :status";
    params.ExpressionAttributeNames["#status"] = "status";
    params.ExpressionAttributeValues[":status"] = updates.status;
  }
  if (typeof updates.isVerified === "boolean") {
    params.UpdateExpression += ", #isVerified = :isVerified";
    params.ExpressionAttributeNames["#isVerified"] = "isVerified";
    params.ExpressionAttributeValues[":isVerified"] = updates.isVerified;
  }
  if (typeof updates.payment_verified === "boolean") {
    params.UpdateExpression += ", #payment_verified = :payment_verified";
    params.ExpressionAttributeNames["#payment_verified"] = "payment_verified";
    params.ExpressionAttributeValues[":payment_verified"] =
      updates.payment_verified;
  }

  try {
    const { Attributes } = await docClient.send(new UpdateCommand(params));
    return Attributes as User;
  } catch (error) {
    console.error("Error updating user (admin):", error);
    throw error;
  }
}

export async function adminCreateUser(user: {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  company: string;
  status: "active" | "suspended";
  userType: "RegularPro" | "Free" | "OrgUser";
  createdBy: string;
}) {
  const userId = createHash("sha256")
    .update(user.email)
    .digest("hex")
    .substring(0, 25);

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const params = {
    TableName: TABLE_NAME,
    Item: {
      userId,
      email: user.email.toLowerCase(),
      name: user.name,
      password: hashedPassword,
      role: user.role,
      company: user.company,
      userType: user.userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active", // Admin-created users are active by default
      isVerified: true, // Admin-created users are verified by default
      payment_verified: user.userType === "RegularPro", // Set payment status based on user type
      immediate_access_until: 0,
      verificationTokenExpiry: 0,
      createdBy: user.createdBy,
      // Note: subscriptionId and verificationToken are omitted to avoid GSI issues with empty strings
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    return {
      userId,
      email: user.email,
      name: user.name,
      role: user.role,
      company: user.company,
      userType: user.userType,
    };
  } catch (error) {
    console.error("Error creating user (admin):", error);
    throw error;
  }
}
