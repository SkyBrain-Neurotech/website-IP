// Fixed SkyBrain Form Data Logger - Google Apps Script
// Fixes: IST timestamps + entries fill from top + individual columns

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
    const result = logFixedSubmission(ss, data);
    
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

function logFixedSubmission(spreadsheet, data) {
  const formType = data.formType;
  const sheetName = getSheetNameByFormType(formType);
  
  // Get or create formatted sheet
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = createFixedSheet(spreadsheet, sheetName, formType);
  }
  
  // Check for existing user and calculate urgency
  const existingEntries = findExistingUser(sheet, data.email);
  const urgencyLevel = calculateUrgency(existingEntries.length);
  const submissionCount = existingEntries.length + 1;
  
  // Format data with IST timestamp and individual columns
  const rowData = formatFixedUserData(formType, data, urgencyLevel, submissionCount);
  
  // INSERT AT ROW 2 (right after header) - this fills from top
  sheet.insertRowBefore(2);
  sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);
  
  // Apply formatting based on urgency
  applyUrgencyFormatting(sheet, 2, urgencyLevel, rowData.length);
  
  // Log to urgent tracking if repeat user
  if (existingEntries.length > 0) {
    logFixedUrgentUser(spreadsheet, data, formType, submissionCount, urgencyLevel);
  }
  
  // Update summary dashboard
  updateSummaryDashboard(spreadsheet);
  
  console.log(`✅ Logged ${formType} submission for ${data.email} (urgency: ${urgencyLevel}, count: ${submissionCount})`);
  
  return { urgency: urgencyLevel, submissionCount: submissionCount };
}

function createFixedSheet(spreadsheet, sheetName, formType) {
  console.log('🎨 Creating fixed sheet:', sheetName);
  
  const sheet = spreadsheet.insertSheet(sheetName);
  const headers = getFixedHeadersByFormType(formType);
  
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
  
  return sheet;
}

function getFormTypeColors(formType) {
  const colorSchemes = {
    'contact': { header: '#4285f4' },
    'beta-signup': { header: '#34a853' },
    'demo-request': { header: '#ea4335' },
    'newsletter': { header: '#9c27b0' }
  };
  return colorSchemes[formType] || colorSchemes['contact'];
}

function setOptimalColumnWidths(sheet, formType) {
  const widthConfigs = {
    'contact': [180, 200, 280, 150, 350, 120, 120, 100, 80, 120],
    'beta-signup': [180, 200, 280, 120, 200, 120, 200, 120, 250, 100, 120, 100, 80],
    'demo-request': [180, 200, 280, 150, 200, 150, 350, 120, 120, 100, 80],
    'newsletter': [180, 280, 200, 120, 120, 100, 80]
  };
  
  const widths = widthConfigs[formType] || widthConfigs['contact'];
  
  for (let i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
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

function getFixedHeadersByFormType(formType) {
  const headers = {
    'contact': [
      '📅 Timestamp (IST)', '👤 Name', '📧 Email', '🎯 Interest Area', 
      '💬 Message', '🌐 Source', '📋 Form Type', '🚨 Urgency', 
      '🔢 Count', '📍 Country'
    ],
    'beta-signup': [
      '📅 Timestamp (IST)', '👤 Name', '📧 Email', '👔 User Type', 
      '🏢 Company', '🌍 Country', '🎯 Interests', '⏰ Timeline', 
      '💼 Use Case', '🔔 Notifications', '📋 Form Type', '🚨 Urgency', '🔢 Count'
    ],
    'demo-request': [
      '📅 Timestamp (IST)', '👤 Name', '📧 Email', '📞 Phone', 
      '🏢 Company', '🎯 Interest', '💬 Message', '🌐 Source', 
      '📋 Form Type', '🚨 Urgency', '🔢 Count'
    ],
    'newsletter': [
      '📅 Timestamp (IST)', '📧 Email', '⚙️ Preferences', 
      '🌐 Source', '📋 Form Type', '🚨 Urgency', '🔢 Count'
    ]
  };
  return headers[formType] || headers['contact'];
}

function formatFixedUserData(formType, data, urgency, submissionCount) {
  // FIXED: Create IST timestamp
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + istOffset);
  
  const timestamp = istTime.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
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

function logFixedUrgentUser(spreadsheet, data, formType, submissionCount, urgencyLevel) {
  let urgentSheet = spreadsheet.getSheetByName('🚨 Urgent Tracking');
  if (!urgentSheet) {
    urgentSheet = createUrgentTrackingSheet(spreadsheet);
  }
  
  // FIXED: IST timestamp for urgent tracking too
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  const timestamp = istTime.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
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
  
  // INSERT AT ROW 2 for urgent tracking too (newest first)
  urgentSheet.insertRowBefore(2);
  urgentSheet.getRange(2, 1, 1, urgentData.length).setValues([urgentData]);
  
  // Apply urgent formatting
  const range = urgentSheet.getRange(2, 1, 1, urgentData.length);
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
    '📅 Timestamp (IST)', '📧 Email', '👤 First Name', '👤 Last Name', 
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
  const widths = [180, 280, 150, 150, 120, 80, 100, 80, 350];
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
  
  // FIXED: IST timestamp for dashboard too
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  const timestamp = istTime.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  dashboardSheet.getRange('B1').setValue(`Last Updated: ${timestamp}`);
}

function createSummaryDashboard(spreadsheet) {
  const sheet = spreadsheet.insertSheet('📊 Dashboard', 0); // Insert as first sheet
  
  // Dashboard title and layout
  const dashboardData = [
    ['📊 SkyBrain User Submissions Dashboard', ''],
    ['Last Updated:', 'Will update automatically'],
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

// Helper functions (keep existing ones)
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
function testFixedSetup() {
  const testData = {
    formType: 'contact',
    firstName: 'Fixed',
    lastName: 'Test',
    email: 'fixed-test@example.com',
    message: 'Testing fixed IST timestamps and top insertion',
    interestArea: 'Testing',
    source: 'Test Suite'
  };
  
  const spreadsheetId = '1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI';
  const ss = SpreadsheetApp.openById(spreadsheetId);
  
  const result = logFixedSubmission(ss, testData);
  console.log('✅ Fixed test completed! Urgency:', result.urgency, 'Count:', result.submissionCount);
}