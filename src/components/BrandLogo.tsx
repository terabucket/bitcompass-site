import Image from "next/image";
import { site } from "@/resources";

type BrandLogoProps = {
  variant?: "horizontal" | "mark" | "vertical";
  /** Rendered height in px */
  height?: number;
  priority?: boolean;
  className?: string;
};

// Intrinsic sizes of the trimmed files in /public/brand
const sources = {
  horizontal: { light: "/brand/logo-horizontal.png", dark: "/brand/logo-horizontal-dark.png", w: 791, h: 160 },
  mark: { light: "/brand/logo-mark.png", dark: "/brand/logo-mark-dark.png", w: 268, h: 256 },
  vertical: { light: "/brand/logo-vertical.png", dark: "/brand/logo-vertical-dark.png", w: 553, h: 400 },
};

/** BitCompass logo that swaps to the white version in dark mode. */
export function BrandLogo({ variant = "horizontal", height = 32, priority, className }: BrandLogoProps) {
  const src = sources[variant];
  const width = Math.round((src.w / src.h) * height);

  return (
    <span className={className} style={{ display: "inline-flex", height, width }}>
      <Image
        className="logo-on-light"
        src={src.light}
        alt={`${site.name} logo`}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
      />
      <Image
        className="logo-on-dark"
        src={src.dark}
        alt={`${site.name} logo`}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
      />
    </span>
  );
}
