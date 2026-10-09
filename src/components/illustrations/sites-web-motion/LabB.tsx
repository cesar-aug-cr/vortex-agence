import { Fragment, type CSSProperties } from "react";
import { LOGO_GEOMETRY } from "@/components/brand/LogoMark";
import { INTER_700, JAKARTA_800, textWidth } from "./LabB.metrics";
import type { SitesWebMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  VARIANT B · "LASER LIGHT SHOW" — hero motion graphic of /services/sites-web
 * ─────────────────────────────────────────────────────────────────────────────
 *  One master loop, T = 14 s. Every beat is a keyframe percentage of T: no
 *  animation-delay, no fill-mode, no secondary loop (the LIVE ring and the
 *  chart halo pulses are unrolled onto T).
 *
 *  Cast: two corner TRACERS (lime bottom-left, cyan bottom-right) that also
 *  power the two concert FANS; two top-corner tracers (nav); a wall-to-wall
 *  PRINTHEAD; four RAIL HEADS (lime left, cyan + green top, blue right) that
 *  glide on a dashed rail round the panel, charge up (flare) and fire every
 *  hit beam — each beam is a child of its head (rotate + scaleX, then fades).
 *
 *  0.00–0.45  IGNITION. The fans start on the exact lines the tracers ended on
 *             (seamless loop), burst open, flick across the panel and snap shut
 *             onto the window's top-left corner: they collapse INTO the tracers.
 *  0.45–1.30  FRAME TRACE. The tracers race round the outline in opposite
 *             directions and collide bottom-right: sparks, flash, micro-shake.
 *  1.30–2.30  WELD. The rim glows white-hot, cools through lime to its cyan →
 *             blue gradient; a glint crosses the glass (1.54–2.30). Chrome
 *             (1.40–1.63): dots popped by the lime tip, URL extruded by the cyan.
 *  1.61–2.47  PRINTHEAD prints nav (logo slammed by the top-left beam, menu
 *             swept, nav CTA), "</> Next.js", headline guides — then parks.
 *  2.26–3.93  KINETIC HEADLINE. Each word is shot by a rail head from another
 *             edge (charge, beam, flare); it materialises big — scale and
 *             origin fitted so it never leaves the panel — slams down while its
 *             tracking collapses, lands WHITE-HOT and cools (gravity sparks).
 *             The last word (3.47) takes all four heads at once: white flash,
 *             lime/cyan chromatic jitter, camera shake, laser underline.
 *  3.77–4.09  Tagline prints.
 *  3.92–5.80  CTA FORGE (2nd climax). The four heads charge and converge on
 *             the pill's left end (4.25); two weld tips trace its outline in
 *             opposite directions (two beams each) and collide on the right
 *             (4.80): white-hot flash, it cools to lime, the label rises letter
 *             by letter (24 ms stagger), the arrow slides in.
 *  5.30–5.95  Printhead extrudes the three cards + footer, exits.
 *  5.90–6.93  TRICK SHOTS. Three heads fire bolts that ricochet off the rail
 *             into the cards: score ring "100", SEO bars, and the conversion
 *             card — which only boots into an EMPTY, flat chart.
 *  6.88–7.50  The cursor glides in (fans glow faintly behind the glass) and
 *             clicks the CTA (7.50: ripples, sparks).
 *  7.56–8.90  PAYOFF. Three conversion comets arc from the CTA into the chart
 *             card; each landing kicks the bars and draws the line one step;
 *             "+38 %" rolls in on odometer reels. 8.96 "200 OK", 9.04 LIVE:
 *             the tracers run a victory lap round the window, fans burst.
 *  10.1–12.6  HOLD. Headline wave + chromatic echo (10.15), vertical QA scan
 *             (10.65–11.40), then a premium 3D tilt of the live window
 *             (11.45–12.55: lime rim glow, glass sheen) while the fans sweep
 *             behind the glass; heads drift on the rail.
 *  12.8–14.0  ERASE. The printhead sweeps back up, zapping row by row; the
 *             tracers eat the outline back into its corner, heads glide home,
 *             and the fans take over (seam).
 *
 *  Performance: everything that moves is an HTML box animated with transform /
 *  opacity only (composited); SVG only as static artwork inside those boxes.
 *  Keyframes use cqw / % (no font-relative units). Keyframes are built once
 *  per localized strings (the heads aim at TypeScript-laid-out words and trace
 *  the real CTA width) and cached.
 *
 *  Reduced motion: the global rule collapses every animation, so the
 *  un-animated base styles ARE the poster: the finished, live website. Beams,
 *  sparks, ghosts, guides, comets and the cursor are hidden in their base
 *  styles.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── timeline toolkit ───────────────────────────── */

const T = 14000;
/** compact CSS number (no leading zero, no "-0") */
const f = (v: number, d = 2): string => {
  const k = 10 ** d;
  const r = Math.round(v * k) / k;
  return String(r === 0 ? 0 : r).replace(/^(-?)0\./, "$1.");
};
const pc = (t: number) => `${f((Math.min(T, Math.max(0, t)) / T) * 100, 2)}%`;
const OUT = "cubic-bezier(.16,1,.3,1)";
const IN = "cubic-bezier(.6,0,.9,.45)";
const IO = "cubic-bezier(.65,0,.35,1)";
const IOS = "cubic-bezier(.45,0,.55,1)";
const EO = "cubic-bezier(.2,.85,.3,1)";
const BACK = "cubic-bezier(.3,1.65,.55,1)";
const BACK2 = "cubic-bezier(.34,1.35,.64,1)";
const STEP = "steps(1,end)";
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

type Stop = [t: number, decl: string, ease?: string];
type Pt = [number, number];

// keyframes are written into the sheet being built (see build(), cached per strings)
let RULES: string[] = [];
let TAKEN = new Set<string>();
/**
 * One @keyframes + its class (`.swb-name` sets the animation-name). 0 % / 100 %
 * are filled from the first / last stop, equal offsets are merged and stops
 * sharing the same declarations are written once as a selector list.
 */
function kf(name: string, stops: Stop[]): void {
  if (TAKEN.has(name)) throw new Error(`swb keyframes "${name}" defined twice`);
  TAKEN.add(name);
  const s = [...stops].sort((a, b) => a[0] - b[0]);
  if (s[0][0] > 0) s.unshift([0, s[0][1]]);
  if (s[s.length - 1][0] < T) s.push([T, s[s.length - 1][1]]);
  const at = new Map<string, Stop>();
  for (const x of s) {
    const p = at.get(pc(x[0]));
    at.set(pc(x[0]), p ? [x[0], x[1], x[2] ?? p[2]] : x);
  }
  // if every segment that actually moves uses the same easing, set it once on
  // the class (segments between equal values are unaffected by easing)
  const list = [...at.values()];
  const eases = new Set<string>();
  for (let i = 0; i < list.length - 1; i++) if (list[i][1] !== list[i + 1][1]) eases.add(list[i][2] ?? "linear");
  const uniform = eases.size === 1 ? [...eases][0] : null;
  const groups = new Map<string, string[]>();
  for (const [k, [, d, e]] of at) {
    const key = e && !uniform ? `${d};animation-timing-function:${e}` : d;
    const g = groups.get(key);
    if (g) g.push(k);
    else groups.set(key, [k]);
  }
  let body = "";
  for (const [d, ks] of groups) body += `${ks.join(",")}{${d}}`;
  const tf = uniform && uniform !== "linear" ? `;animation-timing-function:${uniform}` : "";
  RULES.push(`@keyframes swb-${name}{${body}}.swb-${name}{animation-name:swb-${name}${tf}}`);
}

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

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
/** viewBox units → % of the (square) root */
const P = (u: number) => `${f(u / 4, 3)}%`;
/** viewBox units → cqw (sizes) */
const cq = (u: number) => `${f(u / 4, 3)}cqw`;
const angle = (a: Pt, b: Pt) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
/** translate() of a point, in cqw */
const tl = (p: Pt, d = 2) => `translate(${f(p[0] / 4, d)}cqw,${f(p[1] / 4, d)}cqw)`;

// browser window
const WX = 26;
const WY = 30;
const WR = 374;
const WB = 366;
const RR = 12;
const CH = 54; // bottom of the chrome bar
const P0: Pt = [WX, WY + RR];
const FA: Pt[] = [
  P0,
  ...arc(WX + RR, WY + RR, RR, 180, 270),
  [WR - RR, WY],
  ...arc(WR - RR, WY + RR, RR, 270, 360),
  [WR, WB - RR],
  ...arc(WR - RR, WB - RR, RR, 0, 90),
];
const FB: Pt[] = [P0, [WX, WB - RR], ...arc(WX + RR, WB - RR, RR, 180, 90), [WR - RR, WB]];
const LA = plen(FA);
const LB = plen(FB);
const F_END = FA[FA.length - 1];
// victory laps: one full loop each, from the bottom-right weld, opposite ways
const LAP_L: Pt[] = [...[...FA].reverse(), ...FB.slice(1)];
const LAP_R: Pt[] = [...[...FB].reverse(), ...FA.slice(1)];

// chrome / nav anchors
const DOTS: Pt[] = [
  [42, 42],
  [54, 42],
  [66, 42],
];
const LOGO_C: Pt = [67, 72];
const NAVCTA_C: Pt = [331, 72];
const EYE_C: Pt = [70, 99];
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
/** chart leg colours sampled from the blue → cyan → lime chart gradient */
const chartColor = (x: number) => {
  const t = Math.max(0, Math.min(1, (x - CHART[0][0]) / (CHART[CHART.length - 1][0] - CHART[0][0])));
  const lo = t < 0.55;
  const a = lo ? [46, 102, 255] : [20, 224, 200];
  const b = lo ? [20, 224, 200] : [200, 240, 46];
  const u = lo ? t / 0.55 : (t - 0.55) / 0.45;
  return `rgb(${a.map((c, i) => Math.round(c + (b[i] - c) * u)).join(" ")})`;
};
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

// corner emitters (just outside the root, inside the stage padding)
const EBL: Pt = [-6, 406];
const EBR: Pt = [406, 406];
const ETL: Pt = [-6, -6];
const ETR: Pt = [406, -6];
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
const SLOT = [2490, 2710, 2930, 3150]; // line-1 words, right-aligned onto the last slots
const LAST = 3470; // last word impact
const PRE = 110; // beam lands → word slams down for PRE ms
const PRE_L = 150;
const FG_A = 4250; // CTA forge: weld tips trace the pill
const FG_Z = 4800;
const SHOT_FIRE = [5900, 6150, 6400];
const TRAVEL = 240;
const CLICK = 7500;
const COMET_A = [0, 1, 2].map((i) => CLICK + 60 + i * 130);
const COMET_FLY = 420;
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
const tGuide = scanAt(137);
const tTag = scanAt(197);
const tFoot = scanAt(344);
// erase pass (upwards): a row vanishes as soon as the line reaches its bottom edge
const oFoot = scanAt(352, true);
const oCards = scanAt(318, true);
const oCta = scanAt(242, true);
const oTag = scanAt(211, true);
const oL2 = scanAt(176, true);
const oL1 = scanAt(143, true);
const oEye = scanAt(106, true);
const oNav = scanAt(84, true);
const oChrome = scanAt(54, true);

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
    const s1 = fire + (TRAVEL * acc) / L;
    return { from: pts[i], to: pts[i + 1], len: l, ang: angle(pts[i], pts[i + 1]), s0, s1, r0: s0 + TRAVEL + 50, r1: s1 + TRAVEL + 50 };
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
  [1500, 2200, [100, RI]],
  [5000, 5600, [190, RI]],
  [7000, 8500, [150, RI], IOS],
  [9400, 11200, [110, RI], IOS],
  [11300, 12600, [160, RI], IOS],
  [12700, 13600, HEADS[HT].home],
];
PLAN[HU] = [
  [1500, 2200, [300, RI]],
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
/** where head k is at time t (heads are parked whenever they fire) */
function headAt(k: number, t: number): Pt {
  let p = HEADS[k].home;
  for (const [t0, t1, to] of PLAN[k]) {
    if (t >= t1) p = to;
    else if (t > t0) {
      const u = eIO((t - t0) / (t1 - t0));
      return [p[0] + (to[0] - p[0]) * u, p[1] + (to[1] - p[1]) * u];
    } else break;
  }
  return p;
}
// which head shoots which title slot (slot 0 only exists for 4+ words on line 1)
const SLOT_HEAD = [HT, HL, HT, HU];

/* ───────────────────────────── generic animation shapes ──────────────────── */

const Z0 = "opacity:0";
/** a whole row zaps out (flicker) when the erase pass crosses it; it comes
 *  back at 100 % → 0 %, where all of its children are hidden anyway */
function zap(name: string, z: number) {
  kf(name, [[0, "opacity:1"], [z, "opacity:1"], [z + 50, "opacity:.25"], [z + 90, "opacity:.8"], [z + 190, Z0]]);
}
/** fade + lift in at a (ends visible: the parent row zaps it out) */
function riseIn(name: string, a: number, dy: string, dur = 260) {
  kf(name, [
    [0, `opacity:0;transform:translateY(${dy})`],
    [a - 2, `opacity:0;transform:translateY(${dy})`, OUT],
    [a + dur, "opacity:1;transform:translateY(0)"],
  ]);
}
/** elastic scale pop in at a (ends visible) */
function popIn(name: string, a: number, from = 0.3, over = 1.18, dur = 330) {
  kf(name, [
    [0, `opacity:0;transform:scale(${f(from)})`],
    [a - 2, `opacity:0;transform:scale(${f(from)})`, OUT],
    [a + dur * 0.42, `opacity:1;transform:scale(${f(over)})`, OUT],
    [a + dur, "opacity:1;transform:scale(1)"],
  ]);
}
/** radial flare pulses */
function flare(name: string, hits: number[], peak = 1.25, life = 300) {
  const z = "opacity:0;transform:scale(.3)";
  const st: Stop[] = [[0, z]];
  for (const h of hits)
    st.push([h - 22, z, OUT], [h, `opacity:1;transform:scale(${f(peak)})`, OUT], [h + life, "opacity:0;transform:scale(.55)"]);
  kf(name, st);
}
/** spark streak bursts along a moving tip (direction = the element's static `rotate`) */
function sparks(name: string, hits: number[], life = 300) {
  const z = "opacity:0;transform:translateX(0) scaleX(.3)";
  const st: Stop[] = [[0, z]];
  for (const h of hits)
    st.push([h - 2, z, OUT], [h + 18, "opacity:1;transform:translateX(70%) scaleX(1)", OUT], [h + life, "opacity:0;transform:translateX(430%) scaleX(.25)"]);
  kf(name, st);
}
/**
 * One gravity spark (A's model): flies out at `deg` with drag, falls with
 * gravity, cools (shrinks + fades); re-fired at every hit. The element's head
 * is its anchor, it rotates along its velocity.
 */
function gspark(name: string, hits: number[], deg: number, reach: number, life = 440, G = 30) {
  const a = (deg * Math.PI) / 180;
  const z = (r: number) => `opacity:0;transform:translate(0cqw,0cqw) rotate(${Math.round(r)}deg) scale(1)`;
  const st: Stop[] = [[0, z(deg)]];
  for (const h of hits) {
    let prev = deg;
    st.push([h - 2, z(deg)]);
    for (const u of [0, 0.2, 0.5, 1]) {
      const d = 1 - (1 - u) * (1 - u);
      const x = Math.cos(a) * reach * d;
      const y = Math.sin(a) * reach * d + G * u * u;
      let dir = (Math.atan2(Math.sin(a) * reach * 2 * (1 - u) + 2 * G * u, Math.cos(a) * reach * 2 * (1 - u)) * 180) / Math.PI;
      while (dir - prev > 180) dir -= 360;
      while (dir - prev < -180) dir += 360;
      prev = dir;
      const o = u < 0.25 ? 1 : 1 - ((u - 0.2) / 0.8) ** 1.4;
      st.push([h + u * life, `opacity:${f(o, 1)};transform:translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw) rotate(${Math.round(dir)}deg) scale(${f(1 - 0.6 * u, 1)})`]);
    }
    st.push([h + life + 2, z(deg)]);
  }
  kf(name, st);
}
/** laser wrapper on/off with an ignition flicker */
function onoff(name: string, on: [number, number][], fo = 140) {
  const st: Stop[] = [[0, Z0]];
  for (const [a, b] of on)
    st.push([a - 50, Z0], [a - 32, "opacity:1"], [a - 18, "opacity:.3"], [a, "opacity:1"], [b, "opacity:1"], [b + fo, Z0]);
  kf(name, st);
}
/** tip glow swell on each hit */
function tipPulse(name: string, hits: number[]) {
  const b = "transform:scale(.72)";
  const st: Stop[] = [[0, b]];
  for (const h of hits) st.push([h - 40, b, OUT], [h, "transform:scale(1.75)", OUT], [h + 260, b]);
  kf(name, st);
}

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
 * Emitter-anchored tracer: one element whose right end is the hot tip,
 * `transform: rotate(θ) translateX(r)` around the laser head. The tip path
 * (polylines with easing) is sampled densely, converted to polar coordinates
 * and simplified so that linear interpolation of θ / r stays within `tol`
 * viewBox units of the true path.
 */
function laser(id: string, o: Pt, moves: Mv[]) {
  const out: PS[] = [];
  let prev = Number.NaN;
  const polar = (t: number, p: Pt): PS => {
    let g = angle(o, p);
    if (!Number.isNaN(prev)) {
      while (g - prev > 180) g -= 360;
      while (g - prev < -180) g += 360;
    }
    prev = g;
    return { t, g, r: dist(o, p), p };
  };
  for (const mv of moves) {
    const L = plen(mv.p);
    const n = Math.max(2, Math.ceil((mv.b - mv.a) / 8));
    const ss: PS[] = [];
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      ss.push(polar(mv.a + (mv.b - mv.a) * u, pat(mv.p, (mv.e ?? eLin)(u) * L)));
    }
    for (const s of rdpPolar(o, ss, mv.tol ?? 0.8)) {
      if (out.length && Math.abs(out[out.length - 1].t - s.t) < 1) out.pop();
      out.push(s);
    }
  }
  kf(
    `${id}m`,
    out.map((s): Stop => [s.t, `transform:rotate(${f(s.g, 1)}deg) translateX(${f((s.r / BEAM_U) * 100)}%)`]),
  );
}

