# SkyBrain Website - SMTP & Form Setup Guide

This comprehensive guide will help you set up email functionality and form handling for the SkyBrain website using Google SMTP.

## 📋 **Forms Identified on Website**

The website contains 4 main forms that need backend integration:

1. **Contact Form** (`/contact`) - ContactSection.tsx
2. **Beta Signup Form** (`/beta-signup`) - BetaSignupForm.tsx  
3. **Demo Request Form** (Modal) - DemoForm.tsx
4. **Newsletter Subscription** (Multiple locations) - NewsletterSignup.tsx

## 🔧 **Backend Architecture**

### Server Structure
```
server/
├── api/
│   └── contact.js          # Main API server
├── package.json            # Dependencies
├── .env.example           # Environment template
└── .env                   # Your actual config (create this)
```

### API Endpoints Created
- `POST /api/contact` - Contact form submissions
- `POST /api/beta-signup` - Beta program signups
- `POST /api/demo-request` - Demo requests
- `POST /api/newsletter-subscribe` - Newsletter subscriptions
- `GET /api/health` - Health check

## 🚀 **Setup Instructions**

### Step 1: Google Account Setup

#### 1.1 Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. This is required for App Passwords

#### 1.2 Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Enter "SkyBrain Website" as the app name
4. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)
5. **Save this password securely** - you won't see it again

#### 1.3 Gmail Settings
1. Go to Gmail Settings → Forwarding and POP/IMAP
2. Enable IMAP access
3. Save changes

### Step 2: Server Setup

#### 2.1 Install Dependencies
```bash
cd server
npm install
```

#### 2.2 Environment Configuration
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` file with your details:
```env
# Gmail SMTP Configuration
GMAIL_USER=your-actual-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Admin email to receive notifications  
ADMIN_EMAIL=info@skybrain.in

# Frontend URL for CORS
FRONTEND_URL=http://localhost:8080

# Server configuration
PORT=3001
NODE_ENV=development

# For production
PRODUCTION_FRONTEND_URL=https://skybrain.in
```

#### 2.3 Start the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

### Step 3: Frontend Integration

#### 3.1 Update Form Endpoints
The forms are already configured to hit the correct endpoints:
- Contact: `/api/contact`
- Beta: `/api/beta-signup`  
- Demo: `/api/demo-request`
- Newsletter: `/api/newsletter-subscribe`

#### 3.2 Update Base URL (if needed)
In your frontend code, update the API base URL if your server runs on a different port:

```javascript
// Update in each form component
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:3001';
```

### Step 4: Testing

#### 4.1 Test Each Form
1. Start both frontend (`npm run dev`) and backend (`npm run dev`)
2. Fill out each form on the website
3. Check console logs for successful submissions
4. Verify emails are received

#### 4.2 Test Email Delivery
1. Submit the contact form
2. Check that you receive:
   - Admin notification at `info@skybrain.in`
   - Auto-reply confirmation to the user's email

## 📧 **Email Templates**

### Admin Notifications
Each form submission sends a detailed notification to `ADMIN_EMAIL` with:
- All form data
- Timestamp
- Source identification
- Proper formatting for easy reading

### User Auto-Replies
Users receive professional auto-reply emails with:
- Confirmation of submission
- Expected response time
- Relevant links and next steps
- SkyBrain branding

## 🔒 **Security Features**

### Rate Limiting
- 5 submissions per IP per 15 minutes
- Prevents spam and abuse
- Configurable limits

### Input Validation
- Server-side validation for all fields
- Email format validation
- Required field checking
- XSS protection

### CORS Protection
- Configured for your domain only
- Prevents unauthorized access
- Environment-specific settings

### Headers Security
- Helmet.js for security headers
- Content-Type validation
- Request size limits

## 🌍 **Production Deployment**

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. In server directory: `vercel`
3. Set environment variables in Vercel dashboard
4. Update frontend API URLs

### Option 2: Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Option 3: DigitalOcean App Platform
1. Connect repository
2. Configure build settings
3. Add environment variables

### Production Environment Variables
```env
NODE_ENV=production
GMAIL_USER=info@skybrain.in
GMAIL_APP_PASSWORD=your-production-app-password
ADMIN_EMAIL=info@skybrain.in
FRONTEND_URL=https://skybrain.in
PORT=3001
```

## 🔍 **Troubleshooting**

### Common Issues

#### "Invalid login" Error
- Check Gmail username and app password
- Ensure 2FA is enabled
- Verify app password format (no spaces)

#### CORS Errors
- Check FRONTEND_URL in .env
- Verify frontend is running on correct port
- Update CORS configuration if needed

#### Form Not Submitting
- Check server is running on correct port
- Verify API endpoints are accessible
- Check browser network tab for errors

#### Emails Not Sending
- Test Gmail credentials separately
- Check spam folder
- Verify recipient email addresses
- Check server logs for errors

### Debug Commands
```bash
# Check server status
curl http://localhost:3001/api/health

# Test email configuration
node -e "console.log(require('./api/contact.js'))"

# View server logs
npm run dev
```

## 📊 **Monitoring & Analytics**

### Form Submission Tracking
- Each form logs submissions
- Success/failure rates tracked
- Source tracking for analytics

### Email Delivery Monitoring
- Nodemailer provides delivery confirmations
- Error logging for failed sends
- Retry mechanisms for temporary failures

## 🔄 **Maintenance**

### Regular Tasks
1. **Monitor app password** - Regenerate annually
2. **Check email delivery** - Weekly test submissions
3. **Update dependencies** - Monthly security updates
4. **Review logs** - Weekly error checking

### Backup Considerations
- Form submissions are sent via email (auto-backup)
- Consider database for high-volume scenarios
- Log important events for debugging

## 📞 **Support**

### Email Configuration Issues
1. Check [Gmail SMTP settings](https://support.google.com/mail/answer/7126229)
2. Verify [App Password setup](https://support.google.com/accounts/answer/185833)
3. Test with [online SMTP tester](https://www.smtpbucket.com/)

### Development Support
- Check server logs for detailed error messages
- Use Postman to test API endpoints directly
- Verify environment variables are loaded correctly

---

## ✅ **Quick Setup Checklist**

- [ ] Enable 2FA on Gmail account
- [ ] Generate Gmail App Password
- [ ] Install server dependencies (`npm install`)
- [ ] Create `.env` file with credentials
- [ ] Start backend server (`npm run dev`)
- [ ] Test each form on frontend
- [ ] Verify admin emails received
- [ ] Check user auto-reply emails
- [ ] Test rate limiting (submit 6+ forms quickly)
- [ ] Deploy to production environment
- [ ] Update production environment variables
- [ ] Test production deployment

---

**Need Help?** Contact the development team or create an issue in the repository.

**Production Ready:** This setup is production-ready with proper security, validation, and error handling.