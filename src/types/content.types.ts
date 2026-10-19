import type { IconName } from "@/resources/icons";

/**
 * SEO + routing information shared by every page.
 */
export interface PageConfig {
  /** Route path, e.g. "/about" */
  path: `/${string}`;
  /** Short label used in navigation */
  label: string;
  /** <title> for the page (the " | BitCompass" suffix is added automatically) */
  title: string;
  /** Meta description: aim for 140–160 characters */
  description: string;
  /** Extra keywords for this page (merged with the site-wide keywords) */
  keywords?: string[];
  /** Social share image (path inside /public). Falls back to the generated OG image. */
  image?: string;
}

export type NavItem = {
  label: string;
  href: `/${string}`;
  icon: IconName;
};

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
};

export type Step = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Value = {
  title: string;
  description: string;
};

/** The two BitCompass business lines */
export type TrackId = "global" | "ai";

/** A business line shown on the home page */
export type Track = {
  id: TrackId;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  cta: { label: string; href: `/${string}` };
  secondaryCta?: { label: string; href: `/${string}` };
};

/** A field of expertise recruited for AI training */
export type ExpertiseField = {
  icon: IconName;
  title: string;
  description: string;
};

export type JobEmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY";

/**
 * A job opening. Every field feeds both the job page and Google's JobPosting rich result.
 * See: https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export type Job = {
  /** URL slug: /jobs/<slug> */
  slug: string;
  /** Which business line the job belongs to (controls FAQ and form fields) */
  track: TrackId;
  title: string;
  /** Page <title> (keep it under ~50 characters; " | BitCompass" is appended) */
  seoTitle: string;
  /** Extra search keywords for the job page */
  keywords: string[];
  /** One-paragraph pitch shown on cards and in meta description */
  summary: string;
  image: string;
  imageAlt: string;
  /** Set to false to close the role (hides the form and drops it from the JobPosting schema) */
  open: boolean;
  employmentType: JobEmploymentType | JobEmploymentType[];
  /** Human-readable job type, e.g. "Full-time" or "Contract · flexible hours" */
  employmentLabel: string;
  /** ISO date, e.g. "2026-10-01" */
  datePosted: string;
  /** ISO date when the posting expires. Keep it current — Google hides expired postings. */
  validThrough: string;
  seniority: string;
  location: string;
  timezone: string;
  /** Short badges shown on the job card and job page */
  tags: { label: string; icon: IconName }[];
  /** Shown when no salary range is set */
  compensation: string;
  /** Optional pay range. Google strongly recommends including it. */
  salary?: {
    min: number;
    max: number;
    currency: "USD";
    unit: "HOUR" | "MONTH" | "YEAR";
  };
  /** Countries applicants may live in (required by Google for remote jobs) */
  applicantCountries: string[];
  industry: string;
  /** Optional O*NET-SOC code, e.g. "15-1254.00 Web Developers" */
  occupationalCategory?: string;
  /** Heading for the skills list, e.g. "Tech stack" or "Fields we're hiring for" */
  skillsLabel: string;
  skills: string[];
  description: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  /** Extra questions on the application form */
  application: {
    /** Ask for country of residence */
    askCountry?: boolean;
    /** Ask for field of expertise (required) and highest degree */
    askExpertise?: boolean;
    /** Require the applicant to confirm US citizenship */
    requireUsCitizen?: boolean;
  };
};
