"use client";

import { useState, type FormEvent } from "react";
import styles from "./Contact.module.css";
import { Reveal } from "../effects/Reveal";
import { Button } from "../ui/Button";
import { SITE } from "@/data/meta";

/** Field keys we validate. */
type Field = "name" | "email" | "subject" | "msg";

/** Per-field validator. Returns "" on success or an error message. */
type Validator = (value: string) => string;

const validators: Record<Field, Validator> = {
  name: (v) => (v.trim().length > 0 ? "" : "please tell me your name"),
  email: (v) => {
    if (!v.trim()) return "email is required";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? ""
      : "that doesn’t look like a valid email";
  },
  subject: (v) => (v.trim().length > 0 ? "" : "a short subject helps me triage"),
  msg: (v) =>
    v.trim().length >= 10 ? "" : "a few words about the project (10+ chars)",
};

const FIELDS: Array<{
  id: Field;
  label: string;
  placeholder: string;
  multiline?: boolean;
}> = [
  { id: "name", label: "name", placeholder: "Jane Doe" },
  { id: "email", label: "email", placeholder: "jane@company.com" },
  { id: "subject", label: "subject", placeholder: "QA for our payments app" },
  {
    id: "msg",
    label: "message",
    placeholder:
      "A bit about the project, the team size, timeline, and what 'quality' means to you on this one.",
    multiline: true,
  },
];

/**
 * Contact section: left-side direct links column + right-side form with
 * required-field validation, inline error messages, and a green "Sent"
 * success state.
 */
export function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className={styles.grid}>
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  const items = [
    { label: "email", val: SITE.email, href: `mailto:${SITE.email}`, arrow: "→" },
    {
      label: "linkedin",
      val: SITE.linkedin.handle,
      href: SITE.linkedin.url,
      arrow: "↗",
      external: true,
    },
    {
      label: "github",
      val: SITE.github.handle,
      href: SITE.github.url,
      arrow: "↗",
      external: true,
    },
    {
      label: "resume",
      val: SITE.resumeFileName,
      href: SITE.resumeUrl,
      arrow: "↓",
    },
  ] as const;

  return (
    <Reveal className={styles.side}>
      <div className="sectionTag">05 · Contact</div>
      <h2>
        got a suite that
        <br />
        needs <span className={styles.accent}>a second pair</span>
        <br />
        of careful eyes?
      </h2>
      <p>
        Open to chat about QA, automation, test strategy, or just trading bug
        stories. Currently building things at WidaTech — but the inbox is
        always open. I actually read everything.
      </p>
      <ul className={`${styles.list} contact-list`}>
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              {...("external" in it && it.external
                ? { target: "_blank", rel: "noopener" }
                : {})}
            >
              <span>
                <span className={styles.label}>{it.label}</span>
                <span className={styles.val}>{it.val}</span>
              </span>
              <span>{it.arrow}</span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function ContactForm() {
  // One controlled state object per field + companion error map.
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    subject: "",
    msg: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [missingCount, setMissingCount] = useState(0);

  function validateField(id: Field, value: string): boolean {
    const msg = validators[id](value);
    setErrors((prev) => ({ ...prev, [id]: msg || undefined }));
    return !msg;
  }

  function handleChange(id: Field, value: string) {
    setValues((v) => ({ ...v, [id]: value }));
    // Live-clear an existing error as soon as it's resolved.
    if (errors[id]) validateField(id, value);
  }

  function handleBlur(id: Field) {
    validateField(id, values[id]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const results = FIELDS.map((f) => validateField(f.id, values[f.id]));
    const allGood = results.every(Boolean);

    if (!allGood) {
      const missing = results.filter((r) => !r).length;
      setMissingCount(missing);
      // Focus the first invalid field for keyboard users.
      const firstBadIndex = results.indexOf(false);
      if (firstBadIndex >= 0) {
        document.getElementById(FIELDS[firstBadIndex].id)?.focus();
      }
      return;
    }

    setMissingCount(0);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setValues({ name: "", email: "", subject: "", msg: "" });
      setErrors({});
    }, 2200);
  }

  return (
    <Reveal delay={1}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {FIELDS.map((f) => {
          const invalid = !!errors[f.id];
          return (
            <div
              key={f.id}
              className={`${styles.row} ${invalid ? styles.invalid : ""}`.trim()}
            >
              <label htmlFor={f.id}>
                {f.label}{" "}
                <span className={styles.req} aria-hidden="true">
                  *
                </span>
              </label>
              {f.multiline ? (
                <textarea
                  id={f.id}
                  name={f.id}
                  placeholder={f.placeholder}
                  required
                  aria-required="true"
                  aria-invalid={invalid || undefined}
                  value={values[f.id]}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  onBlur={() => handleBlur(f.id)}
                />
              ) : (
                <input
                  id={f.id}
                  name={f.id}
                  type={f.id === "email" ? "email" : "text"}
                  placeholder={f.placeholder}
                  required
                  aria-required="true"
                  aria-invalid={invalid || undefined}
                  value={values[f.id]}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  onBlur={() => handleBlur(f.id)}
                />
              )}
              <span className={styles.error}>{errors[f.id]}</span>
            </div>
          );
        })}

        <div className={styles.submitRow}>
          <span
            className={`${styles.hint} ${
              missingCount > 0 ? styles.errorTone : ""
            }`}
          >
            <span className={styles.dot} aria-hidden="true" />
            {missingCount > 0
              ? `${missingCount} field${missingCount > 1 ? "s" : ""} need${
                  missingCount > 1 ? "" : "s"
                } your attention`
              : "all fields required · usually replies within 24h"}
          </span>
          <Button
            type="submit"
            variant="primary"
            arrow="→"
            className={submitted ? styles.sent : undefined}
            disabled={submitted}
          >
            {submitted ? "✓ Sent" : "Send message"}
          </Button>
        </div>
      </form>
    </Reveal>
  );
}
