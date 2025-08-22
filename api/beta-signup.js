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
    const { firstName, lastName, email, userType, organization, interests } = req.body;
    
    if (!firstName || !lastName || !email || !userType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
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
    await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: 'info@skybrain.in',
      subject: `🚀 New Beta Signup: ${firstName} ${lastName} (${userType})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #a855f7; margin-bottom: 20px;">🚀 New Beta Signup</h2>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; border-left: 4px solid #8b5cf6;">
              <p><strong style="color: #a855f7;">Name:</strong> ${firstName} ${lastName}</p>
              <p><strong style="color: #a855f7;">Email:</strong> ${email}</p>
              <p><strong style="color: #a855f7;">User Type:</strong> ${userType}</p>
              <p><strong style="color: #a855f7;">Organization:</strong> ${organization || 'Not specified'}</p>
              <p><strong style="color: #a855f7;">Interests:</strong> ${interests || 'Not specified'}</p>
              <p><strong style="color: #a855f7;">Signed up:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    });

    // Send welcome email to user
    await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: email,
      subject: 'Welcome to SkyBrain Beta Program!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #a855f7; text-align: center; margin-bottom: 20px;">🚀 Welcome to the Beta Program!</h2>
            <p style="color: #e2e8f0; line-height: 1.6;">Hi ${firstName},</p>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Thank you for joining the SkyBrain Beta Program! We're excited to have you as one of our early adopters exploring the future of brain-computer interface technology.
            </p>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
              <p style="color: #a855f7; font-weight: 600; margin-bottom: 15px;">What's Next:</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• You'll receive beta access within 48 hours</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Early access to new features and updates</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Direct line to our development team</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Exclusive beta community access</p>
            </div>
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
          formType: 'beta-signup',
          firstName,
          lastName,
          email,
          userType: userType || 'Individual',
          company: organization || '',
          country: '',
          interests: interests || [],
          timeline: '',
          useCase: '',
          notifications: false,
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
      message: 'Beta signup successful! Welcome to SkyBrain.'
    });

  } catch (error) {
    console.error('Beta signup error:', error);
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}