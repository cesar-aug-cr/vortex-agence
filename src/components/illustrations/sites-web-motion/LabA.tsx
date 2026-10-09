/**
 * /services/sites-web hero motion graphic, VARIANT A: "Laser Forge".
 *
 * Server component, pure CSS. Every keyframe is generated below from a timeline
 * (laser paths, per-glyph etch times) and cached per (title, tagline, cta).
 *
 * Motion contract
 * - ONE period T = 14 s for every animation, no animation-delay. Short cycles
 *   (spark sprays, flare flicker, beam pulses, pings) are unrolled inside a
 *   T-long keyframe set (identical bodies merged into selector lists), so all
 *   animations share one start and one iteration boundary per loop: React listens
 *   to animationiteration at the root, and every boundary costs a restyle burst.
 * - Only transform and opacity, all on HTML boxes, so Chrome, Safari and Firefox
 *   composite every animation. Outlines are "drawn" by scaling edge segments in
 *   from where the weld enters (+ corner arcs lighting up), not stroke-dashoffset,
 *   which would run on the main thread every frame. No pseudo-element animations
 *   and no font-relative units in keyframes (both make restyles far costlier).
 * - Lasers are aimed at what the browser DISPLAYS: eased moves are emitted as one
 *   keyframe interval with a cubic-bezier evaluated identically in TS; beams are
 *   children of their emitter so they only rotate and stretch.
 * - content-visibility:auto: zero style/paint work while scrolled off-screen.
 * - The un-animated base styles ARE the finished website: the reduced-motion poster.
 *
 * STORYBOARD (ms inside T = 14000; "~" = shifts a little with the localized strings)
 *    0– 240  Empty laser bed (dot grid, rail). The four emitters (lime, cyan, blue, green)
 *            charge up at the rail corners.
 *  240–1080  FRAME. The four beams strike at once, each from its corner, and each traces one
 *            edge of the browser window: the beams sweep through the centre like a vortex.
 * 1080–1800  The welds meet (corner flashes); the window rim glows white-hot and cools; a glint
 *            runs across the glass.
 * 1180–1420  Beams converge on ONE weld point: the chrome divider is cut right to left.
 * 1470–1890  Three spot welds pop the window dots; the URL bar is scanned in, "vortx.lu" slides in.
 * 1960–2250  Nav row scanned right to left: button, links, then the VorTX logo stamps in hot.
 * 2310–2500  Eyebrow "NEXT.JS · SEO · UX" drops in word by word under the beam.
 * 2580–~3850 HEADLINE (title prop) laser-etched glyph by glyph by two converging beams: each
 *            letter burns in white-hot and oversized, drops into place, cools to white / lime;
 *            each word then snaps from a molten italic to upright with an elastic overshoot.
 * ~3940–4380 Tagline skeleton rastered line by line (bar widths follow the tagline prop).
 * ~4580–5380 Beams split three ways: the three cards are traced at once, rims glow and cool;
 *            photo, "100" score ring (orbiting head) and low bars appear.
 * ~5620–6900 CTA (cta prop) forged last: all four beams converge and trace the pill, it flashes
 *            white-hot and cools to lime, the label rises letter by letter, the arrow slides in,
 *            a pulse ring.
 * ~6900–8250 Emitters park; a cursor glides in on a curve and lands on the CTA (hover glow).
 *   ~8260    Click: shockwave ring, pill ripples and a spark burst; three conversion comets arc
 *            into the chart, card 3 lights up, the bars shoot up, "+38 %" rolls like an odometer,
 *            the trend line draws, LIVE switches on, the last title line does a glowing wave.
 * ~9600–12350 Hold: the finished site breathes (shimmer across the headline, pulse rings, pings,
 *            emitters drifting on the rail).
 * 12350–13250 SWEEP. Two emitters ride the side rails down dragging a laser curtain across the
 *            stage; every element flashes and evaporates as the curtain passes it.
 * 13250–14000 Empty bed, emitters glide back to their corners: seamless loop into 0.
 */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { SitesWebMotionProps } from "./types";

/* ════════════════════════ engine: numbers & keyframes ════════════════════════ */

const T = 14000; // master period of EVERY animation (see the motion contract above)

const fx = (v: number, d: number): string => {
  const k = 10 ** d;
  const r = Math.round(v * k) / k;
  return (r === 0 ? 0 : r).toString().replace(/^(-?)0\./, "$1.");
};
const n1 = (v: number) => fx(v, 1);
const n2 = (v: number) => fx(v, 2);
const n3 = (v: number) => fx(v, 3);
/** viewBox unit (0–400) → container-query length (the root is square). */
const cq = (u: number) => `${n2(u / 4)}cqw`;

/** [time ms, css value, timing function of the segment that STARTS here] */
type Stop = [number, string, string?];
type Tracks = Record<string, Stop[]>;

/** Merge property tracks into one @keyframes rule. Each track is closed on
 * 0% and 100% with its FIRST value so the loop seam is exact. */
function keyframes(name: string, tracks: Tracks): string {
  type Block = { o: number; e: string; d: Map<string, string> };
  const blocks = new Map<string, Block>();
  for (const prop of Object.keys(tracks)) {
    const st = [...tracks[prop]].sort((a, b) => a[0] - b[0]);
    if (!st.length) continue;
    if (st[0][0] > 0) st.unshift([0, st[0][1]]);
    if (st[st.length - 1][0] < T) st.push([T, st[0][1]]);
    for (const [t, v, e = ""] of st) {
      const o = Math.round((Math.min(Math.max(t, 0), T) / T) * 10000) / 100;
      const key = `${o}|${e}`;
      let b = blocks.get(key);
      if (!b) blocks.set(key, (b = { o, e, d: new Map() }));
      b.d.set(prop, v);
    }
  }
  const groups = new Map<string, number[]>();
  for (const b of [...blocks.values()].sort((x, y) => x.o - y.o)) {
    let body = [...b.d].map(([p, v]) => `${p}:${v}`).join(";");
    if (b.e) body += `;animation-timing-function:${b.e}`;
    const g = groups.get(body);
    if (g) g.push(b.o);
    else groups.set(body, [b.o]);
  }
  let s = `@keyframes ${name}{`;
  for (const [body, os] of groups) s += `${os.map((o) => `${n2(o)}%`).join(",")}{${body}}`;
  return `${s}}`;
}

class Sheet {
  private parts: string[] = [];
  private i = 0;
  kf(tracks: Tracks): string {
    const name = `swa-k${(this.i++).toString(36)}`;
    this.parts.push(keyframes(name, tracks));
    return name;
  }
  add(css: string) {
    this.parts.push(css);
  }
  get css() {
    return this.parts.join("");
  }
}

/* ════════════════════════ engine: geometry & motion ════════════════════════ */

type Pt = [number, number];
type Ease = (u: number) => number;
const lin: Ease = (u) => u;
const ioC: Ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);
const ioS: Ease = (u) => u * u * (3 - 2 * u);
const wrap180 = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;

type PSeg = { len: number; at: (s: number) => Pt; d: string };

/** Polyline + circular arcs, parametrised by arc length: the weld points run
 * along these at constant speed (outline segments are timed from the same
 * lengths); `d` serves the static rail drawing. */
class Path {
  private segs: PSeg[] = [];
  len = 0;
  readonly start: Pt;
  end: Pt;
  constructor(x: number, y: number) {
    this.start = [x, y];
    this.end = [x, y];
  }
  L(x: number, y: number): this {
    const [ax, ay] = this.end;
    const len = Math.hypot(x - ax, y - ay);
    if (len > 1e-6)
      this.segs.push({ len, at: (s) => [ax + ((x - ax) * s) / len, ay + ((y - ay) * s) / len], d: `L${n2(x)} ${n2(y)}` });
    this.len += len;
    this.end = [x, y];
    return this;
  }
  /** Arc around (cx,cy) from angle a0 to a1 (degrees, screen coords, |a1-a0| ≤ 180). */
  A(cx: number, cy: number, r: number, a0: number, a1: number): this {
    const r0 = (a0 * Math.PI) / 180;
    const r1 = (a1 * Math.PI) / 180;
    const len = Math.abs(r1 - r0) * r;
    const x = cx + r * Math.cos(r1);
    const y = cy + r * Math.sin(r1);
    this.segs.push({
      len,
      at: (s) => {
        const a = r0 + ((r1 - r0) * s) / len;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      },
      d: `A${n2(r)} ${n2(r)} 0 0 ${r1 > r0 ? 1 : 0} ${n2(x)} ${n2(y)}`,
    });
    this.len += len;
    this.end = [x, y];
    return this;
  }
  at(s: number): Pt {
    let k = Math.min(Math.max(s, 0), this.len);
    for (const g of this.segs) {
      if (k <= g.len) return g.at(k);
      k -= g.len;
    }
    return this.end;
  }
  get d() {
    return `M${n2(this.start[0])} ${n2(this.start[1])}${this.segs.map((g) => g.d).join("")}`;
  }
}

/** Closed rounded rect, clockwise from the end of the top-left corner. */
const rrect = (x: number, y: number, w: number, h: number, r: number) =>
  new Path(x + r, y)
    .L(x + w - r, y)
    .A(x + w - r, y + r, r, -90, 0)
    .L(x + w, y + h - r)
    .A(x + w - r, y + h - r, r, 0, 90)
    .L(x + r, y + h)
    .A(x + r, y + h - r, r, 90, 180)
    .L(x, y + r)
    .A(x + r, y + r, r, 180, 270);

/** CSS cubic-bezier() evaluated in TS, so a motion eased by the browser and the
 * laser math aiming at it agree exactly. */
type Easing = { f: Ease; css?: string };
function bz(x1: number, y1: number, x2: number, y2: number): Easing {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const X = (t: number) => ((ax * t + bx) * t + cx) * t;
  const f = (x: number) => {
    if (x <= 0 || x >= 1) return x <= 0 ? 0 : 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 40; i++) {
      const v = X(t);
      if (Math.abs(v - x) < 1e-7) break;
      if (v > x) hi = t;
      else lo = t;
      t = (lo + hi) / 2;
    }
    return ((ay * t + by) * t + cy) * t;
  };
  return { f, css: `cubic-bezier(${[x1, y1, x2, y2].map(n2).join(",")})` };
}
const LIN: Easing = { f: lin };
const IO = bz(0.65, 0, 0.35, 1); // decisive in-out (rapids, repositioning)
const IOS = bz(0.45, 0, 0.55, 1); // gentle in-out (idle drift)

/** Keyframe stop of a moving point: value + easing of the segment it starts. */
type NStop = { t: number; p: number[]; e?: Easing };
/** What the browser displays between native stops (linear or eased). */
function evalN(st: NStop[], t: number): number[] {
  if (t <= st[0].t) return st[0].p;
  for (let i = 0; i + 1 < st.length; i++) {
    const a = st[i];
    const b = st[i + 1];
    if (t <= b.t) {
      const u = b.t > a.t ? (t - a.t) / (b.t - a.t) : 1;
      const k = a.e ? a.e.f(u) : u;
      return a.p.map((v, j) => v + (b.p[j] - v) * k);
    }
  }
  return st[st.length - 1].p;
}

type MSeg = { t0: number; t1: number; at: (u: number) => Pt; e: Easing; straight: boolean };
/** A point moving through timed segments. Straight eased moves become ONE
 * keyframe interval with a cubic-bezier; curved runs are sampled. */
class Mover {
  protected segs: MSeg[] = [];
  protected p: Pt;
  private readonly p0: Pt;
  constructor(p: Pt) {
    this.p = p;
    this.p0 = p;
  }
  seg(t0: number, t1: number, at: (u: number) => Pt, e: Easing, straight: boolean): this {
    this.segs.push({ t0, t1, at, e, straight });
    this.p = at(1);
    return this;
  }
  go(t0: number, t1: number, to: Pt, e: Easing = IO): this {
    const a = this.p;
    return this.seg(t0, t1, (u) => [a[0] + (to[0] - a[0]) * u, a[1] + (to[1] - a[1]) * u], e, true);
  }
  run(t0: number, t1: number, path: Path): this {
    return this.seg(t0, t1, (u) => path.at(u * path.len), LIN, false);
  }
  at = (t: number): Pt => {
    let p = this.p0;
    for (const s of this.segs) {
      if (t < s.t0) return p;
      if (t <= s.t1) return s.at(s.e.f(s.t1 > s.t0 ? (t - s.t0) / (s.t1 - s.t0) : 1));
      p = s.at(1);
    }
    return p;
  };
  get breaks() {
    return this.segs.flatMap((s) => [s.t0, s.t1]);
  }
  /** Native keyframe stops reproducing the motion over [a, b]. */
  stops(a: number, b: number, tol = 0.5): NStop[] {
    const knots = [a];
    for (const k of [...this.breaks].sort((p, q) => p - q)) if (k > knots[knots.length - 1] + 3 && k < b - 3) knots.push(k);
    knots.push(b);
    const out: NStop[] = [];
    for (let i = 0; i + 1 < knots.length; i++) {
      const k0 = knots[i];
      const k1 = knots[i + 1];
      const sg = this.segs.find((s) => s.t0 <= k0 + 0.5 && k1 <= s.t1 + 0.5);
      if (sg && sg.straight && Math.abs(sg.t0 - k0) < 0.5 && Math.abs(sg.t1 - k1) < 0.5) out.push({ t: k0, p: this.at(k0), e: sg.e.css ? sg.e : undefined });
      else if (!sg) out.push({ t: k0, p: this.at(k0) });
      else for (const t of sampleTimes((x) => this.at(x), k0, k1, dist2, tol, []).slice(0, -1)) out.push({ t, p: this.at(t) });
    }
    out.push({ t: b, p: this.at(b) });
    return out;
  }
}