/* ───────────────────────────── rail heads: beams + charge flares ─────────── */

type Shot =
  | { k: "hit"; land: number; to: Pt; travel: number }
  | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number }
  | { k: "bolt"; s0: number; s1: number; r0: number; r1: number; to: Pt };
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.k === "track" ? s.a - s.travel : s.s0);

/** one head: its beam (rotate · scaleX around the head, 100cqw long; it fades out
 *  at full length once its energy is delivered) + charge flare */
function headKF(k: number, list: Shot[]) {
  const id = HEADS[k].id;
  const B = (g: number, sx: number, o = 1) => `opacity:${o};transform:rotate(${f(g)}deg) scaleX(${f(sx, 4)})`;
  const beam: Stop[] = [];
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
  for (const s of [...list].sort((p, q) => shotStart(p) - shotStart(q))) {
    if (s.k === "hit") {
      // charge → the beam shoots out of the head, lands, burns, fades
      const t0 = s.land - s.travel;
      const o = headAt(k, t0);
      const g = un(angle(o, s.to));
      const len = dist(o, s.to);
      beam.push(
        [t0 - 2, B(g, 0)],
        [t0, B(g, 0), GROW],
        [s.land, B(g, len / 400)],
        [s.land + 45, B(g, len / 400), TAIL],
        [s.land + 165, B(g, len / 400, 0)],
        [s.land + 167, B(g, 0)],
      );
      fires.push([t0, t0]);
    } else if (s.k === "track") {
      // the beam locks onto a moving weld tip and follows it
      const t0 = s.a - s.travel;
      const o = headAt(k, t0);
      const ss: PS[] = [];
      for (let i = 0, n = Math.ceil((s.b - s.a) / 8); i <= n; i++) {
        const t = s.a + ((s.b - s.a) * i) / n;
        const p = s.at(t);
        ss.push({ t, g: un(angle(o, p)), r: dist(o, p), p });
      }
      beam.push([t0 - 2, B(ss[0].g, 0)], [t0, B(ss[0].g, 0), GROW]);
      for (const q of rdpPolar(o, ss, 0.9)) beam.push([q.t, B(q.g, q.r / 400)]);
      const z = ss[ss.length - 1];
      beam.push([s.b + 20, B(z.g, z.r / 400), TAIL], [s.b + 150, B(z.g, z.r / 400, 0)], [s.b + 152, B(z.g, 0)]);
      fires.push([t0, s.b]);
    } else {
      // bolt: first leg of a ricochet (grows to the first bounce, the packet ricochets on)
      const o = headAt(k, s.s0);
      const g = un(angle(o, s.to));
      const len = dist(o, s.to);
      beam.push(
        [s.s0 - 2, B(g, 0)],
        [s.s0, B(g, 0)],
        [s.s1, B(g, len / 400)],
        [s.r0, B(g, len / 400), TAIL],
        [s.r1, B(g, len / 400, 0)],
        [s.r1 + 2, B(g, 0)],
      );
      fires.push([s.s0, s.s0]);
    }
  }
  kf(`${id}b`, beam);
  // charge-up flare: the head glows up before each shot and flashes as the beam leaves
  const Z = "opacity:0;transform:scale(.35)";
  const fl: Stop[] = [[0, Z]];
  for (const [a, b] of fires) {
    while (fl.length > 1 && fl[fl.length - 1][0] > a - 70) fl.pop();
    if (a - 250 > fl[fl.length - 1][0] + 10) fl.push([a - 250, Z, "cubic-bezier(.55,0,1,.6)"]);
    else fl.push([a - 60, Z, "cubic-bezier(.55,0,1,.6)"]);
    fl.push([a - 8, "opacity:.9;transform:scale(1)"], [a + 24, "opacity:1;transform:scale(1.5)", OUT]);
    if (b > a) fl.push([a + 170, "opacity:.55;transform:scale(1.05)"], [b, "opacity:.55;transform:scale(1.05)", OUT], [b + 300, "opacity:0;transform:scale(.7)"]);
    else fl.push([a + 300, "opacity:0;transform:scale(.7)"]);
  }
  kf(`${id}f`, fl);
}

/* ───────────────────────────── layout from the localized strings ─────────── */

const TITLE_X = 42;
const TITLE_Y = 110;
const TITLE_W = 316;
const FS0 = 34; // 8.5cqw
const TLS = -0.025; // title letter-spacing (em)
const LINE = 0.98; // title line-height
const CTA_X = 42;
const CTA_Y = 220;
const CTA_H = 22.4;
const CR = CTA_H / 2;
const CTA_FS0 = 10.8; // 2.7cqw
const CTA_LS = -0.01;
const CTA_PAD = 34; // padding 2.8 + 2.2, gap 1.1, arrow 2.4 (cqw) in units
const SW_C = 1.4; // forge outline width (units)

type Word = { text: string; i: number; slot: number; first: boolean; x: number; w: number; cx: number; cy: number; s0: number; ox: number; sp: number };

/**
 * Pre-slam fit: the word starts big (scale s0, letters spread by sp em per
 * letter step, skewed) and must stay inside the panel even for one frame. The
 * spread is capped (long words), s0 is the largest scale whose extent fits in
 * the panel and the transform origin `ox` (units from the word's left edge) is
 * moved so the scaled word stays between the walls.
 */
function slamFit(x0: number, w: number, n: number, fs: number, sMax: number, spMax: number, skew: number) {
  const M = 5;
  const dmax = (n - 1) / 2;
  const sp = dmax > 0 ? Math.min(spMax, 0.75 / dmax) : 0;
  const spread = sp * dmax * fs;
  const tk = Math.tan((Math.abs(skew) * Math.PI) / 180);
  const eL = spread + tk * 0.2 * LINE * fs;
  const eR = spread + tk * 0.8 * LINE * fs;
  const fit = (400 - 2 * M) / (w + eL + eR);
  const s0 = Math.max(1.06, Math.min(sMax, fit * 0.97));
  const hi = (x0 - M - s0 * eL) / (s0 - 1);
  const lo = (x0 + s0 * (w + eR) - 400 + M) / (s0 - 1);
  const ox = Math.min(Math.max(w / 2, lo), Math.max(lo, hi));
  return { s0, ox, sp };
}

