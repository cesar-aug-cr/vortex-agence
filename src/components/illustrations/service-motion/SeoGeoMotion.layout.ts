import { INTER_500, JAKARTA_800, textWidth } from "../sites-web-motion/metrics";

/**
 * Text layout of the SEO & GEO scene (SeoGeoMotion.tsx), from measured advance
 * widths, so the lasers can aim at words before the browser lays anything out.
 * Units: the scene's viewBox (400 = the panel width = 100cqw).
 *
 *  Headline  the tagline in two beats ("Visible sur Google." / "Cité par les
 *            IA."): split after the first sentence (else balanced by width).
 *            Beat 1 slams in ≤ 3 word groups, beat 2 is ONE climax group. The
 *            font fits the band width and height; words never break.
 *  Query     the service title, typed in the search pill (JetBrains Mono, one
 *            0.6 em step per character); the font shrinks to fit the pill.
 *  Answer    the bullets (first 4) as the AI answer: ≤ 2 lines each at the
 *            largest font that allows it, a last-resort 2-line clamp.
 */

/* ── headline band ── */
export const HX = 28;
export const HW = 344;
const HY0 = 14;
const HY1 = 98;
const FS_MAX = 34; // 8.5cqw
export const TLS = -0.025; // letter-spacing (em)
export const LINE = 1;
export const SPACE_EM = (JAKARTA_800.get(" ") ?? 0.18) + TLS;

/* ── search pill (final SERP position) ── */
export const PX = 34;
export const PY = 113;
export const PW = 208;
export const PH = 18;
/** query text: left edge (units) and the room it has before the pill's right icon */
export const QX = PX + 17;
const QW = PW - 17 - 22;
const QF0 = 7.4;
export const MONO_ADV = 0.6;

/* ── AI card ── */
export const AX = 212;
export const AY = 144;
export const AW = 166;
export const AH = 236;
/** answer column: bullet text width (units) */
const BW = AW - 24 - 9 - 2;
const BF0 = 8.8;
const BF_MIN = 6.2;
/** citation marker after each bullet (em of the bullet font) */
const MARK_EM = 1.6;

/** pre-slam margin to the panel edge */
const M = 5;

export type Group = {
  text: string;
  /** 0 = beat 1, 1 = beat 2 (climax) */
  line: number;
  /** laser slot 0–2 for beat 1 (right-aligned onto the last slots); -1 = climax */
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

/** a trailing period / mark is pulled in by PUNCT_PULL em (Jakarta's period sits loose after a letter) */
export const PUNCT_PULL = 0.07;
export const PUNCT = /[.!?…,;:]$/u;
const wEm = (s: string) => textWidth(s, JAKARTA_800, TLS) - (PUNCT.test(s) ? PUNCT_PULL : 0);
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
 * Pre-slam fit (as the Sites web scene): the group starts big (scale s0 ·
 * stretch k horizontally, skewed) and stays inside the panel even for one
 * frame: the horizontal scale is capped by the panel width, the transform
 * origin `ox` keeps the scaled group between the walls, s0 keeps the lifted
 * group below the panel top.
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

/** the tagline's two beats */
function beats(tagline: string): [string[], string[]] {
  const t = tagline.trim().replace(/\s+/g, " ");
  const m = /^(.+?[.!?…;:])\s+(.+)$/u.exec(t);
  if (m) return [m[1].split(" "), m[2].split(" ")];
  const ws = t ? t.split(" ") : ["GEO"];
  if (ws.length < 2) return [[], ws];
  let best = 1;
  let bw = Infinity;
  for (let i = 1; i < ws.length; i++) {
    const w = Math.max(lineEm(ws.slice(0, i)), lineEm(ws.slice(i)));
    if (w < bw) {
      bw = w;
      best = i;
    }
  }
  return [ws.slice(0, best), ws.slice(best)];
}

/** greedy line count at font fs (units) in width w; `tail` em is kept on the last line */
function wrapLines(s: string, fs: number, w: number, tail = 0): number {
  const words = s.trim().split(/\s+/).filter(Boolean);
  const sp = (INTER_500.get(" ") ?? 0.223) * fs;
  let n = 1;
  let x = -1;
  words.forEach((word, i) => {
    const ww = (textWidth(word, INTER_500) + (i === words.length - 1 ? tail : 0)) * fs;
    if (x < 0) x = ww;
    else if (x + sp + ww <= w) x += sp + ww;
    else {
      n++;
      x = ww;
    }
  });
  return n;
}

export function layout(title: string, tagline: string, bullets: readonly string[]) {
  /* ── headline: two beats ── */
  const [w1, w2] = beats(tagline);
  const fs = Math.min(FS_MAX, (HW - 2) / Math.max(lineEm(w1), lineEm(w2), 0.1), (HY1 - HY0) / (2 * LINE) - 0.5);
  const lh = LINE * fs;
  const top = HY0 + (HY1 - HY0 - 2 * lh) / 2;
  const groups: Group[] = [];
  {
    let x = HX;
    const parts = w1.length ? chunk(w1, Math.min(3, w1.length)) : [];
    parts.forEach((g, i) => {
      const w = lineEm(g) * fs;
      const slot = 3 - parts.length + i;
      groups.push({ text: g.join(" "), line: 0, slot, x, y: top, w, cx: x + w / 2, cy: top + lh / 2, ...slamFit(x, w, top, lh, 1.9, 1.4, 14, -0.1) });
      x += w + SPACE_EM * fs;
    });
  }
  const cw = lineEm(w2) * fs;
  const cy0 = top + lh;
  const climax: Group = {
    text: w2.join(" "),
    line: 1,
    slot: -1,
    x: HX,
    y: cy0,
    w: cw,
    cx: HX + cw / 2,
    cy: cy0 + lh / 2,
    ...slamFit(HX, cw, cy0, lh, 2.3, 1.25, 18, -0.3),
  };

  /* ── query typed in the pill ── */
  const query = [...(title.trim() || "SEO")];
  const qf = Math.min(QF0, QW / Math.max(1, query.length * MONO_ADV));

  /* ── AI answer: ≤ 2 lines per bullet ── */
  const items = bullets.slice(0, 4).map((b) => b.trim()).filter(Boolean);
  let bf = BF0;
  while (bf > BF_MIN && items.some((b) => wrapLines(b, bf, BW, MARK_EM) > 2)) bf = Math.max(BF_MIN, bf - 0.2);
  const clamp = items.some((b) => wrapLines(b, bf, BW, MARK_EM) > 2);
  const lines = items.map((b) => Math.min(2, wrapLines(b, bf, BW, MARK_EM)));

  return { fs, lh, top, groups, climax, query: query.join(""), qn: query.length, qf, items, bf, clamp, lines };
}
export type Layout = ReturnType<typeof layout>;
