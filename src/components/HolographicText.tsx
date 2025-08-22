import React, { useEffect, useRef, useState } from 'react';

interface HolographicTextProps {
  text: string;
  className?: string;
  glitchIntensity?: number;
  scanlineSpeed?: number;
}

const HolographicText: React.FC<HolographicTextProps> = ({ 
  text, 
  className = '', 
  glitchIntensity = 0.1,
  scanlineSpeed = 2
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150 + Math.random() * 200);
      }
    }, 2000 + Math.random() * 3000);

    return () => {
      observer.disconnect();
      clearInterval(glitchInterval);
    };
  }, [glitchIntensity]);

  return (
    <div
      ref={textRef}
      className={`relative inline-block ${className}`}
      style={{
        fontFamily: 'Orbitron, monospace',
        textShadow: `
          0 0 5px rgba(0, 212, 255, 0.8),
          0 0 10px rgba(0, 212, 255, 0.6),
          0 0 15px rgba(0, 212, 255, 0.4),
          0 0 20px rgba(0, 212, 255, 0.2)
        `,
        animation: isVisible ? 'holographicFlicker 3s ease-in-out infinite' : 'none'
      }}
    >
      {/* Main text */}
      <span
        className={`relative z-10 transition-all duration-300 ${
          glitchActive ? 'animate-pulse' : ''
        }`}
        style={{
          background: 'linear-gradient(45deg, #00D4FF, #6B46FF, #00D4FF)',
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: 'gradientShift 3s ease-in-out infinite',
          transform: glitchActive ? 'translateX(2px)' : 'translateX(0)',
          filter: glitchActive ? 'hue-rotate(180deg)' : 'none'
        }}
      >
        {text}
      </span>

      {/* Ghost text layers for holographic effect */}
      <span
        className="absolute inset-0 z-0"
        style={{
          color: '#00D4FF',
          opacity: 0.3,
          transform: 'translateX(-1px) translateY(-1px)',
          filter: 'blur(0.5px)'
        }}
      >
        {text}
      </span>
      
      <span
        className="absolute inset-0 z-0"
        style={{
          color: '#6B46FF',
          opacity: 0.3,
          transform: 'translateX(1px) translateY(1px)',
          filter: 'blur(0.5px)'
        }}
      >
        {text}
      </span>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 212, 255, 0.1) 45%,
            rgba(0, 212, 255, 0.3) 50%,
            rgba(0, 212, 255, 0.1) 55%,
            transparent 100%
          )`,
          animation: `scanline ${scanlineSpeed}s linear infinite`,
          opacity: isVisible ? 1 : 0
        }}
      />

      {/* Data corruption effect during glitch */}
      {glitchActive && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-red-500"
              style={{
                top: `${20 + i * 30}%`,
                left: `${Math.random() * 80}%`,
                width: `${10 + Math.random() * 30}%`,
                opacity: 0.8,
                animation: `glitchLine 0.1s ease-in-out ${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HolographicText;