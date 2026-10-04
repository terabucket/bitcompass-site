import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { jobs, site } from "@/resources";
import {
  type ApplicationFields,
  validateFields,
  validateResume,
} from "@/lib/application";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/* Basic in-memory rate limit (per server instance)                    */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => htmlEntities[c] ?? c);

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

/** Checks the file's leading bytes so renamed executables etc. are rejected. */
function hasValidSignature(buffer: Buffer, filename: string) {
  const name = filename.toLowerCase();
  if (name.endsWith(".pdf")) return buffer.subarray(0, 4).toString("latin1") === "%PDF";
  if (name.endsWith(".docx")) return buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
  if (name.endsWith(".doc"))
    return buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0;
  return false;
}

const contentTypes: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const fail = (status: number, error: string, fieldErrors?: Record<string, string>) =>
  NextResponse.json({ ok: false, error, fieldErrors }, { status });

/* ------------------------------------------------------------------ */
/* POST /api/apply                                                     */
/* ------------------------------------------------------------------ */
export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return fail(429, "Too many applications from this connection. Please try again in a few minutes.");
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Invalid form submission.");
  }

  // Honeypot: real users never see or fill this field
  if (String(form.get("website") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const job = jobs.find((j) => j.slug === String(form.get("job") ?? "") && j.open);
  if (!job) return fail(400, "This role is no longer accepting applications.");

  const fields: ApplicationFields = {
    fullName: oneLine(String(form.get("fullName") ?? "")),
    email: oneLine(String(form.get("email") ?? "")),
    phone: oneLine(String(form.get("phone") ?? "")),
    country: oneLine(String(form.get("country") ?? "")),
    profileUrl: oneLine(String(form.get("profileUrl") ?? "")),
    message: String(form.get("message") ?? "").trim(),
  };

  const fieldErrors: Record<string, string> = { ...validateFields(fields) };

  const resume = form.get("resume");
  const resumeFile = resume instanceof File ? resume : null;
  const resumeError = validateResume(resumeFile);
  if (resumeError) fieldErrors.resume = resumeError;

  if (form.get("consent") !== "yes") fieldErrors.consent = "Please accept the privacy policy.";

  if (Object.keys(fieldErrors).length > 0 || !resumeFile) {
    return fail(400, "Please fix the highlighted fields.", fieldErrors);
  }

  const buffer = Buffer.from(await resumeFile.arrayBuffer());
  if (!hasValidSignature(buffer, resumeFile.name)) {
    return fail(400, "Please fix the highlighted fields.", {
      resume: "This file doesn't look like a valid PDF, DOC or DOCX document.",
    });
  }

  const transport = getTransport();
  const recipients = (process.env.APPLICATIONS_TO_EMAIL || site.contact.email)
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (!transport || recipients.length === 0 || !from) {
    console.error("[apply] Email is not configured. Set SMTP_* and APPLICATIONS_TO_EMAIL in your env file.");
    return fail(
      503,
      site.contact.email
        ? `We couldn't submit your application right now. Please email your resume to ${site.contact.email}.`
        : "We couldn't submit your application right now. Please try again later.",
    );
  }

  const ext = resumeFile.name.toLowerCase().split(".").pop() as "pdf" | "doc" | "docx";
  const safeName = fields.fullName.replace(/[^\p{L}\p{N} ._-]/gu, "").trim().replace(/\s+/g, "-") || "candidate";
  const submittedAt = new Date().toISOString();

  const rows: [string, string][] = [
    ["Position", job.title],
    ["Full name", fields.fullName],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Country", fields.country || "—"],
    ["LinkedIn / Portfolio", fields.profileUrl || "—"],
    ["Submitted", submittedAt],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:640px">
      <h2 style="color:${site.brandColor};margin:0 0 16px">New application: ${escapeHtml(job.title)}</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="border-bottom:1px solid #eee;color:#666;width:180px">${label}</td><td style="border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      ${
        fields.message
          ? `<h3 style="margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;margin:0">${escapeHtml(fields.message)}</p>`
          : ""
      }
      <p style="color:#666;margin-top:24px">The candidate's resume is attached. Reply to this email to contact them directly.</p>
    </div>`;

  const text = [
    `New application: ${job.title}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ...(fields.message ? ["", "Message:", fields.message] : []),
  ].join("\n");

  try {
    await transport.sendMail({
      from,
      to: recipients,
      replyTo: { name: fields.fullName, address: fields.email },
      subject: `[${site.name}] ${job.title} application — ${fields.fullName}`,
      text,
      html,
      attachments: [
        {
          filename: `Resume-${safeName}.${ext}`,
          content: buffer,
          contentType: contentTypes[ext],
        },
      ],
    });
  } catch (error) {
    console.error("[apply] Failed to send application email:", error);
    return fail(502, "We couldn't send your application. Please try again in a moment.");
  }

  // Optional confirmation email to the candidate
  if (process.env.SEND_APPLICANT_CONFIRMATION === "true") {
    const firstName = escapeHtml(fields.fullName.split(" ")[0]);
    await transport
      .sendMail({
        from,
        to: fields.email,
        ...(site.contact.email ? { replyTo: site.contact.email } : {}),
        subject: `We received your application — ${job.title} | ${site.name}`,
        text: `Hi ${fields.fullName.split(" ")[0]},\n\nThanks for applying for the ${job.title} role at ${site.name}. Our team reviews every application, and if your profile matches we'll contact you within a few business days.\n\n— The ${site.name} team\n${site.url}`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#111;max-width:560px"><p>Hi ${firstName},</p><p>Thanks for applying for the <strong>${escapeHtml(job.title)}</strong> role at ${site.name}. Our team reviews every application, and if your profile matches we'll contact you within a few business days.</p><p>— The ${site.name} team<br/><a href="${site.url}" style="color:${site.brandColor}">${site.url.replace(/^https?:\/\//, "")}</a></p></div>`,
      })
      .catch((error) => console.error("[apply] Failed to send confirmation email:", error));
  }

  return NextResponse.json({ ok: true });
}
