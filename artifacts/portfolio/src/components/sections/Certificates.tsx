import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Download, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "text-blue-400 border-blue-400/20 bg-blue-400/8",
  Backend: "text-green-400 border-green-400/20 bg-green-400/8",
  Database: "text-emerald-400 border-emerald-400/20 bg-emerald-400/8",
  Cloud: "text-orange-400 border-orange-400/20 bg-orange-400/8",
  Language: "text-sky-400 border-sky-400/20 bg-sky-400/8",
  "Full Stack": "text-violet-400 border-violet-400/20 bg-violet-400/8",
  AI: "text-fuchsia-400 border-fuchsia-400/20 bg-fuchsia-400/8",
  Wellness: "text-rose-400 border-rose-400/20 bg-rose-400/8",
};

const certificateHoverAccents = [
  "hover-accent-rose",
  "hover-accent-emerald",
  "hover-accent-amber",
  "hover-accent-violet",
  "hover-accent-cyan",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<(typeof PORTFOLIO_DATA.certificates)[number] | null>(null);

  useEffect(() => {
    if (!selectedCert) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCert(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="certificates" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-12"
        >
          Credentials
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
            Certificates &amp; Awards.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.15}
            className="text-foreground/65 text-base max-w-sm leading-relaxed"
          >
            Open any certificate right inside the portfolio. Double-click a card or use the view action to preview it with a focused overlay.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO_DATA.certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.025, rotateX: 1.6, rotateY: idx % 2 === 0 ? -1.8 : 1.8 }}
              onDoubleClick={() => setSelectedCert(cert)}
              className={`interactive-surface ${certificateHoverAccents[idx % certificateHoverAccents.length]} group relative flex flex-col gap-5 p-6 rounded-2xl border border-foreground/8 bg-card cursor-pointer overflow-hidden`}
              data-cursor-hover
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl bg-gradient-to-br ${cert.color}`}
              />

              <motion.div
                className="absolute -inset-x-10 top-0 h-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100"
                initial={{ x: "-120%" }}
                whileHover={{ x: "120%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />

              <div className="relative flex items-start justify-between gap-3">
                <div className="interactive-icon w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center shrink-0 group-hover:border-foreground/25 transition-colors duration-300">
                  <Award className="w-4.5 h-4.5 text-foreground/55 group-hover:text-foreground/80 transition-colors duration-300" style={{ width: 18, height: 18 }} />
                </div>
                <span
                  className={`interactive-chip keep-chip-tone inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full border tracking-wider ${CATEGORY_COLORS[cert.category] ?? "text-foreground/50 border-foreground/15 bg-foreground/5"}`}
                >
                  {cert.category}
                </span>
              </div>

              <div className="relative flex flex-col gap-2 flex-1">
                <h3 className="text-base font-bold text-foreground leading-snug">{cert.title}</h3>
                <p className="text-sm font-medium text-foreground/65">{cert.issuer}</p>
                <p className="text-sm text-foreground/60 leading-relaxed mt-1 flex-1">{cert.description}</p>
              </div>

              <div className="relative flex items-center justify-between pt-4 border-t border-foreground/6">
                <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                  <Calendar className="w-3.5 h-3.5" />
                  {cert.date}
                </div>
                <motion.button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="interactive-chip hover-invert inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs font-semibold text-foreground/72"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  data-cursor-hover
                >
                  View Certificate <ExternalLink className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              aria-label="Close certificate preview"
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
                    Certificate Preview
                  </p>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-sm text-white/55">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedCert.credentialLink}
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
                    onClick={() => setSelectedCert(null)}
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
                    src={`${selectedCert.credentialLink}#toolbar=0&navpanes=0&scrollbar=1`}
                    title={selectedCert.title}
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
