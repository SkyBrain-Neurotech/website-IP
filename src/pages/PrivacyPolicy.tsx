import React, { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Shield, Database, Eye, Lock, Globe, Mail, Brain } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Set page title and meta tags for SEO
    document.title = 'Privacy Policy - SkyBrain by Neural Core | Data Protection & DPDP Act 2023 Compliance';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'SkyBrain by Neural Core Privacy Policy. DPDP Act 2023, IT Act 2000, GDPR & Google compliant. Learn how we protect your EEG data and neural information in our neurotechnology research platform.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'SkyBrain by Neural Core Privacy Policy. DPDP Act 2023, IT Act 2000, GDPR & Google compliant. Learn how we protect your EEG data and neural information in our neurotechnology research platform.';
      document.head.appendChild(meta);
    }

    // Add structured data for Google
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "SkyBrain by Neural Core Privacy Policy - DPDP Act 2023 & Google Verification Compliant",
      "url": "https://skybrain.in/privacy-policy",
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
      canonical.setAttribute('href', 'https://skybrain.in/privacy-policy');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://skybrain.in/privacy-policy';
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
              <Shield className="h-16 w-16 text-neural-blue mr-6" />
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-ghost-white font-orbitron leading-tight">
                  Privacy Policy
                </h1>
                <p className="text-neural-blue text-lg mt-2 font-medium">
                  Data Protection & Compliance Framework
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

          {/* Overview */}
          <div className="glass-container p-6 mb-8 border-l-4 border-neural-blue">
            <div className="flex items-start">
              <Eye className="h-6 w-6 text-neural-blue mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-ghost-white mb-2">Our Commitment to Privacy</h3>
                <p className="text-neural-gray">
                  Neural Core Private Limited ("SkyBrain," "we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  EEG research and wellness application ("Service").
                </p>
                <p className="text-neural-gray mt-2">
                  <strong>Important:</strong> SkyBrain is a research and wellness tool for educational and personal purposes only - 
                  it is NOT a medical device and does NOT provide medical diagnosis, treatment, or medical advice.
                </p>
                <p className="text-neural-gray mt-2">
                  <strong>Legal Compliance:</strong> This policy complies with India's Digital Personal Data Protection Act 2023 (DPDP), 
                  Information Technology Act 2000, Google's verification requirements, and international standards including GDPR and CCPA.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="glass-container p-8 lg:p-12 space-y-12">
            
            {/* Information We Collect */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-neural-blue mb-4 font-orbitron flex items-center justify-center">
                  <Database className="h-8 w-8 mr-3" />
                  Information We Collect
                </h2>
                <p className="text-neural-gray max-w-3xl mx-auto leading-relaxed">
                  We collect only the essential information needed to provide our EEG research and wellness services while maintaining strict privacy standards.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-badge p-6 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">🧠 EEG Data</h3>
                    <div className="w-12 h-0.5 bg-neural-blue mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Brain activity recordings from compatible EEG devices</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Session metadata (duration, timestamp, device info)</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Signal quality metrics and electrode measurements</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Processed analytics (frequency analysis, IAPF calculations)</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-6 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">👤 Account Information</h3>
                    <div className="w-12 h-0.5 bg-neural-blue mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Email address for authentication</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>User preferences and application settings</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Session notes and custom labels</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Optional profile information</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-6 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">⚙️ Technical Information</h3>
                    <div className="w-12 h-0.5 bg-neural-blue mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Device info (browser, OS, device model)</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Usage data (features accessed, session frequency)</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Performance metrics for optimization</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Error logs for debugging</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-6 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">📋 Optional Information</h3>
                    <div className="w-12 h-0.5 bg-neural-blue mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Research participation data (with consent)</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Feedback and support communications</li>
                    <li className="flex items-start"><span className="text-neural-blue mr-2">•</span>Additional profile details you choose to provide</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-neural-blue mb-4 font-orbitron flex items-center justify-center">
                  <Eye className="h-8 w-8 mr-3" />
                  How We Use Your Information
                </h2>
                <p className="text-neural-gray max-w-3xl mx-auto leading-relaxed">
                  We use your information responsibly and transparently, with clear purposes and strong safeguards to protect your privacy.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="glass-badge p-6 border-l-4 border-green-500">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">✅ Primary Uses</h3>
                    <div className="w-12 h-0.5 bg-green-500 mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span><strong>EEG Analysis:</strong> Process and analyze brain activity data for personal insights</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span><strong>Session Management:</strong> Store and organize your recording sessions</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span><strong>Data Visualization:</strong> Generate charts, trends, and analytics dashboards</li>
                    <li className="flex items-start"><span className="text-green-400 mr-2">•</span><strong>Quality Assurance:</strong> Monitor signal quality and provide feedback</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-6 border-l-4 border-blue-500">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">🔧 Secondary Uses</h3>
                    <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span><strong>Service Improvement:</strong> Enhance application features and performance</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span><strong>Research Support:</strong> Aggregate anonymous data for neuroscience research (with consent)</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span><strong>Technical Support:</strong> Provide customer service and troubleshooting</li>
                    <li className="flex items-start"><span className="text-blue-400 mr-2">•</span><strong>Security:</strong> Protect against fraud, abuse, and security threats</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-6 border-l-4 border-red-500">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-ghost-white mb-2">❌ We DO NOT Use Your Data For</h3>
                    <div className="w-12 h-0.5 bg-red-500 mx-auto"></div>
                  </div>
                  <ul className="space-y-3 text-neural-gray">
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Sharing with healthcare providers without explicit consent</li>
                    <li className="flex items-start"><span className="text-red-400 mr-2">•</span>Commercial sale to third parties</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron flex items-center">
                <Lock className="h-6 w-6 mr-2" />
                Data Storage and Security
              </h2>
              
              <div className="space-y-4">
                <div className="glass-badge p-4">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Storage Infrastructure</h3>
                  <ul className="space-y-2 text-neural-gray">
                    <li>• <strong>Primary Database:</strong> Supabase (PostgreSQL) with enterprise-grade security</li>
                    <li>• <strong>Data Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                    <li>• <strong>Geographic Location:</strong> Secure data centers with SOC 2 compliance</li>
                    <li>• <strong>Backup Systems:</strong> Regular automated backups with 30-day retention</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-4">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Security Measures</h3>
                  <ul className="space-y-2 text-neural-gray">
                    <li>• Role-based access controls with multi-factor authentication</li>
                    <li>• Data minimization - we collect only necessary data</li>
                    <li>• Regular security assessments and vulnerability testing</li>
                    <li>• Established incident response procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Data Sharing and Disclosure</h2>
              
              <div className="glass-badge p-6 border-l-4 border-green-500 mb-4">
                <h3 className="text-xl font-bold text-ghost-white mb-2">WE DO NOT SELL YOUR DATA</h3>
                <p className="text-neural-gray">
                  SkyBrain does not sell, rent, or lease your personal information or EEG data to third parties.
                </p>
              </div>
              
              <div className="space-y-3 text-neural-gray">
                <p><strong>Limited Sharing Scenarios:</strong> We may share your information only in specific circumstances:</p>
                <ul className="space-y-2 ml-4">
                  <li>• With your explicit consent</li>
                  <li>• With trusted service providers under strict confidentiality agreements</li>
                  <li>• When required by law or valid legal process</li>
                  <li>• To protect rights, property, or safety</li>
                  <li>• In case of business transfers (with notice to users)</li>
                </ul>
              </div>
            </section>

            {/* Your Privacy Rights */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Your Privacy Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-badge p-4">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Data Access & Control</h3>
                  <ul className="space-y-2 text-sm text-neural-gray">
                    <li>• View all your personal information and EEG data</li>
                    <li>• Download your data in standard formats (CSV, HDF5)</li>
                    <li>• Update or correct your personal information</li>
                    <li>• Request deletion of your account and data</li>
                  </ul>
                </div>
                
                <div className="glass-badge p-4">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Communication Preferences</h3>
                  <ul className="space-y-2 text-sm text-neural-gray">
                    <li>• Control notification frequency and types</li>
                    <li>• Unsubscribe from promotional communications</li>
                    <li>• Opt in or out of research opportunities</li>
                    <li>• Manage data sharing preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Data Retention</h2>
              <div className="space-y-4">
                <div className="glass-badge p-4">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Retention Periods</h3>
                  <div className="space-y-2 text-neural-gray">
                    <p>• <strong>Active Accounts:</strong> Data retained while account is active and for legitimate business purposes</p>
                    <p>• <strong>Inactive Accounts:</strong> Data deletion after 2 years of inactivity (with 90-day notice as per DPDP Act)</p>
                    <p>• <strong>Deleted Accounts:</strong> Complete data purge within 30 days of deletion request</p>
                    <p>• <strong>EEG Data:</strong> Deleted upon account deletion unless explicitly consented for research</p>
                    <p>• <strong>Legal Requirements:</strong> Some data may be retained longer if required by Indian law</p>
                  </div>
                </div>
                
                <div className="glass-badge p-4">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Automatic Data Management</h3>
                  <div className="space-y-2 text-neural-gray">
                    <p>• <strong>Session Data:</strong> Old sessions automatically archived after 1 year (unless starred)</p>
                    <p>• <strong>Log Data:</strong> Technical logs purged after 90 days</p>
                    <p>• <strong>Temporary Data:</strong> Cache and temporary files cleared regularly</p>
                    <p>• <strong>Consent Records:</strong> Maintained for audit purposes as required by DPDP Act</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Breach Notification */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Data Breach Notification
              </h2>
              <div className="glass-badge p-4 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-ghost-white mb-3">Breach Response Protocol</h3>
                <div className="space-y-2 text-neural-gray">
                  <p>• <strong>DPDP Act Compliance:</strong> We will notify the Data Protection Board of India within 72 hours of becoming aware of a personal data breach</p>
                  <p>• <strong>User Notification:</strong> Affected users will be notified without undue delay when the breach poses a high risk to their rights</p>
                  <p>• <strong>Google API Compliance:</strong> Any breach involving Google user data will be reported according to Google's requirements</p>
                  <p>• <strong>Documentation:</strong> All breaches documented with details, effects, and remedial actions taken</p>
                  <p>• <strong>Continuous Monitoring:</strong> 24/7 security monitoring and incident response procedures</p>
                </div>
              </div>
            </section>

            {/* Legal Compliance - India and International */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron flex items-center">
                <Globe className="h-6 w-6 mr-2" />
                Legal Compliance Framework
              </h2>
              
              <div className="space-y-6">
                <div className="glass-badge p-4 border-l-4 border-orange-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Indian Data Protection Laws</h3>
                  <div className="space-y-2 text-neural-gray text-sm">
                    <p>• <strong>Digital Personal Data Protection Act (DPDP) 2023:</strong> We comply with India's comprehensive data protection framework for digital personal data processing</p>
                    <p>• <strong>Information Technology Act 2000:</strong> Our security practices align with Section 43A and the Privacy Rules 2011</p>
                    <p>• <strong>Consent Requirements:</strong> We obtain free, specific, informed, and unambiguous consent as required under DPDP 2023</p>
                    <p>• <strong>Data Fiduciary Obligations:</strong> We fulfill our responsibilities as a data fiduciary under Indian law</p>
                    <p>• <strong>Cross-border Data Transfer:</strong> International transfers comply with DPDP Act provisions</p>
                  </div>
                </div>
                
                <div className="glass-badge p-4 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">International Compliance</h3>
                  <div className="space-y-2 text-neural-gray text-sm">
                    <p>• <strong>GDPR (EU):</strong> Enhanced rights for European users including data portability and erasure</p>
                    <p>• <strong>CCPA (California):</strong> Additional rights for California residents</p>
                    <p>• <strong>Google Verification:</strong> Complies with Google's API Services User Data Policy and verification requirements</p>
                    <p>• <strong>Data Transfer Safeguards:</strong> Appropriate safeguards for international data transfers</p>
                  </div>
                </div>
                
                <div className="glass-badge p-4 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-ghost-white mb-3">Neurotechnology-Specific Compliance</h3>
                  <div className="space-y-2 text-neural-gray text-sm">
                    <p>• <strong>Sensitive Personal Data:</strong> EEG data treated as sensitive under Indian Privacy Rules</p>
                    <p>• <strong>Research Ethics:</strong> Neuroscience research conducted under appropriate ethical frameworks</p>
                    <p>• <strong>Medical Disclaimer:</strong> Clear distinction from medical devices and medical data processing</p>
                    <p>• <strong>Biometric Data Protection:</strong> Enhanced security for neural pattern data</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Children's Privacy</h2>
              <div className="glass-badge p-4 border-l-4 border-yellow-500">
                <p className="text-neural-gray">
                  SkyBrain is not intended for children under 13. We do not knowingly collect personal information 
                  from children under 13. For users 13-17, parental consent may be required depending on jurisdiction.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron">Changes to This Policy</h2>
              <div className="space-y-3 text-neural-gray">
                <p>• Registered users will be notified of significant changes via email</p>
                <p>• Updated policy posted on our website with clear effective dates</p>
                <p>• Material changes clearly highlighted and explained</p>
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
                  <p><strong>Data Fiduciary under DPDP Act 2023:</strong> Yes</p>
                  <p><strong>Website:</strong> https://skybrain.in</p>
                  <p><strong>Privacy Policy URL:</strong> https://skybrain.in/privacy-policy</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-neural-blue mb-4 font-orbitron flex items-center">
                <Mail className="h-6 w-6 mr-2" />
                Contact Information
              </h2>
              <div className="glass-badge p-6 border-l-4 border-neural-blue">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-ghost-white mb-4">All Inquiries & Support</h3>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-neural-blue">info@skybrain.in</p>
                    <div className="text-neural-gray space-y-1">
                      <p>• Privacy inquiries and data subject requests</p>
                      <p>• GDPR, DPDP Act, and data protection compliance</p>
                      <p>• Technical support and general questions</p>
                      <p>• Legal notices and compliance matters</p>
                      <p>• Security issues and breach notifications</p>
                      <p>• Indian regulatory and DPDP Act matters</p>
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

          {/* Medical Disclaimer */}
          <div className="glass-container p-6 mt-8 border-l-4 border-red-500 text-center">
            <div className="flex items-center justify-center mb-3">
              <Brain className="h-6 w-6 text-red-400 mr-2" />
              <h3 className="text-xl font-bold text-red-400">IMPORTANT MEDICAL DISCLAIMER</h3>
            </div>
            <p className="text-neural-gray">
              <strong>SkyBrain is NOT a medical device and is NOT intended for medical use.</strong> 
              The Service does not diagnose medical conditions, provide medical advice, or replace professional medical consultation. 
              For medical concerns, always consult qualified healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;