import { motion } from "framer-motion";
import { Award, Rocket, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const achievementIcons = [Trophy, Award, ShieldCheck, Sparkles, Rocket];

export function Achievements() {
  return (
    <section id="achievements" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-12"
        >
          Achievements
        </motion.p>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.08}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Wins &amp; Recognition.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.14}
            className="max-w-md text-base text-foreground/65 leading-relaxed"
          >
            Milestones that reflect consistency, competitive spirit, and growth beyond course work.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {PORTFOLIO_DATA.achievements.map((item, idx) => {
            const Icon = achievementIcons[idx] ?? Trophy;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, scale: 1.02, rotateX: 1.1, rotateY: idx % 2 === 0 ? -1.2 : 1.2 }}
                className="interactive-surface group relative overflow-hidden rounded-[2rem] border border-foreground/8 bg-card p-6 sm:p-7"
                data-cursor-hover
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,hsl(var(--foreground)/0.08),transparent_44%)]" />

                <div className="relative flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="interactive-icon flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/12 text-foreground/72">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-foreground/40">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/58">
                      {item.label}
                    </span>
                    <h3 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/68">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
