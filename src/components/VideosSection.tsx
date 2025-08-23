
import React, { useState, useEffect } from 'react';
import { Play, Youtube, Brain, Zap, X } from 'lucide-react';

const VideosSection = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideo(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPlayingVideo(null);
    setIsModalOpen(false);
  };
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // SkyBrain technology demonstrations
  const videos = [
    {
      id: "GEDnCgjRQ3k",
      title: "SkyBrain Neurotech EEG Platform",
      description: "Real-time brain signal visualization and advanced neural analytics platform demonstration.",
      thumbnail: "https://img.youtube.com/vi/GEDnCgjRQ3k/hqdefault.jpg"
    },
    {
      id: "yew_NZSqVZw",
      title: "BCI Gaming Neurofeedback",
      description: "Mind-controlled gaming demonstration using EEG signals to showcase gamified neurofeedback.",
      thumbnail: "https://img.youtube.com/vi/yew_NZSqVZw/hqdefault.jpg"
    },
    {
      id: "wojRDIQHn34",
      title: "Smart Home Integration",
      description: "Emotion-responsive smart home technology demo showcasing real-time environmental adaptation to cognitive states.",
      thumbnail: "https://img.youtube.com/vi/wojRDIQHn34/hqdefault.jpg"
    },
    {
      id: "gfp79bhekHA",
      title: "Tech Summit 2024 Showcase",
      description: "Live technology demonstration at Bengaluru Tech Summit 2024 featuring our latest BCI innovations.",
      thumbnail: "https://img.youtube.com/vi/gfp79bhekHA/hqdefault.jpg"
    }
  ];

  return (
    <section className="pt-32 pb-16 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-8">
            <Brain className="h-5 w-5 text-neural-blue neural-pulse" />
            <span className="text-sm font-semibold text-neural-blue tracking-wide uppercase font-orbitron">Technology Showcase</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            <span className="text-ghost-white">See Our Tech</span>
            <br />
            <span className="neural-gradient bg-clip-text text-transparent neural-glow font-orbitron">
              In Action
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neural-gray max-w-4xl mx-auto leading-relaxed">
            Watch live demonstrations of our neurotechnology in real-world scenarios from mind-controlled interactions to cognitive-state monitoring.
            <br className="hidden md:block" />
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="feature-card p-4 md:p-8 group cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-neural-blue/10"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleVideoPlay(video.id)}
            >
              {/* Video Thumbnail Container */}
              <div className="relative mb-4 md:mb-6 rounded-xl md:rounded-2xl overflow-hidden bg-shadow-black group-hover:scale-105 transition-transform duration-300">
                <div className="aspect-video relative">
                  {/* YouTube Thumbnail */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to demo animation if thumbnail fails
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback Demo Animation (hidden by default) */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-deep-space via-neural-blue/20 to-mind-purple/30 flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center">
                      <Brain className="h-16 w-16 text-neural-blue animate-pulse mx-auto mb-4" />
                      <div className="text-neural-blue text-sm">Video Preview</div>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-neural-blue/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-neural-blue/40 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-neural-blue/30">
                      <Play className="h-8 w-8 md:h-10 md:w-10 text-neural-blue ml-1 group-hover:text-white transition-colors" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Quality & Type Badge */}
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2">
                    <div className="px-2 md:px-3 py-1 bg-neural-blue/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                      Live Demo
                    </div>
                    <div className="px-2 md:px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                      1080p
                    </div>
                  </div>
                </div>
                
                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space/60 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Video Info */}
              <div className="flex items-start mb-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-neural-blue/20 to-mind-purple/20 rounded-xl mr-3 md:mr-4">
                  <Brain className="h-5 w-5 md:h-6 md:w-6 text-neural-blue group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-ghost-white mb-2 group-hover:text-neural-blue transition-colors font-orbitron">
                    {video.title}
                  </h3>
                  <p className="text-sm md:text-base text-neural-gray leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Watch Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 text-neural-gray text-xs md:text-sm">
                  <Brain className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Tech Demo</span>
                </div>
                <button className="flex items-center space-x-2 text-neural-blue hover:text-ghost-white transition-colors font-semibold group-hover:scale-105 transition-transform text-sm md:text-base">
                  <span>Watch Video</span>
                  <Play className="h-3 w-3 md:h-4 md:w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center glass-container rounded-2xl md:rounded-3xl p-6 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-ghost-white font-orbitron">
            See More Live Demonstrations
          </h3>
          <p className="text-lg md:text-xl text-neural-gray mb-6 md:mb-8 max-w-2xl mx-auto">
            Subscribe to our channel for the latest technology demos and live showcases of BCI innovations.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://youtube.com/@skybrainneurotech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-button text-lg md:text-2xl inline-flex items-center group hover:scale-105 transition-transform px-6 md:px-8 py-3 md:py-4 text-neural-blue"
            >
              <Youtube className="mr-3 md:mr-4 h-6 w-6 md:h-8 md:w-8 group-hover:scale-125 transition-transform" />
              Subscribe to Channel
            </a>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && playingVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[95vw] md:max-w-6xl aspect-video">
            {/* Close Button - More prominent */}
            <div className="absolute top-2 md:-top-12 right-2 md:right-0 z-10">
              <button
                onClick={closeModal}
                className="glass-card px-3 py-2 sm:px-4 rounded-xl text-white hover:text-neural-blue transition-all duration-300 border border-white/30 hover:border-neural-blue/50 flex items-center space-x-2 backdrop-blur-sm min-h-[44px]"
              >
                <span className="text-sm font-semibold">Close Video</span>
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Embedded Video Player with Sound and Quality */}
            <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=1&fs=1&cc_load_policy=1&iv_load_policy=3&mute=0&quality=hd1080&vq=hd1080&hd=1&enablejsapi=1&origin=${window.location.origin}`}
                title={videos.find(v => v.id === playingVideo)?.title || "Video Player"}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{
                  border: 'none',
                  outline: 'none'
                }}
              />
            </div>
            
          </div>
          
          {/* Modal Background Click Handler */}
          <div 
            className="fixed inset-0 -z-10" 
            onClick={closeModal}
          />
        </div>
      )}
    </section>
  );
};

export default VideosSection;
