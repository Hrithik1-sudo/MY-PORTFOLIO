import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Calendar, Download, ExternalLink, GraduationCap, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Training() {
  const [selectedTraining, setSelectedTraining] = useState<(typeof PORTFOLIO_DATA.training)[number] | null>(null);

  useEffect(() => {
    if (!selectedTraining) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTraining(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTraining]);

  return (
    <section id="training" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-12"
        >
          Training
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.08}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Training &amp; Learning.
            </motion.h2>
          </div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.14}
            className="max-w-md text-base text-foreground/65 leading-relaxed"
          >
            Structured programs that strengthened my programming foundation,
            algorithmic thinking, and practical problem solving.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {PORTFOLIO_DATA.training.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              onDoubleClick={() => setSelectedTraining(item)}
              className="interactive-surface hover-accent-cyan group relative overflow-hidden rounded-[2rem] border border-foreground/8 bg-card p-8 sm:p-10 cursor-pointer"
              data-cursor-hover
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,hsl(var(--foreground)/0.07),transparent_45%)]" />

              <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-foreground/55">
                    <div className="interactive-icon flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 transition-colors duration-300 group-hover:border-foreground/30">
                      <BookOpen className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.22em] uppercase">
                      Summer Training
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium text-accent">
                      {item.organization}
                    </p>
                    <p className="max-w-3xl text-base leading-relaxed text-foreground/70">
                      {item.description}
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setSelectedTraining(item)}
                    className="interactive-chip hover-invert inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm font-semibold text-foreground/75"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    data-cursor-hover
                  >
                    View Certificate
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="grid gap-4 self-start">
                  <div className="rounded-2xl border border-foreground/10 bg-background/65 px-5 py-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
                      <Calendar className="h-3.5 w-3.5" />
                      Duration
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground/80">
                      {item.date}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-foreground/10 bg-background/65 px-5 py-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Focus
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                      DSA, Java, problem solving, time complexity, and interview-oriented practice.
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTraining && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              onClick={() => setSelectedTraining(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              aria-label="Close training certificate preview"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.003 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#060606] shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
              data-cursor-hover
            >
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

              <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/45">
                    Training Certificate
                  </p>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                    {selectedTraining.title}
                  </h3>
                  <p className="text-sm text-white/55">
                    {selectedTraining.organization} · {selectedTraining.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedTraining.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-chip hover-invert inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/82"
                    data-cursor-hover
                  >
                    Open PDF
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedTraining(null)}
                    className="interactive-icon hover-invert flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
                    data-cursor-hover
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative h-[72vh] min-h-[520px] bg-[#0a0a0a] p-3 sm:p-4">
                <motion.div
                  whileHover={{ scale: 1.004 }}
                  className="h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                >
                  <iframe
                    src={`${selectedTraining.credentialLink}#toolbar=0&navpanes=0&scrollbar=1`}
                    title={selectedTraining.title}
                    className="h-full w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
