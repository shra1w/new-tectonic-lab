"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LuMessageCircle } from "react-icons/lu";
import { brand } from "@/lib/site";

/**
 * UX-14 — floating WhatsApp CTA. Highest-converting channel for a Nagpur
 * lead-gen site. Appears after the first screen so it never fights the hero.
 */
export default function WhatsAppFab() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href={brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Techtonic Lab on WhatsApp"
          initial={reduce ? false : { opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-acid px-4 py-3.5 text-ink-950 shadow-acid sm:bottom-7 sm:right-7"
        >
          <LuMessageCircle aria-hidden="true" className="h-5 w-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[10rem] group-focus-visible:max-w-[10rem]">
            WhatsApp us
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
