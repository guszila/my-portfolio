export interface StoryBeat {
  id: string;
  number: string;
  tag: string;
  headline: string;
  subtext: string;
  badge?: string;
  details?: string[];
}

export interface TechCategory {
  id: string;
  number: string;
  name: string;
  description: string;
  technologies: {
    name: string;
    description: string;
  }[];
}

export interface CaseStudyMilestone {
  step: string;
  phase: string;
  title: string;
  description: string;
  points: string[];
}
