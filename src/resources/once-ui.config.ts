import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { site } from "./site";

// Used for canonical URLs, sitemap, Open Graph and structured data.
// Set NEXT_PUBLIC_SITE_URL in your env file to your production domain.
const baseURL: string = site.url;

const display: DisplayConfig = {
  themeSwitcher: true,
};

// Import and set font for each variant
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

// Brand font — used for display text and headings
const heading = localFont({
  src: "./fonts/SuezOne-Regular.ttf",
  variable: "--font-heading",
  weight: "400",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
// The "custom" brand palette is defined in resources/custom.css around #5371FF.
const style: StyleConfig = {
  theme: "system", // dark | light | system
  neutral: "slate", // sand | gray | slate | mint | rose | dusk | custom
  brand: "custom", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "color", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "rounded", // rounded | playful | conservative | sharp
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 50,
    x: 50,
    y: 0,
    width: 100,
    height: 60,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 30,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: true,
    pinterest: false,
    whatsapp: true,
    reddit: false,
    telegram: true,
    email: true,
    copyLink: true,
  },
};

export { display, baseURL, fonts, style, socialSharing, effects, dataStyle };
