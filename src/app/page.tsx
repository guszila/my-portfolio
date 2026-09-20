import React from "react";
import { Hero } from "@/components/hero/Hero";
import { developerData } from "@/data/developer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FolderGit2,
  Cpu,
  Layers,
  User,
  Mail,
  ExternalLink,
  Code,
  Database,
  Workflow,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const { socialLinks, primaryProjectTeaser } = developerData;

  return (
    <main className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Projects Anchor Section (Phase 1 Baseline & Phase 2/3 Roadmap Preview) */}
      <section
        id="projects"
        aria-label="Projects overview"
        className="w-full py-16 border-b border-white/[0.08] bg-[#080c14]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-1">
                <FolderGit2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>SECTION: PROJECTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                Featured Engineering Projects
              </h2>
            </div>
            <Badge variant="cyan" size="sm">
              Phase 2 / Phase 3 Milestone
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Featured Project Card */}
            <div className="p-6 rounded-xl bg-[#0d1320] workbench-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="emerald" size="sm">
                    Flagship Project
                  </Badge>
                  <span className="text-xs font-mono text-slate-500">
                    Production System
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-mono mb-2">
                  {primaryProjectTeaser.name}
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
                  {primaryProjectTeaser.summary}
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400 mb-4">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                    WIP & Output
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                    Capacity Engine
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">
                    Operations Dashboard
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400">
                  Case study deep-dive in Phase 3
                </span>
                <Button href="#architecture" variant="outline" size="sm">
                  View Architecture
                </Button>
              </div>
            </div>

            {/* Modular Full Stack Projects Teaser */}
            <div className="p-6 rounded-xl bg-[#0a0e18] workbench-border flex flex-col justify-between border-dashed">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="outline" size="sm">
                    Engineering Portfolio
                  </Badge>
                  <span className="text-xs font-mono text-slate-500">
                    Upcoming Modules
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-mono mb-2">
                  Interactive Project Explorer
                </h3>
                <p className="text-sm text-slate-400 font-sans leading-relaxed mb-4">
                  Detailed technical case studies containing problem statements, domain models, database architecture, trade-offs, and live visualizations.
                </p>
                <div className="space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-world production engineering case studies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Interactive technology filtering & inspection</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-slate-500">
                  Scheduled for Phase 2 Implementation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Architecture Anchor Section */}
      <section
        id="architecture"
        aria-label="System architecture overview"
        className="w-full py-16 border-b border-white/[0.08] bg-[#090d16]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-1">
                <Cpu className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <span>SECTION: ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                Planning System Architecture
              </h2>
            </div>
            <Badge variant="indigo" size="sm">
              Interactive Node Graph (Phase 3)
            </Badge>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#0b101c] workbench-border">
            <div className="max-w-3xl mb-6">
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                The Planning System architecture decouples operational data ingestion, relational persistence, and dynamic capacity calculation from high-density dashboard visualization.
              </p>
            </div>

            {/* Architecture Tiers Blueprint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
              <div className="p-4 rounded-lg bg-black/30 border border-white/[0.07]">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold mb-2">
                  <Workflow className="w-4 h-4" />
                  <span>01. Client Interface</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Next.js App Router, React, and Motion for fast, responsive planning workflows.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-black/30 border border-white/[0.07]">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold mb-2">
                  <Code className="w-4 h-4" />
                  <span>02. Application Layer</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Type-safe business logic, capacity engines, and server route handlers.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-black/30 border border-white/[0.07]">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold mb-2">
                  <Database className="w-4 h-4" />
                  <span>03. Relational Storage</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Structured schema preserving data integrity across stages and work orders.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-black/30 border border-white/[0.07]">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>04. Analytics Engine</span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Aggregation pipeline calculating real-time productivity curves and output metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Skills Anchor Section */}
      <section
        id="skills"
        aria-label="Technologies and skills"
        className="w-full py-16 border-b border-white/[0.08] bg-[#080c14]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-1">
                <Layers className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>SECTION: TECHNOLOGIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                Technical Stack & Capabilities
              </h2>
            </div>
            <Badge variant="emerald" size="sm">
              Interactive Matrix (Phase 2)
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-[#0e1422] workbench-border">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-3 font-semibold">
                Frontend Architecture
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Next.js</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">React</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">TypeScript</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Tailwind CSS</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Motion</span>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#0e1422] workbench-border">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-3 font-semibold">
                Backend & Systems
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Node.js</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">PostgreSQL</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">REST & Route Handlers</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Relational Modeling</span>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#0e1422] workbench-border">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                Engineering Practices
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Git & Version Control</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Docker & Containers</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">CI/CD Pipelines</span>
                <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10">Type Safety</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. About Anchor Section */}
      <section
        id="about"
        aria-label="About developer"
        className="w-full py-16 border-b border-white/[0.08] bg-[#090d16]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-1">
            <User className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>SECTION: PROFILE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight mb-8">
            Engineering Mindset
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0b101b] workbench-border">
              <div className="text-emerald-400 font-mono text-xs mb-2">PRINCIPLE 01</div>
              <h3 className="text-base font-bold text-white font-mono mb-2">
                Pragmatic Architecture
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Choose technologies for maintainability, reliability, and clear ROI over hype. Build systems that are easy to reason about and evolve.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0b101b] workbench-border">
              <div className="text-emerald-400 font-mono text-xs mb-2">PRINCIPLE 02</div>
              <h3 className="text-base font-bold text-white font-mono mb-2">
                Data Integrity First
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Workflows collapse without reliable data foundations. Strong typing and relational constraints prevent silent runtime failures.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0b101b] workbench-border">
              <div className="text-emerald-400 font-mono text-xs mb-2">PRINCIPLE 03</div>
              <h3 className="text-base font-bold text-white font-mono mb-2">
                Ergonomics & Performance
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Great software feels responsive and alive. High-density interfaces should minimize repetitive clicks and respect user time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Anchor Section */}
      <section
        id="contact"
        aria-label="Contact channels"
        className="w-full py-16 bg-[#080c14]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-1">
            <Mail className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>SECTION: CONTACT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight mb-4">
            Connect & Dispatch
          </h2>
          <p className="text-sm text-slate-300 font-sans max-w-xl mb-8">
            Available for full-stack engineering roles, technical architecture consultations, and system design discussions.
          </p>

          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0e1422] hover:bg-[#141b2e] workbench-border text-xs font-mono text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>{link.name}</span>
                <span className="text-slate-500 text-[11px]">({link.handle})</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
