import { Card, Column, Heading, Icon, Media, Row, Tag, Text } from "@once-ui-system/core";
import type { Job } from "@/types";

export function JobCard({ job, priority = false }: { job: Job; priority?: boolean }) {
  return (
    <Card
      as="article"
      fillWidth
      href={`/jobs/${job.slug}`}
      direction="row"
      radius="l"
      border="neutral-alpha-medium"
      background="surface"
      padding="12"
      gap="24"
      transition="micro-medium"
      s={{ direction: "column" }}
    >
      <Column flex={2} minWidth={16} s={{ minWidth: 0 }} fillWidth>
        <Media
          src={job.image}
          alt={`${job.title} — remote job`}
          aspectRatio="4 / 3"
          radius="m"
          sizes="(max-width: 768px) 100vw, 360px"
          priority={priority}
        />
      </Column>
      <Column flex={3} gap="16" paddingY="12" paddingRight="12" s={{ paddingX: "8" }}>
        <Row gap="8" wrap>
          <Tag variant="brand" size="m" prefixIcon="sparkles">
            {job.open ? "Hiring now" : "Closed"}
          </Tag>
          <Tag variant="neutral" size="m" prefixIcon="globe">
            100% Remote
          </Tag>
        </Row>
        <Heading as="h3" variant="heading-strong-xl">
          {job.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {job.summary}
        </Text>
        <Column gap="8">
          <Row gap="8" vertical="center">
            <Icon name="briefcase" size="xs" onBackground="brand-weak" />
            <Text variant="body-default-s">{job.seniority}</Text>
          </Row>
          <Row gap="8" vertical="center">
            <Icon name="clock" size="xs" onBackground="brand-weak" />
            <Text variant="body-default-s">{job.timezone}</Text>
          </Row>
        </Column>
        <Row gap="8" wrap>
          {job.skills.slice(0, 6).map((skill) => (
            <Tag key={skill} size="s" variant="neutral">
              {skill}
            </Tag>
          ))}
        </Row>
        <Row gap="4" vertical="center">
          <Text variant="label-strong-m" onBackground="brand-weak">
            View role & apply
          </Text>
          <Icon name="arrowRight" size="xs" onBackground="brand-weak" />
        </Row>
      </Column>
    </Card>
  );
}
