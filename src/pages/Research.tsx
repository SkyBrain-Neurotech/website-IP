
import React from 'react';
import PageLayout from '@/components/PageLayout';
// import VisualCollabHub from '@/components/VisualCollabHub';

const Research = () => {
  return (
    <PageLayout>
      {/* Collaborate section temporarily hidden */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-ghost-white font-orbitron">
            Research & Development
          </h1>
          <p className="text-xl text-neural-gray mb-8">
            Coming Soon - Advanced Research Content
          </p>
          <div className="glass-card p-8 rounded-2xl">
            <p className="text-neural-blue font-semibold">
              This section is being updated with new research insights and collaboration opportunities.
            </p>
          </div>
        </div>
      </div>
      {/* <VisualCollabHub /> */}
    </PageLayout>
  );
};

export default Research;
