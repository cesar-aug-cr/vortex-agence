import { Fragment, type CSSProperties } from "react";
import { LOGO_GEOMETRY } from "@/components/brand/LogoMark";
import {
  anim,
  BACK,
  BACK2,
  begin,
  COOL,
  end,
  EO,
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
} from "./anim";
import {
  CTA_ARROW,
  CTA_FS0,
  CTA_GAP,
  CTA_H,
  CTA_LS,
  CTA_PL,
  CTA_PR,
  CTA_X,
  CTA_Y,
  FS0,
  layout,
  LINE,
  SPACE_EM,
  TAG_FS0,
  TAG_W,
  TAG_Y,
  TITLE_W,
  TITLE_X,
  TITLE_Y,
  TLS,
  type Group,
  type Layout,
} from "./layout";
import { ScrollPause } from "./ScrollPause";
import type { SitesWebMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  "LASER LIGHT SHOW" — hero motion graphic of /services/sites-web
 * ─────────────────────────────────────────────────────────────────────────────
 *  One master loop, T = 14 s. Every beat is a keyframe percentage of T: no
 *  animation-delay, no fill-mode, no secondary loop.
 *
 *  Cast: two corner TRACERS (lime bottom-left, cyan bottom-right) that also
 *  power the two concert FANS; a wall-to-wall PRINTHEAD; four RAIL HEADS (lime
 *  left, cyan + green top, blue right) that glide on a dashed rail, swell as
 *  they charge and fire every hit beam.
 *
 *  0.00–0.45  IGNITION. The fans start on the line the tracers ended on (seam),
 *             burst open, flick across the panel and snap shut into the tracers.
 *  0.45–1.30  FRAME TRACE. From the top-left corner the tracers race round the
 *             window in opposite directions — the outline (and the title bar)
 *             exists only behind their tips — and collide bottom-right: sparks,
 *             flash, micro-shake.
 *  1.30–2.30  WELD. The rim glows white-hot / lime and cools to the cyan → blue
 *             outline; a glint crosses the glass. The lime tip taps the dots,
 *             the cyan tip extrudes the URL bar.
 *  1.61–2.47  PRINTHEAD. The page exists only above it: glass, nav, the "</>
 *             Sur-mesure" chip. The cyan head slams the real wordmark and sweeps the
 *             menu, the green head stamps the nav CTA and sweeps to the eyebrow.
 *  2.26–3.93  KINETIC HEADLINE. Each word group is shot by a rail head (charge,
 *             beam, flare), materialises big and stretched — scale and origin
 *             fitted so it never leaves the panel — slams down (squash, rebound)
 *             in a white-hot bloom, sparks fly. The climax word (3.47) takes all
 *             four heads: flash, white-hot chromatic jitter, camera shake, laser
 *             underline.
 *  3.77–4.09  Tagline printed.
 *  3.92–5.80  CTA FORGE. The heads charge and converge on the pill's left end;
 *             two weld tips trace its outline (two beams each) and collide on
 *             the right (4.80): white-hot pill, cools to lime, the label rises in
 *             a skewed wave with its arrow.
 *  5.30–5.95  Printhead extrudes the cards + footer, exits.
 *  5.90–6.93  TRICK SHOTS. Three heads fire bolts that ricochet off the rail
 *             into the cards: score ring "100", SEO bars, and the conversion
 *             card — which boots into an EMPTY, flat chart.
 *  6.88–7.50  The cursor glides in (fans glow faintly behind) and clicks the CTA.
 *  7.56–8.90  PAYOFF. Three conversion comets arc from the CTA into the chart,
 *             one after the other; each landing kicks the bars, draws the line
 *             one step and rolls the "+38 %" reel. 8.96 "200 OK", 9.04 LIVE:
 *             victory lap of the tracers, the fans burst.
 *  10.1–12.6  HOLD. Headline wave + chromatic echo, vertical QA scan, premium 3D
 *             tilt (lime rim light, glass sheen) with the fans sweeping behind.
 *  12.8–14.0  ERASE. The printhead sweeps back up and the page vanishes under
 *             it; the tracers eat the outline back into its corner; seam.
 *
 *  Performance (phones): Chrome restyles every RUNNING CSS animation on every
 *  main-thread frame (scrolling, hover, any JS animation), composited or not,
 *  so the scene keeps that count low (67 for 14 s of action):
 *   · the page is ONE printed layer revealed by a clip window that follows the
 *     printhead (counter-translated wrapper pair); the outline + title bar are
 *     one static rounded SVG revealed by a diagonal clip window that follows
 *     the tracer tips — no per-row zaps, no outline pieces, no seams; the CTA
 *     outline is revealed the same way behind its weld tips;
 *   · one-shot effects (flares, spark bursts, weld tips, beam legs, comets)
 *     are POOLED: a few sprites jump, invisible, from event to event. A flare
 *     or a ricochet leg only ever plays on a sprite of its own colour;
 *   · a fan is one rotating group + one spread (scaleY) group; a rail head is
 *     a body (glide + charge swell) and a beam; a tracer is one element;
 *   · kinetic type moves per word group (stretch instead of per-letter
 *     tracking at this size); the climax keeps its own white-hot copy.
 *  Only transform / opacity animate, on HTML boxes; SVG is static artwork.
 *  The root is z-index:1: the scene's ~70 composited layers then come LAST in
 *  the paint order of the page's stacking context. Painted before the page's
 *  later sections, they made Chrome's layerization test every later paint
 *  chunk against each of them on every frame (25× slower frames on the real
 *  /services/sites-web page, whose sections hold many inline SVGs).
 *  Off-screen, content-visibility (on an absolutely positioned inner wrapper,
 *  so its remembered size never feeds the page layout; it overhangs the root
 *  by 3rem so its paint containment never cuts the glows) skips the subtree:
 *  no restyle at all. Measured on a 390 px phone at 4× CPU slowdown: ≈ +9.5 ms
 *  per forced main frame on the lab page, ≈ +13 ms on the real page (+16 when
 *  the page also repaints every frame; was +40–50 and +70), idle ≈ +11 ms/s,
 *  off-screen ≈ 0. Scrolling is what produces main-thread frames on a phone,
 *  so <ScrollPause> freezes the scene while the page scrolls (paused
 *  animations are not restyled) and lets it resume right after.
 *  Copy is laid out in layout.ts (auto-fit, 1–3 balanced title lines,
 *  ≤ 4 slam groups, bounded CTA, tagline ≤ 2 lines); keyframe names are
 *  namespaced per string set (anim.ts).
 *
 *  Reduced motion: the global rule collapses every animation, so the
 *  un-animated base styles ARE the poster: the finished, live website.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

type Pt = [number, number];
const eIO = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);
const eLin = (u: number) => u;
const eS = (u: number) => u * u * (3 - 2 * u);
/** inverse of a monotone easing on [0, 1] */
const inv = (e: (u: number) => number, v: number) => {
  let a = 0;
  let b = 1;
  for (let i = 0; i < 40; i++) {
    const m = (a + b) / 2;
    if (e(m) < v) a = m;
    else b = m;
  }
  return (a + b) / 2;
};
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
/** viewBox units → % of the (square) root */
const P = (u: number) => `${f(u / 4, 3)}%`;
/** viewBox units → cqw (sizes) */
const cq = (u: number) => `${f(u / 4, 3)}cqw`;
const angle = (a: Pt, b: Pt) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;

// browser window
const WX = 26;
const WY = 30;
const WR = 374;
const WB = 366;
const RR = 12;
const CH = 54; // bottom of the chrome bar
const WW = WR - WX;
// the tracers start at the top-left corner's apex and meet at the bottom-right one
const C45 = RR * (1 - Math.SQRT1_2);
const A0: Pt = [WX + C45, WY + C45];
const A1: Pt = [WR - C45, WB - C45];
const PA: Pt[] = [A0, ...arc(WX + RR, WY + RR, RR, 225, 270, 2), [WR - RR, WY], ...arc(WR - RR, WY + RR, RR, 270, 360, 4), [WR, WB - RR], ...arc(WR - RR, WB - RR, RR, 0, 45, 2)];
const PB: Pt[] = [A0, ...arc(WX + RR, WY + RR, RR, 225, 180, 2), [WX, WB - RR], ...arc(WX + RR, WB - RR, RR, 180, 90, 4), [WR - RR, WB], ...arc(WR - RR, WB - RR, RR, 90, 45, 2)];
const LA = plen(PA);
const LB = plen(PB);
// victory laps: one full loop each, from the bottom-right weld, opposite ways
const LAP_L: Pt[] = [...[...PA].reverse(), ...PB.slice(1)];
const LAP_R: Pt[] = [...[...PB].reverse(), ...PA.slice(1)];

// chrome / nav anchors
const DOTS: Pt[] = [
  [42, 42],
  [54, 42],
  [66, 42],
];
const URL_BAR = { x: 84, y: 36, w: 176, h: 12 }; // address bar, extruded by the cyan tip
const URL_P0: Pt = [URL_BAR.x, URL_BAR.y + URL_BAR.h / 2];
const URL_P1: Pt = [URL_BAR.x + URL_BAR.w, URL_BAR.y + URL_BAR.h / 2];
const LOGO_C: Pt = [67, 72];
const NAVCTA_C: Pt = [331, 72];
/** centre of the "</> {eyebrow}" chip (left 42, y 99), where the green hit
 *  stamps it: JetBrains Mono advances 0.6em, at 7 units, + 4.8 padding a side */
const eyeCentre = (label: string): Pt => [42 + ([...label].length * 0.6 * 7 + 2 * 4.8) / 2, 99];
const MENU_X = [168, 206, 244];

// cards / chart
const CARD_X = [42, 151, 260];
const CARD_W = 98;
const CARD_Y = 254;
const CARD_H = 64;
const CHART: Pt[] = [
  [270, 306],
  [287, 297],
  [303, 300],
  [320, 287],
  [336, 290],
  [350, 274],
];
const CHART_BASE = 310;
const RING_R = 13;
const BAR_H = [12, 19, 26, 36];
/** conversion bars under the chart line (their tops follow the line) */
const CBAR = Array.from({ length: 5 }, (_, i) => {
  const x = 272 + i * 15.8;
  const w = 12.8;
  const cx = x + w / 2;
  let y = CHART[0][1];
  for (let j = 1; j < CHART.length; j++)
    if (cx <= CHART[j][0]) {
      const [a, b] = [CHART[j - 1], CHART[j]];
      y = a[1] + ((b[1] - a[1]) * (cx - a[0])) / (b[0] - a[0]);
      break;
    }
  return { x, w, h: CHART_BASE - y };
});
/** "+38 %" odometer: the strip rolls one step per conversion */
const REEL = [" ", "+04 %", "+09 %", "+12 %", "+17 %", "+21 %", "+26 %", "+31 %", "+35 %", "+38 %"];

// corner emitters (just outside the root, inside the stage padding)
const EBL: Pt = [-6, 406];
const EBR: Pt = [406, 406];
const BEAM_U = 600; // tracer element length in units (150cqw)

// rail heads ride a dashed rail inset RI from the panel edge
const RI = 11;
const RHI = 400 - RI;
const HEADS = [
  { id: "hL", c: "lime", home: [RI, 300] as Pt },
  { id: "hT", c: "cyan", home: [130, RI] as Pt },
  { id: "hU", c: "green", home: [270, RI] as Pt },
  { id: "hR", c: "blue", home: [RHI, 300] as Pt },
];
const [HL, HT, HU, HR] = [0, 1, 2, 3];

/* ───────────────────────────── master beats (ms) ─────────────────────────── */

