import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StorageSection from "@/components/StorageSection";
import { getIngredient, getStorageDoc, listDocsFor, listIngredients } from "@/lib/data";
import { withRo } from "@/lib/josa";
import type { Doc, StorageBody } from "@/lib/types";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await listIngredients();
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ing = await getIngredient(slug);
  if (!ing) return {};
  return {
    title: `${ing.name} 상태 확인과 레시피`,
    description: `${ing.name}, 버리기 전에 상태를 확인하고 남은 만큼 쓰는 방법.`,
    alternates: { canonical: `/i/${slug}` },
  };
}

export default async function IngredientHub({ params }: Props) {
  const { slug } = await params;
  const [ing, docs, storage] = await Promise.all([getIngredient(slug), listDocsFor(slug), getStorageDoc(slug)]);
  const recipes = docs.filter((d) => d.kind === "recipe");
  const thaws = docs.filter((d) => d.kind === "thaw");
  if (!ing || (!recipes.length && !thaws.length && !storage)) notFound();

  return (
    <>
      <p className="crumb"><Link href="/">재료 목록</Link></p>
      <h1>{ing.name}</h1>
      <p className="lead">{ing.storage} 보관 재료</p>

      {thaws.length > 0 && (
        <section>
          <h2>해동</h2>
          <ul className="list">
            {thaws.map((d) => (
              <li key={d.slug}><Link href={`/r/${d.slug}`}><span className="t">{d.title}</span>{d.summary && <span className="s">{d.summary}</span>}</Link></li>
            ))}
          </ul>
        </section>
      )}

      {recipes.length > 0 && (
        <section>
          <h2>{withRo(ing.name)} 만들기</h2>
          <ul className="list">
            {recipes.map((d) => (
              <li key={d.slug}>
                <Link href={`/r/${d.slug}`}>
                  <span className="t">{d.title}</span>
                  <span className="s">{[d.cook_time ? `${d.cook_time}분` : null, d.difficulty, d.summary].filter(Boolean).join(" · ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {storage && <StorageSection doc={storage as Doc<StorageBody>} num="" />}
    </>
  );
}
