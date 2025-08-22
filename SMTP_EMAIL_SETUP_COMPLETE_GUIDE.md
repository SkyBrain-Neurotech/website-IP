# 📧 SkyBrain Website - Complete SMTP & Email Setup Guide

**Status:** ✅ Backend Ready | ⚠️ SMTP Configuration Required  
**Last Updated:** August 22, 2025

---

## 📊 Current Status Summary

### ✅ **What's Already Set Up**
- ✅ Complete backend API server with 4 endpoints
- ✅ Professional email templates (admin + user auto-replies)
- ✅ Form validation and security measures
- ✅ Rate limiting and CORS protection
- ✅ Server dependencies installed and tested
- ✅ Production-ready code structure

### ⚠️ **What Needs Configuration**
- ⚠️ Gmail SMTP credentials (App Password required)
- ⚠️ Environment variables (.env file setup)
- ⚠️ Production deployment configuration

---

## 🚀 **Quick Start - Get Email Working in 10 Minutes**

### **Step 1: Get Gmail App Password** ⏱️ 3 minutes

1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" → Turn on

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter: "SkyBrain Website"
   - **Save the 16-character password** (format: xxxx xxxx xxxx xxxx)

### **Step 2: Configure Server** ⏱️ 2 minutes

Edit the file: `server\.env`

```env
# Replace with your actual Gmail credentials
GMAIL_USER=your-actual-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# This stays the same
ADMIN_EMAIL=info@skybrain.in
FRONTEND_URL=http://localhost:8080
PORT=3001
NODE_ENV=development
```

### **Step 3: Start Backend Server** ⏱️ 1 minute

```bash
cd server
npm start
```

You should see: `SkyBrain API server running on port 3001`

### **Step 4: Test Forms** ⏱️ 4 minutes

1. Start your frontend: `npm run dev`
2. Go to: http://localhost:8080/contact
3. Fill out and submit the contact form
4. Check your email for both:
   - Admin notification (to ADMIN_EMAIL)
   - User auto-reply (to the email you entered)

---

## 📋 **Complete Form Status**

Your website has **4 forms** that will work once SMTP is configured:

### 1. **Contact Form** 📞
- **Location:** `/contact` page
- **File:** `src/components/ContactSection.tsx`
- **Endpoint:** `POST /api/contact`
- **Features:** 
  - Full contact details collection
  - Interest area selection
  - Admin notification + user auto-reply

### 2. **Beta Signup Form** 🚀
- **Location:** `/beta-signup` page  
- **File:** `src/components/BetaSignupForm.tsx`
- **Endpoint:** `POST /api/beta-signup`
- **Features:**
  - Comprehensive user profiling
  - Interest area selection
  - Welcome email with beta program details

### 3. **Demo Request Form** 🎯
- **Location:** Demo modal (various pages)
- **File:** `src/components/DemoForm.tsx`
- **Endpoint:** `POST /api/demo-request`
- **Features:**
  - Demo scheduling request
  - Company information collection
  - Confirmation email with next steps

### 4. **Newsletter Signup** 📧
- **Location:** Footer and other sections
- **File:** `src/components/NewsletterSignup.tsx`
- **Endpoint:** `POST /api/newsletter-subscribe`
- **Features:**
  - Simple email collection
  - Preference tracking
  - Subscription confirmation

---

## 🔧 **Technical Architecture**

### **Backend API Server**
```
server/
├── api/contact.js          # ✅ Main server (Express + Nodemailer)
├── package.json           # ✅ Dependencies configured
├── .env.example           # ✅ Template provided
└── .env                   # ⚠️ Needs your SMTP credentials
```

### **Frontend Integration**
```
src/
├── lib/formHandler.ts     # ✅ Multi-fallback form submission
├── components/
│   ├── ContactSection.tsx # ✅ Contact form with validation
│   ├── BetaSignupForm.tsx # ✅ Beta signup with profiling
│   ├── DemoForm.tsx       # ✅ Demo request modal
│   └── NewsletterSignup.tsx # ✅ Newsletter subscription
```

