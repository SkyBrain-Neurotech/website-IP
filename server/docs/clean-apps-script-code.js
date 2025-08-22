// SkyBrain Form Data Logger - Google Apps Script
// Replace YOUR_SPREADSHEET_ID with: 1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
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
        `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        data.email,
        data.interestArea || 'General',
        data.message || '',
        data.source || 'Website',
        formType,
        urgency,
        submissionCount
      ];
      
    case 'beta-signup':
      return [
        timestamp,
        `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        data.email,
        data.userType || 'Individual',
        data.company || 'N/A',
        data.country || 'N/A',
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
        data.name || '',
        data.email,
        data.phone || 'N/A',
        data.company || 'Individual',
        data.interest || 'General',
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

// Test function - RUN THIS ONE to test your setup
function testSetup() {
  const testData = {
    formType: 'contact',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    message: 'This is a test submission from Apps Script',
    interestArea: 'Testing'
  };
  
  const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
  const ss = SpreadsheetApp.openById(spreadsheetId);
  
  logSubmission(ss, testData);
  console.log('✅ Test submission logged successfully! Check your Google Sheet.');
}