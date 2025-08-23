#!/usr/bin/env node

/**
 * SkyBrain Website - Deployment Verification Script
 * Run this script after deployment to verify everything is working
 */

const https = require('https');
const http = require('http');

// Configuration - Update with your domain
const DOMAIN = process.env.FRONTEND_URL || 'https://skybrain.vercel.app';
const LOCAL_SERVER = 'http://localhost:3005';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function testEndpoint(url, description) {
  try {
    const response = await makeRequest(url);
    if (response.statusCode === 200) {
      log(colors.green, `✅ ${description} - OK`);
      return true;
    } else {
      log(colors.red, `❌ ${description} - HTTP ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    log(colors.red, `❌ ${description} - Error: ${error.message}`);
    return false;
  }
}

async function testFormSubmission(url, data, description) {
  return new Promise((resolve) => {
    const postData = JSON.stringify(data);
    const client = url.startsWith('https') ? https : http;
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = client.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          log(colors.green, `✅ ${description} - Form submission OK`);
          resolve(true);
        } else {
          log(colors.red, `❌ ${description} - HTTP ${res.statusCode}`);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      log(colors.red, `❌ ${description} - Error: ${error.message}`);
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

async function runVerification() {
  log(colors.blue, '\n🧠 SkyBrain Website - Deployment Verification\n');
  log(colors.yellow, `Testing domain: ${DOMAIN}\n`);

  let totalTests = 0;
  let passedTests = 0;

  // Test basic endpoints
  const endpoints = [
    [`${DOMAIN}`, 'Website Home Page'],
    [`${DOMAIN}/contact`, 'Contact Page'],
    [`${DOMAIN}/beta-signup`, 'Beta Signup Page'],
    [`${DOMAIN}/api/health`, 'API Health Check'],
  ];

  log(colors.blue, '📡 Testing Website Endpoints...');
  for (const [url, description] of endpoints) {
    totalTests++;
    if (await testEndpoint(url, description)) {
      passedTests++;
    }
  }

  // Test form APIs with sample data
  log(colors.blue, '\n📝 Testing Form APIs...');

  const contactData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    interestArea: 'Research',
    message: 'This is a test message from verification script'
  };

  const demoData = {
    name: 'Test User',
    email: 'test@example.com',
    interest: 'healthcare',
    company: 'Test Company',
    message: 'Test demo request'
  };

  const formTests = [
    [`${DOMAIN}/api/contact`, contactData, 'Contact Form API'],
    [`${DOMAIN}/api/demo-request`, demoData, 'Demo Request API'],
  ];

  for (const [url, data, description] of formTests) {
    totalTests++;
    if (await testFormSubmission(url, data, description)) {
      passedTests++;
    }
  }

  // Summary
  log(colors.blue, '\n📊 Verification Summary');
  log(colors.blue, '='.repeat(50));
  
  if (passedTests === totalTests) {
    log(colors.green, `🎉 All tests passed! (${passedTests}/${totalTests})`);
    log(colors.green, '✅ Website is ready for production use');
  } else {
    log(colors.yellow, `⚠️ ${passedTests}/${totalTests} tests passed`);
    log(colors.yellow, `❌ ${totalTests - passedTests} tests failed`);
    
    if (passedTests > 0) {
      log(colors.yellow, '🔧 Website is partially functional - check failed tests');
    } else {
      log(colors.red, '🚨 Website deployment failed - check configuration');
    }
  }

  // Additional checks
  log(colors.blue, '\n🔍 Additional Checks:');
  log(colors.yellow, '• Check email delivery in admin inbox and spam folder');
  log(colors.yellow, '• Test forms manually on the website');
  log(colors.yellow, '• Verify environment variables in Vercel dashboard');
  log(colors.yellow, '• Test mobile responsiveness');
  log(colors.yellow, '• Check Google Sheets logging (if enabled)');

  log(colors.blue, '\n📚 Documentation:');
  log(colors.yellow, '• DEVELOPER_HANDOVER.md - Quick start guide');
  log(colors.yellow, '• DEPLOYMENT_GUIDE.md - Detailed deployment steps');
  log(colors.yellow, '• DEVELOPER_DOCUMENTATION.md - Complete reference');

  console.log('\n');
}

// Run verification
runVerification().catch(console.error);