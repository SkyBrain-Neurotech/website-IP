// Enhanced SkyBrain Form Data Logger - Google Apps Script
// Copy this code to your Google Apps Script and deploy it

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'No data received'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    console.log('📨 Received form submission:', data.formType, 'from', data.email);
    
    const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
    const ss = SpreadsheetApp.openById(spreadsheetId);
    
    // Enhanced submission logging with formatting
    const result = logEnhancedSubmission(ss, data);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Data logged successfully',
        urgency: result.urgency,
        submissionCount: result.submissionCount
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error logging submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function logEnhancedSubmission(spreadsheet, data) {
  const formType = data.formType;
  const sheetName = getSheetNameByFormType(formType);
  
  // Get or create formatted sheet
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = createEnhancedSheet(spreadsheet, sheetName, formType);
  }
  
  // Check for existing user and calculate urgency
  const existingEntries = findExistingUser(sheet, data.email);
  const urgencyLevel = calculateUrgency(existingEntries.length);
  const submissionCount = existingEntries.length + 1;
  
  // Format and add data with enhanced formatting
  const rowData = formatEnhancedUserData(formType, data, urgencyLevel, submissionCount);
  const newRowIndex = sheet.getLastRow() + 1;
  
  // Add the data
  sheet.getRange(newRowIndex, 1, 1, rowData.length).setValues([rowData]);
  
  // Apply formatting based on urgency
  applyUrgencyFormatting(sheet, newRowIndex, urgencyLevel, rowData.length);
  
  // Log to urgent tracking if repeat user
  if (existingEntries.length > 0) {
    logEnhancedUrgentUser(spreadsheet, data, formType, submissionCount, urgencyLevel);
  }
  
  // Update summary dashboard
  updateSummaryDashboard(spreadsheet);
  
  console.log(`✅ Logged ${formType} submission for ${data.email} (urgency: ${urgencyLevel}, count: ${submissionCount})`);
  
  return { urgency: urgencyLevel, submissionCount: submissionCount };
}

function createEnhancedSheet(spreadsheet, sheetName, formType) {
  console.log('🎨 Creating enhanced sheet:', sheetName);
  
  const sheet = spreadsheet.insertSheet(sheetName);
  const headers = getEnhancedHeadersByFormType(formType);
  
  // Set headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Enhanced header formatting
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setFontFamily('Arial');
  
  // Color scheme based on form type
  const colors = getFormTypeColors(formType);
  headerRange.setBackground(colors.header);
  headerRange.setFontColor('#ffffff');
  
  // Add borders and alignment
  headerRange.setBorder(true, true, true, true, true, true);
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  
  // Set column widths for better readability
  setOptimalColumnWidths(sheet, formType);
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Add data validation and conditional formatting
  setupConditionalFormatting(sheet, headers.length);
  
  return sheet;
}

function getFormTypeColors(formType) {
  const colorSchemes = {
    'contact': { header: '#4285f4', new: '#e8f0fe', followup: '#fff3e0', interested: '#fce8e6', urgent: '#fce8e6' },
    'beta-signup': { header: '#34a853', new: '#e6f4ea', followup: '#fff3e0', interested: '#fce8e6', urgent: '#fce8e6' },
    'demo-request': { header: '#ea4335', new: '#fce8e6', followup: '#fff3e0', interested: '#fce8e6', urgent: '#fce8e6' },
    'newsletter': { header: '#9c27b0', new: '#f3e5f5', followup: '#fff3e0', interested: '#fce8e6', urgent: '#fce8e6' }
  };
  return colorSchemes[formType] || colorSchemes['contact'];
}

