// Validation rules shared by the apply form (client) and the /api/apply route (server).

// 4 MB keeps uploads under common serverless body limits (e.g. Vercel: 4.5 MB)
export const MAX_RESUME_BYTES = 4 * 1024 * 1024;

export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ApplicationFields = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  profileUrl: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ApplicationFields | "resume" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits plus common separators; 7–15 digits per E.164
const PHONE_RE = /^\+?[\d\s().-]{7,25}$/;

export const LIMITS = {
  fullName: 100,
  email: 254,
  phone: 25,
  country: 60,
  profileUrl: 300,
  message: 2000,
};

export function validateFields(fields: ApplicationFields): FieldErrors {
  const errors: FieldErrors = {};

  if (fields.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  else if (fields.fullName.length > LIMITS.fullName) errors.fullName = "Name is too long.";

  if (!EMAIL_RE.test(fields.email.trim()) || fields.email.length > LIMITS.email)
    errors.email = "Please enter a valid email address.";

  const digits = fields.phone.replace(/\D/g, "");
  if (!PHONE_RE.test(fields.phone.trim()) || digits.length < 7 || digits.length > 15)
    errors.phone = "Please enter a valid phone number, including country code.";

  if (fields.country.length > LIMITS.country) errors.country = "Country is too long.";

  if (fields.profileUrl.trim()) {
    try {
      const url = new URL(fields.profileUrl.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.profileUrl = "Please enter a full URL, e.g. https://linkedin.com/in/you";
    }
    if (fields.profileUrl.length > LIMITS.profileUrl) errors.profileUrl = "URL is too long.";
  }

  if (fields.message.length > LIMITS.message)
    errors.message = `Please keep your message under ${LIMITS.message} characters.`;

  return errors;
}

export function validateResume(file: { name: string; size: number } | null | undefined): string | undefined {
  if (!file || file.size === 0) return "Please attach your resume.";
  const name = file.name.toLowerCase();
  if (!RESUME_EXTENSIONS.some((ext) => name.endsWith(ext)))
    return "Resume must be a PDF, DOC or DOCX file.";
  if (file.size > MAX_RESUME_BYTES) return "Resume must be 4 MB or smaller.";
  return undefined;
}
