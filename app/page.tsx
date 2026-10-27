import Link from "next/link";
import { listIngredients, listPublishedDocs } from "@/lib/data";
import { TAGLINE } from "@/lib/site";
import type { Ingredient } from "@/lib/types";

export const revalidate = 3600;

function Group({ title, items }: { title: string; items: Ingredient[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2>{title}</h2>
      <ul className="grid">
        {items.map((i) => (
          <li key={i.slug}><Link href={`/i/${i.slug}`}>{i.name}</Link></li>
        ))}
      </ul>
    </section>
  );
}

export default async function Home() {
  const [ingredients, docs] = await Promise.all([listIngredients(), listPublishedDocs()]);
  // 공개 문서가 하나도 없는 재료는 허브를 보여도 빈 화면이라 목록에서 뺀다.
  const withDocs = new Set(docs.map((d) => d.ingredient_slug));
  const visible = ingredients.filter((i) => withDocs.has(i.slug));

  return (
    <>
      <h1>{TAGLINE}</h1>
      <p className="lead">재료를 고르면 상태 확인법, 그 재료로 만들 수 있는 요리, 해동과 보관법을 볼 수 있습니다.</p>
      <Group title="냉동고" items={visible.filter((i) => i.storage === "냉동")} />
      <Group title="냉장고" items={visible.filter((i) => i.storage === "냉장")} />
    </>
  );
}
