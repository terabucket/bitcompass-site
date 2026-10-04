import type { Metadata } from "next";
import type { Faq, Job, PageConfig } from "@/types";
import { absoluteUrl, company, site, socialLinks } from "@/resources";

/** URL of the branded, auto-generated Open Graph image for a title. */
export const ogImageUrl = (title: string) => `/api/og/generate?title=${encodeURIComponent(title)}`;

type MetadataInput = Pick<PageConfig, "title" | "description" | "path"> & {
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Use the raw title (no " | BitCompass" suffix) */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/**
 * Builds complete page metadata: title, description, keywords, canonical URL,
 * Open Graph and Twitter cards.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  type = "website",
  publishedTime,
  absoluteTitle = false,
  noIndex = false,
}: MetadataInput): Metadata {
  const shareImage = image || ogImageUrl(title);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: Array.from(new Set([...keywords, ...company.keywords])),
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      images: [{ url: shareImage, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD) — https://schema.org                      */
/* ------------------------------------------------------------------ */

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/brand/logo-vertical.png"),
    image: absoluteUrl("/brand/logo-horizontal.png"),
    description: company.description,
    slogan: company.tagline,
    areaServed: ["United States", ...company.regions],
    knowsAbout: [
      "Remote software engineering jobs",
      "IT recruitment",
      "Full-stack web development",
      "Distributed teams",
    ],
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.address ? { address: site.contact.address } : {}),
    ...(site.contact.email || site.contact.phone
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "recruiting",
              availableLanguage: ["English"],
              ...(site.contact.email ? { email: site.contact.email } : {}),
              ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
            },
          ],
        }
      : {}),
    sameAs: socialLinks.map((item) => item.link),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: company.description,
    inLanguage: site.language,
    publisher: { "@id": organizationId },
  };
}

export function webPageSchema(page: Pick<PageConfig, "title" | "description" | "path">) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: site.language,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Google for Jobs structured data.
 * https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
export function jobPostingSchema(job: Job) {
  const html = [
    ...job.description.map((p) => `<p>${p}</p>`),
    "<h3>Responsibilities</h3>",
    `<ul>${job.responsibilities.map((i) => `<li>${i}</li>`).join("")}</ul>`,
    "<h3>Requirements</h3>",
    `<ul>${job.requirements.map((i) => `<li>${i}</li>`).join("")}</ul>`,
    "<h3>Benefits</h3>",
    `<ul>${job.benefits.map((i) => `<li>${i}</li>`).join("")}</ul>`,
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: html,
    identifier: { "@type": "PropertyValue", name: site.name, value: job.slug },
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59`,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: absoluteUrl("/brand/logo-vertical.png"),
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: job.applicantCountries.map((name) => ({
      "@type": "Country",
      name,
    })),
    directApply: true,
    skills: job.skills.join(", "),
    qualifications: job.requirements.join(" "),
    responsibilities: job.responsibilities.join(" "),
    jobBenefits: job.benefits.join(" "),
    industry: "Information Technology",
    occupationalCategory: "15-1254.00 Web Developers",
    url: absoluteUrl(`/jobs/${job.slug}`),
    image: absoluteUrl(job.image),
    ...(job.salary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.salary.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salary.min,
              maxValue: job.salary.max,
              unitText: job.salary.unit,
            },
          },
        }
      : {}),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: absoluteUrl(post.path),
    url: absoluteUrl(post.path),
    inLanguage: site.language,
    author: { "@id": organizationId, "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": organizationId },
  };
}
