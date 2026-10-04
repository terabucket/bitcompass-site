// All website copy lives here. Edit text, FAQs and job openings without touching page code.
import type {
  Faq,
  Feature,
  Job,
  NavItem,
  PageConfig,
  Stat,
  Step,
  Value,
} from "@/types";

const company = {
  name: "BitCompass",
  tagline: "Your compass to remote US tech careers",
  description:
    "BitCompass is an IT talent agency that connects skilled software developers outside the United States with full-time remote jobs at US companies.",
  /** Site-wide keywords used in meta tags */
  keywords: [
    "BitCompass",
    "IT talent agency",
    "remote US jobs",
    "remote developer jobs",
    "remote jobs for international developers",
    "work remotely for US companies",
    "remote software engineer jobs",
    "full-stack developer remote jobs",
    "tech recruitment agency",
    "nearshore developers",
    "offshore developer jobs",
    "remote jobs from abroad",
  ],
  regions: ["Latin America", "Eastern Europe", "Asia", "Africa", "Middle East"],
};

const navigation: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "info" },
  { label: "Jobs", href: "/jobs", icon: "briefcase" },
  { label: "Blog", href: "/blog", icon: "book" },
  { label: "Contact", href: "/contact", icon: "chat" },
];

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

const home: PageConfig & {
  badge: string;
  headline: string;
  subline: string;
  highlights: Stat[];
} = {
  path: "/",
  label: "Home",
  title: "Remote US Tech Jobs for International IT Talent",
  description:
    "BitCompass connects software developers outside the USA with full-time remote jobs at US companies. Apply once, get vetted and interview with US tech teams.",
  keywords: ["remote US developer jobs", "US remote jobs from outside USA"],
  badge: "Now hiring · Full-Stack Web Developers",
  headline: "Your compass to remote US tech careers",
  subline:
    "We connect talented software engineers outside the United States with full-time remote roles at US companies — and guide you from application to offer.",
  highlights: [
    { value: "100%", label: "Remote roles" },
    { value: "USD", label: "Compensation" },
    { value: "US", label: "Based companies" },
    { value: "$0", label: "Fees for talent" },
  ],
};

const about: PageConfig & { headline: string; intro: string; story: string[] } = {
  path: "/about",
  label: "About",
  title: "About Us — IT Talent Agency for Remote US Jobs",
  description:
    "Learn how BitCompass helps software engineers in Latin America, Europe, Asia and Africa land long-term remote jobs with US companies.",
  keywords: ["about BitCompass", "international tech recruiting", "global IT talent"],
  image: "/images/about/diverse-it-professionals.jpg",
  headline: "Talent is everywhere. Opportunity should be too.",
  intro:
    "BitCompass exists to close the gap between world-class engineers outside the United States and the US companies that need them.",
  story: [
    "Thousands of brilliant developers around the world have the skills to work on US product teams, but lack the network, the market knowledge and the introductions to get there. At the same time, US companies struggle to find reliable engineers who communicate well and work as part of the team.",
    "We built BitCompass to be the guide in between. We find and vet IT talent outside the US, prepare them for the US hiring process, and match them with companies offering real, long-term remote roles — paid in US dollars, with no relocation and no visa required.",
    "Every candidate gets a human point of contact, honest feedback and support that continues after the offer is signed.",
  ],
};

const jobsPage: PageConfig & { headline: string; intro: string } = {
  path: "/jobs",
  label: "Jobs",
  title: "Remote Developer Jobs at US Companies",
  description:
    "Browse open remote developer jobs with US companies. Work from anywhere outside the USA, get paid in USD and apply online in minutes with BitCompass.",
  keywords: ["remote developer jobs", "remote full-stack jobs", "US tech jobs remote"],
  headline: "Open remote roles",
  intro:
    "Every role below is 100% remote with a US-based company. Apply in a couple of minutes — our team reviews every application.",
};

const contact: PageConfig & { headline: string; intro: string } = {
  path: "/contact",
  label: "Contact",
  title: "Contact Us",
  description:
    "Get in touch with BitCompass. Questions about remote US jobs, your application or hiring international developers? Email or call our team.",
  keywords: ["contact BitCompass", "IT recruiting agency contact"],
  image: "/images/contact/handshake-agreement.jpg",
  headline: "Let's talk",
  intro:
    "Questions about a role, your application or hiring remote engineers through BitCompass? Reach out — a real person will get back to you.",
};

