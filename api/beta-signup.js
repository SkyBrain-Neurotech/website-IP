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
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (!gmailUser || !gmailPassword) {
      return res.json({
        success: false,
        error: 'Missing Gmail credentials'
      });
    }

    // Validate form data
    const { 
      firstName, 
      lastName, 
      email, 
      userType,
      company,
      country,
      interests,
      timeline,
      useCase,
      notifications 
    } = req.body;
    
    if (!firstName || !lastName || !email || !userType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

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

    // Prepare beta signup data
    const betaData = {
      formType: 'beta-signup',
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      userType,
      company: company || '',
      country: country || '',
      interests: interests || [],
      timeline: timeline || '',
      useCase: useCase || '',
      notifications: notifications || false,
      source: 'website'
    };

    // Prepare newsletter data if notifications checkbox is checked
    const newsletterData = notifications ? {
      formType: 'newsletter',
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      userType,
      company: company || '',
      country: country || '',
      interests: interests || [],
      preferences: ['technology_updates', 'beta_releases'],
      source: 'beta-signup-checkbox'
    } : null;

    // Create promises array
    const promises = [];

    // Add email promises
    promises.push(
      // Admin notification email
      transporter.sendMail({
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
                <p><strong style="color: #a855f7;">Company:</strong> ${company || 'Not specified'}</p>
                <p><strong style="color: #a855f7;">Country:</strong> ${country || 'Not specified'}</p>
                <p><strong style="color: #a855f7;">Interests:</strong> ${interests ? interests.join(', ') : 'Not specified'}</p>
                <p><strong style="color: #a855f7;">Timeline:</strong> ${timeline || 'Not specified'}</p>
                <p><strong style="color: #a855f7;">Use Case:</strong> ${useCase || 'Not specified'}</p>
                <p><strong style="color: #a855f7;">Newsletter:</strong> ${notifications ? 'Yes' : 'No'}</p>
                <p><strong style="color: #a855f7;">Signed up:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        `
      })
    );

    promises.push(
      // Welcome email to user
      transporter.sendMail({
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
                ${notifications ? '<p style="margin: 10px 0; color: #e2e8f0;">• Technology updates and beta release notifications</p>' : ''}
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

    // Add Google Sheets promises if configured
    if (googleAppsScriptUrl) {
      const fetch = (await import('node-fetch')).default;
      
      // Add beta signup to Google Sheets
      promises.push(
        fetch(googleAppsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(betaData)
        }).then(response => {
          if (!response.ok) {
            throw new Error(`Beta Sheets HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(result => {
          return { type: 'beta-sheets', success: true, result };
        }).catch(error => {
          return { type: 'beta-sheets', success: false, error: error.message };
        })
      );

      // Add newsletter subscription if enabled
      if (newsletterData) {
        promises.push(
          fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newsletterData)
          }).then(response => {
            if (!response.ok) {
              throw new Error(`Newsletter Sheets HTTP error! status: ${response.status}`);
            }
            return response.json();
          }).then(result => {
            return { type: 'newsletter-sheets', success: true, result };
          }).catch(error => {
            return { type: 'newsletter-sheets', success: false, error: error.message };
          })
        );
      }
    }

    // Execute all promises
    const results = await Promise.allSettled(promises);
    
    const emailResults = results.slice(0, 2);
    const failedEmails = emailResults.filter(result => result.status === 'rejected');
    
    if (failedEmails.length > 0) {
      return res.json({
        success: false,
        error: 'Failed to send confirmation emails',
        details: failedEmails.map(f => f.reason?.message || f.reason)
      });
    }

    res.json({
      success: true,
      message: 'Welcome to the beta program! Check your email for confirmation.'
    });

  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}