import React from "react";
import Link from "next/link";
import { developerData } from "@/data/developer";
import { Badge } from "@/components/ui/Badge";
import { Code2 } from "lucide-react";

export function Header() {
  const { name, role, status, navigation } = developerData;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090d16]/90 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Identity */}
        <Link
          href="#home"
          className="group flex items-center gap-3 text-slate-100 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1 py-0.5"
          aria-label={`${name} - ${role} Home`}
        >
          <div className="w-8 h-8 rounded bg-slate-800/90 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-colors">
            <Code2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              {name}
            </span>
            <span className="text-[11px] text-slate-400 font-sans">
              {role}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 font-mono text-xs text-slate-300"
        >
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.ariaLabel}
              className="px-3 py-1.5 rounded text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span className="text-slate-500 mr-1 select-none">#</span>
              {item.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        {/* Right side: Status Badge & Contact button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center">
            <Badge variant="emerald" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
              <span>{status.label}</span>
            </Badge>
          </div>

          <Link
            href="#contact"
            className="text-xs font-mono px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
