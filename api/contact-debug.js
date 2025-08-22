const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // LOG EVERYTHING for debugging
    console.log('=== CONTACT FORM DEBUG ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request method:', req.method);
    
    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      return res.json({
        success: false,
        error: 'Missing Gmail credentials',
        debug: {
          hasGmailUser: !!gmailUser,
          hasGmailPassword: !!gmailPassword,
          requestBody: req.body
        }
      });
    }

    // Validate form data
    const { firstName, lastName, email, message, interestArea } = req.body;
    
    console.log('Extracted fields:', {
      firstName,
      lastName, 
      email,
      message,
      interestArea
    });
    
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        debug: {
          received: { firstName, lastName, email, message, interestArea },
          missing: {
            firstName: !firstName,
            lastName: !lastName,
            email: !email,
            message: !message
          }
        }
      });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }

    // Create transporter (EXACT same as working test-email)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword?.replace(/\s+/g, '')
      },
      secure: true,
      port: 465
    });

    // Test connection
    await transporter.verify();

    // Send admin notification email
    const adminResult = await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: 'info@skybrain.in',
      subject: `🧠 New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #a855f7; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; border-left: 4px solid #8b5cf6;">
              <p><strong style="color: #a855f7;">Name:</strong> ${firstName} ${lastName}</p>
              <p><strong style="color: #a855f7;">Email:</strong> ${email}</p>
              <p><strong style="color: #a855f7;">Interest Area:</strong> ${interestArea || 'Not specified'}</p>
              <p><strong style="color: #a855f7;">Message:</strong><br>${message}</p>
              <p><strong style="color: #a855f7;">Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    });

    // Send auto-reply to user
    const userResult = await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: email,
      subject: 'Thank you for contacting SkyBrain',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #a855f7; text-align: center; margin-bottom: 20px;">Thank you for reaching out!</h2>
            <p style="color: #e2e8f0; line-height: 1.6;">Hi ${firstName},</p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              We've received your message and will get back to you within 24 hours. Our team is excited to discuss how SkyBrain's advanced brain-computer interface technology can help with your ${interestArea || 'inquiry'}.
            </p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Best regards,<br>
              <strong>The SkyBrain Team</strong>
            </p>
          </div>
        </div>
      `
    });

    console.log('Emails sent successfully:', {
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId
    });

    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      debug: {
        timestamp: new Date().toISOString(),
        adminMessageId: adminResult.messageId,
        userMessageId: userResult.messageId,
        fieldsReceived: { firstName, lastName, email, message, interestArea }
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.json({
      success: false,
      error: error.message,
      code: error.code,
      stack: error.stack
    });
  }
}