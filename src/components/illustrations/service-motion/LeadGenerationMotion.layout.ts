import { INTER_500, INTER_700, JAKARTA_800, textWidth } from "../sites-web-motion/metrics";

/**
 * Text layout of the lead-generation scene (LeadGenerationMotion.tsx), from
 * the measured advance widths of the sites-web scene (metrics.ts), so the
 * lasers can aim at words and forge the CTA before the browser lays anything
 * out. Units: the scene's viewBox (400 = the panel width = 100cqw).
 *
 *  Title    one line when it fits at ≥ FS_1MIN (all four locales do), else
 *           the most even 2-line split. The CLIMAX is the word that says
 *           "lead" (FR/ES "leads", EN "Lead", DE "Leadgenerierung"), else the
 *           last word; it stays in place in the line. The other words slam in
 *           ≤ 3 groups (one per laser slot) before it.
 *  Tagline  under the title, ≤ 2 lines (shrinks, then clamps) above the machine.
 *  CTA      the form's submit pill: its width follows the label, the font
 *           shrinks when the label would leave the form.
 */

export const TITLE_X = 26;
export const TITLE_Y = 24;
export const TITLE_W = 348;
export const FS0 = 36; // 9cqw
export const LINE = 0.98;
export const TLS = -0.025;
/** a one-line title smaller than this goes to two lines */
const FS_1MIN = 26;
/** two-line title block height */
const TITLE_H2 = 60;

export const TAG_FS0 = 10.4; // 2.6cqw
const TAG_FSMIN = 8.2;
export const TAG_LH = 1.32;
const TAG_GAP = 7.5;
/** the tagline ends above the machine (funnel rim glow, form top) */
const TAG_BOTTOM = 101;

export const CTA_X = 202;
export const CTA_Y = 236;
export const CTA_H = 22.4;
export const CTA_FS0 = 10.8; // 2.7cqw
export const CTA_LS = -0.01;
/** pill padding left / right, label → arrow gap, arrow box (units) */
export const CTA_PL = 11.2;
export const CTA_PR = 8.8;
export const CTA_GAP = 4.4;
export const CTA_ARROW = 9.6;
export const CTA_PAD = CTA_PL + CTA_PR + CTA_GAP + CTA_ARROW;
/** the pill stays inside the form's content column */
const CTA_MAX = 164;

/** pre-slam margin to the panel edge */
const M = 5;
/** slam transform-origin height (fraction of the line box from its top) */
export const OY = 0.42;

export type Item = {
  text: string;
  /** title line (0-based) */
  line: number;
  /** laser slot 0–2 (groups are right-aligned onto the last slots); -1 = climax */
  slot: number;
  x: number;
  y: number;
  w: number;
  cx: number;
  cy: number;
  /** pre-slam scale, horizontal stretch (×), transform-origin x from the item's left */
  s0: number;
  k: number;
  ox: number;
  climax: boolean;
};

/** a word space of the title (em, letter-spacing included) */
export const SPACE_EM = (JAKARTA_800.get(" ") ?? 0.18) + TLS;
const wEm = (s: string) => textWidth(s, JAKARTA_800, TLS);
const runEm = (ws: string[]) => ws.reduce((a, w) => a + wEm(w), 0) + SPACE_EM * Math.max(0, ws.length - 1);

