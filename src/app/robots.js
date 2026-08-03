import { SITE_URL } from "@/lib/site";

// Audit Section 7.2 — every AI answer engine crawler is explicitly allowed.
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
  "CCBot",
  "Bytespider",
];

export default function robots() {
  return {
    rules: [
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/" })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/data/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