### **API Endpoints Ready**
- ✅ `POST /api/contact` - Contact form submissions
- ✅ `POST /api/beta-signup` - Beta program signups  
- ✅ `POST /api/demo-request` - Demo requests
- ✅ `POST /api/newsletter-subscribe` - Newsletter subscriptions
- ✅ `GET /api/health` - Server health check

---

## 📧 **Email Templates Preview**

### **Admin Notifications** (What you'll receive)

**Contact Form Notification:**
```
Subject: New Contact Form Submission from John Doe
- Name: John Doe  
- Email: john@example.com
- Interest: Research Collaboration
- Message: [User's message]
- Submitted: [Timestamp]
```

**Beta Signup Notification:**
```
Subject: New Beta Signup: Jane Smith (Researcher)
- Name: Jane Smith
- Email: jane@example.com  
- User Type: Researcher
- Interests: Healthcare, Research
- Timeline: Within 3 months
- Use Case: [User's description]
```

### **User Auto-Replies** (What users receive)

**Contact Confirmation:**
```
Subject: Thank you for contacting SkyBrain

Hi John,

We've received your message and will get back to you within 24 hours.

In the meantime, feel free to explore:
• Latest Research  
• Our Technology
• LinkedIn Updates

Best regards,
The SkyBrain Team
```

**Beta Welcome Email:**
```
Subject: Welcome to the SkyBrain Beta Program!

Hi Jane,

Thank you for joining our beta program. You're now part of an exclusive community shaping the future of brain-computer interfaces.

What happens next:
• Weekly technology updates  
• Access to Discord community
• Early access to beta releases (Q2 2025)
• Virtual demos and webinars

Your Beta Profile:
• User Type: Researcher
• Interests: Healthcare, Research
• Timeline: Within 3 months
```

---

## 🔒 **Security Features Included**

### **Rate Limiting**
- 5 submissions per IP per 15 minutes
- Prevents spam and abuse
- Configurable thresholds

### **Input Validation**
- Server-side validation for all fields
- Email format verification  
- Required field enforcement
- XSS protection

### **CORS Protection**
- Domain-specific access control
- Environment-based configuration
- Prevents unauthorized API access

### **Request Security**
- Helmet.js security headers
- Content-Type validation
- Request size limits (1MB max)

---

## 🌍 **Production Deployment Options**

### **Option 1: Vercel (Recommended)**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy server
cd server
vercel

# 3. Set environment variables in Vercel dashboard:
GMAIL_USER=info@skybrain.in
GMAIL_APP_PASSWORD=your-production-app-password
ADMIN_EMAIL=info@skybrain.in
FRONTEND_URL=https://skybrain.in
NODE_ENV=production
```

### **Option 2: Railway**
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Automatic deployment on push

### **Option 3: DigitalOcean App Platform**
1. Connect repository
2. Configure build settings  
3. Add environment variables

---

## 🔍 **Troubleshooting Guide**

### **Issue: "Invalid login" Error**
**Cause:** Incorrect Gmail credentials
**Solution:**
- ✅ Verify Gmail username is correct
- ✅ Check App Password (16 characters, no spaces)
- ✅ Ensure 2FA is enabled on Gmail account
- ✅ Try regenerating App Password

### **Issue: "CORS Error" in Browser**
**Cause:** Frontend/backend URL mismatch
**Solution:**
- ✅ Check FRONTEND_URL in server/.env matches your frontend
- ✅ Verify both servers are running on correct ports
- ✅ Update CORS configuration if using different domains

### **Issue: "Form Not Submitting"**
**Cause:** Backend server not running or unreachable
**Solution:**
- ✅ Check server is running: `npm start` in server directory
- ✅ Test health endpoint: `curl http://localhost:3001/api/health`
- ✅ Check browser Network tab for errors
- ✅ Verify API endpoints are correct

