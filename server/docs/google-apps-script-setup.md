# Google Apps Script Setup (Alternative to Service Account)

Since service account key creation is disabled in your organization, we'll use Google Apps Script as a secure webhook endpoint to log form submissions.

## Overview

This approach:
- ✅ No service account keys required
- ✅ More secure than service account keys
- ✅ Same functionality for tracking users and urgency
- ✅ Uses Google's built-in authentication

## Step 1: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "SkyBrain User Submissions"
3. Keep this tab open - we'll return to it

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Name it "SkyBrain Form Logger"
4. Replace the default code with the script below

### Apps Script Code:

```javascript
// SkyBrain Form Data Logger - Google Apps Script
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your spreadsheet ID
    const ss = SpreadsheetApp.openById(spreadsheetId);
    
    // Log the submission
    logSubmission(ss, data);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data logged successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error logging submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function logSubmission(spreadsheet, data) {
  const formType = data.formType;
  const sheetName = getSheetNameByFormType(formType);
  
  // Get or create sheet
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = createSheet(spreadsheet, sheetName, formType);
  }
  
  // Check for existing user and calculate urgency
  const existingEntries = findExistingUser(sheet, data.email);
  const urgencyLevel = calculateUrgency(existingEntries.length);
  const submissionCount = existingEntries.length + 1;
  
  // Format and add data
  const rowData = formatUserData(formType, data, urgencyLevel, submissionCount);
  sheet.appendRow(rowData);
  
  // Log to urgent tracking if repeat user
  if (existingEntries.length > 0) {
    logUrgentUser(spreadsheet, data, formType, submissionCount, urgencyLevel);
  }
  
  console.log(`Logged ${formType} submission for ${data.email} (urgency: ${urgencyLevel})`);
}

function findExistingUser(sheet, email) {
  const data = sheet.getDataRange().getValues();
  return data.filter(row => row[2] === email); // Email is typically in column C
}

function calculateUrgency(submissionCount) {
  if (submissionCount === 0) return 'New';
  if (submissionCount === 1) return 'Follow-up';
  if (submissionCount === 2) return 'Interested';
  return 'Urgent';
}

function getSheetNameByFormType(formType) {
  const mapping = {
    'contact': 'Contact_Forms',
    'beta-signup': 'Beta_Signups',
    'demo-request': 'Demo_Requests',
    'newsletter': 'Newsletter_Subs'
  };
  return mapping[formType] || 'General_Submissions';
}

function createSheet(spreadsheet, sheetName, formType) {
  const sheet = spreadsheet.insertSheet(sheetName);
  
  const headers = getHeadersByFormType(formType);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  
  return sheet;
}

function getHeadersByFormType(formType) {
  const headers = {
    'contact': ['Timestamp', 'Name', 'Email', 'Interest Area', 'Message', 'Source', 'Form Type', 'Urgency', 'Submission Count'],
    'beta-signup': ['Timestamp', 'Name', 'Email', 'User Type', 'Company', 'Country', 'Interests', 'Timeline', 'Use Case', 'Notifications', 'Form Type', 'Urgency', 'Submission Count'],
    'demo-request': ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Interest', 'Message', 'Source', 'Form Type', 'Urgency', 'Submission Count'],
    'newsletter': ['Timestamp', 'Email', 'Preferences', 'Source', 'Form Type', 'Urgency', 'Submission Count']
  };
  return headers[formType] || ['Timestamp', 'Email', 'Data', 'Form Type', 'Urgency', 'Submission Count'];
}

function formatUserData(formType, data, urgency, submissionCount) {
  const timestamp = new Date().toISOString();
  
  switch (formType) {
    case 'contact':
      return [
        timestamp,
        `${data.firstName} ${data.lastName}`,
        data.email,
        data.interestArea || 'General',
        data.message,
        data.source || 'Website',
        formType,
        urgency,
        submissionCount
      ];
      
    case 'beta-signup':
      return [
        timestamp,
        `${data.firstName} ${data.lastName}`,
        data.email,
        data.userType || 'Individual',
        data.company || 'N/A',
        data.country,
        Array.isArray(data.interests) ? data.interests.join(', ') : 'General',
        data.timeline || 'N/A',
        data.useCase || 'N/A',
        data.notifications ? 'Yes' : 'No',
        formType,
        urgency,
        submissionCount
      ];
      
    case 'demo-request':
      return [
        timestamp,
        data.name,
        data.email,
        data.phone || 'N/A',
        data.company || 'Individual',
        data.interest,
        data.message || 'N/A',
        data.source || 'Website',
        formType,
        urgency,
        submissionCount
      ];
      
    case 'newsletter':
      return [
        timestamp,
        data.email,
        Array.isArray(data.preferences) ? data.preferences.join(', ') : 'General',
        data.source || 'Website',
        formType,
        urgency,
        submissionCount
      ];
      
    default:
      return [timestamp, data.email, JSON.stringify(data), formType, urgency, submissionCount];
  }
}

function logUrgentUser(spreadsheet, data, formType, submissionCount, urgencyLevel) {
  let urgentSheet = spreadsheet.getSheetByName('Urgent_Tracking');
  if (!urgentSheet) {
    urgentSheet = spreadsheet.insertSheet('Urgent_Tracking');
    const headers = ['Timestamp', 'Email', 'First Name', 'Last Name', 'Form Type', 'Submission Count', 'Urgency Level', 'Full Data'];
    urgentSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header
    const headerRange = urgentSheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#ea4335');
    headerRange.setFontColor('#ffffff');
  }
  
  const urgentData = [
    new Date().toISOString(),
    data.email,
    data.firstName || data.name || 'Unknown',
    data.lastName || '',
    formType,
    submissionCount,
    urgencyLevel,
    JSON.stringify(data)
  ];
  
  urgentSheet.appendRow(urgentData);
}

// Test function to verify setup
function testSetup() {
  const testData = {
    formType: 'contact',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    message: 'This is a test submission',
    interestArea: 'Testing'
  };
  
  const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your spreadsheet ID
  const ss = SpreadsheetApp.openById(spreadsheetId);
  
  logSubmission(ss, testData);
  console.log('Test submission logged successfully');
}
```

