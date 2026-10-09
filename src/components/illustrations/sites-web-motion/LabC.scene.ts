/**
 * Variant C — "Laser Drones": layout + choreography + generated CSS.
 * See the storyboard at the top of LabC.tsx. All times are ms within T.
 */
import {
  T,
  type P,
  type Stop,
  type Key,
  type Sample,
  EASE,
  fmt,
  keyframes,
  buildPath,
  axisStops,
  simplify,
  Path,
  Geo,
  roundRect,
  lerp,
  clamp01,
  wrap,
  cssEase,
} from "./LabC.engine";

export { T };

export const COL = {
  lime: "#c8f02e",
  cyan: "#14e0c8",
  green: "#22d38c",
  blue: "#2e66ff",
  white: "#f2f3ee",
} as const;
export type ColName = "lime" | "cyan" | "green" | "blue";

/* ------------------------------------------------------------------ */
/* Text metrics (advance widths in em/1000, measured in Chrome with the */
/* site's own next/font files) — used to lay out localized strings.    */
/* ------------------------------------------------------------------ */
const GLYPHS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ,.'’-–—!?:;%+&/()éèêàâçäöüßñáíóú";
// prettier-ignore
const JAK800 = [700,413,596,612,662,614,604,564,633,604,583,673,611,673,611,410,648,599,260,260,586,260,929,599,651,673,673,386,515,421,599,582,912,582,602,492,732,690,772,739,589,587,804,732,287,396,687,547,912,742,878,649,878,667,647,552,724,712,1032,682,672,567,180,386,408,333,386,634,684,1014,400,611,408,428,1070,678,813,532,407,407,611,611,611,583,583,611,583,651,599,654,599,583,238,651,599];
// prettier-ignore
const IT400 = [578,355,559,590,595,556,568,516,566,568,518,562,515,562,533,314,563,545,190,190,497,190,823,539,550,562,562,325,476,316,534,510,766,493,510,494,629,604,681,672,551,540,696,693,217,495,605,516,846,707,715,588,715,593,591,595,694,629,909,595,618,578,234,251,237,249,249,412,500,1000,250,460,237,251,766,612,593,310,314,314,533,533,533,518,518,515,518,550,534,563,539,518,190,550,534];
// prettier-ignore
const IT600 = [630,385,585,614,628,594,609,540,610,609,540,586,541,586,553,341,587,577,223,223,531,223,862,574,570,586,586,359,511,343,571,539,800,525,539,525,686,620,707,687,570,548,717,706,237,523,640,528,871,704,737,606,738,613,611,622,696,686,972,652,668,615,211,297,282,289,298,428,500,1000,292,507,282,293,806,635,625,341,334,334,553,553,553,540,540,541,540,570,571,605,574,540,223,570,571];

const glyphEm = (ch: string, table: readonly number[]): number => {
  let i = GLYPHS.indexOf(ch);
  if (i < 0) i = GLYPHS.indexOf(ch.normalize("NFD")[0] ?? "");
  return i >= 0 ? table[i] / 1000 : 0.62;
};
const textEm = (s: string, table: readonly number[]): number =>
  Array.from(s).reduce((a, ch) => a + glyphEm(ch, table), 0);

/* ------------------------------------------------------------------ */
/* Layout (viewBox units, 400×400; 1 unit = 0.25cqw)                    */
/* ------------------------------------------------------------------ */
export const WIN = { x0: 24, y0: 40, x1: 376, y1: 360, r: 14 };
export const DIV_Y = 66;
export const DOTS = [40, 52, 64];
export const DOT_Y = 53;
export const URL = { x: 84, y: 47, w: 196, h: 12 };
export const URL_TXT = { x: 92, fs: 9.6 };
export const LIVE = { x: 316, y: 46.5, w: 48, h: 13 };
export const LOGO = { gx: 40, gy: 75.5, g: 9, tx: 54, cy: 80, fs: 13 };
export const NAVP = [212, 244, 276];
export const NAVP_W = 22;
export const NAVCTA = { x: 314, y: 73, w: 46, h: 14 };
export const EYE = { x: 40, y: 101, h: 12, fs: 7.6 };
export const HEAD = { x: 40, y: 120, boxW: 300, fsMax: 36, lh: 1.02, ls: -0.02 };
export const TAG = { x: 40, y: 199, w: 284, fs: 11, lh: 1.36 };
export const CTA = { x: 40, y: 242, h: 28, fsMax: 12.4, maxW: 206 };
export const CARD_Y0 = 283;
export const CARD_Y1 = 349;
export const CARDS = [
  { x0: 40, x1: 141.3 },
  { x0: 149.3, x1: 250.7 },
  { x0: 258.7, x1: 360 },
];
export const RING = { cx: 66, cy: 316, r: 12 };
export const BARS = { x0: 202, w: 7, gap: 4, base: 338, h: [10, 16, 22, 31] };
export const CHART: P[] = [
  { x: 268, y: 337 },
  { x: 284, y: 330 },
  { x: 298, y: 333 },
  { x: 313, y: 320 },
  { x: 327, y: 324 },
  { x: 350, y: 303 },
];

/* ------------------------------------------------------------------ */
/* Timeline (ms)                                                       */
/* ------------------------------------------------------------------ */
const TL = {
  frame: [650, 1850],
  divider: [1450, 1850],
  power: 1850,
  dots: [[1900, 1940], [1990, 2030], [2080, 2120]] as [number, number][],
  pill: [2040, 2300],
  type: [2300, 2580],
  guides: [2300, 2700],
  guidesOut: 8700,
  logoZap: [2640, 2690],
  logoType: [2720, 2900],
  nav: [[2950, 2995], [3025, 3070], [3100, 3145], [3175, 3220]] as [number, number][],
  eyeZap: [3100, 3180],
  line1: [3350, 4150],
  line2: [4150, 4750],
  underline: [4880, 5240],
  wave: 5200,
  elastic: 5520,
  tag: [5150, 5850],
  ctaOutline: [5950, 6400],
  ctaFill: 6400,
  ctaWords: 6620,
  ctaArrow: 6880,
  playZap: [6620, 6720],
  ctaGlow: 6950,
  cardOutline: [7000, 7500],
  cardFill: [7500, 7570, 7640],
  ring: [7650, 8150],
  bars: [[7700, 7750], [7780, 7830], [7860, 7910], [7940, 7990]] as [number, number][],
  chart: [7750, 8300],
  liveZap: [8800, 8900],
  live: 8850,
  barDone: 8650,
  webPay: [9150, 9750],
  tiltIn: [9400, 10150],
  cursorIn: [9850, 10560],
  click: 10600,
  tiltOut: [11100, 11800],
  curtain: [11900, 13900],
  reset: 14150,
  webForm: [14450, 15250],
};

/** curtain height at time t (rises from the bottom edge to the top) */
const CUR_Y0 = 374;
const CUR_Y1 = 28;
/** ease of every laser-drawn stroke (dashoffset) AND of the tip that draws it */
const DRAW = cssEase(0.42, 0, 0.58, 1);

const curtainY = (t: number) =>
  lerp(CUR_Y0, CUR_Y1, clamp01((t - TL.curtain[0]) / (TL.curtain[1] - TL.curtain[0])));
/** when the rising curtain passes height y */
const exitAt = (y: number) =>
  TL.curtain[0] + ((CUR_Y0 - y) / (CUR_Y0 - CUR_Y1)) * (TL.curtain[1] - TL.curtain[0]);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const px = (v: number) => `${fmt(v, 1)}px`;
export const cq = (u: number) => `${fmt(u / 4, 3)}cqw`;

const hash = (s: string): string => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36).slice(0, 4);
};

/** negative animation-delay (ms) that moves a shared keyframe event from `ref` to `t` */
const delayFor = (t: number, ref: number) => {
  const d = wrap(t - ref);
  return d === 0 ? 0 : d - T;
};

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */
export type Letter = { ch: string; dp: number; dw: number };
export type DroneSpec = { id: number; col: ColName };

export type Scene = {
  rootClass: string;
  css: string;
  ids: { g: (c: ColName) => string; b: (c: ColName) => string; grid: string; area: string; barG: string };
  head: { fs: number; lines: { words: Letter[][] }[]; w2: number };
  tag: { words: { text: string; d: number }[] };
  url: { d: number[]; text: string };
  logo: { d: number[]; text: string };
  cta: { w: number; fs: number; words: { text: string; d: number }[]; playX: number };
  paths: Record<string, { d: string; len: number }>;
  drones: DroneSpec[];
  sparkAngles: number[];
  burst: number[];
};

const DRONES: DroneSpec[] = [
  { id: 0, col: "lime" },
  { id: 1, col: "cyan" },
  { id: 2, col: "green" },
  { id: 3, col: "blue" },
  { id: 4, col: "lime" },
  { id: 5, col: "cyan" },
];

/** a firing window; `lin` = straight eased stroke (impact emitted exactly as 2 eased stops) */
type Fire = { t0: number; t1: number; at: (t: number) => P; thick?: number; lin?: [P, P] };

const cache = new Map<string, Scene>();

