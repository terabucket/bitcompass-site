import Image from "next/image";
import {
  Badge,
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Icon,
  Media,
  RevealFx,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import { CtaBanner, FaqList, JsonLd, SectionHeading } from "@/components";
import { JobCard } from "@/components/jobs/JobCard";
import { Posts } from "@/components/blog/Posts";
import { company, faqs, features, home, jobs, roles, steps } from "@/resources";
import { buildMetadata, faqSchema, webPageSchema } from "@/utils/seo";
import styles from "@/components/home/Home.module.scss";

export const metadata = buildMetadata({
  title: `${home.title} | BitCompass`,
  absoluteTitle: true,
  description: home.description,
  path: home.path,
  keywords: home.keywords,
});

export default function Home() {
  const openJobs = jobs.filter((job) => job.open);
  const featuredJob = openJobs[0];

  return (
    <Column maxWidth="l" fillWidth gap="104" s={{ gap: "80" }}>
      <JsonLd data={[webPageSchema(home), faqSchema(faqs)]} />

      {/* Hero */}
      <Row as="section" aria-labelledby="hero-title" fillWidth gap="48" vertical="center" m={{ direction: "column" }} paddingTop="24">
        <Column flex={6} gap="24" m={{ horizontal: "center", align: "center" }}>
          {featuredJob && (
            <RevealFx translateY="4" fitWidth>
              <Badge
                background="brand-alpha-weak"
                border="brand-alpha-medium"
                paddingX="12"
                paddingY="4"
                onBackground="brand-strong"
                textVariant="label-default-s"
                href={`/jobs/${featuredJob.slug}`}
                arrow
              >
                {home.badge}
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="8" delay={0.1}>
            <Heading as="h1" id="hero-title" variant="display-strong-l" wrap="balance">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text as="p" variant="body-default-xl" onBackground="neutral-weak" wrap="balance">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.3}>
            <Row gap="12" wrap m={{ horizontal: "center" }}>
              {featuredJob && (
                <Button href={`/jobs/${featuredJob.slug}#apply`} size="l" arrowIcon data-border="rounded">
                  Apply now
                </Button>
              )}
              <Button href="#how-it-works" size="l" variant="secondary" data-border="rounded">
                How it works
              </Button>
            </Row>
          </RevealFx>
          <RevealFx translateY="8" delay={0.4}>
            <Grid columns="4" s={{ columns: 2 }} gap="12" fillWidth paddingTop="16">
              {home.highlights.map((item) => (
                <Column key={item.label} gap="4" padding="12" radius="m" border="neutral-alpha-weak" background="surface">
                  <Text variant="heading-strong-l" className="font-heading text-brand">
                    {item.value}
                  </Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {item.label}
                  </Text>
                </Column>
              ))}
            </Grid>
          </RevealFx>
        </Column>
        <Column flex={5} fillWidth position="relative">
          <RevealFx translateY="16" delay={0.2}>
            <div className={styles.heroImage}>
              <Image
                src="/images/hero/remote-developer-working-from-cafe.jpg"
                alt="Software developers working remotely on laptops for US companies"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </RevealFx>
          {featuredJob && (
            <Card
              href={`/jobs/${featuredJob.slug}`}
              className={styles.floatingCard}
              padding="16"
              gap="12"
              radius="l"
              border="neutral-alpha-medium"
              background="page"
              shadow="xl"
              vertical="center"
            >
              <Row radius="m" padding="8" background="brand-alpha-weak" vertical="center">
                <Icon name="code" onBackground="brand-weak" size="m" />
              </Row>
              <Column gap="2">
                <Text variant="label-strong-m">{featuredJob.title}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Remote · US companies · Paid in USD
                </Text>
              </Column>
            </Card>
          )}
        </Column>
      </Row>

      {/* Why BitCompass */}
      <Column as="section" aria-labelledby="why-title" fillWidth gap="40" horizontal="center">
        <SectionHeading
          id="why-title"
          eyebrow="Why BitCompass"
          title="Remote US jobs, without the guesswork"
          description="We handle the hard parts of landing a job with a US company from abroad, so you can focus on doing great work."
        />
        <Grid columns="3" m={{ columns: 2 }} s={{ columns: 1 }} gap="16" fillWidth>
          {features.map((feature) => (
            <Column
              key={feature.title}
              as="article"
              gap="12"
              padding="24"
              radius="l"
              border="neutral-alpha-weak"
              background="surface"
            >
              <Row radius="m" padding="8" background="brand-alpha-weak" fitWidth>
                <Icon name={feature.icon} onBackground="brand-weak" size="m" />
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                {feature.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {feature.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      {/* How it works */}
      <Row as="section" id="how-it-works" aria-labelledby="how-title" fillWidth gap="48" vertical="center" m={{ direction: "column-reverse" }}>
        <Column flex={1} fillWidth>
          <Media
            src="/images/process/remote-video-interview.jpg"
            alt="Candidate in a remote video interview with a US hiring team"
            aspectRatio="4 / 3"
            radius="xl"
            border="neutral-alpha-weak"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Column>
        <Column flex={1} gap="32">
          <SectionHeading
            id="how-title"
            align="start"
            eyebrow="How it works"
            title="From application to offer in four steps"
            description="A simple, transparent process with a real person guiding you at every stage."
          />
          <Column as="ol" gap="20" margin="0" padding="0" style={{ listStyle: "none" }}>
            {steps.map((step, index) => (
              <Row as="li" key={step.title} gap="16" vertical="start">
                <Row
                  center
                  radius="full"
                  background="brand-alpha-weak"
                  border="brand-alpha-medium"
                  minWidth="40"
                  minHeight="40"
                  className="font-heading text-brand"
                  aria-hidden
                >
                  {index + 1}
                </Row>
                <Column gap="4">
                  <Heading as="h3" variant="heading-strong-m">
                    {step.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {step.description}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Column>
      </Row>

      {/* Open roles */}
      <Column as="section" aria-labelledby="roles-title" fillWidth gap="40" horizontal="center">
        <SectionHeading
          id="roles-title"
          eyebrow="Open roles"
          title="Remote developer jobs at US companies"
          description="Full-time, long-term roles with US product teams. Work from your home country and get paid in US dollars."
        />
        <Column fillWidth gap="16">
          {openJobs.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </Column>
        <Column fillWidth gap="16" horizontal="center" align="center">
          <Text variant="label-default-m" onBackground="neutral-weak">
            Roles we place
          </Text>
          <Row gap="8" wrap horizontal="center">
            {roles.map((role) =>
              role.hiring && role.href ? (
                <Tag key={role.name} size="l" variant="brand" prefixIcon="sparkles">
                  {role.name}
                </Tag>
              ) : (
                <Tag key={role.name} size="l" variant="neutral">
                  {role.name}
                </Tag>
              ),
            )}
          </Row>
        </Column>
      </Column>

      {/* Global talent band */}
      <Column as="section" aria-labelledby="global-title" className={styles.band} fillWidth radius="xl" overflow="hidden" position="relative">
        <Image
          src="/images/hero/global-tech-talent-network.jpg"
          alt="Night view of Earth showing connected cities around the world"
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className={styles.bandImage}
        />
        <Column className={styles.bandOverlay} fill position="absolute" />
        <Column position="relative" gap="20" paddingX="64" paddingY="104" maxWidth="s" s={{ paddingX: "24", paddingY: "64" }}>
          <Text variant="label-strong-s" className={styles.bandEyebrow}>
            BUILT FOR GLOBAL TALENT
          </Text>
          <Heading as="h2" id="global-title" variant="display-strong-xs" className={styles.bandText}>
            Great engineers live everywhere. Now they can work anywhere.
          </Heading>
          <Text variant="body-default-l" className={styles.bandMuted}>
            Whether you code from São Paulo, Kraków, Lagos, Manila or Bangalore, BitCompass connects
            you with US companies looking for exactly your skills — no visa, no relocation.
          </Text>
          <Row gap="8" wrap>
            {company.regions.map((region) => (
              <span key={region} className={styles.bandChip}>
                {region}
              </span>
            ))}
          </Row>
        </Column>
      </Column>

      {/* FAQ */}
      <Row as="section" id="faq" aria-labelledby="faq-title" fillWidth gap="48" m={{ direction: "column" }}>
        <Column flex={2} gap="16">
          <SectionHeading
            id="faq-title"
            align="start"
            eyebrow="FAQ"
            title="Questions from IT talent"
            description="Everything you need to know about working remotely for a US company through BitCompass."
          />
          <Button href="/contact" variant="secondary" size="m" prefixIcon="chat" data-border="rounded">
            Ask us anything
          </Button>
        </Column>
        <Column flex={3} fillWidth>
          <FaqList items={faqs} />
        </Column>
      </Row>

      {/* Blog */}
      <Column as="section" aria-labelledby="blog-title" fillWidth gap="32">
        <Row fillWidth horizontal="between" vertical="end" gap="16" s={{ direction: "column", vertical: "start" }}>
          <SectionHeading
            id="blog-title"
            align="start"
            eyebrow="Career guides"
            title="Learn how to land a US remote job"
          />
          <Button href="/blog" variant="tertiary" size="m" suffixIcon="arrowRight">
            All guides
          </Button>
        </Row>
        <Posts range={[1, 3]} columns="3" thumbnail direction="column" />
      </Column>

      <CtaBanner />
    </Column>
  );
}
