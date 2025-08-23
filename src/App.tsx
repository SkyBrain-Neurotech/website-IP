
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsProvider from "@/components/AnalyticsProvider";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Technology = lazy(() => import("./pages/Technology"));
const Applications = lazy(() => import("./pages/Applications"));
const Research = lazy(() => import("./pages/Research"));
const Videos = lazy(() => import("./pages/Videos"));
const Contact = lazy(() => import("./pages/Contact"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Team = lazy(() => import("./pages/Team"));
const BetaSignup = lazy(() => import("./pages/BetaSignup"));
const Blockchain = lazy(() => import("./pages/Blockchain"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-deep-space flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-neural-blue border-t-transparent rounded-full animate-pulse mx-auto mb-4"></div>
      <p className="text-neural-gray">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/research" element={<Research />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/blockchain" element={<Blockchain />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/beta-signup" element={<BetaSignup />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
