import React from "react";
import { motion } from "framer-motion";

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
    },
  },
};

export default function MotionWrapper({
  children,
  type = "item",
  className = "",
  variants,
  viewportMargin = "-100px",
  ...props
}) {
  const chosenVariants = variants || (type === "container" ? containerVariants : itemVariants);

  if (type === "container") {
    return (
      <motion.div
        variants={chosenVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: viewportMargin }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={chosenVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
