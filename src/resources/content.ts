// All website copy lives here. Edit text, FAQs and job openings without touching page code.
import type {
  ExpertiseField,
  Faq,
  Feature,
  Job,
  NavItem,
  PageConfig,
  Stat,
  Step,
  Track,
  Value,
} from "@/types";

const company = {
  name: "BitCompass",
  tagline: "Your compass to remote tech & AI careers",
  description:
    "BitCompass is a talent agency that places software developers worldwide in remote jobs at US companies, and connects US-based experts with paid AI training projects.",
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
    "AI training jobs",
    "AI trainer jobs",
    "remote AI training jobs",
    "AI training jobs for experts",
    "RLHF jobs",
    "tech recruitment agency",
  ],
  regions: ["Latin America", "Eastern Europe", "Asia", "Africa", "Middle East"],
};

const navigation: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "info" },
  { label: "Jobs", href: "/jobs", icon: "briefcase" },
  { label: "AI Training", href: "/ai-training", icon: "brain" },
  { label: "Blog", href: "/blog", icon: "book" },
  { label: "Contact", href: "/contact", icon: "chat" },
];

/* ------------------------------------------------------------------ */
/* Business lines                                                      */
/* ------------------------------------------------------------------ */

const tracks: Track[] = [
  {
    id: "global",
    eyebrow: "For developers worldwide",
    title: "Remote jobs at US companies",
    description:
      "Software engineers outside the United States: join a US product team full-time, work from your home country and get paid in US dollars.",
    points: [
      "Full-time, long-term remote roles",
      "Paid in USD — no visa or relocation",
      "Interview coaching and ongoing support",
    ],
    image: "/images/jobs/full-stack-web-developer-remote.jpg",
    imageAlt: "Laptop with code on a developer's desk",
    cta: { label: "View developer jobs", href: "/jobs/full-stack-web-developer" },
  },
  {
    id: "ai",
    eyebrow: "New · For US experts",
    title: "Get paid to train AI",
    description:
      "US citizens with expertise in law, medicine, finance, science, engineering and more: use what you know to train and evaluate AI models — flexible and remote.",
    points: [
      "Flexible hours, fully remote",
      "Hourly pay in USD",
      "Projects across the leading AI training platforms",
    ],
    image: "/images/ai/ai-model-training-brain.jpg",
    imageAlt: "Glowing illustration of a brain representing AI models",
    cta: { label: "Explore AI training", href: "/ai-training" },
    secondaryCta: { label: "Apply", href: "/jobs/ai-training-expert" },
  },
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
  title: "Remote US Tech Jobs & AI Training Jobs",
  description:
    "BitCompass places developers worldwide in remote jobs at US companies, and connects US experts in law, medicine, finance, STEM and software with paid AI training work.",
  keywords: ["remote US developer jobs", "AI training jobs for US citizens"],
  badge: "New · AI training projects for US experts",
  headline: "Your compass to remote tech & AI careers",
  subline:
    "We place software engineers worldwide in remote roles at US companies, and connect US-based experts with paid projects training the next generation of AI.",
  highlights: [
    { value: "100%", label: "Remote work" },
    { value: "USD", label: "Pay" },
    { value: "2", label: "Career paths" },
    { value: "$0", label: "Fees for talent" },
  ],
};

const about: PageConfig & { headline: string; intro: string; story: string[] } = {
  path: "/about",
  label: "About",
  title: "About Us — Talent Agency for Remote Tech & AI Work",
  description:
    "Learn how BitCompass helps developers worldwide land remote jobs with US companies, and helps US experts find paid AI training projects.",
  keywords: ["about BitCompass", "international tech recruiting", "AI training consultancy"],
  image: "/images/about/diverse-it-professionals.jpg",
  headline: "Talent is everywhere. Opportunity should be too.",
  intro:
    "BitCompass connects skilled people with remote work that matters — US engineering teams for developers worldwide, and AI training projects for US experts.",
  story: [
    "Thousands of brilliant developers around the world have the skills to work on US product teams, but lack the network, the market knowledge and the introductions to get there. At the same time, US companies struggle to find reliable engineers who communicate well and work as part of the team.",
    "We built BitCompass to be the guide in between. We find and vet IT talent outside the US, prepare them for the US hiring process, and match them with companies offering real, long-term remote roles — paid in US dollars, with no relocation and no visa required.",
    "As AI took off, we saw a second gap. The companies building AI models need lawyers, doctors, scientists, financial analysts and engineers to teach and evaluate them — and those experts rarely know where to start. Our AI training practice recruits US-based professionals, prepares them for skills assessments and connects them with projects across the AI training ecosystem.",
    "Either way, every candidate gets a human point of contact, honest feedback and support that continues long after the first project or offer.",
  ],
};

