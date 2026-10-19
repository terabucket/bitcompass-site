// Checks the SMTP settings from .env.local using the same transport as /api/apply.
//
//   npm run smtp:test                      -> connect and sign in only
//   npm run smtp:test -- you@example.com   -> also send a test email
import { createSmtpTransport, describeSmtpError, readSmtpSettings } from "../src/lib/smtp.ts";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // file not present
  }
}

const settings = readSmtpSettings();
if (!settings) {
  console.error("✗ Missing SMTP_HOST, SMTP_USER or SMTP_PASS (set them in .env.local).");
  process.exit(1);
}

console.log(`Server : ${settings.host}:${settings.port} (${settings.secure ? "implicit TLS" : "STARTTLS"})`);
console.log(`User   : ${settings.user}`);
console.log(`From   : ${settings.from}`);
for (const warning of settings.warnings) console.warn(`! ${warning}`);

const transport = createSmtpTransport(settings);

try {
  await transport.verify();
  console.log("✓ Connected and signed in");

  const to = process.argv[2];
  if (to) {
    await transport.sendMail({
      from: settings.from,
      to,
      subject: "BitCompass SMTP test",
      text: "This is a test email from the BitCompass website's SMTP settings. If you received it, application emails will work.",
    });
    console.log(`✓ Test email sent to ${to}`);
  } else {
    console.log("Tip: run `npm run smtp:test -- you@example.com` to also send a test email.");
  }
} catch (error) {
  const failure = describeSmtpError(error);
  console.error(`✗ ${failure.code}`);
  console.error(`  Fix: ${failure.hint}`);
  console.error(`  Server said: ${failure.detail}`);
  process.exit(1);
} finally {
  transport.close();
}