/** Adaptive sampling: keyframe stops only where linear interpolation between
 * stops would drift more than `tol` from the true motion. */
function sampleTimes(
  f: (t: number) => number[],
  a: number,
  b: number,
  err: (x: number[], y: number[]) => number,
  tol: number,
  breaks: number[]
): number[] {
  const knots = [a];
  for (const k of [...breaks].sort((p, q) => p - q)) if (k > knots[knots.length - 1] + 4 && k < b - 4) knots.push(k);
  knots.push(b);
  const out = [a];
  const rec = (t0: number, f0: number[], t1: number, f1: number[], depth: number) => {
    if (t1 - t0 > 26 && depth < 14) {
      let worst = 0;
      for (const u of [0.25, 0.5, 0.75]) {
        const ft = f(t0 + (t1 - t0) * u);
        worst = Math.max(worst, err(ft, f0.map((v, i) => v + (f1[i] - v) * u)));
      }
      if (worst > tol) {
        const tm = (t0 + t1) / 2;
        const fm = f(tm);
        rec(t0, f0, tm, fm, depth + 1);
        rec(tm, fm, t1, f1, depth + 1);
        return;
      }
    }
    out.push(t1);
  };
  for (let i = 0; i + 1 < knots.length; i++) rec(knots[i], f(knots[i]), knots[i + 1], f(knots[i + 1]), 0);
  return out;
}
const dist2 = (x: number[], y: number[]) => Math.hypot(x[0] - y[0], x[1] - y[1]);
const tr = (p: Pt) => `translate(${cq(p[0])},${cq(p[1])})`;

/** One decimal of cqw (≈ .6 px on the 580 px desktop stage) for moving things. */
const cq1 = (u: number) => `${n1(u / 4)}cqw`;
/** translate() at one decimal of cqw (plain `transform`: the cheapest animated style). */
const tl = (p: number[]) => `translate(${cq1(p[0])},${cq1(p[1])})`;
/** `transform` track from native stops. */
const nTrack = (st: NStop[]): Stop[] => st.map((s) => [s.t, tl(s.p), s.e?.css]);
/** `transform` track of an arbitrary function, adaptively sampled over spans. */
function moveTrack(f: (t: number) => Pt, spans: [number, number][], breaks: number[], tol = 0.5): Stop[] {
  const st: Stop[] = [];
  for (const [a, b] of spans) for (const t of sampleTimes((x) => f(x), a, b, dist2, tol, breaks)) st.push([t, tl(f(t))]);
  return st;
}

/* ════════════════════════ fonts: measured advance widths (em) ════════════════════════ */

/** Measured in Chrome on the live site (font-kerning none, 1000px). Letters are
 * inline-blocks, so per-glyph advances (no kerning) are exactly what renders. */
const table = (src: Record<number, string>) => {
  const m = new Map<string, number>();
  for (const [w, cs] of Object.entries(src)) for (const c of cs) m.set(c, Number(w) / 1000);
  return m;
};
const JAK = table({
  180: " ", 238: "íìîï", 260: "ijl", 287: "IÍÌÎÏ", 333: "'", 386: "r,’", 396: "J", 400: "!¡", 407: "()",
  408: ".:·", 410: "f", 413: "1", 421: "t", 428: ";", 492: "z", 515: "s", 532: "\"/", 547: "L", 552: "T",
  564: "7", 567: "Z", 582: "vx", 583: "aàâäáãå", 586: "k", 587: "F", 589: "EÉÈÊË", 596: "2",
  599: "hnuñúùûü", 602: "yýÿ", 604: "69", 611: "ce?çéèêë¿", 612: "3", 614: "5", 633: "8", 634: "-",
  647: "S", 648: "g", 649: "P", 651: "oóòôöõø", 654: "ß", 662: "4", 667: "R", 672: "YÝ", 673: "bdpq",
  678: "+", 682: "X", 684: "–", 687: "K", 690: "B", 700: "0", 712: "V", 724: "UÚÙÛÜ", 732: "AHÀÂÄÁÃÅ",
  739: "D", 742: "NÑ", 772: "CÇ", 804: "G", 813: "&", 878: "OQÓÒÔÖÕØ", 912: "wM", 929: "m", 961: "æ",
  993: "Æ", 1014: "—", 1032: "W", 1045: "œ", 1070: "%", 1207: "Œ", 1294: "ẞ",
});
const INT = table({
  199: " ", 240: "ijlíìîï", 247: "IÍÌÎÏ", 305: ".:·", 308: "¡", 309: "'", 313: ";!", 320: ",", 322: "’",
  344: "()", 355: "ft", 357: "/", 376: "r", 399: "1", 436: "-", 500: "–", 527: "\"", 529: "s", 530: "?¿",
  535: "L", 537: "J", 539: "z", 541: "x", 549: "k", 551: "7aàâäáãå", 552: "F", 553: "vyýÿ", 555: "cç",
  563: "eéèêë", 580: "EÉÈÊË", 581: "oóòôöõø", 589: "uúùûü", 591: "nñ", 594: "h", 597: "2", 598: "bdpq",
  600: "g", 614: "5", 615: "P", 622: "S", 624: "R", 626: "ß", 627: "3", 628: "B", 630: "69", 631: "8",
  634: "Z", 636: "T", 640: "&", 645: "4", 647: "+", 655: "0", 657: "K", 677: "ẞ", 682: "X", 692: "YÝ",
  694: "D", 697: "UÚÙÛÜ", 702: "NÑ", 713: "H", 714: "AVÀÂÄÁÃÅ", 719: "CÇ", 728: "G", 749: "OÓÒÔÖÕØ",
  750: "Q", 817: "w", 827: "%", 879: "æ", 881: "m", 883: "M", 957: "œ", 994: "Œ", 997: "Æ", 1000: "—",
  1003: "W",
});
const adv = (c: string, m: Map<string, number>, def: number) => m.get(c) ?? def;
const textW = (s: string, m: Map<string, number>, def: number, ls = 0) => {
  let w = 0;
  for (const c of s) w += adv(c, m, def) + ls;
  return w;
};

/* ════════════════════════ scene constants (viewBox 400 × 400) ════════════════════════ */

const WIN = { x: 44, y: 44, w: 312, h: 312, r: 14 };
const HX = 58; // content left edge
const HW = 284; // content width
const H_TOP = 113; // headline box
const H_MAXH = 74;
const LH = 1.04;
const LS = -0.02;
const FS_MAX = 34;
const CTA_Y = 216;
const CTA_H = 28;
const CARD_Y = 260;
const CARD_W = 88;
const CARD_H = 80;
const CARDS_X = [58, 156, 254];
const DOTS: Pt[] = [
  [58, 56],
  [69, 56],
  [80, 56],
];

const F0 = 240; // frame trace
const F1 = 1080;
const C0 = 1180; // chrome divider
const C1 = 1420;
const DOT_T = [1470, 1545, 1620];
const U0 = 1690; // url scan
const U1 = 1890;
const N0 = 1960; // nav scan (right → left)
const N1 = 2250;
const Y0 = 2310; // eyebrow
const Y1 = 2500;
const HS = 2580; // headline etch start
const ETCH_V = 0.38; // units per ms
const S0 = 12350; // final sweep
const S1 = 13250;
const SY0 = 40;
const SY1 = 360;
/** Time at which the sweep curtain reaches y. */
const sw = (y: number) => S0 + Math.min(Math.max((y - SY0) / (SY1 - SY0), 0), 1) * (S1 - S0);

const RGB = { lime: "200,240,46", cyan: "20,224,200", green: "34,211,140", blue: "46,102,255" };
const EMIT = [RGB.lime, RGB.cyan, RGB.blue, RGB.green];
/** The window outline gradient (cyan → green → blue along the diagonal), sampled
 * at a point, so outline segments drawn as separate boxes stay one gradient. */
const GW: [number, number[]][] = [
  [0, [20, 224, 200]],
  [0.5, [34, 211, 140]],
  [1, [46, 102, 255]],
];
function gw(x: number, y: number, a = 1): string {
  const p = Math.min(Math.max((x + y - 88) / 624, 0), 1);
  const [lo, hi] = p <= 0.5 ? [GW[0], GW[1]] : [GW[1], GW[2]];
  const u = (p - lo[0]) / (hi[0] - lo[0]);
  const c = lo[1].map((v, k) => Math.round(v + (hi[1][k] - v) * u)).join(",");
  return a < 1 ? `rgba(${c},${a})` : `rgb(${c})`;
}

/* rail the emitters ride (inset 14, radius 26), parametrised by arc length */
const RAIL = rrect(14, 14, 372, 372, 26);
const RQ = (Math.PI / 2) * 26;
const railAt = (s: number): Pt => RAIL.at(((s % RAIL.len) + RAIL.len) % RAIL.len);
const rTop = (x: number) => x - 40;
const rRight = (y: number) => 320 + RQ + (y - 40);
const rBottom = (x: number) => 640 + 2 * RQ + (360 - x);
const rLeft = (y: number) => 960 + 3 * RQ + (360 - y);
const rTL = -RQ / 2;
const rTR = 320 + RQ / 2;
const rBR = 640 + 1.5 * RQ;
const rBL = 960 + 2.5 * RQ;
const RAIL_EDGES: [number, number][] = [
  [0, 320],
  [320 + RQ, 640 + RQ],
  [640 + 2 * RQ, 960 + 2 * RQ],
  [960 + 3 * RQ, 1280 + 3 * RQ],
];
const onOneEdge = (s0: number, s1: number) => {
  const lo = Math.min(s0, s1);
  const l = ((lo % RAIL.len) + RAIL.len) % RAIL.len;
  const h = l + Math.abs(s1 - s0);
  return RAIL_EDGES.some(([a, b]) => l >= a - 1e-6 && h <= b + 1e-6);
};
/** Emitter sliding along the rail (arc-length s); moves that stay on one straight
 * edge are a single eased keyframe interval, corner crossings are sampled. */
class RailMover extends Mover {
  private s: number;
  constructor(s: number) {
    super(railAt(s));
    this.s = s;
  }
  slide(t0: number, t1: number, s1: number, e: Easing = IO): this {
    const s0 = this.s;
    this.s = s1;
    return this.seg(t0, t1, (u) => railAt(s0 + (s1 - s0) * u), e, onOneEdge(s0, s1));
  }
}

/* ════════════════════════ static css ════════════════════════ */

const EO = "cubic-bezier(.2,.85,.3,1)"; // ease-out
const EB = "cubic-bezier(.3,1.65,.55,1)"; // back-out (overshoot)
const EB2 = "cubic-bezier(.34,1.35,.64,1)"; // gentle overshoot

