# Contact Form Setup - 5 Minutes

## Current Issue
Contact form opens email client instead of sending emails directly. Bad user experience.

## Quick Fix - Choose One Service

### Option 1: Web3Forms (Recommended)
**FREE - 250 emails/month**

1. Go to: https://web3forms.com
2. Sign up with info@skybrain.in
3. Create form, copy access key
4. Update `src/lib/formHandler.ts` line 55:
```javascript
const web3FormsKey = 'YOUR_ACCESS_KEY_HERE';
```

### Option 2: Formspree  
**FREE - 50 emails/month**

1. Go to: https://formspree.io
2. Sign up with info@skybrain.in
3. Create form, copy form ID
4. Update `src/lib/formHandler.ts` line 104:
```javascript
const formspreeId = 'YOUR_FORM_ID_HERE';
```

## Test
1. `npm run build`
2. `npm run dev`
3. Fill contact form
4. Check info@skybrain.in

## Result
✅ Users get "Message sent successfully!"
✅ Emails arrive at info@skybrain.in automatically
✅ No email client opening