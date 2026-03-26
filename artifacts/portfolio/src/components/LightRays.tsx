import { useEffect, useRef } from "react";

type RaysOrigin = "top-center" | "top-left" | "top-right";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
};

function getOrigin(origin: RaysOrigin, width: number) {
  if (origin === "top-left") {
    return width * 0.12;
  }

  if (origin === "top-right") {
    return width * 0.88;
  }

  return width * 0.5;
}

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

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 2.2,
  lightSpread = 2,
  rayLength = 3,
  followMouse = true,
  mouseInfluence = 0.4,
  noiseAmount = 0,
  distortion = 0,
  className = "",
  pulsating = false,
  fadeDistance = 1.2,
  saturation = 1.7,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.12 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let time = 0;
    let lastFrame = 0;
    let isVisible = true;
    const color = hexToRgb(raysColor);
    const targetMouse = { x: 0.5, y: 0.12 };
    const smoothMouse = { x: 0.5, y: 0.12 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.15);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const handlePointerMove = (event: PointerEvent) => {
      if (!followMouse) return;

      const rect = canvas.getBoundingClientRect();
      targetMouse.x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      targetMouse.y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      mouseRef.current = {
        x: Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1),
        y: Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1),
      };
    };

    const handlePointerLeave = () => {
      targetMouse.x = 0.5;
      targetMouse.y = 0.12;
      mouseRef.current = { x: 0.5, y: 0.12 };
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const draw = (timestamp: number) => {
      if (!isVisible) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      if (timestamp - lastFrame < 1000 / 50) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      lastFrame = timestamp;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const gradientFade = Math.max(0.65, fadeDistance);
      const beamCount = width < 768 ? 8 : 11;
      const baseOrigin = getOrigin(raysOrigin, width);
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.08;
      const mouseOffset = (smoothMouse.x - 0.5) * width * mouseInfluence;
      const originX = baseOrigin + mouseOffset;
      const pulse = pulsating ? 0.88 + Math.sin(time * 0.9) * 0.12 : 1;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      for (let index = 0; index < beamCount; index += 1) {
        const progress = index / Math.max(beamCount - 1, 1);
        const spread = (progress - 0.5) * width * 0.5 * lightSpread;
        const wiggle =
          Math.sin(time * (0.8 + index * 0.05) + index * 0.6) *
          22 *
          (0.2 + distortion);
        const noise =
          noiseAmount > 0
            ? Math.sin(time * 1.3 + index * 3.7) * noiseAmount * 36
            : 0;

        const startX = originX + spread * 0.12;
        const controlX = originX + spread * 0.55 + wiggle + noise;
        const endX = originX + spread * (1.4 + rayLength * 0.18) + wiggle * 1.6;
        const endY = height * Math.min(1.15, 0.58 + rayLength * 0.18);

        const intensity =
          (0.18 + Math.sin(time * raysSpeed + index * 0.42) * 0.07) * pulse;

        const beam = context.createLinearGradient(startX, 0, endX, endY * gradientFade);
        beam.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0})`);
        beam.addColorStop(0.08, `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity * 0.16})`);
        beam.addColorStop(0.35, `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity * 0.1})`);
        beam.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        context.beginPath();
        context.moveTo(startX, 0);
        context.quadraticCurveTo(controlX, height * 0.28, endX, endY);
        context.lineWidth = 18 + progress * 24;
        context.strokeStyle = beam;
        context.stroke();
      }

      time += 0.008 * raysSpeed;
      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    distortion,
    fadeDistance,
    followMouse,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`.trim()}
    />
  );
}
