"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export interface NodeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
  step?: string;
}

/**
 * NodeReveal
 * Architectural animation primitive for system nodes, diagram tiers, and pipeline blocks.
 * Designed to provide progressive disclosure for technical architecture diagrams.
 */
export function NodeReveal({
  children,
  className = "",
  delay = 0,
  index = 0,
}: NodeRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const effectiveDelay = delay || index * 0.07;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: effectiveDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
