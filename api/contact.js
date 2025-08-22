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
    console.log('=== VERCEL CONTACT FORM START ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (!gmailUser || !gmailPassword) {
      console.error('Missing Gmail credentials');
      return res.json({
        success: false,
        error: 'Missing Gmail credentials'
      });
    }

    if (!googleAppsScriptUrl) {
      console.warn('Google Apps Script URL not configured - Google Sheets logging disabled');
    }

    // Validate form data
    const { firstName, lastName, email, message, interestArea } = req.body;
    
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    console.log('Email:', email);
    console.log('Interest Area:', interestArea);

    // Create transporter
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
    console.log('Email transporter verified');

    // Prepare contact data
    const contactData = {
      formType: 'contact',
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      message,
      interestArea: interestArea || '',
      source: 'website'
    };

    // Create promises array
    const promises = [];

    // Add email promises
    promises.push(
      // Admin notification email
      transporter.sendMail({
        from: `SkyBrain <${gmailUser}>`,
        to: 'info@skybrain.in',
        subject: `📧 New Contact Form: ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🧠 SKYBRAIN</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9;">Neural Intelligence Platform</p>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #a855f7; margin-bottom: 20px;">📧 New Contact Message</h2>
              <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; border-left: 4px solid #8b5cf6;">
                <p><strong style="color: #a855f7;">Name:</strong> ${firstName} ${lastName}</p>
                <p><strong style="color: #a855f7;">Email:</strong> ${email}</p>
                <p><strong style="color: #a855f7;">Interest Area:</strong> ${interestArea || 'Not specified'}</p>
                <p><strong style="color: #a855f7;">Message:</strong></p>
                <div style="background: rgba(139, 92, 246, 0.05); padding: 15px; border-radius: 4px; margin-top: 10px;">
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                <p><strong style="color: #a855f7;">Received:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        `
      })
    );

    promises.push(
      // Auto-reply email to user
      transporter.sendMail({
        from: `SkyBrain <${gmailUser}>`,
        to: email,
        subject: 'Thank you for contacting SkyBrain!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 32px;">🧠 SKYBRAIN</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Neural Intelligence Platform</p>
            </div>
            <div style="padding: 40px 30px;">
              <h2 style="color: #a855f7; text-align: center; margin-bottom: 20px;">Message Received!</h2>
              <p style="color: #e2e8f0; line-height: 1.6;">Hi ${firstName},</p>
              <p style="color: #e2e8f0; line-height: 1.6;">
                Thank you for reaching out to SkyBrain! We've received your message and our team will get back to you within 24 hours.
              </p>
              <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
                <p style="color: #a855f7; font-weight: 600; margin-bottom: 15px;">While you wait, explore:</p>
                <p style="margin: 10px 0;"><a href="https://skybrain.in/technology" style="color: #8b5cf6; text-decoration: none;">🔬 Our Technology</a></p>
                <p style="margin: 10px 0;"><a href="https://skybrain.in/applications" style="color: #8b5cf6; text-decoration: none;">🚀 Applications</a></p>
                <p style="margin: 10px 0;"><a href="https://skybrain.in/research" style="color: #8b5cf6; text-decoration: none;">📚 Latest Research</a></p>
                <p style="margin: 10px 0;"><a href="https://www.linkedin.com/company/skybrain-neurotech/" style="color: #8b5cf6; text-decoration: none;">🔗 LinkedIn Updates</a></p>
              </div>
              <p style="color: #e2e8f0; line-height: 1.6;">
                Best regards,<br>
                <strong>The SkyBrain Team</strong>
              </p>
            </div>
          </div>
        `
      })
    );

    // Add Google Sheets logging if configured
    if (googleAppsScriptUrl) {
      console.log('Adding Google Sheets logging for contact form');
      
      const fetch = (await import('node-fetch')).default;
      
      promises.push(
        fetch(googleAppsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        }).then(response => {
          if (!response.ok) {
            throw new Error(`Contact Sheets HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(result => {
          console.log('✅ Contact form logged to Google Sheets:', result);
          return { type: 'contact-sheets', success: true, result };
        }).catch(error => {
          console.error('❌ Contact sheets error:', error);
          return { type: 'contact-sheets', success: false, error: error.message };
        })
      );
    }

    // Execute all promises
    const results = await Promise.allSettled(promises);
    
    console.log('=== VERCEL CONTACT FORM RESULTS ===');
    results.forEach((result, index) => {
      const promiseType = index === 0 ? 'admin-email' : index === 1 ? 'user-email' : `promise-${index}`;
      if (result.status === 'fulfilled') {
        console.log(`✅ ${promiseType} SUCCESS:`, result.value);
      } else {
        console.error(`❌ ${promiseType} FAILED:`, result.reason);
      }
    });

    const emailResults = results.slice(0, 2);
    const failedEmails = emailResults.filter(result => result.status === 'rejected');
    
    if (failedEmails.length > 0) {
      console.error('Email delivery failed');
      return res.json({
        success: false,
        error: 'Failed to send confirmation emails',
        details: failedEmails.map(f => f.reason?.message || f.reason)
      });
    }

    console.log(`✅ Contact form processed successfully for ${email}`);
    console.log('=== VERCEL CONTACT FORM END ===');

    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('❌ Vercel contact form error:', error);
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}