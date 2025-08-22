
import React from 'react';
import PageLayout from '@/components/PageLayout';
import TechnologyExplanation from '@/components/TechnologyExplanation';
import TechnologySection from '@/components/TechnologySection';
import AdvancedNeuralLightning from '@/components/AdvancedNeuralLightning';
import InteractiveNeuralNetwork from '@/components/InteractiveNeuralNetwork';
import BrainNeuralFiring from '@/components/BrainNeuralFiring';
import BCIExplanation from '@/components/BCIExplanation';
import iAPFExplanation from '@/components/iAPFExplanation';
import VisualiAPF from '@/components/VisualiAPF';

const Technology = () => {
  return (
    <PageLayout>
      {/* Advanced Neural Background Effects */}
      <AdvancedNeuralLightning />
      
      {/* Main Technology Content */}
      <TechnologyExplanation />
      
      {/* BCI Technology Explanation */}
      <BCIExplanation />
      
      {/* Interactive Neural Network Visualization */}
      <InteractiveNeuralNetwork />
      
      {/* Brain Neural Firing Animation */}
      <BrainNeuralFiring />
      
      {/* iAPF Explanation */}
      <iAPFExplanation />
      
      {/* Visual iAPF Component */}
      <VisualiAPF />
      
      {/* Technology Features Grid */}
      <TechnologySection />
    </PageLayout>
  );
};

export default Technology;
