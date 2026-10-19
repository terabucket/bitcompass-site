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
  expertise: string;
  degree: string;
};

export type FieldErrors = Partial<
  Record<keyof ApplicationFields | "resume" | "consent" | "usCitizen", string>
>;

/** Extra questions enabled per job (see `application` in content.ts) */
export type ApplicationOptions = {
  askCountry?: boolean;
  askExpertise?: boolean;
  requireUsCitizen?: boolean;
};

export const EXPERTISE_OPTIONS = [
  "Law",
  "Medicine & healthcare",
  "Physics",
  "Chemistry",
  "Biology & life sciences",
  "Mathematics & statistics",
  "Finance & accounting",
  "Software engineering",
  "Data science & machine learning",
  "Writing, languages & humanities",
  "Business & consulting",
  "Other",
] as const;

export const DEGREE_OPTIONS = [
  "High school / GED",
  "Associate degree",
  "Bachelor's degree",
  "Master's degree",
  "PhD",
  "JD",
  "MD / DO",
  "Other professional degree",
] as const;

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

export function validateFields(
  fields: ApplicationFields,
  options: ApplicationOptions = {},
): FieldErrors {
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

  if (options.askExpertise) {
    if (!(EXPERTISE_OPTIONS as readonly string[]).includes(fields.expertise))
      errors.expertise = "Please choose your main field of expertise.";
    if (fields.degree && !(DEGREE_OPTIONS as readonly string[]).includes(fields.degree))
      errors.degree = "Please choose a degree from the list.";
  }

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
