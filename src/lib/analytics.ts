// Analytics tracking utilities for SkyBrain website

export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface UserEngagement {
  user_id?: string;
  session_id: string;
  user_type?: 'developer' | 'researcher' | 'consumer' | 'investor';
  page_path: string;
  timestamp: string;
}

class Analytics {
  private sessionId: string;
  private userId?: string;
  private userType?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSession(): void {
    // Store session info in localStorage
    const sessionData = {
      sessionId: this.sessionId,
      startTime: new Date().toISOString(),
      pageViews: 0
    };
    
    localStorage.setItem('skybrain_session', JSON.stringify(sessionData));
  }

  // Set user information after signup/identification
  setUser(userId: string, userType?: string): void {
    this.userId = userId;
    this.userType = userType;
    
    // Update session with user info
    const sessionData = JSON.parse(localStorage.getItem('skybrain_session') || '{}');
    sessionData.userId = userId;
    sessionData.userType = userType;
    localStorage.setItem('skybrain_session', JSON.stringify(sessionData));
  }

  // Track page views
  trackPageView(path: string): void {
    const event: AnalyticsEvent = {
      name: 'page_view',
      category: 'navigation',
      label: path,
      custom_parameters: {
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);

    // Update page view count
    const sessionData = JSON.parse(localStorage.getItem('skybrain_session') || '{}');
    sessionData.pageViews = (sessionData.pageViews || 0) + 1;
    sessionData.lastPageView = new Date().toISOString();
    localStorage.setItem('skybrain_session', JSON.stringify(sessionData));
  }

  // Track button clicks
  trackButtonClick(buttonName: string, location: string, destination?: string): void {
    const event: AnalyticsEvent = {
      name: 'button_click',
      category: 'engagement',
      label: buttonName,
      custom_parameters: {
        button_location: location,
        destination: destination,
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);
  }

  // Track demo interactions
  trackDemoInteraction(action: string, details?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name: 'demo_interaction',
      category: 'demo',
      label: action,
      custom_parameters: {
        ...details,
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);
  }

  // Track form submissions
  trackFormSubmission(formType: string, success: boolean, details?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name: 'form_submission',
      category: 'conversion',
      label: formType,
      value: success ? 1 : 0,
      custom_parameters: {
        success: success,
        ...details,
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);
  }

  // Track roadmap interactions
  trackRoadmapInteraction(phase: string, action: string): void {
    const event: AnalyticsEvent = {
      name: 'roadmap_interaction',
      category: 'engagement',
      label: `${phase}_${action}`,
      custom_parameters: {
        phase: phase,
        action: action,
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);
  }

  // Track newsletter subscriptions
  trackNewsletterSignup(success: boolean, preferences?: string[]): void {
    const event: AnalyticsEvent = {
      name: 'newsletter_signup',
      category: 'conversion',
      label: success ? 'success' : 'failure',
      value: success ? 1 : 0,
      custom_parameters: {
        preferences: preferences?.join(','),
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);
  }

  // Track video interactions
  trackVideoInteraction(videoId: string, action: string, timestamp?: number): void {
    const event: AnalyticsEvent = {
      name: 'video_interaction',
      category: 'media',
      label: `${videoId}_${action}`,
      custom_parameters: {
        video_id: videoId,
        action: action,
        video_timestamp: timestamp,
        session_id: this.sessionId,
        user_type: this.userType,
        timestamp: new Date().toISOString()
      }
    };

    this.sendEvent(event);
  }

  // Send event to analytics platforms
  private sendEvent(event: AnalyticsEvent): void {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', event.name, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      });
    }

    // Send to our backend analytics (when implemented)
    this.sendToBackend(event);

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  // Send event to backend analytics API
  private async sendToBackend(event: AnalyticsEvent): Promise<void> {
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          session_id: this.sessionId,
          user_id: this.userId,
          user_type: this.userType,
          url: window.location.href,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }
    } catch (error) {
      // Silently fail analytics - don't break user experience
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics backend error:', error);
      }
    }
  }

  // Get current session data
  getSessionData(): any {
    return JSON.parse(localStorage.getItem('skybrain_session') || '{}');
  }

  // Calculate engagement score
  calculateEngagementScore(): number {
    const sessionData = this.getSessionData();
    let score = 0;

    // Base scoring
    score += (sessionData.pageViews || 0) * 10; // 10 points per page view
    
    // Time on site bonus
    if (sessionData.startTime) {
      const timeOnSite = Date.now() - new Date(sessionData.startTime).getTime();
      const minutesOnSite = Math.floor(timeOnSite / 60000);
      score += Math.min(minutesOnSite * 5, 100); // 5 points per minute, max 100
    }

    // User type bonus
    if (this.userType) {
      score += 50; // Bonus for identified users
    }

    return score;
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Convenience functions for common tracking
export const trackPageView = (path: string) => analytics.trackPageView(path);
export const trackButtonClick = (buttonName: string, location: string, destination?: string) => 
  analytics.trackButtonClick(buttonName, location, destination);
export const trackDemoInteraction = (action: string, details?: Record<string, any>) => 
  analytics.trackDemoInteraction(action, details);
export const trackFormSubmission = (formType: string, success: boolean, details?: Record<string, any>) => 
  analytics.trackFormSubmission(formType, success, details);

// Export analytics instance as default
export default analytics;