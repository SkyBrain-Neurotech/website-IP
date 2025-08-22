const nodemailer = require('nodemailer');

// Google SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')
    },
    secure: true,
    port: 465
  });
};

// Beta Signup Email Template (Admin Notification)
const betaSignupEmailTemplate = (data) => ({
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
});

// Beta Signup Welcome Email Template (User Auto-reply)
const betaWelcomeTemplate = (data) => ({
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
});

// Validation function
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

// Google Sheets webhook function
const logToGoogleSheets = async (data) => {
  try {
    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      console.warn('Google Apps Script URL not configured, skipping Google Sheets logging');
      return;
    }

    const payload = {
      ...data,
      formType: 'beta-signup',
      timestamp: new Date().toISOString()
    };

    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Beta signup data logged to Google Sheets: ${data.email}`);
    return result;
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
  }
};

// Rate limiting
const rateLimiters = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 3; // More restrictive for beta signups
  
  if (!rateLimiters.has(ip)) {
    rateLimiters.set(ip, { attempts: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  const limiter = rateLimiters.get(ip);
  
  if (now > limiter.resetTime) {
    rateLimiters.set(ip, { attempts: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (limiter.attempts >= maxAttempts) {
    return { 
      allowed: false, 
      message: 'Too many beta signup attempts, please try again later',
      retryAfter: '15 minutes'
    };
  }
  
  limiter.attempts++;
  return { allowed: true };
};

// Main Vercel API handler
module.exports = async function handler(req, res) {
  // Enable CORS for all origins in production, specific origins in development
  const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:8081',
    'https://skybrain.in',
    'https://www.skybrain.in',
    'https://skybrain-website-ip-protect.vercel.app'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        success: false,
        message: rateLimitResult.message,
        retryAfter: rateLimitResult.retryAfter
      });
    }
    
    // Validate the form data
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
    
    // Run email sending and Google Sheets logging in background (don't wait)
    Promise.allSettled([
      sendEmail(process.env.ADMIN_EMAIL || 'info@skybrain.in', betaSignupEmailTemplate, data),
      sendEmail(data.email, betaWelcomeTemplate, data),
      logToGoogleSheets(data)
    ]).then(([adminEmailResult, userEmailResult, sheetsResult]) => {
      // Log any failures but don't block the response
      if (adminEmailResult.status === 'rejected') {
        console.error('Admin email failed:', adminEmailResult.reason);
      }
      if (userEmailResult.status === 'rejected') {
        console.error('User email failed:', userEmailResult.reason);
      }
      if (sheetsResult.status === 'rejected') {
        console.error('Google Sheets logging failed:', sheetsResult.reason);
      }
      console.log(`Beta signup processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Background processing error:', error);
    });
    
  } catch (error) {
    console.error('Beta signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process signup. Please try again later.'
    });
  }
};