function layout(title: string, cta: string) {
  const all = title.trim().split(/\s+/).filter(Boolean);
  const lastText = all.pop() ?? "";
  const sp1 = (JAKARTA_800.get(" ") ?? 0.18) + TLS;
  const w1 = all.map((w) => textWidth(w, JAKARTA_800, TLS));
  const lineW = w1.reduce((a, b) => a + b, 0) + sp1 * Math.max(0, all.length - 1);
  const lastWem = textWidth(lastText, JAKARTA_800, TLS);
  const fs = Math.min(FS0, (TITLE_W - 2) / Math.max(lineW, lastWem, 0.1));
  const lh = LINE * fs;
  let x = TITLE_X;
  const words: Word[] = all.map((text, i) => {
    const w = w1[i] * fs;
    const n = Array.from(text).length;
    const fit = slamFit(x, w, n, fs, 2.15, 0.3, 14);
    const slot = Math.max(0, SLOT.length - all.length + i);
    const o: Word = { text, i, slot, first: i === 0 || slot > 0, x, w, cx: x + w / 2, cy: TITLE_Y + lh / 2, ...fit };
    x += w + sp1 * fs;
    return o;
  });
  const lw = lastWem * fs;
  const ln = Array.from(lastText).length;
  const last: Word = {
    text: lastText,
    i: all.length,
    slot: -1,
    first: true,
    x: TITLE_X,
    w: lw,
    cx: TITLE_X + lw / 2,
    cy: TITLE_Y + lh * (all.length ? 1.5 : 0.5),
    ...slamFit(TITLE_X, lw, ln, fs, 2.35, 0.32, 18),
  };
  // CTA pill: its width is set from the label so the forge traces the real outline
  const label = cta.trim() || "OK";
  const lem = textWidth(label, INTER_700, CTA_LS);
  const cfs = Math.min(CTA_FS0, (250 - CTA_PAD) / Math.max(lem, 0.1));
  const ctaW = CTA_PAD + lem * cfs;
  // index of each label glyph (spaces stay plain text)
  let n = 0;
  const glyphs = Array.from(label).map((ch) => (ch === " " ? -1 : n++));
  return { fs, words, last, label, glyphs, cfs, ctaW };
}
type Layout = ReturnType<typeof layout>;

/* ───────────────────────────── build all keyframes ───────────────────────── */

