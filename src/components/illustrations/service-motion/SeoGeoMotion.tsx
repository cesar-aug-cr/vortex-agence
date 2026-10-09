import { Fragment, type CSSProperties } from "react";
import {
  anim,
  BACK,
  BACK2,
  begin,
  COOL,
  ease,
  end,
  f,
  hash,
  IN,
  IO,
  IOS,
  kf,
  OUT,
  pool,
  STEP,
  T,
  type Frame,
  type Key,
  type PoolEvent,
  type Stop,
} from "../sites-web-motion/anim";
import { AH, AW, AX, AY, HX, layout, LINE, MONO_ADV, PH, PUNCT, PUNCT_PULL, PW, PX, PY, QX, SPACE_EM, TLS, type Group, type Layout } from "./SeoGeoMotion.layout";
import { ScrollPause } from "./ScrollPause";
import type { ServiceMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  "RANK & CITE" — hero motion graphic of /services/seo-geo
 * ─────────────────────────────────────────────────────────────────────────────
 *  Same family as the Sites web laser show (sites-web-motion): dark stage,
 *  dashed rail with four laser heads (lime left, cyan + green top, blue
 *  right) that glide, charge and fire; white-hot beams, flares, spark sprays,
 *  kinetic type slams. One master loop, T = 14 s; every beat is a keyframe
 *  percentage of T: no animation-delay, no fill-mode, no secondary loop.
 *
 *  Story: a search results page is BUILT by lasers, the client's result
 *  (vortx.lu) is found at #8 and blasted up to #1; then an AI answer panel
 *  opens, reads the results, writes its answer and CITES the client. The
 *  tagline is the headline, in two beats: "Visible sur Google." (beat 1, on
 *  the #1) / "Cité par les IA." (beat 2, the lime climax, on the citation).
 *
 *  0.22–0.90  SEARCH FORGE. Two weld tips (tracked by the two top heads) trace
 *             the search pill from its left end and collide on the right:
 *             collision bloom, sparks, micro-shake; the pill pops in.
 *  1.00–1.60  The query (the service title) types in, caret; ENTER pulse.
 *  1.64–2.42  PRINTHEAD (cyan scanner line) drops and prints the results page
 *             (glass card, ranks 1–8, eight results; vortx.lu is the last).
 *  2.48       LOCK: the scanner's brackets and a cyan "#8" tag snap onto
 *             vortx.lu.
 *  2.88–4.02  CLIMB in three laser kicks: lime from the left (8 → 5), blue
 *             from the right (5 → 2), both together (2 → 1). Each kick
 *             stretches the result up; the results it overtakes are knocked
 *             down one slot (kinetic re-ordering).
 *  4.02       #1: slam, flash, shake, sparks; "#1" badge, lime frame, "↑7".
 *  4.12–4.70  HEADLINE BEAT 1: "Visible sur Google." slams in word group by
 *             word group, each shot by a rail head (stretch → squash → rebound
 *             in a white-hot bloom).
 *  4.95–5.45  The results page slides left (camera move) to make room.
 *  5.52–6.18  AI PANEL: the green and blue heads converge on its centre; it
 *             opens like a hologram (white-hot point → line → panel) and cools.
 *  6.25–7.12  The AI READS: its spark spins, a cyan searchlight cone sweeps the
 *             results down and back up and locks on the #1.
 *  7.08–8.04  The answer streams in, line by line (the service bullets, each
 *             with a citation marker), behind a lime caret.
 *  8.08–8.46  CITATION: a comet leaves the #1 result and lands in the answer's
 *             source chip, which ignites white-hot → lime ("vortx.lu").
 *  8.71–9.40  HEADLINE BEAT 2 (climax): "Cité par les IA." — all four heads
 *             fire, flash, camera shake, white-hot copy + chromatic ghost,
 *             laser underline.
 *  9.25–12.2  HOLD: the #1 badge and the cited chip pulse together (heartbeat),
 *             headline wave + chromatic echo, both cards tilt in 3D.
 *  12.25–13.5 ERASE: the AI panel collapses back into a point; the scanner
 *             sweeps up from the bottom and the page, the pill and the
 *             headline vanish under it; the heads glide home. Seam: empty.
 *
 *  Performance (same rules as the Sites web scene): only transform / opacity
 *  animate, on HTML boxes; SVG is static art. One-shot effects (flares, spark
 *  sprays, the comet) are POOLED sprites. The page is ONE printed layer
 *  revealed by a clip window that follows the scanner (counter-translated
 *  pair); the pill outline grows (scaleX) behind its weld tips; the
 *  re-ordering moves the client row + three knocked-down GROUPS of rows (one
 *  leap each), never single rows; inside each card, static content paints
 *  before the animated layers (the answer's streaming covers ride an invisible
 *  copy of the answer). 47 running animations.
 *  The root is z-index:20, not 1: this page's process icons and footer hold
 *  z-index:10 elements, which would otherwise paint AFTER the scene and be
 *  overlap-tested against its ~50 animated layers on every main frame
 *  (measured: Layerize 10 → 5 ms per frame at 4× CPU). 20 stays below the
 *  fixed header (50) and the fixed bars (30, 40). Content-visibility skips the
 *  scene off-screen and <ScrollPause> freezes it while the page scrolls.
 *  Measured on a 390 px phone at 4× CPU, against the page without the scene:
 *  ≈ +13 ms per forced main frame (+9 … +16, noisy), idle and off-screen ≈ 0.
 *
 *  Reduced motion: every animation collapses, the un-animated base styles ARE
 *  the poster: headline, #1 result, AI answer with its lit citation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

type Pt = [number, number];
const eIO = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);
const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 3): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * (i + 1)) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });
const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const plen = (p: Pt[]) => p.reduce((s, q, i) => (i ? s + dist(p[i - 1], q) : 0), 0);
function pat(p: Pt[], d: number): Pt {
  for (let i = 1; i < p.length; i++) {
    const l = dist(p[i - 1], p[i]);
    if (d <= l || i === p.length - 1) {
      const u = l ? Math.max(0, Math.min(1, d / l)) : 0;
      return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * u, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * u];
    }
    d -= l;
  }
  return p[p.length - 1];
}
const lerp = (a: Pt, b: Pt, u: number): Pt => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
const angle = (a: Pt, b: Pt) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
/** viewBox units → % of the (square) root */
const P = (u: number) => `${f(u / 4, 3)}%`;
/** viewBox units → cqw (sizes) */
const cq = (u: number) => `${f(u / 4, 3)}cqw`;

// rail heads ride a dashed rail inset RI from the panel edge
const RI = 11;
const RHI = 400 - RI;

// results page card (final position; during the first beats it sits OFF
// units further right, centred, and slides left when the AI panel opens)
const SX = 24;
const SY = 104;
const SW = 228;
const SH = 268;
const OFF = 62;
const RY0 = 142; // top of rank 1
const PITCH = 28;
const RH = 24;
const RX = 47; // results column
const RW = 192;
const NUM_CX = 36; // rank number column
const slotY = (i: number) => RY0 + (i - 1) * PITCH;
const slotC = (i: number) => slotY(i) + RH / 2;
/** a point of the results page, while it is still centred (beats before the slide) */
const ph1 = (p: Pt): Pt => [p[0] + OFF, p[1]];
/** the other results (index = original rank − 1): url / title / snippet skeleton widths, favicon tint */
const OTHERS: { u: number; t: number; s: number; c: string }[] = [
  { u: 44, t: 128, s: 160, c: "blue" },
  { u: 36, t: 108, s: 148, c: "cyan" },
  { u: 52, t: 138, s: 128, c: "green" },
  { u: 32, t: 94, s: 156, c: "blue" },
  { u: 46, t: 120, s: 138, c: "cyan" },
  { u: 40, t: 102, s: 150, c: "green" },
  { u: 48, t: 114, s: 124, c: "blue" },
];
/** the client climbs 8 → 5 → 2 → 1; each leap knocks these original ranks down one slot */
const LEAP_SLOTS = [8, 5, 2, 1];
const KNOCK = [[5, 6, 7], [2, 3, 4], [1]];
// client row box (a little larger than its content)
const CRX = RX - 5;
const CRW = RW + 8;
const CRP = 3;

// AI card anchors (the card itself: layout.ts)
const SPK: Pt = [AX + 17, AY + 16];
const CHIP_W = 50;
const CHIP_Y = AH - 56; // local top of the sources row
const CHIP: Pt = [AX + 12 + CHIP_W / 2, AY + CHIP_Y + 7.5];
const AI_C: Pt = [AX + AW / 2, AY + AH / 2];
const CONE_L = 280;
const CONE_HALF = 7.5; // degrees
const CONE_H = CONE_L * Math.tan((CONE_HALF * Math.PI) / 180);

// the scanner line: prints the page going down, erases everything going up
const PH_Y0 = SY - 6;
const PH_Y1 = SY + SH + 8;
const ER_Y1 = 6;

const HEADS = [
  { id: "hL", c: "lime", home: [RI, 300] as Pt },
  { id: "hT", c: "cyan", home: [130, RI] as Pt },
  { id: "hU", c: "green", home: [270, RI] as Pt },
  { id: "hR", c: "blue", home: [RHI, 300] as Pt },
];
const [HL, HT, HU, HR] = [0, 1, 2, 3];

/* ───────────────────────────── master beats (ms) ─────────────────────────── */

const FG_A = 220; // pill forge: weld tips trace the outline
const FG_Z = 900;
const TYPE_A = 1000;
const TYPE_Z = 1520;
const ENTER = 1600;
const PH_ON = 1640;
const PH_A = PH_ON + 80;
const PH_Z = 2420;
const LOCK = 2480;
const LEAP = [2880, 3330, 3780]; // the kick beams land
const ARRIVE = LEAP[2] + 240;
const SLOT1 = [4230, 4430, 4630]; // beat-1 word groups (right-aligned onto the last slots)
const PRE = 110; // beam lands → word slams down PRE ms later
const PRE_L = 150;
const SLIDE_A = 4950;
const SLIDE_Z = 5450;
const AI_HIT = 5520; // beams converge on the AI panel's centre
const CONE_A = 6250;
const CONE_DN = 6620;
const CONE_LOCK = 6950;
const CONE_OFF = 7120;
const BUL = [7080, 7300, 7520, 7740];
const BUL_D = 300;
const COMET_A = 8080;
const COMET_FLY = 380;
const CITE = COMET_A + COMET_FLY;
const LAST = 8860; // climax slam
const PULSE = [9250, 10500, 11750];
const WAVE = 9900;
const TILT = [10450, 11000, 11100, 11650];
const AIC_A = 12250; // the AI panel collapses
const ER_A = 12650; // scanner erase pass (bottom → top)
const ER_Z = 13500;
const BACK_A = 13650; // the (invisible) page jumps back to its centred start

