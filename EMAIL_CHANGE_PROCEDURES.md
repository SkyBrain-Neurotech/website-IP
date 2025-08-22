# 📧 SkyBrain Email Configuration Change Procedures

**Current Setup:** ✅ **Working with info@skybrain.in**  
**Last Updated:** August 22, 2025

---

## 🎯 **Current Configuration Status**

### ✅ **Active Configuration**
- **SMTP Sender:** `info@skybrain.in`
- **Admin Recipient:** `info@skybrain.in`
- **App Password:** `mweu laom dmjm zllt`
- **Server Port:** 3003
- **All Forms Working:** ✅ Contact, Beta Signup, Demo Request, Newsletter

### 📧 **Email Flow Summary**
1. **User submits form** → **Your server processes** → **2 emails sent:**
   - **Admin Notification:** FROM `info@skybrain.in` TO `info@skybrain.in`
   - **User Confirmation:** FROM `info@skybrain.in` TO `user@example.com`

---

## 🔄 **How to Change Email Configuration**

### **Scenario 1: Change to Different Gmail Account**

#### **Step 1: Set Up New Gmail Account**
1. **Enable 2FA** on the new Gmail account
2. **Generate App Password:**
   - Go to https://myaccount.google.com/security
   - Click "App passwords"
   - Create new password for "SkyBrain Website SMTP"
   - **Save the 16-character password**

#### **Step 2: Update Server Configuration**
Edit `server/.env` file:
```env
# Change GMAIL_USER to new email
GMAIL_USER=newemail@gmail.com
GMAIL_APP_PASSWORD=new-16-character-password

# Change admin recipient (where notifications go)
ADMIN_EMAIL=newemail@gmail.com  # or keep info@skybrain.in
```

#### **Step 3: Restart Server**
```bash
cd server
npm start
```

---

### **Scenario 2: Change Only Admin Recipient**

If you want emails **sent from** `info@skybrain.in` but **received at** different address:

#### **Update Only Admin Email**
Edit `server/.env` file:
```env
# Keep sender the same
GMAIL_USER=info@skybrain.in
GMAIL_APP_PASSWORD=mweu laom dmjm zllt

# Change where notifications go
ADMIN_EMAIL=support@skybrain.in  # or any other email
```

**Result:** 
- Emails sent FROM: `info@skybrain.in`
- Admin notifications sent TO: `support@skybrain.in`
- User confirmations sent TO: `user@example.com`

---

### **Scenario 3: Change From Gmail to Different Provider**

#### **For Other Email Providers (Outlook, Yahoo, etc.)**

Edit the SMTP configuration in `server/api/contact.js`:

**For Outlook/Hotmail:**
```javascript
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.live.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER, // your outlook email
      pass: process.env.GMAIL_APP_PASSWORD // outlook app password
    }
  });
};
```

**For Yahoo:**
```javascript
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.GMAIL_USER, // your yahoo email
      pass: process.env.GMAIL_APP_PASSWORD // yahoo app password
    }
  });
};
```

**For Custom SMTP:**
```javascript
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'your-smtp-server.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};
```

---

### **Scenario 4: Multiple Email Addresses**

#### **Different Emails for Different Forms**

Edit `server/api/contact.js` to customize recipients:

```javascript
// Different admin emails for different forms
const getAdminEmail = (formType) => {
  switch(formType) {
    case 'contact': return 'support@skybrain.in';
    case 'beta': return 'beta@skybrain.in';
    case 'demo': return 'sales@skybrain.in';
    case 'newsletter': return 'marketing@skybrain.in';
    default: return process.env.ADMIN_EMAIL;
  }
};

// Then in each route, use:
await sendEmail(getAdminEmail('contact'), emailTemplates.contact, data);
```

---

## 🧪 **Testing After Changes**

### **Quick Test Commands**

After making any email configuration changes, test each form:

