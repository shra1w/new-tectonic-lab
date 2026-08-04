"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import {
  LuHeadset,
  LuX,
  LuCircleAlert,
  LuCircleCheck,
  LuSend,
  LuLoader,
  LuSparkles,
} from "react-icons/lu";
import { courses, chatbot } from "@/lib/site";



const APPEAR_DELAY = 1000;
const TEASE_IN = 2800;
const TEASE_OUT = 9500;
const PING_STOP = 8500;

const WA_GREEN = "#25D366";

/* ── the counselling form ────────────────────────────────────────────────── */

const EMPTY = { name: "", mobile: "", course: "", email: "", website: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!/^[6-9]\d{9}$/.test(v.mobile.replace(/\D/g, "")))
    e.mobile = "Enter a 10-digit Indian mobile number.";
  if (!v.course) e.course = "Pick a course, or choose “Not sure yet”.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "That email address doesn't look right.";
  return e;
}

const inputCx =
  "w-full rounded-xl border border-white/[0.12] bg-ink-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-acid focus:outline-none";

function Field({ label, name, error, optional, children }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 flex items-baseline gap-2 text-xs font-semibold text-zinc-300"
      >
        {label}
        {optional ? (
          <span className="text-2xs font-normal text-zinc-600">optional</span>
        ) : (
          <span className="text-acid">*</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-2xs text-red-400"
        >
          <LuCircleAlert aria-hidden="true" className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CounsellingDialog({ open, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const firstField = useRef(null);
  const panelRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 280);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Keep Tab inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onTab = (e) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll(
        'button, input, select, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setValues(EMPTY);
      setErrors({});
      setStatus("idle");
    }, 320);
    return () => clearTimeout(t);
  }, [open]);

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((p) => (p[name] ? { ...p, [name]: undefined } : p));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (values.website) return; // honeypot

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");

    const payload = {
      name: values.name.trim(),
      mobile: values.mobile.replace(/\D/g, "").slice(-10),
      course: values.course,
      email: values.email.trim() || null,
      source: "floating-counselling",
      submittedAt: new Date().toISOString(),
    };

    console.log("Free counselling request →", payload);

    await new Promise((r) => setTimeout(r, 600));
    setStatus("sent");
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="counselling-title"
            className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/[0.12] bg-ink-900 shadow-lift"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.8 }}
          >
            <div aria-hidden="true" className="ruled absolute inset-0 opacity-40" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:border-acid/60 hover:text-acid"
            >
              <LuX aria-hidden="true" className="h-4 w-4" />
            </button>

            <div className="relative p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="py-4 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.span
                      className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-acid/30 bg-acid/10 text-acid"
                      initial={{ scale: 0.4, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    >
                      <LuCircleCheck aria-hidden="true" className="h-7 w-7" />
                    </motion.span>
                    <h2 className="mt-5 font-display text-2xl font-semibold text-zinc-50">
                      Got it, {values.name.split(" ")[0] || "thanks"}
                    </h2>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
                      A counsellor will call within 4 business hours, Monday to Saturday.
                      They will ask about your background and tell you honestly which
                      course fits — including when the answer is none of them.
                    </p>
                    <button type="button" onClick={onClose} className="btn-primary mt-7">
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={false}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="eyebrow">
                      <LuSparkles aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                      Free · 20 minutes · No sales script
                    </p>
                    <h2
                      id="counselling-title"
                      className="mt-3 font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-[1.75rem]"
                    >
                      Book free counselling
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      Three quick details and a counsellor calls you back. We will tell
                      you which of the three courses actually suits your background — or
                      that none of them do.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
                      <Field label="Your name" name="name" error={errors.name}>
                        <input
                          ref={firstField}
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          className={inputCx}
                          placeholder="Neha Deshmukh"
                          value={values.name}
                          onChange={set("name")}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                      </Field>

                      <Field label="Mobile number" name="mobile" error={errors.mobile}>
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

                      <Field
                        label="Course you're interested in"
                        name="course"
                        error={errors.course}
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

                      <Field label="Email" name="email" error={errors.email} optional>
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

                      {/* Honeypot — invisible to people, irresistible to bots */}
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

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-primary w-full disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <LuLoader aria-hidden="true" className="h-4 w-4 animate-spin" />
                            Sending
                          </>
                        ) : (
                          <>
                            <LuSend aria-hidden="true" className="h-4 w-4" />
                            Request my call back
                          </>
                        )}
                      </button>

                      <p className="text-2xs leading-relaxed text-zinc-500">
                        We call within 4 business hours, Mon–Sat. We never sell your data,
                        and there is no obligation to enrol.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

/* ── the two floating buttons ────────────────────────────────────────────── */

export default function FloatingActions() {
  const [shown, setShown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tease, setTease] = useState(false);
  const [pinging, setPinging] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timers = [
      setTimeout(() => setShown(true), APPEAR_DELAY),
      setTimeout(() => setTease(true), TEASE_IN),
      setTimeout(() => setTease(false), TEASE_OUT),
      setTimeout(() => setPinging(false), PING_STOP),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

 
  const waHref = `https://wa.me/${chatbot.number}?text=${encodeURIComponent(
    `${chatbot.greeting} [floating-button]`
  )}`;

  const spring = { type: "spring", stiffness: 340, damping: 22, mass: 0.7 };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.4 },
    show: { opacity: 1, y: 0, scale: 1, transition: spring },
  };

  return (
    <>
      <AnimatePresence>
        {shown ? (
          <motion.div
            className="fixed bottom-5 right-4 z-[100000] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7 sm:gap-3.5"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
            }}
          >
            <motion.div variants={item} className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-xl"
                style={{ background: WA_GREEN, opacity: 0.35 }}
              />
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-full text-white shadow-lift transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] md:h-auto md:w-auto md:px-6 md:py-4"
                style={{ backgroundColor: WA_GREEN }}
              >
                <FaWhatsapp aria-hidden="true" className="h-7 w-7 shrink-0 md:h-6 md:w-6" />
                <span className="hidden text-[0.9375rem] font-semibold md:inline">
                  WhatsApp us
                </span>
              </a>
            </motion.div>

            <motion.div variants={item} className="relative">
              {pinging && !reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-acid"
                  animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                  transition={{ duration: 1.9, repeat: 2, ease: "easeOut" }}
                />
              ) : null}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-acid opacity-30 blur-xl"
              />

              <AnimatePresence>
                {tease && !reduce ? (
                  <motion.span
                    className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/95 px-4 py-2.5 text-xs font-semibold text-zinc-100 shadow-lift backdrop-blur-xl md:bottom-auto md:right-full md:top-1/2 md:mb-0 md:mr-3 md:-translate-y-1/2"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  >
                    Not sure which course? Ask us
                  </motion.span>
                ) : null}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                aria-label="Book free counselling"
                aria-haspopup="dialog"
                className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-full bg-acid text-ink-950 shadow-acid transition-transform duration-200 hover:scale-[1.04] hover:bg-acid-soft active:scale-[0.97] md:h-auto md:w-auto md:px-6 md:py-4"
              >
                <LuHeadset aria-hidden="true" className="h-7 w-7 shrink-0 md:h-6 md:w-6" />
                <span className="hidden text-[0.9375rem] font-semibold md:inline">
                  Book free counselling
                </span>
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CounsellingDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}