import React from "react";
import { CommandDefinition, CommandResult } from "./terminalTypes";
import { developerData } from "@/data/developer";

export const commandRegistry: Record<string, CommandDefinition> = {
  help: {
    name: "help",
    description: "Display list of available developer terminal commands",
    usage: "help",
    handler: (): CommandResult => {
      return {
        type: "system",
        output: (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="text-foreground font-semibold mb-2">Available Developer Commands:</div>
            <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-1 text-muted">
              <span className="text-accent font-bold">about</span>
              <span>Display verified profile and education</span>

              <span className="text-accent font-bold">skills</span>
              <span>Jump to Tech Stack presentation (#skills)</span>

              <span className="text-accent font-bold">projects</span>
              <span>Navigate to the verified featured project (#projects)</span>

              <span className="text-accent font-bold">case</span>
              <span>Open Planning System 4-beat project story (#case-study)</span>

              <span className="text-accent font-bold">arch</span>
              <span>Inspect Planning System verified architecture (#architecture)</span>

              <span className="text-accent font-bold">contact</span>
              <span>View contact dispatch channels and jump to #contact</span>

              <span className="text-accent font-bold">theme</span>
              <span>Check or switch interface theme (e.g. &apos;theme dark&apos;, &apos;theme light&apos;)</span>

              <span className="text-accent font-bold">view &lt;slug&gt;</span>
              <span>Inspect project details (e.g. &apos;view planning-system&apos;)</span>

              <span className="text-accent font-bold">clear</span>
              <span>Clear terminal session history</span>

              <span className="text-accent font-bold">help</span>
              <span>Show this help menu</span>
            </div>
          </div>
        ),
      };
    },
  },

  about: {
    name: "about",
    description: "Display verified developer profile",
    usage: "about",
    handler: (_args, context): CommandResult => {
      context.navigate("about");
      return {
        type: "info",
        output: (
          <div className="space-y-2 font-mono text-xs text-foreground">
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold">{developerData.name}</span>
              <span className="text-muted">({developerData.nickname || "Focus"})</span>
              <span className="text-accent-cyan">• {developerData.role}</span>
            </div>
            <div className="text-muted text-[11px]">
              Education: {developerData.education}
            </div>
            <div className="text-muted text-[11px]">
              Interest: {developerData.interest || "Full Stack Development"}
            </div>
            <p className="text-muted font-sans mt-2 leading-relaxed">
              {developerData.statement} {developerData.substatement}
            </p>
            <div className="text-accent text-[11px] mt-1">
              ✓ Navigated to #about section
            </div>
          </div>
        ),
      };
    },
  },

  skills: {
    name: "skills",
    description: "Navigate to Tech Stack presentation",
    usage: "skills",
    handler: (_args, context): CommandResult => {
      context.navigate("skills");
      return {
        type: "success",
        output: (
          <div className="font-mono text-xs">
            <span className="text-accent font-bold">Opening Tech Stack presentation...</span>
            <div className="text-muted text-[11px] mt-1">
              • Built with: Next.js, React, TypeScript, Tailwind CSS, Motion for React
            </div>
            <div className="text-muted text-[11px]">
              • Personal skill list: awaiting verified data
            </div>
          </div>
        ),
      };
    },
  },

  projects: {
    name: "projects",
    description: "Browse the verified featured project",
    usage: "projects",
    handler: (_args, context): CommandResult => {
      context.navigate("projects");
      return {
        type: "success",
        output: (
          <div className="font-mono text-xs">
            <span className="text-accent font-bold">Loading Verified Featured Project...</span>
            <div className="text-foreground mt-1">Planning System</div>
            <div className="text-muted">Production planning web application</div>
            <div className="text-accent text-[11px] mt-1">✓ Navigated to #projects</div>
          </div>
        ),
      };
    },
  },

  case: {
    name: "case",
    description: "Open Planning System case study narrative",
    usage: "case",
    handler: (_args, context): CommandResult => {
      context.navigate("case-study");
      return {
        type: "success",
        output: (
          <div className="font-mono text-xs">
            <span className="text-accent font-bold">Opening Planning System 4-Beat Project Story...</span>
            <div className="text-muted text-[11px] mt-1">
              Beats: 01 Previous Workflow • 02 Project Direction • 03 Modules • 04 Architecture
            </div>
          </div>
        ),
      };
    },
  },

  arch: {
    name: "arch",
    description: "Inspect Planning System verified architecture",
    usage: "arch",
    handler: (_args, context): CommandResult => {
      context.navigate("architecture");
      return {
        type: "success",
        output: (
          <div className="font-mono text-xs">
            <span className="text-accent-indigo font-bold">Illuminating Verified System Architecture...</span>
            <div className="text-muted text-[11px] mt-1">
              [01 Frontend] → [02 Backend] → [03 PostgreSQL]
            </div>
          </div>
        ),
      };
    },
  },

  contact: {
    name: "contact",
    description: "Show contact channels and jump to #contact",
    usage: "contact",
    handler: (_args, context): CommandResult => {
      context.navigate("contact");
      return {
        type: "info",
        output: (
          <div className="font-mono text-xs space-y-1">
            <div className="text-accent font-bold">Contact:</div>
            {developerData.socialLinks.length > 0 ? (
              developerData.socialLinks.map((link) => (
                <div key={link.name} className="flex gap-2 text-muted">
                  <span className="text-foreground w-20">{link.name}:</span>
                  <span className="text-accent-cyan">{link.url}</span>
                </div>
              ))
            ) : (
              <div className="space-y-0.5 text-muted">
                <div className="text-foreground">{developerData.name}</div>
                <div>{developerData.nickname}</div>
                <div>{developerData.role}</div>
              </div>
            )}
          </div>
        ),
      };
    },
  },

  theme: {
    name: "theme",
    description: "Inspect or toggle active theme (light/dark)",
    usage: "theme [light|dark]",
    handler: (args, context): CommandResult => {
      const target = args[0]?.toLowerCase();

      if (target === "dark") {
        context.setTheme("dark");
        return {
          type: "success",
          output: <span className="font-mono text-xs text-accent">✓ Switched theme to Dark mode</span>,
        };
      }

      if (target === "light") {
        context.setTheme("light");
        return {
          type: "success",
          output: <span className="font-mono text-xs text-accent">✓ Switched theme to Light mode</span>,
        };
      }

      return {
        type: "info",
        output: (
          <div className="font-mono text-xs space-y-1">
            <div className="text-foreground">
              Current active theme: <span className="text-accent font-bold uppercase">{context.currentTheme || "system"}</span>
            </div>
            <div className="text-muted text-[11px]">
              Usage: <span className="text-accent-cyan font-semibold">theme light</span> or <span className="text-accent-cyan font-semibold">theme dark</span>
            </div>
          </div>
        ),
      };
    },
  },

  view: {
    name: "view",
    description: "Inspect a verified project",
    usage: "view <project-slug>",
    handler: (args, context): CommandResult => {
      const slug = args[0]?.toLowerCase();

      if (!slug) {
        return {
          type: "warning",
          output: (
            <div className="font-mono text-xs text-muted">
              <div>Please specify a project slug. Available projects:</div>
              <div className="text-accent font-bold mt-1">• planning-system</div>
              <div className="text-[11px] mt-1">Example: <span className="text-accent-cyan">view planning-system</span></div>
            </div>
          ),
        };
      }

      if (slug === "planning-system") {
        context.navigate("case-study");
        return {
          type: "success",
          output: (
            <div className="font-mono text-xs space-y-1 text-foreground">
              <div className="text-accent font-bold">Opening Planning System Case Study...</div>
              <div className="text-muted text-[11px]">Domain: Production Planning Web Application</div>
              <div className="text-muted text-[11px]">Modules: WIP &amp; OUTPUT • PRODUCTIVITY • CAPACITY</div>
            </div>
          ),
        };
      }

      return {
        type: "error",
        output: (
          <div className="font-mono text-xs text-rose-500">
            Project &apos;{slug}&apos; not found. Available projects: <span className="text-accent font-bold">planning-system</span>
          </div>
        ),
      };
    },
  },

  clear: {
    name: "clear",
    description: "Clear terminal buffer",
    usage: "clear",
    handler: (_args, context): CommandResult => {
      context.clear();
      return {
        type: "system",
        output: null,
      };
    },
  },
};
