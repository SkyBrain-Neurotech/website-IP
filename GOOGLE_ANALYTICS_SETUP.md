# Google Analytics 4 Integration Guide

This document outlines the current state and steps needed to complete Google Analytics 4 (GA4) integration for the SkyBrain website.

## Current State

### ✅ What's Already Implemented

1. **Analytics Provider Component** (`src/components/AnalyticsProvider.tsx`)
   - Wrapper component for analytics context
   - Currently set up to load Google Analytics scripts

2. **Analytics Library** (`src/lib/analytics.ts`)
   - Utility functions for tracking events
   - TypeScript definitions for analytics events
   - Event tracking functions ready to use

3. **Event Tracking in Components**
   - Demo modal interactions (demo_modal_open, demo_start, demo_direct_access)
   - Form submissions (beta_signup, newsletter_subscribe)
   - Page navigation events
   - Button click tracking

4. **reCAPTCHA Integration**
   - Forms are protected with reCAPTCHA v3
   - Analytics events include reCAPTCHA tokens for validation

## ❌ What's Missing

### 1. GA4 Measurement ID Configuration

**Current Issue:** No GA4 measurement ID is configured in the code.

**Required Actions:**
- Create Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
- Get your GA4 Measurement ID (format: G-XXXXXXXXXX)
- Add the measurement ID to environment variables

**Implementation Steps:**
```bash
# Add to .env.local (for local development)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Add to Vercel environment variables (for production)
# Go to Vercel Dashboard > Project > Settings > Environment Variables
```

### 2. Google Analytics Script Loading

**Required:** Add GA4 tracking script to `index.html` or implement programmatic loading.

**Option 1 - HTML Head (Recommended):**
```html
<!-- Add to index.html <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Option 2 - Dynamic Loading:**
```typescript
// Update src/lib/analytics.ts to dynamically load GA4
const loadGoogleAnalytics = () => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${import.meta.env.VITE_GA4_MEASUREMENT_ID}');
  `;
  document.head.appendChild(script2);
};
```

### 3. Environment Variable Access

**Current Issue:** Vite environment variables need proper configuration.

**Required Updates:**
```typescript
// Update src/lib/analytics.ts
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Add environment check
if (!GA4_MEASUREMENT_ID && import.meta.env.PROD) {
  console.warn('GA4 Measurement ID not found in production environment');
}
```

### 4. Type Declarations

**Required:** Update global type declarations for gtag.

**Add to src/vite-env.d.ts:**
```typescript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}
```

## 🔧 Implementation Checklist

### Phase 1: Basic Setup
- [ ] Create GA4 property in Google Analytics
- [ ] Get GA4 Measurement ID (G-XXXXXXXXXX)
- [ ] Add measurement ID to environment variables
  - [ ] Local development (.env.local)
  - [ ] Vercel production environment
- [ ] Add GA4 script to index.html
- [ ] Test basic page view tracking

### Phase 2: Event Tracking
- [ ] Verify existing event tracking code works
- [ ] Test demo modal events
- [ ] Test form submission events
- [ ] Test navigation events
- [ ] Add custom events for:
  - [ ] Video play/pause events
  - [ ] Team member bio expansions
  - [ ] Technology section interactions
  - [ ] Contact form submissions

### Phase 3: Enhanced Analytics
- [ ] Set up conversion goals in GA4
- [ ] Configure enhanced ecommerce (if applicable)
- [ ] Set up custom dimensions for:
  - [ ] User segments (researcher, developer, enterprise)
  - [ ] Page sections viewed
  - [ ] Demo interaction depth
- [ ] Set up audiences for remarketing

### Phase 4: Privacy & Compliance
- [ ] Implement cookie consent banner
- [ ] Add privacy policy updates for analytics
- [ ] Configure IP anonymization
- [ ] Set up data retention policies
- [ ] GDPR compliance for EU users

## 📊 Custom Events Currently Implemented

The following events are already coded and will work once GA4 is properly configured:

### Demo & Interaction Events
- `demo_modal_open` - When demo modal is opened
- `demo_start` - When user starts demo process
- `demo_direct_access` - When user accesses demo directly
- `form_submission` - Form submission events

### Navigation Events
- `page_view` - Automatic page view tracking
- `section_view` - When users scroll to specific sections

### Form Events
- `beta_signup` - Beta program signups
- `newsletter_subscribe` - Newsletter subscriptions
- `contact_form_submit` - Contact form submissions

## 🚀 Quick Start Instructions

1. **Get GA4 ID:**
   ```
   Visit: https://analytics.google.com
   Create property → Get Measurement ID
   ```

2. **Add to Vercel:**
   ```
   Dashboard → SkyBrain Project → Settings → Environment Variables
   Add: VITE_GA4_MEASUREMENT_ID = G-XXXXXXXXXX
   ```

3. **Update index.html:**
   ```html
   Add GA4 script to <head> section with your measurement ID
   ```

4. **Deploy and Test:**
   ```bash
   npm run build
   vercel --prod
   ```

5. **Verify in GA4:**
   ```
   Check Real-time reports for page views and events
   ```

## 📞 Support

For any issues with GA4 setup:
- Google Analytics Help: https://support.google.com/analytics
- Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
- React + GA4 Guide: https://developers.google.com/analytics/devguides/collection/ga4/react

---

**Last Updated:** July 3, 2025
**Status:** Ready for implementation - just needs GA4 Measurement ID