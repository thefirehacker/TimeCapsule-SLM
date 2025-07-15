# Analytics Implementation Guide

## 🍪 **Cookie Consent & Privacy Compliance**

### 🎯 **GDPR/CCPA Compliant Cookie Banner**
- **Cookie Consent Component**: `src/components/ui/cookie-consent.tsx`
- **Granular Controls**: Users can accept/reject different cookie categories
- **Privacy-by-Design**: Analytics only initialize with explicit user consent
- **Legal Compliance**: Full GDPR/CCPA compliance with user rights

### Cookie Categories:
- **Necessary**: Always enabled (authentication, security)
- **Analytics**: Optional (GA4 tracking, user behavior analysis)
- **Functional**: Optional (preferences, enhanced features)
- **Marketing**: Disabled by default (future advertising features)

### Privacy Features:
- **Detailed Privacy Modal**: Explains what each cookie type does
- **User Rights Information**: Clear explanation of data collection and user rights
- **Easy Opt-out**: Users can withdraw consent at any time
- **localStorage Management**: Preferences stored locally and respected

### Legal Pages Created:
- **Privacy Policy**: `/privacy` - Comprehensive GDPR/CCPA compliant policy
- **Terms of Service**: `/terms` - Legal terms with AI content disclaimers

### Analytics Integration:
- Analytics tracking only starts after user consent
- Consent-aware tracking hooks skip tracking without permission
- Analytics disable functionality for consent withdrawal
- Cookie preferences integrated throughout tracking system

## ✅ Enhanced GA4 Tracking for All Pages

### 🎯 **Problem Solved**
- **Before**: Only DeepResearch page was tracked
- **After**: All pages (Homepage, AI-Frames, DeepResearch, Auth) tracked automatically
- **Bonus**: Fine-grained feature tracking for user interactions

## 📊 **Automatic Page Tracking**

### Global Analytics Component (`src/components/analytics/Analytics.tsx`)
- **Automatic initialization**: GA4 loads once in root layout
- **Smart page detection**: Recognizes all routes automatically
- **Enhanced metadata**: Tracks page category, type, and pathname
- **Proper timing**: Waits for GA4 to be ready before tracking

### Page Mapping:
```typescript
'/' → Homepage (landing/marketing)
'/deep-research' → DeepResearch (research/application)
'/ai-frames' → AI-Frames (learning/application)
'/auth/signin' → Sign In (authentication/auth)
'/auth/error' → Auth Error (authentication/error)
```

## 🔧 **Fine-Grained Tracking with usePageAnalytics Hook**

### Usage Example:
```typescript
import { usePageAnalytics } from "@/components/analytics/Analytics";

export default function MyPage() {
  const analytics = usePageAnalytics('PageName', 'category');
  
  // Track feature usage
  const handleButtonClick = () => {
    analytics.trackFeatureUsage('button_click', {
      button_id: 'submit',
      section: 'hero'
    });
  };
  
  // Track user actions
  const handleNavigation = () => {
    analytics.trackUserAction('navigation', {
      from: 'page1',
      to: 'page2'
    });
  };
}
```

## 📈 **AI-Frames Tracking Implementation**

### Tracked Events:
1. **Frame Navigation**
   - Direction (next/previous)
   - Frame indices
   - Total frames

2. **Mode Switching**
   - Creation vs Learning mode
   - Context (current frame, total frames)

3. **Voice/TTS Features**
   - Voice toggle on/off
   - TTS readiness status
   - Current frame context

4. **Frame Creation**
   - Goal length
   - Video URL
   - Duration settings
   - Generated concepts count

5. **Concept Exploration**
   - Which concept clicked
   - Current frame context
   - Total available concepts

6. **Error Tracking**
   - Frame creation failures
   - TTS errors
   - Context information

## 🏠 **Homepage Tracking**

The homepage now uses `usePageAnalytics('Homepage', 'landing')` which automatically tracks:
- Page entry/exit
- Time spent on page
- User engagement metrics

## 📋 **Available Analytics Methods**

### From usePageAnalytics Hook:
```typescript
const analytics = usePageAnalytics('PageName', 'category');

// Feature usage tracking
analytics.trackFeatureUsage(feature, details);

// User action tracking  
analytics.trackUserAction(action, details);

// Error tracking
analytics.trackError(error, context);

// Performance timing
analytics.trackTiming(name, value, category);
```

### From Global Analytics Instance:
```typescript
import { analytics } from "@/lib/analytics";

// Research-specific tracking
analytics.trackResearchGeneration(type, depth, provider, count);

// AI connection tracking
analytics.trackAIConnection(provider, model, status);

// Document management
analytics.trackDocumentManagement(action, count, type);

// Knowledge base events
analytics.trackKnowledgeBase(action, details);

// Vector store operations
analytics.trackVectorStore(action, count, model);

// Search operations
analytics.trackSearch(query, results, type);

// Export operations
analytics.trackExport(type, size);

// User engagement
analytics.trackEngagement(action, duration);
```

