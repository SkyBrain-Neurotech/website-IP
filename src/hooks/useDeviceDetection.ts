import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isLowPowerMode: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const height = typeof window !== 'undefined' ? window.innerHeight : 768;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

    return {
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      isLowPowerMode: false,
      screenWidth: width,
      screenHeight: height,
      devicePixelRatio
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDeviceInfo(prev => ({
        ...prev,
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        devicePixelRatio: window.devicePixelRatio
      }));
    };

    // Check for battery status API (for low power mode detection)
    const checkBatteryStatus = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as Navigator & { getBattery: () => Promise<BatteryManager> }).getBattery();
          const updateBatteryStatus = () => {
            setDeviceInfo(prev => ({
              ...prev,
              isLowPowerMode: battery.level < 0.2 || battery.charging === false && battery.level < 0.3
            }));
          };

          battery.addEventListener('levelchange', updateBatteryStatus);
          battery.addEventListener('chargingchange', updateBatteryStatus);
          updateBatteryStatus();
        } catch (error) {
          // Battery API not supported
        }
      }
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setDeviceInfo(prev => ({
          ...prev,
          isLowPowerMode: true // Treat reduced motion as low power mode
        }));
      }
    };

    handleResize();
    checkBatteryStatus();
    checkReducedMotion();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
};

// Helper function to get optimized particle count based on device
export const getOptimizedParticleCount = (deviceInfo: DeviceInfo): number => {
  if (deviceInfo.isLowPowerMode) return 10;
  if (deviceInfo.isMobile) return 20;
  if (deviceInfo.isTablet) return 35;
  return 50; // Desktop
};

// Helper function to determine if animations should be enabled
export const shouldEnableAnimations = (deviceInfo: DeviceInfo): boolean => {
  if (deviceInfo.isLowPowerMode) return false;
  if (deviceInfo.isMobile && deviceInfo.devicePixelRatio > 2) return false; // High DPI mobile
  return true;
};

// Helper function to get animation frame rate
export const getAnimationFrameRate = (deviceInfo: DeviceInfo): number => {
  if (deviceInfo.isLowPowerMode) return 15;
  if (deviceInfo.isMobile) return 30;
  return 60; // Desktop
};