function build(title: string, cta: string) {
  RULES = [];
  TAKEN = new Set(["a", "L", "abs", "x", "fill"]);
  const lay = layout(title, cta);
  const { fs, words, last, ctaW } = lay;
  const shots: Shot[][] = HEADS.map(() => []);

  // rows that zap out when the erase pass crosses them
  zap("zChr", oChrome);
  zap("zNav", oNav);
  zap("zCta", oCta);
  zap("zCards", oCards);
  zap("zFoot", oFoot);

  // stage floor glow, frame, glass, chrome
  kf("floor", [[0, Z0], [TR_Z - 2, Z0], [TR_Z + 400, "opacity:1"], [ER_Z, "opacity:1"], [ER_Z + 300, Z0]]);
  // The outline is 4 edges + 4 corner arcs (composited HTML, no SVG animation):
  // each edge grows exactly while its tracer tip runs along it and shrinks back
  // while the tip eats it at the end of the loop.
  {
    const tD = (d: number, L: number) => TR_A + (d / L) * (TR_Z - TR_A);
    const tE = (d: number, L: number) => EAT_A + ((L - d) / L) * (EAT_Z - EAT_A);
    const edge = (name: string, axis: string, d0: number, d1: number, L: number) => {
      const S = (s: number) => `transform:scale${axis}(${s})`;
      kf(name, [[0, S(0)], [tD(d0, L), S(0)], [tD(d1, L), S(1)], [tE(d1, L), S(1)], [tE(d0, L), S(0)]]);
    };
    const corner = (name: string, d: number, L: number) =>
      kf(name, [[0, Z0], [tD(d, L) - 2, Z0], [tD(d, L), "opacity:1"], [tE(d, L), "opacity:1"], [tE(d, L) + 2, Z0]]);
    const a = (i: number) => plen(FA.slice(0, i + 1));
    const b = (i: number) => plen(FB.slice(0, i + 1));
    corner("cTL", a(3) / 2, LA);
    edge("eT", "X", a(3), a(4), LA);
    corner("cTR", (a(4) + a(7)) / 2, LA);
    edge("eR", "Y", a(7), a(8), LA);
    corner("cBR", (a(8) + LA) / 2, LA);
    edge("eL", "Y", 0, b(1), LB);
    corner("cBL", (b(1) + b(4)) / 2, LB);
    edge("eB", "X", b(4), LB, LB);
  }
  // the fresh weld: white-hot rim → lime → the cyan / blue gradient beneath
  const COOL = "cubic-bezier(.3,0,.6,1)";
  kf("rimW", [[0, Z0], [TR_Z - 4, Z0], [TR_Z + 16, "opacity:1"], [TR_Z + 110, "opacity:1", COOL], [TR_Z + 480, Z0]]);
  kf("rimL", [
    [0, Z0],
    [TR_Z - 4, Z0],
    [TR_Z + 30, "opacity:1"],
    [TR_Z + 160, "opacity:1", COOL],
    [TR_Z + 950, Z0],
    [TILT[0], Z0, IO],
    [TILT[1], "opacity:.8"],
    [TILT[2], "opacity:.8", IO],
    [TILT[3], Z0],
  ]);
  // frame glow: flash when the outline closes, then it lights up for good when
  // the site goes LIVE (the poster keeps that glow)
  kf("frG", [
    [0, Z0],
    [TR_Z - 2, Z0],
    [TR_Z + 30, "opacity:1"],
    [TR_Z + 520, Z0],
    [LIVE_T - 2, Z0],
    [LIVE_T + 40, "opacity:1"],
    [LIVE_T + 800, "opacity:.7"],
    [ER_A, "opacity:.7"],
    [ER_A + 400, Z0],
  ]);
  // glint across the fresh glass, then the sheen of the tilted live window
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
  // vertical cyan QA scan across the live page (the printhead's perpendicular twin)
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
  // premium 3D tilt of the live window while the fans sweep behind the glass
  {
    const FLAT = "transform:perspective(170cqw) rotateX(0deg) rotateY(0deg)";
    const TILTED = "transform:perspective(170cqw) rotateX(7deg) rotateY(-9deg)";
    kf("tilt", [[0, FLAT], [TILT[0], FLAT, IO], [TILT[1], TILTED], [TILT[2], TILTED, IO], [TILT[3], FLAT]]);
  }
  {
    // the glass page is PRINTED: its height follows the printhead
    const S = (y: number) => `transform:scaleY(${f(Math.max(0, (y - CH) / (WB - CH)), 4)})`;
    const st: Stop[] = [[0, S(CH)]];
    for (const [t0, t1, y0, y1] of SCAN) st.push([t0, S(y0), IO], [t1, S(y1)]);
    const tc = scanAt(CH, true);
    for (let i = 0; i <= 6; i++) {
      const t = ER_A + ((tc - ER_A) * i) / 6;
      st.push([t, S(WB + (WY - WB) * eIO((t - ER_A) / (ER_Z - ER_A)))]);
    }
    kf("body", st);
  }
  kf("chr", [[0, Z0], [TR_Z - 2, Z0], [TR_Z + 200, "opacity:1"]]);
  DOTS.forEach((_, i) => popIn(`dot${i}`, DOT_T[i], 0, 1.6, 260));
  kf("url", [
    [0, "transform:scaleX(0)"],
    [URL_A, "transform:scaleX(0)", IO],
    [URL_Z, "transform:scaleX(1)"],
  ]);
  riseIn("urlT", URL_Z - 90, ".55cqw", 220);
  popIn("ok", OK_T, 0.4, 1.2, 360);

  // nav
  kf("logo", [
    [0, "opacity:0;transform:scale(1.9) skewX(-14deg)"],
    [tNav - 70, "opacity:0;transform:scale(1.9) skewX(-14deg)"],
    [tNav - 50, "opacity:1;transform:scale(1.75) skewX(-14deg)", IN],
    [tNav, "opacity:1;transform:scale(.9) skewX(6deg)", OUT],
    [tNav + 90, "opacity:1;transform:scale(1.06) skewX(-2deg)", IO],
    [tNav + 190, "opacity:1;transform:scale(1) skewX(0deg)"],
  ]);
  const TL_SWEEP: [number, number] = [tNav + 40, tNav + 250];
  const menuT = MENU_X.map(
    (mx) => Math.round(TL_SWEEP[0] + (TL_SWEEP[1] - TL_SWEEP[0]) * inv(eIO, (mx + 14 - LOGO_C[0]) / (262 - LOGO_C[0]))),
  );
  menuT.forEach((t, i) => popIn(`menu${i}`, t, 0.2, 1.25, 260));
  const tNavCta = tNav + 165;
  popIn("navcta", tNavCta, 0.25, 1.2, 320);
  kf("eye", [
    [0, "opacity:0;transform:scale(.4)"],
    [tEye - 2, "opacity:0;transform:scale(.4)", OUT],
    [tEye + 140, "opacity:1;transform:scale(1.08)", IO],
    [tEye + 260, "opacity:1;transform:scale(1)"],
    [oEye, "opacity:1;transform:scale(1)"],
    [oEye + 50, "opacity:.25;transform:scale(1)"],
    [oEye + 90, "opacity:.8;transform:scale(1)"],
    [oEye + 190, "opacity:0;transform:scale(1)"],
  ]);
  kf("guide", [[0, Z0], [tGuide - 2, Z0], [tGuide + 160, "opacity:1"], [LAST + 200, "opacity:1"], [LAST + 700, Z0]]);

  // headline: per-word slam (fitted scale + origin) + tracking collapse, white-hot
  // landing, wave in the hold, spread-out erase
  const pY = (em: number) => f((em / LINE) * 100, 2); // em → % of the word box
  function wordKF(name: string, t: number, big: boolean, wave: number, out: number, w: Word) {
    const s0 = w.s0;
    // the slam scales about the fitted origin; the hold wave must swell about the
    // word centre (or it would shove its neighbour): translateX compensates
    const cx = (s: number) => f(((1 - s) * (w.w / 2 - w.ox) * 100) / w.w, 2);
    const tr = (o: number, y: number, s: number, k: number, x = "0") =>
      `opacity:${f(o)};transform:translateX(${x}%) translateY(${pY(y)}%) scale(${f(s, 3)}) skewX(${f(k, 1)}deg)`;
    const k0 = big ? -18 : -14;
    const y0 = big ? -0.3 : -0.22;
    const pre = big ? PRE_L : PRE;
    kf(name, [
      [0, tr(0, y0, s0, k0)],
      [t - pre, tr(0, y0, s0, k0)],
      [t - pre + 26, tr(1, y0 * 0.9, s0 * 0.94, k0), IN],
      [t, tr(1, 0.035, big ? 0.85 : 0.9, big ? 9 : 6), OUT],
      [t + 90, tr(1, -0.02, big ? 1.08 : 1.045, -3), IO],
      [t + 190, tr(1, 0.005, 0.985, 1), IO],
      [t + 290, tr(1, 0, 1, 0)],
      [wave, tr(1, 0, 1, 0), OUT],
      [wave + 120, tr(1, -0.13, 1.035, -3.5, cx(1.035)), IO],
      [wave + 330, tr(1, 0, 1, 0)],
      [out, tr(1, 0, 1, 0), IN],
      [out + 210, tr(0, -0.2, 1, -12)],
    ]);
  }
  /** letters spread by `sp` em per letter step collapse exactly onto the landing */
  function trackKF(name: string, t: number, big: boolean, out: number, sp: number) {
    const X = (em: number) => `transform:translateX(calc(var(--d)*${f((em * fs) / 4, 3)}cqw))`;
    kf(name, [
      [0, X(sp)],
      [t - (big ? PRE_L : PRE), X(sp), IN],
      [t, X(0)],
      [out, X(0), IN],
      [out + 210, X(-0.05)],
    ]);
  }
  /** molten landing: a white-hot copy of the word flashes on impact and cools */
  const hotKF = (name: string, t: number, extra: Stop[] = []) =>
    kf(name, [[0, Z0], [t - 2, Z0], [t + 12, "opacity:1"], [t + 110, "opacity:1", COOL], [t + 640, Z0], ...extra]);
  const waveAt = (s: number) => WAVE + (s - 1) * 90;
  const WAVE_L = WAVE + 3 * 90 + 40;
  const LINE1_SPARKS = [-174, -142, -38, -6];
  words.forEach((w) => {
    const t = SLOT[w.slot];
    wordKF(`w${w.i}`, t, false, waveAt(Math.max(1, w.slot)), oL1, w);
    trackKF(`t${w.i}`, t, false, oL1, w.sp);
    hotKF(`ho${w.i}`, t);
    // the beam lands first (t - PRE): flare, the word materialises big and slams
    // down by t (landing: gravity sparks)
    flare(`hf${w.i}`, [t - PRE], 1.25, 360);
    LINE1_SPARKS.forEach((d, j) => gspark(`hs${w.i}x${j}`, [t], d, 50 + (j % 2) * 14, 480, 44));
    if (w.first) {
      shots[SLOT_HEAD[w.slot]].push({ k: "hit", land: t - PRE, to: [w.cx, w.cy], travel: 90 });
    }
  });
  wordKF("wL", LAST, true, WAVE_L, oL2, last);
  trackKF("tL", LAST, true, oL2, last.sp);
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: LAST - PRE_L, to: [last.cx, last.cy], travel: 100 });
  flare("hfL", [LAST - PRE_L], 1.6, 460);
  const LAST_SPARKS = [-176, -146, -112, -68, -34, -4];
  LAST_SPARKS.forEach((d, j) => gspark(`hsLx${j}`, [LAST], d, 56 + (j % 3) * 12, 560, 48));
  kf("bigF", [
    [0, "opacity:0;transform:scale(.5)"],
    [LAST - 4, "opacity:0;transform:scale(.5)"],
    [LAST, "opacity:1;transform:scale(.7)", OUT],
    [LAST + 420, "opacity:0;transform:scale(1.35)"],
  ]);
  function ghost(name: string, sign: number, o: number) {
    const u = (x: number) => f((x * fs) / 4, 3);
    const g = (a: number, x: number) => `opacity:${f(a)};transform:translate(${u(x * sign)}cqw,${u(-x * 0.25)}cqw)`;
    kf(name, [
      [0, g(0, 0)],
      [LAST - 4, g(0, 0)],
      [LAST, g(o, 0.08), STEP],
      [LAST + 45, g(o, -0.045), STEP],
      [LAST + 90, g(o * 0.9, 0.06), STEP],
      [LAST + 135, g(o * 0.75, -0.028), STEP],
      [LAST + 180, g(o * 0.6, 0.02)],
      [LAST + 300, g(0, 0)],
      [WAVE_L - 4, g(0, 0)],
      [WAVE_L, g(o * 0.8, 0.05), STEP],
      [WAVE_L + 55, g(o * 0.7, -0.03), STEP],
      [WAVE_L + 110, g(o * 0.5, 0.018)],
      [WAVE_L + 220, g(0, 0)],
    ]);
  }
  ghost("gc", -1, 0.95);
  ghost("gb", 1, 0.85);
  // the white-hot copy of the last word (cools to lime), re-glows on the wave
  hotKF("gw", LAST, [[WAVE_L - 4, Z0], [WAVE_L + 70, "opacity:.5"], [WAVE_L + 420, Z0]]);
  kf("ul", [
    [0, "opacity:0;transform:scaleX(0)"],
    [LAST + 88, "opacity:0;transform:scaleX(0)"],
    [LAST + 90, "opacity:1;transform:scaleX(0)", OUT],
    [LAST + 460, "opacity:1;transform:scaleX(1)"],
    [oL2, "opacity:1;transform:scaleX(1)", IN],
    [oL2 + 200, "opacity:0;transform:scaleX(1)"],
  ]);
  kf("ulT", [
    [0, "opacity:0;transform:translateX(0)"],
    [LAST + 88, "opacity:0;transform:translateX(0)"],
    [LAST + 90, "opacity:1;transform:translateX(0)", OUT],
    [LAST + 460, "opacity:1;transform:translateX(100%)"],
    [LAST + 620, "opacity:0;transform:translateX(100%)"],
  ]);
  kf("tag", [
    [0, "opacity:0;transform:translateY(1.15cqw)"],
    [tTag - 2, "opacity:0;transform:translateY(1.15cqw)", OUT],
    [tTag + 300, "opacity:1;transform:translateY(0)"],
    [oTag, "opacity:1;transform:translateY(0)"],
    [oTag + 50, "opacity:.25;transform:translateY(0)"],
    [oTag + 90, "opacity:.8;transform:translateY(0)"],
    [oTag + 190, "opacity:0;transform:translateY(-.8cqw)"],
  ]);

  // CTA FORGE: two weld tips trace the pill outline in opposite directions
  // (two beams each), collide on the right → white-hot → lime, label rises
  const cyM = CTA_Y + CR;
  const xL = CTA_X + CR;
  const xR = CTA_X + ctaW - CR;
  const tipA: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 270, 4), [xR, CTA_Y], ...arc(xR, cyM, CR, 270, 360, 4)];
  const tipB: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 90, 4), [xR, CTA_Y + CTA_H], ...arc(xR, cyM, CR, 90, 0, 4)];
  const LT = plen(tipA);
  const D = FG_Z - FG_A;
  const tipAt = (path: Pt[]) => (t: number) => pat(path, (Math.max(0, Math.min(D, t - FG_A)) / D) * LT);
  const qa = (Math.PI / 2) * CR;
  const E = ctaW - 2 * CR;
  const tq = (d: number) => FG_A + (d / LT) * D;
  [tipA, tipB].forEach((path, j) => {
    // weld tip glow riding the outline (stops at its vertices: exact, constant speed)
    const st: Stop[] = [[0, `opacity:0;transform:${tl(path[0], 1)}`], [FG_A - 70, `opacity:0;transform:${tl(path[0], 1)}`], [FG_A, `opacity:1;transform:${tl(path[0], 1)}`]];
    let acc = 0;
    path.forEach((p, i) => {
      if (i) acc += dist(path[i - 1], p);
      if (i) st.push([tq(acc), `opacity:1;transform:${tl(p, 1)}`]);
    });
    st.push([FG_Z + 120, `opacity:0;transform:${tl(path[path.length - 1], 1)}`]);
    kf(`wt${j}`, st);
    // outline pieces: corner arcs pop as the tip passes, the straight edge grows behind it
    const fade: Stop[] = [[FG_Z + 60, "opacity:1"], [FG_Z + 380, Z0]];
    kf(`fc${j}a`, [[0, Z0], [tq(qa / 2) - 2, Z0], [tq(qa / 2), "opacity:1"], ...fade]);
    kf(`fe${j}`, [
      [0, "opacity:1;transform:scaleX(0)"],
      [tq(qa), "opacity:1;transform:scaleX(0)"],
      [tq(qa + E), "opacity:1;transform:scaleX(1)"],
      [FG_Z + 60, "opacity:1;transform:scaleX(1)"],
      [FG_Z + 380, "opacity:0;transform:scaleX(1)"],
      [FG_Z + 382, "opacity:1;transform:scaleX(0)"],
    ]);
    kf(`fc${j}b`, [[0, Z0], [tq(qa * 1.5 + E) - 2, Z0], [tq(qa * 1.5 + E), "opacity:1"], ...fade]);
  });
  shots[HT].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HU].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HL].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  shots[HR].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  flare("fgX", [FG_Z], 1.7, 520);
  [-110, -60, -14, 34].forEach((d, j) => gspark(`fgx${j}`, [FG_Z], d, 46 + (j % 2) * 12, 500, 42));
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
  hotKF("ctaH", FG_Z);
  const L0 = FG_Z + 150;
  const nLetters = lay.glyphs.filter((g) => g >= 0).length;
  for (let i = 0; i < nLetters; i++)
    kf(`cl${i}`, [
      [0, "transform:translateY(115%)"],
      [L0 + i * 24, "transform:translateY(115%)", BACK2],
      [L0 + i * 24 + 340, "transform:translateY(0)"],
    ]);
  const tArrow = L0 + nLetters * 24 + 40;
  kf("ctaA", [
    [0, "opacity:0;transform:translateX(-60%)"],
    [tArrow, "opacity:0;transform:translateX(-60%)", BACK],
    [tArrow + 380, "opacity:1;transform:translateX(0)"],
    [CLICK + 40, "opacity:1;transform:translateX(0)", OUT],
    [CLICK + 160, "opacity:1;transform:translateX(50%)", IO],
    [CLICK + 340, "opacity:1;transform:translateX(0)"],
  ]);
  popIn("sec", tArrow + 120, 0.5, 1.07, 320);

  // click: cursor, ripples, flare + spark burst
  flare("ctaF", [CLICK], 1.3, 320);
  [-150, -105, -60, -15, 165].forEach((d, j) => gspark(`ckx${j}`, [CLICK], d, 38 + (j % 3) * 8, 460, 36));
  {
    const C = (o: number, x: number, y: number, s = 1) =>
      `opacity:${o};transform:translate(${f(x)}cqw,${f(y)}cqw) scale(${f(s)})`;
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
  const rip = (name: string, t: number, s1: number) =>
    kf(name, [
      [0, "opacity:0;transform:scale(.2)"],
      [t - 2, "opacity:0;transform:scale(.2)", OUT],
      [t, "opacity:1;transform:scale(.25)", OUT],
      [t + 560, `opacity:0;transform:scale(${f(s1)})`],
    ]);
  rip("rip1", CLICK, 3.4);
  rip("rip2", CLICK + 120, 4.6);

  // cards: frames extrude under the printhead, contents land with the bolts
  {
    const top = scanAt(CARD_Y);
    const st: Stop[] = [[0, "opacity:0;transform:scaleY(0)"], [top - 2, "opacity:0;transform:scaleY(0)"]];
    for (let i = 0; i <= 6; i++)
      st.push([i ? scanAt(CARD_Y + (CARD_H * i) / 6) : top, `opacity:1;transform:scaleY(${f(i / 6, 3)})`]);
    kf("cards", st);
  }
  HITS.forEach((h, k) => {
    kf(`cf${k}`, [[0, Z0], [h - 2, Z0], [h + 30, "opacity:1"], [h + 480, Z0]]);
    kf(`cc${k}`, [[0, Z0], [h - 2, Z0], [h + 70, "opacity:1"]]);
  });
  // score ring spins in (its lime cap makes the rotation readable)
  kf("ring", [
    [0, "opacity:0;transform:rotate(-200deg) scale(.4)"],
    [HITS[0] + 40, "opacity:0;transform:rotate(-200deg) scale(.4)", OUT],
    [HITS[0] + 470, "opacity:1;transform:rotate(12deg) scale(1.08)", IO],
    [HITS[0] + 680, "opacity:1;transform:rotate(0deg) scale(1)"],
  ]);
  popIn("k100", HITS[0] + 150, 0.4, 1.22, 360);
  BAR_H.forEach((_, i) =>
    kf(`bar${i}`, [
      [0, "transform:scaleY(0)"],
      [HITS[1] + 80 + i * 70, "transform:scaleY(0)", BACK],
      [HITS[1] + 380 + i * 70, "transform:scaleY(1)"],
    ]),
  );
  popIn("kseo", HITS[1] + 50, 0.4, 1.2, 320);
  // ricochet bolts: the head fires the first leg, the packet ricochets on
  SHOTS.forEach((s, k) => {
    const g0 = s.segs[0];
    shots[s.head].push({ k: "bolt", s0: g0.s0, s1: g0.s1, r0: g0.r0, r1: g0.r1, to: g0.to });
    kf(`s${k}o`, [[0, Z0], [s.fire - 30, Z0], [s.fire - 10, "opacity:1"], [s.hit + TRAVEL + 80, "opacity:1"], [s.hit + TRAVEL + 160, Z0]]);
    s.segs.slice(1).forEach((g, j) => {
      kf(`s${k}g${j}`, [
        [0, "transform:translateX(0) scaleX(0)"],
        [g.s0, "transform:translateX(0) scaleX(0)"],
        [g.s1, "transform:translateX(0) scaleX(1)"],
        [g.r0, "transform:translateX(0) scaleX(1)"],
        [g.r1, "transform:translateX(100%) scaleX(0)"],
        [g.r1 + 2, "transform:translateX(0) scaleX(0)"],
      ]);
      flare(`s${k}f${j}`, [g.s0], 1.1, 360);
    });
    flare(`s${k}h`, [s.hit], 1.5, 420);
    [-58, -20, 20, 58].forEach((d, j) => gspark(`s${k}x${j}`, [s.hit], s.back + d, 50 + (j % 2) * 14, 500, 42));
  });

  // the conversion card boots EMPTY (flat baseline + bar stubs); after the click,
  // three comets arc from the CTA, each landing kicks the bars, draws the line
  // one step and pops a node; the number rolls in on odometer reels
  kf("cbl", [
    [0, "opacity:0;transform:scaleX(0)"],
    [HITS[2] + 20, "opacity:0;transform:scaleX(0)", OUT],
    [HITS[2] + 340, "opacity:1;transform:scaleX(1)"],
  ]);
  CBAR.forEach((_, i) => {
    const d = i * 18;
    kf(`cb${i}`, [
      [0, "transform:scaleY(0)"],
      [HITS[2] + 60 + d, "transform:scaleY(0)", OUT],
      [HITS[2] + 320 + d, "transform:scaleY(.12)"],
      [LAND[0] + d, "transform:scaleY(.12)", BACK2],
      [LAND[0] + 120 + d, "transform:scaleY(.42)"],
      [LAND[1] + d, "transform:scaleY(.42)", BACK2],
      [LAND[1] + 120 + d, "transform:scaleY(.72)"],
      [LAND[2] + d, "transform:scaleY(.72)", BACK],
      [LAND[2] + 380 + d, "transform:scaleY(1)"],
    ]);
  });
  {
    const legs = CHART.slice(1).map((q, i) => dist(CHART[i], q));
    const steps: [number[], number, number][] = [
      [[0], LAND[0], 110],
      [[1, 2], LAND[1], 160],
      [[3, 4], LAND[2], 160],
    ];
    for (const [ids, t, dur] of steps) {
      const L = ids.reduce((a, i) => a + legs[i], 0);
      let acc = 0;
      for (const i of ids) {
        const a = t + (dur * acc) / L;
        acc += legs[i];
        kf(`cs${i}`, [[0, "transform:scaleX(0)"], [a, "transform:scaleX(0)"], [t + (dur * acc) / L, "transform:scaleX(1)"]]);
      }
    }
  }
  LAND.forEach((t, i) => {
    popIn(`node${i}`, t, 0, 1.8, 280);
    flare(`cfl${i}`, [t], 1.35, 380);
  });
  popIn("k38", LAND[0] - 10, 0.4, 1.15, 340);
  kf("rlT", [[0, "transform:translateY(0)"], [LAND[0], "transform:translateY(0)", EO], [LAND[0] + 660, "transform:translateY(-75%)"]]);
  kf("rlO", [[0, "transform:translateY(0)"], [LAND[0], "transform:translateY(0)", EO], [LAND[0] + 920, "transform:translateY(-94.737%)"]]);
  // comets: CTA → chart nodes on quadratic arcs, head first
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
      const st: Stop[] = [[t0 - 12, `opacity:0;transform:${tl(p0, 1)} rotate(${Math.round(at(t0)[1])}deg)`]];
      for (let t = t0; t <= t1 + 30; t += 35) {
        const [p, a] = at(t);
        st.push([t, `opacity:${f(o(t))};transform:${tl(p, 1)} rotate(${Math.round(a)}deg)`]);
      }
      st.push([t1 + 34, `opacity:0;transform:${tl(p2, 1)} rotate(${Math.round(at(t1)[1])}deg)`]);
      kf(`com${i}`, st);
    });
  }

  // footer + LIVE
  riseIn("foot", tFoot, "1.25%");
  riseIn("liveb", tFoot + 40, ".68cqw");
  kf("live", [
    [0, "opacity:0;transform:scale(1)"],
    [LIVE_T - 2, "opacity:0;transform:scale(1)"],
    [LIVE_T, "opacity:1;transform:scale(1.3)", OUT],
    [LIVE_T + 300, "opacity:1;transform:scale(1)"],
  ]);
  {
    // LIVE ring + chart halo pulses, unrolled onto T (no secondary loop)
    const Zp = "opacity:0;transform:scale(1)";
    const st: Stop[] = [[0, Zp]];
    for (let p = LIVE_T + 150; p + 1300 < ER_A; p += 1750)
      st.push([p - 2, Zp], [p, "opacity:.85;transform:scale(1)", "cubic-bezier(.2,.6,.4,1)"], [p + 1300, "opacity:0;transform:scale(2.8)"]);
    kf("pz", st);
  }

  // printhead (wall to wall, flares at the walls)
  {
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    const st: Stop[] = [[0, Y(0, CH)], [PH_ON, Y(0, CH)], [PH_ON + 30, Y(1, CH)], [PH_ON + 52, Y(0.35, CH)], [PH_ON + 80, Y(1, CH)]];
    SCAN.forEach(([t0, t1, y0, y1], i) => {
      const prevEnd = i ? SCAN[i - 1][1] : PH_ON + 80;
      if (t0 - prevEnd > 300) st.push([t0 - 120, Y(0.42, y0)]);
      st.push([t0, Y(1, y0), IO], [t1, Y(1, y1)]);
      const next = SCAN[i + 1];
      if (next && next[0] - t1 > 300) st.push([t1 + 160, Y(0.42, y1)]);
    });
    st.push(
      [PH_OUT, Y(0, WB + 18)],
      [ER_A - 160, Y(0, WB)],
      [ER_A - 40, Y(1, WB)],
      [ER_A, Y(1, WB), IO],
      [ER_Z, Y(1, WY)],
      [ER_Z + 160, Y(0, WY - 12)],
    );
    kf("scan", st);
  }

  // corner tracers
  const FREE = 3; // tolerance for fast sweeps through empty space
  const lapMid = (L1: number, L2: number) => Math.round(LAP_A + ((LAP_Z - LAP_A) * L1) / (L1 + L2));
  laser("bl", EBL, [
    { a: TR_A, b: TR_Z, p: FA, tol: 2 },
    { a: TR_Z, b: DOT_T[0], p: [F_END, DOTS[0]], e: eIO, tol: FREE },
    { a: DOT_T[0] + 15, b: DOT_T[1], p: [DOTS[0], DOTS[1]], e: eIO },
    { a: DOT_T[1] + 15, b: DOT_T[2], p: [DOTS[1], DOTS[2]], e: eIO },
    { a: DOT_T[2] + 25, b: DOT_T[2] + 130, p: [DOTS[2], [120, 120]], e: eIO, tol: FREE },
    { a: LAP_A - 80, b: LAP_A, p: [F_END, F_END] },
    { a: LAP_A, b: LAP_Z, p: LAP_L, tol: 3 },
    { a: EAT_A - 80, b: EAT_A, p: [F_END, F_END] },
    { a: EAT_A, b: EAT_Z, p: [...FA].reverse(), tol: 2.5 },
  ]);
  onoff("blo", [
    [TR_A - 20, DOT_T[2] + 50],
    [LAP_A - 70, LAP_Z + 20],
    [EAT_A - 70, EAT_Z + 20],
  ]);
  const blHits = [TR_Z, ...DOT_T, LAP_A, lapMid(LA, LB), LAP_Z, EAT_Z];
  tipPulse("blg", blHits);
  sparks("bls", blHits);

  laser("br", EBR, [
    { a: TR_A, b: TR_Z, p: FB, tol: 2 },
    { a: TR_Z, b: URL_A, p: [F_END, [84, 42]], e: eIO, tol: FREE },
    { a: URL_A, b: URL_Z, p: [[84, 42], [260, 42]], e: eIO },
    { a: URL_Z + 20, b: URL_Z + 120, p: [[260, 42], [300, 110]], e: eIO, tol: FREE },
    { a: LAP_A - 80, b: LAP_A, p: [F_END, F_END] },
    { a: LAP_A, b: LAP_Z, p: LAP_R, tol: 3 },
    { a: EAT_A - 80, b: EAT_A, p: [F_END, F_END] },
    { a: EAT_A, b: EAT_Z, p: [...FB].reverse(), tol: 2.5 },
  ]);
  onoff("bro", [
    [TR_A - 20, URL_Z + 40],
    [LAP_A - 70, LAP_Z + 20],
    [EAT_A - 70, EAT_Z + 20],
  ]);
  const brHits = [TR_Z, URL_A, URL_Z, LAP_A, lapMid(LB, LA), LAP_Z, EAT_Z];
  tipPulse("brg", brHits);
  sparks("brs", brHits);

  laser("tl", ETL, [
    { a: tNav - 150, b: tNav, p: [[20, 112], LOGO_C], e: eIO, tol: FREE },
    { a: TL_SWEEP[0], b: TL_SWEEP[1], p: [LOGO_C, [262, 72]], e: eIO, tol: 1.5 },
  ]);
  onoff("tlo", [[tNav - 140, TL_SWEEP[1] + 30]]);
  tipPulse("tlg", [tNav, ...menuT]);
  sparks("tls", [tNav, ...menuT]);

  laser("tr", ETR, [
    { a: tNav + 10, b: tNavCta, p: [[384, 118], NAVCTA_C], e: eIO, tol: FREE },
    { a: tNavCta + 20, b: tEye, p: [NAVCTA_C, EYE_C], e: eIO, tol: FREE },
  ]);
  onoff("tro", [[tNav + 20, tEye + 120]]);
  tipPulse("trg", [tNavCta, tEye]);
  sparks("trs", [tNavCta, tEye]);

  // rail heads: glide between shots, charge, fire (beam = child of the head)
  HEADS.forEach((h, k) => {
    const st: Stop[] = [[0, `transform:${tl(h.home)}`]];
    let p = h.home;
    for (const [t0, t1, to, e] of PLAN[k]) {
      st.push([t0, `transform:${tl(p)}`, e ?? IO], [t1, `transform:${tl(to)}`]);
      p = to;
    }
    kf(`${h.id}p`, st);
    headKF(k, shots[k]);
  });

  // fans of beams (back layer): rig rotation, spread (shared), on/off
  {
    // Each rig starts AND ends aimed at the window's top-left corner, exactly
    // where its tracer (same laser head) finishes eating the outline: across the
    // loop seam the beam carries on, bursts open and snaps back into the tracer.
    // angles: [seam = tracer line, ignition flick, ambient sweep from → to (dim, behind
    // the glass while the cursor comes in), LIVE burst, hold sweeps ×3]
    const AMB = 6900;
    const rot = (a: number) => `transform:rotate(${f(a)}deg)`;
    const rig = (name: string, a: number[]) =>
      kf(name, [
        [0, rot(a[0])],
        [30, rot(a[0]), IO],
        [220, rot(a[1]), IO],
        [TR_A - 30, rot(a[0])],
        [AMB - 100, rot(a[2]), IOS],
        [FAN2 - 40, rot(a[3]), IO],
        [FAN2 + 600, rot(a[4]), IO],
        [FAN2 + 1300, rot(a[5]), IO],
        [11300, rot(a[6]), IO],
        [12500, rot(a[7]), IO],
        [13700, rot(a[0])],
      ]);
    rig("fLr", [angle(EBL, P0), -50, -28, -48, -14, -72, -24, -62]);
    rig("fRr", [angle(EBR, P0), -108, -152, -132, -166, -108, -156, -118]);
    const sp = (d: number) => `transform:rotate(calc(var(--k)*${d}deg))`;
    kf("fS", [
      [0, sp(0)],
      [20, sp(0), OUT],
      [200, sp(10)],
      [250, sp(10), IO],
      [TR_A - 30, sp(0)],
      [AMB, sp(0), IO],
      [AMB + 500, sp(6)],
      [FAN2, sp(6), OUT],
      [FAN2 + 300, sp(13)],
      [FAN2 + 1250, sp(10), IO],
      [12400, sp(10), IO],
      [12750, sp(3)],
      [T, sp(0)],
    ]);
    kf("fO", [
      [0, "opacity:.2"],
      [40, "opacity:1"],
      [70, "opacity:.35"],
      [100, "opacity:1"],
      [TR_A - 30, "opacity:1"],
      [TR_A + 70, Z0],
      [AMB, Z0],
      [AMB + 450, "opacity:.32"],
      [FAN2 - 30, "opacity:.32"],
      [FAN2, "opacity:1"],
      [FAN2 + 30, "opacity:.35"],
      [FAN2 + 60, "opacity:1"],
      [FAN2 + 1250, "opacity:1"],
      [FAN2 + 1750, "opacity:.5"],
      [12350, "opacity:.5"],
      [12700, Z0],
      [13860, Z0],
      [T, "opacity:.2"],
    ]);
  }

  // whole-scene punctuation: camera shake + flash
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
      [LAST + 20, "opacity:.85"],
      [LAST + 460, Z0],
      [FG_Z - 2, Z0],
      [FG_Z + 25, "opacity:.4"],
      [FG_Z + 420, Z0],
      [CLICK - 2, Z0],
      [CLICK + 40, "opacity:.4"],
      [CLICK + 480, Z0],
    ]);
  }

  return { css: (BASE + RULES.join("")).replace(/\n/g, ""), lay };
}

