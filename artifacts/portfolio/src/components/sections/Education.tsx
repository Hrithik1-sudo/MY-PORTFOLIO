import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const getStartYear = (date: string) => {
  const match = date.match(/\b(20\d{2})\b/);
  return match ? match[1] : "";
};

export function Education() {
  const [featured, ...history] = PORTFOLIO_DATA.education;

  return (
    <section id="education" className="py-28 sm:py-36 border-t border-foreground/8 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center text-xs font-semibold tracking-[0.32em] uppercase text-foreground/45 mb-6"
        >
          Education
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.08}
          className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-16 sm:mb-20"
        >
          Education
        </motion.h2>

        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, scale: 1.01 }}
          className="interactive-surface hover-accent-violet group relative overflow-hidden rounded-[3rem] border border-foreground/14 bg-card dark:bg-black px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16"
          data-cursor-hover
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,hsl(var(--foreground)/0.08),transparent_42%)]" />

          <div className="relative grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.32em] uppercase text-foreground/68 mb-7">
                {featured.status ?? "Currently Enrolled"}
              </p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight text-foreground">
                {featured.institution.replace(", Punjab", "")}
              </h3>
              <p className="mt-6 text-lg sm:text-xl font-medium text-foreground/58">
                {featured.degree}
              </p>
              {featured.description ? (
                <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/54">
                  {featured.description}
                </p>
              ) : null}
            </div>

            <div className="lg:text-right">
              <div className="text-[5.5rem] leading-none sm:text-[7rem] lg:text-[9rem] font-bold tracking-[-0.06em] text-foreground">
                {getStartYear(featured.date)}
              </div>
              <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.32em] uppercase text-foreground/42">
                {featured.date}
              </p>
            </div>
          </div>
        </motion.article>

        <div className="mt-7 flex flex-col gap-5">
          {history.map((item, idx) => (
            <motion.article
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4, scale: 1.005 }}
              className={`interactive-surface ${idx % 2 === 0 ? "hover-accent-sky" : "hover-accent-rose"} group relative overflow-hidden rounded-[2rem] border border-foreground/14 bg-card dark:bg-black px-6 py-6 sm:px-8 sm:py-7`}
              data-cursor-hover
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(90deg,hsl(var(--foreground)/0.05),transparent_42%)]" />

              <div className="relative grid items-center gap-5 lg:grid-cols-[72px_minmax(0,1fr)_320px]">
                <div className="text-xl font-semibold text-foreground/88">
                  0{idx + 2}
                </div>

                <div className="min-w-0">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground/82">
                    {item.institution.split(",")[0]}
                  </h3>
                  <p className="mt-1 text-lg text-foreground/48">
                    {item.degree} {item.description ? `· ${item.description}` : ""}
                  </p>
                </div>

                <div className="text-left lg:text-right text-sm font-semibold tracking-[0.28em] uppercase text-foreground/42">
                  {item.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
