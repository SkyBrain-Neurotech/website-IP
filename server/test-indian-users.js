const GoogleSheetsWebhookService = require('./services/googleSheetsWebhook');
require('dotenv').config();

// Test with 10 diverse Indian users across different form types
async function testIndianUsers() {
  console.log('🇮🇳 Starting SkyBrain Form Testing with Indian Users...\n');
  
  const service = new GoogleSheetsWebhookService();
  
  const testUsers = [
    // Contact Form Submissions
    {
      formType: 'contact',
      firstName: 'Arjun',
      lastName: 'Sharma',
      email: 'arjun.sharma@techbangalore.com',
      message: 'Interested in BCI technology for healthcare applications in rural India',
      interestArea: 'Healthcare Technology',
      source: 'Website',
      country: 'India'
    },
    {
      formType: 'contact', 
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya.patel@aimlabs.in',
      message: 'Looking to integrate brain-computer interfaces with AI research',
      interestArea: 'AI Research',
      source: 'LinkedIn',
      country: 'India'
    },
    {
      formType: 'contact',
      firstName: 'Arjun',
      lastName: 'Sharma', 
      email: 'arjun.sharma@techbangalore.com',
      message: 'Follow-up: Can we schedule a call to discuss partnership opportunities?',
      interestArea: 'Partnership',
      source: 'Email Follow-up',
      country: 'India'
    },
    
    // Beta Signup Submissions
    {
      formType: 'beta-signup',
      firstName: 'Vikram',
      lastName: 'Singh',
      email: 'vikram.singh@startupdelhi.com',
      userType: 'Entrepreneur',
      company: 'NeuroTech Innovations',
      country: 'India',
      interests: ['Medical Applications', 'Consumer Electronics'],
      timeline: 'Q1 2025',
      useCase: 'Developing assistive technology for differently-abled individuals',
      notifications: true
    },
    {
      formType: 'beta-signup',
      firstName: 'Anita',
      lastName: 'Reddy',
      email: 'anita.reddy@iithyderabad.ac.in',
      userType: 'Researcher',
      company: 'IIT Hyderabad',
      country: 'India',
      interests: ['Academic Research', 'Neuroscience'],
      timeline: 'Q2 2025',
      useCase: 'Brain-computer interface research for cognitive enhancement',
      notifications: true
    },
    {
      formType: 'beta-signup',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@medtechpune.com',
      userType: 'Healthcare Professional',
      company: 'MedTech Solutions Pune',
      country: 'India',
      interests: ['Medical Devices', 'Patient Care'],
      timeline: 'Q3 2025',
      useCase: 'Rehabilitation therapy for stroke patients',
      notifications: false
    },
    
    // Demo Request Submissions
    {
      formType: 'demo-request',
      name: 'Dr. Sanjay Gupta',
      email: 'sanjay.gupta@aiimsnewdelhi.edu',
      phone: '+91-98765-43210',
      company: 'AIIMS New Delhi',
      interest: 'Medical Research',
      message: 'Would like to see a demo for our neurology department research',
      source: 'Conference',
      country: 'India'
    },
    {
      formType: 'demo-request',
      name: 'Kavya Nair',
      email: 'kavya.nair@techparkkochi.com',
      phone: '+91-87654-32109',
      company: 'Kochi Tech Park',
      interest: 'Technology Integration',
      message: 'Interested in demo for our technology incubation program',
      source: 'Website',
      country: 'India'
    },
    
    // Newsletter Subscriptions
    {
      formType: 'newsletter',
      email: 'tech.enthusiast.mumbai@gmail.com',
      preferences: ['Technology Updates', 'Research Breakthroughs', 'Industry News'],
      source: 'Social Media',
      country: 'India'
    },
    
    // Repeat user for urgency testing
    {
      formType: 'contact',
      firstName: 'Arjun',
      lastName: 'Sharma',
      email: 'arjun.sharma@techbangalore.com', 
      message: 'Third inquiry - we are ready to move forward with pilot project',
      interestArea: 'Pilot Project',
      source: 'Phone Follow-up',
      country: 'India'
    }
  ];

  // Process submissions with detailed logging
  for (let i = 0; i < testUsers.length; i++) {
    const user = testUsers[i];
    const userInfo = user.email || user.name || 'Unknown';
    const userName = user.firstName ? `${user.firstName} ${user.lastName}` : user.name;
    
    console.log(`📤 Submission ${i + 1}/10: ${user.formType.toUpperCase()}`);
    console.log(`   👤 User: ${userName || userInfo}`);
    console.log(`   📧 Email: ${userInfo}`);
    
    // Show special notes for interesting cases
    if (user.email === 'arjun.sharma@techbangalore.com') {
      const arjunCount = testUsers.slice(0, i + 1).filter(u => u.email === 'arjun.sharma@techbangalore.com').length;
      console.log(`   🚨 Note: This is Arjun's ${arjunCount}${arjunCount === 1 ? 'st' : arjunCount === 2 ? 'nd' : 'rd'} submission (testing urgency tracking)`);
    }
    
    try {
      await service.addUserSubmission(user.formType, user);
      console.log(`   ✅ Successfully logged to Google Sheets`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for spacing
    
    // Add delay between submissions to simulate real usage
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  // Summary
  console.log('🎉 Testing Complete! Here\'s what was submitted:');
  console.log('');
  console.log('📊 SUBMISSION SUMMARY:');
  console.log('   📞 Contact Forms: 3 submissions');
  console.log('      • Arjun Sharma (3 times - should show urgency escalation)');
  console.log('      • Priya Patel (1 time)');
  console.log('');
  console.log('   🚀 Beta Signups: 3 submissions');  
  console.log('      • Vikram Singh (Entrepreneur)');
  console.log('      • Anita Reddy (IIT Researcher)');
  console.log('      • Rajesh Kumar (Healthcare Professional)');
  console.log('');
  console.log('   🎯 Demo Requests: 2 submissions');
  console.log('      • Dr. Sanjay Gupta (AIIMS)');
  console.log('      • Kavya Nair (Tech Park)');
  console.log('');
  console.log('   📧 Newsletter: 1 subscription');
  console.log('      • Mumbai Tech Enthusiast');
  console.log('');
  console.log('🔍 CHECK YOUR GOOGLE SHEETS FOR:');
  console.log('   ✅ IST timestamps (should show Indian time)');
  console.log('   ✅ Separate sheets for each form type');
  console.log('   ✅ Beautiful formatting with emojis and colors');
  console.log('   ✅ Arjun Sharma marked as "Interested" (3rd submission)');
  console.log('   ✅ Dashboard with live metrics');
  console.log('   ✅ Urgent tracking sheet for repeat users');
  console.log('');
  console.log('📋 Google Sheet URL:');
  console.log('   https://docs.google.com/spreadsheets/d/1oWeG9FgilIvkxXLvAz14zfQjjpykp_Or2eh-oTnpbWI/edit');
}

// Run the test
if (require.main === module) {
  testIndianUsers()
    .then(() => {
      console.log('✨ Test completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testIndianUsers };