import { Fragment, type CSSProperties } from "react";
import {
  anim,
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
} from "../sites-web-motion/anim";
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
  OY,
  SPACE_EM,
  TAG_FS0,
  TAG_LH,
  TITLE_W,
  TITLE_X,
  TITLE_Y,
  TLS,
  type Item,
  type Layout,
} from "./LeadGenerationMotion.layout";
import { ScrollPause } from "./ScrollPause";
import type { ServiceMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  "LEAD MACHINE" — hero motion graphic of /services/lead-generation
 * ─────────────────────────────────────────────────────────────────────────────
 *  Same family as the sites-web laser show (sites-web-motion/): dark stage,
 *  four rail-mounted laser heads (lime left, cyan top, green bottom, blue
 *  right) that glide, charge and fire; white-hot weld tips, a wall-to-wall
 *  printhead, flares and gravity spark sprays, kinetic type slams.
 *  One master loop, T = 14 s; every beat is a keyframe percentage of T.
 *
 *  0.35–1.15  WELD. Two tips ignite at the spout, race up the funnel walls
 *             (the funnel exists only behind them), run over the back of the
 *             rim and collide at its apex: bloom, sparks, flash, micro-shake.
 *             The white-hot walls cool to lime → cyan → blue.
 *  1.30–2.10  PRINT. The printhead sweeps down the panel and prints the
 *             machine: funnel stages + vortex ring, the multi-step FORM (empty
 *             fields, progress track), the CRM board (empty pipeline, flat
 *             weekly chart).
 *  2.07–3.30  KINETIC HEADLINE. The page title slams in, group by group, each
 *             shot by a rail head (stretch → squash → rebound in a white-hot
 *             bloom); the "lead" word is the lime climax (3.00): all four
 *             heads, flash, chromatic jitter, shake, laser underline.
 *  3.25       Tagline rises.  3.55 LASER GATE: the lime head shoots the gate
 *             post, the gate beam spans the spout.
 *  3.0–10.8   VISITORS stream in from every side (glowing dots tossed into the
 *             mouth), swirl down the funnel and meet the gate: rejected ones
 *             are zapped and kicked back out; qualified ones pass, turn lime
 *             and fly as comets into the form.
 *  3.95–5.70  HERO LEAD. Three qualified comets fill the form field by field
 *             (typed bars, step marker, progress bar).
 *  5.80–6.35  CTA FORGE. The heads converge; two weld tips trace the submit
 *             pill and collide: white-hot → lime, the label rises.
 *  6.6–7.48   The cursor glides in, clicks: the lead drops as a card into the
 *             CRM pipeline, the weekly counter turns "+1".
 *  7.65–10.6  EVERY WEEK. The machine runs on its own: five more leads, each a
 *             comet → instant form fill → auto-submit → card drop; the pipeline
 *             conveys left, the counter rolls to "+24".
 *  10.90      PAYOFF. All four heads strike the counter: bloom, ring, flash.
 *  11.0–12.6  HOLD. Headline wave + chromatic echo; the gate keeps zapping
 *             stray visitors, the vortex ring keeps turning, the heads drift.
 *  12.65–13.65 ERASE. The printhead sweeps back up and the whole scene
 *             vanishes under it (machine, funnel, tagline, headline); seam.
 *
 *  Performance: 59 running animations for 14 s of action (Chrome restyles
 *  every running CSS animation on every main-thread frame, and re-layerizes
 *  every paint chunk against every layer):
 *   · the machine is ONE printed layer revealed / erased by a clip window
 *     whose bottom edge rides the printhead (counter-translated pair); the
 *     funnel is one static image revealed by a second window whose top edge
 *     rides the weld tips (and whose bottom edge rides the erase pass);
 *   · one-shot sprites are POOLED (anim.ts pool()): visitor dots, comets,
 *     flares (a flare only plays on a sprite of its own colour), sparks;
 *   · a card is one element (its art is an image) whose own keyframes carry
 *     the pipeline conveyor; the form re-fills the same three bars per lead;
 *   · static vector art is CSS images (data-URI SVG): an inline <svg> adds
 *     paint-property nodes, i.e. paint chunks Chrome re-layerizes every
 *     frame; static elements paint before animated ones (whatever paints
 *     after an animated layer and may overlap it is composited too).
 *  Only transform / opacity animate, on HTML boxes. Root z-index:1 (its
 *  layers paint last); off-screen, content-visibility on an absolutely
 *  positioned inner wrapper (overhanging by 3rem) skips it all.
 *  <ScrollPause> freezes it while the page scrolls.
 *
 *  Reduced motion: the global rule collapses every animation, so the
 *  un-animated base styles ARE the poster: the machine running at full
 *  speed, form filled, six leads in, counter at "+24".
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

type Pt = [number, number];
const eIO = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);
const eS = (u: number) => u * u * (3 - 2 * u);
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
const bez2 = (a: Pt, c: Pt, b: Pt, u: number): Pt => [
  (1 - u) * (1 - u) * a[0] + 2 * u * (1 - u) * c[0] + u * u * b[0],
  (1 - u) * (1 - u) * a[1] + 2 * u * (1 - u) * c[1] + u * u * b[1],
];
const bez2d = (a: Pt, c: Pt, b: Pt, u: number): Pt => [2 * (1 - u) * (c[0] - a[0]) + 2 * u * (b[0] - c[0]), 2 * (1 - u) * (c[1] - a[1]) + 2 * u * (b[1] - c[1])];
/** viewBox units → % of the (square) root */
const P = (u: number) => `${f(u / 4, 3)}%`;
/** viewBox units → cqw (sizes) */
const cq = (u: number) => `${f(u / 4, 3)}cqw`;
const angle = (a: Pt, b: Pt) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
/** n points of an ellipse arc from a0 (excluded) to a1 (degrees) */
const earc = (cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * (i + 1)) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as Pt;
  });
/** deterministic pseudo-random stream (same visitors in every locale) */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// rail
const RI = 11;
const RHI = 400 - RI;

// funnel: elliptic rim, straight walls, neck, open spout; the laser gate spans the spout
const FX = 100;
const RIM_Y = 126;
const RIM_RX = 76;
const RIM_RY = 11;
const NECK_Y = 232;
const NECK_HW = 14;
const SPOUT_Y = 262;
const GATE_Y = 247;
const GATE_X0 = 79;
const GATE_X1 = 121;
const hwAt = (y: number) => RIM_RX - ((RIM_RX - NECK_HW) * (y - RIM_Y)) / (NECK_Y - RIM_Y);
const RINGS: [number, string][] = [
  [161, "48%"],
  [197, "21%"],
];
const APEX: Pt = [FX, RIM_Y - RIM_RY];
const GATE_P: Pt = [FX, GATE_Y];
const SPOUT_P: Pt = [FX, SPOUT_Y + 3];
// weld tips: from the spout ends up the walls, over the back of the rim, collide at its apex
const TIP_L: Pt[] = [[FX - NECK_HW, SPOUT_Y], [FX - NECK_HW, NECK_Y], [FX - RIM_RX, RIM_Y], ...earc(FX, RIM_Y, RIM_RX, RIM_RY, 180, 270, 6)];
const TIP_R: Pt[] = TIP_L.map(([x, y]): Pt => [2 * FX - x, y]);
const TIP_LEN = plen(TIP_L);
/** clip box of the welded funnel (walls + rim + their glow) */
const FW = { x: 6, y: 104, w: 188, h: 170 };

// form (glass card): step markers, three fields, progress, submit pill (= the CTA)
const FORM = { x: 192, y: 110, w: 186, h: 162 };
const STEP_X = [209, 231, 253];
const STEP_Y = 126;
const FIELD_Y = [142, 168, 194];
const FIELD_H = 20;
const ICON_X = 202;
const IN_X = 226;
const IN_W = 140;
const BAR_X = 233;
const BAR_W = [86, 104, 66];
const PROG = { x: 202, y: 224, w: 164, h: 4 };
const fieldTarget = (i: number): Pt => [ICON_X + 10, FIELD_Y[i] + FIELD_H / 2];

// CRM board: counter + week chart (left), card pipeline (right)
const CRM = { x: 22, y: 284, w: 356, h: 94 };
const REEL_X = 34;
const REEL_Y = 303;
const REEL_FS = 24;
const REEL = [" ", "+1", "+3", "+5", "+8", "+10", "+13", "+15", "+18", "+20", "+22", "+24"];
const REEL_AT = [1, 3, 5, 7, 9, 11]; // reel index after each card
const COUNTER_C: Pt = [REEL_X + 22, REEL_Y + 13];
const SPK = { x: 34, base: 368, w: 8, gap: 3, h: [7, 11, 9, 14, 13, 18, 23] };
const SLOT_X0 = 128;
const PITCH = 61;
const CARD_W = 57;
const CARD_H = 70;
const CARD_Y = 296;
const N_CARDS = 6;
/** clip window of the pipeline (tall: the cards fall into it from the form) */
const PIPE = { x: 124, y: 200, w: 250, h: 176 };
/** conveyor offset once card k is the newest (it sits in the 4th slot) */
const offK = (k: number) => (3 - k) * PITCH;
const OFF_END = offK(N_CARDS - 1);
/** final x of card k (the poster: the newest in the 4th slot) */
const cardX = (k: number) => SLOT_X0 + OFF_END + k * PITCH;
const AVATAR = ["#14e0c8,#2e66ff", "#c8f02e,#14e0c8", "#22d38c,#14e0c8", "#2e66ff,#14e0c8", "#c8f02e,#22d38c", "#14e0c8,#c8f02e"];
const SCORE = [0.86, 0.7, 0.92, 0.78, 0.64, 0.95];

// the printed machine: clip window (its bottom edge rides the printhead)
const PR = { x: 2, y: 100, w: 396, h: 292 };

/* ───────────────────────────── master beats (ms) ─────────────────────────── */

