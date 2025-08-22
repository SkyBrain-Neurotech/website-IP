// CORRECTED TIME VERSION - SkyBrain Form Data Logger - Google Apps Script
// Fixed IST timestamp conversion - DEPLOY THIS VERSION

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'No data received'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    console.log('📨 Received:', data.formType, 'from', data.email);
    
    const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
    const ss = SpreadsheetApp.openById(spreadsheetId);
    
    // Process the submission
    const result = processSubmission(ss, data);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Data logged successfully',
        urgency: result.urgency,
        submissionCount: result.submissionCount,
        timestamp: result.timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function processSubmission(spreadsheet, data) {
  // Create CORRECT IST timestamp
  const istTime = getCurrentISTTime();
  
  // Get the appropriate sheet
  const sheetName = getSheetName(data.formType);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = createNewSheet(spreadsheet, sheetName, data.formType);
  }
  
  // Check for existing submissions from this email
  const existingCount = countExistingSubmissions(sheet, data.email);
  const urgency = calculateUrgency(existingCount);
  const submissionCount = existingCount + 1;
  
  // Create the row data
  const rowData = createRowData(data, istTime, urgency, submissionCount);
  
  // Insert at row 2 (newest first)
  sheet.insertRowBefore(2);
  sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
  
  // Apply formatting
  formatRow(sheet, 2, urgency, rowData.length);
  
  // Log urgent users separately
  if (submissionCount > 1) {
    logUrgentUser(spreadsheet, data, istTime, urgency, submissionCount);
  }
  
  // Update dashboard
  updateDashboard(spreadsheet, istTime);
  
  console.log(`✅ Logged: ${data.formType} - ${data.email} (${urgency}, count: ${submissionCount})`);
  
  return {
    urgency: urgency,
    submissionCount: submissionCount,
    timestamp: istTime
  };
}

function getCurrentISTTime() {
  // CORRECTED: Use Google Apps Script's built-in timezone conversion
  const now = new Date();
  
  // Method 1: Use Utilities.formatDate with IST timezone
  const istFormatted = Utilities.formatDate(now, 'Asia/Kolkata', 'MMM dd, yyyy, hh:mm a');
  
  return istFormatted;
}

function getSheetName(formType) {
  const sheetNames = {
    'contact': 'Contact_Forms',
    'beta-signup': 'Beta_Signups', 
    'demo-request': 'Demo_Requests',
    'newsletter': 'Newsletter_Subs'
  };
  return sheetNames[formType] || 'General_Submissions';
}

function createNewSheet(spreadsheet, sheetName, formType) {
  console.log('Creating new sheet:', sheetName);
  
  const sheet = spreadsheet.insertSheet(sheetName);
  
  // Create headers based on form type
  const headers = getHeaders(formType);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setBackground(getHeaderColor(formType));
  headerRange.setFontColor('#ffffff');
  headerRange.setBorder(true, true, true, true, true, true);
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths
  setColumnWidths(sheet, formType);
  
  // Freeze header
  sheet.setFrozenRows(1);
  
  return sheet;
}

function getHeaders(formType) {
  switch (formType) {
    case 'contact':
      return [
        '📅 Timestamp (IST)', '👤 Name', '📧 Email', '🎯 Interest Area', 
        '💬 Message', '🌐 Source', '🚨 Urgency', '🔢 Count', '📍 Country'
      ];
    case 'beta-signup':
      return [
        '📅 Timestamp (IST)', '👤 Name', '📧 Email', '👔 User Type', 
        '🏢 Company', '🌍 Country', '🎯 Interests', '⏰ Timeline', 
        '💼 Use Case', '🔔 Notifications', '🚨 Urgency', '🔢 Count'
      ];
    case 'demo-request':
      return [
        '📅 Timestamp (IST)', '👤 Name', '📧 Email', '📞 Phone', 
        '🏢 Company', '🎯 Interest', '💬 Message', '🌐 Source', 
        '🚨 Urgency', '🔢 Count'
      ];
    case 'newsletter':
      return [
        '📅 Timestamp (IST)', '📧 Email', '⚙️ Preferences', 
        '🌐 Source', '🚨 Urgency', '🔢 Count'
      ];
    default:
      return ['📅 Timestamp (IST)', '📧 Email', '📊 Data', '🚨 Urgency', '🔢 Count'];
  }
}

function getHeaderColor(formType) {
  const colors = {
    'contact': '#4285f4',
    'beta-signup': '#34a853',
    'demo-request': '#ea4335',
    'newsletter': '#9c27b0'
  };
  return colors[formType] || '#4285f4';
}

