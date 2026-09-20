import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "emerald" | "cyan" | "indigo" | "outline";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-mono font-medium rounded tracking-wide uppercase transition-colors";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantStyles = {
    default:
      "bg-slate-800/80 text-slate-300 border border-slate-700/60",
    emerald:
      "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30",
    cyan:
      "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30",
    indigo:
      "bg-indigo-950/60 text-indigo-400 border border-indigo-500/30",
    outline:
      "bg-transparent text-slate-400 border border-white/10",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
