import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Clock3, Code2, Crown, Gauge, Lightbulb } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

const categories = [
  { label: "Frontend", key: "frontend" as const, index: "01" },
  { label: "Backend", key: "backend" as const, index: "02" },
  { label: "Tools & DevOps", key: "tools" as const, index: "03" },
];

const softSkillIcons = {
  "Problem Solving": Lightbulb,
  Leadership: Crown,
  "Time Management": Clock3,
  "Decision Making": Gauge,
  "Analytical Thinking": Brain,
};

const skillLogos: Record<string, string> = {
  ReactJs: "https://cdn.simpleicons.org/react/61DAFB",
  NextJs: "https://cdn.simpleicons.org/nextdotjs/6B7280",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  CSS: "https://cdn.simpleicons.org/css/1572B6",
  HTML: "https://cdn.simpleicons.org/html5/E34F26",
  PHP: "https://cdn.simpleicons.org/php/777BB4",
  Socket: "https://cdn.simpleicons.org/socketdotio/6B7280",
  NodeJs: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  "Express.js": "https://cdn.simpleicons.org/express/444444",
  JWT: "https://cdn.simpleicons.org/jsonwebtokens/EF2D5E",
  MongoDB: "https://cdn.simpleicons.org/mongodb/47A248",
  MySQL: "https://cdn.simpleicons.org/mysql/4479A1",
  Postgres: "https://cdn.simpleicons.org/postgresql/4169E1",
  SQL: "https://cdn.simpleicons.org/mysql/4479A1",
  Java: "https://cdn.simpleicons.org/openjdk/EA2D2E",
  "Git & GitHub": "https://cdn.simpleicons.org/github/6B7280",
  Postman: "https://cdn.simpleicons.org/postman/FF6C37",
  Netlify: "https://cdn.simpleicons.org/netlify/00C7B7",
  Vercel: "https://cdn.simpleicons.org/vercel/6B7280",
  "C++": "https://cdn.simpleicons.org/cplusplus/00599C",
  Python: "https://cdn.simpleicons.org/python/3776AB",
  C: "https://cdn.simpleicons.org/c/2A5CAA",
};

function MagneticPill({ name, delay }: { name: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 300 });
  const springY = useSpring(y, { damping: 15, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    x.set(dx);
    y.set(dy);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const logo = skillLogos[name];

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="interactive-chip group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-foreground/15 bg-foreground/[0.03] text-sm text-foreground/85 cursor-default transition-colors duration-200 hover:border-transparent"
      data-cursor-hover
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background/75 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.04)] transition-colors duration-200 group-hover:bg-transparent group-hover:border-current/20">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-4 w-4 object-contain"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <Code2 className="h-3.5 w-3.5 text-foreground/60" />
        )}
      </span>
      <span>{name}</span>
    </motion.span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } }),
};

export function Skills() {
  return (
    <section id="skills" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-12"
        >
          Technical Arsenal
        </motion.p>

        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.08}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-20"
        >
          What I work with.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground/8 rounded-2xl overflow-hidden">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + catIdx * 0.1 }}
              className={`interactive-surface p-8 flex flex-col gap-8 ${catIdx < categories.length - 1 ? "border-b md:border-b-0 md:border-r border-foreground/8" : ""}`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold tracking-tight">{cat.label}</h3>
                <span className="text-xs font-mono text-foreground/45 mt-1">{cat.index}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills[cat.key].map((skill, i) => (
                  <MagneticPill
                    key={skill}
                    name={skill}
                    delay={0.15 + catIdx * 0.05 + i * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-foreground/50 mb-3">
                Soft Skills
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                How I work with people and problems.
              </h3>
            </div>
            <p className="max-w-md text-sm sm:text-base text-foreground/65 leading-relaxed">
              Strong delivery is not just about code. It is also about clarity, ownership, momentum, and decision making.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {PORTFOLIO_DATA.softSkills.map((skill, idx) => {
              const Icon = softSkillIcons[skill.title as keyof typeof softSkillIcons] ?? Brain;

              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 26, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -10, rotateX: 1.2, rotateY: idx % 2 === 0 ? -1.6 : 1.6, scale: 1.02 }}
                  className="interactive-surface group relative overflow-hidden rounded-[1.75rem] border border-foreground/8 bg-card p-5 sm:p-6"
                  data-cursor-hover
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--foreground)/0.08),transparent_42%)]" />

                  <div className="relative flex h-full flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="interactive-icon flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/12 text-foreground/68">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <span className="text-xs font-mono text-foreground/40">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg font-bold tracking-tight text-foreground">
                        {skill.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/68">
                        {skill.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-auto border-t border-foreground/8">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/48">
                        Human Edge
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
