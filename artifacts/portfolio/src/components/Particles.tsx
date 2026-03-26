import React, { useEffect, useRef } from "react";
import "./Particles.css";

type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
  driftZ: number;
  phase: number;
  twinkle: number;
};

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string) => {
  const normalized = hex.replace(/^#/, "");
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
};

const rgbaString = (hex: string, alpha: number) => {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

const randomSpherePoint = () => {
  let x = 0;
  let y = 0;
  let z = 0;
  let len = 0;

  while (len === 0 || len > 1) {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    len = x * x + y * y + z * z;
  }

  const radius = Math.cbrt(Math.random());

  return {
    x: x * radius,
    y: y * radius,
    z: z * radius,
  };
};

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.className = "particles-canvas";
    container.appendChild(canvas);

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let rotation = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const ratio = Math.min(pixelRatio, 1.25);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;
    const effectiveCount = Math.min(particleCount, 160);
    const particles: Particle[] = Array.from({ length: effectiveCount }, () => {
      const point = randomSpherePoint();

      return {
        x: point.x,
        y: point.y,
        z: point.z,
        size: 0.18 + Math.random() * Math.max(sizeRandomness * 0.35, 0.12),
        color: palette[Math.floor(Math.random() * palette.length)],
        driftX: Math.random() * 0.45 - 0.225,
        driftY: Math.random() * 0.45 - 0.225,
        driftZ: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.55 + Math.random() * 0.85,
      };
    });

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
      if (!moveParticlesOnHover) return;

      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    document.addEventListener("visibilitychange", handleVisibility);

    const drawParticle = (particle: Particle, time: number) => {
      const hoverX = mouseRef.current.x * particleHoverFactor * 0.12;
      const hoverY = mouseRef.current.y * particleHoverFactor * 0.12;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      let px = particle.x * particleSpread + hoverX;
      let py = particle.y * particleSpread + hoverY;
      let pz = particle.z * particleSpread;

      px += Math.sin(time * 0.18 + particle.phase) * particle.driftX * 0.5;
      py += Math.cos(time * 0.22 + particle.phase) * particle.driftY * 0.5;
      pz += Math.sin(time * 0.1 + particle.phase) * particle.driftZ * 0.35;

      if (!disableRotation) {
        const rotatedX = px * cos - pz * sin;
        const rotatedZ = px * sin + pz * cos;
        px = rotatedX;
        pz = rotatedZ;
      }

      const depth = cameraDistance - pz;
      const perspective = cameraDistance / Math.max(depth, 1);
      const screenX = width * 0.5 + px * width * 0.028 * perspective;
      const screenY = height * 0.42 + py * height * 0.03 * perspective;
      const size = Math.max(
        0.9,
        ((particleBaseSize / 100) * particle.size * 1.45 * perspective),
      );
      const twinkle = 0.72 + Math.sin(time * 1.4 * particle.twinkle + particle.phase) * 0.28;
      const alpha = (alphaParticles ? 0.24 + perspective * 0.08 : 0.62) * twinkle;

      context.beginPath();
      context.fillStyle = rgbaString(particle.color, alpha);
      context.arc(screenX, screenY, size, 0, Math.PI * 2);
      context.fill();

      if (size > 1.15) {
        context.beginPath();
        context.strokeStyle = rgbaString(particle.color, alpha * 0.28);
        context.lineWidth = 0.7;
        context.moveTo(screenX - size * 2.2, screenY);
        context.lineTo(screenX + size * 2.2, screenY);
        context.moveTo(screenX, screenY - size * 2.2);
        context.lineTo(screenX, screenY + size * 2.2);
        context.stroke();
      }
    };

    const update = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(update);

      if (!isVisible) return;

      const delta = timestamp - lastTime;
      lastTime = timestamp;
      elapsed += delta * speed;
      rotation += disableRotation ? 0 : 0.00004 * delta * (0.35 + speed * 2.5);

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        drawParticle(particle, elapsed * 0.001);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [
    alphaParticles,
    cameraDistance,
    disableRotation,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    particleHoverFactor,
    particleSpread,
    pixelRatio,
    sizeRandomness,
    speed,
  ]);

  return <div ref={containerRef} className={`particles-container ${className ?? ""}`.trim()} />;
};

export default Particles;
