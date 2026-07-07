import React from "react";
import { designTokens } from "../../styles/designTokens";

export default function SectionContainer({
  id,
  children,
  className = "",
  showGlow = false,
  glowClassName = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  maxWidthClass = "max-w-[1280px]",
}) {
  return (
    <section
      id={id}
      className={`w-full flex flex-col justify-center items-center px-[20px] md:px-[32px] lg:px-[48px] ${designTokens.spacing.sectionPadding} relative overflow-hidden select-none ${className}`}
    >
      {/* 🌌 Reusable subtle nebula background glow */}
      {showGlow && (
        <div
          className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#7c3aed]/3 to-[#22d3ee]/3 blur-[120px] pointer-events-none -z-10 ${glowClassName}`}
        />
      )}

      {/* Centered layout wrapper */}
      <div className={`w-full z-10 relative ${maxWidthClass}`}>
        {children}
      </div>
    </section>
  );
}
