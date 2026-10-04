import { Column, Grid, Heading, Icon, Media, Row, Text } from "@once-ui-system/core";
import { CtaBanner, JsonLd, SectionHeading } from "@/components";
import { about, lookingFor, steps, values } from "@/resources";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/utils/seo";

export const metadata = buildMetadata(about);

export default function AboutPage() {
  return (
    <Column maxWidth="l" fillWidth gap="104" s={{ gap: "80" }}>
      <JsonLd
        data={[
          { ...webPageSchema(about), "@type": "AboutPage" },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: about.path },
          ]),
        ]}
      />

      {/* Intro */}
      <Column fillWidth gap="48" horizontal="center">
        <SectionHeading as="h1" eyebrow="About BitCompass" title={about.headline} description={about.intro} />
        <Grid columns="3" s={{ columns: 1 }} gap="16" fillWidth>
          <Media
            src="/images/about/diverse-it-professionals.jpg"
            alt="Diverse group of IT professionals smiling together"
            aspectRatio="4 / 5"
            radius="l"
            border="neutral-alpha-weak"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <Media
            src="/images/about/developers-pair-programming.jpg"
            alt="Two developers pair programming on a laptop"
            aspectRatio="4 / 5"
            radius="l"
            border="neutral-alpha-weak"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
            s={{ hide: true }}
          />
          <Media
            src="/images/process/remote-team-video-call.jpg"
            alt="Remote developer on a video call with a distributed US team"
            aspectRatio="4 / 5"
            radius="l"
            border="neutral-alpha-weak"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
            s={{ hide: true }}
          />
        </Grid>
      </Column>

      {/* Story */}
      <Row as="section" aria-labelledby="story-title" fillWidth gap="48" m={{ direction: "column" }}>
        <Column flex={2}>
          <SectionHeading id="story-title" align="start" eyebrow="Our story" title="The guide between global talent and US teams" />
        </Column>
        <Column flex={3} gap="20">
          {about.story.map((paragraph) => (
            <Text key={paragraph} as="p" variant="body-default-l" onBackground="neutral-medium" style={{ lineHeight: "175%" }}>
              {paragraph}
            </Text>
          ))}
        </Column>
      </Row>

      {/* Values */}
      <Column as="section" aria-labelledby="values-title" fillWidth gap="40" horizontal="center">
        <SectionHeading
          id="values-title"
          eyebrow="What we stand for"
          title="Our values"
          description="The principles behind every introduction we make."
        />
        <Grid columns="4" m={{ columns: 2 }} s={{ columns: 1 }} gap="16" fillWidth>
          {values.map((value, index) => (
            <Column key={value.title} as="article" gap="12" padding="24" radius="l" border="neutral-alpha-weak" background="surface">
              <Text variant="display-strong-xs" className="font-heading text-brand" aria-hidden>
                0{index + 1}
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                {value.title}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {value.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      {/* What we look for */}
      <Row as="section" aria-labelledby="look-title" fillWidth gap="48" vertical="center" m={{ direction: "column" }}>
        <Column flex={1} fillWidth>
          <Media
            src="/images/about/team-collaboration.jpg"
            alt="Software team collaborating around a table with laptops"
            aspectRatio="4 / 3"
            radius="xl"
            border="neutral-alpha-weak"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Column>
        <Column flex={1} gap="24">
          <SectionHeading
            id="look-title"
            align="start"
            eyebrow="Who we work with"
            title="What we look for in IT talent"
            description="Skills get you the interview. These qualities get you the long-term role."
          />
          <Column as="ul" gap="12" margin="0" padding="0" style={{ listStyle: "none" }}>
            {lookingFor.map((item) => (
              <Row as="li" key={item} gap="12" vertical="start">
                <Icon name="check" onBackground="brand-weak" size="s" />
                <Text variant="body-default-m">{item}</Text>
              </Row>
            ))}
          </Column>
        </Column>
      </Row>

      {/* Process recap */}
      <Column as="section" aria-labelledby="process-title" fillWidth gap="40" horizontal="center">
        <SectionHeading id="process-title" eyebrow="Our process" title="How we get you hired" />
        <Grid columns="4" m={{ columns: 2 }} s={{ columns: 1 }} gap="16" fillWidth>
          {steps.map((step, index) => (
            <Column key={step.title} gap="8" padding="24" radius="l" border="neutral-alpha-weak" background="surface">
              <Text variant="label-strong-s" onBackground="brand-weak">
                STEP {index + 1}
              </Text>
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

      <CtaBanner />
    </Column>
  );
}
