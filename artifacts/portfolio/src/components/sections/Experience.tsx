import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } }),
};

function ExperienceRow({ exp, idx }: { exp: typeof PORTFOLIO_DATA.experience[0]; idx: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start 0.95", "center 0.6"] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [24, 0]);

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity, y }}
      className="interactive-surface group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-10 px-3 -mx-3 rounded-2xl border-b border-foreground/8 last:border-b-0 relative hover:bg-foreground/[0.025]"
    >
      {/* Animated entry line at left edge */}
      <motion.div
        className="absolute left-0 top-0 h-[1px] bg-foreground/20"
        style={{ width: lineWidth }}
      />

      {/* Index */}
      <div className="hidden lg:flex lg:col-span-1 items-start pt-1">
        <motion.span
          className="text-xs font-mono text-foreground/45 group-hover:text-foreground/70 transition-colors duration-300"
        >
          0{idx + 1}
        </motion.span>
      </div>

      {/* Date badge */}
      <div className="lg:col-span-3">
        <motion.span
          className="interactive-chip inline-block px-4 py-1.5 rounded-full border border-foreground/10 text-xs font-medium text-foreground/60 tracking-wider group-hover:border-foreground/25 group-hover:text-foreground/80 transition-all duration-300"
        >
          {exp.date}
        </motion.span>
      </div>

      {/* Content */}
      <div className="lg:col-span-8 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <h3 className="text-xl font-bold text-foreground relative inline-block">
            {exp.role}
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-foreground group-hover:w-full transition-all duration-400 ease-out" />
          </h3>
          <motion.span
            className="text-sm font-medium text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.1 }}
          >
            {exp.company}
          </motion.span>
        </div>
        <p className="text-foreground/72 text-base leading-relaxed">{exp.description}</p>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-12"
        >
          Career Journey
        </motion.p>

        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.08}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-20"
        >
          Experience &amp; Education.
        </motion.h2>

        <div className="flex flex-col">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <ExperienceRow key={idx} exp={exp} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
