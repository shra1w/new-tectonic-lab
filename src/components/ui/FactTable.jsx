
export default function FactTable({ rows, className = "" }) {
  return (
    <dl className={`card p-5 sm:p-6 ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="spec-row">
          <dt className="shrink-0 text-zinc-500">{k}</dt>
          <dd className="text-right font-medium text-zinc-100">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
