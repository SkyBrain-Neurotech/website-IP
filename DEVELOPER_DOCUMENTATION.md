# 🧠 SkyBrain Website - Complete Developer Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture) 
3. [Technology Stack](#technology-stack)
4. [Installation & Setup](#installation--setup)
5. [SMTP Configuration](#smtp-configuration)
6. [Environment Variables](#environment-variables)
7. [Development](#development)
8. [Deployment](#deployment)
9. [API Endpoints](#api-endpoints)
10. [Form Handling](#form-handling)
11. [Google Sheets Integration](#google-sheets-integration)
12. [Performance Optimizations](#performance-optimizations)
13. [Troubleshooting](#troubleshooting)
14. [Maintenance](#maintenance)

---

## 🎯 Project Overview

**SkyBrain Website** is a modern, high-performance React application for a brain-computer interface (BCI) company. The site features:

- **Interactive animations** with performance optimization
- **Multiple contact forms** (Contact, Demo Request, Beta Signup, Newsletter)
- **SMTP email system** with professional templates
- **Google Sheets integration** for data logging
- **Responsive design** optimized for all devices
- **Production-ready** with Vercel deployment

---

## 🏗️ Architecture

```
SkyBrain-Website/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── forms/               # Form components
│   │   └── animations/          # Animation components
│   ├── pages/                   # Route components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── styles/                  # CSS files
├── api/                         # Vercel serverless functions
│   ├── contact.js              # Contact form endpoint
│   ├── demo-request.js         # Demo request endpoint
│   ├── beta-signup.js          # Beta signup endpoint
│   └── newsletter-subscribe.js  # Newsletter endpoint
├── server/                      # Express.js server (for local dev)
│   ├── api/                    # Server endpoints
│   ├── services/               # Business logic
│   └── docs/                   # Server documentation
└── public/                      # Static assets
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - State management
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - Component library
- **Lucide Icons** - Icon system

### Backend
- **Node.js** with Express.js (local development)
- **Vercel Functions** (serverless deployment)
- **Nodemailer** - SMTP email handling
- **Google Sheets API** - Data logging
- **Rate limiting** - Security middleware
- **CORS & Helmet** - Security headers

### Deployment & Tools
- **Vercel** - Hosting platform
- **GitHub** - Version control
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## ⚡ Installation & Setup

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Gmail account** (for SMTP)
- **Google Cloud account** (optional, for Sheets)

### 1. Clone Repository
```bash
git clone <repository-url>
cd SkyBrain-Website-IP-protect
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Build Project
```bash
# Development build
npm run build:dev

# Production build
npm run build
```

---

## 📧 SMTP Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Configure Environment Variables**:
```bash
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop
ADMIN_EMAIL=admin@skybrain.in
```

### Alternative SMTP Providers

#### SendGrid
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

### Vercel Deployment SMTP
For Vercel deployment, add environment variables in:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add all SMTP variables listed above
3. Redeploy the application

---

## 🔧 Environment Variables

### Required Variables

#### SMTP Configuration
```bash
GMAIL_USER=your-gmail@gmail.com           # Gmail address
GMAIL_APP_PASSWORD=your-app-password      # 16-char app password
ADMIN_EMAIL=admin@skybrain.in            # Recipient email
```

#### Application Settings
```bash
FRONTEND_URL=https://skybrain.in         # Production URL
NODE_ENV=production                      # Environment
PORT=3005                               # Server port (local only)
```

### Optional Variables

#### Google Sheets (Data Logging)
```bash
GOOGLE_SHEETS_PRIVATE_KEY_ID=key-id
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=service@project.iam.gserviceaccount.com
GOOGLE_SHEETS_CLIENT_ID=client-id
GOOGLE_SHEETS_SPREADSHEET_ID=spreadsheet-id
```

#### Security
```bash
RECAPTCHA_SECRET_KEY=your-recaptcha-secret
```

---

## 🚀 Development

### Local Development

#### 1. Start Development Server
```bash
# Start frontend (port 8080)
npm run dev

# Start backend server (port 3005) - separate terminal
cd server
node api/contact.js
```

#### 2. Access Application
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3005
- **API Health**: http://localhost:3005/api/health

#### 3. Development Commands
```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run preview      # Preview build locally
```

### Code Quality

#### TypeScript
- Strict type checking enabled
- No `any` types (use proper types)
- Interface definitions in components

#### ESLint Rules
```bash
npm run lint         # Check for issues
npm run lint -- --fix # Auto-fix issues
```

#### Performance Guidelines
- Use React.lazy() for heavy components
- Implement error boundaries
- Optimize animations for mobile
- Follow device detection patterns

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

#### 1. Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

#### 2. Environment Variables
Set in Vercel Dashboard:
- GMAIL_USER
- GMAIL_APP_PASSWORD
- ADMIN_EMAIL
- FRONTEND_URL
- All Google Sheets variables (if using)

#### 3. Custom Domain
1. Add custom domain in Vercel Dashboard
2. Update DNS records
3. Update FRONTEND_URL environment variable

### Alternative Deployment

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
# Set same variables as Vercel
```

#### Self-hosted
```bash
# Build application
npm run build

# Serve with nginx/Apache
# Point web server to /dist directory
# Set up reverse proxy for /api routes
```

---

## 🔌 API Endpoints

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "interestArea": "Research",
  "message": "Interested in BCI technology"
}
```

### Demo Request
```http
POST /api/demo-request
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "TechCorp",
  "interest": "healthcare",
  "message": "Want to see live demo"
}
```

### Beta Signup
```http
POST /api/beta-signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "userType": "developer",
  "company": "TechCorp",
  "country": "United States",
  "interests": ["neural-interfaces", "ai-integration"],
  "timeline": "immediate",
  "useCase": "Research project",
  "notifications": true
}
```

### Newsletter Subscription
```http
POST /api/newsletter-subscribe
Content-Type: application/json

{
  "email": "john@example.com",
  "preferences": ["general", "technology"],
  "source": "website"
}
```

### Utility Endpoints
```http
GET /api/health          # Health check
GET /api/stats           # User statistics
GET /api/test-sheets     # Test Google Sheets connection
```

---

## 📝 Form Handling

### Form Validation
All forms use server-side validation:
- **Email format** validation
- **Required field** checking
- **Length constraints**
- **Rate limiting** (5 submissions per 15 minutes)

### Error Handling
- **User-friendly** error messages
- **Fallback mechanisms** for email delivery
- **Graceful degradation** if services fail

### Success Flow
1. **Immediate response** to user
2. **Background processing** for emails/logging
3. **Auto-reply email** sent to user
4. **Admin notification** email
5. **Google Sheets** logging (if configured)

---

## 📊 Google Sheets Integration

### Setup Process

#### 1. Create Google Cloud Project
```bash
1. Go to Google Cloud Console
2. Create new project "SkyBrain-Forms"
3. Enable Google Sheets API
4. Enable Google Drive API
```

#### 2. Create Service Account
```bash
1. IAM & Admin > Service Accounts
2. Create service account
3. Download JSON key file
4. Extract credentials for .env
```

#### 3. Create Spreadsheet
```bash
1. Create new Google Sheet
2. Share with service account email
3. Give "Editor" permissions
4. Copy spreadsheet ID from URL
```

#### 4. Environment Variables
```bash
GOOGLE_SHEETS_SPREADSHEET_ID=1abc...xyz
GOOGLE_SHEETS_CLIENT_EMAIL=service@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

### Sheet Structure
- **contact_submissions** - Contact form data
- **beta_signups** - Beta program signups
- **demo_requests** - Demo requests
- **newsletter_subscribers** - Email subscriptions

---

## ⚡ Performance Optimizations

### Completed Optimizations

#### Animation Performance
- ✅ **Removed spinning animations** (CPU intensive)
- ✅ **Device-based optimization** (mobile vs desktop)
- ✅ **Frame rate throttling** (30 FPS mobile, 60 FPS desktop)
- ✅ **Visibility API** - pause when tab inactive
- ✅ **Memory leak prevention** - proper cleanup

#### Code Splitting
- ✅ **Route-based splitting** with React.lazy()
- ✅ **Component lazy loading** for heavy animations
- ✅ **Bundle optimization** - main bundle < 540KB
- ✅ **Error boundaries** for graceful failures

#### Mobile Optimization
- ✅ **Touch targets** - minimum 44x44px
- ✅ **Responsive layouts** for all screen sizes
- ✅ **Reduced animations** on low-power devices
- ✅ **Battery-aware** animation control

#### CSS Optimizations
- ✅ **CSS-only animations** where possible
- ✅ **GPU acceleration** with transform3d
- ✅ **Prefersreduced-motion** support

### Performance Monitoring
```bash
# Build analysis
npm run build

# Check bundle sizes in dist/
# Monitor Core Web Vitals
# Test on low-end devices
```

---

## 🐛 Troubleshooting

### Common Issues

#### SMTP Not Working
```bash
# Check environment variables
echo $GMAIL_USER
echo $GMAIL_APP_PASSWORD

# Test SMTP configuration
curl -X POST http://localhost:3005/api/test-email
```

**Solutions:**
- Verify Gmail App Password is correct (16 characters)
- Check if 2FA is enabled on Gmail
- Verify ADMIN_EMAIL is set
- Check firewall/network restrictions

#### Form Submissions Failing
```bash
# Check API endpoints
curl -X GET http://localhost:3005/api/health

# Check rate limiting
# Wait 15 minutes if rate limited
```

**Solutions:**
- Verify all required fields are provided
- Check email format validation
- Ensure API endpoints are accessible
- Check server logs for detailed errors

#### Build Failures
```bash
# Check TypeScript errors
npm run build

# Check ESLint issues
npm run lint
```

**Solutions:**
- Fix TypeScript type errors
- Resolve ESLint warnings
- Update dependencies if needed
- Clear node_modules and reinstall

#### Google Sheets Integration
```bash
# Test connection
curl -X GET http://localhost:3005/api/test-sheets
```

**Solutions:**
- Verify service account permissions
- Check spreadsheet sharing settings
- Validate JSON key format in environment
- Ensure APIs are enabled in Google Cloud

### Deployment Issues

#### Vercel Functions Timeout
- Increase function timeout in vercel.json
- Optimize email sending logic
- Use background processing

#### Environment Variables Missing
- Double-check Vercel dashboard settings
- Redeploy after adding variables
- Use Vercel CLI to verify: `vercel env ls`

---

## 🔧 Maintenance

### Regular Tasks

#### Weekly
- [ ] Monitor email delivery rates
- [ ] Check Google Sheets data integrity
- [ ] Review server logs for errors
- [ ] Test form submissions

#### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review performance metrics
- [ ] Clean up old logs
- [ ] Backup Google Sheets data

#### Quarterly
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Update documentation
- [ ] Review and update email templates

### Monitoring

#### Key Metrics
- Form submission success rate
- Email delivery success rate
- Page load times
- Error rates by endpoint

#### Logging
- All form submissions logged to Google Sheets
- SMTP errors logged to console
- Rate limiting events tracked
- Performance metrics available in Vercel dashboard

### Security Updates

#### Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix issues
npm audit fix
```

#### Environment
- Rotate Gmail App Password quarterly
- Update API keys as needed
- Review access permissions
- Monitor for suspicious activity

---

## 📞 Support & Contact

### For Developers
- **Repository**: [GitHub Link]
- **Documentation**: This file
- **Issues**: Use GitHub Issues
- **Development**: Contact technical lead

### For Content Updates
- **Email Templates**: `server/api/contact.js` (lines 48-1309)
- **Form Fields**: `src/components/` form files
- **Styling**: `src/styles/` CSS files
- **Content**: `src/pages/` React components

---

## 🎉 Success Checklist

Before going live, ensure:

- [ ] ✅ **SMTP working** - test emails sending
- [ ] ✅ **All forms tested** - contact, demo, beta, newsletter
- [ ] ✅ **Google Sheets logging** (if enabled)
- [ ] ✅ **Environment variables** set in production
- [ ] ✅ **Domain configured** and SSL working
- [ ] ✅ **Performance tested** on mobile devices
- [ ] ✅ **Error boundaries** working
- [ ] ✅ **Rate limiting** functional
- [ ] ✅ **Auto-reply emails** configured
- [ ] ✅ **Monitoring setup** complete

---

*Last Updated: January 2025*
*Version: 2.0.0 - Production Optimized*