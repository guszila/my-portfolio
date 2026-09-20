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

export interface DeveloperProfile {
  name: string;
  role: string;
  handle: string;
  location: string;
  status: {
    indicator: "operational" | "available" | "active";
    label: string;
  };
  statement: string;
  substatement: string;
  focusAreas: CoreFocusArea[];
  truthfulMetrics: TruthfulMetric[];
  primaryProjectTeaser: {
    id: string;
    name: string;
    domain: string;
    status: string;
    summary: string;
    targetHref: string;
  };
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
