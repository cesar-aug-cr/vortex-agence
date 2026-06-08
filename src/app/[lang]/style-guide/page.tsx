import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Wordmark } from "@/components/brand/Wordmark";
import { LogoMark } from "@/components/brand/LogoMark";
import ThreeSphereV2BlackHole from "@/components/three/BlackHoleLazy";
import HelixDNA3D from "@/components/three/HelixDNALazy";
import { GlowStar } from "@/components/sections/GlowStar";
import { IconStrategy, IconConversion, IconLocal, IconAI } from "@/components/sections/WhyIcons";
import { featureIcons } from "@/components/illustrations/icons";
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Spark,
  Target,
  Globe,
  Layers,
  Pulse,
  Cookie,
} from "@/components/ui/icons";

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
  // Internal reference page — keep it out of search results.
  return buildMetadata({
    lang,
    path: "/style-guide",
    title: "Style guide | vortx design system",
    description: "Référence interne du design system vortx.",
    index: false,
  });
}

/* ---------- small building blocks ---------- */

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Swatch({ cls, name, value, ring }: { cls: string; name: string; value: string; ring?: boolean }) {
  return (
    <div>
      <div className={`h-16 w-full rounded-xl ${cls} ${ring ? "ring-1 ring-inset ring-border" : ""}`} />
      <p className="mt-2 font-mono text-xs font-medium text-text">{name}</p>
      <p className="font-mono text-[0.7rem] text-text-muted">{value}</p>
    </div>
  );
}

const brand = [
  { cls: "bg-accent", name: "accent", value: "#c8f02e" },
  { cls: "bg-accent-2", name: "accent-2", value: "#14e0c8" },
  { cls: "bg-accent-ink", name: "accent-ink", value: "#0a0a0b" },
  { cls: "bg-accent-soft", name: "accent-soft", value: "lime / 12%", ring: true },
];
const surfaces = [
  { cls: "bg-bg", name: "bg", value: "#f7f8f4 · #09090c", ring: true },
  { cls: "bg-bg-elevated", name: "bg-elevated", value: "#fff · #131319", ring: true },
  { cls: "bg-bg-card", name: "bg-card", value: "#fff · #121218", ring: true },
  { cls: "bg-stage", name: "stage", value: "#07070a" },
  { cls: "bg-stage-elevated", name: "stage-elevated", value: "#101015" },
];
const textTones = [
  { cls: "bg-text", name: "text", value: "#0a0a0b · #f2f3ee", ring: true },
  { cls: "bg-text-dim", name: "text-dim", value: "#45483f · #b9bcb2" },
  { cls: "bg-text-muted", name: "text-muted", value: "#767970 · #7e817a" },
  { cls: "bg-border", name: "border", value: "ink / 10%", ring: true },
  { cls: "bg-border-strong", name: "border-strong", value: "ink / 20%", ring: true },
];
const palette = [
  { cls: "bg-[#c8f02e]", name: "lime", value: "#c8f02e" },
  { cls: "bg-[#14e0c8]", name: "cyan", value: "#14e0c8" },
  { cls: "bg-[#22d38c]", name: "green", value: "#22d38c" },
  { cls: "bg-[#2e66ff]", name: "blue", value: "#2e66ff" },
  { cls: "bg-[#0a0a0b]", name: "ink", value: "#0a0a0b" },
];

const fieldClass =
  "w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

const uiIcons: { name: string; Icon: typeof Check }[] = [
  { name: "Check", Icon: Check },
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "ArrowUpRight", Icon: ArrowUpRight },
  { name: "Plus", Icon: Plus },
  { name: "Spark", Icon: Spark },
  { name: "Target", Icon: Target },
  { name: "Globe", Icon: Globe },
  { name: "Layers", Icon: Layers },
  { name: "Pulse", Icon: Pulse },
  { name: "Cookie", Icon: Cookie },
];

