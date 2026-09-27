"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { developerData } from "@/data/developer";
import { StoryProgress } from "./StoryProgress";

export function TechStackStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const categories = developerData.technologyGroups;

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

  // Quiet editorial vertical crossfade with 18% overlap
  const op0 = useTransform(progressValue, [0, 0.36, 0.48, 0.60], [1, 1, 0.4, 0]);
  const y0 = useTransform(progressValue, [0, 0.36, 0.48, 0.60], [0, 0, -12, -24]);
  const s0 = useTransform(progressValue, [0, 0.36, 0.48, 0.60], [1, 1, 0.995, 0.99]);

  const op1 = useTransform(progressValue, [0.40, 0.52, 0.64, 1.0], [0, 0.4, 1, 1]);
  const y1 = useTransform(progressValue, [0.40, 0.52, 0.64, 1.0], [24, 12, 0, 0]);
  const s1 = useTransform(progressValue, [0.40, 0.52, 0.64, 1.0], [0.99, 0.995, 1, 1]);

  const categoryTransforms = [
    { opacity: op0, y: y0, scale: s0 },
    { opacity: op1, y: y1, scale: s1 },
  ];

  // Semantic active step uses raw scroll progress for immediate response
  const progressStep = useTransform(scrollYProgress, [0, 0.49], [0, 1]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => progressStep.on("change", (latest) => setActiveStep(Math.round(latest))), [progressStep]);

  const categoryItem = (category: (typeof categories)[number], index: number) => (
    <div key={category.id} className="pt-6 border-t border-border">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] font-mono tracking-widest text-muted uppercase">
          0{index + 1} — {category.id === "portfolio" ? "PORTFOLIO STACK" : "PERSONAL PROFILE"}
        </span>
        <span className="text-[11px] font-mono text-muted">VERIFIED</span>
      </div>
      <h3 className="text-2xl sm:text-3xl font-sans font-light text-foreground tracking-tight mb-2">
        {category.label}
      </h3>
      <p className="text-sm text-muted mb-6 max-w-2xl leading-relaxed">{category.summary}</p>
      {category.technologies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 border-t border-border/60 pt-4">
          {category.technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col py-1">
              <span className="text-sm font-mono font-bold text-foreground">{tech.name}</span>
              <span className="text-xs text-muted font-sans mt-0.5">{tech.detail}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-dashed border-border/80 pt-4 text-xs font-mono text-muted">
          No unverified technologies are shown as personal skills.
        </div>
      )}
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <section
        id="skills"
        aria-label="Technology overview"
        className="w-full py-20 px-4 max-w-5xl mx-auto space-y-12 transition-colors border-b border-border bg-transparent text-foreground"
      >
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="text-muted font-mono text-xs">02</span>
            <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">STACK</span>
          </div>
          <span className="text-xs font-mono text-muted uppercase">VERIFIED TECHNICAL INVENTORY</span>
        </div>
        <div className="space-y-10">
          {categories.map(categoryItem)}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="skills"
      aria-label="Portfolio technology and personal skill distinction"
      className="relative h-[190vh] md:h-[210vh] w-full border-b border-border transition-colors bg-transparent text-foreground"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-between h-[80vh] py-8 overflow-visible">
          {/* Editorial Section Header */}
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-muted font-mono text-xs">02</span>
              <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">
                STACK
              </span>
            </div>
            <StoryProgress current={activeStep} total={categories.length} label="Category" />
          </div>

          {/* Presentation Slide Chamber */}
          <div className="relative flex-1 flex items-center justify-center my-6 overflow-visible">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                style={categoryTransforms[index]}
                className="absolute inset-x-0 flex flex-col justify-center pointer-events-none select-none md:select-text overflow-visible"
              >
                <div className="w-full max-w-4xl mx-auto">
                  {/* Category Metadata Header */}
                  <div className="flex items-baseline justify-between mb-3 border-b border-border/60 pb-2">
                    <span className="text-xs font-mono tracking-widest text-muted uppercase font-medium">
                      0{index + 1} — {category.id === "portfolio" ? "PORTFOLIO STACK" : "PERSONAL PROFILE"}
                    </span>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      VERIFIED DATA
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light text-foreground tracking-tight mb-3">
                    {category.label}
                  </h3>
                  <p className="text-sm md:text-base text-muted font-sans max-w-2xl leading-relaxed mb-8">
                    {category.summary}
                  </p>

                  {/* Editorial Grid */}
                  {category.technologies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 border-t border-border pt-6 pointer-events-auto">
                      {category.technologies.map((tech) => (
                        <div key={tech.name} className="flex flex-col border-b border-border/40 pb-3">
                          <span className="text-sm font-mono font-bold text-foreground">{tech.name}</span>
                          <span className="text-xs text-muted font-sans mt-1 leading-relaxed">{tech.detail}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-t border-dashed border-border/80 pt-6 text-sm font-mono text-muted">
                      No unverified technologies are shown as personal skills. Only verified repository technologies are documented.
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Editorial Ledger Footer */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted/70 pt-4 border-t border-border">
            <span>Scroll to inspect technology scope</span>
            <span className="tabular-nums">0{activeStep + 1} OF 0{categories.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
