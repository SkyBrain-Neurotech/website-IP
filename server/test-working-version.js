const GoogleSheetsWebhookService = require('./services/googleSheetsWebhook');
require('dotenv').config();

// This test is designed to work perfectly with the verified Apps Script
async function testWorkingVersion() {
  console.log('🧪 Testing VERIFIED Apps Script Integration...\n');
  
  const service = new GoogleSheetsWebhookService();
  
  const testSubmissions = [
    // Test 1: New contact form
    {
      formType: 'contact',
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.sharma@techdelhi.com',
      message: 'Interested in BCI technology for medical applications',
      interestArea: 'Medical Technology',
      source: 'Website',
      country: 'India'
    },
    
    // Test 2: Beta signup
    {
      formType: 'beta-signup',
      firstName: 'Priya',
      lastName: 'Gupta',
      email: 'priya.gupta@iitbombay.ac.in',
      userType: 'Researcher',
      company: 'IIT Bombay',
      country: 'India',
      interests: ['Academic Research', 'Neuroscience'],
      timeline: 'Q2 2025',
      useCase: 'Cognitive enhancement research',
      notifications: true
    },
    
    // Test 3: Demo request
    {
      formType: 'demo-request',
      name: 'Dr. Amit Kumar',
      email: 'amit.kumar@aiims.edu',
      phone: '+91-98765-43210',
      company: 'AIIMS Delhi',
      interest: 'Medical Research',
      message: 'Would like to see a demo for our neurology department',
      source: 'Conference'
    },
    
    // Test 4: Newsletter
    {
      formType: 'newsletter',
      email: 'tech.updates@startup.in',
      preferences: ['Technology Updates', 'Research News'],
      source: 'Social Media'
    },
    
    // Test 5: Repeat contact (same email as Test 1) for urgency testing
    {
      formType: 'contact',
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.sharma@techdelhi.com', // Same email
      message: 'Follow-up: Can we schedule a call this week?',
      interestArea: 'Partnership',
      source: 'Phone Follow-up',
      country: 'India'
    },
    
    // Test 6: Another beta signup
    {
      formType: 'beta-signup',
      firstName: 'Vikram',
      lastName: 'Singh',
      email: 'vikram.singh@neurostartup.com',
      userType: 'Entrepreneur',
      company: 'NeuroTech Startup',
      country: 'India',
      interests: ['Consumer Applications', 'Gaming'],
      timeline: 'Q1 2025',
      useCase: 'Brain-controlled gaming interface',
      notifications: false
    },
    
    // Test 7: Third contact from Rahul (should be "Interested")
    {
      formType: 'contact',
      firstName: 'Rahul',
      lastName: 'Sharma', 
      email: 'rahul.sharma@techdelhi.com', // Same email again
      message: 'Third inquiry - ready to discuss pilot project implementation',
      interestArea: 'Pilot Project',
      source: 'Direct Contact',
      country: 'India'
    }
  ];

  console.log('📤 Sending 7 test submissions...\n');
  
  for (let i = 0; i < testSubmissions.length; i++) {
    const submission = testSubmissions[i];
    const testNum = i + 1;
    
    console.log(`📋 Test ${testNum}/7: ${submission.formType.toUpperCase()}`);
    
    if (submission.firstName) {
      console.log(`   👤 User: ${submission.firstName} ${submission.lastName}`);
    } else {
      console.log(`   👤 User: ${submission.name || submission.email}`);
    }
    
    console.log(`   📧 Email: ${submission.email}`);
    
    // Special note for repeat users
    if (submission.email === 'rahul.sharma@techdelhi.com') {
      const rahulCount = testSubmissions.slice(0, i + 1).filter(s => s.email === 'rahul.sharma@techdelhi.com').length;
      if (rahulCount === 2) {
        console.log(`   🔄 Note: This is Rahul's 2nd submission (should show "Follow-up")`);
      } else if (rahulCount === 3) {
        console.log(`   🚨 Note: This is Rahul's 3rd submission (should show "Interested")`);
      }
    }
    
    try {
      await service.addUserSubmission(submission.formType, submission);
      console.log(`   ✅ Successfully sent to Apps Script`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line
    
    // Delay between submissions
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 All tests completed!\n');
  console.log('🔍 CHECK YOUR GOOGLE SHEETS NOW:');
  console.log('');
  console.log('📊 EXPECTED RESULTS:');
  console.log('   ✅ Dashboard sheet with live counts');
  console.log('   ✅ Contact_Forms sheet (3 entries from Rahul)');
  console.log('   ✅ Beta_Signups sheet (2 entries)');
  console.log('   ✅ Demo_Requests sheet (1 entry)');
  console.log('   ✅ Newsletter_Subs sheet (1 entry)');
  console.log('   ✅ 🚨 Urgent_Tracking sheet (for Rahul\'s repeat contacts)');
  console.log('');
  console.log('📅 TIMESTAMPS SHOULD SHOW:');
  console.log('   • IST format like "Aug 22, 2025, 08:32 AM"');
  console.log('   • NOT UTC like "2025-08-22T02:32:44.388Z"');
  console.log('');
  console.log('📋 DATA SHOULD BE:');
  console.log('   • Individual columns with proper headers');
  console.log('   • NOT JSON dump in one field');
  console.log('   • Newest entries at the top');
  console.log('   • Beautiful formatting with emojis');
  console.log('');
  console.log('🚨 URGENCY TRACKING:');
  console.log('   • Rahul\'s 1st contact: "New"');
  console.log('   • Rahul\'s 2nd contact: "Follow-up" (light yellow)');
  console.log('   • Rahul\'s 3rd contact: "Interested" (orange background)');
  console.log('');
  console.log('📋 Google Sheet URL:');
  console.log('   https://docs.google.com/spreadsheets/d/1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI/edit');
  console.log('');
  console.log('❗ IF YOU DON\'T SEE THE EXPECTED RESULTS:');
  console.log('   → Deploy the verified Apps Script from /docs/verified-working-apps-script.js');
  console.log('   → Make sure you copied ALL the code and saved it');
  console.log('   → Redeploy with "Deploy → Manage deployments → Edit → Deploy"');
}

// Run the test
if (require.main === module) {
  testWorkingVersion()
    .then(() => {
      console.log('✨ Testing completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Testing failed:', error);
      process.exit(1);
    });
}

module.exports = { testWorkingVersion };