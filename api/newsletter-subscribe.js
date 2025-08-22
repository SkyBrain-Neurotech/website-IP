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
    console.log('=== VERCEL NEWSLETTER SIGNUP START ===');
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
    const { email, firstName, lastName, preferences, source } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log('Email:', email);
    console.log('Preferences:', preferences);
    console.log('Source:', source);

    // Create transporter
    const transporter = nodemailer.createTransporter({
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

    // Prepare newsletter data
    const newsletterData = {
      formType: 'newsletter',
      timestamp: new Date().toISOString(),
      firstName: firstName || '',
      lastName: lastName || '',
      email,
      preferences: preferences || ['technology_updates'],
      source: source || 'website'
    };

    // Create promises array
    const promises = [];

    // Add email promises
    promises.push(
      // Admin notification email
      transporter.sendMail({
        from: `SkyBrain <${gmailUser}>`,
        to: 'info@skybrain.in',
        subject: `📧 New Newsletter Subscription: ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: white; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a855f7 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🧠 SKYBRAIN</h1>
              <p style="margin: 8px 0 0 0; opacity: 0.9;">Neural Intelligence Platform</p>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #a855f7; margin-bottom: 20px;">📧 New Newsletter Subscription</h2>
              <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; border-left: 4px solid #8b5cf6;">
                <p><strong style="color: #a855f7;">Email:</strong> ${email}</p>
                <p><strong style="color: #a855f7;">Name:</strong> ${firstName || 'Not provided'} ${lastName || ''}</p>
                <p><strong style="color: #a855f7;">Preferences:</strong> ${preferences ? preferences.join(', ') : 'Default'}</p>
                <p><strong style="color: #a855f7;">Source:</strong> ${source || 'website'}</p>
                <p><strong style="color: #a855f7;">Subscribed:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        `
      })
    );

    promises.push(
      // Welcome email to subscriber
      transporter.sendMail({
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
              <h2 style="color: #a855f7; text-align: center; margin-bottom: 20px;">📧 Welcome to Our Newsletter!</h2>
              <p style="color: #e2e8f0; line-height: 1.6;">Hi${firstName ? ` ${firstName}` : ''},</p>
              <p style="color: #e2e8f0; line-height: 1.6;">
                Thank you for subscribing to the SkyBrain newsletter! You're now part of our community exploring the future of brain-computer interface technology.
              </p>
              <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
                <p style="color: #a855f7; font-weight: 600; margin-bottom: 15px;">What to Expect:</p>
                <p style="margin: 10px 0; color: #e2e8f0;">• Latest breakthroughs in neurotechnology</p>
                <p style="margin: 10px 0; color: #e2e8f0;">• Early access to research findings</p>
                <p style="margin: 10px 0; color: #e2e8f0;">• Beta program announcements</p>
                <p style="margin: 10px 0; color: #e2e8f0;">• Industry insights and future trends</p>
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
      console.log('Adding Google Sheets logging for newsletter subscription');
      
      const fetch = (await import('node-fetch')).default;
      
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
          console.log('✅ Newsletter subscription logged to Google Sheets:', result);
          return { type: 'newsletter-sheets', success: true, result };
        }).catch(error => {
          console.error('❌ Newsletter sheets error:', error);
          return { type: 'newsletter-sheets', success: false, error: error.message };
        })
      );
    }

    // Execute all promises
    const results = await Promise.allSettled(promises);
    
    console.log('=== VERCEL NEWSLETTER SIGNUP RESULTS ===');
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

    console.log(`✅ Newsletter subscription processed successfully for ${email}`);
    console.log('=== VERCEL NEWSLETTER SIGNUP END ===');

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('❌ Vercel newsletter signup error:', error);
    res.json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}