import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AdvancedNeuralLightning from './AdvancedNeuralLightning';

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
      {/* Advanced Neural Lightning Background */}
      <AdvancedNeuralLightning />
      
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