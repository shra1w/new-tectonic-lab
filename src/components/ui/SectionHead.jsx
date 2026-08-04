import Reveal from "./Reveal";

export default function SectionHead({ eyebrow, title, intro, align = "left", id }) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className={`eyebrow ${centered ? "justify-center" : ""}`}>
          <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-acid" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold tracking-tightest sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-[1.0625rem]">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
