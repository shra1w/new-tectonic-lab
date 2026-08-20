"use client";

import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

/**
 * BuyCourseButton
 * ─────────────────────────────────────────────────────────────────────────
 * A single reusable component for every "purchase this course" call to
 * action on the site — nav bar, hero, course cards, mid-page bands, footer.
 *
 * Variants
 *   • "cta"     Full lime button that says "Reserve your seat". The default.
 *               Use in hero, course cards, mid-page CTA bands.
 *   • "header"  Compact acid-outline button with cart + "Reserve" label.
 *               Text collapses on mobile so the nav shows the icon only.
 *   • "ghost"   Muted outline. For secondary placements where the primary
 *               CTA already lives above or below it.
 *
 * Hover animation
 *   Two carts sit stacked in a masked frame. On hover the visible cart
 *   rolls off to the right while a fresh cart rolls in from the left —
 *   the visual metaphor is an item being scanned through a checkout.
 *   The CTA variant also gets a shine sweep and a subtle lift with an
 *   acid shadow so it feels tactile.
 *
 *   The two carts overlap at rest and both use standard Tailwind
 *   transitions, so `prefers-reduced-motion` users still see the state
 *   swap but without the slide — no extra code needed.
 * ---------------------------------------------------------------------- */

export default function BuyCourseButton({
  href = "/connect-with-us",
  variant = "cta",
  size,             // "sm" | "md" | "lg" — auto-picks by variant if omitted
  label,            // override the default text
  className = "",
  ariaLabel,
  ...rest
}) {
  const isHeader = variant === "header";
  const resolvedSize = size ?? (isHeader ? "sm" : "md");

  const defaultLabel = isHeader ? "Reserve" : "Reserve your seat";
  const text = label ?? defaultLabel;

  const base =
    "group/buy relative inline-flex items-center justify-center overflow-hidden rounded-full font-display font-semibold tracking-tight transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 active:scale-[0.98]";

  const sizes = {
    sm: "gap-1.5 px-3.5 py-1.5 text-xs",
    md: "gap-2 px-5 py-2.5 text-sm",
    lg: "gap-2.5 px-6 py-3 text-[0.9375rem]",
  };

  const variants = {
    cta:
      "bg-acid text-ink-950 shadow-[0_2px_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:bg-acid-soft hover:shadow-[0_12px_30px_-10px_rgba(234,253,86,0.6)] active:translate-y-0 active:shadow-[0_2px_0_rgba(0,0,0,0.15)]",
    header:
      "border border-acid/30 bg-acid/10 text-acid backdrop-blur hover:border-acid/60 hover:bg-acid/15 hover:shadow-[0_6px_22px_-8px_rgba(234,253,86,0.45)]",
    ghost:
      "border border-white/15 bg-white/[0.04] text-zinc-100 hover:border-acid/50 hover:bg-acid/10 hover:text-acid",
  };

  const iconSize =
    resolvedSize === "sm"
      ? "h-3.5 w-3.5"
      : resolvedSize === "lg"
      ? "h-[1.125rem] w-[1.125rem]"
      : "h-4 w-4";

  const frameSize =
    resolvedSize === "sm"
      ? "h-3.5 w-4"
      : resolvedSize === "lg"
      ? "h-[1.125rem] w-5"
      : "h-4 w-[1.125rem]";

  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? (isHeader ? "Reserve a seat" : undefined)}
      className={[base, sizes[resolvedSize], variants[variant], className].join(" ")}
      {...rest}
    >
      {/* Shine sweep — sits behind everything and slides across on hover.
          Only rendered for the lime CTA where the white gradient reads
          cleanly; on tinted variants it would muddy the accent colour. */}
      {variant === "cta" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 ease-out group-hover/buy:translate-x-full group-hover/buy:opacity-100"
        />
      )}

      {/* Dual-cart swap frame. Both carts share the same absolute-centered
          position so at rest the icon looks static; on hover the visible
          one rolls out right and the fresh one rolls in from the left. */}
      <span
        className={`relative inline-flex ${frameSize} items-center justify-center overflow-hidden`}
      >
        {/* Cart at rest — rolls off to the right on hover */}
        <LuShoppingCart
          aria-hidden="true"
          strokeWidth={2.25}
          className={`absolute ${iconSize} transition-all duration-300 ease-in-out group-hover/buy:translate-x-6 group-hover/buy:opacity-0`}
        />
        {/* Incoming cart — waits off-screen left, rolls in on hover */}
        <LuShoppingCart
          aria-hidden="true"
          strokeWidth={2.25}
          className={`absolute ${iconSize} -translate-x-6 opacity-0 transition-all duration-300 ease-in-out group-hover/buy:translate-x-0 group-hover/buy:opacity-100`}
        />
      </span>

      {/* Label — hidden below sm on the header variant so mobile nav shows
          the icon alone. Everywhere else the label always shows. */}
      <span className={isHeader ? "hidden sm:inline" : "relative"}>
        {text}
      </span>
    </Link>
  );
}