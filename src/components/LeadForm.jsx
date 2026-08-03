"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  LuCircleCheck,
  LuCircleAlert,
  LuSend,
  LuLoader,
} from "react-icons/lu";
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
  website: "", // honeypot — real users never see or fill this
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

const inputCx =
  "w-full rounded-xl border border-white/[0.12] bg-ink-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-acid focus:outline-none";

export default function LeadForm({ courseDefault = "", source = "website" }) {
  const [values, setValues] = useState({ ...EMPTY, course: courseDefault });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const attribution = useRef({});
  const reduce = useReducedMotion();

  // Section 5.2 — capture UTM + gclid so Google Ads offline conversions work later.
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (values.website) return; // bot filled the honeypot

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");

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
      if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`);
      setStatus("sent");
      setValues({ ...EMPTY, course: courseDefault });
    } catch (err) {
      // Never lose a lead to a network blip — tell the person how to reach us.
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="success"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-acid/30 bg-acid/[0.07] p-6"
          role="status"
          aria-live="polite"
        >
          <LuCircleCheck aria-hidden="true" className="h-7 w-7 text-acid" />
          <h3 className="mt-4 font-display text-xl font-semibold text-zinc-50">
            Request received
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Our team will call you within 4 business hours, Monday to Saturday. In the
            meantime, check your inbox — the course brochure is on its way.
          </p>
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
          className="space-y-5"
        >
          {status === "error" ? (
            <p
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
            >
              <LuCircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                That did not send. Please try once more, or call us on +91 87660 69947 — we do
                not want to lose your enquiry to a bad connection.
              </span>
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" name="firstName" error={errors.firstName} required>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                className={inputCx}
                placeholder="Neha"
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
                placeholder="Deshmukh"
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

          {/* Honeypot — hidden from people, irresistible to bots */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
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

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full disabled:opacity-70 sm:w-auto"
          >
            {status === "sending" ? (
              <>
                <LuLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
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
            We call within 4 business hours, Monday to Saturday. By submitting this form
            you agree to our{" "}
            <Link href="/privacy-policy" className="text-zinc-300 underline underline-offset-2">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-of-service" className="text-zinc-300 underline underline-offset-2">
              terms of service
            </Link>
            . We never sell your data.
          </p>
        </motion.form>
      )}
    </AnimatePresence>

  );
}
