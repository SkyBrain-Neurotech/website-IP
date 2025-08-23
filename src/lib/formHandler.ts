// Enhanced form handling without external dependencies

export interface FormSubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  interestArea?: string;
  message: string;
  timestamp: string;
  source: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

// Enhanced form submission with SkyBrain backend API
export const submitContactForm = async (data: FormSubmissionData): Promise<FormResponse> => {
  try {
    // Use relative URLs for all environments (same as ContactSection.tsx fix)
    const getApiBaseUrl = () => {
      return ''; // Always use relative URLs - works for both dev and production
    };

    const apiBaseUrl = getApiBaseUrl();

    // Method 1: Try SkyBrain Backend API (Primary method)
    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          message: result.message,
          submissionId: `skybrain_api_${Date.now()}`
        };
      } else {
        // Continue to fallback methods
      }
    } catch (apiError) {
      // API error, continue to fallback methods
    }

    // Method 2: Try to use Netlify Forms (if deployed on Netlify)
    if (window.location.hostname.includes('netlify') || window.location.hostname === 'skybrain.in') {
      try {
        const formData = new FormData();
        formData.append('form-name', 'contact');
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('interestArea', data.interestArea || '');
        formData.append('message', data.message);
        formData.append('timestamp', data.timestamp);
        formData.append('source', data.source);

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
        });

        if (response.ok) {
          return {
            success: true,
            message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.',
            submissionId: `netlify_${Date.now()}`
          };
        }
      } catch (netlifyError) {
        // Netlify form submission failed, try next method
      }
    }

    // Method 2: Web3Forms (FREE - 250 submissions/month)
    // TODO: Replace 'WEB3FORMS_ACCESS_KEY_PLACEHOLDER' with actual access key from https://web3forms.com
    const web3FormsKey = 'WEB3FORMS_ACCESS_KEY_PLACEHOLDER';
    
    if (web3FormsKey && web3FormsKey !== 'WEB3FORMS_ACCESS_KEY_PLACEHOLDER') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            subject: `SkyBrain Contact: ${data.interestArea || 'General Inquiry'}`,
            message: `
Interest Area: ${data.interestArea || 'Not specified'}

Message:
${data.message}

Contact Details:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Submitted: ${data.timestamp}
- Source: ${data.source}
            `.trim(),
            to: 'info@skybrain.in',
            from_name: `${data.firstName} ${data.lastName}`,
            replyto: data.email
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            return {
              success: true,
              message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.',
              submissionId: `web3forms_${Date.now()}`
            };
          }
        }
      } catch (web3Error) {
        // Web3Forms submission failed, try next method
      }
    }

    // Method 3: Formspree (FREE - 50 submissions/month)
    // TODO: Replace 'FORMSPREE_FORM_ID_PLACEHOLDER' with actual form ID from https://formspree.io
    const formspreeId = 'FORMSPREE_FORM_ID_PLACEHOLDER';
    
    if (formspreeId && formspreeId !== 'FORMSPREE_FORM_ID_PLACEHOLDER') {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            subject: `SkyBrain Contact: ${data.interestArea || 'General Inquiry'}`,
            message: data.message,
            interestArea: data.interestArea,
            timestamp: data.timestamp,
            source: data.source
          })
        });

        if (response.ok) {
          return {
            success: true,
            message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.',
            submissionId: `formspree_${Date.now()}`
          };
        }
      } catch (formspreeError) {
        // Formspree submission failed, try next method
      }
    }

    // Method 4: Save to localStorage and show instructions
    try {
      const submissions = JSON.parse(localStorage.getItem('skybrain_form_submissions') || '[]');
      submissions.push({
        ...data,
        submissionId: `local_${Date.now()}`,
        method: 'localStorage',
        needsManualProcessing: true
      });
      localStorage.setItem('skybrain_form_submissions', JSON.stringify(submissions));
    } catch (storageError) {
      // Could not save to localStorage, not critical
    }

    // Return instructions for manual contact
    return {
      success: false,
      message: 'Form submission is temporarily unavailable. Please email us directly at info@skybrain.in with your message, or try again later. Your information has been saved locally.'
    };

  } catch (error) {
    
    return {
      success: false,
      message: 'We encountered an issue submitting your form. Please email us directly at info@skybrain.in or try again later.'
    };
  }
};

// Enhanced form validation
export const validateContactForm = (data: Partial<FormSubmissionData>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.firstName?.trim()) {
    errors.push('First name is required');
  }

  if (!data.lastName?.trim()) {
    errors.push('Last name is required');
  }

  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Track form submissions for analytics
export const trackFormSubmission = (method: string, success: boolean) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submission', {
      'event_category': 'contact',
      'event_label': method,
      'value': success ? 1 : 0
    });
  }
};

// Get all local submissions (for debugging)
export const getLocalSubmissions = () => {
  try {
    return JSON.parse(localStorage.getItem('skybrain_form_submissions') || '[]');
  } catch {
    return [];
  }
};