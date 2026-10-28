import { getIngredient } from "@/lib/data";
import { OG_SIZE, ogCard } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ing = await getIngredient(slug);
  return ogCard(ing?.name ?? SITE_NAME, "상태 확인 · 레시피 · 보관법");
}
