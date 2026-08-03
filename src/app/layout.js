import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import CookieBanner from "@/components/CookieBanner";
import { SITE_URL, brand } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

// Section 12 — self-hosted by next/font, preloaded, font-display: swap.
// No render-blocking request to fonts.googleapis.com at runtime.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

const body = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Data Analyst, SAP & Data Science Courses in Nagpur | Techtonic Lab",
    template: "%s | Techtonic Lab",
  },
  description:
    "Job-ready IT courses in Nagpur — Data Analytics, Data Science, and SAP with classroom, online, and weekend batches. Fees ₹50,000. Placement preparation included.",
  applicationName: brand.name,
  authors: [{ name: brand.name, url: SITE_URL }],
  creator: brand.name,
  publisher: brand.legalName,
  category: "education",
  // SEO-03: no <meta name="keywords"> anywhere.
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    siteName: brand.name,
    title: "Data Analyst, SAP & Data Science Courses in Nagpur | Techtonic Lab",
    description:
      "Job-ready IT courses in Nagpur — Data Analytics, Data Science, and SAP with classroom, online, and weekend batches. Fees ₹50,000. Placement preparation included.",
    images: [
      {
        url: "/og/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Techtonic Lab — IT training institute in Nagpur",
      },
    ],
  },
  // SEO-06 / SEO-07
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst, SAP & Data Science Courses in Nagpur | Techtonic Lab",
    description:
      "Job-ready IT courses in Nagpur — Data Analytics, Data Science, and SAP. Fees ₹50,000. Placement preparation included.",
    images: ["/og/homepage.jpg"],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Nagpur",
    "geo.position": "21.0839766;79.0799313",
    ICBM: "21.0839766, 79.0799313",
  },
};

export const viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  const siteJsonLd = [organizationSchema(), websiteSchema()];

  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <script
          type="application/ld+json"
          // Sitewide entity graph — present on every page (audit Section 8.1).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-acid focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        <WhatsAppFab />
        <CookieBanner />
      </body>
    </html>
  );
}
