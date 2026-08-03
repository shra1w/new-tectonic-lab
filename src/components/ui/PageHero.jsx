import Breadcrumbs from "./Breadcrumbs";
import Reveal from "./Reveal";

/**
 * Shared top-of-page block. Sits on the same hairline grid as the homepage hero
 * so every page reads as one site.
 */
export default function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  highlight,
  summary,
  children,
  aside,
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-14 pt-8 sm:pb-20 sm:pt-12">
      <div aria-hidden="true" className="ruled ruled-fade absolute inset-0 -z-10 opacity-[0.5]" />
      <div
        aria-hidden="true"
        className="absolute -top-28 left-1/3 -z-10 h-56 w-[36rem] bg-acid/[0.06] blur-[110px]"
      />

      <div className="shell">
        {breadcrumbs ? (
          <Reveal>
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
        ) : null}

        <div
          className={
            aside
              ? "mt-7 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14"
              : "mt-7"
          }
        >
          <div>
            {eyebrow ? (
              <Reveal>
                <p className="eyebrow">
                  <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-acid" />
                  {eyebrow}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={0.05}>
              <h1 className="mt-4 max-w-3xl font-display text-[2.15rem] font-semibold leading-[1.06] tracking-tightest text-zinc-50 sm:text-5xl lg:text-[3.4rem]">
                {title}
                {highlight ? (
                  <>
                    {" "}
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-md bg-acid"
                      />
                      <span className="relative text-ink-950">{highlight}</span>
                    </span>
                  </>
                ) : null}
              </h1>
            </Reveal>

            {summary ? (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                  {summary}
                </p>
              </Reveal>
            ) : null}

            {children ? <Reveal delay={0.16}>{children}</Reveal> : null}
          </div>

          {aside ? <Reveal delay={0.2}>{aside}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
