import { notFound } from "next/navigation";
import {
  Button,
  Column,
  Heading,
  Icon,
  Line,
  List,
  ListItem,
  Media,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import { FaqList, JsonLd, ScrollToHash } from "@/components";
import { ApplyForm } from "@/components/jobs/ApplyForm";
import { faqs, jobs, site } from "@/resources";
import { breadcrumbSchema, buildMetadata, jobPostingSchema } from "@/utils/seo";
import type { Job } from "@/types";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

const findJob = async (params: Params["params"]) => {
  const { slug } = await params;
  return jobs.find((job) => job.slug === slug);
};

export async function generateMetadata({ params }: Params) {
  const job = await findJob(params);
  if (!job) return {};
  return buildMetadata({
    title: `Remote ${job.title} Job for US Companies`,
    description: `${job.summary.slice(0, 150)}`,
    path: `/jobs/${job.slug}`,
    keywords: [
      `remote ${job.title.toLowerCase()} jobs`,
      `${job.title.toLowerCase()} remote US`,
      ...job.skills.map((s) => `remote ${s} jobs`),
    ],
  });
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <Column gap="12" fillWidth>
      <Heading as="h2" variant="heading-strong-l">
        {title}
      </Heading>
      <List as="ul">
        {items.map((item) => (
          <ListItem key={item} marginBottom="8" style={{ lineHeight: "170%" }}>
            {item}
          </ListItem>
        ))}
      </List>
    </Column>
  );
}

function Summary({ job }: { job: Job }) {
  const items = [
    { icon: "globe", label: "Location", value: job.location },
    { icon: "briefcase", label: "Type", value: job.employmentType === "CONTRACTOR" ? "Contract" : "Full-time" },
    { icon: "academic", label: "Seniority", value: job.seniority },
    { icon: "clock", label: "Schedule", value: job.timezone },
    {
      icon: "dollar",
      label: "Compensation",
      value: job.salary
        ? `$${job.salary.min.toLocaleString()} – $${job.salary.max.toLocaleString()} USD / ${job.salary.unit.toLowerCase()}`
        : "Competitive, paid in USD",
    },
  ];
  return (
    <Column gap="16" padding="24" radius="l" border="neutral-alpha-medium" background="surface" fillWidth>
      {items.map((item) => (
        <Row key={item.label} gap="12" vertical="start">
          <Row padding="8" radius="m" background="brand-alpha-weak">
            <Icon name={item.icon} size="s" onBackground="brand-weak" />
          </Row>
          <Column gap="2">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {item.label}
            </Text>
            <Text variant="body-default-s">{item.value}</Text>
          </Column>
        </Row>
      ))}
      {job.open && (
        <Button href="#apply" fillWidth size="l" arrowIcon data-border="rounded">
          Apply for this job
        </Button>
      )}
    </Column>
  );
}

export default async function JobPage({ params }: Params) {
  const job = await findJob(params);
  if (!job) notFound();

  return (
    <Column maxWidth="l" fillWidth gap="48">
      <JsonLd
        data={[
          ...(job.open ? [jobPostingSchema(job)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Jobs", path: "/jobs" },
            { name: job.title, path: `/jobs/${job.slug}` },
          ]),
        ]}
      />

      {/* Header */}
      <Column gap="20" fillWidth>
        <Row as="nav" aria-label="Breadcrumb" gap="8" vertical="center">
          <SmartLink href="/jobs">Jobs</SmartLink>
          <Text onBackground="neutral-weak" aria-hidden>
            /
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak" aria-current="page">
            {job.title}
          </Text>
        </Row>
        <Row gap="8" wrap>
          <Tag variant="brand" size="l" prefixIcon="sparkles">
            {job.open ? "Hiring now" : "Position closed"}
          </Tag>
          <Tag variant="neutral" size="l" prefixIcon="globe">
            100% Remote
          </Tag>
          <Tag variant="neutral" size="l" prefixIcon="dollar">
            Paid in USD
          </Tag>
        </Row>
        <Heading as="h1" variant="display-strong-m" wrap="balance">
          Remote {job.title}
        </Heading>
        <Text variant="body-default-xl" onBackground="neutral-weak" wrap="balance">
          {job.summary}
        </Text>
      </Column>

      <Row fillWidth gap="48" vertical="start" m={{ direction: "column" }}>
        {/* Main description */}
        <Column as="article" flex={2} gap="40" fillWidth>
          <Media
            src={job.image}
            alt={`${job.title} working remotely on a laptop`}
            aspectRatio="16 / 9"
            radius="l"
            border="neutral-alpha-weak"
            priority
            sizes="(max-width: 1024px) 100vw, 760px"
          />
          <Column gap="12">
            <Heading as="h2" variant="heading-strong-l">
              About the role
            </Heading>
            {job.description.map((p) => (
              <Text key={p} as="p" variant="body-default-l" onBackground="neutral-medium" style={{ lineHeight: "175%" }}>
                {p}
              </Text>
            ))}
          </Column>
          <Column gap="12">
            <Heading as="h2" variant="heading-strong-l">
              Tech stack
            </Heading>
            <Row gap="8" wrap>
              {job.skills.map((skill) => (
                <Tag key={skill} size="l" variant="neutral">
                  {skill}
                </Tag>
              ))}
            </Row>
          </Column>
          <Section title="What you'll do" items={job.responsibilities} />
          <Section title="What we're looking for" items={job.requirements} />
          <Section title="Nice to have" items={job.niceToHave} />
          <Section title="What you get" items={job.benefits} />
        </Column>

        {/* Sticky summary */}
        <Column flex={1} fillWidth position="sticky" top="104" m={{ position: "relative", top: "0" }}>
          <Summary job={job} />
        </Column>
      </Row>

      <Line background="neutral-alpha-weak" />

      {/* Apply */}
      <Row as="section" id="apply" aria-labelledby="apply-title" fillWidth gap="48" vertical="start" m={{ direction: "column" }}>
        <Column flex={1} gap="16">
          <Text variant="label-strong-s" onBackground="brand-weak" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Apply in 2 minutes
          </Text>
          <Heading as="h2" id="apply-title" variant="display-strong-xs" wrap="balance">
            Apply for the {job.title} role
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak">
            Share your basic details and resume. No cover letter needed — our recruiting team reviews
            every application and replies to matching candidates within a few business days.
          </Text>
          {site.contact.email && (
            <Text variant="body-default-s" onBackground="neutral-weak">
              Having trouble? Email your resume to{" "}
              <SmartLink href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`${job.title} application`)}`}>
                {site.contact.email}
              </SmartLink>
              .
            </Text>
          )}
        </Column>
        <Column flex={2} fillWidth padding="32" radius="xl" border="neutral-alpha-medium" background="surface" s={{ padding: "20" }}>
          {job.open ? (
            <ApplyForm jobSlug={job.slug} jobTitle={job.title} />
          ) : (
            <Text variant="body-default-m" onBackground="neutral-weak">
              This position is no longer accepting applications. See our{" "}
              <SmartLink href="/jobs">other open roles</SmartLink>.
            </Text>
          )}
        </Column>
      </Row>

      <Column as="section" aria-labelledby="job-faq-title" fillWidth gap="24">
        <Heading as="h2" id="job-faq-title" variant="heading-strong-xl">
          Frequently asked questions
        </Heading>
        <FaqList items={faqs.slice(0, 5)} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
