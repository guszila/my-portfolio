import React from "react";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "right",
  children,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-medium rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-xs md:text-sm px-4 py-2 gap-2",
    lg: "text-sm md:text-base px-5 py-2.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold shadow-sm",
    secondary:
      "bg-slate-800/90 text-slate-100 hover:bg-slate-750 border border-slate-700 hover:border-slate-600",
    outline:
      "bg-transparent text-slate-200 border border-white/15 hover:border-white/30 hover:bg-white/[0.04]",
    ghost:
      "bg-transparent text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <a className={combinedClasses} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
