import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";
import { useTheme } from "@/lib/theme";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.32,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function OpeningIntro() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: "blur(16px)",
        transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-background"
    >
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,hsl(var(--foreground)/0.1),transparent_28%),radial-gradient(circle_at_80%_26%,hsl(var(--foreground)/0.08),transparent_24%),radial-gradient(circle_at_50%_78%,hsl(var(--foreground)/0.06),transparent_30%)]"
      />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:72px_72px]" />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.75 }}
        animate={{ opacity: theme === "dark" ? 0.22 : 0.1, scaleX: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground blur-[110px]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -16, transition: { duration: 0.45 } }}
        variants={container}
        className="relative z-10 flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <motion.p
          variants={item}
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.48em] text-foreground/45 sm:text-xs"
        >
          Portfolio Experience
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            variants={item}
            className="text-[18vw] font-black uppercase leading-[0.9] tracking-[-0.09em] text-foreground sm:text-[11rem] lg:text-[14rem]"
          >
            {PORTFOLIO_DATA.personal.firstName}
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            variants={item}
            className="text-outline mt-1 text-[14vw] font-black uppercase leading-[0.92] tracking-[-0.085em] sm:text-[8rem] lg:text-[10rem]"
          >
            {PORTFOLIO_DATA.personal.lastName}
          </motion.h2>
        </div>

        <motion.div
          variants={item}
          className="mt-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.38em] text-foreground/50 sm:text-xs"
        >
          <span className="h-px w-14 bg-foreground/16 sm:w-20" />
          <span>{PORTFOLIO_DATA.personal.role}</span>
          <span className="h-px w-14 bg-foreground/16 sm:w-20" />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: theme === "dark" ? 0.68 : 0.48 }}
          transition={{ delay: 1.05, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px w-40 origin-center bg-foreground sm:w-56"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-[10px] uppercase tracking-[0.32em] text-foreground/38 sm:text-[11px]"
        >
          Design. Build. Deliver.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
