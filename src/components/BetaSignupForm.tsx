import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { showComingSoonNotification } from '@/lib/notifications';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, User, Building, Globe, Zap, Brain, Heart, Code } from 'lucide-react';

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
  return 'http://localhost:3001';};

interface BetaSignupFormProps {
  userType: string;
  onBack: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  interests: string[];
  timeline: string;
  useCase: string;
  notifications: boolean;
}

const BetaSignupForm: React.FC<BetaSignupFormProps> = ({ userType, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    interests: [],
    timeline: '',
    useCase: '',
    notifications: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interests = [
    { id: 'healthcare', label: 'Healthcare Applications', icon: Heart },
    { id: 'gaming', label: 'Gaming & Entertainment', icon: Zap },
    { id: 'research', label: 'Research & Development', icon: Brain },
    { id: 'productivity', label: 'Productivity Tools', icon: Code },
    { id: 'accessibility', label: 'Accessibility Solutions', icon: User },
    { id: 'education', label: 'Educational Technology', icon: Building }
  ];

  const timelines = [
    { id: 'immediate', label: 'Immediately (Alpha testing)' },
    { id: '3-months', label: 'Within 3 months' },
    { id: '6-months', label: 'Within 6 months' },
    { id: '1-year', label: 'Within 1 year' }
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiBaseUrl = getApiBaseUrl();
      const betaData = {
        ...formData,
        userType,
        timestamp: new Date().toISOString(),
        source: 'website'
      };

      const response = await fetch(`${apiBaseUrl}/api/beta-signup`, {        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betaData),
      });

      const result = await response.json();

      if (response.ok && result.success) {        setIsSubmitted(true);
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'beta_signup', {
            'user_type': userType,
            'interests': formData.interests.join(',')
          });
        }
      } else {
        throw new Error(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Beta signup error:', error);
      alert('Something went wrong. Please try again or contact us at info@skybrain.in');    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-12 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-neural-blue/30 to-mind-purple/30 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-12 w-12 text-neural-blue" />
        </div>
        
        <h2 className="text-3xl font-bold text-ghost-white mb-4 font-orbitron">
          Welcome to the Future!
        </h2>
        
        <p className="text-xl text-neural-gray mb-8 leading-relaxed">
          Thank you for joining our beta program. You'll receive an email confirmation shortly with next steps and exclusive access details.
        </p>

        <div className="space-y-4 text-left bg-neural-blue/5 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-ghost-white mb-4">What happens next:</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
              <span className="text-neural-gray">Email verification and welcome package</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
              <span className="text-neural-gray">Access to our exclusive Discord community</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
              <span className="text-neural-gray">Weekly technology updates and insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-neural-blue rounded-full"></div>
              <span className="text-neural-gray">Early access to beta releases (Q2 2025)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="cyber-button text-deep-space font-bold px-8 py-3 text-lg">
            <Mail className="mr-2 h-5 w-5" />
            Check Your Email
          </Button>
          <Button 
            variant="outline" 
            className="glass-card border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold px-8 py-3 text-lg"
            onClick={() => showComingSoonNotification('Community Platform')}
          >
            Join Community
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-ghost-white mb-6 font-orbitron">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-neural-gray mb-2">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-neural-gray mb-2">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-neural-gray mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors"
              placeholder="Enter your email address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-neural-gray mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors"
                placeholder="Your company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-neural-gray mb-2">
                Country *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors"
                placeholder="Your country"
              />
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-ghost-white mb-6 font-orbitron">
            Areas of Interest
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interests.map((interest) => {
              const IconComponent = interest.icon;
              const isSelected = formData.interests.includes(interest.id);
              
              return (
                <div
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all ${
                    isSelected ? 'bg-neural-blue/20 border border-neural-blue/40' : 'bg-neural-blue/5 border border-neural-blue/10 hover:bg-neural-blue/10'
                  }`}
                >
                  <IconComponent className={`h-5 w-5 ${isSelected ? 'text-neural-blue' : 'text-neural-gray'}`} />
                  <span className={`font-medium ${isSelected ? 'text-neural-blue' : 'text-neural-gray'}`}>
                    {interest.label}
                  </span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-neural-blue ml-auto" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline & Use Case */}
        <div className="glass-card p-8 space-y-6">
          <div>
            <h4 className="text-lg font-bold text-ghost-white mb-4 font-orbitron">
              When do you need access?
            </h4>
            <div className="space-y-3">
              {timelines.map((timeline) => (
                <label key={timeline.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="timeline"
                    value={timeline.id}
                    checked={formData.timeline === timeline.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                    className="w-4 h-4 text-neural-blue border-neural-blue/30 focus:ring-neural-blue/50"
                  />
                  <span className="text-neural-gray">{timeline.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neural-gray mb-2">
              Primary Use Case
            </label>
            <textarea
              value={formData.useCase}
              onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-neural-blue/5 border border-neural-blue/20 rounded-lg text-ghost-white placeholder-neural-gray/50 focus:border-neural-blue/50 focus:outline-none transition-colors resize-none"
              placeholder="Describe how you plan to use SkyBrain technology..."
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notifications"
              checked={formData.notifications}
              onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
              className="w-4 h-4 text-neural-blue border-neural-blue/30 rounded focus:ring-neural-blue/50"
            />
            <label htmlFor="notifications" className="text-neural-gray cursor-pointer">
              I want to receive updates about SkyBrain technology and beta releases
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="glass-card border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold px-8 py-3 text-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || !formData.country}
            className="cyber-button text-deep-space font-bold px-12 py-3 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Joining...' : 'Join Beta Program'}
            {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BetaSignupForm;