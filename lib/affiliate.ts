// 쿠팡 파트너스 간편 링크. url이 빈 상품은 화면에 나오지 않는다.
// 문서의 affiliate_line에 keywords 중 하나가 들어 있으면 그 상품을 보여 준다.
type Product = { label: string; keywords: string[]; url: string };

const PRODUCTS: Product[] = [
  { label: "밀폐용기", keywords: ["밀폐용기", "밀폐 용기", "용기", "보관통", "반찬통", "김치통", "우유통"], url: "https://link.coupang.com/a/ieyHyaAuMm" },
  { label: "지퍼백", keywords: ["지퍼백", "냉동백", "보관백", "냉동팩", "육수팩", "봉투", "비닐"], url: "https://link.coupang.com/a/ieyJrCHL6i" },
  { label: "키친타월", keywords: ["키친타월"], url: "https://link.coupang.com/a/ieyLx4mCPI" },
  { label: "프라이팬", keywords: ["프라이팬", "팬"], url: "" },
];

export const PARTNERS_NOTICE = "이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";

// affiliate_line에 먼저 나온 상품부터, 최대 2개.
export function pickProducts(line: string | undefined, max = 2): { label: string; url: string }[] {
  if (!line) return [];
  return PRODUCTS.filter((p) => p.url)
    .map((p) => ({ p, at: Math.min(...p.keywords.map((k) => line.indexOf(k)).filter((i) => i >= 0)) }))
    .filter((x) => Number.isFinite(x.at))
    .sort((a, b) => a.at - b.at)
    .slice(0, max)
    .map(({ p }) => ({ label: p.label, url: p.url }));
}
