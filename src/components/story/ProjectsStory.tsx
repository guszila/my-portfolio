"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { developerData } from "@/data/developer";
import { StoryProgress } from "./StoryProgress";

export function ProjectsStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const projects = developerData.featuredProjects;
  const project = projects[0];

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

  const cardScale = useTransform(progressValue, [0, 0.25, 0.75, 1.0], [0.99, 1, 1, 0.99]);
  const cardY = useTransform(progressValue, [0, 0.25, 0.75, 1.0], [24, 0, 0, -20]);
  const cardOp = useTransform(progressValue, [0, 0.20, 0.80, 1.0], [0.85, 1, 1, 0.85]);

  if (!project) return null;

  return (
    <section
      ref={containerRef}
      id="projects"
      aria-label="Verified featured projects"
      className="relative h-[150vh] md:h-[170vh] w-full border-b border-border transition-colors bg-transparent text-foreground"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-between h-[82vh] py-8 overflow-visible">
          {/* Editorial Section Header */}
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-muted font-mono text-xs">03</span>
              <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">
                WORK
              </span>
            </div>
            <StoryProgress current={0} total={projects.length} label="Project" />
          </div>

          {/* Editorial Case Study Presentation */}
          <div className="relative flex-1 flex items-center justify-center my-6 overflow-visible">
            <motion.div
              style={shouldReduceMotion ? undefined : { scale: cardScale, y: cardY, opacity: cardOp }}
              className="w-full max-w-4xl mx-auto overflow-visible"
            >
              {/* Project Ledger Header */}
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-muted uppercase font-medium">
                  PROJECT 01 — {project.domain.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-muted tracking-wider">2026</span>
              </div>

              {/* Title & Divider */}
              <div className="border-t border-border pt-4 mb-6">
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-sans font-light text-foreground tracking-tight mb-2">
                  {project.name.toUpperCase()}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-muted tracking-wide uppercase">
                  {project.domain}
                </p>
              </div>

              {/* Summary */}
              <p className="text-base sm:text-lg text-foreground/90 font-sans max-w-3xl leading-relaxed mb-8">
                {project.summary}
              </p>

              {/* Specifications Ledger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border py-6 mb-8">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-3 font-medium">
                    Confirmed Modules
                  </span>
                  <div className="space-y-1.5 font-mono text-xs text-foreground">
                    {project.modules.map((module) => (
                      <div key={module} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent rounded-xs shrink-0" />
                        <span>{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-3 font-medium">
                    Verified Technologies
                  </span>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-foreground">
                    {project.technologies.map((tech, idx) => (
                      <span key={tech}>
                        {tech}
                        {idx < project.technologies.length - 1 && (
                          <span className="text-muted/40 ml-3">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono text-muted">
                  01 verified featured project in production context
                </span>
                <a
                  href={project.targetHref}
                  className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                >
                  <span>Explore Case Study</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Editorial Footer */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted/70 pt-4 border-t border-border">
            <span>Planning System is the only verified featured project</span>
            <span className="tabular-nums">01 OF 01 CASE STUDY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
