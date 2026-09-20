import { DeveloperProfile } from "@/types/developer";

export const developerData: DeveloperProfile = {
  name: "Developer Name",
  role: "Full Stack Developer",
  handle: "developer",
  location: "Remote / Worldwide",
  status: {
    indicator: "available",
    label: "Open to Full Stack & Architecture Roles",
  },
  statement:
    "Building robust web applications, data workflows, and internal developer tools.",
  substatement:
    "I focus on engineering reliable systems that eliminate repetitive manual workflows, protect data integrity, and deliver clean, responsive user experiences.",
  focusAreas: [
    {
      title: "Web Applications",
      description: "Responsive, type-safe full stack web applications built with Next.js, React, and TypeScript.",
    },
    {
      title: "Data Systems",
      description: "Structured workflows, relational data modeling, and operational dashboards.",
    },
    {
      title: "Developer Tools",
      description: "Internal tooling and interfaces designed to reduce friction and improve team productivity.",
    },
  ],
  truthfulMetrics: [
    {
      id: "featured-case-study",
      label: "Featured Project",
      value: "Planning System",
      detail: "Production planning web application with workflow automation and dashboard visualization.",
      badge: "Flagship",
    },
    {
      id: "core-stack",
      label: "Core Stack",
      value: "TypeScript & Next.js",
      detail: "React, Tailwind CSS, Motion, and modern web architecture.",
      badge: "Modern",
    },
    {
      id: "focus-domain",
      label: "Specialization",
      value: "Full Stack & Workflows",
      detail: "Data visualization, operational dashboards, and high-reliability interfaces.",
      badge: "Architecture",
    },
    {
      id: "project-readiness",
      label: "Project Status",
      value: "Case Study Ready",
      detail: "Deep dive into problem breakdown, architecture, and core modules.",
      badge: "Explorable",
    },
  ],
  primaryProjectTeaser: {
    id: "planning-system",
    name: "Planning System",
    domain: "Production Planning Web Application",
    status: "Primary Featured Case Study",
    summary:
      "Engineered to improve production planning workflows, reduce repetitive manual work, improve data accuracy, and provide clear dashboard visualization.",
    targetHref: "#projects",
  },
  navigation: [
    {
      id: "nav-home",
      label: "Home",
      href: "#home",
      ariaLabel: "Navigate to top / hero section",
    },
    {
      id: "nav-projects",
      label: "Projects",
      href: "#projects",
      ariaLabel: "Navigate to projects section",
    },
    {
      id: "nav-architecture",
      label: "Architecture",
      href: "#architecture",
      ariaLabel: "Navigate to Planning System architecture overview",
    },
    {
      id: "nav-skills",
      label: "Skills",
      href: "#skills",
      ariaLabel: "Navigate to skills and technologies section",
    },
    {
      id: "nav-about",
      label: "About",
      href: "#about",
      ariaLabel: "Navigate to about section",
    },
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com",
      handle: "github.com/developer",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      handle: "linkedin.com/in/developer",
    },
    {
      name: "Email",
      url: "mailto:developer@example.com",
      handle: "developer@example.com",
    },
  ],
  systemInfo: {
    environment: "Next.js App Router",
    version: "v1.0.0",
    stack: "React • TypeScript • Tailwind CSS",
  },
};
