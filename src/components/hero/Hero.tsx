import React from "react";
import Link from "next/link";
import { developerData } from "@/data/developer";
import { MetricCard } from "./MetricCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
} from "lucide-react";

export function Hero() {
  const {
    name,
    role,
    statement,
    substatement,
    truthfulMetrics,
    primaryProjectTeaser,
    focusAreas,
  } = developerData;

  return (
    <section
      id="home"
      aria-label="Developer introduction"
      className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 border-b border-white/[0.08] tech-grid overflow-hidden"
    >
      {/* Background radial gradient accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/[0.04] blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top telemetry bar above headline */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">$</span>
            <span>whoami</span>
            <span className="text-white/20">→</span>
            <span className="text-slate-200">{role.toLowerCase().replace(/\s+/g, "-")}</span>
          </div>

          <Badge variant="cyan" size="sm">
            <Sparkles className="w-3 h-3 text-cyan-400" aria-hidden="true" />
            <span>Interactive Developer OS</span>
          </Badge>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              {role}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">
              {name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            {statement}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-8 max-w-2xl">
            {substatement}
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
            >
              Explore Projects
            </Button>

            <Button
              href="#architecture"
              variant="outline"
              size="lg"
              icon={<Cpu className="w-4 h-4 text-indigo-400" aria-hidden="true" />}
            >
              View Architecture
            </Button>
          </div>
        </div>

        {/* Truthful Metrics Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Core Portfolio Metrics</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Verified Production Data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {truthfulMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>

        {/* Primary Project Feature Spotlight (Planning System) */}
        <div className="rounded-xl bg-[#0c121e]/90 workbench-border p-6 sm:p-8 corner-bracket relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="indigo" size="sm">
                  <Cpu className="w-3 h-3 text-indigo-400" aria-hidden="true" />
                  <span>Flagship Engineering Case Study</span>
                </Badge>
                <Badge variant="outline" size="sm">
                  {primaryProjectTeaser.status}
                </Badge>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">
                  {primaryProjectTeaser.name}
                </h2>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  {primaryProjectTeaser.domain}
                </p>
              </div>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {primaryProjectTeaser.summary}
              </p>

              {/* Modules List from prompt */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase tracking-wider">
                  Target Modules & Capabilities:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                  <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                    WIP & Output
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                    Productivity Tracking
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                    Capacity Engine
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                    Executive Dashboard
                  </span>
                </div>
              </div>
            </div>

            {/* Quick deep-dive trigger */}
            <div className="lg:w-72 shrink-0 p-5 rounded-lg bg-[#070b13] border border-white/10 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold mb-2">
                  <GitPullRequest className="w-4 h-4" aria-hidden="true" />
                  <span>Interactive Case Study</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Explore the problem breakdown, domain architecture, schema design, and operational results in Phase 3.
                </p>
              </div>

              <Link
                href="#projects"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Preview Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Engineering Focus Pillars */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <span className="text-[11px] font-mono text-slate-400 block mb-4 uppercase tracking-wider">
            Engineering Focus Areas
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <div
                key={area.title}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center gap-2 text-white font-mono text-sm font-semibold mb-1.5">
                  <span className="text-emerald-400 text-xs">0{index + 1}.</span>
                  <span>{area.title}</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