const BASE_CSS = [
  `.swa{position:relative;display:block;width:100%;aspect-ratio:1;container-type:inline-size;content-visibility:auto;color:#f2f3ee;line-height:1;pointer-events:none;-webkit-user-select:none;user-select:none;font-family:var(--font-inter-tight),system-ui,sans-serif}`,
  `.swa *{box-sizing:border-box}`,
  `.swa-sv{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}`,
  `.swa-L{position:absolute;inset:0}`,
  `.swa-a{animation-duration:${T}ms;animation-iteration-count:infinite;animation-timing-function:linear}`,
  `.swa-p{position:absolute;left:0;top:0}`,
  `.swa-fb{transform-box:fill-box;transform-origin:50% 50%}`,
  `.swa-fl{transform-box:fill-box;transform-origin:0 50%}`,
  `.swa-fd{transform-box:fill-box;transform-origin:50% 100%}`,
  `.swa-m{font-family:var(--font-jetbrains-mono),ui-monospace,monospace}`,
  `.swa-j{font-family:var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif;font-weight:800}`,
  `.swa-t{position:absolute;white-space:nowrap}`,
  `.swa-ib{display:inline-block}`,
  `.swa-b{position:absolute;display:block}`,
  `.swa-fill{position:absolute;inset:0;width:100%;height:100%;display:block}`,
  `.swa-ug{border-radius:50%;background:radial-gradient(closest-side,rgba(${RGB.lime},.28),rgba(${RGB.lime},0))}`,
  `.swa-rim{opacity:0;box-shadow:inset 0 0 0 .5cqw rgba(255,255,255,.55),inset 0 0 2.2cqw rgba(${RGB.lime},.75),inset 0 0 6cqw rgba(${RGB.lime},.35)}`,
  `.swa-clip{overflow:hidden}`,
  `.swa-gln{position:absolute;top:-10%;left:0;width:11cqw;height:120%;opacity:0;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.13),rgba(255,255,255,0))}`,
  `.swa-card{background:linear-gradient(135deg,rgba(255,255,255,.075),rgba(255,255,255,.025))}`,
  `.swa-bar{transform-origin:50% 100%;background:linear-gradient(0deg,#2e66ff,#14e0c8 60%,#c8f02e)}`,
  `.swa-seg{transform-origin:0 50%;border-radius:1cqw;background:#c8f02e}`,
  `.swa-hit{opacity:0;background:rgba(${RGB.lime},.07);box-shadow:inset 0 0 0 .45cqw #c8f02e,0 0 3cqw rgba(${RGB.lime},.35)}`,
  `.swa-orb{position:absolute;left:50%;top:10%;width:2.4cqw;height:2.4cqw;margin:-1.2cqw 0 0 -1.2cqw;border-radius:50%;background:radial-gradient(closest-side,#fff,rgba(${RGB.green},.8) 55%,rgba(${RGB.green},0))}`,
  `.swa-trl{position:absolute;left:50%;top:50%;width:15cqw;height:.9cqw;margin-top:-.45cqw;transform-origin:0 50%;opacity:0;background:linear-gradient(90deg,#fff,rgba(${RGB.lime},.8) 16%,rgba(${RGB.lime},.22) 55%,rgba(${RGB.lime},0))}`,
  /* headline */
  `.swa-h{position:absolute;white-space:nowrap;letter-spacing:${LS}em}`,
  `.swa-hl{display:block;height:${LH}em;line-height:${LH}em}`,
  `.swa-w{display:inline-block;transform-origin:50% 80%}`,
  `.swa-acc{color:#c8f02e}`,
  `.swa-c{display:inline-block;position:relative}`,
  `.swa-hc{position:absolute;left:0;top:0;color:#fff;opacity:0;text-shadow:0 0 .05em #fff,0 0 .18em rgba(${RGB.lime},.95),0 0 .45em rgba(${RGB.cyan},.6)}`,
  /* chrome / nav / small ui */
  `.swa-url{position:absolute;border-radius:99px;background:linear-gradient(90deg,rgba(${RGB.cyan},.2),rgba(${RGB.blue},.12));box-shadow:inset 0 0 0 1px rgba(${RGB.cyan},.3);transform-origin:0 50%}`,
  `.swa-urlt{position:absolute;display:flex;align-items:center;gap:.7cqw;color:rgba(242,243,238,.78);font-weight:500}`,
  `.swa-live{position:absolute;display:flex;align-items:center;gap:1cqw;padding-left:1.7cqw;border-radius:99px;background:rgba(${RGB.green},.13);box-shadow:inset 0 0 0 1px rgba(${RGB.green},.5);color:#22d38c;font-weight:700;letter-spacing:.1em}`,
  `.swa-ld{position:relative;width:1.4cqw;height:1.4cqw;border-radius:50%;background:#22d38c;box-shadow:0 0 1.2cqw rgba(${RGB.green},.9)}`,
  `.swa-tp{position:absolute;width:1.4cqw;height:1.4cqw;margin:-.7cqw 0 0 -.7cqw;border-radius:50%;opacity:0}`,
  `.swa-pg{position:absolute;inset:0;border-radius:50%;border:.3cqw solid #22d38c;opacity:0;animation:swa-ping ${T}ms ease-out infinite}`,
  `.swa-tp .swa-pg{border-color:#c8f02e}`,
  `.swa-logo{position:absolute;white-space:nowrap;letter-spacing:-.02em}`,
  `.swa-logo b{color:#c8f02e;font-weight:800}`,
  `.swa-hot{position:absolute;left:0;top:0;color:#fff;opacity:0;text-shadow:0 0 .06em #fff,0 0 .25em rgba(${RGB.lime},.95),0 0 .6em rgba(${RGB.cyan},.6)}`,
  `.swa-pill{position:absolute;border-radius:99px}`,
  `.swa-nb{position:absolute;border-radius:99px;box-shadow:inset 0 0 0 1px rgba(${RGB.lime},.55);background:rgba(${RGB.lime},.1)}`,
  `.swa-eb{position:absolute;white-space:nowrap;color:#14e0c8;font-weight:700;letter-spacing:.16em}`,
  /* cta */
  `.swa-cta{position:absolute;display:flex;align-items:center;border-radius:99px;background:#c8f02e;color:#0a0a0b;font-weight:700;white-space:nowrap;box-shadow:0 0 0 1px rgba(${RGB.lime},.65),0 .8cqw 3.2cqw rgba(${RGB.lime},.3)}`,
  `.swa-ctl{display:inline-block;overflow:hidden;line-height:1.3;letter-spacing:-.005em}`,
  `.swa-ctl>span{display:inline-block}`,
  `.swa-car{display:inline-block;flex:none}`,
  `.swa-car svg{display:block;width:100%;height:100%}`,
  `.swa-cth{position:absolute;inset:0;border-radius:inherit;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgba(${RGB.lime},.85)}`,
  `.swa-cho{position:absolute;inset:0;border-radius:inherit;background:rgba(255,255,255,.17);opacity:0}`,
  `.swa-cpr{position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 0 .45cqw rgba(${RGB.lime},.75);opacity:0}`,
  /* cards text */
  `.swa-odo{position:absolute;white-space:nowrap;color:#c8f02e;font-weight:800}`,
  `.swa-reel{display:inline-block;height:1em;overflow:hidden;vertical-align:top}`,
  `.swa-reel>span{display:block}`,
  `.swa-reel>span>span{display:block;height:1em}`,
  /* fx: beams, curtain, welds, sparks, emitters, burst, cursor */
  `.swa-bm{position:absolute;left:0;top:-1.5cqw;width:100cqw;height:3cqw;transform-origin:0 50%;opacity:0}`,
  `.swa-bp{position:absolute;left:0;top:35%;height:30%;width:16%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.95),rgba(255,255,255,0));animation:swa-bpm ${T}ms linear infinite}`,
  `.swa-cu{position:absolute;left:3.5cqw;top:-1.6cqw;width:93cqw;height:3.2cqw;opacity:0;background:linear-gradient(rgba(${RGB.lime},0),rgba(${RGB.lime},.12) 24%,rgba(${RGB.lime},.65) 43%,#fff 47.5%,#fff 52.5%,rgba(${RGB.lime},.65) 57%,rgba(${RGB.lime},.12) 76%,rgba(${RGB.lime},0))}`,
  `.swa-cua{position:absolute;left:0;right:0;bottom:50%;height:10cqw;background:linear-gradient(rgba(${RGB.cyan},0),rgba(${RGB.cyan},.09))}`,
  `.swa-cs{position:absolute;top:50%;width:0;height:0}`,
  `.swa-wd{position:absolute;left:0;top:0;width:11cqw;height:11cqw;margin:-5.5cqw 0 0 -5.5cqw;opacity:0}`,
  `.swa-wg{position:absolute;inset:0;border-radius:50%;background:radial-gradient(closest-side,#fff 0,#fff 9%,rgba(255,255,255,.75) 14%,rgba(${RGB.lime},.5) 27%,rgba(${RGB.cyan},.15) 52%,rgba(${RGB.cyan},0) 100%)}`,
  `.swa-wf{position:absolute;left:-25%;right:-25%;top:50%;height:.32cqw;margin-top:-.16cqw;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.9) 50%,rgba(255,255,255,0));animation:swa-flk ${T}ms linear infinite}`,
  `.swa-sk{position:absolute;left:50%;top:50%;width:2.3cqw;height:.42cqw;margin:-.21cqw 0 0 -2.3cqw;border-radius:.3cqw;background:linear-gradient(90deg,rgba(255,226,150,0),rgba(255,236,170,.55) 45%,#fff 88%);transform-origin:100% 50%;opacity:0}`,
  `.swa-fl2{position:absolute;left:0;top:0;width:12cqw;height:12cqw;margin:-6cqw 0 0 -6cqw;border-radius:50%;opacity:0;background:radial-gradient(closest-side,#fff 0,rgba(255,255,255,.85) 12%,rgba(${RGB.lime},.45) 32%,rgba(${RGB.lime},0) 100%)}`,
  `.swa-em{position:absolute;left:0;top:0;width:0;height:0}`,
  `.swa-em>i{position:absolute;border-radius:50%}`,
  `.swa-eg{left:-3cqw;top:-3cqw;width:6cqw;height:6cqw}`,
  `.swa-er{left:-1.9cqw;top:-1.9cqw;width:3.8cqw;height:3.8cqw;border:.28cqw dashed}`,
  `.swa-ef{left:-6.3cqw;top:-6.3cqw;width:12.6cqw;height:12.6cqw;opacity:0}`,
  `.swa-rg{position:absolute;width:12cqw;height:12cqw;margin:-6cqw 0 0 -6cqw;border-radius:50%;opacity:0}`,
  `.swa-pt{position:absolute;left:0;top:0;width:1.4cqw;height:1.4cqw;margin:-.7cqw 0 0 -.7cqw;border-radius:50%;opacity:0;background:radial-gradient(closest-side,#fff 0,#fff 30%,rgba(${RGB.lime},.9) 55%,rgba(${RGB.lime},0) 100%)}`,
  `.swa-pr{position:absolute;border-radius:99px;opacity:0}`,
  `.swa-dc{position:absolute;left:0;top:0;width:6cqw;height:1cqw;margin:-.5cqw 0 0 -6cqw;border-radius:1cqw;transform-origin:100% 50%;opacity:0;background:linear-gradient(90deg,rgba(${RGB.lime},0),rgba(${RGB.lime},.6) 62%,#fff 94%)}`,
  `.swa-dch{position:absolute;right:-1cqw;top:50%;width:2.4cqw;height:2.4cqw;margin-top:-1.2cqw;border-radius:50%;background:radial-gradient(closest-side,#fff 0,#fff 25%,rgba(${RGB.lime},.75) 50%,rgba(${RGB.lime},0) 100%)}`,
  `.swa-cur{position:absolute;left:0;top:0;width:5.6cqw;height:5.6cqw;margin:-.47cqw 0 0 -.7cqw;transform-origin:12.5% 8.4%;opacity:0}`,
  `.swa-cur svg{display:block;width:100%;height:100%;overflow:visible}`,
  `.swa-cfx{position:absolute;left:0;top:0;width:4cqw;height:4cqw;margin:-2cqw 0 0 -2cqw;border-radius:50%;opacity:0;box-shadow:0 0 0 .35cqw rgba(255,255,255,.9)}`,
  ...EMIT.map(
    (c, i) =>
      `.swa-e${i} .swa-eg{background:radial-gradient(closest-side,#fff 0,#fff 15%,rgba(${c},1) 27%,rgba(${c},.3) 50%,rgba(${c},0) 100%)}` +
      `.swa-e${i} .swa-er{border-color:rgba(${c},.8)}` +
      `.swa-e${i} .swa-ef{background:radial-gradient(closest-side,rgba(255,255,255,.9) 0,rgba(${c},.55) 22%,rgba(${c},0) 70%)}` +
      `.swa-b${i}{background:linear-gradient(rgba(${c},0) 0,rgba(${c},.07) 22%,rgba(${c},.3) 37%,rgba(${c},.9) 45%,#fff 47.5%,#fff 52.5%,rgba(${c},.9) 55%,rgba(${c},.3) 63%,rgba(${c},.07) 78%,rgba(${c},0) 100%)}`
  ),
].join("");

/* sparks: 6 shared sprays; each sprays 5 flights per 3.5 s (one per 700 ms slot,
   varied angle and reach), fast out with drag, pulled down by gravity, shrinking
   as they cool. Unrolled to the master period T (identical bodies merged into
   selector lists) so there is a single iteration boundary per loop. */
const SPARKS: [number, number, number][] = [
  // base angle°, reach (units), phase within the 700 ms slot (≤ .45 so no flight wraps)
  [-150, 44, 0],
  [-112, 54, 0.3],
  [-80, 50, 0.15],
  [-46, 46, 0.42],
  [-128, 34, 0.08],
  [-64, 60, 0.36],
];
const JIT = [0, 14, -10, 22, -18, 7, -25];
/** Offsets (fractions of T) grouped by identical keyframe body. */
const grouped = (stops: [number, string][]) => {
  const groups = new Map<string, Set<number>>();
  for (const [o, body] of stops) {
    const k = Math.round(o * 100000) / 1000; // percent, 3 decimals (0.14 ms)
    const g = groups.get(body);
    if (g) g.add(k);
    else groups.set(body, new Set([k]));
  }
  return [...groups].map(([body, os]) => `${[...os].sort((a, b) => a - b).map((o) => `${fx(o, 3)}%`).join(",")}{${body}}`).join("");
};
const SPARK_CSS = SPARKS.map(([base, reach0, ph], i) => {
  const G = 34; // gravity pull over one flight (units)
  const F = 0.55; // flight share of the 700 ms slot
  const stops: [number, string][] = [
    [0, `transform:translate(0cqw,0cqw) rotate(${base}deg) scale(1);opacity:0`],
    [1, `transform:translate(0cqw,0cqw) rotate(${base}deg) scale(1);opacity:0`],
  ];
  for (let f = 0; f < 5; f++) {
    const a = ((base + JIT[(i * 5 + f) % JIT.length]) * Math.PI) / 180;
    const reach = reach0 * (0.8 + 0.1 * ((i * 3 + f * 5) % 5));
    for (const u of [0, 0.04, 0.22, F]) {
      const k = u / F;
      const d = 1 - (1 - k) * (1 - k);
      const x = Math.cos(a) * reach * d;
      const y = Math.sin(a) * reach * d + G * k * k;
      const dir = (Math.atan2(Math.sin(a) * reach * 2 * (1 - k) + 2 * G * k, Math.cos(a) * reach * 2 * (1 - k)) * 180) / Math.PI;
      const o = u === 0 ? 0 : 1 - ((u - 0.04) / (F - 0.04)) ** 1.6;
      const body = `transform:translate(${cq1(x)},${cq1(y)}) rotate(${Math.round(dir)}deg) scale(${n2(1 - 0.6 * k)});opacity:${n2(o)}`;
      for (let r = 0; r < 4; r++) stops.push([(r * 5 + f + ph + u) / 20, body]);
    }
  }
  return `@keyframes swa-s${i}{${grouped(stops)}}.swa-sk${i}{animation:swa-s${i} ${T}ms linear infinite}`;
}).join("");
/** n cycles of a simple loop unrolled over T (close the loop at 100%). */
const cycles = (n: number, at: [number, string][]) => {
  const stops: [number, string][] = [[1, at[0][1]]];
  for (let c = 0; c < n; c++) for (const [u, body] of at) stops.push([(c + u) / n, body]);
  return grouped(stops);
};
const LOOP_CSS =
  // weld lens-flare flicker (100 × 140 ms)
  `@keyframes swa-flk{${cycles(100, [
    [0, "opacity:1;transform:scaleX(1)"],
    [0.5, "opacity:.5;transform:scaleX(.62)"],
  ])}}` +
  // energy pulse running down each beam (40 × 350 ms)
  `@keyframes swa-bpm{${cycles(40, [
    [0, "transform:translateX(0%);opacity:0"],
    [0.1, "transform:translateX(52.5%);opacity:1"],
    [0.9, "transform:translateX(472.5%);opacity:1"],
    [0.99, "transform:translateX(525%);opacity:0"],
  ])}}` +
  // LIVE / chart ping (8 × 1750 ms)
  `@keyframes swa-ping{${cycles(8, [
    [0, "opacity:.9;transform:scale(1)"],
    [0.7, "opacity:0;transform:scale(3.2)"],
    [0.99, "opacity:0;transform:scale(3.2)"],
  ])}}`;

