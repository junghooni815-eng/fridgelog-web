import { getDoc } from "@/lib/data";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) return ogCard("FridgeLog", "");
  const sub = [doc.cook_time ? `${doc.cook_time}분` : null, doc.difficulty].filter(Boolean).join(" · ");
  return ogCard(doc.title, sub || (doc.kind === "thaw" ? "해동 가이드" : ""));
}
