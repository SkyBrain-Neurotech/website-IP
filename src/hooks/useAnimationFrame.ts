import { useRef, useEffect, useCallback } from 'react';
import { useDeviceDetection } from './useDeviceDetection';

interface AnimationFrameOptions {
  fps?: number;
  pauseOnInactive?: boolean;
  enabled?: boolean;
}

export const useAnimationFrame = (
  callback: (deltaTime: number) => void,
  options: AnimationFrameOptions = {}
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const isActiveRef = useRef(true);
  const frameCountRef = useRef(0);
  const deviceInfo = useDeviceDetection();

  // Calculate frame skip based on target FPS
  const targetFPS = options.fps || (deviceInfo.isMobile ? 30 : 60);
  const frameDelay = 1000 / targetFPS;
  const skipFrames = Math.round(60 / targetFPS);

  const animate = useCallback((time: number) => {
    // Check if animation should run
    if (options.enabled === false) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    // Skip if tab is inactive and pauseOnInactive is true
    if (options.pauseOnInactive !== false && !isActiveRef.current) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    // Frame rate limiting
    frameCountRef.current++;
    if (frameCountRef.current % skipFrames !== 0) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    // Calculate delta time
    const deltaTime = previousTimeRef.current !== undefined 
      ? time - previousTimeRef.current 
      : 0;

    // Only run callback if enough time has passed
    if (deltaTime >= frameDelay || previousTimeRef.current === undefined) {
      callback(deltaTime);
      previousTimeRef.current = time;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [callback, frameDelay, skipFrames, options.enabled, options.pauseOnInactive]);

  useEffect(() => {
    // Handle visibility change
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
    };

    if (options.pauseOnInactive !== false) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // Start animation
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (options.pauseOnInactive !== false) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [animate, options.pauseOnInactive]);

  const start = useCallback(() => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const stop = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
  }, []);

  return { start, stop };
};