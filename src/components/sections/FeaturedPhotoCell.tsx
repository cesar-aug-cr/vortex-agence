import Image from "next/image";

/**
 * Dark photo cell shared by "Pourquoi vortx" (home), "Ce qui nous distingue"
 * (agence) and the method band on the service pages: a realistic photo under
 * a dark scrim, so the copy stays white in both themes. Default photo is
 * Luxembourg at golden hour (public/hero/pourquoi-vortx.webp). `column` stacks heading over lead (bento cell);
 * `banner` puts them side by side in a full-width strip.
 */
export function FeaturedPhotoCell({
  eyebrow,
  title,
  lead,
  src = "/hero/pourquoi-vortx.webp",
  position = "60% center",
  layout = "column",
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Photo under the dark scrim (a file under public/, registered in build-images SOURCES). */
  src?: string;
  /** CSS object-position for the photo crop. */
  position?: string;
  layout?: "column" | "banner";
  className?: string;
}) {
  const banner = layout === "banner";
  return (
    <div
      className={`relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-stage-border bg-stage p-8 text-stage-text shadow-[var(--shadow-md)] ${
        banner ? "min-h-[18rem] md:grid md:grid-cols-2 md:items-end md:gap-10" : ""
      } ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={banner ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="-z-10 object-cover"
        style={{ objectPosition: position }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,7,10,0.78) 0%, rgba(7,7,10,0.55) 45%, rgba(7,7,10,0.85) 100%)",
        }}
      />
      <div>
        <span className="section-eyebrow font-mono text-xs font-bold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-bold leading-[1.08] text-stage-text md:text-4xl">
          {title}
        </h2>
      </div>
      {lead && (
        <p className={`mt-6 text-base leading-relaxed text-stage-text-dim ${banner ? "md:mt-0" : ""}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
