/**
 * Long-form legal and about copy. Deliberately narrow measure — 65-ish
 * characters — so a terms page is actually readable rather than merely present.
 */
export default function Prose({ children, className = "" }) {
  return (
    <div
      className={`max-w-[68ch] text-[0.9375rem] leading-[1.75] text-zinc-400 [&_a]:text-acid [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-50 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-100 [&_li]:mb-2 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-zinc-200 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
    >
      {children}
    </div>
  );
}
