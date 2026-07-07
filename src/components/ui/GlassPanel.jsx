import React from "react";

export default function GlassPanel({
  children,
  className = "",
  padding = "p-6",
  rounded = "rounded-[24px]",
}) {
  return (
    <div
      className={`border border-white/5 bg-white/[0.01] backdrop-blur-md ${rounded} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
