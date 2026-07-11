import { ImageResponse } from "next/og";

/**
 * Shared OpenGraph/Twitter image renderer for per-page dynamic images
 * (services, sub-services, news articles).
 *
 * Mirrors the brand design of `src/app/[lang]/opengraph-image.tsx`:
 * 1200×630, dark #09090c background, teal/lime radial gradients,
 * lime eyebrow, "VorTX" wordmark with TX in #c8f02e.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/** Adaptive title size so long titles (news: 45–80 chars) always fit. */
export function ogTitleFontSize(title: string): number {
  const len = title.length;
  if (len <= 40) return 84;
  if (len <= 70) return 66;
  if (len <= 100) return 54;
  return 46;
}

export function renderOgImage({
  eyebrow,
  title,
  footnote,
}: {
  /** Small uppercase lime line above the title. */
  eyebrow: string;
  /** Main page title (font size adapts to length). */
  title: string;
  /** Dim text next to the wordmark in the footer (e.g. "vortx.lu · Luxembourg"). */
  footnote?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
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
            maxWidth: 1040,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: ogTitleFontSize(title),
            fontWeight: 800,
            letterSpacing: -1,
            lineHeight: 1.12,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: 56,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          Vor
          <span style={{ color: "#c8f02e" }}>TX</span>
          <span
            style={{
              marginLeft: 24,
              fontSize: 26,
              fontWeight: 600,
              color: "#b9bcb2",
              letterSpacing: 0,
            }}
          >
            {footnote ?? "vortx.lu · Luxembourg"}
          </span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
