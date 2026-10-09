import { INTER_700, JAKARTA_800, textWidth } from "../sites-web-motion/metrics";

/**
 * Text layout of the automation scene (AutomatisationIaMotion.tsx), from the
 * measured advance widths of sites-web-motion/metrics.ts, so the lasers can aim
 * at words and trace the CTA before the browser lays anything out. Units: the
 * scene's viewBox (400 = the panel width = 100cqw).
 *
 *  Headline  the tagline, split at its first clause mark ("Plus de résultats,
 *            | moins de tâches répétitives."). The last word of the first
 *            clause is the CLIMAX ("résultats,"): its slot stays a blank until
 *            the automation delivers results. The first clause takes 1–2 lines
 *            (climax ending the last), the second 0–2; of every split, the one
 *            with the largest font wins (ties: fewer lines, then the more
 *            balanced). Words never break. ≤ 3 slam groups + the climax.
 *  Bar       the service title, shrunk to fit its slot in the editor bar.
 *  CTA       the pill width follows the label; the font shrinks when the pill
 *            would run into the results card.
 */

export const HX = 30;
export const HY = 54;
export const HW = 340;
/** headline box height: its bottom (118) stays above the graph (142) */
export const HH = 64;
export const FS_MAX = 31;
export const TLS = -0.025; // headline letter-spacing (em)
export const LINE = 1.02; // headline line-height

/** editor bar title */
export const BAR_TX = 49;
export const BAR_TW = 214;
export const BAR_FS0 = 10;

export const CTA_X = 30;
export const CTA_Y = 318;
export const CTA_H = 26;
export const CTA_FS0 = 11.2;
export const CTA_LS = -0.01;
/** pill padding left / right, label → arrow gap, arrow box (units) */
export const CTA_PL = 12;
export const CTA_PR = 9.5;
export const CTA_GAP = 4.6;
export const CTA_ARROW = 10.4;
const CTA_PAD = CTA_PL + CTA_PR + CTA_GAP + CTA_ARROW;
/** the pill stays left of the results card (x 222) */
const CTA_MAX = 184;

/** pre-slam margin to the panel edge */
const M = 5;

export type Group = {
  text: string;
  /** headline line (0-based) */
  line: number;
  /** laser slot 0–2; -1 = climax */
  slot: number;
  x: number;
  y: number;
  w: number;
  cx: number;
  cy: number;
  /** width without trailing punctuation (the climax underline) */
  uw: number;
  /** pre-slam scale, horizontal stretch (×), transform-origin x from the group's left */
  s0: number;
  k: number;
  ox: number;
};

/** a word space of the headline (em, letter-spacing included) */
export const SPACE_EM = (JAKARTA_800.get(" ") ?? 0.18) + TLS;
/** trailing punctuation is pulled in by this much (em): Plus Jakarta Sans
 *  gives "," and "." a wide left bearing that reads as a space at this size */
export const PUNCT_PULL = 0.1;
export const PUNCT = /[.,;:!?…]$/;
const wEm = (s: string) =>
  s.split(" ").reduce((a, w) => a + textWidth(w, JAKARTA_800, TLS) - (PUNCT.test(w) ? PUNCT_PULL : 0), 0) +
  SPACE_EM * (s.split(" ").length - 1);
const lineEm = (ws: string[]) => ws.reduce((a, w) => a + wEm(w), 0) + SPACE_EM * Math.max(0, ws.length - 1);

/** contiguous split of `ws` into n groups with the smallest widest group */
function chunk(ws: string[], n: number): string[][] {
  if (n <= 1 || ws.length < 2) return [ws];
  let best: string[][] = [ws];
  let bw = Infinity;
  for (let i = 1; i < ws.length; i++) {
    const all = [ws.slice(0, i), ws.slice(i)];
    const w = Math.max(...all.map(lineEm));
    if (w < bw) {
      bw = w;
      best = all;
    }
  }
  return best;
}

