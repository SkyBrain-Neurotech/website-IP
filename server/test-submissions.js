const GoogleSheetsWebhookService = require('./services/googleSheetsWebhook');
require('dotenv').config();

async function testMoreSubmissions() {
  const service = new GoogleSheetsWebhookService();
  
  const submissions = [
    {
      formType: 'newsletter',
      email: 'tech.enthusiast@gmail.com',
      preferences: ['Technology Updates', 'Research News'],
      source: 'Social Media'
    },
    {
      formType: 'contact',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@techcorp.com',
      message: 'Following up on my previous inquiry about enterprise solutions',
      interestArea: 'Enterprise Solutions',
      source: 'Email Follow-up'
    },
    {
      formType: 'beta-signup',
      firstName: 'Alex',
      lastName: 'Kumar',
      email: 'alex.kumar@startup.io',
      userType: 'Developer',
      company: 'AI Startup',
      country: 'India',
      interests: ['API Integration', 'SDK Development'],
      timeline: 'Q1 2025',
      useCase: 'AI-powered applications',
      notifications: false
    },
    {
      formType: 'demo-request',
      name: 'Lisa Wang',
      email: 'lisa.wang@medtech.com',
      phone: '+1-555-0456',
      company: 'MedTech Innovations',
      interest: 'Medical Devices',
      message: 'Interested in integrating BCI with our medical devices'
    },
    {
      formType: 'contact',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@techcorp.com',
      message: 'Third inquiry - very interested in partnership opportunities',
      interestArea: 'Partnership',
      source: 'Direct Contact'
    },
    {
      formType: 'newsletter',
      email: 'researcher@university.edu',
      preferences: ['Research Papers', 'Academic News'],
      source: 'Conference'
    },
    {
      formType: 'beta-signup',
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@gamedev.com',
      userType: 'Game Developer',
      company: 'Gaming Studio',
      country: 'Spain',
      interests: ['Gaming Applications', 'Real-time Processing'],
      timeline: 'Q3 2025',
      useCase: 'Brain-controlled gaming',
      notifications: true
    }
  ];
  
  for (let i = 0; i < submissions.length; i++) {
    const email = submissions[i].email || submissions[i].name;
    console.log(`Sending submission ${i+1}/${submissions.length} - ${submissions[i].formType} from ${email}...`);
    await service.addUserSubmission(submissions[i].formType, submissions[i]);
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay
  }
  
  console.log('All 7 additional submissions sent! Total: 10 submissions');
  console.log('Check your Google Sheets for:');
  console.log('   • Enhanced formatting with colors and emojis');
  console.log('   • Urgency tracking (John Doe should show as "Interested" after 3rd submission)');
  console.log('   • Separate sheets for each form type');
  console.log('   • Dashboard with summary statistics');
  console.log('   • Urgent tracking sheet for repeat users');
}

testMoreSubmissions().catch(console.error);