## 🔍 **GA4 Events You'll See**

### Automatic Events:
- `page_view` - Every page navigation
- `page_entry_detailed` - Page entry with metadata
- `page_exit_detailed` - Page exit with time spent
- `user_engagement` - General engagement tracking

### AI-Frames Specific Events:
- `feature_usage` - Feature interactions
- `user_action` - User-initiated actions
- `error_occurred` - Error tracking
- `timing` - Performance metrics

### Event Parameters Include:
- `page_name` - Human-readable page name
- `page_category` - Page category (landing, research, learning)
- `pathname` - URL path
- `timestamp` - ISO timestamp
- `site_name` - Site name from config
- `time_spent_seconds` - Time on page
- Custom parameters per event type

## 🚀 **Benefits**

1. **Complete Coverage**: All pages tracked automatically
2. **Rich Context**: Page categories and metadata
3. **User Journey**: Track user flow between pages
4. **Feature Usage**: Understand which features are used
5. **Error Monitoring**: Catch and track errors
6. **Performance Metrics**: Track timing and engagement
7. **Extensible**: Easy to add tracking to new features

## 📊 **Viewing in GA4**

### Real-time Reports:
- Go to GA4 → Reports → Realtime
- Navigate between pages to see live tracking

### Events Report:
- Go to GA4 → Reports → Events
- See all tracked events with parameters

### Custom Reports:
- Create custom reports using event parameters
- Filter by page_category, page_name, etc.

## 🔧 **Adding Tracking to New Pages**

1. **Add to pageMap** in `Analytics.tsx`:
```typescript
'/new-page': {
  title: 'New Page',
  category: 'category',
  type: 'type'
}
```

2. **Use hook in page component**:
```typescript
const analytics = usePageAnalytics('New Page', 'category');
```

3. **Track interactions**:
```typescript
analytics.trackFeatureUsage('feature_name', { details });
```

## ✅ **Verification**

After deployment, check:
1. Browser console for GA4 tracking logs
2. GA4 Real-time reports show page views
3. Events appear in GA4 Events section
4. Page parameters are captured correctly

The analytics system now provides comprehensive tracking across all pages with detailed insights into user behavior and feature usage!

## 🚀 **Future Implementations**

### Enterprise-Level CMP Integration

For enhanced compliance and easier maintenance, consider integrating a Google-certified Consent Management Platform (CMP):

#### **Recommended CMPs:**
- **Cookiebot** - Comprehensive cookie scanning and compliance
- **CookieYes** - User-friendly with good analytics integration
- **OneTrust** - Enterprise-grade with advanced features
- **Usercentrics** - Strong European compliance focus

#### **Implementation Steps:**

1. **Choose and Setup CMP**
   ```bash
   # Example: Cookiebot integration
   npm install @cookiebot/browser-sdk
   ```

2. **Replace Custom Cookie Banner**
   - Remove `src/components/ui/cookie-consent.tsx`
   - Replace with CMP's consent banner
   - Update layout.tsx to use CMP component

3. **Update Analytics Integration**
   ```typescript
   // Replace custom consent checks with CMP API
   const hasAnalyticsConsent = () => {
     return window.Cookiebot?.consent?.statistics; // Cookiebot example
   };
   ```

4. **Configure Cookie Categories**
   - Map current categories to CMP standards:
     - Necessary → Strictly Necessary
     - Analytics → Statistics
     - Functional → Preferences
     - Marketing → Marketing

5. **Update Privacy Policy**
   - Reference CMP's cookie policy
   - Update data processing information
   - Add CMP vendor details

6. **Testing & Compliance**
   - Test consent flows across all browsers
   - Verify IAB TCF v2.2 compliance
   - Validate cookie blocking/allowing
   - Check consent logging and withdrawal

#### **Benefits of CMP Integration:**
- **Automatic Cookie Scanning**: Detects all cookies automatically
- **Regulatory Updates**: Stays current with GDPR/CCPA changes
- **Better Logging**: Comprehensive consent audit trails
- **IAB TCF v2.2 Compliance**: Industry standard compliance
- **Multi-language Support**: Automatic translations
- **Advanced Features**: Geo-targeting, A/B testing consent flows

#### **Migration Considerations:**
- **Gradual Migration**: Can be done incrementally
- **Consent Preservation**: Migrate existing user preferences
- **Analytics Continuity**: Ensure no tracking gaps during transition
- **Cost**: CMPs typically charge based on page views/users
- **Customization**: May have less UI customization than custom solution

#### **Implementation Timeline:**
- **Phase 1**: CMP setup and basic integration (1-2 weeks)
- **Phase 2**: Analytics integration and testing (1 week)
- **Phase 3**: UI customization and compliance validation (1 week)
- **Phase 4**: Migration and monitoring (1 week)

This upgrade would provide enterprise-grade compliance while maintaining all current analytics functionality. 