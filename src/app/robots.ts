import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/resources";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // The OG image endpoint stays crawlable so social previews render
        allow: ["/", "/api/og/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