type Sc = [number, number, number, number];
const SCAN: Sc[] = [
  [PH_A, PH_Z, PH_Y0, PH_Y1],
  [ER_A, ER_Z, PH_Y1, ER_Y1],
];
/** when the scanner crosses y (going down, or up during the erase pass) */
function scanAt(y: number, up = false): number {
  for (const [t0, t1, y0, y1] of SCAN) {
    if (up !== y1 < y0) continue;
    if (y < Math.min(y0, y1) || y > Math.max(y0, y1)) continue;
    const v = (y - y0) / (y1 - y0);
    let a = 0;
    let b = 1;
    for (let i = 0; i < 40; i++) {
      const m = (a + b) / 2;
      if (ease(IO, m) < v) a = m;
      else b = m;
    }
    return Math.round(t0 + ((t1 - t0) * (a + b)) / 2);
  }
  return 0;
}

/* ───────────────────────────── rail-head choreography ─────────────────────── */

type Glide = [t0: number, t1: number, to: Pt, ease?: string];
const PLAN: Glide[][] = [];
PLAN[HL] = [
  [1700, 2500, [RI, 372]],
  [3060, 3520, [RI, 232]],
  [5000, 7000, [RI, 82], IOS],
  [9300, 10800, [RI, 170], IOS],
  [11000, 12300, [RI, 120], IOS],
  [12650, 13550, HEADS[HL].home],
];
PLAN[HT] = [
  [2600, 3800, [196, RI], IOS],
  [4400, 7400, [52, RI], IOS],
  [9300, 10900, [110, RI], IOS],
  [11100, 12300, [70, RI], IOS],
  [12650, 13550, HEADS[HT].home],
];
PLAN[HU] = [
  [2000, 3500, [300, RI], IOS],
  [4600, 5300, [330, RI]],
  [6000, 7800, [250, RI], IOS],
  [9300, 10900, [300, RI], IOS],
  [11100, 12300, [230, RI], IOS],
  [12650, 13550, HEADS[HU].home],
];
PLAN[HR] = [
  [2400, 3100, [RHI, 322]],
  [3510, 3680, [RHI, 234]],
  [3960, 4400, [RHI, 112]],
  [4700, 5380, [RHI, 312]],
  [5800, 7600, [RHI, 84], IOS],
  [9300, 10900, [RHI, 200], IOS],
  [11100, 12300, [RHI, 140], IOS],
  [12650, 13550, HEADS[HR].home],
];
/** where head k is at time t */
function headAt(k: number, t: number): Pt {
  let p = HEADS[k].home;
  for (const [t0, t1, to] of PLAN[k]) {
    if (t >= t1) p = to;
    else if (t > t0) return lerp(p, to, eIO((t - t0) / (t1 - t0)));
    else break;
  }
  return p;
}
// which head shoots which beat-1 slot
const SLOT_HEAD = [HT, HU, HR];

/* ───────────────────────────── sprites ──────────────────────────────────── */

