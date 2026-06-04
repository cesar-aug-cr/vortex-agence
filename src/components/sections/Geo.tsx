import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "@/components/ui/Section";
import { Check } from "@/components/ui/icons";
import HelixDNA3D from "@/components/three/HelixDNA3D";

export function Geo({ dict }: { dict: Dictionary }) {
  return (
    <Section tone="stage">
      {/* glow — bleeds into the surrounding sections so nothing feels cut */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(50% 55% at 20% 50%, rgba(20,224,200,0.12), transparent 70%), radial-gradient(45% 45% at 82% 30%, rgba(200,240,46,0.09), transparent 70%)",
        }}
      />
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* DNA helix — diagonal (bottom-left → top-right), ends fade to transparent */}
        <div
          className="order-2 lg:order-1"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top right, transparent 2%, #000 26%, #000 74%, transparent 98%)",
            maskImage:
              "linear-gradient(to top right, transparent 2%, #000 26%, #000 74%, transparent 98%)",
          }}
        >
          <HelixDNA3D height={460} tiltDeg={-35} />
        </div>

        {/* content */}
        <div className="order-1 lg:order-2">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            {dict.geo.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-stage-text md:text-5xl">
            {dict.geo.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-stage-text-dim">{dict.geo.lead}</p>

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
    </Section>
  );
}
