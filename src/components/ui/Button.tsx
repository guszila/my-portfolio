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
    "inline-flex items-center justify-center font-mono rounded-md transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none tracking-wider uppercase";

  const sizeStyles = {
    sm: "text-[11px] px-3 py-1.5 gap-1.5",
    md: "text-xs px-4 py-2 gap-2",
    lg: "text-xs md:text-sm px-5 py-2.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-foreground text-background hover:opacity-90 font-medium border border-foreground",
    secondary:
      "bg-surface-secondary text-foreground hover:bg-border/50 border border-border text-muted hover:text-foreground",
    outline:
      "bg-transparent text-foreground border border-border hover:border-foreground",
    ghost:
      "bg-transparent text-muted hover:text-foreground hover:bg-surface-secondary/40",
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