const Z0 = "opacity:0";
const O1 = "opacity:1";
/** translate() of a point in units, 0.1cqw precision */
const tr2 = (x: number, y: number) => `translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw)`;
const fmtF = ([x, y, sx, sy, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} scale(${f(sx)},${f(sy)})`;
const fmtS = ([x, y, r, s, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg) scale(${f(s)})`;
const fmtCom = ([x, y, r, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg)`;
/** flare: blooms to `peak` (× the 14cqw sprite) and fades over `life` */
const flareEv = (p: Pt, t: number, peak: number, life: number, pri: number, tag: string): PoolEvent => ({
  pri,
  tag,
  fr: [
    [t - 22, [p[0], p[1], 0.3, 0.3, 0], OUT],
    [t, [p[0], p[1], peak, peak, 1], OUT],
    [t + life, [p[0], p[1], peak * 0.45, peak * 0.45, 0]],
  ],
});
/** spark burst: a fan of streaks (opening up at rot 0) flies out, falls, cools */
const sparkEv = (p: Pt, t: number, rot: number, size: number, life: number, pri: number): PoolEvent => ({
  pri,
  tag: "lime",
  fr: [
    [t - 2, [p[0], p[1], rot, 0.25 * size, 0], OUT],
    [t + 18, [p[0], p[1], rot, 0.55 * size, 1], OUT],
    [t + life * 0.45, [p[0], p[1] + 4 * size, rot, size, 0.85]],
    [t + life, [p[0], p[1] + 14 * size, rot, 1.12 * size, 0]],
  ],
});

/* ───────────────────────────── rail heads: body + beam ───────────────────── */

type Shot = { k: "hit"; land: number; to: Pt; travel: number } | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number };
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.a - s.travel);
const shotEnd = (s: Shot) => (s.k === "hit" ? s.land + 167 : s.b + 152);

type PS = { t: number; g: number; r: number; p: Pt };
/** keep the fewest polar samples whose linear θ / r interpolation stays within tol */
function rdpPolar(o: Pt, ss: PS[], tol: number): PS[] {
  const keep = ss.map((_, i) => i === 0 || i === ss.length - 1);
  const rad = Math.PI / 180;
  const rec = (i: number, j: number) => {
    let w = -1;
    let worst = tol;
    for (let k = i + 1; k < j; k++) {
      const u = (ss[k].t - ss[i].t) / (ss[j].t - ss[i].t);
      const g = (ss[i].g + (ss[j].g - ss[i].g) * u) * rad;
      const r = ss[i].r + (ss[j].r - ss[i].r) * u;
      const err = Math.hypot(o[0] + r * Math.cos(g) - ss[k].p[0], o[1] + r * Math.sin(g) - ss[k].p[1]);
      if (err > worst) {
        worst = err;
        w = k;
      }
    }
    if (w > 0) {
      keep[w] = true;
      rec(i, w);
      rec(w, j);
    }
  };
  rec(0, ss.length - 1);
  return ss.filter((_, i) => keep[i]);
}

/**
 * One head = TWO elements: the body (glides on the rail, swells while it
 * charges: translate + scale) and its beam (translate to the parked head,
 * rotate · scaleX, fades out at full length once its energy is delivered).
 */
function headKF(k: number, list: Shot[]) {
  const h = HEADS[k];
  const sorted = [...list].sort((p, q) => shotStart(p) - shotStart(q));
  const fr: Frame[] = [[0, [h.home[0], h.home[1], 0, 0, 1]]];
  const fires: [number, number][] = [];
  let prev = Number.NaN;
  const un = (g: number) => {
    if (!Number.isNaN(prev)) {
      while (g - prev > 180) g -= 360;
      while (g - prev < -180) g += 360;
    }
    prev = g;
    return g;
  };
  const GROW = "cubic-bezier(.3,0,.8,.5)";
  const TAIL = "cubic-bezier(.4,0,.8,.6)";
  for (const s of sorted) {
    const t0 = shotStart(s);
    const o = headAt(k, t0);
    const oz = headAt(k, shotEnd(s));
    if (dist(o, oz) > 0.01) throw new Error(`sgm: head ${h.id} moves while firing at ${t0} ms`);
    const B = (g: number, sx: number, op = 1, e?: string): [number[], string | undefined] => [[o[0], o[1], g, sx, op], e];
    const push = (t: number, [v, e]: [number[], string | undefined]) => fr.push([t, v, e]);
    if (s.k === "hit") {
      const g = un(angle(o, s.to));
      const len = dist(o, s.to) / 400;
      push(t0 - 4, B(g, 0));
      push(t0, B(g, 0, 1, GROW));
      push(s.land, B(g, len));
      push(s.land + 45, B(g, len, 1, TAIL));
      push(s.land + 165, B(g, len, 0));
      push(s.land + 167, B(g, 0, 0));
      fires.push([t0, t0]);
    } else {
      const ss: PS[] = [];
      for (let i = 0, n = Math.ceil((s.b - s.a) / 8); i <= n; i++) {
        const t = s.a + ((s.b - s.a) * i) / n;
        const p = s.at(t);
        ss.push({ t, g: un(angle(o, p)), r: dist(o, p), p });
      }
      push(t0 - 4, B(ss[0].g, 0));
      push(t0, B(ss[0].g, 0, 1, GROW));
      for (const q of rdpPolar(o, ss, 0.9)) push(q.t, B(q.g, q.r / 400));
      const z = ss[ss.length - 1];
      push(s.b + 20, B(z.g, z.r / 400, 1, TAIL));
      push(s.b + 150, B(z.g, z.r / 400, 0));
      push(s.b + 152, B(z.g, 0, 0));
      fires.push([t0, s.b]);
    }
  }
  kf(
    `${h.id}b`,
    fr.map(([t, [x, y, g, sx, op], e]): Stop => [t, `opacity:${f(op)};transform:${tr2(x, y)} rotate(${f(g, 1)}deg) scaleX(${f(sx, 3)})`, e]),
  );
  const xs: Key[] = [[0, h.home[0] / 4]];
  const ys: Key[] = [[0, h.home[1] / 4]];
  let p = h.home;
  for (const [t0, t1, to, e] of PLAN[k]) {
    xs.push([t0, p[0] / 4, e ?? IO], [t1, to[0] / 4]);
    ys.push([t0, p[1] / 4, e ?? IO], [t1, to[1] / 4]);
    p = to;
  }
  const CH_IN = "cubic-bezier(.55,0,1,.6)";
  const sw: Key[] = [[0, 1]];
  for (const [a, b] of fires) {
    while (sw.length > 1 && sw[sw.length - 1][0] > a - 70) sw.pop();
    if (a - 250 > sw[sw.length - 1][0] + 10) sw.push([a - 250, 1, CH_IN]);
    else sw.push([a - 60, sw[sw.length - 1][1], CH_IN]);
    sw.push([a - 8, 1.35], [a + 24, 1.62, OUT]);
    if (b > a) sw.push([a + 170, 1.18], [b, 1.18, OUT], [b + 300, 1]);
    else sw.push([a + 300, 1]);
  }
  anim(`${h.id}p`, null, [
    ["translate", "cqw", 1, xs, ys],
    ["scale", "", 2, sw],
  ]);
}

/* ───────────────────────────── build all keyframes ───────────────────────── */

const SW_C = 1.4; // pill forge outline width (units)
const UL_Y = 0.94; // climax underline: top and thickness (em of the headline)
const UL_H = 0.07;
const PC_X0 = 4; // printed-page clip box (x range, units)
const PC_X1 = SX + SW + 12;

function build(title: string, tagline: string, bullets: readonly string[], ns: string) {
  begin(ns);
  const lay = layout(title, tagline, bullets);
  const { fs, lh, top, groups, climax, qn, qf, items } = lay;
  const shots: Shot[][] = HEADS.map(() => []);
  const FL: PoolEvent[] = []; // flares
  const SP: PoolEvent[] = []; // spark bursts
  const CM: PoolEvent[] = []; // comet

  /* ── the results page: slides left for the AI panel, tilts in the hold ── */
  {
    const S = (x: number, rx: number, ry: number) =>
      `transform:perspective(170cqw) translateX(${f(x / 4, 2)}cqw) rotateX(${f(rx, 1)}deg) rotateY(${f(ry, 1)}deg)`;
    kf("serp", [
      [0, S(OFF, 0, 0)],
      [SLIDE_A, S(OFF, 0, 0), "cubic-bezier(.6,0,.25,1.12)"],
      [SLIDE_Z, S(0, 0, 0)],
      [TILT[0], S(0, 0, 0), IO],
      [TILT[1], S(0, 4, 7)],
      [TILT[2], S(0, 4, 7), IO],
      [TILT[3], S(0, 0, 0)],
      [BACK_A, S(0, 0, 0)],
      [BACK_A + 4, S(OFF, 0, 0)],
    ]);
  }

  /* ── the page is PRINTED: a clip window whose bottom edge is the scanner
        (hidden height = PH_Y1 − y, both passes, same easing) ── */
  {
    const hk: [number, number, string?][] = [
      [0, PH_Y1 - PH_Y0],
      [PH_A, PH_Y1 - PH_Y0, IO],
      [PH_Z, 0],
      [ER_A, 0, IO],
      [ER_Z, PH_Y1 - ER_Y1],
      [ER_Z + 30, PH_Y1 - ER_Y1],
      [ER_Z + 32, PH_Y1 - PH_Y0],
    ];
    kf("pwo", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(-h / 4)}cqw)`, e]));
    kf("pwi", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(h / 4)}cqw)`, e]));
  }
  {
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    kf("scan", [
      [0, Y(0, PH_Y0)],
      [PH_ON, Y(0, PH_Y0)],
      [PH_ON + 30, Y(1, PH_Y0)],
      [PH_ON + 52, Y(0.35, PH_Y0)],
      [PH_A, Y(1, PH_Y0), IO],
      [PH_Z, Y(1, PH_Y1)],
      [PH_Z + 160, Y(0, PH_Y1 + 6)],
      [ER_A - 160, Y(0, PH_Y1)],
      [ER_A - 40, Y(1, PH_Y1)],
      [ER_A, Y(1, PH_Y1), IO],
      [ER_Z, Y(1, ER_Y1)],
      [ER_Z + 160, Y(0, ER_Y1 - 8)],
    ]);
  }

  /* ── SEARCH FORGE: two weld tips trace the pill outline in opposite
        directions, collide on the right → white-hot pill, cools ── */
  const CR = PH / 2;
  const cyM = PY + CR;
  const xL = PX + CR;
  const xR = PX + PW - CR;
  const tipA: Pt[] = [[PX, cyM], ...arc(xL, cyM, CR, 180, 270, 4), [xR, PY], ...arc(xR, cyM, CR, 270, 360, 4)];
  const tipB: Pt[] = [[PX, cyM], ...arc(xL, cyM, CR, 180, 90, 4), [xR, PY + PH], ...arc(xR, cyM, CR, 90, 0, 4)];
  const LT = plen(tipA);
  const D = FG_Z - FG_A;
  const tipAt = (path: Pt[]) => (t: number) => ph1(pat(path, (Math.max(0, Math.min(D, t - FG_A)) / D) * LT));
  const foW = xR - (PX - SW_C / 2);
  const tq = (d: number) => FG_A + (d / LT) * D;
  [tipA, tipB].forEach((path, k) => {
    const q0 = ph1(path[0]);
    const fr: Frame[] = [
      [FG_A - 70, [q0[0], q0[1], 0.37, 0.37, 0]],
      [FG_A, [q0[0], q0[1], 0.37, 0.37, 1]],
    ];
    let acc = 0;
    path.forEach((p, i) => {
      if (i) acc += dist(path[i - 1], p);
      const q = ph1(p);
      if (i) fr.push([tq(acc), [q[0], q[1], 0.37, 0.37, 1]]);
    });
    const z = ph1(path[path.length - 1]);
    if (k) fr.push([FG_Z + 120, [z[0], z[1], 0.3, 0.3, 0]]);
    else {
      fr[fr.length - 2][2] = OUT;
      fr[fr.length - 1] = [FG_Z, [z[0], z[1], 1.6, 1.6, 1], OUT];
      fr.push([FG_Z + 520, [z[0], z[1], 1.6 * 0.45, 1.6 * 0.45, 0]]);
    }
    FL.push({ pri: 2, tag: "lime", fr });
  });
  {
    // the outline (left cap + both edges) grows behind the tips (scaleX from
    // its left end), up to where the right cap starts
    const x0 = PX - SW_C / 2;
    const st: [number, number, number][] = [
      [0, 0, 0],
      [FG_A - 2, 0, 0],
    ];
    let acc = 0;
    tipA.forEach((p, i) => {
      if (i) acc += dist(tipA[i - 1], p);
      st.push([tq(acc), 1, (Math.min(p[0], xR) - x0) / foW]);
    });
    st.push([FG_Z + 60, 1, 1], [FG_Z + 380, 0, 1], [FG_Z + 382, 0, 0]);
    kf("fo", st.map(([t, o, sx]): Stop => [t, `opacity:${o};transform:scaleX(${f(Math.max(0.001, sx), 4)})`]));
  }
  shots[HT].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HU].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  SP.push(sparkEv(ph1([PX + PW, cyM]), FG_Z, 52, 0.8, 480, 2));
  // the pill: appears white-hot at the collision, pulses on ENTER, zapped by the erase pass
  const tPill = scanAt(cyM, true);
  {
    const S = (o: number, sx: number, sy = sx) => `opacity:${f(o)};transform:scale(${f(sx, 3)},${f(sy, 3)})`;
    kf("pill", [
      [0, S(0, 1)],
      [FG_Z - 2, S(0, 1)],
      [FG_Z, S(1, 1), OUT],
      [FG_Z + 110, S(1, 1.04), IO],
      [FG_Z + 330, S(1, 1)],
      [ENTER - 2, S(1, 1), "ease-in"],
      [ENTER + 50, S(1, 0.97, 0.88), OUT],
      [ENTER + 200, S(1, 1.02, 1.05), IO],
      [ENTER + 320, S(1, 1)],
      [tPill - 10, S(1, 1)],
      [tPill + 20, S(0.25, 1)],
      [tPill + 36, S(0.8, 1)],
      [tPill + 64, S(0, 1)],
    ]);
  }
  FL.push(flareEv(ph1([PX + PW - 10, cyM]), ENTER, 0.75, 260, 0, "cyan"));
  {
    // the query types in (one mono advance per step); the cover's left edge is
    // the caret, which then blinks (the cover only hides empty pill by then)
    const adv = MONO_ADV * qf;
    const Q = (o: number, k: number) => `opacity:${o};transform:translateX(${f((k * adv) / 4, 3)}cqw)`;
    const st: Stop[] = [
      [0, Q(1, 0)],
      [TYPE_A, Q(1, 0), `steps(${qn},end)`],
      [TYPE_Z, Q(1, qn), STEP],
    ];
    for (let t = TYPE_Z + 420; t < tPill - 200; t += 1060) st.push([t, Q(0, qn), STEP], [t + 530, Q(1, qn), STEP]);
    kf("qc", st);
  }

  // heartbeat: the #1 badge and the cited chip pulse together in the hold
  const beat = (s: number, a: number): Stop[] =>
    PULSE.flatMap((p): Stop[] => [
      [p - 2, "opacity:1;transform:scale(1)", OUT],
      [p + 110, `opacity:1;transform:scale(${f(s, 3)})`, IO],
      [p + a, "opacity:1;transform:scale(1)"],
    ]);

  /* ── RANKING: lock on #8, three kicks, the overtaken rows are knocked down ── */
  kf("lock", [
    [0, "opacity:0;transform:scale(1.3)"],
    [LOCK - 2, "opacity:0;transform:scale(1.3)", OUT],
    [LOCK + 150, "opacity:1;transform:scale(1)"],
    [LOCK + 230, "opacity:.45;transform:scale(1)", STEP],
    [LOCK + 300, "opacity:1;transform:scale(1)"],
    [LEAP[0] + 10, "opacity:1;transform:scale(1)", OUT],
    [LEAP[0] + 90, "opacity:0;transform:scale(1.12)"],
  ]);
  FL.push(flareEv(ph1([RX + RW / 2, slotC(8)]), LOCK, 1.05, 340, 1, "cyan"));
  {
    const Yo = (slot: number) => (slot - 1) * PITCH;
    const R = (y: number, sx: number, sy: number) => `transform:translateY(${f(y / 4, 2)}cqw) scale(${f(sx, 3)},${f(sy, 3)})`;
    const st: Stop[] = [[0, R(Yo(8), 1, 1)]];
    LEAP.forEach((tl, j) => {
      const a = Yo(LEAP_SLOTS[j]);
      const b = Yo(LEAP_SLOTS[j + 1]);
      const last = j === LEAP.length - 1;
      st.push(
        [tl, R(a, 1, 1), OUT],
        [tl + 30, R(a + 1.5, 1.03, 0.9), "cubic-bezier(.5,0,.9,.6)"],
        [tl + 110, R(a + (b - a) * 0.55, 0.97, 1.16), "cubic-bezier(.1,.5,.3,1)"],
        [tl + 240, R(b - (last ? 5 : 4), last ? 1.06 : 1.03, last ? 0.86 : 0.92), IO],
        [tl + 340, R(b + 1, 0.99, 1.04), IO],
        [tl + 440, R(b, 1, 1)],
      );
      kf(`g${j}`, [
        [0, `transform:translateY(${f(-PITCH / 4)}cqw)`],
        [tl + 60, `transform:translateY(${f(-PITCH / 4)}cqw)`, BACK2],
        [tl + 300, "transform:translateY(0)"],
      ]);
      // the kick: beam lands on the row's end(s), flare
      const y = slotC(LEAP_SLOTS[j]);
      const Lp = ph1([CRX + 1, y]);
      const Rp = ph1([CRX + CRW - 1, y]);
      if (j !== 1) {
        shots[HL].push({ k: "hit", land: tl, to: Lp, travel: 90 });
        FL.push(flareEv(Lp, tl, 1, 260, 1, "lime"));
      }
      if (j !== 0) {
        shots[HR].push({ k: "hit", land: tl, to: Rp, travel: 90 });
        FL.push(flareEv(Rp, tl, 1, 260, 1, "blue"));
      }
    });
    kf("cr", st);
  }
  {
    // #1: badge, lime frame and "↑7" land; pulses when the AI locks on it and
    // when the citation comet leaves it
    const B = (o: number, s: number) => `opacity:${f(o)};transform:scale(${f(s, 3)})`;
    kf("bdg", [
      [0, B(0, 1.08)],
      [ARRIVE - 2, B(0, 1.08), OUT],
      [ARRIVE + 70, B(1, 0.985), IO],
      [ARRIVE + 220, B(1, 1)],
      [CONE_LOCK - 2, B(1, 1), OUT],
      [CONE_LOCK + 90, B(1, 1.03), IO],
      [CONE_LOCK + 300, B(1, 1)],
      [COMET_A - 2, B(1, 1), OUT],
      [COMET_A + 80, B(1, 1.03), IO],
      [COMET_A + 290, B(1, 1)],
      ...beat(1.025, 380),
    ]);
  }
  {
    const pc = ph1([RX + RW / 2, slotC(1)]);
    FL.push(flareEv(pc, ARRIVE, 1.7, 460, 2, "lime"));
    SP.push(sparkEv([pc[0], pc[1] - 4], ARRIVE, 0, 1, 400, 2));
  }

  /* ── HEADLINE: per group slam (fitted scale + origin, stretch → squash →
        rebound) in a white-hot bloom; wave in the hold; zapped by the erase ── */
  const pY = (em: number) => f((em / LINE) * 100, 2);
  function slamKF(name: string, t: number, big: boolean, wave: number, out: [number, number], g: Group, lift: number) {
    const cx = (s: number) => f(((1 - s) * (g.w / 2 - g.ox) * 100) / g.w, 2);
    const tr = (o: number, y: number, sx: number, sy: number, sk: number, x = "0") =>
      `opacity:${f(o)};transform:translateX(${x}%) translateY(${pY(y)}%) scale(${f(sx, 3)},${f(sy, 3)}) skewX(${f(sk, 1)}deg)`;
    const k0 = big ? -18 : -14;
    const pre = big ? PRE_L : PRE;
    const { s0, k } = g;
    kf(name, [
      [0, tr(0, lift, s0 * k, s0, k0)],
      [t - pre, tr(0, lift, s0 * k, s0, k0)],
      [t - pre + 26, tr(1, lift * 0.9, s0 * 0.94 * k, s0 * 0.94, k0), IN],
      [t, tr(1, 0.035, big ? 0.94 : 0.96, big ? 0.82 : 0.86, big ? 9 : 6), OUT],
      [t + 90, tr(1, -0.02, big ? 1.05 : 1.03, big ? 1.1 : 1.06, -3), IO],
      [t + 190, tr(1, 0.005, 0.99, 0.985, 1), IO],
      [t + 290, tr(1, 0, 1, 1, 0)],
      [wave, tr(1, 0, 1, 1, 0), OUT],
      [wave + 120, tr(1, -0.13, 1.035, 1.035, -3.5, cx(1.035)), IO],
      [wave + 330, tr(1, 0, 1, 1, 0)],
      [out[0] - 12, tr(1, 0, 1, 1, 0), OUT],
      [out[1] + 30, tr(0, -0.2, 1.06, 1, -12)],
    ]);
  }
  const waveAt = (slot: number) => WAVE + slot * 90;
  const WAVE_L = WAVE + 3 * 90 + 40;
  /** when the erase pass reaches the bottom / the top of headline line l */
  const oLine = (l: number): [number, number] => [scanAt(top + (l + 1) * lh, true), scanAt(top + l * lh, true)];
  groups.forEach((g, i) => {
    const t = SLOT1[g.slot];
    const head = SLOT_HEAD[g.slot];
    const c = HEADS[head].c;
    slamKF(`w${i}`, t, false, waveAt(g.slot), oLine(0), g, -0.1);
    shots[head].push({ k: "hit", land: t - PRE, to: [g.cx, g.cy], travel: 90 });
    const bx = Math.max(1.2, (1.25 * g.w) / 56);
    const by = Math.max(0.75, (1.3 * lh) / 56);
    FL.push({
      pri: 2,
      tag: c,
      fr: [
        [t - PRE - 22, [g.cx, g.cy, 0.3, 0.3, 0], OUT],
        [t - PRE, [g.cx, g.cy, 1.2, 1.2, 1], OUT],
        [t, [g.cx, g.cy, bx, by, 0.95], OUT],
        [t + 520, [g.cx, g.cy, bx * 1.12, by * 0.6, 0]],
      ],
    });
    SP.push(sparkEv([g.cx, g.cy + 0.42 * lh], t, 0, 0.72, 380, 2));
  });
  slamKF("wL", LAST, true, WAVE_L, oLine(1), climax, -0.3);
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: LAST - PRE_L, to: [climax.cx, climax.cy], travel: 100 });
  FL.push(flareEv([climax.cx, climax.cy], LAST - PRE_L, 1.6, 460, 2, "lime"));
  SP.push(sparkEv([climax.cx, climax.cy + 0.42 * lh], LAST, 0, 1.08, 560, 2));
  // the climax lands white-hot (its own copy cools to lime, re-glows on the
  // wave) while a cyan / blue chromatic ghost jitters behind it
  kf("hg", [[0, Z0], [LAST - 2, Z0], [LAST + 12, O1], [LAST + 110, O1, COOL], [LAST + 640, Z0], [WAVE_L - 4, Z0], [WAVE_L + 70, "opacity:.5"], [WAVE_L + 420, Z0]]);
  {
    const u = (x: number) => f((x * fs) / 4, 3);
    const g = (o: number, x: number) => `opacity:${f(o)};transform:translate(${u(x)}cqw,${u(-x * 0.25)}cqw)`;
    kf("gh", [
      [0, g(0, 0)],
      [LAST - 4, g(0, 0)],
      [LAST, g(0.95, 0.03), STEP],
      [LAST + 45, g(0.95, -0.03), STEP],
      [LAST + 90, g(0.85, 0.02), STEP],
      [LAST + 135, g(0.7, -0.015), STEP],
      [LAST + 180, g(0.6, 0)],
      [LAST + 300, g(0, 0)],
      [WAVE_L - 4, g(0, 0)],
      [WAVE_L, g(0.8, 0.025), STEP],
      [WAVE_L + 55, g(0.7, -0.02), STEP],
      [WAVE_L + 110, g(0.5, 0.01)],
      [WAVE_L + 220, g(0, 0)],
    ]);
  }
  const [oL] = oLine(1);
  kf("ul", [
    [0, "opacity:0;transform:scaleX(0)"],
    [LAST + 88, "opacity:0;transform:scaleX(0)"],
    [LAST + 90, "opacity:1;transform:scaleX(0)", OUT],
    [LAST + 460, "opacity:1;transform:scaleX(1)"],
    [oL - 12, "opacity:1;transform:scaleX(1)", OUT],
    [oL + 40, "opacity:0;transform:scaleX(1)"],
  ]);
  {
    const y = climax.y + (UL_Y + UL_H / 2) * fs;
    FL.push({
      pri: 1,
      tag: "lime",
      fr: [
        [LAST + 86, [HX, y, 0.36, 0.36, 0]],
        [LAST + 90, [HX, y, 0.4, 0.4, 1], OUT],
        [LAST + 460, [HX + climax.w, y, 0.4, 0.4, 1]],
        [LAST + 620, [HX + climax.w, y, 0.3, 0.3, 0]],
      ],
    });
  }

  /* ── AI PANEL: opens like a hologram (point → line → panel), reads the
        page with a searchlight cone, streams its answer, cites the #1 ── */
  shots[HU].push({ k: "hit", land: AI_HIT, to: AI_C, travel: 90 });
  shots[HR].push({ k: "hit", land: AI_HIT, to: AI_C, travel: 90 });
  FL.push(flareEv(AI_C, AI_HIT, 1.5, 420, 2, "cyan"));
  SP.push(sparkEv([AI_C[0], AI_C[1] + 4], AI_HIT + 10, 0, 0.8, 420, 2));
  {
    const A = (o: number, sx: number, sy: number, rx = 0, ry = 0) =>
      `opacity:${f(o)};transform:perspective(170cqw) rotateX(${f(rx, 1)}deg) rotateY(${f(ry, 1)}deg) scale(${f(sx, 3)},${f(sy, 3)})`;
    kf("ai", [
      [0, A(0, 0.02, 0.012)],
      [AI_HIT - 2, A(0, 0.02, 0.012)],
      [AI_HIT + 10, A(1, 0.03, 0.012), OUT],
      [AI_HIT + 190, A(1, 1.02, 0.012), IO],
      [AI_HIT + 250, A(1, 1, 0.016), OUT],
      [AI_HIT + 450, A(1, 1, 1.04), IO],
      [AI_HIT + 560, A(1, 1, 0.99), IO],
      [AI_HIT + 660, A(1, 1, 1)],
      [TILT[0], A(1, 1, 1), IO],
      [TILT[1], A(1, 1, 1, 4, -7)],
      [TILT[2], A(1, 1, 1, 4, -7), IO],
      [TILT[3], A(1, 1, 1)],
      [AIC_A, A(1, 1, 1), IN],
      [AIC_A + 170, A(1, 1, 0.014), IO],
      [AIC_A + 320, A(1, 0.02, 0.012)],
      [AIC_A + 350, A(0, 0.02, 0.012)],
    ]);
    kf("aih", [
      [0, Z0],
      [AI_HIT, Z0],
      [AI_HIT + 12, O1],
      [AI_HIT + 260, O1, COOL],
      [AI_HIT + 720, Z0],
      [AIC_A + 40, Z0],
      [AIC_A + 170, O1],
      [AIC_A + 350, O1],
      [AIC_A + 352, Z0],
    ]);
  }
  FL.push(flareEv(AI_C, AIC_A + 320, 1.3, 360, 1, "cyan"));
  {
    const K = (s: number, r: number) => `transform:rotate(${r}deg) scale(${f(s, 3)})`;
    kf("spk", [
      [0, K(0, -90)],
      [AI_HIT + 430, K(0, -90), BACK],
      [AI_HIT + 760, K(1, 0)],
      [CONE_A - 80, K(1, 0), IO],
      [CONE_LOCK, K(1.15, 180), OUT],
      [CONE_LOCK + 260, K(1, 180)],
      [CITE - 2, K(1, 180), OUT],
      [CITE + 150, K(1.3, 225), IO],
      [CITE + 520, K(1, 270)],
    ]);
  }
  {
    const a1 = angle(SPK, [RX + RW * 0.4, slotC(1)]);
    let a8 = angle(SPK, [RX + RW * 0.4, slotC(8)]);
    while (a8 - a1 > 180) a8 -= 360;
    while (a8 - a1 < -180) a8 += 360;
    const C = (o: number, a: number) => `opacity:${f(o)};transform:rotate(${f(a, 1)}deg)`;
    kf("cone", [
      [0, C(0, a1)],
      [CONE_A - 50, C(0, a1)],
      [CONE_A - 32, C(1, a1)],
      [CONE_A - 18, C(0.3, a1)],
      [CONE_A, C(1, a1), IO],
      [CONE_DN, C(1, a8), IO],
      [CONE_LOCK, C(1, a1)],
      [CONE_OFF - 110, C(1, a1), COOL],
      [CONE_OFF, C(0, a1)],
    ]);
    FL.push(flareEv([RX + 18, slotC(1)], CONE_LOCK, 1.1, 360, 1, "cyan"));
  }
  items.forEach((_, i) => {
    kf(`bc${i}`, [
      [0, "transform:translateX(0)"],
      [BUL[i], "transform:translateX(0)", "cubic-bezier(.45,.05,.55,.95)"],
      [BUL[i] + BUL_D, "transform:translateX(102%)"],
    ]);
  });
  {
    // the citation comet: #1 result → the answer's source chip
    const p0: Pt = [RX + 3, slotY(1) + 6];
    const p2 = CHIP;
    const pcn: Pt = [118, 352];
    const t0 = COMET_A;
    const t1 = CITE;
    const eS = (u: number) => u * u * (3 - 2 * u);
    const at = (t: number): [Pt, number] => {
      const u = eS(Math.max(0, Math.min(1, (t - t0) / (t1 - t0))));
      const x = (1 - u) * (1 - u) * p0[0] + 2 * u * (1 - u) * pcn[0] + u * u * p2[0];
      const y = (1 - u) * (1 - u) * p0[1] + 2 * u * (1 - u) * pcn[1] + u * u * p2[1];
      const dx = 2 * (1 - u) * (pcn[0] - p0[0]) + 2 * u * (p2[0] - pcn[0]);
      const dy = 2 * (1 - u) * (pcn[1] - p0[1]) + 2 * u * (p2[1] - pcn[1]);
      return [[x, y], (Math.atan2(dy, dx) * 180) / Math.PI];
    };
    const o = (t: number) => Math.max(0, Math.min(1, (t - t0) / 40, (t1 + 30 - t) / 60));
    const fr: Frame[] = [[t0 - 6, [p0[0], p0[1], at(t0)[1], 0]]];
    for (let t = t0; t <= t1 + 30; t += 30) {
      const [p, a] = at(t);
      fr.push([t, [p[0], p[1], a, o(t)]]);
    }
    fr.push([t1 + 32, [p2[0], p2[1], at(t1)[1], 0]]);
    CM.push({ pri: 2, fr });
    FL.push(flareEv(p0, COMET_A, 0.9, 300, 1, "lime"));
    FL.push(flareEv(p2, CITE, 1.45, 420, 2, "lime"));
    SP.push(sparkEv([p2[0], p2[1] - 3], CITE, 0, 0.75, 420, 2));
  }
  kf("chl", [
    [0, "opacity:0;transform:scale(1.25)"],
    [CITE - 2, "opacity:0;transform:scale(1.25)", OUT],
    [CITE + 50, "opacity:1;transform:scale(.95)", IO],
    [CITE + 230, "opacity:1;transform:scale(1)"],
    ...beat(1.1, 420),
  ]);

  /* ── rail heads: glide, charge, fire ── */
  HEADS.forEach((_, k) => headKF(k, shots[k]));

  /* ── whole-scene punctuation: camera shake + flash ── */
  {
    const sh = (x: number, y: number) => `transform:translate(${f(x)}%,${f(y)}%)`;
    const st: Stop[] = [[0, sh(0, 0)]];
    const shake = (t: number, a: number) =>
      st.push(
        [t - 2, sh(0, 0)],
        [t + 30, sh(0.9 * a, -0.6 * a)],
        [t + 70, sh(-0.75 * a, 0.5 * a)],
        [t + 115, sh(0.5 * a, -0.35 * a)],
        [t + 170, sh(-0.25 * a, 0.18 * a)],
        [t + 250, sh(0, 0)],
      );
    shake(FG_Z, 0.3);
    shake(ARRIVE, 0.7);
    shake(CITE, 0.3);
    shake(LAST, 1);
    kf("shake", st);
    const fl = (t: number, o: number, life: number): Stop[] => [
      [t - 2, Z0],
      [t + 25, `opacity:${f(o)}`],
      [t + life, Z0],
    ];
    kf("flash", [[0, Z0], ...fl(FG_Z, 0.4, 380), ...fl(ARRIVE, 0.55, 420), ...fl(AI_HIT, 0.35, 380), ...fl(CITE, 0.4, 400), ...fl(LAST, 0.95, 460)]);
  }
  FL.push(flareEv([PX + PW / 2, cyM], tPill, 1.1, 260, 0, "lime"));

  /* ── pools ── */
  const pf = pool("pf", FL, 7, fmtF, true);
  const ps = pool("ps", SP, 3, fmtS);
  const nCm = pool("cm", CM, 1, fmtCom).length;

  return { css: (BASE + end()).replace(/\n/g, ""), lay, pf, ps, nCm, foW };
}

/* ───────────────────────────── static styles ─────────────────────────────── */

const BEAM_BG =
  "linear-gradient(rgb(var(--sgm-hot)/.95),rgb(var(--sgm-hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--sgm-c)/.07) 20%,rgb(var(--sgm-c)/.3) 37%,rgb(var(--sgm-c)/.85) 47%,rgb(var(--sgm-c)/.85) 53%,rgb(var(--sgm-c)/.3) 63%,rgb(var(--sgm-c)/.07) 80%,transparent)";
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--sgm-hot)) ${core},rgb(var(--sgm-c)/.8) ${mid},rgb(var(--sgm-c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";
const AI_BG = "#0b0d13";
const PILL_BG = "#12151c";

const BASE = `
.sgm-root{--sgm-lime:200 240 46;--sgm-cyan:20 224 200;--sgm-green:34 211 140;--sgm-blue:46 102 255;--sgm-hot:242 243 238;position:relative;z-index:20;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;forced-color-adjust:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;letter-spacing:normal;word-spacing:normal;text-align:left}
.sgm-cv{position:absolute;inset:-3rem;content-visibility:auto;contain-intrinsic-size:0 0}
.sgm-cv>.sgm-L{inset:3rem}
html.a11y-hide-img .sgm-cv{display:none}
.sgm-root i{font-style:normal}
.sgm-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
[data-paused] .sgm-a{animation-play-state:paused}
.sgm-L{position:absolute;inset:0}
.sgm-abs{position:absolute;display:block}
.sgm-clip{position:absolute;overflow:hidden;overflow:clip}
.sgm-o0{position:absolute;width:100cqw;height:100cqw}
.sgm-z{position:absolute;left:0;top:0;width:0;height:0}
.sgm-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.1) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.sgm-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.sgm-floor{position:absolute;left:6%;top:89%;width:88%;height:8%;border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.26),rgb(20 224 200/.07) 60%,transparent)}
.sgm-c-lime{--sgm-c:var(--sgm-lime)}.sgm-c-cyan{--sgm-c:var(--sgm-cyan)}.sgm-c-green{--sgm-c:var(--sgm-green)}.sgm-c-blue{--sgm-c:var(--sgm-blue)}
.sgm-serpw{transform-origin:${P(SX + SW / 2)} ${P(SY + SH / 2)}}
.sgm-pwo{left:${cq(PC_X0)};top:${cq(ER_Y1)};width:${cq(PC_X1 - PC_X0)};height:${cq(PH_Y1 - ER_Y1)}}
.sgm-card{border-radius:3cqw;background:radial-gradient(60% 30% at 30% 0,rgb(var(--sgm-cyan)/.07),transparent),linear-gradient(rgb(15 17 24/.94),rgb(8 9 13/.94));box-shadow:0 2cqw 6cqw rgb(0 0 0/.45)}
.sgm-outl{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.sgm-div{background:rgb(242 243 238/.08)}
.sgm-num{display:flex;align-items:center;justify-content:center;font-family:${MONO};font-weight:700;font-size:1.5cqw;color:rgb(242 243 238/.32)}
.sgm-row{position:absolute}
.sgm-fav{border-radius:50%}
.sgm-sk{border-radius:1cqw}
.sgm-crow{position:absolute;border-radius:1.6cqw;background:rgb(var(--sgm-lime)/.07);box-shadow:inset 0 0 0 1px rgb(var(--sgm-lime)/.22);transform-origin:50% 50%}
.sgm-url{position:absolute;font-family:${MONO};font-weight:700;font-size:1.35cqw;line-height:1;white-space:nowrap;color:#c8f02e}
.sgm-lock{position:absolute;opacity:0}
.sgm-lkb{position:absolute;border-radius:1.6cqw;background:rgb(var(--sgm-cyan)/.07)}
.sgm-n8{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:1.5cqw;font-family:${MONO};font-weight:800;font-size:1.6cqw;color:#14e0c8;background:#0b0e14;box-shadow:inset 0 0 0 max(1px,.25cqw) #14e0c8,0 0 1.6cqw rgb(var(--sgm-cyan)/.55)}
.sgm-lkb i{position:absolute;width:3.4cqw;height:2.6cqw;border:max(1.5px,.5cqw) solid #14e0c8;filter:drop-shadow(0 0 .7cqw rgb(var(--sgm-cyan)/.9))}
.sgm-lkb i:nth-child(1){left:0;top:0;border-right:0;border-bottom:0}
.sgm-lkb i:nth-child(2){right:0;top:0;border-left:0;border-bottom:0}
.sgm-lkb i:nth-child(3){left:0;bottom:0;border-right:0;border-top:0}
.sgm-lkb i:nth-child(4){right:0;bottom:0;border-left:0;border-top:0}
.sgm-bdg{position:absolute;transform-origin:50% 50%}
.sgm-frm{position:absolute;border-radius:1.8cqw;box-shadow:0 0 0 max(1px,.3cqw) rgb(var(--sgm-lime)/.8),0 0 2.4cqw rgb(var(--sgm-lime)/.35),inset 0 0 2cqw rgb(var(--sgm-lime)/.12)}
.sgm-n1{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:1.5cqw;background:#c8f02e;color:#0a0a0b;font-family:${MONO};font-weight:800;font-size:1.6cqw;box-shadow:0 0 2cqw rgb(var(--sgm-lime)/.6)}
.sgm-up{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:1cqw;font-family:${MONO};font-weight:800;font-size:1.3cqw;color:#22d38c;background:rgb(var(--sgm-green)/.14);box-shadow:inset 0 0 0 1px rgb(var(--sgm-green)/.45)}
.sgm-pill{position:absolute;border-radius:5cqw;background:${PILL_BG};box-shadow:0 0 0 1px rgb(var(--sgm-lime)/.4),0 0 2.6cqw rgb(var(--sgm-lime)/.16)}
.sgm-fo{position:absolute;box-sizing:border-box;border:${cq(SW_C)} solid #c8f02e;border-right:0;box-shadow:0 0 1cqw rgb(var(--sgm-lime)/.6);transform-origin:0 50%;opacity:0}
.sgm-mag{position:absolute;overflow:visible}
.sgm-qw{position:absolute;top:0;bottom:0;display:flex;align-items:center;overflow:hidden;overflow:clip}
.sgm-q{display:block;font-family:${MONO};font-weight:600;white-space:pre;color:#f2f3ee;font-kerning:none;font-variant-ligatures:none;letter-spacing:0}
.sgm-qc{position:absolute;left:0;top:12%;bottom:12%;width:100%;background:${PILL_BG}}
.sgm-qc::before{content:"";position:absolute;left:0;top:0;bottom:0;width:max(1px,.28cqw);background:#c8f02e;box-shadow:0 0 .8cqw rgb(var(--sgm-lime)/.9)}
.sgm-go{position:absolute;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#c8f02e;color:#0a0a0b}
.sgm-go svg{width:62%;height:62%}
.sgm-ai{position:absolute;border-radius:3cqw;transform-origin:50% 50%}
.sgm-aib{position:absolute;inset:0;border-radius:inherit;background:${AI_BG};box-shadow:0 0 0 1px rgb(var(--sgm-cyan)/.32),0 3cqw 7cqw rgb(0 0 0/.6),0 0 5cqw rgb(var(--sgm-cyan)/.1)}
.sgm-aihd{position:absolute;left:0;top:0;width:100%;border-radius:3cqw 3cqw 0 0;background:radial-gradient(70% 120% at 12% 0,rgb(var(--sgm-lime)/.13),transparent 70%),radial-gradient(60% 120% at 90% 0,rgb(var(--sgm-cyan)/.1),transparent 70%)}
.sgm-spk{position:absolute}
.sgm-spk svg{display:block;width:100%;height:100%;overflow:visible}
.sgm-ail{position:absolute;display:flex;align-items:center;gap:.9cqw;font-family:${MONO};font-weight:800;font-size:1.9cqw;color:#f2f3ee;white-space:nowrap}
.sgm-ail i{width:.7cqw;height:.7cqw;border-radius:50%;background:rgb(242 243 238/.3)}
.sgm-ans{position:absolute;display:flex;flex-direction:column;gap:1.5cqw}
.sgm-ghost .sgm-bd,.sgm-ghost .sgm-bt{visibility:hidden}
.sgm-bl{position:relative;display:flex;align-items:flex-start;gap:.55em;line-height:1.3;color:rgb(242 243 238/.84);overflow:hidden;overflow:clip}
.sgm-bd{flex:none;width:.42em;height:.42em;margin-top:.45em;border-radius:50%;background:#14e0c8;box-shadow:0 0 .5em rgb(var(--sgm-cyan)/.7)}
.sgm-bt{min-width:0}
.sgm-btc{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
.sgm-nw{white-space:nowrap}
.sgm-mk{display:inline-flex;align-items:center;justify-content:center;width:1.25em;height:1.25em;margin-left:.3em;border-radius:50%;vertical-align:.12em;font-family:${MONO};font-weight:800;font-size:.66em;line-height:1;color:#0a0a0b;background:#c8f02e}
.sgm-bc{position:absolute;top:0;bottom:0;left:-1.2cqw;width:calc(100% + 1.2cqw);background:${AI_BG};transform:translateX(102%)}
.sgm-bc::before{content:"";position:absolute;left:.4cqw;top:4%;bottom:4%;width:max(1px,.3cqw);background:#c8f02e;box-shadow:0 0 .9cqw rgb(var(--sgm-lime)/.9)}
.sgm-src{position:absolute;display:flex;align-items:center;gap:1.4cqw}
.sgm-chip{position:relative;flex:none;display:flex;align-items:center;gap:.9cqw;height:100%;padding:0 1.3cqw 0 .9cqw;border-radius:2cqw;font-family:${MONO};font-weight:700;font-size:1.4cqw;white-space:nowrap;color:rgb(242 243 238/.5);box-shadow:inset 0 0 0 1px rgb(242 243 238/.2)}
.sgm-chip b{display:flex;align-items:center;justify-content:center;width:2.4cqw;height:2.4cqw;border-radius:50%;font-size:1.25cqw;font-weight:800;background:rgb(242 243 238/.14);color:rgb(242 243 238/.7)}
.sgm-chip s{display:block;width:5cqw;height:.9cqw;border-radius:1cqw;background:rgb(242 243 238/.16)}
.sgm-chl{position:absolute;box-sizing:border-box;background:#c8f02e;color:#0a0a0b;box-shadow:0 0 2.4cqw rgb(var(--sgm-lime)/.55)}
.sgm-chl b{background:#0a0a0b;color:#c8f02e}
.sgm-in{position:absolute;display:flex;align-items:center;gap:1.2cqw;padding:0 .8cqw 0 2cqw;border-radius:5cqw;box-shadow:inset 0 0 0 1px rgb(242 243 238/.13);background:rgb(242 243 238/.03)}
.sgm-in s{display:block;height:1cqw;border-radius:1cqw;background:rgb(242 243 238/.13)}
.sgm-in b{margin-left:auto;display:flex;align-items:center;justify-content:center;width:3.6cqw;height:3.6cqw;border-radius:50%;background:rgb(242 243 238/.88);color:#0a0a0b}
.sgm-in svg{width:60%;height:60%}
.sgm-aih{position:absolute;inset:0;border-radius:inherit;opacity:0;background:rgb(var(--sgm-cyan)/.14);box-shadow:inset 0 0 0 .5cqw #fff,inset 0 0 4cqw rgb(var(--sgm-cyan)/.85),0 0 3cqw rgb(var(--sgm-cyan)/.7)}
.sgm-cone{position:absolute;left:${P(SPK[0])};top:${P(SPK[1])};width:0;height:0}
.sgm-coner{position:absolute;left:0;top:0;width:0;height:0;opacity:0}
.sgm-cw{position:absolute;left:0;top:${cq(-CONE_H)};width:${cq(CONE_L)};height:${cq(2 * CONE_H)};clip-path:polygon(0 50%,100% 0,100% 100%);background:linear-gradient(90deg,rgb(var(--sgm-cyan)/.5),rgb(var(--sgm-cyan)/.2) 40%,rgb(var(--sgm-cyan)/.05) 80%,transparent)}
.sgm-ce{position:absolute;left:0;top:-.1cqw;width:${cq(CONE_L)};height:.2cqw;transform-origin:0 50%;background:linear-gradient(90deg,rgb(var(--sgm-cyan)/.95),rgb(var(--sgm-cyan)/.35) 50%,transparent)}
.sgm-ck{position:absolute;left:0;top:-.14cqw;width:${cq(CONE_L * 0.8)};height:.28cqw;background:linear-gradient(90deg,#fff,rgb(var(--sgm-cyan)/.6) 35%,transparent)}
.sgm-co{position:absolute;left:-5cqw;top:-5cqw;width:10cqw;height:10cqw;border-radius:50%;--sgm-c:var(--sgm-cyan);background:${GLOW("8%", "20%", "50%")}}
.sgm-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 40%,rgb(var(--sgm-hot)/.2),rgb(var(--sgm-lime)/.09) 45%,transparent 75%);opacity:0}
.sgm-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--sgm-c:var(--sgm-cyan)}
.sgm-scanw{position:absolute;left:0;right:0;bottom:50%;height:9em;background:linear-gradient(to top,rgb(var(--sgm-cyan)/.15),rgb(var(--sgm-cyan)/.04) 45%,transparent),repeating-linear-gradient(to top,rgb(var(--sgm-cyan)/.08) 0 1px,transparent 1px .9em)}
.sgm-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.sgm-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.sgm-hd{position:absolute;left:0;top:0;width:0;height:0}
.sgm-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.sgm-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--sgm-hot));box-shadow:0 0 0 .38cqw rgb(var(--sgm-c)/.95),0 0 1.8cqw .5cqw rgb(var(--sgm-c)/.55),0 0 5cqw rgb(var(--sgm-c)/.25);outline:.26cqw dashed rgb(var(--sgm-c)/.7);outline-offset:1.15cqw}
.sgm-pf{position:absolute;left:0;top:0;width:14cqw;height:14cqw;margin:-7cqw 0 0 -7cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.sgm-ps{position:absolute;left:0;top:0;width:30cqw;height:30cqw;margin:-15cqw 0 0 -15cqw;background:radial-gradient(closest-side,rgb(var(--sgm-hot)),rgb(var(--sgm-c)/.75) 7%,rgb(var(--sgm-c)/.12) 15%,transparent 22%);opacity:0;color:rgb(var(--sgm-c))}
.sgm-ps svg{display:block;width:100%;height:100%;overflow:visible}
.sgm-com{position:absolute;left:0;top:0;width:15cqw;height:4.2cqw;margin:-2.1cqw 0 0 -12.82cqw;transform-origin:85.45% 50%;opacity:0;background:radial-gradient(2.1cqw 2.1cqw at 85.45% 50%,#fff,#fff 22%,rgb(var(--sgm-lime)/.8) 46%,rgb(var(--sgm-lime)/.18) 72%,transparent),linear-gradient(90deg,transparent,rgb(var(--sgm-lime)/.35) 40%,rgb(var(--sgm-lime)/.85) 80%,#fff) 0 50%/85.45% 1.2cqw no-repeat}
.sgm-title{position:absolute;left:${cq(HX)};font-family:${HEAD};font-weight:800;line-height:${LINE};letter-spacing:${f(TLS, 3)}em;font-kerning:none;font-variant-ligatures:none;color:#f2f3ee}
.sgm-ln{display:block;white-space:nowrap}
.sgm-w{position:relative;display:inline-block;white-space:nowrap;transform-origin:50% 80%}
.sgm-lnL{position:relative;color:#c8f02e}
.sgm-hg{position:absolute;left:0;top:0;opacity:0;white-space:nowrap;color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--sgm-lime)/.95),0 0 .45em rgb(var(--sgm-cyan)/.6)}
.sgm-gh{position:absolute;left:0;top:0;z-index:-1;opacity:0;white-space:nowrap;color:transparent;text-shadow:-.08em -.02em rgb(var(--sgm-cyan)/.95),.08em .02em rgb(var(--sgm-blue)/.9)}
.sgm-ul{position:absolute;left:0;top:${f(UL_Y, 3)}em;height:${f(UL_H, 3)}em;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
`;

/* ───────────────────────────── markup ────────────────────────────────────── */

type Built = ReturnType<typeof build> & { ns: string };
/** built sheets per string set: the most recently used few */
const CACHE = new Map<string, Built>();
const CACHE_MAX = 12;
function getBuild(title: string, tagline: string, bullets: readonly string[]): Built {
  const key = [title, tagline, ...bullets.slice(0, 4)].join("\u0001");
  let b = CACHE.get(key);
  if (b) CACHE.delete(key);
  else {
    const ns = `sgm-${hash(key)}-`;
    b = { ...build(title, tagline, bullets, ns), ns };
    while (CACHE.size >= CACHE_MAX) CACHE.delete(CACHE.keys().next().value as string);
  }
  CACHE.set(key, b);
  return b;
}

/** absolutely positioned box, in viewBox units relative to the root */
const at = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: P(x), top: P(y), width: cq(w), height: cq(h) });
/** the same inside a smaller positioned box (cqw always refers to the root width) */
const atq = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: cq(x), top: cq(y), width: cq(w), height: cq(h) });

const TINT: Record<string, string> = { blue: "rgb(46 102 255/.75)", cyan: "rgb(20 224 200/.6)", green: "rgb(34 211 140/.6)" };

/** a skeleton result (row-local units) */
function Row({ u, t, s, c }: { u: number; t: number; s: number; c: string }) {
  return (
    <>
      <i className="sgm-abs sgm-fav" style={{ ...atq(0, 1, 6.5, 6.5), background: TINT[c] }} />
      <i className="sgm-abs sgm-sk" style={{ ...atq(9.5, 2.2, u, 3.2), background: "rgb(242 243 238/.16)" }} />
      <i className="sgm-abs sgm-sk" style={{ ...atq(0, 10, t, 5), background: "rgb(126 160 255/.42)" }} />
      <i className="sgm-abs sgm-sk" style={{ ...atq(0, 18.4, s, 2.8), background: "rgb(242 243 238/.1)" }} />
    </>
  );
}

/**
 * Spark sprite (static artwork): an irregular spray of streaks opening upwards
 * — white-hot heads, coloured tails, a few embers. [angle°, r0, r1, half-width]
 */
const STREAKS: [number, number, number, number][] = [
  [-171, 17, 37, 1.1],
  [-152, 12, 45, 1.5],
  [-139, 21, 33, 0.9],
  [-121, 10, 48, 1.6],
  [-104, 18, 39, 1.2],
  [-88, 9, 46, 1.4],
  [-72, 22, 35, 1],
  [-57, 11, 44, 1.5],
  [-41, 19, 36, 1],
  [-27, 13, 41, 1.3],
  [-11, 20, 31, 0.9],
];
const EMBERS: [number, number, number][] = [
  [-160, 30, 1.4],
  [-113, 34, 1.1],
  [-80, 27, 1.3],
  [-48, 31, 1],
  [-20, 26, 1.2],
];
const rotPoly = (a: number, pts: Pt[]) => {
  const c = Math.cos((a * Math.PI) / 180);
  const s = Math.sin((a * Math.PI) / 180);
  return `M${pts.map(([x, y]) => `${f(x * c - y * s, 1)} ${f(x * s + y * c, 1)}`).join("L")}Z`;
};
const SPARK_TAILS = STREAKS.map(([a, r0, r1, w]) => rotPoly(a, [[r0, 0], [r1 - 8, -w], [r1, 0], [r1 - 8, w]])).join("");
const SPARK_HEADS = STREAKS.map(([a, , r1, w]) => rotPoly(a, [[r1 - 10, 0], [r1 - 3, -w / 2], [r1, 0], [r1 - 3, w / 2]])).join("");
const SPARK_EMBERS = EMBERS.map(([a, r, s]) => {
  const x = r * Math.cos((a * Math.PI) / 180);
  const y = r * Math.sin((a * Math.PI) / 180);
  return `M${f(x - s, 1)} ${f(y, 1)}a${s} ${s} 0 1 0 ${f(2 * s, 1)} 0a${s} ${s} 0 1 0 ${f(-2 * s, 1)} 0`;
}).join("");
function SparkArt() {
  return (
    <svg viewBox="-50 -50 100 100">
      <path d={SPARK_TAILS} fill="currentColor" fillOpacity=".55" />
      <path d={SPARK_HEADS} fill="#fff" />
      <path d={SPARK_EMBERS} fill="#fff" fillOpacity=".85" />
    </svg>
  );
}
/** headline text with its trailing mark pulled in (as measured in layout.ts) */
function Txt({ s }: { s: string }) {
  if (!PUNCT.test(s)) return <>{s}</>;
  const cut = s.length - [...s].slice(-1)[0].length;
  return (
    <>
      {s.slice(0, cut)}
      <span style={{ marginLeft: `${-PUNCT_PULL}em` }}>{s.slice(cut)}</span>
    </>
  );
}

/** a bullet whose last word keeps its citation marker (never orphaned on a line of its own) */
function Cited({ s }: { s: string }) {
  const i = s.lastIndexOf(" ");
  return (
    <>
      {i > 0 ? s.slice(0, i + 1) : ""}
      <span className="sgm-nw">
        {i > 0 ? s.slice(i + 1) : s}
        <i className="sgm-mk">1</i>
      </span>
    </>
  );
}

/** the AI answer (bullets with citation markers); with `cover`, an invisible
 *  copy that only carries the streaming covers */
function Answer({ items, bf, clamp, cover }: { items: string[]; bf: number; clamp: boolean; cover?: (i: number) => string }) {
  return (
    <div className={`sgm-ans${cover ? " sgm-ghost" : ""}`} style={{ left: cq(12), top: cq(41), width: cq(AW - 24), fontSize: cq(bf) }}>
      {items.map((it, i) => (
        <div key={i} className="sgm-bl">
          <i className="sgm-bd" />
          <span className={`sgm-bt${clamp ? " sgm-btc" : ""}`}>
            <Cited s={it} />
          </span>
          {cover ? <i className={`sgm-bc ${cover(i)}`} /> : null}
        </div>
      ))}
    </div>
  );
}

/** four-point AI spark */
const STAR = "M0-10C1-3 3-1 10 0C3 1 1 3 0 10C-1 3-3 1-10 0C-3-1-1-3 0-10Z";

export function SeoGeoMotion({ className, title, tagline, bullets }: ServiceMotionProps) {
  const b = getBuild(title, tagline, bullets);
  const { fs, lh, top, groups, climax, query, qn, qf, items, bf, clamp }: Layout = b.lay;
  const A = (n: string) => `sgm-a ${b.ns}${n}`;
  const origin = (g: Group) => `${f((g.ox / g.w) * 100, 2)}% 80%`;
  const og = `${b.ns}og`;
  const sg = `${b.ns}sg`;
  const PCR = PH / 2;
  // other results at their FINAL slots (original rank r ends at r + 1), grouped by the leap that knocks them down
  const finalTop = (r: number) => slotY(r + 1);

  return (
    <div className={`illu-motion sgm-root${className ? ` ${className}` : ""}`} data-motion-root="" aria-hidden="true" data-nosnippet="">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      <ScrollPause />

      {/* off-screen, content-visibility skips the whole scene (no restyle at all);
          absolutely positioned, so its remembered size never feeds the layout */}
      <div className="sgm-cv">
        <div className={`sgm-L ${A("shake")}`}>
          <i className="sgm-grid" />
          <i className="sgm-rail" />
          <i className="sgm-floor" />

          {/* ── the results page (slides left, tilts) ── */}
          <div className={`sgm-L sgm-serpw ${A("serp")}`}>
            {/* printed: exists only above the scanner */}
            <div className={`sgm-clip sgm-pwo ${A("pwo")}`}>
              <div className={`sgm-z ${A("pwi")}`}>
                <div className="sgm-o0" style={{ left: cq(-PC_X0), top: cq(-ER_Y1) }}>
                  <i className="sgm-abs sgm-card" style={at(SX, SY, SW, SH)} />
                  <svg className="sgm-outl" viewBox="0 0 400 400" fill="none">
                    <defs>
                      <linearGradient id={og} x1={SX} y1={SY} x2={SX + SW} y2={SY + SH} gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#14e0c8" />
                        <stop offset=".5" stopColor="#22d38c" />
                        <stop offset="1" stopColor="#2e66ff" />
                      </linearGradient>
                    </defs>
                    <rect x={SX} y={SY} width={SW} height={SH} rx="12" stroke={`url(#${og})`} strokeOpacity=".7" strokeWidth="1.4" />
                  </svg>
                  <i className="sgm-abs sgm-div" style={at(SX + 10, 136.5, SW - 20, 0.8)} />
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} className="sgm-abs sgm-num" style={at(NUM_CX - 5, slotC(i + 1) - 4, 10, 8)}>
                      {i + 1}
                    </span>
                  ))}
                  {/* the other results, grouped by the leap that knocks them down */}
                  {KNOCK.map((ranks, j) => (
                    <div key={j} className={`sgm-o0 ${A(`g${j}`)}`} style={{ left: 0, top: 0 }}>
                      {ranks.map((r) => (
                        <div key={r} className="sgm-row" style={at(RX, finalTop(r), RW, RH)}>
                          <Row {...OTHERS[r - 1]} />
                        </div>
                      ))}
                    </div>
                  ))}
                  {/* the scanner's lock on #8 */}
                  <span className={`sgm-lock ${A("lock")}`} style={at(NUM_CX - 10, slotY(8) - CRP - 3, CRX + CRW + 3 - (NUM_CX - 10), RH + 2 * CRP + 6)}>
                    <span className="sgm-lkb" style={atq(CRX - 3 - (NUM_CX - 10), 0, CRW + 6, RH + 2 * CRP + 6)}>
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="sgm-n8" style={atq(1, (RH + 2 * CRP + 6) / 2 - 6, 18, 12)}>
                      #8
                    </span>
                  </span>
                  {/* the client: vortx.lu (base position: #1) */}
                  <div className={`sgm-crow ${A("cr")}`} style={at(CRX, slotY(1) - CRP, CRW, RH + 2 * CRP)}>
                    <i className="sgm-abs sgm-fav" style={{ ...atq(5, CRP + 1, 6.5, 6.5), background: "#c8f02e", boxShadow: "0 0 1.4cqw rgb(200 240 46/.7)" }} />
                    <span className="sgm-url" style={{ left: cq(14.5), top: cq(CRP + 2) }}>
                      vortx.lu
                    </span>
                    <i className="sgm-abs sgm-sk" style={{ ...atq(5, CRP + 10, 150, 5), background: "linear-gradient(90deg,#c8f02e,#14e0c8)" }} />
                    <i className="sgm-abs sgm-sk" style={{ ...atq(5, CRP + 18.4, 168, 2.8), background: "rgb(242 243 238/.2)" }} />
                  </div>
                  {/* #1 badge, frame, ↑7 */}
                  <div className={`sgm-bdg ${A("bdg")}`} style={at(NUM_CX - 10, slotY(1) - CRP - 2, CRX + CRW + 2 - (NUM_CX - 10), RH + 2 * CRP + 4)}>
                    <i className="sgm-frm" style={atq(CRX - 1 - (NUM_CX - 10), 0, CRW + 2, RH + 2 * CRP + 4)} />
                    <span className="sgm-n1" style={atq(1, (RH + 2 * CRP + 4) / 2 - 6, 18, 12)}>
                      #1
                    </span>
                    <span className="sgm-up" style={atq(CRX + 14.5 + 8 * 0.6 * 5.4 + 4 - (NUM_CX - 10), CRP + 3, 16, 7.5)}>
                      ↑7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* search pill: forged outline, white-hot pill, typed query */}
            <i className={`sgm-fo ${A("fo")}`} style={{ ...at(PX - SW_C / 2, PY - SW_C / 2, b.foW, PH + SW_C), borderRadius: `${cq(PCR + SW_C / 2)} 0 0 ${cq(PCR + SW_C / 2)}` }} />
            <div className={`sgm-pill ${A("pill")}`} style={at(PX, PY, PW, PH)}>
              <svg className="sgm-mag" style={atq(6, 4.5, 9, 9)} viewBox="0 0 16 16" fill="none">
                <circle cx="6.8" cy="6.8" r="4.6" stroke="rgb(242 243 238 / .6)" strokeWidth="1.8" />
                <path d="m10.3 10.3 3.6 3.6" stroke="rgb(242 243 238 / .6)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="sgm-go" style={atq(PW - 16, 3, 12, 12)}>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="sgm-qw" style={{ left: cq(QX - PX), right: cq(22) }}>
                <span className="sgm-q" style={{ fontSize: cq(qf) }}>
                  {query}
                </span>
                <i className={`sgm-qc ${A("qc")}`} style={{ transform: `translateX(${cq(qn * MONO_ADV * qf)})` }} />
              </span>
            </div>
          </div>

          {/* ── the AI answer panel ── */}
          <div className={`sgm-ai ${A("ai")}`} style={at(AX, AY, AW, AH)}>
            <i className="sgm-aib" />
            <i className="sgm-aihd" style={{ height: cq(32) }} />
            <span className="sgm-ail" style={{ left: cq(30), top: cq(10), height: cq(12) }}>
              AI
            </span>
            <span className="sgm-ail" style={{ right: cq(12), top: cq(10), height: cq(12) }}>
              <i />
              <i />
              <i />
            </span>
            <i className="sgm-abs sgm-div" style={atq(10, 31.5, AW - 20, 0.8)} />
            <Answer items={items} bf={bf} clamp={clamp} />
            <div className="sgm-src" style={atq(12, CHIP_Y, AW - 24, 15)}>
              <span className="sgm-chip" style={{ width: cq(CHIP_W) }}>
                <b>1</b>
                vortx.lu
              </span>
              <span className="sgm-chip">
                <b>2</b>
                <s />
              </span>
              <span className="sgm-chip">
                <b>3</b>
                <s style={{ width: "3cqw" }} />
              </span>
            </div>
            <div className="sgm-in" style={atq(10, AH - 30, AW - 20, 20)}>
              <s style={{ width: cq(70) }} />
              <b>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M8 13V3.5M3.8 7.5 8 3.3l4.2 4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </b>
            </div>
            {/* animated layers last: nothing static paints over them (cheap layerization) */}
            <span className={`sgm-spk ${A("spk")}`} style={atq(9, 8, 16, 16)}>
              <svg viewBox="-12 -12 24 24">
                <defs>
                  <linearGradient id={sg} x1="-10" y1="-10" x2="10" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#c8f02e" />
                    <stop offset="1" stopColor="#14e0c8" />
                  </linearGradient>
                </defs>
                <path d={STAR} fill={`url(#${sg})`} />
              </svg>
            </span>
            {/* the streaming covers ride an invisible copy of the answer (same layout) */}
            <Answer items={items} bf={bf} clamp={clamp} cover={(i) => A(`bc${i}`)} />
            <span className={`sgm-chip sgm-chl ${A("chl")}`} style={atq(12, CHIP_Y, CHIP_W, 15)}>
              <b>1</b>
              vortx.lu
            </span>
            <i className={`sgm-aih ${A("aih")}`} />
          </div>

          {/* ── kinetic headline: the tagline in two beats ── */}
          <div className="sgm-title" style={{ top: cq(top), fontSize: cq(fs) }}>
            <span className="sgm-ln" style={{ height: cq(lh) }}>
              {groups.map((g, i) => (
                <span key={i} className={`sgm-w ${A(`w${i}`)}`} style={{ transformOrigin: origin(g), ...(i ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null) }}>
                  <Txt s={g.text} />
                </span>
              ))}
            </span>
            <span className="sgm-ln sgm-lnL">
              <span className={`sgm-w ${A("wL")}`} style={{ transformOrigin: origin(climax) }}>
                <span className={`sgm-gh ${A("gh")}`}>
                  <Txt s={climax.text} />
                </span>
                <Txt s={climax.text} />
                <span className={`sgm-hg ${A("hg")}`}>
                  <Txt s={climax.text} />
                </span>
              </span>
              <i className={`sgm-ul ${A("ul")}`} style={{ width: cq(climax.w) }} />
            </span>
          </div>

          {/* ── front FX: scanner, searchlight, comet, rail heads, pools ── */}
          <div className="sgm-L">
            <div className={`sgm-scan ${A("scan")}`}>
              <i className="sgm-scanw" />
              <i className="sgm-scanl" />
              <i className="sgm-scanf" style={{ left: "8em" }} />
              <i className="sgm-scanf" style={{ left: "108em" }} />
            </div>
            <div className="sgm-cone">
              <div className={`sgm-coner ${A("cone")}`}>
                <i className="sgm-cw" />
                <i className="sgm-ce" style={{ rotate: `${-CONE_HALF}deg` }} />
                <i className="sgm-ce" style={{ rotate: `${CONE_HALF}deg` }} />
                <i className="sgm-ck" />
                <i className="sgm-co" />
              </div>
            </div>
            {Array.from({ length: b.nCm }, (_, i) => (
              <i key={i} className={`sgm-com ${A(`cm${i}`)}`} />
            ))}
            {HEADS.map((h) => (
              <Fragment key={h.id}>
                <i className={`sgm-hb sgm-c-${h.c} ${A(`${h.id}b`)}`} />
                <div className={`sgm-hd sgm-c-${h.c} ${A(`${h.id}p`)}`} style={{ transform: `translate(${cq(h.home[0])},${cq(h.home[1])})` }}>
                  <i className="sgm-hc" />
                </div>
              </Fragment>
            ))}
            {b.pf.map((c, i) => (
              <i key={i} className={`sgm-pf sgm-c-${c || "lime"} ${A(`pf${i}`)}`} />
            ))}
            {b.ps.map((c, i) => (
              <i key={i} className={`sgm-ps sgm-c-${c || "lime"} ${A(`ps${i}`)}`}>
                <SparkArt />
              </i>
            ))}
          </div>

          <i className={`sgm-flash ${A("flash")}`} />
        </div>
      </div>
    </div>
  );
}
