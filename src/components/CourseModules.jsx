"use client";

import { useEffect, useState } from "react";
import { LuArrowUpRight, LuX, LuCheck, LuDownload, LuPlus, LuMinus } from "react-icons/lu";
import { toolInfo } from "@/lib/courses";

/* How many module chips to show before collapsing the rest behind "+N more".
   The tools arrays in site.js are ordered most in-demand first, so the visible
   few are the ones prospects actually scan for. */
const VISIBLE = 5;

/* Data Analytics / Data Science module buttons.
   Rendered in the same size/style as the SAP "Choose your module" buttons so
   every course card looks uniform. Tapping a module opens a small dialog with
   its basic details. Only the top few are shown up front; the full list expands
   in place. A "Download syllabus" link pulls the branded PDF for the course. */
export default function CourseModules({ tools = [], slug }) {
  const [active, setActive] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const info = active ? toolInfo[active] : null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const hasMore = tools.length > VISIBLE;
  const visibleTools = expanded ? tools : tools.slice(0, VISIBLE);
  const hiddenCount = tools.length - VISIBLE;

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Modules covered
        </p>
        {slug ? (
          <a
            href={`/syllabi/${slug}.pdf`}
            download
            className="inline-flex items-center gap-1.5 text-2xs font-semibold text-acid transition-colors hover:text-acid-soft"
          >
            <LuDownload aria-hidden="true" className="h-3.5 w-3.5" />
            Download syllabus
          </a>
        ) : null}
      </div>

      <ul className="mt-2.5 grid grid-cols-2 gap-2">
        {visibleTools.map((t) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => setActive(t)}
              aria-haspopup="dialog"
              className="group/mod flex w-full items-center justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-left text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.06]"
            >
              <span className="truncate">{t}</span>
              <LuArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors group-hover/mod:text-acid"
              />
            </button>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-2xs font-semibold text-zinc-300 transition-colors hover:border-acid/40 hover:text-acid"
        >
          {expanded ? (
            <>
              <LuMinus aria-hidden="true" className="h-3 w-3" />
              Show fewer
            </>
          ) : (
            <>
              <LuPlus aria-hidden="true" className="h-3 w-3" />
              {hiddenCount} more
            </>
          )}
        </button>
      ) : null}

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active} — module details`}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />
          <div
            className="card relative z-10 w-full max-w-md p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:border-acid hover:text-acid"
            >
              <LuX aria-hidden="true" className="h-4 w-4" />
            </button>

            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-acid">Module</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-zinc-50">{active}</h3>
            {info ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{info.blurb}</p>
                <h4 className="mt-5 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  What you'll learn
                </h4>
                <ul className="mt-3 space-y-2">
                  {info.learn.map((l) => (
                    <li key={l} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                      {l}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                A hands-on module covered in full during the course.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
