import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, FileText, Download } from "lucide-react";
import SectionContainer from "../components/ui/SectionContainer";
import Heading from "../components/ui/Heading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import resumePdf from "../../assets/Krishna_Pandey_Resume.pdf";

export default function Contact() {
  const contactCards = [
    {
      title: "Email",
      value: "krishnapandey1866@gmail.com",
      icon: Mail,
      link: "mailto:krishnapandey1866@gmail.com",
      isExternal: false,
      delay: 0,
    },
    {
      title: "LinkedIn",
      value: "Krishna Pandey",
      icon: Linkedin,
      link: "https://www.linkedin.com/in/krishnna-pandey",
      isExternal: true,
      delay: 0.2,
    },
    {
      title: "GitHub",
      value: "@Krish480",
      icon: Github,
      link: "https://github.com/Krish480",
      isExternal: true,
      delay: 0.4,
    },
    {
      title: "Location",
      value: "Bhopal, India",
      icon: MapPin,
      link: "https://maps.google.com/?q=Bhopal,+India",
      isExternal: true,
      delay: 0.6,
    },
    {
      title: "Resume",
      value: "Krishna_Pandey_Resume.pdf",
      icon: FileText,
      link: resumePdf,
      isExternal: false,
      download: "Krishna_Pandey_Resume.pdf",
      delay: 0.8,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <SectionContainer id="contact" showGlow={true} glowClassName="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[800px] w-full space-y-[24px] md:space-y-[32px] mx-auto text-center"
      >
        <motion.div variants={itemVariants}>
          <Heading
            label="GET IN TOUCH"
            title="Let's Build Something Amazing Together"
            subtitle="I enjoy building modern, scalable, and user-focused web applications. I'm always open to exciting opportunities and meaningful collaborations."
            align="center"
          />
        </motion.div>

        {/* Primary and Secondary CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto justify-center pt-1"
        >
          <Button
            href="mailto:krishnapandey1866@gmail.com"
            variant="primary"
            icon={Mail}
            className="flex-1"
          >
            Email Me
          </Button>
          
          <Button
            href={resumePdf}
            download="Krishna_Pandey_Resume.pdf"
            variant="secondary"
            icon={Download}
            className="flex-1"
          >
            Download Resume
          </Button>

          <a
            href="https://www.linkedin.com/in/krishnna-pandey"
            target="_blank"
            rel="noreferrer"
            className="px-8 h-[48px] inline-flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold rounded-full hover:bg-cyan-500/20 active:scale-[0.98] transition-all duration-300 text-sm cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] flex-1"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            View LinkedIn
          </a>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 lg:gap-4 w-full pt-2"
        >
          {contactCards.map((card) => (
            <Card
              key={card.title}
              href={card.link}
              target={card.isExternal ? "_blank" : "_self"}
              rel="noreferrer"
              download={card.download}
              padding="p-6"
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] group flex !flex-row items-start gap-4 text-left"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300 shrink-0">
                <card.icon className="w-5 h-5 float-icon" style={{ animationDelay: `${card.delay}s` }} />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-white truncate">
                  {card.value}
                </p>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 pt-3"
        >
          <a
            href="mailto:krishnapandey1866@gmail.com"
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
            aria-label="Gmail"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/krishnna-pandey"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-[#22d3ee] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] cursor-pointer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Krish480"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-[#7c3aed] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] cursor-pointer"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </motion.div>

      </motion.div>
    </SectionContainer>
  );
}
