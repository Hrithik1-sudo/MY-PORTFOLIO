import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    setCompact(latest > 140);
  });

  useEffect(() => {
    if (!compact) {
      setMenuOpen(false);
    }
  }, [compact]);

  const links = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "certs", label: "Certs", href: "#certificates" },
    { id: "training", label: "Training", href: "#training" },
    { id: "education", label: "Education", href: "#education" },
  { id: "achievements", label: "Achievements", href: "#achievements" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      layout
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ layout: { type: "spring", stiffness: 240, damping: 28 }, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 z-50 max-w-[calc(100%-1rem)] transition-all duration-300 ${
        compact
          ? "right-4 left-auto translate-x-0 w-auto"
          : "left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] lg:w-auto"
      }`}
    >
      <motion.div
        layout
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        animate={{
          borderRadius: compact ? "999px" : "2rem",
        }}
        className="glass-panel-strong relative flex items-center justify-center gap-2 lg:gap-3 px-3 sm:px-4 lg:px-4 py-3 lg:py-3.5 transition-all duration-300"
        style={{
          background: scrolled
            ? theme === "dark"
              ? "rgba(10,10,10,0.9)"
              : "rgba(248,248,248,0.92)"
            : undefined,
          backdropFilter: scrolled ? "blur(24px)" : undefined,
          WebkitBackdropFilter: scrolled ? "blur(24px)" : undefined,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {compact ? (
            <motion.div
              layout
              key="compact-nav"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-2"
            >
              <motion.button
                onClick={() => scrollTo("#home")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="interactive-icon flex items-center rounded-full border border-foreground/16 bg-foreground/[0.03] p-1.5 text-foreground transition-colors"
              >
                <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-foreground/12 bg-background shrink-0">
                  <img
                    src="/images/hrithik-profile.jpeg"
                    alt="Hrithik Parihar"
                    className="h-full w-full object-cover"
                  />
                </span>
              </motion.button>

              <motion.button
                onClick={() => setMenuOpen((open) => !open)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="interactive-icon hover-invert flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-4 py-3 text-sm font-medium text-foreground/80"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="hidden sm:inline">{menuOpen ? "Close" : "Open"}</span>
              </motion.button>

              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-panel-strong absolute right-0 top-[calc(100%+0.75rem)] flex min-w-[18rem] flex-col gap-2 rounded-[1.75rem] p-3"
                  >
                    {links.map((link) => (
                      <motion.button
                        key={link.id}
                        onClick={() => {
                          scrollTo(link.href);
                          setActive(link.id);
                          setMenuOpen(false);
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`interactive-chip flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                          active === link.id
                            ? "bg-foreground text-background"
                            : "border border-foreground/10 text-foreground/72"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </motion.button>
                    ))}

                    <div className="mt-1 flex items-center gap-2">
                      <motion.button
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="interactive-chip hover-invert flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground/14 px-4 py-3 text-sm font-medium text-foreground/80"
                      >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        Theme
                      </motion.button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              layout
              key="full-nav"
              initial={{ opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-2 lg:gap-3"
            >
              <div className="flex items-center gap-3 min-w-0" data-testid="nav-logo">
                <motion.button
                  onClick={() => scrollTo("#home")}
                  whileHover={{ rotate: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="interactive-icon flex items-center gap-3 rounded-full border border-foreground/16 bg-foreground/[0.03] pr-3 pl-1.5 py-1.5 text-foreground transition-colors shrink-0"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-foreground/12 bg-background shrink-0">
                    <img
                      src="/images/hrithik-profile.jpeg"
                      alt="Hrithik Parihar"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="hidden sm:flex flex-col items-start leading-none pr-1">
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/52">
                      Hrithik
                    </span>
                    <span className="text-sm font-bold tracking-tight text-foreground">
                      Parihar
                    </span>
                  </span>
                </motion.button>
                <div className="hidden 2xl:flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-foreground/55 tracking-[0.18em] uppercase">
                    Full Stack Developer
                  </span>
                  <span className="text-[11px] font-medium text-foreground/45 tracking-[0.12em] uppercase">
                    Building the Web
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-2.5 min-w-0 max-w-full">
                <nav
                  className="hidden lg:flex items-center bg-foreground/5 border border-foreground/8 rounded-full px-1.5 py-1.5 gap-1 max-w-full"
                  data-testid="nav-links"
                >
                  {links.map((link) => (
                    <motion.button
                      key={link.id}
                      onClick={() => { scrollTo(link.href); setActive(link.id); }}
                      data-testid={`nav-${link.id}`}
                      whileHover={active === link.id ? undefined : { y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`interactive-chip relative px-3 xl:px-3.5 py-1.5 rounded-full text-[12px] xl:text-[13px] 2xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        active === link.id
                          ? "bg-foreground text-background shadow-[0_10px_24px_hsl(var(--foreground)/0.16)]"
                          : "text-foreground/70"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>

                <nav className="flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[calc(100vw-8.75rem)] sm:max-w-[calc(100vw-11rem)] px-1">
                  {links.map((link) => (
                    <motion.button
                      key={link.id}
                      onClick={() => { scrollTo(link.href); setActive(link.id); }}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className={`interactive-chip shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        active === link.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground/12 text-foreground/72 bg-transparent"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>

                <motion.button
                  onClick={toggleTheme}
                  data-testid="button-theme-toggle"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  whileHover={{ rotate: theme === "dark" ? 18 : -18 }}
                  whileTap={{ scale: 0.94 }}
                  className="interactive-icon hover-invert flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-foreground/15 text-foreground/70 transition-all duration-200 active:scale-90 shrink-0"
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
