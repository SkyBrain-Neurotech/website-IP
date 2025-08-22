require('dotenv').config();

class GoogleSheetsWebhookService {
  constructor() {
    this.webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    this.isConfigured = !!this.webhookUrl;
    
    if (this.isConfigured) {
      console.log('Google Apps Script webhook configured successfully');
    } else {
      console.warn('Google Apps Script webhook not configured - set GOOGLE_APPS_SCRIPT_URL in .env');
    }
  }

  async addUserSubmission(formType, userData) {
    console.log('\n' + '='.repeat(60));
    console.log('🔷 GOOGLE SHEETS WEBHOOK LOG START');
    console.log('='.repeat(60));
    console.log('📋 Form Type:', formType);
    console.log('📧 User Email:', userData.email);
    console.log('⚙️  Webhook Configured:', this.isConfigured);
    console.log('🔗 Webhook URL:', this.webhookUrl ? `${this.webhookUrl.substring(0, 50)}...` : 'NOT SET');
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    if (!this.isConfigured) {
      console.error('\n❌ GOOGLE SHEETS: Not configured - GOOGLE_APPS_SCRIPT_URL missing in .env');
      console.log('='.repeat(60));
      console.log('🔷 GOOGLE SHEETS WEBHOOK LOG END - CONFIG ERROR');
      console.log('='.repeat(60) + '\n');
      return { success: false, error: 'Not configured' };
    }

    try {
      console.log('\n🔄 GOOGLE SHEETS: Starting webhook request...');
      
      // Dynamic import for node-fetch v3
      const fetch = (await import('node-fetch')).default;
      
      // Prepare the payload with all necessary fields
      const payload = {
        formType: formType,
        timestamp: new Date().toISOString(),
        // Contact form fields
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        message: userData.message || '',
        interestArea: userData.interestArea || '',
        // Beta signup fields
        userType: userData.userType || '',
        company: userData.company || '',
        country: userData.country || '',
        interests: userData.interests || [],
        timeline: userData.timeline || '',
        useCase: userData.useCase || '',
        notifications: userData.notifications || false,
        // Demo request fields
        name: userData.name || '',
        phone: userData.phone || '',
        interest: userData.interest || '',
        // Newsletter fields
        preferences: userData.preferences || [],
        // Common fields
        source: userData.source || 'website'
      };
      
      console.log('\n📤 PAYLOAD DETAILS:');
      console.log(JSON.stringify(payload, null, 2));
      console.log('\n🌐 Sending POST request to Google Apps Script...');
      console.log('🔗 URL:', this.webhookUrl);

      const startTime = Date.now();
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        timeout: 30000 // 30 second timeout
      });
      const responseTime = Date.now() - startTime;

      console.log('\n📥 RESPONSE RECEIVED:');
      console.log('⏱️  Response Time:', `${responseTime}ms`);
      console.log('📊 Status Code:', response.status);
      console.log('📝 Status Text:', response.statusText);
      console.log('🎯 Headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

      // Get response text first
      const responseText = await response.text();
      console.log('\n📄 Raw Response Body:', responseText);

      if (!response.ok) {
        console.error('\n❌ GOOGLE SHEETS: HTTP Error!');
        console.error('Status:', response.status);
        console.error('Response Body:', responseText);
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }

      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('\n✅ PARSED RESPONSE:');
        console.log(JSON.stringify(result, null, 2));
      } catch (parseError) {
        console.warn('⚠️  Response is not valid JSON, treating as success');
        result = { success: true, rawResponse: responseText };
      }

      console.log('\n' + '='.repeat(60));
      console.log('✅ GOOGLE SHEETS: Successfully logged submission!');
      console.log(`📧 Email: ${userData.email}`);
      console.log(`📋 Form Type: ${formType}`);
      console.log(`⏱️  Total Time: ${responseTime}ms`);
      console.log('='.repeat(60));
      console.log('🔷 GOOGLE SHEETS WEBHOOK LOG END - SUCCESS');
      console.log('='.repeat(60) + '\n');
      