## Step 3: Configure the Script

1. **Replace Spreadsheet ID**: 
   - In your Google Sheets URL, copy the ID: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Replace `YOUR_SPREADSHEET_ID_HERE` in the script with your actual spreadsheet ID

2. **Save the project**: Press `Ctrl+S` and name it "SkyBrain Form Logger"

## Step 4: Deploy as Web App

1. Click "Deploy" > "New Deployment"
2. Choose "Web app" as the type
3. Set these options:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. **Copy the Web App URL** - you'll need this for your server configuration

## Step 5: Test the Setup

1. In Apps Script, run the `testSetup` function:
   - Select `testSetup` from the function dropdown
   - Click the "Run" button
   - Authorize permissions when prompted
2. Check your Google Sheet for the test data

## Step 6: Update Your Server Configuration

Add this to your `.env` file instead of Google Sheets API credentials:

```env
# Google Apps Script Webhook (replaces Google Sheets API)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 7: Update Server Code

Replace the Google Sheets service with a simple HTTP webhook:

```javascript
// In your contact.js, replace googleSheetsService.addUserSubmission calls with:
async function logToGoogleSheets(formType, data) {
  if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
    console.warn('Google Apps Script URL not configured, skipping data logging');
    return;
  }

  try {
    const payload = { ...data, formType };
    
    const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    console.log('Data logged to Google Sheets:', result);
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
  }
}

// Replace calls like:
// await googleSheetsService.addUserSubmission('contact', data);
// with:
// await logToGoogleSheets('contact', data);
```

## Benefits of This Approach

✅ **More Secure**: No service account keys to manage  
✅ **Organization Compliant**: Works within your security policies  
✅ **Same Functionality**: User tracking, urgency detection, grouping  
✅ **Easy Management**: All code visible and editable in Apps Script  
✅ **Built-in Authentication**: Uses your Google account permissions  

## Troubleshooting

- **Permission denied**: Make sure to authorize the script when first running
- **Spreadsheet not found**: Verify the spreadsheet ID is correct
- **Webhook not responding**: Check the deployment URL and ensure it's set to "Anyone" access

This approach gives you the same user tracking and urgency management capabilities while staying compliant with your organization's security policies!