/** contiguous split of `ws` into n groups with the smallest widest group */
function chunk(ws: string[], n: number): string[][] {
  let best: string[][] = [ws];
  let bw = Infinity;
  const rec = (start: number, left: number, acc: string[][]) => {
    if (left === 1) {
      const all = [...acc, ws.slice(start)];
      const w = Math.max(...all.map(runEm));
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
 * Pre-slam fit: the item starts big (scale s0, stretched k× horizontally,
 * skewed, lifted) and must stay inside the panel even for one frame: the
 * horizontal scale is capped by the panel width and the origin `ox` slides so
 * the scaled item stays between the walls; s0 is capped so its top stays
 * below the panel top (the title sits high, so the origin is high too: the
 * big word hangs down over the scene and snaps up into its line).
 */
function slamFit(x0: number, w: number, yTop: number, lh: number, sMax: number, kMax: number, skew: number, lift: number) {
  const tk = Math.tan((skew * Math.PI) / 180);
  const eL = (1 - OY) * lh * tk;
  const eR = OY * lh * tk;
  const sxMax = Math.max(1.02, (0.97 * (400 - 2 * M)) / (w + eL + eR));
  const sTop = 1 + (yTop + lift * lh - M) / (OY * lh);
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

export const SLAM_LIFT = -0.08;
export const SLAM_LIFT_L = -0.1;

export function layout(title: string, tagline: string, cta: string) {
  /* ── title: 1 line if it fits, else the most even 2-line split ── */
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (!words.length) words.push("Leads");
  let ci = words.findIndex((w) => /lead/i.test(w));
  if (ci < 0) ci = words.length - 1;

  let lines: string[][] = [words];
  let fs = Math.min(FS0, (TITLE_W - 2) / runEm(words));
  if (fs < FS_1MIN && words.length > 1) {
    let best = { lines, fs: 0 };
    for (let i = 1; i < words.length; i++) {
      const ls = [words.slice(0, i), words.slice(i)];
      const f2 = Math.min(FS0, (TITLE_W - 2) / Math.max(...ls.map(runEm)), TITLE_H2 / (2 * LINE));
      if (f2 > best.fs) best = { lines: ls, fs: f2 };
    }
    if (best.fs > fs) ({ lines, fs } = best);
  }
  const lh = LINE * fs;

  // runs of non-climax words (split by the climax), ≤ 3 slam groups in all
  type Run = { line: number; ws: string[]; before: boolean };
  const runs: Run[] = [];
  let idx = 0;
  lines.forEach((ws, line) => {
    let cur: string[] = [];
    for (const w of ws) {
      if (idx === ci) {
        if (cur.length) runs.push({ line, ws: cur, before: true });
        cur = [];
      } else cur.push(w);
      idx++;
    }
    if (cur.length) runs.push({ line, ws: cur, before: false });
  });
  const total = runs.reduce((a, r) => a + r.ws.length, 0);
  let per = runs.map((r) => r.ws.length);
  if (total > 3) {
    per = runs.map((r) => Math.max(1, Math.min(r.ws.length, Math.round((3 * r.ws.length) / total))));
    // (a title with more than 3 runs keeps one group per run: extra slots come earlier)
    while (per.reduce((a, b) => a + b, 0) > 3 && Math.max(...per) > 1) per[per.indexOf(Math.max(...per))]--;
  }
  const nG = per.reduce((a, b) => a + b, 0);

  // place every item (groups + climax) in reading order
  const out: Item[][] = lines.map(() => []);
  const groups: Item[] = [];
  let climax: Item | null = null;
  const place = (line: number, text: string, isClimax: boolean) => {
    const row = out[line];
    const prev = row[row.length - 1];
    const x = prev ? prev.x + prev.w + SPACE_EM * fs : TITLE_X;
    const y = TITLE_Y + line * lh;
    const w = wEm(text) * fs;
    const fit = isClimax ? slamFit(x, w, y, lh, 2.2, 1.25, 18, SLAM_LIFT_L) : slamFit(x, w, y, lh, 2.0, 1.3, 14, SLAM_LIFT);
    const it: Item = { text, line, slot: -1, x, y, w, cx: x + w / 2, cy: y + lh / 2, ...fit, climax: isClimax };
    row.push(it);
    return it;
  };
  let ri = 0;
  idx = 0;
  lines.forEach((ws, line) => {
    let i = 0;
    while (i < ws.length) {
      if (idx === ci) {
        climax = place(line, ws[i], true);
        i++;
        idx++;
        continue;
      }
      const run = runs[ri];
      for (const g of chunk(run.ws, per[ri])) {
        const it = place(line, g.join(" "), false);
        it.slot = 3 - nG + groups.length;
        groups.push(it);
      }
      i += run.ws.length;
      idx += run.ws.length;
      ri++;
    }
  });
  const cl = climax as unknown as Item;

  /* ── tagline: under the title, ≤ 2 lines above the machine ── */
  const tagY = TITLE_Y + lines.length * lh + TAG_GAP;
  const tw = tagline.trim().split(/\s+/).filter(Boolean);
  const room = (fsz: number) => Math.max(1, Math.min(2, Math.floor((TAG_BOTTOM - tagY) / (TAG_LH * fsz) + 1e-6)));
  let tfs = TAG_FS0;
  while (tagLines(tw, tfs, TITLE_W * 0.97) > room(tfs) && tfs > TAG_FSMIN) tfs = Math.max(TAG_FSMIN, tfs - 0.2);
  const tag = { fs: tfs, y: tagY, lines: room(tfs), clamp: tagLines(tw, tfs, TITLE_W * 0.97) > room(tfs) };

  /* ── CTA pill: its width follows the label (the forge traces the real outline) ── */
  const label = cta.trim() || "OK";
  const lem = textWidth(label, INTER_700, CTA_LS);
  const cfs = Math.min(CTA_FS0, (CTA_MAX - CTA_PAD) / Math.max(lem, 0.1));
  const ctaW = CTA_PAD + lem * cfs;

  return { fs, lh, nLines: lines.length, lines: out, groups, climax: cl, tag, label, cfs, ctaW };
}
export type Layout = ReturnType<typeof layout>;
