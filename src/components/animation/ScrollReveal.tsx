"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  amount?: number | "some" | "all";
  as?: "div" | "section" | "article" | "aside";
  id?: string;
  "aria-label"?: string;
}

/**
 * ScrollReveal
 * Single-trigger viewport entrance animation using Motion whileInView.
 * Once triggered, animation freezes in the visible state without continuous scroll recalculation.
 * Full compliance with prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 20,
  amount = 0.15,
  as = "div",
  id,
  "aria-label": ariaLabel,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render immediately visible with no transforms
  if (shouldReduceMotion) {
    const Component = as;
    return (
      <Component id={id} aria-label={ariaLabel} className={className}>
        {children}
      </Component>
    );
  }

  const MotionComponent = as === "section"
    ? motion.section
    : as === "article"
    ? motion.article
    : as === "aside"
    ? motion.aside
    : motion.div;

  return (
    <MotionComponent
      id={id}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
