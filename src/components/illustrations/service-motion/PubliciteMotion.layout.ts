import { INTER_700, JAKARTA_800, textWidth } from "../sites-web-motion/metrics";

/**
 * Text layout of the online-advertising scene (PubliciteMotion.tsx), from the
 * measured advance widths of the Sites web scene (metrics.ts), so the lasers
 * can aim at words and trace the CTA before the browser lays anything out.
 * Units: the scene's viewBox (400 = the panel width = 100cqw).
 *
 *  Headline  the page tagline. Its last two words ("bonnes personnes.", "right
 *            people.", "richtigen Menschen.", "personas correctas.") are the
 *            lime climax line; the other words take 1–2 lines above it,
 *            preferably broken after a comma. The font fits the box width AND
 *            height; words never break. The words above animate in ≤ 4 slam
 *            groups (one per laser slot).
 *  Chip      the service title (JetBrains Mono, 0.6em advance).
 *  CTA       the pill width follows the label; the font shrinks when the label
 *            would be wider than CTA_MAX.
 */

export const TITLE_X = 30;
export const TITLE_Y = 48;
export const TITLE_W = 340;
/** title box height: its bottom (130) stays above the console (140) */
export const TITLE_H = 81;
export const FS0 = 31;
export const TLS = -0.025; // title letter-spacing (em)
export const LINE = 0.98; // title line-height

export const CHIP_X = 30;
export const CHIP_Y = 25;
export const CHIP_H = 14;
export const CHIP_FS = 6.6;
export const CHIP_PAD = 5;
export const CHIP_ICON = 7;
export const CHIP_GAP = 3.4;
const CHIP_MAX = 200;

export const CTA_X = 30;
export const CTA_Y = 336;
export const CTA_H = 22.4;
export const CTA_FS0 = 10.6;
export const CTA_LS = -0.01;
/** pill padding left / right, label → arrow gap, arrow box (units) */
export const CTA_PL = 11;
export const CTA_PR = 8.6;
export const CTA_GAP = 4.4;
export const CTA_ARROW = 9.4;
export const CTA_PAD = CTA_PL + CTA_PR + CTA_GAP + CTA_ARROW;
/** the ROAS meter starts at x 232: pill + gap stay left of it */
const CTA_MAX = 190;

/** pre-slam margin to the panel edge */
const M = 5;

