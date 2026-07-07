import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Magnetic({ children, disabled }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Soft magnetic pull of 35%
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: disabled ? "none" : `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
}

export default function ProjectNavigation({ activeIndex, totalProjects, onNext, onPrev, themeColor }) {
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === totalProjects - 1;

  return (
    <div className="flex items-center justify-center gap-6 select-none font-mono">
      {/* Prev Button */}
      <Magnetic disabled={isFirst}>
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`w-10 h-10 rounded-full flex items-center justify-center border bg-white/5 backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 hover:scale-105 active:scale-95 ${
            isFirst 
              ? "border-white/5 text-gray-700 cursor-not-allowed opacity-50" 
              : "border-white/10 text-white hover:bg-white/10 hover:border-white/20"
          }`}
          style={{
            boxShadow: !isFirst ? `0 0 12px ${themeColor || "#22d3ee"}15` : "none"
          }}
          aria-label="Previous mission"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </Magnetic>

      {/* Mission Counter */}
      <div className="text-xs font-bold tracking-widest text-gray-400 flex items-center gap-2">
        <span className="text-white">0{activeIndex + 1}</span>
        <span className="text-gray-600">/</span>
        <span>0{totalProjects}</span>
      </div>

      {/* Next Button */}
      <Magnetic disabled={isLast}>
        <button
          onClick={onNext}
          disabled={isLast}
          className={`w-10 h-10 rounded-full flex items-center justify-center border bg-white/5 backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 hover:scale-105 active:scale-95 ${
            isLast 
              ? "border-white/5 text-gray-700 cursor-not-allowed opacity-50" 
              : "border-white/10 text-white hover:bg-white/10 hover:border-white/20"
          }`}
          style={{
            boxShadow: !isLast ? `0 0 12px ${themeColor || "#22d3ee"}15` : "none"
          }}
          aria-label="Next mission"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </Magnetic>
    </div>
  );
}
