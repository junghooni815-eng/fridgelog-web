import { OG_SIZE, ogCard } from "@/lib/og";
import { TAGLINE } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard(TAGLINE, "상태 확인 · 남은 재료 레시피 · 해동 · 보관");
}
