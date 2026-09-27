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
    "inline-flex items-center gap-1.5 font-mono tracking-widest uppercase transition-colors select-none rounded";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-[11px] px-2.5 py-1",
  };

  const variantStyles = {
    default:
      "bg-surface-secondary/70 text-foreground border border-border/80",
    emerald:
      "bg-accent-bg text-accent border border-accent/25",
    cyan:
      "bg-surface-secondary text-foreground border border-border/80",
    indigo:
      "bg-surface-secondary text-foreground border border-border/80",
    outline:
      "bg-transparent text-muted/80 border border-border/60",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
