import type { MetadataRoute } from "next";
import { company, site } from "@/resources";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${company.tagline}`,
    short_name: site.name,
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: site.brandColor,
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
