import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60dvh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">
        <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-acid" />
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tightest sm:text-5xl">
        That page does not exist
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        The link may be out of date. Start from the homepage, or jump straight to the three
        courses.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          <LuArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to the homepage
        </Link>
        <Link href="/#courses" className="btn-ghost">
          See the courses
        </Link>
      </div>
    </section>
  );
}
