"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, animate, useReducedMotion } from "motion/react";
import { LuImagePlus } from "react-icons/lu";

/* ---------------------------------------------------------------------------
 * HeroCube — a tall 3D box that turns to reveal a new image on a timer.
 *
 * 1. THE UPRIGHT GUARANTEE
 * ------------------------
 * Accumulating 90° turns is broken: after the first turn the box's axes are
 * re-oriented, the orientation wanders through all 24 rotations of the cube
 * group, and faces arrive rolled 90° or upside down. So the box never
 * accumulates — it always starts a turn from a known transform, and the slot
 * transforms are fixed constants, which makes the incoming face's net
 * transform provably the identity matrix every time:
 *
 *     up    : Rx( 90) · bottom-slot Rx(-90) = I
 *     down  : Rx(-90) · top-slot    Rx( 90) = I
 *     right : Ry( 90) · left-slot   Ry(-90) = I
 *     left  : Ry(-90) · right-slot  Ry( 90) = I
 *
 * 2. WHY VERTICAL AND HORIZONTAL TURNS BEHAVE DIFFERENTLY
 * -------------------------------------------------------
 * The box is taller than it is wide, so its faces are not all the same shape:
 * the four sides are portrait (bw × bh) and the top and bottom are square
 * (bw × bw).
 *
 * HORIZONTAL turns only ever swap portrait for portrait, so after the turn the
 * box can silently reset to identity and re-deal the revealed image onto the
 * front slot. Same shape in, same shape out — nothing moves.
 *
 * VERTICAL turns reveal a SQUARE face. Resetting there would move that image
 * from a square slot onto the portrait front slot, and it would visibly snap
 * from square to tall — the glitch. So vertical turns never reset. They go out
 * to 90°, hold on the square face, then come back to 0° revealing a fresh
 * portrait image on the front slot. The silhouette morphs tall → square → tall,
 * which is simply what a cuboid actually does when it rolls.
 *
 * 3. THE SWAPS ARE INVISIBLE
 * --------------------------
 * A slot at 90° to the camera is exactly edge-on: zero width, nothing painted.
 * Every image swap in here happens on a slot in that state, so none of them can
 * be seen. The useLayoutEffect commits the image before the transform clears,
 * so there is never a frame showing the old image square-on.
 * ------------------------------------------------------------------------- */

/* ── tuning ──────────────────────────────────────────────────────────────── */
const TURN_DURATION = 0.7; // seconds
const FACE_HOLD_MS = 4500; // rest on a portrait face
const FLAT_HOLD_MS = 3800; // rest on a square face — slightly shorter, it reads
                           // as a pause in the roll rather than a destination
const TURN_EASE = [0.6, 0.02, 0.16, 1];

/* ── geometry ────────────────────────────────────────────────────────────────
 * --bw is width AND depth, so the four sides share one size and the top and
 * bottom come out square. --bh is height.
 * -------------------------------------------------------------------------- */
const SLOT_TRANSFORM = {
  front: "translateZ(calc(var(--bw) / 2))",
  back: "rotateY(180deg) translateZ(calc(var(--bw) / 2))",
  right: "rotateY(90deg) translateZ(calc(var(--bw) / 2))",
  left: "rotateY(-90deg) translateZ(calc(var(--bw) / 2))",
  top: "rotateX(90deg) translateZ(calc(var(--bh) / 2))",
  bottom: "rotateX(-90deg) translateZ(calc(var(--bh) / 2))",
};

const SLOTS = ["front", "right", "back", "left", "top", "bottom"];
const SQUARE_SLOTS = new Set(["top", "bottom"]);

const MOVES = [
  { id: "right", axis: "Y", deg: 90, incoming: "left", flat: false },
  { id: "left", axis: "Y", deg: -90, incoming: "right", flat: false },
  { id: "up", axis: "X", deg: 90, incoming: "bottom", flat: true },
  { id: "down", axis: "X", deg: -90, incoming: "top", flat: true },
];

const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

/** Random move, never the exact reverse of the last, and never two vertical
 *  turns in a row — back-to-back square faces make the box look like it is
 *  stuck rocking rather than rolling. */
