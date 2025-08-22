import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Play, BarChart3, Brain, Zap, ArrowRight, Smartphone, Download, Upload, Calendar, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DemoForm from './DemoForm';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [demoStep, setDemoStep] = useState<'intro' | 'loading' | 'redirect' | 'form'>('intro');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setDemoStep('intro');
      // Track demo modal open
      if (typeof gtag !== 'undefined') {
        gtag('event', 'demo_modal_open', {
          'event_category': 'engagement',
          'event_label': 'demo_modal'
        });
      }
    }
  }, [isOpen]);

  const handleStartDemo = () => {
    setDemoStep('loading');
    
    // Track demo start
    if (typeof gtag !== 'undefined') {
      gtag('event', 'beta_signup_redirect', {
        'event_category': 'engagement',
        'event_label': 'neural_suite_demo'
      });
    }

    setTimeout(() => {
      setDemoStep('redirect');
      // Navigate to beta signup
      navigate('/beta-signup');
      onClose();
    }, 2000);
  };

  const handleDirectDemo = () => {
    // Track direct demo access
    if (typeof gtag !== 'undefined') {
      gtag('event', 'beta_signup_direct', {
        'event_category': 'engagement',
        'event_label': 'neural_suite_direct'
      });
    }
    
    navigate('/beta-signup');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="glass-card max-w-[95vw] sm:max-w-2xl w-full rounded-2xl md:rounded-3xl border border-neural-blue/20 shadow-2xl backdrop-blur-xl relative overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 neural-grid opacity-10"></div>
        <div className="absolute inset-0 neural-network-bg opacity-20"></div>
        
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-neural-blue/20 hover:bg-neural-blue/30 text-ghost-white hover:text-neural-blue transition-all duration-200 rounded-full p-2 backdrop-blur-sm border border-neural-blue/30 hover:border-neural-blue/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {demoStep === 'intro' && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-neural-blue/30 to-mind-purple/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-12 w-12 text-neural-blue demo-brain-sync" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-ghost-white mb-4 font-orbitron">
                  SkyBrain Neural Suite
                </h2>
                
                <p className="text-base sm:text-lg text-neural-gray leading-relaxed">
                  Experience the future of neural wellness technology. Our comprehensive suite includes EEG analysis, AI-powered insights, and blockchain data ownership. Join our beta program for early access.
                </p>
              </div>

              {/* Neural Suite Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Core Features */}
                <div className="p-4 sm:p-6 rounded-xl bg-neural-blue/5 border border-neural-blue/10">
                  <div className="flex items-center mb-4">
                    <Brain className="h-6 w-6 text-neural-blue mr-3" />
                    <h3 className="font-semibold text-ghost-white">Neural Analytics</h3>
                  </div>
                  <p className="text-sm text-neural-gray mb-4">
                    Advanced EEG signal processing with AI-powered insights for mental wellness optimization and cognitive enhancement.
                  </p>
                  <div className="space-y-2 text-xs text-neural-gray">
                    <div>• Real-time neural monitoring</div>
                    <div>• AI-powered pattern recognition</div>
                    <div>• Personalized wellness reports</div>
                    <div>• Clinical-grade analysis</div>
                  </div>
                </div>

                {/* Privacy & Blockchain */}
                <div className="p-4 sm:p-6 rounded-xl bg-mind-purple/5 border border-mind-purple/10">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-mind-purple mr-3" />
                    <h3 className="font-semibold text-ghost-white">Privacy First</h3>
                  </div>
                  <p className="text-sm text-neural-gray mb-4">
                    Blockchain-secured data ownership with end-to-end encryption ensuring your neural data remains private and under your control.
                  </p>
                  <div className="space-y-2 text-xs text-neural-gray">
                    <div>• Blockchain data ownership</div>
                    <div>• End-to-end encryption</div>
                    <div>• GDPR & HIPAA compliant</div>
                    <div>• Zero-knowledge processing</div>
                  </div>
                </div>
              </div>

              {/* Beta Program Benefits */}
              <div className="bg-neural-blue/5 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-neural-blue/10">
                <h3 className="font-semibold text-ghost-white mb-4 flex items-center">
                  <Zap className="h-5 w-5 text-neural-blue mr-2" />
                  Beta Program Benefits:
                </h3>
                <ul className="space-y-2 text-neural-gray">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-neural-blue rounded-full"></div>
                    <span>Early access to SkyBrain Neural Suite platform</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-neural-blue rounded-full"></div>
                    <span>Priority device access and hardware support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-neural-blue rounded-full"></div>
                    <span>Direct feedback channel with development team</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-neural-blue rounded-full"></div>
                    <span>Exclusive beta community and research participation</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  onClick={handleStartDemo}
                  className="cyber-button text-deep-space font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg group min-h-[44px]"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Join Beta Program
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <Button
                  onClick={() => setDemoStep('form')}
                  variant="outline"
                  className="glass-card border-neural-blue/40 text-neural-blue hover:bg-neural-blue/10 font-bold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg group min-h-[44px]"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Live Demo
                </Button>
              </div>

              <p className="text-xs text-neural-gray/70 text-center mt-4">
                Beta program • Early access • Full neural suite features
              </p>
            </>
          )}

          {demoStep === 'loading' && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-neural-blue/30 to-mind-purple/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Brain className="h-12 w-12 text-neural-blue neural-pulse" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                Redirecting to Beta Program...
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-neural-blue rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <p className="text-neural-gray mb-6">
                Taking you to the SkyBrain Neural Suite beta signup...
              </p>
              
              {/* Cancel/Close Button */}
              <Button
                onClick={onClose}
                variant="outline"
                className="glass-card border-neural-gray/40 text-neural-gray hover:bg-neural-gray/10 font-bold px-6 py-2"
              >
                Cancel
              </Button>
            </div>
          )}


          {demoStep === 'form' && (
            <div>
              <div className="text-center mb-6">
                <Button
                  onClick={() => setDemoStep('intro')}
                  variant="ghost"
                  className="text-neural-gray hover:text-neural-blue mb-4"
                >
                  ← Back to Demo Options
                </Button>
              </div>
              
              <DemoForm 
                onSuccess={() => {
                  // Handle successful form submission
                  setTimeout(() => {
                    onClose();
                  }, 3000);
                }}
                className="border-0 bg-transparent p-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;