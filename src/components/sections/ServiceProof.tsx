import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";

type ProofItem = { value: string; label: string; desc: string };

export type ServiceProofContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly ({ icon: string } & ProofItem)[];
};

/** Commitments written for one page — keyed by "slug" or "slug/child" in servicesDetail.proofs.
 *  `image` names a photo in public/engagements (without extension). */
export type ServiceProofPage = {
  title: string;
  lead: string;
  items: readonly (ProofItem & { image: string })[];
};

/**
 * Card visuals of the shared commitments, keyed by the item's icon id.
 * Promoted from /images-test-pour-voir (proposal 31): dark 1:1 renders,
 * public/engagements/*.webp, served through the static variants (≤ 828 px).
 * Decorative — the value/label carry the message, so alt stays empty.
 */
const VISUALS: Record<string, string> = {
  guarantee: "/engagements/audit.webp",
  rgpd: "/engagements/code.webp",
  multilingual: "/engagements/multilingue.webp",
  analytics: "/engagements/reporting.webp",
};

/** Grid columns and image `sizes` by card count (2, 4 or 5 cards per page). */
const LAYOUT: Record<number, { grid: string; sizes: string }> = {
  2: { grid: "sm:grid-cols-2", sizes: "(min-width: 640px) 50vw, 100vw" },
  3: { grid: "sm:grid-cols-2 lg:grid-cols-3", sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" },
  5: { grid: "sm:grid-cols-2 lg:grid-cols-5", sizes: "(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" },
};
const LAYOUT_4 = { grid: "sm:grid-cols-2 lg:grid-cols-4", sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" };

/**
 * "Our guarantees" — honest, verifiable commitments (no invented client
 * metrics). Pages listed in `pages` get their own heading and cards; the
 * others fall back to the shared commitments. Rendered on the dark stage band
 * for contrast and emphasis. Each card opens on a full-width visual that
 * fades into the card surface.
 */
export function ServiceProof({
  content,
  pages,
  path,
}: {
  content: ServiceProofContent;
  pages: object;
  /** "slug" or "slug/child". */
  path: string;
}) {
  const own = (pages as Record<string, ServiceProofPage | undefined>)[path];
  const items: readonly (ProofItem & { src?: string })[] = own
    ? own.items.map((item) => ({ ...item, src: `/engagements/${item.image}.webp` }))
    : content.items.map((item) => ({ ...item, src: VISUALS[item.icon] }));
  const layout = LAYOUT[items.length] ?? LAYOUT_4;

  return (
    <Section tone="stage">
      <SectionHeading
        tone="stage"
        eyebrow={content.eyebrow}
        title={own?.title ?? content.title}
        lead={own?.lead ?? content.lead}
      />

      <div className={`mt-14 grid gap-5 ${layout.grid}`}>
        {items.map((item) => {
          const src = item.src;
          return (
            <div
              key={item.value}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              {src && (
                <div className="relative aspect-[4/3] w-full bg-stage">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes={layout.sizes}
                    className="object-cover"
                  />
                  {/* fade the render into the card so the visual and the text read as one block */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(7,7,10,0) 55%, rgba(7,7,10,0.85) 100%)",
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col p-6 pt-5">
                <p className="text-xl font-bold text-stage-text">{item.value}</p>
                {/* Always-dark stage band: keep lime (the curated light theme would
                    otherwise rewrite `text-accent` to olive, which fails on dark). */}
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stage-text-dim">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
