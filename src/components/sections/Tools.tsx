import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Tools({ dict }: { dict: Dictionary }) {
  const all = dict.tools.categories.flatMap((c) => c.items);
  const marquee = [...all, ...all];

  // Display order tuned for balanced, equal-height rows: the three busiest
  // categories on the top row, the lighter ones (+ the stat) on the bottom.
  const order = [0, 4, 3, 1, 2];
  const cats = order.map((i) => dict.tools.categories[i]);

  return (
    <Section tone="muted" containerClassName="">
      <SectionHeading
        eyebrow={dict.tools.eyebrow}
        title={dict.tools.title}
        lead={dict.tools.lead}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
        {cats.map((cat) => (
          <div
            key={cat.name}
            className="card card-hover spotlight-card group flex flex-col p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-mono text-xs uppercase tracking-wide text-accent">
                {cat.name}
              </h3>
              <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border border-border px-2 font-mono text-xs text-text-muted">
                {cat.items.length}
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* count stat — same card footprint, brand-lit focal point */}
        <div className="card card-hover spotlight-card group relative flex flex-col items-center justify-center overflow-hidden p-6 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(75% 75% at 50% 35%, rgba(200,240,46,0.12), transparent 70%)",
            }}
          />
          <span className="relative font-mono text-6xl font-bold leading-none text-accent md:text-7xl">
            {dict.tools.stat.value}
          </span>
          <span className="relative mt-4 text-xs uppercase tracking-[0.22em] text-text-muted">
            {dict.tools.stat.label}
          </span>
        </div>
      </div>

      <div
        className="marquee-container mt-7 rounded-2xl border border-border bg-bg-card py-5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track">
          {marquee.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-6 font-mono text-sm uppercase tracking-widest text-text-muted"
            >
              {item}
              <span className="mx-6 text-accent">•</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
