# Feature Access Implementation Guide

## 🎯 **Overview**

This implementation provides a comprehensive feature access control system that restricts users based on their subscription tier and tracks usage for features like Deep Research, Web Search, and YouTube API.

## 🏗️ **Architecture**

### **Core Components**

1. **FeatureAccessManager** (`src/lib/feature-access/FeatureAccessManager.ts`)
   - Singleton class managing feature access logic
   - Handles usage tracking and limit enforcement
   - Provides caching for performance

2. **API Endpoints** (`src/app/api/features/`)
   - `/check-access` - Check if user can access a feature
   - `/record-usage` - Record feature usage
   - `/usage-summary` - Get user's usage summary

3. **React Hook** (`src/lib/hooks/useFeatureAccess.ts`)
   - Frontend integration for feature access
   - Provides easy-to-use interface for components

4. **UI Components** (`src/components/ui/feature-usage-display.tsx`)
   - Displays usage information and upgrade prompts
   - Responsive design with progress indicators

5. **Middleware** (`src/lib/middleware/featureAccessMiddleware.ts`)
   - Protects API routes with feature access checks
   - Automatically records usage for successful operations

## 📊 **Feature Limits**

### **Current Limits by User Type**

| Feature           | Free             | RegularPro        | Premium           |
| ----------------- | ---------------- | ----------------- | ----------------- |
| **Deep Research** | 3/month, 1/day   | 50/month, 5/day   | 200/month, 20/day |
| **Web Search**    | ❌ Not Available | 100/month, 10/day | 500/month, 50/day |
| **YouTube API**   | ❌ Not Available | 50/month, 5/day   | 200/month, 20/day |

### **Usage Tracking**

- **Monthly Limits**: Reset on the 1st of each month
- **Daily Limits**: Reset at midnight local time
- **Automatic Reset**: System automatically resets counters
- **Caching**: Performance-optimized with in-memory caching

## 🚀 **Implementation Examples**

### **1. Frontend Integration**

```typescript
import { useFeatureAccess } from '@/lib/hooks/useFeatureAccess';
import { FeatureUsageDisplay } from '@/components/ui/feature-usage-display';

function DeepResearchComponent() {
  const {
    canUseFeature,
    recordFeatureUsage,
    usageSummary,
    checkFeatureAccess
  } = useFeatureAccess();

  const handleStartResearch = async () => {
    // Check access before starting
    const access = await checkFeatureAccess('deep_research');

    if (!access.allowed) {
      // Show upgrade prompt or error
      return;
    }

    // Start research process
    const success = await recordFeatureUsage('deep_research');
    if (success) {
      // Proceed with research
    }
  };

  return (
    <div>
      {usageSummary && (
        <FeatureUsageDisplay
          feature="deep_research"
          usageSummary={usageSummary.deep_research}
          onUpgrade={() => router.push('/pricing')}
        />
      )}

      <button
        onClick={handleStartResearch}
        disabled={!canUseFeature('deep_research')}
      >
        Start Research
      </button>
    </div>
  );
}
```

### **2. API Route Protection**

```typescript
import { createFeatureProtectedHandler } from "@/lib/middleware/featureAccessMiddleware";

// Protected API route
export const POST = createFeatureProtectedHandler(
  "deep_research",
  async (request: NextRequest) => {
    // Your API logic here
    const body = await request.json();

    // Process research request
    const result = await processResearch(body);

    return NextResponse.json({ success: true, result });
  },
  true // Record usage automatically
);
```

### **3. Manual Access Checking**

```typescript
import { featureAccessManager } from "@/lib/feature-access/FeatureAccessManager";

// In your API route
export async function POST(request: NextRequest) {
  const session = await auth();
  const access = await featureAccessManager.checkFeatureAccess(
    session.userId,
    "web_search"
  );

  if (!access.allowed) {
    return NextResponse.json(
      {
        error: access.reason,
        upgradeRequired: access.upgradeRequired,
      },
      { status: 403 }
    );
  }

  // Proceed with web search
}
```

## 🔧 **Database Schema**

### **FeatureUsage Table**

```typescript
interface FeatureUsage {
  userId: string; // Partition key
  feature: FeatureType; // Sort key
  usageCount: number; // Total usage count
  monthlyLimit: number; // Monthly limit for user type
  dailyLimit: number; // Daily limit for user type
  monthlyUsed: number; // Current monthly usage
  dailyUsed: number; // Current daily usage
  resetDate: string; // Next monthly reset date
  lastUsed: string; // Last usage timestamp
  createdAt: string; // Record creation date
  updatedAt: string; // Last update date
}
```

### **DynamoDB Table Structure**

```json
{
  "TableName": "FeatureUsage",
  "KeySchema": [
    { "AttributeName": "userId", "KeyType": "HASH" },
    { "AttributeName": "feature", "KeyType": "RANGE" }
  ],
  "AttributeDefinitions": [
    { "AttributeName": "userId", "AttributeType": "S" },
    { "AttributeName": "feature", "AttributeType": "S" }
  ]
}
```

