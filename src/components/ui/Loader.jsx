import React, { useState, useEffect } from "react";

export default function Loader({ onComplete }) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const messages = [
    "Loading Universe...",
    "Initializing Starfield...",
    "Generating Galaxy...",
    "Preparing Portfolio...",
    "Welcome"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 500); // Trigger cleanup after fade out finishes
          }, 400);
          return prev;
        }
      });
    }, 450); // Total load time around 2.25 seconds

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010104] transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background nebulas for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.08)_0%,transparent_65%)] pointer-events-none"></div>

      <div className="flex flex-col items-center space-y-6 z-10">
        {/* Twin spinning energy rings */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-[#22d3ee]/40 animate-spin"></div>
          <div 
            className="absolute inset-2 rounded-full border border-b-transparent border-l-transparent border-[#7c3aed]/40 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          ></div>
        </div>

        {/* Dynamic transition text */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-gray-300 font-medium tracking-widest text-[11px] sm:text-xs uppercase animate-pulse">
            {messages[step]}
          </p>
        </div>

        {/* Glass progress track */}
        <div className="w-44 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#22d3ee] to-[#7c3aed] transition-all duration-300 ease-out"
            style={{ width: `${((step + 1) / messages.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
