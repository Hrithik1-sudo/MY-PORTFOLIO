import { Navbar } from "@/components/Navbar";
import { FloatingSocials } from "@/components/FloatingSocials";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Training } from "@/components/sections/Training";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ cursor: "none" }}
    >
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <FloatingSocials />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Training />
      <Education />
      <Achievements />
      <Contact />

      <Footer />
    </main>
  );
}
