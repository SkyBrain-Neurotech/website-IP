import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle2, ArrowRight, Users, Code, Microscope, TrendingUp, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BetaSignupForm from '@/components/BetaSignupForm';

const BetaSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<string>('');

  const userTypes = [
    {
      id: 'developer',
      title: 'Developer',
      description: 'Build BCI applications and integrate neural interfaces',
      icon: Code,
      benefits: ['Early API access', 'Developer documentation', 'Technical webinars', 'SDK preview']
    },
    {
      id: 'researcher',
      title: 'Researcher',
      description: 'Academic research and neuroscience applications',
      icon: Microscope,
      benefits: ['Research collaboration', 'Data access', 'Academic partnerships', 'Publication opportunities']
    },
    {
      id: 'consumer',
      title: 'Early Adopter',
      description: 'Experience next-generation BCI technology',
      icon: Users,
      benefits: ['Product previews', 'Beta testing access', 'Exclusive updates', 'Community access']
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Investment opportunities and business insights',
      icon: TrendingUp,
      benefits: ['Market insights', 'Investment updates', 'Executive access', 'Industry reports']
    }
  ];

  return (
    <section className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 neural-grid opacity-10"></div>
      <div className="absolute inset-0 neural-network-bg opacity-40"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back/Close Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="glass-card border-neural-blue/30 text-neural-blue hover:bg-neural-blue/10 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="icon"
            className="glass-card border-neural-blue/30 text-neural-blue hover:bg-neural-blue/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 mb-8 holographic">
            <Brain className="h-5 w-5 text-neural-blue neural-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide font-orbitron uppercase">
              Join the Neural Revolution
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-ghost-white">Get Early Access to</span>
            <br />
            <span className="bg-gradient-to-r from-neural-blue via-mind-purple to-neural-blue bg-clip-text text-transparent neural-glow">
              SkyBrain Technology
            </span>
          </h1>

          <p className="text-xl text-neural-gray max-w-3xl mx-auto leading-relaxed">
            Be among the first to experience revolutionary Brain-Computer Interface technology. 
            Join our beta program and help shape the future of neurotechnology.
          </p>
        </div>

        {currentStep === 1 ? (
          /* Step 1: User Type Selection */
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-ghost-white mb-4 font-orbitron">
                Choose Your Path
              </h2>
              <p className="text-neural-gray">
                Select the option that best describes your interest in SkyBrain technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = userType === type.id;

                return (
                  <div
                    key={type.id}
                    className={`glass-card p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected ? 'border-neural-blue/50 bg-neural-blue/10' : ''
                    }`}
                    onClick={() => setUserType(type.id)}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`p-3 rounded-xl ${
                        isSelected ? 'bg-neural-blue/30' : 'bg-neural-blue/20'
                      }`}>
                        <IconComponent className="h-8 w-8 text-neural-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-ghost-white mb-2 font-orbitron">
                          {type.title}
                        </h3>
                        <p className="text-neural-gray text-sm leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-6 w-6 text-neural-blue" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-ghost-white mb-3">
                        What you'll get:
                      </h4>
                      {type.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-neural-blue rounded-full"></div>
                          <span className="text-sm text-neural-gray">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!userType}
                className="cyber-button text-deep-space font-bold px-12 py-4 text-lg rounded-xl group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        ) : (
          /* Step 2: Signup Form */
          <BetaSignupForm 
            userType={userType}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-4">
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-neural-blue shadow-lg shadow-neural-blue/50'
                    : 'bg-neural-gray/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaSignup;