import { DeveloperProfile } from "@/types/developer";

export const developerData: DeveloperProfile = {
  name: "PANUDET SRIWUTTISAP",
  nickname: "FOCUS",
  role: "Full Stack",
  education: "Computer Science",
  university: "Suranaree University of Technology",
  interest: "Full Stack Development",
  statement: "PANUDET SRIWUTTISAP",
  substatement:
    "Computer Science — Suranaree University of Technology. Interested in Full Stack Development.",
  focusAreas: [
    {
      title: "Role",
      description: "Full Stack",
    },
    {
      title: "Education",
      description: "Computer Science at Suranaree University of Technology",
    },
    {
      title: "Interest",
      description: "Full Stack Development",
    },
  ],
  truthfulMetrics: [
    {
      id: "featured-project",
      label: "Featured Project",
      value: "Planning System",
      detail: "Production planning web application.",
      badge: "Project",
    },
    {
      id: "role",
      label: "Role",
      value: "Full Stack",
      detail: "Current role description.",
      badge: "Profile",
    },
    {
      id: "education",
      label: "Education",
      value: "Computer Science",
      detail: "Suranaree University of Technology.",
      badge: "Education",
    },
    {
      id: "interest",
      label: "Interest",
      value: "Full Stack Development",
      detail: "Current development interest.",
      badge: "Interest",
    },
  ],
  technologyGroups: [
    {
      id: "portfolio",
      label: "BUILT WITH",
      summary: "Technologies used to build this portfolio website.",
      technologies: [
        { name: "Next.js", detail: "Application framework" },
        { name: "React", detail: "Interface components" },
        { name: "TypeScript", detail: "Typed source code" },
        { name: "Tailwind CSS", detail: "Interface styling" },
        { name: "Motion for React", detail: "Scroll and interface animation" },
      ],
    },
    {
      id: "personal",
      label: "PERSONAL SKILL SET",
      summary: "A complete, verified personal technology list will be added later.",
      technologies: [],
    },
  ],
  featuredProjects: [
    {
      id: "planning-system",
      name: "Planning System",
      domain: "Production planning web application",
      summary:
        "Developed to improve a production planning workflow that previously relied heavily on Excel formulas and macros.",
      modules: ["WIP & OUTPUT", "PRODUCTIVITY", "CAPACITY"],
      technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
      architecture: ["Frontend", "Backend", "PostgreSQL"],
      targetHref: "#case-study",
    },
  ],
  navigation: [
    {
      id: "nav-home",
      label: "Home",
      href: "#home",
      ariaLabel: "Navigate to top / hero section",
    },
    {
      id: "nav-about",
      label: "About",
      href: "#about",
      ariaLabel: "Navigate to developer story and background",
    },
    {
      id: "nav-skills",
      label: "Skills",
      href: "#skills",
      ariaLabel: "Navigate to technology overview",
    },
    {
      id: "nav-projects",
      label: "Projects",
      href: "#projects",
      ariaLabel: "Navigate to featured project",
    },
    {
      id: "nav-architecture",
      label: "Architecture",
      href: "#architecture",
      ariaLabel: "Navigate to Planning System architecture overview",
    },
    {
      id: "nav-contact",
      label: "Contact",
      href: "#contact",
      ariaLabel: "Navigate to contact section",
    },
  ],
  socialLinks: [],
  systemInfo: {
    environment: "Next.js App Router",
    version: "v1.0.0",
    stack: "React • TypeScript • Tailwind CSS",
  },
};
