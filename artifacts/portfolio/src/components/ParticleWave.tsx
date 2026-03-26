import { useEffect, useRef } from "react";

export function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const COLS = 64;
    const ROWS = 32;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const spacingX = W / (COLS - 1);
      const spacingY = H / (ROWS - 1);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const nx = col / (COLS - 1); // 0..1 horizontal
          const ny = row / (ROWS - 1); // 0..1 vertical

          const baseX = col * spacingX;
          const baseY = row * spacingY;

          // Multi-layer wave — creates the organic 3D mesh feel
          const amp = H * 0.22;
          const wave =
            Math.sin(nx * 7 - t * 2.1 + ny * 4.5) * amp * 0.45 +
            Math.cos(ny * 6 - t * 1.6 + nx * 3) * amp * 0.35 +
            Math.sin((nx + ny) * 5 - t * 2.8) * amp * 0.2;

          const y = baseY + wave;

          // Intensity: high at wave peaks
          const intensity = (wave / amp + 1) / 2; // 0..1
          const highPeak = Math.max(0, intensity - 0.5) * 2; // only top 50%

          // Fade horizontally: invisible on left, visible on right
          const xFade = Math.pow(nx, 0.6);
          // Fade by distance from vertical center
          const yFade = 1 - Math.abs(ny - 0.5) * 0.6;

          const alpha = xFade * yFade * (0.15 + highPeak * 0.7);
          if (alpha < 0.02) continue;

          const radius = 0.7 + highPeak * 1.4;

          ctx.beginPath();
          ctx.arc(baseX, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha, 0.9)})`;
          ctx.fill();
        }
      }

      t += 0.009;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
