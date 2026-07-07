import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 relative overflow-hidden select-none">
      <div className="max-w-[800px] w-full mx-auto px-6 text-center space-y-2 z-10 relative">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          © 2026 Krishna Pandey
        </p>
        <p className="text-[11px] text-gray-600 font-medium">
          Designed & Developed with React, Three.js and ❤️
        </p>
      </div>
    </footer>
  );
}
