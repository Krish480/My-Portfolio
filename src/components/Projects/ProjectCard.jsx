import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Sparkles, Mic, Trophy, Check, ArrowUpRight, Cpu, Radio, ShieldAlert, Laptop, Tablet as TabletIcon, Smartphone, Gauge, Award, Hourglass, Play } from "lucide-react";
import Button from "../ui/Button";

const techLogos = {
  React: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    version: "v18.3",
    color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] shadow-[0_0_15px_rgba(34,211,238,0.02)]",
  },
  "Node.js": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    version: "v18.2",
    color: "text-green-400 border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-400/40 hover:shadow-[0_0_12px_rgba(74,222,128,0.25)] shadow-[0_0_15px_rgba(74,222,128,0.02)]",
  },
  Express: {
    logo: "https://cdn.svgporn.com/logos/express.svg",
    version: "v4.18",
    color: "text-gray-300 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] shadow-[0_0_15px_rgba(255,255,255,0.02)]",
    extraClass: "invert brightness-200",
  },
  MongoDB: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    version: "v6.0",
    color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-400/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] shadow-[0_0_15px_rgba(16,185,129,0.02)]",
  },
  Tailwind: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    version: "v4.0",
    color: "text-sky-400 border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 hover:border-sky-400/40 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] shadow-[0_0_15px_rgba(56,189,248,0.02)]",
  },
  JavaScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    version: "ES6",
    color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-400/40 hover:shadow-[0_0_12px_rgba(234,179,8,0.25)] shadow-[0_0_15px_rgba(234,179,8,0.02)]",
  },
  Flask: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    version: "v2.0",
    color: "text-gray-200 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] shadow-[0_0_15px_rgba(255,255,255,0.02)]",
    extraClass: "invert brightness-200",
  },
  Python: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    version: "v3.10",
    color: "text-blue-400 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400/40 hover:shadow-[0_0_12px_rgba(96,165,250,0.25)] shadow-[0_0_15px_rgba(96,165,250,0.02)]",
  },
  "Three.js": {
    logo: "https://cdn.svgporn.com/logos/threejs.svg",
    version: "r184",
    color: "text-white border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] shadow-[0_0_15px_rgba(255,255,255,0.02)]",
    extraClass: "invert brightness-200",
  },
  "React Three Fiber": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    version: "v8.18",
    color: "text-pink-400 border-pink-500/20 bg-pink-500/5 hover:bg-pink-500/10 hover:border-pink-400/40 hover:shadow-[0_0_12px_rgba(244,114,182,0.25)] shadow-[0_0_15px_rgba(244,114,182,0.02)]",
  },
  GSAP: {
    logo: "https://cdn.svgporn.com/logos/gsap.svg",
    version: "v3.15",
    color: "text-green-400 border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-400/40 hover:shadow-[0_0_12px_rgba(74,222,128,0.25)] shadow-[0_0_15px_rgba(74,222,128,0.02)]",
  },
  AI: {
    icon: Sparkles,
    version: "OpenRouter",
    color: "text-purple-400 border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] shadow-[0_0_15px_rgba(168,85,247,0.02)]",
  },
  "Speech API": {
    icon: Mic,
    version: "WebSpeech",
    color: "text-rose-400 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-400/40 hover:shadow-[0_0_12px_rgba(251,113,133,0.25)] shadow-[0_0_15px_rgba(251,113,133,0.02)]",
  },
  Quiz: {
    icon: Trophy,
    version: "OpenTDB",
    color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-400/40 hover:shadow-[0_0_12px_rgba(234,179,8,0.25)] shadow-[0_0_15px_rgba(234,179,8,0.02)]",
  },
  Firebase: {
    logo: "https://cdn.svgporn.com/logos/firebase.svg",
    version: "v10.8",
    color: "text-amber-500 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-400/40 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] shadow-[0_0_15px_rgba(245,158,11,0.02)]",
  },
  OpenRouter: {
    icon: Sparkles,
    version: "API v1",
    color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] shadow-[0_0_15px_rgba(34,211,238,0.02)]",
  },
  "Next.js": {
    logo: "https://cdn.svgporn.com/logos/nextjs-icon.svg",
    version: "v14.2",
    color: "text-white border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] shadow-[0_0_15px_rgba(255,255,255,0.02)]",
    extraClass: "invert brightness-200",
  }
};

const getStationIdentity = (id) => {
  switch (id) {
    case "rudra-ai": return "AI MISSION CORE";
    case "meal-matrix": return "FOOD LOGISTICS DOCK";
    case "mind-arena": return "KNOWLEDGE CORE STATION";
    case "shop-matrix": return "COMMERCE SATELLITE";
    case "personal-portfolio": return "COMMAND CENTER SECTOR";
    case "eiet-college": return "EDUCATION TRANSMISSION NODE";
    default: return "MISSION COMMAND STATION";
  }
};

export default function ProjectCard({ project }) {
  if (!project) return null;

  const cardRef = useRef(null);
  const [viewMode, setViewMode] = useState("desktop"); // desktop, tablet, mobile
  const [activeTab, setActiveTab] = useState("diagnostics"); // diagnostics, architecture, timeline
  const [interactiveMode, setInteractiveMode] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const xNorm = x / (rect.width / 2);
    const yNorm = y / (rect.height / 2);
    
    cardRef.current.style.setProperty("--rx", `${-yNorm * 1.5}deg`);
    cardRef.current.style.setProperty("--ry", `${xNorm * 1.5}deg`);
    cardRef.current.style.setProperty("--mx", `${xNorm * 8}px`);
    cardRef.current.style.setProperty("--my", `${yNorm * 5}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
    cardRef.current.style.setProperty("--mx", "0px");
    cardRef.current.style.setProperty("--my", "0px");
  };

  const renderTechChip = (techName) => {
    const data = techLogos[techName];
    if (!data) {
      return (
        <span
          key={techName}
          className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-semibold select-none font-mono"
        >
          {techName}
        </span>
      );
    }

    return (
      <span
        key={techName}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold select-none transition-all duration-300 cursor-default font-mono ${data.color}`}
      >
        {data.logo ? (
          <img
            src={data.logo}
            alt={techName}
            className={`w-3.5 h-3.5 object-contain ${data.extraClass || ""}`}
          />
        ) : data.icon ? (
          <data.icon className="w-3.5 h-3.5" />
        ) : null}
        {techName}
        {data.version && (
          <span className="text-[8px] opacity-40 font-normal">({data.version})</span>
        )}
      </span>
    );
  };

  const isWip = project.status === "In Progress" || project.isWip;
  const hasLiveDemo = project.liveDemo && project.liveDemo !== "#";

  // Reverse vector style for mockups to create 3D parallax depth
  const innerMockupStyle = {
    transform: "translate3d(calc(var(--mx, 0px) * -0.85), calc(var(--my, 0px) * -0.85), 0px) scale(1.04)",
    transition: "transform 0.12s ease-out",
    willChange: "transform"
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes laserScan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes holoFlicker {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.96; }
        }
        .laser-scanner {
          animation: laserScan 4s linear infinite;
        }
        .holo-flicker {
          animation: holoFlicker 0.2s infinite;
        }
        .holo-grid {
          background-size: 24px 24px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }
        .project-card-container {
          --mx: 0px;
          --my: 0px;
          --rx: 0deg;
          --ry: 0deg;
        }
      `}} />

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card-container w-full p-6 sm:p-10 md:p-12 lg:p-14 rounded-[32px] border bg-[#030712]/35 backdrop-blur-3xl flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14 xl:gap-16 max-w-6xl mx-auto overflow-hidden holo-grid"
        style={{
          borderColor: "rgba(255,255,255,0.05)",
          boxShadow: `0 30px 100px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.03), 0 0 60px ${project.themeColor}08`,
          transform: "perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry))",
          transformStyle: "preserve-3d",
          willChange: "transform, box-shadow"
        }}
      >
        
        {/* LEFT COLUMN: Interactive Holographic Device Mockups */}
        <div className="w-full lg:w-[50%] flex flex-col justify-start items-center space-y-6 relative">
          
          {/* Ambient dynamic glow */}
          <div 
            className="absolute -inset-8 rounded-[36px] opacity-10 blur-3xl pointer-events-none transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle, ${project.themeColor || "#22d3ee"} 0%, transparent 70%)`
            }}
          />

          {/* Viewport Aspect Mode Toggles */}
          <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full z-10 font-mono text-[9px] text-gray-400 select-none">
            <button
              onClick={() => { setViewMode("desktop"); setInteractiveMode(false); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full focus:outline-none transition-colors duration-200 ${
                viewMode === "desktop" ? "bg-white/10 text-white font-bold" : "hover:text-gray-200"
              }`}
            >
              <Laptop className="w-3 h-3" />
              <span>LAPTOP</span>
            </button>
            <button
              onClick={() => { setViewMode("tablet"); setInteractiveMode(false); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full focus:outline-none transition-colors duration-200 ${
                viewMode === "tablet" ? "bg-white/10 text-white font-bold" : "hover:text-gray-200"
              }`}
            >
              <TabletIcon className="w-3 h-3" />
              <span>TABLET</span>
            </button>
            <button
              onClick={() => { setViewMode("mobile"); setInteractiveMode(false); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full focus:outline-none transition-colors duration-200 ${
                viewMode === "mobile" ? "bg-white/10 text-white font-bold" : "hover:text-gray-200"
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>PHONE</span>
            </button>
          </div>

          {/* Device Mockup Bezels Wrapper */}
          <div className="w-full flex justify-center items-center relative z-10 min-h-[300px]">
            {viewMode === "desktop" && (
              /* 💻 LAPTOP MOCKUP */
              <div className="w-full flex flex-col items-center transition-all duration-300">
                {/* Screen bezel */}
                <div 
                  className="w-full aspect-[16/10] rounded-t-[16px] border-[10px] border-black bg-[#111115] relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                  style={{ borderColor: "#18181c" }}
                >
                  {/* Camera dot */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/60 border border-white/5 z-40" />

                  {/* Screen Content Wrapper */}
                  <div className="w-full h-full relative" style={innerMockupStyle}>
                    {hasLiveDemo && interactiveMode ? (
                      <iframe
                        src={project.liveDemo}
                        title={project.title}
                        className="w-full h-full border-none bg-black overflow-y-auto"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div className="w-full h-full relative bg-[#02040a] holo-flicker">
                        {/* Interactive overlay cover */}
                        {hasLiveDemo && (
                          <button 
                            onClick={() => setInteractiveMode(true)}
                            className="absolute inset-0 bg-black/60 hover:bg-black/45 flex flex-col items-center justify-center gap-3 text-cyan-400 hover:text-cyan-300 font-mono text-[9px] font-bold tracking-widest z-30 transition-all duration-300"
                          >
                            <Play className="w-8 h-8 p-2 rounded-full border border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_#22d3ee]" />
                            <span>INITIALIZE LIVE PORTAL</span>
                          </button>
                        )}
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Laptop keyboard hinge base */}
                <div className="w-[108%] h-3 bg-[#1e1e24] rounded-b-[6px] border-t border-white/10 relative z-20 shadow-md flex items-center justify-center">
                  {/* Hinge groove */}
                  <div className="w-16 h-1 bg-[#0b0c10] rounded-b" />
                </div>
              </div>
            )}

            {viewMode === "tablet" && (
              /* 📱 TABLET MOCKUP */
              <div 
                className="w-[85%] aspect-[3/4] rounded-[24px] border-[14px] border-black bg-[#111115] relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300"
                style={{ borderColor: "#1c1c22" }}
              >
                {/* Home/Camera notch dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black z-40" />

                <div className="w-full h-full relative" style={innerMockupStyle}>
                  {hasLiveDemo && interactiveMode ? (
                    <iframe
                      src={project.liveDemo}
                      title={project.title}
                      className="w-full h-full border-none bg-black overflow-y-auto"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="w-full h-full relative bg-[#02040a] holo-flicker">
                      {hasLiveDemo && (
                        <button 
                          onClick={() => setInteractiveMode(true)}
                          className="absolute inset-0 bg-black/60 hover:bg-black/45 flex flex-col items-center justify-center gap-3 text-cyan-400 hover:text-cyan-300 font-mono text-[9px] font-bold tracking-widest z-30 transition-all duration-300"
                        >
                          <Play className="w-8 h-8 p-2 rounded-full border border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_#22d3ee]" />
                          <span>INITIALIZE LIVE PORTAL</span>
                        </button>
                      )}
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {viewMode === "mobile" && (
              /* 📱 PHONE MOCKUP */
              <div 
                className="w-[55%] aspect-[9/19] h-[330px] rounded-[32px] border-[10px] border-black bg-[#111115] relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300"
                style={{ borderColor: "#202026" }}
              >
                {/* Dynamic Island camera notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-40 border border-white/5 shadow-inner" />

                <div className="w-full h-full relative" style={innerMockupStyle}>
                  {hasLiveDemo && interactiveMode ? (
                    <iframe
                      src={project.liveDemo}
                      title={project.title}
                      className="w-full h-full border-none bg-black overflow-y-auto"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="w-full h-full relative bg-[#02040a] holo-flicker">
                      {hasLiveDemo && (
                        <button 
                          onClick={() => setInteractiveMode(true)}
                          className="absolute inset-0 bg-black/60 hover:bg-black/45 flex flex-col items-center justify-center gap-3 text-cyan-400 hover:text-cyan-300 font-mono text-[8px] font-bold tracking-widest z-30 transition-all duration-300 text-center px-4"
                        >
                          <Play className="w-6 h-6 p-1.5 rounded-full border border-cyan-400 bg-cyan-400/10 shadow-[0_0_10px_#22d3ee]" />
                          <span>INITIALIZE LIVE PORTAL</span>
                        </button>
                      )}
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Project Metrics Dials */}
          <div className="w-full grid grid-cols-5 gap-3 p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] z-10 select-none text-center">
            <div className="space-y-1">
              <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">PERFORMANCE</div>
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Gauge className="w-3 h-3" />
                {project.metrics.performance}%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">ACCESSIBILITY</div>
              <div className="text-xs font-mono font-bold text-cyan-400">
                {project.metrics.accessibility}%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">RESPONSIVE</div>
              <div className="text-xs font-mono font-bold text-white">
                {project.metrics.responsive}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">LOAD TIME</div>
              <div className="text-xs font-mono font-bold text-white flex items-center justify-center gap-0.5">
                <Hourglass className="w-2.5 h-2.5 text-orange-400" />
                {project.metrics.loadingSpeed}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">CODE QUALITY</div>
              <div className="text-xs font-mono font-bold text-amber-400 flex items-center justify-center gap-1">
                <Award className="w-3 h-3" />
                {project.metrics.codeQuality}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Mission Control Terminal Case Study details */}
        <div className="w-full lg:w-[50%] flex flex-col justify-between space-y-6 text-left z-10">
          
          {/* Diagnostic Console Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3" style={{ borderColor: `${project.themeColor}20` }}>
              <span 
                className="text-[9px] font-mono font-black uppercase tracking-widest inline-flex items-center gap-1.5"
                style={{ color: project.accentColor || project.themeColor || "#22d3ee" }}
              >
                <Cpu className="w-3.5 h-3.5" />
                {getStationIdentity(project.id)}
              </span>

              <span className="text-[9px] font-mono text-gray-500 tracking-widest flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-pulse" />
                COORDS: {project.year} // 0{project.id === "rudra-ai" ? "1" : project.id === "meal-matrix" ? "2" : "3"}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight font-sans">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-3">
                <span 
                  className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: project.accentColor || project.themeColor || "#22d3ee" }}
                >
                  {project.category}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isWip ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-emerald-400 shadow-[0_0_8px_#34d399]"}`} />
                  {isWip ? "ACTIVE STAGE" : "STANDBY SYSTEM"}
                </span>
              </div>
            </div>
          </div>

          {/* Diagnostic tab selection buttons */}
          <div className="flex border-b border-white/5 font-mono text-[9px] tracking-widest text-gray-500 select-none">
            <button
              onClick={() => setActiveTab("diagnostics")}
              className={`pb-2.5 pr-4 border-b-2 transition-colors duration-200 ${
                activeTab === "diagnostics" 
                  ? "text-white border-white font-bold" 
                  : "border-transparent hover:text-gray-300"
              }`}
            >
              MISSION LOGS
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`pb-2.5 px-4 border-b-2 transition-colors duration-200 ${
                activeTab === "architecture" 
                  ? "text-white border-white font-bold" 
                  : "border-transparent hover:text-gray-300"
              }`}
            >
              ARCHITECTURE
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`pb-2.5 px-4 border-b-2 transition-colors duration-200 ${
                activeTab === "timeline" 
                  ? "text-white border-white font-bold" 
                  : "border-transparent hover:text-gray-300"
              }`}
            >
              PIPELINE TIMELINE
            </button>
          </div>

          {/* Active Tab Panel contents */}
          <div className="flex-1 min-h-[180px] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {activeTab === "diagnostics" && (
                <motion.div
                  key="diagnostics-panel"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-1">
                      <div className="text-[8px] font-mono text-gray-500 tracking-wider">THE PROBLEM</div>
                      <p className="text-slate-300 font-sans leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-1">
                      <div className="text-[8px] font-mono text-cyan-400 tracking-wider">THE SOLUTION</div>
                      <p className="text-slate-300 font-sans leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-mono">
                      <span className="text-red-400">CHALLENGES OVERCOME</span>
                      <span className="text-emerald-400">OUTCOME METRIC</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p className="text-slate-400 font-sans leading-relaxed text-[11px]">{project.challenges}</p>
                      <p className="text-slate-300 font-sans leading-relaxed text-[11px] font-semibold border-l border-white/5 pl-4">{project.results}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "architecture" && (
                <motion.div
                  key="architecture-panel"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <div className="text-[8px] font-mono text-gray-500 tracking-wider">DATA FLOW PIPELINE</div>
                    <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] font-mono text-[9px]">
                      {project.architecture.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <div className="px-2.5 py-1.5 rounded border border-white/10 bg-white/5 text-white font-bold">
                            {step}
                          </div>
                          {idx < project.architecture.length - 1 && (
                            <span style={{ color: project.themeColor }} className="font-extrabold px-1 text-xs">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-2 text-xs">
                    <div className="text-[8px] font-mono text-gray-500 tracking-wider">FUTURE OPERATIONS</div>
                    <ul className="space-y-1.5 font-sans text-slate-300">
                      {project.futureImprovements.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "timeline" && (
                <motion.div
                  key="timeline-panel"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {project.timeline.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-1.5">
                      <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">PHASE 0{idx + 1}</div>
                      <div className="text-[10px] font-mono font-bold text-white uppercase">{step.phase}</div>
                      <p className="text-[9px] text-slate-400 leading-tight font-sans">{step.detail}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Engineered With stack nodes */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">INTEGRATED MODULES</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack && project.techStack.map((t) => renderTechChip(t))}
            </div>
          </div>

          {/* Control Terminal triggers */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
            {isWip ? (
              <span className="flex-1 h-12 rounded-xl inline-flex items-center justify-center bg-white/5 border border-dashed border-white/10 text-gray-500 text-sm cursor-not-allowed select-none font-semibold font-mono tracking-wider">
                TRANSMISSION WIP
                <ShieldAlert className="w-4 h-4 ml-2" />
              </span>
            ) : (
              <Button
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                icon={ArrowUpRight}
                className="flex-1 h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 font-mono tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: project.themeColor,
                  color: "#000000",
                  borderColor: `${project.themeColor}30`,
                }}
              >
                DOCK TO PORTAL
              </Button>
            )}
            <Button
              href={project.github}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              icon={Github}
              className="flex-1 h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              MISSION LOGS
            </Button>
          </div>

        </div>

      </div>
    </>
  );
}