const TR_A = 450; // frame trace
const TR_Z = 1300;
const DOT_T = [1420, 1490, 1560];
const URL_A = 1400;
const URL_Z = 1630;
const GL_A = TR_Z + 240; // glint across the fresh glass
const GL_Z = TR_Z + 1000;
const PH_ON = 1610; // printhead ignition
const SLOT = [2490, 2710, 2930, 3150]; // title word groups, right-aligned onto the last slots
const LAST = 3470; // climax impact
const PRE = 110; // beam lands → word slams down for PRE ms
const PRE_L = 150;
const FG_A = 4250; // CTA forge: weld tips trace the pill
const FG_Z = 4800;
const SHOT_FIRE = [5900, 6150, 6400];
const TRAVEL = 240;
const LIT = TRAVEL + 50; // each point of a ricochet path stays lit this long (the tail follows the packet)
const CLICK = 7500;
const COMET_FLY = 360;
const COMET_A = [0, 1, 2].map((i) => CLICK + 60 + i * 420);
const LAND = COMET_A.map((t) => t + COMET_FLY);
const OK_T = 8960;
const LIVE_T = 9040;
const FAN2 = 9000;
const LAP_A = LIVE_T;
const LAP_Z = LIVE_T + 1000;
const WAVE = 10150;
const VS_A = 10650; // vertical QA scan
const VS_Z = 11400;
const TILT = [11450, 12000, 12050, 12550];
const SH_A = 11600; // glass sheen while tilted
const SH_Z = 12300;
const ER_A = 12800; // printhead erase pass (bottom → top)
const ER_Z = 13700;
const EAT_A = 13250; // tracers eat the outline back
const EAT_Z = 13800;

// printhead moves: [t0, t1, y0, y1] (eased in-out)
type Sc = [number, number, number, number];
const SCAN: Sc[] = [
  [1710, 2010, CH, 92],
  [2010, 2250, 92, 114],
  [2250, 2470, 114, 184],
  [3770, 3970, 184, 214],
  [3970, 4090, 214, 250],
  [5300, 5620, 250, 324],
  [5620, 5840, 324, WB],
];
const PH_OUT = 5950;
const SCAN_ALL: Sc[] = [...SCAN, [ER_A, ER_Z, WB, WY]];
/** when the printhead crosses y (going down, or up during the erase pass) */
function scanAt(y: number, up = false): number {
  for (const [t0, t1, y0, y1] of SCAN_ALL) {
    if (up !== y1 < y0) continue;
    if (y < Math.min(y0, y1) || y > Math.max(y0, y1)) continue;
    return Math.round(t0 + (t1 - t0) * inv(eIO, (y - y0) / (y1 - y0)));
  }
  return 0;
}
const tNav = scanAt(72);
const tEye = scanAt(99);
const tNavCta = tNav + 165;
const TL_SWEEP: [number, number] = [tNav + 40, tNav + 250];
const oNav = scanAt(84, true);

/* ───────────────────────────── ricochet bolts ────────────────────────────── */

/** trace a ray BACKWARDS from the target, reflecting on the rail → source…target */
function ricochet(target: Pt, dir: Pt, bounces: number): Pt[] {
  const pts: Pt[] = [target];
  let p = target;
  let d = dir;
  for (let i = 0; i <= bounces; i++) {
    const tx = d[0] > 0 ? (RHI - p[0]) / d[0] : d[0] < 0 ? (RI - p[0]) / d[0] : Infinity;
    const ty = d[1] > 0 ? (RHI - p[1]) / d[1] : d[1] < 0 ? (RI - p[1]) / d[1] : Infinity;
    const k = Math.min(tx, ty);
    p = [p[0] + d[0] * k, p[1] + d[1] * k];
    pts.push(p);
    d = tx < ty ? [-d[0], d[1]] : [d[0], -d[1]];
  }
  return pts.reverse();
}
// each bolt leaves a rail head (pts[0] is on that head's edge), bounces twice
// off the rail and lands in a card
const SHOTS = [
  { tgt: [91, 286] as Pt, deg: -136, head: HR, c: "blue" },
  { tgt: [200, 286] as Pt, deg: 58, head: HU, c: "green" },
  { tgt: [309, 286] as Pt, deg: -45, head: HL, c: "lime" },
].map((s, k) => {
  const r = (s.deg * Math.PI) / 180;
  const pts = ricochet(s.tgt, [Math.cos(r), Math.sin(r)], 2);
  const lens = pts.slice(1).map((q, i) => dist(pts[i], q));
  const L = lens.reduce((a, b) => a + b, 0);
  const fire = SHOT_FIRE[k];
  let acc = 0;
  const segs = lens.map((l, i) => {
    const s0 = fire + (TRAVEL * acc) / L;
    acc += l;
    return { from: pts[i], to: pts[i + 1], s0, s1: fire + (TRAVEL * acc) / L };
  });
  return { ...s, pts, segs, fire, hit: fire + TRAVEL, back: angle(s.tgt, pts[pts.length - 2]) };
});
const HITS = SHOTS.map((s) => s.hit);

/* ───────────────────────────── rail-head choreography ─────────────────────── */

// glides along each head's own rail edge: [t0, t1, to, easing]
type Glide = [t0: number, t1: number, to: Pt, ease?: string];
const LX = RI;
const PLAN: Glide[][] = [];
PLAN[HL] = [
  [1400, 2100, [LX, 215]],
  [2790, 3060, [LX, 60]],
  [3560, 3950, [LX, 340]],
  [5000, 5500, SHOTS[2].pts[0]],
  [7000, 8500, [LX, 240], IOS],
  [9300, 11000, [LX, 150], IOS],
  [11100, 12500, [LX, 230], IOS],
  [12700, 13600, HEADS[HL].home],
];
PLAN[HT] = [
  [1350, 1650, [100, RI]],
  [5000, 5600, [190, RI]],
  [7000, 8500, [150, RI], IOS],
  [9400, 11200, [110, RI], IOS],
  [11300, 12600, [160, RI], IOS],
  [12700, 13600, HEADS[HT].home],
];
PLAN[HU] = [
  [1350, 1650, [300, RI]],
  [3560, 3900, [250, RI]],
  [5000, 5400, SHOTS[1].pts[0]],
  [7000, 8500, [300, RI], IOS],
  [9300, 11000, [320, RI], IOS],
  [11100, 12500, [262, RI], IOS],
  [12700, 13600, HEADS[HU].home],
];
PLAN[HR] = [
  [1400, 2600, [RHI, 60]],
  [3560, 3950, [RHI, 340]],
  [5000, 5500, SHOTS[0].pts[0]],
  [7000, 8400, [RHI, 240], IOS],
  [9300, 11100, [RHI, 140], IOS],
  [11200, 12500, [RHI, 230], IOS],
  [12700, 13600, HEADS[HR].home],
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
// which head shoots which title slot
const SLOT_HEAD = [HT, HL, HT, HU];

/* ───────────────────────────── generic shapes ──────────────────────────── */

const Z0 = "opacity:0";
const O1 = "opacity:1";
/** elastic scale pop in at a (ends visible) */
function popIn(name: string, a: number, from = 0.3, over = 1.18, dur = 330) {
  kf(name, [
    [0, `opacity:0;transform:scale(${f(from)})`],
    [a - 2, `opacity:0;transform:scale(${f(from)})`, OUT],
    [a + dur * 0.42, `opacity:1;transform:scale(${f(over)})`, OUT],
    [a + dur, "opacity:1;transform:scale(1)"],
  ]);
}
/** laser wrapper on/off with an ignition flicker */
function onoff(on: [number, number][], fo = 140): Key[] {
  const k: Key[] = [[0, 0]];
  for (const [a, b] of on) k.push([a - 50, 0], [a - 32, 1], [a - 18, 0.3], [a, 1], [b, 1], [b + fo, 0]);
  return k;
}

/* pooled sprites — values: F [x, y, sx, sy, o] · S [x, y, rot, s, o] · legs
   [x, y, rot, tail, sx] · comet [x, y, rot, o] (x, y, tail in units) */
/** translate() of a point in units, 0.1cqw precision (≤ 0.3 px at 580 px) */
const tr2 = (x: number, y: number) => `translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw)`;
const fmtF = ([x, y, sx, sy, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} scale(${f(sx)},${f(sy)})`;
const fmtS = ([x, y, r, s, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg) scale(${f(s)})`;
const fmtLeg = ([x, y, r, tail, sx]: number[]) => `transform:${tr2(x, y)} rotate(${f(r, 1)}deg) translateX(${f(tail / 4, 1)}cqw) scaleX(${f(sx, 3)})`;
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
const sparkEv = (p: Pt, t: number, rot: number, size: number, life: number, pri: number, tag: string): PoolEvent => ({
  pri,
  tag,
  fr: [
    [t - 2, [p[0], p[1], rot, 0.25 * size, 0], OUT],
    [t + 18, [p[0], p[1], rot, 0.55 * size, 1], OUT],
    [t + life * 0.45, [p[0], p[1] + 4 * size, rot, size, 0.85]],
    [t + life, [p[0], p[1] + 14 * size, rot, 1.12 * size, 0]],
  ],
});

/* ───────────────────────────── lasers (polar sampling) ───────────────────── */

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

type Mv = { a: number; b: number; p: Pt[]; e?: (u: number) => number; tol?: number };
/**
 * Emitter-anchored tracer: ONE element (the beam, its right end the hot tip),
 * `rotate(θ) translateX(r)` around the laser head + its on/off opacity. The tip
 * path is sampled densely, converted to polar coordinates and simplified so
 * that linear interpolation of θ / r stays within `tol` units of the true path.
 */
function laser(id: string, o: Pt, moves: Mv[], on: [number, number][]) {
  const g: Key[] = [];
  const r: Key[] = [];
  let prev = Number.NaN;
  let last = -1;
  for (const mv of moves) {
    const L = plen(mv.p);
    const n = Math.max(2, Math.ceil((mv.b - mv.a) / 8));
    const ss: PS[] = [];
    for (let i = 0; i <= n; i++) {
      const t = mv.a + ((mv.b - mv.a) * i) / n;
      const p = pat(mv.p, (mv.e ?? eLin)(i / n) * L);
      let a = angle(o, p);
      if (!Number.isNaN(prev)) {
        while (a - prev > 180) a -= 360;
        while (a - prev < -180) a += 360;
      }
      prev = a;
      ss.push({ t, g: a, r: dist(o, p), p });
    }
    for (const s of rdpPolar(o, ss, mv.tol ?? 0.8)) {
      if (s.t - last < 1) {
        g.pop();
        r.pop();
      }
      g.push([s.t, s.g]);
      r.push([s.t, (s.r / BEAM_U) * 100]);
      last = s.t;
    }
  }
  anim(`${id}m`, onoff(on), [
    ["rotate", "deg", 1, g],
    ["translateX", "%", 2, r],
  ]);
}

/* ───────────────────────────── rail heads: body + beam ───────────────────── */

type Shot =
  | { k: "hit"; land: number; to: Pt; travel: number }
  | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number }
  | { k: "bolt"; s0: number; s1: number; r0: number; r1: number; to: Pt };
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.k === "track" ? s.a - s.travel : s.s0);
const shotEnd = (s: Shot) => (s.k === "hit" ? s.land + 167 : s.k === "track" ? s.b + 152 : s.r1 + 2);

/**
 * One head = TWO elements: the body (glides on the rail, swells while it
 * charges: translate + scale) and its beam (translate to the parked head,
 * rotate · scaleX, fades out at full length once its energy is delivered).
 */
