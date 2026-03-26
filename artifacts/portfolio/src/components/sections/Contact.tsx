import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { useState } from "react";

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/hparihar2005@gmail.com";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } }),
};

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("message", form.message);
      payload.append("_subject", `New portfolio message from ${form.name}`);
      payload.append("_template", "table");
      payload.append("_replyto", form.email);
      payload.append("_honey", form.honey);

      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const result = await parseApiResponse(response);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send message right now.");
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "", honey: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitted(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send message right now."
      );
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b py-3 text-foreground placeholder:text-foreground/40 focus:outline-none text-sm transition-all duration-300 ${
      focused === field ? "border-foreground/70" : "border-foreground/15"
    }`;

  return (
    <section id="contact" className="py-28 sm:py-36 border-t border-foreground/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-xs font-semibold tracking-[0.3em] uppercase text-foreground/55 mb-12"
        >
          Get In Touch
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <div className="flex flex-col gap-10">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.08}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
            >
              Let's build something<br />
              <span
                className="italic font-normal text-foreground/60"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                extraordinary together.
              </span>
            </motion.h2>

            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}
              className="text-foreground/70 text-base leading-relaxed max-w-md"
            >
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.22}
              className="flex flex-col gap-5"
            >
              {[
                { Icon: Mail, label: "Email", value: PORTFOLIO_DATA.personal.email, href: `mailto:${PORTFOLIO_DATA.personal.email}` },
                { Icon: Phone, label: "Phone", value: PORTFOLIO_DATA.personal.phone, href: `tel:${PORTFOLIO_DATA.personal.phone}` },
                { Icon: MapPin, label: "Location", value: PORTFOLIO_DATA.personal.location, href: null },
              ].map(({ Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  className="interactive-surface flex items-center gap-4 group px-3 py-3 -mx-3 rounded-2xl"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center shrink-0 transition-colors duration-200 hover:border-foreground/40 hover:bg-foreground/5"
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-4 h-4 text-foreground/55" />
                  </motion.div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-foreground/50 mb-0.5">{label}</p>
                    {href ? (
                      <motion.a
                        href={href}
                        className="interactive-link text-sm font-medium text-foreground/85 relative inline-block group/link"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        data-cursor-hover
                      >
                        {value}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground/50 group-hover/link:w-full transition-all duration-300" />
                      </motion.a>
                    ) : (
                      <p className="text-sm font-medium text-foreground/85">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.35}
              className="flex flex-wrap gap-3"
            >
              {Object.entries(PORTFOLIO_DATA.personal.socials).map(([key, url]) => (
                <motion.a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-chip flex items-center gap-1.5 px-4 py-2 rounded-full border border-foreground/10 text-xs font-medium text-foreground/70 capitalize transition-colors duration-200 hover:border-foreground/35 hover:text-foreground"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  data-cursor-hover
                >
                  {key} <ArrowUpRight className="w-3 h-3" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Minimal underline form */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                value={form.honey}
                onChange={(e) => setForm({ ...form, honey: e.target.value })}
                className="hidden"
              />

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Name</label>
                <motion.input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("name")}
                  placeholder="John Doe"
                  data-testid="input-name"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Email</label>
                <motion.input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("email")}
                  placeholder="john@example.com"
                  data-testid="input-email"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Message</label>
                <motion.textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="Tell me about your project..."
                  data-testid="input-message"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || submitted}
                data-testid="button-submit"
                data-cursor-hover
                className="interactive-link group self-start flex items-center gap-3 text-sm font-semibold text-foreground relative py-2"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 text-foreground/75">
                    <span className="w-4 h-4 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : submitted ? (
                  <span className="text-accent font-semibold">Message Sent!</span>
                ) : (
                  <>
                    Send Message
                    <motion.div
                      className="w-8 h-8 rounded-full border border-foreground flex items-center justify-center transition-colors duration-200 group-hover:bg-foreground group-hover:text-background"
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover:text-background transition-colors" />
                    </motion.div>
                  </>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-foreground group-hover:w-full transition-all duration-300" />
              </motion.button>

              {submitError ? (
                <p className="text-sm text-red-500/85 leading-relaxed max-w-md">
                  {submitError}
                </p>
              ) : (
                <p className="text-xs text-foreground/52 leading-relaxed max-w-md">
                  Messages are sent directly to {PORTFOLIO_DATA.personal.email}. The first live submission may require confirming the FormSubmit activation email once.
                </p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

async function parseApiResponse(response: Response) {
  const raw = await response.text();

  if (!raw.trim()) {
    throw new Error(
      "The contact service is not responding yet. Please try again in a moment."
    );
  }

  try {
    return JSON.parse(raw) as { success?: boolean; message?: string };
  } catch {
    throw new Error(
      "The contact service returned an unexpected response. Please try again shortly."
    );
  }
}