/* ════════════════════════ layout from the localized strings ════════════════════════ */

type Glyph = { ch: string; x: number; w: number };
type Word = { glyphs: Glyph[]; acc: boolean };
type Line = { words: Word[]; x0: number; x1: number; y: number };

function layoutTitle(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (!words.length) words.push("VorTX");
  const SP = adv(" ", JAK, 0.18) + LS;
  const ww = words.map((w) => textW(w, JAK, 0.7, LS));
  const lineW = (i: number, j: number) => ww.slice(i, j).reduce((a, w) => a + w, 0) + SP * (j - i - 1);
  let best = { score: -1, fs: 0, br: [words.length] };
  for (let L = 1; L <= Math.min(3, words.length); L++) {
    const combos: number[][] = [];
    const rec = (start: number, left: number, acc: number[]) => {
      if (left === 1) return void combos.push([...acc, words.length]);
      for (let k = start + 1; k <= words.length - left + 1; k++) rec(k, left - 1, [...acc, k]);
    };
    rec(0, L, []);
    for (const br of combos) {
      let maxW = 0;
      let s = 0;
      for (const e of br) {
        maxW = Math.max(maxW, lineW(s, e));
        s = e;
      }
      const fs = Math.min(FS_MAX, (HW - 8) / maxW, H_MAXH / (L * LH));
      // biggest type first, then fewer lines, then the most balanced split
      const score = Math.round(fs * 10) - 2 * L - maxW / 100;
      if (score > best.score) best = { score, fs, br };
    }
  }
  const fs = best.fs;
  const nL = best.br.length;
  const top = H_TOP + (H_MAXH - nL * LH * fs) / 2;
  const lines: Line[] = [];
  let s = 0;
  best.br.forEach((e, k) => {
    let x = HX;
    const lw: Word[] = [];
    for (let i = s; i < e; i++) {
      if (i > s) x += SP * fs;
      const glyphs: Glyph[] = [];
      for (const ch of words[i]) {
        const w = (adv(ch, JAK, 0.7) + LS) * fs;
        glyphs.push({ ch, x: x + w / 2, w });
        x += w;
      }
      lw.push({ glyphs, acc: nL > 1 ? k === nL - 1 : words.length > 1 && i === e - 1 });
    }
    lines.push({ words: lw, x0: HX - 2, x1: x + 2, y: top + (k + 0.5) * LH * fs + 0.06 * fs });
    s = e;
  });
  return { fs, top, lines };
}

function layoutCta(cta: string) {
  const label = cta.trim() || "OK";
  const PADL = 13;
  const GAP = 6;
  const ARW = 9;
  const PADR = 11;
  let fs = 12;
  const tw = textW(label, INT, 0.62, -0.005);
  const room = HW - PADL - GAP - ARW - PADR;
  if (tw * fs > room) fs = room / tw;
  const w = Math.max(110, PADL + tw * fs + GAP + ARW + PADR);
  return { label, fs, w, PADL, GAP, ARW };
}

/** Two skeleton bars whose widths follow the tagline split in two lines. */
function layoutTag(tagline: string) {
  const words = tagline.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return [196, 132];
  const ww = words.map((w) => textW(w, INT, 0.6));
  const sp = adv(" ", INT, 0.2);
  const total = ww.reduce((a, w) => a + w, 0) + sp * (words.length - 1);
  let acc = 0;
  let k = 0;
  while (k < words.length - 1 && acc + ww[k] / 2 < total / 2) acc += ww[k++] + sp;
  const a = acc - sp;
  const b = total - acc;
  const m = Math.max(a, b);
  return [Math.max(80, (a / m) * 204), Math.max(60, (b / m) * 204)];
}

/* ════════════════════════ build (cached per strings) ════════════════════════ */


