import { useEffect, useState } from "react";
import { UniverseProvider } from "./components/universe/UniverseProvider";
import UniverseCanvas from "./components/universe/UniverseCanvas";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/layout/Footer/Footer";

import CameraJourney from "./components/universe/camera/CameraJourney";
import Loader from "./components/ui/Loader";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth Scroll Integration using Lenis
  useEffect(() => {
    let lenis;
    
    // Dynamic import to prevent crash if running before dependency install completes
    import("lenis")
      .then((module) => {
        const LenisClass = module.default;
        lenis = new LenisClass({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 1.5,
          infinite: false,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      })
      .catch((err) => {
        console.warn("Smooth scroll fallback activated:", err);
      });

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <UniverseProvider>
      <CameraJourney>
        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
        <div className="relative text-white font-sans overflow-x-hidden min-h-screen select-none">
          {/* 🌌 Dedicated 3D WebGL React Three Fiber Universe Canvas */}
          <UniverseCanvas />

          {/* Floating Minimal Glass Navbar */}
          <Navbar />

          {/* Cinematic Spaced Out Page Layout */}
          <main className="w-full relative z-10 flex flex-col items-center">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Contact />
          </main>

          {/* Minimal Footer */}
          <Footer />
        </div>
      </CameraJourney>
    </UniverseProvider>
  );
}


