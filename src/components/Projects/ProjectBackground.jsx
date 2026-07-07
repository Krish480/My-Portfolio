import React from "react";

export default function ProjectBackground({ activeProject }) {
  if (!activeProject) return null;

  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full opacity-10 pointer-events-none blur-[140px] z-[-1] transition-all duration-[1000ms] ease-out-expo"
      style={{
        background: `radial-gradient(circle, ${activeProject.themeColor} 0%, transparent 70%)`,
        willChange: "background"
      }}
    />
  );
}
