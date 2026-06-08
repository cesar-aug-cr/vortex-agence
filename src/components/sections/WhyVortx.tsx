import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "@/components/ui/Section";
import { Target, Pulse, Globe, Spark } from "@/components/ui/icons";

const icons = [Target, Pulse, Globe, Spark];

/**
 * "Pourquoi vortx" — bento layout. A featured heading cell (title + lead)
 * anchors the left column while the four pillars fill an asymmetric 2×2 bento
 * grid, each with an icon, an index and the Services-style hover effects.
 */
export function WhyVortx({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="base">
      <div className="grid gap-5 lg:auto-rows-fr lg:grid-cols-3">
        {/* featured heading cell */}
        <div className="card relative overflow-hidden p-8 lg:row-span-2 lg:flex lg:flex-col lg:justify-between">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 0% 0%, var(--accent-soft), transparent 60%)",
            }}
          />
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {dict.trust.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-4xl">
              {dict.trust.title}
            </h2>
          </div>
          <p className="mt-6 text-base leading-relaxed text-text-dim">
            {dict.trust.lead}
          </p>
        </div>

        {/* pillars */}
        {dict.trust.pillars.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={p.title}
              className="card card-hover spotlight-card group p-7"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon />
                </span>
                <span className="font-mono text-sm text-text-muted">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
