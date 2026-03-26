import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 420, mass: 0.32 });
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 420, mass: 0.32 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    const onLeaveWindow = () => setIsVisible(false);
    const onEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        top: 0,
        left: 0,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 1.12 : 1,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          rotate: isHovering ? -10 : -4,
          filter: isHovering
            ? "drop-shadow(0 12px 22px hsl(var(--foreground) / 0.2))"
            : "drop-shadow(0 8px 16px hsl(var(--foreground) / 0.12))",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ transformOrigin: "4px 4px" }}
      >
        <svg
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3.5 3.2L22.8 14.8L13.9 17.1L18.6 27.8L14.4 29.6L9.7 18.9L4 24.5L3.5 3.2Z"
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M10.1 18.1L14.6 28.5"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
