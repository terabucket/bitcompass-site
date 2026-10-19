import { Background, Button, Column, Heading, Row, Text } from "@once-ui-system/core";

type CtaLink = { label: string; href: string };

type CtaBannerProps = {
  title?: string;
  description?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
};

export function CtaBanner({
  title = "Ready for your next remote opportunity?",
  description = "Send your resume today. It takes two minutes, and our team reviews every application personally.",
  primary = { label: "View open roles", href: "/jobs" },
  secondary = { label: "AI training for US experts", href: "/ai-training" },
}: CtaBannerProps) {
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
        <Button href={primary.href} size="l" arrowIcon data-border="rounded">
          {primary.label}
        </Button>
        <Button href={secondary.href} size="l" variant="secondary" data-border="rounded">
          {secondary.label}
        </Button>
      </Row>
    </Column>
  );
}