export default async function StyleGuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Section tone="base" className="pt-10 md:pt-12">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          Design system
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-[1.08] text-text md:text-5xl">
          vortx — Style guide
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-text-dim">
          Référence interne des tokens et composants. Basculez le thème (clair/sombre)
          dans l'en-tête pour voir les couleurs s'adapter.
        </p>
      </Section>

      <Section tone="base" className="!pt-0" containerClassName="grid gap-16">
        {/* Brand */}
        <Block title="Marque">
          <div className="flex flex-wrap items-center gap-10">
            <div className="rounded-2xl border border-border bg-bg-card p-6">
              <LogoMark className="h-8 w-auto text-text" />
              <p className="mt-3 font-mono text-xs text-text-muted">LogoMark (animé)</p>
            </div>
            <div className="rounded-2xl border border-border bg-bg-card p-6">
              <LogoMark animated={false} className="h-8 w-auto text-text" />
              <p className="mt-3 font-mono text-xs text-text-muted">LogoMark (statique)</p>
            </div>
            <div className="rounded-2xl border border-border bg-bg-card p-6">
              <Wordmark className="h-8 w-auto text-text" />
              <p className="mt-3 font-mono text-xs text-text-muted">Wordmark</p>
            </div>
          </div>
        </Block>

        {/* Colors */}
        <Block title="Couleurs · marque">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-5">
            {brand.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Block>
        <Block title="Couleurs · surfaces">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-5">
            {surfaces.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Block>
        <Block title="Couleurs · texte & bordures">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-5">
            {textTones.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Block>
        <Block title="Palette brute (illustrations)">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-5">
            {palette.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Block>

        {/* Typography */}
        <Block title="Typographie">
          <div className="space-y-4 rounded-2xl border border-border bg-bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Eyebrow · mono</p>
            <h1 className="text-4xl font-bold leading-[1.04] text-text md:text-6xl">
              Display / H1 <span className="text-gradient">gradient</span>
            </h1>
            <h2 className="text-3xl font-bold text-text md:text-5xl">Heading / H2</h2>
            <h3 className="text-xl font-semibold text-text">Heading / H3</h3>
            <p className="tagline text-lg font-medium">Tagline (accent-2)</p>
            <p className="max-w-2xl text-lg text-text-dim">
              Lead — Inter Tight. Le corps de texte par défaut utilise text-dim sur les surfaces
              claires comme sombres, avec une hauteur de ligne confortable.
            </p>
            <p className="max-w-2xl text-text-muted">Texte secondaire — text-muted.</p>
            <p className="font-mono text-sm text-text-dim">Mono — JetBrains Mono · 1234567890</p>
          </div>
        </Block>

        {/* Buttons */}
        <Block title="Boutons">
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn btn-primary">
              btn btn-primary
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 font-semibold text-text transition-colors hover:border-accent hover:text-accent"
            >
              Secondaire (outline)
            </button>
            <button
              type="button"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Lien d'action
              <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button type="button" disabled className="btn btn-primary opacity-60">
              Désactivé
            </button>
          </div>
        </Block>

        {/* Cards & chips */}
        <Block title="Cartes & chips">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="card p-6">
              <p className="font-semibold text-text">card</p>
              <p className="mt-2 text-sm text-text-dim">Surface de base bordée.</p>
            </div>
            <div className="card card-hover p-6">
              <p className="font-semibold text-text">card card-hover</p>
              <p className="mt-2 text-sm text-text-dim">Survolez pour l'effet.</p>
            </div>
            <div className="illu-stage flex items-center justify-center rounded-2xl border border-border p-6">
              <span className="font-mono text-xs text-text-muted">illu-stage</span>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["chip", "Next.js", "SEO", "GEO", "WordPress"].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </Block>

        {/* Forms */}
        <Block title="Formulaires">
          <div className="grid max-w-xl gap-4">
            <input className={fieldClass} placeholder="Champ texte" />
            <textarea rows={3} className={fieldClass} placeholder="Zone de texte" />
            <select className={fieldClass} defaultValue="">
              <option value="" disabled>
                Menu déroulant
              </option>
              <option>Option A</option>
              <option>Option B</option>
            </select>
            <label className="flex items-center gap-3 text-sm text-text-dim">
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-[var(--accent)]" />
              Case à cocher
            </label>
          </div>
        </Block>

        {/* Icons */}
        <Block title="Icônes · UI">
          <div className="flex flex-wrap gap-3">
            {uiIcons.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-bg-card text-text"
              >
                <Icon width={22} height={22} className="text-accent" />
                <span className="font-mono text-[0.6rem] text-text-muted">{name}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Icônes · piliers (statiques)">
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Strategy", Icon: IconStrategy },
              { name: "Conversion", Icon: IconConversion },
              { name: "Local", Icon: IconLocal },
              { name: "AI", Icon: IconAI },
            ].map(({ name, Icon }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="h-10 w-10" />
                </span>
                <span className="font-mono text-[0.6rem] text-text-muted">{name}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Icônes · illustrations (animées)">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {Object.entries(featureIcons).map(([key, Icon]) => (
              <div
                key={key}
                className="illu-stage flex flex-col items-center justify-center gap-2 rounded-xl border border-border p-3"
              >
                <Icon className="h-12 w-12" />
                <span className="font-mono text-[0.55rem] text-text-muted">{key}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* 3D / WebGL */}
        <Block title="3D · WebGL">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-2xl border border-border bg-stage">
              <ThreeSphereV2BlackHole
                showSphere={false}
                bhPositionOverride={[0, 0, 0]}
                bhPositionMobileOverride={[0, 0, 0]}
                bhScaleOverride={1.3}
              />
              <span className="absolute bottom-4 left-4 z-10 font-mono text-xs text-stage-text-dim">
                Black hole (Three.js)
              </span>
            </div>
            <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-border bg-stage">
              <HelixDNA3D height={320} tiltDeg={-20} />
              <span className="absolute bottom-4 left-4 z-10 font-mono text-xs text-stage-text-dim">
                ADN helix (Three.js)
              </span>
            </div>
          </div>
        </Block>

        {/* Effects */}
        <Block title="Effets">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card p-8">
              <p className="text-2xl font-bold text-text">
                .text-gradient → <span className="text-gradient">attire & convertit</span>
              </p>
              <p className="brand-sweep mt-4 font-mono text-sm font-semibold uppercase tracking-[0.18em]">
                .brand-sweep
              </p>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-stage p-8">
              <span className="font-mono text-xs text-stage-text-dim">GlowStar</span>
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <GlowStar className="left-1/2 top-1/2" scale={0.6} />
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              { cls: "rounded-lg", name: "rounded-lg" },
              { cls: "rounded-xl", name: "rounded-xl" },
              { cls: "rounded-2xl", name: "rounded-2xl" },
              { cls: "rounded-3xl", name: "rounded-3xl" },
            ].map((r) => (
              <div key={r.name}>
                <div className={`h-16 w-full border border-border bg-bg-card ${r.cls}`} />
                <p className="mt-2 font-mono text-[0.7rem] text-text-muted">{r.name}</p>
              </div>
            ))}
          </div>
        </Block>
      </Section>
    </PageShell>
  );
}
