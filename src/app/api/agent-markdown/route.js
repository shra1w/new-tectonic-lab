import { markdownFor, notFoundMarkdown } from "@/lib/agentMarkdown";

// Internal target of src/middleware.js — serves Markdown to AI agents that
// send Accept: text/markdown. Browsers never reach this.
export const dynamic = "force-dynamic";

export function GET(request) {
  const path = request.headers.get("x-agent-path") || "/";
  const body = markdownFor(path);
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
    "X-Robots-Tag": "noindex",
  };

  if (body === null) {
    return new Response(notFoundMarkdown(path), {
      status: 404,
      headers: { ...headers, "Cache-Control": "no-store" },
    });
  }
  return new Response(body, {
    headers: { ...headers, "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
