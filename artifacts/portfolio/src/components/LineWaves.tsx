import { useEffect, useRef } from "react";
import "./LineWaves.css";

type LineWavesProps = {
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
};

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const int = Number.parseInt(value, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function mixColor(colorA: string, colorB: string, ratio: number) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);

  return {
    r: a.r + (b.r - a.r) * ratio,
    g: a.g + (b.g - a.g) * ratio,
    b: a.b + (b.b - a.b) * ratio,
  };
}

function rgba(colorA: string, colorB: string, ratio: number, alpha: number) {
  const mixed = mixColor(colorA, colorB, ratio);
  return `rgba(${Math.round(mixed.r)}, ${Math.round(mixed.g)}, ${Math.round(mixed.b)}, ${alpha})`;
}

export default function LineWaves({
  speed = 0.3,
  innerLineCount = 32,
  outerLineCount = 36,
  warpIntensity = 1,
  rotation = -45,
  edgeFadeWidth = 0,
  colorCycleSpeed = 1,
  brightness = 0.2,
  color1 = "#ffffff",
  color2 = "#ffffff",
  color3 = "#ffffff",
  enableMouseInteraction = true,
  mouseInfluence = 2,
}: LineWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.className = "line-waves-canvas";
    container.appendChild(canvas);

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let isVisible = true;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.15);
    const currentMouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    const angle = (rotation * Math.PI) / 180;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!enableMouseInteraction) return;

      const rect = container.getBoundingClientRect();
      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      targetMouse.x = 0.5;
      targetMouse.y = 0.5;
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    if (enableMouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    document.addEventListener("visibilitychange", handleVisibility);

    const draw = (timestamp: number) => {
      animationFrame = requestAnimationFrame(draw);
      if (!isVisible) return;

      const delta = timestamp - lastTime;
      lastTime = timestamp;
      elapsed += delta * speed * 0.001;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.42;
      const lineCount = Math.max(innerLineCount, outerLineCount);
      const spacing = height / (lineCount * 0.62);
      const mouseX = (currentMouse.x - 0.5) * mouseInfluence * 20;
      const mouseY = (currentMouse.y - 0.5) * mouseInfluence * 16;

      for (let i = 0; i < lineCount; i += 1) {
        const progress = i / Math.max(lineCount - 1, 1);
        const centered = progress - 0.5;
        const bandFade = Math.max(0.06, 1 - Math.abs(centered) * (1.35 + edgeFadeWidth));
        const lineOffsetY = centered * spacing * lineCount * 0.54;
        const thickness = 0.75 + bandFade * 1.4;
        const alpha = brightness * (0.75 + bandFade * 1.9);

        context.save();
        context.translate(centerX, centerY);
        context.rotate(angle);
        context.beginPath();

        const steps = 120;
        for (let step = 0; step <= steps; step += 1) {
          const xProgress = step / steps;
          const x = (xProgress - 0.5) * width * 1.4;

          const waveA =
            Math.sin(xProgress * 8 + elapsed * 2.2 + i * 0.2) *
            warpIntensity *
            18 *
            bandFade;
          const waveB =
            Math.cos(xProgress * 14 - elapsed * 1.3 + i * 0.07) *
            warpIntensity *
            8 *
            bandFade;
          const mouseWarp =
            enableMouseInteraction
              ? Math.sin(xProgress * 6 + currentMouse.x * Math.PI * 2) *
                mouseY *
                0.22 *
                bandFade
              : 0;

          const y = lineOffsetY + waveA + waveB + mouseWarp;
          const shiftedX = x + mouseX * 0.12 * bandFade;

          if (step === 0) {
            context.moveTo(shiftedX, y);
          } else {
            context.lineTo(shiftedX, y);
          }
        }

        const cycle = Math.abs(Math.sin(elapsed * colorCycleSpeed + i * 0.05));
        const gradient = context.createLinearGradient(-width * 0.58, 0, width * 0.58, 0);
        gradient.addColorStop(0, rgba(color1, color2, progress, 0));
        gradient.addColorStop(0.18, rgba(color1, color2, progress, alpha * 0.6));
        gradient.addColorStop(0.5, rgba(color2, color3, cycle, alpha));
        gradient.addColorStop(0.82, rgba(color2, color3, progress, alpha * 0.6));
        gradient.addColorStop(1, rgba(color3, color1, progress, 0));

        context.strokeStyle = gradient;
        context.lineWidth = thickness;
        context.stroke();
        context.restore();
      }
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [
    brightness,
    color1,
    color2,
    color3,
    colorCycleSpeed,
    edgeFadeWidth,
    enableMouseInteraction,
    innerLineCount,
    mouseInfluence,
    outerLineCount,
    rotation,
    speed,
    warpIntensity,
  ]);

  return <div ref={containerRef} className="line-waves-container" />;
}