const jobsPage: PageConfig & { headline: string; intro: string } = {
  path: "/jobs",
  label: "Jobs",
  title: "Remote Developer & AI Training Jobs",
  description:
    "Open remote roles: full-time developer jobs at US companies for talent worldwide, and flexible AI training jobs for US-based experts. Apply online in minutes.",
  keywords: ["remote developer jobs", "AI trainer jobs", "remote AI training jobs"],
  headline: "Open remote roles",
  intro:
    "Full-time developer roles with US companies, and flexible AI training work for US experts. Every role is 100% remote, and our team reviews every application.",
};

const aiTraining: PageConfig & {
  eyebrow: string;
  headline: string;
  intro: string;
  badges: Stat[];
} = {
  path: "/ai-training",
  label: "AI Training",
  title: "AI Training Jobs for US Experts — Remote & Flexible",
  description:
    "Get paid to train AI models with your expertise in law, medicine, finance, physics, chemistry, software and more. Remote, flexible AI trainer work for US citizens.",
  keywords: [
    "AI trainer jobs",
    "AI training jobs for US citizens",
    "remote AI training jobs",
    "expert AI trainer",
    "RLHF jobs",
    "AI tutor jobs",
    "train AI models from home",
    "AI data annotation jobs for experts",
  ],
  image: "/images/ai/ai-model-training-brain.jpg",
  eyebrow: "AI Training · For US experts",
  headline: "Get paid to train AI with what you know",
  intro:
    "AI models are only as good as the experts who teach them. BitCompass connects US-based professionals — lawyers, doctors, scientists, analysts, engineers and more — with flexible, paid AI training projects.",
  badges: [
    { value: "US", label: "Citizens only" },
    { value: "100%", label: "Remote" },
    { value: "Flexible", label: "Hours" },
    { value: "USD", label: "Hourly pay" },
  ],
};

const contact: PageConfig & { headline: string; intro: string } = {
  path: "/contact",
  label: "Contact",
  title: "Contact Us",
  description:
    "Get in touch with BitCompass about remote US developer jobs, AI training work for US experts, or hiring remote engineers. Email or call our team.",
  keywords: ["contact BitCompass", "IT recruiting agency contact"],
  image: "/images/contact/handshake-agreement.jpg",
  headline: "Let's talk",
  intro:
    "Questions about a role, AI training projects, your application or hiring through BitCompass? Reach out — a real person will get back to you.",
};

const blog: PageConfig & { headline: string } = {
  path: "/blog",
  label: "Blog",
  title: "Career Guides for Remote Developers & AI Trainers",
  description:
    "Practical guides on finding remote US developer jobs, writing a US-style resume, working with American teams and becoming a paid AI trainer.",
  keywords: ["remote developer career tips", "how to become an AI trainer"],
  headline: "Career guides for remote work",
};

const privacy: PageConfig = {
  path: "/privacy",
  label: "Privacy",
  title: "Privacy Policy",
  description:
    "How BitCompass collects, uses and protects the personal information and resumes you share when applying for remote jobs and AI training projects.",
};

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

const features: Feature[] = [
  {
    icon: "globe",
    title: "Work from anywhere",
    description:
      "Every role is remote. Keep living where you are and work on your schedule — full-time with a US team or flexible AI training hours.",
  },
  {
    icon: "dollar",
    title: "Paid in US dollars",
    description:
      "Earn US-market rates in USD, with clear contracts, transparent pay and on-time payments.",
  },
  {
    icon: "compass",
    title: "Career guidance",
    description:
      "Resume reviews, interview and assessment prep, and honest feedback from people who know the process.",
  },
  {
    icon: "shield",
    title: "Vetted clients & projects",
    description:
      "We work with established US companies and leading AI training platforms — real work, clear expectations.",
  },
  {
    icon: "users",
    title: "Apply once, match many",
    description:
      "Get vetted once and we match you with roles and projects that fit your skills, field and goals.",
  },
  {
    icon: "heart",
    title: "Support after you start",
    description:
      "From onboarding to your next opportunity, we stay in your corner long after day one.",
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
      "A short intro call, then a practical interview or skills assessment in your field — no trick puzzles.",
  },
  {
    title: "Get matched",
    description:
      "We match you with US companies or AI training projects that fit your skills, schedule and goals.",
  },
  {
    title: "Start working",
    description:
      "We prepare you for each step, help with onboarding and stay available as you grow.",
  },
];

