# SMTP Working Pattern Documentation

## Overview
This document explains the EXACT working SMTP pattern used in `/api/test-email` that successfully sends emails on Vercel. All other forms should follow this identical pattern.

## Working Configuration

### Environment Variables Required
```
GMAIL_USER=info@skybrain.in
GMAIL_APP_PASSWORD=mweu laom dmjm zllt
```

**Important Notes:**
- Gmail App Password has spaces but code removes them with `.replace(/\s+/g, '')`
- Must use Gmail App Password, not regular password
- 2FA must be enabled on Gmail account

### Working Code Pattern

```javascript
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // 1. CORS Headers (exact same)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 2. Environment Variable Check
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      return res.json({
        success: false,
        error: 'Missing Gmail credentials'
      });
    }

    // 3. Transporter Creation (CRITICAL - exact same config)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword?.replace(/\s+/g, '') // Remove spaces
      },
      secure: true,
      port: 465
    });

    // 4. Connection Verification (IMPORTANT)
    await transporter.verify();

    // 5. Send Email
    const info = await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: 'info@skybrain.in',
      subject: 'Your Subject',
      html: 'Your HTML content'
    });

    // 6. Success Response
    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    // 7. Error Response
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}
```

## Critical Success Factors

### 1. Module Format
- ✅ **Use CommonJS**: `const nodemailer = require('nodemailer')`
- ✅ **Export format**: `module.exports = async function handler(req, res)`
- ❌ **Don't use ES modules**: `import` statements cause issues

### 2. Nodemailer Method
- ✅ **Correct**: `nodemailer.createTransport()` 
- ❌ **Wrong**: `nodemailer.createTransporter()` (this was the bug!)

### 3. Password Handling
- ✅ **Remove spaces**: `gmailPassword?.replace(/\s+/g, '')`
- Environment variable can have spaces, code strips them

### 4. Connection Verification
- ✅ **Always verify**: `await transporter.verify()`
- This catches auth issues before sending

### 5. Error Handling
- ✅ **Simple error response**: Just return error message and code
- ❌ **Don't overcomplicate**: Complex error handling caused issues

## Vercel Deployment Notes

### Build Process
Vercel compiles ES modules to CommonJS automatically:
```
Warning: Node.js functions are compiled from ESM to CommonJS.
Compiling "contact.js" from ESM to CommonJS...
```
This warning is normal and expected.

### API Dependencies
The `/api/package.json` file contains:
```json
{
  "dependencies": {
    "nodemailer": "^6.9.8"
  }
}
```

## Testing the Pattern

### 1. Test SMTP Endpoint
```
GET/POST https://your-domain.vercel.app/api/test-email
```

**Expected Success Response:**
```json
{
  "success": true,
  "message": "SMTP test successful",
  "messageId": "<unique-id@skybrain.in>",
  "timestamp": "2025-08-22T07:29:35.385Z"
}
```

### 2. Verify Email Delivery
- Check `info@skybrain.in` inbox
- Email should arrive within 30 seconds
- Subject: "SkyBrain SMTP Test"

## Troubleshooting Guide

### Common Issues & Solutions

#### 1. "createTransporter is not a function"
**Problem**: Wrong method name
**Solution**: Use `createTransport` not `createTransporter`

#### 2. "Authentication failed"
**Problem**: Gmail credentials issue
**Solutions**:
- Verify Gmail App Password is correct
- Ensure 2FA is enabled
- Check environment variables are set in Vercel

#### 3. "Missing Gmail credentials"
**Problem**: Environment variables not loaded
**Solutions**:
- Check Vercel dashboard environment variables
- Verify variable names match exactly
- Redeploy after setting variables

#### 4. Import/Export Errors
**Problem**: Module format issues
**Solutions**:
- Use `require()` not `import`
- Use `module.exports` not `export default`

## Form Implementation Template

When creating new forms, copy this exact pattern:

```javascript
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      return res.json({ success: false, error: 'Missing Gmail credentials' });
    }

    // Your form validation here
    const { email, name, message } = req.body;
    if (!email || !name || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // EXACT same transporter as test-email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword?.replace(/\s+/g, '')
      },
      secure: true,
      port: 465
    });

    await transporter.verify();

    // Send your emails
    await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: 'info@skybrain.in',
      subject: 'Your Subject',
      html: 'Your HTML content'
    });

    res.json({ success: true, message: 'Form submitted successfully' });

  } catch (error) {
    res.json({ success: false, error: error.message, code: error.code });
  }
}
```

## Current Working Forms
- ✅ `/api/test-email` - SMTP test (working)
- ✅ `/api/contact` - Contact form (fixed using this pattern)
- ✅ `/api/beta-signup` - Beta signup (fixed using this pattern)
- 🔄 `/api/demo-request` - Need to apply this pattern
- 🔄 `/api/newsletter-subscribe` - Need to apply this pattern

## Last Updated
Date: 2025-08-22
Status: SMTP working successfully with this pattern
Test Email Status: ✅ Confirmed working on Vercel