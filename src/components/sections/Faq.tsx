import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "@/components/ui/Section";
import { Plus } from "@/components/ui/icons";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="muted" containerClassName="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          {dict.faq.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-bold text-text md:text-4xl">{dict.faq.title}</h2>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {dict.faq.items.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-text marker:hidden">
              {item.q}
              <Plus
                width={20}
                height={20}
                className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <p className="mt-3 max-w-2xl text-text-dim">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
