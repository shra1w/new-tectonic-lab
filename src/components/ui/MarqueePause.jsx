"use client";

import { LuPause, LuPlay } from "react-icons/lu";

/**
 * A keyboard-accessible pause/play control for the auto-scrolling marquees.
 * WCAG 2.2.2 (Pause, Stop, Hide) is Level A for anything that moves for more
 * than five seconds, and hover/touch alone does not satisfy it — a keyboard or
 * switch user needs a real, focusable control. This is that control.
 */
export default function MarqueePause({ paused, onToggle, className = "" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-2xs font-medium text-zinc-300 transition-colors hover:border-acid/50 hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${className}`}
    >
      {paused ? (
        <LuPlay aria-hidden="true" className="h-3 w-3" />
      ) : (
        <LuPause aria-hidden="true" className="h-3 w-3" />
      )}
      {paused ? "Play" : "Pause"}
    </button>
  );
}
