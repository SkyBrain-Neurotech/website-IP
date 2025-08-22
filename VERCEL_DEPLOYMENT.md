# 🚀 Vercel Deployment Guide - SkyBrain Website

## 📋 **Pre-Deployment Checklist**

### 1. **Environment Variables Setup**
Before deploying, you need to set up environment variables in Vercel:

**Required Environment Variables:**
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
ADMIN_EMAIL=info@skybrain.in
NODE_ENV=production
```

### 2. **Gmail Setup** (If not done already)
1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Save the 16-character password (format: `xxxx xxxx xxxx xxxx`)

## 🔧 **Deployment Steps**

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Vercel monorepo deployment configuration"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration

### Step 3: Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add the required variables:
   - `GMAIL_USER` → your Gmail address
   - `GMAIL_APP_PASSWORD` → your 16-character app password
   - `ADMIN_EMAIL` → `info@skybrain.in`
   - `NODE_ENV` → `production`

### Step 4: Deploy
Click "Deploy" - Vercel will:
1. Build the frontend (React/Vite)
2. Deploy the backend as serverless functions
3. Configure routing automatically

## 🏗️ **How It Works**

### **Monorepo Structure**
```
SkyBrain-Website-main/
├── src/                    # Frontend React app
├── server/                 # Backend API
├── dist/                   # Built frontend (auto-generated)
├── vercel.json            # Deployment configuration
└── package.json           # Main package.json
```

### **Routing Configuration**
- **Frontend**: `https://your-app.vercel.app/*` → React SPA
- **API**: `https://your-app.vercel.app/api/*` → Express.js backend
- **Forms**: Submit to `/api/contact`, `/api/beta-signup`, etc.

### **API Endpoints Available**
- `GET /api/health` - Health check
- `POST /api/contact` - Contact form
- `POST /api/beta-signup` - Beta program signup
- `POST /api/demo-request` - Demo requests
- `POST /api/newsletter-subscribe` - Newsletter subscription

## 🧪 **Testing the Deployment**

### 1. **Frontend Testing**
- Visit your Vercel URL
- Navigate through all pages
- Check Terms of Service and Privacy Policy pages

### 2. **API Testing**
Test each form:
```bash
# Contact Form
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "message": "Test message",
    "timestamp": "2025-01-08T10:00:00Z",
    "source": "test"
  }'

# Health Check
curl https://your-app.vercel.app/api/health
```

### 3. **Email Testing**
1. Submit each form type
2. Check `info@skybrain.in` for admin notifications
3. Check user's email for auto-replies
4. Verify email formatting and content

## 🔍 **Debugging**

### **View Logs**
1. Go to Vercel Dashboard → Functions
2. Click on a function to see logs
3. Check for errors in real-time

### **Common Issues**

#### ❌ **"Function not found"**
- Check `vercel.json` configuration
- Ensure `server/api/contact.js` exists
- Redeploy if needed

#### ❌ **Email not sending**
- Check environment variables are set
- Verify Gmail App Password (no spaces)
- Check function logs for SMTP errors

#### ❌ **CORS errors**
- Check CORS configuration in `server/api/contact.js`
- Verify frontend is making requests to same domain

## 🎯 **Testing Checklist**

- [ ] Website loads at Vercel URL
- [ ] All pages accessible (Home, Technology, Contact, etc.)
- [ ] Terms of Service page works
- [ ] Privacy Policy page works
- [ ] Contact form submits successfully
- [ ] Beta signup form works
- [ ] Demo request form works
- [ ] Newsletter signup works
- [ ] Admin emails received at `info@skybrain.in`
- [ ] User auto-reply emails sent
- [ ] Mobile responsive design works
- [ ] No console errors

## 📈 **Performance**

### **Expected Metrics**
- **Frontend**: Static files served from CDN
- **API**: Cold start ~1-2s, warm requests ~100-200ms
- **Email**: Delivery within 1-5 seconds

### **Optimization**
- Frontend pre-built and cached
- Serverless functions auto-scale
- Images optimized by Vercel

## 🔒 **Security**

### **Built-in Protection**
- Rate limiting (5 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Environment variable encryption

## 📊 **Monitoring**

### **Vercel Analytics**
- Function invocations
- Error rates
- Response times
- Bandwidth usage

### **Custom Tracking**
- Form submission success rates
- Email delivery confirmations
- User analytics with gtag

---

## 🚀 **Ready to Deploy?**

1. **Commit and push** your changes to GitHub
2. **Connect to Vercel** and import repository  
3. **Add environment variables** in Vercel settings
4. **Deploy and test** all functionality
5. **Monitor** performance and logs

Your SkyBrain website will be live with full email functionality! 🎉

---

**Need Help?** Check the logs in Vercel Dashboard or contact the development team.