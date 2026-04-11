"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type SlideInProps = {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
  duration?: number;
};

const OFFSET = 48;

export function SlideIn({
  children,
  className,
  from = "left",
  delay = 0,
  duration = 0.7,
}: SlideInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: from === "left" ? -OFFSET : OFFSET,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
