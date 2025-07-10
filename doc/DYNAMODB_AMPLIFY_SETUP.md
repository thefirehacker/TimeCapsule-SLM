# DynamoDB Integration with Amplify Service Role - Final Implementation

## Overview
This implementation uses your existing `Users` table with custom user management logic, leveraging your Amplify service role for DynamoDB access without requiring any table schema changes.

## 1. Configure Amplify Service Role

Add this inline policy to your Amplify service role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:Query"
            ],
            "Resource": [
                "arn:aws:dynamodb:ap-south-1:925424909330:table/Users",
                "arn:aws:dynamodb:ap-south-1:925424909330:table/Users/index/email-index"
            ]
        }
    ]
}
```

## 2. Environment Variables

Add these to your **Amplify Console** → **Environment variables**:

```env
# AWS Configuration
AWS_REGION=ap-south-1
DYNAMODB_TABLE_NAME=Users

# NextAuth Configuration (existing)
AUTH_SECRET=your-secret-key
AUTH_GOOGLE_ID=your-google-id
AUTH_GOOGLE_SECRET=your-google-secret
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.amplifyapp.com
```

## 3. How It Works

### **User Flow:**
1. **User signs in** with Google/GitHub
2. **Check existing user** using `email-index` GSI  
3. **If user exists**: Update `updatedAt`, `loginCount`, provider info
4. **If new user**: Generate hash-based `userId` → Create new record
5. **JWT session** created with `userId`

### **User Data Structure:**
```javascript
{
  userId: "hash_generated_from_email", // Your existing PK
  email: "user@example.com",
  name: "User Name", 
  image: "profile_url",
  provider: "google/github",
  providerId: "oauth_user_id",
  userType: "RegularFree",
  role: "user",
  isVerified: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z", 
  loginCount: 5
}
```

## 4. Key Features

✅ **No Table Changes**: Uses your existing `Users` table structure  
✅ **Email-based Lookup**: Leverages your `email-index` GSI efficiently  
✅ **Hash-based UserIds**: Generates unique, consistent user identifiers  
✅ **Amplify Service Role**: No separate IAM users required  
✅ **JWT Sessions**: Fast, stateless authentication  
✅ **Auto User Creation**: Creates users on first OAuth login  
✅ **Login Tracking**: Tracks login count and timestamps  

## 5. Benefits of This Approach

🔐 **Security**: Uses Amplify's temporary credentials (no access keys)  
⚡ **Performance**: Direct DynamoDB operations, no adapter overhead  
🎯 **Flexibility**: Full control over user data structure  
📊 **Tracking**: Complete login history and user metadata  
🔄 **Compatibility**: Works with your existing application logic  

## 6. No Database Adapter Required

This solution uses **JWT sessions** with **custom DynamoDB logic** instead of a database adapter:
- **Faster**: No database session lookups
- **Simpler**: No complex table schemas required  
- **Flexible**: Works with any table structure
- **Reliable**: Fewer dependencies and failure points 