const roles: { name: string; hiring: boolean; href?: `/${string}` }[] = [
  { name: "Full-Stack Web Developer", hiring: true, href: "/jobs/full-stack-web-developer" },
  { name: "AI Training Expert (US)", hiring: true, href: "/jobs/ai-training-expert" },
  { name: "Frontend Developer (React / Next.js)", hiring: false },
  { name: "Backend Developer (Node.js / Python)", hiring: false },
  { name: "Mobile Developer", hiring: false },
  { name: "DevOps & Cloud Engineer", hiring: false },
  { name: "QA Automation Engineer", hiring: false },
  { name: "Data Engineer", hiring: false },
];

const values: Value[] = [
  {
    title: "Transparency",
    description:
      "Clear pay, clear contracts and clear feedback. You always know where you stand.",
  },
  {
    title: "Talent first",
    description:
      "We only present work we would take ourselves, and we never charge candidates a fee.",
  },
  {
    title: "Long-term partnerships",
    description:
      "We look for engagements that last — for talent, companies and AI teams alike.",
  },
  {
    title: "Craft & communication",
    description:
      "Great work is half expertise, half communication. We help you excel at both.",
  },
];

const lookingFor: string[] = [
  "Deep expertise in your field, backed by education or real-world experience",
  "Clear written and spoken English",
  "Ownership: you deliver, you check your work, you follow through",
  "Comfort working independently and asynchronously",
  "A reliable internet connection and a quiet place to work",
];

/* ------------------------------------------------------------------ */
/* AI training                                                         */
/* ------------------------------------------------------------------ */

const aiFields: ExpertiseField[] = [
  { icon: "law", title: "Law", description: "Attorneys, paralegals and law graduates reviewing legal reasoning." },
  { icon: "medicine", title: "Medicine & healthcare", description: "Physicians, nurses, pharmacists and clinicians." },
  { icon: "physics", title: "Physics", description: "Physicists and engineers solving and checking problems." },
  { icon: "chemistry", title: "Chemistry", description: "Chemists and lab scientists across disciplines." },
  { icon: "biology", title: "Biology & life sciences", description: "Researchers in biology, genetics and biotech." },
  { icon: "math", title: "Mathematics & statistics", description: "Mathematicians, statisticians and actuaries." },
  { icon: "finance", title: "Finance & accounting", description: "Analysts, CPAs, CFAs and investment professionals." },
  { icon: "software", title: "Software engineering", description: "Engineers reviewing and writing code across languages." },
  { icon: "dataScience", title: "Data science & ML", description: "Data scientists and machine learning engineers." },
  { icon: "writing", title: "Writing & humanities", description: "Writers, editors, historians and language experts." },
  { icon: "business", title: "Business & consulting", description: "Consultants, marketers and operations specialists." },
  { icon: "idea", title: "Your field", description: "Talented at something else? Apply anyway — new projects open often." },
];

const aiTasks: string[] = [
  "Write challenging, realistic questions in your field and expert-level answers",
  "Evaluate and rank AI responses for accuracy, reasoning and safety",
  "Fact-check outputs and explain exactly what the model got wrong",
  "Write step-by-step solutions that teach models how to reason",
  "Review and write code for software engineering projects",
];

const aiSteps: Step[] = [
  {
    title: "Apply",
    description: "Tell us your field, education and experience and upload your resume — it takes two minutes.",
  },
  {
    title: "Assess & verify",
    description: "Complete a short skills assessment in your field and verify your identity and US citizenship.",
  },
  {
    title: "Get matched",
    description: "We match you with AI training projects that fit your expertise across our platform network.",
  },
  {
    title: "Work & get paid",
    description: "Choose when you work, deliver high-quality feedback, and get paid hourly in USD.",
  },
];

// Platforms in the AI training ecosystem BitCompass consults with.
// Confirm you're permitted to reference each name before publishing; remove any that don't apply.
const aiPlatforms: string[] = [
  "Mercor",
  "micro1",
  "DataAnnotation",
  "AfterQuery",
  "Handshake",
  "Snorkel AI",
  "Alignerr",
  "Outlier",
];

