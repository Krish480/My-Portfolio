import React, { createContext, useContext, useRef, useEffect } from "react";

const ScrollStateContext = createContext();

export default function ScrollStateManager({ children }) {
  const scrollData = useRef({
    progress: 0,
    currentScroll: 0,
    maxScroll: 1,
  });

  useEffect(() => {
    const updateScroll = () => {
      const current = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.max(0, Math.min(1, current / max)) : 0;
      
      scrollData.current.progress = progress;
      scrollData.current.currentScroll = current;
      scrollData.current.maxScroll = max;
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    // Initial calculation
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <ScrollStateContext.Provider value={scrollData}>
      {children}
    </ScrollStateContext.Provider>
  );
}

export function useScrollState() {
  const context = useContext(ScrollStateContext);
  if (!context) {
    throw new Error("useScrollState must be used within a ScrollStateManager");
  }
  return context;
}
