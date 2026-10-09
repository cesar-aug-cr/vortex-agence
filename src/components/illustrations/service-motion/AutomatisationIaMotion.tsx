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
  FS_MAX,
  HW,
  HX,
  HY,
  layout,
  LINE,
  PUNCT,
  PUNCT_PULL,
  SPACE_EM,
  TLS,
  type Group,
  type Layout,
} from "./AutomatisationIaMotion.layout";
import { ScrollPause } from "./ScrollPause";
import type { ServiceMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  "AUTOPILOT" — hero motion graphic of /services/automatisation-ia
 * ─────────────────────────────────────────────────────────────────────────────
 *  Same family as the Sites web laser show (sites-web-motion): dark stage,
 *  four rail-mounted laser heads (lime left, cyan + green top, blue right) that
 *  glide, charge and fire white-hot beams; flares, gravity spark sprays,
 *  kinetic type slams. One master loop, T = 14 s: every beat is a keyframe
 *  percentage of T — no animation-delay, no fill-mode, no secondary loop.
 *
 *  Story: the lasers BUILD an automation (trigger → AI → CRM → e-mail / chat),
 *  then step back; the automation does the repetitive work by itself, and its
 *  results complete the headline.
 *
 *  0.14–0.52  IGNITION. The two top heads lock onto the middle of the editor
 *             bar and pull it open to both walls; the service title rises in.
 *  0.64–1.68  NODE FORGE. Five shots, five stamps: each head's beam lands, the
 *             node materialises big, rotated, slams down (squash, rebound) in
 *             a white-hot bloom of its colour, sparks fly — trigger (lime),
 *             AI (cyan, orbit ring), CRM (green), e-mail + chat (blue; the
 *             chat shot crosses the whole panel).
 *  1.84–2.66  WELD. A weld front runs down the flow: the connectors exist only
 *             behind it, each weld tip ridden by a tracking beam; the branch
 *             to e-mail / chat is welded by two heads at once.
 *  2.68       The circuit flashes white-hot and cools to its gradients.
 *  2.82–3.34  HEADLINE (the tagline). "Plus de ___," — the climax slot is a
 *             pulsing lime blank — "moins de tâches répétitives." slams in,
 *             group by group, each shot by a head (fitted pre-slam scale).
 *  3.40       Three repetitive task cards (↻ ×24…) deal in, the results card
 *             ("0") pops. The heads step back along the rail: hands off.
 *  3.63–6.90  THE AUTOMATION RUNS (three runs, accelerating): a scan line reads
 *             a card, it is checked (✓) and swept up into the trigger; a data
 *             packet races trigger → AI (the assistant bubble opens and
 *             "types" one line per run — skeleton lines, typing dots) → CRM →
 *             splits to e-mail and chat; a result comet arcs into the results
 *             card: the counter rolls 0 → +42 → +87 → +128, the bars climb.
 *             Every arrival kicks its node.
 *  5.80–6.96  CTA FORGE where the tasks were: two weld tips (two beams each)
 *             trace the pill and collide on the right — white-hot → lime,
 *             the label rises in a skewed wave.
 *  7.05–7.66  CLIMAX — "résultats": the four heads converge on the blank, the
 *             word slams in lime (white-hot copy, chromatic ghost, flash,
 *             camera shake), a laser underline; "−12 h" pops on the results.
 *  8.20       PAYOFF: "24/7" + "LIVE" pop in the bar, the trigger and the AI
 *             bloom, the circuit flashes; the heads dim and drift — nobody
 *             drives it any more.
 *  8.30–12.1  HOLD. The automation streams on its own: a packet run every
 *             0.6 s, nodes pulsing, the counter keeps climbing (+171 → +256),
 *             the assistant re-types an answer, the headline waves, the scene
 *             tilts in 3D. The AI orbit ring turns the whole loop.
 *  12.7–13.6  ERASE. A printhead sweeps up and zaps everything it crosses;
 *             the heads glide home and recharge; seam.
 *
 *  Performance (same rules as sites-web-motion): only transform / opacity
 *  animate, on HTML boxes (SVG is static artwork); 66 running animations:
 *   · the connectors are ONE static drawing revealed by a clip window whose
 *     edge is the weld front (counter-translated pair); their white-hot state
 *     is one overlay (opacity);
 *   · one-shot effects (flares, spark sprays, packets, comets) are POOLED:
 *     a few sprites jump, invisible, from event to event; a flare only ever
 *     plays on a sprite of its own colour;
 *   · node "kicks", the bubble's re-typing, the counter's later steps, the
 *     hold-phase stream are extra keyframes of existing animations, not new
 *     animations;
 *   · kinetic type moves per word group.
 *  Root z-index:1 (its layers paint last), content-visibility skip off-screen
 *  (absolutely positioned inner wrapper overhanging by 3rem), <ScrollPause>
 *  freezes the scene while the page scrolls.
 *
 *  Reduced motion: the global rule collapses every animation, so the
 *  un-animated base styles ARE the poster: the finished, live automation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

type Pt = [number, number];
type Col = "lime" | "cyan" | "green" | "blue";
const eIO = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2);
const eS = (u: number) => u * u * (3 - 2 * u);
const clamp01 = (u: number) => Math.max(0, Math.min(1, u));
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
const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const plen = (p: Pt[]) => p.reduce((s, q, i) => (i ? s + dist(p[i - 1], q) : 0), 0);
function pat(p: Pt[], d: number): Pt {
  for (let i = 1; i < p.length; i++) {
    const l = dist(p[i - 1], p[i]);
    if (d <= l || i === p.length - 1) {
      const u = l ? clamp01(d / l) : 0;
      return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * u, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * u];
    }
    d -= l;
  }
  return p[p.length - 1];
}
const lerp = (a: Pt, b: Pt, u: number): Pt => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
const angle = (a: Pt, b: Pt) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 3): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * (i + 1)) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });
const cubic = (a: Pt, b: Pt, c: Pt, d: Pt, n = 20): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const u = i / n;
    const v = 1 - u;
    return [
      v * v * v * a[0] + 3 * v * v * u * b[0] + 3 * v * u * u * c[0] + u * u * u * d[0],
      v * v * v * a[1] + 3 * v * v * u * b[1] + 3 * v * u * u * c[1] + u * u * u * d[1],
    ] as Pt;
  });
/** the point of a polyline (monotone in x) at abscissa x */
function atX(p: Pt[], x: number): Pt {
  if (x <= p[0][0]) return p[0];
  for (let i = 1; i < p.length; i++)
    if (x <= p[i][0]) {
      const u = (x - p[i - 1][0]) / (p[i][0] - p[i - 1][0] || 1);
      return lerp(p[i - 1], p[i], u);
    }
  return p[p.length - 1];
}
/** viewBox units → % of the (square) root */
const P = (u: number) => `${f(u / 4, 3)}%`;
/** viewBox units → cqw (sizes) */
const cq = (u: number) => `${f(u / 4, 3)}cqw`;
/** translate() of a point in units, 0.1cqw precision */
const tr2 = (x: number, y: number) => `translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw)`;
const svgPath = (p: Pt[]) => `M${p.map(([x, y]) => `${f(x, 2)} ${f(y, 2)}`).join("L")}`;

/* ── the workflow graph ── */
const NODES = {
  trg: { c: [62, 186] as Pt, s: 42, col: "lime" as Col },
  ai: { c: [153, 186] as Pt, s: 52, col: "cyan" as Col },
  crm: { c: [244, 186] as Pt, s: 42, col: "green" as Col },
  eml: { c: [338, 150] as Pt, s: 38, col: "blue" as Col },
  cht: { c: [338, 222] as Pt, s: 38, col: "blue" as Col },
};
type NodeId = keyof typeof NODES;
const NIDS = Object.keys(NODES) as NodeId[];
const pR = (n: NodeId): Pt => [NODES[n].c[0] + NODES[n].s / 2, NODES[n].c[1]];
const pL = (n: NodeId): Pt => [NODES[n].c[0] - NODES[n].s / 2, NODES[n].c[1]];
const XM = (pR("crm")[0] + pL("eml")[0]) / 2;
/** connector centre lines: trigger → AI → CRM → e-mail / chat */
const CONN: Pt[][] = [
  [pR("trg"), pL("ai")],
  [pR("ai"), pL("crm")],
  cubic(pR("crm"), [XM, NODES.crm.c[1]], [XM, NODES.eml.c[1]], pL("eml")),
  cubic(pR("crm"), [XM, NODES.crm.c[1]], [XM, NODES.cht.c[1]], pL("cht")),
];
const CONN_COL: [Col, Col][] = [
  ["lime", "cyan"],
  ["cyan", "green"],
  ["green", "blue"],
  ["green", "blue"],
];
/** connector clip box (all four connectors + their glow) */
const CB = { x: 76, y: 136, w: 250, h: 100 };
/** packet routes: port to port, tucked a little under both nodes (they hide the ends) */
const tuck = (p: Pt[]): Pt[] => [[p[0][0] - 8, p[0][1]], ...p, [p[p.length - 1][0] + 8, p[p.length - 1][1]]];
const ROUTE: Pt[][] = CONN.map(tuck);

/* ── editor bar, assistant bubble, task deck, results card ── */
const BAR = { x: 26, y: 22, w: 348, h: 20 };
const BAR_CY = BAR.y + BAR.h / 2;
const CHIP247 = { x: 296, w: 31 };
const LIVEB = { x: 332, w: 37 };
const BUB = { x: 102, y: 230, w: 126, h: 50 };
const BUB_LW = [98, 82, 56];
const BUB_LY = [252, 261.5, 271];
const REPS = ["×24", "×60", "×12"];
const CARD_X = 30;
const CARD_W = 168;
const CARD_H = 18;
const CARD_Y = [300, 322, 344];
const RES = { x: 222, y: 300, w: 148, h: 64 };
const REEL = ["0", "+42", "+87", "+128", "+171", "+213", "+256"];
const BAR_H = [9, 14, 19, 25, 31];
const BSTEP = [0.12, 0.36, 0.56, 0.74, 0.84, 0.92, 1];
const REEL_C: Pt = [RES.x + 34, RES.y + 38];

