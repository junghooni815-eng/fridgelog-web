import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ConditionList } from "@/components/Condition";
import ShareButton from "@/components/ShareButton";
import StorageSection from "@/components/StorageSection";
import { getDoc, getIngredient, getStorageDoc, listPublishedDocs } from "@/lib/data";
import { withRo } from "@/lib/josa";
import type { Doc, Ingredient, RecipeBody, StorageBody, ThawBody } from "@/lib/types";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await listPublishedDocs();
  return rows.filter((r) => r.kind !== "storage").map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary ?? undefined,
    alternates: { canonical: `/r/${slug}` },
    openGraph: { title: doc.title, description: doc.summary ?? undefined, type: "article" },
  };
}

function Recipe({ doc, ing, storage }: { doc: Doc<RecipeBody>; ing: Ingredient | null; storage: Doc<StorageBody> | null }) {
  const b = doc.body;
  return (
    <>
      <section>
        <h2><span className="num">①</span>상태 확인</h2>
        {b.condition_intro && <p>{b.condition_intro}</p>}
        <ConditionList items={b.condition_ok} tone="ok" title="이렇게 하고 쓰세요" />
        <ConditionList items={b.condition_discard} tone="bad" title="이러면 버리세요" />
        {b.condition_note && <p className="note">{b.condition_note}</p>}
      </section>

      <section>
        <h2><span className="num">②</span>재료</h2>
        {b.ingredients_main?.length ? (
          <>
            <h3>주재료</h3>
            <ul className="clean">{b.ingredients_main.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </>
        ) : null}
        {b.ingredients_sub?.length ? (
          <>
            <h3>양념·부재료</h3>
            <ul className="clean">{b.ingredients_sub.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </>
        ) : null}
        {b.ingredients_note && <p className="note">{b.ingredients_note}</p>}
      </section>

      {b.steps?.length ? (
        <section>
          <h2><span className="num">③</span>만들기</h2>
          <ol className="steps">
            {b.steps.map((s, i) => (
              <li key={i}><strong>{s.title}</strong><p>{s.body}</p></li>
            ))}
          </ol>
        </section>
      ) : null}

      {b.mistakes?.length ? (
        <section>
          <h2><span className="num">④</span>실패 포인트</h2>
          {b.mistakes.map((m, i) => (
            <div key={i} className="card"><h3>{m.title}</h3><p>{m.body}</p></div>
          ))}
        </section>
      ) : null}

      {storage && <StorageSection doc={storage} num="⑤" />}
      {ing && <p className="crumb"><Link href={`/i/${ing.slug}`}>{withRo(ing.name)} 만드는 다른 요리</Link></p>}
    </>
  );
}

function Thaw({ doc, ing, storage }: { doc: Doc<ThawBody>; ing: Ingredient | null; storage: Doc<StorageBody> | null }) {
  const b = doc.body;
  return (
    <>
      <section>
        <h2><span className="num">①</span>상태 확인</h2>
        {b.condition_intro && <p>{b.condition_intro}</p>}
        <ConditionList items={b.condition_frozen} tone="ok" title="얼어 있을 때 볼 것" />
        <ConditionList items={b.condition_ok} tone="ok" title="녹인 뒤 이러면 쓰세요" />
        <ConditionList items={b.condition_discard} tone="bad" title="이러면 버리세요" />
        {b.condition_note && <p className="note">{b.condition_note}</p>}
      </section>

      {b.methods?.length ? (
        <section>
          <h2><span className="num">②</span>해동 방법</h2>
          {b.methods.map((m, i) => (
            <div key={i} className="card">
              <div className="method"><h3>{m.name}</h3><span className={`badge ${m.recommend}`}>{m.recommend}</span></div>
              <p className="note">{m.time}</p>
              <p>{m.body}</p>
            </div>
          ))}
        </section>
      ) : null}

      {b.quality_note && (
        <section>
          <h2><span className="num">③</span>맛과 식감</h2>
          <p>{b.quality_note}</p>
        </section>
      )}

      {storage && <StorageSection doc={storage} num="④" />}
      {ing && <p className="crumb"><Link href={`/i/${ing.slug}`}>{withRo(ing.name)} 만드는 요리</Link></p>}
    </>
  );
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getDoc(slug);
  if (!doc) notFound();
  // 보관법은 독립 페이지가 아니라 재료 허브와 각 레시피 하단에 붙는다.
  if (doc.kind === "storage") permanentRedirect(`/i/${doc.ingredient_slug}`);

  const [ing, storage] = await Promise.all([getIngredient(doc.ingredient_slug), getStorageDoc(doc.ingredient_slug)]);
  const meta = [
    doc.cook_time ? `${doc.cook_time}분` : null,
    doc.difficulty,
    doc.serving ? `${doc.serving}인분` : null,
    doc.kind === "thaw" ? (doc.body as ThawBody).total_time : null,
  ].filter(Boolean) as string[];

  return (
    <article>
      {ing && <p className="crumb"><Link href={`/i/${ing.slug}`}>{ing.name}</Link></p>}
      <h1>{doc.title}</h1>
      {doc.summary && <p className="lead">{doc.summary}</p>}
      {meta.length > 0 && <ul className="meta">{meta.map((m) => <li key={m} className="chip">{m}</li>)}</ul>}
      <p style={{ marginTop: 16 }}><ShareButton title={doc.title} /></p>

      {doc.kind === "recipe" ? (
        <Recipe doc={doc as Doc<RecipeBody>} ing={ing} storage={storage as Doc<StorageBody> | null} />
      ) : (
        <Thaw doc={doc as Doc<ThawBody>} ing={ing} storage={storage as Doc<StorageBody> | null} />
      )}
    </article>
  );
}
