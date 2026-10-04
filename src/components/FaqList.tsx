import { AccordionGroup } from "@once-ui-system/core";
import type { Faq } from "@/types";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <AccordionGroup
      fillWidth
      size="l"
      border="neutral-alpha-medium"
      radius="l"
      background="surface"
      items={items.map((faq) => ({
        title: faq.question,
        content: faq.answer,
      }))}
    />
  );
}