const aiRequirements: string[] = [
  "US citizen currently living in the United States",
  "Expertise in your field through a degree, certification or professional experience",
  "Excellent written English and strong attention to detail",
  "Able to pass a skills assessment and identity verification",
  "A computer with a reliable internet connection",
];

const faqs: Faq[] = [
  {
    question: "Who can apply to BitCompass?",
    answer:
      "Developers who live outside the United States can apply for our full-time remote roles with US companies. US citizens with expertise in any field can apply for AI training projects.",
  },
  {
    question: "Do I need to move to the US or have a US work visa?",
    answer:
      "No. Our developer roles are 100% remote. You keep living in your country and work with a US company online — no relocation or visa required.",
  },
  {
    question: "Does it cost anything to apply?",
    answer:
      "No. BitCompass is free for candidates. Our fees are paid by the companies and platforms we work with.",
  },
  {
    question: "How will I get paid?",
    answer:
      "You are paid in US dollars on a regular schedule, usually as an independent contractor. We explain the payment method and contract terms before you accept any offer.",
  },
  {
    question: "What working hours are expected?",
    answer:
      "Most developer teams ask for at least 4 hours of overlap with US business hours (Eastern to Pacific Time). The exact schedule is agreed with each company.",
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
      "Our team reviews every application. If your profile matches an open role, we contact you by email or phone within a few business days.",
  },
];

const aiFaqs: Faq[] = [
  {
    question: "What is AI training work?",
    answer:
      "AI companies improve their models with feedback from human experts. You write questions and model answers in your field, evaluate AI responses for accuracy and reasoning, and explain what the model got wrong — work often called RLHF or expert data annotation.",
  },
  {
    question: "Who can apply for AI training projects?",
    answer:
      "US citizens currently living in the United States who are talented in a specific field — law, medicine, physics, chemistry, biology, finance, mathematics, software engineering, writing and more. Students in advanced programs and experienced professionals are both welcome.",
  },
  {
    question: "Why do I need to be a US citizen?",
    answer:
      "The AI training projects we currently staff are restricted by our clients to US citizens residing in the United States. You'll be asked to verify citizenship and identity during onboarding.",
  },
  {
    question: "Do I need experience with AI or coding?",
    answer:
      "No. Expertise in your own field is what matters. Coding is only required for software engineering projects. We'll show you how the tools and guidelines work.",
  },
  {
    question: "How much does AI training pay?",
    answer:
      "Projects pay hourly in US dollars. Rates depend on your field, qualifications and the project — specialized experts such as physicians, attorneys and PhDs typically earn the highest rates.",
  },
  {
    question: "How many hours do I need to work?",
    answer:
      "It's flexible. Most projects let you choose when and how much you work, so it fits around a full-time job, studies or other commitments.",
  },
  {
    question: "Which platforms will I work on?",
    answer:
      "We consult across the AI training ecosystem, including platforms such as Mercor, micro1, DataAnnotation, AfterQuery, Handshake, Snorkel AI, Alignerr and Outlier. We match you with the projects that best fit your expertise.",
  },
];

/* ------------------------------------------------------------------ */
/* Job openings                                                        */
/* ------------------------------------------------------------------ */

