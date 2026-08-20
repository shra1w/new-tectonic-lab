"use client";

import { useState } from "react";
import MarqueePause from "./ui/MarqueePause";
import { districts } from "@/lib/site";

export default function DistrictMarquee() {
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paused = userPaused || hovered;

  const Row = ({ hidden }) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-2.5 pr-2.5"
    >
      {districts.map((d) => (
        <li
          key={d}
          className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
        >
          {d}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div
        className="mask-fade-x mt-10 overflow-hidden"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div
          className="flex w-max animate-slide-x motion-reduce:animate-none"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <Row />
          <Row hidden />
        </div>
      </div>
      <div className="mt-4">
        <MarqueePause
          paused={userPaused}
          onToggle={() => setUserPaused((p) => !p)}
        />
      </div>
    </div>
  );
}
