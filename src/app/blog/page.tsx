import { Column } from "@once-ui-system/core";
import { CtaBanner, JsonLd, SectionHeading } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { absoluteUrl, blog, site } from "@/resources";
import { breadcrumbSchema, buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata(blog);

export default function Blog() {
  return (
    <Column maxWidth="l" fillWidth gap="64">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} — ${blog.headline}`,
            description: blog.description,
            url: absoluteUrl(blog.path),
            publisher: { "@id": `${site.url}/#organization` },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: blog.path },
          ]),
        ]}
      />
      <Column fillWidth horizontal="center">
        <SectionHeading as="h1" eyebrow="BitCompass blog" title={blog.headline} description={blog.description} />
      </Column>
      <Column fillWidth gap="16">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2]} columns="2" thumbnail direction="column" />
      </Column>
      <CtaBanner />
    </Column>
  );
}