/* ── rail heads (dashed rail inset RI from the panel edge) ── */
const RI = 11;
const RHI = 400 - RI;
const HEADS = [
  { id: "hL", c: "lime" as Col, home: [RI, 300] as Pt },
  { id: "hT", c: "cyan" as Col, home: [130, RI] as Pt },
  { id: "hU", c: "green" as Col, home: [270, RI] as Pt },
  { id: "hR", c: "blue" as Col, home: [RHI, 300] as Pt },
];
const [HL, HT, HU, HR] = [0, 1, 2, 3];

/* ───────────────────────────── master beats (ms) ─────────────────────────── */

const PRE = 100; // beam lands → node / word slams PRE ms later
const PRE_L = 150;
const BAR_A = 140; // the bar is pulled open
const BAR_Z = 520;
const BAR_TT = 470; // title rises
const N_SLAM: Record<NodeId, number> = { trg: 740, ai: 980, crm: 1220, eml: 1460, cht: 1680 };
const N_HEAD: Record<NodeId, number> = { trg: HL, ai: HT, crm: HU, eml: HR, cht: HL };
const W1: [number, number] = [1840, 2040];
const W2: [number, number] = [2100, 2300];
const W3: [number, number] = [2360, 2660];
const HOT = 2680;
const SLOT = [2920, 3130, 3340];
const SLOT_HEAD = [HT, HL, HU];
const DEAL = 3400;
const DEAL_D = 230; // a card slides in
const RUN = [3900, 4600, 5200];
const SCAN_D = 230; // the automation reads a card before checking it
const BUB_T = RUN[0] + 640;
const FG_A = 5800; // CTA forge
const FG_Z = 6350;
const CL = 7200; // climax
const LIVE_T = 8200;
const STREAM = [8300, 8900, 9500, 10100, 10700, 11300];
const STREAM_CM = [0, 2, 4]; // stream runs that also bring a result
const WAVE = 9750;
const RETYPE = 10350;
const TILT = [10500, 11000, 11650, 12150];
const ER_A = 12700; // erase pass (bottom → top)
const ER_Z = 13560;
const SC_Y0 = 372;
const SC_Y1 = 16;

// a run (relative ms): check → card swept into the trigger → packets → result
const R_FLY = [150, 470];
const R_PK = [
  [440, 680],
  [780, 1020],
  [1100, 1380],
];
const R_CM = [1400, 1700];
// a stream run (faster, no card)
const S_PK = [
  [0, 200],
  [290, 490],
  [580, 840],
];
const S_CM = [870, 1170];

/** when the erase pass crosses y */
const scanAt = (y: number) => Math.round(ER_A + (ER_Z - ER_A) * inv(eIO, clamp01((SC_Y0 - y) / (SC_Y0 - SC_Y1))));

/* ───────────────────────────── rail-head choreography ─────────────────────── */

