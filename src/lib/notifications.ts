// Notification utilities for coming soon features

export const showComingSoonNotification = (feature: string = 'This feature') => {
  // Create and show a simple toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 z-[9999] glass-card border border-neural-blue/30 bg-deep-space/95 backdrop-blur-md rounded-xl p-4 shadow-lg shadow-neural-blue/20 transform translate-x-full transition-transform duration-300';
  toast.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="w-2 h-2 bg-neural-blue rounded-full animate-pulse"></div>
      <div>
        <div class="text-ghost-white font-semibold text-sm">${feature} Coming Soon!</div>
        <div class="text-neural-gray text-xs">We're working hard to bring this to you.</div>
      </div>
      <button class="text-neural-gray hover:text-ghost-white ml-2" onclick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(full)';
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  }, 3000);

  // Track the coming soon interaction
  if (typeof gtag !== 'undefined') {
    gtag('event', 'coming_soon_clicked', {
      'event_category': 'engagement',
      'event_label': feature.toLowerCase().replace(/\s+/g, '_'),
      'value': 1
    });
  }
};

export const handleComingSoonClick = (featureName: string) => {
  return (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    showComingSoonNotification(featureName);
  };
};