      return { success: true, ...result };
    } catch (error) {
      console.error('\n' + '='.repeat(60));
      console.error('❌ GOOGLE SHEETS: ERROR OCCURRED!');
      console.error('='.repeat(60));
      console.error('🔴 Error Type:', error.name);
      console.error('🔴 Error Message:', error.message);
      console.error('🔴 Error Code:', error.code);
      
      // Check for specific error types
      if (error.code === 'ECONNREFUSED') {
        console.error('🔴 Connection refused - Google Apps Script may be down');
      } else if (error.code === 'ETIMEDOUT') {
        console.error('🔴 Request timed out - Network issue or slow response');
      } else if (error.message.includes('fetch')) {
        console.error('🔴 Fetch error - Check network connectivity');
      }
      
      console.error('\n🔴 Full Error Stack:');
      console.error(error.stack);
      console.log('='.repeat(60));
      console.log('🔷 GOOGLE SHEETS WEBHOOK LOG END - ERROR');
      console.log('='.repeat(60) + '\n');
      
      // Don't throw error - let the app continue even if logging fails
      return { success: false, error: error.message, errorDetails: error };
    }
  }

  async getUserStats() {
    // Note: Stats would need to be implemented in the Apps Script if needed
    // For now, return a message indicating this feature requires Apps Script enhancement
    return {
      message: 'User stats available in your Google Spreadsheet',
      configured: this.isConfigured,
      webhookUrl: this.isConfigured ? 'Configured' : 'Not configured'
    };
  }

  async testConnection() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 GOOGLE SHEETS CONNECTION TEST START');
    console.log('='.repeat(60));
    
    if (!this.isConfigured) {
      console.error('❌ Webhook URL not configured in .env');
      console.log('='.repeat(60) + '\n');
      return { success: false, message: 'Webhook URL not configured' };
    }

    console.log('🔗 Testing connection to:', this.webhookUrl.substring(0, 50) + '...');

    try {
      // Dynamic import for node-fetch v3
      const fetch = (await import('node-fetch')).default;
      
      const testData = {
        formType: 'test',
        email: 'test@example.com',
        message: 'Connection test from SkyBrain server',
        timestamp: new Date().toISOString(),
        firstName: 'Test',
        lastName: 'User',
        source: 'connection-test'
      };

      console.log('📤 Sending test payload...');
      const startTime = Date.now();
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
        timeout: 10000 // 10 second timeout for test
      });
      
      const responseTime = Date.now() - startTime;
      console.log(`⏱️  Response received in ${responseTime}ms`);
      console.log('📊 Status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Response:', responseText);

      if (response.ok) {
        console.log('✅ Connection test SUCCESSFUL!');
        console.log('='.repeat(60) + '\n');
        return { 
          success: true, 
          message: 'Webhook connection successful',
          responseTime: `${responseTime}ms`,
          status: response.status,
          response: responseText
        };
      } else {
        console.error('❌ Connection test failed with HTTP error');
        console.log('='.repeat(60) + '\n');
        return { 
          success: false, 
          message: `HTTP ${response.status}: ${response.statusText}`,
          response: responseText
        };
      }
    } catch (error) {
      console.error('❌ Connection test failed with error:', error.message);
      console.error('Error details:', error);
      console.log('='.repeat(60) + '\n');
      return { 
        success: false, 
        message: `Connection failed: ${error.message}`,
        error: error.toString()
      };
    }
  }

  // Placeholder methods for compatibility with existing code
  async createSheetsIfNotExists() {
    if (this.isConfigured) {
      console.log('Using Google Apps Script webhook - sheets will be created automatically');
    }
  }

  async findExistingUser(email, formType) {
    // This functionality is now handled by the Apps Script
    console.log(`User lookup for ${email} handled by Apps Script`);
    return [];
  }

  async logUrgentUser(userData, formType, submissionCount) {
    // This functionality is now handled by the Apps Script
    console.log(`Urgent user logging for ${userData.email} handled by Apps Script`);
  }
}

module.exports = GoogleSheetsWebhookService;