import { Button, Card, Column, Grid, Heading, Icon, Media, Row, Text } from "@once-ui-system/core";
import { CtaBanner, JsonLd, SectionHeading } from "@/components";
import { contact, jobs, phoneHref, site, socialLinks } from "@/resources";
import { breadcrumbSchema, buildMetadata, organizationSchema, webPageSchema } from "@/utils/seo";

export const metadata = buildMetadata(contact);

export default function ContactPage() {
  const { email, phone, whatsapp, address, hours } = site.contact;
  const openJob = jobs.find((job) => job.open);

  const channels = [
    email && { icon: "email", label: "Email", value: email, href: `mailto:${email}` },
    phone && { icon: "phone", label: "Phone", value: phone, href: `tel:${phoneHref(phone)}` },
    whatsapp && {
      icon: "whatsapp",
      label: "WhatsApp",
      value: whatsapp,
      href: `https://wa.me/${phoneHref(whatsapp).replace("+", "")}`,
    },
    address && { icon: "location", label: "Office", value: address },
    { icon: "clock", label: "Hours", value: hours },
  ].filter(Boolean) as { icon: string; label: string; value: string; href?: string }[];

  return (
    <Column maxWidth="l" fillWidth gap="80">
      <JsonLd
        data={[
          { ...webPageSchema(contact), "@type": "ContactPage", mainEntity: organizationSchema() },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: contact.path },
          ]),
        ]}
      />

      <Row fillWidth gap="48" vertical="center" m={{ direction: "column" }}>
        <Column flex={1} gap="32">
          <SectionHeading as="h1" align="start" eyebrow="Contact" title={contact.headline} description={contact.intro} />
          <Grid columns="2" s={{ columns: 1 }} gap="12" fillWidth>
            {channels.map((channel) => {
              const content = (
                <Row key={channel.label} gap="12" vertical="start">
                  <Row padding="8" radius="m" background="brand-alpha-weak">
                    <Icon name={channel.icon} size="s" onBackground="brand-weak" />
                  </Row>
                  <Column gap="2" style={{ minWidth: 0 }}>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {channel.label}
                    </Text>
                    <Text variant="body-strong-s" style={{ overflowWrap: "anywhere" }}>
                      {channel.value}
                    </Text>
                  </Column>
                </Row>
              );
              return channel.href ? (
                <Card
                  key={channel.label}
                  href={channel.href}
                  padding="16"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  transition="micro-medium"
                >
                  {content}
                </Card>
              ) : (
                <Column key={channel.label} padding="16" radius="l" border="neutral-alpha-weak" background="surface">
                  {content}
                </Column>
              );
            })}
          </Grid>
          {socialLinks.length > 0 && (
            <Row gap="8" wrap>
              {socialLinks.map((item) => (
                <Button key={item.name} href={item.link} variant="secondary" size="s" prefixIcon={item.icon} data-border="rounded">
                  {item.name}
                </Button>
              ))}
            </Row>
          )}
        </Column>
        <Column flex={1} fillWidth>
          <Media
            src="/images/contact/handshake-agreement.jpg"
            alt="Handshake closing a remote hiring agreement"
            aspectRatio="4 / 3"
            radius="xl"
            border="neutral-alpha-weak"
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Column>
      </Row>

      <Grid columns="2" s={{ columns: 1 }} gap="16" fillWidth>
        <Column gap="12" padding="32" radius="l" border="neutral-alpha-weak" background="surface">
          <Icon name="code" size="l" onBackground="brand-weak" />
          <Heading as="h2" variant="heading-strong-l">
            Looking for a remote US job?
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            The fastest way to reach us is to apply directly. Your resume goes straight to our
            recruiting team.
          </Text>
          <Row>
            <Button href={openJob ? `/jobs/${openJob.slug}#apply` : "/jobs"} arrowIcon data-border="rounded">
              Apply now
            </Button>
          </Row>
        </Column>
        <Column gap="12" padding="32" radius="l" border="neutral-alpha-weak" background="surface">
          <Icon name="users" size="l" onBackground="brand-weak" />
          <Heading as="h2" variant="heading-strong-l">
            Hiring remote developers?
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            US companies: tell us about the role and team, and we&apos;ll introduce pre-vetted
            engineers who match your stack and time zone.
          </Text>
          {email && (
            <Row>
              <Button
                href={`mailto:${email}?subject=${encodeURIComponent("Hiring remote developers")}`}
                variant="secondary"
                prefixIcon="email"
                data-border="rounded"
              >
                Email our team
              </Button>
            </Row>
          )}
        </Column>
      </Grid>

      <CtaBanner />
    </Column>
  );
}
