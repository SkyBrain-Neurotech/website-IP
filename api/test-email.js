const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Testing Gmail SMTP connection...');
    
    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      return res.json({
        success: false,
        error: 'Missing Gmail credentials',
        env: {
          hasGmailUser: !!gmailUser,
          hasGmailPassword: !!gmailPassword
        }
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword?.replace(/\s+/g, '') // Remove spaces from app password
      },
      secure: true,
      port: 465
    });

    // Test connection
    console.log('Testing SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection successful');

    // Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `SkyBrain Test <${gmailUser}>`,
      to: gmailUser, // Send to same email for testing
      subject: 'SkyBrain SMTP Test',
      html: `
        <h1>SMTP Test Successful!</h1>
        <p>This email confirms that Gmail SMTP is working correctly.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });

    console.log('Test email sent:', info.messageId);

    res.json({
      success: true,
      message: 'SMTP test successful',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('SMTP test failed:', error);
    
    res.json({
      success: false,
      error: error.message,
      code: error.code,
      details: {
        gmailUser: process.env.GMAIL_USER,
        passwordLength: process.env.GMAIL_APP_PASSWORD?.length || 0
      }
    });
  }
}