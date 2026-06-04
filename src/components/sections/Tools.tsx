import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Tools({ dict }: { dict: Dictionary }) {
  const all = dict.tools.categories.flatMap((c) => c.items);
  const marquee = [...all, ...all];

  return (
    <Section tone="muted" containerClassName="">
      <SectionHeading
        eyebrow={dict.tools.eyebrow}
        title={dict.tools.title}
        lead={dict.tools.lead}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
        {dict.tools.categories.map((cat) => (
          <div key={cat.name} className="card p-6">
            <h3 className="font-mono text-xs uppercase tracking-wide text-accent">
              {cat.name}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="marquee-container mt-12 rounded-2xl border border-border bg-bg-card py-5"
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
