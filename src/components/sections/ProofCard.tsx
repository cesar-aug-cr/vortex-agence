import type { Dictionary } from "@/i18n/getDictionary";

/**
 * The four home guarantees (response, bespoke, languages, audit) in a black
 * glass card — same look in both themes. Desktop: inside the hero, bottom
 * right over the skyline (HeroTestBH). Phones: right under the hero, static
 * (home page), so the stepped hero's last step stays clean.
 */
export function ProofCard({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  return (
    <dl
      className={`grid gap-2 rounded-2xl border border-white/15 bg-black/70 p-4 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150 ${className}`}
    >
      {dict.hero.proof.rows.map((s) => (
        <div key={s.label} className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2 last:border-0 last:pb-0">
          <dt className="min-w-0 text-xs text-white/70">{s.label}</dt>
          <dd className="shrink-0 whitespace-nowrap font-mono text-xs font-bold text-[#c8f02e]">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
