import { ADSENSE_CLIENT } from "@/lib/site";

export function GET() {
  if (!ADSENSE_CLIENT) return new Response("Not found", { status: 404 });
  const pub = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
