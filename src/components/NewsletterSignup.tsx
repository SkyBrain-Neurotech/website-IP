import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle2, ArrowRight, Bell, Users, Code, Microscope } from 'lucide-react';
import { trackFormSubmission } from '@/lib/analytics';

// Get API base URL based on environment
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Production/Vercel deployment - same domain
    if (window.location.hostname.includes('vercel.app') || 
        window.location.hostname === 'skybrain.in' || 
        window.location.hostname.includes('skybrain')) {
      return ''; // Empty string for same domain
    }
    // Development
    return 'http://localhost:3001';
  }
  return 'http://localhost:3001';
};

interface NewsletterSignupProps {
  location?: string;
  showPreferences?: boolean;
  title?: string;
  description?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  location = 'default',
  showPreferences = false,
  title = "Stay Updated",
  description = "Get the latest updates on SkyBrain technology and neuroscience breakthroughs."
}) => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState<string[]>(['general']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const preferenceOptions = [
    { id: 'general', label: 'General Updates', icon: Bell, description: 'Product announcements and company news' },
    { id: 'technical', label: 'Technical Insights', icon: Code, description: 'Developer updates and API documentation' },
    { id: 'research', label: 'Research Papers', icon: Microscope, description: 'Scientific publications and studies' },
    { id: 'community', label: 'Community Events', icon: Users, description: 'Webinars, meetups, and beta programs' }
  ];

  const handlePreferenceToggle = (prefId: string) => {
    setPreferences(prev => {
      if (prev.includes(prefId)) {
        return prev.filter(p => p !== prefId);
      } else {
        return [...prev, prefId];
      }
    });
  };

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
          preferences,
          source: location,
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        trackFormSubmission('newsletter', true, { 
          preferences: preferences.join(','),
          source: location 
        });
      } else {
        throw new Error(result.message || 'Subscription failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact us at info@skybrain.in');
      trackFormSubmission('newsletter', false, { 
        error: err instanceof Error ? err.message : 'unknown_error',
        source: location 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-neural-blue/30 to-mind-purple/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-neural-blue" />
        </div>
        
        <h3 className="text-xl font-bold text-ghost-white mb-3 font-orbitron">
          You're All Set!
        </h3>
        
        <p className="text-neural-gray mb-6">
          Welcome to the SkyBrain community. Check your email for a confirmation message.
        </p>

        <div className="space-y-2 text-left bg-neural-blue/5 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-ghost-white mb-2">You'll receive:</h4>
          {preferences.map(prefId => {
            const option = preferenceOptions.find(opt => opt.id === prefId);
            return option ? (
              <div key={prefId} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-neural-blue rounded-full"></div>
                <span className="text-sm text-neural-gray">{option.label}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-neural-blue/30 to-mind-purple/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-neural-blue" />
        </div>
        
        <h3 className="text-xl font-bold text-ghost-white mb-2 font-orbitron">
          {title}
        </h3>
        
        <p className="text-neural-gray text-sm">
          {description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors"
          />
        </div>

        {showPreferences && (
          <div>
            <h4 className="text-sm font-semibold text-ghost-white mb-3">
              What interests you? (Select all that apply)
            </h4>
            <div className="space-y-2">
              {preferenceOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = preferences.includes(option.id);
                
                return (
                  <div
                    key={option.id}
                    onClick={() => handlePreferenceToggle(option.id)}
                    className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                      isSelected ? 'bg-neural-blue/20 border border-neural-blue/40' : 'bg-neural-blue/5 border border-neural-blue/10 hover:bg-neural-blue/10'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 mt-0.5 ${isSelected ? 'text-neural-blue' : 'text-neural-gray'}`} />
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${isSelected ? 'text-neural-blue' : 'text-neural-gray'}`}>
                        {option.label}
                      </div>
                      <div className="text-xs text-neural-gray/70 mt-1">
                        {option.description}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-neural-blue" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !email || preferences.length === 0}
          className="w-full cyber-button text-deep-space font-bold py-3 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
        </Button>

        <p className="text-xs text-neural-gray/70 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;