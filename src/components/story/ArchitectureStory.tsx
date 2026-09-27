"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { developerData } from "@/data/developer";
import { StoryProgress } from "./StoryProgress";

export function ArchitectureStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const layers = developerData.featuredProjects[0].architecture;

  const layerDetails = [
    {
      title: "Frontend",
      role: "Client Interface",
      detail: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      title: "Backend",
      role: "Application Logic",
      detail: "Node.js REST Services",
    },
    {
      title: "PostgreSQL",
      role: "Relational Storage",
      detail: "Planning Schema & Transactions",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed scroll progress for quiet luxury motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.45,
  });

  const progressValue = shouldReduceMotion ? scrollYProgress : smoothProgress;

  const op0 = useTransform(progressValue, [0, 0.18], [0.4, 1]);
  const scale0 = useTransform(progressValue, [0, 0.18], [0.995, 1]);
  const y0 = useTransform(progressValue, [0, 0.18], [14, 0]);

  const op1 = useTransform(progressValue, [0.22, 0.48], [0.35, 1]);
  const scale1 = useTransform(progressValue, [0.22, 0.48], [0.995, 1]);
  const y1 = useTransform(progressValue, [0.22, 0.48], [14, 0]);

  const op2 = useTransform(progressValue, [0.52, 0.78], [0.35, 1]);
  const scale2 = useTransform(progressValue, [0.52, 0.78], [0.995, 1]);
  const y2 = useTransform(progressValue, [0.52, 0.78], [14, 0]);

  const layerTransforms = [
    { opacity: op0, scale: scale0, y: y0 },
    { opacity: op1, scale: scale1, y: y1 },
    { opacity: op2, scale: scale2, y: y2 },
  ];

  // Semantic active step uses raw scroll progress for immediate response
  const progressStep = useTransform(scrollYProgress, [0, 0.38, 0.7], [0, 1, 2]);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(
    () => progressStep.on("change", (latest) => setActiveStep(Math.min(2, Math.max(0, Math.round(latest))))),
    [progressStep],
  );

  const diagram = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
      {layerDetails.map((layer, index) => (
        <motion.div
          key={layer.title}
          style={shouldReduceMotion ? undefined : layerTransforms[index]}
          className="flex flex-col justify-between border-t border-border pt-4 pb-2"
        >
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[11px] font-mono tracking-widest text-muted uppercase font-medium">
                TIER 0{index + 1}
              </span>
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                {layer.role}
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-sans font-medium text-foreground tracking-tight mb-2">
              {layer.title}
            </h4>
          </div>
          <div className="pt-4 border-t border-border/40 mt-4">
            <span className="text-xs font-mono text-muted block leading-relaxed">
              {layer.detail}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <section
        id="architecture"
        aria-label="Planning System architecture"
        className="w-full py-20 px-4 max-w-5xl mx-auto space-y-10 transition-colors border-b border-border bg-transparent text-foreground"
      >
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="text-muted font-mono text-xs">04</span>
            <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">ARCHITECTURE</span>
          </div>
          <span className="text-xs font-mono text-muted uppercase">VERIFIED SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl font-mono font-bold text-foreground">Planning System Architecture</h2>
        {diagram}
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="architecture"
      aria-label="Progressive Planning System architecture"
      className="relative h-[180vh] md:h-[200vh] w-full border-b border-border transition-colors bg-transparent text-foreground"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-between h-[80vh] py-8 overflow-visible">
          {/* Editorial Section Header */}
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-muted font-mono text-xs">04</span>
              <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">
                ARCHITECTURE
              </span>
            </div>
            <StoryProgress current={activeStep} total={layers.length} label="Layer" />
          </div>

          {/* Presentation Slide Content */}
          <div className="my-auto overflow-visible w-full max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-2 font-medium">
                Verified 3-Tier Architecture
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light text-foreground tracking-tight mb-3">
                {layers.join(" → ")}
              </h3>
              <p className="text-sm md:text-base text-muted font-sans max-w-2xl leading-relaxed">
                Scroll to progressively illuminate each verified layer of the Planning System.
              </p>
            </div>
            {diagram}
          </div>

          {/* Editorial Ledger Footer */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted/70 pt-4 border-t border-border">
            <span>Progressive illumination of confirmed architecture</span>
            <span className="tabular-nums">0{activeStep + 1} OF 0{layers.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
