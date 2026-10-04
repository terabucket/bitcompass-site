import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Column as="section" fill center paddingY="104" gap="16" align="center">
      <Text variant="display-strong-xl" className="font-heading text-brand">
        404
      </Text>
      <Heading as="h1" variant="display-default-xs">
        Looks like you&apos;re off course
      </Heading>
      <Text onBackground="neutral-weak">The page you are looking for doesn&apos;t exist or has moved.</Text>
      <Row gap="12" paddingTop="16" wrap horizontal="center">
        <Button href="/" data-border="rounded">
          Back to home
        </Button>
        <Button href="/jobs" variant="secondary" data-border="rounded">
          See open jobs
        </Button>
      </Row>
    </Column>
  );
}
