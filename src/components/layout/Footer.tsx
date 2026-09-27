import React from "react";
import Link from "next/link";
import { developerData } from "@/data/developer";

export function Footer() {
  const { name, nickname, role, socialLinks, systemInfo } = developerData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent border-t border-border text-muted font-mono text-xs pb-24 md:pb-12 pt-16 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 pb-12 border-b border-border">
          {/* Identity & Scope */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2 text-foreground font-mono">
              <span className="font-bold tracking-tight text-sm">{name}</span>
              <span className="text-muted text-[11px]">/ {role}</span>
            </div>
            <p className="text-muted font-sans text-xs leading-relaxed max-w-sm">
              Computer Science — Suranaree University of Technology. Interested in Full Stack Development.
            </p>
          </div>

          {/* Publication Colophon */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-muted block font-medium">
              Colophon
            </span>
            <p className="text-muted font-sans text-xs leading-relaxed">
              Crafted with Next.js App Router, TypeScript, React, Tailwind CSS, and Motion. Typeset in Geist.
            </p>
          </div>

          {/* Verified Channels */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-muted block font-medium">
              Communication
            </span>
            {socialLinks.length > 0 ? (
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between py-1 border-b border-border/40 text-foreground hover:text-accent transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs">↗</span>
                  </a>
                ))}
              </div>
            ) : (
              <span className="text-xs font-mono text-muted block">
                {nickname} • {role}
              </span>
            )}
          </div>
        </div>

        {/* Bottom bar: Editorial Colophon & back-to-top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {currentYear} {name}</span>
            <span className="opacity-30">/</span>
            <span>{systemInfo.environment}</span>
          </div>

          <Link
            href="#home"
            className="group flex items-center gap-1.5 text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground py-1"
            aria-label="Scroll back to top"
          >
            <span className="uppercase tracking-wider">TOP OF FOLIO</span>
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