function headKF(k: number, list: Shot[]) {
  const h = HEADS[k];
  const sorted = [...list].sort((p, q) => shotStart(p) - shotStart(q));
  // beam frames: [x, y, rot, sx, o]
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
    if (dist(o, oz) > 0.01) throw new Error(`swb: head ${h.id} moves while firing at ${t0} ms`);
    const B = (g: number, sx: number, op = 1, e?: string): [number[], string | undefined] => [[o[0], o[1], g, sx, op], e];
    const push = (t: number, [v, e]: [number[], string | undefined]) => fr.push([t, v, e]);
    if (s.k === "hit") {
      // charge → the beam shoots out of the head, lands, burns, fades
      const g = un(angle(o, s.to));
      const len = dist(o, s.to) / 400;
      push(t0 - 4, B(g, 0));
      push(t0, B(g, 0, 1, GROW));
      push(s.land, B(g, len));
      push(s.land + 45, B(g, len, 1, TAIL));
      push(s.land + 165, B(g, len, 0));
      push(s.land + 167, B(g, 0, 0));
      fires.push([t0, t0]);
    } else if (s.k === "track") {
      // the beam locks onto a moving point and follows it
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
    } else {
      // bolt: first leg of a ricochet (grows to the first bounce, the packet ricochets on)
      const g = un(angle(o, s.to));
      const len = dist(o, s.to) / 400;
      push(s.s0 - 4, B(g, 0));
      push(s.s0, B(g, 0));
      push(s.s1, B(g, len));
      push(s.r0, B(g, len, 1, TAIL));
      push(s.r1, B(g, len, 0));
      push(s.r1 + 2, B(g, 0, 0));
      fires.push([s.s0, s.s0]);
    }
  }
  kf(
    `${h.id}b`,
    fr.map(([t, [x, y, g, sx, op], e]): Stop => [t, `opacity:${f(op)};transform:${tr2(x, y)} rotate(${f(g, 1)}deg) scaleX(${f(sx, 3)})`, e]),
  );
  // body: glides (translate) + charge swell before each shot, flash as the beam leaves
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

const PW_PAD = 6; // the printed page's clip box overhangs the window by this much
const DG_U = 570; // diagonal clip box: length behind its front (units)
const DG_V = [-262, 262]; // … and its extent across the diagonal
const DG_OPEN = 545; // front position (u = (x + y) / √2) when fully open (past the bottom-right glow)
const DG_HID = DG_OPEN - 15; // offset that hides the whole window (front before the top-left glow)
const CX0 = 266; // chart line clip box
const CX1 = 357;
const FO_M = 4; // the CTA forge clip box's margin around the outline (its glow)

