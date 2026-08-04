"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, animate, useReducedMotion } from "motion/react";
import { LuImagePlus } from "react-icons/lu";


const TURN_DURATION = 0.7;
const FACE_HOLD_MS = 4500; 
const FLAT_HOLD_MS = 3800; 
const TURN_EASE = [0.6, 0.02, 0.16, 1];


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


function pickMove(lastId, lastWasFlat) {
  let pool = MOVES.filter((m) => m.id !== OPPOSITE[lastId]);
  if (lastWasFlat) pool = pool.filter((m) => !m.flat);
  return pool[Math.floor(Math.random() * pool.length)];
}

function makeDeal(index, incomingSlot, count) {
  const deal = { front: index % count, [incomingSlot]: (index + 1) % count };
  SLOTS.filter((s) => s !== "front" && s !== incomingSlot).forEach((s, k) => {
    deal[s] = (index + 2 + k) % count;
  });
  return deal;
}


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

export default function HeroCube({ images = DEFAULT_IMAGES, className = "" }) {
  const count = images.length;

  const boxRef = useRef(null);
  const timer = useRef(null);
  const running = useRef(null);
  const paused = useRef(false);
  const lastMove = useRef(null);
  const scheduleRef = useRef(null);
  const featured = useRef(0);
  const pendingFlat = useRef(null); 

  const [deal, setDeal] = useState(() => makeDeal(0, "bottom", count));
  const [resetAt, setResetAt] = useState(null);
  const [isFlat, setIsFlat] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();


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

 
    const returnFromFlat = () => {
      if (paused.current || !boxRef.current) return;
      const move = pendingFlat.current;
      if (!move) return;

      const next = (featured.current + 1) % count;
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

      if (pendingFlat.current) {
        returnFromFlat();
        return;
      }

      const move = pickMove(lastMove.current, false);
      lastMove.current = move.id;

      const next = (featured.current + 1) % count;
      setDeal((d) => ({ ...d, [move.incoming]: next }));

      requestAnimationFrame(() => {
        if (paused.current || !boxRef.current) return;

        spin(0, move.deg, move.axis, () => {
          featured.current = next;

          if (move.flat) {
      
            pendingFlat.current = move;
            setIsFlat(true);
            schedule();
          } else {
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

  const shadowOffset = isFlat ? "calc(var(--bw) / 2)" : "calc(var(--bh) / 2)";

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{
       
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