/**
 * Pre-slam fit: the group starts big (scale s0 · stretch k horizontally,
 * skewed) and must stay inside the panel even for one frame: the horizontal
 * scale is capped by the panel width, the transform origin `ox` moves so the
 * scaled group stays between the walls, s0 is capped so the lifted group stays
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

export function layout(title: string, tagline: string, cta: string) {
  /* ── headline ── */
  const words = tagline.trim().split(/\s+/).filter(Boolean);
  if (!words.length) words.push("AI");
  let cut = words.findIndex((w, i) => i < words.length - 1 && /[,;:]$/.test(w));
  if (cut < 0) cut = Math.max(0, Math.ceil(words.length / 2) - 1);
  const pre = words.slice(0, cut);
  const climaxText = words[cut];
  const rest = words.slice(cut + 1);
  const c1: string[][][] = [[[...pre, climaxText]]];
  if (pre.length) c1.push([pre, [climaxText]]);
  const c2: string[][][] = [rest.length ? [rest] : []];
  for (let i = 1; i < rest.length; i++) c2.push([rest.slice(0, i), rest.slice(i)]);
  type Cand = { lines: string[][]; n1: number; fs: number; rag: number };
  let best: Cand | null = null;
  for (const a of c1)
    for (const b of c2) {
      const lines = [...a, ...b];
      if (lines.length > 3) continue;
      const ems = lines.map(lineEm);
      const fs = Math.min(FS_MAX, (HW - 2) / Math.max(...ems, 0.1), HH / (lines.length * LINE));
      const rag = b.length > 1 ? Math.abs(lineEm(b[0]) - lineEm(b[1])) : 0;
      const better =
        !best ||
        fs > best.fs + 0.05 ||
        (Math.abs(fs - best.fs) <= 0.05 && (lines.length < best.lines.length || (lines.length === best.lines.length && rag < best.rag)));
      if (better) best = { lines, n1: a.length, fs, rag };
    }
  const B = best as Cand;
  const fs = B.fs;
  const lh = LINE * fs;
  const groups: Group[] = [];
  const mk = (text: string, line: number, x: number, w: number, slot: number, big: boolean): Group => {
    const y = HY + line * lh;
    return {
      text,
      line,
      slot,
      x,
      y,
      w,
      cx: x + w / 2,
      cy: y + lh / 2,
      uw: PUNCT.test(text) ? wEm(text.replace(PUNCT, "")) * fs : w,
      ...(big ? slamFit(x, w, y, lh, 2.3, 1.25, 18, -0.3) : slamFit(x, w, y, lh, 2.1, 1.3, 14, -0.22)),
    };
  };
  let climax: Group | null = null;
  const n2 = B.lines.length - B.n1;
  B.lines.forEach((ws, line) => {
    let x = HX;
    if (line < B.n1) {
      const last = line === B.n1 - 1;
      const pw = last ? ws.slice(0, -1) : ws;
      if (pw.length) {
        const w = lineEm(pw) * fs;
        groups.push(mk(pw.join(" "), line, x, w, groups.length, false));
        x += w + SPACE_EM * fs;
      }
      if (last) climax = mk(climaxText, line, x, wEm(climaxText) * fs, -1, true);
    } else {
      const n = n2 === 1 && ws.length > 1 && groups.length < 2 ? 2 : 1;
      for (const g of chunk(ws, n)) {
        const w = lineEm(g) * fs;
        groups.push(mk(g.join(" "), line, x, w, groups.length, false));
        x += w + SPACE_EM * fs;
      }
    }
  });
  // (≤ 3 slam groups by construction: one for the words before the climax,
  // two for the second clause at most)

  /* ── bar title ── */
  const tText = title.trim() || "AI";
  const tem = textWidth(tText, INTER_700, -0.005);
  const tfs = Math.min(BAR_FS0, BAR_TW / Math.max(tem, 0.1));

  /* ── CTA pill: its width follows the label (the forge traces the real outline) ── */
  const label = cta.trim() || "OK";
  const lem = textWidth(label, INTER_700, CTA_LS);
  const cfs = Math.min(CTA_FS0, (CTA_MAX - CTA_PAD) / Math.max(lem, 0.1));
  const ctaW = CTA_PAD + lem * cfs;

  return { fs, lh, nLines: B.lines.length, groups, climax: climax as unknown as Group, tText, tfs, label, cfs, ctaW };
}
export type Layout = ReturnType<typeof layout>;
