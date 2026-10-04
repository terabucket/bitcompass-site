"use client";

import { useRef, useState } from "react";
import {
  Button,
  Column,
  Feedback,
  Grid,
  Heading,
  Icon,
  Input,
  Row,
  SmartLink,
  Text,
  Textarea,
} from "@once-ui-system/core";
import {
  type ApplicationFields,
  type FieldErrors,
  LIMITS,
  RESUME_ACCEPT,
  validateFields,
  validateResume,
} from "@/lib/application";
import styles from "./ApplyForm.module.scss";

type Status = "idle" | "submitting" | "success" | "error";

const emptyFields: ApplicationFields = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  profileUrl: "",
  message: "",
};

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function ApplyForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [fields, setFields] = useState<ApplicationFields>(emptyFields);
  const [resume, setResume] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const update =
    (key: keyof ApplicationFields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const pickFile = (file: File | null | undefined) => {
    if (!file) return;
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: validateResume(file) }));
  };

  const clearFile = () => {
    setResume(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: FieldErrors = { ...validateFields(fields) };
    const resumeError = validateResume(resume);
    if (resumeError) nextErrors.resume = resumeError;
    if (!consent) nextErrors.consent = "Please accept the privacy policy.";

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      const first = Object.keys(nextErrors).find((k) => nextErrors[k as keyof FieldErrors]);
      if (first) document.getElementById(`apply-${first}`)?.focus();
      return;
    }

    const body = new FormData();
    body.append("job", jobSlug);
    Object.entries(fields).forEach(([key, value]) => body.append(key, value.trim()));
    body.append("resume", resume as File);
    body.append("consent", "yes");
    body.append("website", honeypot.current?.value ?? "");

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/apply", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setFields(emptyFields);
      setConsent(false);
      clearFile();
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <Column
        fillWidth
        gap="16"
        padding="40"
        radius="xl"
        border="success-alpha-medium"
        background="success-alpha-weak"
        horizontal="center"
        align="center"
        role="status"
        aria-live="polite"
      >
        <Icon name="check" size="xl" onBackground="success-medium" />
        <Heading as="h3" variant="heading-strong-xl">
          Application received!
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          Thanks for applying for the {jobTitle} role. Our team reviews every application — if your
          profile is a match, we&apos;ll reach out by email or phone within a few business days.
        </Text>
        <Button
          variant="secondary"
          size="m"
          onClick={() => setStatus("idle")}
          data-border="rounded"
        >
          Submit another application
        </Button>
      </Column>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="apply-status"
      style={{ width: "100%" }}
    >
      <Column fillWidth gap="20">
        {/* Honeypot field — hidden from people, tempting for bots */}
        <div aria-hidden="true" className={styles.honeypot}>
          <label htmlFor="apply-website">Website</label>
          <input
            ref={honeypot}
            id="apply-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Grid columns="2" s={{ columns: 1 }} gap="16" fillWidth>
          <Input
            id="apply-fullName"
            name="fullName"
            label="Full name *"
            autoComplete="name"
            value={fields.fullName}
            onChange={update("fullName")}
            maxLength={LIMITS.fullName}
            required
            error={!!errors.fullName}
            errorMessage={errors.fullName}
          />
          <Input
            id="apply-email"
            name="email"
            type="email"
            label="Email *"
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            maxLength={LIMITS.email}
            required
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <Input
            id="apply-phone"
            name="phone"
            type="tel"
            label="Phone number (with country code) *"
            autoComplete="tel"
            value={fields.phone}
            onChange={update("phone")}
            maxLength={LIMITS.phone}
            required
            error={!!errors.phone}
            errorMessage={errors.phone}
          />
          <Input
            id="apply-country"
            name="country"
            label="Country of residence"
            autoComplete="country-name"
            value={fields.country}
            onChange={update("country")}
            maxLength={LIMITS.country}
            error={!!errors.country}
            errorMessage={errors.country}
          />
        </Grid>

        <Input
          id="apply-profileUrl"
          name="profileUrl"
          type="url"
          label="LinkedIn, GitHub or portfolio URL"
          autoComplete="url"
          value={fields.profileUrl}
          onChange={update("profileUrl")}
          maxLength={LIMITS.profileUrl}
          error={!!errors.profileUrl}
          errorMessage={errors.profileUrl}
        />

        {/* Resume upload */}
        <Column gap="8" fillWidth>
          <label
            htmlFor="apply-resume"
            className={styles.dropzone}
            data-dragging={dragging || undefined}
            data-error={errors.resume ? true : undefined}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              pickFile(e.dataTransfer.files?.[0]);
            }}
          >
            <input
              ref={fileInput}
              id="apply-resume"
              name="resume"
              type="file"
              accept={RESUME_ACCEPT}
              className="visually-hidden"
              onChange={(e) => pickFile(e.target.files?.[0])}
              aria-invalid={!!errors.resume}
              aria-describedby="apply-resume-hint"
            />
            <Icon name={resume ? "document" : "upload"} size="l" onBackground="brand-weak" />
            {resume ? (
              <Column gap="4" horizontal="center" align="center">
                <Text variant="label-strong-m">{resume.name}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {formatSize(resume.size)} · Click to replace
                </Text>
              </Column>
            ) : (
              <Column gap="4" horizontal="center" align="center">
                <Text variant="label-strong-m">
                  Upload your resume <span aria-hidden="true">*</span>
                </Text>
                <Text id="apply-resume-hint" variant="body-default-xs" onBackground="neutral-weak">
                  Drag & drop or click to browse · PDF, DOC or DOCX · max 4 MB
                </Text>
              </Column>
            )}
          </label>
          {resume && (
            <Row>
              <Button variant="tertiary" size="s" onClick={clearFile} type="button">
                Remove file
              </Button>
            </Row>
          )}
          {errors.resume && (
            <Text variant="body-default-s" onBackground="danger-weak" role="alert">
              {errors.resume}
            </Text>
          )}
        </Column>

        <Textarea
          id="apply-message"
          name="message"
          label="Anything you'd like us to know? (optional)"
          lines={4}
          resize="vertical"
          value={fields.message}
          onChange={update("message")}
          maxLength={LIMITS.message}
          error={!!errors.message}
          errorMessage={errors.message}
        />

        <Column gap="8">
          <label htmlFor="apply-consent" className={styles.consent}>
          <input
            id="apply-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            aria-invalid={!!errors.consent}
          />
          <Text variant="body-default-s">
            I agree that BitCompass may store my details and share my profile with potential
            employers, as described in the <SmartLink href="/privacy">privacy policy</SmartLink>. *
          </Text>
        </label>
          {errors.consent && (
            <Text variant="body-default-s" onBackground="danger-weak" role="alert">
              {errors.consent}
            </Text>
          )}
        </Column>

        <div id="apply-status" aria-live="polite">
          {status === "error" && message && (
            <Feedback variant="danger" icon description={message} />
          )}
        </div>

        <Row fillWidth gap="16" vertical="center" s={{ direction: "column", vertical: "start" }}>
          <Button
            type="submit"
            size="l"
            loading={submitting}
            disabled={submitting}
            prefixIcon={submitting ? undefined : "send"}
            data-border="rounded"
          >
            {submitting ? "Sending application…" : "Submit application"}
          </Button>
          <Row gap="8" vertical="center">
            <Icon name="lock" size="xs" onBackground="neutral-weak" />
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Your information is sent securely and only shared with our recruiting team.
            </Text>
          </Row>
        </Row>
      </Column>
    </form>
  );
}
