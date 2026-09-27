export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  iconName?: string;
  ariaLabel: string;
}

export interface TruthfulMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  badge?: string;
}

export interface CoreFocusArea {
  title: string;
  description: string;
}

export interface TechnologyItem {
  name: string;
  detail: string;
}

export interface TechnologyGroup {
  id: "portfolio" | "personal";
  label: string;
  summary: string;
  technologies: TechnologyItem[];
}

export interface FeaturedProject {
  id: string;
  name: string;
  domain: string;
  summary: string;
  modules: string[];
  technologies: string[];
  architecture: string[];
  targetHref: string;
}

export interface DeveloperProfile {
  name: string;
  nickname: string;
  role: string;
  education: string;
  university: string;
  interest: string;
  statement: string;
  substatement: string;
  focusAreas: CoreFocusArea[];
  truthfulMetrics: TruthfulMetric[];
  technologyGroups: TechnologyGroup[];
  featuredProjects: FeaturedProject[];
  navigation: NavigationItem[];
  socialLinks: {
    name: string;
    url: string;
    handle: string;
  }[];
  systemInfo: {
    environment: string;
    version: string;
    stack: string;
  };
}
