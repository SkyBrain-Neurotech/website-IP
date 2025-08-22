// Mock API endpoints for development
// This will be replaced with real backend implementation

// Simulate API responses with realistic delays
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database for storing signups (in production, use real database)
let mockDatabase = {
  betaSignups: [],
  newsletterSubscriptions: [],
  contactMessages: [],
  demoRequests: [],
  analytics: []
};

// Beta signup endpoint
window.mockAPI = {
  async betaSignup(data) {
    await simulateDelay(1500);
    
    // Simulate validation
    if (!data.email || !data.firstName || !data.lastName) {
      throw new Error('Missing required fields');
    }
    
    // Check for duplicate email
    const existingSignup = mockDatabase.betaSignups.find(signup => signup.email === data.email);
    if (existingSignup) {
      throw new Error('Email already registered for beta program');
    }
    
    // Store signup
    const signup = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending_verification'
    };
    
    mockDatabase.betaSignups.push(signup);
    
    console.log('Mock Beta Signup:', signup);
    
    return {
      success: true,
      message: 'Successfully registered for beta program',
      id: signup.id
    };
  },

  async newsletterSubscribe(data) {
    await simulateDelay(1000);
    
    if (!data.email) {
      throw new Error('Email is required');
    }
    
    // Check for duplicate email
    const existingSubscription = mockDatabase.newsletterSubscriptions.find(sub => sub.email === data.email);
    if (existingSubscription) {
      // Update preferences instead of creating new subscription
      existingSubscription.preferences = data.preferences;
      existingSubscription.updatedAt = new Date().toISOString();
      
      return {
        success: true,
        message: 'Newsletter preferences updated',
        id: existingSubscription.id
      };
    }
    
    const subscription = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    mockDatabase.newsletterSubscriptions.push(subscription);
    
    console.log('Mock Newsletter Subscription:', subscription);
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: subscription.id
    };
  },

  async contact(data) {
    await simulateDelay(1200);
    
    // Simulate validation
    if (!data.name || !data.email || !data.message) {
      throw new Error('Missing required fields: name, email, and message');
    }
    
    // Store contact message
    const message = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    mockDatabase.contactMessages.push(message);
    
    console.log('Mock Contact Message:', message);
    
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      id: message.id
    };
  },

  async demoRequest(data) {
    await simulateDelay(1500);
    
    // Simulate validation
    if (!data.name || !data.email || !data.company) {
      throw new Error('Missing required fields: name, email, and company');
    }
    
    // Store demo request
    const request = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending_review'
    };
    
    mockDatabase.demoRequests.push(request);
    
    console.log('Mock Demo Request:', request);
    
    return {
      success: true,
      message: 'Demo request submitted successfully. We will contact you within 24 hours!',
      id: request.id
    };
  },

  async trackAnalytics(data) {
    // No delay for analytics to avoid affecting user experience
    const event = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    
    mockDatabase.analytics.push(event);
    
    // Only log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Mock Analytics Event:', event);
    }
    
    return { success: true };
  },

  // Get current mock data (for debugging)
  getDebugData() {
    return {
      betaSignups: mockDatabase.betaSignups.length,
      newsletters: mockDatabase.newsletterSubscriptions.length,
      contactMessages: mockDatabase.contactMessages.length,
      demoRequests: mockDatabase.demoRequests.length,
      analyticsEvents: mockDatabase.analytics.length,
      recentSignups: mockDatabase.betaSignups.slice(-5),
      recentContacts: mockDatabase.contactMessages.slice(-5),
      recentDemos: mockDatabase.demoRequests.slice(-5),
      recentAnalytics: mockDatabase.analytics.slice(-10)
    };
  }
};

// Intercept fetch requests to mock APIs
const originalFetch = window.fetch;
window.fetch = async function(url, options) {
  // Only intercept our API calls
  if (typeof url === 'string' && url.startsWith('/api/')) {
    try {
      const endpoint = url.replace('/api/', '');
      const data = options?.body ? JSON.parse(options.body) : {};
      
      let result;
      switch (endpoint) {
        case 'beta-signup':
          result = await window.mockAPI.betaSignup(data);
          break;
        case 'newsletter-subscribe':
          result = await window.mockAPI.newsletterSubscribe(data);
          break;
        case 'contact':
          result = await window.mockAPI.contact(data);
          break;
        case 'demo-request':
          result = await window.mockAPI.demoRequest(data);
          break;
        case 'analytics/track':
          result = await window.mockAPI.trackAnalytics(data);
          break;
        default:
          throw new Error(`Mock API endpoint not found: ${endpoint}`);
      }
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: error.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // For all other requests, use the original fetch
  return originalFetch.apply(this, arguments);
};

console.log('🧠 SkyBrain Mock API initialized');
console.log('📊 Access debug data with: window.mockAPI.getDebugData()');