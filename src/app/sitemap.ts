import type { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { absoluteUrl, jobs } from "@/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/jobs"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const jobPages: MetadataRoute.Sitemap = jobs
    .filter((job) => job.open)
    .map((job) => ({
      url: absoluteUrl(`/jobs/${job.slug}`),
      lastModified: new Date(job.datePosted),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [absoluteUrl(job.image)],
    }));

  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
    ...(post.metadata.image ? { images: [absoluteUrl(post.metadata.image)] } : {}),
  }));

  return [...pages, ...jobPages, ...posts];
}
