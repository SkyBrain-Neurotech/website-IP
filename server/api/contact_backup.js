const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
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

// Email templates
const emailTemplates = {
  contact: (data) => ({
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Interest Area:</strong> ${data.interestArea || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <hr>
      <p><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      <p><strong>Source:</strong> ${data.source}</p>
    `
  }),
  
  betaSignup: (data) => ({
    subject: `New Beta Signup: ${data.firstName} ${data.lastName} (${data.userType})`,
    html: `
      <h2>New Beta Program Signup</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>User Type:</strong> ${data.userType}</p>
      <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Interests:</strong> ${data.interests?.join(', ') || 'None specified'}</p>
      <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
      <p><strong>Use Case:</strong></p>
      <p>${data.useCase || 'Not specified'}</p>
      <p><strong>Notifications:</strong> ${data.notifications ? 'Yes' : 'No'}</p>
      <hr>
      <p><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
    `
  }),
  
  demo: (data) => ({
    subject: `Demo Request from ${data.name} - ${data.interest}`,
    html: `
      <h2>New Demo Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
      <p><strong>Primary Interest:</strong> ${data.interest}</p>
      <p><strong>Additional Information:</strong></p>
      <p>${data.message || 'None provided'}</p>
      <hr>
      <p><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      <p><strong>Source:</strong> ${data.source}</p>
    `
  }),
  
  newsletter: (data) => ({
    subject: `Newsletter Subscription: ${data.email}`,
    html: `
      <h2>New Newsletter Subscription</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Preferences:</strong> ${data.preferences?.join(', ') || 'General'}</p>
      <p><strong>Source:</strong> ${data.source}</p>
      <hr>
      <p><strong>Subscribed:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
    `
  })
};

// Auto-reply templates
const autoReplyTemplates = {
  contact: (data) => ({
    subject: 'Thank you for contacting SkyBrain',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00D4FF;">Thank you for reaching out!</h2>
        <p>Hi ${data.firstName},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our latest research and updates:</p>
        <ul>
          <li><a href="https://skybrain.in/research" style="color: #00D4FF;">Latest Research</a></li>
          <li><a href="https://skybrain.in/technology" style="color: #00D4FF;">Our Technology</a></li>
          <li><a href="https://www.linkedin.com/company/skybrain-neurotech/" style="color: #00D4FF;">LinkedIn Updates</a></li>
        </ul>
        <p>Best regards,<br>The SkyBrain Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Neural Core Private Limited<br>
          Bangalore, India<br>
          Email: info@skybrain.in
        </p>
      </div>
    `
  }),
  
  betaSignup: (data) => ({
    subject: 'Welcome to the SkyBrain Beta Program!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00D4FF;">Welcome to the Future of Neurotechnology!</h2>
        <p>Hi ${data.firstName},</p>
        <p>Thank you for joining our beta program. You're now part of an exclusive community shaping the future of brain-computer interfaces.</p>
        
        <h3 style="color: #6B46FF;">What happens next:</h3>
        <ul>
          <li>You'll receive weekly technology updates and insights</li>
          <li>Access to our exclusive Discord community</li>
          <li>Early access to beta releases (Q2 2025)</li>
          <li>Invitations to virtual demos and webinars</li>
        </ul>
        
        <p><strong>Your Beta Profile:</strong></p>
        <ul>
          <li>User Type: ${data.userType}</li>
          <li>Interests: ${data.interests?.join(', ') || 'General'}</li>
          <li>Timeline: ${data.timeline || 'Not specified'}</li>
        </ul>
        
        <p>Keep an eye on your inbox for exclusive updates!</p>
        
        <p>Best regards,<br>The SkyBrain Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Neural Core Private Limited<br>
          Bangalore, India<br>
          Email: info@skybrain.in
        </p>
      </div>
    `
  }),
  
  demo: (data) => ({
    subject: 'Demo Request Confirmed - SkyBrain',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00D4FF;">Demo Request Confirmed!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your demo request and will contact you within 24 hours to schedule your personalized demonstration.</p>
        
        <h3 style="color: #6B46FF;">What to expect:</h3>
        <ul>
          <li><strong>Duration:</strong> 30-minute interactive session</li>
          <li><strong>Format:</strong> Live EEG demonstration with real-time brain data</li>
          <li><strong>Q&A:</strong> Expert discussion about your specific use case</li>
          <li><strong>Follow-up:</strong> Detailed information packet</li>
        </ul>
        
        <p><strong>Your Request Details:</strong></p>
        <ul>
          <li>Primary Interest: ${data.interest}</li>
          <li>Company: ${data.company || 'Individual'}</li>
        </ul>
        
        <p>We're excited to show you the future of neurotechnology!</p>
        
        <p>Best regards,<br>The SkyBrain Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Neural Core Private Limited<br>
          Bangalore, India<br>
          Email: info@skybrain.in
        </p>
      </div>
    `
  })
};

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
      timestamp: new Date().toISOString()
    };
    
    // Send notification email to admin
    await sendEmail(process.env.ADMIN_EMAIL, emailTemplates.contact, data);
    
    // Send auto-reply to user
    await sendEmail(data.email, autoReplyTemplates.contact, data);
    
    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
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
    
    // Send notification email to admin
    await sendEmail(process.env.ADMIN_EMAIL, emailTemplates.betaSignup, data);
    
    // Send welcome email to user
    await sendEmail(data.email, autoReplyTemplates.betaSignup, data);
    
    res.json({
      success: true,
      message: 'Welcome to the beta program! Check your email for confirmation.'
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
      timestamp: new Date().toISOString()
    };
    
    // Send notification email to admin
    await sendEmail(process.env.ADMIN_EMAIL, emailTemplates.demo, data);
    
    // Send confirmation email to user
    await sendEmail(data.email, autoReplyTemplates.demo, data);
    
    res.json({
      success: true,
      message: 'Demo request submitted! We\'ll contact you within 24 hours.'
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
    
    // Send notification email to admin
    await sendEmail(process.env.ADMIN_EMAIL, emailTemplates.newsletter, data);
    
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`SkyBrain API server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

module.exports = app;