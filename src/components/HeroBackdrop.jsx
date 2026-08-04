"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";



const CYCLE_MS = 6500;
const FADE_S = 1.5;

export default function HeroBackdrop({ images = [], cycleMs = CYCLE_MS }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const count = images.length;

  useEffect(() => {
    if (count < 2 || reduce) return;

    let id;
    const tick = () => {
      id = setTimeout(() => {
        if (!document.hidden) setIndex((i) => (i + 1) % count);
        tick();
      }, cycleMs);
    };
    tick();
    return () => clearTimeout(id);
  }, [count, cycleMs, reduce]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {count > 0 ? (
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.3 : FADE_S, ease: "easeInOut" }}
            >
              
              <motion.div
                className="absolute inset-0"
                initial={{ scale: reduce ? 1 : 1.14 }}
                animate={{ scale: 1 }}
                transition={{ duration: reduce ? 0 : (cycleMs / 1000) * 2.4, ease: "linear" }}
              >
                <Image
                  src={images[index].src}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={82}
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ) : (
        
          <div className="ruled absolute inset-0 opacity-70" />
        )}


        <div className="absolute inset-0 bg-ink-950/72" />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 via-45% to-ink-950/15" />

        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,rgba(9,9,11,0.7)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink-950 to-transparent" />

        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/90 to-transparent" />

        <div className="ruled absolute inset-0 opacity-25" />

        <div className="absolute -left-32 -top-24 h-80 w-[38rem] bg-acid/[0.06] blur-[130px]" />
      </div>

      {count > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 sm:bottom-9">
          <div className="shell flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show background image ${i + 1} of ${count}`}
                  aria-current={i === index}
                  className="group py-2.5"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-500 ${
                      i === index ? "w-10 bg-acid" : "w-4 bg-white/25 group-hover:bg-white/55"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}