const TR_A = 350; // weld tips: spout → rim apex
const TR_Z = 1150;
const PH_ON = 1220; // printhead ignition
type Sc = [number, number, number, number];
const SCAN: Sc = [1300, 2100, PR.y, PR.y + PR.h];
const ER_A = 12650; // erase pass (bottom → top of the panel)
const ER_Z = 13650;
const ERASE: Sc = [ER_A, ER_Z, PR.y + PR.h, 12];
const SLOT0 = 2280; // title slot s lands at SLOT0 + s × SLOT_DT (s ≤ 2)
const SLOT_DT = 220;
const LAST = 3000; // climax impact
const PRE = 110; // beam lands → the group slams down PRE ms later
const PRE_L = 150;
const TAG_A = 3250;
const GATE_T = 3550;
const COMET_FLY = 340;
const HERO_Q = [3950, 4500, 5050]; // qualified visitors through the gate (hero lead)
const FILL_T = HERO_Q.map((t) => t + 30 + COMET_FLY);
const FG_A = 5800; // CTA forge
const FG_Z = 6350;
const CLICK = 7150;
const RAPID_Q = [7650, 8130, 8610, 9090, 9570];
const RL = RAPID_Q.map((t) => t + 30 + COMET_FLY); // rapid comets land in the form
const PRESS = [CLICK, ...RL.map((t) => t + 300)]; // submits
const CARD_EJ = PRESS.map((t) => t + 30);
const CARD_LAND = CARD_EJ.map((t) => t + 330);
const PAY = CARD_LAND[N_CARDS - 1] + 300;
const WAVE = PAY + 520;
// rejected visitors at the gate (they come in bursts: same side, ~90 ms apart)
const REJ = [
  // hero lead
  3700, 3790, 3860, 4180, 4270, 4410, 4700, 4790, 4880, 4960, 5300, 5390, 5600, 5690,
  // CTA forge + click
  5950, 6040, 6350, 6440, 6530, 6800, 6890, 7200, 7290,
  // every week: around each qualified one
  ...RAPID_Q.flatMap((q) => [q - 150, q + 200]),
  10020, 10110, 10400, 10650,
  // hold: the gate keeps filtering
  10980, 11070, 11450, 11540, 11950, 12250,
];

/** when the printhead crosses y (print pass going down, erase pass going up) */
function scanAt(y: number, up = false): number {
  const [t0, t1, y0, y1] = up ? ERASE : SCAN;
  const u = Math.max(0, Math.min(1, (y - y0) / (y1 - y0)));
  return Math.round(t0 + (t1 - t0) * inv(eIO, u));
}
/** printhead y at time t (inside a pass) */
function scanY([t0, t1, y0, y1]: Sc, t: number): number {
  return y0 + (y1 - y0) * eIO(Math.max(0, Math.min(1, (t - t0) / (t1 - t0))));
}

/* ───────────────────────────── rail heads ───────────────────────────────── */

const HEADS = [
  { id: "hL", c: "lime", home: [RI, 200] as Pt },
  { id: "hT", c: "cyan", home: [60, RI] as Pt },
  { id: "hB", c: "green", home: [200, RHI] as Pt },
  { id: "hR", c: "blue", home: [RHI, 150] as Pt },
];
const [HL, HT, HB, HR] = [0, 1, 2, 3];
// which head shoots which title slot (slot index mod 3)
const SLOT_HEAD = [HB, HL, HR];
const slotT = (s: number) => SLOT0 + s * SLOT_DT;

