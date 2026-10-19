import Image from "next/image";
import {
  Button,
  Column,
  Grid,
  Heading,
  Icon,
  Media,
  RevealFx,
  Row,
  Text,
} from "@once-ui-system/core";
import { CtaBanner, FaqList, JsonLd, SectionHeading } from "@/components";
import { JobCard } from "@/components/jobs/JobCard";
import {
  aiFaqs,
  aiFields,
  aiPlatforms,
  aiRequirements,
  aiSteps,
  aiTasks,
  aiTraining,
  jobs,
} from "@/resources";
import { breadcrumbSchema, buildMetadata, faqSchema, webPageSchema } from "@/utils/seo";
import styles from "@/components/home/Home.module.scss";

export const metadata = buildMetadata(aiTraining);

export default function AiTrainingPage() {
  const aiJobs = jobs.filter((job) => job.track === "ai" && job.open);
  const applyHref = aiJobs[0] ? `/jobs/${aiJobs[0].slug}#apply` : "/jobs";

  return (
    <Column maxWidth="l" fillWidth gap="104" s={{ gap: "80" }}>
      <JsonLd
        data={[
          webPageSchema(aiTraining),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Training", path: aiTraining.path },
          ]),
          faqSchema(aiFaqs),
        ]}
      />

      {/* Hero */}
      <Row
        as="section"
        aria-labelledby="ai-hero-title"
        fillWidth
        gap="48"
        vertical="center"
        m={{ direction: "column" }}
        paddingTop="24"
      >
        <Column flex={6} gap="24">
          <RevealFx translateY="4" fitWidth>
            <Text
              variant="label-strong-s"
              onBackground="brand-weak"
              style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              {aiTraining.eyebrow}
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1}>
            <Heading as="h1" id="ai-hero-title" variant="display-strong-l" wrap="balance">
              {aiTraining.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text as="p" variant="body-default-xl" onBackground="neutral-weak" wrap="balance">
              {aiTraining.intro}
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.3}>
            <Row gap="12" wrap>
              <Button href={applyHref} size="l" arrowIcon data-border="rounded">
                Apply as an AI trainer
              </Button>
              <Button href="#ai-how" size="l" variant="secondary" data-border="rounded">
                How it works
              </Button>
            </Row>
          </RevealFx>
          <RevealFx translateY="8" delay={0.4}>
            <Grid columns="4" s={{ columns: 2 }} gap="12" fillWidth paddingTop="16">
              {aiTraining.badges.map((item) => (
                <Column
                  key={item.label}
                  gap="4"
                  padding="12"
                  radius="m"
                  border="neutral-alpha-weak"
                  background="surface"
                >
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
        <Column flex={5} fillWidth>
          <RevealFx translateY="16" delay={0.2}>
            <div className={styles.heroImage}>
              <Image
                src="/images/ai/ai-model-training-brain.jpg"
                alt="Glowing brain illustration representing AI models trained by human experts"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </RevealFx>
        </Column>
      </Row>

      {/* Fields */}
      <Column as="section" aria-labelledby="fields-title" fillWidth gap="40" horizontal="center">
        <SectionHeading
          id="fields-title"
          eyebrow="Fields we're recruiting"
          title="If you're talented at something, AI needs you"
          description="AI labs need real experts to teach and test their models. We recruit across every major field — and new projects open often."
        />
        <Grid columns="4" m={{ columns: 3 }} s={{ columns: 2 }} gap="12" fillWidth>
          {aiFields.map((field) => (
            <Column
              key={field.title}
              as="article"
              gap="12"
              padding="20"
              s={{ padding: "16" }}
              radius="l"
              border="neutral-alpha-weak"
              background="surface"
            >
              <Row radius="m" padding="8" background="brand-alpha-weak" fitWidth>
                <Icon name={field.icon} onBackground="brand-weak" size="m" />
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                {field.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {field.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      {/* What you'll do */}
      <Row
        as="section"
        aria-labelledby="tasks-title"
        fillWidth
        gap="48"
        vertical="center"
        m={{ direction: "column" }}
      >
        <Column flex={1} fillWidth>
          <Media
            src="/images/ai/remote-expert-training-ai.jpg"
            alt="Remote expert reviewing AI responses on two monitors"
            aspectRatio="4 / 3"
            radius="xl"
            border="neutral-alpha-weak"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Column>
        <Column flex={1} gap="24">
          <SectionHeading
            id="tasks-title"
            align="start"
            eyebrow="The work"
            title="What AI trainers do"
            description="You use your expertise to make AI more accurate and useful. No coding needed outside software projects."
          />
          <Column as="ul" gap="12" margin="0" padding="0" style={{ listStyle: "none" }}>
            {aiTasks.map((task) => (
              <Row as="li" key={task} gap="12" vertical="start">
                <Icon name="check" onBackground="brand-weak" size="s" />
                <Text variant="body-default-m">{task}</Text>
              </Row>
            ))}
          </Column>
        </Column>
      </Row>

      {/* How it works */}
      <Column as="section" id="ai-how" aria-labelledby="ai-how-title" fillWidth gap="40" horizontal="center">
        <SectionHeading
          id="ai-how-title"
          eyebrow="How it works"
          title="From application to your first project"
          description="We guide you through assessments and onboarding so you can start earning faster."
        />
        <Grid columns="4" m={{ columns: 2 }} s={{ columns: 1 }} gap="16" fillWidth>
          {aiSteps.map((step, index) => (
            <Column
              key={step.title}
              gap="12"
              padding="24"
              radius="l"
              border="neutral-alpha-weak"
              background="surface"
            >
              <Row
                center
                radius="full"
                background="brand-alpha-weak"
                border="brand-alpha-medium"
                minWidth="40"
                minHeight="40"
                fitWidth
                className="font-heading text-brand"
                aria-hidden
              >
                {index + 1}
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                {step.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {step.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      {/* Platforms band */}
      <Column
        as="section"
        aria-labelledby="platforms-title"
        className={styles.band}
        fillWidth
        radius="xl"
        overflow="hidden"
        position="relative"
      >
        <Image
          src="/images/ai/ai-neural-network-background.jpg"
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className={styles.bandImage}
        />
        <Column className={styles.bandOverlay} fill position="absolute" />
        <Column
          position="relative"
          gap="20"
          paddingX="64"
          paddingY="104"
          maxWidth="s"
          s={{ paddingX: "24", paddingY: "64" }}
        >
          <Text variant="label-strong-s" className={styles.bandEyebrow}>
            THE AI TRAINING ECOSYSTEM
          </Text>
          <Heading as="h2" id="platforms-title" variant="display-strong-xs" className={styles.bandText}>
            One application. Projects across leading AI training platforms.
          </Heading>
          <Text variant="body-default-l" className={styles.bandMuted}>
            BitCompass consults across the AI training ecosystem, so we can match you with the
            projects that fit your expertise — instead of you applying platform by platform.
          </Text>
          <Row gap="8" wrap>
            {aiPlatforms.map((platform) => (
              <span key={platform} className={styles.bandChip}>
                {platform}
              </span>
            ))}
          </Row>
          <Text variant="body-default-xs" className={styles.bandMuted}>
            Platform names are trademarks of their respective owners. BitCompass is an independent
            talent consultancy.
          </Text>
        </Column>
      </Column>

      {/* Who can apply */}
      <Row
        as="section"
        aria-labelledby="who-title"
        fillWidth
        gap="48"
        vertical="center"
        m={{ direction: "column-reverse" }}
      >
        <Column flex={1} gap="24">
          <SectionHeading
            id="who-title"
            align="start"
            eyebrow="Who can apply"
            title="Requirements"
            description="Students in advanced programs, early-career professionals and senior experts are all welcome."
          />
          <Column as="ul" gap="12" margin="0" padding="0" style={{ listStyle: "none" }}>
            {aiRequirements.map((item) => (
              <Row as="li" key={item} gap="12" vertical="start">
                <Icon name="check" onBackground="brand-weak" size="s" />
                <Text variant="body-default-m">{item}</Text>
              </Row>
            ))}
          </Column>
          <Row>
            <Button href={applyHref} size="m" arrowIcon data-border="rounded">
              Apply now
            </Button>
          </Row>
        </Column>
        <Column flex={1} fillWidth>
          <Media
            src="/images/ai/subject-matter-experts.jpg"
            alt="Experienced professional collaborating with a younger colleague"
            aspectRatio="4 / 3"
            radius="xl"
            border="neutral-alpha-weak"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Column>
      </Row>

      {/* Open AI roles */}
      {aiJobs.length > 0 && (
        <Column as="section" aria-labelledby="ai-roles-title" fillWidth gap="32" horizontal="center">
          <SectionHeading id="ai-roles-title" eyebrow="Open role" title="Apply as an AI training expert" />
          <Column fillWidth gap="16">
            {aiJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </Column>
        </Column>
      )}

      {/* FAQ */}
      <Row as="section" id="faq" aria-labelledby="ai-faq-title" fillWidth gap="48" m={{ direction: "column" }}>
        <Column flex={2} gap="16">
          <SectionHeading
            id="ai-faq-title"
            align="start"
            eyebrow="FAQ"
            title="AI training questions"
            description="What to know before you apply to train AI models with BitCompass."
          />
          <Button href="/contact" variant="secondary" size="m" prefixIcon="chat" data-border="rounded">
            Ask us anything
          </Button>
        </Column>
        <Column flex={3} fillWidth>
          <FaqList items={aiFaqs} />
        </Column>
      </Row>

      <CtaBanner
        title="Turn your expertise into flexible, remote income"
        description="US citizens in law, medicine, science, finance, engineering and beyond: apply in two minutes and we'll match you with AI training projects."
        primary={{ label: "Apply as an AI trainer", href: applyHref }}
        secondary={{ label: "See all open roles", href: "/jobs" }}
      />
    </Column>
  );
}