function build(title: string, tagline: string, cta: string, eyebrow: string, ns: string) {
  begin(ns);
  const lay = layout(title, tagline, cta);
  const EYE_C = eyeCentre(`</> ${eyebrow}`);
  const { fs, lh, groups, climax, ctaW } = lay;
  const shots: Shot[][] = HEADS.map(() => []);
  const FL: PoolEvent[] = []; // flares
  const SP: PoolEvent[] = []; // spark bursts
  const LG: PoolEvent[] = []; // ricochet legs
  const CM: PoolEvent[] = []; // comets

  /* ── window: weld rim, glint / sheen, QA scan, 3D tilt ── */
  kf("rim", [
    [0, Z0],
    [TR_Z - 4, Z0],
    [TR_Z + 20, O1],
    [TR_Z + 150, O1, COOL],
    [TR_Z + 950, Z0],
    [TILT[0], Z0, IO],
    [TILT[1], "opacity:.8"],
    [TILT[2], "opacity:.8", IO],
    [TILT[3], Z0],
  ]);
  {
    const S = (o: number, x: number) => `opacity:${f(o)};transform:translateX(${x}%) skewX(-18deg)`;
    kf("sheen", [
      [0, S(0, -130)],
      [GL_A - 2, S(0, -130)],
      [GL_A, S(1, -130), IO],
      [GL_Z, S(1, 330)],
      [GL_Z + 2, S(0, -130)],
      [SH_A - 2, S(0, -130)],
      [SH_A, S(0.7, -130), IO],
      [SH_Z, S(0.7, 330)],
      [SH_Z + 2, S(0, -130)],
    ]);
  }
  {
    const X = (o: number, x: number) => `opacity:${f(o)};transform:translateX(${f(x / 4)}cqw)`;
    kf("vscan", [
      [0, X(0, WX - 14)],
      [VS_A - 120, X(0, WX - 14)],
      [VS_A - 40, X(1, WX - 14)],
      [VS_A, X(1, WX - 14), IO],
      [VS_Z, X(1, WR + 14)],
      [VS_Z + 140, X(0, WR + 22)],
    ]);
  }
  {
    const FLAT = "transform:perspective(170cqw) rotateX(0deg) rotateY(0deg)";
    const TILTED = "transform:perspective(170cqw) rotateX(7deg) rotateY(-9deg)";
    kf("tilt", [
      [0, FLAT],
      [TILT[0], FLAT, IO],
      [TILT[1], TILTED],
      [TILT[2], TILTED, IO],
      [TILT[3], FLAT],
    ]);
  }

  /* ── the page is PRINTED: a clip window whose bottom edge is the printhead ── */
  {
    const HB = WB + PW_PAD;
    const hk: [number, number, string?][] = [[0, HB - WY]];
    for (const [t0, t1, y0, y1] of SCAN) hk.push([t0, HB - y0, IO], [t1, HB - y1]);
    hk.push([PH_OUT, 0], [ER_A, 0, IO], [ER_Z, HB - WY]);
    kf("pwo", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(-h / 4)}cqw)`, e]));
    kf("pwi", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(h / 4)}cqw)`, e]));
  }

  /* ── outline + title bar: a diagonal clip window whose front rides the tips ── */
  {
    const front = (u: number) => {
      const a = pat(PA, u * LA);
      const b = pat(PB, u * LB);
      return Math.max(a[0] + a[1], b[0] + b[1]) / Math.SQRT2 + 2;
    };
    const k: Key[] = [
      [0, DG_HID],
      [TR_A - 2, DG_HID],
    ];
    for (let t = TR_A; t <= TR_Z; t += 10) k.push([t, DG_OPEN - front((t - TR_A) / (TR_Z - TR_A))]);
    k.push([TR_Z + 12, 0], [EAT_A - 12, 0]);
    for (let t = EAT_A; t <= EAT_Z; t += 10) k.push([t, DG_OPEN - front((EAT_Z - t) / (EAT_Z - EAT_A))]);
    k.push([EAT_Z + 40, DG_HID]);
    anim("dgo", null, [["translateX", "cqw", 2, k.map(([t, v]): Key => [t, -v / 4])]]);
    anim("dgi", null, [["translateX", "cqw", 2, k.map(([t, v]): Key => [t, v / 4])]]);
  }
  // the lime tip pops the three dots as it taps them (one element, grows from
  // the first dot); the cyan tip extrudes the URL bar
  kf("dots", [
    [0, "opacity:0;transform:scale(0)"],
    [DOT_T[0] - 2, "opacity:0;transform:scale(0)", OUT],
    [DOT_T[0] + 40, "opacity:1;transform:scale(.42)"],
    [DOT_T[1], "opacity:1;transform:scale(.55)", OUT],
    [DOT_T[1] + 40, "opacity:1;transform:scale(.8)"],
    [DOT_T[2], "opacity:1;transform:scale(.86)", BACK],
    [DOT_T[2] + 220, "opacity:1;transform:scale(1)"],
  ]);
  kf("url", [
    [0, "transform:scaleX(0)"],
    [URL_A, "transform:scaleX(0)", IO],
    [URL_Z, "transform:scaleX(1)"],
  ]);
  // the address rises in once the bar is out (never squashed with it)
  kf("urlT", [
    [0, "opacity:0;transform:translateY(.55cqw)"],
    [URL_Z - 92, "opacity:0;transform:translateY(.55cqw)", OUT],
    [URL_Z + 130, "opacity:1;transform:translateY(0)"],
  ]);
  popIn("ok", OK_T, 0.4, 1.2, 360);
  // headline guides laid down by the printhead, gone once the headline landed
  kf("guide", [[0, O1], [LAST + 200, O1], [LAST + 700, Z0], [T - 20, Z0], [T, O1]]);

  /* ── nav: the cyan head slams the wordmark and sweeps the menu; the green one
        stamps the nav CTA and sweeps to the eyebrow (both printed by the head) ── */
  {
    const L = (o: number, s: number, k: number) => `opacity:${f(o)};transform:scale(${f(s)}) skewX(${f(k)}deg)`;
    kf("logo", [
      [0, L(0, 1.9, -14)],
      [tNav - 70, L(0, 1.9, -14)],
      [tNav - 50, L(1, 1.75, -14), IN],
      [tNav, L(1, 0.9, 6), OUT],
      [tNav + 90, L(1, 1.06, -2), IO],
      [tNav + 190, L(1, 1, 0)],
      // zapped while the erase pass crosses it (as the printed page under it)
      [oNav - 10, L(1, 1, 0)],
      [oNav + 20, L(0.25, 1, 0)],
      [oNav + 36, L(0.8, 1, 0)],
      [oNav + 64, L(0, 1, 0)],
    ]);
  }
  shots[HT].push({
    k: "track",
    a: tNav,
    b: TL_SWEEP[1],
    travel: 90,
    at: (t) => (t <= TL_SWEEP[0] ? LOGO_C : lerp(LOGO_C, [262, 72], eIO((t - TL_SWEEP[0]) / (TL_SWEEP[1] - TL_SWEEP[0])))),
  });
  const eyeAt = (t: number) => lerp(NAVCTA_C, EYE_C, eIO((t - tNavCta) / (tEye - tNavCta)));
  shots[HU].push({ k: "track", a: tNavCta, b: tEye, travel: 90, at: eyeAt });
  FL.push(flareEv(LOGO_C, tNav, 1.15, 320, 1, "cyan"));
  {
    // the green hit stamps the nav CTA, rides the beam's sweep, stamps the eyebrow
    const fr: Frame[] = [
      [tNavCta - 22, [NAVCTA_C[0], NAVCTA_C[1], 0.3, 0.3, 0], OUT],
      [tNavCta, [NAVCTA_C[0], NAVCTA_C[1], 0.95, 0.95, 1], OUT],
    ];
    for (let i = 1; i < 4; i++) {
      const t = tNavCta + ((tEye - tNavCta) * i) / 4;
      const p = eyeAt(t);
      fr.push([t, [p[0], p[1], 0.62, 0.62, 1]]);
    }
    fr[fr.length - 1][2] = OUT;
    fr.push([tEye, [EYE_C[0], EYE_C[1], 0.85, 0.85, 1], OUT], [tEye + 280, [EYE_C[0], EYE_C[1], 0.38, 0.38, 0]]);
    FL.push({ pri: 1, tag: "green", fr });
  }
  SP.push(sparkEv([LOGO_C[0], LOGO_C[1] + 6], tNav, 0, 0.5, 380, 1, "cyan"));

  /* ── headline: per group slam (fitted scale + origin, stretch → squash →
        rebound) in a white-hot bloom; wave in the hold; spread-out erase ── */
  const pY = (em: number) => f((em / LINE) * 100, 2); // em → % of the group box
  function slamKF(name: string, t: number, big: boolean, wave: number, out: [number, number], g: Group) {
    // the hold wave swells about the group centre (not the fitted origin)
    const cx = (s: number) => f(((1 - s) * (g.w / 2 - g.ox) * 100) / g.w, 2);
    const tr = (o: number, y: number, sx: number, sy: number, sk: number, x = "0") =>
      `opacity:${f(o)};transform:translateX(${x}%) translateY(${pY(y)}%) scale(${f(sx, 3)},${f(sy, 3)}) skewX(${f(sk, 1)}deg)`;
    const k0 = big ? -18 : -14;
    const y0 = big ? -0.3 : -0.22;
    const pre = big ? PRE_L : PRE;
    const { s0, k } = g;
    kf(name, [
      [0, tr(0, y0, s0 * k, s0, k0)],
      [t - pre, tr(0, y0, s0 * k, s0, k0)],
      [t - pre + 26, tr(1, y0 * 0.9, s0 * 0.94 * k, s0 * 0.94, k0), IN],
      [t, tr(1, 0.035, big ? 0.94 : 0.96, big ? 0.82 : 0.86, big ? 9 : 6), OUT],
      [t + 90, tr(1, -0.02, big ? 1.05 : 1.03, big ? 1.1 : 1.06, -3), IO],
      [t + 190, tr(1, 0.005, 0.99, 0.985, 1), IO],
      [t + 290, tr(1, 0, 1, 1, 0)],
      [wave, tr(1, 0, 1, 1, 0), OUT],
      [wave + 120, tr(1, -0.13, 1.035, 1.035, -3.5, cx(1.035)), IO],
      [wave + 330, tr(1, 0, 1, 1, 0)],
      // zapped while the erase pass crosses the line (gone once it clears it)
      [out[0] - 12, tr(1, 0, 1, 1, 0), OUT],
      [out[1] + 30, tr(0, -0.2, 1.06, 1, -12)],
    ]);
  }
  const waveAt = (slot: number) => WAVE + (Math.max(1, slot) - 1) * 90;
  const WAVE_L = WAVE + 3 * 90 + 40;
  /** when the erase pass reaches the bottom / the top of title line l */
  const oLine = (l: number): [number, number] => [scanAt(TITLE_Y + (l + 1) * lh, true), scanAt(TITLE_Y + l * lh, true)];
  groups.forEach((g, i) => {
    const t = SLOT[g.slot];
    const head = SLOT_HEAD[g.slot];
    const c = HEADS[head].c;
    slamKF(`w${i}`, t, false, waveAt(g.slot), oLine(g.line), g);
    // the beam lands (t - PRE): flare; the group forms big, slams down by t into
    // the white-hot bloom that cools around it, sparks fly off the landing
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
    SP.push(sparkEv([g.cx, g.cy + 0.42 * lh], t, 0, 0.78, 410, 2, c));
  });
  slamKF("wL", LAST, true, WAVE_L, oLine(climax.line), climax);
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: LAST - PRE_L, to: [climax.cx, climax.cy], travel: 100 });
  FL.push(flareEv([climax.cx, climax.cy], LAST - PRE_L, 1.6, 460, 2, "lime"));
  SP.push(sparkEv([climax.cx, climax.cy + 0.42 * lh], LAST, 0, 1.08, 560, 2, "lime"));
  // the climax lands white-hot (its own copy cools to lime, re-glows on the
  // wave) while a cyan / blue chromatic ghost (one element, two offset
  // shadows) jitters behind it
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
  const [oL] = oLine(climax.line);
  kf("ul", [
    [0, "opacity:0;transform:scaleX(0)"],
    [LAST + 88, "opacity:0;transform:scaleX(0)"],
    [LAST + 90, "opacity:1;transform:scaleX(0)", OUT],
    [LAST + 460, "opacity:1;transform:scaleX(1)"],
    [oL - 12, "opacity:1;transform:scaleX(1)", OUT],
    [oL + 40, "opacity:0;transform:scaleX(1)"],
  ]);
  {
    // the underline's hot tip rides its drawing edge
    const y = climax.y + (UL_Y + UL_H / 2) * fs;
    FL.push({
      pri: 1,
      tag: "lime",
      fr: [
        [LAST + 86, [TITLE_X, y, 0.36, 0.36, 0]],
        [LAST + 90, [TITLE_X, y, 0.4, 0.4, 1], OUT],
        [LAST + 460, [TITLE_X + climax.w, y, 0.4, 0.4, 1]],
        [LAST + 620, [TITLE_X + climax.w, y, 0.3, 0.3, 0]],
      ],
    });
  }

  /* ── CTA FORGE: two weld tips trace the pill outline in opposite directions
        (two beams each), collide on the right → white-hot → lime, label rises ── */
  const CR = CTA_H / 2;
  const cyM = CTA_Y + CR;
  const xL = CTA_X + CR;
  const xR = CTA_X + ctaW - CR;
  const tipA: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 270, 4), [xR, CTA_Y], ...arc(xR, cyM, CR, 270, 360, 4)];
  const tipB: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 90, 4), [xR, CTA_Y + CTA_H], ...arc(xR, cyM, CR, 90, 0, 4)];
  const LT = plen(tipA);
  const D = FG_Z - FG_A;
  const tipAt = (path: Pt[]) => (t: number) => pat(path, (Math.max(0, Math.min(D, t - FG_A)) / D) * LT);
  // the forged outline (from its left edge to the start of the right cap) and
  // its clip box (outline + glow margin)
  const foW = xR - (CTA_X - SW_C / 2);
  const fo = { x: CTA_X - SW_C / 2 - FO_M, y: CTA_Y - SW_C / 2 - FO_M, w: foW + FO_M, h: CTA_H + SW_C + 2 * FO_M, ow: foW };
  const tq = (d: number) => FG_A + (d / LT) * D;
  [tipA, tipB].forEach((path, k) => {
    const fr: Frame[] = [
      [FG_A - 70, [path[0][0], path[0][1], 0.37, 0.37, 0]],
      [FG_A, [path[0][0], path[0][1], 0.37, 0.37, 1]],
    ];
    let acc = 0;
    path.forEach((p, i) => {
      if (i) acc += dist(path[i - 1], p);
      if (i) fr.push([tq(acc), [p[0], p[1], 0.37, 0.37, 1]]);
    });
    const z = path[path.length - 1];
    if (k) fr.push([FG_Z + 120, [z[0], z[1], 0.3, 0.3, 0]]);
    else {
      // where the tips meet, the top one bursts into the collision bloom
      fr[fr.length - 2][2] = OUT;
      fr[fr.length - 1] = [FG_Z, [z[0], z[1], 1.7, 1.7, 1], OUT];
      fr.push([FG_Z + 520, [z[0], z[1], 1.7 * 0.45, 1.7 * 0.45, 0]]);
    }
    FL.push({ pri: 2, tag: "lime", fr });
  });
  {
    // the outline (left cap + both edges: one static element) exists only
    // behind the tips: a clip window (counter-translated pair) whose right edge
    // rides them and stops where the right cap starts, so the open side never
    // shows (the collision bloom and the pill take over there)
    const hidden = -fo.w;
    const st: [number, number, number][] = [
      [0, 0, hidden],
      [FG_A - 2, 0, hidden],
    ];
    let acc = 0;
    tipA.forEach((p, i) => {
      if (i) acc += dist(tipA[i - 1], p);
      st.push([tq(acc), 1, Math.min(p[0], xR) - xR]);
    });
    st.push([FG_Z + 60, 1, 0], [FG_Z + 380, 0, 0], [FG_Z + 382, 0, hidden]);
    kf("foo", st.map(([t, o, dx]): Stop => [t, `opacity:${o};transform:translateX(${f(dx / 4, 3)}cqw)`]));
    kf("foi", st.map(([t, , dx]): Stop => [t, `transform:translateX(${f(-dx / 4, 3)}cqw)`]));
  }
  shots[HT].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HU].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HL].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  shots[HR].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  SP.push(sparkEv([CTA_X + ctaW, cyM], FG_Z, 52, 0.9, 500, 2, "lime"));
  kf("cta", [
    [0, "opacity:0;transform:scale(1)"],
    [FG_Z - 2, "opacity:0;transform:scale(1)"],
    [FG_Z, "opacity:1;transform:scale(1)", OUT],
    [FG_Z + 110, "opacity:1;transform:scale(1.045)", IO],
    [FG_Z + 330, "opacity:1;transform:scale(1)"],
    [CLICK - 2, "opacity:1;transform:scale(1)", "ease-in"],
    [CLICK + 60, "opacity:1;transform:scale(.93,.9)", OUT],
    [CLICK + 210, "opacity:1;transform:scale(1.04,1.05)", IO],
    [CLICK + 330, "opacity:1;transform:scale(1)"],
  ]);
  // the white-hot pill lies OVER the pill and swells with it: a sibling, not a
  // child (an opacity animation nested in the pill's own woke the main thread
  // for a few extra frames per loop)
  anim(
    "ctaH",
    [
      [0, 0],
      [FG_Z - 2, 0],
      [FG_Z + 12, 1],
      [FG_Z + 110, 1, COOL],
      [FG_Z + 640, 0],
    ],
    [
      [
        "scale",
        "",
        3,
        [
          [0, 1],
          [FG_Z, 1, OUT],
          [FG_Z + 110, 1.045, IO],
          [FG_Z + 330, 1],
        ],
      ],
    ],
  );
  {
    // label + arrow rise in a skewed wave (the right end arrives last)
    const L0 = FG_Z + 150;
    kf("lbl", [
      [0, "transform:translateY(118%) skewY(9deg)"],
      [L0, "transform:translateY(118%) skewY(9deg)", BACK2],
      [L0 + 460, "transform:translateY(0) skewY(0deg)"],
    ]);
  }

  /* ── click: cursor, ripple, flare + spark burst ── */
  const CP: Pt = [CTA_X + ctaW / 2, cyM];
  FL.push(flareEv(CP, CLICK, 1.3, 320, 2, "lime"));
  SP.push(sparkEv(CP, CLICK, 0, 0.72, 460, 2, "lime"));
  {
    const C = (o: number, x: number, y: number, s = 1) =>
      `opacity:${o};transform:translate(${f(CP[0] / 4 + x)}cqw,${f(CP[1] / 4 + y)}cqw) scale(${f(s)})`;
    kf("cur", [
      [0, C(0, 58, 42)],
      [CLICK - 620, C(0, 58, 42)],
      [CLICK - 540, C(1, 52, 37), "cubic-bezier(.3,0,.45,1)"],
      [CLICK - 200, C(1, 15, 13), IO],
      [CLICK - 35, C(1, 0, 0)],
      [CLICK - 8, C(1, 0, 0)],
      [CLICK + 60, C(1, 0, 0, 0.8), OUT],
      [CLICK + 200, C(1, 0, 0)],
      [CLICK + 900, C(1, 0, 0), IO],
      [CLICK + 1200, C(0, 6, 7)],
    ]);
  }
  kf("rip", [
    [0, "opacity:0;transform:scale(.2)"],
    [CLICK - 2, "opacity:0;transform:scale(.2)", OUT],
    [CLICK, "opacity:1;transform:scale(.25)", OUT],
    [CLICK + 640, "opacity:0;transform:scale(4.2)"],
  ]);

  /* ── cards: printed frames; contents land with the bolts ── */
  kf("ring", [
    [0, "opacity:0;transform:rotate(-140deg) scale(.4)"],
    [HITS[0] + 40, "opacity:0;transform:rotate(-140deg) scale(.4)", OUT],
    [HITS[0] + 470, "opacity:1;transform:rotate(10deg) scale(1.08)", IO],
    [HITS[0] + 680, "opacity:1;transform:rotate(0deg) scale(1)"],
  ]);
  popIn("seo", HITS[1] + 50, 0.4, 1.12, 380);
  // the conversion card boots EMPTY (flat stubs); each comet landing kicks the
  // bars, draws the line one step (clip window) and rolls the reel
  kf("cb", [
    [0, "transform:scaleY(0)"],
    [HITS[2] + 60, "transform:scaleY(0)", OUT],
    [HITS[2] + 320, "transform:scaleY(.12)"],
    [LAND[0], "transform:scaleY(.12)", BACK2],
    [LAND[0] + 120, "transform:scaleY(.42)"],
    [LAND[1], "transform:scaleY(.42)", BACK2],
    [LAND[1] + 120, "transform:scaleY(.72)"],
    [LAND[2], "transform:scaleY(.72)", BACK],
    [LAND[2] + 380, "transform:scaleY(1)"],
  ]);
  {
    const H = CX1 - CX0;
    const ck: [number, number, string?][] = [
      [0, H],
      [LAND[0], H, OUT],
      [LAND[0] + 110, CX1 - CHART[1][0] - 4],
      [LAND[1], CX1 - CHART[1][0] - 4, OUT],
      [LAND[1] + 160, CX1 - CHART[3][0] - 4],
      [LAND[2], CX1 - CHART[3][0] - 4, OUT],
      [LAND[2] + 160, 0],
    ];
    kf("clo", ck.map(([t, h, e]): Stop => [t, `transform:translateX(${f(-h / 4)}cqw)`, e]));
    kf("cli", ck.map(([t, h, e]): Stop => [t, `transform:translateX(${f(h / 4)}cqw)`, e]));
    const R = (i: number) => `transform:translateY(${f((-100 * i) / REEL.length, 3)}%)`;
    kf("reel", [
      [0, R(0)],
      [LAND[0], R(0), EO],
      [LAND[0] + 420, R(3)],
      [LAND[1], R(3), EO],
      [LAND[1] + 420, R(6)],
      [LAND[2], R(6), EO],
      [LAND[2] + 420, R(9)],
    ]);
  }
  // comets: CTA → chart nodes on quadratic arcs, head first, one after the other
  {
    const p0: Pt = [CTA_X + ctaW - 14, cyM - 2];
    [1, 3, 5].forEach((ni, i) => {
      const p2 = CHART[ni];
      const pcn: Pt = [Math.max(p0[0] + 60, 246), 184 + i * 10];
      const t0 = COMET_A[i];
      const t1 = t0 + COMET_FLY;
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
      FL.push(flareEv(p2, LAND[i], 1.35, 380, 2, "lime"));
    });
  }

  /* ── footer: LIVE ── */
  kf("live", [
    [0, "opacity:0;transform:scale(1)"],
    [LIVE_T - 2, "opacity:0;transform:scale(1)"],
    [LIVE_T, "opacity:1;transform:scale(1.3)", OUT],
    [LIVE_T + 300, "opacity:1;transform:scale(1)"],
  ]);
  {
    // LIVE ring pulses, unrolled onto T (no secondary loop)
    const Zp = "opacity:0;transform:scale(1)";
    const st: Stop[] = [[0, Zp]];
    for (let p = LIVE_T + 150; p + 1300 < ER_A; p += 1750)
      st.push([p - 2, Zp], [p, "opacity:.85;transform:scale(1)", "cubic-bezier(.2,.6,.4,1)"], [p + 1300, "opacity:0;transform:scale(2.8)"]);
    kf("pz", st);
  }

  /* ── printhead (wall to wall, flares at the walls) ── */
  {
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    const st: Stop[] = [
      [0, Y(0, CH)],
      [PH_ON, Y(0, CH)],
      [PH_ON + 30, Y(1, CH)],
      [PH_ON + 52, Y(0.35, CH)],
      [PH_ON + 80, Y(1, CH)],
    ];
    SCAN.forEach(([t0, t1, y0, y1], i) => {
      const prevEnd = i ? SCAN[i - 1][1] : PH_ON + 80;
      if (t0 - prevEnd > 300) st.push([t0 - 120, Y(0.42, y0)]);
      st.push([t0, Y(1, y0), IO], [t1, Y(1, y1)]);
      const next = SCAN[i + 1];
      if (next && next[0] - t1 > 300) st.push([t1 + 160, Y(0.42, y1)]);
    });
    st.push([PH_OUT, Y(0, WB + 18)], [ER_A - 160, Y(0, WB)], [ER_A - 40, Y(1, WB)], [ER_A, Y(1, WB), IO], [ER_Z, Y(1, WY)], [ER_Z + 160, Y(0, WY - 12)]);
    kf("scan", st);
  }

  /* ── trick shots: the head fires the first leg, the bolt's own (same colour)
        leg sprites ricochet on; the path stays lit LIT ms behind the packet ── */
  SHOTS.forEach((s) => {
    const g0 = s.segs[0];
    shots[s.head].push({ k: "bolt", s0: g0.s0, s1: g0.s1, r0: g0.s0 + LIT, r1: g0.s1 + LIT, to: g0.to });
    s.segs.slice(1).forEach((g, j) => {
      const len = dist(g.from, g.to);
      const a = angle(g.from, g.to);
      const V = (tail: number, sx: number) => [g.from[0], g.from[1], a, tail, sx];
      LG.push({
        pri: 2,
        tag: s.c,
        fr: [
          [g.s0 - 2, V(0, 0)],
          [g.s0, V(0, 0)],
          [g.s1, V(0, len / 400)],
          [g.s0 + LIT, V(0, len / 400)],
          [g.s1 + LIT, V(len, 0)],
          [g.s1 + LIT + 2, V(0, 0)],
        ],
      });
      // the first bounce flashes (a free sprite of the bolt's colour permitting)
      if (!j) FL.push(flareEv(g.from, g.s0, 1.0, 115, 0, s.c));
    });
    FL.push(flareEv(s.tgt, s.hit, 1.5, 420, 2, s.c));
    SP.push(sparkEv(s.tgt, s.hit, s.back + 90, 0.85, 480, 2, s.c));
  });

  /* ── corner tracers ── */
  const FREE = 3; // tolerance for fast sweeps through empty space
  const lapMid = (L1: number, L2: number) => Math.round(LAP_A + ((LAP_Z - LAP_A) * L1) / (L1 + L2));
  laser(
    "bl",
    EBL,
    [
      { a: TR_A, b: TR_Z, p: PA, tol: 2 },
      { a: TR_Z, b: DOT_T[0], p: [A1, DOTS[0]], e: eIO, tol: FREE },
      { a: DOT_T[0] + 15, b: DOT_T[1], p: [DOTS[0], DOTS[1]], e: eIO },
      { a: DOT_T[1] + 15, b: DOT_T[2], p: [DOTS[1], DOTS[2]], e: eIO },
      { a: DOT_T[2] + 25, b: DOT_T[2] + 130, p: [DOTS[2], [120, 120]], e: eIO, tol: FREE },
      { a: LAP_A - 80, b: LAP_A, p: [A1, A1] },
      { a: LAP_A, b: LAP_Z, p: LAP_L, tol: 3 },
      { a: EAT_A - 80, b: EAT_A, p: [A1, A1] },
      { a: EAT_A, b: EAT_Z, p: [...PA].reverse(), tol: 2.5 },
    ],
    [
      [TR_A - 20, DOT_T[2] + 50],
      [LAP_A - 70, LAP_Z + 20],
      [EAT_A - 70, EAT_Z + 20],
    ],
  );
  laser(
    "br",
    EBR,
    [
      { a: TR_A, b: TR_Z, p: PB, tol: 2 },
      { a: TR_Z, b: URL_A, p: [A1, URL_P0], e: eIO, tol: FREE },
      { a: URL_A, b: URL_Z, p: [URL_P0, URL_P1], e: eIO },
      { a: URL_Z + 20, b: URL_Z + 120, p: [URL_P1, [300, 110]], e: eIO, tol: FREE },
      { a: LAP_A - 80, b: LAP_A, p: [A1, A1] },
      { a: LAP_A, b: LAP_Z, p: LAP_R, tol: 3 },
      { a: EAT_A - 80, b: EAT_A, p: [A1, A1] },
      { a: EAT_A, b: EAT_Z, p: [...PB].reverse(), tol: 2.5 },
    ],
    [
      [TR_A - 20, URL_Z + 40],
      [LAP_A - 70, LAP_Z + 20],
      [EAT_A - 70, EAT_Z + 20],
    ],
  );
  // tracer impacts: collision, dots, URL ends, victory lap, eaten corner
  FL.push(flareEv(A1, TR_Z, 1.6, 450, 2, "lime"));
  SP.push(sparkEv(A1, TR_Z, -45, 0.85, 450, 2, "lime"));
  FL.push({
    pri: 0,
    tag: "lime",
    fr: [
      [DOT_T[0] - 30, [DOTS[0][0], DOTS[0][1], 0.2, 0.2, 0], OUT],
      [DOT_T[0], [DOTS[0][0], DOTS[0][1], 0.42, 0.42, 1]],
      [DOT_T[1], [DOTS[1][0], DOTS[1][1], 0.42, 0.42, 1]],
      [DOT_T[2], [DOTS[2][0], DOTS[2][1], 0.42, 0.42, 1]],
      [DOT_T[2] + 200, [DOTS[2][0], DOTS[2][1], 0.25, 0.25, 0]],
    ],
  });
  FL.push(flareEv(URL_P0, URL_A, 0.6, 200, 0, "cyan"), flareEv(URL_P1, URL_Z, 0.6, 190, 0, "cyan"));
  FL.push(flareEv(A1, LAP_A, 1.2, 380, 1, "lime"), flareEv(A1, LAP_Z, 1.2, 380, 1, "cyan"));
  SP.push(sparkEv(A0, lapMid(LA, LB), 135, 0.6, 380, 1, "lime"), sparkEv(A1, LAP_Z, -45, 0.6, 380, 0, "cyan"));
  SP.push(sparkEv(A0, EAT_Z, 135, 0.45, 180, 1, "lime"));

  /* ── rail heads: glide, charge, fire ── */
  HEADS.forEach((_, k) => headKF(k, shots[k]));

  /* ── fans of beams (back layer): rig rotation + on/off, spread (scaleY) ── */
  {
    // Each rig starts AND ends aimed at the window's top-left corner, where its
    // tracer (same laser head) finishes eating the outline: across the seam the
    // beam carries on, bursts open and snaps back into the tracer.
    // angles: [seam = tracer line, ignition flick, ambient sweep, LIVE burst, hold ×3, …]
    const AMB = CLICK - 600; // the fans glow faintly behind the cursor
    const SWEEP: [number, number] = [TILT[0] - 150, TILT[3] - 50]; // they sweep behind the tilt
    const DARK = ER_A - 100; // and are dark when the erase pass starts
    const rig = (a: number[]): Key[] => [
      [0, a[0]],
      [30, a[0], IO],
      [220, a[1], IO],
      [TR_A - 30, a[0], IOS],
      [AMB - 100, a[2], IO],
      [FAN2 - 40, a[3], IO],
      [FAN2 + 600, a[4], IO],
      [FAN2 + 1300, a[5], IO],
      [SWEEP[0], a[6], IO],
      [SWEEP[1], a[7], IO],
      [ER_Z, a[0]],
    ];
    const fO: Key[] = [
      [0, 0.2],
      [40, 1],
      [70, 0.35],
      [100, 1],
      [TR_A - 30, 1],
      [TR_A + 70, 0],
      [AMB, 0],
      [AMB + 450, 0.32],
      [FAN2 - 30, 0.32],
      [FAN2, 1],
      [FAN2 + 30, 0.35],
      [FAN2 + 60, 1],
      [FAN2 + 1250, 1],
      [FAN2 + 1750, 0.5],
      [DARK - 350, 0.5],
      [DARK, 0],
      [EAT_Z + 60, 0],
      [T, 0.2],
    ];
    anim("fLr", fO, [["rotate", "deg", 1, rig([angle(EBL, A0), -50, -28, -48, -14, -72, -24, -62])]]);
    anim("fRr", fO, [["rotate", "deg", 1, rig([angle(EBR, A0), -108, -152, -132, -166, -108, -156, -118])]]);
    // side beams sit at ±10° / ±20°; scaleY(σ) on their group sets the spread
    // (σ = tan(2d) / tan(20°) for a spread of d° per step), σ = 0 → one line
    const sg = (d: number) => `transform:scaleY(${f(Math.tan((2 * d * Math.PI) / 180) / Math.tan((20 * Math.PI) / 180), 3)})`;
    kf("fS", [
      [0, sg(0)],
      [20, sg(0), OUT],
      [200, sg(10)],
      [250, sg(10), IO],
      [TR_A - 30, sg(0)],
      [AMB, sg(0), IO],
      [AMB + 500, sg(6)],
      [FAN2, sg(6), OUT],
      [FAN2 + 300, sg(13)],
      [FAN2 + 1250, sg(10), IO],
      [DARK - 300, sg(10), IO],
      [DARK + 50, sg(3)],
      [T, sg(0)],
    ]);
  }

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
    shake(TR_Z, 0.35);
    shake(LAST, 1);
    shake(FG_Z, 0.45);
    kf("shake", st);
    kf("flash", [
      [0, Z0],
      [TR_Z - 2, Z0],
      [TR_Z + 30, "opacity:.55"],
      [TR_Z + 380, Z0],
      [LAST - 2, Z0],
      [LAST + 20, "opacity:.95"],
      [LAST + 460, Z0],
      [FG_Z - 2, Z0],
      [FG_Z + 25, "opacity:.4"],
      [FG_Z + 420, Z0],
      [CLICK - 2, Z0],
      [CLICK + 40, "opacity:.4"],
      [CLICK + 480, Z0],
    ]);
  }

  /* ── pools ── */
  // flares keep their colour (lime ×2, cyan, green, blue for the FR copy; a
  // 4-group title adds a second cyan); optional ones yield when theirs is busy
  const pf = pool("pf", FL, 6, fmtF, true);
  const ps = pool(
    "ps",
    SP.map((e) => ({ ...e, tag: "lime" })),
    2,
    fmtS,
  );
  // every bolt keeps its colour: two leg sprites per bolt (its legs overlap)
  const lg = pool("lg", LG, 2 * SHOTS.length, fmtLeg, true);
  const nCm = pool("cm", CM, 1, fmtCom).length;

  return { css: (BASE + end()).replace(/\n/g, ""), lay, pf, ps, lg, nCm, fo };
}

