"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { developerData } from "@/data/developer";
import { MetricCard } from "./MetricCard";
import { StaggerContainer, StaggerItem } from "@/components/animation/StaggerContainer";

export function Hero() {
  const {
    nickname,
    role,
    education,
    statement,
    substatement,
    truthfulMetrics,
    focusAreas,
  } = developerData;

  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.45,
  });

  const progressValue = shouldReduceMotion ? scrollYProgress : smoothProgress;

  // Quiet, restrained hero drift
  const containerY = useTransform(progressValue, [0, 1], [0, -12]);
  const containerOpacity = useTransform(progressValue, [0, 0.85], [1, 0.9]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Developer introduction"
      className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border transition-colors bg-transparent"
    >
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: containerY,
                opacity: containerOpacity,
              }
        }
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Top Editorial Folio Line */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/80 pb-4 mb-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-muted font-mono">INDEX</span>
            <span className="text-muted/40">•</span>
            <span className="text-muted">{education}</span>
          </div>

          <div className="text-muted/80 tracking-widest uppercase text-[11px]">
            {nickname} • {role}
          </div>
        </div>

        {/* Commanding Editorial Headline */}
        <div className="max-w-4xl mb-14">
          <div className="font-mono text-xs tracking-widest text-muted uppercase mb-4 font-medium">
            {role} DEVELOPER
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6 leading-[1.05] font-sans">
            {statement}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted font-sans leading-relaxed max-w-2xl mb-8">
            {substatement}
          </p>

          {/* Restrained Typographic Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href="#about"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-foreground hover:text-accent transition-colors group"
            >
              <span>Read Story</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>

            <span className="text-border" aria-hidden="true">/</span>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors group"
            >
              <span>Featured Work</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Truthful Metrics Ledger (Editorial 4-Column Grid) */}
        <div className="mb-14">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted/60 mb-3">
            VERIFIED SPECIFICATIONS
          </div>

          <StaggerContainer
            staggerDelay={0.04}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {truthfulMetrics.map((metric) => (
              <StaggerItem key={metric.id}>
                <MetricCard metric={metric} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Engineering Focus Pillars (Editorial Hairline Columns) */}
        <div className="pt-8 border-t border-border">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted/60 mb-6">
            CORE DOMAINS
          </div>

          <StaggerContainer
            staggerDelay={0.04}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {focusAreas.map((area, index) => (
              <StaggerItem key={area.title}>
                <div className="flex flex-col justify-between">
                  <div className="font-mono text-xs text-accent font-semibold mb-2">
                    0{index + 1}
                  </div>
                  <h2 className="text-base font-sans font-medium text-foreground tracking-tight mb-2">
                    {area.title}
                  </h2>
                  <p className="text-xs text-muted font-sans leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </motion.div>
    </section>
  );
}
