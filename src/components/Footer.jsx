import Link from "next/link";
import {
  LuInstagram,
  LuFacebook,
  LuLinkedin,
  LuPhone,
  LuMail,
  LuMessageCircle,
  LuMapPin,
} from "react-icons/lu";
import { brand, offices, footerLinks } from "@/lib/site";
import Image from "next/image";

const SOCIAL_ICONS = {
  Instagram: LuInstagram,
  Facebook: LuFacebook,
  LinkedIn: LuLinkedin,
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900/60">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16">
          <div>
             <Link
      href="/"
      aria-label="Techtonic Lab — home"
      className="group flex items-center gap-1"
    >
      <Image src={"/logos/logo.svg"} alt="techtonic-lab-logo" className="" width={50} height={50}/>
      <span className="leading-none pt-1">
        <span className="block font-display text-[1.4625rem] font-semibold tracking-tight text-zinc-50">
          Techtonic-Lab
        </span>
      
      </span>
    </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Techtonic Lab is an IT training institute in Nagpur offering job-ready courses in
              Data Analytics, Data Science and SAP. Classroom, online and weekend batches across
              two campuses, with placement preparation built into every programme.
            </p>

            <ul className="mt-6 flex items-center gap-2.5">
              {brand.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Techtonic Lab on ${s.label}`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] text-zinc-400 transition-colors hover:border-acid/60 hover:text-acid"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-5">
              {offices.map((o) => (
                <div key={o.id}>
                  <p className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    <LuMapPin aria-hidden="true" className="h-3 w-3 text-acid" />
                    {o.label}
                  </p>
                  <address className="mt-1.5 not-italic text-xs leading-relaxed text-zinc-400">
                    {o.street}, {o.locality}, {o.region} {o.postalCode}
                  </address>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <nav key={heading} aria-labelledby={`footer-${heading}`}>
                <h2
                  id={`footer-${heading}`}
                  className="text-2xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  {heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-acid"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-labelledby="footer-contact">
              <h2
                id="footer-contact"
                className="text-2xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
              >
                Get in touch
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={brand.phoneHref}
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-acid"
                  >
                    <LuPhone aria-hidden="true" className="h-3.5 w-3.5" />
                    {brand.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${brand.email}`}
                    className="inline-flex items-center gap-2 break-all text-sm text-zinc-400 hover:text-acid"
                  >
                    <LuMail aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                    {brand.email}
                  </a>
                </li>
                <li>
                  <a
                    href={brand.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-acid"
                  >
                    <LuMessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                    WhatsApp us
                  </a>
                </li>
                <li>
                  <Link
                    href="/connect-with-us"
                    className="text-sm text-zinc-400 transition-colors hover:text-acid"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Techtonic Lab. Operated by {brand.legalName} · CIN{" "}
            {brand.cin}.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <li>
              <Link href="/privacy-policy" className="text-zinc-500 hover:text-acid">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="text-zinc-500 hover:text-acid">
                Terms of service
              </Link>
            </li>
            <li className="text-zinc-600">Last updated: {brand.lastUpdated}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
