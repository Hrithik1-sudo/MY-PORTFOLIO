import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

function parseTarget(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1]), suffix: match[2] };
}

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const { num, suffix } = parseTarget(value);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || num === 0) return;
    started.current = true;
    const duration = 1400;
    const fps = 60;
    const steps = (duration / 1000) * fps;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * num));
      if (frame >= steps) {
        setCount(num);
        clearInterval(timer);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function About() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-lg sm:text-xl font-semibold tracking-[0.28em] uppercase text-foreground/55 mb-12"
        >
          About Me
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6" ref={metricsRef}>
            <motion.div
              initial={{ opacity: 0, x: -20, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotateX: 1.2, rotateY: -1.2 }}
              className="interactive-surface group overflow-hidden rounded-[2rem] border border-foreground/8 bg-card"
              data-cursor-hover
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={PORTFOLIO_DATA.personal.image}
                  alt="Hrithik Parihar portrait"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/72">
                      Developer Profile
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                      {PORTFOLIO_DATA.personal.firstName} {PORTFOLIO_DATA.personal.lastName}
                    </p>
                  </div>
                  <div className="rounded-full border border-white/18 bg-black/35 px-3 py-2 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                    {PORTFOLIO_DATA.personal.role}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {PORTFOLIO_DATA.personal.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="interactive-surface rounded-[1.5rem] border border-foreground/8 bg-card px-5 py-5"
                  data-cursor-hover
                >
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground tabular-nums">
                    <AnimatedCounter value={metric.value} inView={metricsInView} />
                  </span>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.15}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
            >
              I build digital experiences
              <br className="hidden sm:block" /> that are fast, scalable,
              <br className="hidden sm:block" />{" "}
              <span className="text-foreground/60">and beautifully designed.</span>
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.25}
              className="text-lg text-foreground/75 leading-relaxed"
            >
              {PORTFOLIO_DATA.personal.bio}
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.32}
              className="text-lg text-foreground/75 leading-relaxed"
            >
              My journey in web development started with a curiosity about how things work on the internet. Today, I focus on building products that feel sharp, modern, and reliable while staying thoughtful about performance, usability, and detail.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.38}
              className="flex flex-wrap items-center gap-3 text-sm text-foreground/65"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card px-4 py-2">
                <MapPin className="h-4 w-4" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.44}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href={PORTFOLIO_DATA.personal.resumeLink}
                download
                className="interactive-chip hover-invert inline-flex items-center gap-2 rounded-full border border-foreground/14 px-5 py-3 text-sm font-semibold text-foreground"
                data-cursor-hover
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume
                <ArrowDownToLine className="h-4 w-4" />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="interactive-link inline-flex items-center gap-2 text-sm font-semibold tracking-wide pb-0.5 relative text-foreground group"
                data-cursor-hover
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Get in touch
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