const jobs: Job[] = [
  {
    slug: "full-stack-web-developer",
    track: "global",
    title: "Full-Stack Web Developer",
    seoTitle: "Remote Full-Stack Developer Job for US Companies",
    keywords: [
      "remote full-stack web developer jobs",
      "full-stack developer remote US",
      "remote React jobs",
      "remote Next.js jobs",
      "remote Node.js jobs",
    ],
    summary:
      "Build modern web applications for US companies using React, Next.js, Node.js and TypeScript — 100% remote from your home country, paid in USD.",
    image: "/images/jobs/full-stack-web-developer-remote.jpg",
    imageAlt: "Full-stack web developer working remotely on a laptop",
    open: true,
    employmentType: "FULL_TIME",
    employmentLabel: "Full-time",
    datePosted: "2026-10-03",
    validThrough: "2027-04-30",
    seniority: "Mid-level to Senior (3+ years)",
    location: "Remote — work from anywhere outside the US",
    timezone: "At least 4 hours overlap with US Eastern Time",
    tags: [
      { label: "100% Remote", icon: "globe" },
      { label: "Paid in USD", icon: "dollar" },
      { label: "Outside the US", icon: "flag" },
    ],
    compensation: "Competitive, paid in USD",
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
    industry: "Information Technology",
    occupationalCategory: "15-1254.00 Web Developers",
    skillsLabel: "Tech stack",
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
    application: { askCountry: true },
  },
  {
    slug: "ai-training-expert",
    track: "ai",
    title: "AI Training Expert",
    seoTitle: "Remote AI Trainer Jobs for US Experts",
    keywords: [
      "AI trainer jobs",
      "AI training jobs for US citizens",
      "remote AI training jobs",
      "legal AI trainer jobs",
      "medical AI trainer jobs",
      "physics AI trainer jobs",
      "chemistry AI trainer jobs",
      "finance AI trainer jobs",
      "coding AI trainer jobs",
      "RLHF jobs",
    ],
    summary:
      "Use your expertise in law, medicine, finance, physics, chemistry, software engineering or another field to train and evaluate AI models. Remote, flexible, paid hourly — open to US citizens.",
    image: "/images/ai/ai-model-training-brain.jpg",
    imageAlt: "Illustration of a glowing brain representing AI model training",
    open: true,
    employmentType: ["CONTRACTOR", "PART_TIME"],
    employmentLabel: "Contract · flexible hours",
    datePosted: "2026-10-19",
    validThrough: "2027-04-30",
    seniority: "All levels — students in advanced programs to senior professionals",
    location: "Remote — United States",
    timezone: "Flexible — choose your own hours",
    tags: [
      { label: "US citizens", icon: "flag" },
      { label: "100% Remote", icon: "globe" },
      { label: "Flexible hours", icon: "clock" },
    ],
    compensation: "Hourly, paid in USD — based on field and expertise",
    // Uncomment and adjust to show a pay range (recommended for Google Jobs):
    // salary: { min: 25, max: 150, currency: "USD", unit: "HOUR" },
    applicantCountries: ["United States"],
    industry: "Artificial Intelligence",
    skillsLabel: "Fields we're hiring for",
    skills: [
      "Law",
      "Medicine",
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Finance",
      "Accounting",
      "Software Engineering",
      "Data Science",
      "Writing",
      "And more",
    ],
    description: [
      "BitCompass is recruiting US-based experts to train and evaluate the AI models built by leading AI labs. If you're talented at something — law, medicine, physics, chemistry, finance, software engineering or another field — your knowledge can make AI more accurate, safer and more useful.",
      "You'll work on projects across the AI training ecosystem, choosing when and how much you work. No prior AI experience is needed: we help you prepare for the skills assessment and get started.",
    ],
    responsibilities: [
      "Write challenging, realistic questions and expert-level answers in your field",
      "Evaluate, rank and correct AI-generated responses for accuracy and reasoning",
      "Explain clearly where and why a model's answer is wrong",
      "Write step-by-step solutions that teach models how to reason",
      "Follow project guidelines and deliver consistent, high-quality feedback",
    ],
    requirements: [
      "US citizen currently residing in the United States",
      "Expertise in a specific field through a degree, certification or professional experience",
      "Excellent written English and strong attention to detail",
      "Able to pass a skills assessment in your field",
      "Able to complete identity and citizenship verification",
      "A computer with a reliable internet connection",
    ],
    niceToHave: [
      "Advanced degree (Master's, PhD, JD, MD or equivalent)",
      "Professional license or certification (e.g. bar admission, RN, CPA, CFA, PE)",
      "Teaching, tutoring or research experience",
      "Previous AI training, RLHF or data annotation experience",
    ],
    benefits: [
      "Competitive hourly pay in US dollars",
      "Fully remote — work from anywhere in the US",
      "Flexible schedule that fits around your job or studies",
      "Access to projects across leading AI training platforms",
      "Assessment prep and onboarding support from BitCompass",
      "Help shape how the next generation of AI understands your field",
    ],
    application: { askExpertise: true, requireUsCitizen: true },
  },
];

export {
  company,
  navigation,
  tracks,
  home,
  about,
  jobsPage,
  aiTraining,
  contact,
  blog,
  privacy,
  features,
  steps,
  roles,
  values,
  lookingFor,
  aiFields,
  aiTasks,
  aiSteps,
  aiPlatforms,
  aiRequirements,
  faqs,
  aiFaqs,
  jobs,
};
