import { PORTFOLIO_DATA } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-foreground/8 py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Name */}
        <button
          onClick={scrollTop}
          className="interactive-link text-sm font-bold tracking-widest uppercase text-foreground/75 hover:text-foreground transition-colors"
        >
          Hrithik Parihar
        </button>

        {/* Copyright */}
        <p className="text-xs text-foreground/50 tracking-wider">
          © {new Date().getFullYear()} — Designed &amp; built with intention.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {Object.entries(PORTFOLIO_DATA.personal.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-link group text-xs font-medium text-foreground/55 hover:text-foreground transition-colors capitalize flex items-center gap-1"
            >
              {key}
              <ArrowUpRight className="w-3 h-3 opacity-70 -ml-0.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
