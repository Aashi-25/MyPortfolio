import { useRef, useEffect } from 'react';

const Noise = ({
  patternSize = 250,
  patternRefreshInterval = 2,
  patternAlpha = 15,
  onReady
}) => {
  const canvasRef = useRef(null);
  const readyCalled = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const canvasSize = 512;
    let frame = 0;
    let animationId;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);

      if (!readyCalled.current && onReady) {
        readyCalled.current = true;
        onReady();
      }
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    drawGrain();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha, onReady]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default Noise;
