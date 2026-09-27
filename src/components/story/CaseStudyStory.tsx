"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { developerData } from "@/data/developer";
import { StoryProgress } from "./StoryProgress";

export function CaseStudyStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const project = developerData.featuredProjects[0];

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

  const milestones = [
    {
      step: "01",
      phase: "PREVIOUS WORKFLOW",
      title: "Excel Formulas & Macros",
      tag: "CONFIRMED CONTEXT",
      summary: "The production planning workflow previously relied heavily on Excel formulas and macros.",
      points: ["Excel formulas", "Excel macros", "Production planning workflow"],
    },
    {
      step: "02",
      phase: "PROJECT DIRECTION",
      title: project.name,
      tag: "WEB APPLICATION",
      summary: project.summary,
      points: [project.domain, "Developed to improve the existing planning workflow"],
    },
    {
      step: "03",
      phase: "CONFIRMED MODULES",
      title: "WIP & OUTPUT, PRODUCTIVITY, CAPACITY",
      tag: "PROJECT SCOPE",
      summary: "The verified project information currently identifies three modules.",
      points: project.modules,
    },
    {
      step: "04",
      phase: "VERIFIED ARCHITECTURE",
      title: project.architecture.join(" → "),
      tag: "SYSTEM LAYERS",
      summary: "Only the architecture layers supported by the verified project data are shown.",
      points: project.technologies,
    },
  ];

  // Quiet presentation transforms with 14% crossfade overlap
  const op0 = useTransform(progressValue, [0, 0.16, 0.23, 0.30], [1, 1, 0.4, 0]);
  const y0 = useTransform(progressValue, [0, 0.16, 0.23, 0.30], [0, 0, -12, -24]);
  const s0 = useTransform(progressValue, [0, 0.16, 0.23, 0.30], [1, 1, 0.995, 0.99]);

  const op1 = useTransform(progressValue, [0.16, 0.23, 0.30, 0.42, 0.49, 0.56], [0, 0.4, 1, 1, 0.4, 0]);
  const y1 = useTransform(progressValue, [0.16, 0.23, 0.30, 0.42, 0.49, 0.56], [24, 12, 0, 0, -12, -24]);
  const s1 = useTransform(progressValue, [0.16, 0.23, 0.30, 0.42, 0.49, 0.56], [0.99, 0.995, 1, 1, 0.995, 0.99]);

  const op2 = useTransform(progressValue, [0.42, 0.49, 0.56, 0.68, 0.75, 0.82], [0, 0.4, 1, 1, 0.4, 0]);
  const y2 = useTransform(progressValue, [0.42, 0.49, 0.56, 0.68, 0.75, 0.82], [24, 12, 0, 0, -12, -24]);
  const s2 = useTransform(progressValue, [0.42, 0.49, 0.56, 0.68, 0.75, 0.82], [0.99, 0.995, 1, 1, 0.995, 0.99]);

  const op3 = useTransform(progressValue, [0.68, 0.75, 0.82, 1.0], [0, 0.4, 1, 1]);
  const y3 = useTransform(progressValue, [0.68, 0.75, 0.82, 1.0], [24, 12, 0, 0]);
  const s3 = useTransform(progressValue, [0.68, 0.75, 0.82, 1.0], [0.99, 0.995, 1, 1]);

  const stepTransforms = [
    { opacity: op0, y: y0, scale: s0 },
    { opacity: op1, y: y1, scale: s1 },
    { opacity: op2, y: y2, scale: s2 },
    { opacity: op3, y: y3, scale: s3 },
  ];

  // Semantic active step uses raw scroll progress for immediate updates
  const progressStep = useTransform(scrollYProgress, [0, 0.23, 0.49, 0.75], [0, 1, 2, 3]);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(
    () => progressStep.on("change", (latest) => setActiveStep(Math.min(3, Math.max(0, Math.round(latest))))),
    [progressStep],
  );

  const milestoneItem = (milestone: (typeof milestones)[number]) => (
    <div key={milestone.step} className="pt-6 border-t border-border">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] font-mono tracking-widest text-muted uppercase">
          {milestone.step} — {milestone.phase}
        </span>
        <span className="text-[11px] font-mono text-muted">{milestone.tag}</span>
      </div>
      <h3 className="text-2xl sm:text-3xl font-sans font-light text-foreground tracking-tight mb-2">
        {milestone.title}
      </h3>
      <p className="text-sm text-muted mb-4 max-w-2xl leading-relaxed">{milestone.summary}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-foreground border-t border-border/60 pt-3">
        {milestone.points.map((point) => (
          <span key={point} className="flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-xs" />
            <span>{point}</span>
          </span>
        ))}
      </div>
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <section
        id="case-study"
        aria-label="Planning System project story"
        className="w-full py-20 px-4 max-w-5xl mx-auto space-y-12 transition-colors border-b border-border bg-transparent text-foreground"
      >
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="text-muted font-mono text-xs">03.1</span>
            <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">CASE STUDY</span>
          </div>
          <span className="text-xs font-mono text-muted uppercase">PLANNING SYSTEM NARRATIVE</span>
        </div>
        <div className="space-y-10">
          {milestones.map(milestoneItem)}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="case-study"
      aria-label="Planning System project story"
      className="relative h-[250vh] md:h-[270vh] w-full border-b border-border transition-colors bg-transparent text-foreground"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-between h-[82vh] py-8 overflow-visible">
          {/* Editorial Header */}
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-muted font-mono text-xs">03.1</span>
              <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">
                CASE STUDY
              </span>
            </div>
            <StoryProgress current={activeStep} total={milestones.length} label="Milestone" />
          </div>

          {/* Presentation Slide Chamber */}
          <div className="relative flex-1 flex items-center justify-center my-6 overflow-visible">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.step}
                style={stepTransforms[index]}
                className="absolute inset-x-0 flex flex-col justify-center pointer-events-none select-none md:select-text overflow-visible"
              >
                <div className="w-full max-w-4xl mx-auto">
                  {/* Milestone Header */}
                  <div className="flex items-baseline justify-between mb-3 border-b border-border/60 pb-2">
                    <span className="text-xs font-mono tracking-widest text-muted uppercase font-medium">
                      MILESTONE {milestone.step} — {milestone.phase}
                    </span>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      {milestone.tag}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light text-foreground tracking-tight mb-4">
                    {milestone.title}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/90 font-sans max-w-2xl leading-relaxed mb-8">
                    {milestone.summary}
                  </p>

                  {/* Editorial Detail Ledger */}
                  <div className="border-t border-border pt-6 pointer-events-auto">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-4 font-medium">
                      Verified Milestone Scope
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                      {milestone.points.map((point) => (
                        <div key={point} className="flex items-center gap-2.5 font-mono text-xs text-foreground">
                          <span className="w-1 h-1 bg-accent rounded-xs shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Editorial Footer */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted/70 pt-4 border-t border-border">
            <span>Scroll to advance project milestone narrative</span>
            <span className="tabular-nums">0{activeStep + 1} OF 0{milestones.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
