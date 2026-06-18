import type { ReactNode } from "react";

type Tone = "base" | "muted" | "stage";

const toneClass: Record<Tone, string> = {
  // base/muted are transparent so the page-wide AmbientGlow shows through,
  // making the whole site read as one continuous surface.
  base: "bg-transparent text-text",
  muted: "bg-transparent text-text",
  stage: "bg-stage text-stage-text",
};

/**
 * The single section scaffold. Every homepage section uses it, so vertical
 * rhythm, container and background tones are guaranteed consistent.
 */
export function Section({
  id,
  tone = "base",
  className = "",
  containerClassName = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 md:py-32 ${toneClass[tone]} ${className}`}
    >
      <div className={`container-vortx ${containerClassName}`}>{children}</div>
    </section>
  );
}

/**
 * The single section header. Eyebrow is always lime; title/lead colours adapt
 * to the tone. One layout everywhere = homogeneity.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "base",
  align = "left",
  level = "h2",
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: "left" | "center";
  /** Heading level for the title — use "h1" when this is the page's top heading. */
  level?: "h1" | "h2";
  className?: string;
}) {
  const onStage = tone === "stage";
  const Title = level;
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      <span
        className={`section-eyebrow font-mono text-xs uppercase tracking-[0.22em] ${
          onStage ? "text-accent" : "eyebrow-badge"
        }`}
      >
        {eyebrow}
      </span>
      <Title
        className={`mt-4 text-3xl font-bold leading-[1.08] md:text-5xl ${
          onStage ? "text-stage-text" : "text-text"
        }`}
      >
        {title}
      </Title>
      {lead && (
        <p
          className={`mt-5 text-lg ${onStage ? "text-stage-text-dim" : "text-text-dim"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
