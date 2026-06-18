import { ImageResponse } from "next/og";
import { i18n, isLocale, type Locale } from "@/i18n/config";

export const alt = "vortx — Marketing & web agency · Luxembourg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const COPY: Record<Locale, { eyebrow: string; tagline: string }> = {
  fr: { eyebrow: "Agence marketing · Luxembourg", tagline: "Le marketing qui attire et convertit." },
  en: { eyebrow: "Marketing agency · Luxembourg", tagline: "Marketing that attracts and converts." },
  de: { eyebrow: "Marketing-Agentur · Luxemburg", tagline: "Marketing, das anzieht und konvertiert." },
  es: { eyebrow: "Agencia de marketing · Luxemburgo", tagline: "Marketing que atrae y convierte." },
};

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const t = COPY[lang] ?? COPY[i18n.defaultLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#09090c",
          backgroundImage:
            "radial-gradient(60% 80% at 80% 20%, rgba(20,224,200,0.22), transparent 60%), radial-gradient(60% 80% at 10% 100%, rgba(200,240,46,0.18), transparent 60%)",
          color: "#f4f5ef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c8f02e",
            fontWeight: 600,
          }}
        >
          {t.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          Vor
          <span style={{ color: "#c8f02e" }}>TX</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 46,
            fontWeight: 700,
            color: "#b9bcb2",
            maxWidth: 900,
          }}
        >
          {t.tagline}
        </div>
      </div>
    ),
    size
  );
}
