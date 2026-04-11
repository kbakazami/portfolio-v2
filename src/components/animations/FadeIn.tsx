"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
};

const OFFSET = 24;

function getOffset(direction: Direction) {
  switch (direction) {
    case "up":
      return { x: 0, y: OFFSET };
    case "down":
      return { x: 0, y: -OFFSET };
    case "left":
      return { x: OFFSET, y: 0 };
    case "right":
      return { x: -OFFSET, y: 0 };
  }
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getOffset(direction);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
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
