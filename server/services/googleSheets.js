const { google } = require('googleapis');
require('dotenv').config();

class GoogleSheetsService {
  constructor() {
    this.sheets = null;
    this.auth = null;
    this.spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    this.initializeAuth();
  }

  async initializeAuth() {
    try {
      // Using service account credentials
      if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        this.auth = new google.auth.JWT(
          process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          null,
          process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          ['https://www.googleapis.com/auth/spreadsheets']
        );
      } else {
        console.warn('Google Sheets credentials not configured');
        return;
      }

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      console.log('Google Sheets API initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Sheets API:', error);
    }
  }

  async addUserSubmission(formType, userData) {
    if (!this.sheets || !this.spreadsheetId) {
      console.warn('Google Sheets not configured, skipping data logging');
      return;
    }

    try {
      const sheetName = this.getSheetNameByFormType(formType);
      const timestamp = new Date().toISOString();
      const submissionData = this.formatUserData(formType, userData, timestamp);

      // Check if user already exists and get urgency level
      const existingEntries = await this.findExistingUser(userData.email, formType);
      const urgencyLevel = this.calculateUrgency(existingEntries.length);

      // Add urgency and submission count to data
      submissionData.push(urgencyLevel, existingEntries.length + 1);

      // Append to the appropriate sheet
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [submissionData]
        }
      });

      console.log(`User submission logged to ${sheetName}: ${userData.email}`);
      
      // If this is a repeat submission, log to urgency tracking
      if (existingEntries.length > 0) {
        await this.logUrgentUser(userData, formType, existingEntries.length + 1);
      }

    } catch (error) {
      console.error('Error adding user submission to Google Sheets:', error);
    }
  }

  async findExistingUser(email, formType) {
    if (!this.sheets || !this.spreadsheetId) return [];

    try {
      const sheetName = this.getSheetNameByFormType(formType);
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`
      });

      const rows = response.data.values || [];
      return rows.filter(row => row[2] === email); // Email is typically in column C (index 2)
    } catch (error) {
      console.error('Error searching for existing user:', error);
      return [];
    }
  }

  async logUrgentUser(userData, formType, submissionCount) {
    try {
      const urgentData = [
        new Date().toISOString(),
        userData.email,
        userData.firstName || userData.name || 'Unknown',
        userData.lastName || '',
        formType,
        submissionCount,
        this.calculateUrgency(submissionCount - 1),
        JSON.stringify(userData)
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Urgent_Tracking!A:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [urgentData]
        }
      });

      console.log(`Urgent user logged: ${userData.email} (${submissionCount} submissions)`);
    } catch (error) {
      console.error('Error logging urgent user:', error);
    }
  }

  formatUserData(formType, userData, timestamp) {
    const baseData = [timestamp, userData.email];

    switch (formType) {
      case 'contact':
        return [
          timestamp,
          `${userData.firstName} ${userData.lastName}`,
          userData.email,
          userData.interestArea || 'General',
          userData.message,
          userData.source || 'Website',
          formType
        ];

      case 'beta-signup':
        return [
          timestamp,
          `${userData.firstName} ${userData.lastName}`,
          userData.email,
          userData.userType || 'Individual',
          userData.company || 'N/A',
          userData.country,
          userData.interests ? userData.interests.join(', ') : 'General',
          userData.timeline || 'N/A',
          userData.useCase || 'N/A',
          userData.notifications ? 'Yes' : 'No',
          formType
        ];

      case 'demo-request':
        return [
          timestamp,
          userData.name,
          userData.email,
          userData.phone || 'N/A',
          userData.company || 'Individual',
          userData.interest,
          userData.message || 'N/A',
          userData.source || 'Website',
          formType
        ];

      case 'newsletter':
        return [
          timestamp,
          userData.email,
          userData.preferences ? userData.preferences.join(', ') : 'General',
          userData.source || 'Website',
          formType
        ];

      default:
        return [timestamp, userData.email, JSON.stringify(userData), formType];
    }
  }

  getSheetNameByFormType(formType) {
    const sheetMapping = {
      'contact': 'Contact_Forms',
      'beta-signup': 'Beta_Signups',
      'demo-request': 'Demo_Requests',
      'newsletter': 'Newsletter_Subs'
    };
    return sheetMapping[formType] || 'General_Submissions';
  }

  calculateUrgency(submissionCount) {
    if (submissionCount === 0) return 'New';
    if (submissionCount === 1) return 'Follow-up';
    if (submissionCount === 2) return 'Interested';
    if (submissionCount >= 3) return 'Urgent';
    return 'High';
  }

  async createSheetsIfNotExists() {
    if (!this.sheets || !this.spreadsheetId) {
      console.warn('Cannot create sheets - Google Sheets not configured');
      return;
    }

    try {
      const sheetNames = ['Contact_Forms', 'Beta_Signups', 'Demo_Requests', 'Newsletter_Subs', 'Urgent_Tracking'];
      const headers = {
        'Contact_Forms': ['Timestamp', 'Name', 'Email', 'Interest Area', 'Message', 'Source', 'Form Type', 'Urgency', 'Submission Count'],
        'Beta_Signups': ['Timestamp', 'Name', 'Email', 'User Type', 'Company', 'Country', 'Interests', 'Timeline', 'Use Case', 'Notifications', 'Form Type', 'Urgency', 'Submission Count'],
        'Demo_Requests': ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Interest', 'Message', 'Source', 'Form Type', 'Urgency', 'Submission Count'],
        'Newsletter_Subs': ['Timestamp', 'Email', 'Preferences', 'Source', 'Form Type', 'Urgency', 'Submission Count'],
        'Urgent_Tracking': ['Timestamp', 'Email', 'First Name', 'Last Name', 'Form Type', 'Submission Count', 'Urgency Level', 'Full Data']
      };

      // Get existing sheets
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });

      const existingSheets = spreadsheet.data.sheets.map(sheet => sheet.properties.title);

      // Create missing sheets
      for (const sheetName of sheetNames) {
        if (!existingSheets.includes(sheetName)) {
          await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            resource: {
              requests: [{
                addSheet: {
                  properties: {
                    title: sheetName
                  }
                }
              }]
            }
          });

          // Add headers
          await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `${sheetName}!A1:Z1`,
            valueInputOption: 'RAW',
            resource: {
              values: [headers[sheetName]]
            }
          });

          console.log(`Created sheet: ${sheetName}`);
        }
      }
    } catch (error) {
      console.error('Error creating sheets:', error);
    }
  }

  async getUserStats() {
    if (!this.sheets || !this.spreadsheetId) return null;

    try {
      const stats = {};
      const sheetNames = ['Contact_Forms', 'Beta_Signups', 'Demo_Requests', 'Newsletter_Subs'];

      for (const sheetName of sheetNames) {
        const response = await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: `${sheetName}!A:Z`
        });

        const rows = response.data.values || [];
        stats[sheetName] = {
          total: Math.max(0, rows.length - 1), // Subtract header row
          uniqueEmails: new Set(rows.slice(1).map(row => row[2] || row[1])).size // Get unique emails
        };
      }

      return stats;
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }
}

module.exports = GoogleSheetsService;