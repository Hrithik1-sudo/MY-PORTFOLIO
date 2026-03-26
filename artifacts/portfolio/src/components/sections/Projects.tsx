import { motion } from "framer-motion";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

const projectHoverAccents = [
  "hover-accent-sky",
  "hover-accent-emerald",
  "hover-accent-violet",
  "hover-accent-rose",
];

function ProjectCard({ project, idx }: { project: typeof PORTFOLIO_DATA.projects[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`interactive-surface group relative flex flex-col rounded-2xl overflow-hidden border border-foreground/8 bg-card cursor-default ${projectHoverAccents[idx % projectHoverAccents.length]}`}
      data-cursor-hover
      whileHover={{ y: -10, scale: 1.018, rotateX: 1.8, rotateY: idx % 2 === 0 ? -2.4 : 2.4 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.08] group-hover:contrast-110"
          loading="lazy"
        />

        <div className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/42 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/88 backdrop-blur-sm">
          {project.date}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/82 to-background/18 opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex translate-y-6 flex-col gap-4 px-7 py-7 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/58">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <span>View Project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-foreground/72">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="interactive-chip text-[11px] font-semibold px-3 py-1 rounded-full border border-foreground/15 text-foreground/75 tracking-wide"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-link flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-accent transition-colors"
              data-testid={`link-live-${idx}`}
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-link flex items-center gap-1.5 text-xs font-semibold text-foreground/65 hover:text-foreground transition-colors"
              data-testid={`link-github-${idx}`}
            >
              <Github className="w-3.5 h-3.5" /> Source Code
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-foreground/6">
        <div>
          <h3 className="text-base font-bold text-foreground">{project.title}</h3>
          <p className="text-xs text-foreground/55 mt-0.5">
            {project.tech.slice(0, 2).join(" · ")}
            {project.tech.length > 2 ? ` +${project.tech.length - 2}` : ""}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[11px] font-medium text-foreground/50 whitespace-nowrap">
            {project.date}
          </span>
          <div className="interactive-icon w-8 h-8 rounded-full border border-foreground/12 flex items-center justify-center text-foreground/50 group-hover:border-foreground/40 group-hover:text-foreground/80 transition-all duration-300">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Featured Projects.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xs text-foreground/55 italic hidden sm:block"
          >
            Hover a card to see details
          </motion.p>
        </div>

        {/* Cards grid — 2 columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ perspective: "1000px" }}
        >
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.015, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <ProjectCard project={project} idx={idx} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
