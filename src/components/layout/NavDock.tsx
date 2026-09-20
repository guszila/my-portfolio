"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  FolderGit2,
  Cpu,
  Layers,
  User,
  Mail,
} from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const dockItems: DockItem[] = [
  {
    id: "dock-home",
    label: "Home",
    href: "#home",
    icon: <Home className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "dock-projects",
    label: "Projects",
    href: "#projects",
    icon: <FolderGit2 className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "dock-architecture",
    label: "Architecture",
    href: "#architecture",
    icon: <Cpu className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "dock-skills",
    label: "Skills",
    href: "#skills",
    icon: <Layers className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "dock-about",
    label: "About",
    href: "#about",
    icon: <User className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "dock-contact",
    label: "Contact",
    href: "#contact",
    icon: <Mail className="w-4 h-4" aria-hidden="true" />,
  },
];

export function NavDock() {
  const [activeHash, setActiveHash] = useState<string>("#home");

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <nav
      aria-label="Quick navigation dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-xl bg-[#0d131f]/95 backdrop-blur-md border border-white/[0.12] shadow-2xl shadow-black/80">
        {dockItems.map((item) => {
          const isActive = activeHash === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveHash(item.href)}
              aria-label={`Jump to ${item.label}`}
              className={`relative group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] border border-transparent"
              }`}
            >
              {item.icon}

              {/* Tooltip Label */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-[11px] font-mono text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                {item.label}
              </span>

              {/* Active Pip */}
              {isActive && (
                <span
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
