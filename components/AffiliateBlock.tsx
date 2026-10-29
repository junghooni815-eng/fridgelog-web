import { PARTNERS_NOTICE, pickProducts } from "@/lib/affiliate";

export default function AffiliateBlock({ line, num }: { line?: string; num: string }) {
  const items = pickProducts(line);
  if (!items.length) return null;
  return (
    <section>
      <h2><span className="num">{num}</span>있으면 편한 것</h2>
      <div className="card affiliate">
        <ul className="clean">
          {items.map((it) => (
            <li key={it.label}>
              <a href={it.url} target="_blank" rel="sponsored nofollow noopener">쿠팡에서 {it.label} 보기 →</a>
            </li>
          ))}
        </ul>
        <p className="note">{PARTNERS_NOTICE}</p>
      </div>
    </section>
  );
}
