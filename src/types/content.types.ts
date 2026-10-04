import { IconName } from "@/resources/icons";

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

/**
 * A job opening. Every field feeds both the job page and Google's JobPosting rich result.
 * See: https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export type Job = {
  /** URL slug: /jobs/<slug> */
  slug: string;
  title: string;
  /** One-paragraph pitch shown on cards and in meta description */
  summary: string;
  image: string;
  /** Set to false to close the role (hides the form and drops it from the JobPosting schema) */
  open: boolean;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY";
  /** ISO date, e.g. "2026-10-01" */
  datePosted: string;
  /** ISO date when the posting expires. Keep it current — Google hides expired postings. */
  validThrough: string;
  seniority: string;
  location: string;
  timezone: string;
  /** Optional pay range. Google strongly recommends including it. */
  salary?: {
    min: number;
    max: number;
    currency: "USD";
    unit: "HOUR" | "MONTH" | "YEAR";
  };
  /** Countries applicants may live in (required by Google for remote jobs) */
  applicantCountries: string[];
  skills: string[];
  description: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
};