### **Issue: "Emails Not Sending"**
**Cause:** SMTP configuration or Gmail settings
**Solution:**
- ✅ Test Gmail credentials with external tool
- ✅ Check spam/junk folders
- ✅ Verify recipient email addresses are valid
- ✅ Check server logs for detailed error messages

---

## 🧪 **Testing Checklist**

### **Local Development Testing**
- [ ] Backend server starts without errors
- [ ] Health endpoint responds: `GET /api/health`
- [ ] Contact form submits successfully  
- [ ] Beta signup form works
- [ ] Demo request modal functions
- [ ] Newsletter signup processes
- [ ] Admin emails received
- [ ] User auto-replies delivered
- [ ] Rate limiting works (try 6+ submissions quickly)

### **Production Testing**
- [ ] Production server deployed and accessible
- [ ] Environment variables configured
- [ ] All forms work from live website
- [ ] Email delivery confirmed
- [ ] SSL certificates valid
- [ ] CORS configured for production domain

---

## 📊 **Form Analytics & Tracking**

### **Built-in Tracking**
- ✅ Form submission success/failure rates
- ✅ Source tracking for analytics
- ✅ Timestamp logging for all submissions
- ✅ Error logging for debugging

### **Google Analytics Integration**
The forms include GTM/GA4 tracking:
```javascript
// Automatic event tracking
gtag('event', 'form_submission', {
  'event_category': 'contact',
  'event_label': 'contact_form',
  'value': 1
});
```

---

## 💡 **Advanced Features**

### **Multi-Fallback System**
Your forms include a smart fallback system:
1. **Primary:** SkyBrain API (your SMTP server)
2. **Fallback 1:** Web3Forms (if configured)
3. **Fallback 2:** Formspree (if configured)  
4. **Fallback 3:** Local storage + user notification

### **Email Delivery Monitoring**
- Nodemailer provides delivery confirmations
- Failed sends are logged with details
- Retry mechanisms for temporary failures

### **Scalability Ready**
- Rate limiting prevents overload
- Stateless design for horizontal scaling
- Environment-based configuration

---

## 🆘 **Need Help?**

### **Quick Tests**
```bash
# Test server health
curl http://localhost:3001/api/health

# Test contact endpoint  
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'

# Check server logs
cd server && npm run dev
```

### **Debug Mode**
Set `NODE_ENV=development` in your .env file for detailed error logging.

### **Gmail Configuration Help**
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [App Password Setup](https://support.google.com/accounts/answer/185833)
- [Online SMTP Tester](https://www.smtpbucket.com/)

---

## ✅ **Final Setup Checklist**

### **Gmail Setup**
- [ ] 2-Factor Authentication enabled
- [ ] App Password generated (16 characters)
- [ ] IMAP enabled in Gmail settings

### **Server Configuration**  
- [ ] Dependencies installed (`npm install`)
- [ ] .env file created with your credentials
- [ ] Server starts successfully (`npm start`)
- [ ] Health endpoint accessible

### **Form Testing**
- [ ] Contact form submits successfully
- [ ] Beta signup form works  
- [ ] Demo request modal functions
- [ ] Newsletter signup processes
- [ ] All emails received (admin + user)

### **Production Ready**
- [ ] Production server deployed
- [ ] Environment variables set
- [ ] Domain CORS configured
- [ ] SSL certificates active
- [ ] Email delivery tested

---

## 🎉 **You're All Set!**

Once you complete the Gmail App Password setup and update the .env file, your entire email system will be fully functional with:

- ✅ **4 working contact forms**
- ✅ **Professional email templates**
- ✅ **Security and rate limiting**
- ✅ **Admin notifications**
- ✅ **User auto-replies**
- ✅ **Production deployment ready**
- ✅ **Analytics tracking**
- ✅ **Fallback systems**

**Total setup time:** ~10 minutes  
**Maintenance required:** Minimal (Gmail App Password renewal annually)

---

**Questions?** Check the troubleshooting section above or test each component step by step.