"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LuMenu, LuX, LuChevronDown, LuPhone, LuGraduationCap } from "react-icons/lu";
import { nav, brand, studentPortal } from "@/lib/site";
import Image from "next/image";

function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="TECHTONIC LAB — home"
      className="group flex items-center gap-1"
    >
      <Image src={"/logos/logo.svg"} alt="techtonic-lab-logo" className="" width={50} height={50}/>
      <span className="leading-none pt-1">
        <span className="block font-display text-nowrap text-[1.4625rem] font-semibold tracking-tight text-zinc-50">
          TECHTONIC-LAB
        </span>
      
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-ink-950/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-50"
                >
                  {item.label}
                  {item.children ? (
                    <LuChevronDown
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                    />
                  ) : null}
                </Link>

                {item.children ? (
                  <div className="invisible absolute left-0 top-full w-[19rem] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="card overflow-hidden p-1.5 shadow-lift">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block rounded-xl px-3.5 py-3 transition-colors hover:bg-white/[0.06]"
                          >
                            <span className="block text-sm font-semibold text-zinc-100">
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-zinc-500">
                              {child.note}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Student Login — full label on desktop, icon-only on tablet so it
              never wraps or crowds the Reserve button. Hidden on mobile (it
              also lives in the mobile drawer below). */}
          <a
            href={studentPortal.url}
            target={studentPortal.url.startsWith("http") ? "_blank" : undefined}
            rel={studentPortal.url.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={studentPortal.label}
            title={studentPortal.label}
            className="hidden h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 px-3 text-[0.8125rem] font-medium text-zinc-300 transition-colors hover:border-acid/50 hover:text-acid sm:inline-flex lg:px-3.5"
          >
            <LuGraduationCap aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline">{studentPortal.label}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-zinc-100 lg:hidden"
          >
            {open ? (
              <LuX aria-hidden="true" className="h-5 w-5" />
            ) : (
              <LuMenu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={reduce ? {} : { opacity: 1, height: "auto" }}
            exit={reduce ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/98 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="shell max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-5">
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-zinc-200 hover:bg-white/[0.05]"
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="ml-3 space-y-1 border-l border-white/10 pl-3">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2.5 hover:bg-white/[0.05]"
                            >
                              <span className="block text-sm font-semibold text-zinc-100">
                                {child.label}
                              </span>
                              <span className="block text-xs text-zinc-500">{child.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-2.5 pb-2">
                <Link
                  href="/connect-with-us"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Book a free consultation
                </Link>
                <a
                  href={studentPortal.url}
                  target={studentPortal.url.startsWith("http") ? "_blank" : undefined}
                  rel={studentPortal.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="btn-ghost w-full"
                >
                  <LuGraduationCap aria-hidden="true" className="h-4 w-4" />
                  {studentPortal.label}
                </a>
                <a href={brand.phoneHref} className="btn-ghost w-full">
                  <LuPhone aria-hidden="true" className="h-4 w-4" />
                  {brand.phone}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
