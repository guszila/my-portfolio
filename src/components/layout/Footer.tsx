import React from "react";
import Link from "next/link";
import { developerData } from "@/data/developer";
import { GitBranch, Terminal, Shield, ArrowUp } from "lucide-react";

export function Footer() {
  const { name, role, socialLinks, systemInfo } = developerData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#06090f] border-t border-white/[0.08] text-slate-400 font-mono text-xs pb-24 md:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/[0.06]">
          {/* Identity & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-200">
              <Terminal className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="font-semibold">{name}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-[11px]">{role}</span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed max-w-sm">
              Designing and implementing high-reliability web applications, data systems, and internal operational tools.
            </p>
          </div>

          {/* Architecture & Stack Notes */}
          <div className="space-y-2">
            <span className="text-slate-200 text-[11px] uppercase tracking-wider block font-semibold">
              Engineering Architecture
            </span>
            <ul className="text-slate-400 text-xs space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono">✓</span>
                <span>Next.js App Router (RSC by default)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono">✓</span>
                <span>Strict TypeScript typing throughout</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono">✓</span>
                <span>Tailwind CSS & Motion for React</span>
              </li>
            </ul>
          </div>

          {/* Dispatch & Social Links */}
          <div className="space-y-3">
            <span className="text-slate-200 text-[11px] uppercase tracking-wider block font-semibold">
              Connect & Source
            </span>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar: System telemetry & back-to-top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {currentYear} {name}</span>
            <span className="text-white/15">|</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <GitBranch className="w-3 h-3 text-cyan-400" aria-hidden="true" />
              <span>branch: main</span>
            </div>
            <span className="text-white/15">|</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              <span>{systemInfo.stack}</span>
            </div>
          </div>

          <Link
            href="#home"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-2 py-1"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
