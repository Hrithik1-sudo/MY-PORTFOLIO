import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export function FloatingSocials() {
  const socials = [
    { Icon: Github, href: PORTFOLIO_DATA.personal.socials.github, label: "GitHub" },
    { Icon: Linkedin, href: PORTFOLIO_DATA.personal.socials.linkedin, label: "LinkedIn" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="fixed right-6 top-0 bottom-0 hidden xl:flex flex-col justify-center items-center z-40 gap-5"
    >
      <motion.div
        className="w-px bg-foreground/10"
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      />

      {socials.map(({ Icon, href, label }, idx) => (
        <motion.a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="interactive-icon p-2 rounded-full text-foreground/45 relative transition-colors duration-200 hover:text-foreground hover:bg-foreground/5"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 + idx * 0.08, duration: 0.4 }}
          whileHover={{ y: -3, scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          data-cursor-hover
        >
          <Icon size={15} />
        </motion.a>
      ))}

      <motion.div
        className="w-px bg-foreground/10"
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      />
    </motion.div>
  );
}
