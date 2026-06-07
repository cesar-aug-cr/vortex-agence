import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Tools({ dict }: { dict: Dictionary }) {
  const all = dict.tools.categories.flatMap((c) => c.items);
  const marquee = [...all, ...all];

  // Bento layout. Dict order is: 0 Marketing · 1 Web&code · 2 IA · 3 Design ·
  // 4 Productivité. We lay them out as:
  //   row 1 → Marketing (1/3, spans 2 rows) | IA (2/3, top) / Web&code (2/3, bottom)
  //   row 2 → Design (4th) · Productivité (5th) · 40+ stat
  const layout = [
    { i: 0, span: "lg:row-span-2" }, // Marketing digital — 1/3, tall
    { i: 2, span: "lg:col-span-2" }, // IA & automatisation — 2/3, top-right
    { i: 1, span: "lg:col-span-2" }, // Web & code — 2/3, bottom-right
    { i: 3, span: "" }, // Design
    { i: 4, span: "" }, // Productivité (5th)
  ];

  return (
    <Section tone="muted" containerClassName="">
      <SectionHeading
        eyebrow={dict.tools.eyebrow}
        title={dict.tools.title}
        lead={dict.tools.lead}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
        {layout.map(({ i, span }) => {
          const cat = dict.tools.categories[i];
          return (
            <div
              key={cat.name}
              className={`card card-hover spotlight-card group flex flex-col p-6 ${span}`}
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
          );
        })}

        {/* count stat — last cell */}
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
