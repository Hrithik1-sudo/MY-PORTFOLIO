import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);
  const lastToggleY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);

    const previous = lastScrollY.current;
    const delta = latest - previous;

    if (latest < 80) {
      setHidden(false);
      lastToggleY.current = latest;
    } else if (!hidden && latest > 180 && delta > 4 && latest - lastToggleY.current > 110) {
      setHidden(true);
      lastToggleY.current = latest;
    } else if (hidden && delta < -4 && lastToggleY.current - latest > 70) {
      setHidden(false);
      lastToggleY.current = latest;
    }

    lastScrollY.current = latest;
  });

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
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-1rem)] lg:w-auto max-w-[calc(100%-1rem)]"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="glass-panel-strong flex items-center justify-center gap-2 lg:gap-3 px-3 sm:px-4 lg:px-4 py-3 lg:py-3.5 rounded-[2rem] transition-all duration-300"
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
        {/* Left: Logo + tagline */}
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

        {/* Right: Nav links + theme toggle + CTA */}
        <div className="flex items-center gap-2 lg:gap-2.5 min-w-0 max-w-full">
          {/* Desktop nav pill */}
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

          {/* Mobile / tablet: compact scrollable links */}
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

          {/* Theme toggle */}
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

          {/* Book a Call CTA */}
          <motion.button
            onClick={() => scrollTo("#contact")}
            data-testid="button-book-call"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="interactive-chip group hover-invert hidden 2xl:flex items-center gap-2 px-4 py-2.5 rounded-full border border-foreground/20 text-foreground text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95"
          >
            Book a Call
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  );
}
