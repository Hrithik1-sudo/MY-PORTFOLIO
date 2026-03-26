import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { ThemeProvider } from "@/lib/theme";
import { OpeningIntro } from "@/components/OpeningIntro";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = showIntro ? "hidden" : previousOverflow || "";

    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 3200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AnimatePresence>
            {showIntro ? <OpeningIntro key="opening-intro" /> : null}
          </AnimatePresence>

          <motion.div
            animate={{
              opacity: showIntro ? 0 : 1,
            }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </motion.div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
