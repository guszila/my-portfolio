"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { Hero } from "@/components/hero/Hero";
import { AboutStory } from "@/components/story/AboutStory";
import { TechStackStory } from "@/components/story/TechStackStory";
import { ProjectsStory } from "@/components/story/ProjectsStory";
import { CaseStudyStory } from "@/components/story/CaseStudyStory";
import { ArchitectureStory } from "@/components/story/ArchitectureStory";
import { developerData } from "@/data/developer";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/animation/StaggerContainer";

export default function Home() {
  const { name, nickname, role, socialLinks } = developerData;
  const darkChapterRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Environmental scroll tracking across the dark chapter (Stack → Architecture)
  const { scrollYProgress: darkProgress } = useScroll({
    target: darkChapterRef,
    offset: ["start end", "end start"],
  });

  // Neutral crossfade: off-white → neutral → charcoal → near-black
  const rawDarkOpacity = useTransform(
    darkProgress,
    [0.02, 0.16, 0.86, 0.98],
    [0, 1, 1, 0]
  );

  const smoothDarkOpacity = useSpring(rawDarkOpacity, {
    stiffness: 80,
    damping: 26,
    mass: 0.45,
  });

  const darkOpacity = shouldReduceMotion ? rawDarkOpacity : smoothDarkOpacity;

  return (
    <main className="flex-1 flex flex-col transition-colors overflow-x-clip relative">
      {/* Two Fixed Neutral Background Layers for Invisible Environmental Crossfade */}
      <div
        className="fixed inset-0 pointer-events-none -z-30 bg-[#faf9f6] dark:bg-[#0e0e10] transition-colors"
        aria-hidden="true"
      />
      <motion.div
        style={{ opacity: darkOpacity }}
        className="fixed inset-0 pointer-events-none -z-20 bg-[#0e0e10]"
        aria-hidden="true"
      />

      {/* 1. Hero Section (#home) — Light Chapter */}
      <Hero />

      {/* 2. Editorial About Story (#about) — Light Chapter */}
      <AboutStory />

      {/* Dark Story Chapter: Stack → Projects → Case Study → Architecture */}
      <div ref={darkChapterRef} className="dark relative text-foreground">
        {/* 3. Tech Stack Presentation Slides (#skills) */}
        <TechStackStory />

        {/* 4. Projects Presentation Showcase (#projects) */}
        <ProjectsStory />

        {/* 5. Planning System Case Study Story (#case-study) */}
        <CaseStudyStory />

        {/* 6. Progressive System Architecture (#architecture) */}
        <ArchitectureStory />
      </div>

      {/* 7. Contact Section (#contact) — Light Chapter Return */}
      <ScrollReveal
        as="section"
        id="contact"
        aria-label="Contact channels"
        className="w-full py-24 bg-transparent text-foreground transition-colors border-t border-border"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Section Header */}
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-muted font-mono text-xs">05</span>
              <span className="text-foreground font-sans font-medium text-xs tracking-widest uppercase">
                CONTACT
              </span>
            </div>
            <span className="text-xs font-mono text-muted tracking-wider uppercase">VERIFIED CHANNELS</span>
          </div>

          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-light text-foreground tracking-tight mb-4">
              {name.toUpperCase()}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-muted uppercase tracking-wider">
              <span className="text-foreground font-medium">{nickname}</span>
              <span className="opacity-40">•</span>
              <span>{role}</span>
              <span className="opacity-40">•</span>
              <span>SURANAREE UNIVERSITY OF TECHNOLOGY</span>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="border-t border-border pt-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-4 font-medium">
                Verified Communication Channels
              </span>
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.map((link) => (
                  <StaggerItem key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between p-4 rounded-md border border-border bg-surface/60 hover:bg-surface-secondary/80 text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold tracking-wider block group-hover:text-accent transition-colors">
                          {link.name.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono text-muted mt-0.5 block">
                          {link.handle}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* Editorial Footer Colophon */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-muted pt-12 mt-12 border-t border-border">
            <span>PANUDET SRIWUTTISAP — DEVELOPER FOLIO</span>
            <span className="tabular-nums">DESIGNED & ARCHITECTED • 2026</span>
          </div>
        </div>
      </ScrollReveal>
      {process.env.NODE_ENV === "development" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=new URLSearchParams(location.search);var id=p.get("verify-transition");if(!id)return;var el=document.getElementById(id);if(!el)return;document.documentElement.style.scrollBehavior="auto";scrollTo(0,el.offsetTop-innerHeight*0.5)})()`,
          }}
        />
      )}
    </main>
  );
}
