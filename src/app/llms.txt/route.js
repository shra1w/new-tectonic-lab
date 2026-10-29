import { llmsTxt } from "@/lib/agentMarkdown";

// Generated from site data so fees and batch dates never go stale.
export const revalidate = 86400;

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
