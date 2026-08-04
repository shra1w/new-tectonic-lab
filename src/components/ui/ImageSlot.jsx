import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";


export default function ImageSlot({
  src,
  alt = "",
  id,
  note = "Add an image here",
  hint,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = "rounded-2xl",
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={note}
      className={`ruled relative flex flex-col items-center justify-center gap-2 overflow-hidden border border-dashed border-white/15 bg-ink-900/60 p-6 text-center ${rounded} ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-acid/30 bg-acid/10 text-acid">
        <LuImagePlus aria-hidden="true" className="h-5 w-5" />
      </span>
      <p className="max-w-[24ch] text-xs font-semibold text-zinc-300">{note}</p>
      {hint ? <p className="max-w-[30ch] text-2xs text-zinc-500">{hint}</p> : null}
      {id ? (
        <span className="mt-1 rounded-full border border-acid/30 bg-acid/10 px-2 py-0.5 font-mono text-2xs text-acid">
          {id}
        </span>
      ) : null}
    </div>
  );
}
