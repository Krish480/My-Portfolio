import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Layers, Briefcase, FolderGit2, Download, ArrowRight } from "lucide-react";
import SectionContainer from "../components/ui/SectionContainer";
import Heading from "../components/ui/Heading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import resumePdf from "../../assets/Krishna_Pandey_Resume.pdf";

export default function Experience() {
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);

  const timelineItems = [
    {
      title: "MCA Graduate",
      subtitle: "Master of Computer Applications",
      icon: GraduationCap,
      description: "Completed Master of Computer Applications with a strong focus on software engineering, database design, and algorithmic problem solving.",
      tags: ["Software Engineering", "OOP Paradigms", "Data Structures"],
    },
    {
      title: "Frontend Development",
      subtitle: "Modern UI Engineering",
      icon: Code2,
      description: "Mastered modern frontend engineering, building accessible semantic interfaces, responsive layouts, and performant user flows.",
      tags: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Responsive Design"],
    },
    {
      title: "Full Stack Development",
      subtitle: "Backend & Server Architectures",
      icon: Layers,
      description: "Expanded capabilities to the backend, designing database schemas, integrating authentication, and building serverless and REST API architectures.",
      tags: ["Node.js", "Express.js", "MongoDB", "Firebase", "Flask", "REST APIs"],
    },
    {
      title: "Real Projects",
      subtitle: "Production-Ready Systems",
      icon: FolderGit2,
      description: "Engineered end-to-end applications solving real-world challenges, with a focus on real-time features, interactive 3D, and state persistence.",
      tags: ["Rudra AI", "MealMatrix", "MindArena", "3D Portfolio", "ShopMatrix"],
    },
    {
      title: "Professional Internship",
      subtitle: "Frontend Development Intern — Unified Mentor",
      icon: Briefcase,
      description: "Gained practical software engineering experience. Built reservation dashboards, integrated RESTful APIs, and optimized page viewport rendering speeds.",
      tags: ["React.js Integration", "API Collaboration", "Performance Tuning"],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = (isEven) => ({
    hidden: {
      opacity: 0,
      x: isEven ? -40 : 40,
      y: 20,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  });

  return (
    <SectionContainer id="experience" showGlow={true} glowClassName="bottom-1/4 right-1/4">
      <div className="space-y-[36px] md:space-y-[48px]">
        
        <Heading
          label="TIMELINE"
          title="Career Journey"
          subtitle="A timeline of learning, building, and continuously improving as a developer."
          align="center"
        />

        {/* Timeline Map Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto pl-8 lg:pl-0 space-y-[32px] md:space-y-[40px]"
        >
          {/* Animated Glowing Energy Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute top-2 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.3)] origin-top left-[15px] lg:left-1/2 lg:-translate-x-1/2 -z-10"
          />

          {timelineItems.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = item.icon;
            const isHovered = hoveredCardIdx === idx;

            return (
              <div
                key={idx}
                className="relative flex flex-col lg:flex-row items-center w-full min-h-[140px]"
              >
                {/* Glowing Core Timeline Nodes */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: idx * 0.15 + 0.2, duration: 0.4 }}
                  className={`absolute z-10 w-4 h-4 rounded-full bg-black border-[3px] transition-all duration-300 left-[15px] -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 top-7 ${
                    isHovered
                      ? "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.9)] scale-125"
                      : "border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                  }`}
                />

                {/* Left/Right Container Block */}
                <motion.div
                  variants={cardVariants(isEven)}
                  className={`w-full lg:w-1/2 ${
                    isEven ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"
                  }`}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                >
                  <Card
                    padding="p-6"
                    className="cursor-default relative"
                    style={{
                      borderColor: isHovered ? "rgba(34,211,238,0.2)" : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-400 transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-semibold mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Technologies / Tags */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-gray-400 font-semibold select-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Section at the end of the timeline */}
        <div className="flex flex-col items-center justify-center pt-[36px] text-center space-y-4 max-w-md mx-auto z-10 relative">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to start a project?</h3>
            <p className="text-gray-400 text-sm">Let's collaborate to build fast, beautiful, and accessible web experiences.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              href={resumePdf}
              download="Krishna_Pandey_Resume.pdf"
              variant="primary"
              icon={Download}
            >
              Download Resume
            </Button>
            
            <Button href="#contact" variant="secondary">
              Let's Work Together
              <ArrowRight className="w-4 h-4 ml-2 text-gray-400" />
            </Button>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
