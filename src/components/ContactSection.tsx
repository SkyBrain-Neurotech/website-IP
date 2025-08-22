
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { validateContactForm, trackFormSubmission } from '@/lib/formHandler';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send,
  Brain,
  Linkedin,
  Github,
  Youtube,
  ExternalLink,
  Microscope,
  Building2,
  Users,
  Code,
  Heart,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interestArea: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      // Use our new Google Sheets API integration
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        trackFormSubmission('google_sheets_api', true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          interestArea: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || 'Form submission failed');
        trackFormSubmission('google_sheets_api', false);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again or contact us directly at info@skybrain.in');
      trackFormSubmission('enhanced_form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const involvementOptions = [
    {
      icon: Microscope,
      title: "Research Collaboration",
      description: "Join our research initiatives in non-invasive BCI technology",
      action: "Partner with Us",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Building2,
      title: "Enterprise Integration",
      description: "Integrate BCI technology into your applications and products",
      action: "Business Partnership",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Developer Community",
      description: "Build with our BCI APIs and contribute to open-source projects",
      action: "Join Developers",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Clinical Applications",
      description: "Explore BCI applications in healthcare and mental wellness",
      action: "Healthcare Partners",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Community Advocacy",
      description: "Help promote ethical neurotechnology and mental health awareness",
      action: "Become an Advocate",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Innovation Lab",
      description: "Explore cutting-edge applications of BCI in your field",
      action: "Innovation Partnership",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 neural-network-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Brain className="h-5 w-5 text-neural-blue home-sync-group sync-stagger-1" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase">Get Involved</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
            <span className="text-ghost-white">Shape the Future of</span>{' '}
            <span className="text-neural-blue font-orbitron">
              Neurotechnology
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Whether you're a researcher, developer, healthcare provider, or innovator - 
            there are many ways to contribute to the BCI revolution.
          </p>
        </div>

        {/* Ways to Get Involved */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-12 text-center text-ghost-white font-orbitron">
            Ways to Get Involved
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {involvementOptions.map((option, index) => (
              <Card key={option.title} className="glass-card border-neural-blue/20 hover:border-neural-blue/40 transition-all group hover:scale-105">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className={`p-4 bg-gradient-to-r ${option.color} bg-opacity-20 rounded-xl mx-auto w-fit mb-4`}>
                    <option.icon className="h-8 w-8 text-neural-blue group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xl font-bold text-ghost-white mb-3 group-hover:text-neural-blue transition-colors font-orbitron">
                    {option.title}
                  </h4>
                  <p className="text-neural-gray mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <Button className="cyber-button w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <Card className="glass-card border-neural-blue/20 holographic">
            <CardContent className="p-6 md:p-8 lg:p-10">
              <h3 className="text-3xl font-bold mb-8 text-ghost-white font-orbitron">Send us a Message</h3>
              {/* Form Status Messages */}
              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div>
                      <div className="text-red-400 font-semibold mb-1">Please fix the following errors:</div>
                      <ul className="text-red-300 text-sm space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-green-400 font-semibold mb-1">Message sent successfully!</div>
                      <div className="text-green-300 text-sm">{submitMessage}</div>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && submitMessage && !errors.length && (
                <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-yellow-400 font-semibold mb-1">Submission Notice</div>
                      <div className="text-yellow-300 text-sm">{submitMessage}</div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neural-gray mb-3 uppercase tracking-wide">
                      First Name
                    </label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name" 
                      required
                      disabled={isSubmitting}
                      className="glass-card border-neural-blue/30 focus:border-neural-blue text-base sm:text-lg py-4 sm:py-5 md:py-6 rounded-xl disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neural-gray mb-3 uppercase tracking-wide">
                      Last Name
                    </label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name" 
                      required
                      disabled={isSubmitting}
                      className="glass-card border-neural-blue/30 focus:border-neural-blue text-base sm:text-lg py-4 sm:py-5 md:py-6 rounded-xl disabled:opacity-50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neural-gray mb-3 uppercase tracking-wide">
                    Email
                  </label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com" 
                    required
                    disabled={isSubmitting}
                    className="glass-card border-neural-blue/30 focus:border-neural-blue text-base sm:text-lg py-4 sm:py-5 md:py-6 rounded-xl disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neural-gray mb-3 uppercase tracking-wide">
                    Interest Area
                  </label>
                  <Input 
                    name="interestArea"
                    value={formData.interestArea}
                    onChange={handleInputChange}
                    placeholder="Research, Enterprise, Development, Healthcare..." 
                    disabled={isSubmitting}
                    className="glass-card border-neural-blue/30 focus:border-neural-blue text-base sm:text-lg py-4 sm:py-5 md:py-6 rounded-xl disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neural-gray mb-3 uppercase tracking-wide">
                    Message
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    rows={4}
                    required
                    disabled={isSubmitting}
                    className="glass-card border-neural-blue/30 focus:border-neural-blue resize-none text-base sm:text-lg p-4 sm:p-5 md:p-6 rounded-xl md:rows-6 disabled:opacity-50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full cyber-button text-primary-foreground font-bold py-4 sm:py-5 md:py-6 text-lg sm:text-xl rounded-xl group min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            <Card className="glass-card border-neural-blue/20 holographic">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-ghost-white font-orbitron">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, text: "info@skybrain.in", gradient: "from-blue-500 to-cyan-500" },
                    { icon: Phone, text: "+91 93807 17022", gradient: "from-green-500 to-emerald-500" },
                    { icon: MapPin, text: "Bangalore, India", gradient: "from-purple-500 to-pink-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center group">
                      <div className={`p-3 bg-gradient-to-r ${item.gradient} bg-opacity-20 rounded-xl mr-4`}>
                        <item.icon className="h-6 w-6 text-neural-blue group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-neural-gray text-lg font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-neural-blue/20 holographic">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-ghost-white font-orbitron">Follow Our Research</h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-card border-neural-blue/30 text-neural-blue p-3 rounded-xl hover:border-neural-blue/50 hover:bg-neural-blue/10 transition-all group"
                    onClick={() => window.open('https://linktr.ee/skybrain', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-card border-neural-blue/30 text-neural-blue p-3 rounded-xl hover:border-neural-blue/50 hover:bg-neural-blue/10 transition-all group"
                    onClick={() => window.open('https://www.linkedin.com/company/skybrain-neurotech/', '_blank')}
                  >
                    <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-card border-neural-blue/30 text-neural-blue p-3 rounded-xl hover:border-neural-blue/50 hover:bg-neural-blue/10 transition-all group"
                    onClick={() => window.open('https://www.youtube.com/@skybrainneurotech', '_blank')}
                  >
                    <Youtube className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-card border-neural-blue/30 text-neural-blue p-3 rounded-xl hover:border-neural-blue/50 hover:bg-neural-blue/10 transition-all group"
                    onClick={() => window.open('GITHUB_URL_PLACEHOLDER', '_blank')}
                  >
                    <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-neural-blue/40 bg-gradient-to-br from-neural-blue/10 to-mind-purple/10 holographic">
              <CardContent className="p-10 text-center">
                <div className="relative mb-6">
                  <Brain className="h-16 w-16 text-neural-blue mx-auto contact-brain-sync" />
                  <div className="absolute inset-0 h-16 w-16 bg-neural-blue/20 rounded-full blur-xl mx-auto"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-ghost-white font-orbitron">
                  Ready to Explore BCI?
                </h3>
                <p className="text-neural-gray text-lg mb-6">
                  Schedule a demo and experience the future of neurotechnology.
                </p>
                <Button className="cyber-button text-primary-foreground font-bold px-8 py-4 text-lg rounded-xl">
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
