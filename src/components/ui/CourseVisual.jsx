import Image from "next/image";

/* ---------------------------------------------------------------------------
 * CourseVisual — a course render blended into the dark theme on all four sides.
 *
 * Shared by the homepage course cards and the course-page hero so the image
 * treatment is defined once. The blend is four edge gradients fading from the
 * card colour (ink-950) to transparent, dissolving the hard rectangle so the
 * render reads as part of the surface rather than a photo dropped into a box.
 * The bottom edge fades longest because that is where the image meets text.
 *
 * `variant="card"`  — for the homepage grid (16:10, subtle inset frame)
 * `variant="hero"`  — for the course-page aside (taller, rounded, lime halo)
 * ------------------------------------------------------------------------- */
export default function CourseVisual({
  src,
  alt = "",
  variant = "card",
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  rounded = "",
}) {
  const hero = variant === "hero";

  return (
    <div className={`relative overflow-hidden bg-ink-950 ${rounded} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />

      {/* Bottom — the longest fade, meets the text/card below */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent ${
          hero ? "h-1/3" : "h-2/5"
        }`}
      />
      {/* Top */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-ink-950/85 to-transparent"
      />
      {/* Left + right — short, just enough to soften the vertical edges */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-ink-950/75 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-ink-950/75 to-transparent"
      />

      {/* Lime halo, hero only — ties the panel to the accent colour */}
      {hero ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 -z-10 bg-acid/[0.07] blur-3xl"
        />
      ) : null}

      {/* Faint inner frame so the panel keeps a defined shape */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
      />
    </div>
  );
}