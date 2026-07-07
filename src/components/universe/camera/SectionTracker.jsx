import React, { createContext, useContext, useRef, useEffect } from "react";

const SectionContext = createContext();

export default function SectionTracker({ children }) {
  const sectionData = useRef({
    activeKey: "hero", // "hero", "about", "projects", "experience", "contact"
    sectionProgress: 0, // [0.0, 1.0] local scroll progress within active section
    activeIdx: 0,
  });

  const sectionKeys = ["hero", "about", "projects", "experience", "contact"];
  const domIds = ["home", "about", "projects", "experience", "contact"];

  useEffect(() => {
    const trackSections = () => {
      const elements = domIds.map((id) => document.getElementById(id));
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      let activeIdx = 0;
      let activeKey = "hero";
      let sectionProgress = 0;

      // Find current section index based on viewport intersections
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const topOfSection = rect.top + scrollY;
        const bottomOfSection = topOfSection + rect.height;

        if (scrollY >= topOfSection - vh * 0.5 && scrollY < bottomOfSection - vh * 0.5) {
          activeIdx = i;
          activeKey = sectionKeys[i];
          
          const sectionHeight = rect.height;
          const offset = scrollY - (topOfSection - vh * 0.5);
          sectionProgress = Math.max(0, Math.min(1, offset / sectionHeight));
          break;
        }
      }

      sectionData.current.activeKey = activeKey;
      sectionData.current.activeIdx = activeIdx;
      sectionData.current.sectionProgress = sectionProgress;
    };

    window.addEventListener("scroll", trackSections, { passive: true });
    // Initial check
    setTimeout(trackSections, 250);

    return () => {
      window.removeEventListener("scroll", trackSections);
    };
  }, []);

  return (
    <SectionContext.Provider value={sectionData}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionTracker() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionTracker must be used within a SectionTracker");
  }
  return context;
}
