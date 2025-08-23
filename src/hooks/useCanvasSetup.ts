import { useRef, useEffect, useCallback } from 'react';

interface CanvasSetupOptions {
  width?: number;
  height?: number;
  pixelRatio?: boolean;
  alpha?: boolean;
  preserveDrawingBuffer?: boolean;
}

export const useCanvasSetup = (options: CanvasSetupOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d', {
      alpha: options.alpha !== false,
      desynchronized: true,
      willReadFrequently: false
    });

    if (!ctx) return null;

    const width = options.width || window.innerWidth;
    const height = options.height || window.innerHeight;
    const pixelRatio = options.pixelRatio !== false ? window.devicePixelRatio : 1;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (pixelRatio !== 1) {
      ctx.scale(pixelRatio, pixelRatio);
    }

    contextRef.current = ctx;
    return ctx;
  }, [options]);

  const clearCanvas = useCallback(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const ctx = setupCanvas();
    if (!ctx) return;

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up canvas context
      if (contextRef.current) {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = contextRef.current;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        contextRef.current = null;
      }
    };
  }, [setupCanvas]);

  return {
    canvasRef,
    contextRef,
    setupCanvas,
    clearCanvas
  };
};