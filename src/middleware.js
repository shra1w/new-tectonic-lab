import { NextResponse } from "next/server";
import { KNOWN_PATHS, hasMarkdown } from "@/lib/agentMarkdown";

// Markdown content negotiation for AI agents (acceptmarkdown.com).
// Browsers send Accept: text/html and are never touched. An agent that prefers
// text/markdown gets a Markdown view of the page, or a Markdown 404 with
// helpful links when the page does not exist.

function qualityOf(accept, type) {
  for (const part of accept.split(",")) {
    const [media, ...params] = part.trim().toLowerCase().split(";");
    if (media.trim() !== type) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    return q ? Number(q.slice(2)) || 0 : 1;
  }
  return -1;
}

function wantsMarkdown(accept) {
  if (!accept) return false;
  const md = qualityOf(accept, "text/markdown");
  return md > 0 && md >= qualityOf(accept, "text/html");
}

export function middleware(request) {
  if (!wantsMarkdown(request.headers.get("accept"))) return NextResponse.next();

  const raw = request.nextUrl.pathname;
  const path = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;

  // Real page without a Markdown view — let the HTML through.
  if (KNOWN_PATHS.has(path) && !hasMarkdown(path)) return NextResponse.next();

  const target = request.nextUrl.clone();
  target.pathname = "/api/agent-markdown";
  target.search = "";
  const headers = new Headers(request.headers);
  headers.set("x-agent-path", path);
  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  // Skip Next internals, API routes and any file with an extension
  // (images, PDFs, sitemap.xml, robots.txt, llms.txt).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