const blog: PageConfig & { headline: string } = {
  path: "/blog",
  label: "Blog",
  title: "Career Guides for Remote Developers",
  description:
    "Practical guides for international developers: how to find remote US jobs, write a US-style resume, ace interviews and work with American teams.",
  keywords: ["remote developer career tips", "how to get a remote US job"],
  headline: "Career guides for remote developers",
};

const privacy: PageConfig = {
  path: "/privacy",
  label: "Privacy",
  title: "Privacy Policy",
  description:
    "How BitCompass collects, uses and protects the personal information and resumes you share when applying for remote jobs.",
};

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

const features: Feature[] = [
  {
    icon: "globe",
    title: "Work from anywhere",
    description:
      "Keep living where you are and join a US team remotely, with schedules built around a reasonable time-zone overlap.",
  },
  {
    icon: "dollar",
    title: "Competitive USD pay",
    description:
      "Earn US-market compensation paid in US dollars, with clear contracts and on-time payments.",
  },
  {
    icon: "compass",
    title: "Career guidance",
    description:
      "Resume reviews, mock interviews and honest feedback that prepare you for the US hiring process.",
  },
  {
    icon: "shield",
    title: "Vetted US companies",
    description:
      "We partner with established US companies offering real roles, clear expectations and long-term engagements.",
  },
  {
    icon: "users",
    title: "Apply once, match many",
    description:
      "Get vetted once and we match you with roles that fit your stack, seniority and career goals.",
  },
  {
    icon: "heart",
    title: "Support after the offer",
    description:
      "From onboarding to performance reviews, we stay in your corner long after you sign the contract.",
  },
];

const steps: Step[] = [
  {
    title: "Apply in 2 minutes",
    description:
      "Send your resume with your name, email and phone number. No cover letter required.",
  },
  {
    title: "Get vetted",
    description:
      "A short intro call, then a practical technical interview with our engineers — no trick puzzles.",
  },
  {
    title: "Get matched",
    description:
      "We present your profile to US companies whose tech stack, culture and budget fit you.",
  },
  {
    title: "Interview & get hired",
    description:
      "We prepare you for every interview, help you with the offer and support your onboarding.",
  },
];

const roles: { name: string; hiring: boolean; href?: `/${string}` }[] = [
  { name: "Full-Stack Web Developer", hiring: true, href: "/jobs/full-stack-web-developer" },
  { name: "Frontend Developer (React / Next.js)", hiring: false },
  { name: "Backend Developer (Node.js / Python)", hiring: false },
  { name: "Mobile Developer", hiring: false },
  { name: "DevOps & Cloud Engineer", hiring: false },
  { name: "QA Automation Engineer", hiring: false },
  { name: "Data Engineer", hiring: false },
  { name: "UI/UX Designer", hiring: false },
];

const values: Value[] = [
  {
    title: "Transparency",
    description:
      "Clear salaries, clear contracts and clear feedback. You always know where you stand.",
  },
  {
    title: "Talent first",
    description:
      "We only present roles we would take ourselves, and we never charge candidates a fee.",
  },
  {
    title: "Long-term partnerships",
    description:
      "We look for engagements that last years, not months — for talent and companies alike.",
  },
  {
    title: "Craft & communication",
    description:
      "Great engineering is half code, half communication. We help you excel at both.",
  },
];

const lookingFor: string[] = [
  "Solid professional experience and strong engineering fundamentals",
  "Clear spoken and written English for stand-ups, code reviews and Slack",
  "Ownership: you ship, you test, you follow through",
  "Comfort working asynchronously with a distributed team",
  "A reliable internet connection and a quiet place to work",
];