export type Group = {
  text: string;
  /** title line (0-based) */
  line: number;
  /** laser slot 0–3 (groups are right-aligned onto the last slots); -1 = climax */
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

/** a word space of the title (em, letter-spacing included) */
/** extra word spacing of the title (em): Jakarta's space is tight at this weight */
export const WSP = 0.06;
export const SPACE_EM = (JAKARTA_800.get(" ") ?? 0.18) + TLS + WSP;
/**
 * Jakarta's comma / period carry a wide left side bearing that kerning would
 * eat (the title is set without kerning, so the widths stay exact): trailing
 * punctuation is pulled in by this much (em) in the markup and in the widths.
 */
export const PUNCT_PULL = 0.07;
export const TRAIL = /[,.;:!?…]+$/;
const wEm = (s: string) => textWidth(s, JAKARTA_800, TLS) - (TRAIL.test(s) ? PUNCT_PULL : 0);
const lineEm = (ws: string[]) => ws.reduce((a, w) => a + wEm(w), 0) + SPACE_EM * Math.max(0, ws.length - 1);

/** contiguous split of `ws` into n groups with the smallest widest group */
function chunk(ws: string[], n: number): string[][] {
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

/**
 * Pre-slam fit: the group starts big (scale s0 · stretch k horizontally, skewed)
 * and must stay inside the panel even for one frame: the horizontal scale is
 * capped by the panel width and the transform origin `ox` moves so the scaled
 * group stays between the walls; s0 is also capped so the lifted group stays
 * below the panel top.
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

const PUNCT = /[,;:–—]$/;

export function layout(title: string, tagline: string, cta: string) {
  /* ── headline: climax = the last 2 words (1 if they do not fit / too few) ── */
  const words = tagline.trim().split(/\s+/).filter(Boolean);
  if (!words.length) words.push("Ads");
  type Cand = { rest: string[][]; climax: string[]; fs: number; score: number };
  let best: Cand | null = null;
  for (const kc of [2, 1]) {
    if (kc > words.length || (kc === 2 && words.length < 4)) continue;
    const climax = words.slice(words.length - kc);
    const rest = words.slice(0, words.length - kc);
    const splits: string[][][] = rest.length ? [[rest]] : [[]];
    for (let i = 1; i < rest.length; i++) splits.push([rest.slice(0, i), rest.slice(i)]);
    for (const lines of splits) {
      const ems = lines.filter((l) => l.length).map(lineEm);
      const nLines = ems.length + 1;
      const fs = Math.min(FS0, (TITLE_W - 2) / Math.max(lineEm(climax), ...ems, 0.1), TITLE_H / (nLines * LINE));
      const comma = lines.length === 2 && PUNCT.test(lines[0][lines[0].length - 1]) ? 2 : 0;
      const rag = ems.length > 1 ? Math.abs(ems[0] - ems[1]) * 0.05 : 0;
      const score = fs + (kc === 2 ? 1.5 : 0) + comma - rag;
      if (!best || score > best.score + 1e-6) best = { rest: lines.filter((l) => l.length), climax, fs, score };
    }
  }
  const { rest, climax: cw, fs } = best as Cand;
  const lh = LINE * fs;
  // ≤ 4 slam groups (one per laser slot), spread over the lines
  const total = rest.reduce((a, l) => a + l.length, 0);
  let per = rest.map((l) => l.length);
  if (total > 4) {
    per = rest.map((l) => Math.max(1, Math.min(l.length, Math.round((4 * l.length) / total))));
    while (per.reduce((a, b) => a + b, 0) > 4) per[per.indexOf(Math.max(...per))]--;
    while (per.reduce((a, b) => a + b, 0) < 4) {
      const i = per.findIndex((g, j) => g < rest[j].length);
      if (i < 0) break;
      per[i]++;
    }
  }
  const nG = per.reduce((a, b) => a + b, 0);
  const groups: Group[] = [];
  rest.forEach((ws, line) => {
    let x = TITLE_X;
    const y = TITLE_Y + line * lh;
    for (const g of chunk(ws, per[line])) {
      const w = lineEm(g) * fs;
      const slot = 4 - nG + groups.length;
      groups.push({ text: g.join(" "), line, slot, x, y, w, cx: x + w / 2, cy: y + lh / 2, ...slamFit(x, w, y, lh, 2.1, 1.3, 14, -0.22) });
      x += w + SPACE_EM * fs;
    }
  });
  const cl = rest.length;
  const cwu = lineEm(cw) * fs;
  const cy0 = TITLE_Y + cl * lh;
  const climax: Group = {
    text: cw.join(" "),
    line: cl,
    slot: -1,
    x: TITLE_X,
    y: cy0,
    w: cwu,
    cx: TITLE_X + cwu / 2,
    cy: cy0 + lh / 2,
    ...slamFit(TITLE_X, cwu, cy0, lh, 2.2, 1.22, 18, -0.3),
  };

  /* ── chip: the service title (mono), clamped by an ellipsis past CHIP_MAX ── */
  const chipText = title.trim();
  const chipW = Math.min(CHIP_MAX, 2 * CHIP_PAD + CHIP_ICON + CHIP_GAP + [...chipText].length * 0.6 * CHIP_FS + 3);

  /* ── CTA pill: its width follows the label (the forge traces the real outline) ── */
  const label = cta.trim() || "OK";
  const lem = textWidth(label, INTER_700, CTA_LS);
  const cfs = Math.min(CTA_FS0, (CTA_MAX - CTA_PAD) / Math.max(lem, 0.1));
  const ctaW = CTA_PAD + lem * cfs;

  return { fs, lh, nLines: cl + 1, groups, climax, chipText, chipW, label, cfs, ctaW };
}
export type Layout = ReturnType<typeof layout>;
