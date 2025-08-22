
import React from 'react';
import PageLayout from '@/components/PageLayout';
import VisionHero from '@/components/VisionHero';
import ProblemStatement from '@/components/ProblemStatement';
import FuturePromise from '@/components/FuturePromise';

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
      </div>
    </PageLayout>
  );
};

export default Index;