function build(title: string, tagline: string, cta: string) {
  const sh = new Sheet();
  sh.add(BASE_CSS + SPARK_CSS + LOOP_CSS);
  const A = (tracks: Tracks, cls = "", style: CSSProperties = {}) => ({
    className: cls ? `swa-a ${cls}` : "swa-a",
    style: { ...style, animationName: sh.kf(tracks) } as CSSProperties,
  });

  const H = layoutTitle(title);
  const C = layoutCta(cta);
  const TAG = layoutTag(tagline);

  /* ─── paths ─── */
  const { x: wx, y: wy, w: ww, h: wh, r: wr } = WIN;
  const winP = [
    new Path(wx + wr, wy).L(wx + ww - wr, wy).A(wx + ww - wr, wy + wr, wr, -90, 0),
    new Path(wx + ww, wy + wr).L(wx + ww, wy + wh - wr).A(wx + ww - wr, wy + wh - wr, wr, 0, 90),
    new Path(wx + ww - wr, wy + wh).L(wx + wr, wy + wh).A(wx + wr, wy + wh - wr, wr, 90, 180),
    new Path(wx, wy + wh - wr).L(wx, wy + wr).A(wx + wr, wy + wr, wr, 180, 270),
  ];
  const divider = new Path(wx + ww, 68).L(wx, 68);
  const cardP = CARDS_X.map((x) => rrect(x, CARD_Y, CARD_W, CARD_H, 10));
  const ctaP = rrect(HX, CTA_Y, C.w, CTA_H, CTA_H / 2);

  /* ─── main weld W1: the single converged weld point ─── */
  const w1 = new Mover(winP[0].start);
  const rapids: [number, number][] = [];
  const rap = (t0: number, t1: number, to: Pt) => {
    w1.go(t0, t1, to);
    rapids.push([t0, t1]);
  };
  w1.run(F0, F1, winP[0]);
  w1.go(F1 + 20, C0 - 20, divider.start);
  w1.run(C0, C1, divider);
  let t = C1;
  DOTS.forEach((d, i) => {
    w1.go(t, DOT_T[i] - 8, d);
    t = DOT_T[i] + 30;
  });
  rap(t, U0, [98, 56]);
  w1.go(U0, U1, [248, 56], LIN);
  rap(U1, N0, [342, 80]);
  w1.go(N0, N1, [HX, 80], LIN);
  const EB_W = 18 * (0.6 + 0.16) * 6.6; // eyebrow width (mono)
  rap(N1, Y0, [HX, 106]);
  w1.go(Y0, Y1, [HX + EB_W, 106], LIN);
  // headline etch
  const lineT: [number, number][] = [];
  t = HS;
  H.lines.forEach((ln, k) => {
    if (k === 0) rap(Y1, HS, [ln.x0, ln.y]);
    else {
      rap(t, t + 90, [ln.x0, ln.y]);
      t += 90;
    }
    const d = (ln.x1 - ln.x0) / ETCH_V;
    w1.go(t, t + d, [ln.x1, ln.y], LIN);
    lineT.push([t, t + d]);
    t += d;
  });
  const HE = t;
  const etchAt = (k: number, x: number) => lineT[k][0] + (x - H.lines[k].x0) / ETCH_V;
  // tagline raster
  const g1 = HE + 90;
  const g1e = g1 + TAG[0] / 0.9;
  const g2 = g1e + 60;
  const g2e = g2 + TAG[1] / 0.9;
  const GE = g2e;
  rap(HE, g1, [HX, 195]);
  w1.go(g1, g1e, [HX + TAG[0], 195], LIN);
  rap(g1e, g2, [HX, 204]);
  w1.go(g2, g2e, [HX + TAG[1], 204], LIN);
  // cards (W1 takes card 1)
  const K0 = GE + 200;
  const K1 = K0 + 800;
  rap(GE, K0, cardP[0].start);
  w1.run(K0, K1, cardP[0]);
  // CTA forge
  const A0 = K1 + 240;
  const A1 = A0 + 620;
  rap(K1, A0, ctaP.start);
  w1.run(A0, A1, ctaP);
  // cursor + payoff
  const Q0 = A1 + 640;
  const Q1 = Q0 + 1150;
  const QC = Q1 + 200;
  const B0 = QC + 110;

  /* ─── split welds W2..W4 (frame + cards) ─── */
  const w2 = new Mover(winP[1].start).run(F0, F1, winP[1]).go(F1 + 200, K0 - 90, cardP[1].start).run(K0, K1, cardP[1]);
  const w3 = new Mover(winP[2].start).run(F0, F1, winP[2]).go(F1 + 200, K0 - 90, cardP[2].start).run(K0, K1, cardP[2]);
  const w4 = new Mover(winP[3].start).run(F0, F1, winP[3]);

  /* ─── emitters riding the rail ─── */
  const e1 = new RailMover(rBL)
    .slide(F0, F1, rBL + 70, LIN)
    .slide(F1 + 100, 2500, rLeft(236), IOS)
    .slide(2600, K0 - 60, rLeft(298), IOS)
    .slide(K0, K1, rLeft(316), LIN)
    .slide(K1, A0 - 20, rLeft(234))
    .slide(A0, A1, rLeft(224), LIN)
    .slide(A1 + 150, A1 + 750, rLeft(330))
    .slide(A1 + 750, 11350, rLeft(290), IOS)
    .slide(11350, S0, rLeft(SY0))
    .slide(S0, S1, rLeft(SY1), LIN)
    .slide(S1, 13850, rBL);
  const e2 = new RailMover(rTL)
    .slide(F0, F1, rTL + 70, LIN)
    .slide(C0, GE, rTop(150), LIN)
    .slide(GE, A0 - 20, rTop(168), IOS)
    .slide(A0, A1, rTop(150), LIN)
    .slide(A1 + 150, A1 + 750, rTop(84))
    .slide(A1 + 750, 11350, rTop(128), IOS)
    .slide(11350, S0, rTL);
  const e3 = new RailMover(rTR)
    .slide(F0, F1, rTR + 70, LIN)
    .slide(C0, N1, rRight(112), LIN)
    .slide(N1 + 30, HS - 40, rTop(304))
    .slide(HS, HE, rTop(272), LIN)
    .slide(HE + 40, K0 - 60, rRight(298))
    .slide(K0, K1, rRight(316), LIN)
    .slide(K1, A0 - 20, rRight(246))
    .slide(A0, A1, rRight(236), LIN)
    .slide(A1 + 150, A1 + 750, rRight(132))
    .slide(A1 + 750, 11350, rRight(172), IOS)
    .slide(11350, S0, rTR);
  const e4 = new RailMover(rBR)
    .slide(F0, F1, rBR + 70, LIN)
    .slide(F1 + 100, K0 - 60, rBottom(206), IOS)
    .slide(K0, K1, rBottom(188), LIN)
    .slide(K1, A0 - 20, rBottom(158))
    .slide(A0, A1, rBottom(148), LIN)
    .slide(A1 + 150, A1 + 750, rBottom(296))
    .slide(A1 + 750, 11350, rBottom(268), IOS)
    .slide(11350, S0, rRight(SY0))
    .slide(S0, S1, rRight(SY1), LIN)
    .slide(S1, 13850, rBR);
  const emitters = [e1, e2, e3, e4];
  // what the browser will actually display (beams are aimed from/at these)
  const emStops = emitters.map((m) => m.stops(0, T, 1.4));
  const E = emStops.map((st) => (tt: number): Pt => evalN(st, tt) as Pt);

  /* ─── beams ─── */
  type On = { a: number; b: number; w: Mover };
  const beamOn: On[][] = [
    [
      { a: F0, b: F1, w: w1 },
      { a: K0, b: K1, w: w1 },
      { a: A0, b: A1, w: w1 },
    ],
    [
      { a: F0, b: F1, w: w2 },
      { a: Y0 - 60, b: GE, w: w1 },
      { a: A0, b: A1, w: w1 },
    ],
    [
      { a: F0, b: F1, w: w3 },
      { a: C0, b: N1 + 10, w: w1 },
      { a: HS, b: HE, w: w1 },
      { a: K0, b: K1, w: w3 },
      { a: A0, b: A1, w: w1 },
    ],
    [
      { a: F0, b: F1, w: w4 },
      { a: K0, b: K1, w: w2 },
      { a: A0, b: A1, w: w1 },
    ],
  ];
  const dipStops = (a: number, b: number): Stop[] => {
    const st: Stop[] = [];
    for (const [d0, d1] of rapids)
      if (d0 > a + 80 && d1 < b - 10 && d1 - d0 > 60) st.push([d0, "1"], [d0 + 25, ".4"], [d1 - 25, ".4"], [d1, "1"]);
    return st;
  };
  /* ─── welds: displayed motion (native stops) ─── */
  const weldSpans: [Mover, [number, number][]][] = [
    [w1, [[F0, F1], [C0, A1]]],
    [w2, [[F0, F1], [K0, K1]]],
    [w3, [[F0, F1], [K0, K1]]],
    [w4, [[F0, F1]]],
  ];
  const weldStops = new Map<Mover, NStop[]>(weldSpans.map(([m, spans]) => [m, spans.flatMap(([a, b]) => m.stops(a - 60, b + 100, 0.8))]));
  const Wd = (m: Mover) => {
    const st = weldStops.get(m) ?? [];
    return (tt: number): Pt => evalN(st, tt) as Pt;
  };
  const weldTracks = (m: Mover, spans: [number, number][]): Tracks => {
    const op: Stop[] = [[0, "0"]];
    for (const [a, b] of spans) op.push([a - 50, "0"], [a, "1"], ...dipStops(a, b), [b, "1"], [b + 90, "0"]);
    return { transform: nTrack(weldStops.get(m) ?? []), opacity: op };
  };

  /* ─── beams: children of their emitter, so only rotate + length move ─── */
  const beamTracks = (k: number): Tracks => {
    const tf: Stop[] = [];
    const op: Stop[] = [[0, "0"]];
    const Ek = E[k];
    for (const on of beamOn[k]) {
      const a = on.a - 70;
      const b = on.b + 90;
      const Wk = Wd(on.w);
      const ang = (tt: number) => {
        const e = Ek(tt);
        const w = Wk(tt);
        return (Math.atan2(w[1] - e[1], w[0] - e[0]) * 180) / Math.PI;
      };
      const N = Math.max(2, Math.ceil((b - a) / 5));
      const ref: number[] = [];
      for (let i = 0; i <= N; i++) {
        const th = ang(a + ((b - a) * i) / N);
        ref.push(i ? ref[i - 1] + wrap180(th - ref[i - 1]) : th);
      }
      const g = (tt: number) => {
        const e = Ek(tt);
        const w = Wk(tt);
        const i = Math.min(N, Math.max(0, Math.round(((tt - a) / (b - a)) * N)));
        return [ref[i] + wrap180(ang(tt) - ref[i]), Math.hypot(w[0] - e[0], w[1] - e[1])];
      };
      const err = (x: number[], y: number[]) => {
        const rx = (x[0] * Math.PI) / 180;
        const ry = (y[0] * Math.PI) / 180;
        return Math.hypot(x[1] * Math.cos(rx) - y[1] * Math.cos(ry), x[1] * Math.sin(rx) - y[1] * Math.sin(ry));
      };
      const brk = [...emStops[k], ...(weldStops.get(on.w) ?? [])].map((q) => q.t);
      for (const tt of sampleTimes(g, a, b, err, 2, brk)) {
        const q = g(tt);
        tf.push([tt, `rotate(${n1(q[0])}deg) scaleX(${n3(q[1] / 400)})`]);
      }
      op.push([on.a - 60, "0"], [on.a, "1"], [on.a + 28, ".45"], [on.a + 60, "1"], ...dipStops(on.a, on.b), [on.b, "1"], [on.b + 80, "0"]);
    }
    return { transform: tf, opacity: op };
  };

  /* ─── helpers for site elements ─── */
  /** Fade out while the sweep curtain crosses [y0, y1]. */
  const outW = (y0: number, y1 = y0): [number, number] => {
    const a = sw(y0) - 10;
    return [a, Math.max(sw(y1) + 30, a + 90)];
  };
  /** Opacity: hidden → appears at tIn (dIn) → visible → swept away. */
  const life = (tIn: number, dIn: number, y0: number, y1 = y0, e?: string): Stop[] => {
    const [o0, o1] = outW(y0, y1);
    return [
      [0, "0"],
      [tIn, "0", e],
      [tIn + dIn, "1"],
      [o0, "1"],
      [o1, "0"],
    ];
  };
  /** A build track that resets to its initial value right after the sweep
   * (same window as the opacity fade, so the reset is never seen). */
  const withReset = (st: Stop[], y0: number, y1 = y0): Stop[] => {
    const last = st[st.length - 1][1];
    const r = outW(y0, y1)[1];
    return [...st, [r + 6, last], [r + 12, st[0][1]]];
  };
  /** Sweep the element away, reset invisibly, then become "visible" (opacity 1)
   * again because its hidden state is carried by another property. */
  const keepOp = (y0: number, y1 = y0): Stop[] => {
    const [o0, o1] = outW(y0, y1);
    return [
      [0, "1"],
      [o0, "1"],
      [o1, "0"],
      [o1 + 24, "0"],
      [o1 + 30, "1"],
    ];
  };
  /** Pop: scale from s0 with overshoot at t, swept at y. */
  const pop = (tIn: number, y0: number, y1 = y0, s0 = "0", dur = 380): Tracks => ({
    transform: withReset([[0, `scale(${s0})`], [tIn, `scale(${s0})`, EB], [tIn + dur, "scale(1)"]], y0, y1),
    opacity: life(tIn, 60, y0, y1),
  });

  /** A hot glow that blooms at a fixed point (scale + opacity only). */
  const flash = (key: string, p: Pt, t0: number, dur: number, s0 = ".35", s1 = "1.4") => (
    <i
      key={key}
      {...A(
        { opacity: [[0, "0"], [t0 - 20, "0"], [t0 + 10, "1"], [t0 + dur, "0"]], transform: [[0, `scale(${s0})`], [t0 - 20, `scale(${s0})`, EO], [t0 + dur, `scale(${s1})`]] },
        "swa-fl2",
        { left: cq(p[0]), top: cq(p[1]) }
      )}
    />
  );
  const bx = (x: number, y: number, w: number, h: number, extra: CSSProperties = {}): CSSProperties => ({
    left: cq(x),
    top: cq(y),
    width: cq(w),
    height: cq(h),
    ...extra,
  });

  /* ═════════ SITE STRUCTURE (HTML; transform + opacity only, all composited) ═════════ */
  const site: ReactNode[] = [];

  type OSeg = { kind: "h" | "v" | "c"; len: number; box: [number, number, number, number]; origin?: string; bg?: string; corner?: CSSProperties };
  /** Rounded-rect outline in rrect() order (clockwise from the end of the
   * top-left corner): edges scale in from where the weld enters, corner arcs
   * light up as it passes. */
  const outlineSegs = (x: number, y: number, w: number, h: number, r: number, s: number, col: (px: number, py: number) => string): OSeg[] => {
    const e = w - 2 * r;
    const f = h - 2 * r;
    const q = (Math.PI / 2) * r;
    const o = s / 2;
    const R = cq(r + o);
    const S = cq(s);
    const corner = (c: string, bw: string, rad: CSSProperties): CSSProperties => ({ borderStyle: "solid", borderColor: c, borderWidth: bw, ...rad });
    return [
      { kind: "h", len: e, box: [x + r, y - o, e, s], origin: "0 50%", bg: `linear-gradient(90deg,${col(x + r, y)},${col(x + w - r, y)})` },
      { kind: "c", len: q, box: [x + w - r, y - o, r + o, r + o], corner: corner(col(x + w, y), `${S} ${S} 0 0`, { borderTopRightRadius: R }) },
      { kind: "v", len: f, box: [x + w - o, y + r, s, f], origin: "50% 0", bg: `linear-gradient(${col(x + w, y + r)},${col(x + w, y + h - r)})` },
      { kind: "c", len: q, box: [x + w - r, y + h - r, r + o, r + o], corner: corner(col(x + w, y + h), `0 ${S} ${S} 0`, { borderBottomRightRadius: R }) },
      { kind: "h", len: e, box: [x + r, y + h - o, e, s], origin: "100% 50%", bg: `linear-gradient(90deg,${col(x + r, y + h)},${col(x + w - r, y + h)})` },
      { kind: "c", len: q, box: [x - o, y + h - r, r + o, r + o], corner: corner(col(x, y + h), `0 0 ${S} ${S}`, { borderBottomLeftRadius: R }) },
      { kind: "v", len: f, box: [x - o, y + r, s, f], origin: "50% 100%", bg: `linear-gradient(${col(x, y + r)},${col(x, y + h - r)})` },
      { kind: "c", len: q, box: [x - o, y - o, r + o, r + o], corner: corner(col(x, y), `${S} 0 0 ${S}`, { borderTopLeftRadius: R }) },
    ];
  };
  /** Cheaper outline: 4 pieces, each an edge plus the corner that follows it (two
   * borders + one rounded corner), scaled in from where the weld enters. */
  const comboSegs = (x: number, y: number, w: number, h: number, r: number, s: number, c: string): OSeg[] => {
    const o = s / 2;
    const q = (Math.PI / 2) * r;
    const R = cq(r + o);
    const S = cq(s);
    const b = (bw: string, rad: CSSProperties): CSSProperties => ({ borderStyle: "solid", borderColor: c, borderWidth: bw, ...rad });
    return [
      { kind: "h", len: w - 2 * r + q, box: [x + r, y - o, w - r + o, r + o], origin: "0 0", corner: b(`${S} ${S} 0 0`, { borderTopRightRadius: R }) },
      { kind: "v", len: h - 2 * r + q, box: [x + w - r, y + r, r + o, h - r + o], origin: "0 0", corner: b(`0 ${S} ${S} 0`, { borderBottomRightRadius: R }) },
      { kind: "h", len: w - 2 * r + q, box: [x - o, y + h - r, w - r + o, r + o], origin: "100% 100%", corner: b(`0 0 ${S} ${S}`, { borderBottomLeftRadius: R }) },
      { kind: "v", len: h - 2 * r + q, box: [x - o, y - o, r + o, h - r + o], origin: "100% 100%", corner: b(`${S} 0 0 ${S}`, { borderTopLeftRadius: R }) },
    ];
  };
  /** Draw windows of consecutive segments over [t0, t1] (constant weld speed). */
  const segTimes = (segs: OSeg[], t0: number, t1: number): [number, number][] => {
    const L = segs.reduce((a, g) => a + g.len, 0);
    let acc = 0;
    return segs.map((g) => {
      const a = t0 + (acc / L) * (t1 - t0);
      acc += g.len;
      return [a, t0 + (acc / L) * (t1 - t0)];
    });
  };
  const sc0 = (g: OSeg) => (g.kind === "h" ? "scaleX(0)" : "scaleY(0)");
  /** One outline segment: reveal [ta, tb], then fade over [o0, o1] and reset. */
  const segEl = (key: string, g: OSeg, ta: number, tb: number, o0: number, o1: number) => {
    const style: CSSProperties = { ...bx(...g.box), transformOrigin: g.origin, background: g.bg, ...g.corner };
    if (g.kind === "c") return <i key={key} {...A({ opacity: [[0, "0"], [ta, "0"], [tb, "1"], [o0, "1"], [o1, "0"]] }, "swa-b", style)} />;
    return (
      <i
        key={key}
        {...A(
          {
            transform: [[0, sc0(g)], [ta, sc0(g)], [tb, "scale(1)"], [o1 + 6, "scale(1)"], [o1 + 12, sc0(g)]],
            opacity: [[0, "1"], [o0, "1"], [o1, "0"], [o1 + 24, "0"], [o1 + 30, "1"]],
          },
          "swa-b",
          style
        )}
      />
    );
  };

  // underglow + glass (8 strips so the sweep curtain erases it line by line)
  site.push(<i key="uglow" {...A({ opacity: life(F1 - 100, 600, 356) }, "swa-b swa-ug", bx(50, 348, 300, 26))} />);
  const glassA = (yy: number) =>
    yy - wy < wh * 0.35 ? 0.07 - ((yy - wy) / (wh * 0.35)) * 0.04 : 0.03 - ((yy - wy - wh * 0.35) / (wh * 0.65)) * 0.015;
  const NG = 5;
  for (let i = 0; i < NG; i++) {
    const y0 = wy + (i * wh) / NG;
    const y1 = y0 + wh / NG;
    site.push(
      <i
        key={`gl${i}`}
        {...A({ opacity: life(F1 - 20, 560, y0, y1) }, "swa-b", {
          ...bx(wx, y0, ww, wh / NG + (i < NG - 1 ? 0.3 : 0)),
          background: `linear-gradient(rgba(255,255,255,${n3(glassA(y0))}),rgba(255,255,255,${n3(glassA(y1))}))`,
          borderRadius: i === 0 ? `${cq(wr)} ${cq(wr)} 0 0` : i === NG - 1 ? `0 0 ${cq(wr)} ${cq(wr)}` : undefined,
        })}
      />
    );
  }
  // heated rim: the freshly welded window glows inward, then cools; then a glint
  site.push(
    <i key="rim" {...A({ opacity: [[0, "0"], [F1 - 60, "0"], [F1 + 10, "1"], [F1 + 700, "0"]] }, "swa-b swa-rim", bx(wx, wy, ww, wh, { borderRadius: cq(wr) }))} />,
    <i key="glint" className="swa-b swa-clip" style={bx(wx, wy, ww, wh, { borderRadius: cq(wr) })}>
      <i
        {...A(
          {
            transform: [
              [0, "translateX(-30cqw) skewX(-18deg)"],
              [F1 + 260, "translateX(-30cqw) skewX(-18deg)", "ease-in-out"],
              [F1 + 1060, "translateX(110cqw) skewX(-18deg)"],
            ],
            opacity: [[0, "0"], [F1 + 250, "0"], [F1 + 260, "1"], [F1 + 1060, "1"], [F1 + 1070, "0"]],
          },
          "swa-gln"
        )}
      />
    </i>,
    <i
      key="chrome"
      {...A({ opacity: life(C1 - 120, 360, wy, 68) }, "swa-b", bx(wx, wy, ww, 24, { borderRadius: `${cq(wr)} ${cq(wr)} 0 0`, background: "rgba(255,255,255,.045)" }))}
    />
  );
  // window outline: 4 welds each draw one edge + corner, all at once (the vortex)
  const winSegs = outlineSegs(wx, wy, ww, wh, wr, 1.7, (px, py) => gw(px, py));
  for (let k = 0; k < 4; k++) {
    const pair = [winSegs[2 * k], winSegs[2 * k + 1]];
    segTimes(pair, F0, F1).forEach(([ta, tb], j) => {
      const g = pair[j];
      const idx = 2 * k + j;
      const key = `wo${idx}`;
      const style: CSSProperties = { ...bx(...g.box), transformOrigin: g.origin, background: g.bg };
      if (idx === 2) {
        // right edge: drawn top → bottom, retracts from the top with the curtain
        const tz = "translateY(0cqw) scaleY(0)";
        site.push(
          <i
            key={key}
            {...A(
              {
                transform: [
                  [0, tz],
                  [ta, tz],
                  [tb, "translateY(0cqw) scaleY(1)"],
                  [sw(wy + wr), "translateY(0cqw) scaleY(1)"],
                  [sw(wy + wh - wr), `translateY(${cq(g.box[3])}) scaleY(0)`],
                  [sw(wy + wh - wr) + 10, tz],
                ],
              },
              "swa-b",
              style
            )}
          />
        );
      } else if (idx === 6) {
        // left edge: drawn bottom → top (origin bottom), retracts downwards
        site.push(
          <i
            key={key}
            {...A({ transform: [[0, "scaleY(0)"], [ta, "scaleY(0)"], [tb, "scaleY(1)"], [sw(wy + wr), "scaleY(1)"], [sw(wy + wh - wr), "scaleY(0)"]] }, "swa-b", style)}
          />
        );
      } else {
        const [o0, o1] = outW(idx <= 1 || idx === 7 ? wy : wy + wh);
        site.push(segEl(key, g, ta, tb, o0, o1));
      }
    });
  }
  // chrome divider, cut right → left
  site.push(
    <i
      key="div"
      {...A(
        { transform: withReset([[0, "scaleX(0)"], [C0, "scaleX(0)"], [C1, "scaleX(1)"]], 68), opacity: keepOp(68) },
        "swa-b",
        bx(wx, 67.5, ww, 1, { background: "rgba(255,255,255,.16)", transformOrigin: "100% 50%" })
      )}
    />
  );
  // window dots (spot welds)
  DOTS.forEach(([x, y], i) =>
    site.push(
      <i
        key={`dot${i}`}
        {...A(pop(DOT_T[i], y), "swa-b", bx(x - 3.1, y - 3.1, 6.2, 6.2, { borderRadius: "50%", background: `rgba(${RGB.lime},${[1, 0.7, 0.45][i]})` }))}
      />
    )
  );

  // cards: glass, heated rim, traced outline (3 welds at once)
  CARDS_X.forEach((x, i) => {
    const [o0, o1] = outW(CARD_Y, CARD_Y + CARD_H);
    site.push(
      <i key={`cg${i}`} {...A({ opacity: life(K1 - 20, 450, CARD_Y, CARD_Y + CARD_H) }, "swa-b swa-card", bx(x, CARD_Y, CARD_W, CARD_H, { borderRadius: cq(10) }))} />,
      <i
        key={`ch${i}`}
        {...A({ opacity: [[0, "0"], [K1 - 50, "0"], [K1 + 10, "1"], [K1 + 560, "0"]] }, "swa-b swa-rim", bx(x, CARD_Y, CARD_W, CARD_H, { borderRadius: cq(10) }))}
      />
    );
    const segs = comboSegs(x, CARD_Y, CARD_W, CARD_H, 10, 1.2, gw(x + CARD_W / 2, CARD_Y + CARD_H / 2, 0.72));
    segTimes(segs, K0, K1).forEach(([ta, tb], j) => site.push(segEl(`co${i}-${j}`, segs[j], ta, tb, o0, o1)));
  });
  // card 1: photo placeholder + two text lines
  site.push(
    <i
      key="img"
      {...A(
        {
          transform: withReset([[0, "translateY(1.2cqw)"], [K1 + 100, "translateY(1.2cqw)", EO], [K1 + 420, "translateY(0cqw)"]], 266, 308),
          opacity: life(K1 + 100, 220, 266, 308),
        },
        "swa-b",
        bx(65, 267, 74, 40)
      )}
    >
      <svg viewBox="0 0 74 40" className="swa-fill">
        <defs>
          <linearGradient id="swa-gi" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2e66ff" stopOpacity=".75" />
            <stop offset="1" stopColor="#14e0c8" stopOpacity=".55" />
          </linearGradient>
        </defs>
        <rect width={74} height={40} rx={5} fill="url(#swa-gi)" />
        <circle cx={61} cy={11} r={4.6} fill="#c8f02e" />
        <path d="M0 33 L19 18 L30 27 L44 14 L74 35 Q74 40 69 40 L5 40 Q0 40 0 35Z" fill="rgba(34,211,140,.55)" />
      </svg>
    </i>
  );
  (
    [
      [315, 58, ".24", 260],
      [324, 38, ".14", 330],
    ] as const
  ).forEach(([y, w, a, dt], i) =>
    site.push(
      <i
        key={`l${i}`}
        {...A(
          {
            transform: withReset([[0, "scaleX(0)"], [K1 + dt, "scaleX(0)", EO], [K1 + dt + 320, "scaleX(1)"]], y, y + 4),
            opacity: keepOp(y, y + 4),
          },
          "swa-b",
          bx(65, y, w, 3.6, { borderRadius: cq(1.8), background: `rgba(242,243,238,${a})`, transformOrigin: "0 50%" })
        )}
      />
    )
  );
  // card 2: score ring spins into place while a bright head orbits once
  site.push(
    <i
      key="ring"
      {...A(
        {
          transform: withReset([[0, "rotate(-160deg) scale(.55)"], [K1 + 150, "rotate(-160deg) scale(.55)", EB2], [K1 + 760, "rotate(0deg) scale(1)"]], 277, 309),
          opacity: life(K1 + 150, 160, 277, 309),
        },
        "swa-b",
        bx(180, 273, 40, 40)
      )}
    >
      <svg viewBox="0 0 40 40" className="swa-fill">
        <circle cx={20} cy={20} r={16} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={4} />
        <circle cx={20} cy={20} r={16} fill="none" stroke="#22d38c" strokeWidth={4} />
      </svg>
    </i>,
    <i
      key="ringhead"
      {...A(
        {
          transform: [[0, "rotate(-90deg)"], [K1 + 150, "rotate(-90deg)", EO], [K1 + 760, "rotate(270deg)"]],
          opacity: [[0, "0"], [K1 + 150, "0"], [K1 + 190, "1"], [K1 + 700, "1"], [K1 + 860, "0"]],
        },
        "swa-b",
        bx(180, 273, 40, 40, { opacity: 0 })
      )}
    >
      <i className="swa-orb" />
    </i>
  );
  // card 3: axis, bars, trend line, impact glow
  const BARS = [12, 19, 15, 27, 38];
  site.push(
    <i
      key="ax"
      {...A(
        { transform: withReset([[0, "scaleX(0)"], [K1 + 120, "scaleX(0)", EO], [K1 + 380, "scaleX(1)"]], 331), opacity: keepOp(331) },
        "swa-b",
        bx(262, 331.5, 74, 1, { background: "rgba(255,255,255,.2)", transformOrigin: "0 50%" })
      )}
    />
  );
  BARS.forEach((h, i) =>
    site.push(
      <i
        key={`bar${i}`}
        {...A(
          {
            transform: withReset(
              [
                [0, "scaleY(0)"],
                [K1 + 220 + i * 45, "scaleY(0)", EO],
                [K1 + 440 + i * 45, "scaleY(.22)"],
                [B0 + 470 + i * 55, "scaleY(.22)", EB2],
                [B0 + 910 + i * 55, "scaleY(1)"],
              ],
              331 - h,
              331
            ),
            opacity: keepOp(331 - h, 331),
          },
          "swa-b swa-bar",
          bx(264 + i * 14, 331 - h, 9, h, { borderRadius: `${cq(1.6)} ${cq(1.6)} 0 0` })
        )}
      />
    )
  );
  const TREND: Pt[] = [
    [268.5, 314],
    [282.5, 307],
    [296.5, 311],
    [310.5, 299],
    [324.5, 288],
  ];
  const trendLen = TREND.slice(1).reduce((acc, p, i) => acc + Math.hypot(p[0] - TREND[i][0], p[1] - TREND[i][1]), 0);
  let tacc = 0;
  TREND.slice(1).forEach((p, i) => {
    const a = TREND[i];
    const len = Math.hypot(p[0] - a[0], p[1] - a[1]);
    const ang = n1((Math.atan2(p[1] - a[1], p[0] - a[0]) * 180) / Math.PI);
    const ta = B0 + 640 + (tacc / trendLen) * 460;
    tacc += len;
    const tb = B0 + 640 + (tacc / trendLen) * 460;
    site.push(
      <i
        key={`tr${i}`}
        {...A(
          {
            transform: withReset([[0, `rotate(${ang}deg) scaleX(0)`], [ta, `rotate(${ang}deg) scaleX(0)`], [tb, `rotate(${ang}deg) scaleX(1)`]], 288, 314),
            opacity: keepOp(288, 314),
          },
          "swa-b swa-seg",
          { ...bx(a[0], a[1] - 0.75, len + 0.8, 1.5), transform: `rotate(${ang}deg)` }
        )}
      />
    );
  });
  site.push(
    <i key="tdot" {...A(pop(B0 + 1080, 288), "swa-b", bx(321.9, 285.4, 5.2, 5.2, { borderRadius: "50%", background: "#c8f02e" }))} />,
    <i
      key="c3hit"
      {...A({ opacity: [[0, "0"], [B0 + 450, "0"], [B0 + 500, "1"], [B0 + 1100, "0"]] }, "swa-b swa-hit", bx(CARDS_X[2], CARD_Y, CARD_W, CARD_H, { borderRadius: cq(10) }))}
    />
  );
  // CTA outline: the pill is traced, then disappears under the forged fill
  const ctaSegs = outlineSegs(HX, CTA_Y, C.w, CTA_H, CTA_H / 2, 1.4, () => "#c8f02e").filter((g) => g.len > 0.01);
  segTimes(ctaSegs, A0, A1).forEach(([ta, tb], j) => site.push(segEl(`xo${j}`, ctaSegs[j], ta, tb, A1 + 200, A1 + 500)));

  /* ═════════ HTML: text & ui ═════════ */
  const html: ReactNode[] = [];

  // URL bar (scanned) + text
  html.push(
    <div
      key="url"
      {...A(
        { transform: withReset([[0, "scaleX(0)"], [U0, "scaleX(0)"], [U1, "scaleX(1)"]], 50, 62), opacity: keepOp(50, 62) },
        "swa-url",
        { left: cq(98), top: cq(50), width: cq(150), height: cq(12) }
      )}
    />
  );
  const URL = "vortx.lu";
  const urlFs = 6.6;
  const urlX = 113;
  html.push(
    <div key="urlt" className="swa-urlt swa-m" style={{ left: cq(104), top: cq(50), height: cq(12), fontSize: cq(urlFs) }}>
      <svg viewBox="0 0 10 12" {...A(pop(U0 + 30, 50, 62), "", { width: cq(4.2), height: cq(5.2), flex: "none" })}>
        <path d="M2.5 5V3.6a2.5 2.5 0 0 1 5 0V5" fill="none" stroke="#14e0c8" strokeWidth={1.4} />
        <rect x={1} y={5} width={8} height={6.4} rx={1.5} fill="#14e0c8" />
      </svg>
      <span
        {...A(
          {
            opacity: life(U0 + ((urlX - 98) / 150) * (U1 - U0), (U1 - U0) * 0.55, 50, 62),
            transform: withReset([[0, "translateX(-.6em)"], [U0 + 30, "translateX(-.6em)", EO], [U1 + 60, "translateX(0em)"]], 50, 62),
          },
          "swa-ib"
        )}
      >
        {URL}
      </span>
    </div>
  );
  // LIVE badge (switches on at the payoff)
  html.push(
    <div
      key="live"
      {...A(pop(B0 + 760, 50, 62, ".4", 420), "swa-live swa-m", {
        left: cq(300),
        top: cq(50),
        width: cq(44),
        height: cq(12),
        fontSize: cq(6.2),
      })}
    >
      <i className="swa-ld">
        <i className="swa-pg" />
      </i>
      LIVE
    </div>
  );
  // nav: logo stamps, links + button pop as the beam scans right → left
  const navT = (x: number) => N0 + ((342 - x) / (342 - HX)) * (N1 - N0);
  html.push(
    <div key="logo" className="swa-logo swa-j" style={{ left: cq(HX), top: cq(74.6), fontSize: cq(11) }}>
      <span {...A(pop(N1 - 40, 74, 86, "1.8", 360), "swa-ib")}>
        Vor<b>TX</b>
        <span className="swa-hot swa-a" style={{ animationName: sh.kf({ opacity: [[0, "0"], [N1 - 43, "0"], [N1 - 40, "1"], [N1 + 80, "1"], [N1 + 520, "0"]] }) }}>
          VorTX
        </span>
      </span>
    </div>
  );
  [
    [222, 22],
    [252, 22],
    [282, 18],
  ].forEach(([x, w], i) =>
    html.push(
      <div
        key={`nl${i}`}
        {...A(
          {
            transform: withReset([[0, "scaleX(0)"], [navT(x + w), "scaleX(0)", EO], [navT(x + w) + 260, "scaleX(1)"]], 78, 81),
            opacity: keepOp(78, 81),
          },
          "swa-pill",
          { left: cq(x), top: cq(78.4), width: cq(w), height: cq(3.2), background: "rgba(242,243,238,.3)", transformOrigin: "100% 50%" }
        )}
      />
    )
  );
  html.push(<div key="nb" {...A(pop(navT(326), 74, 86, "0", 420), "swa-nb", { left: cq(310), top: cq(74), width: cq(32), height: cq(12) })} />);

  // eyebrow, typed word by word under the beam
  const EBW = ["NEXT.JS", "·", "SEO", "·", "UX"];
  const ebFs = 6.6;
  let ebx = HX;
  html.push(
    <div key="eb" className="swa-eb swa-m" style={{ left: cq(HX), top: cq(102.4), fontSize: cq(ebFs) }}>
      {EBW.map((w, i) => {
        const tIn = Y0 + ((ebx - HX) / EB_W) * (Y1 - Y0);
        ebx += (w.length + 1) * (0.6 + 0.16) * ebFs;
        return (
          <Fragment key={i}>
            {i > 0 && " "}
            <span {...A({ opacity: life(tIn, 40, 102, 110), transform: withReset([[0, "translateY(.5em)"], [tIn, "translateY(.5em)", EB], [tIn + 260, "translateY(0)"]], 102, 110) }, "swa-ib")}>
              {w}
            </span>
          </Fragment>
        );
      })}
    </div>
  );

  // HEADLINE: laser-etched glyph by glyph
  const R = 13420; // letters reset after every line is swept
  const nLast = H.lines[H.lines.length - 1].words.reduce((a, w) => a + w.glyphs.length, 0);
  const SH0 = Math.max(10450, B0 + 160 + nLast * 42 + 520); // shimmer pass during the hold
  html.push(
    <div key="h" className="swa-h swa-j" style={{ left: cq(HX), top: cq(H.top), fontSize: cq(H.fs) }}>
      {H.lines.map((ln, k) => {
        const tsw = sw(ln.y);
        const lastLine = k === H.lines.length - 1;
        let waveI = 0;
        return (
          <div key={k} {...A({ opacity: [[0, "1"], [tsw, "1"], [tsw + 150, "0"], [T - 30, "0"], [T, "1"]] }, "swa-hl")}>
            {ln.words.map((wd, j) => {
              const lastG = wd.glyphs[wd.glyphs.length - 1];
              const ts = etchAt(k, lastG.x) + 140;
              return (
                <Fragment key={j}>
                  {j > 0 && " "}
                  <span
                    {...A(
                      {
                        transform: [
                          [0, "skewX(-14deg) scale(1)"],
                          [ts, "skewX(-14deg) scale(1)", EO],
                          [ts + 120, "skewX(6deg) scale(1.05)", "ease-in-out"],
                          [ts + 250, "skewX(-2.5deg) scale(.99)", "ease-in-out"],
                          [ts + 400, "skewX(0deg) scale(1)"],
                          [R, "skewX(0deg) scale(1)"],
                          [R + 6, "skewX(-14deg) scale(1)"],
                        ],
                      },
                      `swa-w${wd.acc ? " swa-acc" : ""}`
                    )}
                  >
                    {wd.glyphs.map((g, i) => {
                      const tb = etchAt(k, g.x);
                      const wv = B0 + 160 + waveI++ * 42;
                      // % of the glyph box (≈ em) keeps the animated style free of font-relative units
                      const HOT = "translateY(-19%) scale(1.55)";
                      const REST = "translateY(0%) scale(1)";
                      const tf: Stop[] = [
                        [0, HOT],
                        [tb, HOT, EO],
                        [tb + 190, REST],
                      ];
                      const hot: Stop[] = [
                        [0, "0"],
                        [tb - 4, "0"],
                        [tb, "1"],
                        [tb + 130, "1"],
                        [tb + 560, "0"],
                      ];
                      if (lastLine) {
                        tf.push([wv, REST, "ease-out"], [wv + 120, "translateY(-19%) scale(1.08)", "ease-in-out"], [wv + 330, REST]);
                        hot.push([wv, "0"], [wv + 90, ".8"], [wv + 420, "0"]);
                      }
                      tf.push([R, REST], [R + 6, HOT]);
                      const tS = SH0 + (g.x - HX) * 1.5 + k * 70;
                      hot.push([tS - 4, "0"], [tS + 110, ".5"], [tS + 400, "0"], [tsw - 50, "0"], [tsw, ".9"], [tsw + 150, "0"]);
                      return (
                        <span
                          key={i}
                          {...A(
                            {
                              opacity: [
                                [0, "0"],
                                [tb - 4, "0"],
                                [tb, "1"],
                                [R, "1"],
                                [R + 6, "0"],
                              ],
                              transform: tf,
                            },
                            "swa-c"
                          )}
                        >
                          {g.ch}
                          <span {...A({ opacity: hot }, "swa-hc")}>{g.ch}</span>
                        </span>
                      );
                    })}
                  </span>
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  // tagline skeleton, rastered
  [
    [195, TAG[0], g1, g1e, ".26"],
    [204, TAG[1], g2, g2e, ".15"],
  ].forEach(([y, w, a, b, o], i) =>
    html.push(
      <div
        key={`tg${i}`}
        {...A(
          {
            transform: withReset([[0, "scaleX(0)"], [Number(a), "scaleX(0)"], [Number(b), "scaleX(1)"]], Number(y) - 2, Number(y) + 2),
            opacity: keepOp(Number(y) - 2, Number(y) + 2),
          },
          "swa-pill",
          {
            left: cq(HX),
            top: cq(Number(y) - 2),
            width: cq(Number(w)),
            height: cq(4),
            background: `rgba(242,243,238,${o})`,
            transformOrigin: "0 50%",
          }
        )}
      />
    )
  );

  // CTA: forged pill, hot → lime, label rises letter by letter
  const ctaCx = HX + C.w / 2;
  const ctaCy = CTA_Y + CTA_H / 2;
  const ctaOut = outW(CTA_Y, CTA_Y + CTA_H);
  const labelT0 = A1 + 140;
  let li = 0;
  html.push(
    <div
      key="cta"
      {...A(
        {
          opacity: [[0, "0"], [A1 - 4, "0"], [A1, "1"], [ctaOut[0], "1"], [ctaOut[1], "0"]],
          transform: withReset(
            [
              [0, "scale(1)"],
              [A1 + 600, "scale(1)", "ease-out"],
              [A1 + 720, "scale(1.07)", "ease-in-out"],
              [A1 + 900, "scale(1)"],
              [QC - 90, "scale(1)", "ease-out"],
              [QC, "scale(.93)", EB],
              [QC + 330, "scale(1)"],
            ],
            CTA_Y,
            CTA_Y + CTA_H
          ),
        },
        "swa-cta",
        { left: cq(HX), top: cq(CTA_Y), width: cq(C.w), height: cq(CTA_H), paddingLeft: cq(C.PADL), fontSize: cq(C.fs) }
      )}
    >
      <span className="swa-cpr swa-a" style={{ animationName: sh.kf({ opacity: [[0, "0"], ...[A1 + 620, B0 + 1500, B0 + 2700].flatMap((p): Stop[] => [[p - 6, "0"], [p, ".9"], [p + 900, "0"]])], transform: [[0, "scale(1)"], ...[A1 + 620, B0 + 1500, B0 + 2700].flatMap((p): Stop[] => [[p, "scale(1)", EO], [p + 900, "scale(1.16,1.6)"], [p + 906, "scale(1)"]])] }) }} />
      <span className="swa-ctl">
        {[...C.label].map((ch, i) => {
          if (ch === " ") return " ";
          const tl0 = labelT0 + li++ * 24;
          return (
            <span key={i} {...A({ transform: withReset([[0, "translateY(115%)"], [tl0, "translateY(115%)", EB2], [tl0 + 340, "translateY(0%)"]], CTA_Y, CTA_Y + CTA_H) })}>
              {ch}
            </span>
          );
        })}
      </span>
      <span
        {...A(
          {
            opacity: [[0, "0"], [labelT0 + li * 24 + 40, "0"], [labelT0 + li * 24 + 120, "1"]],
            transform: withReset([[0, "translateX(-60%)"], [labelT0 + li * 24 + 40, "translateX(-60%)", EB], [labelT0 + li * 24 + 400, "translateX(0%)"]], CTA_Y, CTA_Y + CTA_H),
          },
          "swa-car",
          { width: cq(C.ARW), height: cq(C.ARW), marginLeft: cq(C.GAP) }
        )}
      >
        <svg viewBox="0 0 12 12">
          <path d="M1.5 6h8.2M6.2 2.4 9.8 6l-3.6 3.6" fill="none" stroke="#0a0a0b" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="swa-cho swa-a" style={{ animationName: sh.kf({ opacity: [[0, "0"], [Q1 - 120, "0"], [Q1 + 40, "1"], [QC + 60, "1"], [QC + 500, "0"]] }) }} />
      <span className="swa-cth swa-a" style={{ animationName: sh.kf({ opacity: [[0, "0"], [A1 - 4, "0"], [A1, "1"], [A1 + 60, "1"], [A1 + 400, "0"], [ctaOut[0] - 30, "0"], [ctaOut[0], ".8"], [ctaOut[1], "0"]] }) }} />
    </div>
  );

  // card texts: 100 / SEO / +38 % odometer
  html.push(
    <div key="100" className="swa-t swa-m" style={{ left: cq(200), top: cq(293), fontSize: cq(9.5), fontWeight: 800, transform: "translate(-50%,-50%)" }}>
      <span {...A(pop(K1 + 560, 288, 298, ".3", 420), "swa-ib")}>100</span>
    </div>
  );
  html.push(
    <div
      key="seo"
      className="swa-t swa-m"
      style={{ left: cq(200), top: cq(321.5), fontSize: cq(6.4), letterSpacing: ".14em", color: "rgba(242,243,238,.6)", fontWeight: 700, transform: "translateX(-50%)", paddingLeft: ".14em" }}
    >
      <span {...A({ opacity: life(K1 + 640, 260, 322, 330) }, "swa-ib")}>SEO</span>
    </div>
  );
  // ping on the chart end point while the site holds
  html.push(
    <i key="tping" {...A({ opacity: life(B0 + 1150, 60, 284, 292) }, "swa-tp", { left: cq(324.5), top: cq(288) })}>
      <i className="swa-pg" />
    </i>
  );
  const odoIn = B0 + 440;
  html.push(
    <div
      key="odo"
      {...A(
        {
          opacity: life(odoIn, 120, 265, 278),
          transform: withReset([[0, "translateY(.6em)"], [odoIn, "translateY(.6em)", EB], [odoIn + 420, "translateY(0em)"]], 265, 278),
        },
        "swa-odo swa-m",
        { left: cq(262), top: cq(266), fontSize: cq(11.5) }
      )}
    >
      +
      <span className="swa-reel">
        <span {...A({ transform: withReset([[0, "translateY(0em)"], [odoIn, "translateY(0em)", EO], [odoIn + 700, "translateY(-3em)"]], 265, 278) }, "", { transform: "translateY(-3em)" })}>
          {[0, 1, 2, 3].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </span>
      </span>
      <span className="swa-reel">
        <span {...A({ transform: withReset([[0, "translateY(0em)"], [odoIn, "translateY(0em)", EO], [odoIn + 1000, "translateY(-18em)"]], 265, 278) }, "", { transform: "translateY(-18em)" })}>
          {Array.from({ length: 19 }, (_, d) => (
            <span key={d}>{d % 10}</span>
          ))}
        </span>
      </span>
      {" %"}
    </div>
  );

  /* ═════════ FX: beams, curtain, welds, emitters, burst, cursor ═════════ */
  const fxs: ReactNode[] = [];
  // sweep curtain
  fxs.push(
    <div
      key="cu"
      {...A(
        {
          transform: [
            [0, `translateY(${cq(SY0)})`],
            [S0, `translateY(${cq(SY0)})`],
            [S1, `translateY(${cq(SY1)})`],
          ],
          opacity: [[0, "0"], [S0 - 60, "0"], [S0, "1"], [S0 + 30, ".55"], [S0 + 60, "1"], [S1, "1"], [S1 + 80, "0"]],
        },
        "swa-cu"
      )}
    >
      <i className="swa-cua" />
      {[0.22, 0.5, 0.78].map((x, i) => (
        <i key={i} className="swa-cs" style={{ left: `${x * 100}%` }}>
          <i className={`swa-sk swa-sk${(i * 2) % 6}`} />
          <i className={`swa-sk swa-sk${(i * 2 + 3) % 6}`} />
        </i>
      ))}
    </div>
  );
  // corner weld flashes where the four edges meet
  winP.forEach((p, i) => fxs.push(flash(`cf${i}`, p.end, F1 - 10, 430, ".4", "1.7")));
  // spot-weld flashes on the window dots + logo
  [...DOTS.map((d, i): [Pt, number] => [d, DOT_T[i]]), [[74, 80] as Pt, N1 - 40] as [Pt, number]].forEach(([p, tt], i) =>
    fxs.push(flash(`sf${i}`, p, tt - 10, 270, ".3", "1.1"))
  );
  // emitters (+ muzzle flare while firing)
  emitters.forEach((m, k) => {
    const fl: Stop[] = [[0, "0"]];
    const ons: [number, number][] = beamOn[k].map((o) => [o.a, o.b]);
    if (k === 0 || k === 3) ons.push([S0, S1]);
    for (const [a, b] of ons) {
      // first strike: the emitters visibly charge up before firing (anticipation)
      if (a === F0) fl.push([a - 230, "0"], [a - 14, ".8"], [a, "1"]);
      else fl.push([a - 40, "0"], [a, "1"]);
      fl.push([a + 120, ".7"], [b, ".7"], [b + 140, "0"]);
    }
    fl.push([B0 - 20, "0"], [B0 + 40, "1"], [B0 + 420, "0"]);
    fxs.push(
      <div
        key={`em${k}`}
        {...A({ transform: nTrack(emStops[k]) }, `swa-em swa-e${k}`, { transform: tl(E[k](0)) })}
      >
        <div {...A(beamTracks(k), `swa-bm swa-b${k}`)}>
          <i className="swa-bp" />
        </div>
        <i className="swa-eg" />
        <i className="swa-er" />
        <i {...A({ opacity: fl }, "swa-ef")} />
      </div>
    );
  });
  // welds with spark sprays
  const burns: [number, number][][] = [
    [
      [F0, F1],
      [C0, C1],
      [K0, K1],
      [A0, A1],
    ],
    [
      [F0, F1],
      [K0, K1],
    ],
    [
      [F0, F1],
      [K0, K1],
    ],
    [[F0, F1]],
  ];
  /** Hot trail: a streak pointing back along the weld's displayed motion. */
  const trailTracks = (m: Mover, spans: [number, number][]): Tracks => {
    const W = Wd(m);
    const dir = (tt: number) => {
      const p = W(tt - 4);
      const q = W(tt + 4);
      return (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI + 180;
    };
    const tf: Stop[] = [];
    const op: Stop[] = [[0, "0"]];
    for (const [a, b] of spans) {
      const N = Math.max(2, Math.ceil((b - a) / 4));
      const ref: number[] = [];
      for (let i = 0; i <= N; i++) {
        const th = dir(a + 6 + ((b - a - 12) * i) / N);
        ref.push(i ? ref[i - 1] + wrap180(th - ref[i - 1]) : th);
      }
      const g = (tt: number) => {
        const i = Math.min(N, Math.max(0, Math.round(((tt - a - 6) / (b - a - 12)) * N)));
        return [ref[i] + wrap180(dir(Math.min(Math.max(tt, a + 6), b - 6)) - ref[i])];
      };
      const brk = (weldStops.get(m) ?? []).map((q) => q.t);
      for (const tt of sampleTimes(g, a, b, (x, y) => Math.abs(x[0] - y[0]), 4, brk)) tf.push([tt, `rotate(${Math.round(g(tt)[0])}deg)`]);
      op.push([a, "0"], [a + 50, "1"], [b, "1"], [b + 170, "0"]);
    }
    return { transform: tf, opacity: op };
  };
  weldSpans.forEach(([m, spans], k) =>
    fxs.push(
      <div key={`wd${k}`} {...A(weldTracks(m, spans), "swa-wd")}>
        <i className="swa-wg" />
        {k === 0 && <i className="swa-wf" />}
        <i {...A(trailTracks(m, burns[k]), "swa-trl")} />
        {(k === 0 ? SPARKS.map((_, i) => i) : [k, k + 2]).map((i) => (
          <i key={i} className={`swa-sk swa-sk${i}`} />
        ))}
      </div>
    )
  );
  // click burst: circular shockwave + two pill ripples + sparks
  fxs.push(
    <i
      key="rg"
      {...A(
        {
          opacity: [[0, "0"], [B0 - 10, "0"], [B0, "1"], [B0 + 560, "0"]],
          transform: [[0, "scale(.2)"], [B0, "scale(.2)", EO], [B0 + 560, "scale(2.7)"]],
        },
        "swa-rg",
        { left: cq(ctaCx), top: cq(ctaCy), boxShadow: `0 0 0 .45cqw rgba(${RGB.lime},.9),0 0 2.4cqw rgba(${RGB.lime},.5)` }
      )}
    />
  );
  [
    [20, RGB.lime],
    [150, RGB.cyan],
  ].forEach(([dt, col], i) =>
    fxs.push(
      <i
        key={`pr${i}`}
        {...A(
          {
            opacity: [[0, "0"], [B0 + Number(dt) - 10, "0"], [B0 + Number(dt), ".95"], [B0 + Number(dt) + 640, "0"]],
            transform: [[0, "scale(1)"], [B0 + Number(dt), "scale(1)", EO], [B0 + Number(dt) + 640, `scale(${n3(1 + 44 / C.w)},2.5)`]],
          },
          "swa-pr",
          { left: cq(HX), top: cq(CTA_Y), width: cq(C.w), height: cq(CTA_H), boxShadow: `0 0 0 .4cqw rgba(${col},.85)` }
        )}
      />
    )
  );
  for (let i = 0; i < 8; i++) {
    const a = ((i * 45 + 12) * Math.PI) / 180;
    const d = 34 + (i % 3) * 10;
    fxs.push(
      <i
        key={`pt${i}`}
        {...A(
          {
            opacity: [[0, "0"], [B0 - 10, "0"], [B0, "1"], [B0 + 300, ".8"], [B0 + 520, "0"]],
            transform: [
              [0, "translate(0cqw,0cqw) scale(1)"],
              [B0, "translate(0cqw,0cqw) scale(1)", EO],
              [B0 + 520, `${tl([Math.cos(a) * d * 1.5, Math.sin(a) * d])} scale(.4)`],
            ],
          },
          "swa-pt",
          { left: cq(ctaCx), top: cq(ctaCy) }
        )}
      />
    );
  }
  // conversions: three comets arc from the CTA into the chart, each one kicks the bars
  const chartHit: Pt[] = [
    [296.5, 312],
    [310.5, 300],
    [324.5, 290],
  ];
  chartHit.forEach((p2, i) => {
    const t0 = B0 + 50 + i * 80;
    const t1 = t0 + 420;
    const p0: Pt = [HX + C.w - 16, ctaCy - 2];
    const pc: Pt = [Math.max(p0[0] + 50, 250), 190 + i * 6];
    const at = (tt: number) => {
      const u = ioS(Math.min(Math.max((tt - t0) / (t1 - t0), 0), 1));
      const x = (1 - u) * (1 - u) * p0[0] + 2 * u * (1 - u) * pc[0] + u * u * p2[0];
      const y = (1 - u) * (1 - u) * p0[1] + 2 * u * (1 - u) * pc[1] + u * u * p2[1];
      const dx = 2 * (1 - u) * (pc[0] - p0[0]) + 2 * u * (p2[0] - pc[0]);
      const dy = 2 * (1 - u) * (pc[1] - p0[1]) + 2 * u * (p2[1] - pc[1]);
      return [x, y, (Math.atan2(dy, dx) * 180) / Math.PI];
    };
    const st: Stop[] = sampleTimes(at, t0, t1, (x, y) => Math.max(dist2(x, y), Math.abs(x[2] - y[2]) * 0.25), 1, []).map((tt) => {
      const q = at(tt);
      return [tt, `translate(${cq1(q[0])},${cq1(q[1])}) rotate(${Math.round(q[2])}deg)`];
    });
    fxs.push(
      <i key={`dc${i}`} {...A({ opacity: [[0, "0"], [t0 - 10, "0"], [t0 + 40, "1"], [t1 - 30, "1"], [t1 + 20, "0"]], transform: st }, "swa-dc")}>
        <i className="swa-dch" />
      </i>,
      i === 0 ? flash("dh", p2, t1 - 10, 310, ".3", "1.4") : null
    );
  });

  // cursor
  const cur0: Pt = [372, 376];
  const curT: Pt = [HX + Math.min(C.w * 0.62, C.w - 26), ctaCy + 1];
  const curC: Pt = [330, 262];
  const curAt = (tt: number): Pt => {
    const u = ioC(Math.min(Math.max((tt - Q0) / (Q1 - Q0), 0), 1));
    return [
      (1 - u) * (1 - u) * cur0[0] + 2 * u * (1 - u) * curC[0] + u * u * curT[0],
      (1 - u) * (1 - u) * cur0[1] + 2 * u * (1 - u) * curC[1] + u * u * curT[1],
    ];
  };
  const curStops = moveTrack(curAt, [[Q0 - 80, Q1]], [], 0.5);
  const ctr = tr(curT);
  const curOut: Pt = [curT[0] + 10, curT[1] + 22];
  fxs.push(
    <div
      key="cur"
      {...A(
        {
          opacity: [[0, "0"], [Q0 - 60, "0"], [Q0 + 140, "1"], [B0 + 1150, "1"], [B0 + 1450, "0"]],
          transform: [
            ...curStops.map(([t0, v0, e0]): Stop => [t0, `${v0} scale(1)`, e0]),
            [QC - 90, `${tl(curT)} scale(1)`, "ease-in"],
            [QC, `${tl(curT)} scale(.8)`, EB],
            [QC + 200, `${tl(curT)} scale(1)`],
            [B0 + 1000, `${tl(curT)} scale(1)`, "ease-in-out"],
            [B0 + 1450, `${tl(curOut)} scale(1)`],
          ],
        },
        "swa-cur"
      )}
    >
      <svg viewBox="0 0 24 24">
        <path d="M3 2v17.2l4.6-4.3 2.9 6.6 3.3-1.4-2.9-6.5h6.4Z" fill="#f2f3ee" stroke="#06060a" strokeWidth={1.3} strokeLinejoin="round" />
      </svg>
    </div>,
    <i
      key="cfx"
      {...A(
        {
          opacity: [[0, "0"], [QC - 10, "0"], [QC, "1"], [QC + 380, "0"]],
          transform: [[0, `${ctr} scale(.3)`], [QC, `${ctr} scale(.3)`, EO], [QC + 380, `${ctr} scale(1.5)`]],
        },
        "swa-cfx"
      )}
    />
  );

  /* ═════════ assemble ═════════ */
  const nodes = (
    <>
      {/* static laser bed: dot grid + rail (never animated) */}
      <svg className="swa-sv" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="swa-pd" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r=".8" fill="#fff" fillOpacity=".08" />
          </pattern>
        </defs>
        <rect x={14} y={14} width={372} height={372} rx={26} fill="url(#swa-pd)" />
        <path d={RAIL.d} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={1} />
        <path d={RAIL.d} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth={3} strokeDasharray="1 11" />
      </svg>
      <div className="swa-L">{site}</div>
      <div className="swa-L">{html}</div>
      <div className="swa-L">{fxs}</div>
    </>
  );
  return { css: sh.css, nodes };
}

const cache = new Map<string, ReturnType<typeof build>>();
function getBuild(title: string, tagline: string, cta: string) {
  const key = `${title}\u0001${tagline}\u0001${cta}`;
  let b = cache.get(key);
  if (!b) {
    b = build(title, tagline, cta);
    cache.set(key, b);
  }
  return b;
}

export default function SitesWebMotionA({ className, title, tagline, cta }: SitesWebMotionProps) {
  const b = getBuild(
    title ?? "Sites web qui convertissent",
    tagline ?? "Des sites rapides, pensés pour transformer le visiteur en client.",
    cta ?? "Réserver un appel"
  );
  return (
    <div className={`swa illu-motion${className ? ` ${className}` : ""}`} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      {b.nodes}
    </div>
  );
}
