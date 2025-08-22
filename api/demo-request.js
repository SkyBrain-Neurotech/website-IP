import nodemailer from 'nodemailer';

// Google SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // App-specific password
    },
    secure: true,
    port: 465
  });
};

// Demo Request Email Template (Admin Notification)
const demoRequestEmailTemplate = (data) => ({
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
});

// Demo Request Auto-reply Template (User Confirmation)
const demoConfirmationTemplate = (data) => ({
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
});

// Validation function
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

// Google Sheets webhook function
const logToGoogleSheets = async (data) => {
  try {
    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      console.warn('Google Apps Script URL not configured, skipping Google Sheets logging');
      return;
    }

    const payload = {
      ...data,
      formType: 'demo-request',
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
    console.log(`Demo request data logged to Google Sheets: ${data.email}`);
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
      message: 'Too many demo requests, please try again later',
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
    
    // Validate the form data
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
    
    // Run email sending and Google Sheets logging in background (don't wait)
    Promise.allSettled([
      sendEmail('info@skybrain.in', demoRequestEmailTemplate, data),
      sendEmail(data.email, demoConfirmationTemplate, data),
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
      console.log(`Demo request processed successfully for ${data.email}`);
    }).catch(error => {
      console.error('Background processing error:', error);
    });
    
  } catch (error) {
    console.error('Demo request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit demo request. Please try again later.'
    });
  }
}