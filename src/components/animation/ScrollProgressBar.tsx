"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export interface ScrollProgressBarProps {
  className?: string;
  useSpringDamping?: boolean;
}

/**
 * Hairline ScrollProgressBar
 * Hardware-accelerated scaleX progress indicator driven by Motion's useScroll.
 * Zero React state updates during scrolling.
 */
export function ScrollProgressBar({
  className = "",
  useSpringDamping = true,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX: useSpringDamping ? scaleX : scrollYProgress }}
        className="h-full w-full bg-gradient-to-r from-accent via-accent-cyan to-accent origin-left"
      />
    </div>
  );
}
