const GoogleSheetsWebhookService = require('./services/googleSheetsWebhook');
require('dotenv').config();

// Simple test to verify the fix is working
async function verifyFix() {
  console.log('🔍 Testing Fixed Apps Script Integration...\n');
  
  const service = new GoogleSheetsWebhookService();
  
  // Test 1: Single contact form
  console.log('📤 Test 1: Contact Form Submission');
  const contactData = {
    formType: 'contact',
    firstName: 'Verification',
    lastName: 'Test',
    email: 'verify.fix@example.com',
    message: 'Testing if IST timestamps and individual columns work',
    interestArea: 'Testing',
    source: 'Verification Test',
    country: 'India'
  };
  
  try {
    await service.addUserSubmission('contact', contactData);
    console.log('✅ Contact form test sent\n');
  } catch (error) {
    console.log('❌ Contact form test failed:', error.message);
    return;
  }
  
  // Wait 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Beta signup
  console.log('📤 Test 2: Beta Signup Submission');
  const betaData = {
    formType: 'beta-signup',
    firstName: 'Beta',
    lastName: 'Tester',
    email: 'beta.tester@example.com',
    userType: 'Developer',
    company: 'Test Company',
    country: 'India',
    interests: ['Testing', 'Development'],
    timeline: 'Q1 2025',
    useCase: 'Testing the beta signup functionality',
    notifications: true
  };
  
  try {
    await service.addUserSubmission('beta-signup', betaData);
    console.log('✅ Beta signup test sent\n');
  } catch (error) {
    console.log('❌ Beta signup test failed:', error.message);
    return;
  }
  
  // Wait 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 3: Repeat user for urgency testing
  console.log('📤 Test 3: Repeat Contact (Testing Urgency)');
  const repeatData = {
    formType: 'contact',
    firstName: 'Verification',
    lastName: 'Test',
    email: 'verify.fix@example.com', // Same email as Test 1
    message: 'Second contact - testing urgency tracking',
    interestArea: 'Follow-up',
    source: 'Follow-up Test',
    country: 'India'
  };
  
  try {
    await service.addUserSubmission('contact', repeatData);
    console.log('✅ Repeat contact test sent\n');
  } catch (error) {
    console.log('❌ Repeat contact test failed:', error.message);
    return;
  }
  
  console.log('🎉 All tests completed!');
  console.log('');
  console.log('🔍 NOW CHECK YOUR GOOGLE SHEETS:');
  console.log('   📊 Should have Dashboard sheet with metrics');
  console.log('   📞 Contact_Forms sheet with 2 entries');
  console.log('   🚀 Beta_Signups sheet with 1 entry');
  console.log('   🚨 Urgent_Tracking sheet (for repeat user)');
  console.log('');
  console.log('✅ WHAT YOU SHOULD SEE:');
  console.log('   • IST timestamps like "Aug 22, 2025, 08:02 AM"');
  console.log('   • Individual columns, NOT JSON dump');
  console.log('   • Newest entries at the top');
  console.log('   • Beautiful formatting with emojis');
  console.log('   • Repeat user marked as "Follow-up"');
  console.log('');
  console.log('❌ IF YOU STILL SEE:');
  console.log('   • UTC timestamps like "2025-08-22T02:32:44.388Z"');
  console.log('   • JSON dump in one field');
  console.log('   • Only one sheet');
  console.log('   → You need to deploy the fixed Apps Script code!');
  console.log('');
  console.log('📋 Google Sheet URL:');
  console.log('   https://docs.google.com/spreadsheets/d/1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI/edit');
}

// Run the verification test
if (require.main === module) {
  verifyFix()
    .then(() => {
      console.log('✨ Verification completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifyFix };