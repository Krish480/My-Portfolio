import React, { useState, useEffect, useRef } from "react";
import { GraduationCap, Atom, Rocket, Brain, ArrowRight, Download, Cpu } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import SectionContainer from "../components/ui/SectionContainer";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import resumePdf from "../../assets/Krishna_Pandey_Resume.pdf";

export default function About() {
  const [activeTech, setActiveTech] = useState(null);

  const highlights = [
    {
      icon: GraduationCap,
      title: "MCA Graduate",
      desc: "Structured computational logic & algorithmic design patterns.",
    },
    {
      icon: Atom,
      title: "React & Next.js Specialist",
      desc: "High-performance SPA, SSR, and server component builds.",
    },
    {
      icon: Rocket,
      title: "Frontend + Full Stack Developer",
      desc: "End-to-end web products with seamless user flows.",
    },
    {
      icon: Brain,
      title: "Problem Solver",
      desc: "Optimized clean architectures and responsive layout interfaces.",
    },
  ];

  const miniStats = [
    { value: "1+ Years", label: "Dev Experience" },
    { value: "16+", label: "Tech Stack" },
    { value: "8+", label: "Completed Projects" },
  ];

  // Tech Orbit Stack (16 technologies)
  const ring1 = [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      exp: "9+ Months",
      desc: "Declarative UI engineering & component lifecycle architecture.",
      color: "#61dafb",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      exp: "1+ Years",
      desc: "ES6+, asynchronous event loop, and browser DOM APIs.",
      color: "#f7df1e",
    },
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      exp: "3+ Years",
      desc: "Semantic structural markup, SEO standards, and accessibility.",
      color: "#e34f26",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      exp: "3+ Years",
      desc: "Responsive layouts, Flexbox/Grid systems, and custom Keyframes.",
      color: "#1572b6",
    },
  ];

  const ring2 = [
    {
      name: "Next.js",
      logo: "https://cdn.svgporn.com/logos/nextjs-icon.svg",
      exp: "3+ Months",
      desc: "React Server Components, App Router routing, and hybrid rendering.",
      color: "#ffffff",
      extraClass: "invert brightness-200",
    },
    {
      name: "Redux",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      exp: "3+ Months",
      desc: "Predictable application state container modeling and middleware.",
      color: "#764abc",
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      exp: "1+ Years",
      desc: "Utility-first responsive styles and design systems.",
      color: "#38bdf8",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      exp: "6+ Months",
      desc: "Event-driven asynchronous backend systems and API engines.",
      color: "#339933",
    },
    {
      name: "Express.js",
      logo: "https://cdn.svgporn.com/logos/express.svg",
      exp: "6+ Months",
      desc: "RESTful HTTP server routing, request pipelines, and middlewares.",
      color: "#e5e7eb",
      extraClass: "invert brightness-200 opacity-90",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      exp: "1+ Years",
      desc: "Decentralized version control, branching models, and commit histories.",
      color: "#f05032",
    },
  ];

  const ring3 = [
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      exp: "3+ Months",
      desc: "NoSQL document collections, aggregation pipelines, and schemas.",
      color: "#47a248",
    },
    {
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      exp: "3+ Months",
      desc: "Relational queries, database indexing, and structured data tables.",
      color: "#4479a1",
    },
    {
      name: "Firebase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
      exp: "1+ Years",
      desc: "Serverless auth, firestore database, and static cloud hosting.",
      color: "#ffca28",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      exp: "1+ Years",
      desc: "System scripting, logic flow automation, and data parsing.",
      color: "#3776ab",
    },
    {
      name: "Flask",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      exp: "3+ Months",
      desc: "Micro web frameworks, routing controllers, and lightweight APIs.",
      color: "#f3f4f6",
      extraClass: "invert brightness-200",
    },
    {
      name: "GitHub",
      logo: "https://cdn.svgporn.com/logos/github-icon.svg",
      exp: "1+ Years",
      desc: "Remote collaboration repositories, CI/CD actions, and project hooks.",
      color: "#f3f4f6",
      extraClass: "invert brightness-200",
    },
  ];

  const skillsRef = useRef(null);

  // Framer Motion rotation values for 60fps orbit animation
  const rotation1 = useMotionValue(0);
  const rotation2 = useMotionValue(0);
  const rotation3 = useMotionValue(0);

  // Base speeds in degrees per second
  const baseSpeed1 = 4.5;
  const baseSpeed2 = -3.0;
  const baseSpeed3 = 1.8;

  useAnimationFrame((time, delta) => {
    const deltaSeconds = Math.min(delta / 1000, 0.1); // cap to prevent lag jumps
    const speedMultiplier = activeTech ? 0.15 : 1.0;

    const r1 = rotation1.get() + baseSpeed1 * deltaSeconds * speedMultiplier;
    const r2 = rotation2.get() + baseSpeed2 * deltaSeconds * speedMultiplier;
    const r3 = rotation3.get() + baseSpeed3 * deltaSeconds * speedMultiplier;

    rotation1.set(r1);
    rotation2.set(r2);
    rotation3.set(r3);

    if (activeTech && skillsRef.current) {
      let ringIdx = -1;
      let itemIdx = -1;
      let totalItems = 0;
      let radiusPercent = 0;
      let currentRotation = 0;

      const findInRing = (ring, rIdx, radPercent, rotVal) => {
        const idx = ring.findIndex((item) => item.name === activeTech.name);
        if (idx !== -1) {
          ringIdx = rIdx;
          itemIdx = idx;
          totalItems = ring.length;
          radiusPercent = radPercent;
          currentRotation = rotVal;
          return true;
        }
        return false;
      };

      if (!findInRing(ring1, 1, 22, r1)) {
        if (!findInRing(ring2, 2, 35.5, r2)) {
          findInRing(ring3, 3, 49, r3);
        }
      }

      if (ringIdx !== -1) {
        const angle = (itemIdx * 360) / totalItems;
        const totalAngle = angle + currentRotation;
        const angleRad = (totalAngle * Math.PI) / 180;

        const xPercent = Math.cos(angleRad) * radiusPercent;
        const yPercent = Math.sin(angleRad) * radiusPercent;

        skillsRef.current.style.setProperty("--active-x", `${xPercent}%`);
        skillsRef.current.style.setProperty("--active-y", `${yPercent}%`);
      }
    }
  });

  const counterRotation1 = useTransform(rotation1, (r) => -r);
  const counterRotation2 = useTransform(rotation2, (r) => -r);
  const counterRotation3 = useTransform(rotation3, (r) => -r);

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveTech(null);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveTech(null);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleIconClick = (e, item) => {
    e.stopPropagation();
    if (activeTech?.name === item.name) {
      setActiveTech(null);
    } else {
      setActiveTech(item);
    }
  };

  const handleMouseEnter = (item) => {
    if (typeof window !== "undefined" && !("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      setActiveTech(item);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && !("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      setActiveTech(null);
    }
  };

  const renderRing = (items, radiusPercent, rotationValue, counterRotationValue) => {
    return (
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/5 flex items-center justify-center pointer-events-none"
        style={{
          width: `${radiusPercent * 2}%`,
          height: `${radiusPercent * 2}%`,
          rotate: rotationValue,
        }}
      >
        {items.map((item, index) => {
          const angle = (index * 360) / items.length;
          const angleRad = (angle * Math.PI) / 180;
          const isActive = activeTech?.name === item.name;

          return (
            <motion.button
              key={item.name}
              className={`absolute rounded-full bg-black/90 border flex items-center justify-center cursor-pointer pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 ${
                isActive ? "border-white/40 shadow-2xl z-50" : "border-white/10 hover:border-white/30 z-0"
              }`}
              style={{
                left: `calc(50% + ${Math.cos(angleRad) * 50}% - var(--icon-size) / 2)`,
                top: `calc(50% + ${Math.sin(angleRad) * 50}% - var(--icon-size) / 2)`,
                width: "var(--icon-size)",
                height: "var(--icon-size)",
              }}
              onClick={(e) => handleIconClick(e, item)}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              aria-label={`View details for ${item.name}`}
              aria-expanded={isActive}
              animate={{
                scale: isActive ? 1.3 : 1,
                borderColor: isActive ? item.color : "rgba(255,255,255,0.1)",
                boxShadow: isActive
                  ? `0 0 25px ${item.color}cc, inset 0 0 8px ${item.color}40`
                  : "0 4px 10px rgba(0,0,0,0.4)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Counter-rotated logo wrapper to guarantee logo is perfectly upright at all times */}
              <motion.div
                className="w-[50%] h-[50%] flex items-center justify-center pointer-events-none"
                style={{
                  rotate: counterRotationValue,
                }}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className={`w-full h-full object-contain ${item.extraClass || ""}`}
                  loading="lazy"
                />
              </motion.div>

              {isActive && (
                <>
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-white/20 pointer-events-none animate-pulse-slow"
                    style={{ borderColor: `${item.color}40` }}
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -inset-1 rounded-full pointer-events-none"
                    style={{
                      boxShadow: `0 0 15px ${item.color}40`,
                    }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    );
  };

  return (
    <SectionContainer id="about" showGlow={true} glowClassName="top-1/4 left-1/4">
      {/* Scoped CSS Custom Properties for Responsive Sizing */}
      <style>{`
        #skills {
          --icon-size: 38px;
          --core-size: 72px;
        }
        @media (min-width: 430px) {
          #skills {
            --icon-size: 42px;
            --core-size: 80px;
          }
        }
        @media (min-width: 768px) {
          #skills {
            --icon-size: 44px;
            --core-size: 88px;
          }
        }
        @media (min-width: 1024px) {
          #skills {
            --icon-size: 46px;
            --core-size: 96px;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.04); }
        }
        .float-icon {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col lg:flex-row gap-[64px] lg:gap-[80px] items-center">
        
        {/* LEFT SIDE (45% on Desktop) */}
        <div className="w-full lg:w-[45%] space-y-[28px] md:space-y-[36px] text-center lg:text-left flex flex-col justify-center animate-fade-in-left">
          
          <Heading
            label="ABOUT"
            title={
              <>
                Building digital experiences<br className="hidden lg:inline" />
                with clean code and<br className="hidden lg:inline" />
                beautiful interfaces.
              </>
            }
            align="left"
            className="lg:items-start text-center lg:text-left"
          />

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-[550px] mx-auto lg:mx-0">
            I am an MCA graduate specializing in full-stack frontend development. By merging computational logic with creative web design, I build performant interfaces that operate flawlessly across platforms, prioritizing clean components and optimized render speeds.
          </p>

          {/* Premium Glass Highlights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  padding="p-4"
                  className="flex items-start gap-4 group cursor-default text-left"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2 pb-2">
            {miniStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
                <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-[16px] pt-4">
            <Button
              href="#projects"
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              View Projects
            </Button>
            
            <Button
              href={resumePdf}
              download="Krishna_Pandey_Resume.pdf"
              variant="secondary"
              icon={Download}
              className="w-full sm:w-auto"
            >
              Download Resume
            </Button>
          </div>

        </div>

        {/* RIGHT SIDE (55% on Desktop - Tech Orbit) */}
        <div id="skills" ref={skillsRef} className="w-full lg:w-[55%] flex flex-col items-center justify-center select-none pt-8 lg:pt-0">
          
          <div className="relative w-full aspect-square max-w-[320px] xs:max-w-[370px] sm:max-w-[420px] md:max-w-[460px] mx-auto flex items-center justify-center">
            
            {/* Central Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center">
              <div
                className="w-[var(--core-size)] h-[var(--core-size)] rounded-full flex items-center justify-center border border-white/5 transition-all duration-500 relative z-50"
                style={{
                  background: activeTech
                    ? `radial-gradient(circle, ${activeTech.color}25 0%, rgba(0,0,0,0.95) 75%)`
                    : "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(34,211,238,0.15) 50%, rgba(0,0,0,0.95) 100%)",
                  boxShadow: activeTech
                    ? `0 0 45px ${activeTech.color}45, inset 0 0 20px ${activeTech.color}25`
                    : "0 0 40px rgba(34,211,238,0.25), inset 0 0 15px rgba(124,58,237,0.2)",
                  borderColor: activeTech ? activeTech.color : "rgba(255,255,255,0.1)",
                }}
              >
                <div className="w-[84%] h-[84%] rounded-full bg-black/95 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeTech ? (
                      <motion.div
                        key={activeTech.name}
                        initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <img
                          src={activeTech.logo}
                          alt={activeTech.name}
                          className={`w-[32%] h-[32%] object-contain ${activeTech.extraClass || ""}`}
                        />
                        <span className="text-[9px] font-extrabold z-50 tracking-wider uppercase mt-1.5" style={{ color: activeTech.color }}>
                          {activeTech.name}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-core"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <span className="text-white font-black text-[9px] tracking-wider leading-none mt-1">CORE</span>
                        <span className="text-[6.5px] text-[#22d3ee] font-bold uppercase tracking-widest mt-0.5">ACTIVE</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Inner Ring (Radius: 22%) */}
            {renderRing(ring1, 22, rotation1, counterRotation1)}

            {/* Middle Ring (Radius: 35.5%) */}
            {renderRing(ring2, 35.5, rotation2, counterRotation2)}

            {/* Outer Ring (Radius: 49%) */}
            {renderRing(ring3, 49, rotation3, counterRotation3)}

            {/* Non-rotating Tooltip Layer */}
            <div className="absolute inset-0 pointer-events-none z-[999] overflow-visible">
              <AnimatePresence>
                {activeTech && (
                  <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{
                      left: "calc(50% + var(--active-x, 0%))",
                      top: "calc(50% + var(--active-y, 0%))",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute bottom-[calc(var(--icon-size)/2+12px)] left-1/2 -translate-x-1/2 mb-1 w-52 p-4 bg-black/95 border border-white/10 backdrop-blur-xl rounded-xl text-center shadow-[0_12px_30px_rgba(0,0,0,0.7)] z-[999]"
                      style={{
                        borderColor: `${activeTech.color}30`,
                      }}
                    >
                      <div className="text-white font-bold text-xs tracking-wide">{activeTech.name}</div>
                      <div className="text-[10px] font-semibold mt-0.5" style={{ color: activeTech.color }}>
                        {activeTech.exp}
                      </div>
                      <div className="text-gray-300 text-[9px] mt-2 leading-relaxed font-medium">
                        {activeTech.desc}
                      </div>
                      <div 
                        className="absolute top-[100%] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black/95 border-r border-b rotate-45 -translate-y-1.5"
                        style={{ 
                          borderColor: `transparent ${activeTech.color}20 ${activeTech.color}20 transparent`
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </SectionContainer>
  );
}
