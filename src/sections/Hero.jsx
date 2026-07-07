import React from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, FileText } from "lucide-react";
import SectionContainer from "../components/ui/SectionContainer";
import Button from "../components/ui/Button";
import profilePhoto from "../../images/Profile photo.png";
import resumePdf from "../../assets/Krishna_Pandey_Resume.pdf";

export default function Hero() {
  return (
    <SectionContainer
      id="home"
      // Extra top padding to clear the floating navbar
      className="!pt-[120px] md:!pt-[145px] lg:!pt-[165px]"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-[18px] md:space-y-[25px] lg:space-y-[28px]">
        
        {/* Profile Image Identity & Subtle Cosmic Orbit */}
        <div className="relative flex items-center justify-center w-[140px] h-[140px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px]">
          {/* Subtle cosmic particle aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7c3aed]/10 to-[#22d3ee]/5 blur-2xl scale-110 pointer-events-none"></div>
          
          {/* Extremely light rotating energy rings */}
          <div 
            className="absolute inset-0 rounded-full border border-dashed border-[#22d3ee]/10 animate-spin" 
            style={{ animationDuration: "35s" }}
          ></div>
          <div 
            className="absolute -inset-2 rounded-full border border-double border-[#7c3aed]/5 animate-spin" 
            style={{ animationDuration: "45s", animationDirection: "reverse" }}
          ></div>
          
          {/* Natural floating profile core */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-shadow duration-500 animate-orbit-core">
            <img
              src={profilePhoto}
              alt="Krishna Pandey"
              className="w-full h-full object-cover scale-[1.03]"
            />
          </div>
        </div>

        {/* Cinematic Typographic Headline */}
        <h1 
          className="font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
          style={{ fontSize: "clamp(38px, 6.2vw, 84px)" }}
        >
          Full Stack Developer <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            Building Modern Web Experiences
          </span>
        </h1>

        {/* Subtitle - One Clean Sentence */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-[650px] mx-auto font-medium leading-relaxed">
          MCA Graduate specializing in React, Next.js, and high-performance interactive web products.
        </p>

        {/* CTA Buttons - Height and Radius Standardized */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] w-full max-w-xs sm:max-w-none pt-[8px]">
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

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-[16px] pt-[8px]">
          <a
            href="https://github.com/Krish480"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/krishnna-pandey"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:krishnapandey1866@gmail.com"
            className="text-gray-500 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            aria-label="Resume"
          >
            <FileText className="w-5 h-5" />
          </a>
        </div>

      </div>
    </SectionContainer>
  );
}
