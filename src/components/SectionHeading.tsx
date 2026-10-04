import { Column, Heading, Text } from "@once-ui-system/core";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Column
      gap="12"
      maxWidth="s"
      horizontal={centered ? "center" : "start"}
      align={centered ? "center" : "start"}
    >
      {eyebrow && (
        <Text variant="label-strong-s" onBackground="brand-weak" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {eyebrow}
        </Text>
      )}
      <Heading as={as} id={id} variant={as === "h1" ? "display-strong-m" : "display-strong-xs"} wrap="balance">
        {title}
      </Heading>
      {description && (
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          {description}
        </Text>
      )}
    </Column>
  );
}
