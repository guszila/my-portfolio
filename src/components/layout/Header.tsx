"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useScroll } from "motion/react";
import { developerData } from "@/data/developer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { TerminalTrigger } from "@/components/terminal/TerminalTrigger";
import { ScrollProgressBar } from "@/components/animation/ScrollProgressBar";
import { useActiveSection } from "@/components/animation/useActiveSection";

export function Header() {
  const { name, role, navigation } = developerData;

  const sectionIds = useMemo(
    () => navigation.map((item) => item.href.replace("#", "")),
    [navigation]
  );
  const { activeSection, scrollToSection } = useActiveSection({
    sectionIds,
    defaultSection: "home",
  });

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const scrolled = latest > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    });
  }, [scrollY]);

  // Editorial section naming map
  const navLabels: Record<string, string> = {
    home: "INDEX",
    about: "ABOUT",
    skills: "STACK",
    projects: "WORK",
    architecture: "ARCHITECTURE",
    contact: "CONTACT",
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
        isScrolled
          ? "bg-background border-b border-border"
          : "bg-background/90 border-b border-border/40"
      }`}
    >
      <ScrollProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Editorial Brand / Identity */}
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="group flex items-baseline gap-2.5 text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground py-1"
          aria-label={`${name} - ${role}`}
        >
          <span className="font-sans font-semibold tracking-tight text-sm text-foreground group-hover:text-accent transition-colors">
            {name}
          </span>
          <span className="text-[10px] font-mono text-muted/80 uppercase tracking-widest hidden sm:inline">
            / {role}
          </span>
        </Link>

        {/* Desktop Text-First Editorial Index Navigation */}
        <nav
          aria-label="Primary editorial index"
          className="hidden md:flex items-center gap-6 font-mono text-xs"
        >
          {navigation.map((item, index) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            const label = navLabels[sectionId] || item.label.toUpperCase();

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(sectionId)}
                aria-label={item.ariaLabel}
                className={`group py-1 relative transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground cursor-pointer ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="text-[9px] text-muted/60 mr-1 tabular-nums group-hover:text-accent transition-colors">
                  0{index + 1}
                </span>
                <span className="tracking-widest uppercase text-[11px]">{label}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side: Terminal, Theme Toggle & Contact Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Terminal Launcher Trigger */}
          <TerminalTrigger />

          {/* Theme Toggle Button */}
          <ThemeToggle />

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border border-border/80 hover:border-foreground text-foreground transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground cursor-pointer hidden min-[480px]:inline-block"
          >
            Contact ↗
          </button>
        </div>
      </div>
    </header>
  );
}
