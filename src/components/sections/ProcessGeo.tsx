import type { Dictionary } from "@/i18n/getDictionary";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";
import HelixDNA3D from "@/components/three/HelixDNALazy";

/**
 * TEST — merged section: "Notre méthode" (Process) + "GEO / GSO" (Geo) fused
 * into a single stage. The DNA helix runs full-bleed *behind everything* on the
 * same diagonal as the original Geo section (bottom-left → top-right, -35°). The
 * method cards stay identical to the original Process; the GEO/GSO content sits
 * on the right inside a glassmorphism card. Originals are untouched.
 */
export function ProcessGeo({ dict }: { dict: Dictionary }) {
  return (
    <Section id="approche" tone="stage" className="overflow-hidden">
      {/* ambient glow — bleeds so the stage feels continuous */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(50% 55% at 20% 50%, rgba(20,224,200,0.12), transparent 70%), radial-gradient(45% 45% at 82% 30%, rgba(200,240,46,0.09), transparent 70%)",
        }}
      />

      {/* DNA helix — full-bleed background, same diagonal as the original Geo,
          passes BEHIND everything (bottom-left → top-right, ends fade out) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        aria-hidden
        style={{
          WebkitMaskImage:
            "linear-gradient(to top right, transparent 2%, #000 26%, #000 74%, transparent 98%)",
          maskImage:
            "linear-gradient(to top right, transparent 2%, #000 26%, #000 74%, transparent 98%)",
        }}
      >
        <div className="w-full">
          <HelixDNA3D height={1180} tiltDeg={-35} />
        </div>
      </div>

      {/* content */}
      <div className="relative z-10">
        {/* ── Process: Notre méthode (cards identical to the original) ── */}
        <SectionHeading
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          tone="stage"
        />

        <ol className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step) => (
            <li
              key={step.n}
              className="card card-hover spotlight-card group flex flex-col p-7"
            >
              <span className="font-mono text-4xl font-bold text-accent">
                {step.n}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-dim">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>

        {/* ── GEO / GSO: content on the RIGHT, glassmorphism card ── */}
        <div className="mt-16 grid items-center gap-8 md:mt-20 lg:grid-cols-2 lg:gap-12">
          {/* left column left empty so the diagonal DNA reads through */}
          <div className="hidden lg:block" aria-hidden />

          <div className="glass-pill rounded-3xl bg-white/[0.05] p-8 backdrop-blur-xl md:p-10">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {dict.geo.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-stage-text md:text-4xl">
              {dict.geo.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-stage-text-dim">
              {dict.geo.lead}
            </p>

            <ul className="mt-9 space-y-6">
              {dict.geo.points.map((pt) => (
                <li key={pt.title} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent">
                    <Check width={18} height={18} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-stage-text">{pt.title}</h3>
                    <p className="mt-1 text-sm text-stage-text-dim">{pt.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
