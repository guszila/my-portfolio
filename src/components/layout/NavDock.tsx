"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { useActiveSection } from "@/components/animation/useActiveSection";
import { useTerminal } from "@/components/terminal/TerminalContext";

interface DockItem {
  id: string;
  sectionId: string;
  num: string;
  label: string;
  shortLabel: string;
}

const dockItems: DockItem[] = [
  {
    id: "dock-home",
    sectionId: "home",
    num: "01",
    label: "INDEX",
    shortLabel: "01",
  },
  {
    id: "dock-about",
    sectionId: "about",
    num: "02",
    label: "ABOUT",
    shortLabel: "02",
  },
  {
    id: "dock-skills",
    sectionId: "skills",
    num: "03",
    label: "STACK",
    shortLabel: "03",
  },
  {
    id: "dock-projects",
    sectionId: "projects",
    num: "04",
    label: "WORK",
    shortLabel: "04",
  },
  {
    id: "dock-architecture",
    sectionId: "architecture",
    num: "05",
    label: "ARCHITECTURE",
    shortLabel: "05",
  },
  {
    id: "dock-contact",
    sectionId: "contact",
    num: "06",
    label: "CONTACT",
    shortLabel: "06",
  },
];

const sectionIds = dockItems.map((item) => item.sectionId);

export function NavDock() {
  const { toggle: toggleTerminal } = useTerminal();
  const { activeSection, scrollToSection } = useActiveSection({
    sectionIds,
    defaultSection: "home",
    rootMargin: "-20% 0px -55% 0px",
  });

  return (
    <nav
      aria-label="Editorial quick index"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-2rem)]"
    >
      <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-surface/95 border border-border transition-colors">
        {dockItems.map((item) => {
          const isActive = activeSection === item.sectionId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.sectionId)}
              aria-label={`Jump to ${item.label}`}
              className={`relative px-2 sm:px-2.5 py-1 rounded transition-colors font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground cursor-pointer ${
                isActive
                  ? "text-foreground font-semibold"
                  : "text-muted hover:text-foreground hover:bg-surface-secondary/60"
              }`}
            >
              {/* Active Indicator Underline */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-accent"
                  aria-hidden="true"
                />
              )}

              {/* Desktop Full Label */}
              <span className="hidden lg:inline tracking-wider uppercase text-[11px]">
                <span className="text-muted/60 mr-1 text-[10px]">{item.num}</span>
                <span>{item.label}</span>
              </span>

              {/* Tablet/Mobile Short Label */}
              <span className="lg:hidden text-[11px] tracking-widest uppercase">
                {item.shortLabel}
              </span>
            </button>
          );
        })}

        {/* Hairline Divider */}
        <span className="w-px h-4 bg-border mx-1" aria-hidden="true" />

        {/* Terminal Trigger */}
        <button
          type="button"
          onClick={toggleTerminal}
          aria-label="Open Developer Terminal (Ctrl+K or `)"
          className="flex items-center gap-1.5 px-2 py-1 rounded text-muted hover:text-foreground hover:bg-surface-secondary/60 transition-colors font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
          <span className="hidden sm:inline text-[10px] text-muted/80 tracking-wider">⌘K</span>
        </button>
      </div>
    </nav>
  );
}
