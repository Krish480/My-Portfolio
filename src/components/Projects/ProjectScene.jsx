import React from "react";

export default function ProjectScene({ activeProject, children }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}
