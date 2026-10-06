import { LOGO_GEOMETRY } from "@/components/brand/LogoMark";

/**
 * Quiz certificate, drawn on a canvas so the badge, the wordmark and the
 * typography are baked into one file the visitor downloads and prints at
 * home. Replaces the former `window.print()` portal, where the badge image
 * was not reliably painted by the print dialog.
 *
 * A4 portrait at 150 dpi (1240 × 1754 px): crisp on paper, a few hundred Ko
 * as PNG.
 */
export const CERT_WIDTH = 1240;
export const CERT_HEIGHT = 1754;

export type CertificateInput = {
  /** Static variant URL, e.g. /_img/quiz/niveau-3-640.webp */
  badgeSrc: string;
  heading: string;
  subheading: string;
  awardedTo: string;
  scoreLabel: string;
  score: number;
  total: number;
  verdict: string;
  message: string;
  dateLabel: string;
  date: string;
  footer: string;
};

const INK = "#0a0a0b";
const INK_SOFT = "#444444";
const INK_MUTED = "#666666";
const INK_FAINT = "#777777";
const LIME = "#c8f02e";
const TEAL = "#22d38c";
const TEAL_DEEP = "#0f766e";

function cssFont(variable: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`certificate: cannot load ${src}`));
    img.src = src;
  });
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Word-wraps `text` to `maxWidth`; returns the y after the last line drawn. */
function drawWrapped(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 6
): number {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const probe = line ? `${line} ${word}` : word;
    if (ctx.measureText(probe).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = probe;
    }
  }
  if (line) lines.push(line);
  const shown = lines.slice(0, maxLines);
  if (lines.length > maxLines) shown[maxLines - 1] = shown[maxLines - 1].replace(/\s*\S*$/, " …");
  shown.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return y + shown.length * lineHeight;
}

function drawWordmark(ctx: CanvasRenderingContext2D, cx: number, top: number, height: number) {
  const { V, R, T, X, O_CX, O_CY, O_R, width, height: vbH } = LOGO_GEOMETRY;
  const scale = height / vbH;
  ctx.save();
  ctx.translate(cx - (width * scale) / 2, top);
  ctx.scale(scale, scale);
  ctx.fillStyle = INK;
  for (const d of [V, R, T, X]) ctx.fill(new Path2D(d));
  ctx.beginPath();
  ctx.arc(O_CX, O_CY, O_R, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function spaced(ctx: CanvasRenderingContext2D, em: string) {
  // letterSpacing is not in every TS lib yet; set it when the browser has it.
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = em;
}

export async function renderCertificate(input: CertificateInput): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = CERT_WIDTH;
  canvas.height = CERT_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("certificate: no 2d context");

  const sans = cssFont("--font-inter-tight", "Inter, Arial, sans-serif");
  const mono = cssFont("--font-jetbrains-mono", "ui-monospace, Menlo, monospace");
  const [badge] = await Promise.all([loadImage(input.badgeSrc), document.fonts?.ready ?? Promise.resolve()]);

  const W = CERT_WIDTH;
  const H = CERT_HEIGHT;
  const cx = W / 2;

  // Paper + frames (outer ink, inner teal), as in the former print CSS.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  const m = 70;
  ctx.lineWidth = 6;
  ctx.strokeStyle = INK;
  roundedRect(ctx, m, m, W - 2 * m, H - 2 * m, 36);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = TEAL;
  roundedRect(ctx, m + 18, m + 18, W - 2 * (m + 18), H - 2 * (m + 18), 24);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  drawWordmark(ctx, cx, 190, 110);

  // Heading
  let y = 390;
  ctx.fillStyle = TEAL_DEEP;
  ctx.font = `700 26px ${mono}`;
  spaced(ctx, "0.3em");
  ctx.fillText(input.heading.toUpperCase(), cx, y);
  spaced(ctx, "0px");

  y += 76;
  ctx.fillStyle = INK;
  ctx.font = `800 60px ${sans}`;
  ctx.fillText(input.subheading, cx, y);

  // Lime rule
  y += 48;
  ctx.fillStyle = LIME;
  roundedRect(ctx, cx - 64, y, 128, 8, 4);
  ctx.fill();

  // Awarded to + dotted name line (filled in by hand)
  y += 84;
  ctx.fillStyle = INK_MUTED;
  ctx.font = `500 24px ${sans}`;
  spaced(ctx, "0.14em");
  ctx.fillText(input.awardedTo.toUpperCase(), cx, y);
  spaced(ctx, "0px");
  y += 60;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.setLineDash([3, 14]);
  ctx.beginPath();
  ctx.moveTo(cx - 300, y);
  ctx.lineTo(cx + 300, y);
  ctx.stroke();
  ctx.setLineDash([]);

  // Badge, clipped to a circle with an ink ring
  y += 70;
  const badgeR = 120;
  const badgeCy = y + badgeR;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, badgeCy, badgeR, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  const side = Math.min(badge.naturalWidth, badge.naturalHeight);
  ctx.drawImage(
    badge,
    (badge.naturalWidth - side) / 2,
    (badge.naturalHeight - side) / 2,
    side,
    side,
    cx - badgeR,
    badgeCy - badgeR,
    badgeR * 2,
    badgeR * 2
  );
  ctx.restore();
  ctx.lineWidth = 3;
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.arc(cx, badgeCy, badgeR, 0, Math.PI * 2);
  ctx.stroke();

  // Score
  y = badgeCy + badgeR + 80;
  ctx.fillStyle = INK_MUTED;
  ctx.font = `500 24px ${sans}`;
  spaced(ctx, "0.14em");
  ctx.fillText(input.scoreLabel.toUpperCase(), cx, y);
  spaced(ctx, "0px");
  y += 120;
  const scoreText = String(input.score);
  const totalText = ` / ${input.total}`;
  ctx.font = `800 128px ${sans}`;
  const scoreW = ctx.measureText(scoreText).width;
  ctx.font = `600 48px ${sans}`;
  const totalW = ctx.measureText(totalText).width;
  const startX = cx - (scoreW + totalW) / 2;
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = `800 128px ${sans}`;
  ctx.fillText(scoreText, startX, y);
  ctx.fillStyle = "#999999";
  ctx.font = `600 48px ${sans}`;
  ctx.fillText(totalText, startX + scoreW, y);
  ctx.textAlign = "center";

  // Verdict + message
  y += 90;
  ctx.fillStyle = INK;
  ctx.font = `700 44px ${sans}`;
  y = drawWrapped(ctx, input.verdict, cx, y, W - 2 * (m + 90), 54, 2);
  y += 14;
  ctx.fillStyle = INK_SOFT;
  ctx.font = `400 27px ${sans}`;
  drawWrapped(ctx, input.message, cx, y, 820, 40, 5);

  // Footer
  ctx.fillStyle = INK_FAINT;
  ctx.font = `600 19px ${mono}`;
  spaced(ctx, "0.06em");
  // Two centred lines: side by side they collide on long locales.
  ctx.textAlign = "center";
  ctx.fillText(`${input.dateLabel} ${input.date}`.toUpperCase(), cx, H - m - 104);
  ctx.fillText(input.footer.toUpperCase(), cx, H - m - 64);
  spaced(ctx, "0px");

  return canvas;
}

/** Hands the canvas to the visitor as a PNG download. */
export function downloadCanvas(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve();
    }, "image/png");
  });
}
