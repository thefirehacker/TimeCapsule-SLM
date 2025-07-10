import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { createHash } from "crypto";

// Ensure AUTH_SECRET is available
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (!authSecret) {
  console.error("🚨 AUTH_SECRET Environment Variable Debug:", {
    AUTH_SECRET: process.env.AUTH_SECRET ? "SET" : "NOT_SET",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT_SET",
    NODE_ENV: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter((key) => key.includes("AUTH")),
  });
  throw new Error(
    "AUTH_SECRET or NEXTAUTH_SECRET environment variable is required"
  );
}

// Determine the base URL for authentication
const baseUrl =
  process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

// Configure DynamoDB client for Amplify (uses Amplify service role credentials automatically)
const dynamoDbClient = new DynamoDB({
  region: process.env.AWS_REGION || "ap-south-1",
  // No need to specify credentials - Amplify provides them automatically
});

const dynamoDb = DynamoDBDocument.from(dynamoDbClient, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

// Helper function to generate userId hash from email
function generateUserId(email: string): string {
  return createHash('sha256').update(email + Date.now()).digest('hex').substring(0, 16);
}

// Helper function to find user by email using GSI
async function findUserByEmail(email: string) {
  try {
    const result = await dynamoDb.query({
      TableName: process.env.DYNAMODB_TABLE_NAME || "Users",
      IndexName: "email-index", // Use existing email-index GSI
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
      Limit: 1,
    });
    
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

// Debug logging for production
if (process.env.NODE_ENV === "production") {
  console.log("🔐 NextAuth Production Config:", {
    hasSecret: !!authSecret,
    secretLength: authSecret?.length,
    baseUrl,
    nodeEnv: process.env.NODE_ENV,
    trustHost: true,
    dynamoDbRegion: process.env.AWS_REGION || "ap-south-1",
    usersTableName: process.env.DYNAMODB_TABLE_NAME || "Users",
  });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  trustHost: true,
  
  // No database adapter - using JWT sessions with custom user management

  logger: {
    debug: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  },
  debug: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user!.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("🔐 User signing in:", {
        email: user.email,
        name: user.name,
        provider: account?.provider,
        providerId: account?.providerAccountId,
      });
      
      if (!user.email) {
        console.error("❌ No email provided by OAuth provider");
        return false;
      }

      try {
        // Step 1: Check if user exists using email-index GSI
        const existingUser = await findUserByEmail(user.email);
        
        if (existingUser) {
          // Step 2a: User exists - update their info
          await dynamoDb.update({
            TableName: process.env.DYNAMODB_TABLE_NAME || "Users",
            Key: { userId: existingUser.userId },
            UpdateExpression: "SET updatedAt = :now, #name = :name, image = :image, provider = :provider, providerId = :providerId, loginCount = if_not_exists(loginCount, :zero) + :one",
            ExpressionAttributeNames: {
              "#name": "name" // name is a reserved keyword in DynamoDB
            },
            ExpressionAttributeValues: {
              ":now": new Date().toISOString(),
              ":name": user.name || "",
              ":image": user.image || "",
              ":provider": account?.provider || "",
              ":providerId": account?.providerAccountId || "",
              ":zero": 0,
              ":one": 1,
            },
          });
          
          // Update user.id for session
          user.id = existingUser.userId;
          console.log("✅ Updated existing user:", existingUser.userId);
          
        } else {
          // Step 2b: New user - create record with generated userId hash
          const newUserId = generateUserId(user.email);
          
          await dynamoDb.put({
            TableName: process.env.DYNAMODB_TABLE_NAME || "Users",
            Item: {
              userId: newUserId, // Your existing PK structure
              email: user.email,
              name: user.name || "",
              image: user.image || "",
              provider: account?.provider || "",
              providerId: account?.providerAccountId || "",
              userType: "RegularFree", // As requested
              role: "user", // As requested
              isVerified: true, // As requested
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(), // Instead of lastLoginAt
              loginCount: 1,
            },
          });
          
          // Update user.id for session
          user.id = newUserId;
          console.log("✅ Created new user:", newUserId);
        }
        
        return true;
        
      } catch (error) {
        console.error("❌ Failed to save user data to DynamoDB:", error);
        // Don't fail sign-in if database update fails
        return true;
      }
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("📊 Sign-in event:", {
        userId: user.id,
        provider: account?.provider,
        timestamp: new Date().toISOString(),
      });
    },
  },
  session: {
    strategy: "jwt", // Using JWT sessions (no database adapter)
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
