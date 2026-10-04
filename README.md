# BitCompass — IT Talent Agency Website

Website for **BitCompass**, an IT talent agency that connects software developers outside the United States with remote jobs at US companies.

Built with **Next.js 16** (App Router) and **Once UI**, based on the Magic Portfolio template.

## Features

- Light / dark mode (follows the system setting, with a toggle in the header)
- Brand palette around `#5371FF`, Suez One brand font for headings, BitCompass logos and favicons
- Pages: Home, About, Jobs, Job detail with application form, Blog (career guides), Contact, Privacy
- **Job application form**: full name, email, phone, country, profile URL, resume upload (PDF/DOC/DOCX, max 4 MB) and message. Applications are emailed to your team with the resume attached.
- **SEO**: per-page titles/descriptions/keywords, canonical URLs, Open Graph + Twitter cards with auto-generated branded images, `sitemap.xml`, `robots.txt`, web manifest, RSS feed and JSON-LD structured data (`EmploymentAgency`, `WebSite`, `FAQPage`, `JobPosting` for Google for Jobs, `BlogPosting`, `BreadcrumbList`)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev                  # http://localhost:3000
```

## Environment variables

All variables are documented in [`.env.example`](.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://www.bitcompass.com`. Used for canonical URLs, sitemap and structured data. |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` / `_WHATSAPP` / `_ADDRESS` / `_HOURS` | Contact info shown in the footer, contact page and schema. Leave empty to hide. |
| `NEXT_PUBLIC_LINKEDIN_URL`, `_X_URL`, `_FACEBOOK_URL`, `_INSTAGRAM_URL`, `_GITHUB_URL` | Social links. Leave empty to hide. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Search Console / Bing Webmaster verification codes. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | SMTP server used to send applications (any provider). |
| `MAIL_FROM` | Sender address for application emails. |
| `APPLICATIONS_TO_EMAIL` | Where applications go (comma-separated). Defaults to the contact email. |
| `SEND_APPLICANT_CONFIRMATION` | `true` to email candidates a "we received your application" message. |

`NEXT_PUBLIC_*` values are inlined at build time, so **rebuild/redeploy after changing them**. SMTP values are read at runtime and never reach the browser.

## Editing content

- **All copy, FAQs and job openings:** `src/resources/content.ts`
  - Add a job by adding an entry to `jobs` — it automatically gets a page at `/jobs/<slug>`, a sitemap entry and Google for Jobs structured data.
  - Keep `validThrough` current and set `open: false` to close a role.
  - Adding a `salary` range is strongly recommended for Google for Jobs.
- **Blog posts:** add `.mdx` files to `src/app/blog/posts`
- **Theme (colors, borders, effects):** `src/resources/once-ui.config.ts` and `src/resources/custom.css`
- **Images:** `public/images`, logos and icons in `public/brand`

## SEO checklist after deploying

1. Set `NEXT_PUBLIC_SITE_URL` to the live domain and redeploy.
2. Verify the site in [Google Search Console](https://search.google.com/search-console) and submit `https://<your-domain>/sitemap.xml`.
3. Test the job page with the [Rich Results Test](https://search.google.com/test/rich-results) to confirm the `JobPosting` is eligible for Google for Jobs.
4. Publish new career guides regularly — they rank for searches like "how to get a remote US developer job".

## License

The Magic Portfolio template is licensed under **CC BY-NC 4.0** (non-commercial). Commercial use, such as a company website, requires a commercial license from Once UI: see [once-ui.com](https://once-ui.com). Keep the attribution link in the footer unless you have one.
