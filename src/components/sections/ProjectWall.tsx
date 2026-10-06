import Image from "next/image";

/**
 * "Mur de projets" — opening visual of the réalisations page (images-test
 * proposal 41). Deliberately NOT an AI render: a CSS montage of the nine real
 * mockups in public/portfolio/, the same files the home coverflow shows.
 * Decorative (aria-hidden, empty alts): the cards/coverflow name each project.
 *
 * Layout: 3 × 3 grid on mobile; from md a two-row staggered strip (5 + 4
 * tiles, second row offset by half a tile) that lands around 3.5:1.
 */
const MOCKUPS = [
  "/portfolio/garage-biver.jpg",
  "/portfolio/vitrophy.jpg",
  "/portfolio/cim-by-cacr.jpg",
  "/portfolio/pauly-losch.jpg",
  "/portfolio/autodis.jpg",
  "/portfolio/isomontage.jpg",
  "/portfolio/blumenthal.jpg",
  "/portfolio/lux-habitat.png",
  "/portfolio/momento-relojero.jpg",
];

export function ProjectWall({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-10 md:gap-4">
        {MOCKUPS.map((src, i) => (
          <div
            key={src}
            className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-bg-card shadow-[var(--shadow-md)] md:col-span-2 ${
              i === 5 ? "md:col-start-2" : ""
            } ${i % 2 ? "md:translate-y-2 md:-rotate-1" : "md:rotate-1"}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1280px) 256px, (min-width: 768px) 20vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>
      {/* edge fades — `from-bg` tracks the page background in both themes */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent md:h-24" />
    </div>
  );
}
