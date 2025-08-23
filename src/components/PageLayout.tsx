import React, { ReactNode, useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

// Lazy load the heavy animation component
const AdvancedNeuralLightning = lazy(() => import('./AdvancedNeuralLightning'));

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced Neural Lightning Background with error boundary and lazy loading */}
      <ErrorBoundary 
        componentName="Neural Animation"
        fallback={<div className="fixed inset-0 bg-deep-space" />}
      >
        <Suspense fallback={<div className="fixed inset-0 bg-deep-space" />}>
          <AdvancedNeuralLightning />
        </Suspense>
      </ErrorBoundary>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;