// glides along each head's own rail edge: [t0, t1, to, easing]
type Glide = [t0: number, t1: number, to: Pt, ease?: string];
const PLAN: Glide[][] = [];
PLAN[HL] = [
  [150, 450, [RI, 280]],
  [2220, 2850, [RI, 150]],
  [3420, 5600, [RI, 372], IOS],
  [6520, 6930, [RI, 112]],
  [7350, 8300, [RI, 290], IOS],
  [8500, 10300, [RI, 200], IOS],
  [10400, 12200, [RI, 250], IOS],
  [12400, 13450, HEADS[HL].home],
];
PLAN[HT] = [
  [3420, 5600, [96, RI], IOS],
  [6520, 6930, [150, RI]],
  [7350, 8300, [120, RI], IOS],
  [8500, 10300, [176, RI], IOS],
  [10400, 12200, [104, RI], IOS],
  [12400, 13450, HEADS[HT].home],
];
PLAN[HU] = [
  [3500, 5600, [214, RI], IOS],
  [6520, 6930, [336, RI]],
  [7350, 8300, [282, RI], IOS],
  [8500, 10300, [236, RI], IOS],
  [10400, 12200, [306, RI], IOS],
  [12400, 13450, HEADS[HU].home],
];
PLAN[HR] = [
  [3000, 5600, [RHI, 374], IOS],
  [6520, 6930, [RHI, 118]],
  [7350, 8300, [RHI, 300], IOS],
  [8500, 10300, [RHI, 214], IOS],
  [10400, 12200, [RHI, 272], IOS],
  [12400, 13450, HEADS[HR].home],
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
/** the heads dim while the automation runs on its own */
const DIM: Key[] = [
  [0, 1],
  [8250, 1],
  [8900, 0.42],
  [12250, 0.42],
  [12650, 1],
];

/* ───────────────────────────── sprites ─────────────────────────────────── */

const Z0 = "opacity:0";
const O1 = "opacity:1";
/** flicker out while the erase pass crosses (S(o) = the element's state at opacity o) */
const zapSt = (z: number, S: (o: number) => string): Stop[] => [
  [z - 10, S(1)],
  [z + 20, S(0.25)],
  [z + 36, S(0.8)],
  [z + 64, S(0)],
];

/* pooled sprites — values: F [x, y, sx, sy, o] · S [x, y, rot, s, o] · packet / comet [x, y, rot, o] */
const fmtF = ([x, y, sx, sy, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} scale(${f(sx)},${f(sy)})`;
const fmtS = ([x, y, r, s, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg) scale(${f(s)})`;
const fmtPk = ([x, y, r, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg)`;
/** flare: blooms to `peak` (× the 14cqw sprite) and fades over `life` */
const flareEv = (p: Pt, t: number, peak: number, life: number, pri: number, tag: Col): PoolEvent => ({
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
/** a point riding a moving target from a to b (sampled), small and hot */
const tipEv = (at: (t: number) => Pt, a: number, b: number, size: number, tag: Col, pri = 2, burst = 0): PoolEvent => {
  const fr: Frame[] = [];
  const p0 = at(a);
  fr.push([a - 40, [p0[0], p0[1], size * 0.7, size * 0.7, 0], OUT], [a, [p0[0], p0[1], size, size, 1]]);
  const n = Math.max(2, Math.ceil((b - a) / 24));
  for (let i = 1; i <= n; i++) {
    const t = a + ((b - a) * i) / n;
    const p = at(t);
    fr.push([t, [p[0], p[1], size, size, 1]]);
  }
  const z = at(b);
  if (burst) {
    fr[fr.length - 1] = [b, [z[0], z[1], burst, burst, 1], OUT];
    fr.push([b + 480, [z[0], z[1], burst * 0.45, burst * 0.45, 0]]);
  } else fr.push([b + 140, [z[0], z[1], size * 0.6, size * 0.6, 0]]);
  return { pri, tag, fr };
};
/** a data packet racing along a route (sampled translate + heading) */
function packetEv(route: Pt[], t0: number, t1: number, pri: number): PoolEvent {
  const L = plen(route);
  const at = (u: number): [Pt, number] => {
    const d = (0.8 * u + 0.2 * eS(u)) * L;
    return [pat(route, d), angle(pat(route, Math.max(0, d - 1.5)), pat(route, Math.min(L, d + 1.5)))];
  };
  const n = Math.max(3, Math.round((t1 - t0) / 22));
  const [p0, a0] = at(0);
  const fr: Frame[] = [[t0 - 3, [p0[0], p0[1], a0, 0]]];
  for (let i = 0; i <= n; i++) {
    const [p, a] = at(i / n);
    fr.push([t0 + ((t1 - t0) * i) / n, [p[0], p[1], a, 1]]);
  }
  const [p1, a1] = at(1);
  fr.push([t1 + 3, [p1[0], p1[1], a1, 0]]);
  return { pri, fr };
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

type Shot = { k: "hit"; land: number; to: Pt; travel: number } | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number };
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.a - s.travel);
const shotEnd = (s: Shot) => (s.k === "hit" ? s.land + 167 : s.b + 152);

/**
 * One head = TWO elements: the body (glides on the rail, swells while it
 * charges, dims while the automation runs alone) and its beam (translate to
 * the parked head, rotate · scaleX, fades out at full length).
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
    if (dist(o, oz) > 0.01) throw new Error(`aim: head ${h.id} moves while firing at ${t0} ms`);
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
  anim(`${h.id}p`, DIM, [
    ["translate", "cqw", 1, xs, ys],
    ["scale", "", 2, sw],
  ]);
}

/* ───────────────────────────── build all keyframes ───────────────────────── */

const FO_M = 4; // the CTA forge clip box's margin around the outline (its glow)
const SW_C = 1.4; // CTA forge outline width (units)
const UL_Y = 0.94; // climax underline: top and thickness (em of the headline)
const UL_H = 0.075;

function build(title: string, tagline: string, cta: string, ns: string) {
  begin(ns);
  const lay = layout(title, tagline, cta);
  const { fs, lh, groups, climax, ctaW } = lay;
  const shots: Shot[][] = HEADS.map(() => []);
  const FL: PoolEvent[] = []; // flares
  const SP: PoolEvent[] = []; // spark sprays
  const PK: PoolEvent[] = []; // data packets
  const CM: PoolEvent[] = []; // result comets
  const kicks: Record<NodeId, number[]> = { trg: [], ai: [], crm: [], eml: [], cht: [] };
  const lands: number[] = []; // result comet landings (reel steps)

  /* ── editor bar: the two top heads pull it open from the middle ── */
  {
    const bx = (u: number, side: -1 | 1): Pt => [200 + side * (BAR.w / 2 - 3) * eIO(clamp01(u)), BAR_CY];
    const at = (side: -1 | 1) => (t: number) => bx((t - BAR_A) / (BAR_Z - BAR_A), side);
    shots[HT].push({ k: "track", a: BAR_A, b: BAR_Z, travel: 80, at: at(-1) });
    shots[HU].push({ k: "track", a: BAR_A, b: BAR_Z, travel: 80, at: at(1) });
    FL.push(tipEv(at(-1), BAR_A, BAR_Z, 0.42, "cyan", 1), tipEv(at(1), BAR_A, BAR_Z, 0.42, "green", 1));
    const z = scanAt(BAR_CY);
    const S = (o: number, s: number) => `opacity:${f(o)};transform:scaleX(${f(s, 3)})`;
    kf("bar", [[0, S(0, 0)], [BAR_A - 2, S(0, 0)], [BAR_A, S(1, 0), IO], [BAR_Z, S(1, 1)], ...zapSt(z + 30, (o) => S(o, 1))]);
    const R = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y, 2)}cqw)`;
    kf("ttl", [[0, R(0, 0.8)], [BAR_TT, R(0, 0.8), OUT], [BAR_TT + 260, R(1, 0)], ...zapSt(z, (o) => R(o, 0))]);
    // 24/7 + LIVE pop together (one wrapper), then breathe (unrolled on T)
    const C = (o: number, s: number) => `opacity:${f(o)};transform:scale(${f(s)})`;
    const lv: Stop[] = [[0, C(0, 0.4)], [LIVE_T - 2, C(0, 0.4), OUT], [LIVE_T + 160, C(1, 1.22), OUT], [LIVE_T + 420, C(1, 1)]];
    for (let p = LIVE_T + 1200; p + 500 < z; p += 1200) lv.push([p, C(1, 1), IO], [p + 220, C(1, 1.06), IO], [p + 500, C(1, 1)]);
    lv.push(...zapSt(z + 20, (o) => C(o, 1)));
    kf("live", lv);
    FL.push(flareEv([LIVEB.x + 8, BAR_CY], LIVE_T + 60, 1, 420, 1, "green"));
    // the automation powers up on its own: trigger and AI bloom
    FL.push(flareEv(NODES.trg.c, LIVE_T, 1.5, 520, 1, "lime"), flareEv(NODES.ai.c, LIVE_T + 70, 2.1, 640, 1, "cyan"));
  }

  /* ── NODE FORGE: shot, stamped (big, rotated → squash → rebound) ── */
  for (const n of NIDS) {
    const { c, col, s } = NODES[n];
    const t = N_SLAM[n];
    shots[N_HEAD[n]].push({ k: "hit", land: t - PRE, to: c, travel: 90 });
    const b = (1.25 * s) / 56;
    FL.push({
      pri: 2,
      tag: col,
      fr: [
        [t - PRE - 22, [c[0], c[1], 0.3, 0.3, 0], OUT],
        [t - PRE, [c[0], c[1], 1.2, 1.2, 1], OUT],
        [t, [c[0], c[1], b * 1.4, b * 1.4, 0.95], OUT],
        [t + 520, [c[0], c[1], b * 1.7, b * 1.7, 0]],
      ],
    });
    SP.push(sparkEv([c[0], c[1] + s * 0.42], t, 0, 0.62, 400, 2));
  }

  /* ── WELD: the connectors exist only behind the weld front ── */
  const WELD: [number, number, number, number][] = [
    [W1[0], W1[1], pR("trg")[0], pL("ai")[0]],
    [W1[1], W2[0], pL("ai")[0], pR("ai")[0]],
    [W2[0], W2[1], pR("ai")[0], pL("crm")[0]],
    [W2[1], W3[0], pL("crm")[0], pR("crm")[0]],
    [W3[0], W3[1], pR("crm")[0], pL("eml")[0]],
  ];
  const frontAt = (t: number) => {
    if (t <= W1[0]) return WELD[0][2];
    for (const [t0, t1, x0, x1] of WELD) if (t <= t1) return x0 + (x1 - x0) * eS(clamp01((t - t0) / (t1 - t0)));
    return WELD[WELD.length - 1][3];
  };
  {
    const HID = -CB.w;
    const dxAt = (t: number) => Math.min(0, frontAt(t) + 3 - (CB.x + CB.w));
    const st: [number, number, number][] = [
      [0, 1, HID],
      [W1[0] - 2, 1, HID],
    ];
    for (let t = W1[0]; t < W3[1]; t += 16) st.push([t, 1, dxAt(t)]);
    st.push([W3[1], 1, dxAt(W3[1])], [W3[1] + 30, 1, 0]);
    const za = scanAt(CB.y + CB.h);
    const zb = scanAt(CB.y);
    st.push([za - 10, 1, 0], [za + 20, 0.3, 0], [za + 40, 0.85, 0], [(za + zb) / 2, 0.6, 0], [zb, 0, 0], [zb + 4, 0, HID]);
    kf("wo", st.map(([t, o, dx]): Stop => [t, `opacity:${f(o)};transform:translateX(${f(dx / 4, 2)}cqw)`]));
    kf("wi", st.map(([t, , dx]): Stop => [t, `transform:translateX(${f(-dx / 4, 2)}cqw)`]));
  }
  const tipOn = (ci: number) => (t: number) => atX(CONN[ci], frontAt(t));
  shots[HL].push({ k: "track", a: W1[0], b: W1[1], travel: 80, at: tipOn(0) });
  shots[HT].push({ k: "track", a: W2[0], b: W2[1], travel: 80, at: tipOn(1) });
  shots[HU].push({ k: "track", a: W3[0], b: W3[1], travel: 80, at: tipOn(2) });
  shots[HR].push({ k: "track", a: W3[0], b: W3[1], travel: 80, at: tipOn(3) });
  FL.push(tipEv(tipOn(0), W1[0], W1[1], 0.5, "lime"));
  FL.push(tipEv(tipOn(1), W2[0], W2[1], 0.5, "cyan"));
  FL.push(tipEv(tipOn(2), W3[0], W3[1], 0.5, "green", 2, 0.95));
  FL.push(tipEv(tipOn(3), W3[0], W3[1], 0.5, "blue", 2, 0.95));
  SP.push(sparkEv(tipOn(0)((W1[0] + W1[1]) / 2), (W1[0] + W1[1]) / 2, 0, 0.38, 320, 1));
  SP.push(sparkEv(tipOn(1)((W2[0] + W2[1]) / 2), (W2[0] + W2[1]) / 2, 0, 0.38, 320, 1));
  SP.push(sparkEv(pL("eml"), W3[1], 0, 0.45, 360, 1), sparkEv(pL("cht"), W3[1] + 30, 0, 0.45, 360, 1));
  // the fresh circuit flashes white-hot and cools (again when it goes LIVE)
  kf("hot", [
    [0, Z0],
    [HOT - 2, Z0],
    [HOT + 24, O1],
    [HOT + 130, O1, COOL],
    [HOT + 700, Z0],
    [LIVE_T - 2, Z0],
    [LIVE_T + 24, "opacity:.9"],
    [LIVE_T + 110, "opacity:.9", COOL],
    [LIVE_T + 760, Z0],
  ]);

  /* ── HEADLINE: per group slam (fitted scale + origin, stretch → squash →
        rebound) in a white-hot bloom; the climax slot waits as a blank ── */
  const pY = (em: number) => f((em / LINE) * 100, 2); // em → % of the group box
  const oLine = (l: number): [number, number] => [scanAt(HY + (l + 1) * lh), scanAt(HY + l * lh)];
  function slamKF(name: string, t: number, big: boolean, wave: number, out: [number, number], g: Group) {
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
      [out[0] - 12, tr(1, 0, 1, 1, 0), OUT],
      [out[1] + 30, tr(0, -0.2, 1.06, 1, -12)],
    ]);
  }
  const waveAt = (slot: number) => WAVE + slot * 90;
  const WAVE_L = WAVE + 3 * 90 + 40;
  groups.forEach((g, i) => {
    const t = SLOT[g.slot];
    const head = SLOT_HEAD[g.slot];
    const c = HEADS[head].c;
    slamKF(`w${i}`, t, false, waveAt(g.slot), oLine(g.line), g);
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
    SP.push(sparkEv([g.cx, g.cy + 0.42 * lh], t, 0, 0.7, 400, 2));
  });
  // the blank waits for the results (lime dashes + caret, pulsing)
  {
    const g0 = groups.find((g) => g.line === climax.line);
    const on = g0 ? SLOT[g0.slot] + 60 : (groups.length ? SLOT[groups[0].slot] : SLOT[0]) + 60;
    const st: Stop[] = [[0, Z0], [on - 2, Z0], [on + 120, O1]];
    for (let p = on + 520; p + 540 < CL - PRE_L; p += 520) st.push([p, O1, IO], [p + 260, "opacity:.4", IO], [p + 520, O1]);
    st.push([CL - PRE_L, O1], [CL - PRE_L + 50, Z0]);
    kf("blank", st);
  }
  // CLIMAX: the four heads converge on the blank
  slamKF("wL", CL, true, WAVE_L, oLine(climax.line), climax);
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: CL - PRE_L, to: [climax.cx, climax.cy], travel: 100 });
  FL.push(flareEv([climax.cx, climax.cy], CL - PRE_L, 1.6, 460, 2, "lime"));
  SP.push(sparkEv([climax.cx, climax.cy + 0.42 * lh], CL, 0, 1.05, 560, 2));
  kf("hg", [[0, Z0], [CL - 2, Z0], [CL + 12, O1], [CL + 110, O1, COOL], [CL + 640, Z0], [WAVE_L - 4, Z0], [WAVE_L + 70, "opacity:.5"], [WAVE_L + 420, Z0]]);
  {
    const u = (x: number) => f((x * fs) / 4, 3);
    const g = (o: number, x: number) => `opacity:${f(o)};transform:translate(${u(x)}cqw,${u(-x * 0.25)}cqw)`;
    kf("gh", [
      [0, g(0, 0)],
      [CL - 4, g(0, 0)],
      [CL, g(0.95, 0.03), STEP],
      [CL + 45, g(0.95, -0.03), STEP],
      [CL + 90, g(0.85, 0.02), STEP],
      [CL + 135, g(0.7, -0.015), STEP],
      [CL + 180, g(0.6, 0)],
      [CL + 300, g(0, 0)],
      [WAVE_L - 4, g(0, 0)],
      [WAVE_L, g(0.8, 0.025), STEP],
      [WAVE_L + 55, g(0.7, -0.02), STEP],
      [WAVE_L + 110, g(0.5, 0.01)],
      [WAVE_L + 220, g(0, 0)],
    ]);
  }
  {
    const [oL] = oLine(climax.line);
    kf("ul", [
      [0, "opacity:0;transform:scaleX(0)"],
      [CL + 88, "opacity:0;transform:scaleX(0)"],
      [CL + 90, "opacity:1;transform:scaleX(0)", OUT],
      [CL + 460, "opacity:1;transform:scaleX(1)"],
      [oL - 12, "opacity:1;transform:scaleX(1)", OUT],
      [oL + 40, "opacity:0;transform:scaleX(1)"],
    ]);
    const y = climax.y + (UL_Y + UL_H / 2) * fs;
    FL.push({
      pri: 1,
      tag: "lime",
      fr: [
        [CL + 86, [climax.x, y, 0.36, 0.36, 0]],
        [CL + 90, [climax.x, y, 0.4, 0.4, 1], OUT],
        [CL + 460, [climax.x + climax.uw, y, 0.4, 0.4, 1]],
        [CL + 620, [climax.x + climax.uw, y, 0.3, 0.3, 0]],
      ],
    });
  }

  /* ── task deck + results card ── */
  const zRes = scanAt(RES.y + RES.h / 2);
  {
    const S = (o: number, s: number) => `opacity:${f(o)};transform:scale(${f(s, 3)})`;
    kf("res", [[0, S(0, 0.86)], [DEAL + 150, S(0, 0.86), OUT], [DEAL + 450, S(1, 1)], [CL - 2, S(1, 1), OUT], [CL + 110, S(1, 1.05), IO], [CL + 380, S(1, 1)], ...zapSt(zRes, (o) => S(o, 1))]);
    FL.push(flareEv([RES.x + RES.w / 2, RES.y + RES.h / 2], CL, 1.5, 520, 1, "lime"));
    kf("dt", [[0, S(0, 0.3)], [CL + 240, S(0, 0.3), OUT], [CL + 420, S(1, 1.25), OUT], [CL + 640, S(1, 1)], [zRes + 80, S(1, 1)], [zRes + 82, S(0, 0.3)]]);
  }
  CARD_Y.forEach((y, k) => {
    const r = RUN[k];
    const deal = DEAL + k * 90;
    const [tx, ty] = NODES.trg.c;
    const dx = tx - (CARD_X + CARD_W / 2);
    const dy = ty - (y + CARD_H / 2);
    const C = (o: number, x: number, yy: number, s: number, rot: number) =>
      `opacity:${f(o)};transform:translate(${f(x / 4, 2)}cqw,${f(yy / 4, 2)}cqw) rotate(${f(rot, 1)}deg) scale(${f(s, 3)})`;
    kf(`cd${k}`, [
      [0, C(0, -36, 0, 1, 0)],
      [deal, C(0, -36, 0, 1, 0), OUT],
      [deal + DEAL_D, C(1, 0, 0, 1, 0)],
      [r + R_FLY[0], C(1, 0, 0, 1, 0), OUT],
      [r + R_FLY[0] + 90, C(1, 3, -5, 1.04, -2), IN],
      [r + R_FLY[1], C(0.15, dx, dy, 0.2, -12)],
      [r + R_FLY[1] + 2, C(0, -36, 0, 1, 0)],
    ]);
    const K = (o: number, s: number) => `opacity:${f(o)};transform:scale(${f(s, 3)})`;
    kf(`ck${k}`, [[0, K(0, 0.3)], [r - 2, K(0, 0.3), OUT], [r + 110, K(1, 1.3), OUT], [r + 260, K(1, 1)], [r + R_FLY[1] + 10, K(1, 1)], [r + R_FLY[1] + 12, K(0, 0.3)]]);
    FL.push(flareEv([CARD_X + 12, y + 9], r, 0.7, 280, 1, "green"));
    kicks.trg.push(r + R_FLY[1] - 30);
  });

  // one scanner sprite reads each card (left → right) before its check pops
  {
    const X = (o: number, x: number, y: number) => `opacity:${f(o)};transform:translate(${f(x / 4, 2)}cqw,${f(y / 4, 2)}cqw)`;
    const st: Stop[] = [[0, X(0, 0, 0)]];
    CARD_Y.forEach((y, k) => {
      const r = RUN[k];
      const dy = y - CARD_Y[0];
      st.push([r - SCAN_D - 42, X(0, 0, dy)], [r - SCAN_D - 30, X(1, 0, dy), IO], [r - 30, X(1, CARD_W, dy)], [r - 8, X(0, CARD_W, dy)]);
    });
    kf("scn", st);
  }

  /* ── the automation runs: packets, kicks, the assistant types, results land ── */
  const comet = (t0: number, t1: number) => {
    const p0: Pt = [NODES.cht.c[0], NODES.cht.c[1] + NODES.cht.s / 2 + 2];
    const p2 = REEL_C;
    const pc: Pt = [p0[0] + 34, (p0[1] + p2[1]) / 2 + 12];
    const at = (t: number): [Pt, number] => {
      const u = eS(clamp01((t - t0) / (t1 - t0)));
      const x = (1 - u) * (1 - u) * p0[0] + 2 * u * (1 - u) * pc[0] + u * u * p2[0];
      const y = (1 - u) * (1 - u) * p0[1] + 2 * u * (1 - u) * pc[1] + u * u * p2[1];
      const dx = 2 * (1 - u) * (pc[0] - p0[0]) + 2 * u * (p2[0] - pc[0]);
      const dy = 2 * (1 - u) * (pc[1] - p0[1]) + 2 * u * (p2[1] - pc[1]);
      return [[x, y], (Math.atan2(dy, dx) * 180) / Math.PI];
    };
    const o = (t: number) => clamp01(Math.min((t - t0) / 40, (t1 + 30 - t) / 60));
    const fr: Frame[] = [[t0 - 6, [p0[0], p0[1], at(t0)[1], 0]]];
    for (let t = t0; t <= t1 + 30; t += 30) {
      const [p, a] = at(t);
      fr.push([t, [p[0], p[1], a, o(t)]]);
    }
    fr.push([t1 + 32, [p2[0], p2[1], at(t1)[1], 0]]);
    CM.push({ pri: 2, fr });
    FL.push(flareEv(p2, t1, 1.1, 380, 1, "lime"));
    lands.push(t1);
  };
  const run = (r: number, pk: number[][], cm: number[] | null, pri: number) => {
    PK.push(packetEv(ROUTE[0], r + pk[0][0], r + pk[0][1], pri));
    PK.push(packetEv(ROUTE[1], r + pk[1][0], r + pk[1][1], pri));
    PK.push(packetEv(ROUTE[2], r + pk[2][0], r + pk[2][1], pri), packetEv(ROUTE[3], r + pk[2][0], r + pk[2][1], pri));
    kicks.ai.push(r + pk[0][1] - 20);
    kicks.crm.push(r + pk[1][1] - 20);
    kicks.eml.push(r + pk[2][1] - 20);
    kicks.cht.push(r + pk[2][1] - 20);
    FL.push(flareEv(NODES.ai.c, r + pk[0][1] - 20, 0.95, 280, 0, "cyan"), flareEv(NODES.crm.c, r + pk[1][1] - 20, 0.85, 260, 0, "green"));
    FL.push(flareEv(NODES.eml.c, r + pk[2][1] - 20, 0.85, 260, 0, "blue"), flareEv(NODES.cht.c, r + pk[2][1] - 20, 0.85, 260, 0, "blue"));
    if (cm) comet(r + cm[0], r + cm[1]);
  };
  RUN.forEach((r) => run(r, R_PK, R_CM, 2));
  STREAM.forEach((s, i) => {
    kicks.trg.push(s - 20);
    FL.push(flareEv(NODES.trg.c, s - 20, 0.8, 240, 0, "lime"));
    run(s, S_PK, STREAM_CM.includes(i) ? S_CM : null, 1);
  });
  // the assistant: the bubble opens on the first answer, types one line per run
  const zBub = scanAt(BUB.y + BUB.h / 2);
  {
    const S = (o: number, s: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4, 2)}cqw) scale(${f(s, 3)})`;
    kf("bub", [[0, S(0, 0.5, -10)], [BUB_T - 2, S(0, 0.5, -10), BACK2], [BUB_T + 360, S(1, 1, 0)], ...zapSt(zBub, (o) => S(o, 1, 0))]);
    const typing: [number, number][] = [
      [BUB_T + 40, RUN[2] + R_PK[1][0] + 300],
      [RETYPE, RETYPE + 820],
    ];
    const st: Stop[] = [[0, Z0]];
    for (const [a, b] of typing) st.push([a - 2, Z0], [a + 120, O1], [b - 120, O1], [b, Z0]);
    kf("dots", st);
    BUB_LW.forEach((_, i) => {
      const a = RUN[i] + R_PK[1][0];
      const b = a + 300;
      const ra = RETYPE + 180 + i * 230;
      const L = (s: number) => `transform:scaleX(${f(s, 3)})`;
      kf(`ln${i}`, [
        [0, L(0)],
        [a, L(0), "cubic-bezier(.25,.6,.35,1)"],
        [b, L(1)],
        [RETYPE - 2, L(1), IN],
        [RETYPE + 120, L(0)],
        [ra, L(0), "cubic-bezier(.25,.6,.35,1)"],
        [ra + 280, L(1)],
        [zBub + 80, L(1)],
        [zBub + 82, L(0)],
      ]);
    });
  }
  // the counter rolls one step per landing; the bars climb with it
  {
    const ls = [...lands].sort((a, b) => a - b).slice(0, REEL.length - 1);
    const R = (i: number) => `transform:translateY(${f((-100 * i) / REEL.length, 3)}%)`;
    const st: Stop[] = [[0, R(0)]];
    const bs: Stop[] = [[0, "transform:scaleY(0)"], [DEAL + 300, "transform:scaleY(0)", OUT], [DEAL + 600, `transform:scaleY(${BSTEP[0]})`]];
    ls.forEach((t, i) => {
      st.push([t, R(i), EO], [t + 420, R(i + 1)]);
      bs.push([t, `transform:scaleY(${BSTEP[i]})`, BACK2], [t + 380, `transform:scaleY(${BSTEP[i + 1]})`]);
    });
    st.push([zRes + 80, R(ls.length)], [zRes + 82, R(0)]);
    bs.push([zRes + 80, `transform:scaleY(${BSTEP[ls.length]})`], [zRes + 82, "transform:scaleY(0)"]);
    kf("reel", st);
    kf("bars", bs);
  }

  /* ── node keyframes: stamp, kick on every arrival, zap ── */
  for (const n of NIDS) {
    const t = N_SLAM[n];
    const z = scanAt(NODES[n].c[1]);
    const S = (o: number, s: number, r: number) => `opacity:${f(o)};transform:rotate(${f(r, 1)}deg) scale(${f(s, 3)})`;
    const st: Stop[] = [
      [0, S(0, 1.9, -14)],
      [t - PRE, S(0, 1.9, -14)],
      [t - PRE + 24, S(1, 1.8, -13), IN],
      [t, S(1, 0.84, 4), OUT],
      [t + 90, S(1, 1.08, -1.5), IO],
      [t + 190, S(1, 0.98, 0.5), IO],
      [t + 290, S(1, 1, 0)],
    ];
    let last = t + 290;
    for (const k of [...kicks[n]].sort((a, b) => a - b)) {
      if (k - 4 < last + 20 || k + 260 > z - 20) continue;
      st.push([k - 4, S(1, 1, 0), OUT], [k + 70, S(1, 1.13, 0), IO], [k + 260, S(1, 1, 0)]);
      last = k + 260;
    }
    st.push(...zapSt(z, (o) => S(o, 1, 0)));
    kf(`n${n}`, st);
  }
  // the AI orbit turns the whole loop (two turns per T: seamless)
  kf("orb", [
    [0, "transform:rotate(0deg)"],
    [T, "transform:rotate(720deg)"],
  ]);

  /* ── CTA FORGE where the tasks were: two weld tips trace the pill outline
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
  const zCta = scanAt(cyM);
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
  shots[HT].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HU].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HL].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  shots[HR].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  SP.push(sparkEv([CTA_X + ctaW, cyM], FG_Z, 52, 0.9, 500, 2));
  {
    const S = (o: number, s: number) => `opacity:${f(o)};transform:scale(${f(s, 3)})`;
    kf("cta", [[0, S(0, 1)], [FG_Z - 2, S(0, 1)], [FG_Z, S(1, 1), OUT], [FG_Z + 110, S(1, 1.045), IO], [FG_Z + 330, S(1, 1)], ...zapSt(zCta, (o) => S(o, 1))]);
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
    const L0 = FG_Z + 150;
    kf("lbl", [
      [0, "transform:translateY(118%) skewY(9deg)"],
      [L0, "transform:translateY(118%) skewY(9deg)", BACK2],
      [L0 + 460, "transform:translateY(0) skewY(0deg)"],
    ]);
  }

  /* ── erase pass (bottom → top) ── */
  {
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    kf("scan", [[0, Y(0, SC_Y0)], [ER_A - 160, Y(0, SC_Y0)], [ER_A - 40, Y(1, SC_Y0)], [ER_A, Y(1, SC_Y0), IO], [ER_Z, Y(1, SC_Y1)], [ER_Z + 160, Y(0, SC_Y1 - 10)]]);
  }

  /* ── rail heads: glide, charge, fire ── */
  HEADS.forEach((_, k) => headKF(k, shots[k]));

  /* ── whole-scene punctuation: camera shake, flash, 3D tilt in the hold ── */
  {
    const sh = (x: number, y: number) => `transform:translate(${f(x)}%,${f(y)}%)`;
    const st: Stop[] = [[0, sh(0, 0)]];
    const shake = (t: number, a: number) =>
      st.push([t - 2, sh(0, 0)], [t + 30, sh(0.9 * a, -0.6 * a)], [t + 70, sh(-0.75 * a, 0.5 * a)], [t + 115, sh(0.5 * a, -0.35 * a)], [t + 170, sh(-0.25 * a, 0.18 * a)], [t + 250, sh(0, 0)]);
    shake(HOT, 0.3);
    shake(FG_Z, 0.45);
    shake(CL, 1);
    shake(LIVE_T, 0.35);
    kf("shake", st);
    kf("flash", [
      [0, Z0],
      [HOT - 2, Z0],
      [HOT + 30, "opacity:.45"],
      [HOT + 380, Z0],
      [FG_Z - 2, Z0],
      [FG_Z + 25, "opacity:.4"],
      [FG_Z + 420, Z0],
      [CL - 2, Z0],
      [CL + 20, "opacity:.95"],
      [CL + 460, Z0],
      [LIVE_T - 2, Z0],
      [LIVE_T + 30, "opacity:.4"],
      [LIVE_T + 480, Z0],
    ]);
    const FLAT = "transform:perspective(170cqw) rotateX(0deg) rotateY(0deg)";
    const TILTED = "transform:perspective(170cqw) rotateX(6deg) rotateY(-8deg)";
    kf("tilt", [
      [0, FLAT],
      [TILT[0], FLAT, IO],
      [TILT[1], TILTED],
      [TILT[2], TILTED, IO],
      [TILT[3], FLAT],
    ]);
  }

  /* ── pools ── */
  const pf = pool("pf", FL, 7, fmtF, true);
  const ps = pool("ps", SP, 2, fmtS);
  const nPk = pool("pk", PK, 4, fmtPk).length;
  const nCm = pool("cm", CM, 1, fmtPk).length;

  return { css: (BASE + end()).replace(/\n/g, ""), lay, pf, ps, nPk, nCm, fo };
}

/* ───────────────────────────── static styles ─────────────────────────────── */

const BEAM_BG =
  "linear-gradient(rgb(var(--aim-hot)/.95),rgb(var(--aim-hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--aim-c)/.07) 20%,rgb(var(--aim-c)/.3) 37%,rgb(var(--aim-c)/.85) 47%,rgb(var(--aim-c)/.85) 53%,rgb(var(--aim-c)/.3) 63%,rgb(var(--aim-c)/.07) 80%,transparent)";
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--aim-hot)) ${core},rgb(var(--aim-c)/.8) ${mid},rgb(var(--aim-c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";

const BASE = `
.aim-root{--aim-lime:200 240 46;--aim-cyan:20 224 200;--aim-green:34 211 140;--aim-blue:46 102 255;--aim-hot:242 243 238;position:relative;z-index:20;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;forced-color-adjust:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;letter-spacing:normal;word-spacing:normal;text-align:left}
.aim-cv{position:absolute;inset:-3rem;content-visibility:auto;contain-intrinsic-size:0 0}
.aim-cv>.aim-L{inset:3rem}
html.a11y-hide-img .aim-cv{display:none}
.aim-root i{font-style:normal}
.aim-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
[data-paused] .aim-a{animation-play-state:paused}
.aim-L{position:absolute;inset:0}
.aim-abs{position:absolute;display:block}
.aim-clip{position:absolute;overflow:hidden;overflow:clip}
.aim-z{position:absolute;left:0;top:0;width:0;height:0}
.aim-o0{position:absolute;width:100cqw;height:100cqw}
.aim-c-lime{--aim-c:var(--aim-lime)}.aim-c-cyan{--aim-c:var(--aim-cyan)}.aim-c-green{--aim-c:var(--aim-green)}.aim-c-blue{--aim-c:var(--aim-blue)}
.aim-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.1) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.aim-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.aim-floor{position:absolute;left:8%;top:40%;width:84%;height:30%;border-radius:50%;background:radial-gradient(closest-side,rgb(20 224 200/.1),rgb(46 102 255/.04) 60%,transparent)}
.aim-plane{position:absolute;inset:0;transform-origin:50% 55%}
.aim-bar{border-radius:2.5cqw;background:linear-gradient(90deg,rgb(20 22 30/.94),rgb(14 16 22/.94));box-shadow:inset 0 0 0 1px rgb(242 243 238/.12),0 0 3cqw rgb(20 224 200/.08)}
.aim-ttl{position:absolute;display:flex;align-items:center;gap:1.2cqw;white-space:nowrap;font-weight:700;letter-spacing:-.005em;color:#f2f3ee}
.aim-ttl svg{flex:none;width:2.7cqw;height:2.7cqw}
.aim-chip{position:absolute;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:.8cqw;border-radius:2cqw;font-family:${MONO};font-weight:800;font-size:1.75cqw;letter-spacing:.04em;white-space:nowrap}
.aim-chips{transform-origin:70% 50%}
.aim-247{color:#c8f02e;background:rgb(var(--aim-lime)/.1);border:1px solid rgb(var(--aim-lime)/.45)}
.aim-live{color:#22d38c;background:rgb(var(--aim-green)/.12);border:1px solid rgb(var(--aim-green)/.55);box-shadow:0 0 2.2cqw rgb(var(--aim-green)/.3)}
.aim-live i{width:1cqw;height:1cqw;border-radius:50%;background:#22d38c;box-shadow:0 0 1cqw #22d38c}
.aim-conn{position:absolute;left:0;top:0;overflow:visible}
.aim-hot{opacity:0}
.aim-node{box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.3cqw;border-radius:2.8cqw;color:rgb(var(--aim-c));background:radial-gradient(80% 80% at 30% 20%,rgb(var(--aim-c)/.18),transparent),linear-gradient(rgb(18 20 27),rgb(9 10 14));border:max(1px,.35cqw) solid rgb(var(--aim-c)/.9);box-shadow:0 0 3.5cqw rgb(var(--aim-c)/.32),inset 0 0 2cqw rgb(var(--aim-c)/.16)}
.aim-node svg{display:block;width:46%;height:46%;overflow:visible}
.aim-nai{border-radius:50%}
.aim-nai b{font-family:${HEAD};font-weight:800;font-size:4.1cqw;line-height:1;letter-spacing:-.02em;color:#f2f3ee}
.aim-nai svg{position:absolute;right:15%;top:14%;width:20%;height:20%}
.aim-ncrm b{font-family:${MONO};font-weight:800;font-size:1.9cqw;line-height:1;letter-spacing:.04em}
.aim-ncrm svg{width:38%;height:38%}
.aim-orb{position:absolute;inset:-17%;border-radius:50%;border:max(1px,.22cqw) dashed rgb(var(--aim-cyan)/.45)}
.aim-orb::after{content:"";position:absolute;left:50%;top:0;width:1.1cqw;height:1.1cqw;margin:-.55cqw 0 0 -.55cqw;border-radius:50%;background:#14e0c8;box-shadow:0 0 1.2cqw rgb(var(--aim-cyan)/.8)}
.aim-bub{border-radius:3cqw;background:linear-gradient(rgb(20 224 200/.09),rgb(20 224 200/.04));box-shadow:inset 0 0 0 1px rgb(20 224 200/.38),0 0 3cqw rgb(20 224 200/.1);transform-origin:${f(((NODES.ai.c[0] - BUB.x) / BUB.w) * 100, 1)}% 0}
.aim-bub::before{content:"";position:absolute;left:${cq(NODES.ai.c[0] - BUB.x - 4)};top:-1.1cqw;width:2cqw;height:2cqw;transform:rotate(45deg);background:rgb(16 34 36);box-shadow:inset 1px 1px 0 rgb(20 224 200/.38)}
.aim-spk{position:absolute;width:2.6cqw;height:2.6cqw;color:#14e0c8}
.aim-dots{position:absolute;display:flex;gap:.8cqw;opacity:0}
.aim-dots i{width:1.15cqw;height:1.15cqw;border-radius:50%;background:rgb(20 224 200/.85)}
.aim-dots i+i{background:rgb(20 224 200/.55)}.aim-dots i+i+i{background:rgb(20 224 200/.3)}
.aim-ln{border-radius:1cqw;transform-origin:0 50%}
.aim-card{box-sizing:border-box;border-radius:1.4cqw;background:linear-gradient(90deg,rgb(30 32 40/.97),rgb(22 24 31/.97));box-shadow:inset 0 0 0 1px rgb(242 243 238/.2),0 .6cqw 2cqw rgb(0 0 0/.35);opacity:0}
.aim-cb{position:absolute;box-sizing:border-box;border-radius:.7cqw;border:max(1px,.3cqw) solid rgb(242 243 238/.5)}
.aim-rx{position:absolute;display:flex;align-items:center;gap:.5cqw;font-family:${MONO};font-weight:800;font-size:1.65cqw;color:rgb(242 243 238/.55);white-space:nowrap}
.aim-rx svg{width:2.4cqw;height:2.4cqw}
.aim-scn{position:absolute;width:3.2cqw;margin-left:-1.6cqw;opacity:0;--aim-c:var(--aim-cyan);background:linear-gradient(90deg,rgb(var(--aim-hot)/.95),rgb(var(--aim-hot)/.95)) 50% 0/max(1.2px,.28cqw) 100% no-repeat,linear-gradient(90deg,transparent,rgb(var(--aim-c)/.08) 15%,rgb(var(--aim-c)/.35) 40%,rgb(var(--aim-c)/.85) 49%,rgb(var(--aim-c)/.85) 51%,rgb(var(--aim-c)/.35) 60%,rgb(var(--aim-c)/.08) 85%,transparent)}
.aim-scn::before{content:"";position:absolute;top:0;bottom:0;right:50%;width:9cqw;background:linear-gradient(to left,rgb(var(--aim-cyan)/.22),transparent)}
.aim-ck{position:absolute;border-radius:.7cqw;background:#22d38c;box-shadow:0 0 1.6cqw rgb(var(--aim-green)/.7);display:flex;align-items:center;justify-content:center}
.aim-ck svg{width:80%;height:80%}
.aim-res{border-radius:2.2cqw;background:radial-gradient(70% 90% at 20% 30%,rgb(200 240 46/.1),transparent),linear-gradient(rgb(20 22 30/.94),rgb(12 13 18/.94));box-shadow:inset 0 0 0 1px rgb(200 240 46/.28),0 0 4cqw rgb(200 240 46/.1)}
.aim-trend{position:absolute;width:2.8cqw;height:2.8cqw;color:#c8f02e}
.aim-k{position:absolute;font-family:${HEAD};font-weight:800;font-size:6.2cqw;line-height:1.1;letter-spacing:-.02em;color:#c8f02e;white-space:nowrap;font-variant-numeric:tabular-nums;height:1.1em;overflow:hidden;overflow:clip}
.aim-reel{display:block;white-space:pre;line-height:1.1;transform:translateY(${f((-100 * (REEL.length - 1)) / REEL.length, 3)}%)}
.aim-dt{position:absolute;box-sizing:border-box;height:3.2cqw;padding:0 1cqw;border-radius:2cqw;display:flex;align-items:center;font-family:${MONO};font-weight:800;font-size:1.7cqw;white-space:nowrap;color:#22d38c;background:rgb(var(--aim-green)/.12);border:1px solid rgb(var(--aim-green)/.45)}
.aim-bars{transform-origin:50% 100%}
.aim-barv{border-radius:.5cqw .5cqw .2cqw .2cqw;background:linear-gradient(#14e0c8,#2e66ff)}
.aim-blank{opacity:0}
.aim-dash{position:absolute;left:0;right:0;bottom:12%;height:max(1px,.07em);background:repeating-linear-gradient(90deg,#c8f02e 0 .32em,transparent .32em .5em)}
.aim-caret{position:absolute;left:.04em;top:12%;bottom:16%;width:max(1px,.06em);border-radius:1em;background:#c8f02e;box-shadow:0 0 .25em rgb(var(--aim-lime)/.8)}
.aim-title{position:absolute;left:${cq(HX)};top:${cq(HY)};width:${cq(HW)};font-family:${HEAD};font-weight:800;font-size:${cq(FS_MAX)};line-height:${LINE};letter-spacing:${f(TLS, 3)}em;font-kerning:none;font-variant-ligatures:none}
.aim-tl{display:block;white-space:nowrap}
.aim-pu{margin-left:-${PUNCT_PULL}em}
.aim-w{position:relative;display:inline-block;white-space:nowrap;transform-origin:50% 80%}
.aim-wL{color:#c8f02e}
.aim-hg{position:absolute;left:0;top:0;opacity:0;white-space:nowrap;color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--aim-lime)/.95),0 0 .45em rgb(var(--aim-cyan)/.6)}
.aim-gh{position:absolute;left:0;top:0;z-index:-1;opacity:0;white-space:nowrap;color:transparent;text-shadow:-.08em -.02em rgb(var(--aim-cyan)/.95),.08em .02em rgb(var(--aim-blue)/.9)}
.aim-ul{position:absolute;left:0;top:${f(UL_Y, 3)}em;height:${f(UL_H, 3)}em;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
.aim-cta{position:absolute;box-sizing:border-box;display:flex;align-items:center;padding:0 ${cq(CTA_PR)} 0 ${cq(CTA_PL)};border-radius:5cqw;background:#c8f02e;color:#0a0a0b;font-weight:700;font-size:${cq(CTA_FS0)};letter-spacing:${f(CTA_LS, 3)}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap;box-shadow:0 0 3.5cqw rgb(200 240 46/.28)}
.aim-ctal{display:block;overflow:hidden;overflow:clip;line-height:1.3}
.aim-lbl{display:flex;align-items:center;gap:${cq(CTA_GAP)};transform-origin:0 50%}
.aim-ctah{border-radius:5cqw;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgb(var(--aim-lime)/.85)}
.aim-ctaa{display:block;flex:none;width:${cq(CTA_ARROW)};height:${cq(CTA_ARROW)}}
.aim-foc{opacity:0}
.aim-fo{position:absolute;border:${cq(SW_C)} solid #c8f02e;border-right:0;box-shadow:0 0 1cqw rgb(var(--aim-lime)/.6)}
.aim-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 40%,rgb(var(--aim-hot)/.2),rgb(var(--aim-lime)/.09) 45%,transparent 75%);opacity:0}
.aim-hd{position:absolute;left:0;top:0;width:0;height:0}
.aim-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.aim-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--aim-hot));box-shadow:0 0 0 .38cqw rgb(var(--aim-c)/.95),0 0 1.8cqw .5cqw rgb(var(--aim-c)/.55),0 0 5cqw rgb(var(--aim-c)/.25);outline:.26cqw dashed rgb(var(--aim-c)/.7);outline-offset:1.15cqw}
.aim-pf{position:absolute;left:0;top:0;width:14cqw;height:14cqw;margin:-7cqw 0 0 -7cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.aim-ps{position:absolute;left:0;top:0;width:30cqw;height:30cqw;margin:-15cqw 0 0 -15cqw;background:radial-gradient(closest-side,rgb(var(--aim-hot)),rgb(var(--aim-c)/.75) 7%,rgb(var(--aim-c)/.12) 15%,transparent 22%);opacity:0;color:rgb(var(--aim-c))}
.aim-ps svg{display:block;width:100%;height:100%;overflow:visible}
.aim-pk{position:absolute;left:0;top:0;width:8cqw;height:4cqw;margin:-2cqw 0 0 -6cqw;transform-origin:75% 50%;opacity:0;background:radial-gradient(2cqw 2cqw at 75% 50%,#fff,#fff 22%,rgb(var(--aim-lime)/.9) 42%,rgb(var(--aim-lime)/.25) 70%,transparent),linear-gradient(90deg,transparent,rgb(var(--aim-lime)/.3) 40%,rgb(var(--aim-lime)/.95) 75%,transparent 75.5%) 0 50%/100% .8cqw no-repeat}
.aim-com{position:absolute;left:0;top:0;width:11cqw;height:3.2cqw;margin:-1.6cqw 0 0 -9.4cqw;transform-origin:85.45% 50%;opacity:0;background:radial-gradient(1.6cqw 1.6cqw at 85.45% 50%,#fff,#fff 22%,rgb(var(--aim-lime)/.8) 46%,rgb(var(--aim-lime)/.18) 72%,transparent),linear-gradient(90deg,transparent,rgb(var(--aim-lime)/.35) 40%,rgb(var(--aim-lime)/.85) 80%,#fff) 0 50%/85.45% 1cqw no-repeat}
.aim-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--aim-c:var(--aim-lime)}
.aim-scanw{position:absolute;left:0;right:0;top:50%;height:9em;background:linear-gradient(rgb(var(--aim-lime)/.15),rgb(var(--aim-lime)/.04) 45%,transparent),repeating-linear-gradient(rgb(var(--aim-lime)/.08) 0 1px,transparent 1px .9em)}
.aim-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.aim-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
`;

/* ───────────────────────────── markup ────────────────────────────────────── */

type Built = ReturnType<typeof build> & { ns: string };
/** built sheets per string set: the most recently used few */
const CACHE = new Map<string, Built>();
const CACHE_MAX = 12;
function getBuild(title: string, tagline: string, cta: string): Built {
  const key = `${title}\u0001${tagline}\u0001${cta}`;
  let b = CACHE.get(key);
  if (b) CACHE.delete(key);
  else {
    const ns = `aim-${hash(key)}-`;
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

/* spark sprite (static artwork): an irregular spray of streaks opening upwards */
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

const HEX: Record<Col, string> = { lime: "#c8f02e", cyan: "#14e0c8", green: "#22d38c", blue: "#2e66ff" };
const SPARKLE = "M12 1.5 14.3 9.7 22.5 12 14.3 14.3 12 22.5 9.7 14.3 1.5 12 9.7 9.7Z";

/** headline words; trailing punctuation pulled in (see PUNCT_PULL) */
function Words({ s }: { s: string }) {
  return (
    <>
      {s.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i ? " " : null}
          {PUNCT.test(w) && w.length > 1 ? (
            <>
              {w.slice(0, -1)}
              <span className="aim-pu">{w.slice(-1)}</span>
            </>
          ) : (
            w
          )}
        </Fragment>
      ))}
    </>
  );
}

/** neutral node glyphs (24 × 24, currentColor) */
function Glyph({ n }: { n: NodeId }) {
  const s = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  if (n === "trg")
    return (
      <svg viewBox="0 0 24 24">
        <path d="M13.5 1.8 4.6 13.4h6.6L10.1 22.2 19.4 10.3h-6.7l.8-8.5Z" fill="currentColor" />
      </svg>
    );
  if (n === "crm")
    return (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4.2" {...s} />
        <path d="M4 21c.8-4.2 4-6.6 8-6.6s7.2 2.4 8 6.6" {...s} />
      </svg>
    );
  if (n === "eml")
    return (
      <svg viewBox="0 0 24 24">
        <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.6" {...s} />
        <path d="m3.8 7.4 8.2 6.1 8.2-6.1" {...s} />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 4.2h14a2.4 2.4 0 0 1 2.4 2.4v8.2a2.4 2.4 0 0 1-2.4 2.4h-7.2L7 21v-3.8H5a2.4 2.4 0 0 1-2.4-2.4V6.6A2.4 2.4 0 0 1 5 4.2Z" {...s} />
      <circle cx="8" cy="10.7" r="1.25" fill="currentColor" />
      <circle cx="12" cy="10.7" r="1.25" fill="currentColor" />
      <circle cx="16" cy="10.7" r="1.25" fill="currentColor" />
    </svg>
  );
}

/** the connectors (static drawing, units): glow, gradient stroke, ports */
function Wires({ id, hot }: { id: string; hot?: boolean }) {
  return (
    <svg className="aim-conn" viewBox={`${CB.x} ${CB.y} ${CB.w} ${CB.h}`} style={{ width: cq(CB.w), height: cq(CB.h) }} fill="none">
      {!hot && (
        <defs>
          {CONN.map((p, i) => (
            <linearGradient key={i} id={`${id}${i}`} x1={p[0][0]} y1="0" x2={p[p.length - 1][0]} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={HEX[CONN_COL[i][0]]} />
              <stop offset="1" stopColor={HEX[CONN_COL[i][1]]} />
            </linearGradient>
          ))}
        </defs>
      )}
      {CONN.map((p, i) =>
        hot ? (
          <Fragment key={i}>
            <path d={svgPath(p)} stroke="#c8f02e" strokeOpacity=".45" strokeWidth="7" strokeLinecap="round" />
            <path d={svgPath(p)} stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
          </Fragment>
        ) : (
          <Fragment key={i}>
            <path d={svgPath(p)} stroke={`url(#${id}${i})`} strokeOpacity=".22" strokeWidth="6.5" strokeLinecap="round" />
            <path d={svgPath(p)} stroke={`url(#${id}${i})`} strokeWidth="2.2" strokeLinecap="round" />
            <path d={svgPath(p)} stroke="#f2f3ee" strokeOpacity=".5" strokeWidth=".7" strokeDasharray="1.5 5" strokeLinecap="round" />
            <circle cx={p[0][0]} cy={p[0][1]} r="2.6" fill="#0a0a0b" stroke={HEX[CONN_COL[i][0]]} strokeWidth="1.4" />
            <circle cx={p[p.length - 1][0]} cy={p[p.length - 1][1]} r="2.6" fill="#0a0a0b" stroke={HEX[CONN_COL[i][1]]} strokeWidth="1.4" />
          </Fragment>
        ),
      )}
    </svg>
  );
}

export function AutomatisationIaMotion({ className, title, tagline, cta }: ServiceMotionProps) {
  const b = getBuild(title, tagline, cta);
  const { fs, groups, climax, tText, tfs, label, cfs, ctaW }: Layout = b.lay;
  const A = (n: string) => `aim-a ${b.ns}${n}`;
  const origin = (g: Group) => `${f((g.ox / g.w) * 100, 2)}% 80%`;
  const nLines = Math.max(climax.line, ...groups.map((g) => g.line)) + 1;
  const lines = Array.from({ length: nLines }, (_, l) => groups.map((g, i) => ({ g, i })).filter((x) => x.g.line === l));
  const CR = CTA_H / 2;

  return (
    <div className={`illu-motion aim-root${className ? ` ${className}` : ""}`} data-motion-root="" aria-hidden="true" data-nosnippet="">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      <ScrollPause />

      {/* off-screen, content-visibility skips the whole scene (no restyle at all);
          absolutely positioned, so its remembered size never feeds the layout */}
      <div className="aim-cv">
        <div className={`aim-L ${A("shake")}`}>
          {/* ── static back layer ── */}
          <i className="aim-grid" />
          <i className="aim-rail" />
          <i className="aim-floor" />

          {/* ── the automation (tilts as one plane in the hold) ── */}
          <div className={`aim-plane ${A("tilt")}`}>
            {/* editor bar: pulled open, title, 24/7 + LIVE */}
            <i className={`aim-abs aim-bar ${A("bar")}`} style={at(BAR.x, BAR.y, BAR.w, BAR.h)} />
            <span className={`aim-ttl ${A("ttl")}`} style={{ left: P(BAR.x + 8), top: P(BAR.y), height: cq(BAR.h), fontSize: cq(tfs) }}>
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="5" cy="12" r="3" fill="#c8f02e" />
                <circle cx="19" cy="5.5" r="2.6" stroke="#14e0c8" strokeWidth="1.8" />
                <circle cx="19" cy="18.5" r="2.6" stroke="#2e66ff" strokeWidth="1.8" />
                <path d="M8 12h3.5c2 0 2-6.5 4.5-6.5M11.5 12c2 0 2 6.5 4.5 6.5" stroke="#f2f3ee" strokeOpacity=".55" strokeWidth="1.5" />
              </svg>
              <span>{tText}</span>
            </span>
            <span className={`aim-abs aim-chips ${A("live")}`} style={at(CHIP247.x, BAR.y + 4, LIVEB.x + LIVEB.w - CHIP247.x, BAR.h - 8)}>
              <span className="aim-chip aim-247" style={atq(0, 0, CHIP247.w, BAR.h - 8)}>
                24/7
              </span>
              <span className="aim-chip aim-live" style={atq(LIVEB.x - CHIP247.x, 0, LIVEB.w, BAR.h - 8)}>
                <i />
                LIVE
              </span>
            </span>

            {/* connectors: exist only behind the weld front */}
            <div className={`aim-clip ${A("wo")}`} style={at(CB.x, CB.y, CB.w, CB.h)}>
              <div className={`aim-z ${A("wi")}`}>
                <Wires id={`${b.ns}g`} />
              </div>
            </div>
            <div className={`aim-abs aim-hot ${A("hot")}`} style={at(CB.x, CB.y, CB.w, CB.h)}>
              <Wires id={`${b.ns}h`} hot />
            </div>

            {/* data packets ride under the nodes (the nodes swallow both ends) */}
            {Array.from({ length: b.nPk }, (_, i) => (
              <i key={i} className={`aim-pk ${A(`pk${i}`)}`} />
            ))}

            {/* repetitive tasks: dealt in, auto-checked, swept into the trigger */}
            {CARD_Y.map((y, k) => (
              <div key={y} className={`aim-abs aim-card ${A(`cd${k}`)}`} style={at(CARD_X, y, CARD_W, CARD_H)}>
                <i className="aim-cb" style={atq(7, 4, 10, 10)} />
                <i className="aim-abs aim-ln" style={{ ...atq(24, 6.8, 62 - k * 10, 4.4), background: "rgb(242 243 238/.34)" }} />
                <i className="aim-abs aim-ln" style={{ ...atq(92 - k * 10, 6.8, 26, 4.4), background: "rgb(242 243 238/.16)" }} />
                <span className="aim-rx" style={{ right: cq(6), top: 0, height: cq(CARD_H) }}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 12a8 8 0 1 1-2.6-5.9M20 3.5v5h-5" stroke="#c8f02e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {REPS[k]}
                </span>
                <span className={`aim-ck ${A(`ck${k}`)}`} style={atq(7, 4, 10, 10)}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5.5 12.5 4.2 4.2 8.8-9.4" stroke="#0a0a0b" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            ))}

            <i className={`aim-scn ${A("scn")}`} style={{ left: P(CARD_X), top: P(CARD_Y[0] - 2), height: cq(CARD_H + 4) }} />

            {/* nodes */}
            {NIDS.map((n) => {
              const { c, s, col } = NODES[n];
              return (
                <div key={n} className={`aim-abs aim-node aim-c-${col}${n === "ai" ? " aim-nai" : n === "crm" ? " aim-ncrm" : ""} ${A(`n${n}`)}`} style={at(c[0] - s / 2, c[1] - s / 2, s, s)}>
                  {n === "ai" ? (
                    <>
                      <i className={`aim-orb ${A("orb")}`} />
                      <b>AI</b>
                      <svg viewBox="0 0 24 24">
                        <path d={SPARKLE} fill="#c8f02e" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <Glyph n={n} />
                      {n === "crm" && <b>CRM</b>}
                    </>
                  )}
                </div>
              );
            })}

            {/* the assistant's answer: skeleton lines, typing dots */}
            <div className={`aim-abs aim-bub ${A("bub")}`} style={at(BUB.x, BUB.y, BUB.w, BUB.h)}>
              <svg className="aim-spk" viewBox="0 0 24 24" style={{ left: cq(9), top: cq(7) }}>
                <path d={SPARKLE} fill="currentColor" />
              </svg>
              <span className={`aim-dots ${A("dots")}`} style={{ left: cq(24), top: cq(10.5) }}>
                <i />
                <i />
                <i />
              </span>
              {BUB_LW.map((w, i) => (
                <i
                  key={w}
                  className={`aim-abs aim-ln ${A(`ln${i}`)}`}
                  style={{ ...atq(10, BUB_LY[i] - BUB.y, w, 4.6), background: `rgb(242 243 238/${f(0.34 - i * 0.07)})` }}
                />
              ))}
            </div>

            {/* results: counter reel, bars, time saved */}
            <div className={`aim-abs aim-res ${A("res")}`} style={at(RES.x, RES.y, RES.w, RES.h)}>
              <svg className="aim-trend" viewBox="0 0 24 24" fill="none" style={{ left: cq(10), top: cq(9) }}>
                <path d="M3 17.5 9.2 11l4 4L21 6.8M15.2 6.5H21v5.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={`aim-dt ${A("dt")}`} style={{ right: cq(8), top: cq(7) }}>
                −12 h
              </span>
              <div className="aim-k" style={{ left: cq(10), top: cq(28) }}>
                <span className={`aim-reel ${A("reel")}`}>{REEL.join("\n")}</span>
              </div>
              <div className={`aim-abs aim-bars ${A("bars")}`} style={atq(RES.w - 52, RES.h - 8 - 31, 44, 31)}>
                {BAR_H.map((h, i) => (
                  <i key={i} className="aim-abs aim-barv" style={atq(i * 9.2, 31 - h, 6.4, h)} />
                ))}
              </div>
            </div>

            {/* CTA: forged outline, white-hot pill, rising label */}
            <div className={`aim-clip aim-foc ${A("foo")}`} style={at(b.fo.x, b.fo.y, b.fo.w, b.fo.h)}>
              <div className={`aim-z ${A("foi")}`}>
                <i className="aim-fo" style={{ ...atq(FO_M, FO_M, b.fo.ow, CTA_H + SW_C), borderRadius: `${cq(CR + SW_C / 2)} 0 0 ${cq(CR + SW_C / 2)}` }} />
              </div>
            </div>
            <div className={`aim-cta ${A("cta")}`} style={{ ...at(CTA_X, CTA_Y, ctaW, CTA_H), ...(cfs < CTA_FS0 ? { fontSize: cq(cfs) } : null) }}>
              <span className="aim-ctal">
                <span className={`aim-lbl ${A("lbl")}`}>
                  {label}
                  <svg className="aim-ctaa" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            <i className={`aim-abs aim-ctah ${A("ctaH")}`} style={at(CTA_X, CTA_Y, ctaW, CTA_H)} />

            {/* ── kinetic headline: the tagline; the climax fills the blank ── */}
            <div className="aim-title" style={fs < FS_MAX ? { fontSize: cq(fs) } : undefined}>
              {lines.map((ln, l) => (
                <span key={l} className="aim-tl">
                  {ln.map(({ g, i }, j) => (
                    <span key={i} className={`aim-w ${A(`w${i}`)}`} style={{ transformOrigin: origin(g), ...(j ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null) }}>
                      <Words s={g.text} />
                    </span>
                  ))}
                  {l === climax.line && (
                    <span className="aim-w" style={{ marginLeft: ln.length ? `${f(SPACE_EM, 3)}em` : undefined }}>
                      <i className={`aim-abs aim-blank ${A("blank")}`} style={{ left: 0, top: 0, width: cq(climax.w), height: `${LINE}em` }}>
                        <i className="aim-dash" />
                        <i className="aim-caret" />
                      </i>
                      <span className={`aim-w aim-wL ${A("wL")}`} style={{ transformOrigin: origin(climax) }}>
                        <span className={`aim-gh ${A("gh")}`}>
                          <Words s={climax.text} />
                        </span>
                        <Words s={climax.text} />
                        <span className={`aim-hg ${A("hg")}`}>
                          <Words s={climax.text} />
                        </span>
                      </span>
                      <i className={`aim-abs aim-ul ${A("ul")}`} style={{ width: cq(climax.uw) }} />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* ── front FX: erase printhead, comet, rail heads, pools ── */}
          <div className="aim-L">
            <div className={`aim-scan ${A("scan")}`}>
              <i className="aim-scanw" />
              <i className="aim-scanl" />
              <i className="aim-scanf" style={{ left: "8em" }} />
              <i className="aim-scanf" style={{ left: "108em" }} />
            </div>
            {Array.from({ length: b.nCm }, (_, i) => (
              <i key={i} className={`aim-com ${A(`cm${i}`)}`} />
            ))}
            {HEADS.map((h) => (
              <Fragment key={h.id}>
                <i className={`aim-hb aim-c-${h.c} ${A(`${h.id}b`)}`} />
                <div className={`aim-hd aim-c-${h.c} ${A(`${h.id}p`)}`} style={{ transform: `translate(${cq(h.home[0])},${cq(h.home[1])})` }}>
                  <i className="aim-hc" />
                </div>
              </Fragment>
            ))}
            {b.pf.map((c, i) => (
              <i key={i} className={`aim-pf aim-c-${c || "lime"} ${A(`pf${i}`)}`} />
            ))}
            {b.ps.map((c, i) => (
              <i key={i} className={`aim-ps aim-c-${c || "lime"} ${A(`ps${i}`)}`}>
                <SparkArt />
              </i>
            ))}
          </div>

          <i className={`aim-flash ${A("flash")}`} />
        </div>
      </div>
    </div>
  );
}
