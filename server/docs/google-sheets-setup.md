# Google Sheets API Setup Guide

This guide will help you set up Google Sheets API integration to automatically track and organize user form submissions from your SkyBrain website.

## Overview

The integration automatically:
- ✅ Logs all form submissions to organized Google Sheets
- ✅ Tracks duplicate users and calculates urgency levels
- ✅ Groups submissions by form type (Contact, Beta Signup, Demo Request, Newsletter)
- ✅ Provides urgency tracking for users who submit multiple times
- ✅ Maintains detailed analytics and user statistics

## Prerequisites

- Google account with access to Google Cloud Console
- A Google Spreadsheet where you want to store the data
- Basic understanding of environment variables

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Note down your project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - **Name**: `skybrain-sheets-service`
   - **ID**: `skybrain-sheets-service` (auto-generated)
   - **Description**: `Service account for SkyBrain form data logging`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. In the Credentials page, click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format and click "Create"
5. **Important**: Save this JSON file securely - you'll need it for configuration

## Step 5: Create Your Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "SkyBrain User Submissions"
4. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

## Step 6: Share Spreadsheet with Service Account

1. Open your Google Spreadsheet
2. Click the "Share" button
3. Add the service account email (found in your JSON key file as `client_email`)
4. Give it "Editor" permissions
5. Click "Send"

## Step 7: Configure Environment Variables

Add these variables to your `.env` file in the server directory:

```env
# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
```

### Important Notes for Environment Variables:

1. **GOOGLE_SPREADSHEET_ID**: Copy from your spreadsheet URL
2. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: Found in your JSON key file as `client_email`
3. **GOOGLE_PRIVATE_KEY**: Copy the entire `private_key` value from JSON file (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

### Example .env Setup:

```env
# Existing variables...
GMAIL_USER=your-gmail@example.com
GMAIL_APP_PASSWORD=your-app-password
ADMIN_EMAIL=admin@skybrain.in
FRONTEND_URL=http://localhost:8080

# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
GOOGLE_SERVICE_ACCOUNT_EMAIL=skybrain-sheets-service@your-project-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----"
```

## Step 8: Verify Setup

1. Start your server:
   ```bash
   npm run dev
   ```

2. Check the console logs for:
   ```
   Google Sheets API initialized successfully
   Created sheet: Contact_Forms
   Created sheet: Beta_Signups
   Created sheet: Demo_Requests
   Created sheet: Newsletter_Subs
   Created sheet: Urgent_Tracking
   ```

3. Test a form submission and verify data appears in your Google Sheets

## Sheet Structure

The integration creates 5 sheets automatically:

### 1. Contact_Forms
- Timestamp, Name, Email, Interest Area, Message, Source, Form Type, Urgency, Submission Count

### 2. Beta_Signups
- Timestamp, Name, Email, User Type, Company, Country, Interests, Timeline, Use Case, Notifications, Form Type, Urgency, Submission Count

### 3. Demo_Requests
- Timestamp, Name, Email, Phone, Company, Interest, Message, Source, Form Type, Urgency, Submission Count

### 4. Newsletter_Subs
- Timestamp, Email, Preferences, Source, Form Type, Urgency, Submission Count

### 5. Urgent_Tracking
- Timestamp, Email, First Name, Last Name, Form Type, Submission Count, Urgency Level, Full Data

## Urgency Levels

The system automatically calculates urgency based on submission count:

- **New**: First submission (0 previous submissions)
- **Follow-up**: Second submission (1 previous submission)
- **Interested**: Third submission (2 previous submissions)
- **Urgent**: Fourth+ submission (3+ previous submissions)

## API Endpoints

### Get User Statistics
```
GET /api/stats
```

Returns submission counts and unique users for each form type.

### Health Check
```
GET /api/health
```

Returns server status and timestamp.

## Troubleshooting

### Common Issues:

1. **"Google Sheets not configured" message**
   - Check your environment variables are set correctly
   - Verify the spreadsheet ID is correct
   - Ensure service account has access to the spreadsheet

2. **Authentication errors**
   - Verify the private key format (should include `\n` for line breaks)
   - Check the service account email is correct
   - Ensure the service account has been shared with your spreadsheet

3. **Permission denied errors**
   - Make sure you shared the spreadsheet with the service account email
   - Verify the service account has "Editor" permissions

4. **Sheets not being created**
   - Check Google Sheets API is enabled in your Google Cloud project
   - Verify your service account has the necessary permissions

### Testing the Integration:

1. Submit a test form through your website
2. Check the console logs for any errors
3. Verify data appears in the appropriate Google Sheet
4. Test submitting multiple times with the same email to see urgency tracking

## Security Considerations

- ✅ Keep your service account JSON file secure and never commit it to version control
- ✅ Use environment variables for all sensitive data
- ✅ Regularly rotate your service account keys
- ✅ Monitor access to your Google Spreadsheet
- ✅ Consider setting up alerts for unusual activity

## Data Privacy

- The system logs user submission data to help track engagement and urgency
- All data is stored in your private Google Spreadsheet
- No data is shared with third parties
- Users' email addresses are used only for tracking duplicate submissions

---

## Support

If you encounter issues:

1. Check the server console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test API endpoints using tools like Postman or curl
4. Ensure your Google Cloud project has the necessary APIs enabled

The integration is designed to fail gracefully - if Google Sheets is not configured, the mail system will continue to work normally.