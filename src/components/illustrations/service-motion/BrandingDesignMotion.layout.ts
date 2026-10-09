import { INTER_700, JAKARTA_800, textWidth } from "../sites-web-motion/metrics";

/**
 * Text layout of the branding scene, from measured advance widths
 * (sites-web-motion/metrics.ts), so the lasers can aim at words and trace the
 * CTA before the browser lays anything out. Units: the scene viewBox
 * (400 = the panel width = 100cqw).
 *
 *  Headline  the tagline, 1–3 lines (the split with the largest font wins,
 *            ties: the more balanced); the font fits the box width AND
 *            height, words never break. The last word is the climax (lime);
 *            the other words slam in ≤ 3 groups, one per laser slot.
 *  CTA       the pill width follows the label; the font shrinks when the
 *            label would push the row (pill + export chips) past the column.
 */

export const HL_X = 24;
export const HL_Y = 277;
export const HL_W = 352;
/** headline box height: its bottom (339) stays above the CTA (350) */
export const HL_H = 62;
export const HL_FS0 = 30;
export const HL_LS = -0.02;
export const HL_LINE = 1.02;
export const SPACE_EM = (JAKARTA_800.get(" ") ?? 0.18) + HL_LS;

export const CTA_X = 24;
export const CTA_Y = 350;
export const CTA_H = 22.4;
export const CTA_FS0 = 10.8;
export const CTA_LS = -0.01;
export const CTA_PL = 11.2;
export const CTA_PR = 8.8;
export const CTA_GAP = 4.4;
export const CTA_ARROW = 9.6;
const CTA_PAD = CTA_PL + CTA_PR + CTA_GAP + CTA_ARROW;
/** pill + gap + the three export chips fit the 352-unit column */
const CTA_MAX = 236;

/** pre-slam margin to the panel edge */
const M = 5;

export type Group = {
  text: string;
  line: number;
  /** laser slot 0–2 (groups are right-aligned onto the last slots); -1 = climax */
  slot: number;
  x: number;
  y: number;
  w: number;
  cx: number;
  cy: number;
  /** pre-slam scale, horizontal stretch (×), transform-origin x from the group's left */
  s0: number;
  k: number;
  ox: number;
};

/** "." and "," carry ~0.125em of left sidebearing in Jakarta 800 (letters
 *  ~0.03em, no kerning pairs): the markup pulls them in by PUNCT_EM */
export const PUNCT_EM = 0.07;
const wEm = (s: string) => textWidth(s, JAKARTA_800, HL_LS) - PUNCT_EM * (s.match(/[.,]/g)?.length ?? 0);
const lineEm = (ws: string[]) => ws.reduce((a, w) => a + wEm(w), 0) + SPACE_EM * Math.max(0, ws.length - 1);

/** contiguous split of `ws` into n groups with the smallest widest group */
function chunk(ws: string[], n: number): string[][] {
  if (!ws.length) return [];
  let best: string[][] = [ws];
  let bw = Infinity;
  const rec = (start: number, left: number, acc: string[][]) => {
    if (left === 1) {
      const all = [...acc, ws.slice(start)];
      const w = Math.max(...all.map(lineEm));
      if (w < bw) {
        bw = w;
        best = all;
      }
      return;
    }
    for (let i = start + 1; i <= ws.length - left + 1; i++) rec(i, left - 1, [...acc, ws.slice(start, i)]);
  };
  rec(0, Math.min(n, ws.length), []);
  return best;
}

/** every split of ws into n contiguous non-empty lines */
function splits(ws: string[], n: number): string[][][] {
  if (n === 1) return [[ws]];
  const out: string[][][] = [];
  for (let i = 1; i <= ws.length - n + 1; i++) for (const rest of splits(ws.slice(i), n - 1)) out.push([ws.slice(0, i), ...rest]);
  return out;
}

/**
 * Pre-slam fit: the group starts big (scale s0 · stretch k horizontally,
 * skewed) and must stay inside the panel even for one frame.
 */
