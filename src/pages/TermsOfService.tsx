import React, { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { AlertTriangle, Shield, Brain, FileText } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    // Set page title and meta tags for SEO
    document.title = 'Terms of Service - SkyBrain by Neural Core | Legal Agreement & Indian Law Compliance';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'SkyBrain by Neural Core Terms of Service. Legal agreement for our EEG neurotechnology platform. Compliant with DPDP Act 2023, IT Act 2000, and Google verification requirements.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'SkyBrain by Neural Core Terms of Service. Legal agreement for our EEG neurotechnology platform. Compliant with DPDP Act 2023, IT Act 2000, and Google verification requirements.';
      document.head.appendChild(meta);
    }

    // Add structured data for Google
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service",
      "description": "SkyBrain by Neural Core Terms of Service - Legal Agreement & Compliance Framework",
      "url": "https://skybrain.in/terms-of-service",
      "isPartOf": {
        "@type": "WebSite",
        "name": "SkyBrain by Neural Core",
        "url": "https://skybrain.in"
      },
      "about": {
        "@type": "Organization",
        "name": "Neural Core Private Limited",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "India"
        }
      },
      "dateModified": "2025-08-03",
      "inLanguage": "en-IN"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://skybrain.in/terms-of-service');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://skybrain.in/terms-of-service';
      document.head.appendChild(link);
    }

    // Cleanup on unmount
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-deep-space via-shadow-black to-deep-space">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <FileText className="h-16 w-16 text-neural-blue mr-6" />
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-ghost-white font-orbitron leading-tight">
                  Terms of Service
                </h1>
                <p className="text-neural-blue text-lg mt-2 font-medium">
                  Legal Agreement & User Guidelines
                </p>
              </div>
            </div>
            <div className="glass-container p-4 max-w-3xl mx-auto">
              <p className="text-neural-gray text-lg">
                <span className="font-semibold">Effective Date:</span> August 2, 2025 | 
                <span className="font-semibold"> Last Updated:</span> August 2, 2025
              </p>
            </div>
          </div>

          {/* Critical Notice */}
          <div className="glass-container p-6 mb-8 border-l-4 border-red-500">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-ghost-white mb-2">CRITICAL NOTICE</h3>
                <p className="text-neural-gray">
                  SkyBrain is a research and wellness application for educational and personal insight purposes only. 
                  It is <strong>NOT a medical device</strong> and does <strong>NOT provide medical diagnoses, treatment, or medical advice</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="glass-container p-8 lg:p-12 space-y-12">
            
            {/* Agreement to Terms */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-neural-blue mb-4 font-orbitron flex items-center justify-center">
                  <FileText className="h-8 w-8 mr-3" />
                  Agreement to Terms
                </h2>
                <p className="text-neural-gray max-w-3xl mx-auto leading-relaxed">
                  By using our Service, you enter into a legal agreement with Neural Core Private Limited.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="glass-badge p-6">
                  <p className="text-neural-gray leading-relaxed text-center">
                    By accessing or using the SkyBrain application ("Service") provided by <strong className="text-ghost-white">Neural Core Private Limited</strong> 
                    ("SkyBrain," "we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). 
                    If you disagree with any part of these terms, you may not access the Service.
                  </p>
                </div>
                
                <div className="glass-badge p-6 border-l-4 border-blue-500">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">⚖️ Legal Framework</h3>
                    <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
                  </div>
                  <p className="text-neural-gray text-center">
                    These Terms comply with India's Digital Personal Data Protection Act 2023, Information Technology Act 2000, 
                    Google's verification requirements, and international standards. By using our Service, you acknowledge our 
                    compliance with these legal frameworks.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-neural-blue mb-4 font-orbitron flex items-center justify-center">
                  <Brain className="h-8 w-8 mr-3" />
                  Description of Service
                </h2>
                <p className="text-neural-gray max-w-3xl mx-auto leading-relaxed">
                  Understanding what SkyBrain is and what it is NOT - important distinctions for your safety and compliance.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-badge p-6 border-l-4 border-green-500 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">✅ What SkyBrain IS</h3>
                    <div className="w-12 h-0.5 bg-green-500 mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Connects with compatible EEG devices (BrainBit, etc.) for brain activity monitoring</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Records and analyzes brainwave patterns for research and wellness purposes</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Provides data visualization, analytics, and personal insights</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Offers tools for session management and data export</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span>Supports neuroscience research through optional data contribution</li>
                  </ul>
                </div>

                <div className="glass-badge p-6 border-l-4 border-red-500 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">❌ What SkyBrain Is NOT</h3>
                    <div className="w-12 h-0.5 bg-red-500 mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>A medical device or medical software</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>A diagnostic tool for medical conditions</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>A treatment or therapy platform</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>A substitute for professional medical care</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Approved by medical regulatory authorities (FDA, CE Medical, etc.)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Medical Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron flex items-center">
                <Brain className="h-6 w-6 mr-2" />
                Medical Disclaimers and Limitations
              </h2>
              
              <div className="glass-badge p-6 border-l-4 border-yellow-500 mb-6">
                <h3 className="text-xl font-bold text-red-400 mb-3">NOT FOR MEDICAL USE</h3>
                <p className="text-neural-gray mb-4">
                  <strong>CRITICAL WARNING:</strong> SkyBrain is strictly for research, educational, and wellness purposes only.
                </p>
                
                <div className="space-y-3 text-sm text-neural-gray">
                  <p>• <strong>No Diagnosis:</strong> Cannot diagnose medical conditions, neurological disorders, or mental health conditions</p>
                  <p>• <strong>No Treatment:</strong> Does not provide medical treatment, therapy, or therapeutic interventions</p>
                  <p>• <strong>No Medical Advice:</strong> Information provided is not medical advice</p>
                  <p>• <strong>Consult Healthcare Providers:</strong> Always consult qualified healthcare professionals for medical concerns</p>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Acceptable Use Policy</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-badge p-4 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Permitted Uses</h3>
                  <ul className="space-y-2 text-sm text-neural-gray">
                    <li>• Personal brain activity monitoring and wellness insights</li>
                    <li>• Educational purposes and learning about neuroscience</li>
                    <li>• Legitimate research activities</li>
                    <li>• Data analysis of your own EEG recordings</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-4 border-l-4 border-red-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Prohibited Uses</h3>
                  <ul className="space-y-2 text-sm text-neural-gray">
                    <li>• Medical diagnosis or treatment decisions</li>
                    <li>• Professional medical or clinical applications</li>
                    <li>• Unauthorized access to other users' data</li>
                    <li>• Reverse engineering or extracting source code</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Rights */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Data Ownership and Rights
              </h2>
              
              <div className="space-y-4 text-neural-gray">
                <p>
                  <strong>Your Data Rights:</strong> You retain ownership of your personal EEG data and recordings. 
                  You can access, download, and delete your data at any time.
                </p>
                <p>
                  <strong>Data Processing:</strong> By using the Service, you grant SkyBrain the right to process your data 
                  to provide the Service and use anonymized, aggregated data for service improvement.
                </p>
                <p>
                  <strong>Research Participation:</strong> Research participation is always voluntary and optional. 
                  You can withdraw from research at any time without penalty.
                </p>
              </div>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Service Availability</h2>
              <div className="space-y-3 text-neural-gray">
                <p>• SkyBrain provides service on a "best effort" basis with no guarantee of 100% availability</p>
                <p>• We may update or modify the service at any time</p>
                <p>• Support is available through email and in-app channels</p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Limitation of Liability</h2>
              <div className="glass-badge p-4 border-l-4 border-yellow-500">
                <p className="text-neural-gray text-sm">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES. 
                  SkyBrain shall not be liable for indirect damages, lost profits, data loss, or service interruptions. 
                  Total liability is limited to the amount paid for the Service in the past 12 months.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Termination</h2>
              <div className="space-y-3 text-neural-gray">
                <p>• You may delete your account at any time</p>
                <p>• SkyBrain may terminate accounts for Terms violation, illegal activity, or service abuse</p>
                <p>• Upon termination, you lose immediate access to the Service</p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Changes to Terms</h2>
              <p className="text-neural-gray">
                SkyBrain may modify these Terms at any time with reasonable notice. 
                Continued use constitutes acceptance of modified Terms.
              </p>
            </section>

            {/* Legal Compliance and Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Legal Compliance and Governing Law</h2>
              
              <div className="space-y-6">
                <div className="glass-badge p-4 border-l-4 border-orange-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Indian Legal Compliance</h3>
                  <div className="space-y-2 text-neural-gray text-sm">
                    <p>• <strong>Digital Personal Data Protection Act 2023:</strong> We comply with all provisions as a data fiduciary</p>
                    <p>• <strong>Information Technology Act 2000:</strong> Security practices align with Section 43A requirements</p>
                    <p>• <strong>Consumer Protection Act 2019:</strong> Service provision complies with consumer protection norms</p>
                    <p>• <strong>Indian Contract Act 1872:</strong> These Terms form a valid contract under Indian law</p>
                  </div>
                </div>
                
                <div className="glass-badge p-4 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Governing Law and Jurisdiction</h3>
                  <div className="space-y-2 text-neural-gray text-sm">
                    <p>• <strong>Applicable Law:</strong> These Terms are governed by the laws of India</p>
                    <p>• <strong>Jurisdiction:</strong> Courts in Bangalore, Karnataka, India have exclusive jurisdiction</p>
                    <p>• <strong>Dispute Resolution:</strong> Mandatory arbitration under Arbitration and Conciliation Act 2015</p>
                    <p>• <strong>Seat of Arbitration:</strong> Bangalore, Karnataka, India</p>
                  </div>
                </div>
                
                <div className="glass-badge p-4 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">International Compliance</h3>
                  <div className="space-y-2 text-neural-gray text-sm">
                    <p>• <strong>Google API Compliance:</strong> Adheres to Google API Services User Data Policy</p>
                    <p>• <strong>GDPR Compliance:</strong> Extended rights for EU users where applicable</p>
                    <p>• <strong>Export Controls:</strong> Compliance with Indian and international export control laws</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Company Information */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Company Information</h2>
              <div className="glass-badge p-4 border-l-4 border-neural-blue">
                <div className="space-y-2 text-neural-gray">
                  <p><strong>Company Name:</strong> Neural Core Private Limited</p>
                  <p><strong>Registered Address:</strong> Bangalore, Karnataka, India</p>
                  <p><strong>Corporate Identification Number (CIN):</strong> [To be filled when company is incorporated]</p>
                  <p><strong>Website:</strong> https://skybrain.in</p>
                  <p><strong>Terms of Service URL:</strong> https://skybrain.in/terms-of-service</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Contact Information</h2>
              <div className="glass-badge p-6 border-l-4 border-neural-blue">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-ghost-white mb-4">All Inquiries & Support</h3>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-neural-blue">info@skybrain.in</p>
                    <div className="text-neural-gray space-y-1">
                      <p>• General inquiries and support</p>
                      <p>• Legal notices and compliance</p>
                      <p>• Security concerns and reports</p>
                      <p>• Indian regulatory matters</p>
                      <p>• Terms of Service questions</p>
                      <p>• Business and partnership inquiries</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-neural-gray">
                      Please specify the nature of your inquiry in the subject line for faster response
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Final Medical Reminder */}
          <div className="glass-container p-6 mt-8 border-l-4 border-red-500 text-center">
            <h3 className="text-xl font-bold text-red-400 mb-3">FINAL MEDICAL REMINDER</h3>
            <p className="text-neural-gray">
              <strong>SkyBrain is NOT a medical device. Do not use for medical diagnosis, treatment, or medical decision-making. 
              Always consult qualified healthcare professionals for medical concerns.</strong>
            </p>
            <p className="text-neural-gray mt-2">
              By using SkyBrain, you acknowledge that you understand its limitations and non-medical nature.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsOfService;