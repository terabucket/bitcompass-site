// SMTP transport shared by /api/apply and `npm run smtp:test`.
// Keep this file free of "@/..." imports so the test script can run it directly with Node.
import nodemailer from "nodemailer";

type Env = Record<string, string | undefined>;

export type SmtpSettings = {
  host: string;
  port: number;
  user: string;
  pass: string;
  /** Sender used in the From header */
  from: string;
  /** true = TLS from the first byte (port 465); false = plain connection upgraded with STARTTLS */
  secure: boolean;
  /** Misconfigurations that were corrected automatically or are likely to fail */
  warnings: string[];
};

const addressOf = (value: string) => (value.match(/<([^>]+)>/)?.[1] ?? value).trim().toLowerCase();

/** Reads SMTP_* / MAIL_FROM env vars. Returns null when required values are missing. */
export function readSmtpSettings(env: Env = process.env): SmtpSettings | null {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(env.SMTP_PORT?.trim() || 587);
  const warnings: string[] = [];

  // Port decides the TLS mode: 465 = implicit TLS, everything else = STARTTLS.
  // A contradictory SMTP_SECURE (e.g. "true" with 587) is the most common cause of
  // "wrong version number" TLS errors, so it is corrected instead of trusted.
  const secure = port === 465;
  const declared = env.SMTP_SECURE?.trim().toLowerCase();
  if (declared && (declared === "true") !== secure) {
    warnings.push(
      `SMTP_SECURE=${declared} does not match port ${port}; using ${secure ? "implicit TLS" : "STARTTLS"}. Set SMTP_SECURE=true only for port 465.`,
    );
  }

  const from = env.MAIL_FROM?.trim() || user;
  // Only meaningful when the login is a mailbox address (not e.g. "resend" or "apikey")
  if (user.includes("@") && addressOf(from) !== addressOf(user)) {
    warnings.push(
      `MAIL_FROM (${addressOf(from)}) differs from SMTP_USER (${addressOf(user)}). Microsoft 365 and Google reject this unless the mailbox has 'Send As' rights for that address.`,
    );
  }

  return { host, port, user, pass, from, secure, warnings };
}

export function createSmtpTransport(settings: SmtpSettings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    // On submission ports, refuse to send credentials without STARTTLS
    requireTLS: settings.port === 587,
    auth: { user: settings.user, pass: settings.pass },
    tls: { minVersion: "TLSv1.2", servername: settings.host },
    // Fail fast instead of hitting the serverless function time limit
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

type SmtpErrorLike = {
  code?: string;
  responseCode?: number;
  response?: string;
  command?: string;
  message?: string;
};

export type SmtpFailure = {
  /** Safe to show publicly (e.g. in the API response) */
  code:
    | "SMTP_TLS_MISMATCH"
    | "SMTP_AUTH_DISABLED"
    | "SMTP_AUTH_FAILED"
    | "SMTP_CONNECTION"
    | "SMTP_SENDER_REJECTED"
    | "SMTP_RECIPIENT_REJECTED"
    | "SMTP_ERROR";
  /** How to fix it — for logs and the smtp:test script only */
  hint: string;
  /** Raw server response — for logs only */
  detail: string;
};

/** Turns a Nodemailer error into a short code and a human-readable fix. */
export function describeSmtpError(error: unknown): SmtpFailure {
  const e = (error ?? {}) as SmtpErrorLike;
  const text = `${e.response ?? ""} ${e.message ?? ""}`;
  const detail = [e.code, e.command, e.responseCode, e.response ?? e.message].filter(Boolean).join(" | ");

  if (/wrong version number|ssl3_get_record|tlsv1 alert protocol version/i.test(text)) {
    return {
      code: "SMTP_TLS_MISMATCH",
      hint: "TLS mode does not match the port. Use port 587 with SMTP_SECURE=false (STARTTLS), or port 465 with SMTP_SECURE=true.",
      detail,
    };
  }

  if (e.code === "EAUTH" || e.responseCode === 535 || e.responseCode === 534) {
    if (/5\.7\.139|basic auth|SmtpClientAuthentication is disabled|disabled for the (tenant|mailbox)/i.test(text)) {
      return {
        code: "SMTP_AUTH_DISABLED",
        hint:
          "The email provider refuses password (SMTP AUTH) sign-in for this mailbox. In Microsoft 365, enable " +
          "'Authenticated SMTP' for the mailbox and make sure the tenant allows SMTP AUTH — or switch to a " +
          "transactional email service (e.g. Resend, Postmark, SendGrid) for website emails.",
        detail,
      };
    }
    return {
      code: "SMTP_AUTH_FAILED",
      hint:
        "Username or password was rejected. Check SMTP_USER (full email address) and SMTP_PASS. With MFA enabled, " +
        "SMTP_PASS must be an app password; with Microsoft 365 also confirm Authenticated SMTP is enabled for the mailbox.",
      detail,
    };
  }

  if (/SendAsDenied|5\.2\.252|5\.7\.60|not (authorized|allowed) to send/i.test(text) || (e.code === "EENVELOPE" && /from|sender/i.test(text))) {
    return {
      code: "SMTP_SENDER_REJECTED",
      hint: "The server refused the sender address. Set MAIL_FROM to the same address as SMTP_USER (or grant 'Send As' rights).",
      detail,
    };
  }

  if (e.code === "EENVELOPE" || (e.responseCode && e.responseCode >= 550 && e.command === "RCPT TO")) {
    return {
      code: "SMTP_RECIPIENT_REJECTED",
      hint: "A recipient address was rejected. Check APPLICATIONS_TO_EMAIL.",
      detail,
    };
  }

  if (["ECONNECTION", "ETIMEDOUT", "ESOCKET", "EDNS", "ECONNREFUSED", "ENOTFOUND"].includes(e.code ?? "")) {
    return {
      code: "SMTP_CONNECTION",
      hint: "Could not reach the SMTP server. Check SMTP_HOST and SMTP_PORT (port 25 is blocked on most hosts — use 587 or 465).",
      detail,
    };
  }

  return { code: "SMTP_ERROR", hint: "Unexpected SMTP error — see detail.", detail };
}