/* ───────────────────────────── static styles ─────────────────────────────── */

const BEAM_BG =
  "linear-gradient(rgb(var(--hot)/.95),rgb(var(--hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--c)/.07) 20%,rgb(var(--c)/.3) 37%,rgb(var(--c)/.85) 47%,rgb(var(--c)/.85) 53%,rgb(var(--c)/.3) 63%,rgb(var(--c)/.07) 80%,transparent)";
const VBEAM_BG = BEAM_BG.replace("0 50%/100% max(1.3px,.3cqw)", "50% 0/max(1.3px,.3cqw) 100%").replace(
  "linear-gradient(transparent",
  "linear-gradient(90deg,transparent",
);
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--hot)) ${core},rgb(var(--c)/.8) ${mid},rgb(var(--c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";
const HOT_TEXT = "color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--lime)/.95),0 0 .45em rgb(var(--cyan)/.6)";

const BASE = `
.swb-root{--lime:200 240 46;--cyan:20 224 200;--green:34 211 140;--blue:46 102 255;--hot:242 243 238;position:relative;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;text-align:left}
.swb-root i{font-style:normal}
.swb-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
.swb-L{position:absolute;inset:0}
.swb-abs{position:absolute;display:block}
.swb-fill{display:block;width:100%;height:100%}
.swb-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.1) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.swb-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.swb-floor{position:absolute;left:6%;top:89%;width:88%;height:8%;border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.32),rgb(20 224 200/.08) 60%,transparent)}
.swb-win{position:absolute;inset:0;transform-origin:50% 52%}
.swb-body{border-radius:0 0 3cqw 3cqw;background:radial-gradient(46% 34% at 38% 26%,rgb(200 240 46/.1),transparent),linear-gradient(rgb(13 15 21/.87),rgb(7 8 11/.87));transform-origin:50% 0}
.swb-chrome{border-radius:3cqw 3cqw 0 0;background:rgb(17 19 26/.96);box-shadow:inset 0 -1px rgb(242 243 238/.1)}
.swb-dot,.swb-node{border-radius:50%}
.swb-node{background:#c8f02e}
.swb-urlp{border-radius:3cqw;background:rgb(242 243 238/.06);transform-origin:0 50%}
.swb-frg{border-radius:3cqw;box-shadow:0 0 2.6cqw rgb(var(--green)/.42),inset 0 0 1.6cqw rgb(var(--cyan)/.14)}
.swb-rimw{border-radius:3cqw;opacity:0;box-shadow:0 0 0 .45cqw rgb(255 255 255/.95),0 0 1.4cqw .35cqw rgb(255 255 255/.5),inset 0 0 1.6cqw rgb(255 255 255/.25)}
.swb-riml{border-radius:3cqw;opacity:0;box-shadow:0 0 0 .3cqw rgb(var(--lime)/.85),0 0 3cqw rgb(var(--lime)/.5),inset 0 0 2.4cqw rgb(var(--lime)/.3)}
.swb-logo svg,.swb-ringw svg{display:block;width:100%;height:100%;overflow:visible}
.swb-mb{border-radius:1cqw;background:rgb(242 243 238/.24)}
.swb-navcta{border-radius:3cqw;background:#c8f02e;display:flex;align-items:center;justify-content:center}
.swb-navcta i{width:56%;height:16%;border-radius:1cqw;background:rgb(10 10 11/.55)}
.swb-guide{background:repeating-linear-gradient(90deg,rgb(var(--cyan)/.6) 0 .75cqw,transparent .75cqw 1.75cqw)}
.swb-crow{transform-origin:50% 0}
.swb-card{top:0;height:100%;width:31.013%;border-radius:1.75cqw;background:rgb(242 243 238/.035);box-shadow:inset 0 0 0 1px rgb(242 243 238/.11)}
.swb-cf{border-radius:1.75cqw;border:.35cqw solid}
.swb-sk{border-radius:1cqw}
.swb-barv{border-radius:.4cqw;background:linear-gradient(#14e0c8,#2e66ff);transform-origin:50% 100%}
.swb-cbar{border-radius:.5cqw .5cqw 0 0;background:linear-gradient(rgb(var(--cyan)/.34),rgb(var(--blue)/.1));transform-origin:50% 100%}
.swb-cbl{background:repeating-linear-gradient(90deg,rgb(242 243 238/.22) 0 .9cqw,transparent .9cqw 1.6cqw);transform-origin:0 50%}
.swb-cseg{height:.6cqw;margin-top:-.3cqw;border-radius:.3cqw;transform-origin:0 50%}
.swb-x{opacity:0}.swb-frG{opacity:.7}
.swb-nh{border-radius:50%;border:.28cqw solid #c8f02e;opacity:.4;transform:scale(1.8)}
.swb-glass{position:absolute;overflow:hidden;border-radius:3cqw}
.swb-vscan{position:absolute;left:-1.7cqw;top:-8cqw;height:116cqw;width:3.4cqw;font-size:1cqw;opacity:0;--c:var(--cyan)}
.swb-vl{position:absolute;inset:0;background:${VBEAM_BG}}
.swb-vw{position:absolute;top:0;bottom:0;right:50%;width:10em;background:linear-gradient(to left,rgb(var(--cyan)/.13),rgb(var(--cyan)/.03) 50%,transparent),repeating-linear-gradient(90deg,rgb(var(--cyan)/.07) 0 1px,transparent 1px .9em)}
.swb-vf{position:absolute;left:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.swb-sheen{position:absolute;top:-20%;left:0;width:34%;height:140%;background:linear-gradient(90deg,transparent,rgb(var(--hot)/.08) 40%,rgb(var(--hot)/.16) 50%,rgb(var(--hot)/.08) 60%,transparent);opacity:0}
.swb-c-lime{--c:var(--lime)}.swb-c-cyan{--c:var(--cyan)}.swb-c-green{--c:var(--green)}.swb-c-blue{--c:var(--blue)}
.swb-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 40%,rgb(var(--hot)/.2),rgb(var(--lime)/.09) 45%,transparent 75%);opacity:0}
.swb-tr,.swb-fan{position:absolute;width:0;height:0;opacity:0}
.swb-mv{position:absolute;right:0;top:-1.7cqw;width:150cqw;height:3.4cqw;transform-origin:100% 50%;background:${BEAM_BG}}
.swb-tipo{position:absolute;right:0;top:50%;width:0;height:0}
.swb-tip{position:absolute;left:-4.6cqw;top:-4.6cqw;width:9.2cqw;height:9.2cqw;border-radius:50%;background:${GLOW("9%", "22%", "52%")};transform:scale(.72)}
.swb-em{position:absolute;left:-6.5cqw;top:-6.5cqw;width:13cqw;height:13cqw;border-radius:50%;background:${GLOW("6%", "17%", "46%")}}
.swb-sp{position:absolute;left:0;top:-.18cqw;height:.36cqw;border-radius:1cqw;transform-origin:0 50%;background:linear-gradient(90deg,rgb(var(--hot)),rgb(var(--c)/.85) 45%,transparent);opacity:0}
.swb-gs{position:absolute;left:0;top:0;width:3.8cqw;height:.6cqw;margin:-.3cqw 0 0 -3.8cqw;border-radius:.4cqw;transform-origin:100% 50%;background:linear-gradient(90deg,transparent,rgb(var(--c)/.85) 45%,#fff 85%);box-shadow:0 0 1cqw rgb(var(--c)/.7);opacity:0}
.swb-fanr{position:absolute;left:0;top:0;width:0;height:0}
.swb-fb{position:absolute;left:0;top:-1.8cqw;width:150cqw;height:3.6cqw;transform-origin:0 50%;background:radial-gradient(farthest-side at 0 50%,rgb(var(--hot)/.85),rgb(var(--hot)/.3) 60%,transparent) 0 50%/100% max(1px,.22cqw) no-repeat,radial-gradient(farthest-side at 0 50%,rgb(var(--c)/.62),rgb(var(--c)/.2) 55%,transparent)}
.swb-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--c:var(--lime)}
.swb-scanw{position:absolute;left:0;right:0;bottom:50%;height:9em;background:linear-gradient(to top,rgb(var(--lime)/.15),rgb(var(--lime)/.04) 45%,transparent),repeating-linear-gradient(to top,rgb(var(--lime)/.08) 0 1px,transparent 1px .9em)}
.swb-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.swb-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.swb-shot{position:absolute;inset:0;opacity:0}
.swb-seg{position:absolute;height:3.4cqw;margin-top:-1.7cqw;transform-origin:0 50%;background:${BEAM_BG}}
.swb-bf{position:absolute;width:13cqw;height:13cqw;margin:-6.5cqw 0 0 -6.5cqw;border-radius:50%;background:${GLOW("7%", "20%", "50%")};opacity:0}
.swb-pt{position:absolute;width:0;height:0}
.swb-hit{position:absolute;left:50%;top:50%;width:0;height:0}
.swb-hf{position:absolute;left:-7cqw;top:-7cqw;width:14cqw;height:14cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.swb-bigf{position:absolute;left:-34cqw;top:-34cqw;width:68cqw;height:68cqw;border-radius:50%;background:radial-gradient(closest-side,rgb(var(--hot)/.5),rgb(var(--lime)/.22) 30%,rgb(var(--cyan)/.08) 62%,transparent);opacity:0}
.swb-hd{position:absolute;left:0;top:0;width:0;height:0}
.swb-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.swb-hfl{position:absolute;left:-6cqw;top:-6cqw;width:12cqw;height:12cqw;border-radius:50%;background:radial-gradient(closest-side,rgb(var(--hot)/.95),rgb(var(--c)/.7) 20%,rgb(var(--c)/.18) 50%,transparent);opacity:0}
.swb-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--hot));box-shadow:0 0 0 .38cqw rgb(var(--c)/.95),0 0 1.8cqw .5cqw rgb(var(--c)/.55),0 0 5cqw rgb(var(--c)/.25);outline:.26cqw dashed rgb(var(--c)/.7);outline-offset:1.15cqw}
.swb-urlt{position:absolute;left:22.6cqw;top:9.1cqw;height:2.8cqw;display:flex;align-items:center;gap:.7cqw;font-family:${MONO};font-size:1.85cqw;color:rgb(242 243 238/.62)}
.swb-urlt svg{width:1.45cqw;height:1.8cqw}
.swb-ok{position:absolute;left:76cqw;top:9cqw;height:3cqw;padding:0 1cqw;border-radius:2cqw;display:flex;align-items:center;gap:.7cqw;font-family:${MONO};font-size:1.6cqw;font-weight:700;white-space:nowrap;color:#22d38c;background:rgb(var(--green)/.12);border:1px solid rgb(var(--green)/.38);transform-origin:50% 50%}
.swb-ok i{width:.9cqw;height:.9cqw;border-radius:50%;background:#22d38c;box-shadow:0 0 1cqw #22d38c}
.swb-eye{position:absolute;left:10.5cqw;top:23cqw;height:3.4cqw;padding:0 1.2cqw;border-radius:2cqw;display:flex;align-items:center;font-family:${MONO};font-size:1.75cqw;font-weight:700;white-space:nowrap;color:#14e0c8;border:1px solid rgb(var(--cyan)/.4);background:rgb(var(--cyan)/.07);transform-origin:0 50%}
.swb-title{position:absolute;left:10.5cqw;top:27.5cqw;width:79cqw;font-family:${HEAD};font-weight:800;font-size:8.5cqw;line-height:${LINE};letter-spacing:${TLS}em;white-space:normal;font-kerning:none;font-variant-ligatures:none}
.swb-l1,.swb-l2{display:block}
.swb-ww{position:relative;display:inline-block}
.swb-w{display:inline-block;transform-origin:50% 80%}
.swb-c{display:inline-block}
.swb-wwL{color:#c8f02e}
.swb-g,.swb-hot{position:absolute;left:0;top:0;opacity:0;white-space:nowrap}
.swb-gc{color:#14e0c8}.swb-gb{color:#2e66ff}
.swb-hot,.swb-gw{${HOT_TEXT}}
.swb-ul{position:absolute;left:0;right:0;top:.92em;height:.075em;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
.swb-ulT{position:absolute;left:0;top:.9575em;width:100%;height:0;opacity:0}
.swb-ulg{position:absolute;left:-.3em;top:-.3em;width:.6em;height:.6em;border-radius:50%;background:radial-gradient(closest-side,rgb(var(--hot)),rgb(var(--lime)/.7) 35%,transparent)}
.swb-tag{position:absolute;left:10.5cqw;top:46cqw;width:64cqw;font-size:2.55cqw;line-height:1.32;font-weight:500;color:rgb(242 243 238/.66);max-height:2.64em;overflow:hidden;text-wrap:balance}
.swb-ctarow{position:absolute;left:10.5cqw;top:55cqw;height:5.6cqw;display:flex;align-items:center;gap:1.8cqw}
.swb-ctaw{position:relative;height:100%}
.swb-cta{position:relative;box-sizing:border-box;height:100%;display:flex;align-items:center;gap:1.1cqw;padding:0 2.2cqw 0 2.8cqw;border-radius:5cqw;background:#c8f02e;color:#0a0a0b;font-weight:700;font-size:2.7cqw;letter-spacing:${CTA_LS}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap;box-shadow:0 0 3.5cqw rgb(200 240 46/.28)}
.swb-ctal{display:inline-block;overflow:hidden;line-height:1.3}
.swb-cl{display:inline-block}
.swb-ctah{position:absolute;inset:0;border-radius:inherit;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgb(var(--lime)/.85)}
.swb-ctaa{display:block;flex:none;width:2.4cqw;height:2.4cqw}
.swb-fo{position:absolute;opacity:0;border:0 solid #c8f02e}
.swb-fe{position:absolute;background:#c8f02e;transform-origin:0 50%;transform:scaleX(0);box-shadow:0 0 1cqw rgb(var(--lime)/.6)}
.swb-wt{position:absolute;left:-2.6cqw;top:-2.6cqw;width:5.2cqw;height:5.2cqw;border-radius:50%;opacity:0;background:radial-gradient(closest-side,#fff 0,#fff 16%,rgb(var(--lime)/.85) 34%,rgb(var(--lime)/.2) 62%,transparent)}
.swb-sec{height:100%;width:14cqw;border-radius:5cqw;border:1px solid rgb(242 243 238/.22);display:flex;align-items:center;justify-content:center}
.swb-sec i{width:7cqw;height:.9cqw;border-radius:1cqw;background:rgb(242 243 238/.22)}
.swb-rip{position:absolute;left:50%;top:50%;width:8cqw;height:8cqw;margin:-4cqw 0 0 -4cqw;border-radius:50%;border:max(1px,.3cqw) solid rgb(var(--lime)/.9);opacity:0}
.swb-cur{position:absolute;left:50%;top:50%;width:3.6cqw;height:4.6cqw;opacity:0;transform-origin:0 0}
.swb-cur svg{display:block;width:100%;height:100%;overflow:visible}
.swb-com{position:absolute;left:0;top:0;width:11cqw;height:3.2cqw;margin:-1.6cqw 0 0 -9.4cqw;transform-origin:85.45% 50%;opacity:0;background:radial-gradient(1.6cqw 1.6cqw at 85.45% 50%,#fff,#fff 22%,rgb(var(--lime)/.8) 46%,rgb(var(--lime)/.18) 72%,transparent),linear-gradient(90deg,transparent,rgb(var(--lime)/.35) 40%,rgb(var(--lime)/.85) 80%,#fff) 0 50%/85.45% 1cqw no-repeat}
.swb-k100{position:absolute;left:12cqw;top:69.4cqw;width:10cqw;height:4.2cqw;line-height:4.2cqw;text-align:center;font-family:${MONO};font-weight:800;font-size:2.3cqw}
.swb-kseo{position:absolute;left:40.25cqw;top:65.4cqw;font-family:${MONO};font-weight:800;font-size:2.2cqw;color:#14e0c8;transform-origin:0 50%}
.swb-k38{position:absolute;left:67.5cqw;top:65cqw;font-family:${HEAD};font-weight:800;font-size:3.3cqw;line-height:1.1;color:#c8f02e;white-space:nowrap;font-variant-numeric:tabular-nums;transform-origin:0 50%}
.swb-reel{display:inline-block;height:1.1em;overflow:hidden;vertical-align:top}
.swb-reel>span{display:block;white-space:pre;line-height:1.1}
.swb-rlT{transform:translateY(-75%)}
.swb-rlO{transform:translateY(-94.737%)}
.swb-badge{position:absolute;left:76.5cqw;top:84.25cqw;height:3.6cqw;padding:0 1.1cqw;border-radius:2cqw;display:flex;align-items:center;gap:.8cqw;font-family:${MONO};font-weight:800;font-size:1.7cqw;letter-spacing:.08em;white-space:nowrap;color:rgb(242 243 238/.35);border:1px solid rgb(242 243 238/.14)}
.swb-lon{position:absolute;inset:-1px;border-radius:inherit;display:flex;align-items:center;gap:.8cqw;padding:0 1.1cqw;color:#22d38c;border:1px solid rgb(var(--green)/.55);background:rgb(var(--green)/.1);box-shadow:0 0 2.4cqw rgb(var(--green)/.3);transform-origin:50% 50%}
.swb-ld{position:relative;width:1cqw;height:1cqw;border-radius:50%;background:rgb(242 243 238/.3)}
.swb-lon .swb-ld{background:#22d38c}
.swb-lr{position:absolute;inset:0;border-radius:50%;border:1px solid #22d38c;opacity:.4;transform:scale(1.8)}
`;

/* ───────────────────────────── markup ────────────────────────────────────── */

const CACHE = new Map<string, ReturnType<typeof build>>();
function getBuild(title: string, cta: string) {
  const key = `${title}\u0001${cta}`;
  let b = CACHE.get(key);
  if (!b) {
    b = build(title, cta);
    CACHE.set(key, b);
  }
  return b;
}

const A = (n: string) => `swb-a swb-${n}`;
const v = (o: Record<string, string | number | undefined>) => o as CSSProperties;
/** absolutely positioned box, in viewBox units relative to the root */
const at = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: P(x),
  top: P(y),
  width: cq(w),
  height: cq(h),
});
/** outline pieces: edges grow with the tracer tips, corners pop as tips pass */
const SW = 1.6; // outline width (units)
const CO = RR + SW / 2; // corner box
const EDGES = [
  { id: "eT", box: [WX + RR, WY - SW / 2, WR - WX - 2 * RR, SW], o: "0 50%", bg: "linear-gradient(90deg,#14e0c8,#22d38c)" },
  { id: "eR", box: [WR - SW / 2, WY + RR, SW, WB - WY - 2 * RR], o: "50% 0", bg: "linear-gradient(#22d38c,#2e66ff)" },
  { id: "eL", box: [WX - SW / 2, WY + RR, SW, WB - WY - 2 * RR], o: "50% 0", bg: "linear-gradient(#14e0c8,#22d38c)" },
  { id: "eB", box: [WX + RR, WB - SW / 2, WR - WX - 2 * RR, SW], o: "0 50%", bg: "linear-gradient(90deg,#22d38c,#2e66ff)" },
];
const CORNERS = [
  { id: "cTL", box: [WX - SW / 2, WY - SW / 2], v: "Top", h: "Left", c: "#14e0c8" },
  { id: "cTR", box: [WR - RR, WY - SW / 2], v: "Top", h: "Right", c: "#22d38c" },
  { id: "cBR", box: [WR - RR, WB - RR], v: "Bottom", h: "Right", c: "#2e66ff" },
  { id: "cBL", box: [WX - SW / 2, WB - RR], v: "Bottom", h: "Left", c: "#22d38c" },
];