function setOptimalColumnWidths(sheet, formType) {
  const widthConfigs = {
    'contact': [150, 200, 250, 150, 300, 120, 120, 100, 120, 120],
    'beta-signup': [150, 200, 250, 120, 200, 120, 200, 120, 200, 100, 120, 100, 120],
    'demo-request': [150, 200, 250, 150, 200, 150, 300, 120, 120, 100, 120],
    'newsletter': [150, 250, 200, 120, 120, 100, 120]
  };
  
  const widths = widthConfigs[formType] || widthConfigs['contact'];
  
  for (let i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

function setupConditionalFormatting(sheet, numColumns) {
  // Set up conditional formatting for urgency levels
  const dataRange = sheet.getRange(2, 1, 1000, numColumns);
  
  // Urgent entries (red background)
  const urgentRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Urgent')
    .setBackground('#fce8e6')
    .setRanges([dataRange])
    .build();
  
  // Interested entries (orange background)
  const interestedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Interested')
    .setBackground('#fff3e0')
    .setRanges([dataRange])
    .build();
  
  // Follow-up entries (yellow background)
  const followupRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Follow-up')
    .setBackground('#fffbf0')
    .setRanges([dataRange])
    .build();
  
  sheet.setConditionalFormatRules([urgentRule, interestedRule, followupRule]);
}

function applyUrgencyFormatting(sheet, rowIndex, urgencyLevel, numColumns) {
  const range = sheet.getRange(rowIndex, 1, 1, numColumns);
  
  switch (urgencyLevel) {
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
  
  // Add subtle border
  range.setBorder(null, null, true, null, null, null, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
}

function getEnhancedHeadersByFormType(formType) {
  const headers = {
    'contact': [
      '📅 Timestamp', '👤 Name', '📧 Email', '🎯 Interest Area', 
      '💬 Message', '🌐 Source', '📋 Form Type', '🚨 Urgency', 
      '🔢 Count', '📍 Location'
    ],
    'beta-signup': [
      '📅 Timestamp', '👤 Name', '📧 Email', '👔 User Type', 
      '🏢 Company', '🌍 Country', '🎯 Interests', '⏰ Timeline', 
      '💼 Use Case', '🔔 Notifications', '📋 Form Type', '🚨 Urgency', '🔢 Count'
    ],
    'demo-request': [
      '📅 Timestamp', '👤 Name', '📧 Email', '📞 Phone', 
      '🏢 Company', '🎯 Interest', '💬 Message', '🌐 Source', 
      '📋 Form Type', '🚨 Urgency', '🔢 Count'
    ],
    'newsletter': [
      '📅 Timestamp', '📧 Email', '⚙️ Preferences', 
      '🌐 Source', '📋 Form Type', '🚨 Urgency', '🔢 Count'
    ]
  };
  return headers[formType] || headers['contact'];
}

function formatEnhancedUserData(formType, data, urgency, submissionCount) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Extract location info if available
  const location = data.country || 'Unknown';
  
  switch (formType) {
    case 'contact':
      return [
        timestamp,
        `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown',
        data.email || 'unknown@email.com',
        data.interestArea || 'General',
        data.message || '',
        data.source || 'Website',
        'Contact Form',
        urgency,
        submissionCount,
        location
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
        'Beta Signup',
        urgency,
        submissionCount
      ];
      
    case 'demo-request':
      return [
        timestamp,
        data.name || 'Unknown',
        data.email || 'unknown@email.com',
        data.phone || 'Not provided',
        data.company || 'Individual',
        data.interest || 'General',
        data.message || 'No additional message',
        data.source || 'Website',
        'Demo Request',
        urgency,
        submissionCount
      ];
      
    case 'newsletter':
      return [
        timestamp,
        data.email || 'unknown@email.com',
        Array.isArray(data.preferences) ? data.preferences.join(', ') : (data.preferences || 'General'),
        data.source || 'Website',
        'Newsletter',
        urgency,
        submissionCount
      ];
      
    default:
      return [timestamp, data.email || 'unknown', JSON.stringify(data), formType, urgency, submissionCount];
  }
}

function logEnhancedUrgentUser(spreadsheet, data, formType, submissionCount, urgencyLevel) {
  let urgentSheet = spreadsheet.getSheetByName('🚨 Urgent Tracking');
  if (!urgentSheet) {
    urgentSheet = createUrgentTrackingSheet(spreadsheet);
  }
  
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const urgentData = [
    timestamp,
    data.email || 'unknown@email.com',
    data.firstName || data.name || 'Unknown',
    data.lastName || '',
    formType.toUpperCase(),
    submissionCount,
    urgencyLevel,
    getFormTypeIcon(formType),
    JSON.stringify(data)
  ];
  
  const newRowIndex = urgentSheet.getLastRow() + 1;
  urgentSheet.getRange(newRowIndex, 1, 1, urgentData.length).setValues([urgentData]);
  
  // Apply urgent formatting
  const range = urgentSheet.getRange(newRowIndex, 1, 1, urgentData.length);
  if (urgencyLevel === 'Urgent') {
    range.setBackground('#fce8e6');
    range.setFontWeight('bold');
  } else {
    range.setBackground('#fff3e0');
  }
}

function createUrgentTrackingSheet(spreadsheet) {
  const sheet = spreadsheet.insertSheet('🚨 Urgent Tracking');
  const headers = [
    '📅 Timestamp', '📧 Email', '👤 First Name', '👤 Last Name', 
    '📋 Form Type', '🔢 Count', '🚨 Urgency', '🎯 Type', '📊 Raw Data'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Enhanced formatting for urgent sheet
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setBackground('#ea4335');
  headerRange.setFontColor('#ffffff');
  headerRange.setBorder(true, true, true, true, true, true);
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths
  const widths = [150, 250, 150, 150, 120, 80, 100, 80, 300];
  widths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
  
  sheet.setFrozenRows(1);
  
  return sheet;
}

function updateSummaryDashboard(spreadsheet) {
  let dashboardSheet = spreadsheet.getSheetByName('📊 Dashboard');
  if (!dashboardSheet) {
    dashboardSheet = createSummaryDashboard(spreadsheet);
  }
  
  // Update dashboard with current stats
  const stats = calculateFormStats(spreadsheet);
  
  // Update stats starting from row 3
  dashboardSheet.getRange('B3').setValue(stats.contact.total);
  dashboardSheet.getRange('B4').setValue(stats.betaSignup.total);
  dashboardSheet.getRange('B5').setValue(stats.demoRequest.total);
  dashboardSheet.getRange('B6').setValue(stats.newsletter.total);
  dashboardSheet.getRange('B7').setValue(stats.urgent.total);
  
  // Update last updated timestamp
  dashboardSheet.getRange('B1').setValue(`Last Updated: ${new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})}`);
}

function createSummaryDashboard(spreadsheet) {
  const sheet = spreadsheet.insertSheet('📊 Dashboard', 0); // Insert as first sheet
  
  // Dashboard title and layout
  const dashboardData = [
    ['📊 SkyBrain User Submissions Dashboard', ''],
    ['Last Updated:', new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})],
    ['📞 Contact Forms', 0],
    ['🚀 Beta Signups', 0],
    ['🎯 Demo Requests', 0],
    ['📧 Newsletter Subs', 0],
    ['🚨 Urgent Users', 0],
    ['', ''],
    ['📈 Quick Stats', ''],
    ['Total Submissions', '=SUM(B3:B6)'],
    ['Avg per Day', '=ROUND(B10/30,1)'],
    ['Conversion Rate', '=ROUND(B4/B3*100,1)&"%"']
  ];
  
  sheet.getRange(1, 1, dashboardData.length, 2).setValues(dashboardData);
  
  // Formatting
  sheet.getRange('A1:B1').merge();
  sheet.getRange('A1').setFontSize(16).setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('A1').setBackground('#4285f4').setFontColor('#ffffff');
  
  // Stats formatting
  sheet.getRange('A3:A7').setFontWeight('bold');
  sheet.getRange('B3:B7').setHorizontalAlignment('center');
  
  // Quick stats formatting
  sheet.getRange('A9').setFontWeight('bold').setFontSize(12);
  sheet.getRange('A10:A12').setFontWeight('bold');
  
  // Set column widths
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  
  return sheet;
}

function calculateFormStats(spreadsheet) {
  const stats = {
    contact: { total: 0 },
    betaSignup: { total: 0 },
    demoRequest: { total: 0 },
    newsletter: { total: 0 },
    urgent: { total: 0 }
  };
  
  const sheets = spreadsheet.getSheets();
  
  sheets.forEach(sheet => {
    const name = sheet.getName();
    const lastRow = sheet.getLastRow();
    const count = Math.max(0, lastRow - 1); // Subtract header row
    
    switch (name) {
      case 'Contact_Forms':
        stats.contact.total = count;
        break;
      case 'Beta_Signups':
        stats.betaSignup.total = count;
        break;
      case 'Demo_Requests':
        stats.demoRequest.total = count;
        break;
      case 'Newsletter_Subs':
        stats.newsletter.total = count;
        break;
      case '🚨 Urgent Tracking':
        stats.urgent.total = count;
        break;
    }
  });
  
  return stats;
}

// Helper functions
function findExistingUser(sheet, email) {
  if (sheet.getLastRow() <= 1) return [];
  const data = sheet.getDataRange().getValues();
  return data.filter(function(row) { return row[2] === email; });
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

function getFormTypeIcon(formType) {
  const icons = {
    'contact': '📞',
    'beta-signup': '🚀',
    'demo-request': '🎯',
    'newsletter': '📧'
  };
  return icons[formType] || '📋';
}

// Test function
function testEnhancedSetup() {
  const testData = {
    formType: 'contact',
    firstName: 'Enhanced',
    lastName: 'Test',
    email: 'enhanced-test@example.com',
    message: 'Testing enhanced Google Sheets integration',
    interestArea: 'Testing',
    source: 'Test Suite'
  };
  
  const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
  const ss = SpreadsheetApp.openById(spreadsheetId);
  
  const result = logEnhancedSubmission(ss, testData);
  console.log('✅ Enhanced test completed! Urgency:', result.urgency, 'Count:', result.submissionCount);
}