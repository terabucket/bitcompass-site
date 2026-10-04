"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Line, Row, ToggleButton } from "@once-ui-system/core";

import { display, jobs, navigation } from "@/resources";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export const Header = () => {
  const pathname = usePathname() ?? "";
  const openJob = jobs.find((job) => job.open);

  return (
    <Row
      as="header"
      className={styles.header}
      position="sticky"
      top="0"
      zIndex={9}
      fillWidth
      paddingX="l"
      paddingY="12"
      horizontal="center"
      s={{ paddingX: "12" }}
    >
      <Row maxWidth="l" fillWidth vertical="center" horizontal="between" gap="16">
        <Link href="/" aria-label="BitCompass — home" className={styles.logo}>
          <BrandLogo variant="horizontal" height={34} priority className={styles.logoFull} />
          <BrandLogo variant="mark" height={34} priority className={styles.logoMark} />
        </Link>

        <Row
          as="nav"
          aria-label="Main navigation"
          background="page"
          border="neutral-alpha-weak"
          radius="m-4"
          shadow="l"
          padding="4"
          gap="4"
          vertical="center"
          data-border="rounded"
        >
          {navigation.map((item) => (
            <span key={item.href}>
              <Row m={{ hide: true }}>
                <ToggleButton
                  prefixIcon={item.icon}
                  href={item.href}
                  label={item.label}
                  selected={isActive(pathname, item.href)}
                />
              </Row>
              <Row hide m={{ hide: false }}>
                <ToggleButton
                  prefixIcon={item.icon}
                  href={item.href}
                  aria-label={item.label}
                  selected={isActive(pathname, item.href)}
                />
              </Row>
            </span>
          ))}
          {display.themeSwitcher && (
            <>
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              <ThemeToggle />
            </>
          )}
        </Row>

        <Row horizontal="end" s={{ hide: true }} className={styles.cta}>
          {openJob && (
            <Button href={`/jobs/${openJob.slug}#apply`} size="m" arrowIcon data-border="rounded">
              Apply now
            </Button>
          )}
        </Row>
      </Row>
    </Row>
  );
};