## 🎨 **UI Components**

### **Feature Usage Display**

The `FeatureUsageDisplay` component provides:

- **Visual Progress Bars**: Show monthly and daily usage
- **Limit Warnings**: Alert users when approaching limits
- **Upgrade Prompts**: Encourage upgrades when limits are reached
- **Responsive Design**: Works on all screen sizes

### **Usage Badges**

Compact badges for inline display:

```typescript
<FeatureUsageBadge
  feature="deep_research"
  usageSummary={usageSummary.deep_research}
  onUpgrade={() => router.push('/pricing')}
/>
```

## 🔒 **Security Features**

### **Access Control**

1. **Authentication Required**: All feature checks require valid session
2. **User Type Validation**: Limits enforced based on subscription tier
3. **Rate Limiting**: Daily and monthly limits prevent abuse
4. **Automatic Reset**: Counters reset automatically to prevent manipulation

### **Data Protection**

1. **Encrypted Storage**: Usage data stored securely in DynamoDB
2. **Audit Trail**: All usage tracked with timestamps
3. **Cache Security**: In-memory cache with proper invalidation
4. **API Protection**: All endpoints protected with middleware

## 📈 **Analytics & Monitoring**

### **Usage Tracking**

- **Real-time Monitoring**: Track usage patterns and limits
- **User Behavior**: Understand feature popularity
- **Upgrade Conversion**: Monitor upgrade prompts effectiveness
- **Performance Metrics**: Cache hit rates and API response times

### **Business Intelligence**

```typescript
// Get usage analytics
const summary = await featureAccessManager.getUserFeatureSummary(userId);

// Monitor upgrade opportunities
const needsUpgrade = await featureAccessManager.checkUpgradeRequired(
  userId,
  "web_search"
);
```

## 🚀 **Best Practices**

### **1. Frontend Implementation**

- **Always Check Access**: Verify access before starting operations
- **Show Clear Feedback**: Display usage limits and remaining quota
- **Graceful Degradation**: Handle access denied scenarios gracefully
- **Upgrade Prompts**: Show upgrade options when limits are reached

### **2. Backend Implementation**

- **Middleware First**: Use middleware for consistent access control
- **Error Handling**: Provide clear error messages for access denied
- **Performance**: Use caching to minimize database calls
- **Monitoring**: Track usage patterns and system performance

### **3. User Experience**

- **Transparent Limits**: Clearly show what users can and cannot do
- **Progressive Disclosure**: Show upgrade benefits at the right time
- **Seamless Upgrades**: Make upgrading easy and frictionless
- **Usage Visibility**: Let users see their current usage status

## 🔄 **Migration & Deployment**

### **1. Database Setup**

```bash
# Create FeatureUsage table in DynamoDB
aws dynamodb create-table \
  --table-name FeatureUsage \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=feature,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=feature,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

### **2. Environment Variables**

```env
# Add to your .env.local
FEATURE_ACCESS_ENABLED=true
FEATURE_CACHE_TTL=300 # 5 minutes
```

### **3. Feature Flags**

```typescript
// Gradually roll out features
const FEATURE_FLAGS = {
  deep_research: process.env.ENABLE_DEEP_RESEARCH === "true",
  web_search: process.env.ENABLE_WEB_SEARCH === "true",
  youtube_api: process.env.ENABLE_YOUTUBE_API === "true",
};
```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Access Denied Errors**
   - Check user authentication status
   - Verify user type and subscription status
   - Ensure feature is enabled for user type

2. **Usage Not Recording**
   - Check database connectivity
   - Verify API endpoint is calling recordFeatureUsage
   - Check for middleware errors

3. **Cache Issues**
   - Clear cache manually if needed
   - Check cache TTL settings
   - Verify cache invalidation logic

### **Debug Mode**

```typescript
// Enable debug logging
const DEBUG_MODE = process.env.NODE_ENV === "development";

if (DEBUG_MODE) {
  console.log("Feature access check:", { userId, feature, result });
}
```

## 📚 **Future Enhancements**

### **Planned Features**

1. **Usage Analytics Dashboard**: Admin panel for usage monitoring
2. **Dynamic Limits**: Adjust limits based on user behavior
3. **Trial Periods**: Temporary access for new features
4. **Usage Alerts**: Email notifications for limit approaching
5. **Bulk Operations**: Batch usage recording for efficiency

### **Scalability Considerations**

1. **Redis Caching**: Move to Redis for distributed caching
2. **Event-Driven Updates**: Use SQS for usage recording
3. **Read Replicas**: Use DynamoDB read replicas for analytics
4. **CDN Integration**: Cache usage data at edge locations

This implementation provides a robust, scalable, and user-friendly feature access control system that can grow with your application's needs.

