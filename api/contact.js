const nodemailer = require('nodemailer');

// Google SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '') // Remove all spaces from app password
    },
    secure: true,
    port: 465
  });
};

// Professional SkyBrain Email Template for Contact Form
const contactEmailTemplate = (data) => ({
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
});

// Auto-reply template for users
const autoReplyTemplate = (data) => ({
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
});

// Validation function
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

// Send email function with enhanced error handling
const sendEmail = async (to, template, data) => {
  try {
    console.log(`Attempting to send email to: ${to}`);
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Missing Gmail credentials in environment variables');
    }
    
    const transporter = createTransporter();
    const emailContent = template(data);
    
    const mailOptions = {
      from: `SkyBrain <${process.env.GMAIL_USER}>`,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    console.log(`Email options configured for: ${to}`);
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to: ${to}, messageId: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error(`Email sending failed to ${to}:`, {
      error: error.message,
      code: error.code,
      command: error.command
    });
    throw error;
  }
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
      formType: 'contact',
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
    console.log(`Contact form data logged to Google Sheets: ${data.email}`);
    return result;
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    // Don't throw error - let the app continue even if logging fails
  }
};

// Rate limiting simulation (simple IP tracking)
const rateLimiters = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  if (!rateLimiters.has(ip)) {
    rateLimiters.set(ip, { attempts: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  const limiter = rateLimiters.get(ip);
  
  if (now > limiter.resetTime) {
    // Reset the window
    rateLimiters.set(ip, { attempts: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (limiter.attempts >= maxAttempts) {
    return { 
      allowed: false, 
      message: 'Too many form submissions, please try again later',
      retryAfter: '15 minutes'
    };
  }
  
  limiter.attempts++;
  return { allowed: true };
};

// Main Vercel API handler
module.exports = async function handler(req, res) {
  console.log('=== CONTACT API CALLED ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
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
    
    // Enhanced logging for debugging
    console.log('Environment check:', {
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      nodeEnv: process.env.NODE_ENV
    });

    // Run email sending and Google Sheets logging in background (don't wait)
    Promise.allSettled([
      sendEmail(process.env.ADMIN_EMAIL || 'info@skybrain.in', contactEmailTemplate, data),
      sendEmail(data.email, autoReplyTemplate, data),
      logToGoogleSheets(data)
    ]).then(([adminEmailResult, userEmailResult, sheetsResult]) => {
      // Enhanced logging for debugging
      console.log('Email sending results:', {
        adminEmail: adminEmailResult.status,
        userEmail: userEmailResult.status,
        googleSheets: sheetsResult.status
      });
      
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
}