function Sk({ x, y, w, h = 3.6, a }: { x: number; y: number; w: number; h?: number; a: number }) {
  return <i className="swb-abs swb-sk" style={{ ...at(x, y, w, h), background: `rgb(242 243 238/${f(a)})` }} />;
}

/** streak sparks riding a tracer tip */
const TIP_SPARKS = [
  [-40, 2.5],
  [0, 3.1],
  [40, 2.3],
] as const;
function Sparks({ name, base = 0 }: { name: string; base?: number }) {
  return (
    <>
      {TIP_SPARKS.map(([d, w], k) => (
        <i key={k} className={`swb-sp ${A(name)}`} style={v({ rotate: `${f(base + d, 1)}deg`, width: `${w}cqw` })} />
      ))}
    </>
  );
}
/** gravity sparks `${name}x${j}` at an anchor (optionally offset in units) */
function GSparks({ name, n, dy = 0 }: { name: string; n: number; dy?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, j) => (
        <i key={j} className={`swb-gs ${A(`${name}x${j}`)}`} style={dy ? { top: cq(dy) } : undefined} />
      ))}
    </>
  );
}

function Letters({ word, track }: { word: string; track: string }) {
  const chars = Array.from(word);
  return (
    <>
      {chars.map((ch, j) => (
        <span key={j} className={`swb-c ${A(track)}`} style={v({ "--d": f(j - (chars.length - 1) / 2, 1) })}>
          {ch}
        </span>
      ))}
    </>
  );
}

