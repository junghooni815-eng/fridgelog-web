import type { Doc, StorageBody } from "@/lib/types";

export default function StorageSection({ doc, num }: { doc: Doc<StorageBody>; num: string }) {
  const b = doc.body;
  return (
    <section>
      <h2><span className="num">{num}</span>보관법</h2>
      <div className="card">
        {b.storage_intro && <p>{b.storage_intro}</p>}
        {b.storage_method && <p><strong>{b.storage_method}</strong></p>}
        {b.storage_steps?.length ? (
          <ol className="clean">{b.storage_steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        ) : null}
        {b.storage_limit && <p className="note">{b.storage_limit}</p>}
      </div>
    </section>
  );
}
