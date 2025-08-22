import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Shield, Coins, Users, Sparkles, Network, Wallet, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackButtonClick } from '@/lib/analytics';

const BlockchainConvergence = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-neural-blue/20 to-mind-purple/20 px-6 py-3 rounded-full border border-neural-blue/30">
              <Brain className="h-5 w-5 text-neural-blue" />
              <span className="text-neural-blue font-semibold">The Future of Neurodata</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-orbitron text-transparent bg-gradient-to-r from-neural-blue via-mind-purple to-neural-blue bg-clip-text leading-tight mb-8">
            The Convergence of
            <br />
            <span className="text-gradient neural-glow">Neurotech, AI & Blockchain</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto mb-12 leading-relaxed">
            Harnessing the Power of Neurotech, AI-Driven Health Insights, and Decentralized Platforms 
            to Shape the Future of Personalized Health Tracking and Optimization
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/beta-signup">
              <Button 
                onClick={() => trackButtonClick('Join Beta', 'blockchain_hero', '/beta-signup')}
                size="lg" 
                className="cyber-button text-deep-space font-bold px-8 py-4 text-xl rounded-xl"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Join the Revolution
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                onClick={() => trackButtonClick('Learn More', 'blockchain_hero', '/contact')}
                variant="outline" 
                size="lg" 
                className="border-neural-blue text-neural-blue hover:bg-neural-blue/10 px-8 py-4 text-xl rounded-xl"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-neural-blue mb-6">
              Breaking the Data Barrier
            </h2>
            <p className="text-xl text-neural-gray max-w-3xl mx-auto">
              The neurotechnology revolution is held back by a critical bottleneck: data scarcity. 
              We're changing that.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="glass-card p-8 border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4">Current Challenges</h3>
                <ul className="space-y-3 text-neural-gray">
                  <li className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Fragmented data across isolated repositories</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Limited access for researchers and innovators</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Users get no value from their neural data</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Stunted AI development in neuroscience</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="glass-card p-8 border border-neural-blue/30">
                <h3 className="text-2xl font-bold text-neural-blue mb-4">Our Solution</h3>
                <ul className="space-y-3 text-neural-gray">
                  <li className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-neural-blue mt-0.5 flex-shrink-0" />
                    <span>Decentralized data ownership and rewards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-neural-blue mt-0.5 flex-shrink-0" />
                    <span>Transparent, community-driven validation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-neural-blue mt-0.5 flex-shrink-0" />
                    <span>Direct compensation for data contributors</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-neural-blue mt-0.5 flex-shrink-0" />
                    <span>Accelerated neuroscience discoveries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKY Ecosystem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-deep-space/50 to-shadow-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-neural-blue mb-6">
              Welcome to the SkyBrain Ecosystem
            </h2>
            <p className="text-xl text-neural-gray max-w-3xl mx-auto">
              Where your wellness journey contributes to breakthrough discoveries 
              while maintaining your privacy and rewarding your participation.            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-neural-blue/30 hover:border-neural-blue/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-xl">
                    <Coins className="h-8 w-8 text-neural-blue" />
                  </div>
                  <CardTitle className="text-neural-blue">Earn Rewards</CardTitle>                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neural-gray text-base">
                  Your wellness sessions contribute to research advancement and you're 
                  rewarded for your participation. Your privacy is protected while creating value.                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-neural-blue/30 hover:border-neural-blue/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-xl">
                    <Network className="h-8 w-8 text-neural-blue" />
                  </div>
                  <CardTitle className="text-neural-blue">Data Ownership</CardTitle>                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neural-gray text-base">
                  Your wellness data remains securely under your control. 
                  You maintain ownership while contributing to breakthrough research.                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card border-neural-blue/30 hover:border-neural-blue/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-neural-blue" />
                  </div>
                  <CardTitle className="text-neural-blue">Participate & Govern</CardTitle>                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neural-gray text-base">
                  Participate in platform governance while supporting groundbreaking 
                  neuroscience research. Help shape the future of mental wellness.                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-neural-blue mb-6">
              How It Works
            </h2>
            <p className="text-xl text-neural-gray max-w-3xl mx-auto">
              Simple, transparent, and rewarding - join the decentralized neuroscience revolution 
              in three easy steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-neural-blue to-mind-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-neural-blue rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neural-blue mb-4">Join Securely</h3>
              <p className="text-neural-gray">
                Create your secure account to join the SkyBrain community. 
                Your privacy, your data, your control.              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-neural-blue to-mind-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-neural-blue rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neural-blue mb-4">Contribute Wellness Data</h3>
              <p className="text-neural-gray">
                Participate in wellness sessions with SkyBrain. Our platform ensures 
                quality standards and determines research contribution value.              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-neural-blue to-mind-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-neural-blue rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neural-blue mb-4">Earn & Participate</h3>
              <p className="text-neural-gray">
                Your valuable contributions are recognized and rewarded. Participate 
                in governance and help shape the future of mental wellness research.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-mind-purple/10 to-neural-blue/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-neural-blue mb-6">
              Transforming Neuroscience
            </h2>
            <p className="text-xl text-neural-gray max-w-3xl mx-auto">
              We're not just building a platform - we're catalyzing a movement toward 
              democratized neuroscience and personalized mental wellness.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-card p-8 border border-neural-blue/30">
                <Shield className="h-12 w-12 text-neural-blue mb-4" />
                <h3 className="text-2xl font-bold text-neural-blue mb-4">True Data Ownership</h3>
                <p className="text-neural-gray">
                  Your neural data belongs to you. Blockchain ensures transparent consent, 
                  immutable ownership records, and direct compensation for your contributions.
                </p>
              </div>
              
              <div className="glass-card p-8 border border-neural-blue/30">
                <Users className="h-12 w-12 text-neural-blue mb-4" />
                <h3 className="text-2xl font-bold text-neural-blue mb-4">Community Governance</h3>
                <p className="text-neural-gray">
                  Token holders vote on research priorities, funding allocation, and platform features. 
                  Democratic decision-making for the future of neurotechnology.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="glass-card p-8 border border-neural-blue/30">
                <Brain className="h-12 w-12 text-neural-blue mb-4" />
                <h3 className="text-2xl font-bold text-neural-blue mb-4">Accelerated Discovery</h3>
                <p className="text-neural-gray">
                  10x more diverse neurodata enables breakthrough AI models for personalized 
                  mental health, cognitive enhancement, and neurological treatments.
                </p>
              </div>
              
              <div className="glass-card p-8 border border-neural-blue/30">
                <Sparkles className="h-12 w-12 text-neural-blue mb-4" />
                <h3 className="text-2xl font-bold text-neural-blue mb-4">Sustainable Incentives</h3>
                <p className="text-neural-gray">
                  Growing demand from researchers creates sustainable value for contributors. 
                  Your participation today funds tomorrow's breakthroughs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 border border-neural-blue/30">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-neural-blue mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl text-neural-gray mb-8">
              Join the SKY ecosystem and be part of the neuroscience revolution. 
              Your neural data, your rewards, your impact on human understanding.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/beta-signup">
                <Button 
                  onClick={() => trackButtonClick('Join Beta Now', 'blockchain_cta', '/beta-signup')}
                  size="lg" 
                  className="cyber-button text-deep-space font-bold px-8 py-4 text-xl rounded-xl"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Join Beta Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  onClick={() => trackButtonClick('Contact Us', 'blockchain_cta', '/contact')}
                  variant="outline" 
                  size="lg" 
                  className="border-neural-blue text-neural-blue hover:bg-neural-blue/10 px-8 py-4 text-xl rounded-xl"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlockchainConvergence;