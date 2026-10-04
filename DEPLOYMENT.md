# Deploying BitCompass (Vercel + GoDaddy domain)

This site is deployed on **Vercel** and served on your **GoDaddy domain**. GoDaddy stays your domain registrar and DNS host; you only point two DNS records at Vercel.

```
GitHub (code) ──push/PR──► GitHub Actions (CI: lint, typecheck, build)
      │
      └──────────────────► Vercel (CD)
                              ├─ Pull request  → Preview URL  (xyz.vercel.app)
                              └─ Merge to main → Production   (yourdomain.com)
                                                     ▲
GoDaddy DNS:  A @ → Vercel   |   CNAME www → Vercel ─┘
```

> Throughout this guide, replace `yourdomain.com` with your real domain.

---

## Before you start

- **Vercel plan:** Vercel's free **Hobby** plan is for personal, non-commercial projects only. A company website needs the **Pro** plan (per-member monthly fee). Pick Pro, or start on Hobby only for testing.
- **Don't use GoDaddy "Forwarding".** Forwarding (especially with *masking*) wraps your site in a frame or bounces visitors to a `vercel.app` address. That hurts SEO, can break HTTPS, and shows the wrong URL. Point DNS records at Vercel instead (Step 3).
- **Choose one main address:** `https://yourdomain.com` (recommended) or `https://www.yourdomain.com`. The other one will redirect to it automatically.

---

## Step 1 — Import the GitHub repo into Vercel

1. Sign in at [vercel.com](https://vercel.com) **with your GitHub account**.
2. Click **Add New… → Project** and **Import** the `bitcompass-site` repository. If you don't see it, click *Adjust GitHub App Permissions* and grant access to the repo.
3. Vercel detects **Next.js** automatically. Keep the defaults:
   - Root Directory: `./`
   - Build command: `next build`; install command: `npm install` (or leave both on automatic)
4. Open **Environment Variables** and add the values below (Step 2) **before** clicking **Deploy**.
5. Click **Deploy**. When it finishes you get a URL like `bitcompass-site.vercel.app`. Open it to check the site.

## Step 2 — Environment variables (Vercel → Project → Settings → Environment Variables)

Add each variable for the **Production** environment. Most can be added to **Preview** too.

| Variable | Example | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | **Production only.** Must exactly match your main address, with no trailing slash. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@yourdomain.com` | Shown on the site |
| `NEXT_PUBLIC_CONTACT_PHONE` | `+1 (555) 123-4567` | Shown on the site |
| `NEXT_PUBLIC_LINKEDIN_URL` etc. | | Optional social links |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | | Optional (see Step 6) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | `smtp.resend.com` / `465` / `true` | From your email provider |
| `SMTP_USER` / `SMTP_PASS` | | Mark as **Sensitive** |
| `MAIL_FROM` | `BitCompass Careers <careers@yourdomain.com>` | Must use a domain your provider has verified |
| `APPLICATIONS_TO_EMAIL` | `recruiting@yourdomain.com` | Comma-separated for several recipients |
| `SEND_APPLICANT_CONFIRMATION` | `true` | |

`.env.example` in the repo lists every variable.

> `NEXT_PUBLIC_*` values are baked in at build time. After changing one, **redeploy**: Deployments → ⋯ → Redeploy.

**Which email (SMTP) provider?** Any of these works with the form:
- A transactional email service such as Resend, Postmark, SendGrid, Mailgun or Amazon SES. These are the most reliable for website emails, and most have a free tier.
- The SMTP server of a mailbox you already have: Google Workspace, Microsoft 365, or GoDaddy/Titan email.

Whichever you choose, add the **SPF, DKIM and DMARC** DNS records the provider gives you in GoDaddy DNS (same screen as Step 3). Without them, application emails may land in spam.

## Step 3 — Connect your GoDaddy domain

**In Vercel**

1. Go to Project → **Settings → Domains**.
2. Add `yourdomain.com`, then add `www.yourdomain.com`.
3. When asked, choose **"Redirect `www.yourdomain.com` to `yourdomain.com`"** (or the reverse if you picked www as your main address).
4. Vercel now shows each domain as **Invalid Configuration**, together with the exact DNS records it needs. Keep this tab open.

**In GoDaddy** (`godaddy.com` → **My Products** → your domain → **DNS** / **Manage DNS**)

1. **Turn off forwarding:** if **Forwarding** is set for the domain, delete it.
2. **Apex record:** find the existing `A` record with Name `@` (often pointing to a GoDaddy "Parked" IP) and **edit** it:
   - Type `A` · Name `@` · Value: **the IP Vercel shows** (commonly `76.76.21.21`) · TTL `600 seconds` (or 1 hour)
   - Delete any *other* `A` records for `@`, plus any `AAAA` records for `@`.
3. **www record:** edit the existing `CNAME` with Name `www` (it usually points to `@`):
   - Type `CNAME` · Name `www` · Value: **the target Vercel shows** (e.g. `cname.vercel-dns.com` or a project-specific `…vercel-dns-0xx.com`) · TTL `600 seconds`
4. **Keep your email records:** leave `MX`, email `TXT`/`CNAME` records (SPF, DKIM) and anything else unrelated to the website untouched.
5. Save.

**Back in Vercel:** within a few minutes (occasionally up to 24–48 h) both domains turn **Valid**. Vercel then issues a free **SSL certificate** automatically, so `https://` works with nothing else to do.

> Alternative: change the domain's nameservers in GoDaddy to Vercel's (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) so Vercel manages all DNS. Only do this if you'll recreate every existing record (especially email) in Vercel. For most setups the A + CNAME approach above is simpler and safer.

## Step 4 — Redeploy and verify

1. Make sure `NEXT_PUBLIC_SITE_URL` is your real domain, then **Redeploy** the latest production deployment.
2. Check:
   - `https://yourdomain.com` loads with a padlock, and `https://www.yourdomain.com` redirects to it
   - `https://yourdomain.com/sitemap.xml` and `/robots.txt` show your domain, not `localhost`
   - **Submit a real test application** at `/apply`. The email should arrive with the resume attached. If it doesn't, check Vercel → Project → **Logs** for `[apply]` errors.

## Step 5 — CI/CD (already set up in this repo)

**How it works**

| Event | GitHub Actions (`.github/workflows/ci.yml`) | Vercel |
| --- | --- | --- |
| Open/update a pull request | Runs lint → typecheck → build | Builds a **Preview** deployment and comments the URL on the PR |
| Merge/push to `main` | Runs the same checks | Deploys to **Production** (your domain) |

Dependabot (`.github/dependabot.yml`) opens weekly PRs for dependency updates, and CI checks each one.

**Protect `main` so only passing code reaches production** (GitHub → repo → **Settings → Rules → Rulesets → New branch ruleset**, or **Settings → Branches → Add rule**):

1. Target branch: `main`
2. ✅ **Require a pull request before merging**
3. ✅ **Require status checks to pass**, then add:
   - `Lint, typecheck & build` (from GitHub Actions; it appears after the workflow has run once)
   - `Vercel` (the preview deployment must succeed)
4. ✅ Block force pushes
5. Save.

**Day-to-day workflow**

```bash
git checkout -b feature/new-job-posting
# ...edit, e.g. add a job in src/resources/content.ts...
git commit -am "Add Backend Developer opening"
git push -u origin feature/new-job-posting
```

Then open a pull request on GitHub, review the Vercel Preview link, wait for the green checks, and **Merge**. Production updates automatically within about a minute. To roll back, go to Vercel → Deployments → choose an earlier deployment → **Promote to Production**.

## Step 6 — Get found on Google

1. Open [Google Search Console](https://search.google.com/search-console) → **Add property → Domain** → enter `yourdomain.com`.
2. Google gives you a `TXT` record. Add it in GoDaddy DNS (Type `TXT`, Name `@`) and click **Verify**.
3. In Search Console → **Sitemaps**, submit `sitemap.xml`.
4. Test the job page in the [Rich Results Test](https://search.google.com/test/rich-results) (`https://yourdomain.com/jobs/full-stack-web-developer`) to confirm the **Job posting** is eligible for Google for Jobs.
5. Optional: repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters). You can import directly from Search Console.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Vercel says "Invalid Configuration" for hours | Re-check the A/CNAME values against Vercel's screen; make sure no extra `A`/`AAAA` records for `@` and no GoDaddy Forwarding remain. Test with [dnschecker.org](https://dnschecker.org). |
| Site shows the GoDaddy parked page | The old parked `A` record is still there, or DNS hasn't propagated yet. |
| Links in sitemap / social previews show `localhost` or `vercel.app` | `NEXT_PUBLIC_SITE_URL` is wrong. Fix it and **redeploy**. |
| Form says "couldn't submit your application right now" | SMTP variables are missing or wrong. Check Vercel Logs for `[apply]`. |
| Application emails go to spam | Add SPF/DKIM/DMARC records from your email provider, and make sure `MAIL_FROM` uses that verified domain. |
| CI fails on GitHub | Open the failed run under the **Actions** tab. Locally, run `npm run lint && npm run typecheck && npm run build`. |