type Glide = [t0: number, t1: number, to: Pt, ease?: string];
const HOLD_A = PAY + 250;
const PLAN: Glide[][] = [];
PLAN[HL] = [
  [1360, 1950, [RI, 42]],
  [3080, 3380, [RI, GATE_Y]],
  [3800, 4900, [RI, 300], IOS],
  [6600, 9400, [RI, 340], IOS],
  [HOLD_A, 12250, [RI, 150], IOS],
  [12300, 13500, HEADS[HL].home],
];
PLAN[HT] = [
  [1400, 2100, [210, RI]],
  [3200, 4900, [300, RI], IOS],
  [6600, 9400, [230, RI], IOS],
  [HOLD_A, 12250, [140, RI], IOS],
  [12300, 13500, HEADS[HT].home],
];
PLAN[HB] = [
  [1360, 1950, [150, RHI]],
  [3150, 4900, [262, RHI], IOS],
  [6600, 9400, [120, RHI], IOS],
  [HOLD_A, 12250, [290, RHI], IOS],
  [12300, 13500, HEADS[HB].home],
];
PLAN[HR] = [
  [1360, 1950, [RHI, 42]],
  [3150, 4900, [RHI, 200], IOS],
  [6600, 9400, [RHI, 270], IOS],
  [HOLD_A, 12250, [RHI, 110], IOS],
  [12300, 13500, HEADS[HR].home],
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

/* ───────────────────────────── generic shapes ──────────────────────────── */

const Z0 = "opacity:0";
const O1 = "opacity:1";
/** translate() of a point in units, 0.1cqw precision */
const tr2 = (x: number, y: number) => `translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw)`;
const fmtF = ([x, y, sx, sy, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} scale(${f(sx)},${f(sy)})`;
const fmtS = ([x, y, r, s, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg) scale(${f(s)})`;
const fmtD = ([x, y, r, s, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg) scale(${f(s)})`;
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
  fr: [
    [t - 2, [p[0], p[1], rot, 0.25 * size, 0], OUT],
    [t + 18, [p[0], p[1], rot, 0.55 * size, 1], OUT],
    [t + life * 0.45, [p[0], p[1] + 4 * size, rot, size, 0.85]],
    [t + life, [p[0], p[1] + 14 * size, rot, 1.12 * size, 0]],
  ],
});

/* ───────────────────────────── head beams (polar sampling) ───────────────── */

type PS = { t: number; g: number; r: number; p: Pt };
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

type Shot = { k: "hit"; land: number; to: Pt; travel: number } | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number };
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.a - s.travel);
const shotEnd = (s: Shot) => (s.k === "hit" ? s.land + 167 : s.b + 152);

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
    if (dist(o, headAt(k, shotEnd(s))) > 0.01) throw new Error(`lgm: head ${h.id} moves while firing at ${t0} ms`);
    const B = (g: number, sx: number, op = 1): number[] => [o[0], o[1], g, sx, op];
    if (s.k === "hit") {
      const g = un(angle(o, s.to));
      const len = dist(o, s.to) / 400;
      fr.push([t0 - 4, B(g, 0)], [t0, B(g, 0), GROW], [s.land, B(g, len)], [s.land + 45, B(g, len), TAIL], [s.land + 165, B(g, len, 0)], [s.land + 167, B(g, 0, 0)]);
      fires.push([t0, t0]);
    } else {
      const ss: PS[] = [];
      for (let i = 0, n = Math.ceil((s.b - s.a) / 8); i <= n; i++) {
        const t = s.a + ((s.b - s.a) * i) / n;
        const p = s.at(t);
        ss.push({ t, g: un(angle(o, p)), r: dist(o, p), p });
      }
      fr.push([t0 - 4, B(ss[0].g, 0)], [t0, B(ss[0].g, 0), GROW]);
      for (const q of rdpPolar(o, ss, 1.6)) fr.push([q.t, B(q.g, q.r / 400)]);
      const z = ss[ss.length - 1];
      fr.push([s.b + 20, B(z.g, z.r / 400), TAIL], [s.b + 150, B(z.g, z.r / 400, 0)], [s.b + 152, B(z.g, 0, 0)]);
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

/* ───────────────────────────── visitors ──────────────────────────────────── */

type Visit = { tg: number; q: boolean };
const VISITS: Visit[] = [...HERO_Q.map((tg) => ({ tg, q: true })), ...RAPID_Q.map((tg) => ({ tg, q: true })), ...REJ.map((tg) => ({ tg, q: false }))].sort(
  (a, b) => a.tg - b.tg,
);
const DOT_C = ["cyan", "blue", "green", "cyan", "blue", "green"];
const SIDES = ["L", "B", "R", "L", "R", "B", "L", "B", "R"] as const;
const FALL = 470; // mouth → gate
type Burst = { side: (typeof SIDES)[number]; e: number; m: number; c: string };

/** one visitor: tossed in from an edge onto the mouth, swirls down, meets the gate */
function visitEvent(v: Visit, bu: Burst, k: number, rnd: () => number): PoolEvent {
  const m = Math.max(-0.9, Math.min(0.9, bu.m + (k % 2 ? -1 : 1) * 0.28 * Math.ceil(k / 2) + (rnd() - 0.5) * 0.12));
  const M: Pt = [FX + m * (RIM_RX - 16), RIM_Y + (rnd() - 0.5) * 0.7 * RIM_RY];
  const j = (rnd() - 0.5) * 16;
  let S: Pt;
  let C: Pt;
  if (bu.side === "L") {
    S = [-10, 130 + bu.e * 140 + j];
    C = [(S[0] + M[0]) / 2 - 10, Math.min(S[1], M[1]) - 46 - bu.e * 20];
  } else if (bu.side === "B") {
    S = [12 + bu.e * 150 + j, 410];
    C = [(S[0] + M[0]) / 2, M[1] - 56 - bu.e * 12];
  } else {
    S = [410, 92 + bu.e * 14 + j * 0.4];
    C = [(S[0] + M[0]) / 2 + 20, 84 + bu.e * 8];
  }
  const arcLen = plen(Array.from({ length: 9 }, (_, i) => bez2(S, C, M, i / 8)));
  const da = Math.round(Math.max(520, Math.min(820, arcLen / 0.44)));
  const tm = v.tg - FALL;
  const ts = tm - da;
  // key points; the tail points along the motion
  const ks: { t: number; p: Pt; s: number; o: number; e?: string }[] = [];
  for (let i = 0; i <= 4; i++) {
    const u = i / 4;
    ks.push({ t: ts + da * u, p: bez2(S, C, M, u), s: 0.6 + 0.4 * u, o: i ? 1 : 0 });
  }
  const sg = Math.sign(M[0] - FX) || 1;
  const W1: Pt = [FX - sg * 0.6 * hwAt(166), 166];
  const W2: Pt = [FX + sg * 0.42 * hwAt(206), 206];
  const G: Pt = [GATE_P[0], GATE_P[1] - 3];
  ks[ks.length - 1].e = IOS;
  ks.push({ t: tm + 190, p: W1, s: 0.86, o: 1, e: IOS }, { t: tm + 340, p: W2, s: 0.74, o: 1, e: IN }, { t: v.tg, p: G, s: 0.64, o: 1 });
  if (v.q) ks.push({ t: v.tg + 45, p: [FX, SPOUT_Y - 4], s: 0.5, o: 1 }, { t: v.tg + 70, p: [FX, SPOUT_Y], s: 0.4, o: 0 });
  else {
    ks[ks.length - 1].e = OUT;
    ks.push({ t: v.tg + 300, p: [G[0] - sg * 32, G[1] - 38], s: 0.3, o: 0 });
  }
  let prev = Number.NaN;
  const fr: Frame[] = ks.map((q, i) => {
    let r = angle(ks[Math.max(0, i - 1)].p, ks[Math.min(ks.length - 1, i + 1)].p);
    if (!Number.isNaN(prev)) {
      while (r - prev > 180) r -= 360;
      while (r - prev < -180) r += 360;
    }
    prev = r;
    return [q.t, [q.p[0], q.p[1], r, q.s, q.o], q.e];
  });
  return { pri: v.q ? 2 : 1, tag: bu.c, fr };
}

/* ───────────────────────────── build all keyframes ───────────────────────── */

const FO_M = 4; // the CTA forge clip box's margin around the outline (its glow)
const SW_C = 1.4; // CTA forge outline width (units)
const UL_Y = 1.0; // climax underline: top and thickness (em of the title)
const UL_H = 0.07;

function build(title: string, tagline: string, cta: string, ns: string) {
  begin(ns);
  const lay = layout(title, tagline, cta);
  const { fs, lh, groups, climax, ctaW, tag } = lay;
  const shots: Shot[][] = HEADS.map(() => []);
  const FL: PoolEvent[] = []; // flares
  const SP: PoolEvent[] = []; // spark bursts
  const DT: PoolEvent[] = []; // visitor dots
  const CM: PoolEvent[] = []; // comets

  /* ── WELD: the tips race up the walls; the funnel exists only behind them ── */
  const tipAt = (path: Pt[]) => (t: number) => pat(path, eIO(Math.max(0, Math.min(1, (t - TR_A) / (TR_Z - TR_A)))) * TIP_LEN);
  {
    // clip box offset d: > 0 hides the top (reveal edge rides the tips), < 0
    // hides the bottom (the erase pass)
    const st: [number, number][] = [
      [0, FW.h],
      [TR_A - 2, FW.h],
    ];
    for (let t = TR_A; t <= TR_Z; t += 40) st.push([t, Math.max(0, tipAt(TIP_L)(t)[1] - 5 - FW.y)]);
    st.push([TR_Z + 10, 0]);
    const eTop = scanAt(FW.y + FW.h, true);
    const eBot = scanAt(FW.y, true);
    st.push([eTop, 0]);
    for (let t = eTop + 40; t < eBot; t += 40) st.push([t, Math.min(0, scanY(ERASE, t) - (FW.y + FW.h))]);
    st.push([eBot, -FW.h]);
    kf("fwo", st.map(([t, d]): Stop => [t, `transform:translateY(${f(d / 4, 2)}cqw)`]));
    kf("fwi", st.map(([t, d]): Stop => [t, `transform:translateY(${f(-d / 4, 2)}cqw)`]));
  }
  // the fresh weld glows white-hot, cools to the gradient
  kf("fhot", [
    [0, Z0],
    [TR_A - 2, Z0],
    [TR_A + 10, O1],
    [TR_Z + 120, O1, COOL],
    [TR_Z + 900, Z0],
  ]);
  [TIP_L, TIP_R].forEach((path, k) => {
    const at = tipAt(path);
    const fr: Frame[] = [
      [TR_A - 60, [path[0][0], path[0][1], 0.3, 0.3, 0], OUT],
      [TR_A, [path[0][0], path[0][1], 0.75, 0.75, 1], OUT],
    ];
    for (let t = TR_A + 40; t < TR_Z; t += 40) {
      const p = at(t);
      fr.push([t, [p[0], p[1], 0.4, 0.4, 1]]);
    }
    if (k) fr.push([TR_Z, [APEX[0], APEX[1], 0.4, 0.4, 1]], [TR_Z + 90, [APEX[0], APEX[1], 0.3, 0.3, 0]]);
    else {
      fr[fr.length - 1][2] = OUT;
      fr.push([TR_Z, [APEX[0], APEX[1], 1.7, 1.7, 1], OUT], [TR_Z + 520, [APEX[0], APEX[1], 0.75, 0.75, 0]]);
    }
    FL.push({ pri: 2, tag: k ? "cyan" : "lime", fr });
  });
  shots[HL].push({ k: "track", a: TR_A, b: TR_Z, at: tipAt(TIP_L), travel: 90 });
  shots[HT].push({ k: "track", a: TR_A, b: TR_Z, at: tipAt(TIP_L), travel: 90 });
  shots[HB].push({ k: "track", a: TR_A, b: TR_Z, at: tipAt(TIP_R), travel: 90 });
  shots[HR].push({ k: "track", a: TR_A, b: TR_Z, at: tipAt(TIP_R), travel: 90 });
  SP.push(sparkEv(APEX, TR_Z, 0, 0.85, 460, 2));

  /* ── PRINT: the machine is printed above the printhead, erased under it ── */
  {
    const HB_ = PR.y + PR.h;
    const eEnd = scanAt(PR.y, true);
    const hk: [number, number, string?][] = [
      [0, PR.h],
      [SCAN[0], PR.h, IO],
      [SCAN[1], 0],
      [ER_A, 0],
    ];
    // the erase pass goes on past the machine (to the headline): sampled, clamped to the box
    for (let t = ER_A + 40; t < eEnd; t += 40) hk.push([t, Math.min(PR.h, HB_ - scanY(ERASE, t))]);
    hk.push([eEnd, PR.h]);
    kf("pwo", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(-h / 4, 2)}cqw)`, e]));
    kf("pwi", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(h / 4, 2)}cqw)`, e]));
  }
  {
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    kf("scan", [
      [0, Y(0, SCAN[2])],
      [PH_ON, Y(0, SCAN[2])],
      [PH_ON + 30, Y(1, SCAN[2])],
      [PH_ON + 52, Y(0.35, SCAN[2])],
      [PH_ON + 80, Y(1, SCAN[2])],
      [SCAN[0], Y(1, SCAN[2]), IO],
      [SCAN[1], Y(1, SCAN[3])],
      [SCAN[1] + 170, Y(0, SCAN[3] + 8)],
      [ER_A - 170, Y(0, ERASE[2])],
      [ER_A - 40, Y(1, ERASE[2])],
      [ER_A, Y(1, ERASE[2]), IO],
      [ER_Z, Y(1, ERASE[3])],
      [ER_Z + 170, Y(0, ERASE[3] - 10)],
    ]);
  }
  // the vortex ring turns three times per loop
  anim("vx", null, [
    [
      "rotate",
      "deg",
      1,
      [
        [0, 0],
        [T, 1080],
      ],
    ],
  ]);

  /* ── KINETIC HEADLINE ── */
  const pY = (em: number) => f((em / LINE) * 100, 2); // em → % of the item box
  const lineOut = (l: number): [number, number] => [scanAt(TITLE_Y + (l + 1) * lh, true), scanAt(TITLE_Y + l * lh, true)];
  function slamKF(name: string, t: number, big: boolean, wave: number, out: [number, number], g: Item) {
    const cx = (s: number) => f(((1 - s) * (g.w / 2 - g.ox) * 100) / g.w, 2);
    const tr = (o: number, y: number, sx: number, sy: number, sk: number, x = "0") =>
      `opacity:${f(o)};transform:translateX(${x}%) translateY(${pY(y)}%) scale(${f(sx, 3)},${f(sy, 3)}) skewX(${f(sk, 1)}deg)`;
    const k0 = big ? -18 : -14;
    const y0 = big ? -0.1 : -0.08;
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
      [wave + 120, tr(1, -0.12, 1.035, 1.035, -3.5, cx(1.035)), IO],
      [wave + 330, tr(1, 0, 1, 1, 0)],
      [out[0] - 12, tr(1, 0, 1, 1, 0), OUT],
      [out[1] + 30, tr(0, -0.2, 1.06, 1, -12)],
    ]);
  }
  const waveAt = (x: number) => WAVE + Math.round(((x - TITLE_X) / TITLE_W) * 300);
  groups.forEach((g, i) => {
    const t = slotT(g.slot);
    const head = SLOT_HEAD[((g.slot % 3) + 3) % 3];
    const c = HEADS[head].c;
    slamKF(`w${i}`, t, false, waveAt(g.cx), lineOut(g.line), g);
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
    SP.push(sparkEv([g.cx, g.cy + 0.42 * lh], t, 0, 0.78, 410, 2));
  });
  const WAVE_L = waveAt(climax.cx) + 40;
  slamKF("wL", LAST, true, WAVE_L, lineOut(climax.line), climax);
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: LAST - PRE_L, to: [climax.cx, climax.cy], travel: 100 });
  FL.push(flareEv([climax.cx, climax.cy], LAST - PRE_L, 1.6, 460, 2, "lime"));
  SP.push(sparkEv([climax.cx, climax.cy + 0.42 * lh], LAST, 0, 1.08, 560, 2));
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
  const [oL] = lineOut(climax.line);
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
        [LAST + 86, [climax.x, y, 0.36, 0.36, 0]],
        [LAST + 90, [climax.x, y, 0.4, 0.4, 1], OUT],
        [LAST + 460, [climax.x + climax.w, y, 0.4, 0.4, 1]],
        [LAST + 620, [climax.x + climax.w, y, 0.3, 0.3, 0]],
      ],
    });
  }
  {
    // tagline rises in a skewed wave; zapped by the erase pass
    const tagBot = tag.y + tag.lines * TAG_LH * tag.fs;
    const o0 = scanAt(tagBot, true);
    const o1 = scanAt(tag.y, true);
    const R = (o: number, y: number, sk: number) => `opacity:${f(o)};transform:translateY(${f(y)}em) skewY(${f(sk)}deg)`;
    kf("tag", [
      [0, R(0, 0.9, 4)],
      [TAG_A, R(0, 0.9, 4), BACK2],
      [TAG_A + 460, R(1, 0, 0)],
      [o0 - 10, R(1, 0, 0), OUT],
      [o1 + 30, R(0, -0.3, 0)],
    ]);
  }

  /* ── LASER GATE: the lime head shoots the left post, the beam spans the spout ── */
  shots[HL].push({ k: "hit", land: GATE_T, to: [GATE_X0 - 3, GATE_Y], travel: 90 });
  FL.push(flareEv([GATE_X0 - 3, GATE_Y], GATE_T, 0.9, 300, 2, "lime"), flareEv([GATE_X1 + 3, GATE_Y], GATE_T + 120, 0.8, 300, 1, "cyan"));

  /* ── VISITORS: bursts from every side; the gate zaps the rejected ones ── */
  const rnd = rng(0x1ead5);
  const zaps: number[] = [];
  const passes: number[] = [];
  let nRej = 0;
  {
    let bu: Burst | null = null;
    let k = 0;
    let nb = 0;
    let last = -1e9;
    VISITS.forEach((v) => {
      if (!bu || v.tg - last > 200) {
        bu = { side: SIDES[nb % SIDES.length], e: rnd(), m: (rnd() * 2 - 1) * 0.6, c: DOT_C[nb % DOT_C.length] };
        nb++;
        k = 0;
      }
      last = v.tg;
      DT.push(visitEvent(v, bu, k++, rnd));
      if (v.q) {
        FL.push(flareEv(GATE_P, v.tg, 0.75, 260, 1, "lime"));
        passes.push(v.tg);
      } else {
        // every other zap flashes blue and thickens the beam; one in four sprays sparks
        const nz = nRej++;
        if (nz % 2 === 0) {
          FL.push(flareEv(GATE_P, v.tg, 0.55, 220, 0, "blue"));
          zaps.push(v.tg);
        }
        if (nz % 4 === 1) SP.push(sparkEv([GATE_P[0], GATE_P[1] - 2], v.tg, (rnd() - 0.5) * 120, 0.32, 300, 0));
      }
    });
  }
  {
    // the gate beam: ignites at GATE_T; thickens and flickers on every zap, swells on every pass
    const G = (o: number, sx: number, sy = 1) => `opacity:${f(o)};transform:scale(${f(sx, 3)},${f(sy, 2)})`;
    const st: Stop[] = [
      [0, G(0, 0)],
      [GATE_T - 2, G(1, 0), OUT],
      [GATE_T + 120, G(1, 1)],
      [GATE_T + 150, G(0.4, 1)],
      [GATE_T + 175, G(1, 1)],
    ];
    for (const t of zaps) st.push([t - 2, G(1, 1), OUT], [t + 16, G(0.55, 1, 2.6), IO], [t + 130, G(1, 1)]);
    for (const t of passes) st.push([t - 2, G(1, 1), OUT], [t + 20, G(1, 1, 1.9), IO], [t + 200, G(1, 1)]);
    st.sort((a, b) => a[0] - b[0]);
    kf("gate", st);
  }

  /* ── COMETS: qualified visitor → form ── */
  const comet = (t0: number, to: Pt) => {
    const p0 = SPOUT_P;
    const pc: Pt = [150, 312];
    const t1 = t0 + COMET_FLY;
    const at = (t: number): [Pt, number] => {
      const u = eS(Math.max(0, Math.min(1, (t - t0) / (t1 - t0))));
      const d = bez2d(p0, pc, to, u);
      return [bez2(p0, pc, to, u), (Math.atan2(d[1], d[0]) * 180) / Math.PI];
    };
    const o = (t: number) => Math.max(0, Math.min(1, (t - t0) / 40, (t1 + 30 - t) / 60));
    const fr: Frame[] = [[t0 - 6, [p0[0], p0[1], at(t0)[1], 0]]];
    for (let t = t0; t <= t1 + 30; t += 42) {
      const [p, a] = at(t);
      fr.push([t, [p[0], p[1], a, o(t)]]);
    }
    fr.push([t1 + 32, [to[0], to[1], at(t1)[1], 0]]);
    CM.push({ pri: 2, fr });
  };
  HERO_Q.forEach((q, i) => {
    comet(q + 30, fieldTarget(i));
    FL.push(flareEv(fieldTarget(i), FILL_T[i], 0.95, 320, 2, "lime"));
  });
  RAPID_Q.forEach((q, j) => {
    comet(q + 30, fieldTarget(0));
    FL.push(flareEv(fieldTarget(0), RL[j], 0.8, 260, 1, "lime"));
  });

  /* ── FORM: fields type in, the step marker advances, the progress fills ── */
  const clears = PRESS.slice(0, -1); // the form clears after every submit but the last
  for (let i = 0; i < 3; i++) {
    const S = (v: number) => `transform:scaleX(${f(v, 3)})`;
    const st: Stop[] = [
      [0, S(0)],
      [FILL_T[i] - 2, S(0), "steps(7,end)"],
      [FILL_T[i] + 320, S(1)],
    ];
    clears.forEach((p, j) => {
      st.push([p + 70 + i * 15, S(1), IN], [p + 150 + i * 15, S(0)]);
      const l = RL[j] + i * 60;
      st.push([l, S(0), "steps(4,end)"], [l + 150, S(1)]);
    });
    kf(`fb${i}`, st);
  }
  {
    const X = (s: number, sc = 1) => `transform:translateX(${f((STEP_X[s] - STEP_X[2]) / 4, 2)}cqw) scale(${f(sc)})`;
    const st: Stop[] = [
      [0, X(0)],
      [FILL_T[0] + 220, X(0), BACK2],
      [FILL_T[0] + 520, X(1)],
      [FILL_T[1] + 220, X(1), BACK2],
      [FILL_T[1] + 520, X(2)],
      [FILL_T[2] + 260, X(2), OUT],
      [FILL_T[2] + 360, X(2, 1.3), IO],
      [FILL_T[2] + 560, X(2)],
    ];
    clears.forEach((p, j) => {
      st.push([p + 90, X(2), IO], [p + 230, X(0)]);
      st.push([RL[j] + 40, X(0), IO], [RL[j] + 130, X(1), IO], [RL[j] + 220, X(2)]);
    });
    kf("stp", st);
  }
  {
    const S = (v: number) => `transform:scaleX(${f(v, 3)})`;
    const st: Stop[] = [[0, S(0)]];
    FILL_T.forEach((t, i) => st.push([t + 120, S(i / 3), BACK2], [t + 420, S((i + 1) / 3)]));
    clears.forEach((p, j) => {
      st.push([p + 70, S(1), IN], [p + 160, S(0)]);
      st.push([RL[j] + 20, S(0), IO], [RL[j] + 280, S(1)]);
    });
    kf("prg", st);
  }

  /* ── CTA FORGE: two weld tips trace the pill outline (two beams each),
        collide on the right → white-hot → lime, the label rises ── */
  const CR = CTA_H / 2;
  const cyM = CTA_Y + CR;
  const xL = CTA_X + CR;
  const xR = CTA_X + ctaW - CR;
  const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 4) => earc(cx, cy, r, r, a0, a1, n);
  const tipA: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 270), [xR, CTA_Y], ...arc(xR, cyM, CR, 270, 360)];
  const tipB: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 90), [xR, CTA_Y + CTA_H], ...arc(xR, cyM, CR, 90, 0)];
  const LT = plen(tipA);
  const D = FG_Z - FG_A;
  const fTip = (path: Pt[]) => (t: number) => pat(path, (Math.max(0, Math.min(D, t - FG_A)) / D) * LT);
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
      fr[fr.length - 2][2] = OUT;
      fr[fr.length - 1] = [FG_Z, [z[0], z[1], 1.7, 1.7, 1], OUT];
      fr.push([FG_Z + 520, [z[0], z[1], 1.7 * 0.45, 1.7 * 0.45, 0]]);
    }
    FL.push({ pri: 2, tag: "lime", fr });
  });
  {
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
  shots[HT].push({ k: "track", a: FG_A, b: FG_Z, at: fTip(tipA), travel: 80 });
  shots[HR].push({ k: "track", a: FG_A, b: FG_Z, at: fTip(tipA), travel: 80 });
  shots[HL].push({ k: "track", a: FG_A, b: FG_Z, at: fTip(tipB), travel: 80 });
  shots[HB].push({ k: "track", a: FG_A, b: FG_Z, at: fTip(tipB), travel: 80 });
  SP.push(sparkEv([CTA_X + ctaW, cyM], FG_Z, 52, 0.9, 500, 2));
  {
    const C = (o: number, sx: number, sy = sx) => `opacity:${o};transform:scale(${f(sx, 3)},${f(sy, 3)})`;
    const st: Stop[] = [
      [0, C(0, 1)],
      [FG_Z - 2, C(0, 1)],
      [FG_Z, C(1, 1), OUT],
      [FG_Z + 110, C(1, 1.045), IO],
      [FG_Z + 330, C(1, 1)],
    ];
    PRESS.forEach((p, j) => {
      const a = j ? 0.95 : 0.93;
      st.push([p - 2, C(1, 1), "ease-in"], [p + 60, C(1, a, a - 0.03), OUT], [p + 210, C(1, 1.04, 1.05), IO], [p + 330, C(1, 1)]);
    });
    kf("cta", st);
    const H = (o: number) => `opacity:${f(o)}`;
    const sh: Stop[] = [
      [0, H(0)],
      [FG_Z - 2, H(0)],
      [FG_Z + 12, H(1)],
      [FG_Z + 110, H(1), COOL],
      [FG_Z + 640, H(0)],
    ];
    PRESS.forEach((p) => sh.push([p + 20, H(0)], [p + 60, H(0.75), COOL], [p + 360, H(0)]));
    kf("ctaH", sh);
    const L0 = FG_Z + 150;
    kf("lbl", [
      [0, "transform:translateY(118%) skewY(9deg)"],
      [L0, "transform:translateY(118%) skewY(9deg)", BACK2],
      [L0 + 460, "transform:translateY(0) skewY(0deg)"],
    ]);
  }

  /* ── click: cursor, ripple (re-used for the payoff), flare + sparks ── */
  const CP: Pt = [CTA_X + ctaW / 2, cyM];
  FL.push(flareEv(CP, CLICK, 1.3, 320, 2, "lime"));
  SP.push(sparkEv(CP, CLICK, 0, 0.72, 460, 2));
  {
    const C = (o: number, x: number, y: number, s = 1) => `opacity:${o};transform:translate(${f(CP[0] / 4 + x)}cqw,${f(CP[1] / 4 + y)}cqw) scale(${f(s)})`;
    kf("cur", [
      [0, C(0, 30, 34)],
      [CLICK - 620, C(0, 30, 34)],
      [CLICK - 540, C(1, 26, 30), "cubic-bezier(.3,0,.45,1)"],
      [CLICK - 200, C(1, 8, 9), IO],
      [CLICK - 35, C(1, 0, 0)],
      [CLICK - 8, C(1, 0, 0)],
      [CLICK + 60, C(1, 0, 0, 0.8), OUT],
      [CLICK + 200, C(1, 0, 0)],
      [CLICK + 520, C(1, 0, 0), IO],
      [CLICK + 820, C(0, 6, 7)],
    ]);
  }
  {
    const R = (o: number, p: Pt, s: number) => `opacity:${f(o)};transform:${tr2(p[0], p[1])} scale(${f(s)})`;
    kf("rip", [
      [0, R(0, CP, 0.2)],
      [CLICK - 2, R(0, CP, 0.2), OUT],
      [CLICK, R(1, CP, 0.25), OUT],
      [CLICK + 640, R(0, CP, 4.2)],
      [PAY - 2, R(0, COUNTER_C, 0.3), OUT],
      [PAY, R(1, COUNTER_C, 0.35), OUT],
      [PAY + 760, R(0, COUNTER_C, 6.5)],
    ]);
  }

  /* ── CRM: each submit drops a card into the pipeline (a conveyor that moves
        one slot left per card), the counter rolls, the week chart climbs ── */
  for (let k = 0; k < N_CARDS; k++) {
    // the card flies from the submit pill into the 4th slot, then rides the
    // conveyor one slot left per newer card (its translate is relative to its
    // final place, the poster)
    const ej = CARD_EJ[k];
    const land = CARD_LAND[k];
    const S0: Pt = [CP[0] - CARD_W / 2, CTA_Y - 4];
    const S1: Pt = [SLOT_X0 + 3 * PITCH, CARD_Y];
    const C: Pt = [(S0[0] + S1[0]) / 2 + 10, CTA_Y - 4];
    const hx = cardX(k);
    const xs: Key[] = [[0, (S0[0] - hx) / 4]];
    const ys: Key[] = [[0, (S0[1] - CARD_Y) / 4]];
    const sx: Key[] = [[0, 0.5]];
    const sy: Key[] = [[0, 0.5]];
    for (let t = ej; t < land; t += 45) {
      const u = (t - ej) / (land - ej);
      const q = bez2(S0, C, S1, u * u);
      const sc = 0.5 + 0.5 * eS(u);
      xs.push([t, (q[0] - hx) / 4]);
      ys.push([t, (q[1] - CARD_Y) / 4]);
      sx.push([t, sc]);
      sy.push([t, sc]);
    }
    xs.push([land, (offK(k) - OFF_END) / 4]);
    ys.push([land, 0]);
    sx.push([land, 1, OUT], [land + 50, 1.06, OUT], [land + 150, 0.98, IO], [land + 260, 1]);
    sy.push([land, 1, OUT], [land + 50, 0.88, OUT], [land + 150, 1.04, IO], [land + 260, 1]);
    for (let j = k + 1; j < N_CARDS; j++) xs.push([CARD_LAND[j] - 330, (offK(j - 1) - OFF_END) / 4, IO], [CARD_LAND[j] - 150, (offK(j) - OFF_END) / 4]);
    anim(
      `cd${k}`,
      [
        [0, 0],
        [ej - 2, 0],
        [ej + 50, 1],
      ],
      [
        ["translate", "cqw", 1, xs, ys],
        ["scale", "", 3, sx, sy],
      ],
    );
    const LP: Pt = [S1[0] + CARD_W / 2, CARD_Y + CARD_H];
    FL.push(flareEv([LP[0], LP[1] - 30], land, k ? 0.85 : 1.25, k ? 300 : 420, k ? 1 : 2, "lime"));
    SP.push(sparkEv([LP[0], LP[1] - 4], land, 0, k ? 0.55 : 0.8, k ? 360 : 460, k ? 0 : 2));
  }
  {
    const R = (i: number) => `transform:translateY(${f((-100 * i) / REEL.length, 3)}%)`;
    const st: Stop[] = [[0, R(0)]];
    let prev = 0;
    CARD_LAND.forEach((t, k) => {
      st.push([t, R(prev), EO], [t + 420, R(REEL_AT[k])]);
      prev = REEL_AT[k];
    });
    kf("reel", st);
  }

  /* ── PAYOFF: all four heads strike the counter ── */
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: PAY - PRE, to: COUNTER_C, travel: 100 });
  FL.push(flareEv(COUNTER_C, PAY - PRE, 1.8, 520, 2, "lime"));
  SP.push(sparkEv([COUNTER_C[0], COUNTER_C[1] + 6], PAY, 0, 1, 560, 2));

  /* ── rail heads ── */
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
    shake(TR_Z, 0.35);
    shake(LAST, 1);
    shake(FG_Z, 0.45);
    shake(CARD_LAND[0], 0.4);
    shake(PAY, 0.8);
    kf("shake", st);
    const fl: Stop[] = [[0, Z0]];
    const flash = (t: number, o: number, life: number) => fl.push([t - 2, Z0], [t + 25, `opacity:${f(o)}`], [t + life, Z0]);
    flash(TR_Z, 0.5, 380);
    flash(LAST, 0.95, 460);
    flash(FG_Z, 0.4, 420);
    flash(CLICK, 0.4, 480);
    flash(PAY, 0.75, 560);
    kf("flash", fl);
  }

  /* ── pools ── */
  const pf = pool("pf", FL, 6, fmtF, true);
  const ps = pool("ps", SP.map((e) => ({ ...e, tag: "lime" })), 2, fmtS);
  const pd = pool("pd", DT, 7, fmtD);
  const nCm = pool("pc", CM, 2, fmtCom).length;

  return { css: (BASE + end()).replace(/\n/g, ""), lay, pf, ps, pd, nCm, fo };
}

/* ───────────────────────────── static art (SVG images) ─────────────────── */

/* static funnel art */
const RIM_FRONT = `M${FX - RIM_RX} ${RIM_Y}A${RIM_RX} ${RIM_RY} 0 0 0 ${FX + RIM_RX} ${RIM_Y}`;
const RIM_BACK = `M${FX - RIM_RX} ${RIM_Y}A${RIM_RX} ${RIM_RY} 0 0 1 ${FX + RIM_RX} ${RIM_Y}`;
const WALLS = `M${FX - RIM_RX} ${RIM_Y}L${FX - NECK_HW} ${NECK_Y}V${SPOUT_Y}M${FX + RIM_RX} ${RIM_Y}L${FX + NECK_HW} ${NECK_Y}V${SPOUT_Y}`;
const BODY = `${RIM_FRONT}L${FX + NECK_HW} ${NECK_Y}V${SPOUT_Y}H${FX - NECK_HW}V${NECK_Y}Z`;
const ring = (y: number, front: boolean) => {
  const hw = hwAt(y);
  const ry = (hw * RIM_RY) / RIM_RX;
  return `M${f(FX - hw, 1)} ${y}A${f(hw, 1)} ${f(ry, 2)} 0 0 ${front ? 0 : 1} ${f(FX + hw, 1)} ${y}`;
};

/**
 * Spark sprite (static artwork, the sites-web scene's spray): white-hot heads,
 * coloured tails, a few embers. [angle°, inner radius, outer radius, half-width]
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
/** a static SVG as a CSS image (an image adds no paint-property node: fewer paint chunks to layerize every frame) */
const svgUrl = (svg: string) =>
  `url("data:image/svg+xml,${svg.replace(/"/g, "'").replace(/[<>#%{}\n]/g, (c) => encodeURIComponent(c))}")`;
const SVG = (vb: string, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none">${body}</svg>`;

const SPARK_ART = svgUrl(
  SVG("-50 -50 100 100", `<path d="${SPARK_TAILS}" fill="#c8f02e" fill-opacity=".55"/><path d="${SPARK_HEADS}" fill="#fff"/><path d="${SPARK_EMBERS}" fill="#fff" fill-opacity=".85"/>`),
);
const CURSOR_ART = svgUrl(SVG("-1 -1 20 28", `<path d="M0 0v22l6-6 5 10 4-2-5-10h8Z" fill="#0a0a0b" stroke="#f2f3ee" stroke-width="1.4" stroke-linejoin="round"/>`));
const ARROW_ART = svgUrl(SVG("0 0 16 16", `<path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="#0a0a0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`));
const VX_ART = svgUrl(
  SVG(
    "0 0 132 132",
    `<circle cx="66" cy="66" r="64" stroke="#c8f02e" stroke-opacity=".55" stroke-width="2.2" stroke-dasharray="14 18" stroke-linecap="round"/>` +
      `<circle cx="66" cy="66" r="54" stroke="#14e0c8" stroke-opacity=".4" stroke-width="1.6" stroke-dasharray="5 13" stroke-linecap="round"/>`,
  ),
);
const FW_VB = `${FW.x} ${FW.y} ${FW.w} ${FW.h}`;
const FUNNEL_ART = svgUrl(
  SVG(
    FW_VB,
    `<defs><linearGradient id="g" x1="0" y1="${RIM_Y - RIM_RY}" x2="0" y2="${SPOUT_Y}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c8f02e"/><stop offset=".45" stop-color="#14e0c8"/><stop offset="1" stop-color="#2e66ff"/></linearGradient>` +
      `<linearGradient id="b" x1="0" y1="${RIM_Y}" x2="0" y2="${SPOUT_Y}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#14e0c8" stop-opacity=".15"/><stop offset="1" stop-color="#2e66ff" stop-opacity=".05"/></linearGradient></defs>` +
      `<path d="${BODY}" fill="url(#b)"/>` +
      `<ellipse cx="${FX}" cy="${RIM_Y}" rx="${RIM_RX}" ry="${RIM_RY}" fill="#07080b" fill-opacity=".55"/>` +
      `<path d="${WALLS}" stroke="url(#g)" stroke-opacity=".18" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${WALLS}" stroke="url(#g)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${RIM_BACK}" stroke="#14e0c8" stroke-opacity=".8" stroke-width="1.5"/>` +
      `<path d="${RIM_FRONT}" stroke="#c8f02e" stroke-opacity=".2" stroke-width="6"/>` +
      `<path d="${RIM_FRONT}" stroke="#c8f02e" stroke-width="2"/>`,
  ),
);
const FHOT_ART = svgUrl(
  SVG(
    FW_VB,
    `<path d="${WALLS}${RIM_FRONT}${RIM_BACK}" stroke="#c8f02e" stroke-opacity=".45" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${WALLS}${RIM_FRONT}${RIM_BACK}" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
);
/* field glyphs (language-neutral): person, @, € — 16-unit icons nested in the machine art */
const GLYPH_S = `stroke="#f2f3ee" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
const GLYPHS = [
  `<circle cx="8" cy="5.4" r="2.9" ${GLYPH_S}/><path d="M2.6 14c.6-3 2.8-4.6 5.4-4.6s4.8 1.6 5.4 4.6" ${GLYPH_S}/>`,
  `<circle cx="8" cy="8" r="2.6" ${GLYPH_S}/><path d="M10.6 8v1.2c0 1.3 1 2.1 2 2.1 1.2 0 1.9-1 1.9-3.3a6.5 6.5 0 1 0-2.6 5.2" ${GLYPH_S}/>`,
  `<path d="M12.6 4a5.3 5.3 0 1 0 0 8" ${GLYPH_S}/><path d="M2.4 6.8h7M2.4 9.4h7" ${GLYPH_S}/>`,
];
const MA = { x: 0, y: 100, w: 400, h: 300 }; // machine art box (units)
/** the machine's static vector art: funnel stage rings, lock, field glyphs, week icon */
const MACHINE_ART = svgUrl(
  SVG(
    `${MA.x} ${MA.y} ${MA.w} ${MA.h}`,
    RINGS.map(([y]) => `<path d="${ring(y, false)}" stroke="#14e0c8" stroke-opacity=".22" stroke-dasharray="3 3"/><path d="${ring(y, true)}" stroke="#14e0c8" stroke-opacity=".5" stroke-width="1.1"/>`).join("") +
      `<path d="${ring(NECK_Y, true)}" stroke="#14e0c8" stroke-opacity=".5" stroke-width="1.1"/>` +
      `<svg x="${FORM.x + FORM.w - 21}" y="${STEP_Y - 6}" width="9" height="12" viewBox="0 0 8 10"><rect x=".5" y="4" width="7" height="5.5" rx="1.2" fill="#22d38c"/><path d="M2.2 4.2V2.9a1.8 1.8 0 0 1 3.6 0v1.3" stroke="#22d38c" stroke-width="1.1"/></svg>` +
      FIELD_Y.map((y, i) => `<svg x="${ICON_X + 4.4}" y="${y + 4.4}" width="11.2" height="11.2" viewBox="0 0 16 16">${GLYPHS[i]}</svg>`).join("") +
      `<svg x="${REEL_X}" y="${REEL_Y + 29.5}" width="7" height="7" viewBox="0 0 12 12"><rect x="1" y="2" width="10" height="9" rx="1.6" stroke="#f2f3ee" stroke-opacity=".42" stroke-width="1.2"/><path d="M1 5h10M4 .8v2.4M8 .8v2.4" stroke="#f2f3ee" stroke-opacity=".42" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  ),
);

/**
 * Lead card art (static image, one per card): avatar, name + company lines,
 * notes, score bar, qualified check. Drawn as the card's background image so
 * a card is ONE element (the pipeline holds six animated cards).
 */
const CARD_ART = AVATAR.map((c, k) => {
  const [c0, c1] = c.split(",");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_W} ${CARD_H}">` +
    `<defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>` +
    `<linearGradient id="s"><stop offset="0" stop-color="#22d38c"/><stop offset="1" stop-color="#c8f02e"/></linearGradient>` +
    `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e212a"/><stop offset="1" stop-color="#111319"/></linearGradient></defs>` +
    `<rect width="${CARD_W}" height="${CARD_H}" fill="url(#g)"/>` +
    `<circle cx="13" cy="13" r="6" fill="url(#a)"/>` +
    `<g fill="#f2f3ee"><rect x="23" y="8.5" width="25" height="3.8" rx="1.9" fill-opacity=".42"/><rect x="23" y="15" width="17" height="3" rx="1.5" fill-opacity=".2"/>` +
    `<rect x="7" y="28" width="42" height="3" rx="1.5" fill-opacity=".12"/><rect x="7" y="35" width="32" height="3" rx="1.5" fill-opacity=".12"/>` +
    `<rect x="7" y="52" width="30" height="4" rx="2" fill-opacity=".1"/></g>` +
    `<rect x="7" y="52" width="${f(30 * SCORE[k], 1)}" height="4" rx="2" fill="url(#s)"/>` +
    `<circle cx="46" cy="53" r="5" fill="#c8f02e"/><path d="M43.6 53.1l1.7 1.7 3.1-3.3" fill="none" stroke="#0a0a0b" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`;
  return svgUrl(svg);
});

/* ───────────────────────────── static styles ─────────────────────────────── */

const BEAM_BG =
  "linear-gradient(rgb(var(--lgm-hot)/.95),rgb(var(--lgm-hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--lgm-c)/.07) 20%,rgb(var(--lgm-c)/.3) 37%,rgb(var(--lgm-c)/.85) 47%,rgb(var(--lgm-c)/.85) 53%,rgb(var(--lgm-c)/.3) 63%,rgb(var(--lgm-c)/.07) 80%,transparent)";
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--lgm-hot)) ${core},rgb(var(--lgm-c)/.8) ${mid},rgb(var(--lgm-c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";

const BASE = `
.lgm-root{--lgm-lime:200 240 46;--lgm-cyan:20 224 200;--lgm-green:34 211 140;--lgm-blue:46 102 255;--lgm-hot:242 243 238;position:relative;z-index:20;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;forced-color-adjust:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;letter-spacing:normal;word-spacing:normal;text-align:left}
.lgm-cv{position:absolute;inset:-3rem;content-visibility:auto;contain-intrinsic-size:0 0}
.lgm-cv>.lgm-L{inset:3rem}
html.a11y-hide-img .lgm-cv{display:none}
.lgm-root i{font-style:normal}
.lgm-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
[data-paused] .lgm-a{animation-play-state:paused}
.lgm-L{position:absolute;inset:0}
.lgm-abs{position:absolute;display:block}
.lgm-clip{position:absolute;overflow:hidden;overflow:clip}
.lgm-o0{position:absolute;width:100cqw;height:100cqw}
.lgm-z{position:absolute;left:0;top:0;width:0;height:0}
.lgm-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.1) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.lgm-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.lgm-floor{position:absolute;left:4%;top:90%;width:92%;height:7%;border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.26),rgb(20 224 200/.07) 60%,transparent)}
.lgm-vortex{position:absolute;left:${P(FX - 96)};top:${P(RIM_Y - 22)};width:${cq(192)};height:${cq(150)};border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.16),rgb(20 224 200/.06) 50%,transparent)}
.lgm-panel{border-radius:2.3cqw;background:radial-gradient(60% 50% at 30% 0,rgb(200 240 46/.07),transparent),linear-gradient(rgb(18 20 27/.9),rgb(9 10 14/.92));box-shadow:inset 0 0 0 1px rgb(242 243 238/.11),inset 0 1px rgb(242 243 238/.14),0 0 4cqw rgb(var(--lgm-cyan)/.07)}
.lgm-crmp{background:radial-gradient(50% 60% at 12% 30%,rgb(200 240 46/.08),transparent),linear-gradient(rgb(16 18 25/.9),rgb(9 10 14/.92))}
.lgm-st{border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:${MONO};font-weight:700;font-size:${cq(6.4)};color:rgb(242 243 238/.55);background:rgb(242 243 238/.06);box-shadow:inset 0 0 0 1px rgb(242 243 238/.2)}
.lgm-stl{background:rgb(242 243 238/.16)}
.lgm-sti{border-radius:50%;box-shadow:0 0 0 max(1px,.32cqw) #c8f02e,0 0 1.6cqw rgb(var(--lgm-lime)/.6);background:rgb(var(--lgm-lime)/.16)}
.lgm-ico{border-radius:1.3cqw;background:rgb(242 243 238/.06);box-shadow:inset 0 0 0 1px rgb(242 243 238/.12);display:flex;align-items:center;justify-content:center}
.lgm-in{border-radius:1.3cqw;background:rgb(0 0 0/.25);box-shadow:inset 0 0 0 1px rgb(242 243 238/.14)}
.lgm-fb{border-radius:1cqw;transform-origin:0 50%;background:linear-gradient(90deg,#f2f3ee,rgb(242 243 238/.75) 70%,#c8f02e)}
.lgm-fbc{position:absolute;right:-1.6cqw;top:50%;width:.45cqw;height:2.6cqw;margin-top:-1.3cqw;background:#c8f02e;box-shadow:0 0 .8cqw #c8f02e}
.lgm-pt{border-radius:1cqw;background:rgb(242 243 238/.09)}
.lgm-pg{border-radius:1cqw;transform-origin:0 50%;background:linear-gradient(90deg,#14e0c8,#c8f02e);box-shadow:0 0 1.4cqw rgb(var(--lgm-lime)/.45)}
.lgm-crm{position:absolute;display:flex;align-items:center;gap:.9cqw;font-family:${MONO};font-weight:700;font-size:${cq(7)};letter-spacing:.14em;color:rgb(242 243 238/.5)}
.lgm-crm i{width:${cq(4.4)};height:${cq(4.4)};border-radius:50%;background:#22d38c;box-shadow:0 0 1cqw #22d38c}
.lgm-k{position:absolute;font-family:${HEAD};font-weight:800;font-size:${cq(REEL_FS)};line-height:1.1;letter-spacing:-.02em;color:#c8f02e;white-space:nowrap;font-variant-numeric:tabular-nums;height:1.1em;overflow:hidden;overflow:clip;text-shadow:0 0 .4em rgb(var(--lgm-lime)/.35)}
.lgm-reel{display:block;white-space:pre;line-height:1.1;transform:translateY(${f((-100 * (REEL.length - 1)) / REEL.length, 3)}%)}
.lgm-cal{position:absolute;display:flex;align-items:center;gap:.6cqw;font-family:${MONO};font-weight:700;font-size:${cq(6.4)};color:rgb(242 243 238/.42)}
.lgm-sb{border-radius:.5cqw .5cqw 0 0}
.lgm-sbl{background:repeating-linear-gradient(90deg,rgb(242 243 238/.22) 0 .9cqw,transparent .9cqw 1.6cqw)}
.lgm-div{background:linear-gradient(transparent,rgb(242 243 238/.14),transparent)}
.lgm-slot{border-radius:1.6cqw;border:1px dashed rgb(242 243 238/.13)}
.lgm-card{position:absolute;display:block;border-radius:1.6cqw;transform-origin:50% 100%;background-color:rgb(22 25 32/.97);background-size:100% 100%;background-repeat:no-repeat;box-shadow:inset 0 0 0 1px rgb(242 243 238/.14),inset 0 1px rgb(242 243 238/.18),0 1cqw 2.4cqw rgb(0 0 0/.45)}
.lgm-card::before{content:"";position:absolute;left:0;top:14%;bottom:14%;width:.5cqw;border-radius:0 .5cqw .5cqw 0;background:#c8f02e;box-shadow:0 0 1cqw #c8f02e}
.lgm-pct{position:absolute;font-family:${MONO};font-weight:700;font-size:${cq(7)};color:rgb(var(--lgm-cyan)/.62);white-space:nowrap}
.lgm-post{border-radius:.6cqw;background:linear-gradient(#f2f3ee,#c8f02e);box-shadow:0 0 1.6cqw rgb(var(--lgm-lime)/.7)}
.lgm-gate{position:absolute;height:${cq(9)};margin-top:${cq(-4.5)};transform-origin:0 50%;--lgm-c:var(--lgm-cyan);background:${BEAM_BG}}
.lgm-neck{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgb(var(--lgm-cyan)/.22),transparent)}
.lgm-vxr{position:absolute;left:${P(FX - 66)};top:${P(RIM_Y + 1 - 66)};width:${cq(132)};height:${cq(132)};transform:scaleY(${f(RIM_RY / RIM_RX, 3)})}
.lgm-vxr>i{position:absolute;inset:0;background:${VX_ART} 0 0/100% 100% no-repeat}
.lgm-fhot{opacity:0;background:${FHOT_ART} 0 0/100% 100% no-repeat}
.lgm-funnel{background:${FUNNEL_ART} 0 0/100% 100% no-repeat}
.lgm-mart{background:${MACHINE_ART} 0 0/100% 100% no-repeat}
.lgm-c-lime{--lgm-c:var(--lgm-lime)}.lgm-c-cyan{--lgm-c:var(--lgm-cyan)}.lgm-c-green{--lgm-c:var(--lgm-green)}.lgm-c-blue{--lgm-c:var(--lgm-blue)}
.lgm-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 40%,rgb(var(--lgm-hot)/.2),rgb(var(--lgm-lime)/.09) 45%,transparent 75%);opacity:0}
.lgm-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--lgm-c:var(--lgm-lime)}
.lgm-scanw{position:absolute;left:0;right:0;bottom:50%;height:9em;background:linear-gradient(to top,rgb(var(--lgm-lime)/.15),rgb(var(--lgm-lime)/.04) 45%,transparent),repeating-linear-gradient(to top,rgb(var(--lgm-lime)/.08) 0 1px,transparent 1px .9em)}
.lgm-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.lgm-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.lgm-hd{position:absolute;left:0;top:0;width:0;height:0}
.lgm-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.lgm-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--lgm-hot));box-shadow:0 0 0 .38cqw rgb(var(--lgm-c)/.95),0 0 1.8cqw .5cqw rgb(var(--lgm-c)/.55),0 0 5cqw rgb(var(--lgm-c)/.25);outline:.26cqw dashed rgb(var(--lgm-c)/.7);outline-offset:1.15cqw}
.lgm-pf{position:absolute;left:0;top:0;width:14cqw;height:14cqw;margin:-7cqw 0 0 -7cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.lgm-ps{position:absolute;left:0;top:0;width:30cqw;height:30cqw;margin:-15cqw 0 0 -15cqw;background:radial-gradient(closest-side,rgb(var(--lgm-hot)),rgb(var(--lgm-c)/.75) 7%,rgb(var(--lgm-c)/.12) 15%,transparent 22%);opacity:0;color:rgb(var(--lgm-c))}
.lgm-ps::after{content:"";position:absolute;inset:0;background:${SPARK_ART} 0 0/100% 100% no-repeat}
.lgm-pd{position:absolute;left:0;top:0;width:8cqw;height:3cqw;margin:-1.5cqw 0 0 -6.5cqw;transform-origin:81.25% 50%;opacity:0;background:radial-gradient(1.5cqw 1.5cqw at 81.25% 50%,#fff,#fff 20%,rgb(var(--lgm-c)/.9) 44%,rgb(var(--lgm-c)/.22) 74%,transparent),linear-gradient(90deg,transparent,rgb(var(--lgm-c)/.3) 45%,rgb(var(--lgm-c)/.75) 85%,#fff) 0 50%/81.25% .55cqw no-repeat}
.lgm-com{position:absolute;left:0;top:0;width:11cqw;height:3.2cqw;margin:-1.6cqw 0 0 -9.4cqw;transform-origin:85.45% 50%;opacity:0;background:radial-gradient(1.6cqw 1.6cqw at 85.45% 50%,#fff,#fff 22%,rgb(var(--lgm-lime)/.8) 46%,rgb(var(--lgm-lime)/.18) 72%,transparent),linear-gradient(90deg,transparent,rgb(var(--lgm-lime)/.35) 40%,rgb(var(--lgm-lime)/.85) 80%,#fff) 0 50%/85.45% 1cqw no-repeat}
.lgm-title{position:absolute;left:${cq(TITLE_X)};top:${cq(TITLE_Y)};width:${cq(TITLE_W)};font-family:${HEAD};font-weight:800;font-size:${cq(FS0)};line-height:${LINE};letter-spacing:${f(TLS, 3)}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap}
.lgm-ln{display:block;white-space:nowrap}
.lgm-w{position:relative;display:inline-block;white-space:nowrap}
.lgm-wL{color:#c8f02e}
.lgm-hg{position:absolute;left:0;top:0;opacity:0;white-space:nowrap;color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--lgm-lime)/.95),0 0 .45em rgb(var(--lgm-cyan)/.6)}
.lgm-gh{position:absolute;left:0;top:0;z-index:-1;opacity:0;white-space:nowrap;color:transparent;text-shadow:-.08em -.02em rgb(var(--lgm-cyan)/.95),.08em .02em rgb(var(--lgm-blue)/.9)}
.lgm-ul{position:absolute;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
.lgm-tag{position:absolute;left:${cq(TITLE_X)};width:${cq(TITLE_W)};font-size:${cq(TAG_FS0)};line-height:${TAG_LH};font-weight:500;color:rgb(242 243 238/.68);text-wrap:balance;transform-origin:0 100%}
.lgm-tagc{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}
.lgm-cta{position:absolute;box-sizing:border-box;display:flex;align-items:center;padding:0 ${cq(CTA_PR)} 0 ${cq(CTA_PL)};border-radius:5cqw;background:#c8f02e;color:#0a0a0b;font-weight:700;font-size:${cq(CTA_FS0)};letter-spacing:${f(CTA_LS, 3)}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap;box-shadow:0 0 3.5cqw rgb(200 240 46/.28)}
.lgm-ctal{display:block;overflow:hidden;overflow:clip;line-height:1.3}
.lgm-lbl{display:flex;align-items:center;gap:${cq(CTA_GAP)};transform-origin:0 50%}
.lgm-ctah{border-radius:5cqw;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgb(var(--lgm-lime)/.85)}
.lgm-ctaa{display:block;flex:none;width:${cq(CTA_ARROW)};height:${cq(CTA_ARROW)};background:${ARROW_ART} 0 0/100% 100% no-repeat}
.lgm-foc{opacity:0}
.lgm-fo{position:absolute;border:${cq(SW_C)} solid #c8f02e;border-right:0;box-shadow:0 0 1cqw rgb(var(--lgm-lime)/.6)}
.lgm-rip{position:absolute;left:0;top:0;width:8cqw;height:8cqw;margin:-4cqw 0 0 -4cqw;border-radius:50%;border:max(1px,.3cqw) solid rgb(var(--lgm-lime)/.9);opacity:0}
.lgm-rip::after{content:"";position:absolute;inset:24%;border-radius:50%;border:max(1px,.22cqw) solid rgb(var(--lgm-lime)/.6)}
.lgm-cur{position:absolute;left:0;top:0;width:4cqw;height:5.6cqw;margin:-.2cqw 0 0 -.2cqw;opacity:0;transform-origin:.2cqw .2cqw;background:${CURSOR_ART} 0 0/100% 100% no-repeat}
`;

/* ───────────────────────────── markup ────────────────────────────────────── */

type Built = ReturnType<typeof build> & { ns: string };
const CACHE = new Map<string, Built>();
const CACHE_MAX = 12;
function getBuild(title: string, tagline: string, cta: string): Built {
  const key = `${title}\u0001${tagline}\u0001${cta}`;
  let b = CACHE.get(key);
  if (b) CACHE.delete(key);
  else {
    const ns = `lgm-${hash(key)}-`;
    b = { ...build(title, tagline, cta, ns), ns };
    while (CACHE.size >= CACHE_MAX) CACHE.delete(CACHE.keys().next().value as string);
  }
  CACHE.set(key, b);
  return b;
}

/** absolutely positioned box, in viewBox units relative to the root */
const at = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: P(x), top: P(y), width: cq(w), height: cq(h) });
/** the same inside a smaller positioned box (cqw always refers to the root width) */
const atq = (x: number, y: number, w: number, h: number): CSSProperties => ({ left: cq(x), top: cq(y), width: cq(w), height: cq(h) });

export function LeadGenerationMotion({ className, title, tagline, cta }: ServiceMotionProps) {
  const b = getBuild(title, tagline, cta);
  const { fs, lines, groups, climax, tag, label, cfs, ctaW }: Layout = b.lay;
  const A = (n: string) => `lgm-a ${b.ns}${n}`;
  const origin = (g: Item) => `${f((g.ox / g.w) * 100, 2)}% ${f(OY * 100, 1)}%`;
  const CR = CTA_H / 2;
  const gi = (g: Item) => groups.indexOf(g);
  const tagStyle: CSSProperties = {
    top: cq(tag.y),
    maxHeight: `${f(tag.lines * TAG_LH, 2)}em`,
    ...(tag.fs !== TAG_FS0 ? { fontSize: cq(tag.fs) } : null),
    ...(tag.clamp ? { WebkitLineClamp: tag.lines } : null),
  };

  return (
    <div className={`illu-motion lgm-root${className ? ` ${className}` : ""}`} data-motion-root="" aria-hidden="true" data-nosnippet="">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      <ScrollPause />

      {/* off-screen, content-visibility skips the whole scene (no restyle at all);
          absolutely positioned, so its remembered size never feeds the layout */}
      <div className="lgm-cv">
        <div className={`lgm-L ${A("shake")}`}>
          {/* ── static back layer ── */}
          <i className="lgm-grid" />
          <i className="lgm-rail" />
          <i className="lgm-floor" />

          {/* ── the printed machine: exists only above the printhead ── */}
          <div className={`lgm-clip ${A("pwo")}`} style={at(PR.x, PR.y, PR.w, PR.h)}>
            <div className={`lgm-z ${A("pwi")}`}>
              <div className="lgm-o0" style={{ left: cq(-PR.x), top: cq(-PR.y) }}>
                {/* STATIC first: whatever paints after an animated layer and may
                    overlap it is composited too (more layers, more work per frame) */}
                {/* funnel interior: vortex glow, stage rings, conversion rates, gate posts */}
                <i className="lgm-vortex" />
                {RINGS.map(([y, pct]) => (
                  <span key={y} className="lgm-pct" style={{ left: P(FX + hwAt(y) + 7), top: P(y - 4.5) }}>
                    {pct}
                  </span>
                ))}
                <i className="lgm-neck" style={at(FX - 26, GATE_Y - 14, 52, 28)} />
                <i className="lgm-abs lgm-post" style={at(GATE_X0 - 5, GATE_Y - 5, 5, 10)} />
                <i className="lgm-abs lgm-post" style={at(GATE_X1, GATE_Y - 5, 5, 10)} />

                {/* form: glass, step markers, lock, fields, progress track */}
                <i className="lgm-abs lgm-panel" style={at(FORM.x, FORM.y, FORM.w, FORM.h)} />
                <i className="lgm-abs lgm-stl" style={at(STEP_X[0] + 6, STEP_Y - 0.5, STEP_X[2] - STEP_X[0] - 12, 1)} />
                {STEP_X.map((x, i) => (
                  <span key={x} className="lgm-abs lgm-st" style={at(x - 6, STEP_Y - 6, 12, 12)}>
                    {i + 1}
                  </span>
                ))}
                {FIELD_Y.map((y) => (
                  <Fragment key={y}>
                    <i className="lgm-abs lgm-ico" style={at(ICON_X, y, 20, FIELD_H)} />
                    <i className="lgm-abs lgm-in" style={at(IN_X, y, IN_W, FIELD_H)} />
                  </Fragment>
                ))}
                <i className="lgm-abs lgm-pt" style={at(PROG.x, PROG.y, PROG.w, PROG.h)} />

                {/* CRM board: glass, label, week, chart baseline, divider, empty slots */}
                <i className="lgm-abs lgm-panel lgm-crmp" style={at(CRM.x, CRM.y, CRM.w, CRM.h)} />
                <span className="lgm-crm" style={{ left: P(REEL_X), top: P(CRM.y + 7), height: cq(8) }}>
                  <i />
                  CRM
                </span>
                <span className="lgm-cal" style={{ left: P(REEL_X + 9.4), top: P(REEL_Y + 29), height: cq(8) }}>
                  7/7
                </span>
                <i className="lgm-abs lgm-sbl" style={at(SPK.x - 2, SPK.base, 78, 0.9)} />
                <i className="lgm-abs lgm-div" style={at(SLOT_X0 - 7, CRM.y + 10, 1, CRM.h - 20)} />
                {[0, 1, 2, 3].map((s) => (
                  <i key={s} className="lgm-abs lgm-slot" style={at(SLOT_X0 + s * PITCH, CARD_Y, CARD_W, CARD_H)} />
                ))}
                <i className="lgm-abs lgm-mart" style={at(MA.x, MA.y, MA.w, MA.h)} />

                {/* ANIMATED: vortex ring, gate beam, form fill, CTA, counter, chart, pipeline, sheen */}
                <div className="lgm-vxr">
                  <i className={A("vx")} />
                </div>
                <i className={`lgm-gate ${A("gate")}`} style={{ left: P(GATE_X0), top: P(GATE_Y), width: cq(GATE_X1 - GATE_X0) }} />

                <i className={`lgm-abs lgm-sti ${A("stp")}`} style={at(STEP_X[2] - 7.5, STEP_Y - 7.5, 15, 15)} />
                {FIELD_Y.map((y, i) => (
                  <i key={y} className={`lgm-abs lgm-fb ${A(`fb${i}`)}`} style={at(BAR_X, y + 7.5, BAR_W[i], 5)}>
                    <i className="lgm-fbc" />
                  </i>
                ))}
                <i className={`lgm-abs lgm-pg ${A("prg")}`} style={at(PROG.x, PROG.y, PROG.w, PROG.h)} />

                {/* CTA = the form's submit: forged outline, white-hot pill, rising label */}
                <div className={`lgm-clip lgm-foc ${A("foo")}`} style={at(b.fo.x, b.fo.y, b.fo.w, b.fo.h)}>
                  <div className={`lgm-z ${A("foi")}`}>
                    <i className="lgm-fo" style={{ ...atq(FO_M, FO_M, b.fo.ow, CTA_H + SW_C), borderRadius: `${cq(CR + SW_C / 2)} 0 0 ${cq(CR + SW_C / 2)}` }} />
                  </div>
                </div>
                <div className={`lgm-cta ${A("cta")}`} style={{ ...at(CTA_X, CTA_Y, ctaW, CTA_H), ...(cfs < CTA_FS0 ? { fontSize: cq(cfs) } : null) }}>
                  <span className="lgm-ctal">
                    <span className={`lgm-lbl ${A("lbl")}`}>
                      {label}
                      <i className="lgm-ctaa" />
                    </span>
                  </span>
                </div>
                <i className={`lgm-abs lgm-ctah ${A("ctaH")}`} style={at(CTA_X, CTA_Y, ctaW, CTA_H)} />

                <div className="lgm-k" style={{ left: P(REEL_X), top: P(REEL_Y) }}>
                  <span className={`lgm-reel ${A("reel")}`}>{REEL.join("\n")}</span>
                </div>
                <div className="lgm-abs" style={at(SPK.x, SPK.base - 23, 74, 23)}>
                  {SPK.h.map((h, i) => (
                    <i key={i} className="lgm-abs lgm-sb" style={{ ...atq(i * (SPK.w + SPK.gap), 23 - h, SPK.w, h), background: `linear-gradient(rgb(200 240 46/${f(0.55 + (0.45 * i) / 6)}),rgb(20 224 200/.3))` }} />
                  ))}
                </div>
                <div className="lgm-clip" style={at(PIPE.x, PIPE.y, PIPE.w, PIPE.h)}>
                  {Array.from({ length: N_CARDS }, (_, k) => (
                    <i key={k} className={`lgm-card ${A(`cd${k}`)}`} style={{ ...atq(cardX(k) - PIPE.x, CARD_Y - PIPE.y, CARD_W, CARD_H), backgroundImage: CARD_ART[k] }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── the funnel: welded by the tips (one static drawing behind a clip window) ── */}
          <div className={`lgm-clip ${A("fwo")}`} style={at(FW.x, FW.y, FW.w, FW.h)}>
            <div className={`lgm-z ${A("fwi")}`}>
              <div className="lgm-o0" style={{ left: cq(-FW.x), top: cq(-FW.y) }}>
                <i className="lgm-abs lgm-funnel" style={at(FW.x, FW.y, FW.w, FW.h)} />
                <i className={`lgm-abs lgm-fhot ${A("fhot")}`} style={at(FW.x, FW.y, FW.w, FW.h)} />
              </div>
            </div>
          </div>

          {/* ── kinetic headline + tagline ── */}
          <div className="lgm-title" style={fs < FS0 ? { fontSize: cq(fs) } : undefined}>
            {lines.map((row, l) => (
              <span key={l} className="lgm-ln">
                {row.map((g, j) => {
                  const style: CSSProperties = { transformOrigin: origin(g), ...(j ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null) };
                  return g.climax ? (
                    <span key={j} className={`lgm-w lgm-wL ${A("wL")}`} style={style}>
                      <span className={`lgm-gh ${A("gh")}`}>{g.text}</span>
                      {g.text}
                      <span className={`lgm-hg ${A("hg")}`}>{g.text}</span>
                    </span>
                  ) : (
                    <span key={j} className={`lgm-w ${A(`w${gi(g)}`)}`} style={style}>
                      {g.text}
                    </span>
                  );
                })}
              </span>
            ))}
            <i
              className={`lgm-ul ${A("ul")}`}
              style={{ left: cq(climax.x - TITLE_X), top: cq(climax.y - TITLE_Y + UL_Y * fs), width: cq(climax.w), height: cq(UL_H * fs) }}
            />
          </div>
          <div className={`lgm-tag${tag.clamp ? " lgm-tagc" : ""} ${A("tag")}`} style={tagStyle}>
            {tagline}
          </div>

          {/* ── front FX: printhead, visitors, comets, rail heads, pools, cursor ── */}
          <div className="lgm-L">
            <div className={`lgm-scan ${A("scan")}`}>
              <i className="lgm-scanw" />
              <i className="lgm-scanl" />
              <i className="lgm-scanf" style={{ left: "8em" }} />
              <i className="lgm-scanf" style={{ left: "108em" }} />
            </div>
            {b.pd.map((c, i) => (
              <i key={i} className={`lgm-pd lgm-c-${c || "cyan"} ${A(`pd${i}`)}`} />
            ))}
            {Array.from({ length: b.nCm }, (_, i) => (
              <i key={i} className={`lgm-com ${A(`pc${i}`)}`} />
            ))}
            {HEADS.map((h) => (
              <Fragment key={h.id}>
                <i className={`lgm-hb lgm-c-${h.c} ${A(`${h.id}b`)}`} />
                <div className={`lgm-hd lgm-c-${h.c} ${A(`${h.id}p`)}`} style={{ transform: `translate(${cq(h.home[0])},${cq(h.home[1])})` }}>
                  <i className="lgm-hc" />
                </div>
              </Fragment>
            ))}
            {b.pf.map((c, i) => (
              <i key={i} className={`lgm-pf lgm-c-${c || "lime"} ${A(`pf${i}`)}`} />
            ))}
            {b.ps.map((c, i) => (
              <i key={i} className={`lgm-ps lgm-c-${c || "lime"} ${A(`ps${i}`)}`} />
            ))}
            <i className={`lgm-rip ${A("rip")}`} />
            <i className={`lgm-cur ${A("cur")}`} />
          </div>

          <i className={`lgm-flash ${A("flash")}`} />
        </div>
      </div>
    </div>
  );
}
