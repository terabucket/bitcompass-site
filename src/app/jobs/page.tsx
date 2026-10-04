import { Column, Feedback, Row, Text } from "@once-ui-system/core";
import { CtaBanner, JsonLd, SectionHeading } from "@/components";
import { JobCard } from "@/components/jobs/JobCard";
import { jobs, jobsPage, site } from "@/resources";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/utils/seo";
import { absoluteUrl } from "@/resources";

export const metadata = buildMetadata(jobsPage);

export default function JobsPage() {
  const openJobs = jobs.filter((job) => job.open);

  return (
    <Column maxWidth="l" fillWidth gap="64">
      <JsonLd
        data={[
          webPageSchema(jobsPage),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Jobs", path: jobsPage.path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Remote jobs at ${site.name}`,
            itemListElement: openJobs.map((job, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/jobs/${job.slug}`),
              name: job.title,
            })),
          },
        ]}
      />
      <Column fillWidth horizontal="center">
        <SectionHeading
          as="h1"
          eyebrow="Careers for global IT talent"
          title={jobsPage.headline}
          description={jobsPage.intro}
        />
      </Column>

      <Column as="section" aria-label="Open positions" fillWidth gap="16">
        {openJobs.length > 0 ? (
          openJobs.map((job, index) => <JobCard key={job.slug} job={job} priority={index === 0} />)
        ) : (
          <Feedback
            variant="info"
            icon
            title="No open roles right now"
            description="New remote roles open regularly. Check back soon or contact us to join our talent network."
          />
        )}
      </Column>

      <Row fillWidth horizontal="center">
        <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
          Don&apos;t see the right role? We add new remote positions with US companies regularly —
          follow us or get in touch and we&apos;ll keep you in mind.
        </Text>
      </Row>

      <CtaBanner />
    </Column>
  );
}
