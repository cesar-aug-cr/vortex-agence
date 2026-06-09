import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  Sora,
  Plus_Jakarta_Sans,
  Outfit,
  JetBrains_Mono,
  Space_Mono,
  Atkinson_Hyperlegible,
} from "next/font/google";
import localFont from "next/font/local";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

/* ---- Fonts (all OFL/Apache — free for commercial use, self-hosted) ---- */
const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], display: "swap" });
const sora = Sora({ subsets: ["latin", "latin-ext"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], display: "swap" });
const outfit = Outfit({ subsets: ["latin", "latin-ext"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin", "latin-ext"], display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "700"], display: "swap" });
const atkinson = Atkinson_Hyperlegible({ subsets: ["latin", "latin-ext"], weight: ["400", "700"], display: "swap" });
// Clarity City — self-hosted (OFL, not on Google Fonts). Files in src/fonts/clarity-city/.
const clarityCity = localFont({
  src: [
    { path: "../../../fonts/clarity-city/ClarityCity-Light.woff2", weight: "300", style: "normal" },
    { path: "../../../fonts/clarity-city/ClarityCity-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../../fonts/clarity-city/ClarityCity-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../../fonts/clarity-city/ClarityCity-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../../fonts/clarity-city/ClarityCity-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

type FontEntry = { name: string; cat: string; license: string; className: string };

const SANS: FontEntry[] = [
  { name: "Space Grotesk", cat: "Sans · techy", license: "OFL", className: spaceGrotesk.className },
  { name: "Manrope", cat: "Sans · géométrique", license: "OFL", className: manrope.className },
  { name: "Sora", cat: "Sans · moderne", license: "OFL", className: sora.className },
  { name: "Plus Jakarta Sans", cat: "Sans · élégante", license: "OFL", className: jakarta.className },
  { name: "Outfit", cat: "Sans · épurée", license: "OFL", className: outfit.className },
  { name: "Atkinson Hyperlegible", cat: "Sans · accessibilité", license: "OFL", className: atkinson.className },
  { name: "Clarity City", cat: "Sans · VMware Clarity", license: "OFL", className: clarityCity.className },
];
const MONO: FontEntry[] = [
  { name: "JetBrains Mono", cat: "Mono · code", license: "OFL", className: jetbrains.className },
  { name: "Space Mono", cat: "Mono · rétro", license: "OFL", className: spaceMono.className },
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

      {/* Accents & diacritics (for translations) */}
      <p className="mt-8 font-mono text-xs uppercase tracking-wide text-text-muted">
        Accents &amp; diacritiques
      </p>
      <p className="mt-2 text-xl text-text">
        à â ä á ã å æ ç é è ê ë í î ï ñ ó ô ö õ œ ù û ü ú ÿ ø ß
      </p>
      <p className="mt-1 text-xl text-text">
        À Â Ä Á Ç É È Ê Ë Í Î Ï Ñ Ó Ô Ö Œ Ù Û Ü Ú Ÿ Ø ẞ ¿ ¡
      </p>

      {/* Real translated sentences (FR / DE / ES / EN) */}
      <p className="mt-8 font-mono text-xs uppercase tracking-wide text-text-muted">
        Phrases multilingues
      </p>
      <div className="mt-3 grid gap-2 text-lg text-text-dim">
        <p>
          <span className="mr-2 font-mono text-xs text-accent-strong">FR</span>
          Été à Cœur : l&apos;œuvre élégante où chaque détail compte déjà — naïveté, sûreté, qualité.
        </p>
        <p>
          <span className="mr-2 font-mono text-xs text-accent-strong">DE</span>
          Schöne Grüße: Über Größe, Maßstäbe und Qualität — straßenweit, fünf Äpfel, weißer Fuß.
        </p>
        <p>
          <span className="mr-2 font-mono text-xs text-accent-strong">ES</span>
          ¡Diseño único! ¿Por qué no destacar y crecer más rápido? Atención, niño señor.
        </p>
        <p>
          <span className="mr-2 font-mono text-xs text-accent-strong">EN</span>
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
        </p>
      </div>

      {/* Punctuation & ligatures */}
      <p className="mt-8 text-lg text-text-dim">
        « guillemets » · „deutsch“ · “english” · ‹ angle › · – — … · &amp; fi fl ffi · © ® ™ ° № ½ ¼ → ←
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
