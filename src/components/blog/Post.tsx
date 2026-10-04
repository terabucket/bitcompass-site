"use client";

import { Card, Column, Media, Row, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import type { Post as PostType } from "@/utils/utils";

interface PostProps {
  post: PostType;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Card
      as="article"
      fillWidth
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="neutral-alpha-weak"
      background="surface"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <Media
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={post.metadata.image}
          alt={post.metadata.imageAlt || post.metadata.title}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column maxWidth={32} paddingY="24" paddingX="l" gap="12" vertical="center">
          <Row gap="12" vertical="center" wrap>
            {post.metadata.tag && (
              <Text variant="label-strong-s" onBackground="brand-weak">
                {post.metadata.tag}
              </Text>
            )}
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text as="h3" variant="heading-strong-l" wrap="balance" data-exclude-nav>
            {post.metadata.title}
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.summary}
          </Text>
        </Column>
      </Row>
    </Card>
  );
}
