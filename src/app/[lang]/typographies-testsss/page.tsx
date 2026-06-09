import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  Sora,
  Plus_Jakarta_Sans,
  Outfit,
  Hanken_Grotesk,
  Onest,
  Lexend,
  Bricolage_Grotesque,
  Syne,
  Fraunces,
  Newsreader,
  Lora,
  JetBrains_Mono,
  Space_Mono,
  IBM_Plex_Mono,
  Atkinson_Hyperlegible,
} from "next/font/google";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

/* ---- Fonts (all OFL/Apache — free for commercial use, self-hosted) ---- */
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const sora = Sora({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], display: "swap" });
const onest = Onest({ subsets: ["latin"], display: "swap" });
const lexend = Lexend({ subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const syne = Syne({ subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], display: "swap" });
const lora = Lora({ subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

type FontEntry = { name: string; cat: string; license: string; className: string };

const SANS: FontEntry[] = [
  { name: "Space Grotesk", cat: "Sans · techy", license: "OFL", className: spaceGrotesk.className },
  { name: "Manrope", cat: "Sans · géométrique", license: "OFL", className: manrope.className },
  { name: "Sora", cat: "Sans · moderne", license: "OFL", className: sora.className },
  { name: "Plus Jakarta Sans", cat: "Sans · élégante", license: "OFL", className: jakarta.className },
  { name: "Outfit", cat: "Sans · épurée", license: "OFL", className: outfit.className },
  { name: "Hanken Grotesk", cat: "Sans · grotesque", license: "OFL", className: hanken.className },
  { name: "Onest", cat: "Sans · neutre", license: "OFL", className: onest.className },
  { name: "Lexend", cat: "Sans · lisibilité", license: "OFL", className: lexend.className },
  { name: "Atkinson Hyperlegible", cat: "Sans · accessibilité", license: "OFL", className: atkinson.className },
];
const DISPLAY: FontEntry[] = [
  { name: "Bricolage Grotesque", cat: "Display · caractère", license: "OFL", className: bricolage.className },
  { name: "Syne", cat: "Display · artistique", license: "OFL", className: syne.className },
];
const SERIF: FontEntry[] = [
  { name: "Fraunces", cat: "Serif · moderne", license: "OFL", className: fraunces.className },
  { name: "Newsreader", cat: "Serif · éditorial", license: "OFL", className: newsreader.className },
  { name: "Lora", cat: "Serif · chaleureuse", license: "OFL", className: lora.className },
];
const MONO: FontEntry[] = [
  { name: "JetBrains Mono", cat: "Mono · code", license: "OFL", className: jetbrains.className },
  { name: "Space Mono", cat: "Mono · rétro", license: "OFL", className: spaceMono.className },
  { name: "IBM Plex Mono", cat: "Mono · technique", license: "OFL", className: plexMono.className },
];

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  return buildMetadata({
    lang,
    path: "/typographies-testsss",
    title: "Tests typographies | vortx",
    description: "Page interne de test des polices.",
    index: false,
  });
}

function FontBlock({ f, tone }: { f: FontEntry; tone: "base" | "muted" }) {
  return (
    <Section tone={tone} className={f.className}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
        <h2 className="text-2xl font-bold text-text md:text-3xl">{f.name}</h2>
        <span className="font-mono text-xs uppercase tracking-wide text-text-muted">
          {f.cat} · {f.license}
        </span>
      </div>

      <p className="mt-8 text-4xl font-bold leading-[1.05] text-text md:text-6xl">
        L&apos;attraction, par le design.
      </p>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-dim md:text-xl">
        vortx conçoit des sites et des stratégies d&apos;acquisition qui transforment
        l&apos;attention en clients. Design premium, SEO de nouvelle génération, génération
        de leads mesurable.
      </p>

      <p className="mt-8 text-text-dim">
        Portez ce vieux whisky au juge blond qui fume. — The quick brown fox jumps over the lazy dog.
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-text">
        <span className="text-3xl font-light">Aa Light</span>
        <span className="text-3xl font-normal">Aa Regular</span>
        <span className="text-3xl font-medium">Aa Medium</span>
        <span className="text-3xl font-semibold">Aa Semibold</span>
        <span className="text-3xl font-bold">Aa Bold</span>
      </div>
      <p className="mt-4 text-2xl tracking-wide text-text-dim">
        0 1 2 3 4 5 6 7 8 9 &nbsp; € $ % &amp; @ # — “ ” ‘ ’ ! ?
      </p>
    </Section>
  );
}

export default async function TypographyTestPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  const groups: { label: string; fonts: FontEntry[] }[] = [
    { label: "Sans-serif", fonts: SANS },
    { label: "Display", fonts: DISPLAY },
    { label: "Serif", fonts: SERIF },
    { label: "Monospace", fonts: MONO },
  ];

  let i = 0;

  return (
    <PageShell dict={dict} lang={lang}>
      <Section tone="base" className="pt-10 md:pt-12">
        <span className="font-mono text-xs uppercase tracking-[0.22em] eyebrow-badge">
          Sandbox typo
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
          Tests typographies
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-text-dim">
          Une section par police (titres + textes dans la même typo), pour comparer en
          live. Toutes libres en usage commercial (OFL/Apache) et auto-hébergées.
        </p>
      </Section>

      {groups.map((g) => (
        <div key={g.label}>
          <div className="container-vortx pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-strong">
              — {g.label} —
            </p>
          </div>
          {g.fonts.map((f) => {
            const tone = i++ % 2 === 0 ? "base" : "muted";
            return <FontBlock key={f.name} f={f} tone={tone} />;
          })}
        </div>
      ))}
    </PageShell>
  );
}