function setColumnWidths(sheet, formType) {
  const widths = {
    'contact': [180, 200, 280, 150, 350, 120, 100, 80, 120],
    'beta-signup': [180, 200, 280, 120, 200, 120, 200, 120, 250, 100, 100, 80],
    'demo-request': [180, 200, 280, 150, 200, 150, 350, 120, 100, 80],
    'newsletter': [180, 280, 200, 120, 100, 80]
  };
  
  const columnWidths = widths[formType] || [180, 280, 350, 100, 80];
  
  columnWidths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
}

function countExistingSubmissions(sheet, email) {
  if (sheet.getLastRow() <= 1) return 0;
  
  const data = sheet.getDataRange().getValues();
  let count = 0;
  
  // Start from row 2 (skip header), check email column (usually index 2)
  for (let i = 1; i < data.length; i++) {
    if (data[i][2] === email) { // Email is in column C (index 2)
      count++;
    }
  }
  
  return count;
}

function calculateUrgency(existingCount) {
  if (existingCount === 0) return 'New';
  if (existingCount === 1) return 'Follow-up';  
  if (existingCount === 2) return 'Interested';
  return 'Urgent';
}

function createRowData(data, timestamp, urgency, count) {
  switch (data.formType) {
    case 'contact':
      return [
        timestamp,
        `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown',
        data.email || 'unknown@email.com',
        data.interestArea || 'General',
        data.message || 'No message',
        data.source || 'Website',
        urgency,
        count,
        data.country || 'Unknown'
      ];
      
    case 'beta-signup':
      return [
        timestamp,
        `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown',
        data.email || 'unknown@email.com',
        data.userType || 'Individual',
        data.company || 'N/A',
        data.country || 'Unknown',
        Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || 'General'),
        data.timeline || 'Not specified',
        data.useCase || 'Not specified',
        data.notifications ? '✅ Yes' : '❌ No',
        urgency,
        count
      ];
      
    case 'demo-request':
      return [
        timestamp,
        data.name || 'Unknown',
        data.email || 'unknown@email.com',
        data.phone || 'Not provided',
        data.company || 'Individual',
        data.interest || 'General',
        data.message || 'No message',
        data.source || 'Website',
        urgency,
        count
      ];
      
    case 'newsletter':
      return [
        timestamp,
        data.email || 'unknown@email.com',
        Array.isArray(data.preferences) ? data.preferences.join(', ') : (data.preferences || 'General'),
        data.source || 'Website',
        urgency,
        count
      ];
      
    default:
      return [
        timestamp,
        data.email || 'unknown@email.com',
        JSON.stringify(data),
        urgency,
        count
      ];
  }
}

