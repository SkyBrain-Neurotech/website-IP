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
    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      return res.json({
        success: false,
        error: 'Missing Gmail credentials'
      });
    }

    // Validate form data
    const { name, email, phone, company, interest, message } = req.body;
    
    if (!name || !email || !interest) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (name, email, interest)'
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
    const adminInfo = await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: 'info@skybrain.in',
      subject: `🎯 New Demo Request from ${name} - ${interest}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #a855f7; margin-bottom: 20px;">🎯 New Demo Request</h2>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; border-left: 4px solid #8b5cf6;">
              <p><strong style="color: #a855f7;">Name:</strong> ${name}</p>
              <p><strong style="color: #a855f7;">Email:</strong> ${email}</p>
              <p><strong style="color: #a855f7;">Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong style="color: #a855f7;">Company:</strong> ${company || 'Not specified'}</p>
              <p><strong style="color: #a855f7;">Interest:</strong> ${interest}</p>
              <p><strong style="color: #a855f7;">Message:</strong><br>${message || 'None provided'}</p>
              <p><strong style="color: #a855f7;">Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    });

    // Send auto-reply to user
    const userInfo = await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: email,
      subject: 'Demo Request Confirmed - SkyBrain',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #a855f7; text-align: center; margin-bottom: 20px;">🎯 Demo Request Confirmed!</h2>
            <p style="color: #e2e8f0; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              We've received your demo request and will contact you within 24 hours to schedule your personalized demonstration of SkyBrain's revolutionary brain-computer interface technology.
            </p>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
              <p style="color: #a855f7; font-weight: 600; margin-bottom: 15px;">🚀 What to expect:</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• 30-minute interactive session</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Live EEG demonstration with real-time brain data</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Expert discussion about your specific use case</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Detailed information packet and next steps</p>
            </div>
            <p style="color: #e2e8f0; line-height: 1.6;">
              We're excited to show you the future of neurotechnology and how SkyBrain can transform your ${interest.toLowerCase()} applications!
            </p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Best regards,<br>
              <strong>The SkyBrain Team</strong>
            </p>
          </div>
        </div>
      `
    });

    // Log to Google Sheets (non-blocking)
    (async () => {
      try {
        const sheetsData = {
          formType: 'demo-request',
          name,
          email,
          phone: phone || '',
          company: company || '',
          interest,
          message: message || '',
          source: 'Contact Form',
          timestamp: new Date().toISOString()
        };

        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetsData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
      } catch (error) {
        // Google Sheets logging failed, but don't block email sending
      }
    })();

    res.json({
      success: true,
      message: 'Demo request submitted! We\'ll contact you within 24 hours.'
    });

  } catch (error) {
    console.error('Demo request error:', error);
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}