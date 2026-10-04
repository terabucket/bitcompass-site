import Link from "next/link";
import { Column, Grid, Icon, IconButton, Line, Row, SmartLink, Text } from "@once-ui-system/core";
import { company, jobs, phoneHref, site, socialLinks } from "@/resources";
import { BrandLogo } from "./BrandLogo";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { email, phone, whatsapp, address } = site.contact;

  return (
    <Row as="footer" fillWidth paddingX="l" paddingTop="80" paddingBottom="24" horizontal="center" s={{ paddingX: "16" }}>
      <Column maxWidth="l" fillWidth gap="40">
        <Line background="neutral-alpha-weak" />
        <Grid columns="4" m={{ columns: 2 }} s={{ columns: 1 }} gap="40" fillWidth>
          <Column gap="16">
            <Link href="/" aria-label="BitCompass — home">
              <BrandLogo variant="horizontal" height={32} />
            </Link>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {company.description}
            </Text>
          </Column>

          <Column gap="12" as="nav" aria-label="Company">
            <Text as="h2" variant="label-strong-m" data-exclude-nav>Company</Text>
            <SmartLink href="/about">About us</SmartLink>
            <SmartLink href="/blog">Career guides</SmartLink>
            <SmartLink href="/contact">Contact</SmartLink>
            <SmartLink href="/privacy">Privacy policy</SmartLink>
          </Column>

          <Column gap="12" as="nav" aria-label="Careers">
            <Text as="h2" variant="label-strong-m" data-exclude-nav>For IT talent</Text>
            <SmartLink href="/jobs">Open remote jobs</SmartLink>
            {jobs
              .filter((job) => job.open)
              .map((job) => (
                <SmartLink key={job.slug} href={`/jobs/${job.slug}`}>
                  {job.title}
                </SmartLink>
              ))}
            <SmartLink href="/#how-it-works">How it works</SmartLink>
            <SmartLink href="/#faq">FAQ</SmartLink>
          </Column>

          <Column gap="12">
            <Text as="h2" variant="label-strong-m" data-exclude-nav>Get in touch</Text>
            {email && (
              <Row gap="8" vertical="center">
                <Icon name="email" size="xs" onBackground="brand-weak" />
                <SmartLink href={`mailto:${email}`}>{email}</SmartLink>
              </Row>
            )}
            {phone && (
              <Row gap="8" vertical="center">
                <Icon name="phone" size="xs" onBackground="brand-weak" />
                <SmartLink href={`tel:${phoneHref(phone)}`}>{phone}</SmartLink>
              </Row>
            )}
            {whatsapp && (
              <Row gap="8" vertical="center">
                <Icon name="whatsapp" size="xs" onBackground="brand-weak" />
                <SmartLink href={`https://wa.me/${phoneHref(whatsapp).replace("+", "")}`}>WhatsApp</SmartLink>
              </Row>
            )}
            {address && (
              <Row gap="8" vertical="start">
                <Icon name="location" size="xs" onBackground="brand-weak" />
                <Text variant="body-default-s" onBackground="neutral-weak">{address}</Text>
              </Row>
            )}
            {socialLinks.length > 0 && (
              <Row gap="8" marginTop="8">
                {socialLinks.map((item) => (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    aria-label={`${site.name} on ${item.name}`}
                    size="s"
                    variant="secondary"
                  />
                ))}
              </Row>
            )}
          </Column>
        </Grid>

        <Row
          className={styles.mobile}
          fillWidth
          horizontal="between"
          vertical="center"
          gap="16"
          s={{ direction: "column", horizontal: "center" }}
        >
          <Text variant="body-default-s" onBackground="neutral-weak">
            © {currentYear} {site.name}. All rights reserved.
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            Built with <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Row>
      </Column>
    </Row>
  );
};
