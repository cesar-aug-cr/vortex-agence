import Image from "next/image";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";

/**
 * Approach page core: the page intro (h1), the detailed method — each step
 * with its duration, deliverables and what the client provides — followed by
 * the working principles that differentiate the method.
 */
/** One work-scene banner per step (images-test proposal 35): audit, mock-up,
 *  review, launch. public/approche/etape-<n>.webp, 1536×1024, cropped to a
 *  wide banner. NOTE: AI renders standing in until real photos of working
 *  sessions exist. */
const STEP_IMAGES = ["/approche/etape-1.webp", "/approche/etape-2.webp", "/approche/etape-3.webp", "/approche/etape-4.webp"];

/** "Ce qui change" principle cards: one instantly readable render per
 *  principle (transparent cube, rising chart with a flag, single headset,
 *  build-measure-adjust loop). public/approche/principe-<n>.webp, 1536×1024,
 *  shown 4:3 at the top of each card and faded into the card surface. */
const PRINCIPLE_IMAGES = ["/approche/principe-1.webp", "/approche/principe-2.webp", "/approche/principe-3.webp", "/approche/principe-4.webp"];

export function Approach({ dict }: { dict: Dictionary }) {
  const a = dict.approachPage;

  return (
    <>
      <Section tone="muted" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          eyebrow={a.eyebrow}
          title={a.title}
          lead={a.lead}
        />

        {/* One row per step, photo and text side by side, sides alternating
            (01 photo left, 02 photo right, …). Durations intentionally not
            shown. */}
        <ol className="mt-14 space-y-16 md:mt-16 md:space-y-24">
          {a.steps.map((step, i) => {
            const reversed = i % 2 === 1;
            return (
              <li key={step.n} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-sm)] ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={STEP_IMAGES[i] ?? STEP_IMAGES[0]}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                  {/* step number over the photo — dark scrim keeps lime legible
                      in both themes */}
                  <span className="absolute left-5 top-5 rounded-lg bg-black/55 px-3 py-1.5 font-mono text-4xl font-bold leading-none text-[color:var(--accent)] backdrop-blur-sm">
                    {step.n}
                  </span>
                </div>

                <div className={reversed ? "lg:order-1" : ""}>
                  <h2 className="text-2xl font-semibold text-text md:text-3xl">{step.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-text-dim">{step.desc}</p>

                  <p className="mt-7 font-mono text-xs font-bold uppercase tracking-wide text-text-muted">
                    {a.stepDeliverablesLabel}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-text-dim">
                        <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 rounded-xl border border-stage-border bg-stage p-4 text-sm text-stage-text-dim">
                    <span className="font-semibold text-stage-text">{a.stepYouProvideLabel} : </span>
                    {step.youProvide}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="base">
        <SectionHeading eyebrow={a.principles.eyebrow} title={a.principles.title} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.principles.items.map((p, i) => {
            const src = PRINCIPLE_IMAGES[i];
            return (
              <div key={p.title} className="card flex flex-col overflow-hidden p-0">
                {src && (
                  <div className="relative aspect-[4/3] w-full bg-stage">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {/* fade the render into the card surface (token follows the theme) */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, rgba(7,7,10,0) 60%, var(--bg-card) 100%)" }}
                    />
                  </div>
                )}
                <div className="flex flex-col p-6 pt-4">
                  <h3 className="text-base font-semibold text-text">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
