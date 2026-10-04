import { NextResponse } from "next/server";
import { getPosts } from "@/utils/utils";
import { absoluteUrl, blog, site } from "@/resources";

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export async function GET() {
  const posts = getPosts().sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — ${blog.headline}`)}</title>
    <link>${absoluteUrl(blog.path)}</link>
    <description>${escapeXml(blog.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/api/rss")}" rel="self" type="application/rss+xml" />
    <image>
      <url>${absoluteUrl("/brand/icon-192.png")}</url>
      <title>${escapeXml(site.name)}</title>
      <link>${absoluteUrl(blog.path)}</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid>${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.metadata.summary}]]></description>
      ${post.metadata.image ? `<enclosure url="${absoluteUrl(post.metadata.image)}" type="image/jpeg" length="0" />` : ""}
      ${post.metadata.tag ? `<category>${escapeXml(post.metadata.tag)}</category>` : ""}
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
