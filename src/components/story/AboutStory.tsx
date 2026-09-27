"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { developerData } from "@/data/developer";
import { StoryProgress } from "./StoryProgress";

export function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed scroll progress for physical luxury motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.45,
  });

  const progressValue = shouldReduceMotion ? scrollYProgress : smoothProgress;

  const beats = [
    {
      id: "identity",
      number: "01",
      tag: "IDENTITY",
      headline: developerData.statement,
      subheadline: `${developerData.role} — ${developerData.nickname}`,
      body: "Focused on end-to-end full-stack systems, architectural clarity, and precise, reliable software engineering.",
    },
    {
      id: "foundation",
      number: "02",
      tag: "ACADEMICS",
      headline: developerData.education,
      subheadline: "Degree Track",
      body: "Grounded in computer science fundamentals, full-stack software architecture, and modern application development.",
    },
    {
      id: "mindset",
      number: "03",
      tag: "DISCIPLINE",
      headline: "Eliminating Fragility Through Structure",
      subheadline: "Engineering Mindset",
      body: developerData.substatement,
    },
    {
      id: "flagship",
      number: "04",
      tag: "FOCUS",
      headline: developerData.featuredProjects[0]?.name ?? "Planning System",
      subheadline: developerData.featuredProjects[0]?.domain ?? "Production planning web application",
      body: developerData.featuredProjects[0]?.summary ?? "",
    },
  ];

  // Quiet, presentation-grade transforms with 14% crossfade overlap
  // Beat 0: Active 0-0.16 -> Exit 0.16-0.30
  const op0 = useTransform(progressValue, [0, 0.16, 0.23, 0.30], [1, 1, 0.4, 0]);
  const y0 = useTransform(progressValue, [0, 0.16, 0.23, 0.30], [0, 0, -12, -24]);
  const s0 = useTransform(progressValue, [0, 0.16, 0.23, 0.30], [1, 1, 0.995, 0.99]);

  // Beat 1: Enter 0.16-0.30 -> Active 0.30-0.42 -> Exit 0.42-0.56
  const op1 = useTransform(progressValue, [0.16, 0.23, 0.30, 0.42, 0.49, 0.56], [0, 0.4, 1, 1, 0.4, 0]);
  const y1 = useTransform(progressValue, [0.16, 0.23, 0.30, 0.42, 0.49, 0.56], [24, 12, 0, 0, -12, -24]);
  const s1 = useTransform(progressValue, [0.16, 0.23, 0.30, 0.42, 0.49, 0.56], [0.99, 0.995, 1, 1, 0.995, 0.99]);

  // Beat 2: Enter 0.42-0.56 -> Active 0.56-0.68 -> Exit 0.68-0.82
  const op2 = useTransform(progressValue, [0.42, 0.49, 0.56, 0.68, 0.75, 0.82], [0, 0.4, 1, 1, 0.4, 0]);
  const y2 = useTransform(progressValue, [0.42, 0.49, 0.56, 0.68, 0.75, 0.82], [24, 12, 0, 0, -12, -24]);
  const s2 = useTransform(progressValue, [0.42, 0.49, 0.56, 0.68, 0.75, 0.82], [0.99, 0.995, 1, 1, 0.995, 0.99]);

  // Beat 3: Enter 0.68-0.82 -> Active 0.82-1.0
  const op3 = useTransform(progressValue, [0.68, 0.75, 0.82, 1.0], [0, 0.4, 1, 1]);
  const y3 = useTransform(progressValue, [0.68, 0.75, 0.82, 1.0], [24, 12, 0, 0]);
  const s3 = useTransform(progressValue, [0.68, 0.75, 0.82, 1.0], [0.99, 0.995, 1, 1]);

  const beatTransforms = [
    { opacity: op0, y: y0, scale: s0 },
    { opacity: op1, y: y1, scale: s1 },
    { opacity: op2, y: y2, scale: s2 },
    { opacity: op3, y: y3, scale: s3 },
  ];

  // Semantic active step uses raw scroll progress for instant, accurate step tracking
  const progressStep = useTransform(scrollYProgress, [0, 0.23, 0.49, 0.75], [0, 1, 2, 3]);
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    return progressStep.on("change", (latest) => {
      const rounded = Math.min(3, Math.max(0, Math.round(latest)));
      setActiveStep(rounded);
    });
  }, [progressStep]);

  if (shouldReduceMotion) {
    return (
      <section id="about" aria-label="About developer" className="w-full py-20 px-4 max-w-4xl mx-auto space-y-12 bg-transparent">
        <div className="border-b border-border pb-3">
          <span className="text-muted font-mono text-xs mr-2">01</span>
          <span className="font-sans text-xs tracking-widest text-foreground uppercase font-medium">ABOUT</span>
        </div>
        <div className="space-y-10">
          {beats.map((beat) => (
            <div key={beat.id} className="border-t border-border/60 pt-6">
              <div className="font-mono text-xs text-muted mb-2">{beat.number} / {beat.tag}</div>
              <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-2">{beat.headline}</h3>
              <div className="text-xs font-mono text-muted mb-4">{beat.subheadline}</div>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">{beat.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="about"
      aria-label="Editorial developer story"
      className="relative h-[230vh] md:h-[250vh] w-full border-b border-border transition-colors bg-transparent"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-4xl mx-auto flex flex-col justify-between h-[75vh] py-8 overflow-visible">
          {/* Top Folio Header */}
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-muted font-mono text-xs">01</span>
              <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">
                ABOUT
              </span>
            </div>
            <StoryProgress current={activeStep} total={4} label="BEAT" />
          </div>

          {/* Central Editorial Presentation Stage */}
          <div className="relative flex-1 flex items-center justify-center my-6 overflow-visible">
            {beats.map((beat, index) => {
              const transform = beatTransforms[index];

              return (
                <motion.div
                  key={beat.id}
                  style={transform}
                  className="absolute inset-x-0 flex flex-col justify-center items-start text-left pointer-events-none select-none md:select-text overflow-visible"
                >
                  <div className="font-mono text-xs tracking-widest uppercase text-muted mb-3 font-medium">
                    {beat.number} — {beat.tag}
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground font-sans mb-4 leading-[1.08]">
                    {beat.headline}
                  </h3>

                  <div className="text-xs font-mono text-muted/80 mb-6 uppercase tracking-wider">
                    {beat.subheadline}
                  </div>

                  <div className="max-w-2xl border-l border-border pl-6 py-1">
                    <p className="text-base sm:text-lg text-muted font-sans leading-relaxed">
                      {beat.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Minimal Folio Footer */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted/70 pt-4 border-t border-border">
            <span>Scroll to progress narrative</span>
            <span className="tabular-nums">BEAT 0{activeStep + 1} OF 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
