import React, { useState, useEffect, useRef } from "react";
import { projectsData } from "./projectsData";
import ProjectBackground from "./ProjectBackground";
import ProjectScene from "./ProjectScene";
import ProjectCard from "./ProjectCard";
import ProjectNavigation from "./ProjectNavigation";
import ProjectIndicators from "./ProjectIndicators";
import ProjectControls from "./ProjectControls";
import CommandCenter3D from "./CommandCenter3D";
import Heading from "../ui/Heading";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Cpu } from "lucide-react";
import gsap from "gsap";

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null); // null = Orbit Map on desktop
  const activeProject = projectsData[activeIndex];

  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const isMobile = useRef(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Monitor screen size for mobile animation optimization
  useEffect(() => {
    const handleResize = () => {
      const mobileOrTablet = window.innerWidth < 1024;
      isMobile.current = mobileOrTablet;
      if (mobileOrTablet && selectedProjectIndex === null) {
        // Automatically default to card detail view on mobile
        setSelectedProjectIndex(0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedProjectIndex]);

  // Sync initial theme colors to custom CSS properties
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--active-theme-color", activeProject.themeColor);
      containerRef.current.style.setProperty("--active-theme-accent", activeProject.accentColor);
      containerRef.current.style.setProperty("--active-theme-glow", `${activeProject.themeColor}22`);
    }
  }, [activeIndex]);

  const performTransition = (nextIndex, direction) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const targetProject = projectsData[nextIndex];
    const cardContainer = cardContainerRef.current;
    const canvas = document.querySelector("canvas");

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
      }
    });

    if (isMobile.current) {
      // Simplified transitions for touch screen/mobile devices
      tl.to(cardContainer, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveIndex(nextIndex);
          setSelectedProjectIndex(nextIndex);
        }
      })
      .to(cardContainer, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      // Cinematic transition for desktop card details view
      tl.to(cardContainer, {
        opacity: 0,
        scale: 0.93,
        z: -80,
        y: direction === 1 ? -18 : 18,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveIndex(nextIndex);
          setSelectedProjectIndex(nextIndex);
        }
      });

      // Holographic screen powers down
      tl.to(".holo-screen", {
        scaleY: 0.04,
        opacity: 0.15,
        filter: "brightness(2.2) contrast(1.4) hue-rotate(30deg)",
        duration: 0.24,
        ease: "power3.in"
      }, 0);

      if (canvas) {
        tl.to(canvas, {
          scaleX: 1.08,
          scaleY: 1.04,
          filter: "blur(1.5px) contrast(1.05)",
          x: direction === 1 ? -20 : 20,
          y: direction === 1 ? 6 : -6,
          duration: 0.45,
          ease: "power2.inOut"
        }, 0);

        tl.to(canvas, {
          scaleX: 1,
          scaleY: 1,
          filter: "blur(0px) contrast(1)",
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, 0.45);
      }

      // Next card fades in
      tl.to(cardContainer, {
        opacity: 1,
        scale: 1,
        z: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      // Holographic screen powers on
      tl.fromTo(".holo-screen",
        { scaleY: 0.04, opacity: 0, filter: "brightness(2) contrast(1.4)" },
        { scaleY: 1, opacity: 1, filter: "brightness(1) contrast(1) hue-rotate(0deg)", duration: 0.45, ease: "back.out(1.5)" },
        0.45
      );
    }
  };

  const handleNext = () => {
    if (activeIndex < projectsData.length - 1) {
      performTransition(activeIndex + 1, 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      performTransition(activeIndex - 1, -1);
    }
  };

  const handleTouchStart = (e) => {
    if (isMobile.current) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (isMobile.current) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile.current || !touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation & ESC close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProjectIndex === null) {
        // If in Orbit map view: keyboard tab triggers focus naturally, Enter is handled by nodes
        return;
      }
      
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        setSelectedProjectIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, selectedProjectIndex]);

  const showOrbitMap = selectedProjectIndex === null && !isMobile.current;

  return (
    <div 
      ref={containerRef}
      className="space-y-[36px] md:space-y-[48px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        "--active-theme-color": "#22d3ee",
        "--active-theme-accent": "#67e8f9",
        "--active-theme-glow": "rgba(34,211,238,0.05)"
      }}
    >
      <Heading
        label="MISSION CONTROL"
        title="GALAXY ARCHIVE"
        subtitle="System active. Scan archives and select destination to establish target portal connection."
        align="center"
      />

      {/* Main interactive terminal grid */}
      <div className="flex flex-col lg:flex-row items-stretch gap-8 w-full max-w-7xl mx-auto">
        
        {/* Side Navigation (Desktop only, hidden when orbit map is open) */}
        {!showOrbitMap && (
          <div className="hidden lg:flex flex-col justify-start py-8 space-y-6 w-44 shrink-0 text-left border-r border-white/5 pr-4 select-none">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>INDEX</span>
            </div>
            {projectsData.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    if (idx !== activeIndex) {
                      performTransition(idx, idx > activeIndex ? 1 : -1);
                    }
                  }}
                  className={`group flex items-center gap-3 text-left focus:outline-none transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                  }`}
                  aria-label={`Jump to mission 0${idx + 1}`}
                >
                  <span 
                    className="text-[10px] font-extrabold tracking-widest transition-colors duration-300"
                    style={{ 
                      color: isActive ? "var(--active-theme-color)" : "",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider leading-none relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 after:origin-right group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-300">
                    {project.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}

            {/* Back button to return to Orbit Map */}
            <button
              onClick={() => setSelectedProjectIndex(null)}
              className="mt-6 flex items-center gap-2 text-left focus:outline-none text-[9px] font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors duration-200 border-t border-white/5 pt-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>GALAXY MAP</span>
            </button>
          </div>
        )}

        {/* Right side: Active mission content */}
        <div className="flex-1 w-full flex flex-col justify-start relative">
          
          {/* Top Bar Telemetry Display */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/[0.06] pb-4 mb-8 text-left select-none tracking-widest text-[9px] font-bold text-gray-500">
            <div className="flex items-center gap-3.5 font-mono">
              <span className="text-gray-400">MISSION TERMINAL</span>
              <span className="text-white/20">/</span>
              {showOrbitMap ? (
                <span className="text-cyan-400">SECTOR ORBIT VIEW</span>
              ) : (
                <span style={{ color: "var(--active-theme-color)" }}>DOCK 0{activeIndex + 1}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 md:mt-0 font-mono">
              {showOrbitMap ? (
                <div>SECTOR COGNITION: <span className="text-white uppercase font-black">SCANNING</span></div>
              ) : (
                <>
                  <div>STATION: <span className="text-white uppercase font-black">{activeProject.title}</span></div>
                  <div>CLASS: <span style={{ color: "var(--active-theme-accent)" }} className="uppercase font-black">{activeProject.category}</span></div>
                  <div className="flex items-center gap-1.5">
                    STATUS: 
                    <span style={{ color: "var(--active-theme-color)" }} className="font-black">
                      {activeProject.status === "In Progress" || activeProject.isWip ? "ACTIVE STAGE" : "STANDBY SYSTEM"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Scene Wrapper */}
          <ProjectBackground activeProject={showOrbitMap ? null : activeProject} />
          
          <AnimatePresence mode="wait">
            {showOrbitMap ? (
              /* 🌌 3D Interactive Orbit Map View */
              <motion.div
                key="orbit-map"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <CommandCenter3D
                  onSelectProject={(idx) => {
                    setActiveIndex(idx);
                    setSelectedProjectIndex(idx);
                  }}
                />
              </motion.div>
            ) : (
              /* 🚀 Active Mission Dock Panel Detail View */
              <motion.div
                key="details-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {/* Mobile Back to Map helper (hidden on mobile since orbit is disabled there) */}
                {selectedProjectIndex !== null && !isMobile.current && (
                  <div className="flex justify-end mb-4 lg:hidden">
                    <button
                      onClick={() => setSelectedProjectIndex(null)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-[9px] font-bold tracking-widest hover:bg-cyan-500/10 transition-all duration-200"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>RETURN TO SECTOR MAP</span>
                    </button>
                  </div>
                )}

                {/* 3D Transform Wrapper for GSAP Timeline */}
                <div 
                  ref={cardContainerRef} 
                  className="w-full"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    perspective: "1000px" 
                  }}
                >
                  <ProjectScene activeProject={activeProject}>
                    <ProjectCard project={activeProject} />
                  </ProjectScene>
                </div>

                <ProjectControls activeProject={activeProject} />

                {/* Navigation Controls & Indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 select-none border-t border-white/[0.04] pt-6">
                  <ProjectNavigation
                    activeIndex={activeIndex}
                    totalProjects={projectsData.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    themeColor={activeProject.themeColor}
                  />

                  <ProjectIndicators
                    activeIndex={activeIndex}
                    totalProjects={projectsData.length}
                    onChangeIndex={(idx) => {
                      if (idx !== activeIndex) {
                        performTransition(idx, idx > activeIndex ? 1 : -1);
                      }
                    }}
                    themeColor={activeProject.themeColor}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
