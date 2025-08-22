// SkyBrain API endpoints - Direct Google Sheets Integration
// Routes form submissions directly to Google Apps Script webhook

// Google Apps Script webhook URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyLD47XjgPop6hepE0oReUrePB4jrVw6rgKdmV_Sfhj05xOeH9j8PNxSLWePJw4yc34zQ/exec';

window.skybrainAPI = {
  async betaSignup(data) {
    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName) {
      throw new Error('Missing required fields');
    }
    
    // Submit directly to Google Apps Script webhook
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'beta-signup',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userType: data.userType || 'Individual',
        company: data.company || '',
        country: data.country || '',
        interests: data.interests || [],
        timeline: data.timeline || '',
        useCase: data.useCase || '',
        notifications: data.notifications || false,
        source: 'Website',
        timestamp: new Date().toISOString()
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Beta signup failed');
    }
    
    return {
      success: true,
      message: 'Successfully registered for beta program',
      id: result.id || Date.now()
    };
  },

  async contact(data) {
    // Validate required fields
    const firstName = data.firstName || data.name?.split(' ')[0] || '';
    const lastName = data.lastName || data.name?.split(' ').slice(1).join(' ') || '';
    
    if (!data.email || !data.message || !firstName) {
      throw new Error('Missing required fields: name, email, and message');
    }
    
    // Submit directly to Google Apps Script webhook
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'contact',
        firstName,
        lastName,
        email: data.email,
        message: data.message,
        interestArea: data.interestArea || '',
        source: 'Website',
        country: data.country || '',
        timestamp: new Date().toISOString()
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Message submission failed');
    }
    
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      id: result.id || Date.now()
    };
  },

  async demoRequest(data) {
    // Validate required fields  
    const firstName = data.firstName || data.name?.split(' ')[0] || '';
    const lastName = data.lastName || data.name?.split(' ').slice(1).join(' ') || '';
    const fullName = data.name || `${firstName} ${lastName}`.trim();
    
    if (!data.email || !fullName) {
      throw new Error('Missing required fields: name and email');
    }
    
    // Submit directly to Google Apps Script webhook
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'demo-request',
        name: fullName,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        interest: data.interest || '',
        message: data.message || '',
        source: 'Website',
        timestamp: new Date().toISOString()
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Demo request failed');
    }
    
    return {
      success: true,
      message: 'Demo request submitted successfully. We will contact you within 24 hours!',
      id: result.id || Date.now()
    };
  },

  async newsletterSubscribe(data) {
    if (!data.email) {
      throw new Error('Email is required');
    }
    
    // Submit directly to Google Apps Script webhook
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'newsletter',
        email: data.email,
        preferences: data.preferences || [],
        source: 'Website',
        timestamp: new Date().toISOString()
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Newsletter subscription failed');
    }
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: result.id || Date.now()
    };
  },

  async trackAnalytics(data) {
    // Optional analytics tracking - non-blocking
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'analytics',
          ...data,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      // Silently fail for analytics
    }
    
    return { success: true };
  }
};

// Intercept fetch requests to redirect to proper backend
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
          result = await window.skybrainAPI.betaSignup(data);
          break;
        case 'newsletter-subscribe':
          result = await window.skybrainAPI.newsletterSubscribe(data);
          break;
        case 'contact':
          result = await window.skybrainAPI.contact(data);
          break;
        case 'demo-request':
          result = await window.skybrainAPI.demoRequest(data);
          break;
        case 'analytics/track':
          result = await window.skybrainAPI.trackAnalytics(data);
          break;
        default:
          throw new Error(`API endpoint not found: ${endpoint}`);
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

console.log('🧠 SkyBrain API initialized - Google Sheets integration active');