/* ───────────────────────────── static styles ─────────────────────────────── */

const SW = 1.6; // window outline width (units)
const SW_C = 1.4; // CTA forge outline width (units)
const UL_Y = 0.92; // climax underline: top and thickness (em of the title)
const UL_H = 0.075;
const BEAM_BG =
  "linear-gradient(rgb(var(--swb-hot)/.95),rgb(var(--swb-hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--swb-c)/.07) 20%,rgb(var(--swb-c)/.3) 37%,rgb(var(--swb-c)/.85) 47%,rgb(var(--swb-c)/.85) 53%,rgb(var(--swb-c)/.3) 63%,rgb(var(--swb-c)/.07) 80%,transparent)";
const VBEAM_BG = BEAM_BG.replace("0 50%/100% max(1.3px,.3cqw)", "50% 0/max(1.3px,.3cqw) 100%").replace(
  "linear-gradient(transparent",
  "linear-gradient(90deg,transparent",
);
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--swb-hot)) ${core},rgb(var(--swb-c)/.8) ${mid},rgb(var(--swb-c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";

const BASE = `
.swb-root{--swb-lime:200 240 46;--swb-cyan:20 224 200;--swb-green:34 211 140;--swb-blue:46 102 255;--swb-hot:242 243 238;position:relative;z-index:1;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;forced-color-adjust:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;letter-spacing:normal;word-spacing:normal;text-align:left}
.swb-cv{position:absolute;inset:-3rem;content-visibility:auto;contain-intrinsic-size:0 0}
.swb-cv>.swb-L{inset:3rem}
html.a11y-hide-img .swb-cv{display:none}
.swb-root i{font-style:normal}
.swb-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
.swb-paused .swb-a{animation-play-state:paused}
.swb-L{position:absolute;inset:0}
.swb-abs{position:absolute;display:block}
.swb-clip{position:absolute;overflow:hidden;overflow:clip}
.swb-o0{position:absolute;width:100cqw;height:100cqw}
.swb-z{position:absolute;left:0;top:0;width:0;height:0}
.swb-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.1) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.swb-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.swb-floor{position:absolute;left:6%;top:89%;width:88%;height:8%;border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.32),rgb(20 224 200/.08) 60%,transparent)}
.swb-win{position:absolute;inset:0;transform-origin:50% 52%}
.swb-pwo{left:${cq(WX - PW_PAD)};top:${cq(CH)};width:${cq(WW + 2 * PW_PAD)};height:${cq(WB + PW_PAD - CH)}}
.swb-dg{position:absolute;left:0;top:0;width:0;height:0;transform:rotate(45deg);transform-origin:0 0}
.swb-dgo{left:${cq(DG_OPEN - DG_U)};top:${cq(DG_V[0])};width:${cq(DG_U)};height:${cq(DG_V[1] - DG_V[0])}}
.swb-dgi{position:absolute;left:${cq(DG_U - DG_OPEN)};top:${cq(-DG_V[0])};width:0;height:0}
.swb-dgr{position:absolute;left:0;top:0;width:0;height:0;transform:rotate(-45deg);transform-origin:0 0}
.swb-body{border-radius:0 0 3cqw 3cqw;background:radial-gradient(46% 34% at 38% 26%,rgb(200 240 46/.1),transparent),linear-gradient(rgb(13 15 21/.87),rgb(7 8 11/.87))}
.swb-chrome{border-radius:3cqw 3cqw 0 0;background:rgb(17 19 26/.96);box-shadow:inset 0 -1px rgb(242 243 238/.1)}
.swb-dot{border-radius:50%}
.swb-dots{transform-origin:.85cqw .85cqw}
.swb-x{opacity:0}
.swb-guide{background:repeating-linear-gradient(90deg,rgb(var(--swb-cyan)/.6) 0 .75cqw,transparent .75cqw 1.75cqw)}
.swb-urlp{border-radius:3cqw;background:rgb(242 243 238/.06);transform-origin:0 50%}
.swb-urlt{position:absolute;display:flex;align-items:center;gap:.7cqw;font-family:${MONO};font-size:1.85cqw;color:rgb(242 243 238/.62)}
.swb-urlt svg{width:1.45cqw;height:1.8cqw}
.swb-frg{border-radius:3cqw;opacity:.7;box-shadow:0 0 2.6cqw rgb(var(--swb-green)/.42),inset 0 0 1.6cqw rgb(var(--swb-cyan)/.14)}
.swb-outl{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.swb-rim{border-radius:3cqw;opacity:0;box-shadow:0 0 0 .22cqw rgb(255 255 255/.85),0 0 0 .5cqw rgb(var(--swb-lime)/.75),0 0 3cqw rgb(var(--swb-lime)/.5),inset 0 0 2.4cqw rgb(var(--swb-lime)/.3)}
.swb-logo svg{display:block;width:100%;height:100%;overflow:visible}
.swb-mb{border-radius:1cqw;background:rgb(242 243 238/.24)}
.swb-navcta{border-radius:3cqw;background:#c8f02e;display:flex;align-items:center;justify-content:center}
.swb-navcta i{width:56%;height:16%;border-radius:1cqw;background:rgb(10 10 11/.55)}
.swb-card{border-radius:1.75cqw;background:rgb(242 243 238/.035);box-shadow:inset 0 0 0 1px rgb(242 243 238/.11)}
.swb-sk{border-radius:1cqw}
.swb-barv{border-radius:.4cqw;background:linear-gradient(#14e0c8,#2e66ff)}
.swb-cbars{transform-origin:50% 100%}
.swb-cbar{border-radius:.5cqw .5cqw 0 0;background:linear-gradient(rgb(var(--swb-cyan)/.34),rgb(var(--swb-blue)/.1))}
.swb-cbl{background:repeating-linear-gradient(90deg,rgb(242 243 238/.22) 0 .9cqw,transparent .9cqw 1.6cqw)}
.swb-chart{position:absolute;overflow:visible}
.swb-ringw{display:flex;align-items:center;justify-content:center;font-family:${MONO};font-weight:800;font-size:2.3cqw}
.swb-ringw svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.swb-seo{transform-origin:64% 100%}
.swb-kseo{position:absolute;left:0;top:0;font-family:${MONO};font-weight:800;font-size:2.2cqw;color:#14e0c8}
.swb-k38{position:absolute;font-family:${HEAD};font-weight:800;font-size:3.3cqw;line-height:1.1;color:#c8f02e;white-space:nowrap;font-variant-numeric:tabular-nums;height:1.1em;overflow:hidden;overflow:clip}
.swb-reel{display:block;white-space:pre;line-height:1.1;transform:translateY(${f((-100 * (REEL.length - 1)) / REEL.length, 3)}%)}
.swb-glass{position:absolute;overflow:hidden;overflow:clip;border-radius:${cq(RR - 1)}}
.swb-vscan{position:absolute;left:-1.7cqw;top:-8cqw;height:116cqw;width:3.4cqw;font-size:1cqw;opacity:0;--swb-c:var(--swb-cyan)}
.swb-vl{position:absolute;inset:0;background:${VBEAM_BG}}
.swb-vw{position:absolute;top:0;bottom:0;right:50%;width:10em;background:linear-gradient(to left,rgb(var(--swb-cyan)/.13),rgb(var(--swb-cyan)/.03) 50%,transparent),repeating-linear-gradient(90deg,rgb(var(--swb-cyan)/.07) 0 1px,transparent 1px .9em)}
.swb-vf{position:absolute;left:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.swb-sheen{position:absolute;top:-20%;left:0;width:34%;height:140%;background:linear-gradient(90deg,transparent,rgb(var(--swb-hot)/.08) 40%,rgb(var(--swb-hot)/.16) 50%,rgb(var(--swb-hot)/.08) 60%,transparent);opacity:0}
.swb-c-lime{--swb-c:var(--swb-lime)}.swb-c-cyan{--swb-c:var(--swb-cyan)}.swb-c-green{--swb-c:var(--swb-green)}.swb-c-blue{--swb-c:var(--swb-blue)}
.swb-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 40%,rgb(var(--swb-hot)/.2),rgb(var(--swb-lime)/.09) 45%,transparent 75%);opacity:0}
.swb-mv{position:absolute;right:0;top:-1.7cqw;width:150cqw;height:3.4cqw;transform-origin:100% 50%;background:${BEAM_BG};opacity:0}
.swb-tipo{position:absolute;right:0;top:50%;width:0;height:0}
.swb-tip{position:absolute;left:-4.6cqw;top:-4.6cqw;width:9.2cqw;height:9.2cqw;border-radius:50%;background:${GLOW("9%", "22%", "52%")};transform:scale(.85)}
.swb-em{position:absolute;left:-6.5cqw;top:-6.5cqw;width:13cqw;height:13cqw;border-radius:50%;background:${GLOW("6%", "17%", "46%")}}
.swb-emd{opacity:.5}
.swb-fanr{position:absolute;left:0;top:0;width:0;height:0;opacity:0}
.swb-fs{position:absolute;left:0;top:0;width:0;height:0}
.swb-fb{position:absolute;left:0;top:-1.8cqw;width:150cqw;height:3.6cqw;transform-origin:0 50%;background:radial-gradient(farthest-side at 0 50%,rgb(var(--swb-hot)/.85),rgb(var(--swb-hot)/.3) 60%,transparent) 0 50%/100% max(1px,.22cqw) no-repeat,radial-gradient(farthest-side at 0 50%,rgb(var(--swb-c)/.62),rgb(var(--swb-c)/.2) 55%,transparent)}
.swb-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--swb-c:var(--swb-lime)}
.swb-scanw{position:absolute;left:0;right:0;bottom:50%;height:9em;background:linear-gradient(to top,rgb(var(--swb-lime)/.15),rgb(var(--swb-lime)/.04) 45%,transparent),repeating-linear-gradient(to top,rgb(var(--swb-lime)/.08) 0 1px,transparent 1px .9em)}
.swb-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.swb-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.swb-hd{position:absolute;left:0;top:0;width:0;height:0}
.swb-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.swb-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--swb-hot));box-shadow:0 0 0 .38cqw rgb(var(--swb-c)/.95),0 0 1.8cqw .5cqw rgb(var(--swb-c)/.55),0 0 5cqw rgb(var(--swb-c)/.25);outline:.26cqw dashed rgb(var(--swb-c)/.7);outline-offset:1.15cqw}
.swb-pf{position:absolute;left:0;top:0;width:14cqw;height:14cqw;margin:-7cqw 0 0 -7cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.swb-ps{position:absolute;left:0;top:0;width:30cqw;height:30cqw;margin:-15cqw 0 0 -15cqw;background:radial-gradient(closest-side,rgb(var(--swb-hot)),rgb(var(--swb-c)/.75) 7%,rgb(var(--swb-c)/.12) 15%,transparent 22%);opacity:0;color:rgb(var(--swb-c))}
.swb-ps svg{display:block;width:100%;height:100%;overflow:visible}
.swb-lg{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.swb-com{position:absolute;left:0;top:0;width:11cqw;height:3.2cqw;margin:-1.6cqw 0 0 -9.4cqw;transform-origin:85.45% 50%;opacity:0;background:radial-gradient(1.6cqw 1.6cqw at 85.45% 50%,#fff,#fff 22%,rgb(var(--swb-lime)/.8) 46%,rgb(var(--swb-lime)/.18) 72%,transparent),linear-gradient(90deg,transparent,rgb(var(--swb-lime)/.35) 40%,rgb(var(--swb-lime)/.85) 80%,#fff) 0 50%/85.45% 1cqw no-repeat}
.swb-ok{position:absolute;left:76cqw;top:9cqw;height:3cqw;padding:0 1cqw;border-radius:2cqw;display:flex;align-items:center;gap:.7cqw;font-family:${MONO};font-size:1.6cqw;font-weight:700;white-space:nowrap;color:#22d38c;background:rgb(var(--swb-green)/.12);border:1px solid rgb(var(--swb-green)/.38);transform-origin:50% 50%}
.swb-ok i{width:.9cqw;height:.9cqw;border-radius:50%;background:#22d38c;box-shadow:0 0 1cqw #22d38c}
.swb-eye{position:absolute;left:10.5cqw;top:23cqw;height:3.4cqw;padding:0 1.2cqw;border-radius:2cqw;display:flex;align-items:center;font-family:${MONO};font-size:1.75cqw;font-weight:700;white-space:nowrap;color:#14e0c8;border:1px solid rgb(var(--swb-cyan)/.4);background:rgb(var(--swb-cyan)/.07)}
.swb-title{position:absolute;left:${cq(TITLE_X)};top:${cq(TITLE_Y)};width:${cq(TITLE_W)};font-family:${HEAD};font-weight:800;font-size:${cq(FS0)};line-height:${LINE};letter-spacing:${f(TLS, 3)}em;font-kerning:none;font-variant-ligatures:none}
.swb-ln{display:block;white-space:nowrap}
.swb-w{position:relative;display:inline-block;white-space:nowrap;transform-origin:50% 80%}
.swb-lnL{position:relative;color:#c8f02e}
.swb-hg{position:absolute;left:0;top:0;opacity:0;white-space:nowrap;color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--swb-lime)/.95),0 0 .45em rgb(var(--swb-cyan)/.6)}
.swb-gh{position:absolute;left:0;top:0;z-index:-1;opacity:0;white-space:nowrap;color:transparent;text-shadow:-.08em -.02em rgb(var(--swb-cyan)/.95),.08em .02em rgb(var(--swb-blue)/.9)}
.swb-ul{position:absolute;left:0;top:${f(UL_Y, 3)}em;height:${f(UL_H, 3)}em;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
.swb-tag{position:absolute;left:${cq(TITLE_X)};top:${cq(TAG_Y)};width:${cq(TAG_W)};font-size:${cq(TAG_FS0)};line-height:1.32;font-weight:500;color:rgb(242 243 238/.66);max-height:2.64em;overflow:hidden;text-wrap:balance}
.swb-tagc{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}
.swb-cta{position:absolute;box-sizing:border-box;display:flex;align-items:center;padding:0 ${cq(CTA_PR)} 0 ${cq(CTA_PL)};border-radius:5cqw;background:#c8f02e;color:#0a0a0b;font-weight:700;font-size:${cq(CTA_FS0)};letter-spacing:${f(CTA_LS, 3)}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap;box-shadow:0 0 3.5cqw rgb(200 240 46/.28)}
.swb-ctal{display:block;overflow:hidden;overflow:clip;line-height:1.3}
.swb-lbl{display:flex;align-items:center;gap:${cq(CTA_GAP)};transform-origin:0 50%}
.swb-ctah{border-radius:5cqw;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgb(var(--swb-lime)/.85)}
.swb-ctaa{display:block;flex:none;width:${cq(CTA_ARROW)};height:${cq(CTA_ARROW)}}
.swb-foc{opacity:0}
.swb-fo{position:absolute;border:${cq(SW_C)} solid #c8f02e;border-right:0;box-shadow:0 0 1cqw rgb(var(--swb-lime)/.6)}
.swb-sec{border-radius:5cqw;border:1px solid rgb(242 243 238/.22);display:flex;align-items:center;justify-content:center}
.swb-sec i{width:50%;height:16%;border-radius:1cqw;background:rgb(242 243 238/.22)}
.swb-rip{position:absolute;width:8cqw;height:8cqw;margin:-4cqw 0 0 -4cqw;border-radius:50%;border:max(1px,.3cqw) solid rgb(var(--swb-lime)/.9);opacity:0}
.swb-rip::after{content:"";position:absolute;inset:24%;border-radius:50%;border:max(1px,.22cqw) solid rgb(var(--swb-lime)/.6)}
.swb-cur{position:absolute;left:0;top:0;width:3.6cqw;height:4.6cqw;opacity:0;transform-origin:0 0}
.swb-cur svg{display:block;width:100%;height:100%;overflow:visible}
.swb-badge{position:absolute;left:76.5cqw;top:84.25cqw;height:3.6cqw;padding:0 1.1cqw;border-radius:2cqw;display:flex;align-items:center;gap:.8cqw;font-family:${MONO};font-weight:800;font-size:1.7cqw;letter-spacing:.08em;white-space:nowrap;color:rgb(242 243 238/.35);border:1px solid rgb(242 243 238/.14)}
.swb-lon{position:absolute;inset:-1px;border-radius:inherit;display:flex;align-items:center;gap:.8cqw;padding:0 1.1cqw;color:#22d38c;border:1px solid rgb(var(--swb-green)/.55);background:rgb(var(--swb-green)/.1);box-shadow:0 0 2.4cqw rgb(var(--swb-green)/.3);transform-origin:50% 50%}
.swb-ld{position:relative;width:1cqw;height:1cqw;border-radius:50%;background:rgb(242 243 238/.3)}
.swb-lon .swb-ld{background:#22d38c}
.swb-lr{position:absolute;inset:0;border-radius:50%;border:1px solid #22d38c;opacity:.4;transform:scale(1.8)}
`;

/* ───────────────────────────── markup ────────────────────────────────────── */

type Built = ReturnType<typeof build> & { ns: string };
/** built sheets per string set (≈ 95 KB each): the most recently used few */
const CACHE = new Map<string, Built>();
const CACHE_MAX = 12;
function getBuild(title: string, tagline: string, cta: string, eyebrow: string): Built {
  const key = `${title}\u0001${tagline}\u0001${cta}\u0001${eyebrow}`;
  let b = CACHE.get(key);
  if (b) CACHE.delete(key);
  else {
    const ns = `swb-${hash(key)}-`;
    b = { ...build(title, tagline, cta, eyebrow, ns), ns };
    while (CACHE.size >= CACHE_MAX) CACHE.delete(CACHE.keys().next().value as string);
  }
  CACHE.set(key, b);
  return b;
}

/** absolutely positioned box, in viewBox units relative to the root */
const at = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: P(x), top: P(y), width: cq(w), height: cq(h) });
/** the same inside a smaller positioned box (cqw always refers to the root width) */
const atq = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: cq(x), top: cq(y), width: cq(w), height: cq(h) });