export function buildScene(title: string, tagline: string, cta: string): Scene {
  const key = `${title}\u0000${tagline}\u0000${cta}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const sc = makeScene(title, tagline, cta);
  cache.set(key, sc);
  return sc;
}

function makeScene(title: string, tagline: string, ctaLabel: string): Scene {
  const H = hash(`c3|${title}|${tagline}|${ctaLabel}`);
  const R = `swc-${H}`;
  const N = (id: string) => `swc-${id}-${H}`;
  const kfs: string[] = [];
  const rules: string[] = [];
  /** registers keyframes + an animation rule for `.swc-<cls>` */
  const anim = (cls: string, tracks: Stop[][], extra = "") => {
    const names = tracks.map((stops, i) => {
      const n = N(`${cls}${i ? `-${i}` : ""}`);
      kfs.push(keyframes(n, stops));
      return n;
    });
    rules.push(`.${R} .swc-${cls}{animation-name:${names.join(",")}${extra ? `;${extra}` : ""}}`);
  };

  /* ---------------- headline layout ---------------- */
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lineTexts =
    words.length > 1 ? [words.slice(0, -1).join(" "), words[words.length - 1]] : [words[0] ?? ""];
  const lineEm = (s: string) => textEm(s, JAK800) + HEAD.ls * Array.from(s).length;
  const fs = Math.min(HEAD.fsMax, HEAD.boxW / Math.max(...lineTexts.map(lineEm), 1));
  const lineW = lineTexts.map((s) => lineEm(s) * fs);
  const lineTop = (i: number) => HEAD.y + i * fs * HEAD.lh;
  const lineMid = (i: number) => lineTop(i) + fs * HEAD.lh * 0.56;
  const twoLines = lineTexts.length > 1;
  const L1 = 0;
  const L2 = twoLines ? 1 : 0;
  const w1 = lineW[L1];
  const w2 = lineW[L2];
  const printWin = [TL.line1, TL.line2];
  let gi = 0;
  const headLines = lineTexts.map((text, li) => {
    const win = twoLines ? printWin[li] : [TL.line1[0], TL.line2[1]];
    let acc = 0;
    const ws = text.split(" ").map((w) => {
      const letters = Array.from(w).map((ch) => {
        const e = glyphEm(ch, JAK800) + HEAD.ls;
        const cx = (acc + e / 2) * fs;
        acc += e;
        const tPrint = lerp(win[0], win[1], clamp01(cx / lineW[li]));
        const tWave = TL.wave + gi * 26;
        gi++;
        return { ch, dp: delayFor(tPrint, TL.line1[0]), dw: delayFor(tWave, TL.wave) };
      });
      acc += glyphEm(" ", JAK800) + HEAD.ls;
      return letters;
    });
    return { words: ws };
  });

  /* ---------------- tagline layout (greedy wrap simulation) ---------------- */
  const tagFs = TAG.fs;
  const spaceW = glyphEm(" ", IT400) * tagFs;
  const tagWords = tagline.trim().split(/\s+/).filter(Boolean);
  const placed: { text: string; x: number; line: number }[] = [];
  {
    let x = 0;
    let line = 0;
    for (const w of tagWords) {
      const ww = textEm(w, IT400) * tagFs;
      if (x > 0 && x + ww > TAG.w) {
        line++;
        x = 0;
      }
      placed.push({ text: w, x: x + ww / 2, line });
      x += ww + spaceW;
    }
  }
  const visible = placed.filter((p) => p.line < 2);
  const sweepW = Math.max(60, ...visible.map((p) => p.x + 12));
  const tagT = (x: number) => lerp(TL.tag[0], TL.tag[1], clamp01(x / sweepW));
  const tagOut = placed.map((p) => ({ text: p.text, d: delayFor(tagT(p.x), TL.tag[0]) }));

  /* ---------------- URL / logo typing ---------------- */
  const urlText = "vortx.lu";
  const urlD = Array.from({ length: urlText.length + 1 }, (_, k) =>
    delayFor(TL.type[0] + k * 30, TL.type[0])
  );
  const urlW = 9 + urlText.length * 0.6 * URL_TXT.fs; // lock + mono text
  const logoText = "VorTX";
  const logoD = Array.from(logoText, (_, k) => delayFor(TL.logoType[0] + k * 40, TL.type[0]));
  const logoW = textEm(logoText, JAK800) * LOGO.fs;

  /* ---------------- CTA layout ---------------- */
  const ctaEm = textEm(ctaLabel, IT600);
  const ctaFs = Math.min(CTA.fsMax, (CTA.maxW - 40) / Math.max(ctaEm, 1));
  const ctaW = Math.round(ctaEm * ctaFs + 44);
  const ctaX1 = CTA.x + ctaW;
  const ctaMid = CTA.y + CTA.h / 2;
  const playX = ctaX1 + 22;
  const ctaWords = ctaLabel
    .trim()
    .split(/\s+/)
    .map((text, k) => ({ text, d: delayFor(TL.ctaWords + k * 70, TL.ctaWords) }));

  /* ---------------- geometry ---------------- */
  const { x0, y0, x1, y1, r } = WIN;
  const frameA = new Geo({ x: 0, y: 0 })
    .arc(x0 + r, y0 + r, r, 225, 270)
    .line(x1 - r, y0)
    .arc(x1 - r, y0 + r, r, 270, 360)
    .line(x1, y1 - r)
    .arc(x1 - r, y1 - r, r, 0, 45);
  const frameB = new Geo({ x: 0, y: 0 })
    .arc(x1 - r, y1 - r, r, 45, 90)
    .line(x0 + r, y1)
    .arc(x0 + r, y1 - r, r, 90, 180)
    .line(x0, y0 + r)
    .arc(x0 + r, y0 + r, r, 180, 225);
  const divider = new Geo({ x: x1, y: DIV_Y }).line(x0, DIV_Y);
  const gV1 = new Geo({ x: 40, y: DIV_Y }).line(40, y1);
  const gV2 = new Geo({ x: 360, y: y1 }).line(360, DIV_Y);
  const gH1 = new Geo({ x: x0, y: HEAD.y }).line(x1, HEAD.y);
  const cr = CTA.h / 2;
  const ctaTop = new Geo({ x: 0, y: 0 })
    .arc(CTA.x + cr, ctaMid, cr, 180, 270)
    .line(ctaX1 - cr, CTA.y)
    .arc(ctaX1 - cr, ctaMid, cr, 270, 360);
  const ctaBot = new Geo({ x: 0, y: 0 })
    .arc(CTA.x + cr, ctaMid, cr, 180, 90)
    .line(ctaX1 - cr, CTA.y + CTA.h)
    .arc(ctaX1 - cr, ctaMid, cr, 90, 0);
  const cardGeo = CARDS.map((c) => roundRect(c.x0, CARD_Y0, c.x1, CARD_Y1, 8));
  const ringGeo = new Geo({ x: 0, y: 0 })
    .arc(RING.cx, RING.cy, RING.r, -90, 90)
    .arc(RING.cx, RING.cy, RING.r, 90, 270);
  const chartGeo = CHART.slice(1).reduce((g, p) => g.line(p.x, p.y), new Geo(CHART[0]));

  /** tip of a geometry drawn at constant speed during [a, b] */
  const tip = (g: Geo, a: number, b: number) => (t: number) => g.at(DRAW.f(clamp01((t - a) / (b - a))) * g.len);
  /** constant-speed tip (polylines: exact keyframes at the corners) */
  const tipLin = (g: Geo, a: number, b: number) => (t: number) => g.at(clamp01((t - a) / (b - a)) * g.len);
  const tangent = (g: Geo, s: number): P => {
    const p = g.at(s - 0.6);
    const q = g.at(s + 0.6);
    const l = Math.hypot(q.x - p.x, q.y - p.y) || 1;
    return { x: (q.x - p.x) / l, y: (q.y - p.y) / l };
  };
  /** a drone flying beside a stroke being drawn (outward normal `out`, `lag` behind) */
  const beside = (g: Geo, a: number, b: number, out: number, lag: number, k = 1) => (t: number) => {
    const s = (0.5 + k * (DRAW.f(clamp01((t - a) / (b - a))) - 0.5)) * g.len;
    const p = g.at(s);
    const tg = tangent(g, s);
    return { x: p.x + tg.y * out - tg.x * lag, y: p.y - tg.x * out - tg.y * lag };
  };

  /* formation (loop start/end) and payoff ring */
  const form = (slot: number) => (t: number): P => {
    const a = ((-90 + slot * 60 + 0.026 * t) * Math.PI) / 180;
    const rr = 108 + 5 * Math.sin(t / 170);
    return { x: 200 + rr * Math.cos(a), y: 206 + rr * 0.94 * Math.sin(a) };
  };
  // payoff: drones hold the corners / mid-sides just outside the window (the laser web
  // becomes a glowing frame around the site), then orbit the perimeter while it tilts
  const perim = roundRect(10, 24, 390, 376, 20);
  const SLOT_S = [170, 355.7, 699.1, 884.8, 1070.5, 1413.9];
  const ring = (slot: number) => (t: number): P => {
    const d = Math.max(0, t - TL.webPay[1]);
    const run = d < 300 ? (d * d) / 600 : d - 150; // eased start, then constant speed
    return perim.at((SLOT_S[slot] + 0.075 * run) % perim.len);
  };
  /** hover = slow linear drift across c (alive but cheap: one exact segment) */
  const hv = (win: [number, number], c: P, ax = 5, ay = 3, ph = 0): Key => {
    const sx = ph % 2 ? -1 : 1;
    return {
      fn: win,
      f: (t: number): P => {
        const u = (t - win[0]) / (win[1] - win[0]);
        return { x: c.x + sx * ax * (u - 0.5), y: c.y + ay * (0.5 - u) };
      },
    };
  };
  const FORM: [number, number] = [-700, 260];
  const RINGW: [number, number] = [9150, 10900];

  /* print sweeps */
  const l1y = lineMid(L1);
  const l2y = lineMid(L2);
  const printX1 = (t: number) => HEAD.x + w1 * clamp01((t - TL.line1[0]) / (TL.line1[1] - TL.line1[0]));
  const printX2 = (t: number) => HEAD.x + w2 * clamp01((t - TL.line2[0]) / (TL.line2[1] - TL.line2[0]));
  const ulY = lineTop(L2) + fs * HEAD.lh * 0.93;
  const ulX = (t: number) => HEAD.x + w2 * (1 - DRAW.f(clamp01((t - TL.underline[0]) / (TL.underline[1] - TL.underline[0]))));
  const tagY = [TAG.y + TAG.fs * TAG.lh * 0.55, TAG.y + TAG.fs * TAG.lh * 1.55];
  const tagX = (t: number) => TAG.x + sweepW * clamp01((t - TL.tag[0]) / (TL.tag[1] - TL.tag[0]));
  const tagTarget = (t: number): P => {
    const ph = ((t - TL.tag[0]) / 90) % 2;
    const u = ph < 1 ? ph : 2 - ph;
    return { x: tagX(t), y: lerp(tagY[0], tagY[1], u) };
  };
  const urlX = (t: number) => URL_TXT.x + urlW * clamp01((t - TL.type[0]) / (TL.type[1] - TL.type[0]));
  const pillX = (t: number) => URL.x + URL.w * DRAW.f(clamp01((t - TL.pill[0]) / (TL.pill[1] - TL.pill[0])));
  const logoX = (t: number) => LOGO.tx + logoW * clamp01((t - TL.logoType[0]) / (TL.logoType[1] - TL.logoType[0]));

  // frame drones fly an inset, rounder copy of the frame (inside the empty canvas), a little behind the tips
  const insetHalves = (d: number, rr: number): [Geo, Geo] => {
    const X0 = x0 + d;
    const Y0 = y0 + d;
    const X1 = x1 - d;
    const Y1 = y1 - d;
    return [
      new Geo({ x: 0, y: 0 }).arc(X0 + rr, Y0 + rr, rr, 225, 270).line(X1 - rr, Y0).arc(X1 - rr, Y0 + rr, rr, 270, 360).line(X1, Y1 - rr).arc(X1 - rr, Y1 - rr, rr, 0, 45),
      new Geo({ x: 0, y: 0 }).arc(X1 - rr, Y1 - rr, rr, 45, 90).line(X0 + rr, Y1).arc(X0 + rr, Y1 - rr, rr, 90, 180).line(X0, Y0 + rr).arc(X0 + rr, Y0 + rr, rr, 180, 225),
    ];
  };
  const [inA, inB] = insetHalves(42, 34);
  const trailOn = (g: Geo, lagU: number) => (t: number) =>
    g.at(clamp01(DRAW.f(clamp01((t - TL.frame[0]) / (TL.frame[1] - TL.frame[0]))) - lagU) * g.len);
  const fA = trailOn(inA, 0.07);
  const fB = trailOn(inB, 0.07);
  const cardHover = (i: number, win: [number, number]) => hv(win, { x: (CARDS[i].x0 + CARDS[i].x1) / 2 + (i - 1) * 4, y: 383 }, 6, 2.5, i);

  /* ---------------- drone choreography ---------------- */
  const keys: Key[][] = [
    // D0 lime — logo, eyebrow, headline line 1, CTA top half
    [
      { fn: FORM, f: form(0) },
      { at: 700, p: { x: 160, y: 236 } },
      { at: 1150, p: { x: 278, y: 300 } },
      { at: 1650, p: { x: 318, y: 186 } },
      { at: 2000, p: { x: 236, y: 262 } },
      { at: 2300, p: { x: 130, y: 196 } },
      hv([2620, 2900], { x: 30, y: 140 }, 1.5, 2),
      hv([3080, 3200], { x: 110, y: 150 }, 1.5, 1.5),
      { fn: [TL.line1[0], TL.line1[1]], f: (t) => ({ x: printX1(t) + 38, y: lineTop(L1) - 22 }) },
      { at: 4500, p: { x: 366, y: 68 } },
      { at: 4950, p: { x: 382, y: 232 } },
      { at: 5300, p: { x: 330, y: 360 } },
      { at: 5650, p: { x: 150, y: 330 } },
      { fn: [TL.ctaOutline[0], TL.ctaOutline[1]], f: (t) => ({ x: tip(ctaTop, TL.ctaOutline[0], TL.ctaOutline[1])(t).x + 26, y: CTA.y - 22 }) },
      { at: 6800, p: { x: 300, y: 200 } },
      { at: 7300, p: { x: 382, y: 110 } },
      { at: 7900, p: { x: 250, y: 22 } },
      { at: 8500, p: { x: 92, y: 40 } },
      { fn: RINGW, f: ring(5) },
      { at: 11400, p: { x: 150, y: 24 } },
      { at: 12300, p: { x: 250, y: 14 } },
      { at: 13300, p: { x: 140, y: 18 } },
    ],
    // D1 cyan — frame half A, guide V2, card 1 + ring, the curtain
    [
      { fn: FORM, f: form(5) },
      { fn: [TL.frame[0], TL.frame[1]], f: fA },
      { fn: [TL.guides[0], TL.guides[1]], f: beside(gV2, TL.guides[0], TL.guides[1], 50, 30, 0.45) },
      { at: 3050, p: { x: 392, y: 30 } },
      { at: 3700, p: { x: 394, y: 210 } },
      { at: 4400, p: { x: 330, y: 388 } },
      { at: 5200, p: { x: 180, y: 392 } },
      { at: 6200, p: { x: 60, y: 392 } },
      cardHover(0, [6900, 8250]),
      { fn: RINGW, f: ring(4) },
      { at: 11450, p: { x: 22, y: 330 } },
      { fn: [TL.curtain[0], TL.curtain[1]], f: (t) => ({ x: 6, y: curtainY(t) }) },
    ],
    // D2 green — frame half B, guide V1, card 2 + bars, LIVE
    [
      { fn: FORM, f: form(2) },
      { fn: [TL.frame[0], TL.frame[1]], f: fB },
      { fn: [TL.guides[0], TL.guides[1]], f: beside(gV1, TL.guides[0], TL.guides[1], 46, 30, 0.45) },
      { at: 3100, p: { x: 70, y: 388 } },
      { at: 3600, p: { x: 210, y: 382 } },
      { at: 4100, p: { x: 340, y: 322 } },
      { at: 4600, p: { x: 388, y: 210 } },
      { at: 5200, p: { x: 362, y: 80 } },
      { at: 5800, p: { x: 250, y: 18 } },
      { at: 6400, p: { x: 372, y: 250 } },
      { at: 6750, p: { x: 280, y: 380 } },
      cardHover(1, [6900, 8050]),
      { at: 8550, p: { x: 330, y: 250 } },
      { fn: RINGW, f: ring(1) },
      { at: 11500, p: { x: 250, y: 20 } },
      { at: 12400, p: { x: 120, y: 16 } },
      { at: 13300, p: { x: 300, y: 40 } },
    ],
    // D3 blue — chrome divider, guide H1, CTA bottom half, play button, curtain receiver
    [
      { fn: FORM, f: form(1) },
      { at: 800, p: { x: 372, y: 232 } },
      { fn: [TL.divider[0], TL.divider[1]], f: beside(divider, TL.divider[0], TL.divider[1], 50, 30, 0.5) },
      { fn: [TL.guides[0], TL.guides[1]], f: beside(gH1, TL.guides[0], TL.guides[1], -56, 20, 0.45) },
      { at: 3150, p: { x: 392, y: 196 } },
      { at: 3700, p: { x: 352, y: 340 } },
      { at: 4300, p: { x: 220, y: 390 } },
      { at: 4900, p: { x: 92, y: 342 } },
      { at: 5500, p: { x: 20, y: 300 } },
      { fn: [TL.ctaOutline[0], TL.ctaOutline[1]], f: (t) => ({ x: tip(ctaBot, TL.ctaOutline[0], TL.ctaOutline[1])(t).x + 26, y: CTA.y + CTA.h + 26 }) },
      hv([6560, 6780], { x: playX + 24, y: ctaMid + 34 }, 1, 1),
      { at: 7300, p: { x: 382, y: 236 } },
      { at: 7900, p: { x: 372, y: 90 } },
      hv([8720, 8960], { x: 262, y: 14 }, 1.5, 1),
      { fn: RINGW, f: ring(0) },
      { at: 11450, p: { x: 392, y: 200 } },
      { fn: [TL.curtain[0], TL.curtain[1]], f: (t) => ({ x: 394, y: curtainY(t) }) },
    ],
    // D4 lime — chrome dots, URL typing, headline line 2 + underline
    [
      { fn: FORM, f: form(4) },
      { at: 750, p: { x: 120, y: 250 } },
      { at: 1250, p: { x: 90, y: 140 } },
      hv([1840, 2150], { x: 70, y: 16 }, 1.5, 1),
      { fn: [TL.type[0], TL.type[1]], f: (t) => ({ x: urlX(t) + 36, y: 12 }) },
      { at: 2900, p: { x: 120, y: 34 } },
      { at: 3300, p: { x: 14, y: 200 } },
      { at: 3800, p: { x: 22, y: 232 } },
      { fn: [TL.line2[0], TL.line2[1]], f: (t) => ({ x: printX2(t) - 18, y: lineTop(L2) + fs * HEAD.lh + 24 }) },
      { fn: [TL.underline[0], TL.underline[1]], f: (t) => ({ x: HEAD.x + w2 / 2 + 0.5 * (ulX(t) - HEAD.x - w2 / 2) + 20, y: ulY + 26 }) },
      { at: 5560, p: { x: 80, y: 320 } },
      { at: 6000, p: { x: 300, y: 374 } },
      { at: 6500, p: { x: 392, y: 250 } },
      { at: 7100, p: { x: 372, y: 100 } },
      { at: 7700, p: { x: 250, y: 24 } },
      { at: 8300, p: { x: 330, y: 220 } },
      { at: 8800, p: { x: 260, y: 382 } },
      { fn: RINGW, f: ring(3) },
      { at: 11500, p: { x: 40, y: 250 } },
      { at: 12100, p: { x: 60, y: 40 } },
      { at: 12900, p: { x: 330, y: 26 } },
      { at: 13600, p: { x: 70, y: 56 } },
    ],
    // D5 cyan — URL pill, nav, tagline scan, card 3 + chart
    [
      { fn: FORM, f: form(3) },
      { at: 700, p: { x: 250, y: 290 } },
      { at: 1200, p: { x: 330, y: 160 } },
      { at: 1700, p: { x: 230, y: 34 } },
      { fn: [TL.pill[0], TL.pill[1]], f: (t) => ({ x: URL.x + URL.w * (0.5 + 0.4 * ((pillX(t) - URL.x) / URL.w - 0.5)) - 20, y: 12 }) },
      hv([2480, 3250], { x: 276, y: 20 }, 3, 1.5),
      { at: 3700, p: { x: 380, y: 120 } },
      { at: 4150, p: { x: 390, y: 262 } },
      { at: 4550, p: { x: 300, y: 384 } },
      { at: 4850, p: { x: 150, y: 330 } },
      { fn: [TL.tag[0], TL.tag[1]], f: (t) => ({ x: tagX(t) + 14, y: TAG.y + TAG.fs * TAG.lh * 2 + 28 }) },
      { at: 6250, p: { x: 330, y: 210 } },
      { at: 6650, p: { x: 382, y: 330 } },
      cardHover(2, [6950, 8350]),
      { fn: RINGW, f: ring(2) },
      { at: 11500, p: { x: 380, y: 60 } },
      { at: 12300, p: { x: 300, y: 20 } },
      { at: 13000, p: { x: 330, y: 120 } },
      { at: 13800, p: { x: 240, y: 330 } },
    ],
  ];
  const paths = keys.map((k) => buildPath(k));

  /* ---------------- firing windows ---------------- */
  const at = (p: P) => () => p;
  const fires: Fire[][] = [
    [
      { t0: TL.logoZap[0], t1: TL.logoZap[1], at: at({ x: LOGO.gx + 4.5, y: LOGO.cy }) },
      { t0: TL.logoType[0], t1: TL.logoType[1], at: (t) => ({ x: logoX(t), y: LOGO.cy }) },
      { t0: TL.eyeZap[0], t1: TL.eyeZap[1], at: at({ x: EYE.x + 18, y: EYE.y + EYE.h / 2 }) },
      { t0: TL.line1[0], t1: TL.line1[1], at: (t) => ({ x: printX1(t), y: l1y }) },
      { t0: TL.ctaOutline[0], t1: TL.ctaOutline[1], at: tip(ctaTop, TL.ctaOutline[0], TL.ctaOutline[1]) },
    ],
    [
      { t0: TL.frame[0], t1: TL.frame[1], at: tip(frameA, TL.frame[0], TL.frame[1]) },
      { t0: TL.guides[0], t1: TL.guides[1], at: tip(gV2, TL.guides[0], TL.guides[1]), lin: [gV2.at(0), gV2.at(gV2.len)] },
      { t0: TL.cardOutline[0], t1: TL.cardOutline[1], at: tipLin(cardGeo[0], TL.cardOutline[0], TL.cardOutline[1]) },
      { t0: TL.ring[0], t1: TL.ring[1], at: tip(ringGeo, TL.ring[0], TL.ring[1]) },
      { t0: TL.curtain[0], t1: TL.curtain[1], at: (t) => paths[3].pos(t), thick: 1.5 },
    ],
    [
      { t0: TL.frame[0], t1: TL.frame[1], at: tip(frameB, TL.frame[0], TL.frame[1]) },
      { t0: TL.guides[0], t1: TL.guides[1], at: tip(gV1, TL.guides[0], TL.guides[1]), lin: [gV1.at(0), gV1.at(gV1.len)] },
      { t0: TL.cardOutline[0], t1: TL.cardOutline[1], at: tipLin(cardGeo[1], TL.cardOutline[0], TL.cardOutline[1]) },
      ...TL.bars.map(([a, b], i) => ({
        t0: a,
        t1: b,
        at: at({ x: BARS.x0 + i * (BARS.w + BARS.gap) + BARS.w / 2, y: BARS.base - BARS.h[i] }),
      })),
    ],
    [
      { t0: TL.divider[0], t1: TL.divider[1], at: tip(divider, TL.divider[0], TL.divider[1]), lin: [divider.at(0), divider.at(divider.len)] },
      { t0: TL.guides[0], t1: TL.guides[1], at: tip(gH1, TL.guides[0], TL.guides[1]), lin: [gH1.at(0), gH1.at(gH1.len)] },
      { t0: TL.ctaOutline[0], t1: TL.ctaOutline[1], at: tip(ctaBot, TL.ctaOutline[0], TL.ctaOutline[1]) },
      { t0: TL.playZap[0], t1: TL.playZap[1], at: at({ x: playX, y: ctaMid }) },
      { t0: TL.liveZap[0], t1: TL.liveZap[1], at: at({ x: LIVE.x + 9, y: LIVE.y + LIVE.h / 2 }) },
    ],
    [
      ...TL.dots.map(([a, b], i) => ({ t0: a, t1: b, at: at({ x: DOTS[i], y: DOT_Y }) })),
      { t0: TL.type[0], t1: TL.type[1], at: (t) => ({ x: urlX(t), y: DOT_Y }) },
      { t0: TL.line2[0], t1: TL.line2[1], at: (t) => ({ x: printX2(t), y: l2y }) },
      { t0: TL.underline[0], t1: TL.underline[1], at: (t) => ({ x: ulX(t), y: ulY }) },
    ],
    [
      { t0: TL.pill[0], t1: TL.pill[1], at: (t) => ({ x: pillX(t), y: DOT_Y }), lin: [{ x: URL.x, y: DOT_Y }, { x: URL.x + URL.w, y: DOT_Y }] },
      ...TL.nav.map(([a, b], i) => ({
        t0: a,
        t1: b,
        at: at(i < 3 ? { x: NAVP[i] + NAVP_W / 2, y: LOGO.cy } : { x: NAVCTA.x + NAVCTA.w / 2, y: LOGO.cy }),
      })),
      { t0: TL.tag[0], t1: TL.tag[1], at: tagTarget },
      { t0: TL.cardOutline[0], t1: TL.cardOutline[1], at: tipLin(cardGeo[2], TL.cardOutline[0], TL.cardOutline[1]) },
      { t0: TL.chart[0], t1: TL.chart[1], at: tipLin(chartGeo, TL.chart[0], TL.chart[1]) },
    ],
  ];

  /* ---------------- drone tracks ---------------- */
  DRONES.forEach((dr, i) => {
    const path = paths[i];
    anim(`dx${i}`, [axisStops(path, "x", (v) => `transform:translate(${px(v)})`)]);
    anim(`dy${i}`, [axisStops(path, "y", (v) => `transform:translateY(${px(v)})`)]);
    const f = beamTracks(path, fires[i]);
    anim(`bm${i}`, [f.beam, f.op]);
    anim(`ip${i}`, [f.imp], `animation-name:${N(`ip${i}`)},${N(`bm${i}-1`)}`);
  });

  /* ---------------- laser web (formation + payoff) ---------------- */
  const webPairs = [
    [0, 3],
    [3, 2],
    [2, 5],
    [5, 4],
    [4, 1],
    [1, 0],
  ];
  webPairs.forEach(([a, b], k) => {
    const w = webTracks(paths[a], paths[b], k);
    anim(`wb${a}`, [w.tr, w.op]);
  });

  /* ---------------- curtain glow band ---------------- */
  anim("cb", [
    [
      { t: TL.curtain[0], d: `transform:translateY(${px(CUR_Y0)})` },
      { t: TL.curtain[1], d: `transform:translateY(${px(CUR_Y1)})` },
    ],
    [
      { t: TL.curtain[0] - 80, d: "opacity:0" },
      { t: TL.curtain[0] + 120, d: "opacity:1" },
      { t: TL.curtain[1] - 160, d: "opacity:1" },
      { t: TL.curtain[1] + 60, d: "opacity:0" },
    ],
  ]);

  /* =================== SITE =================== */
  const tReset = TL.reset;
  const crt = (tx: number, vis = "opacity:1;transform:scale(1,1)"): Stop[] => [
    { t: tx, d: vis, e: EASE.in },
    { t: tx + 110, d: "opacity:1;transform:scale(1.05,.06)" },
    { t: tx + 230, d: "opacity:0;transform:scale(.18,.03)" },
  ];
  /** spring pop-in (scale) at t, collapse at tx, hidden pre-state restored at reset */
  const popStops = (t: number, tx: number, from = 0.2): Stop[] => [
    { t: t, d: `opacity:0;transform:scale(${from})`, e: "cubic-bezier(.2,.9,.3,1)" },
    { t: t + 150, d: "opacity:1;transform:scale(1.14)", e: EASE.inOut },
    { t: t + 270, d: "opacity:1;transform:scale(.95)", e: EASE.inOut },
    { t: t + 400, d: "opacity:1;transform:scale(1)" },
    { t: tx, d: "opacity:1;transform:scale(1)", e: EASE.in },
    { t: tx + 110, d: "opacity:1;transform:scale(1.06,.08)" },
    { t: tx + 230, d: "opacity:0;transform:scale(.2,.04)" },
    { t: tReset, d: "opacity:0;transform:scale(.2,.04)" },
    { t: tReset + 1, d: `opacity:0;transform:scale(${from})` },
  ];
  const draw = (len: number, a: number, b: number): Stop[] => [
    { t: a, d: `stroke-dashoffset:${fmt(len, 1)}`, e: DRAW.css },
    { t: b, d: "stroke-dashoffset:0" },
  ];

  /* window: frame halves (draw / erase with the curtain) */
  {
    const LA = frameA.len;
    const LB = frameB.len;
    // A is erased from its END (bottom-right) upwards; B from its START (bottom edge, then the left side)
    const eraseA: Stop[] = [];
    const eraseB: Stop[] = [];
    const n = 40;
    for (let k = 0; k <= n; k++) {
      const t = lerp(TL.curtain[0], TL.curtain[1] + 60, k / n);
      const cy = curtainY(t) - 6;
      // visible part = points above the curtain
      const visA = visibleLen(frameA, (p) => p.y < cy);
      const visB = visibleLen(frameB, (p) => p.y < cy);
      eraseA.push({ t, d: `stroke-dashoffset:${fmt(LA - visA, 1)}` });
      eraseB.push({ t, d: `stroke-dashoffset:${fmt(-(LB - visB), 1)}` });
    }
    const fa = [...draw(LA, TL.frame[0], TL.frame[1]), ...simplifyDash(eraseA)];
    const fb = [...draw(LB, TL.frame[0], TL.frame[1]), ...simplifyDash(eraseB), { t: T, d: `stroke-dashoffset:${fmt(-LB, 1)}` }];
    fb.unshift({ t: 0, d: `stroke-dashoffset:${fmt(LB, 1)}` });
    anim("fa", [fa]);
    anim("fb", [fb]);
  }
  /* window fill: power on + wipe with the curtain */
  {
    const wipe: Stop[] = [];
    const tA = exitAt(y1);
    const tB = exitAt(y0);
    const half = (y1 - y0) / 2;
    const sy = (k: number) => `translateY(${fmt(half * (1 - k), 1)}px) scaleY(${k})`;
    wipe.push({ t: TL.power - 1, d: `opacity:0;transform:${sy(0.01)}` });
    wipe.push({ t: TL.power, d: `opacity:1;transform:${sy(0.01)}`, e: "cubic-bezier(.5,0,.2,1)" });
    wipe.push({ t: TL.power + 240, d: `opacity:1;transform:${sy(1)}` });
    wipe.push({ t: tA, d: `opacity:1;transform:${sy(1)}` });
    wipe.push({ t: tB, d: "opacity:1;transform:translateY(0) scaleY(0)" });
    wipe.push({ t: tB + 1, d: "opacity:0;transform:translateY(0) scaleY(0)" });
    wipe.push({ t: tReset, d: `opacity:0;transform:${sy(0.01)}` });
    anim("wf", [wipe]);
    anim("fl", [
      [
        { t: TL.power - 90, d: `opacity:0;transform:${sy(0.006)}`, e: EASE.out },
        { t: TL.power - 30, d: `opacity:1;transform:${sy(0.006)}` },
        { t: TL.power, d: `opacity:1;transform:${sy(0.006)}`, e: "cubic-bezier(.5,0,.3,1)" },
        { t: TL.power + 90, d: `opacity:.55;transform:${sy(0.5)}`, e: EASE.out },
        { t: TL.power + 230, d: `opacity:0;transform:${sy(1)}` },
      ],
    ]);
  }
  /* chrome */
  const exChrome = exitAt(DOT_Y);
  anim("dv", [[...draw(divider.len, TL.divider[0], TL.divider[1]), { t: exChrome, d: "stroke-dashoffset:0", e: EASE.in }, { t: exChrome + 200, d: `stroke-dashoffset:${fmt(divider.len, 1)}` }]]);
  TL.dots.forEach(([a], i) => anim(`dt${i}`, [popStops(a + 25, exChrome + i * 15, 0)]));
  anim("up", [
    [
      { t: TL.pill[0] - 1, d: "opacity:0;transform:scaleX(0)" },
      { t: TL.pill[0], d: "opacity:1;transform:scaleX(0)", e: DRAW.css },
      { t: TL.pill[1], d: "opacity:1;transform:scaleX(1)", e: EASE.inOut },
      { t: TL.pill[1] + 90, d: "opacity:1;transform:scaleX(1.03)", e: EASE.inOut },
      { t: TL.pill[1] + 200, d: "opacity:1;transform:scaleX(1)" },
      ...crt(exChrome, "opacity:1;transform:scaleX(1)").map((s, k) =>
        k === 0 ? s : { ...s, d: s.d.replace(/scale\(([^,]+),([^)]+)\)/, "scaleX($1) scaleY($2)") }
      ),
      { t: tReset, d: "opacity:0;transform:scaleX(0)" },
    ],
  ], "transform-origin:0 0");
  // the URL/logo letter keyframes (shared, delayed per letter)
  anim("ty", [
    [
      { t: TL.type[0], d: "opacity:0;transform:translateY(.35em) scale(.4)", e: EASE.out },
      { t: TL.type[0] + 70, d: "opacity:1;transform:translateY(-.08em) scale(1.25)", e: EASE.inOut },
      { t: TL.type[0] + 190, d: "opacity:1;transform:translateY(0) scale(1)" },
      { t: TL.type[0] + 11900, d: "opacity:1;transform:translateY(0) scale(1)" },
      { t: TL.type[0] + 11901, d: "opacity:0;transform:translateY(.35em) scale(.4)" },
    ],
  ]);
  // HTML chrome/nav containers collapse with the curtain, come back (empty) before the build
  const holder = (tx: number): Stop[] => [
    { t: 0, d: "opacity:0;transform:scale(1,1)" },
    { t: 999, d: "opacity:0;transform:scale(1,1)" },
    { t: 1000, d: "opacity:1;transform:scale(1,1)" },
    ...crt(tx),
    { t: T, d: "opacity:0;transform:scale(.18,.03)" },
  ];
  anim("uh", [holder(exChrome)]);
  const exNav = exitAt(LOGO.cy);
  anim("lh", [holder(exNav)]);
  anim("lg", [popStops(TL.logoZap[0] + 10, exNav, 0)]);
  TL.nav.forEach(([a], i) => anim(`nv${i}`, [popStops(a + 20, exNav + i * 12, 0)]));
  // loading bar along the divider: grows with the build, completes, fades
  anim("ld", [
    [
      { t: TL.power + 150, d: "opacity:0;transform:scaleX(0)" },
      { t: TL.power + 200, d: "opacity:1;transform:scaleX(0)", e: EASE.out },
      { t: 2600, d: "opacity:1;transform:scaleX(.14)", e: EASE.inOut },
      { t: 3300, d: "opacity:1;transform:scaleX(.24)", e: EASE.inOut },
      { t: 4900, d: "opacity:1;transform:scaleX(.5)", e: EASE.inOut },
      { t: 6800, d: "opacity:1;transform:scaleX(.7)", e: EASE.inOut },
      { t: 8300, d: "opacity:1;transform:scaleX(.88)", e: EASE.inOut },
      { t: TL.barDone, d: "opacity:1;transform:scaleX(1)" },
      { t: TL.barDone + 300, d: "opacity:1;transform:scaleX(1)", e: EASE.in },
      { t: TL.barDone + 650, d: "opacity:0;transform:scaleX(1)" },
      { t: TL.barDone + 700, d: "opacity:0;transform:scaleX(0)" },
    ],
  ], "transform-origin:0 0");
  anim("lv", [popStops(TL.live, exChrome + 30, 0)]);

  /* guides */
  const gIn = (g: Geo, k: number): Stop[] => [
    { t: TL.guides[0], d: `opacity:1;stroke-dashoffset:${fmt(g.len, 1)}`, e: DRAW.css },
    { t: TL.guides[1], d: "opacity:1;stroke-dashoffset:0" },
    { t: TL.guidesOut + k * 60, d: "opacity:1;stroke-dashoffset:0", e: EASE.in },
    { t: TL.guidesOut + 400 + k * 60, d: "opacity:0;stroke-dashoffset:0" },
    { t: TL.guidesOut + 500 + k * 60, d: `opacity:0;stroke-dashoffset:${fmt(g.len, 1)}` },
  ];
  anim("g1", [gIn(gV1, 0)]);
  anim("g2", [gIn(gV2, 1)]);
  anim("g3", [gIn(gH1, 2)]);
  anim("gm", [
    [
      { t: TL.guides[1] - 60, d: "opacity:0" },
      { t: TL.guides[1] + 120, d: "opacity:1" },
      { t: TL.guidesOut, d: "opacity:1" },
      { t: TL.guidesOut + 400, d: "opacity:0" },
    ],
  ]);

  /* eyebrow + headline */
  const exEye = exitAt(EYE.y + EYE.h / 2);
  anim("ey", [popStops(TL.eyeZap[0] + 30, exEye, 0.3)]);
  anim("lp", [
    [
      { t: TL.line1[0], d: "opacity:0;transform:translateY(.32em) scale(.2,.04)", e: "cubic-bezier(.2,.75,.35,1)" },
      { t: TL.line1[0] + 70, d: "opacity:1;transform:translateY(-.1em) scale(1.1,1.32)", e: EASE.inOut },
      { t: TL.line1[0] + 175, d: "opacity:1;transform:translateY(.03em) scale(.94,.88)", e: EASE.inOut },
      { t: TL.line1[0] + 285, d: "opacity:1;transform:translateY(-.01em) scale(1.02,1.04)", e: EASE.inOut },
      { t: TL.line1[0] + 400, d: "opacity:1;transform:translateY(0) scale(1,1)" },
      { t: TL.line1[0] + 11000, d: "opacity:1;transform:translateY(0) scale(1,1)" },
      { t: TL.line1[0] + 11001, d: "opacity:0;transform:translateY(.32em) scale(.2,.04)" },
    ],
  ]);
  anim("lw", [
    [
      { t: TL.wave, d: "transform:translateY(0) rotate(0) scale(1)", e: "cubic-bezier(.3,0,.2,1)" },
      { t: TL.wave + 170, d: "transform:translateY(-.2em) rotate(-5deg) scale(1.08)", e: EASE.inOut },
      { t: TL.wave + 360, d: "transform:translateY(.04em) rotate(1.5deg) scale(.98)", e: EASE.inOut },
      { t: TL.wave + 500, d: "transform:translateY(0) rotate(0) scale(1)" },
    ],
  ]);
  const lineHold = (tx: number): Stop[] => [
    { t: 0, d: "opacity:0;transform:scale(1,1)" },
    { t: 1999, d: "opacity:0;transform:scale(1,1)" },
    { t: 2000, d: "opacity:1;transform:scale(1,1)" },
    ...crt(tx),
    { t: T, d: "opacity:0;transform:scale(.18,.03)" },
  ];
  anim("h0", [lineHold(exitAt(lineMid(0)))]);
  anim("h1", [lineHold(exitAt(lineMid(L2)))]);
  anim("el", [
    [
      { t: TL.elastic, d: "transform:scale(1)", e: EASE.out },
      { t: TL.elastic + 150, d: "transform:scale(1.13)", e: EASE.inOut },
      { t: TL.elastic + 290, d: "transform:scale(.95)", e: EASE.inOut },
      { t: TL.elastic + 420, d: "transform:scale(1.04)", e: EASE.inOut },
      { t: TL.elastic + 540, d: "transform:scale(.99)", e: EASE.inOut },
      { t: TL.elastic + 640, d: "transform:scale(1)" },
    ],
  ]);
  anim("ul", [
    [
      { t: TL.underline[0], d: "transform:scaleX(0)", e: DRAW.css },
      { t: TL.underline[1], d: "transform:scaleX(1)" },
      { t: tReset, d: "transform:scaleX(1)" },
      { t: tReset + 1, d: "transform:scaleX(0)" },
    ],
  ]);

  /* tagline */
  const exTag = exitAt(TAG.y + TAG.fs * TAG.lh);
  anim("tg", [lineHold(exTag)]);
  anim("tw", [
    [
      { t: TL.tag[0], d: "opacity:0;transform:translateY(.7em) skewX(-14deg)", e: EASE.out },
      { t: TL.tag[0] + 280, d: "opacity:1;transform:translateY(0) skewX(0)" },
      { t: TL.tag[0] + 8600, d: "opacity:1;transform:translateY(0) skewX(0)" },
      { t: TL.tag[0] + 8601, d: "opacity:0;transform:translateY(.7em) skewX(-14deg)" },
    ],
  ]);

  /* CTA */
  const exCta = exitAt(ctaMid);
  anim("ct", [
    [
      { t: 0, d: "opacity:0;transform:scale(1,1)" },
      { t: 1999, d: "opacity:0;transform:scale(1,1)" },
      { t: 2000, d: "opacity:1;transform:scale(1,1)" },
      { t: TL.click, d: "opacity:1;transform:scale(1,1)", e: EASE.out },
      { t: TL.click + 90, d: "opacity:1;transform:scale(.93,.9)", e: EASE.inOut },
      { t: TL.click + 230, d: "opacity:1;transform:scale(1.05,1.06)", e: EASE.inOut },
      { t: TL.click + 380, d: "opacity:1;transform:scale(1,1)" },
      ...crt(exCta),
      { t: T, d: "opacity:0;transform:scale(.18,.03)" },
    ],
  ]);
  anim("cf", [
    [
      { t: TL.ctaFill, d: "opacity:0;transform:scaleX(0)", e: EASE.out },
      { t: TL.ctaFill + 40, d: "opacity:1;transform:scaleX(.12)", e: "cubic-bezier(.3,.6,.4,1)" },
      { t: TL.ctaFill + 190, d: "opacity:1;transform:scaleX(1.06)", e: EASE.inOut },
      { t: TL.ctaFill + 300, d: "opacity:1;transform:scaleX(.985)", e: EASE.inOut },
      { t: TL.ctaFill + 400, d: "opacity:1;transform:scaleX(1)" },
      { t: tReset, d: "opacity:1;transform:scaleX(1)" },
      { t: tReset + 1, d: "opacity:0;transform:scaleX(0)" },
    ],
  ]);
  anim("cw", [
    [
      { t: TL.ctaWords, d: "transform:translateY(115%)", e: EASE.out },
      { t: TL.ctaWords + 300, d: "transform:translateY(0)" },
      { t: TL.ctaWords + 7000, d: "transform:translateY(0)" },
      { t: TL.ctaWords + 7001, d: "transform:translateY(115%)" },
    ],
  ]);
  anim("ca", [
    [
      { t: TL.ctaArrow, d: "opacity:0;transform:translateX(-70%) scale(.5)", e: EASE.back },
      { t: TL.ctaArrow + 260, d: "opacity:1;transform:translateX(0) scale(1)" },
      { t: TL.click + 60, d: "opacity:1;transform:translateX(0) scale(1)", e: EASE.out },
      { t: TL.click + 200, d: "opacity:1;transform:translateX(45%) scale(1)", e: EASE.inOut },
      { t: TL.click + 420, d: "opacity:1;transform:translateX(0) scale(1)" },
      { t: tReset, d: "opacity:1;transform:translateX(0) scale(1)" },
      { t: tReset + 1, d: "opacity:0;transform:translateX(-70%) scale(.5)" },
    ],
  ]);
  anim("cg", [
    [
      { t: TL.ctaGlow, d: "opacity:0;transform:scale(.6)", e: EASE.out },
      { t: TL.ctaGlow + 200, d: "opacity:1;transform:scale(1.15)", e: EASE.inOut },
      { t: TL.ctaGlow + 700, d: "opacity:.55;transform:scale(1)" },
      { t: TL.click, d: "opacity:.55;transform:scale(1)", e: EASE.out },
      { t: TL.click + 120, d: "opacity:1;transform:scale(1.3)", e: EASE.inOut },
      { t: TL.click + 700, d: "opacity:.55;transform:scale(1)" },
      { t: exCta, d: "opacity:.55;transform:scale(1)", e: EASE.in },
      { t: exCta + 160, d: "opacity:0;transform:scale(.6)" },
    ],
  ]);
  const ctaOut = (g: Geo): Stop[] => [
    { t: TL.ctaOutline[0], d: `opacity:1;stroke-dashoffset:${fmt(g.len, 1)}`, e: DRAW.css },
    { t: TL.ctaOutline[1], d: "opacity:1;stroke-dashoffset:0" },
    { t: TL.ctaFill + 250, d: "opacity:1;stroke-dashoffset:0", e: EASE.in },
    { t: TL.ctaFill + 600, d: "opacity:0;stroke-dashoffset:0" },
    { t: TL.ctaFill + 700, d: `opacity:0;stroke-dashoffset:${fmt(g.len, 1)}` },
  ];
  anim("co", [ctaOut(ctaTop)]);
  anim("cu", [ctaOut(ctaBot)]);
  anim("pb", [popStops(TL.playZap[0] + 30, exCta + 40, 0)]);

  /* cards */
  const exCards = exitAt((CARD_Y0 + CARD_Y1) / 2);
  cardGeo.forEach((g, i) => {
    anim(`cd${i}`, [popStops(TL.cardFill[i], exCards + i * 25, 0.86)]);
    anim(`co${i}`, [
      [
        { t: TL.cardOutline[0], d: `opacity:1;stroke-dashoffset:${fmt(g.len, 1)}` },
        { t: TL.cardOutline[1], d: "opacity:1;stroke-dashoffset:0" },
        { t: TL.cardFill[i] + 80, d: "opacity:1;stroke-dashoffset:0", e: EASE.in },
        { t: TL.cardFill[i] + 420, d: "opacity:0;stroke-dashoffset:0" },
        { t: TL.cardFill[i] + 500, d: `opacity:0;stroke-dashoffset:${fmt(g.len, 1)}` },
      ],
    ]);
  });
  anim("rg", [[...draw(ringGeo.len, TL.ring[0], TL.ring[1]), { t: tReset, d: "stroke-dashoffset:0" }, { t: tReset + 1, d: `stroke-dashoffset:${fmt(ringGeo.len, 1)}` }]]);
  TL.bars.forEach(([a], i) =>
    anim(`br${i}`, [
      [
        { t: a + 10, d: "transform:scaleY(0)", e: EASE.out },
        { t: a + 130, d: "transform:scaleY(1.2)", e: EASE.inOut },
        { t: a + 240, d: "transform:scaleY(.92)", e: EASE.inOut },
        { t: a + 340, d: "transform:scaleY(1)" },
        { t: tReset, d: "transform:scaleY(1)" },
        { t: tReset + 1, d: "transform:scaleY(0)" },
      ],
    ])
  );
  anim("ch", [[{ t: TL.chart[0], d: `stroke-dashoffset:${fmt(chartGeo.len, 1)}` }, { t: TL.chart[1], d: "stroke-dashoffset:0" }, { t: tReset, d: "stroke-dashoffset:0" }, { t: tReset + 1, d: `stroke-dashoffset:${fmt(chartGeo.len, 1)}` }]]);
  anim("ar", [
    [
      { t: TL.chart[1] - 150, d: "opacity:0" },
      { t: TL.chart[1] + 250, d: "opacity:1" },
      { t: tReset, d: "opacity:1" },
      { t: tReset + 1, d: "opacity:0" },
    ],
  ]);
  anim("cp", [
    [
      { t: TL.chart[1], d: "transform:scale(0)", e: EASE.back },
      { t: TL.chart[1] + 260, d: "transform:scale(1)" },
      { t: TL.click + 150, d: "transform:scale(1)", e: EASE.out },
      { t: TL.click + 300, d: "transform:scale(1.9)", e: EASE.inOut },
      { t: TL.click + 600, d: "transform:scale(1)" },
      { t: tReset, d: "transform:scale(1)" },
      { t: tReset + 1, d: "transform:scale(0)" },
    ],
  ]);
  // card labels (HTML)
  anim("k0", [popStops(TL.ring[1] - 20, exCards, 0)]);
  anim("k1", [popStops(TL.bars[0][0] + 20, exCards + 25, 0)]);
  anim("k2", [
    [
      ...popStops(TL.chart[1] + 40, exCards + 50, 0).filter((s) => s.t < exCards),
      { t: TL.click + 200, d: "opacity:1;transform:scale(1)", e: EASE.out },
      { t: TL.click + 330, d: "opacity:1;transform:scale(1.22)", e: EASE.inOut },
      { t: TL.click + 520, d: "opacity:1;transform:scale(.97)", e: EASE.inOut },
      { t: TL.click + 650, d: "opacity:1;transform:scale(1)" },
      ...popStops(TL.chart[1] + 40, exCards + 50, 0).filter((s) => s.t >= exCards),
    ],
  ]);

  anim("rm", [
    [
      { t: TL.live - 40, d: "opacity:0" },
      { t: TL.live + 200, d: "opacity:.75", e: EASE.inOut },
      { t: TL.live + 700, d: "opacity:.3" },
      { t: TL.tiltIn[0], d: "opacity:.3", e: EASE.out },
      { t: TL.tiltIn[0] + 350, d: "opacity:1", e: EASE.inOut },
      { t: TL.tiltIn[1] + 200, d: "opacity:.45" },
      { t: TL.click + 60, d: "opacity:.45", e: EASE.out },
      { t: TL.click + 220, d: "opacity:.9", e: EASE.inOut },
      { t: TL.click + 800, d: "opacity:.35" },
      { t: TL.curtain[0], d: "opacity:.35" },
      { t: TL.curtain[0] + 250, d: "opacity:0" },
    ],
  ]);

  /* payoff: tilt, halo, cursor, ripple, burst */
  const flat = "transform:perspective(170cqw) rotateX(0deg) rotateY(0deg) scale(1)";
  const tilt = "transform:perspective(170cqw) rotateX(9deg) rotateY(-12deg) scale(.955)";
  anim("st", [
    [
      { t: TL.tiltIn[0], d: flat, e: EASE.inOut },
      { t: TL.tiltIn[1], d: tilt },
      { t: TL.tiltOut[0], d: tilt, e: EASE.inOut },
      { t: TL.tiltOut[1], d: flat },
    ],
  ]);
  anim("hl", [
    [
      { t: TL.power, d: "opacity:0" },
      { t: TL.power + 600, d: "opacity:.25" },
      { t: TL.live - 50, d: "opacity:.3", e: EASE.out },
      { t: TL.live + 350, d: "opacity:1", e: EASE.inOut },
      { t: TL.tiltIn[1] + 300, d: "opacity:.55" },
      { t: TL.click + 60, d: "opacity:.55", e: EASE.out },
      { t: TL.click + 260, d: "opacity:.95", e: EASE.inOut },
      { t: TL.click + 900, d: "opacity:.5" },
      { t: TL.curtain[0], d: "opacity:.5" },
      { t: TL.curtain[1] - 300, d: "opacity:0" },
    ],
  ]);
  anim("cs", [
    [
      { t: TL.cursorIn[0], d: "opacity:0;transform:translate(330%,240%) scale(1)", e: EASE.out },
      { t: TL.cursorIn[0] + 120, d: "opacity:1;transform:translate(300%,215%) scale(1)", e: "cubic-bezier(.45,0,.2,1)" },
      { t: TL.cursorIn[1], d: "opacity:1;transform:translate(0,0) scale(1)" },
      { t: TL.click, d: "opacity:1;transform:translate(0,0) scale(1)", e: EASE.out },
      { t: TL.click + 90, d: "opacity:1;transform:translate(0,0) scale(.82)", e: EASE.inOut },
      { t: TL.click + 230, d: "opacity:1;transform:translate(0,0) scale(1)" },
      { t: TL.click + 650, d: "opacity:1;transform:translate(0,0) scale(1)", e: EASE.in },
      { t: TL.click + 1000, d: "opacity:0;transform:translate(60%,110%) scale(1)" },
      { t: TL.click + 1001, d: "opacity:0;transform:translate(330%,240%) scale(1)" },
    ],
  ]);
  anim("rp", [
    [
      { t: TL.click + 40, d: "opacity:0;transform:scale(.2)", e: EASE.outSoft },
      { t: TL.click + 80, d: "opacity:.9;transform:scale(.5)", e: EASE.outSoft },
      { t: TL.click + 620, d: "opacity:0;transform:scale(3.4)" },
    ],
  ]);
  anim("bp", [
    [
      { t: TL.click + 60, d: "opacity:0;transform:translateX(0) scale(1)", e: EASE.out },
      { t: TL.click + 100, d: "opacity:1;transform:translateX(30%) scale(1)", e: EASE.out },
      { t: TL.click + 560, d: "opacity:0;transform:translateX(100%) scale(.4)" },
    ],
  ]);

  /* ---------------- secondary loops (divide T exactly) ---------------- */
  kfs.push(`@keyframes ${N("pu")}{0%,100%{transform:scale(.85)}50%{transform:scale(1.12)}}`);
  kfs.push(`@keyframes ${N("fk")}{0%,100%{transform:rotate(0) scale(.75)}50%{transform:rotate(45deg) scale(1.2)}}`);
  kfs.push(`@keyframes ${N("sp")}{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(3.6)}}`);
  kfs.push(`@keyframes ${N("db")}{0%{opacity:0;transform:translateY(0)}12%{opacity:1}100%{opacity:0;transform:translateY(-26px)}}`);
  kfs.push(`@keyframes ${N("lvd")}{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}`);
  kfs.push(`@keyframes ${N("on")}{0%,100%{opacity:1}}`);
  rules.push(
    `.${R} .swc-bd{animation:${N("pu")} ${T / 20}ms ease-in-out infinite}`,
    `.${R} .swc-fk{animation:${N("fk")} ${T / 100}ms linear infinite}`,
    `.${R} .swc-sp{animation:${N("sp")} ${T / 50}ms cubic-bezier(.2,.7,.4,1) infinite}`,
    `.${R} .swc-db{animation:${N("db")} ${T / 30}ms ease-out infinite}`,
    `.${R} .swc-lvd{animation:${N("lvd")} ${T / 15}ms ease-in-out infinite}`,
    `.${R} .swc-fx{animation:${N("on")} ${T}ms linear infinite}`
  );

  const ids = {
    g: (c: ColName) => `swc-g-${c}-${H}`,
    b: (c: ColName) => `swc-b-${c}-${H}`,
    grid: `swc-grid-${H}`,
    area: `swc-area-${H}`,
    barG: `swc-bar-${H}`,
  };

  const css = [baseCss(R), ...rules, ...kfs].join("\n");

  return {
    rootClass: R,
    css,
    ids,
    head: { fs, lines: headLines, w2 },
    tag: { words: tagOut },
    url: { d: urlD, text: urlText },
    logo: { d: logoD, text: logoText },
    cta: { w: ctaW, fs: ctaFs, words: ctaWords, playX },
    paths: {
      frameA: { d: frameA.d(), len: frameA.len },
      frameB: { d: frameB.d(), len: frameB.len },
      divider: { d: divider.d(), len: divider.len },
      gV1: { d: gV1.d(), len: gV1.len },
      gV2: { d: gV2.d(), len: gV2.len },
      gH1: { d: gH1.d(), len: gH1.len },
      ctaTop: { d: ctaTop.d(), len: ctaTop.len },
      ctaBot: { d: ctaBot.d(), len: ctaBot.len },
      card0: { d: cardGeo[0].d(), len: cardGeo[0].len },
      card1: { d: cardGeo[1].d(), len: cardGeo[1].len },
      card2: { d: cardGeo[2].d(), len: cardGeo[2].len },
      ring: { d: ringGeo.d(), len: ringGeo.len },
      chart: { d: chartGeo.d(), len: chartGeo.len },
      area: {
        d: `${chartGeo.d()}L${CHART[CHART.length - 1].x} ${CARD_Y1 - 8}L${CHART[0].x} ${CARD_Y1 - 8}Z`,
        len: 0,
      },
    },
    drones: DRONES,
    sparkAngles: [-38, 12, 62],
    burst: [-90, -30, 30, 90, 150, 210],
  };
}

/* ------------------------------------------------------------------ */
/* Track generators                                                    */
/* ------------------------------------------------------------------ */

/** beam (rotate+scale, attached to the drone), impact point (absolute) and shared opacity */
function beamTracks(path: Path, fires: Fire[]): { beam: Stop[]; imp: Stop[]; op: Stop[] } {
  const beam: Stop[] = [];
  const imp: Stop[] = [];
  const op: Stop[] = [];
  const FI = 35;
  const FO = 50;
  let lastAng: number | null = null;
  const sorted = [...fires].sort((a, b) => a.t0 - b.t0);
  // fade windows; back-to-back zaps share a short dip instead of overlapping fades
  const span = sorted.map((f) => ({ a: f.t0 - FI, b: f.t1 + FO, dipA: false, dipB: false }));
  for (let i = 1; i < sorted.length; i++) {
    if (span[i - 1].b > span[i].a) {
      const m = (sorted[i - 1].t1 + sorted[i].t0) / 2;
      span[i - 1].b = m;
      span[i].a = m;
      span[i - 1].dipB = true;
      span[i].dipA = true;
    }
  }
  sorted.forEach((f, i) => {
    const thick = f.thick ?? 1;
    const { a: ta, b: tb, dipA, dipB } = span[i];
    const smp: Sample[] = [];
    for (let t = ta; ; t += 6) {
      const tt = Math.min(t, tb);
      const D = path.pos(tt);
      const G = f.at(Math.min(Math.max(tt, f.t0), f.t1));
      let a = (Math.atan2(G.y - D.y, G.x - D.x) * 180) / Math.PI;
      if (lastAng !== null) {
        while (a - lastAng > 180) a -= 360;
        while (a - lastAng < -180) a += 360;
      }
      lastAng = a;
      smp.push({ t: tt, v: [a, Math.hypot(G.x - D.x, G.y - D.y), G.x, G.y] });
      if (tt >= tb) break;
    }
    const keptB = simplify(smp, (s, iv) => {
      const a0 = (s.v[0] * Math.PI) / 180;
      const a1 = (iv[0] * Math.PI) / 180;
      const ex = s.v[1] * Math.cos(a0) - iv[1] * Math.cos(a1);
      const ey = s.v[1] * Math.sin(a0) - iv[1] * Math.sin(a1);
      return Math.hypot(ex, ey) / 2;
    });
    for (const s of keptB) beam.push({ t: s.t, d: `transform:rotate(${fmt(s.v[0], 1)}deg) scale(${fmt(s.v[1], 1)},${thick})` });
    const tr = (q: P) => `transform:translate(${fmt(q.x, 1)}px,${fmt(q.y, 1)}px)`;
    if (f.lin) {
      imp.push({ t: ta, d: tr(f.lin[0]) }, { t: f.t0, d: tr(f.lin[0]), e: DRAW.css }, { t: f.t1, d: tr(f.lin[1]) }, { t: tb, d: tr(f.lin[1]) });
    } else {
      const keptI = simplify(smp, (s, iv) => Math.hypot(s.v[2] - iv[2], s.v[3] - iv[3]) / 1.2);
      for (const s of keptI) imp.push({ t: s.t, d: tr({ x: s.v[2], y: s.v[3] }) });
    }
    op.push(
      { t: ta, d: `opacity:${dipA ? 0.15 : 0}` },
      { t: dipA ? ta + 12 : f.t0, d: "opacity:1" },
      { t: dipB ? Math.max(f.t1, tb - 12) : f.t1, d: "opacity:1" },
      { t: tb, d: `opacity:${dipB ? 0.15 : 0}` }
    );
  });
  return { beam, imp, op };
}

/** laser web line from drone A to drone B: formation (loop seam) + payoff */
function webTracks(a: Path, b: Path, k: number): { tr: Stop[]; op: Stop[] } {
  const wins: [number, number][] = [
    [-550, 250],
    [TL.webPay[0], TL.webPay[1]],
  ];
  const tr: Stop[] = [];
  const op: Stop[] = [];
  let lastAng: number | null = null;
  for (const [w0, w1] of wins) {
    const smp: Sample[] = [];
    for (let t = w0; t <= w1; t += 10) {
      const A = a.pos(t);
      const B = b.pos(t);
      let ang = (Math.atan2(B.y - A.y, B.x - A.x) * 180) / Math.PI;
      if (lastAng !== null) {
        while (ang - lastAng > 180) ang -= 360;
        while (ang - lastAng < -180) ang += 360;
      }
      lastAng = ang;
      smp.push({ t, v: [ang, Math.hypot(B.x - A.x, B.y - A.y)] });
    }
    const kept = simplify(smp, (s, iv) => {
      const a0 = (s.v[0] * Math.PI) / 180;
      const a1 = (iv[0] * Math.PI) / 180;
      return Math.hypot(s.v[1] * Math.cos(a0) - iv[1] * Math.cos(a1), s.v[1] * Math.sin(a0) - iv[1] * Math.sin(a1)) / 1.2;
    });
    for (const s of kept) {
      const d = `transform:rotate(${fmt(s.v[0], 2)}deg) scaleX(${fmt(s.v[1], 2)})`;
      if (s.t < 0) tr.push({ t: s.t + T, d });
      else tr.push({ t: s.t, d });
    }
    // flickering power-up, hold, power-down
    const fl = (t: number, o: number) => ({ t: t < 0 ? t + T : t, d: `opacity:${o}` });
    const j = (k * 37) % 60;
    const seq = [
      fl(w0, 0),
      fl(w0 + 60 + j, 0.9),
      fl(w0 + 100 + j, 0.2),
      fl(w0 + 150 + j, 1),
      fl(w0 + 330, 0.7),
      fl(w0 + 420 + j, 1),
      fl(w1 - 220, 0.85),
      fl(w1 - 150 + j / 2, 0.3),
      fl(w1 - 110 + j / 2, 0.8),
      fl(w1, 0),
    ];
    // a window that crosses the loop seam is split with explicit 0% / 100% values
    if (w0 < 0) {
      const pre = seq.filter((s) => s.t >= T + w0 - 0.01 && s.t > T / 2);
      const post = seq.filter((s) => !(s.t >= T + w0 - 0.01 && s.t > T / 2));
      const atSeam = seamOpacity(seq, w0);
      op.push(...post, { t: 0, d: `opacity:${atSeam}` }, ...pre, { t: T, d: `opacity:${atSeam}` });
    } else op.push(...seq);
  }
  // transform: make 0% and 100% equal (sample at the seam)
  const A = a.pos(0);
  const B = b.pos(0);
  const ang0 = (Math.atan2(B.y - A.y, B.x - A.x) * 180) / Math.PI;
  const d0 = `transform:rotate(${fmt(ang0, 2)}deg) scaleX(${fmt(Math.hypot(B.x - A.x, B.y - A.y), 2)})`;
  const sorted = tr.sort((x, y) => x.t - y.t).filter((s) => s.t > 0.5 && s.t < T - 0.5);
  return { tr: [{ t: 0, d: d0 }, ...sorted, { t: T, d: d0 }], op: op.sort((x, y) => x.t - y.t) };
}

/** opacity at the loop seam for a flicker sequence that started at w0 < 0 */
function seamOpacity(seq: { t: number; d: string }[], w0: number): string {
  // seq times were mapped with +T when negative; recover the unwrapped order
  const un = seq.map((s) => ({ t: s.t > T / 2 && w0 < 0 ? s.t - T : s.t, o: Number(s.d.slice(8)) }));
  un.sort((a, b) => a.t - b.t);
  for (let i = 0; i < un.length - 1; i++) {
    if (un[i].t <= 0 && un[i + 1].t >= 0) {
      const u = (0 - un[i].t) / (un[i + 1].t - un[i].t || 1);
      return fmt(lerp(un[i].o, un[i + 1].o, u), 3);
    }
  }
  return "0";
}

/** arc length of the part of a geometry for which `keep` holds (sampled) */
function visibleLen(g: Geo, keep: (p: P) => boolean): number {
  const n = 200;
  let acc = 0;
  const step = g.len / n;
  for (let i = 0; i < n; i++) if (keep(g.at((i + 0.5) * step))) acc += step;
  return acc;
}

/** collapses a list of dashoffset stops where linear interpolation is enough */
function simplifyDash(stops: Stop[]): Stop[] {
  const smp: Sample[] = stops.map((s) => ({ t: s.t, v: [Number(s.d.split(":")[1])] }));
  return simplify(smp, (s, iv) => Math.abs(s.v[0] - iv[0]) / 1.5).map((s) => ({
    t: s.t,
    d: `stroke-dashoffset:${fmt(s.v[0], 1)}`,
  }));
}

/** static base styles (= the reduced-motion poster: a finished, live site) */
function baseCss(R: string): string {
  const r = `.${R}`;
  return [
    `${r}{position:relative;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;user-select:none;pointer-events:none}`,
    `${r} *{box-sizing:border-box}`,
    `${r} [class*="swc-"]{animation-duration:${T / 1000}s;animation-timing-function:linear;animation-iteration-count:infinite}`,
    `${r} .swc-L{position:absolute;inset:0;width:100%;height:100%;overflow:visible}`,
    `${r} svg *{transform-box:view-box;transform-origin:0 0}`,
    `${r} .swc-site{position:absolute;inset:0;transform-origin:50% 56%;backface-visibility:hidden}`,
    `${r} .swc-fx{opacity:0}`,
    `${r} .swc-tmp{opacity:0}`,
    `${r} .swc-abs{position:absolute;display:block}`,
    `${r} .swc-halo{position:absolute;left:4%;top:8%;width:92%;height:88%;border-radius:50%;background:radial-gradient(closest-side,rgba(200,240,46,.32),rgba(20,224,200,.10) 55%,transparent);opacity:.5}`,
    `${r} .swc-ln{display:block;white-space:nowrap;transform-origin:0 60%}`,
    `${r} .swc-w{display:inline-block;white-space:nowrap}`,
    `${r} .swc-lp,${r} .swc-lw{display:inline-block;transform-origin:50% 82%}`,
    `${r} .swc-hw{display:inline-block;position:relative;transform-origin:0 70%}`,
    `${r} .swc-tg{transform-origin:0 50%}`,
    `${r} .swc-tw{display:inline-block;transform-origin:0 100%}`,
    `${r} .swc-ty{display:inline-block;transform-origin:50% 80%}`,
    `${r} .swc-ct{transform-origin:50% 50%}`,
    `${r} .swc-cf{position:absolute;inset:0;border-radius:999px;background:linear-gradient(180deg,rgba(242,243,238,.28),rgba(242,243,238,0) 60%) #c8f02e;transform-origin:0 50%;box-shadow:inset 0 1px 0 rgba(255,255,255,.45)}`,
    `${r} .swc-cm{display:inline-block;overflow:hidden;vertical-align:bottom;padding:0 .02em}`,
    `${r} .swc-cw{display:inline-block}`,
    `${r} .swc-ca{display:inline-block}`,
    `${r} .swc-cg{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(200,240,46,.55),rgba(200,240,46,.12) 60%,transparent);opacity:.55}`,
    `${r} .swc-ul{position:absolute;left:0;right:0;border-radius:99px;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:100% 50%}`,
    `${r} .swc-lv{transform-origin:50% 50%}`,
    `${r} .swc-k0,${r} .swc-k1,${r} .swc-k2,${r} .swc-ey{transform-origin:0 50%}`,
    `${r} .swc-cs{opacity:0}`,
    `${r} .swc-rp{opacity:0;border-radius:50%;border:.5cqw solid rgba(200,240,46,.9)}`,
    `${r} .swc-bp{opacity:0}`,
    `${r} .swc-wf,${r} .swc-fl{transform-origin:0 40px}`,
  ].join("\n");
}