function slamFit(x0: number, w: number, yTop: number, lh: number, sMax: number, kMax: number, skew: number, lift: number) {
  const tk = Math.tan((skew * Math.PI) / 180);
  const eL = 0.2 * lh * tk;
  const eR = 0.8 * lh * tk;
  const sxMax = Math.max(1.02, (0.97 * (400 - 2 * M)) / (w + eL + eR));
  const sTop = 1 + (yTop + lift * lh - M) / (0.8 * lh);
  let s0 = Math.max(1.02, Math.min(sMax, sTop, sxMax / kMax));
  if (s0 < 1.06) s0 = Math.max(1.02, Math.min(1.06, sxMax, sTop));
  const k = Math.max(1, Math.min(kMax, sxMax / s0));
  const sx = s0 * k;
  const hi = (x0 - M - sx * eL) / (sx - 1);
  const lo = (x0 + sx * (w + eR) - 400 + M) / (sx - 1);
  const ox = Math.min(Math.max(w / 2, lo), Math.max(lo, hi));
  return { s0, k, ox };
}

export function layout(tagline: string, cta: string) {
  /* ── headline ── */
  const all = tagline.trim().split(/\s+/).filter(Boolean);
  if (!all.length) all.push("…");
  let best = { lines: [all], fs: 0, rag: Infinity };
  for (let n = 1; n <= Math.min(3, all.length); n++)
    for (const lines of splits(all, n)) {
      const ems = lines.map(lineEm);
      const fs = Math.min(HL_FS0, (HL_W - 2) / Math.max(...ems, 0.1), HL_H / (n * HL_LINE));
      const rag = Math.max(...ems) - Math.min(...ems);
      if (fs > best.fs + 1e-6 || (Math.abs(fs - best.fs) <= 1e-6 && rag < best.rag)) best = { lines, fs, rag };
    }
  const { fs } = best;
  const lh = HL_LINE * fs;
  const nLines = best.lines.length;
  // the last word is the climax; the others go in ≤ 3 slam groups
  const body = best.lines.map((l, i) => (i === nLines - 1 ? l.slice(0, -1) : l));
  const total = body.reduce((a, l) => a + l.length, 0);
  let per = body.map((l) => Math.min(1, l.length));
  if (total > 0) {
    per = body.map((l) => (l.length ? Math.max(1, Math.min(l.length, Math.round((3 * l.length) / total))) : 0));
    while (per.reduce((a, b) => a + b, 0) > 3) {
      const m = Math.max(...per);
      per[per.lastIndexOf(m)]--;
    }
    while (per.reduce((a, b) => a + b, 0) < Math.min(3, total)) {
      const i = per.findIndex((g, j) => g < body[j].length);
      if (i < 0) break;
      per[i]++;
    }
  }
  const nG = per.reduce((a, b) => a + b, 0);
  const groups: Group[] = [];
  let cx0 = HL_X;
  body.forEach((ws, line) => {
    let x = HL_X;
    const y = HL_Y + line * lh;
    for (const g of chunk(ws, per[line])) {
      const w = lineEm(g) * fs;
      const slot = 3 - nG + groups.length;
      groups.push({ text: g.join(" "), line, slot, x, y, w, cx: x + w / 2, cy: y + lh / 2, ...slamFit(x, w, y, lh, 2.1, 1.3, 14, -0.22) });
      x += w + SPACE_EM * fs;
    }
    if (line === nLines - 1) cx0 = x;
  });
  const climaxText = all[all.length - 1];
  const cw = wEm(climaxText) * fs;
  const cy0 = HL_Y + (nLines - 1) * lh;
  const climax: Group = {
    text: climaxText,
    line: nLines - 1,
    slot: -1,
    x: cx0,
    y: cy0,
    w: cw,
    cx: cx0 + cw / 2,
    cy: cy0 + lh / 2,
    ...slamFit(cx0, cw, cy0, lh, 2.3, 1.25, 18, -0.3),
  };

  /* ── CTA pill: its width follows the label (the forge traces the real outline) ── */
  const label = cta.trim() || "OK";
  const lem = textWidth(label, INTER_700, CTA_LS);
  const cfs = Math.min(CTA_FS0, (CTA_MAX - CTA_PAD) / Math.max(lem, 0.1));
  const ctaW = CTA_PAD + lem * cfs;

  return { fs, lh, nLines, lines: best.lines, groups, climax, label, cfs, ctaW };
}
export type Layout = ReturnType<typeof layout>;
