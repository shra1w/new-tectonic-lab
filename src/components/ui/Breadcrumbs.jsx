import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

/**
 * UX-10 / SEO-10 — visible breadcrumbs above the H1 on every non-home page.
 * The matching BreadcrumbList JSON-LD is emitted from the page itself.
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 ? (
                <LuChevronRight aria-hidden="true" className="h-3 w-3 text-zinc-700" />
              ) : null}
              {last ? (
                <span aria-current="page" className="text-zinc-300">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-acid">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
