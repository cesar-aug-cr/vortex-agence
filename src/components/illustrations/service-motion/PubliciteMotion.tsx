import { Fragment, type CSSProperties } from "react";
import {
  anim,
  BACK,
  BACK2,
  begin,
  COOL,
  ease,
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
  CHIP_FS,
  CHIP_GAP,
  CHIP_H,
  CHIP_ICON,
  CHIP_PAD,
  CHIP_X,
  CHIP_Y,
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
  PUNCT_PULL,
  SPACE_EM,
  TITLE_W,
  TITLE_X,
  TITLE_Y,
  TLS,
  TRAIL,
  WSP,
  type Group,
  type Layout,
} from "./PubliciteMotion.layout";
import { ScrollPause } from "./ScrollPause";
import type { ServiceMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  "LOCK ON" — hero motion graphic of /services/publicite (online advertising)
 * ─────────────────────────────────────────────────────────────────────────────
 *  One master loop, T = 14 s. Every beat is a keyframe percentage of T: no
 *  animation-delay, no fill-mode, no secondary loop. Same family as the Sites
 *  web laser show (rail heads that charge and fire, white-hot beams, flares,
 *  spark sprays, a printhead, kinetic type slams, glass panels).
 *
 *  Cast: four RAIL HEADS on the dashed rail — lime (left), green (top), blue
 *  (right), cyan (bottom) — a wall-to-wall PRINTHEAD, an AUDIENCE FIELD (a crowd
 *  of people glyphs), a RETICLE, three AD FORMATS (search, social, B2B), the
 *  funnel counters (impressions → clicks → conversions), a ROAS meter, the CTA.
 *
 *  0.07–0.33  The green head stamps the chip (the service title).
 *  0.43–1.54  KINETIC HEADLINE = the tagline. Each word group is shot by a rail
 *             head, lands big and stretched, slams down (squash, rebound) in a
 *             white-hot bloom, sparks fly. The climax line — the last two words,
 *             "bonnes personnes." / "right people." — takes all four heads
 *             (1.54): flash, chromatic jitter, camera shake, laser underline.
 *  1.78–2.70  PRINTHEAD prints the console: the dim crowd, three empty ad slots,
 *             the funnel tiles (zeroed), the ROAS meter.
 *  2.82–4.40  TARGETING. The lime head (left rail) and the cyan head (bottom
 *             rail) glide along the rail and cross their beams on a reticle that
 *             sweeps the crowd: two false stops (brackets half close, the match
 *             reel reads 24 %, 61 %), then LOCK (4.40): the brackets snap, flash,
 *             the segment lights lime in a ripple from its centre, "98 %".
 *  4.63–6.70  THE MESSAGE. The blue head extrudes the three ad formats into
 *             their slots one by one (beam on the moving print front); each ad
 *             then fires its beam into the segment: the segment pulses,
 *             impressions and clicks roll; a conversion comet arcs back from the
 *             crowd into the conversions tile: conversions roll, the ROAS bar
 *             climbs a third.
 *  7.16       ROAS ×4.2: full bar, flare, sparks.
 *  7.40–8.63  CTA FORGE. All four heads track two weld tips round the pill;
 *             collision (8.02): white-hot pill, cools to lime, the label rises.
 *  8.70–9.50  PAYOFF "the right message in front of the right people": the three
 *             ads fire together and converge on the segment: bloom, flash, the
 *             corner fans burst, headline wave, the climax re-glows white-hot.
 *  9.5–12.4   HOLD. Fans sweep behind, glass sheen, premium 3D tilt, the heads
 *             cruise the rail, the reticle turns.
 *  12.6–13.5  ERASE. The printhead sweeps back up: the console vanishes under
 *             it, the headline and the chip are zapped as it crosses them; the
 *             heads go home; seam.
 *
 *  Performance (phones): Chrome restyles every RUNNING CSS animation on every
 *  main-thread frame, so the count stays low (66 animations, ≈ 70 composited
 *  layers):
 *   · the crowd is static artwork (one dim SVG); the lit segment is three static
 *     ring layers (centre → edge) that only fade / scale in — never a dot per
 *     animation; the whole console is ONE printed layer revealed by a clip
 *     window following the printhead (counter-translated wrapper pair); each ad
 *     card is revealed the same way behind the print front;
 *   · one-shot effects (flares, spark bursts, ad beams, comets) are POOLED
 *     (pool(): a few sprites jump, invisible, from event to event); a flare or
 *     an ad beam only ever plays on a sprite of its own colour;
 *   · a rail head is a body (glide + charge swell) and ONE beam for all its
 *     shots (hits, the crosshair, the print front, the forge);
 *   · counters are reels (one strip per counter), kinetic type moves per word
 *     group (stretch instead of per-letter tracking at this size).
 *  Only transform / opacity animate, on HTML boxes; SVG is static artwork. The
 *  root is z-index:1 (its layers paint last), and content-visibility on an
 *  absolutely positioned inner wrapper (overhanging by 3rem, so the glows are
 *  never cut) skips the whole subtree off-screen. <ScrollPause> freezes the
 *  scene while the page scrolls. All static art of the console paints BEFORE any
 *  animated element (static boxes painted after an animated layer get promoted
 *  for overlap). Measured on a 390 px phone at 4× CPU, back-to-back on a loaded
 *  machine: +20 ms per forced main frame (the Sites web scene: +22 in the same
 *  run), idle ≈ +3 ms/s, off-screen ≈ 0.
 *
 *  Reduced motion: the global rule collapses every animation, so the
 *  un-animated base styles ARE the poster: the locked segment, the three ads,
 *  the final counters, ROAS ×4.2 and the lime CTA.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

type Pt = [number, number];
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
const eIO = (u: number) => ease(IO, u);
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
/** deterministic 0–1 noise */
const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// rail
const RI = 11;
const RHI = 400 - RI;

// console (printed by the printhead)
const CON_T = 140; // print pass: top → bottom
const CON_B = 366;
const ER_TOP = 18; // the erase pass ends above the chip
const PC_B = CON_B + 6; // bottom of the console's clip box
// audience field
const FX = 30;
const FY = 142;
const FW = 198;
const FH = 136;
// ad formats (right column)
const AD_X = 238;
const AD_W = 132;
const AD_H = 40;
const AD_Y = [142, 190, 238];
const AD_C = ["cyan", "green", "blue"] as const;
const AD_CY = AD_Y.map((y) => y + AD_H / 2);
const AD_M = 4; // card clip box margin (its glow)
// funnel tiles
const KY = 290;
const KH = 28;
const KX = [30, 146, 262];
const KW = 108;
const K_VAL_X = 24; // value offset in a tile
const K_FS = 11; // value font size (units)
// ROAS meter (CTA row)
const RM = { x: 234, y: CTA_Y, w: 136, h: CTA_H };
const RB = { x: RM.x + 38, y: RM.y + 9.7, w: 54, h: 3.2 }; // bar
const RV_X = RM.x + 100; // value
const RV_FS = 10;

// crowd: 11 × 8 people, odd rows offset half a step
const COLS = 11;
const ROWS = 8;
const PX = 16;
const PY = 14.6;
const PEOPLE = Array.from({ length: COLS * ROWS }, (_, i) => {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  return { i, x: FX + 15 + c * PX + (r % 2 ? PX / 2 : 0), y: FY + 16 + r * PY, o: 0.16 + 0.16 * rnd(i) };
});
// the target segment: an organic blob round S, lit in three rings
const SEG_C: Pt = [150, 206];
const SEG_RX = 34;
const SEG_RY = 27;
const SEG = PEOPLE.map((p) => ({ ...p, d: Math.hypot((p.x - SEG_C[0]) / SEG_RX, (p.y - SEG_C[1]) / SEG_RY) }))
  .filter((p) => p.d <= 1 + 0.35 * (rnd(p.i + 7) - 0.5))
  .map((p) => ({ ...p, ring: p.d < 0.42 ? 0 : p.d < 0.78 ? 1 : 2 }));
/** the segment's centroid: the reticle locks here, the ads aim here */
const S: Pt = [SEG.reduce((a, p) => a + p.x, 0) / SEG.length, SEG.reduce((a, p) => a + p.y, 0) / SEG.length + 2];
const SEG_OX = `${f(((S[0] - FX) / FW) * 100, 2)}%`;
const SEG_OY = `${f(((S[1] - FY) / FH) * 100, 2)}%`;
/** a person glyph (head + shoulders), centre (x, y) */
const person = (x: number, y: number, k = 1) => {
  const r = 2.1 * k;
  const hy = y - 2.7 * k;
  const w = 4.2 * k;
  const by = y + 5.2 * k;
  return `M${f(x - r, 2)} ${f(hy, 2)}a${f(r, 2)} ${f(r, 2)} 0 1 0 ${f(2 * r, 2)} 0a${f(r, 2)} ${f(r, 2)} 0 1 0 ${f(-2 * r, 2)} 0ZM${f(x - w, 2)} ${f(by, 2)}a${f(w, 2)} ${f(w, 2)} 0 0 1 ${f(2 * w, 2)} 0Z`;
};
const dot = (x: number, y: number, r: number) => `M${f(x - r, 2)} ${f(y, 2)}a${r} ${r} 0 1 0 ${f(2 * r, 2)} 0a${r} ${r} 0 1 0 ${f(-2 * r, 2)} 0Z`;

// reticle
const RR = 34; // ring radius
const P0: Pt = [70, 244];
const RA: Pt = [184, 186];
const RBp: Pt = [82, 186];
const RET_ON = 2820;
const RET_MV: [number, number, Pt, Pt][] = [
  [2900, 3300, P0, RA],
  [3500, 3880, RA, RBp],
  [4060, 4380, RBp, S],
];
const LOCK = 4400;
function retAt(t: number): Pt {
  let p = P0;
  for (const [a, b, from, to] of RET_MV) {
    if (t <= a) return p;
    if (t < b) return lerp(from, to, eIO((t - a) / (b - a)));
    p = to;
  }
  return p;
}
const MATCH = ["0%", "12%", "24%", "37%", "49%", "61%", "74%", "86%", "98%"];

// funnel reels
const IMP = ["0", "5k", "11k", "16k", "21k", "27k", "32k", "37k", "43k", "48k"];
const CLK = ["0", "208", "415", "623", "830", "1040", "1245", "1450", "1660", "1870"];
const CNV = ["0", "24", "47", "71", "94", "118", "141", "165", "188", "212"];
const ROAS = ["×0", "×0.7", "×1.4", "×2.1", "×2.8", "×3.5", "×4.2"];

// fans: corner emitters, just outside the root (inside the stage padding)
const EBL: Pt = [-6, 406];
const EBR: Pt = [406, 406];

/* ───────────────────────────── master beats (ms) ─────────────────────────── */

const CHIP_T = 200;
const SLOT = [540, 760, 980, 1200]; // headline word groups, right-aligned onto the last slots
const LAST = 1540; // climax impact
const PRE = 110; // beam lands → word slams down for PRE ms
const PRE_L = 150;
const PH_ON = 1780; // printhead ignition
const PH_A = 1860; // print pass
const PH_Z = 2700;
const PR = [4700, 5440, 6180]; // ad print fronts
const PR_D = 340;
const DLV = PR.map((t) => t + PR_D + 30); // the ad fires into the segment
const BEAM_T = 150; // ad beam travel
const LAND = DLV.map((t) => t + BEAM_T);
const COMET_FLY = 340;
const CM_A = LAND.map((t) => t + 120);
const CM_L = CM_A.map((t) => t + COMET_FLY);
const ROAS_T = CM_L[2];
const FG_A = 7480; // CTA forge
const FG_Z = 8020;
const PAY = 8700; // payoff: the three ads fire together
const PAY_L = PAY + BEAM_T;
const WAVE = 8900;
const SH_A = 10150; // glass sheen
const SH_Z = 10850;
const TILT = [10650, 11200, 11800, 12350];
const ER_A = 12600; // erase pass (bottom → top)
const ER_Z = 13500;

/** where the printhead is (going down, or up during the erase pass) */
function scanAt(y: number, up = false): number {
  if (!up) return Math.round(PH_A + (PH_Z - PH_A) * inv(eIO, (y - CON_T) / (CON_B - CON_T)));
  return Math.round(ER_A + (ER_Z - ER_A) * inv(eIO, (CON_B - y) / (CON_B - ER_TOP)));
}
/** the ad print front: x of the moving edge (right → left) */
const frontAt = (i: number, t: number) =>
  AD_X + AD_W + AD_M - (AD_W + 2 * AD_M) * ease(IOS, Math.max(0, Math.min(1, (t - PR[i]) / PR_D)));

/* ───────────────────────────── rail heads ─────────────────────────────────── */

const HEADS = [
  { id: "hL", c: "lime", home: [RI, 170] as Pt },
  { id: "hT", c: "green", home: [160, RI] as Pt },
  { id: "hR", c: "blue", home: [RHI, 120] as Pt },
  { id: "hB", c: "cyan", home: [250, RHI] as Pt },
];
const [HL, HT, HR, HB] = [0, 1, 2, 3];

// glides along the rail ([t0, t1] → to, eased) or follows a point (crosshair)
type Glide = { t0: number; t1: number; to?: Pt; at?: (t: number) => Pt; e?: string };
const FOLLOW_A = 2700;
const FOLLOW_Z = LOCK + 170;
const PLAN: Glide[][] = [];
PLAN[HL] = [
  { t0: 2250, t1: FOLLOW_A, to: [RI, P0[1]] },
  { t0: FOLLOW_A, t1: FOLLOW_Z, at: (t) => [RI, retAt(t)[1]] },
  { t0: 6900, t1: 7300, to: [RI, 330] },
  { t0: 9400, t1: 11000, to: [RI, 205], e: IOS },
  { t0: 11100, t1: 12400, to: [RI, 262], e: IOS },
  { t0: 12600, t1: 13600, to: HEADS[HL].home },
];
PLAN[HT] = [
  { t0: 6900, t1: 7300, to: [112, RI] },
  { t0: 9400, t1: 11200, to: [250, RI], e: IOS },
  { t0: 11300, t1: 12500, to: [196, RI], e: IOS },
  { t0: 12600, t1: 13600, to: HEADS[HT].home },
];
PLAN[HR] = [
  { t0: 4280, t1: 4560, to: [RHI, AD_CY[0]] },
  { t0: 5200, t1: 5360, to: [RHI, AD_CY[1]] },
  { t0: 5940, t1: 6100, to: [RHI, AD_CY[2]] },
  { t0: 6900, t1: 7300, to: [RHI, 312] },
  { t0: 9300, t1: 11000, to: [RHI, 196], e: IOS },
  { t0: 11100, t1: 12500, to: [RHI, 250], e: IOS },
  { t0: 12600, t1: 13600, to: HEADS[HR].home },
];
PLAN[HB] = [
  { t0: 2250, t1: FOLLOW_A, to: [P0[0], RHI] },
  { t0: FOLLOW_A, t1: FOLLOW_Z, at: (t) => [retAt(t)[0], RHI] },
  { t0: 6900, t1: 7300, to: [96, RHI] },
  { t0: 9300, t1: 11100, to: [300, RHI], e: IOS },
  { t0: 11200, t1: 12500, to: [226, RHI], e: IOS },
  { t0: 12600, t1: 13600, to: HEADS[HB].home },
];
/** where head k is at time t */
function headAt(k: number, t: number): Pt {
  let p = HEADS[k].home;
  for (const g of PLAN[k]) {
    if (t < g.t0) break;
    if (g.at) {
      if (t <= g.t1) return g.at(t);
      p = g.at(g.t1);
    } else if (g.to) {
      if (t >= g.t1) p = g.to;
      else return lerp(p, g.to, ease(g.e ?? IO, (t - g.t0) / (g.t1 - g.t0)));
    }
  }
  return p;
}
// which head shoots which title slot
const SLOT_HEAD = [HT, HL, HT, HR];

/* ───────────────────────────── generic shapes ──────────────────────────── */

const Z0 = "opacity:0";
const O1 = "opacity:1";
/** translate() of a point in units, 0.1cqw precision */
const tr2 = (x: number, y: number) => `translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw)`;
/* pooled sprites — values: F [x, y, sx, sy, o] · S [x, y, rot, s, o] · legs
   [x, y, rot, tail, sx] · comet [x, y, rot, o] (x, y, tail in units) */
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

/** keep the fewest samples whose linear interpolation stays within tol (per channel) */
type Smp = { t: number; v: number[] };
function rdp(ss: Smp[], tol: number[]): Smp[] {
  const keep = ss.map((_, i) => i === 0 || i === ss.length - 1);
  const rec = (i: number, j: number) => {
    let w = -1;
    let worst = 1;
    for (let k = i + 1; k < j; k++) {
      const u = (ss[k].t - ss[i].t) / (ss[j].t - ss[i].t);
      for (let c = 0; c < tol.length; c++) {
        const err = Math.abs(ss[i].v[c] + (ss[j].v[c] - ss[i].v[c]) * u - ss[k].v[c]) / tol[c];
        if (err > worst) {
          worst = err;
          w = k;
        }
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

/* ───────────────────────────── rail heads: body + beam ───────────────────── */

type Shot = { k: "hit"; land: number; to: Pt; travel: number } | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number };
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.a - s.travel);
const shotEnd = (s: Shot) => (s.k === "hit" ? s.land + 167 : s.b + 152);

/**
 * One head = TWO elements: the body (glides on the rail — or follows the
 * reticle — and swells while it charges: translate + scale) and its beam
 * (translate to the head, rotate · scaleX, fades out at full length once its
 * energy is delivered). A tracking beam follows a moving point from a head that
 * may itself be moving (the crosshair).
 */
function headKF(k: number, list: Shot[]) {
  const h = HEADS[k];
  const sorted = [...list].sort((p, q) => shotStart(p) - shotStart(q));
  sorted.forEach((s, i) => {
    if (i && shotStart(s) <= shotEnd(sorted[i - 1])) throw new Error(`pbm: head ${h.id} fires twice at ${shotStart(s)} ms`);
  });
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
    if (s.k === "hit") {
      const o = headAt(k, t0);
      if (dist(o, headAt(k, shotEnd(s))) > 0.01) throw new Error(`pbm: head ${h.id} moves while firing at ${t0} ms`);
      const g = un(angle(o, s.to));
      const len = dist(o, s.to) / 400;
      const B = (sx: number, op = 1): number[] => [o[0], o[1], g, sx, op];
      fr.push([t0 - 4, B(0)], [t0, B(0), GROW], [s.land, B(len)], [s.land + 45, B(len), TAIL], [s.land + 165, B(len, 0)], [s.land + 167, B(0, 0)]);
      fires.push([t0, t0]);
    } else {
      const o0 = headAt(k, t0);
      const p0 = s.at(s.a);
      const g0 = un(angle(o0, p0));
      fr.push([t0 - 4, [o0[0], o0[1], g0, 0, 1]], [t0, [o0[0], o0[1], g0, 0, 1], GROW]);
      const ss: Smp[] = [];
      for (let i = 0, n = Math.ceil((s.b - s.a) / 8); i <= n; i++) {
        const t = s.a + ((s.b - s.a) * i) / n;
        const o = headAt(k, t);
        const p = s.at(t);
        ss.push({ t, v: [o[0], o[1], un(angle(o, p)), dist(o, p) / 400] });
      }
      for (const q of rdp(ss, [0.3, 0.3, 0.3, 0.0015])) fr.push([q.t, [...q.v, 1]]);
      const z = ss[ss.length - 1].v;
      fr.push([s.b + 20, [z[0], z[1], z[2], z[3], 1], TAIL], [s.b + 150, [z[0], z[1], z[2], z[3], 0]], [s.b + 152, [z[0], z[1], z[2], 0, 0]]);
      fires.push([t0, s.b]);
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
  for (const g of PLAN[k]) {
    if (g.at) {
      for (let t = g.t0; t < g.t1; t += 16) {
        const q = g.at(t);
        xs.push([t, q[0] / 4]);
        ys.push([t, q[1] / 4]);
      }
      p = g.at(g.t1);
      xs.push([g.t1, p[0] / 4]);
      ys.push([g.t1, p[1] / 4]);
    } else if (g.to) {
      xs.push([g.t0, p[0] / 4, g.e ?? IO], [g.t1, g.to[0] / 4]);
      ys.push([g.t0, p[1] / 4, g.e ?? IO], [g.t1, g.to[1] / 4]);
      p = g.to;
    }
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

const UL_Y = 0.92; // climax underline: top and thickness (em of the title)
const UL_H = 0.075;
const SW_C = 1.4; // CTA forge outline width (units)
const FO_M = 4; // the CTA forge clip box's margin around the outline (its glow)

function build(title: string, tagline: string, cta: string, ns: string) {
  begin(ns);
  const lay = layout(title, tagline, cta);
  const { fs, lh, groups, climax, ctaW, chipW } = lay;
  const shots: Shot[][] = HEADS.map(() => []);
  const FL: PoolEvent[] = []; // flares
  const SP: PoolEvent[] = []; // spark bursts
  const LG: PoolEvent[] = []; // ad beams
  const CM: PoolEvent[] = []; // comets

  /* ── chip: stamped by the green head ── */
  const CHIP_C: Pt = [CHIP_X + chipW / 2, CHIP_Y + CHIP_H / 2];
  const oChip = scanAt(CHIP_Y + CHIP_H / 2, true);
  {
    const L = (o: number, s: number, k: number) => `opacity:${f(o)};transform:scale(${f(s)}) skewX(${f(k)}deg)`;
    kf("chip", [
      [0, L(0, 1.7, -14)],
      [CHIP_T - 60, L(0, 1.7, -14)],
      [CHIP_T - 42, L(1, 1.55, -14), IN],
      [CHIP_T, L(1, 0.9, 6), OUT],
      [CHIP_T + 90, L(1, 1.06, -2), IO],
      [CHIP_T + 190, L(1, 1, 0)],
      [oChip - 12, L(1, 1, 0)],
      [oChip + 14, L(0.25, 1, 0)],
      [oChip + 30, L(0.8, 1, 0)],
      [oChip + 60, L(0, 1, 0)],
    ]);
  }
  shots[HT].push({ k: "hit", land: CHIP_T - 40, to: CHIP_C, travel: 90 });
  FL.push(flareEv([CHIP_X + 8, CHIP_C[1]], CHIP_T, 0.9, 300, 1, "green"));

  /* ── headline: per group slam (fitted scale + origin, stretch → squash →
        rebound) in a white-hot bloom; wave in the payoff; zapped by the erase ── */
  const pY = (em: number) => f((em / LINE) * 100, 2); // em → % of the group box
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
      [wave + 120, tr(1, -0.16, 1.018, 1.018, -2, cx(1.018)), IO],
      [wave + 330, tr(1, 0, 1, 1, 0)],
      [out[0] - 12, tr(1, 0, 1, 1, 0), OUT],
      [out[1] + 30, tr(0, -0.2, 1.06, 1, -12)],
    ]);
  }
  const waveAt = (slot: number) => WAVE + (Math.max(1, slot) - 1) * 90;
  const WAVE_L = WAVE + 3 * 90 + 40;
  const oLine = (l: number): [number, number] => [scanAt(TITLE_Y + (l + 1) * lh, true), scanAt(TITLE_Y + l * lh, true)];
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
    SP.push(sparkEv([g.cx, g.cy + 0.42 * lh], t, 0, 0.78, 410, 2));
  });
  slamKF("wL", LAST, true, WAVE_L, oLine(climax.line), climax);
  for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: LAST - PRE_L, to: [climax.cx, climax.cy], travel: 100 });
  FL.push(flareEv([climax.cx, climax.cy], LAST - PRE_L, 1.6, 460, 2, "lime"));
  SP.push(sparkEv([climax.cx, climax.cy + 0.42 * lh], LAST, 0, 1.08, 560, 2));
  // the climax lands white-hot (its own copy cools to lime, re-glows in the
  // payoff) while a cyan / blue chromatic ghost jitters behind it
  kf("hg", [[0, Z0], [LAST - 2, Z0], [LAST + 12, O1], [LAST + 110, O1, COOL], [LAST + 640, Z0], [WAVE_L - 4, Z0], [WAVE_L + 70, "opacity:.6"], [WAVE_L + 520, Z0]]);
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

  /* ── the console is PRINTED: a clip window whose bottom edge is the printhead ── */
  {
    const hC = PC_B - ER_TOP;
    const hk: [number, number, string?][] = [
      [0, hC],
      [PH_A - 2, hC],
      [PH_A, PC_B - CON_T, IO],
      [PH_Z, PC_B - CON_B],
      [PH_Z + 160, 0],
      [ER_A, 0, IO],
      [ER_Z, hC],
    ];
    kf("pwo", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(-h / 4)}cqw)`, e]));
    kf("pwi", hk.map(([t, h, e]): Stop => [t, `transform:translateY(${f(h / 4)}cqw)`, e]));
  }
  {
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    kf("scan", [
      [0, Y(0, CON_T)],
      [PH_ON, Y(0, CON_T)],
      [PH_ON + 30, Y(1, CON_T)],
      [PH_ON + 52, Y(0.35, CON_T)],
      [PH_ON + 80, Y(1, CON_T)],
      [PH_A, Y(1, CON_T), IO],
      [PH_Z, Y(1, CON_B)],
      [PH_Z + 170, Y(0, CON_B + 14)],
      [ER_A - 160, Y(0, CON_B)],
      [ER_A - 40, Y(1, CON_B)],
      [ER_A, Y(1, CON_B), IO],
      [ER_Z, Y(1, ER_TOP)],
      [ER_Z + 160, Y(0, ER_TOP - 10)],
    ]);
  }

  /* ── TARGETING: the reticle sweeps the crowd on the crossed beams, locks ── */
  {
    const R = (o: number, p: Pt) => `opacity:${f(o)};transform:${tr2(p[0], p[1])}`;
    const st: Stop[] = [
      [0, R(0, P0)],
      [RET_ON - 4, R(0, P0)],
      [RET_ON + 20, R(1, P0)],
      [RET_ON + 40, R(0.3, P0)],
      [RET_ON + 70, R(1, P0)],
    ];
    for (const [a, b, from, to] of RET_MV) st.push([a, R(1, from), IO], [b, R(1, to)]);
    st.push([ER_Z + 20, R(1, S)], [ER_Z + 40, R(0, S)]);
    kf("ret", st);
    // ring: turns while searching, punches at the lock and in the payoff, turns in the hold
    const G = (s: number, r: number) => `transform:rotate(${f(r, 1)}deg) scale(${f(s, 3)})`;
    kf("ring", [
      [0, G(0.7, -40)],
      [RET_ON - 4, G(0.7, -40), OUT],
      [RET_ON + 260, G(1, 0), "cubic-bezier(.3,0,.7,1)"],
      [LOCK - 20, G(1, 90)],
      [LOCK + 70, G(1.16, 96), OUT],
      [LOCK + 300, G(1, 90), IO],
      [PAY_L - 2, G(1, 90), OUT],
      [PAY_L + 90, G(1.14, 94), IO],
      [PAY_L + 360, G(1, 90), "cubic-bezier(.4,0,.6,1)"],
      [ER_A, G(1, 180)],
    ]);
    // brackets: diamond (searching) → half close at a false stop → reopen →
    // square snap at the lock (squash, rebound)
    const Bk = (r: number, s: number, sy = s) => `transform:rotate(${f(r)}deg) scale(${f(s, 3)},${f(sy, 3)})`;
    const st2: Stop[] = [
      [0, Bk(45, 1.5)],
      [RET_ON + 60, Bk(45, 1.5), OUT],
      [RET_ON + 360, Bk(45, 1.32)],
    ];
    for (const [, b] of RET_MV.slice(0, 2))
      st2.push([b, Bk(45, 1.32), OUT], [b + 110, Bk(45, 1.12)], [b + 170, Bk(45, 1.12), IO], [b + 300, Bk(45, 1.38)]);
    st2.push([LOCK - 100, Bk(45, 1.36), IN], [LOCK, Bk(0, 0.9, 0.86), OUT], [LOCK + 100, Bk(0, 1.05, 1.07), IO], [LOCK + 220, Bk(0, 1)]);
    kf("brk", st2);
    // match reel
    const Rl = (i: number) => `transform:translateY(${f((-100 * i) / MATCH.length, 3)}%)`;
    kf("match", [
      [0, Rl(0)],
      [RET_MV[0][0], Rl(0), EO],
      [RET_MV[0][1], Rl(2)],
      [RET_MV[1][0], Rl(2), EO],
      [RET_MV[1][1], Rl(5)],
      [RET_MV[2][0], Rl(5), EO],
      [LOCK, Rl(8)],
    ]);
  }
  // the crossed beams: lime from the left rail, cyan from the bottom rail
  shots[HL].push({ k: "track", a: RET_ON, b: LOCK + 120, travel: 60, at: retAt });
  shots[HB].push({ k: "track", a: RET_ON, b: LOCK + 120, travel: 60, at: retAt });
  {
    // the crossing point glows (rides the reticle), blooms at the lock
    const fr: Frame[] = [[RET_ON - 22, [P0[0], P0[1], 0.3, 0.3, 0], OUT]];
    for (let t = RET_ON; t < LOCK; t += 40) {
      const p = retAt(t);
      fr.push([t, [p[0], p[1], 0.5, 0.5, 0.9]]);
    }
    fr.push([LOCK, [S[0], S[1], 1.7, 1.7, 1], OUT], [LOCK + 520, [S[0], S[1], 0.7, 0.7, 0]]);
    FL.push({ pri: 2, tag: "lime", fr });
  }
  SP.push(sparkEv([S[0], S[1] + 6], LOCK, 0, 0.8, 480, 2));
  // segment: three rings light from the centre outwards; its glow pulses with every hit
  [0, 1, 2].forEach((r) => {
    const t = LOCK + r * 85;
    kf(`sg${r}`, [
      [0, "opacity:0;transform:scale(.6)"],
      [t - 2, "opacity:0;transform:scale(.6)", OUT],
      [t + 140, "opacity:1;transform:scale(1.07)", IO],
      [t + 340, "opacity:1;transform:scale(1)"],
    ]);
  });
  {
    const Gl = (o: number, s: number) => `opacity:${f(o)};transform:scale(${f(s)})`;
    const st: Stop[] = [
      [0, Gl(0, 0.5)],
      [LOCK - 2, Gl(0, 0.5), OUT],
      [LOCK + 60, Gl(1, 1.35), COOL],
      [LOCK + 600, Gl(0.55, 1)],
    ];
    for (const t of LAND) st.push([t - 2, Gl(0.55, 1), OUT], [t + 50, Gl(1, 1.28), COOL], [t + 420, Gl(0.55, 1)]);
    st.push([PAY_L - 2, Gl(0.55, 1), OUT], [PAY_L + 60, Gl(1, 1.6), COOL], [PAY_L + 800, Gl(0.6, 1)]);
    st.push([PAY_L + 1600, Gl(0.6, 1), IOS], [PAY_L + 2400, Gl(0.4, 0.92), IOS], [ER_A, Gl(0.6, 1)]);
    kf("sgl", st);
  }

  // the rest of the crowd dims once the segment is found
  kf("dim", [
    [0, Z0],
    [LOCK + 60, Z0, IO],
    [LOCK + 520, O1],
  ]);

  /* ── THE MESSAGE: the blue head extrudes the three ads; each fires into the
        segment; a conversion comet arcs back into the funnel ── */
  AD_Y.forEach((_, i) => {
    const W = AD_W + 2 * AD_M;
    const st: [number, number, string?][] = [
      [0, W],
      [PR[i], W, IOS],
      [PR[i] + PR_D, 0],
      [ER_Z + 10, 0],
      [ER_Z + 12, W],
    ];
    kf(`ado${i}`, st.map(([t, x, e]): Stop => [t, `transform:translateX(${f(x / 4, 3)}cqw)`, e]));
    kf(`adi${i}`, st.map(([t, x, e]): Stop => [t, `transform:translateX(${f(-x / 4, 3)}cqw)`, e]));
    shots[HR].push({ k: "track", a: PR[i], b: PR[i] + PR_D, travel: 70, at: (t) => [frontAt(i, t), AD_CY[i]] });
    // the print front glows
    const fr: Frame[] = [[PR[i] - 22, [frontAt(i, PR[i]), AD_CY[i], 0.3, 0.3, 0], OUT]];
    for (let j = 0; j <= 6; j++) {
      const t = PR[i] + (PR_D * j) / 6;
      fr.push([t, [frontAt(i, t), AD_CY[i], 0.42, 0.78, 1]]);
    }
    fr[fr.length - 1][2] = OUT;
    fr.push([PR[i] + PR_D + 220, [AD_X - AD_M, AD_CY[i], 0.3, 0.3, 0]]);
    FL.push({ pri: 2, tag: "blue", fr });
  });
  // ad beams: the ad fires into the segment (the packet's tail follows its head)
  const adBeam = (i: number, t0: number) => {
    const from: Pt = [AD_X - 1, AD_CY[i]];
    const len = dist(from, S);
    const a = angle(from, S);
    const V = (tail: number, sx: number) => [from[0], from[1], a, tail, sx];
    LG.push({
      pri: 2,
      tag: AD_C[i],
      fr: [
        [t0 - 2, V(0, 0)],
        [t0, V(0, 0), "cubic-bezier(.3,0,.6,1)"],
        [t0 + BEAM_T, V(0, len / 400)],
        [t0 + BEAM_T + 40, V(0, len / 400), "cubic-bezier(.4,0,.7,1)"],
        [t0 + BEAM_T + 200, V(len, 0)],
        [t0 + BEAM_T + 202, V(0, 0)],
      ],
    });
    FL.push(flareEv(from, t0, 0.75, 220, 1, AD_C[i]));
  };
  // comets: segment → conversions tile (quadratic arcs, head first)
  const CNV_P: Pt = [KX[2] + K_VAL_X + 6, KY + KH / 2];
  DLV.forEach((t, i) => {
    adBeam(i, t);
    FL.push(flareEv(S, LAND[i], 1.25, 400, 2, "lime"));
    const p0 = S;
    const p2 = CNV_P;
    const pcn: Pt = [272 - i * 8, 214 + i * 6];
    const t0 = CM_A[i];
    const t1 = CM_L[i];
    const at = (t: number): [Pt, number] => {
      const u0 = Math.max(0, Math.min(1, (t - t0) / (t1 - t0)));
      const u = u0 * u0 * (3 - 2 * u0);
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
    FL.push(flareEv(p2, t1, 0.85, 300, 1, "lime"));
  });
  // reels: impressions + clicks roll with each ad beam, conversions + ROAS with each comet
  {
    const reel = (name: string, n: number, steps: [number, number][], e = EO) => {
      const R = (i: number) => `transform:translateY(${f((-100 * i) / n, 3)}%)`;
      const st: Stop[] = [[0, R(0)]];
      let cur = 0;
      for (const [t, i] of steps) {
        st.push([t, R(cur), e], [t + 420, R(i)]);
        cur = i;
      }
      kf(name, st);
    };
    reel("imp", IMP.length, LAND.map((t, i) => [t, 3 * (i + 1)]));
    reel("clk", CLK.length, LAND.map((t, i) => [t + 90, 3 * (i + 1)]));
    reel("cnv", CNV.length, CM_L.map((t, i) => [t, 3 * (i + 1)]));
    reel("roas", ROAS.length, CM_L.map((t, i) => [t, 2 * (i + 1)]));
    const Bs = (s: number) => `transform:scaleX(${f(s, 3)})`;
    kf("rbar", [
      [0, Bs(0)],
      [CM_L[0], Bs(0), BACK2],
      [CM_L[0] + 160, Bs(0.333)],
      [CM_L[1], Bs(0.333), BACK2],
      [CM_L[1] + 160, Bs(0.667)],
      [CM_L[2], Bs(0.667), BACK],
      [CM_L[2] + 380, Bs(1)],
    ]);
  }
  // ROAS ×4.2: the bar's tip flares
  const RTIP: Pt = [RB.x + RB.w, RB.y + RB.h / 2];
  FL.push(flareEv(RTIP, ROAS_T + 160, 1.3, 420, 2, "lime"));
  SP.push(sparkEv(RTIP, ROAS_T + 160, 0, 0.62, 440, 2));

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
  shots[HT].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HR].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipA), travel: 80 });
  shots[HL].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  shots[HB].push({ k: "track", a: FG_A, b: FG_Z, at: tipAt(tipB), travel: 80 });
  SP.push(sparkEv([CTA_X + ctaW, cyM], FG_Z, 52, 0.9, 500, 2));
  kf("cta", [
    [0, "opacity:0;transform:scale(1)"],
    [FG_Z - 2, "opacity:0;transform:scale(1)"],
    [FG_Z, "opacity:1;transform:scale(1)", OUT],
    [FG_Z + 110, "opacity:1;transform:scale(1.045)", IO],
    [FG_Z + 330, "opacity:1;transform:scale(1)"],
  ]);
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
    const L0 = FG_Z + 150;
    kf("lbl", [
      [0, "transform:translateY(118%) skewY(9deg)"],
      [L0, "transform:translateY(118%) skewY(9deg)", BACK2],
      [L0 + 460, "transform:translateY(0) skewY(0deg)"],
    ]);
  }

  /* ── PAYOFF: the three ads fire together into the segment ── */
  AD_Y.forEach((_, i) => adBeam(i, PAY));
  FL.push(flareEv(S, PAY_L, 1.9, 560, 2, "lime"));
  SP.push(sparkEv([S[0], S[1] + 4], PAY_L, 0, 1.05, 560, 2));

  /* ── rail heads: glide, charge, fire ── */
  HEADS.forEach((_, k) => headKF(k, shots[k]));

  /* ── fans of beams (back layer): rig rotation + on/off, spread (scaleY) ── */
  {
    const DARK = ER_A - 120;
    const rig = (a: number[]): Key[] => [
      [0, a[0]],
      [PAY_L - 40, a[0], IO],
      [PAY_L + 650, a[1], IO],
      [PAY_L + 1450, a[2], IO],
      [TILT[0] - 100, a[3], IO],
      [TILT[3], a[4], IO],
      [ER_Z, a[0]],
    ];
    const fO: Key[] = [
      [0, 0],
      [PAY_L - 30, 0],
      [PAY_L, 1],
      [PAY_L + 30, 0.35],
      [PAY_L + 60, 1],
      [PAY_L + 1250, 1],
      [PAY_L + 1750, 0.5],
      [DARK - 350, 0.5],
      [DARK, 0],
    ];
    const L = [-44, -58, -26, -64, -34];
    anim("fLr", fO, [["rotate", "deg", 1, rig(L)]]);
    anim("fRr", fO, [["rotate", "deg", 1, rig(L.map((a) => -180 - a))]]);
    const sg = (d: number) => `transform:scaleY(${f(Math.tan((2 * d * Math.PI) / 180) / Math.tan((20 * Math.PI) / 180), 3)})`;
    kf("fS", [
      [0, sg(0)],
      [PAY_L, sg(0), OUT],
      [PAY_L + 300, sg(13)],
      [PAY_L + 1250, sg(10), IO],
      [DARK - 300, sg(10), IO],
      [DARK + 50, sg(3)],
      [ER_Z, sg(0)],
    ]);
  }

  /* ── hold: glass sheen, premium tilt ── */
  {
    // the band fades in and out along its sweep (no hard edge over the margins)
    anim(
      "sheen",
      [
        [0, 0],
        [SH_A, 0],
        [SH_A + 220, 1],
        [SH_Z - 260, 1],
        [SH_Z, 0],
      ],
      [
        [
          "translateX",
          "%",
          1,
          [
            [0, -130],
            [SH_A, -130, "cubic-bezier(.45,.05,.55,.95)"],
            [SH_Z, 300],
            [SH_Z + 2, -130],
          ],
        ],
        ["skewX", "deg", 0, -18],
      ],
    );
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
    shake(LAST, 1);
    shake(LOCK, 0.5);
    shake(ROAS_T + 160, 0.3);
    shake(FG_Z, 0.45);
    shake(PAY_L, 0.8);
    kf("shake", st);
    kf("flash", [
      [0, Z0],
      [LAST - 2, Z0],
      [LAST + 20, "opacity:.95"],
      [LAST + 460, Z0],
      [LOCK - 2, Z0],
      [LOCK + 25, "opacity:.5"],
      [LOCK + 420, Z0],
      [FG_Z - 2, Z0],
      [FG_Z + 25, "opacity:.4"],
      [FG_Z + 420, Z0],
      [PAY_L - 2, Z0],
      [PAY_L + 30, "opacity:.75"],
      [PAY_L + 560, Z0],
    ]);
  }

  /* ── pools ── */
  // headroom: sprites are only created when needed, so a longer tagline
  // (more slam groups) gets an extra flare instead of a render-time throw
  const pf = pool("pf", FL, 10, fmtF, true);
  const ps = pool("ps", SP, 2, fmtS);
  const lg = pool("lg", LG, 3, fmtLeg, true);
  const nCm = pool("cm", CM, 1, fmtCom).length;

  return { css: (BASE + end()).replace(/\n/g, ""), lay, pf, ps, lg, nCm, fo };
}

/* ───────────────────────────── static styles ─────────────────────────────── */

const BEAM_BG =
  "linear-gradient(rgb(var(--pbm-hot)/.95),rgb(var(--pbm-hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--pbm-c)/.07) 20%,rgb(var(--pbm-c)/.3) 37%,rgb(var(--pbm-c)/.85) 47%,rgb(var(--pbm-c)/.85) 53%,rgb(var(--pbm-c)/.3) 63%,rgb(var(--pbm-c)/.07) 80%,transparent)";
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--pbm-hot)) ${core},rgb(var(--pbm-c)/.8) ${mid},rgb(var(--pbm-c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";

const BASE = `
.pbm-root{--pbm-lime:200 240 46;--pbm-cyan:20 224 200;--pbm-green:34 211 140;--pbm-blue:46 102 255;--pbm-hot:242 243 238;position:relative;z-index:20;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;forced-color-adjust:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;letter-spacing:normal;word-spacing:normal;text-align:left}
.pbm-cv{position:absolute;inset:-3rem;content-visibility:auto;contain-intrinsic-size:0 0}
.pbm-cv>.pbm-L{inset:3rem}
html.a11y-hide-img .pbm-cv{display:none}
.pbm-root i{font-style:normal}
.pbm-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
.pbm-root[data-paused] .pbm-a{animation-play-state:paused}
.pbm-L{position:absolute;inset:0}
.pbm-abs{position:absolute;display:block}
.pbm-clip{position:absolute;overflow:hidden;overflow:clip}
.pbm-o0{position:absolute;width:100cqw;height:100cqw}
.pbm-z{position:absolute;left:0;top:0;width:0;height:0}
.pbm-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.09) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.pbm-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.pbm-floor{position:absolute;left:6%;top:89%;width:88%;height:8%;border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.26),rgb(20 224 200/.07) 60%,transparent)}
.pbm-plane{position:absolute;inset:0;transform-origin:50% 55%}
.pbm-pwo{left:-2cqw;top:${cq(ER_TOP)};width:104cqw;height:${cq(PC_B - ER_TOP)}}
.pbm-c-lime{--pbm-c:var(--pbm-lime)}.pbm-c-cyan{--pbm-c:var(--pbm-cyan)}.pbm-c-green{--pbm-c:var(--pbm-green)}.pbm-c-blue{--pbm-c:var(--pbm-blue)}
.pbm-chip{position:absolute;left:${cq(CHIP_X)};top:${cq(CHIP_Y)};height:${cq(CHIP_H)};box-sizing:border-box;padding:0 ${cq(CHIP_PAD)};border-radius:2cqw;display:flex;align-items:center;gap:${cq(CHIP_GAP)};font-family:${MONO};font-size:${cq(CHIP_FS)};font-weight:700;white-space:nowrap;color:#14e0c8;border:1px solid rgb(var(--pbm-cyan)/.4);background:rgb(var(--pbm-cyan)/.07);transform-origin:0 50%}
.pbm-chip svg{flex:none;width:${cq(CHIP_ICON)};height:${cq(CHIP_ICON)}}
.pbm-chipt{min-width:0;overflow:hidden;text-overflow:ellipsis}
.pbm-title{position:absolute;left:${cq(TITLE_X)};top:${cq(TITLE_Y)};width:${cq(TITLE_W)};font-family:${HEAD};font-weight:800;font-size:${cq(FS0)};line-height:${LINE};letter-spacing:${f(TLS, 3)}em;word-spacing:${WSP}em;font-kerning:none;font-variant-ligatures:none}
.pbm-ln{display:block;white-space:nowrap}
.pbm-w{position:relative;display:inline-block;white-space:nowrap;transform-origin:50% 80%}
.pbm-pn{margin-left:-${PUNCT_PULL}em}
.pbm-lnL{color:#c8f02e}
.pbm-hg{position:absolute;left:0;top:0;opacity:0;white-space:nowrap;color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--pbm-lime)/.95),0 0 .45em rgb(var(--pbm-cyan)/.6)}
.pbm-gh{position:absolute;left:0;top:0;z-index:-1;opacity:0;white-space:nowrap;color:transparent;text-shadow:-.08em -.02em rgb(var(--pbm-cyan)/.95),.08em .02em rgb(var(--pbm-blue)/.9)}
.pbm-ul{position:absolute;left:0;top:${f(UL_Y, 3)}em;height:${f(UL_H, 3)}em;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
.pbm-panel{border-radius:2.6cqw;background:radial-gradient(70% 60% at 62% 50%,rgb(var(--pbm-lime)/.05),transparent),linear-gradient(rgb(14 16 22/.88),rgb(8 9 12/.88));box-shadow:inset 0 0 0 1px rgb(242 243 238/.1),0 0 3cqw rgb(0 0 0/.35)}
.pbm-crowd{position:absolute;overflow:visible}
.pbm-seg{position:absolute;overflow:visible;transform-origin:${SEG_OX} ${SEG_OY}}
.pbm-sgl{position:absolute;opacity:.6;width:48cqw;height:40cqw;margin:-20cqw 0 0 -24cqw;border-radius:50%;background:radial-gradient(closest-side,rgb(var(--pbm-hot)/.5),rgb(var(--pbm-lime)/.32) 22%,rgb(var(--pbm-lime)/.1) 52%,transparent)}
.pbm-ret{position:absolute;left:0;top:0;width:0;height:0}
.pbm-spot{position:absolute;left:${cq(-RR - 6)};top:${cq(-RR - 6)};width:${cq(2 * RR + 12)};height:${cq(2 * RR + 12)};border-radius:50%;background:radial-gradient(closest-side,rgb(var(--pbm-cyan)/.12),rgb(var(--pbm-cyan)/.05) 70%,transparent)}
.pbm-dim{border-radius:2.6cqw;background:radial-gradient(${cq(52)} ${cq(44)} at ${cq(S[0] - FX)} ${cq(S[1] - FY)},transparent 62%,rgb(6 7 10/.6) 100%)}
.pbm-ring,.pbm-brk{position:absolute;left:${cq(-RR - 9)};top:${cq(-RR - 9)};width:${cq(2 * RR + 18)};height:${cq(2 * RR + 18)}}
.pbm-ring svg,.pbm-brk svg{display:block;width:100%;height:100%;overflow:visible}
.pbm-rd{position:absolute;left:${cq(RR * 0.72)};top:${cq(-RR - 13)};height:${cq(11)};box-sizing:border-box;padding:0 ${cq(3.6)};border-radius:2cqw;display:flex;align-items:center;gap:${cq(2.6)};font-family:${MONO};font-weight:800;font-size:${cq(6.4)};color:#c8f02e;white-space:nowrap;background:rgb(10 11 14/.82);border:1px solid rgb(var(--pbm-lime)/.5);box-shadow:0 0 1.6cqw rgb(var(--pbm-lime)/.25)}
.pbm-rd>i{flex:none;width:${cq(3.4)};height:${cq(3.4)};border-radius:50%;background:#c8f02e;box-shadow:0 0 .9cqw #c8f02e}
.pbm-k{position:relative;display:block;height:1.1em;line-height:1.1;overflow:hidden;overflow:clip;font-variant-numeric:tabular-nums}
.pbm-reel{display:block;white-space:pre;line-height:1.1}
.pbm-slot{border-radius:2cqw;border:1px dashed rgb(242 243 238/.18);background:rgb(242 243 238/.02)}
.pbm-ad{position:absolute;left:${cq(AD_M)};top:${cq(AD_M)};width:${cq(AD_W)};height:${cq(AD_H)};box-sizing:border-box;border-radius:2cqw;background:linear-gradient(rgb(19 21 28/.97),rgb(11 12 16/.97));box-shadow:inset 0 0 0 1px rgb(var(--pbm-c)/.45),0 0 2.4cqw rgb(var(--pbm-c)/.2)}
.pbm-adh{position:absolute;left:${cq(6)};right:${cq(6)};top:${cq(4.4)};height:${cq(8)};display:flex;align-items:center;gap:${cq(3)};font-size:${cq(5.6)};font-weight:600;color:rgb(242 243 238/.72);white-space:nowrap}
.pbm-adh>b{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;font-weight:600}
.pbm-av{flex:none;width:${cq(8)};height:${cq(8)};border-radius:50%}
.pbm-tag{flex:none;height:${cq(7)};padding:0 ${cq(2)};border-radius:${cq(1.6)};display:flex;align-items:center;font-family:${MONO};font-size:${cq(4.8)};font-weight:800;color:rgb(var(--pbm-c));border:1px solid rgb(var(--pbm-c)/.55)}
.pbm-sk{border-radius:1cqw}
.pbm-img{border-radius:1cqw;overflow:hidden;background:linear-gradient(135deg,rgb(var(--pbm-lime)/.85),rgb(var(--pbm-green)/.7) 50%,rgb(var(--pbm-cyan)/.55))}
.pbm-img svg{display:block;width:100%;height:100%}
.pbm-btn{border-radius:2cqw;background:rgb(var(--pbm-blue)/.28);box-shadow:inset 0 0 0 1px rgb(var(--pbm-blue)/.8)}
.pbm-tile{border-radius:2cqw;background:linear-gradient(rgb(16 18 24/.86),rgb(9 10 13/.86));box-shadow:inset 0 0 0 1px rgb(242 243 238/.1)}
.pbm-ico{position:absolute;display:block;overflow:visible}
.pbm-kv{position:absolute;font-family:${HEAD};font-weight:800;font-size:${cq(K_FS)};color:#f2f3ee;white-space:nowrap}
.pbm-kv.pbm-kl{color:#c8f02e}
.pbm-rm{border-radius:5cqw;background:rgb(242 243 238/.035);box-shadow:inset 0 0 0 1px rgb(242 243 238/.12)}
.pbm-rml{position:absolute;font-family:${MONO};font-weight:800;font-size:${cq(6.2)};letter-spacing:.06em;color:rgb(242 243 238/.7);white-space:nowrap}
.pbm-rbt{border-radius:1cqw;background:rgb(242 243 238/.1)}
.pbm-rbar{border-radius:1cqw;background:linear-gradient(90deg,#14e0c8,#c8f02e);box-shadow:0 0 1.2cqw rgb(var(--pbm-lime)/.45);transform-origin:0 50%}
.pbm-rv{position:absolute;font-family:${HEAD};font-weight:800;font-size:${cq(RV_FS)};color:#c8f02e;white-space:nowrap}
.pbm-sheen{position:absolute;background:linear-gradient(90deg,transparent,rgb(var(--pbm-hot)/.07) 40%,rgb(var(--pbm-hot)/.14) 50%,rgb(var(--pbm-hot)/.07) 60%,transparent);opacity:0}
.pbm-cta{position:absolute;box-sizing:border-box;display:flex;align-items:center;padding:0 ${cq(CTA_PR)} 0 ${cq(CTA_PL)};border-radius:5cqw;background:#c8f02e;color:#0a0a0b;font-weight:700;font-size:${cq(CTA_FS0)};letter-spacing:${f(CTA_LS, 3)}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap;box-shadow:0 0 3.5cqw rgb(200 240 46/.28)}
.pbm-ctal{display:block;overflow:hidden;overflow:clip;line-height:1.3}
.pbm-lbl{display:flex;align-items:center;gap:${cq(CTA_GAP)};transform-origin:0 50%}
.pbm-ctah{border-radius:5cqw;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgb(var(--pbm-lime)/.85)}
.pbm-ctaa{display:block;flex:none;width:${cq(CTA_ARROW)};height:${cq(CTA_ARROW)}}
.pbm-foc{opacity:0}
.pbm-fo{position:absolute;border:${cq(SW_C)} solid #c8f02e;border-right:0;box-shadow:0 0 1cqw rgb(var(--pbm-lime)/.6)}
.pbm-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 45%,rgb(var(--pbm-hot)/.2),rgb(var(--pbm-lime)/.09) 45%,transparent 75%);opacity:0}
.pbm-em{position:absolute;left:-6.5cqw;top:-6.5cqw;width:13cqw;height:13cqw;border-radius:50%;background:${GLOW("6%", "17%", "46%")}}
.pbm-emd{opacity:.4}
.pbm-fanr{position:absolute;left:0;top:0;width:0;height:0;opacity:0}
.pbm-fs{position:absolute;left:0;top:0;width:0;height:0}
.pbm-fb{position:absolute;left:0;top:-1.8cqw;width:150cqw;height:3.6cqw;transform-origin:0 50%;background:radial-gradient(farthest-side at 0 50%,rgb(var(--pbm-hot)/.85),rgb(var(--pbm-hot)/.3) 60%,transparent) 0 50%/100% max(1px,.22cqw) no-repeat,radial-gradient(farthest-side at 0 50%,rgb(var(--pbm-c)/.62),rgb(var(--pbm-c)/.2) 55%,transparent)}
.pbm-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--pbm-c:var(--pbm-lime)}
.pbm-scanw{position:absolute;left:0;right:0;bottom:50%;height:9em;background:linear-gradient(to top,rgb(var(--pbm-lime)/.15),rgb(var(--pbm-lime)/.04) 45%,transparent),repeating-linear-gradient(to top,rgb(var(--pbm-lime)/.08) 0 1px,transparent 1px .9em)}
.pbm-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.pbm-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.pbm-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.pbm-hd{position:absolute;left:0;top:0;width:0;height:0}
.pbm-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--pbm-hot));box-shadow:0 0 0 .38cqw rgb(var(--pbm-c)/.95),0 0 1.8cqw .5cqw rgb(var(--pbm-c)/.55),0 0 5cqw rgb(var(--pbm-c)/.25);outline:.26cqw dashed rgb(var(--pbm-c)/.7);outline-offset:1.15cqw}
.pbm-pf{position:absolute;left:0;top:0;width:14cqw;height:14cqw;margin:-7cqw 0 0 -7cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.pbm-ps{position:absolute;left:0;top:0;width:30cqw;height:30cqw;margin:-15cqw 0 0 -15cqw;background:radial-gradient(closest-side,rgb(var(--pbm-hot)),rgb(var(--pbm-c)/.75) 7%,rgb(var(--pbm-c)/.12) 15%,transparent 22%);opacity:0;color:rgb(var(--pbm-c))}
.pbm-ps svg{display:block;width:100%;height:100%;overflow:visible}
.pbm-lg{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.pbm-com{position:absolute;left:0;top:0;width:11cqw;height:3.2cqw;margin:-1.6cqw 0 0 -9.4cqw;transform-origin:85.45% 50%;opacity:0;background:radial-gradient(1.6cqw 1.6cqw at 85.45% 50%,#fff,#fff 22%,rgb(var(--pbm-lime)/.8) 46%,rgb(var(--pbm-lime)/.18) 72%,transparent),linear-gradient(90deg,transparent,rgb(var(--pbm-lime)/.35) 40%,rgb(var(--pbm-lime)/.85) 80%,#fff) 0 50%/85.45% 1cqw no-repeat}
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
    const ns = `pbm-${hash(key)}-`;
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

function Sk({ x, y, w, h = 3, a, c = "242 243 238" }: { x: number; y: number; w: number; h?: number; a: number; c?: string }) {
  return <i className="pbm-abs pbm-sk" style={{ ...atq(x, y, w, h), background: `rgb(${c}/${f(a)})` }} />;
}

/** Spark sprite (static artwork): an irregular spray of streaks opening upwards. */
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
const SPARK_EMBERS = EMBERS.map(([a, r, s]) => dot(r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180), s)).join("");
function SparkArt() {
  return (
    <svg viewBox="-50 -50 100 100">
      <path d={SPARK_TAILS} fill="currentColor" fillOpacity=".55" />
      <path d={SPARK_HEADS} fill="#fff" />
      <path d={SPARK_EMBERS} fill="#fff" fillOpacity=".85" />
    </svg>
  );
}

// static crowd art (dim people, three opacity buckets) and the lit segment rings
const CROWD = [0, 1, 2].map((b) =>
  PEOPLE.filter((p) => Math.min(2, Math.floor(((p.o - 0.16) / 0.16) * 3)) === b)
    .map((p) => person(p.x, p.y))
    .join(""),
);
const SEG_RINGS = [0, 1, 2].map((r) => SEG.filter((p) => p.ring === r));

/** icons of the funnel tiles (impressions, clicks, conversions), 12 × 12 */
function KpiIcon({ k }: { k: number }) {
  if (k === 0)
    return (
      <svg viewBox="0 0 12 12" fill="none">
        <path d="M.8 6C2.2 3.3 3.9 2.1 6 2.1S9.8 3.3 11.2 6C9.8 8.7 8.1 9.9 6 9.9S2.2 8.7.8 6Z" stroke="#14e0c8" strokeWidth="1.1" />
        <circle cx="6" cy="6" r="1.9" fill="#14e0c8" />
      </svg>
    );
  if (k === 1)
    return (
      <svg viewBox="0 0 12 12" fill="none">
        <path d="M3 1v9.2l2.4-2.3 1.6 3.4 1.7-.8-1.6-3.3h3.3Z" fill="#22d38c" stroke="#22d38c" strokeWidth=".6" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="#c8f02e" strokeWidth="1.1" />
      <path d="M3.6 6.2 5.3 7.9 8.5 4.4" stroke="#c8f02e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const SPARK = ["0,10 6,8 12,9 18,5 24,6 30,2", "0,10 6,9 12,7 18,7 24,4 30,3", "0,10 6,9 12,8 18,5 24,4 30,1"];
const K_COL = ["#14e0c8", "#22d38c", "#c8f02e"];

/** an ad format (card-local units; the card is AD_W × AD_H) */
function AdCard({ i, label }: { i: number; label: string }) {
  const c = AD_C[i];
  return (
    <div className={`pbm-ad pbm-c-${c}`}>
      <div className="pbm-adh">
        {i === 0 ? (
          <svg className="pbm-av" viewBox="0 0 8 8" fill="none">
            <circle cx="3.4" cy="3.4" r="2.4" stroke="#14e0c8" strokeWidth="1.1" />
            <path d="M5.2 5.2 7.2 7.2" stroke="#14e0c8" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        ) : (
          <i
            className="pbm-av"
            style={
              i === 1
                ? { background: "linear-gradient(135deg,#c8f02e,#22d38c)" }
                : { borderRadius: "1cqw", background: "linear-gradient(135deg,#2e66ff,#14e0c8)" }
            }
          />
        )}
        <b>{label}</b>
        <span className="pbm-tag">Ad</span>
      </div>
      {i === 0 ? (
        <>
          <Sk x={6} y={16.5} w={74} h={4.4} a={0.85} c="var(--pbm-cyan)" />
          <Sk x={6} y={24.5} w={112} a={0.2} />
          <Sk x={6} y={30.5} w={84} a={0.13} />
        </>
      ) : i === 1 ? (
        <>
          <span className="pbm-abs pbm-img" style={atq(6, 15, 42, 20)}>
            <svg viewBox="0 0 42 20" preserveAspectRatio="none">
              <circle cx="31" cy="6" r="3" fill="#fff" fillOpacity=".75" />
              <path d="M0 20 11 9l7 6 6-5 18 10Z" fill="#0a0a0b" fillOpacity=".35" />
            </svg>
          </span>
          <Sk x={54} y={16.5} w={58} a={0.24} />
          <Sk x={54} y={22.5} w={42} a={0.15} />
          <i className="pbm-abs" style={{ ...atq(54, 29, 5, 5), borderRadius: "50%", background: "#c8f02e", boxShadow: "0 0 .8cqw #c8f02e" }} />
          <Sk x={62} y={30} w={26} a={0.18} />
        </>
      ) : (
        <>
          <Sk x={6} y={16.5} w={70} h={4} a={0.62} c="var(--pbm-blue)" />
          <Sk x={6} y={24} w={84} a={0.2} />
          <Sk x={6} y={30} w={58} a={0.13} />
          <i className="pbm-abs pbm-btn" style={atq(96, 24.5, 30, 9)} />
        </>
      )}
    </div>
  );
}

/** a title group, its trailing punctuation pulled in (see PUNCT_PULL) */
function Pull({ s }: { s: string }) {
  const m = TRAIL.exec(s);
  if (!m) return <>{s}</>;
  return (
    <>
      {s.slice(0, m.index)}
      <span className="pbm-pn">{m[0]}</span>
    </>
  );
}

const RET_SZ = 2 * RR + 18;
const RET_C = RR + 9;

export function PubliciteMotion({ className, title, tagline, cta, bullets }: ServiceMotionProps) {
  const b = getBuild(title, tagline, cta);
  const { fs, groups, climax, label, cfs, ctaW, chipText, chipW }: Layout = b.lay;
  const A = (n: string) => `pbm-a ${b.ns}${n}`;
  const origin = (g: Group) => `${f((g.ox / g.w) * 100, 2)}% 80%`;
  const lines = Array.from({ length: Math.max(0, ...groups.map((g) => g.line + 1)) }, (_, l) => groups.map((g, i) => ({ g, i })).filter((x) => x.g.line === l));
  const adLabels = [0, 1, 2].map((i) => (bullets[i] ?? "").replace(/\s*\([^)]*\)/g, "").trim());

  return (
    <div className={`illu-motion pbm-root${className ? ` ${className}` : ""}`} data-motion-root="" aria-hidden="true" data-nosnippet="">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      <ScrollPause />

      {/* off-screen, content-visibility skips the whole scene (no restyle at all);
          absolutely positioned, so its remembered size never feeds the layout */}
      <div className="pbm-cv">
        <div className={`pbm-L ${A("shake")}`}>
          {/* ── static back layer, then the concert fans ── */}
          <i className="pbm-grid" />
          <i className="pbm-rail" />
          <i className="pbm-floor" />
          {/* the fans' emitters glow (static, painted before any animated layer) */}
          {(
            [
              [EBL, "lime"],
              [EBR, "cyan"],
            ] as const
          ).map(([o, c]) => (
            <i key={c} className={`pbm-z pbm-c-${c}`} style={{ left: P(o[0]), top: P(o[1]) }}>
              <i className="pbm-em pbm-emd" />
            </i>
          ))}
          {(
            [
              ["fLr", EBL, "lime"],
              ["fRr", EBR, "cyan"],
            ] as const
          ).map(([id, o, c]) => (
            <div key={id} className={`pbm-z pbm-c-${c}`} style={{ left: P(o[0]), top: P(o[1]) }}>
              <div className={`pbm-fanr ${A(id)}`}>
                <i className="pbm-em" />
                <i className="pbm-fb" />
                <div className={`pbm-fs ${A("fS")}`}>
                  {[-2, -1, 1, 2].map((k) => (
                    <i key={k} className="pbm-fb" style={{ rotate: `${k * 10}deg`, opacity: f(1 - Math.abs(k) * 0.14) }} />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ── the plane: chip, headline, console (tilts as one in the hold) ── */}
          <div className={`pbm-plane ${A("tilt")}`}>
            {/* kinetic headline (the tagline) */}
            <div className="pbm-title" style={fs < FS0 ? { fontSize: cq(fs) } : undefined}>
              {lines.map((ln, l) => (
                <span key={l} className="pbm-ln">
                  {ln.map(({ g, i }, j) => (
                    <span key={i} className={`pbm-w ${A(`w${i}`)}`} style={{ transformOrigin: origin(g), ...(j ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null) }}>
                      <Pull s={g.text} />
                    </span>
                  ))}
                </span>
              ))}
              <span className="pbm-ln pbm-lnL">
                <span className={`pbm-w ${A("wL")}`} style={{ transformOrigin: origin(climax) }}>
                  <span className={`pbm-gh ${A("gh")}`}>
                    <Pull s={climax.text} />
                  </span>
                  <Pull s={climax.text} />
                  <span className={`pbm-hg ${A("hg")}`}>
                    <Pull s={climax.text} />
                  </span>
                  <i className={`pbm-ul ${A("ul")}`} style={{ width: cq(climax.w) }} />
                </span>
              </span>
            </div>

            {/* the chip (after the title: its slam would promote the static title box) */}
            <div className={`pbm-chip ${A("chip")}`} style={{ maxWidth: cq(chipW + 1) }}>
              <svg viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.2" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="7" cy="7" r="1.9" fill="currentColor" />
                <path d="M7 0v3M7 11v3M0 7h3M11 7h3" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span className="pbm-chipt">{chipText}</span>
            </div>

            {/* the console: exists only above the printhead */}
            <div className={`pbm-clip pbm-pwo ${A("pwo")}`}>
              <div className={`pbm-z ${A("pwi")}`}>
                <div className="pbm-o0" style={{ left: "2cqw", top: cq(-ER_TOP) }}>
                  {/* audience field: the dim crowd (static) */}
                  <i className="pbm-abs pbm-panel" style={at(FX, FY, FW, FH)} />
                  <svg className="pbm-crowd" viewBox={`${FX} ${FY} ${FW} ${FH}`} style={at(FX, FY, FW, FH)}>
                    {CROWD.map((d, k) => (
                      <path key={k} d={d} fill="#f2f3ee" fillOpacity={f(0.17 + k * 0.07)} />
                    ))}
                  </svg>
                  {/* ad slots (empty until printed) */}
                  {AD_Y.map((y) => (
                    <i key={y} className="pbm-abs pbm-slot" style={at(AD_X, y, AD_W, AD_H)} />
                  ))}

                  {/* funnel tiles */}
                  {KX.map((x, k) => (
                    <Fragment key={x}>
                      <i className="pbm-abs pbm-tile" style={at(x, KY, KW, KH)} />
                      <span className="pbm-ico" style={at(x + 8, KY + 8, 12, 12)}>
                        <KpiIcon k={k} />
                      </span>
                      <svg className="pbm-ico" viewBox="0 0 30 12" fill="none" style={at(x + KW - 40, KY + 8, 30, 12)}>
                        <polyline points={SPARK[k]} stroke={K_COL[k]} strokeOpacity=".55" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
                      </svg>
                      {k < 2 ? (
                        <svg className="pbm-ico" viewBox="0 0 6 10" fill="none" style={at(x + KW + 1.5, KY + KH / 2 - 4, 5, 8)}>
                          <path d="M1.2 1.2 4.6 5 1.2 8.8" stroke="#f2f3ee" strokeOpacity=".35" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </Fragment>
                  ))}

                  {/* ROAS meter */}
                  <i className="pbm-abs pbm-rm" style={at(RM.x, RM.y, RM.w, RM.h)} />
                  <span className="pbm-rml" style={{ left: P(RM.x + 10), top: P(RM.y + RM.h / 2 - 3.1) }}>
                    ROAS
                  </span>
                  <i className="pbm-abs pbm-rbt" style={at(RB.x, RB.y, RB.w, RB.h)} />
                  {/* the reels (animated: after every static piece, so none is promoted) */}
                  {KX.map((x, k) => (
                    <span key={x} className={`pbm-kv${k === 2 ? " pbm-kl" : ""}`} style={{ left: P(x + K_VAL_X), top: P(KY + KH / 2 - K_FS * 0.55) }}>
                      <span className="pbm-k">
                        <span className={`pbm-reel ${A(["imp", "clk", "cnv"][k])}`} style={{ transform: `translateY(${f((-100 * 9) / 10, 3)}%)` }}>
                          {[IMP, CLK, CNV][k].join("\n")}
                        </span>
                      </span>
                    </span>
                  ))}
                  <i className={`pbm-abs pbm-dim ${A("dim")}`} style={at(FX, FY, FW, FH)} />
                  {/* the lit segment: glow + three rings */}
                  <i className={`pbm-sgl ${A("sgl")}`} style={{ left: P(S[0]), top: P(S[1]) }} />
                  {SEG_RINGS.map((ring, r) => (
                    <svg key={r} className={`pbm-seg ${A(`sg${r}`)}`} viewBox={`${FX} ${FY} ${FW} ${FH}`} style={at(FX, FY, FW, FH)}>
                      <path d={ring.map((p) => dot(p.x, p.y + 0.6, 6.4)).join("")} fill="#c8f02e" fillOpacity=".13" />
                      <path d={ring.map((p) => person(p.x, p.y, 1.06)).join("")} fill="#c8f02e" />
                      <path d={ring.map((p) => dot(p.x, p.y - 2.86, 0.9)).join("")} fill="#fff" fillOpacity=".85" />
                    </svg>
                  ))}

                  <i className={`pbm-abs pbm-rbar ${A("rbar")}`} style={at(RB.x, RB.y, RB.w, RB.h)} />
                  <span className="pbm-rv" style={{ left: P(RV_X), top: P(RM.y + RM.h / 2 - RV_FS * 0.55) }}>
                    <span className="pbm-k">
                      <span className={`pbm-reel ${A("roas")}`} style={{ transform: `translateY(${f((-100 * (ROAS.length - 1)) / ROAS.length, 3)}%)` }}>
                        {ROAS.join("\n")}
                      </span>
                    </span>
                  </span>

                  {/* the reticle (locked on the segment) */}
                  <div className={`pbm-ret ${A("ret")}`} style={{ transform: `translate(${cq(S[0])},${cq(S[1])})` }}>
                    <i className="pbm-spot" />
                    <span className={`pbm-ring ${A("ring")}`}>
                      <svg viewBox={`0 0 ${RET_SZ} ${RET_SZ}`} fill="none">
                        <circle cx={RET_C} cy={RET_C} r={RR} stroke="#14e0c8" strokeOpacity=".9" strokeWidth="1.2" />
                        <circle cx={RET_C} cy={RET_C} r={RR - 5} stroke="#14e0c8" strokeOpacity=".4" strokeWidth=".9" strokeDasharray="2 3.2" />
                        <path
                          d={`M${RET_C} ${RET_C - RR - 5}v10M${RET_C} ${RET_C + RR - 5}v10M${RET_C - RR - 5} ${RET_C}h10M${RET_C + RR - 5} ${RET_C}h10`}
                          stroke="#14e0c8"
                          strokeWidth="1.4"
                        />
                        <circle cx={RET_C} cy={RET_C} r="1.6" fill="#c8f02e" />
                      </svg>
                    </span>
                    <span className={`pbm-brk ${A("brk")}`}>
                      <svg viewBox={`0 0 ${RET_SZ} ${RET_SZ}`} fill="none">
                        <path
                          d={(() => {
                            const a = RET_C - RR - 5;
                            const z = RET_C + RR + 5;
                            const l = 9;
                            return `M${a} ${a + l}V${a}h${l}M${z - l} ${a}H${z}v${l}M${z} ${z - l}V${z}h${-l}M${a + l} ${z}H${a}v${-l}`;
                          })()}
                          stroke="#c8f02e"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="pbm-rd">
                      <i />
                      <span className="pbm-k">
                        <span className={`pbm-reel ${A("match")}`} style={{ transform: `translateY(${f((-100 * (MATCH.length - 1)) / MATCH.length, 3)}%)` }}>
                          {MATCH.join("\n")}
                        </span>
                      </span>
                    </span>
                  </div>

                  {/* the three ad formats, extruded behind the print front */}
                  {AD_Y.map((y, i) => (
                    <div key={y} className={`pbm-clip ${A(`ado${i}`)}`} style={at(AD_X - AD_M, y - AD_M, AD_W + 2 * AD_M, AD_H + 2 * AD_M)}>
                      <div className={`pbm-z ${A(`adi${i}`)}`}>
                        <AdCard i={i} label={adLabels[i]} />
                      </div>
                    </div>
                  ))}

                  {/* CTA: forged outline, white-hot pill, rising label */}
                  <div className={`pbm-clip pbm-foc ${A("foo")}`} style={at(b.fo.x, b.fo.y, b.fo.w, b.fo.h)}>
                    <div className={`pbm-z ${A("foi")}`}>
                      <i className="pbm-fo" style={{ ...atq(FO_M, FO_M, b.fo.ow, CTA_H + SW_C), borderRadius: `${cq(CTA_H / 2 + SW_C / 2)} 0 0 ${cq(CTA_H / 2 + SW_C / 2)}` }} />
                    </div>
                  </div>
                  <div className={`pbm-cta ${A("cta")}`} style={{ ...at(CTA_X, CTA_Y, ctaW, CTA_H), ...(cfs < CTA_FS0 ? { fontSize: cq(cfs) } : null) }}>
                    <span className="pbm-ctal">
                      <span className={`pbm-lbl ${A("lbl")}`}>
                        {label}
                        <svg className="pbm-ctaa" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </div>
                  <i className={`pbm-abs pbm-ctah ${A("ctaH")}`} style={at(CTA_X, CTA_Y, ctaW, CTA_H)} />

                  {/* glass sheen (hold); the console clip bounds it */}
                  <i className={`pbm-sheen ${A("sheen")}`} style={at(FX, FY, 102, CTA_Y + CTA_H - FY)} />
                </div>
              </div>
            </div>
          </div>

          {/* ── front FX: printhead, ad beams, comet, rail heads, pools ── */}
          <div className="pbm-L">
            <div className={`pbm-scan ${A("scan")}`}>
              <i className="pbm-scanw" />
              <i className="pbm-scanl" />
              <i className="pbm-scanf" style={{ left: "8em" }} />
              <i className="pbm-scanf" style={{ left: "108em" }} />
            </div>
            {b.lg.map((c, i) => (
              <i key={i} className={`pbm-lg pbm-c-${c} ${A(`lg${i}`)}`} />
            ))}
            {Array.from({ length: b.nCm }, (_, i) => (
              <i key={i} className={`pbm-com ${A(`cm${i}`)}`} />
            ))}
            {HEADS.map((h) => (
              <Fragment key={h.id}>
                <i className={`pbm-hb pbm-c-${h.c} ${A(`${h.id}b`)}`} />
                <div className={`pbm-hd pbm-c-${h.c} ${A(`${h.id}p`)}`} style={{ transform: `translate(${cq(h.home[0])},${cq(h.home[1])})` }}>
                  <i className="pbm-hc" />
                </div>
              </Fragment>
            ))}
            {b.pf.map((c, i) => (
              <i key={i} className={`pbm-pf pbm-c-${c || "lime"} ${A(`pf${i}`)}`} />
            ))}
            {b.ps.map((c, i) => (
              <i key={i} className={`pbm-ps pbm-c-${c || "lime"} ${A(`ps${i}`)}`}>
                <SparkArt />
              </i>
            ))}
          </div>

          <i className={`pbm-flash ${A("flash")}`} />
        </div>
      </div>
    </div>
  );
}
