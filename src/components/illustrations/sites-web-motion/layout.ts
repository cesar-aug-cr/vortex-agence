import { INTER_500, INTER_700, JAKARTA_800, textWidth } from "./metrics";

/**
 * Text layout of the laser scene, from measured advance widths (metrics.ts), so the
 * lasers can aim at words and trace the CTA before the browser lays anything
 * out. Units: the scene's viewBox (400 = the panel width = 100cqw).
 *
 *  Title    the last word is the climax line (lime, underlined); the other
 *           words take 0–2 lines above it. Of every split, the one with the
 *           largest font wins (ties: the more balanced). The font fits the box
 *           width AND height (TITLE_H ends above the tagline), words never
 *           break. Words animate in ≤ 4 slam groups (one per laser slot).
 *  Tagline  ≤ 2 lines: the box widens to the full column, then the font
 *           shrinks; a last-resort 2-line clamp keeps it off the CTA.
 *  CTA      the pill width follows the label; the font shrinks when the label
 *           would push the row past the content column.
 */

export const TITLE_X = 42;
export const TITLE_Y = 110;
export const TITLE_W = 316;
/** title box height: its bottom (182) stays above the tagline (184) */
export const TITLE_H = 72;
export const FS0 = 34; // 8.5cqw
export const TLS = -0.025; // title letter-spacing (em)
export const LINE = 0.98; // title line-height

export const TAG_Y = 184;
export const TAG_W = 256;
const TAG_WMAX = 316;
export const TAG_FS0 = 10.2; // 2.55cqw
const TAG_FSMIN = 8;

export const CTA_X = 42;
export const CTA_Y = 220;
export const CTA_H = 22.4;
export const CTA_FS0 = 10.8; // 2.7cqw
export const CTA_LS = -0.01;
/** pill padding left / right, label → arrow gap, arrow box (units) */
export const CTA_PL = 11.2;
export const CTA_PR = 8.8;
export const CTA_GAP = 4.4;
export const CTA_ARROW = 9.6;
/** everything in the pill but the label */
export const CTA_PAD = CTA_PL + CTA_PR + CTA_GAP + CTA_ARROW;
/** pill + gap + secondary button must fit the 316-unit column */
const CTA_MAX = 250;

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
export const SPACE_EM = (JAKARTA_800.get(" ") ?? 0.18) + TLS;
const SPC = SPACE_EM;
const wEm = (s: string) => textWidth(s, JAKARTA_800, TLS);
const lineEm = (ws: string[]) => ws.reduce((a, w) => a + wEm(w), 0) + SPC * Math.max(0, ws.length - 1);

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
  // the lifted, scaled box top (origin at 80 % of the line) stays below M
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

/** greedy line count of the tagline at font fs (units) in width w */
function tagLines(words: string[], fs: number, w: number): number {
  const sp = (INTER_500.get(" ") ?? 0.223) * fs;
  let n = 1;
  let x = -1;
  for (const word of words) {
    const ww = textWidth(word, INTER_500) * fs;
    if (x < 0) x = ww;
    else if (x + sp + ww <= w) x += sp + ww;
    else {
      n++;
      x = ww;
    }
  }
  return n;
}

export function layout(title: string, tagline: string, cta: string) {
  /* ── title ── */
  const words = title.trim().split(/\s+/).filter(Boolean);
  const climaxText = words.pop() ?? "Web";
  const cands: string[][][] = words.length ? [[words]] : [[]];
  for (let i = 1; i < words.length; i++) cands.push([words.slice(0, i), words.slice(i)]);
  let best = { lines: cands[0], fs: 0, rag: Infinity };
  for (const lines of cands) {
    const ems = lines.map(lineEm);
    const fs = Math.min(FS0, (TITLE_W - 2) / Math.max(wEm(climaxText), ...ems, 0.1), TITLE_H / ((lines.length + 1) * LINE));
    const rag = ems.length > 1 ? Math.abs(ems[0] - ems[1]) : 0;
    if (fs > best.fs + 1e-6 || (Math.abs(fs - best.fs) <= 1e-6 && rag < best.rag)) best = { lines, fs, rag };
  }
  const { fs } = best;
  const lh = LINE * fs;
  // ≤ 4 slam groups (one per laser slot), spread over the lines
  const total = best.lines.reduce((a, l) => a + l.length, 0);
  let per = best.lines.map((l) => l.length);
  if (total > 4) {
    per = best.lines.map((l) => Math.max(1, Math.min(l.length, Math.round((4 * l.length) / total))));
    while (per.reduce((a, b) => a + b, 0) > 4) per[per.indexOf(Math.max(...per))]--;
    while (per.reduce((a, b) => a + b, 0) < 4) {
      const i = per.findIndex((g, j) => g < best.lines[j].length);
      if (i < 0) break;
      per[i]++;
    }
  }
  const nG = per.reduce((a, b) => a + b, 0);
  const groups: Group[] = [];
  best.lines.forEach((ws, line) => {
    let x = TITLE_X;
    const y = TITLE_Y + line * lh;
    for (const g of chunk(ws, per[line])) {
      const w = lineEm(g) * fs;
      const slot = 4 - nG + groups.length;
      groups.push({ text: g.join(" "), line, slot, x, y, w, cx: x + w / 2, cy: y + lh / 2, ...slamFit(x, w, y, lh, 2.15, 1.3, 14, -0.22) });
      x += w + SPC * fs;
    }
  });
  const cl = best.lines.length;
  const cw = wEm(climaxText) * fs;
  const cy0 = TITLE_Y + cl * lh;
  const climax: Group = {
    text: climaxText,
    line: cl,
    slot: -1,
    x: TITLE_X,
    y: cy0,
    w: cw,
    cx: TITLE_X + cw / 2,
    cy: cy0 + lh / 2,
    ...slamFit(TITLE_X, cw, cy0, lh, 2.35, 1.25, 18, -0.3),
  };

  /* ── tagline: ≤ 2 lines ── */
  const tw = tagline.trim().split(/\s+/).filter(Boolean);
  let tag = { fs: TAG_FS0, w: TAG_W, clamp: false };
  if (tagLines(tw, TAG_FS0, TAG_W * 0.97) > 2) {
    tag = { fs: TAG_FS0, w: TAG_WMAX, clamp: false };
    while (tagLines(tw, tag.fs, TAG_WMAX * 0.97) > 2 && tag.fs > TAG_FSMIN) tag.fs = Math.max(TAG_FSMIN, tag.fs - 0.2);
    tag.clamp = tagLines(tw, tag.fs, TAG_WMAX * 0.97) > 2;
  }

  /* ── CTA pill: its width follows the label (the forge traces the real outline) ── */
  const label = cta.trim() || "OK";
  const lem = textWidth(label, INTER_700, CTA_LS);
  const cfs = Math.min(CTA_FS0, (CTA_MAX - CTA_PAD) / Math.max(lem, 0.1));
  const ctaW = CTA_PAD + lem * cfs;

  return { fs, lh, nLines: cl + 1, groups, climax, tag, label, cfs, ctaW };
}
export type Layout = ReturnType<typeof layout>;
