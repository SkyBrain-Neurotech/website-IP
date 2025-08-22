
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import Index from "./pages/Index";
import Technology from "./pages/Technology";
import Applications from "./pages/Applications";
import Research from "./pages/Research";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
import BetaSignup from "./pages/BetaSignup";
import Blockchain from "./pages/Blockchain";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsProvider>
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
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
