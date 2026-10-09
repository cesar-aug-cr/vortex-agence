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
  /** Visitor's name, typed on the result screen; empty → a dotted line to fill in by hand. */
  name: string;
  scoreLabel: string;
  score: number;
  total: number;
  dateLabel: string;
  date: string;
  footer: string;
};

const INK = "#0a0a0b";
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

  drawWordmark(ctx, cx, 200, 110);

  // Heading
  let y = 430;
  ctx.fillStyle = TEAL_DEEP;
  ctx.font = `700 26px ${mono}`;
  spaced(ctx, "0.3em");
  ctx.fillText(input.heading.toUpperCase(), cx, y);
  spaced(ctx, "0px");

  y += 82;
  ctx.fillStyle = INK;
  ctx.font = `800 60px ${sans}`;
  ctx.fillText(input.subheading, cx, y);

  // Lime rule
  y += 48;
  ctx.fillStyle = LIME;
  roundedRect(ctx, cx - 64, y, 128, 8, 4);
  ctx.fill();

  // Awarded to + the visitor's name on a dotted line (left blank to fill in
  // by hand when no name was typed)
  y += 100;
  ctx.fillStyle = INK_MUTED;
  ctx.font = `500 24px ${sans}`;
  spaced(ctx, "0.14em");
  ctx.fillText(input.awardedTo.toUpperCase(), cx, y);
  spaced(ctx, "0px");
  y += 100;
  const name = input.name.trim();
  if (name) {
    // largest size (64 → 32 px) at which the name fits the line
    let size = 64;
    do {
      ctx.font = `800 ${size}px ${sans}`;
    } while (ctx.measureText(name).width > 640 && (size -= 2) > 32);
    ctx.fillStyle = INK;
    ctx.fillText(name, cx, y - 18);
  }
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.setLineDash([3, 14]);
  ctx.beginPath();
  ctx.moveTo(cx - 300, y);
  ctx.lineTo(cx + 300, y);
  ctx.stroke();
  ctx.setLineDash([]);

  // Badge, clipped to a circle with an ink ring
  y += 80;
  const badgeR = 150;
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
  y = badgeCy + badgeR + 90;
  ctx.fillStyle = INK_MUTED;
  ctx.font = `500 24px ${sans}`;
  spaced(ctx, "0.14em");
  ctx.fillText(input.scoreLabel.toUpperCase(), cx, y);
  spaced(ctx, "0px");
  y += 130;
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
