
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, Users, CheckCircle, Award } from 'lucide-react';

const TrustFoundation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Security network nodes
    const securityNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      isSecure: boolean;
      connections: number[];
    }> = [];

    // Data packets
    const dataPackets: Array<{
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
      isEncrypted: boolean;
    }> = [];

    // Create security network
    for (let i = 0; i < 18; i++) {
      securityNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 3 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
        isSecure: Math.random() > 0.2,
        connections: []
      });
    }

    // Connect security nodes
    securityNodes.forEach((node, i) => {
      securityNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150 && Math.random() < 0.25) {
            node.connections.push(j);
          }
        }
      });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update security nodes
      securityNodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.015;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw secure connections
        node.connections.forEach(targetIndex => {
          const target = securityNodes[targetIndex];
          const opacity = node.isSecure && target.isSecure ? 0.3 : 0.1;
          
          ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
          ctx.lineWidth = node.isSecure ? 2 : 1;
          ctx.setLineDash(node.isSecure ? [] : [4, 4]);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Draw security node
        const pulseSize = node.size + Math.sin(node.pulse) * 1;
        const pulseOpacity = node.isSecure ? 0.6 + Math.sin(node.pulse) * 0.2 : 0.3;
        
        // Security shield effect
        if (node.isSecure) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, ${pulseOpacity * 0.1})`;
          ctx.fill();
          
          // Shield outline
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(100, 116, 139, ${pulseOpacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 139, ${pulseOpacity})`;
        ctx.fill();
      });

      // Create encrypted data packets
      if (Math.random() < 0.04) {
        const fromNode = Math.floor(Math.random() * securityNodes.length);
        const toNode = Math.floor(Math.random() * securityNodes.length);
        
        if (fromNode !== toNode) {
          dataPackets.push({
            fromNode,
            toNode,
            progress: 0,
            speed: 0.01 + Math.random() * 0.02,
            isEncrypted: securityNodes[fromNode].isSecure
          });
        }
      }

      // Draw encrypted data packets
      dataPackets.forEach((packet, i) => {
        packet.progress += packet.speed;

        if (packet.progress > 1) {
          dataPackets.splice(i, 1);
          return;
        }

        const fromNode = securityNodes[packet.fromNode];
        const toNode = securityNodes[packet.toNode];
        
        const currentX = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
        const currentY = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

        if (packet.isEncrypted) {
          // Encrypted packet (secure)
          ctx.beginPath();
          ctx.rect(currentX - 4, currentY - 2, 8, 4);
          ctx.fillStyle = `rgba(100, 116, 139, 0.8)`;
          ctx.fill();
          
          // Encryption glow
          ctx.beginPath();
          ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, 0.2)`;
          ctx.fill();
        } else {
          // Unsecured packet
          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 116, 139, 0.4)`;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const trustPillars = [
    {
      icon: Shield,
      title: "Blockchain Sovereignty",
      description: "Your neural data belongs only to you, secured by blockchain technology",
      features: [
        "Decentralized data ownership",
        "Immutable privacy controls", 
        "Self-sovereign identity"
      ]
    },
    {
      icon: Lock,
      title: "Decentralized Storage",
      description: "No central authority controls your mental health information",
      features: [
        "Distributed data architecture",
        "Zero-knowledge protocols",
        "End-to-end encryption"
      ]
    },
    {
      icon: Eye,
      title: "Transparent AI",
      description: "Understanding how recommendations are generated",
      features: [
        "Explainable AI decisions",
        "Algorithm transparency",
        "Open-source components"
      ]
    },
    {
      icon: Users,
      title: "Data Monetization",
      description: "Optional sharing that benefits both you and research",
      features: [
        "You control data sharing",
        "Fair compensation model",
        "Research contribution rewards"
      ]
    }
  ];

  const validations = [
    {
      icon: Award,
      title: "Research Partners",
      description: "Collaborations with NeuroX and leading neuroscience institutions",
      partners: ["Stanford Neuroscience", "MIT Brain Lab", "Johns Hopkins"]
    },
    {
      icon: CheckCircle,
      title: "Clinical Standards",
      description: "Medical-grade EEG accuracy in consumer-friendly BCI format",
      standards: ["FDA Guidelines", "ISO 27001", "HIPAA Compliant"]
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Security Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        style={{ background: 'transparent' }}
      />

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Shield className="h-5 w-5 text-neural-blue animate-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">Trust Foundation</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            <span className="text-ghost-white">Your Mind's Data,</span>{' '}
            <span className="text-neural-blue font-orbitron relative">
              Your Control
              <div className="absolute -inset-1 bg-gradient-to-r from-neural-blue/20 to-mind-purple/20 blur-lg opacity-50 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Revolutionary technology built on absolute trust and transparency.
            <br className="hidden md:block" />
            <span className="text-neural-blue font-semibold">Your privacy is not negotiable.</span>
          </p>
        </div>

        {/* Privacy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {trustPillars.map((pillar, index) => (
            <Card 
              key={pillar.title}
              className="glass-card hover:border-neural-blue/30 transition-all duration-500 group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="p-6 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mr-8">
                    <pillar.icon className="h-10 w-10 text-neural-blue group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-ghost-white group-hover:text-neural-blue transition-colors font-orbitron">
                      {pillar.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-neural-gray text-xl leading-relaxed mb-8">
                  {pillar.description}
                </p>
                
                <ul className="space-y-4">
                  {pillar.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-neural-gray group-hover:text-neural-blue transition-colors text-lg">
                      <div className="w-3 h-3 bg-neural-blue rounded-full mr-6 animate-pulse"></div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Validation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {validations.map((validation, index) => (
            <Card 
              key={validation.title}
              className="glass-card hover:border-neural-blue/30 transition-all duration-500 group hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-10">
                <div className="flex items-center mb-8">
                  <div className="p-6 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-2xl mr-8">
                    <validation.icon className="h-10 w-10 text-neural-blue group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-ghost-white group-hover:text-neural-blue transition-colors font-orbitron">
                      {validation.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-neural-gray text-xl leading-relaxed mb-8">
                  {validation.description}
                </p>
                
                <div className="space-y-3">
                  {(validation.partners || validation.standards)?.map((item, i) => (
                    <div key={i} className="bg-neural-blue/10 border border-neural-blue/30 rounded-lg px-6 py-4 relative overflow-hidden group-hover:border-neural-blue/40 transition-colors">
                      <span className="text-neural-blue font-semibold relative z-10 text-lg">{item}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neural-blue/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Metrics */}
        <div className="glass-card rounded-3xl p-16 relative overflow-hidden">
          <h3 className="text-4xl font-bold text-center mb-16 text-ghost-white font-orbitron relative z-10">
            Trust by the Numbers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {[
              { value: "100%", label: "Data Ownership", icon: "🔐" },
              { value: "0", label: "Data Breaches", icon: "🛡️" },
              { value: "256-bit", label: "Encryption", icon: "🔒" },
              { value: "24/7", label: "Privacy Protection", icon: "👁️" }
            ].map((metric, index) => (
              <div 
                key={metric.label}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-6 filter grayscale group-hover:grayscale-0 transition-all">
                  {metric.icon}
                </div>
                <div className="text-5xl md:text-6xl font-black text-neural-blue mb-4 font-mono group-hover:scale-110 transition-transform relative">
                  {metric.value}
                  <div className="absolute inset-0 bg-neural-blue/10 blur-xl group-hover:bg-neural-blue/20 transition-all"></div>
                </div>
                <div className="text-neural-gray font-semibold tracking-wide uppercase text-lg">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustFoundation;
