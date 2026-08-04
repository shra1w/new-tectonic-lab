"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LuCookie } from "react-icons/lu";

const KEY = "tl-cookie-consent";


export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function choose(value) {
    window.localStorage.setItem(KEY, value);
    setOpen(false);
    if (value === "accepted") {
      // Fire GA4 / Google Ads / Meta Pixel here — never before this point.
      window.dispatchEvent(new CustomEvent("tl:consent-granted"));
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
        >
          <div className="card p-5 shadow-lift">
            <div className="flex items-start gap-3">
              <LuCookie aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-acid" />
              <p className="text-xs leading-relaxed text-zinc-400">
                We use cookies for analytics and advertising measurement. Nothing loads until
                you choose. Read our{" "}
                <Link href="/privacy-policy" className="text-zinc-200 underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <div className="mt-4 flex gap-2.5">
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="btn-primary flex-1 !py-2.5 !text-[0.8125rem]"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="btn-ghost flex-1 !py-2.5 !text-[0.8125rem]"
              >
                Reject
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
