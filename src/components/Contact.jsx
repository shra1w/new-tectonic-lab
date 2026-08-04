import { LuMapPin, LuPhone, LuMail } from "react-icons/lu";
import LeadForm from "./LeadForm";
import Reveal from "./ui/Reveal";
import { offices, brand } from "@/lib/site";


export default function Contact({ source = "homepage" }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-acid" />
              Contact
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-3xl font-semibold tracking-tightest sm:text-4xl"
            >
              Book a free consultation
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
              Tell us your background and what you want to do next. We will tell you honestly
              whether one of our courses is the right route — including when it is not.
            </p>
          </Reveal>

          <div className="mt-9">
            <LeadForm source={source} />
          </div>
        </div>

        <div className="space-y-4 lg:pt-2">
          {offices.map((o) => (
            <div key={o.id} className="card p-6">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-acid/25 bg-acid/10 text-acid">
                  <LuMapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="font-display text-base font-semibold text-zinc-50">{o.label}</h3>
              </div>

              {/* CRIT-4 — identical string on GBP, JustDial and LocalBusiness schema */}
              <address className="mt-4 not-italic text-sm leading-relaxed text-zinc-400">
                {o.street},
                <br />
                {o.locality}, {o.region} {o.postalCode}
              </address>

              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={brand.phoneHref}
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-acid"
                >
                  <LuPhone aria-hidden="true" className="h-3.5 w-3.5" />
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-acid"
                >
                  <LuMail aria-hidden="true" className="h-3.5 w-3.5" />
                  Email
                </a>
              </div>
            </div>
          ))}

          {/* Section 13.1 — embedded map supports local SEO */}
          <div className="card overflow-hidden">
            <iframe
              title="Map showing the Techtonic Lab head office in Somalwada, Nagpur"
              src="https://www.google.com/maps?q=21.0839766,79.0799313&hl=en&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 grayscale-[35%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
