// Site-wide settings that change per environment.
// Set these in `.env.local` (development) or your hosting provider's env settings (production).
// NEXT_PUBLIC_* values are inlined at build time, so rebuild/redeploy after changing them.

const clean = (value: string | undefined) => (value ?? "").trim();

const siteUrl = clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000";

export const site = {
  name: "BitCompass",
  url: siteUrl.replace(/\/$/, ""),
  locale: "en_US",
  language: "en",
  brandColor: "#5371FF",
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    whatsapp: clean(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP),
    address: clean(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
    hours: clean(process.env.NEXT_PUBLIC_CONTACT_HOURS) || "Mon – Fri, 9:00 – 18:00 (US Eastern Time)",
  },
  social: {
    linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    x: clean(process.env.NEXT_PUBLIC_X_URL),
    facebook: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    github: clean(process.env.NEXT_PUBLIC_GITHUB_URL),
  },
  verification: {
    google: clean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
    bing: clean(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),
  },
} as const;

/** Builds an absolute URL for SEO tags, sitemaps and structured data. */
export const absoluteUrl = (path = "/") =>
  path.startsWith("http") ? path : `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Digits-only phone for tel: and WhatsApp links. */
export const phoneHref = (phone: string) => phone.replace(/[^\d+]/g, "");

export const socialLinks = [
  { name: "LinkedIn", icon: "linkedin", link: site.social.linkedin },
  { name: "X", icon: "x", link: site.social.x },
  { name: "Facebook", icon: "facebook", link: site.social.facebook },
  { name: "Instagram", icon: "instagram", link: site.social.instagram },
  { name: "GitHub", icon: "github", link: site.social.github },
].filter((item) => item.link);
