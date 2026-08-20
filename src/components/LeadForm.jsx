"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LuCircleCheck, LuCircleAlert, LuSend, LuMail } from "react-icons/lu";
import { courses } from "@/lib/site";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
];

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  course: "",
  message: "",
  consent: false,
  website: "",
};

function validate(v) {
  const e = {};
  if (!v.firstName.trim()) e.firstName = "Enter your first name.";
  if (!v.lastName.trim()) e.lastName = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter an email address we can reply to.";
  if (!/^[6-9]\d{9}$/.test(v.mobile.replace(/\D/g, "")))
    e.mobile = "Enter a 10-digit Indian mobile number.";
  if (!v.course) e.course = "Pick a course, or choose “Not sure yet”.";
  if (!v.consent) e.consent = "Please tick the box so we can call or WhatsApp you.";
  return e;
}

function Field({ label, name, error, children, required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold text-zinc-300">
        {label}
        {required ? <span className="ml-1 text-acid">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-2xs text-red-400">
          <LuCircleAlert aria-hidden="true" className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* Pulsing three-dot loader — cleaner than a spinning icon and matches the
   restrained visual language of the rest of the site. */
function DotLoader({ tone = "dark" }) {
  const bg = tone === "dark" ? "bg-ink-950" : "bg-acid";
  return (
    <span className="inline-flex items-end gap-1" aria-hidden="true">
      <span className={`h-1.5 w-1.5 animate-bounce rounded-full ${bg} [animation-delay:0ms]`} />
      <span className={`h-1.5 w-1.5 animate-bounce rounded-full ${bg} [animation-delay:150ms]`} />
      <span className={`h-1.5 w-1.5 animate-bounce rounded-full ${bg} [animation-delay:300ms]`} />
    </span>
  );
}

const inputCx =
  "w-full rounded-xl border border-white/[0.12] bg-ink-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-acid focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

export default function LeadForm({ courseDefault = "", source = "website" }) {
  const [values, setValues] = useState({ ...EMPTY, course: courseDefault });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const attribution = useRef({});
  const reduce = useReducedMotion();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    UTM_KEYS.forEach((k) => {
      const stored = window.sessionStorage.getItem(`tl_${k}`);
      const fresh = params.get(k);
      if (fresh) window.sessionStorage.setItem(`tl_${k}`, fresh);
      const value = fresh || stored;
      if (value) found[k] = value;
    });
    found.landing_page = window.location.pathname;
    found.referrer = document.referrer || "direct";
    attribution.current = found;
  }, []);

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const setConsent = (e) => {
    const checked = e.target.checked;
    setValues((v) => ({ ...v, consent: checked }));
    setErrors((prev) => (prev.consent ? { ...prev, consent: undefined } : prev));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (values.website) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const payload = {
      ...values,
      ...attribution.current,
      source,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setStatus("sent");
      setValues({ ...EMPTY, course: courseDefault });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="success"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-acid/30 bg-acid/[0.07] p-6"
          role="status"
          aria-live="polite"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent"
          />
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-acid/15 ring-1 ring-acid/40">
              <LuCircleCheck aria-hidden="true" className="h-5 w-5 text-acid" />
            </span>
            <h3 className="font-display text-xl font-semibold text-zinc-50">
              Request received
            </h3>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            Our team will call you within <strong className="text-zinc-100">4 business hours</strong>,
            Monday to Saturday. A confirmation is on its way to your inbox with the
            course brochure and next steps.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
            <LuMail aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
            <span>Check your spam folder if you don't see it in a few minutes.</span>
          </div>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn-ghost mt-6 !py-2.5 !text-[0.8125rem]"
          >
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={false}
          className="relative space-y-5"
        >
          {/* Sending overlay — dims form, keeps it interactive-frozen */}
          {isSending && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-ink-950/40 backdrop-blur-[1px]"
            >
              <div className="flex items-center gap-3 rounded-full border border-acid/30 bg-ink-950/90 px-5 py-3 shadow-xl">
                <DotLoader tone="light" />
                <span className="font-display text-sm font-semibold text-zinc-100">
                  Sending your request
                </span>
              </div>
            </div>
          )}

          {status === "error" ? (
            <p
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
            >
              <LuCircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {errorMsg || "That did not send."} Please try again, or call us on{" "}
                <a href="tel:+918766069947" className="underline underline-offset-2">
                  +91 87660 69947
                </a>{" "}
                — we do not want to lose your enquiry to a bad connection.
              </span>
            </p>
          ) : null}

          <fieldset disabled={isSending} className="contents">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" name="firstName" error={errors.firstName} required>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className={inputCx}
                  placeholder="Rahul"
                  value={values.firstName}
                  onChange={set("firstName")}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
              </Field>

              <Field label="Last name" name="lastName" error={errors.lastName} required>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className={inputCx}
                  placeholder="Sharma"
                  value={values.lastName}
                  onChange={set("lastName")}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" name="email" error={errors.email} required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={inputCx}
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </Field>

              <Field label="Mobile number" name="mobile" error={errors.mobile} required>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  className={inputCx}
                  placeholder="9876543210"
                  value={values.mobile}
                  onChange={set("mobile")}
                  aria-invalid={!!errors.mobile}
                  aria-describedby={errors.mobile ? "mobile-error" : undefined}
                />
              </Field>
            </div>

            <Field
              label="Which course are you interested in?"
              name="course"
              error={errors.course}
              required
            >
              <select
                id="course"
                name="course"
                className={`${inputCx} appearance-none`}
                value={values.course}
                onChange={set("course")}
                aria-invalid={!!errors.course}
                aria-describedby={errors.course ? "course-error" : undefined}
              >
                <option value="">Select a course</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet — help me choose</option>
              </select>
            </Field>

            <Field label="How can we help you?" name="message">
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${inputCx} resize-y`}
                placeholder="Tell us which course you're interested in, and a bit about your background."
                value={values.message}
                onChange={set("message")}
              />
            </Field>

            {/* Honeypot */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
            >
              <label htmlFor="website">Company website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={set("website")}
              />
            </div>

            <div>
              <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={setConsent}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/20 bg-ink-950 text-acid accent-acid focus:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                />
                <span className="text-xs leading-relaxed text-zinc-500">
                  I agree to be contacted by Techtonic Lab by phone, WhatsApp or email about my
                  enquiry, and I accept the{" "}
                  <Link href="/privacy-policy" className="text-zinc-300 underline underline-offset-2">
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-service" className="text-zinc-300 underline underline-offset-2">
                    terms of service
                  </Link>
                  . We never sell your data.
                </span>
              </label>
              {errors.consent ? (
                <p id="consent-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-2xs text-red-400">
                  <LuCircleAlert aria-hidden="true" className="h-3.5 w-3.5" />
                  {errors.consent}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn-primary w-full disabled:opacity-70 sm:w-auto"
            >
              {isSending ? (
                <>
                  <DotLoader tone="dark" />
                  Sending
                </>
              ) : (
                <>
                  <LuSend aria-hidden="true" className="h-4 w-4" />
                  Send my request
                </>
              )}
            </button>

            <p className="text-xs leading-relaxed text-zinc-500">
              We call within 4 business hours, Monday to Saturday.
            </p>
          </fieldset>
        </motion.form>
      )}
    </AnimatePresence>
  );
}