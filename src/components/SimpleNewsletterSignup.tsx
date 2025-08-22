import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

// Use relative URLs for all environments (Vite dev server proxies to Vercel functions)
const getApiBaseUrl = () => {
  // For local development, use the backend server
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3005';
  }
  return ''; // Always use relative URLs for production
};

interface SimpleNewsletterSignupProps {
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  showTitle?: boolean;
}

const SimpleNewsletterSignup: React.FC<SimpleNewsletterSignupProps> = ({ 
  className = "",
  theme = 'dark',
  size = 'medium',
  showTitle = true
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/newsletter-subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          preferences: ['technology_updates', 'beta_releases'],
          source: 'website_newsletter_signup',
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();
      console.log('=== SIMPLE NEWSLETTER SIGNUP DEBUG ===');
      console.log('Response from API:', result);

      if (response.ok && result.success) {
        console.log('✅ SUCCESS: Newsletter signup submitted successfully');
        console.log('Email should be sent to info@skybrain.in');
        console.log('Data should be logged to Google Sheets');
        setIsSubmitted(true);
        
        // Track with analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', {
            'event_category': 'engagement',
            'event_label': 'simple_signup',
            'value': 1
          });
        }
      } else {
        console.log('❌ ERROR: Newsletter signup submission failed');
        throw new Error(result.message || 'Subscription failed');
      }
    } catch (err) {
      console.error('❌ Newsletter signup error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sizeClasses = {
    small: {
      container: 'p-4',
      title: 'text-lg',
      input: 'py-2 px-3 text-sm',
      button: 'py-2 px-4 text-sm'
    },
    medium: {
      container: 'p-6',
      title: 'text-xl',
      input: 'py-3 px-4 text-base',
      button: 'py-3 px-6 text-base'
    },
    large: {
      container: 'p-8',
      title: 'text-2xl',
      input: 'py-4 px-5 text-lg',
      button: 'py-4 px-8 text-lg'
    }
  };

  const themeClasses = theme === 'dark' ? {
    container: 'glass-card border-neural-blue/30 bg-gradient-to-br from-deep-space/80 to-shadow-black/80',
    title: 'text-ghost-white',
    description: 'text-neural-gray',
    input: 'bg-neural-blue/5 border-neural-blue/20 text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50',
    button: 'cyber-button text-deep-space',
    success: 'text-neural-blue',
    error: 'text-red-400'
  } : {
    container: 'bg-white border border-gray-200 rounded-xl shadow-lg',
    title: 'text-gray-900',
    description: 'text-gray-600',
    input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    success: 'text-blue-600',
    error: 'text-red-600'
  };

  if (isSubmitted) {
    return (
      <div className={`${themeClasses.container} ${sizeClasses[size].container} text-center ${className}`}>
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-neural-blue/30 to-mind-purple/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-neural-blue" />
          </div>
        </div>
        
        <h3 className={`${sizeClasses[size].title} font-bold ${themeClasses.success} mb-3 font-orbitron`}>
          Thanks for subscribing!
        </h3>
        
        <p className={`${themeClasses.description} text-sm`}>
          You'll receive updates about SkyBrain technology and beta releases.
        </p>
      </div>
    );
  }

  return (
    <div className={`${themeClasses.container} ${sizeClasses[size].container} ${className}`}>
      {showTitle && (
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-3">
            <Mail className="h-5 w-5 text-neural-blue mr-2" />
            <h3 className={`${sizeClasses[size].title} font-bold ${themeClasses.title} font-orbitron`}>
              Stay Updated
            </h3>
          </div>
          <p className={`${themeClasses.description} text-sm`}>
            Get the latest SkyBrain technology updates and beta releases.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
            className={`flex-1 ${sizeClasses[size].input} ${themeClasses.input} rounded-lg focus:outline-none transition-colors disabled:opacity-50`}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting || !email}
            className={`${sizeClasses[size].button} ${themeClasses.button} font-semibold rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className={`text-sm ${themeClasses.error} text-center`}>
            {error}
          </div>
        )}
      </form>

      <p className="text-xs text-neural-gray/70 text-center mt-3">
        Unsubscribe at any time. We respect your privacy.
      </p>
    </div>
  );
};

export default SimpleNewsletterSignup;