const faqs: Faq[] = [
  {
    question: "Who can apply to BitCompass?",
    answer:
      "Software professionals who live outside the United States and have strong professional English and solid experience in their field. We are currently hiring Full-Stack Web Developers.",
  },
  {
    question: "Do I need to move to the US or have a US work visa?",
    answer:
      "No. Every role is 100% remote. You keep living in your country and work with a US company online — no relocation or visa required.",
  },
  {
    question: "Does it cost anything to apply?",
    answer:
      "No. BitCompass is free for candidates. Our fees are paid by the hiring companies.",
  },
  {
    question: "How will I get paid?",
    answer:
      "You are paid in US dollars on a regular monthly or bi-weekly schedule, usually as an independent contractor. We explain the payment method and contract terms before you accept any offer.",
  },
  {
    question: "What working hours are expected?",
    answer:
      "Most teams ask for at least 4 hours of overlap with US business hours (Eastern to Pacific Time). The exact schedule is agreed with each company.",
  },
  {
    question: "What English level do I need?",
    answer:
      "You should be comfortable in daily stand-ups, code reviews and written communication on Slack. Upper-intermediate (B2) or higher is recommended.",
  },
  {
    question: "How long does the hiring process take?",
    answer:
      "Usually two to four weeks from application to offer, depending on each company's interview steps.",
  },
  {
    question: "What happens after I submit my resume?",
    answer:
      "Our team reviews every application. If your profile matches an open role, we contact you by email or phone within a few business days to schedule an intro call.",
  },
];

/* ------------------------------------------------------------------ */
/* Job openings                                                        */
/* ------------------------------------------------------------------ */

const jobs: Job[] = [
  {
    slug: "full-stack-web-developer",
    title: "Full-Stack Web Developer",
    summary:
      "Build modern web applications for US companies using React, Next.js, Node.js and TypeScript — 100% remote from your home country, paid in USD.",
    image: "/images/jobs/full-stack-web-developer-remote.jpg",
    open: true,
    employmentType: "FULL_TIME",
    datePosted: "2026-10-03",
    validThrough: "2027-04-30",
    seniority: "Mid-level to Senior (3+ years)",
    location: "Remote — work from anywhere outside the US",
    timezone: "At least 4 hours overlap with US Eastern Time",
    // Uncomment and adjust to show a salary range (recommended for Google Jobs):
    // salary: { min: 3500, max: 7000, currency: "USD", unit: "MONTH" },
    applicantCountries: [
      "Argentina",
      "Brazil",
      "Chile",
      "Colombia",
      "Costa Rica",
      "Mexico",
      "Peru",
      "Uruguay",
      "Bulgaria",
      "Poland",
      "Romania",
      "Serbia",
      "Ukraine",
      "Egypt",
      "Kenya",
      "Nigeria",
      "South Africa",
      "India",
      "Indonesia",
      "Pakistan",
      "Philippines",
      "Vietnam",
      "Turkey",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST & GraphQL",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Git",
    ],
    description: [
      "BitCompass is hiring Full-Stack Web Developers who live outside the United States to join product teams at US companies on a full-time, fully remote basis.",
      "You will work as a dedicated member of a US engineering team — shipping features end to end, from database schema and APIs to polished, responsive user interfaces. You keep living in your country, and you are paid in US dollars.",
    ],
    responsibilities: [
      "Design, build and maintain web applications with React/Next.js on the frontend and Node.js on the backend",
      "Develop and document REST or GraphQL APIs and integrate third-party services",
      "Model data and write efficient queries for SQL and NoSQL databases",
      "Write automated tests and take part in code reviews",
      "Collaborate daily with US product managers, designers and engineers",
      "Deploy and monitor applications on cloud platforms such as AWS, GCP or Vercel",
    ],
    requirements: [
      "3+ years of professional experience as a full-stack or web developer",
      "Strong JavaScript and TypeScript skills",
      "Hands-on experience with React (Next.js is a plus) and Node.js",
      "Experience with relational and/or NoSQL databases",
      "Solid understanding of Git, HTTP, web security basics and performance",
      "Upper-intermediate (B2) or higher spoken and written English",
      "Able to overlap at least 4 hours with US business hours",
      "Based outside the United States, with a reliable internet connection",
    ],
    niceToHave: [
      "Experience with Docker, CI/CD pipelines and cloud infrastructure",
      "Previous work with US or international clients",
      "Familiarity with testing tools such as Jest, Playwright or Cypress",
      "Open-source contributions or a public portfolio",
    ],
    benefits: [
      "Competitive compensation in US dollars",
      "100% remote — work from home in your own country",
      "Long-term engagements with established US companies",
      "Interview coaching and career guidance from BitCompass",
      "Paid time off, as agreed with each hiring company",
      "Ongoing support from a dedicated talent partner",
    ],
  },
];

export {
  company,
  navigation,
  home,
  about,
  jobsPage,
  contact,
  blog,
  privacy,
  features,
  steps,
  roles,
  values,
  lookingFor,
  faqs,
  jobs,
};
