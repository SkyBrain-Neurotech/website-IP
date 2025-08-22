import * as nodemailer from 'nodemailer';

// Google SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    secure: true,
    port: 465
  });
};

// Newsletter Subscription Email Template (Admin Notification)
const newsletterEmailTemplate = (data) => ({
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
});

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
      formType: 'newsletter',
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
    console.log(`Newsletter subscription logged to Google Sheets: ${data.email}`);
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
  const maxAttempts = 3;
  
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
      message: 'Too many newsletter subscription attempts, please try again later',
      retryAfter: '15 minutes'
    };
  }
  
  limiter.attempts++;
  return { allowed: true };
};

// Main Vercel API handler
export default async function handler(req, res) {
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
    
    // Run email sending and Google Sheets logging in background (don't wait)
    Promise.allSettled([
      sendEmail(process.env.ADMIN_EMAIL || 'info@skybrain.in', newsletterEmailTemplate, data),
      logToGoogleSheets(data)
    ]).then(([emailResult, sheetsResult]) => {
      // Log any failures but don't block the response
      if (emailResult.status === 'rejected') {
        console.error('Newsletter email failed:', emailResult.reason);
      }
      if (sheetsResult.status === 'rejected') {
        console.error('Google Sheets logging failed:', sheetsResult.reason);
      }
      console.log(`Newsletter subscription processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Background processing error:', error);
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
};