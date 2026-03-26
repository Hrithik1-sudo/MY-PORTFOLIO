import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Layers } from "lucide-react";
import LineWaves from "@/components/LineWaves";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const taglineOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const taglineY = useTransform(scrollYProgress, [0, 0.35], [0, -32]);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const nameX = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { damping: 28, stiffness: 180 });
  const nameY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), { damping: 28, stiffness: 180 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 100, skewY: 5 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{
        cursor: "none",
        backgroundColor: "hsl(var(--hero-bg))",
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: waveOpacity }}
      >
        <div className="relative h-full w-full">
          <LineWaves
            speed={0.3}
            innerLineCount={32}
            outerLineCount={36}
            warpIntensity={1}
            rotation={-45}
            edgeFadeWidth={0}
            colorCycleSpeed={1}
            brightness={0.2}
            color1="#ffffff"
            color2="#ffffff"
            color3="#ffffff"
            enableMouseInteraction
            mouseInfluence={2}
          />
        </div>
      </motion.div>

      {/* Left-side vignette so the name stays fully readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--hero-bg)) 28%, color-mix(in srgb, hsl(var(--hero-bg)) 65%, transparent) 55%, transparent 80%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 55%, hsl(var(--hero-bg)) 100%)",
        }}
      />

      {/* Main content */}
      <motion.div className="relative flex-1 flex flex-col justify-center px-0" style={{ y: contentY }}>
        {/* Name block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ x: nameX, y: nameY }}
          className="w-full overflow-hidden"
        >
          {/* HRITHIK */}
          <div
            className="overflow-hidden leading-none"
            style={{ color: "hsl(var(--hero-text-strong))" }}
          >
            <motion.div variants={lineVariants}>
              <svg
                viewBox="0 0 1000 180"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "clamp(4rem, 17vw, 15rem)", display: "block" }}
                aria-label="Hrithik"
              >
                <text
                  x="50%" y="150"
                  textAnchor="middle"
                  fill="currentColor"
                  fontFamily="Inter, sans-serif"
                  fontWeight="900"
                  fontSize="175"
                  letterSpacing="-5"
                >
                  HRITHIK
                </text>
              </svg>
            </motion.div>
          </div>

          {/* PARIHAR — outlined in a slightly dimmer white */}
          <div
            className="overflow-hidden leading-none -mt-2"
            style={{ color: "hsl(var(--hero-text-faint))" }}
          >
            <motion.div variants={lineVariants}>
              <svg
                viewBox="0 0 1000 180"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "clamp(4rem, 17vw, 15rem)", display: "block" }}
                aria-label="Parihar"
              >
                <text
                  x="50%" y="150"
                  textAnchor="middle"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fontFamily="Inter, sans-serif"
                  fontWeight="900"
                  fontSize="175"
                  letterSpacing="-5"
                >
                  PARIHAR
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: taglineOpacity, y: taglineY }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 mt-10 sm:mt-14 px-4"
        >
          <p className="text-[10px] sm:text-xs tracking-[0.45em] uppercase font-medium text-center text-[hsl(var(--hero-text-muted))]">
            I design and build products that
          </p>
          <p
            className="text-3xl sm:text-4xl md:text-5xl text-center italic text-[hsl(var(--hero-text-strong))]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
          >
            deliver real impact.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--hero-text-faint))]">Scroll</span>
          <div className="w-px h-10 overflow-hidden bg-[hsl(var(--hero-line)/0.12)]">
            <motion.div
              className="w-full bg-[hsl(var(--hero-line)/0.45)]"
              animate={{ height: ["0%", "100%"], y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              style={{ height: "50%" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative w-full flex items-stretch justify-between border-t border-[hsl(var(--hero-line)/0.12)]"
      >
        <div className="flex items-center gap-3 px-6 sm:px-10 lg:px-14 py-5 border-r border-[hsl(var(--hero-line)/0.12)]">
          <MapPin className="w-4 h-4 shrink-0 text-[hsl(var(--hero-text-faint))]" />
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--hero-text-muted))]">Based in India</p>
            <p className="text-[10px] tracking-widest uppercase text-[hsl(var(--hero-text-faint))]">Available Worldwide</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-center flex-1 px-6">
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="interactive-chip group flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-[hsl(var(--hero-text-strong))] text-[hsl(var(--hero-bg))] shadow-[0_18px_50px_hsl(var(--hero-line)/0.12)]"
            data-testid="button-collaborate"
            data-cursor-hover
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Let's Collaborate
            <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.a>
        </div>

        <div className="flex items-center gap-3 px-6 sm:px-10 lg:px-14 py-5 border-l border-[hsl(var(--hero-line)/0.12)]">
          <div className="text-right">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[hsl(var(--hero-text-muted))]">Full Stack Dev,</p>
            <p className="text-[10px] tracking-widest uppercase text-[hsl(var(--hero-text-faint))]">&amp; Builder</p>
          </div>
          <Layers className="w-4 h-4 shrink-0 text-[hsl(var(--hero-text-faint))]" />
        </div>
      </motion.div>
    </section>
  );
}
