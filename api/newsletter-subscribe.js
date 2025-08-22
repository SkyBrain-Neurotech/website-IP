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
    const { email, preferences = ['general'] } = req.body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: 'info@skybrain.in',
      subject: `📧 Newsletter Subscription: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #a855f7; margin-bottom: 20px;">📧 New Newsletter Subscriber</h2>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; border-left: 4px solid #8b5cf6;">
              <p><strong style="color: #a855f7;">Email:</strong> ${email}</p>
              <p><strong style="color: #a855f7;">Preferences:</strong> ${preferences.join(', ')}</p>
              <p><strong style="color: #a855f7;">Subscribed:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    });

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: `SkyBrain <${gmailUser}>`,
      to: email,
      subject: 'Welcome to SkyBrain Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px;">🧠 SKYBRAIN</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Neural Intelligence Platform</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #a855f7; text-align: center; margin-bottom: 20px;">📧 Welcome to our Newsletter!</h2>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Thank you for subscribing to SkyBrain's newsletter! You'll now receive the latest updates on brain-computer interface technology, research breakthroughs, and company news.
            </p>
            <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
              <p style="color: #a855f7; font-weight: 600; margin-bottom: 15px;">📬 What you'll receive:</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Latest research and technology updates</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Product announcements and beta access</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Industry insights and thought leadership</p>
              <p style="margin: 10px 0; color: #e2e8f0;">• Exclusive event invitations</p>
            </div>
            <p style="color: #e2e8f0; line-height: 1.6;">
              Stay tuned for exciting developments in the world of neurotechnology!
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
    try {
      const sheetsData = {
        formType: 'newsletter',
        email,
        preferences: preferences || [],
        source: 'Website',
        timestamp: new Date().toISOString()
      };

      fetch('https://script.google.com/macros/s/AKfycbyE-yOwMZ57AVujhm4I3ySGB5p3Ppco23j21szhjrQIi73TWza4h9RWcNPDAQQZCn0xpQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetsData)
      }).catch(() => {
        // Silently fail if Google Sheets logging fails - don't block email sending
      });
    } catch (error) {
      // Silently fail - Google Sheets logging is optional
    }

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}