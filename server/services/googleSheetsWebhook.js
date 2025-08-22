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
    if (!this.isConfigured) {
      console.warn('Google Apps Script not configured, skipping data logging');
      return;
    }

    try {
      // Dynamic import for node-fetch v3
      const fetch = (await import('node-fetch')).default;
      
      const payload = {
        ...userData,
        formType,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`User submission logged via webhook: ${userData.email} (${formType})`);
      
      return result;
    } catch (error) {
      console.error('Error logging to Google Sheets via webhook:', error);
      // Don't throw error - let the app continue even if logging fails
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
    if (!this.isConfigured) {
      return { success: false, message: 'Webhook URL not configured' };
    }

    try {
      // Dynamic import for node-fetch v3
      const fetch = (await import('node-fetch')).default;
      
      const testData = {
        formType: 'test',
        email: 'test@example.com',
        message: 'Connection test from SkyBrain server',
        timestamp: new Date().toISOString()
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      if (response.ok) {
        return { success: true, message: 'Webhook connection successful' };
      } else {
        return { success: false, message: `HTTP ${response.status}: ${response.statusText}` };
      }
    } catch (error) {
      return { success: false, message: `Connection failed: ${error.message}` };
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