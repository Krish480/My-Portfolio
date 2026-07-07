import React from "react";

export default function ProjectIndicators({ activeIndex, totalProjects, onChangeIndex, themeColor }) {
  return (
    <div className="flex items-center justify-center gap-5 select-none">
      {Array.from({ length: totalProjects }).map((_, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={idx}
            onClick={() => onChangeIndex(idx)}
            className="group relative focus:outline-none py-2"
            aria-label={`Jump to slide ${idx + 1}`}
            aria-current={isActive ? "true" : "false"}
          >
            {/* The Node dot */}
            <div 
              className={`rounded-full transition-all duration-300 ${
                isActive 
                  ? "w-2.5 h-2.5 bg-white" 
                  : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40"
              }`}
              style={{
                boxShadow: isActive 
                  ? `0 0 15px ${themeColor || "#22d3ee"}, 0 0 5px ${themeColor || "#22d3ee"}`
                  : "none"
              }}
            />
            {/* Pulsing outer aura for active node */}
            {isActive && (
              <div 
                className="absolute inset-0 rounded-full border opacity-45 animate-ping pointer-events-none scale-[1.8]"
                style={{ borderColor: themeColor || "#22d3ee" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