function pickMove(lastId, lastWasFlat) {
  let pool = MOVES.filter((m) => m.id !== OPPOSITE[lastId]);
  if (lastWasFlat) pool = pool.filter((m) => !m.flat);
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Which image sits on which slot. The four non-featured slots are only ever
 *  seen edge-on or mid-turn, so their ordering is cosmetic. */
function makeDeal(index, incomingSlot, count) {
  const deal = { front: index % count, [incomingSlot]: (index + 1) % count };
  SLOTS.filter((s) => s !== "front" && s !== incomingSlot).forEach((s, k) => {
    deal[s] = (index + 2 + k) % count;
  });
  return deal;
}

/* ── default images ──────────────────────────────────────────────────────────
 * An ordered sequence, not a face map. Prompt IDs map to HERO-CUBE-PROMPTS.md.
 * Positions 5 and 6 land on the square slots, so those two must be square.
 * -------------------------------------------------------------------------- */
const DEFAULT_IMAGES = [
  { promptId: "HERO-01", label: "The lab at night", src: "/photos/cube/hero-01.png", alt: "" },
  { promptId: "HERO-02", label: "Dashboard macro", src: null, alt: "" },
  { promptId: "HERO-03", label: "S/4HANA config", src: null, alt: "" },
  { promptId: "HERO-04", label: "Model and margin", src: null, alt: "" },
  { promptId: "HERO-05", label: "Desk from above", src: null, alt: "" },
  { promptId: "HERO-06", label: "Keyboard grid", src: null, alt: "" },
];

function Placeholder({ item }) {
  return (
    <div className="ruled flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-900 p-4 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/30 bg-acid/10 text-acid">
        <LuImagePlus aria-hidden="true" className="h-4 w-4" />
      </span>
      <p className="text-xs font-semibold leading-tight text-zinc-300">{item.label}</p>
      <span className="rounded-full border border-acid/30 bg-acid/10 px-2 py-0.5 font-mono text-[0.625rem] text-acid">
        {item.promptId}
      </span>
    </div>
  );
}

/* ── component ───────────────────────────────────────────────────────────── */
export default function HeroCube({ images = DEFAULT_IMAGES, className = "" }) {
  const count = images.length;

  const boxRef = useRef(null);
  const timer = useRef(null);
  const running = useRef(null);
  const paused = useRef(false);
  const lastMove = useRef(null);
  const scheduleRef = useRef(null);
  const featured = useRef(0); // index of the image currently facing the camera
  const pendingFlat = useRef(null); // the outbound vertical turn, awaiting return

  const [deal, setDeal] = useState(() => makeDeal(0, "bottom", count));
  const [resetAt, setResetAt] = useState(null);
  const [isFlat, setIsFlat] = useState(false); // a square face is forward
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  /* Preload so the first turn never reveals a half-painted face. Bails after
     4s so a dead CDN can't leave the box stuck on the loader. */
  useEffect(() => {
    const sources = images.map((i) => i.src).filter(Boolean);
    if (sources.length === 0) {
      setReady(true);
      return;
    }
    let cancelled = false;
    let done = 0;
    const settle = () => {
      if (!cancelled && ++done === sources.length) setReady(true);
    };
    sources.forEach((src) => {
      const img = new window.Image();
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
    });
    const bail = setTimeout(() => !cancelled && setReady(true), 4000);
    return () => {
      cancelled = true;
      clearTimeout(bail);
    };
  }, [images]);

  /* Horizontal turns only. Clears the transform after the new deal has hit the
     DOM but before paint, so no frame shows the box square-on with the old
     image. */
  useLayoutEffect(() => {
    if (!resetAt) return;
    if (boxRef.current) boxRef.current.style.transform = "none";
    setResetAt(null);
    scheduleRef.current?.();
  }, [resetAt]);

  useEffect(() => {
    if (!ready || reduce) return;

    const spin = (from, to, axis, onDone) => {
      running.current = animate(from, to, {
        duration: TURN_DURATION,
        ease: TURN_EASE,
        onUpdate: (v) => {
          if (boxRef.current) {
            boxRef.current.style.transform = `rotate${axis}(${v.toFixed(3)}deg)`;
          }
        },
        onComplete: () => {
          running.current = null;
          onDone();
        },
      });
    };

    /* Leg two of a vertical turn: come back to 0° revealing a fresh portrait
       image on the front slot. */
    const returnFromFlat = () => {
      if (paused.current || !boxRef.current) return;
      const move = pendingFlat.current;
      if (!move) return;

      const next = (featured.current + 1) % count;
      // The front slot is edge-on at 90°, so this swap cannot be seen.
      setDeal((d) => ({ ...d, front: next }));

      requestAnimationFrame(() => {
        if (paused.current || !boxRef.current) return;
        spin(move.deg, 0, move.axis, () => {
          featured.current = next;
          pendingFlat.current = null;
          setIsFlat(false);
          setDeal(makeDeal(next, "bottom", count));
          schedule();
        });
      });
    };

    const turn = () => {
      if (paused.current || !boxRef.current) return;

      // Still out on a square face? The job now is to come back.
      if (pendingFlat.current) {
        returnFromFlat();
        return;
      }

      const move = pickMove(lastMove.current, false);
      lastMove.current = move.id;

      const next = (featured.current + 1) % count;
      // The incoming slot is edge-on right now, so this swap is invisible.
      setDeal((d) => ({ ...d, [move.incoming]: next }));

      requestAnimationFrame(() => {
        if (paused.current || !boxRef.current) return;

        spin(0, move.deg, move.axis, () => {
          featured.current = next;

          if (move.flat) {
            // Square face forward. Do NOT reset — resetting would drop a square
            // image onto the portrait front slot and snap its shape. Hold here
            // and come back on the next tick.
            pendingFlat.current = move;
            setIsFlat(true);
            schedule();
          } else {
            // Portrait to portrait: safe to reset and re-deal.
            setDeal(makeDeal(next, "bottom", count));
            setResetAt(Date.now());
          }
        });
      });
    };

    const schedule = () => {
      clearTimeout(timer.current);
      if (paused.current || document.hidden) return;
      timer.current = setTimeout(turn, pendingFlat.current ? FLAT_HOLD_MS : FACE_HOLD_MS);
    };
    scheduleRef.current = schedule;

    // A hidden tab throws no rAF, so an armed timer would queue turns and fire
    // them in a burst on return. Stop the clock instead.
    const onVisibility = () => {
      if (document.hidden) clearTimeout(timer.current);
      else schedule();
    };

    schedule();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(timer.current);
      running.current?.stop();
      running.current = null;
      scheduleRef.current = null;
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ready, reduce, count]);

  /* Hover freezes the box. An in-flight turn finishes rather than stopping
     mid-way, which would leave it resting on an edge. */
  const pause = () => {
    paused.current = true;
    setHovered(true);
    clearTimeout(timer.current);
  };

  const resume = () => {
    paused.current = false;
    setHovered(false);
    if (!running.current) scheduleRef.current?.();
  };

  // The box bottom sits higher while a square face is forward, so the contact
  // shadow has to follow it or it detaches.
  const shadowOffset = isFlat ? "calc(var(--bw) / 2)" : "calc(var(--bh) / 2)";

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        // One knob sizes the whole box. Width doubles as depth, which is what
        // makes the top and bottom square and the four sides identical.
        "--bw": "clamp(196px, 56vw, 344px)",
        "--bh": "calc(var(--bw) * 1.42)",
        minHeight: "calc(var(--bh) + 2.5rem)",
        perspective: "1600px",
        perspectiveOrigin: "50% 44%",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: reduce ? 1 : [0, 1.1, 1] }}
      transition={{
        duration: reduce ? 0.3 : 0.95,
        times: reduce ? undefined : [0, 0.68, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
      tabIndex={0}
      role="img"
      aria-label="Rotating gallery of images from the Techtonic Lab training floor"
    >
      {/* Glow — a single horizontal bar sitting behind the middle of the box, so
          the light spills left and right only. Never a halo around all four
          sides: that reads as a sticker cut out of the page. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-acid blur-[55px]"
        style={{
          width: "calc(var(--bw) * 1.15)",
          height: "calc(var(--bw) * 0.34)",
        }}
        animate={{
          opacity: hovered ? 0.3 : 0.05,
          scaleX: hovered ? 1.12 : 0.92,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Contact shadow. Tracks the box bottom, which rises when a square face
          is forward. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 rounded-[50%] bg-black/70 blur-2xl transition-all duration-700 ease-out"
        style={{
          width: "calc(var(--bw) * 0.8)",
          height: "24px",
          transform: `translateY(${shadowOffset}) scaleX(${hovered ? 0.84 : 1})`,
          opacity: hovered ? 0.32 : 0.6,
        }}
      />

      {/* Float — hover only, so the resting state stays perfectly still */}
      <motion.div
        className="relative"
        style={{
          width: "var(--bw)",
          height: "var(--bh)",
          transformStyle: "preserve-3d",
        }}
        animate={hovered && !reduce ? { y: [0, -12, 0] } : { y: 0 }}
        transition={
          hovered && !reduce
            ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {/* The turning body. Transform is written imperatively — no React
            re-render per frame; the main thread touches one property. */}
        <div
          ref={boxRef}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {SLOTS.map((slot) => {
            const item = images[deal[slot] % count];
            const square = SQUARE_SLOTS.has(slot);
            return (
              <div
                key={slot}
                className="absolute overflow-hidden rounded-[1.4rem] border border-white/[0.12] bg-ink-900"
                style={{
                  width: "var(--bw)",
                  height: square ? "var(--bw)" : "var(--bh)",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) ${SLOT_TRANSFORM[slot]}`,
                  backfaceVisibility: "hidden",
                }}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={slot === "front" ? item.alt || "" : ""}
                    fill
                    sizes="(max-width: 640px) 60vw, 350px"
                    priority={slot === "front"}
                    className="object-cover"
                  />
                ) : (
                  <Placeholder item={item} />
                )}

                {/* Edge definition — without this the faces melt together at
                    oblique angles and the box stops reading as a solid. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/15"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Loader — a lime sweep in a box-shaped frame, cleared once decoded. */}
      {!ready ? (
        <div
          className="pointer-events-none absolute overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-900"
          style={{ width: "var(--bw)", height: "var(--bh)" }}
        >
          <div className="ruled absolute inset-0 opacity-50" />
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-acid/25 to-transparent"
            animate={{ x: ["-120%", "320%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="absolute inset-x-0 bottom-5 text-center text-2xs uppercase tracking-[0.2em] text-zinc-500">
            Loading
          </span>
        </div>
      ) : null}
    </motion.div>
  );
}