function Tracer({ id, o, c }: { id: string; o: Pt; c: string }) {
  return (
    <div className={`swb-tr swb-c-${c} ${A(`${id}o`)}`} style={{ left: P(o[0]), top: P(o[1]) }}>
      <i className="swb-em" />
      <div className={`swb-mv ${A(`${id}m`)}`}>
        <i className="swb-tipo">
          <i className={`swb-tip ${A(`${id}g`)}`} />
          <Sparks name={`${id}s`} base={180} />
        </i>
      </div>
    </div>
  );
}

function Fan({ id, o, c }: { id: string; o: Pt; c: string }) {
  return (
    <div className={`swb-fan swb-c-${c} ${A("fO")}`} style={{ left: P(o[0]), top: P(o[1]) }}>
      <i className="swb-em" />
      <div className={`swb-fanr ${A(id)}`}>
        {[-2, -1, 0, 1, 2].map((k) => (
          <i key={k} className={`swb-fb ${A("fS")}`} style={v({ "--k": k, opacity: f(1 - Math.abs(k) * 0.14) })} />
        ))}
      </div>
    </div>
  );
}

function Head({ k }: { k: number }) {
  const h = HEADS[k];
  return (
    <div className={`swb-hd swb-c-${h.c} ${A(`${h.id}p`)}`} style={{ transform: tl(h.home) }}>
      <i className={`swb-hb ${A(`${h.id}b`)}`} />
      <i className={`swb-hfl ${A(`${h.id}f`)}`} />
      <i className="swb-hc" />
    </div>
  );
}

/** the CTA forge outline: per weld tip, corner arc → straight edge → corner arc */
function ForgeOutline({ w }: { w: number }) {
  const o = SW_C / 2;
  const R = cq(CR + o);
  const b = cq(SW_C);
  const corner = (name: string, x: number, y: number, vv: string, hh: string) => (
    <i
      key={name}
      className={`swb-fo ${A(name)}`}
      style={v({
        ...at(x, y, CR + o, CR + o),
        [`border${vv}Width`]: b,
        [`border${hh}Width`]: b,
        [`border${vv}${hh}Radius`]: R,
      })}
    />
  );
  const xR = CTA_X + w - CR;
  return (
    <>
      {corner("fc0a", CTA_X - o, CTA_Y - o, "Top", "Left")}
      <i className={`swb-fe ${A("fe0")}`} style={at(CTA_X + CR, CTA_Y - o, w - 2 * CR, SW_C)} />
      {corner("fc0b", xR, CTA_Y - o, "Top", "Right")}
      {corner("fc1a", CTA_X - o, CTA_Y + CR, "Bottom", "Left")}
      <i className={`swb-fe ${A("fe1")}`} style={at(CTA_X + CR, CTA_Y + CTA_H - o, w - 2 * CR, SW_C)} />
      {corner("fc1b", xR, CTA_Y + CR, "Bottom", "Right")}
      <i className={`swb-wt ${A("wt0")}`} />
      <i className={`swb-wt ${A("wt1")}`} />
    </>
  );
}

