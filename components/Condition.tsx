// condition_ok 항목은 대부분 "상태 → 조치" 형식이고, 화살표 없는 문장도 섞여 있다.
function Line({ text }: { text: string }) {
  const [state, ...rest] = text.split("→");
  const action = rest.join("→").trim();
  if (!action) return <li><span className="state">{text.trim()}</span></li>;
  return (
    <li>
      <span className="state">{state.trim()}</span>
      <span className="action">→ {action}</span>
    </li>
  );
}

export function ConditionList({ items, tone, title }: { items?: string[]; tone: "ok" | "bad"; title: string }) {
  if (!items?.length) return null;
  return (
    <>
      <p className={`cond-title ${tone}`}>{title}</p>
      <ul className={`cond ${tone}`}>
        {items.map((t, i) => <Line key={i} text={t} />)}
      </ul>
    </>
  );
}