function Sk({ x, y, w, h = 3.6, a }: { x: number; y: number; w: number; h?: number; a: number }) {
  return <i className="swb-abs swb-sk" style={{ ...at(x, y, w, h), background: `rgb(242 243 238/${f(a)})` }} />;
}

/**
 * Spark sprite (static artwork): an irregular spray of streaks opening upwards
 * — white-hot heads, lime tails, a few embers — that the pool scales, drops
 * and fades. [angle°, inner radius, outer radius, half-width]
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
/** a closed polygon of points given in a frame rotated by a° (SVG path data) */
const rotPoly = (a: number, pts: Pt[]) => {
  const c = Math.cos((a * Math.PI) / 180);
  const s = Math.sin((a * Math.PI) / 180);
  return `M${pts.map(([x, y]) => `${f(x * c - y * s, 1)} ${f(x * s + y * c, 1)}`).join("L")}Z`;
};
// the whole spray is three paths (tails, white-hot heads, embers)
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

export function SitesWebMotion({ className, title, tagline, cta, eyebrow }: SitesWebMotionProps) {
  const b = getBuild(title, tagline, cta, eyebrow);
  const { fs, lh, nLines, groups, climax, tag, label, cfs, ctaW }: Layout = b.lay;
  // one dashed guide under each title line (80 % of the line box)
  const guideY = Array.from({ length: nLines }, (_, l) => TITLE_Y + (l + 0.8) * lh);
  const A = (n: string) => `swb-a ${b.ns}${n}`;
  const { V, R, T: LT, X, O_CX, O_CY, O_R } = LOGO_GEOMETRY;
  const origin = (g: Group) => `${f((g.ox / g.w) * 100, 2)}% 80%`;
  const og = `${b.ns}og`;
  const cg = `${b.ns}cg`;
  const lines = Array.from({ length: Math.max(0, ...groups.map((g) => g.line + 1)) }, (_, l) => groups.map((g, i) => ({ g, i })).filter((x) => x.g.line === l));
  const CR = CTA_H / 2;
  const tagStyle: CSSProperties = {
    ...(tag.fs !== TAG_FS0 ? { fontSize: cq(tag.fs) } : null),
    ...(tag.w !== TAG_W ? { width: cq(tag.w) } : null),
  };

  return (
    <div className={`illu-motion swb-root${className ? ` ${className}` : ""}`} aria-hidden="true" data-nosnippet="">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      <ScrollPause />

      {/* off-screen, content-visibility skips the whole scene (no restyle at all);
          absolutely positioned, so its remembered size never feeds the layout */}
      <div className="swb-cv">
      <div className={`swb-L ${A("shake")}`}>
        {/* ── static back layer, then the concert fans ── */}
        <i className="swb-grid" />
        <i className="swb-rail" />
        <i className="swb-floor" />
        {/* the laser heads' own glows (their tracer and fan shoot out of them),
            painted with the static back layer before any fan layer */}
        {(
          [
            [EBL, "lime"],
            [EBR, "cyan"],
          ] as const
        ).map(([o, c]) => (
          <i key={c} className={`swb-z swb-c-${c}`} style={{ left: P(o[0]), top: P(o[1]) }}>
            <i className="swb-em swb-emd" />
          </i>
        ))}
        {(
          [
            ["fLr", EBL, "lime"],
            ["fRr", EBR, "cyan"],
          ] as const
        ).map(([id, o, c]) => (
          <div key={id} className={`swb-z swb-c-${c}`} style={{ left: P(o[0]), top: P(o[1]) }}>
            <div className={`swb-fanr ${A(id)}`}>
              <i className="swb-em" />
              <i className="swb-fb" />
              <div className={`swb-fs ${A("fS")}`}>
                {[-2, -1, 1, 2].map((k) => (
                  <i key={k} className="swb-fb" style={{ rotate: `${k * 10}deg`, opacity: f(1 - Math.abs(k) * 0.14) }} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ── the website (tilts as one plane in the hold) ── */}
        <div className={`swb-win ${A("tilt")}`}>
          {/* the printed page: exists only above the printhead */}
          <div className={`swb-clip swb-pwo ${A("pwo")}`}>
            <div className={`swb-z ${A("pwi")}`}>
              <div className="swb-o0" style={{ left: cq(PW_PAD - WX), top: cq(-CH) }}>
                {/* static page (one layer) */}
                <i className="swb-abs swb-body" style={at(WX, CH, WW, WB - CH)} />
                {MENU_X.map((x) => (
                  <i key={x} className="swb-abs swb-mb" style={at(x, 69.75, 28, 4.5)} />
                ))}
                <span className="swb-abs swb-navcta" style={at(306, 63, 50, 18)}>
                  <i />
                </span>
                <div className="swb-eye">{`</> ${eyebrow}`}</div>
                <div className={`swb-tag${tag.clamp ? " swb-tagc" : ""}`} style={tagStyle}>
                  {tagline}
                </div>
                <span className="swb-abs swb-sec" style={at(CTA_X + ctaW + 7.2, CTA_Y, 56, CTA_H)}>
                  <i />
                </span>
                {CARD_X.map((x) => (
                  <i key={x} className="swb-abs swb-card" style={at(x, CARD_Y, CARD_W, CARD_H)} />
                ))}
                <Sk x={92} y={277} w={38} a={0.18} />
                <Sk x={92} y={285.5} w={30} a={0.12} />
                <Sk x={92} y={294} w={22} a={0.09} />
                <Sk x={161} y={280} w={40} a={0.16} />
                <Sk x={161} y={288.5} w={30} a={0.11} />
                <Sk x={161} y={297} w={35} a={0.08} />
                <i className="swb-abs swb-cbl" style={at(268, CHART_BASE, 84, 0.9)} />
                <div className="swb-k38" style={{ left: P(270), top: P(260) }}>
                  <span className={`swb-reel ${A("reel")}`}>{REEL.join("\n")}</span>
                </div>
                <i className="swb-abs swb-sk" style={{ ...at(42, 327.5, 316, 1), background: "rgb(242 243 238/.08)" }} />
                <i className="swb-abs swb-dot" style={{ ...at(43.8, 339.8, 8.4, 8.4), background: "#c8f02e" }} />
                <Sk x={58} y={342} w={40} h={4} a={0.15} />
                <Sk x={106} y={342} w={30} h={4} a={0.11} />
                <Sk x={144} y={342} w={22} h={4} a={0.08} />
                <div className="swb-badge">
                  <i className="swb-ld" />
                  LIVE
                  <span className={`swb-lon ${A("live")}`}>
                    <i className="swb-ld">
                      <i className={`swb-lr ${A("pz")}`} />
                    </i>
                    LIVE
                  </span>
                </div>

                {/* CTA: forged outline, white-hot pill, rising label */}
                <div className={`swb-clip swb-foc ${A("foo")}`} style={at(b.fo.x, b.fo.y, b.fo.w, b.fo.h)}>
                  <div className={`swb-z ${A("foi")}`}>
                    <i className="swb-fo" style={{ ...atq(FO_M, FO_M, b.fo.ow, CTA_H + SW_C), borderRadius: `${cq(CR + SW_C / 2)} 0 0 ${cq(CR + SW_C / 2)}` }} />
                  </div>
                </div>
                <div className={`swb-cta ${A("cta")}`} style={{ ...at(CTA_X, CTA_Y, ctaW, CTA_H), ...(cfs < CTA_FS0 ? { fontSize: cq(cfs) } : null) }}>
                  <span className="swb-ctal">
                    <span className={`swb-lbl ${A("lbl")}`}>
                      {label}
                      <svg className="swb-ctaa" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
                <i className={`swb-abs swb-ctah ${A("ctaH")}`} style={at(CTA_X, CTA_Y, ctaW, CTA_H)} />
                <i className={`swb-rip ${A("rip")}`} style={{ left: P(CTA_X + ctaW / 2), top: P(CTA_Y + CR) }} />

                {/* card contents, shot in by the bolts */}
                <div className={`swb-abs swb-ringw ${A("ring")}`} style={at(53, 271, 30, 30)}>
                  <svg viewBox="0 0 30 30" fill="none">
                    <circle cx="15" cy="15" r={RING_R} stroke="#f2f3ee" strokeOpacity=".09" strokeWidth="3.2" />
                    <circle cx="15" cy="15" r={RING_R} stroke="#22d38c" strokeWidth="3.2" />
                    <circle cx="15" cy={15 - RING_R} r="2.2" fill="#c8f02e" />
                  </svg>
                  100
                </div>
                <div className={`swb-abs swb-seo ${A("seo")}`} style={at(161, 261.6, 78, 46.4)}>
                  <span className="swb-kseo">SEO</span>
                  {BAR_H.map((h, i) => (
                    <i key={i} className="swb-abs swb-barv" style={atq(50 + i * 9.5, 46.4 - h, 6.5, h)} />
                  ))}
                </div>
                <div className={`swb-abs swb-cbars ${A("cb")}`} style={at(272, CHART_BASE - 36, 76, 36)}>
                  {CBAR.map((c, i) => (
                    <i key={i} className="swb-abs swb-cbar" style={atq(c.x - 272, 36 - c.h, c.w, c.h)} />
                  ))}
                </div>
                <div className={`swb-clip ${A("clo")}`} style={at(CX0, 266, CX1 - CX0, 48)}>
                  <div className={`swb-z ${A("cli")}`}>
                    <svg className="swb-chart" viewBox={`${CX0} 266 ${CX1 - CX0} 48`} style={{ left: 0, top: 0, width: cq(CX1 - CX0), height: cq(48) }}>
                      <defs>
                        <linearGradient id={cg} x1={CHART[0][0]} x2={CHART[5][0]} y1="0" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#2e66ff" />
                          <stop offset=".55" stopColor="#14e0c8" />
                          <stop offset="1" stopColor="#c8f02e" />
                        </linearGradient>
                      </defs>
                      <polyline points={CHART.map((p) => p.join(",")).join(" ")} stroke={`url(#${cg})`} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      {[1, 3, 5].map((ni, k) => (
                        <circle key={ni} cx={CHART[ni][0]} cy={CHART[ni][1]} r={k === 2 ? 3.4 : 2.6} fill="#c8f02e" />
                      ))}
                    </svg>
                  </div>
                </div>
                {/* headline guides (temporary) */}
                <div className={`swb-abs swb-x ${A("guide")}`} style={at(TITLE_X, guideY[0], 316, guideY[guideY.length - 1] - guideY[0] + 1)}>
                  {guideY.map((y) => (
                    <i key={y} className="swb-abs swb-guide" style={atq(0, y - guideY[0], 316, 1)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* outline + title bar: exist only behind the tracer tips */}
          <div className="swb-dg">
            <div className={`swb-clip swb-dgo ${A("dgo")}`}>
              <div className={`swb-dgi ${A("dgi")}`}>
                <div className="swb-dgr">
                  <div className="swb-o0" style={{ left: 0, top: 0 }}>
                    <i className="swb-abs swb-frg" style={at(WX, WY, WW, WB - WY)} />
                    <i className="swb-abs swb-chrome" style={at(WX, WY, WW, CH - WY)} />
                    <svg className="swb-outl" viewBox="0 0 400 400" fill="none">
                      <defs>
                        <linearGradient id={og} x1={WX} y1={WY} x2={WR} y2={WB} gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#14e0c8" />
                          <stop offset=".5" stopColor="#22d38c" />
                          <stop offset="1" stopColor="#2e66ff" />
                        </linearGradient>
                      </defs>
                      <rect x={WX} y={WY} width={WW} height={WB - WY} rx={RR} stroke={`url(#${og})`} strokeWidth={SW} />
                    </svg>
                    <div className={`swb-abs swb-dots ${A("dots")}`} style={at(DOTS[0][0] - 3.4, DOTS[0][1] - 3.4, DOTS[2][0] - DOTS[0][0] + 6.8, 6.8)}>
                      {DOTS.map(([x], i) => (
                        <i key={i} className="swb-abs swb-dot" style={{ ...atq(x - DOTS[0][0], 0, 6.8, 6.8), background: `rgb(200 240 46/${f(1 - i * 0.27)})` }} />
                      ))}
                    </div>
                    <i className={`swb-abs swb-urlp ${A("url")}`} style={at(URL_BAR.x, URL_BAR.y, URL_BAR.w, URL_BAR.h)} />
                    <span className={`swb-urlt ${A("urlT")}`} style={{ left: P(URL_BAR.x + 6.4), top: P(URL_BAR.y), height: cq(URL_BAR.h) }}>
                      <svg viewBox="0 0 8 10" fill="none">
                        <rect x=".5" y="4" width="7" height="5.5" rx="1.2" fill="#22d38c" />
                        <path d="M2.2 4.2V2.9a1.8 1.8 0 0 1 3.6 0v1.3" stroke="#22d38c" strokeWidth="1.1" />
                      </svg>
                      vortx.lu
                    </span>
                    <div className={`swb-ok ${A("ok")}`}>
                      <i />
                      200 OK
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* the fresh weld (white-hot / lime rim), rim light in the tilt */}
          <i className={`swb-abs swb-rim ${A("rim")}`} style={at(WX, WY, WW, WB - WY)} />

          <span className={`swb-abs swb-logo ${A("logo")}`} style={at(42, 63.5, 51, 17)}>
            <svg viewBox="0 0 600 200">
              <g fill="#f2f3ee">
                <path d={V} />
                <path d={R} />
                <path d={LT} />
                <path d={X} />
              </g>
              <circle cx={O_CX} cy={O_CY} r={O_R * 1.5} fill="none" stroke="#c8f02e" strokeWidth={O_R} />
            </svg>
          </span>

          {/* ── kinetic headline ── */}
          <div className="swb-title" style={fs < FS0 ? { fontSize: cq(fs) } : undefined}>
            {lines.map((ln, l) => (
              <span key={l} className="swb-ln">
                {ln.map(({ g, i }, j) => (
                  <span key={i} className={`swb-w ${A(`w${i}`)}`} style={{ transformOrigin: origin(g), ...(j ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null) }}>
                    {g.text}
                  </span>
                ))}
              </span>
            ))}
            <span className="swb-ln swb-lnL">
              <span className={`swb-w ${A("wL")}`} style={{ transformOrigin: origin(climax) }}>
                <span className={`swb-gh ${A("gh")}`}>{climax.text}</span>
                {climax.text}
                <span className={`swb-hg ${A("hg")}`}>{climax.text}</span>
              </span>
              <i className={`swb-ul ${A("ul")}`} style={{ width: cq(climax.w) }} />
            </span>
          </div>

          <div className="swb-glass" style={at(WX + 1, WY + 1, WW - 2, WB - WY - 2)}>
            <i className={`swb-sheen ${A("sheen")}`} />
          </div>
          <div className={`swb-vscan ${A("vscan")}`}>
            <i className="swb-vw" />
            <i className="swb-vl" />
            <i className="swb-vf" style={{ top: "8em" }} />
            <i className="swb-vf" style={{ top: "108em" }} />
          </div>
        </div>

        {/* ── front FX: printhead, ricochet legs, comet, tracers, rail heads, pools ── */}
        <div className="swb-L">
          <div className={`swb-scan ${A("scan")}`}>
            <i className="swb-scanw" />
            <i className="swb-scanl" />
            <i className="swb-scanf" style={{ left: "8em" }} />
            <i className="swb-scanf" style={{ left: "108em" }} />
          </div>
          {b.lg.map((c, i) => (
            <i key={i} className={`swb-lg swb-c-${c} ${A(`lg${i}`)}`} />
          ))}
          {Array.from({ length: b.nCm }, (_, i) => (
            <i key={i} className={`swb-com ${A(`cm${i}`)}`} />
          ))}
          {(
            [
              ["bl", EBL, "lime"],
              ["br", EBR, "cyan"],
            ] as const
          ).map(([id, o, c]) => (
            <div key={id} className={`swb-z swb-c-${c}`} style={{ left: P(o[0]), top: P(o[1]) }}>
              <div className={`swb-mv ${A(`${id}m`)}`}>
                <i className="swb-tipo">
                  <i className="swb-tip" />
                </i>
              </div>
            </div>
          ))}
          {HEADS.map((h) => (
            <Fragment key={h.id}>
              <i className={`swb-hb swb-c-${h.c} ${A(`${h.id}b`)}`} />
              <div className={`swb-hd swb-c-${h.c} ${A(`${h.id}p`)}`} style={{ transform: `translate(${cq(h.home[0])},${cq(h.home[1])})` }}>
                <i className="swb-hc" />
              </div>
            </Fragment>
          ))}
          {b.pf.map((c, i) => (
            <i key={i} className={`swb-pf swb-c-${c || "lime"} ${A(`pf${i}`)}`} />
          ))}
          {b.ps.map((c, i) => (
            <i key={i} className={`swb-ps swb-c-${c || "lime"} ${A(`ps${i}`)}`}>
              <SparkArt />
            </i>
          ))}
          <span className={`swb-cur ${A("cur")}`}>
            <svg viewBox="0 0 18 26">
              <path d="M0 0v22l6-6 5 10 4-2-5-10h8Z" fill="#0a0a0b" stroke="#f2f3ee" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <i className={`swb-flash ${A("flash")}`} />
      </div>
      </div>
    </div>
  );
}

