
import React from 'react';
import PageLayout from '@/components/PageLayout';
import VisionHero from '@/components/VisionHero';
import ProblemStatement from '@/components/ProblemStatement';
import FuturePromise from '@/components/FuturePromise';
import SimpleNewsletterSignup from '@/components/SimpleNewsletterSignup';

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <VisionHero />

      {/* Core Content - Essential Sections */}
      <div className="space-y-0">
        {/* Future Promise - Vision Section */}
        <section className="relative">
          <FuturePromise />
        </section>

        {/* Problem Statement - Why it matters */}
        <section className="relative">
          <ProblemStatement />
        </section>

        {/* Newsletter Signup - Easy access */}
        <section className="relative py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ghost-white mb-4 font-orbitron">
                Stay Connected
              </h2>
              <p className="text-xl text-neural-gray max-w-2xl mx-auto">
                Be the first to know about breakthrough developments in brain-computer interface technology.
              </p>
            </div>
            
            <div className="flex justify-center">
              <SimpleNewsletterSignup 
                size="large"
                showTitle={false}
                className="max-w-lg w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Index;
