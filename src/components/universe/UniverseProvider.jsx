import React, { createContext, useState, useEffect, useRef } from "react";
import { universeConfig } from "./config/universeConfig";

export const UniverseContext = createContext();

export function UniverseProvider({ children }) {
  const [quality, setQuality] = useState("high");
  const [performanceMode, setPerformanceMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particleMultiplier, setParticleMultiplier] = useState(1.0);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  const [activeEffects, setActiveEffects] = useState({
    stars: true,
    nebula: true,
    galaxy: true,
    blackHole: true,
    dust: true,
    shootingStars: true,
  });

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      setIsMobile(mobile);
      
      const q = mobile ? "low" : tablet ? "medium" : "high";
      setQuality(q);
      setParticleMultiplier(universeConfig.quality[q].particleMultiplier);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <UniverseContext.Provider
      value={{
        quality,
        setQuality,
        performanceMode,
        setPerformanceMode,
        isMobile,
        particleMultiplier,
        setParticleMultiplier,
        activeEffects,
        setActiveEffects,
        mouseRef,
        scrollRef,
      }}
    >
      {children}
    </UniverseContext.Provider>
  );
}
