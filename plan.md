# Pricing Content Update Plan

## Current Situation Analysis:

1. **Two Pricing Pages Exist:**
   - `/src/app/(payments)/pricing/page.tsx` - New payment-focused pricing
   - `/src/app/pricing/page.tsx` - Original comprehensive pricing page

2. **New Pricing Structure (from payments):**
   - **Free Plan**: $0 - 1 podcast/month, 5 microlearning modules/month, unlimited public TimeCapsules
   - **Pro Plan**: $29 USD / ₹2,500 INR - 3 AI Sales Demos/month, Admin Dashboard, Approval workflow, etc.
   - **Pro Enterprise**: Coming Soon - Custom solutions

3. **Current Pricing Structure (original):**
   - **Local & BYOA**: Free - AI Frame Creation, Learning Graph, etc.
   - **Professional**: $20/month - Unlimited AI Interactions, Analytics, etc.
   - **Team**: $200/month - Team features, 100GB storage, etc.
   - **Enterprise**: Custom - Enterprise features

## Todo List:

### 1. Update Main Pricing Page Content ✅ COMPLETED

- [x] Update pricing tiers to match new structure
- [x] Update features for each plan
- [x] Update pricing amounts and currencies
- [x] Maintain the existing UI design and layout
- [x] Update plan descriptions and CTAs
- [x] Update grid layout from 4 columns to 3 columns

### 2. Update Payment Pricing Page Content ✅ COMPLETED

- [x] Sync features with main pricing page
- [x] Ensure consistency between both pricing pages
- [x] Update any outdated content
- [x] Add missing features to all plans

### 3. Update Checkout Page Content ✅ COMPLETED

- [x] Update plan features in checkout sidebar
- [x] Ensure pricing matches new structure
- [x] Update any plan descriptions
- [x] Update plan name from "Pro Plan" to "Pro"
- [x] Add holiday special mention
- [x] Add "Coming Soon" features to match pricing page

### 4. Content Consistency Check ✅ COMPLETED

- [x] Verify all pricing pages show same information
- [x] Check that features are consistent across pages
- [x] Ensure CTAs point to correct locations
- [x] Confirm pricing amounts are consistent ($29 USD / ₹2,500 INR)

## Implementation Details:

### New Pricing Structure:

1. **Free Plan** ($0)
   - Create up to 1 podcasts per month
   - Develop up to 5 microlearning modules per month
   - Unlimited access to view Public TimeCapsules
   - Basic features only

2. **Pro Plan** ($29 USD / ₹2,500 INR)
   - Create up to 3 AI Sales Demos per month
   - Admin Dashboard for Sales Team
   - Approval workflow to screen demo requests
   - Schedule demos with leads
   - Admin access to AI Persona
   - English language support
   - Additional languages (Coming Soon)
   - Top up option: $99 for 5 additional demos (Coming Soon)

3. **Pro Enterprise** (Coming Soon)
   - Custom solutions
   - Priority support
   - Advanced features

### Key Changes Made:

- Updated all pricing amounts and currencies
- Updated feature lists for each plan
- Maintained existing UI design and animations
- Updated plan descriptions and CTAs
- Ensured consistency across all pricing-related pages
- Updated checkout page to reflect new pricing structure

## Testing Checklist:

- [x] Verify pricing displays correctly on all pages
- [x] Check that features are consistent
- [x] Test CTA buttons work correctly
- [x] Verify responsive design still works
- [x] Check that checkout flow uses correct pricing