```bash
# Test Contact Form
curl -X POST http://localhost:3003/api/contact -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message","timestamp":"2025-08-22T00:00:00.000Z","source":"test"}'

# Test Beta Signup
curl -X POST http://localhost:3003/api/beta-signup -H "Content-Type: application/json" -d '{"firstName":"Test","lastName":"User","email":"test@example.com","userType":"Tester","country":"India","timestamp":"2025-08-22T00:00:00.000Z"}'

# Test Demo Request
curl -X POST http://localhost:3003/api/demo-request -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com","interest":"Testing","timestamp":"2025-08-22T00:00:00.000Z","source":"test"}'

# Test Newsletter
curl -X POST http://localhost:3003/api/newsletter-subscribe -H "Content-Type: application/json" -d '{"email":"test@example.com","source":"test","timestamp":"2025-08-22T00:00:00.000Z"}'
```

### **What to Check**
- ✅ All 4 commands return `{"success":true,...}`
- ✅ Admin notifications received at correct email
- ✅ User confirmations sent to test email addresses
- ✅ Professional SkyBrain templates render correctly

---

## 🚨 **Common Issues & Solutions**

### **Issue: "Invalid login" Error**
**Cause:** Wrong email credentials or 2FA not enabled  
**Solution:**
1. Verify email address is correct in `.env`
2. Ensure 2FA is enabled on the email account
3. Regenerate App Password
4. Check App Password format (16 characters, no spaces)

### **Issue: "EADDRINUSE: port already in use"**
**Cause:** Server already running on that port  
**Solution:**
1. Change PORT in `.env` to different number (e.g., 3004, 3005)
2. Or kill existing process and restart

### **Issue: Emails not received**
**Cause:** SMTP configuration or email provider issues  
**Solution:**
1. Check spam/junk folders
2. Verify recipient email addresses are valid
3. Test with different email provider
4. Check server logs for detailed error messages

### **Issue: Templates not rendering**
**Cause:** HTML template syntax errors  
**Solution:**
1. Check server logs for template errors
2. Verify all template variables are defined
3. Test email templates with simple text first

---

## 📝 **File Locations Summary**

### **Configuration Files**
- **Environment:** `server/.env` - Email credentials and settings
- **SMTP Setup:** `server/api/contact.js` - Email server configuration
- **Templates:** `server/api/contact.js` - Email template designs

### **Key Variables**
- **`GMAIL_USER`** - The email account that sends emails
- **`GMAIL_APP_PASSWORD`** - The App Password for SMTP authentication  
- **`ADMIN_EMAIL`** - Where admin notifications are sent
- **`PORT`** - Server port (change if conflicts occur)

---

## 🔒 **Security Best Practices**

### **App Password Management**
- ✅ Use App Passwords, never regular passwords
- ✅ Generate unique passwords for each application
- ✅ Store passwords securely in `.env` file (never commit to git)
- ✅ Regenerate passwords annually or if compromised

### **Email Security**
- ✅ Always use 2FA on email accounts
- ✅ Monitor email account access logs
- ✅ Use dedicated email accounts for automated systems
- ✅ Regularly review and rotate credentials

### **Server Security**
- ✅ Keep `.env` file out of version control (add to `.gitignore`)
- ✅ Use environment variables in production
- ✅ Monitor server logs for failed authentication attempts
- ✅ Implement rate limiting (already configured)

---

## 🎯 **Quick Reference Commands**

### **View Current Configuration**
```bash
cd server
cat .env
```

### **Restart Server After Changes**
```bash
cd server
npm start
```

### **Check Server Status**
```bash
curl http://localhost:3003/api/health
```

### **View Server Logs**
```bash
cd server
npm run dev  # Development mode with detailed logs
```

---

## ✅ **Summary**

Your email system is now professionally configured with:
- ✅ **Clean unified setup** using `info@skybrain.in` for everything
- ✅ **Professional SkyBrain-themed templates** for all 4 forms
- ✅ **All forms tested and working** (Contact, Beta, Demo, Newsletter)
- ✅ **Secure App Password authentication**
- ✅ **Production-ready configuration**

**To change emails:** Simply update the `.env` file, restart the server, and test the forms. The system is designed to be easily configurable while maintaining security and professional appearance.