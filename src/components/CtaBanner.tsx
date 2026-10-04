import { Background, Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { jobs } from "@/resources";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = "Ready to work with a US company — from home?",
  description = "Send your resume today. It takes two minutes, and our team reviews every application personally.",
}: CtaBannerProps) {
  const job = jobs.find((j) => j.open);

  return (
    <Column
      as="section"
      aria-label="Apply to BitCompass"
      fillWidth
      overflow="hidden"
      position="relative"
      radius="xl"
      border="brand-alpha-medium"
      background="brand-alpha-weak"
      paddingX="xl"
      paddingY="64"
      horizontal="center"
      align="center"
      gap="20"
      s={{ paddingX: "l", paddingY: "48" }}
    >
      <Background
        position="absolute"
        top="0"
        left="0"
        fill
        gradient={{
          display: true,
          opacity: 60,
          x: 50,
          y: 0,
          width: 60,
          height: 80,
          tilt: 0,
          colorStart: "brand-background-strong",
          colorEnd: "static-transparent",
        }}
        dots={{ display: true, opacity: 20, size: "2", color: "brand-on-background-weak" }}
      />
      <Heading as="h2" variant="display-strong-xs" wrap="balance" style={{ position: "relative" }} data-exclude-nav>
        {title}
      </Heading>
      <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance" style={{ position: "relative" }}>
        {description}
      </Text>
      <Row gap="12" wrap horizontal="center" style={{ position: "relative" }}>
        {job && (
          <Button href={`/jobs/${job.slug}#apply`} size="l" arrowIcon data-border="rounded">
            Apply now
          </Button>
        )}
        <Button href="/jobs" size="l" variant="secondary" data-border="rounded">
          View open roles
        </Button>
      </Row>
    </Column>
  );
}