export default function SitesWebMotionB({
  className,
  title = "Sites web qui convertissent",
  tagline = "Des sites rapides, pensés pour transformer le visiteur en client.",
  cta = "Réserver un appel",
}: SitesWebMotionProps) {
  const { css, lay } = getBuild(title, cta);
  const { fs, words, last, label, glyphs, cfs, ctaW }: Layout = lay;
  const { V, R, T: LT, X, O_CX, O_CY, O_R } = LOGO_GEOMETRY;
  const origin = (w: Word) => `${f((w.ox / w.w) * 100, 2)}% 80%`;

  return (
    <div className={`illu-motion swb-root${className ? ` ${className}` : ""}`} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`swb-L ${A("shake")}`}>
        {/* ── back layer: concert fans ── */}
        <div className="swb-L">
          <Fan id="fLr" o={EBL} c="lime" />
          <Fan id="fRr" o={EBR} c="cyan" />
        </div>

        <i className="swb-grid" />
        <i className="swb-rail" />
        <i className={`swb-floor ${A("floor")}`} />

        {/* ── the website (tilts as one plane in the hold) ── */}
        <div className={`swb-win ${A("tilt")}`}>
          <i className={`swb-abs swb-body ${A("body")}`} style={at(WX, CH, WR - WX, WB - CH)} />

          <div className={`swb-L ${A("zChr")}`}>
            <i className={`swb-abs swb-chrome ${A("chr")}`} style={at(WX, WY, WR - WX, CH - WY)} />
            {DOTS.map(([x, y], i) => (
              <i
                key={i}
                className={`swb-abs swb-dot ${A(`dot${i}`)}`}
                style={{ ...at(x - 3.4, y - 3.4, 6.8, 6.8), background: `rgb(200 240 46/${f(1 - i * 0.27)})` }}
              />
            ))}
            <i className={`swb-abs swb-urlp ${A("url")}`} style={at(84, 36, 176, 12)} />
            <div className={`swb-urlt ${A("urlT")}`}>
              <svg viewBox="0 0 8 10" fill="none">
                <rect x=".5" y="4" width="7" height="5.5" rx="1.2" fill="#22d38c" />
                <path d="M2.2 4.2V2.9a1.8 1.8 0 0 1 3.6 0v1.3" stroke="#22d38c" strokeWidth="1.1" />
              </svg>
              vortx.lu
            </div>
            <div className={`swb-ok ${A("ok")}`}>
              <i />
              200 OK
            </div>
          </div>

          {/* outline drawn by the two tracers, welded white-hot */}
          <i className={`swb-abs swb-frg ${A("frG")}`} style={at(WX, WY, WR - WX, WB - WY)} />
          <i className={`swb-abs swb-riml ${A("rimL")}`} style={at(WX, WY, WR - WX, WB - WY)} />
          {EDGES.map((e) => (
            <i
              key={e.id}
              className={`swb-abs ${A(e.id)}`}
              style={{ ...at(e.box[0], e.box[1], e.box[2], e.box[3]), background: e.bg, transformOrigin: e.o }}
            />
          ))}
          {CORNERS.map((c) => (
            <i
              key={c.id}
              className={`swb-abs ${A(c.id)}`}
              style={v({
                ...at(c.box[0], c.box[1], CO, CO),
                [`border${c.v}`]: `${cq(SW)} solid ${c.c}`,
                [`border${c.h}`]: `${cq(SW)} solid ${c.c}`,
                [`border${c.v}${c.h}Radius`]: cq(CO),
              })}
            />
          ))}
          <i className={`swb-abs swb-rimw ${A("rimW")}`} style={at(WX, WY, WR - WX, WB - WY)} />

          <div className={`swb-L ${A("zNav")}`}>
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
            {MENU_X.map((x, i) => (
              <i key={x} className={`swb-abs swb-mb ${A(`menu${i}`)}`} style={at(x, 69.75, 28, 4.5)} />
            ))}
            <span className={`swb-abs swb-navcta ${A("navcta")}`} style={at(306, 63, 50, 18)}>
              <i />
            </span>
          </div>

          {/* headline guides laid down by the printhead (temporary) */}
          {[136.5, 170].map((y) => (
            <i key={y} className={`swb-abs swb-guide swb-x ${A("guide")}`} style={at(42, y, 316, 1)} />
          ))}

          {/* cards: frames extruded by the printhead, contents shot in by the bolts */}
          <div className={`swb-L ${A("zCards")}`}>
            <div className={`swb-abs swb-crow ${A("cards")}`} style={at(42, CARD_Y, 316, CARD_H)}>
              {CARD_X.map((x) => (
                <i key={x} className="swb-abs swb-card" style={{ left: `${f(((x - 42) / 316) * 100, 3)}%` }} />
              ))}
            </div>
            {CARD_X.map((x, k) => (
              <i
                key={x}
                className={`swb-abs swb-cf swb-x ${A(`cf${k}`)}`}
                style={{ ...at(x, CARD_Y, CARD_W, CARD_H), borderColor: ["#2e66ff", "#22d38c", "#c8f02e"][k] }}
              />
            ))}
            <div className={`swb-L ${A("cc0")}`}>
              <span className={`swb-abs swb-ringw ${A("ring")}`} style={at(68 - 15, 286 - 15, 30, 30)}>
                <svg viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r={RING_R} stroke="#f2f3ee" strokeOpacity=".09" strokeWidth="3.2" />
                  <circle cx="15" cy="15" r={RING_R} stroke="#22d38c" strokeWidth="3.2" />
                  <circle cx="15" cy={15 - RING_R} r="2.2" fill="#c8f02e" />
                </svg>
              </span>
              <div className={`swb-k100 ${A("k100")}`}>100</div>
              <Sk x={92} y={277} w={38} a={0.18} />
              <Sk x={92} y={285.5} w={30} a={0.12} />
              <Sk x={92} y={294} w={22} a={0.09} />
            </div>
            <div className={`swb-L ${A("cc1")}`}>
              <div className={`swb-kseo ${A("kseo")}`}>SEO</div>
              <Sk x={161} y={280} w={40} a={0.16} />
              <Sk x={161} y={288.5} w={30} a={0.11} />
              <Sk x={161} y={297} w={35} a={0.08} />
              {BAR_H.map((h, i) => (
                <i key={i} className={`swb-abs swb-barv ${A(`bar${i}`)}`} style={at(211 + i * 9.5, 308 - h, 6.5, h)} />
              ))}
            </div>
            <div className={`swb-L ${A("cc2")}`}>
              <i className={`swb-abs swb-cbl ${A("cbl")}`} style={at(268, CHART_BASE, 84, 0.9)} />
              {CBAR.map((b, i) => (
                <i key={i} className={`swb-abs swb-cbar ${A(`cb${i}`)}`} style={at(b.x, CHART_BASE - b.h, b.w, b.h)} />
              ))}
              {CHART.slice(1).map((q, i) => {
                const p = CHART[i];
                return (
                  <i
                    key={i}
                    className={`swb-abs swb-cseg ${A(`cs${i}`)}`}
                    style={{
                      left: P(p[0]),
                      top: P(p[1]),
                      width: cq(dist(p, q)),
                      rotate: `${f(angle(p, q))}deg`,
                      background: `linear-gradient(90deg,${chartColor(p[0])},${chartColor(q[0])})`,
                    }}
                  />
                );
              })}
              {[1, 3, 5].map((i, k) => {
                const r = k === 2 ? 3.4 : 2.6;
                return (
                  <i key={i} className={`swb-abs swb-node ${A(`node${k}`)}`} style={at(CHART[i][0] - r, CHART[i][1] - r, 2 * r, 2 * r)} />
                );
              })}
              <i className={`swb-abs swb-nh ${A("pz")}`} style={at(CHART[5][0] - 3.4, CHART[5][1] - 3.4, 6.8, 6.8)} />
              <div className={`swb-k38 ${A("k38")}`}>
                +
                <span className="swb-reel">
                  <span className={A("rlT")}>{"0\n1\n2\n3"}</span>
                </span>
                <span className="swb-reel">
                  <span className={A("rlO")}>{"0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1\n2\n3\n4\n5\n6\n7\n8"}</span>
                </span>
                {" %"}
              </div>
            </div>
          </div>

          {/* footer + LIVE badge */}
          <div className={`swb-L ${A("zFoot")}`}>
            <div className={`swb-L ${A("foot")}`}>
              <i className="swb-abs swb-sk" style={{ ...at(42, 327.5, 316, 1), background: "rgb(242 243 238/.08)" }} />
              <i className="swb-abs swb-dot" style={{ ...at(43.8, 339.8, 8.4, 8.4), background: "#c8f02e" }} />
              <Sk x={58} y={342} w={40} h={4} a={0.15} />
              <Sk x={106} y={342} w={30} h={4} a={0.11} />
              <Sk x={144} y={342} w={22} h={4} a={0.08} />
            </div>
            <div className={`swb-badge ${A("liveb")}`}>
              <i className="swb-ld" />
              LIVE
              <span className={`swb-lon ${A("live")}`}>
                <i className="swb-ld">
                  <i className={`swb-lr ${A("pz")}`} />
                </i>
                LIVE
              </span>
            </div>
          </div>

          {/* ── the website: live text, kinetic ── */}
          <div className="swb-L">
            <div className={`swb-eye ${A("eye")}`}>{"</> Next.js"}</div>

            <div className="swb-title" style={fs < FS0 ? { fontSize: cq(fs) } : undefined}>
              {words.length > 0 && (
                <span className="swb-l1">
                  {words.map((w) => {
                    return (
                      <Fragment key={w.i}>
                        {w.i > 0 && " "}
                        <span className="swb-ww">
                          <span className={`swb-w ${A(`w${w.i}`)}`} style={{ transformOrigin: origin(w) }}>
                            <Letters word={w.text} track={`t${w.i}`} />
                            <span className={`swb-hot ${A(`ho${w.i}`)}`}>{w.text}</span>
                          </span>
                          <span className={`swb-hit swb-c-${HEADS[SLOT_HEAD[w.slot]].c}`}>
                            {w.first && <i className={`swb-hf ${A(`hf${w.i}`)}`} />}
                            <GSparks name={`hs${w.i}`} n={4} dy={14} />
                          </span>
                        </span>
                      </Fragment>
                    );
                  })}
                </span>
              )}
              <span className="swb-l2">
                <span className="swb-ww swb-wwL">
                  <span className={`swb-g swb-gc ${A("gc")}`}>
                    <span className={`swb-w ${A("wL")}`} style={{ transformOrigin: origin(last) }}>
                      {last.text}
                    </span>
                  </span>
                  <span className={`swb-g swb-gb ${A("gb")}`}>
                    <span className={`swb-w ${A("wL")}`} style={{ transformOrigin: origin(last) }}>
                      {last.text}
                    </span>
                  </span>
                  <span className={`swb-w ${A("wL")}`} style={{ transformOrigin: origin(last) }}>
                    <Letters word={last.text} track="tL" />
                  </span>
                  <span className={`swb-g swb-gw ${A("gw")}`}>
                    <span className={`swb-w ${A("wL")}`} style={{ transformOrigin: origin(last) }}>
                      {last.text}
                    </span>
                  </span>
                  <i className={`swb-ul ${A("ul")}`} />
                  <i className={`swb-ulT ${A("ulT")}`}>
                    <i className="swb-ulg" />
                  </i>
                  <span className="swb-hit swb-c-lime">
                    <i className={`swb-bigf ${A("bigF")}`} />
                    <i className={`swb-hf ${A("hfL")}`} />
                    <GSparks name="hsL" n={6} dy={14} />
                  </span>
                </span>
              </span>
            </div>

            <div className={`swb-tag ${A("tag")}`}>{tagline}</div>

            <div className={`swb-ctarow ${A("zCta")}`}>
              <div className="swb-ctaw">
                <div className={`swb-cta ${A("cta")}`} style={{ width: cq(ctaW), ...(cfs < CTA_FS0 ? { fontSize: cq(cfs) } : null) }}>
                  <span className="swb-ctal">
                    {Array.from(label).map((ch, i) =>
                      glyphs[i] < 0 ? (
                        " "
                      ) : (
                        <span key={i} className={`swb-cl ${A(`cl${glyphs[i]}`)}`}>
                          {ch}
                        </span>
                      ),
                    )}
                  </span>
                  <svg className={`swb-ctaa ${A("ctaA")}`} viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <i className={`swb-ctah ${A("ctaH")}`} />
                </div>
                <span className="swb-hit swb-c-lime">
                  <i className={`swb-hf ${A("ctaF")}`} />
                  <GSparks name="ck" n={5} />
                </span>
                <span className="swb-hit swb-c-lime" style={{ left: "100%" }}>
                  <i className={`swb-hf ${A("fgX")}`} />
                  <GSparks name="fg" n={4} />
                </span>
                <i className={`swb-rip ${A("rip1")}`} />
                <i className={`swb-rip ${A("rip2")}`} />
                <span className={`swb-cur ${A("cur")}`}>
                  <svg viewBox="0 0 18 26">
                    <path d="M0 0v22l6-6 5 10 4-2-5-10h8Z" fill="#0a0a0b" stroke="#f2f3ee" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className={`swb-sec ${A("sec")}`}>
                <i />
              </div>
            </div>
            <div className="swb-L">
              <ForgeOutline w={ctaW} />
            </div>
          </div>

          <div className="swb-glass" style={at(WX, WY, WR - WX, WB - WY)}>
            <i className={`swb-sheen ${A("sheen")}`} />
          </div>
          <div className={`swb-vscan ${A("vscan")}`}>
            <i className="swb-vw" />
            <i className="swb-vl" />
            <i className="swb-vf" style={{ top: "8em" }} />
            <i className="swb-vf" style={{ top: "108em" }} />
          </div>
        </div>

        {/* ── front FX: printhead, ricochet bolts, comets, tracers, rail heads ── */}
        <div className="swb-L">
          <div className={`swb-scan ${A("scan")}`}>
            <i className="swb-scanw" />
            <i className="swb-scanl" />
            <i className="swb-scanf" style={{ left: "8em" }} />
            <i className="swb-scanf" style={{ left: "108em" }} />
          </div>

          {SHOTS.map((s, k) => (
            <div key={k} className={`swb-shot swb-c-${s.c} ${A(`s${k}o`)}`}>
              {s.segs.slice(1).map((g, j) => (
                <i
                  key={j}
                  className={`swb-seg ${A(`s${k}g${j}`)}`}
                  style={{ left: P(g.from[0]), top: P(g.from[1]), width: cq(g.len), rotate: `${f(g.ang)}deg` }}
                />
              ))}
              {s.segs.slice(1).map((g, j) => (
                <i key={j} className={`swb-bf ${A(`s${k}f${j}`)}`} style={{ left: P(g.from[0]), top: P(g.from[1]) }} />
              ))}
              <i className="swb-pt" style={{ left: P(s.tgt[0]), top: P(s.tgt[1]) }}>
                <i className={`swb-hf ${A(`s${k}h`)}`} />
                <GSparks name={`s${k}`} n={4} />
              </i>
            </div>
          ))}

          <div className="swb-L swb-c-lime">
            {[1, 3, 5].map((ni, i) => (
              <Fragment key={ni}>
                <i className={`swb-com ${A(`com${i}`)}`} />
                <i className={`swb-bf ${A(`cfl${i}`)}`} style={{ left: P(CHART[ni][0]), top: P(CHART[ni][1]) }} />
              </Fragment>
            ))}
          </div>

          <Tracer id="bl" o={EBL} c="lime" />
          <Tracer id="br" o={EBR} c="cyan" />
          <Tracer id="tl" o={ETL} c="cyan" />
          <Tracer id="tr" o={ETR} c="lime" />

          {HEADS.map((_, k) => (
            <Head key={k} k={k} />
          ))}
        </div>

        <i className={`swb-flash ${A("flash")}`} />
      </div>
    </div>
  );
}
