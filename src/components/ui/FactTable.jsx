/**
 * GEO Section 7.1 — the "quick facts" block. A definition list of label→value
 * pairs, deliberately plain so an answer engine can lift it as-is.
 */
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
