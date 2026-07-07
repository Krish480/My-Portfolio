import React from "react";
import { motion } from "framer-motion";

export default function Heading({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";
  const mxClass = align === "left" ? "mr-auto" : "mx-auto";

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12
          }
        }
      }}
      className={`flex flex-col space-y-[14px] max-w-2xl ${alignClass} ${className}`}
    >
      {label && (
        <motion.span 
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }}
          className="text-xs font-semibold text-gray-500 uppercase tracking-widest block"
        >
          {label}
        </motion.span>
      )}
      {title && (
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
        >
          {title}
        </motion.h2>
      )}
      <motion.div 
        variants={{
          hidden: { width: 0, opacity: 0 },
          visible: { width: 64, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
        }}
        className={`h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full ${mxClass}`}
      />
      {subtitle && (
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
