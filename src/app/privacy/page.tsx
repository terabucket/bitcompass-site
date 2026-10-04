import { Column, Heading, List, ListItem, SmartLink, Text } from "@once-ui-system/core";
import { JsonLd } from "@/components";
import { privacy, site } from "@/resources";
import { buildMetadata, webPageSchema } from "@/utils/seo";

export const metadata = buildMetadata(privacy);

// NOTE: This is a starting template, not legal advice. Have it reviewed for the
// jurisdictions you operate in (e.g. GDPR for EU candidates, LGPD for Brazil).
const lastUpdated = "October 3, 2026";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Column gap="12">
      <Heading as="h2" variant="heading-strong-l">
        {title}
      </Heading>
      {children}
    </Column>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <Text as="p" variant="body-default-m" onBackground="neutral-medium" style={{ lineHeight: "175%" }}>
    {children}
  </Text>
);

export default function PrivacyPage() {
  const email = site.contact.email;
  return (
    <Column maxWidth="s" fillWidth gap="32">
      <JsonLd data={webPageSchema(privacy)} />
      <Column gap="8">
        <Heading as="h1" variant="display-strong-s">
          Privacy Policy
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Last updated: {lastUpdated}
        </Text>
      </Column>

      <P>
        {site.name} (&quot;we&quot;, &quot;us&quot;) helps IT professionals outside the United States
        find remote jobs with US companies. This policy explains what personal information we collect
        through this website and how we use it.
      </P>

      <Block title="Information we collect">
        <List as="ul">
          <ListItem>Details you submit when applying: full name, email, phone number, country, profile links and any message.</ListItem>
          <ListItem>Your resume or CV and the information it contains.</ListItem>
          <ListItem>Basic technical data such as IP address and browser type, used for security and spam prevention.</ListItem>
        </List>
      </Block>

      <Block title="How we use it">
        <List as="ul">
          <ListItem>To review your application and contact you about suitable roles.</ListItem>
          <ListItem>To share your profile with prospective US employers — only for roles relevant to you.</ListItem>
          <ListItem>To keep our website secure and prevent abuse.</ListItem>
        </List>
        <P>We never sell your personal information.</P>
      </Block>

      <Block title="How long we keep it">
        <P>
          We keep application data for up to 24 months so we can consider you for future roles, unless
          you ask us to delete it sooner.
        </P>
      </Block>

      <Block title="Your rights">
        <P>
          You can ask to access, correct or delete your personal information, or withdraw your consent
          at any time
          {email ? (
            <>
              {" "}by emailing <SmartLink href={`mailto:${email}`}>{email}</SmartLink>
            </>
          ) : null}
          .
        </P>
      </Block>

      <Block title="Changes">
        <P>We may update this policy from time to time. The latest version is always published on this page.</P>
      </Block>
    </Column>
  );
}