function formatRow(sheet, rowIndex, urgency, numColumns) {
  const range = sheet.getRange(rowIndex, 1, 1, numColumns);
  
  switch (urgency) {
    case 'Urgent':
      range.setBackground('#fce8e6');
      range.setFontWeight('bold');
      break;
    case 'Interested':
      range.setBackground('#fff3e0');
      break;
    case 'Follow-up':
      range.setBackground('#fffbf0');
      break;
    default: // New
      range.setBackground('#ffffff');
  }
  
  range.setBorder(null, null, true, null, null, null, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
}

function logUrgentUser(spreadsheet, data, timestamp, urgency, count) {
  let urgentSheet = spreadsheet.getSheetByName('🚨 Urgent_Tracking');
  
  if (!urgentSheet) {
    urgentSheet = createUrgentSheet(spreadsheet);
  }
  
  const urgentData = [
    timestamp,
    data.email || 'unknown@email.com',
    data.firstName || data.name || 'Unknown',
    data.lastName || '',
    data.formType.toUpperCase(),
    count,
    urgency,
    JSON.stringify(data)
  ];
  
  urgentSheet.insertRowBefore(2);
  urgentSheet.getRange(2, 1, 1, urgentData.length).setValues([urgentData]);
  
  const range = urgentSheet.getRange(2, 1, 1, urgentData.length);
  if (urgency === 'Urgent') {
    range.setBackground('#fce8e6');
    range.setFontWeight('bold');
  } else {
    range.setBackground('#fff3e0');
  }
}

function createUrgentSheet(spreadsheet) {
  const sheet = spreadsheet.insertSheet('🚨 Urgent_Tracking');
  const headers = [
    '📅 Timestamp (IST)', '📧 Email', '👤 First Name', '👤 Last Name', 
    '📋 Form Type', '🔢 Count', '🚨 Urgency', '📊 Raw Data'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setBackground('#ea4335');
  headerRange.setFontColor('#ffffff');
  headerRange.setBorder(true, true, true, true, true, true);
  headerRange.setHorizontalAlignment('center');
  
  const widths = [180, 280, 150, 150, 120, 80, 100, 350];
  widths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
  
  sheet.setFrozenRows(1);
  return sheet;
}

function updateDashboard(spreadsheet, timestamp) {
  let dashboardSheet = spreadsheet.getSheetByName('📊 Dashboard');
  
  if (!dashboardSheet) {
    dashboardSheet = createDashboard(spreadsheet);
  }
  
  // Count submissions by type
  const sheets = spreadsheet.getSheets();
  let contactCount = 0, betaCount = 0, demoCount = 0, newsletterCount = 0, urgentCount = 0;
  
  sheets.forEach(sheet => {
    const name = sheet.getName();
    const count = Math.max(0, sheet.getLastRow() - 1); // Subtract header
    
    switch (name) {
      case 'Contact_Forms': contactCount = count; break;
      case 'Beta_Signups': betaCount = count; break;
      case 'Demo_Requests': demoCount = count; break;
      case 'Newsletter_Subs': newsletterCount = count; break;
      case '🚨 Urgent_Tracking': urgentCount = count; break;
    }
  });
  
  // Update dashboard values
  dashboardSheet.getRange('B3').setValue(contactCount);
  dashboardSheet.getRange('B4').setValue(betaCount);
  dashboardSheet.getRange('B5').setValue(demoCount);
  dashboardSheet.getRange('B6').setValue(newsletterCount);
  dashboardSheet.getRange('B7').setValue(urgentCount);
  dashboardSheet.getRange('B1').setValue(`Last Updated: ${timestamp}`);
}

function createDashboard(spreadsheet) {
  const sheet = spreadsheet.insertSheet('📊 Dashboard', 0);
  
  const dashboardData = [
    ['📊 SkyBrain User Submissions Dashboard', ''],
    ['Last Updated:', 'Initializing...'],
    ['📞 Contact Forms', 0],
    ['🚀 Beta Signups', 0],
    ['🎯 Demo Requests', 0],
    ['📧 Newsletter Subs', 0],
    ['🚨 Urgent Users', 0],
    ['', ''],
    ['📈 Quick Stats', ''],
    ['Total Submissions', '=SUM(B3:B6)'],
    ['Conversion Rate', '=IF(B3>0,ROUND(B4/B3*100,1)&"%","0%")'],
    ['Urgent Rate', '=IF(B10>0,ROUND(B7/B10*100,1)&"%","0%")']
  ];
  
  sheet.getRange(1, 1, dashboardData.length, 2).setValues(dashboardData);
  
  // Formatting
  sheet.getRange('A1:B1').merge();
  sheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1').setBackground('#4285f4').setFontColor('#ffffff');
  
  sheet.getRange('A3:A7').setFontWeight('bold');
  sheet.getRange('B3:B7').setHorizontalAlignment('center');
  sheet.getRange('A9').setFontWeight('bold').setFontSize(12);
  sheet.getRange('A10:A12').setFontWeight('bold');
  
  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 120);
  
  return sheet;
}

// Test function to verify the correct time
function testTimeFunction() {
  const currentIST = getCurrentISTTime();
  console.log('Current IST Time:', currentIST);
  
  // Also show what time Google Apps Script thinks it is
  const now = new Date();
  console.log('UTC Time:', now.toISOString());
  console.log('Apps Script Timezone:', now.toString());
  
  // Test with Utilities.formatDate
  const istViaUtilities = Utilities.formatDate(now, 'Asia/Kolkata', 'MMM dd, yyyy, hh:mm a');
  console.log('IST via Utilities.formatDate:', istViaUtilities);
  
  return currentIST;
}

// Test function for full submission
function testCorrectTimeSubmission() {
  const testData = {
    formType: 'contact',
    firstName: 'Time',
    lastName: 'Test',
    email: 'time.test@example.com',
    message: 'Testing correct IST timestamp',
    interestArea: 'Time Testing',
    source: 'Apps Script Test',
    country: 'India'
  };
  
  const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
  const ss = SpreadsheetApp.openById(spreadsheetId);
  
  const result = processSubmission(ss, testData);
  console.log('✅ Time test completed:', result);
  console.log('Timestamp used:', result.timestamp);
}