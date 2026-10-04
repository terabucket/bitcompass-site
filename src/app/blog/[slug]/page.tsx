import { notFound } from "next/navigation";
import { Column, Heading, HeadingNav, Line, Media, Row, SmartLink, Text } from "@once-ui-system/core";
import { CtaBanner, CustomMDX, JsonLd, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { blog, site } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { articleSchema, breadcrumbSchema, buildMetadata, ogImageUrl } from "@/utils/seo";
import { getPosts } from "@/utils/utils";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

const findPost = async (params: Params["params"]) => {
  const { slug } = await params;
  return getPosts().find((post) => post.slug === slug);
};

export async function generateMetadata({ params }: Params) {
  const post = await findPost(params);
  if (!post) return {};

  return buildMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `${blog.path}/${post.slug}`,
    image: post.metadata.image || undefined,
    type: "article",
    publishedTime: post.metadata.publishedAt,
    keywords: post.metadata.keywords,
  });
}

export default async function BlogPost({ params }: Params) {
  const post = await findPost(params);
  if (!post) notFound();

  const path = `${blog.path}/${post.slug}`;

  return (
    <Row fillWidth maxWidth="l">
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" fillWidth>
          <JsonLd
            data={[
              articleSchema({
                title: post.metadata.title,
                description: post.metadata.summary,
                path,
                image: post.metadata.image || ogImageUrl(post.metadata.title),
                publishedAt: post.metadata.publishedAt,
              }),
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Blog", path: blog.path },
                { name: post.metadata.title, path },
              ]),
            ]}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Career guides</Text>
            </SmartLink>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
              {" · "}By the {site.name} team
            </Text>
            <Heading as="h1" variant="display-strong-m" wrap="balance">
              {post.metadata.title}
            </Heading>
            {post.metadata.subtitle && (
              <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance">
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.imageAlt || post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s" fillWidth>
            <CustomMDX source={post.content} />
          </Column>

          <ShareSection title={post.metadata.title} url={`${site.url}${path}`} />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Heading as="h2" id="recent-posts" variant="heading-strong-xl" data-exclude-nav>
              More career guides
            </Heading>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
          </Column>
          <CtaBanner />
          <ScrollToHash />
        </Column>
      </Row>
      <Column maxWidth={12} paddingLeft="40" fitHeight position="sticky" top="104" gap="16" m={{ hide: true }}>
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
