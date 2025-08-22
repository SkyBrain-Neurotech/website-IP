const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const GoogleSheetsWebhookService = require('../services/googleSheetsWebhook');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Initialize Google Sheets webhook service
const googleSheetsService = new GoogleSheetsWebhookService();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:8080', 'http://localhost:8081'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting - relaxed for development
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 50 : 5, // Higher limit for dev
  message: {
    error: 'Too many form submissions, please try again later',
    retryAfter: '15 minutes'
  }
});

// Google SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // App-specific password
    },
    secure: true,
    port: 465
  });
};

// Professional SkyBrain Email Templates
const emailTemplates = {
  contact: (data) => ({
    subject: `🧠 New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Contact Notification</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 14px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 30px; 
            background: #1a1a2e;
        }
        .notification-badge {
            text-align: center;
            margin-bottom: 25px;
        }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 6px 16px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-title { 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .form-data {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #8b5cf6;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 5px;
        }
        .field-value {
            color: #e2e8f0;
            line-height: 1.5;
        }
        .footer { 
            background: #0f172a; 
            padding: 25px; 
            text-align: center; 
            color: #64748b;
            font-size: 12px;
        }
        .footer-logo {
            font-size: 16px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <div class="notification-badge">
                <span class="badge">📧 New Contact Submission</span>
            </div>
            
            <h1 class="form-title">Contact Form Submission</h1>
            
            <div class="form-data">
                <div class="field">
                    <div class="field-label">Full Name:</div>
                    <div class="field-value">${data.firstName} ${data.lastName}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email Address:</div>
                    <div class="field-value">${data.email}</div>
                </div>
                <div class="field">
                    <div class="field-label">Interest Area:</div>
                    <div class="field-value">${data.interestArea || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Message:</div>
                    <div class="field-value">${data.message}</div>
                </div>
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">${new Date(data.timestamp).toLocaleString()}</div>
                </div>
                <div class="field">
                    <div class="field-label">Source:</div>
                    <div class="field-value">${data.source}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advanced Brain-Computer Interface Technology</p>
            <p style="margin-top: 15px; font-size: 11px;">
                © 2025 SkyBrain Neurotech | Bangalore, India<br>
                info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  }),
  
  betaSignup: (data) => ({
    subject: `🚀 New Beta Signup: ${data.firstName} ${data.lastName} (${data.userType})`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Beta Signup</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 14px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 30px; 
            background: #1a1a2e;
        }
        .notification-badge {
            text-align: center;
            margin-bottom: 25px;
        }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 6px 16px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-title { 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .form-data {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #8b5cf6;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 5px;
        }
        .field-value {
            color: #e2e8f0;
            line-height: 1.5;
        }
        .footer { 
            background: #0f172a; 
            padding: 25px; 
            text-align: center; 
            color: #64748b;
            font-size: 12px;
        }
        .footer-logo {
            font-size: 16px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <div class="notification-badge">
                <span class="badge">🚀 Beta Program Signup</span>
            </div>
            
            <h1 class="form-title">New Beta Program Member</h1>
            
            <div class="form-data">
                <div class="field">
                    <div class="field-label">Full Name:</div>
                    <div class="field-value">${data.firstName} ${data.lastName}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email Address:</div>
                    <div class="field-value">${data.email}</div>
                </div>
                <div class="field">
                    <div class="field-label">User Type:</div>
                    <div class="field-value">${data.userType}</div>
                </div>
                <div class="field">
                    <div class="field-label">Company/Organization:</div>
                    <div class="field-value">${data.company || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Country:</div>
                    <div class="field-value">${data.country}</div>
                </div>
                <div class="field">
                    <div class="field-label">Areas of Interest:</div>
                    <div class="field-value">${data.interests?.join(', ') || 'None specified'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Timeline:</div>
                    <div class="field-value">${data.timeline || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Use Case:</div>
                    <div class="field-value">${data.useCase || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Notifications Enabled:</div>
                    <div class="field-value">${data.notifications ? 'Yes' : 'No'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">${new Date(data.timestamp).toLocaleString()}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advanced Brain-Computer Interface Technology</p>
            <p style="margin-top: 15px; font-size: 11px;">
                © 2025 SkyBrain Neurotech | Bangalore, India<br>
                info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  }),
  
  demo: (data) => ({
    subject: `🎯 Demo Request from ${data.name} - ${data.interest}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Demo Request</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 14px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 30px; 
            background: #1a1a2e;
        }
        .notification-badge {
            text-align: center;
            margin-bottom: 25px;
        }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 6px 16px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-title { 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .form-data {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #8b5cf6;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 5px;
        }
        .field-value {
            color: #e2e8f0;
            line-height: 1.5;
        }
        .footer { 
            background: #0f172a; 
            padding: 25px; 
            text-align: center; 
            color: #64748b;
            font-size: 12px;
        }
        .footer-logo {
            font-size: 16px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <div class="notification-badge">
                <span class="badge">🎯 Demo Request</span>
            </div>
            
            <h1 class="form-title">New Demo Request</h1>
            
            <div class="form-data">
                <div class="field">
                    <div class="field-label">Full Name:</div>
                    <div class="field-value">${data.name}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email Address:</div>
                    <div class="field-value">${data.email}</div>
                </div>
                <div class="field">
                    <div class="field-label">Phone Number:</div>
                    <div class="field-value">${data.phone || 'Not provided'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Company/Organization:</div>
                    <div class="field-value">${data.company || 'Not specified'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Primary Interest:</div>
                    <div class="field-value">${data.interest}</div>
                </div>
                <div class="field">
                    <div class="field-label">Additional Information:</div>
                    <div class="field-value">${data.message || 'None provided'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">${new Date(data.timestamp).toLocaleString()}</div>
                </div>
                <div class="field">
                    <div class="field-label">Source:</div>
                    <div class="field-value">${data.source}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advanced Brain-Computer Interface Technology</p>
            <p style="margin-top: 15px; font-size: 11px;">
                © 2025 SkyBrain Neurotech | Bangalore, India<br>
                info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  }),
  
  newsletter: (data) => ({
    subject: `📧 Newsletter Subscription: ${data.email}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Newsletter Subscription</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 14px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 30px; 
            background: #1a1a2e;
        }
        .notification-badge {
            text-align: center;
            margin-bottom: 25px;
        }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
            color: white;
            padding: 6px 16px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-title { 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .form-data {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #8b5cf6;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 5px;
        }
        .field-value {
            color: #e2e8f0;
            line-height: 1.5;
        }
        .footer { 
            background: #0f172a; 
            padding: 25px; 
            text-align: center; 
            color: #64748b;
            font-size: 12px;
        }
        .footer-logo {
            font-size: 16px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <div class="notification-badge">
                <span class="badge">📧 Newsletter Subscription</span>
            </div>
            
            <h1 class="form-title">New Newsletter Subscriber</h1>
            
            <div class="form-data">
                <div class="field">
                    <div class="field-label">Email Address:</div>
                    <div class="field-value">${data.email}</div>
                </div>
                <div class="field">
                    <div class="field-label">Preferences:</div>
                    <div class="field-value">${data.preferences?.join(', ') || 'General'}</div>
                </div>
                <div class="field">
                    <div class="field-label">Source:</div>
                    <div class="field-value">${data.source}</div>
                </div>
                <div class="field">
                    <div class="field-label">Subscribed:</div>
                    <div class="field-value">${new Date(data.timestamp).toLocaleString()}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advanced Brain-Computer Interface Technology</p>
            <p style="margin-top: 15px; font-size: 11px;">
                © 2025 SkyBrain Neurotech | Bangalore, India<br>
                info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  })
};

// Auto-reply templates with professional design
const autoReplyTemplates = {
  contact: (data) => ({
    subject: 'Thank you for contacting SkyBrain',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Contact Confirmation</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 32px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 16px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 40px 30px; 
            background: #1a1a2e;
        }
        .welcome-text { 
            font-size: 24px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .message { 
            color: #e2e8f0; 
            line-height: 1.6; 
            margin-bottom: 30px;
            font-size: 16px;
        }
        .links-section {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid #8b5cf6;
        }
        .links-title {
            font-size: 18px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 15px;
        }
        .link-item {
            margin-bottom: 10px;
        }
        .link-item a {
            color: #8b5cf6;
            text-decoration: none;
            font-weight: 500;
        }
        .link-item a:hover {
            color: #a855f7;
        }
        .footer { 
            background: #0f172a; 
            padding: 30px; 
            text-align: center; 
            color: #64748b;
            font-size: 14px;
        }
        .footer-logo {
            font-size: 18px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <h1 class="welcome-text">Thank you for reaching out!</h1>
            
            <p class="message">Hi ${data.firstName},</p>
            <p class="message">
                We've received your message and will get back to you within 24 hours. Our team is excited to discuss how SkyBrain's advanced brain-computer interface technology can help with your ${data.interestArea || 'inquiry'}.
            </p>
            
            <div class="links-section">
                <div class="links-title">Explore Our Technology:</div>
                <div class="link-item">
                    <a href="https://skybrain.in/research">🔬 Latest Research</a>
                </div>
                <div class="link-item">
                    <a href="https://skybrain.in/technology">⚡ Our Technology</a>
                </div>
                <div class="link-item">
                    <a href="https://www.linkedin.com/company/skybrain-neurotech/">🔗 LinkedIn Updates</a>
                </div>
                <div class="link-item">
                    <a href="https://www.youtube.com/@skybrainneurotech">📺 YouTube Channel</a>
                </div>
            </div>
            
            <p class="message">
                Best regards,<br>
                <strong>The SkyBrain Team</strong>
            </p>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advancing Brain Technology Research</p>
            <p style="margin-top: 20px; font-size: 12px;">
                © 2025 SkyBrain Neurotech<br>
                Bangalore, India | info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  }),
  
  betaSignup: (data) => ({
    subject: 'Welcome to the SkyBrain Beta Program!',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Beta Welcome</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 32px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 16px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 40px 30px; 
            background: #1a1a2e;
        }
        .invitation-badge {
            text-align: center;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .welcome-text { 
            font-size: 24px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .message { 
            color: #e2e8f0; 
            line-height: 1.6; 
            margin-bottom: 30px;
            font-size: 16px;
        }
        .benefits-section {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid #8b5cf6;
        }
        .benefits-title {
            font-size: 18px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 15px;
        }
        .benefit-item {
            margin-bottom: 10px;
            color: #e2e8f0;
        }
        .profile-section {
            background: rgba(34, 197, 94, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #22c55e;
        }
        .profile-title {
            font-size: 16px;
            font-weight: 600;
            color: #22c55e;
            margin-bottom: 10px;
        }
        .profile-item {
            margin-bottom: 8px;
            color: #e2e8f0;
            font-size: 14px;
        }
        .footer { 
            background: #0f172a; 
            padding: 30px; 
            text-align: center; 
            color: #64748b;
            font-size: 14px;
        }
        .footer-logo {
            font-size: 18px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <div class="invitation-badge">
                <span class="badge">🎉 Welcome to Beta</span>
            </div>
            
            <h1 class="welcome-text">Welcome to the Future of Neurotechnology!</h1>
            
            <p class="message">Hi ${data.firstName},</p>
            <p class="message">
                Thank you for joining our beta program. You're now part of an exclusive community shaping the future of brain-computer interfaces. We're excited to have you aboard!
            </p>
            
            <div class="benefits-section">
                <div class="benefits-title">🚀 What happens next:</div>
                <div class="benefit-item">• Weekly technology updates and insights</div>
                <div class="benefit-item">• Access to our exclusive Discord community</div>
                <div class="benefit-item">• Early access to beta releases (Q2 2025)</div>
                <div class="benefit-item">• Invitations to virtual demos and webinars</div>
                <div class="benefit-item">• Direct feedback channel to our development team</div>
            </div>
            
            <div class="profile-section">
                <div class="profile-title">📋 Your Beta Profile:</div>
                <div class="profile-item"><strong>User Type:</strong> ${data.userType}</div>
                <div class="profile-item"><strong>Interests:</strong> ${data.interests?.join(', ') || 'General'}</div>
                <div class="profile-item"><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</div>
                <div class="profile-item"><strong>Location:</strong> ${data.country}</div>
            </div>
            
            <p class="message">
                Keep an eye on your inbox for exclusive updates and early access opportunities!
            </p>
            
            <p class="message">
                Best regards,<br>
                <strong>The SkyBrain Team</strong>
            </p>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advancing Brain Technology Research</p>
            <p style="margin-top: 20px; font-size: 12px;">
                © 2025 SkyBrain Neurotech<br>
                Bangalore, India | info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  }),
  
  demo: (data) => ({
    subject: 'Demo Request Confirmed - SkyBrain',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyBrain Demo Confirmation</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #1a1a2e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hex" patternUnits="userSpaceOnUse" width="20" height="17.32"><polygon points="10,1 18.66,6 18.66,15 10,20 1.34,15 1.34,6" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hex)"/></svg>') center/cover;
            opacity: 0.3;
        }
        .logo { 
            font-size: 32px; 
            font-weight: 700; 
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .tagline { 
            font-size: 16px; 
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        .content { 
            padding: 40px 30px; 
            background: #1a1a2e;
        }
        .confirmation-badge {
            text-align: center;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .welcome-text { 
            font-size: 24px; 
            font-weight: 600; 
            margin-bottom: 20px;
            color: #a855f7;
            text-align: center;
        }
        .message { 
            color: #e2e8f0; 
            line-height: 1.6; 
            margin-bottom: 30px;
            font-size: 16px;
        }
        .demo-details {
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid #8b5cf6;
        }
        .demo-title {
            font-size: 18px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 15px;
        }
        .demo-item {
            margin-bottom: 12px;
            color: #e2e8f0;
        }
        .demo-item strong {
            color: #a855f7;
        }
        .request-details {
            background: rgba(59, 130, 246, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            border-left: 4px solid #3b82f6;
        }
        .request-title {
            font-size: 16px;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 10px;
        }
        .request-item {
            margin-bottom: 8px;
            color: #e2e8f0;
            font-size: 14px;
        }
        .footer { 
            background: #0f172a; 
            padding: 30px; 
            text-align: center; 
            color: #64748b;
            font-size: 14px;
        }
        .footer-logo {
            font-size: 18px;
            font-weight: 600;
            color: #a855f7;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🧠 SKYBRAIN</div>
            <div class="tagline">Neural Intelligence Platform</div>
        </div>
        
        <div class="content">
            <div class="confirmation-badge">
                <span class="badge">🎯 Demo Confirmed</span>
            </div>
            
            <h1 class="welcome-text">Demo Request Confirmed!</h1>
            
            <p class="message">Hi ${data.name},</p>
            <p class="message">
                We've received your demo request and will contact you within 24 hours to schedule your personalized demonstration of SkyBrain's revolutionary brain-computer interface technology.
            </p>
            
            <div class="demo-details">
                <div class="demo-title">🚀 What to expect:</div>
                <div class="demo-item"><strong>Duration:</strong> 30-minute interactive session</div>
                <div class="demo-item"><strong>Format:</strong> Live EEG demonstration with real-time brain data</div>
                <div class="demo-item"><strong>Q&A:</strong> Expert discussion about your specific use case</div>
                <div class="demo-item"><strong>Follow-up:</strong> Detailed information packet and next steps</div>
                <div class="demo-item"><strong>Technology Focus:</strong> Customized based on your interests</div>
            </div>
            
            <div class="request-details">
                <div class="request-title">📋 Your Request Details:</div>
                <div class="request-item"><strong>Primary Interest:</strong> ${data.interest}</div>
                <div class="request-item"><strong>Company:</strong> ${data.company || 'Individual'}</div>
                <div class="request-item"><strong>Contact:</strong> ${data.email}${data.phone ? ` | ${data.phone}` : ''}</div>
            </div>
            
            <p class="message">
                We're excited to show you the future of neurotechnology and how SkyBrain can transform your ${data.interest.toLowerCase()} applications!
            </p>
            
            <p class="message">
                Best regards,<br>
                <strong>The SkyBrain Team</strong>
            </p>
        </div>
        
        <div class="footer">
            <div class="footer-logo">SkyBrain Neurotech</div>
            <p>Advancing Brain Technology Research</p>
            <p style="margin-top: 20px; font-size: 12px;">
                © 2025 SkyBrain Neurotech<br>
                Bangalore, India | info@skybrain.in
            </p>
        </div>
    </div>
</body>
</html>
    `
  })
};

// Rest of the original file code continues here...
// Validation functions, send email function, API routes, etc.

// Validation functions
const validateContactForm = (data) => {
  const errors = [];
  
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters');
  }
  
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateBetaForm = (data) => {
  const errors = [];
  
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('First name is required');
  }
  
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push('Last name is required');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.country || data.country.trim().length < 2) {
    errors.push('Country is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateDemoForm = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.interest) {
    errors.push('Please select your primary interest');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Send email function
const sendEmail = async (to, template, data) => {
  const transporter = createTransporter();
  const emailContent = template(data);
  
  const mailOptions = {
    from: `SkyBrain <${process.env.GMAIL_USER}>`,
    to: to,
    subject: emailContent.subject,
    html: emailContent.html
  };
  
  return await transporter.sendMail(mailOptions);
};

// API Routes

// Contact Form
app.post('/api/contact', formLimiter, async (req, res) => {
  try {
    const validation = validateContactForm(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const data = {
      ...req.body,
      timestamp: new Date().toISOString(),
      source: 'Contact Form'
    };
    
    // Respond immediately to user
    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
    });
    
    // Run email sending and Google Sheets logging in background (don't wait)
    Promise.allSettled([
      googleSheetsService.addUserSubmission('contact', data),
      sendEmail(process.env.ADMIN_EMAIL, emailTemplates.contact, data),
      sendEmail(data.email, autoReplyTemplates.contact, data)
    ]).then(([sheetsResult, adminEmailResult, userEmailResult]) => {
      // Log any failures but don't block the response
      if (sheetsResult.status === 'rejected') {
        console.error('Google Sheets logging failed:', sheetsResult.reason);
      }
      if (adminEmailResult.status === 'rejected') {
        console.error('Admin email failed:', adminEmailResult.reason);
      }
      if (userEmailResult.status === 'rejected') {
        console.error('User email failed:', userEmailResult.reason);
      }
      console.log(`Contact form processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Background processing error:', error);
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Beta Signup
app.post('/api/beta-signup', formLimiter, async (req, res) => {
  try {
    const validation = validateBetaForm(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const data = {
      ...req.body,
      timestamp: new Date().toISOString()
    };
    
    // Respond immediately to user
    res.json({
      success: true,
      message: 'Welcome to the beta program! Check your email for confirmation.'
    });
    
    // Run background processing (don't wait)
    Promise.allSettled([
      googleSheetsService.addUserSubmission('beta-signup', data),
      sendEmail(process.env.ADMIN_EMAIL, emailTemplates.betaSignup, data),
      sendEmail(data.email, autoReplyTemplates.betaSignup, data)
    ]).then(() => {
      console.log(`Beta signup processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Beta signup background processing error:', error);
    });
    
  } catch (error) {
    console.error('Beta signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process signup. Please try again later.'
    });
  }
});

// Demo Request
app.post('/api/demo-request', formLimiter, async (req, res) => {
  try {
    const validation = validateDemoForm(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const data = {
      ...req.body,
      timestamp: new Date().toISOString(),
      source: 'Demo Request Form'
    };
    
    // Respond immediately to user
    res.json({
      success: true,
      message: 'Demo request submitted! We\'ll contact you within 24 hours.'
    });
    
    // Run background processing (don't wait)
    Promise.allSettled([
      googleSheetsService.addUserSubmission('demo-request', data),
      sendEmail(process.env.ADMIN_EMAIL, emailTemplates.demo, data),
      sendEmail(data.email, autoReplyTemplates.demo, data)
    ]).then(() => {
      console.log(`Demo request processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Demo request background processing error:', error);
    });
    
  } catch (error) {
    console.error('Demo request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit demo request. Please try again later.'
    });
  }
});

// Newsletter Subscription
app.post('/api/newsletter-subscribe', formLimiter, async (req, res) => {
  try {
    const { email, preferences = ['general'], source = 'website' } = req.body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }
    
    const data = {
      email,
      preferences,
      source,
      timestamp: new Date().toISOString()
    };
    
    // Respond immediately to user
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
    
    // Run background processing (don't wait)
    Promise.allSettled([
      googleSheetsService.addUserSubmission('newsletter', data),
      sendEmail(process.env.ADMIN_EMAIL, emailTemplates.newsletter, data)
    ]).then(() => {
      console.log(`Newsletter subscription processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Newsletter background processing error:', error);
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// User stats endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await googleSheetsService.getUserStats();
    res.json({
      success: true,
      data: stats || { message: 'Google Sheets not configured' }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

// Test Google Sheets connection
app.get('/api/test-sheets', async (req, res) => {
  try {
    const result = await googleSheetsService.testConnection();
    res.json(result);
  } catch (error) {
    console.error('Test connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test connection'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Initialize sheets on startup
app.listen(PORT, async () => {
  console.log(`SkyBrain API server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  
  // Create Google Sheets if they don't exist
  await googleSheetsService.createSheetsIfNotExists();
});

module.exports = app;