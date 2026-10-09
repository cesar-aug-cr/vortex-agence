import { Fragment, type CSSProperties } from "react";
import {
  anim,
  BACK,
  BACK2,
  begin,
  COOL,
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
import {
  arc,
  clamp,
  cq,
  dist,
  flareEv,
  fmtF,
  fmtS,
  headAt,
  headKF,
  inv,
  js,
  onCircle,
  P,
  pat,
  plen,
  rideEv,
  rot,
  sampled,
  SPARK_EMBERS,
  SPARK_HEADS,
  SPARK_TAILS,
  sparkEv,
  type Head,
  type Pt,
  type Shot,
} from "./BrandingDesignMotion.fx";
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
  HL_FS0,
  HL_LINE,
  HL_LS,
  HL_W,
  HL_X,
  HL_Y,
  layout,
  PUNCT_EM,
  SPACE_EM,
  type Group,
  type Layout,
} from "./BrandingDesignMotion.layout";
import { ScrollPause } from "./ScrollPause";
import type { ServiceMotionProps } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  "BRAND FOUNDRY" — hero motion graphic of /services/branding-design
 * ─────────────────────────────────────────────────────────────────────────────
 *  One master loop, T = 14 s; every beat is a keyframe percentage of T (no
 *  animation-delay, no fill-mode, no secondary loop). Same rig as the
 *  sites-web laser show: four RAIL HEADS (lime left, cyan + green top, blue
 *  right) glide on a dashed rail, swell as they charge and fire every beam; a
 *  wall-to-wall PRINTHEAD; pooled flares and gravity spark sprays.
 *
 *  The mark (an invented symbol, no real brand): a disc split along its
 *  diameter, the two halves offset by R/φ³ (lime over cyan), and a white dot
 *  resting on the ledge the offset leaves. Built from two circles of radius R.
 *
 *  0.09–0.36  The artboard (with its "φ 1.618" spec label) powers on, BIG, in
 *             the middle of the panel.
 *  0.34–1.01  GRID SCAN. The lime head slides down the left rail firing a
 *             horizontal beam, the cyan head slides along the top firing a
 *             vertical one: the construction grid (axes, golden lines at
 *             R/φ, golden circles, diagonals) exists only behind the beams.
 *  1.04–1.66  COMPASS. Two compass arms (their tips tracked by the green and
 *             blue heads) trace the two circles of the mark at once, one from
 *             12 o'clock, one from 6.
 *  1.84–2.44  CUT. The arms swing back and become blades: each sweeps its half
 *             (top over the top, bottom under the bottom, tracked by the cyan /
 *             lime heads) and the half exists behind it; sparks at each end.
 *  2.48       FORGE. The finished halves flash white-hot and cool to lime /
 *             cyan: flash, camera shake.
 *  2.56–2.84  The dot falls under gravity onto the ledge: squash, rebound,
 *             sparks.
 *  3.04–3.60  DOCK. The whole construction shrinks into the board's first tile.
 *  3.44–4.04  PRINT. The printhead lays the empty board (palette, type, card,
 *             phone, sign tiles).
 *  4.05–4.80  PALETTE. Each head stamps its own colour swatch; all four
 *             converge on the white one.
 *  5.03–5.30  TYPE. "Aa" slams in (stretch → squash → rebound), the weight
 *             ladder slides in under the green hit.
 *  5.42–6.08  APPLIED. Lime stamps the mark onto the business card, green
 *             boots the phone, blue switches the sign on (neon flicker).
 *  6.49–7.36  KINETIC HEADLINE (the tagline): ≤ 3 groups slam in, each shot by
 *             a head; the last word lands white-hot under all four beams, is
 *             lime, gets a laser underline; camera shake.
 *  8.00–9.24  CTA FORGE. Two weld tips trace the pill (four beams), collide:
 *             white-hot pill, cools to lime, the label rises.
 *  9.46       PAYOFF — BRAND SYNC. The four heads hit the four marks at once
 *             (tile, card, phone, sign): every instance flashes, the board
 *             pulses; the export chips (SVG · PNG · PDF) pop.
 *  10.2–12.3  HOLD. Swatch / headline wave, premium 3D tilt with a glass sheen.
 *  12.65–13.45 ERASE. The printhead sweeps back up, the board vanishes under
 *             it (each animated item flickers out as the pass crosses it), the
 *             first tile last; the heads glide home; seam.
 *
 *  Performance (61 running animations, all 14 s, linear, infinite; only
 *  transform / opacity on HTML boxes; SVG is static art):
 *   · construction lines are revealed by clip windows that translate
 *     (counter-translated pairs) or by boxes that rotate: a traced circle is
 *     two half rings rotating inside two static half clips, a cut half is a
 *     disc (rotation-invariant, so no counter-rotation) inside a rotating
 *     half-plane window;
 *   · the print window holds STATIC art only (one layer); the animated items
 *     sit outside it, as siblings, and carry their own erase flicker: fewer
 *     nested transforms over their layers. Static art is painted before
 *     every animated layer of its group: Chrome's layerization (which runs on
 *     every main-thread frame) tests each later paint chunk against the
 *     layers before it, so the order alone saved ~30 % of that cost;
 *   · one-shot effects (flares, spark sprays) are pooled;
 *   · root z-index:1, content-visibility skips the whole scene off-screen,
 *     <ScrollPause> freezes it while the page scrolls.
 *
 *  Reduced motion: the global rule collapses every animation, so the
 *  un-animated base styles ARE the poster: the finished identity board.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── geometry (viewBox 400 = 100cqw) ───────────── */

type Box = { x: number; y: number; w: number; h: number };
const PHI = (1 + Math.sqrt(5)) / 2;

// the identity board's tiles
const TA: Box = { x: 24, y: 24, w: 148, h: 148 }; // mark (construction artboard)
const TB: Box = { x: 180, y: 24, w: 196, h: 60 }; // palette
const TC: Box = { x: 180, y: 92, w: 196, h: 80 }; // typography
const TD: Box = { x: 24, y: 180, w: 116, h: 86 }; // business card
const TE: Box = { x: 148, y: 180, w: 56, h: 86 }; // phone
const TF: Box = { x: 212, y: 180, w: 164, h: 86 }; // signage
const TILES = [TB, TC, TD, TE, TF];

// the mark, in docked coordinates (tile A)
const AC: Pt = [TA.x + TA.w / 2, TA.y + TA.h / 2];
const R = 40;
const DX = R / PHI ** 3; // each half is offset by R/φ³
const GAP = 2.4;
const CT: Pt = [AC[0] - DX, AC[1]];
const CB: Pt = [AC[0] + DX, AC[1]];
const RD = 8;
const DOT: Pt = [CB[0] + R - RD, AC[1] + GAP / 2 - RD];
const MB: Box = { x: CT[0] - R, y: AC[1] - R, w: 2 * R + 2 * DX, h: 2 * R };
const CHORD = Math.sqrt(R * R - (GAP / 2) ** 2);
const HALF_T = `M${f(CT[0] - CHORD, 3)} ${f(AC[1] - GAP / 2, 3)}A${R} ${R} 0 0 1 ${f(CT[0] + CHORD, 3)} ${f(AC[1] - GAP / 2, 3)}Z`;
const HALF_B = `M${f(CB[0] + CHORD, 3)} ${f(AC[1] + GAP / 2, 3)}A${R} ${R} 0 0 1 ${f(CB[0] - CHORD, 3)} ${f(AC[1] + GAP / 2, 3)}Z`;

// the construction is drawn BIG in the middle, then docks into tile A
const S_BIG = 1.75;
const C_BIG: Pt = [200, 200];
const big = (p: Pt): Pt => [C_BIG[0] + (p[0] - AC[0]) * S_BIG, C_BIG[1] + (p[1] - AC[1]) * S_BIG];
// scan windows (docked units) and the beams that open them
const GW: Box = { x: 20, y: 20, w: 156, h: 156 };
const SC0 = big([GW.x, GW.y]);
const SC1 = big([GW.x + GW.w, GW.y + GW.h]);

// palette swatches (block centres)
const SWATCH = [
  { hex: "#C8F02E", bg: "#c8f02e", c: "lime" },
  { hex: "#14E0C8", bg: "#14e0c8", c: "cyan" },
  { hex: "#22D38C", bg: "#22d38c", c: "green" },
  { hex: "#2E66FF", bg: "#2e66ff", c: "blue" },
  { hex: "#F2F3EE", bg: "#f2f3ee", c: "lime" },
];
const SW_X = (i: number) => TB.x + 8 + i * 37;
const SW_Y = TB.y + 9;
const SW_W = 32;
const SW_H = 30;
const swC = (i: number): Pt => [SW_X(i) + SW_W / 2, SW_Y + SW_H / 2];

// typography
const AA: Box = { x: 191, y: 106, w: 70, h: 50 };
const AA_FS = 50;
const AA_C: Pt = [AA.x + 33, AA.y + 26];
const WT_X = 282;
const WT_Y = [103, 122, 141];
const WT: [number, string][] = [
  [300, "300"],
  [500, "500"],
  [800, "800"],
];

// applications
const CARD_F = { c: [72, 230] as Pt, w: 70, h: 44, a: -7 };
const CARD_B = { c: [98, 209] as Pt, w: 66, h: 42, a: 11 };
const CARD_MW = 19; // mark width on the card
const CARD_MO: Pt = [8, 8]; // its offset in the card
const CARD_MC: Pt = rot(
  [CARD_F.c[0] - CARD_F.w / 2 + CARD_MO[0] + CARD_MW / 2, CARD_F.c[1] - CARD_F.h / 2 + CARD_MO[1] + (CARD_MW * MB.h) / MB.w / 2],
  CARD_F.c,
  CARD_F.a,
);
const PHONE: Box = { x: 159, y: 188, w: 34, h: 70 };
const SCREEN: Box = { x: 161.2, y: 190.2, w: 29.6, h: 65.6 };
const PHONE_MC: Pt = [176, 213];
const SIGN: Box = { x: 236, y: 199, w: 116, h: 38 };
const SIGN_MC: Pt = [256, 218];

/* ───────────────────────────── master beats (ms) ─────────────────────────── */

const ON: [number, number] = [90, 360]; // artboard powers on
const SCH: [number, number] = [420, 980]; // lime scanner (down)
const SCV: [number, number] = [450, 1010]; // cyan scanner (right)
const TRC: [number, number] = [1040, 1660]; // compass arms trace the circles
const CUTT: [number, number] = [1840, 2240]; // top half cut
const CUTB: [number, number] = [2040, 2440]; // bottom half cut
const FORGE = 2480;
const DROP: [number, number] = [2560, 2840]; // the dot falls, lands
const DOCK: [number, number] = [3040, 3600];
const PR: [number, number] = [3440, 4040]; // print pass (y 16 → 272)
const PR_Y = 272;
const SW_T = [4100, 4240, 4380, 4520, 4800];
const AA_T = 5140;
const WT_T = 5300;
const APP = [5520, 5800, 6080];
const OPEN_T = 6280; // the print window opens fully (nothing visible below it yet)
const SLOT = [6600, 6820, 7040];
const LAST = 7360;
const PRE = 110;
const PRE_L = 150;
const FG: [number, number] = [8000, 8560];
const SYNC = 9460;
const CHIPS_T = 9780;
const WAVE = 10200;
const TILT = [10900, 11500, 11650, 12300];
const SH: [number, number] = [11150, 11900];
const ER: [number, number] = [12650, 13450]; // erase pass (y 406 → 16)
const RESET = 13620; // everything hidden: back to the t = 0 state

// print window: its bottom edge is the printhead
const PW_Y0 = 16;
const PW_Y1 = 406;
/** when the erase pass crosses y (going up) */
const eIOjs = js(IO);
const eraseAt = (y: number) => Math.round(ER[0] + (ER[1] - ER[0]) * inv(eIOjs, (PW_Y1 - y) / (PW_Y1 - PW_Y0)));
/**
 * The animated items live OUTSIDE the print window (fewer nested transforms
 * over their layers: cheaper layerization); each one is zapped out when the
 * erase pass crosses its middle: [visible, flicker, gone] at rest pose.
 */
const zap = (y0: number, y1: number, hid: (o: number) => string): Stop[] => {
  const t = eraseAt((y0 + y1) / 2);
  return [
    [t - 12, hid(1)],
    [t + 18, hid(0.3)],
    [t + 36, hid(0.85)],
    [t + 66, hid(0)],
  ];
};

/* ───────────────────────────── rail heads ─────────────────────────────── */

const RI = 11;
const RHI = 400 - RI;
const HL = 0;
const HT = 1;
const HU = 2;
const HR = 3;
const HEADS: Head[] = [
  {
    id: "hL",
    c: "lime",
    home: [RI, 300],
    plan: [
      [40, 330, [RI, SC0[1]]],
      [SCH[0], SCH[1], [RI, SC1[1]]],
      [2700, 3500, [RI, 150]],
      [4930, 5260, [RI, 228]],
      [8780, 9200, [RI, 150]],
      [9700, 11000, [RI, 250], IOS],
      [11100, 12400, [RI, 180], IOS],
      [12500, 13600, [RI, 300]],
    ],
  },
  {
    id: "hT",
    c: "cyan",
    home: [130, RI],
    plan: [
      [40, 340, [SC0[0], RI]],
      [SCV[0], SCV[1], [SC1[0], RI]],
      [1190, 1660, [170, RI]],
      [2700, 3500, [215, RI]],
      [8740, 9150, [120, RI]],
      [9700, 11100, [170, RI], IOS],
      [11200, 12400, [110, RI], IOS],
      [12500, 13600, [130, RI]],
    ],
  },
  {
    id: "hU",
    c: "green",
    home: [270, RI],
    plan: [
      [300, 900, [250, RI]],
      [2700, 3500, [300, RI]],
      [9700, 11000, [320, RI], IOS],
      [11100, 12400, [262, RI], IOS],
      [12500, 13600, [270, RI]],
    ],
  },
  {
    id: "hR",
    c: "blue",
    home: [RHI, 300],
    plan: [
      [300, 900, [RHI, 236]],
      [2700, 3500, [RHI, 120]],
      [4950, 5350, [RHI, 200]],
      [9700, 11100, [RHI, 140], IOS],
      [11200, 12400, [RHI, 230], IOS],
      [12500, 13600, [RHI, 300]],
    ],
  },
];
// which head shoots which headline slot
const SLOT_HEAD = [HL, HT, HU];

/* ───────────────────────────── generic shapes ──────────────────────────── */

const Z0 = "opacity:0";
const O1 = "opacity:1";
const GRAV = "cubic-bezier(.55,0,1,.45)";
/** α of a compass arm: from a0, one clockwise turn over TRC (IO) */
const armAt = (a0: number) => (t: number) => a0 + 360 * js(IO)(clamp((t - TRC[0]) / (TRC[1] - TRC[0]), 0, 1));

/* ───────────────────────────── build all keyframes ───────────────────────── */

const FO_M = 4; // the CTA forge clip box's margin around the outline
const GD_POSTER = 0.5; // guides' opacity once docked (and in the poster)
const SW_C = 1.4; // CTA forge outline width
const UL_Y = 0.93; // climax underline: top and thickness (em)
const UL_H = 0.075;

function build(tagline: string, cta: string, ns: string) {
  begin(ns);
  const lay = layout(tagline, cta);
  const { lh, groups, climax, ctaW } = lay;
  const shots: Shot[][] = HEADS.map(() => []);
  const FL: PoolEvent[] = []; // flares
  const SP: PoolEvent[] = []; // spark bursts

  /* ── DOCK group: powers on big, docks into tile A, pulses at SYNC, flickers
        out when the erase pass crosses it, resets big & dark ── */
  const zA = eraseAt(TA.y + TA.h);
  const zB = eraseAt(TA.y);
  {
    const dx = (C_BIG[0] - AC[0]) / 4;
    const dy = (C_BIG[1] - AC[1]) / 4;
    const tx: Key[] = [
      [0, dx],
      [DOCK[0], dx, IO],
      [DOCK[1], 0],
      [RESET, 0],
      [RESET + 2, dx],
    ];
    const ty: Key[] = tx.map(([t, v, e]) => [t, (v * dy) / dx, e]);
    const sc: Key[] = [
      [0, S_BIG],
      [DOCK[0], S_BIG, IO],
      [DOCK[1], 1],
      [SYNC - 2, 1, OUT],
      [SYNC + 90, 1.03, IO],
      [SYNC + 320, 1],
      [RESET, 1],
      [RESET + 2, S_BIG],
    ];
    anim(
      "dk",
      [
        [0, 0],
        [ON[0], 0],
        [ON[0] + 30, 0.7],
        [ON[0] + 60, 0.15],
        [ON[0] + 100, 0.8],
        [ON[1], 1],
        [zA - 10, 1],
        [zA + 20, 0.25],
        [zA + 45, 0.85],
        [zA + 80, 0.35],
        [zB, 0],
      ],
      [
        ["translate", "cqw", 2, tx, ty],
        ["scale", "", 3, sc],
      ],
    );
  }

  /* ── GRID SCAN: the lime head sweeps down (H guides), the cyan one right
        (V guides); each set exists only behind its beam ── */
  {
    const H = GW.h;
    const hk: Key[] = [
      [0, H],
      [SCH[0], H, IO],
      [SCH[1], 0],
      [RESET, 0],
      [RESET + 2, H],
    ];
    anim("gho", null, [["translateY", "cqw", 3, hk.map(([t, v, e]): Key => [t, -v / 4, e])]]);
    anim("ghi", null, [["translateY", "cqw", 3, hk.map(([t, v, e]): Key => [t, v / 4, e])]]);
    const vk: Key[] = [
      [0, H],
      [SCV[0], H, IO],
      [SCV[1], 0],
      [RESET, 0],
      [RESET + 2, H],
    ];
    anim("gvo", null, [["translateX", "cqw", 3, vk.map(([t, v, e]): Key => [t, -v / 4, e])]]);
    anim("gvi", null, [["translateX", "cqw", 3, vk.map(([t, v, e]): Key => [t, v / 4, e])]]);
  }
  shots[HL].push({ k: "sweep", a: SCH[0], b: SCH[1], g: 0, len: SC1[0] - RI });
  shots[HT].push({ k: "sweep", a: SCV[0], b: SCV[1], g: 90, len: SC1[1] - RI });
  {
    // the beams' crossing point burns white-hot
    const hl = HEADS[HL];
    const ht = HEADS[HT];
    FL.push(rideEv((t) => [headAt(ht, t)[0], headAt(hl, t)[1]], SCV[0], SCH[1], 0.55, 1, "lime", 200));
  }

  /* ── COMPASS: two arms trace the two circles (two half rings each) ── */
  const aA = armAt(270); // top circle, from 12 o'clock
  const aB = armAt(90); // bottom circle, from 6 o'clock
  const halfKeys = (fn: (t: number) => number): Key[] => [[0, 0], ...sampled(TRC[0], TRC[1], fn), [RESET - 2, 180], [RESET, 0]];
  anim("ctR", null, [["rotate", "deg", 1, halfKeys((t) => clamp(aA(t) - 270, 0, 180))]]);
  anim("ctL", null, [["rotate", "deg", 1, halfKeys((t) => clamp(aA(t) - 450, 0, 180))]]);
  anim("cbL", null, [["rotate", "deg", 1, halfKeys((t) => clamp(aB(t) - 90, 0, 180))]]);
  anim("cbR", null, [["rotate", "deg", 1, halfKeys((t) => clamp(aB(t) - 270, 0, 180))]]);
  const RB = R * S_BIG;
  const tipT = (t: number) => onCircle(big(CT), RB, aA(t));
  const tipB = (t: number) => onCircle(big(CB), RB, aB(t));
  shots[HU].push({ k: "track", a: TRC[0], b: TRC[1], at: tipT, travel: 90 });
  shots[HR].push({ k: "track", a: TRC[0], b: TRC[1], at: tipB, travel: 90 });
  FL.push(flareEv(tipT(TRC[1]), TRC[1], 0.7, 260, 1, "green"), flareEv(tipB(TRC[1]), TRC[1], 0.7, 260, 1, "blue"));
  // the arms swing back and become the blades of the cut
  {
    const SWING = 160;
    const armKF = (id: string, a0: number, cut: [number, number], c0: number) =>
      anim(
        id,
        [
          [0, 0],
          [TRC[0] - 70, 0],
          [TRC[0] - 20, 1],
          [cut[1], 1],
          [cut[1] + 140, 0],
        ],
        [
          [
            "rotate",
            "deg",
            1,
            [
              [0, a0],
              [TRC[0], a0, IO],
              [TRC[1], a0 + 360],
              [TRC[1] + 40, a0 + 360, IO],
              [TRC[1] + 40 + SWING, c0],
              [cut[0], c0, IO],
              [cut[1], c0 + 180],
            ],
          ],
        ],
      );
    armKF("armA", 270, CUTT, 540);
    armKF("armB", 90, CUTB, 360);
  }
  // cut windows: half-planes rotating about each half's centre
  const cutKeys = (cut: [number, number]): Key[] => [
    [0, 0],
    [cut[0], 0, IO],
    [cut[1], 180],
    [RESET - 2, 180],
    [RESET, 0],
  ];
  anim("cwT", null, [["rotate", "deg", 1, cutKeys(CUTT)]]);
  anim("cwB", null, [["rotate", "deg", 1, cutKeys(CUTB)]]);
  const bladeT = (t: number) => onCircle(big(CT), RB, 180 + 180 * js(IO)(clamp((t - CUTT[0]) / (CUTT[1] - CUTT[0]), 0, 1)));
  const bladeB = (t: number) => onCircle(big(CB), RB, 180 * js(IO)(clamp((t - CUTB[0]) / (CUTB[1] - CUTB[0]), 0, 1)));
  shots[HT].push({
    k: "track",
    a: CUTT[0],
    b: CUTT[1],
    at: bladeT,
    travel: 80,
  });
  shots[HL].push({
    k: "track",
    a: CUTB[0],
    b: CUTB[1],
    at: bladeB,
    travel: 80,
  });
  FL.push(flareEv(bladeT(CUTT[1]), CUTT[1], 0.9, 300, 1, "cyan"), flareEv(bladeB(CUTB[1]), CUTB[1], 0.9, 300, 1, "lime"));
  SP.push(sparkEv(bladeT(CUTT[1]), CUTT[1], 30, 0.7, 420, 1), sparkEv(bladeB(CUTB[1]), CUTB[1], -30, 0.7, 420, 1));
  // the construction guides glow while they are drawn, settle faint once docked
  anim(
    "gd",
    [
      [0, 1],
      [DOCK[0], 1, IO],
      [DOCK[1], GD_POSTER],
      [RESET, GD_POSTER],
      [RESET + 2, 1],
    ],
    null,
  );
  // FORGE: the halves flash white-hot and cool (again at SYNC)
  kf("mh", [
    [0, Z0],
    [FORGE - 2, Z0],
    [FORGE + 14, O1],
    [FORGE + 110, O1, COOL],
    [FORGE + 650, Z0],
    [SYNC - 2, Z0],
    [SYNC + 20, "opacity:.8"],
    [SYNC + 460, Z0],
  ]);
  FL.push(flareEv(big(AC), FORGE, 1.9, 520, 2, "lime"));
  // the dot falls onto the ledge (gravity), squashes, rebounds
  {
    const fall = (big(DOT)[1] - 22) / S_BIG / 4; // cqw, local
    const D = (o: number, y: number, sx: number, sy: number) => `opacity:${o};transform:translateY(${f(y, 2)}cqw) scale(${f(sx)},${f(sy)})`;
    kf("dot", [
      [0, D(0, -fall, 1, 1)],
      [DROP[0] - 2, D(0, -fall, 0.85, 1.2)],
      [DROP[0], D(1, -fall, 0.85, 1.2), GRAV],
      [DROP[1], D(1, 0, 1.32, 0.66), OUT],
      [DROP[1] + 100, D(1, -1.4, 0.92, 1.1), IO],
      [DROP[1] + 200, D(1, 0, 1.06, 0.95), IO],
      [DROP[1] + 290, D(1, 0, 1, 1)],
      [SYNC - 2, D(1, 0, 1, 1), OUT],
      [SYNC + 90, D(1, -0.8, 1.15, 1.15), IO],
      [SYNC + 320, D(1, 0, 1, 1)],
      [RESET - 2, D(1, 0, 1, 1)],
      [RESET, D(0, -fall, 1, 1)],
    ]);
    const land = big([DOT[0], DOT[1] + RD]);
    FL.push(flareEv(land, DROP[1], 1.1, 380, 2, "cyan"));
    SP.push(sparkEv(land, DROP[1], 0, 0.75, 460, 2));
  }

  /* ── PRINT: the board exists only above the printhead (counter-translated
        window); it opens fully when nothing below is visible yet ── */
  {
    const H = PW_Y1 - PW_Y0;
    const hk: Key[] = [
      [0, H],
      [PR[0], H, IO],
      [PR[1], PW_Y1 - PR_Y],
      [OPEN_T - 2, PW_Y1 - PR_Y],
      [OPEN_T, 0],
      [ER[0], 0, IO],
      [ER[1], H],
    ];
    anim("bo", null, [["translateY", "cqw", 2, hk.map(([t, v, e]): Key => [t, -v / 4, e])]]);
    anim("bi", null, [["translateY", "cqw", 2, hk.map(([t, v, e]): Key => [t, v / 4, e])]]);
    const Y = (o: number, y: number) => `opacity:${f(o)};transform:translateY(${f(y / 4)}cqw)`;
    kf("scan", [
      [0, Y(0, PW_Y0)],
      [PR[0] - 120, Y(0, PW_Y0)],
      [PR[0] - 90, Y(1, PW_Y0)],
      [PR[0] - 70, Y(0.35, PW_Y0)],
      [PR[0] - 40, Y(1, PW_Y0)],
      [PR[0], Y(1, PW_Y0), IO],
      [PR[1], Y(1, PR_Y)],
      [PR[1] + 160, Y(0, PR_Y + 14)],
      [ER[0] - 160, Y(0, PW_Y1 - 10)],
      [ER[0] - 40, Y(1, PW_Y1 - 10)],
      [ER[0], Y(1, PW_Y1 - 10), IO],
      [ER[1], Y(1, PW_Y0)],
      [ER[1] + 160, Y(0, PW_Y0 - 12)],
    ]);
  }

  /* ── PALETTE: each head stamps its own swatch, all four the white one ── */
  SWATCH.forEach((s, i) => {
    const t = SW_T[i];
    const W = (o: number, y: number, sc: number) => `opacity:${o};transform:translateY(${f(y, 2)}cqw) scale(${f(sc)})`;
    const w = WAVE + i * 80;
    kf(`sw${i}`, [
      [0, W(0, -2.5, 0.3)],
      [t - 2, W(0, -2.5, 0.3), OUT],
      [t + 150, W(1, 0, 1.14), IO],
      [t + 340, W(1, 0, 1)],
      [w, W(1, 0, 1), OUT],
      [w + 150, W(1, -1.1, 1.04), IO],
      [w + 380, W(1, 0, 1)],
      ...zap(SW_Y, SW_Y + SW_H + 10, (o) => W(o, 0, 1)),
      [RESET, W(0, -2.5, 0.3)],
    ]);
    const c = swC(i);
    if (i < 4) {
      shots[i === 0 ? HL : i === 1 ? HT : i === 2 ? HU : HR].push({
        k: "hit",
        land: t - 50,
        to: c,
        travel: 90,
      });
      FL.push(flareEv(c, t - 50, 1.0, 330, 2, s.c));
    } else {
      for (let k = 0; k < 4; k++) shots[k].push({ k: "hit", land: t - 60, to: c, travel: 90 });
      FL.push(flareEv(c, t - 60, 1.45, 420, 2, "lime"));
      SP.push(sparkEv([c[0], c[1] + 10], t, 0, 0.6, 420, 1));
    }
  });

  /* ── TYPE: "Aa" slams (stretch → squash → rebound), the ladder slides in ── */
  {
    const A = (o: number, y: number, sx: number, sy: number, sk: number) =>
      `opacity:${o};transform:translateY(${f(y, 2)}%) scale(${f(sx, 3)},${f(sy, 3)}) skewX(${f(sk, 1)}deg)`;
    kf("aa", [
      [0, A(0, -30, 2.1, 1.7, -16)],
      [AA_T - PRE, A(0, -30, 2.1, 1.7, -16)],
      [AA_T - PRE + 26, A(1, -27, 2, 1.6, -16), IN],
      [AA_T, A(1, 3, 1.06, 0.8, 9), OUT],
      [AA_T + 90, A(1, -2, 0.96, 1.1, -3), IO],
      [AA_T + 190, A(1, 0.5, 1.01, 0.985, 1), IO],
      [AA_T + 290, A(1, 0, 1, 1, 0)],
      [WAVE + 500, A(1, 0, 1, 1, 0), OUT],
      [WAVE + 640, A(1, -6, 1.05, 1.05, -4), IO],
      [WAVE + 860, A(1, 0, 1, 1, 0)],
      ...zap(AA.y, AA.y + AA.h, (o) => A(o, 0, 1, 1, 0)),
      [RESET, A(0, -30, 2.1, 1.7, -16)],
    ]);
    shots[HT].push({ k: "hit", land: AA_T - PRE, to: AA_C, travel: 90 });
    FL.push(flareEv(AA_C, AA_T - PRE, 1.15, 300, 2, "cyan"));
    FL.push({
      pri: 1,
      tag: "cyan",
      fr: [
        [AA_T - 22, [AA_C[0], AA_C[1] + 8, 0.3, 0.3, 0], OUT],
        [AA_T, [AA_C[0], AA_C[1] + 8, 1.6, 0.9, 0.9], OUT],
        [AA_T + 480, [AA_C[0], AA_C[1] + 8, 1.8, 0.5, 0]],
      ],
    });
    SP.push(sparkEv([AA_C[0], AA.y + AA.h - 6], AA_T, 0, 0.7, 420, 1));
    const L = (o: number, x: number, sk: number) => `opacity:${o};transform:translateX(${f(x, 2)}cqw) skewX(${f(sk)}deg)`;
    kf("wt", [[0, L(0, 4, -18)], [WT_T - 2, L(0, 4, -18), BACK2], [WT_T + 420, L(1, 0, 0)], ...zap(WT_Y[0], WT_Y[0] + 54, (o) => L(o, 0, 0)), [RESET, L(0, 4, -18)]]);
    const wc: Pt = [WT_X + 30, WT_Y[1] + 7];
    shots[HU].push({ k: "hit", land: WT_T - 100, to: wc, travel: 90 });
    FL.push(flareEv(wc, WT_T - 100, 0.9, 300, 1, "green"));
  }

  /* ── APPLIED: card stamp (lime), phone boot (green), sign on (blue) ── */
  {
    const S = (o: number, s: number) => `opacity:${o};transform:scale(${f(s, 3)})`;
    const bump: Stop[] = [
      [SYNC - 2, S(1, 1), OUT],
      [SYNC + 90, S(1, 1.12), IO],
      [SYNC + 320, S(1, 1)],
    ];
    const t0 = APP[0];
    kf("ap0", [
      [0, S(0, 2.4)],
      [t0 - 70, S(0, 2.4)],
      [t0 - 50, S(1, 2.2), IN],
      [t0, S(1, 0.84), OUT],
      [t0 + 110, S(1, 1.08), IO],
      [t0 + 240, S(1, 1)],
      ...bump,
      ...zap(CARD_MC[1] - 8, CARD_MC[1] + 8, (o) => S(o, 1)),
      [RESET, S(0, 2.4)],
    ]);
    const t1 = APP[1];
    kf("ap1", [
      [0, S(0, 1.08)],
      [t1 - 2, S(0, 1.08)],
      [t1, S(1, 1.08), STEP],
      [t1 + 40, S(0.3, 1.06), STEP],
      [t1 + 80, S(1, 1.05), OUT],
      [t1 + 300, S(1, 1)],
      ...bump,
      ...zap(SCREEN.y, SCREEN.y + SCREEN.h, (o) => S(o, 1)),
      [RESET, S(0, 1.08)],
    ]);
    const t2 = APP[2];
    kf("ap2", [
      [0, Z0],
      [t2 - 2, Z0],
      [t2, O1, STEP],
      [t2 + 50, "opacity:.25", STEP],
      [t2 + 90, O1, STEP],
      [t2 + 150, "opacity:.45", STEP],
      [t2 + 200, O1, STEP],
      [t2 + 330, "opacity:.7", STEP],
      [t2 + 370, O1],
      [SYNC - 2, O1],
      [SYNC + 40, "opacity:.6"],
      [SYNC + 120, O1],
      ...zap(SIGN.y, SIGN.y + SIGN.h, (o) => `opacity:${o}`),
      [RESET, Z0],
    ]);
    const tgt: [number, Pt, string][] = [
      [HL, CARD_MC, "lime"],
      [HU, PHONE_MC, "green"],
      [HR, SIGN_MC, "blue"],
    ];
    tgt.forEach(([h, p, c], i) => {
      shots[h].push({ k: "hit", land: APP[i] - 100, to: p, travel: 90 });
      FL.push(flareEv(p, APP[i] - 100, i === 2 ? 1.3 : 1.1, 360, 2, c));
    });
    SP.push(sparkEv([CARD_MC[0], CARD_MC[1] + 6], APP[0], 0, 0.65, 420, 2));
    SP.push(sparkEv([SIGN_MC[0], SIGN.y + SIGN.h], APP[2], 0, 0.6, 400, 1));
  }

  /* ── KINETIC HEADLINE: per group slam (fitted scale + origin, stretch →
        squash → rebound) in a white-hot bloom; wave in the hold ── */
  const pY = (em: number) => f((em / HL_LINE) * 100, 2);
  function slamKF(name: string, t: number, isBig: boolean, wave: number, g: Group) {
    const cx = (s: number) => f(((1 - s) * (g.w / 2 - g.ox) * 100) / g.w, 2);
    const tr = (o: number, y: number, sx: number, sy: number, sk: number, x = "0") =>
      `opacity:${f(o)};transform:translateX(${x}%) translateY(${pY(y)}%) scale(${f(sx, 3)},${f(sy, 3)}) skewX(${f(sk, 1)}deg)`;
    const k0 = isBig ? -18 : -14;
    const y0 = isBig ? -0.3 : -0.22;
    const pre = isBig ? PRE_L : PRE;
    const { s0, k } = g;
    kf(name, [
      [0, tr(0, y0, s0 * k, s0, k0)],
      [t - pre, tr(0, y0, s0 * k, s0, k0)],
      [t - pre + 26, tr(1, y0 * 0.9, s0 * 0.94 * k, s0 * 0.94, k0), IN],
      [t, tr(1, 0.035, isBig ? 0.94 : 0.96, isBig ? 0.82 : 0.86, isBig ? 9 : 6), OUT],
      [t + 90, tr(1, -0.02, isBig ? 1.05 : 1.03, isBig ? 1.1 : 1.06, -3), IO],
      [t + 190, tr(1, 0.005, 0.99, 0.985, 1), IO],
      [t + 290, tr(1, 0, 1, 1, 0)],
      [wave, tr(1, 0, 1, 1, 0), OUT],
      [wave + 120, tr(1, -0.1, 1.016, 1.016, -2, cx(1.016)), IO],
      [wave + 330, tr(1, 0, 1, 1, 0)],
      ...zap(g.y, g.y + lh, (o) => tr(o, 0, 1, 1, 0)),
      [RESET, tr(0, y0, s0 * k, s0, k0)],
    ]);
  }
  const waveAt = (slot: number) => WAVE + 300 + slot * 90;
  groups.forEach((g, i) => {
    const t = SLOT[g.slot];
    const head = SLOT_HEAD[g.slot];
    const c = HEADS[head].c;
    slamKF(`w${i}`, t, false, waveAt(g.slot), g);
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
    SP.push(sparkEv([g.cx, g.cy + 0.42 * lh], t, 0, 0.7, 410, 2));
  });
  const WAVE_L = waveAt(3) + 40;
  slamKF("wL", LAST, true, WAVE_L, climax);
  for (let k = 0; k < 4; k++)
    shots[k].push({
      k: "hit",
      land: LAST - PRE_L,
      to: [climax.cx, climax.cy],
      travel: 100,
    });
  FL.push(flareEv([climax.cx, climax.cy], LAST - PRE_L, 1.6, 460, 2, "lime"));
  SP.push(sparkEv([climax.cx, climax.cy + 0.42 * lh], LAST, 0, 1.0, 560, 2));
  kf("hg", [
    [0, Z0],
    [LAST - 2, Z0],
    [LAST + 12, O1],
    [LAST + 110, O1, COOL],
    [LAST + 640, Z0],
    [SYNC - 2, Z0],
    [SYNC + 20, "opacity:.6"],
    [SYNC + 420, Z0],
  ]);
  kf("ul", [
    [0, "opacity:0;transform:scaleX(0)"],
    [LAST + 88, "opacity:0;transform:scaleX(0)"],
    [LAST + 90, "opacity:1;transform:scaleX(0)", OUT],
    [LAST + 460, "opacity:1;transform:scaleX(1)"],
    ...zap(climax.y + lh * 0.8, climax.y + lh, (o) => `opacity:${o};transform:scaleX(1)`),
    [RESET, "opacity:0;transform:scaleX(0)"],
  ]);
  {
    const y = climax.y + (UL_Y + UL_H / 2) * lay.fs;
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

  /* ── CTA FORGE: two weld tips trace the pill outline in opposite directions
        (two beams each), collide on the right → white-hot → lime, label rises ── */
  const CR = CTA_H / 2;
  const cyM = CTA_Y + CR;
  const xL = CTA_X + CR;
  const xR = CTA_X + ctaW - CR;
  const tipA: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 270, 4), [xR, CTA_Y], ...arc(xR, cyM, CR, 270, 360, 4)];
  const tipBp: Pt[] = [[CTA_X, cyM], ...arc(xL, cyM, CR, 180, 90, 4), [xR, CTA_Y + CTA_H], ...arc(xR, cyM, CR, 90, 0, 4)];
  const LT = plen(tipA);
  const D = FG[1] - FG[0];
  const tipAt = (path: Pt[]) => (t: number) => pat(path, (clamp(t - FG[0], 0, D) / D) * LT);
  const foW = xR - (CTA_X - SW_C / 2);
  const fo = {
    x: CTA_X - SW_C / 2 - FO_M,
    y: CTA_Y - SW_C / 2 - FO_M,
    w: foW + FO_M,
    h: CTA_H + SW_C + 2 * FO_M,
    ow: foW,
  };
  const tq = (d: number) => FG[0] + (d / LT) * D;
  [tipA, tipBp].forEach((path, k) => {
    const fr: Frame[] = [
      [FG[0] - 70, [path[0][0], path[0][1], 0.37, 0.37, 0]],
      [FG[0], [path[0][0], path[0][1], 0.37, 0.37, 1]],
    ];
    let acc = 0;
    path.forEach((p, i) => {
      if (i) acc += dist(path[i - 1], p);
      if (i) fr.push([tq(acc), [p[0], p[1], 0.37, 0.37, 1]]);
    });
    const z = path[path.length - 1];
    if (k) fr.push([FG[1] + 120, [z[0], z[1], 0.3, 0.3, 0]]);
    else {
      fr[fr.length - 2][2] = OUT;
      fr[fr.length - 1] = [FG[1], [z[0], z[1], 1.7, 1.7, 1], OUT];
      fr.push([FG[1] + 520, [z[0], z[1], 1.7 * 0.45, 1.7 * 0.45, 0]]);
    }
    FL.push({ pri: 2, tag: "lime", fr });
  });
  {
    const hidden = -fo.w;
    const st: [number, number, number][] = [
      [0, 0, hidden],
      [FG[0] - 2, 0, hidden],
    ];
    let acc = 0;
    tipA.forEach((p, i) => {
      if (i) acc += dist(tipA[i - 1], p);
      st.push([tq(acc), 1, Math.min(p[0], xR) - xR]);
    });
    st.push([FG[1] + 60, 1, 0], [FG[1] + 380, 0, 0], [FG[1] + 382, 0, hidden]);
    kf(
      "foo",
      st.map(([t, o, dx]): Stop => [t, `opacity:${o};transform:translateX(${f(dx / 4, 3)}cqw)`]),
    );
    kf(
      "foi",
      st.map(([t, , dx]): Stop => [t, `transform:translateX(${f(-dx / 4, 3)}cqw)`]),
    );
  }
  shots[HT].push({
    k: "track",
    a: FG[0],
    b: FG[1],
    at: tipAt(tipA),
    travel: 80,
  });
  shots[HU].push({
    k: "track",
    a: FG[0],
    b: FG[1],
    at: tipAt(tipA),
    travel: 80,
  });
  shots[HL].push({
    k: "track",
    a: FG[0],
    b: FG[1],
    at: tipAt(tipBp),
    travel: 80,
  });
  shots[HR].push({
    k: "track",
    a: FG[0],
    b: FG[1],
    at: tipAt(tipBp),
    travel: 80,
  });
  SP.push(sparkEv([CTA_X + ctaW, cyM], FG[1], 52, 0.85, 500, 2));
  kf("cta", [
    [0, "opacity:0;transform:scale(1)"],
    [FG[1] - 2, "opacity:0;transform:scale(1)"],
    [FG[1], "opacity:1;transform:scale(1)", OUT],
    [FG[1] + 110, "opacity:1;transform:scale(1.045)", IO],
    [FG[1] + 330, "opacity:1;transform:scale(1)"],
    ...zap(CTA_Y, CTA_Y + CTA_H, (o) => `opacity:${o};transform:scale(1)`),
    [RESET, "opacity:0;transform:scale(1)"],
  ]);
  anim(
    "ctaH",
    [
      [0, 0],
      [FG[1] - 2, 0],
      [FG[1] + 12, 1],
      [FG[1] + 110, 1, COOL],
      [FG[1] + 640, 0],
    ],
    [
      [
        "scale",
        "",
        3,
        [
          [0, 1],
          [FG[1], 1, OUT],
          [FG[1] + 110, 1.045, IO],
          [FG[1] + 330, 1],
        ],
      ],
    ],
  );
  {
    const L0 = FG[1] + 150;
    kf("lbl", [
      [0, "transform:translateY(118%) skewY(9deg)"],
      [L0, "transform:translateY(118%) skewY(9deg)", BACK2],
      [L0 + 460, "transform:translateY(0) skewY(0deg)"],
      [RESET - 2, "transform:translateY(0) skewY(0deg)"],
      [RESET, "transform:translateY(118%) skewY(9deg)"],
    ]);
  }

  /* ── PAYOFF: brand sync — every instance of the mark is hit at once ── */
  {
    const tgt: [number, Pt, string][] = [
      [HT, AC, "cyan"],
      [HL, CARD_MC, "lime"],
      [HU, PHONE_MC, "green"],
      [HR, SIGN_MC, "blue"],
    ];
    for (const [h, p, c] of tgt) {
      shots[h].push({ k: "hit", land: SYNC, to: p, travel: 100 });
      FL.push(flareEv(p, SYNC, h === HT ? 1.9 : 1.5, 480, 2, c));
    }
    SP.push(sparkEv([AC[0], AC[1] + 30], SYNC, 0, 0.8, 480, 1));
    const ch = CTA_X + ctaW + 10;
    kf("chips", [
      [0, "opacity:0;transform:translateX(-2cqw) scale(.6)"],
      [CHIPS_T - 2, "opacity:0;transform:translateX(-2cqw) scale(.6)", BACK],
      [CHIPS_T + 380, "opacity:1;transform:translateX(0) scale(1)"],
      ...zap(CTA_Y, CTA_Y + CTA_H, (o) => `opacity:${o};transform:translateX(0) scale(1)`),
      [RESET, "opacity:0;transform:translateX(-2cqw) scale(.6)"],
    ]);
    FL.push(flareEv([ch + 6, cyM], CHIPS_T, 0.7, 260, 0, "green"));
  }

  /* ── HOLD: 3D tilt + glass sheen ── */
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
    const S = (o: number, x: number) => `opacity:${f(o)};transform:translateX(${x}%) skewX(-18deg)`;
    kf("sheen", [
      [0, S(0, -130)],
      [SH[0] - 2, S(0, -130)],
      [SH[0], S(0.75, -130), IO],
      [SH[1], S(0.75, 330)],
      [SH[1] + 2, S(0, -130)],
    ]);
  }

  /* ── rail heads ── */
  HEADS.forEach((h, k) => headKF(h, shots[k]));

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
    shake(FORGE, 0.5);
    shake(DROP[1], 0.3);
    shake(LAST, 1);
    shake(FG[1], 0.45);
    shake(SYNC, 0.6);
    kf("shake", st);
    const fl: Stop[] = [[0, Z0]];
    const flash = (t: number, o: number, life: number) => fl.push([t - 2, Z0], [t + 25, `opacity:${o}`], [t + life, Z0]);
    flash(FORGE, 0.7, 420);
    flash(LAST, 0.95, 460);
    flash(FG[1], 0.4, 420);
    flash(SYNC, 0.75, 480);
    kf("flash", fl);
  }

  /* ── pools ── */
  const pf = pool("pf", FL, 6, fmtF, true);
  const ps = pool(
    "ps",
    SP.map((e) => ({ ...e, tag: "lime" })),
    2,
    fmtS,
  );

  return { css: (BASE + end()).replace(/\n/g, ""), lay, pf, ps, fo };
}

/* ───────────────────────────── static styles ─────────────────────────────── */

const BEAM_BG =
  "linear-gradient(rgb(var(--bdm-hot)/.95),rgb(var(--bdm-hot)/.95)) 0 50%/100% max(1.3px,.3cqw) no-repeat,linear-gradient(transparent,rgb(var(--bdm-c)/.07) 20%,rgb(var(--bdm-c)/.3) 37%,rgb(var(--bdm-c)/.85) 47%,rgb(var(--bdm-c)/.85) 53%,rgb(var(--bdm-c)/.3) 63%,rgb(var(--bdm-c)/.07) 80%,transparent)";
const GLOW = (core: string, mid: string, out: string) =>
  `radial-gradient(closest-side,rgb(var(--bdm-hot)) ${core},rgb(var(--bdm-c)/.8) ${mid},rgb(var(--bdm-c)/.2) ${out},transparent)`;
const MONO = "var(--font-jetbrains-mono),ui-monospace,monospace";
const HEAD = "var(--font-jakarta),var(--font-inter-tight),system-ui,sans-serif";

const BASE = `
.bdm-root{--bdm-lime:200 240 46;--bdm-cyan:20 224 200;--bdm-green:34 211 140;--bdm-blue:46 102 255;--bdm-hot:242 243 238;position:relative;z-index:20;width:100%;aspect-ratio:1;container-type:inline-size;isolation:isolate;pointer-events:none;user-select:none;-webkit-user-select:none;forced-color-adjust:none;color:#f2f3ee;font-family:var(--font-inter-tight),system-ui,sans-serif;line-height:1;letter-spacing:normal;word-spacing:normal;text-align:left}
.bdm-cv{position:absolute;inset:-3rem;content-visibility:auto;contain-intrinsic-size:0 0}
.bdm-cv>.bdm-L{inset:3rem}
html.a11y-hide-img .bdm-cv{display:none}
.bdm-root i{font-style:normal}
.bdm-a{animation-duration:${T}ms;animation-timing-function:linear;animation-iteration-count:infinite}
[data-paused] .bdm-a{animation-play-state:paused}
.bdm-L{position:absolute;inset:0}
.bdm-abs{position:absolute;display:block}
.bdm-clip{position:absolute;overflow:hidden;overflow:clip}
.bdm-o0{position:absolute;width:100cqw;height:100cqw}
.bdm-z{position:absolute;left:0;top:0;width:0;height:0}
.bdm-svg{position:absolute;display:block;overflow:visible}
.bdm-grid{position:absolute;inset:-8%;background:radial-gradient(circle,rgb(242 243 238/.1) 0 max(.7px,.2cqw),transparent max(1px,.28cqw)) 2.5cqw 2.5cqw/5cqw 5cqw}
.bdm-rail{position:absolute;left:${P(RI)};top:${P(RI)};right:${P(RI)};bottom:${P(RI)};border:1px dashed rgb(242 243 238/.16);border-radius:3.6cqw}
.bdm-floor{position:absolute;left:6%;top:89%;width:88%;height:8%;border-radius:50%;background:radial-gradient(closest-side,rgb(200 240 46/.22),rgb(20 224 200/.06) 60%,transparent)}
.bdm-board{position:absolute;inset:0;transform-origin:50% 52%}
.bdm-dock{position:absolute;left:0;top:0;width:100cqw;height:100cqw;transform-origin:24.5% 24.5%}
.bdm-tile{border-radius:2.4cqw;background:linear-gradient(160deg,rgb(22 24 32/.94),rgb(9 10 14/.94));box-shadow:inset 0 0 0 1px rgb(242 243 238/.11),0 .8cqw 2.6cqw rgb(0 0 0/.4)}
.bdm-tA{background:radial-gradient(64% 58% at 52% 46%,rgb(200 240 46/.08),transparent 72%),linear-gradient(160deg,rgb(22 24 32/.96),rgb(9 10 14/.96));box-shadow:inset 0 0 0 1px rgb(242 243 238/.13),0 .8cqw 2.6cqw rgb(0 0 0/.4)}
.bdm-cw{position:absolute;overflow:hidden;overflow:clip}
.bdm-disc{position:absolute;border-radius:50%}
.bdm-dT{background:radial-gradient(closest-side,#dcfb6c,#c8f02e 62%,#b2dc1c)}
.bdm-dB{background:radial-gradient(closest-side,#5af5e0,#14e0c8 62%,#0ec2ae)}
.bdm-mh{opacity:0;filter:drop-shadow(0 0 .8cqw rgb(var(--bdm-lime)/.9)) drop-shadow(0 0 2.6cqw rgb(var(--bdm-lime)/.5))}
.bdm-dot{border-radius:50%;background:radial-gradient(circle at 38% 34%,#fff,#f2f3ee 55%,#d9dbd2);box-shadow:0 0 1.4cqw rgb(var(--bdm-lime)/.45);transform-origin:50% 100%}
.bdm-gd{position:absolute;inset:0;opacity:${GD_POSTER}}
.bdm-ring{position:absolute;transform-origin:50% 50%}
.bdm-arm{position:absolute;left:0;top:0;width:0;height:0;opacity:0;--bdm-c:var(--bdm-lime)}
.bdm-armL{position:absolute;left:0;top:-.5cqw;width:${cq(R)};height:1cqw;background:linear-gradient(90deg,rgb(var(--bdm-hot)/.15),rgb(var(--bdm-hot)/.6) 45%,rgb(var(--bdm-hot))) 0 50%/100% max(1px,.22cqw) no-repeat,linear-gradient(90deg,rgb(var(--bdm-c)/.05),rgb(var(--bdm-c)/.55));border-radius:1cqw}
.bdm-armT{position:absolute;left:${cq(R)};top:0;width:4.6cqw;height:4.6cqw;margin:-2.3cqw 0 0 -2.3cqw;border-radius:50%;background:${GLOW("12%", "28%", "58%")}}
.bdm-chip{position:absolute;display:flex;align-items:center;justify-content:center;font-family:${MONO};font-weight:700;white-space:nowrap;border-radius:2cqw}
.bdm-phi{height:2.5cqw;padding:0 .9cqw;font-size:1.4cqw;color:#14e0c8;border:1px solid rgb(var(--bdm-cyan)/.4);background:rgb(var(--bdm-cyan)/.08);transform-origin:0 50%}
.bdm-sw{transform-origin:50% 80%}
.bdm-swb{position:absolute;left:0;top:0;width:100%;height:${cq(SW_H)};border-radius:1.2cqw;box-shadow:inset 0 0 0 1px rgb(255 255 255/.12),0 .6cqw 1.6cqw rgb(0 0 0/.35)}
.bdm-swl{position:absolute;left:0;top:${cq(SW_H + 3.6)};width:100%;text-align:center;font-family:${MONO};font-size:1.25cqw;font-weight:700;color:rgb(242 243 238/.55);white-space:nowrap}
.bdm-aa{position:absolute;font-family:${HEAD};font-weight:800;font-size:${cq(AA_FS)};line-height:1;letter-spacing:-.02em;white-space:nowrap;color:#f2f3ee;transform-origin:47% 82%;font-kerning:none}
.bdm-aa i{color:#c8f02e}
.bdm-wt{position:absolute;left:${cq(WT_X)};top:${cq(WT_Y[0])};width:${cq(86)};height:${cq(54)};transform-origin:0 50%}
.bdm-wr{position:absolute;left:0;width:100%;height:${cq(15)};display:flex;align-items:center;justify-content:space-between;box-shadow:inset 0 -1px rgb(242 243 238/.08)}
.bdm-wr b{font-family:var(--font-inter-tight),system-ui,sans-serif;font-size:${cq(12.5)};line-height:1;color:#f2f3ee}
.bdm-wr i{font-family:${MONO};font-size:1.3cqw;font-weight:700;color:rgb(242 243 238/.45)}
.bdm-card{position:absolute;border-radius:1.2cqw}
.bdm-cardB{background:linear-gradient(150deg,#d4f54c,#c8f02e 55%,#b6de1e);box-shadow:0 1cqw 2.4cqw rgb(0 0 0/.45)}
.bdm-cardF{background:linear-gradient(160deg,#1c1d24,#121318);box-shadow:inset 0 0 0 1px rgb(242 243 238/.14),0 1.2cqw 2.8cqw rgb(0 0 0/.55)}
.bdm-sk{position:absolute;display:block;border-radius:1cqw}
.bdm-mk svg,.bdm-mk{display:block}
.bdm-mk svg{width:100%;height:100%;overflow:visible}
.bdm-phone{border-radius:1.6cqw;background:#0b0c10;box-shadow:inset 0 0 0 max(1px,.25cqw) rgb(242 243 238/.22),0 1cqw 2.6cqw rgb(0 0 0/.5)}
.bdm-scr{border-radius:1.1cqw;transform-origin:50% 40%;background:radial-gradient(90% 55% at 50% 34%,rgb(var(--bdm-cyan)/.28),rgb(var(--bdm-lime)/.06) 60%,transparent),#0d0f14}
.bdm-notch{border-radius:1cqw;background:#000;box-shadow:inset 0 0 0 1px rgb(242 243 238/.1)}
.bdm-wire{background:linear-gradient(rgb(242 243 238/.32),rgb(242 243 238/.14))}
.bdm-sign{border-radius:1.8cqw;background:linear-gradient(170deg,#15161c,#0b0c10);box-shadow:inset 0 0 0 1px rgb(242 243 238/.16),0 1cqw 2.4cqw rgb(0 0 0/.5)}
.bdm-halo{border-radius:50%;background:radial-gradient(closest-side,rgb(var(--bdm-lime)/.26),rgb(var(--bdm-cyan)/.08) 60%,transparent)}
.bdm-signl{border-radius:1.8cqw;box-shadow:inset 0 0 0 max(1px,.22cqw) rgb(var(--bdm-lime)/.55),0 0 2.6cqw rgb(var(--bdm-lime)/.28)}
.bdm-title{position:absolute;left:${cq(HL_X)};top:${cq(HL_Y)};width:${cq(HL_W)};font-family:${HEAD};font-weight:800;font-size:${cq(HL_FS0)};line-height:${HL_LINE};letter-spacing:${HL_LS}em;font-kerning:none;font-variant-ligatures:none}
.bdm-ln{display:block;position:relative;white-space:nowrap}
.bdm-w{position:relative;display:inline-block;white-space:nowrap;transform-origin:50% 80%}
.bdm-wL{color:#c8f02e}
.bdm-p{margin-left:-${PUNCT_EM}em}
.bdm-hg{position:absolute;left:0;top:0;opacity:0;white-space:nowrap;color:#fff;text-shadow:0 0 .05em #fff,0 0 .18em rgb(var(--bdm-lime)/.95),0 0 .45em rgb(var(--bdm-cyan)/.6)}
.bdm-ul{position:absolute;top:${f(UL_Y, 3)}em;height:${f(UL_H, 3)}em;border-radius:1em;background:linear-gradient(90deg,#c8f02e,#14e0c8);transform-origin:0 50%}
.bdm-cta{position:absolute;box-sizing:border-box;display:flex;align-items:center;padding:0 ${cq(CTA_PR)} 0 ${cq(CTA_PL)};border-radius:5cqw;background:#c8f02e;color:#0a0a0b;font-weight:700;font-size:${cq(CTA_FS0)};letter-spacing:${f(CTA_LS, 3)}em;font-kerning:none;font-variant-ligatures:none;white-space:nowrap;box-shadow:0 0 3.5cqw rgb(200 240 46/.28)}
.bdm-ctal{display:block;overflow:hidden;overflow:clip;line-height:1.3}
.bdm-lbl{display:flex;align-items:center;gap:${cq(CTA_GAP)};transform-origin:0 50%}
.bdm-ctah{border-radius:5cqw;background:#fff;opacity:0;box-shadow:0 0 1.5cqw #fff,0 0 5cqw rgb(var(--bdm-lime)/.85)}
.bdm-ctaa{display:block;flex:none;width:${cq(CTA_ARROW)};height:${cq(CTA_ARROW)}}
.bdm-foc{opacity:0}
.bdm-fo{position:absolute;border:${cq(SW_C)} solid #c8f02e;border-right:0;box-shadow:0 0 1cqw rgb(var(--bdm-lime)/.6)}
.bdm-chips{position:absolute;display:flex;gap:1cqw;transform-origin:0 50%}
.bdm-ex{position:relative;height:3.4cqw;padding:0 1cqw;font-size:1.5cqw;color:rgb(242 243 238/.75);border:1px solid rgb(242 243 238/.2);background:rgb(242 243 238/.04)}
.bdm-ex:first-child{color:#22d38c;border-color:rgb(var(--bdm-green)/.45);background:rgb(var(--bdm-green)/.08)}
.bdm-glass{position:absolute;overflow:hidden;overflow:clip}
.bdm-sheen{position:absolute;top:-20%;left:0;width:34%;height:140%;background:linear-gradient(90deg,transparent,rgb(var(--bdm-hot)/.07) 40%,rgb(var(--bdm-hot)/.14) 50%,rgb(var(--bdm-hot)/.07) 60%,transparent);opacity:0}
.bdm-c-lime{--bdm-c:var(--bdm-lime)}.bdm-c-cyan{--bdm-c:var(--bdm-cyan)}.bdm-c-green{--bdm-c:var(--bdm-green)}.bdm-c-blue{--bdm-c:var(--bdm-blue)}
.bdm-flash{position:absolute;inset:-12%;background:radial-gradient(55% 45% at 50% 40%,rgb(var(--bdm-hot)/.2),rgb(var(--bdm-lime)/.09) 45%,transparent 75%);opacity:0}
.bdm-scan{position:absolute;left:-8cqw;width:116cqw;top:-1.3cqw;height:2.6cqw;font-size:1cqw;opacity:0;--bdm-c:var(--bdm-lime)}
.bdm-scanw{position:absolute;left:0;right:0;bottom:50%;height:9em;background:linear-gradient(to top,rgb(var(--bdm-lime)/.15),rgb(var(--bdm-lime)/.04) 45%,transparent),repeating-linear-gradient(to top,rgb(var(--bdm-lime)/.08) 0 1px,transparent 1px .9em)}
.bdm-scanl{position:absolute;inset:0;background:${BEAM_BG}}
.bdm-scanf{position:absolute;top:50%;width:9em;height:9em;margin:-4.5em 0 0 -4.5em;border-radius:50%;background:${GLOW("6%", "18%", "48%")}}
.bdm-hb{position:absolute;left:0;top:-1.7cqw;width:100cqw;height:3.4cqw;transform-origin:0 50%;transform:scaleX(0);background:${BEAM_BG}}
.bdm-hd{position:absolute;left:0;top:0;width:0;height:0}
.bdm-hc{position:absolute;left:-1cqw;top:-1cqw;width:2cqw;height:2cqw;border-radius:50%;background:rgb(var(--bdm-hot));box-shadow:0 0 0 .38cqw rgb(var(--bdm-c)/.95),0 0 1.8cqw .5cqw rgb(var(--bdm-c)/.55),0 0 5cqw rgb(var(--bdm-c)/.25);outline:.26cqw dashed rgb(var(--bdm-c)/.7);outline-offset:1.15cqw}
.bdm-pf{position:absolute;left:0;top:0;width:14cqw;height:14cqw;margin:-7cqw 0 0 -7cqw;border-radius:50%;background:${GLOW("8%", "22%", "52%")};opacity:0}
.bdm-ps{position:absolute;left:0;top:0;width:30cqw;height:30cqw;margin:-15cqw 0 0 -15cqw;background:radial-gradient(closest-side,rgb(var(--bdm-hot)),rgb(var(--bdm-c)/.75) 7%,rgb(var(--bdm-c)/.12) 15%,transparent 22%);opacity:0;color:rgb(var(--bdm-c))}
.bdm-ps svg{display:block;width:100%;height:100%;overflow:visible}
`;

/* ───────────────────────────── markup ────────────────────────────────────── */

type Built = ReturnType<typeof build> & { ns: string };
/** built sheets per string set: the most recently used few */
const CACHE = new Map<string, Built>();
const CACHE_MAX = 12;
function getBuild(tagline: string, cta: string): Built {
  const key = `${tagline}\u0001${cta}`;
  let b = CACHE.get(key);
  if (b) CACHE.delete(key);
  else {
    const ns = `bdm-${hash(key)}-`;
    b = { ...build(tagline, cta, ns), ns };
    while (CACHE.size >= CACHE_MAX) CACHE.delete(CACHE.keys().next().value as string);
  }
  CACHE.set(key, b);
  return b;
}

/** absolutely positioned box, in viewBox units relative to a root-sized box */
const at = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: P(x),
  top: P(y),
  width: cq(w),
  height: cq(h),
});
const atB = (b: Box): CSSProperties => at(b.x, b.y, b.w, b.h);
/** the same inside a smaller positioned box (cqw always refers to the root width) */
const atq = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: cq(x),
  top: cq(y),
  width: cq(w),
  height: cq(h),
});

/** the mark as static art */
function MarkArt({ top = "#c8f02e", bot = "#14e0c8", dot = "#f2f3ee" }: { top?: string; bot?: string; dot?: string }) {
  return (
    <svg viewBox={`${f(MB.x, 3)} ${MB.y} ${f(MB.w, 3)} ${MB.h}`}>
      <path d={HALF_T} fill={top} />
      <path d={HALF_B} fill={bot} />
      <circle cx={f(DOT[0], 3)} cy={f(DOT[1], 3)} r={RD} fill={dot} />
    </svg>
  );
}
/** headline text with "." and "," pulled in by PUNCT_EM (see layout) */
function Tight({ s }: { s: string }) {
  return s.split(/([.,])/).map((p, i) =>
    i % 2 ? (
      <span key={i} className="bdm-p">
        {p}
      </span>
    ) : (
      p
    ),
  );
}

function SparkArt() {
  return (
    <svg viewBox="-50 -50 100 100">
      <path d={SPARK_TAILS} fill="currentColor" fillOpacity=".55" />
      <path d={SPARK_HEADS} fill="#fff" />
      <path d={SPARK_EMBERS} fill="#fff" fillOpacity=".85" />
    </svg>
  );
}

/** two half rings of a traced circle, each rotating inside its static half clip */
function TracedCircle({ c, A, ids }: { c: Pt; A: (n: string) => string; ids: [string, string] }) {
  const m = 2;
  const s = 2 * R + 2 * m;
  const vb = `${f(c[0] - R - m, 3)} ${f(c[1] - R - m, 3)} ${s} ${s}`;
  const stroke = {
    stroke: "rgb(20 224 200 / .95)",
    strokeWidth: 0.8,
    fill: "none",
  };
  return (
    <>
      <div className="bdm-clip" style={at(c[0], c[1] - R - m, R + m, s)}>
        <div className={`bdm-ring ${A(ids[0])}`} style={{ ...atq(-(R + m), 0, s, s), transform: "rotate(180deg)" }}>
          <svg className="bdm-svg" viewBox={vb} style={{ inset: 0, width: "100%", height: "100%" }}>
            <path d={`M${f(c[0], 3)} ${c[1] + R}A${R} ${R} 0 0 1 ${f(c[0], 3)} ${c[1] - R}`} {...stroke} />
          </svg>
        </div>
      </div>
      <div className="bdm-clip" style={at(c[0] - R - m, c[1] - R - m, R + m, s)}>
        <div className={`bdm-ring ${A(ids[1])}`} style={{ ...atq(0, 0, s, s), transform: "rotate(180deg)" }}>
          <svg className="bdm-svg" viewBox={vb} style={{ inset: 0, width: "100%", height: "100%" }}>
            <path d={`M${f(c[0], 3)} ${c[1] - R}A${R} ${R} 0 0 1 ${f(c[0], 3)} ${c[1] + R}`} {...stroke} />
          </svg>
        </div>
      </div>
    </>
  );
}

export function BrandingDesignMotion({ className, tagline, cta }: ServiceMotionProps) {
  const b = getBuild(tagline, cta);
  const { fs, groups, climax, label, cfs, ctaW }: Layout = b.lay;
  const A = (n: string) => `bdm-a ${b.ns}${n}`;
  const origin = (g: Group) => `${f((g.ox / g.w) * 100, 2)}% 80%`;
  const nLines = b.lay.nLines;
  const lines = Array.from({ length: nLines }, (_, l) => groups.map((g, i) => ({ g, i })).filter((x) => x.g.line === l));
  const CR = CTA_H / 2;
  const gx = (x: number) => f(x, 3);
  // construction guides (docked units)
  const H_LINES = [MB.y, AC[1], MB.y + MB.h];
  const G_LINES = [AC[1] - R / PHI, AC[1] + R / PHI];
  const V_LINES = [MB.x, MB.x + MB.w];
  const V_KEY = [CT[0], CB[0]];
  const chipX = CTA_X + ctaW + 10;
  const cardF: CSSProperties = {
    ...at(CARD_F.c[0] - CARD_F.w / 2, CARD_F.c[1] - CARD_F.h / 2, CARD_F.w, CARD_F.h),
    transform: `rotate(${CARD_F.a}deg)`,
  };

  return (
    <div className={`illu-motion bdm-root${className ? ` ${className}` : ""}`} data-motion-root="" aria-hidden="true" data-nosnippet="">
      <style dangerouslySetInnerHTML={{ __html: b.css }} />
      <ScrollPause />

      {/* off-screen, content-visibility skips the whole scene (no restyle at all);
          absolutely positioned, so its remembered size never feeds the layout */}
      <div className="bdm-cv">
        <div className={`bdm-L ${A("shake")}`}>
          {/* ── static back layer ── */}
          <i className="bdm-grid" />
          <i className="bdm-rail" />
          <i className="bdm-floor" />

          {/* ── the identity board (tilts as one plane in the hold) ── */}
          <div className={`bdm-board ${A("tilt")}`}>
            {/* the printed board (static art only): exists only above the printhead */}
            <div className={`bdm-clip ${A("bo")}`} style={at(-6, PW_Y0, 412, PW_Y1 - PW_Y0)}>
              <div className={`bdm-z ${A("bi")}`}>
                <div className="bdm-o0" style={{ left: cq(6), top: cq(-PW_Y0) }}>
                  {/* static art first (one paint pass under every animated layer:
                      cheap layerization), then everything that moves */}
                  {TILES.map((t) => (
                    <i key={`${t.x},${t.y}`} className="bdm-abs bdm-tile" style={atB(t)} />
                  ))}
                  <div
                    className="bdm-abs bdm-card bdm-cardB"
                    style={{
                      ...at(CARD_B.c[0] - CARD_B.w / 2, CARD_B.c[1] - CARD_B.h / 2, CARD_B.w, CARD_B.h),
                      transform: `rotate(${CARD_B.a}deg)`,
                    }}
                  >
                    <span className="bdm-abs bdm-mk" style={atq(CARD_B.w - 30, CARD_B.h - 26, 34, (34 * MB.h) / MB.w)}>
                      <MarkArt top="rgb(10 10 11 / .2)" bot="rgb(10 10 11 / .12)" dot="rgb(10 10 11 / .2)" />
                    </span>
                  </div>
                  <div className="bdm-abs bdm-card bdm-cardF" style={cardF}>
                    <i
                      className="bdm-sk"
                      style={{
                        ...atq(34, 9.5, 27, 3.4),
                        background: "rgb(242 243 238/.82)",
                      }}
                    />
                    <i
                      className="bdm-sk"
                      style={{
                        ...atq(34, 15.5, 18, 2.2),
                        background: "rgb(242 243 238/.3)",
                      }}
                    />
                    <i
                      className="bdm-sk"
                      style={{
                        ...atq(8, 31, 24, 1.8),
                        background: "rgb(242 243 238/.22)",
                      }}
                    />
                    <i
                      className="bdm-sk"
                      style={{
                        ...atq(8, 35.5, 32, 1.8),
                        background: "rgb(242 243 238/.16)",
                      }}
                    />
                    <i className="bdm-sk" style={{ ...atq(54, 33, 8, 3.2), background: "#c8f02e" }} />
                  </div>
                  <i className="bdm-abs bdm-phone" style={atB(PHONE)} />
                  <i className="bdm-abs bdm-wire" style={at(SIGN.x + 18, TF.y + 1, 0.8, SIGN.y - TF.y - 1)} />
                  <i className="bdm-abs bdm-wire" style={at(SIGN.x + SIGN.w - 18.8, TF.y + 1, 0.8, SIGN.y - TF.y - 1)} />
                  <i className="bdm-abs bdm-sign" style={atB(SIGN)} />
                </div>
              </div>
            </div>

            {/* palette */}
            {SWATCH.map((s, i) => (
              <div key={s.hex} className={`bdm-abs bdm-sw ${A(`sw${i}`)}`} style={at(SW_X(i), SW_Y, SW_W, SW_H + 10)}>
                <i className="bdm-swb" style={{ background: s.bg }} />
                <span className="bdm-swl">{s.hex}</span>
              </div>
            ))}

            {/* typography */}
            <span className={`bdm-aa ${A("aa")}`} style={{ left: P(AA.x), top: P(AA.y) }}>
              A<i>a</i>
            </span>
            <div className={`bdm-wt ${A("wt")}`}>
              {WT.map(([w, l], i) => (
                <div key={l} className="bdm-wr" style={{ top: cq(WT_Y[i] - WT_Y[0]) }}>
                  <b style={{ fontWeight: w }}>Aa</b>
                  <i>{l}</i>
                </div>
              ))}
            </div>

            {/* the business card is stamped with the mark (same rotated frame as the card) */}
            <div className="bdm-abs" style={cardF}>
              <span className={`bdm-abs bdm-mk ${A("ap0")}`} style={atq(CARD_MO[0], CARD_MO[1], CARD_MW, (CARD_MW * MB.h) / MB.w)}>
                <MarkArt />
              </span>
            </div>

            {/* the phone screen boots on the mark */}
            <div className={`bdm-abs bdm-scr ${A("ap1")}`} style={atB(SCREEN)}>
              <span className="bdm-abs bdm-mk" style={atq(PHONE_MC[0] - SCREEN.x - 9, PHONE_MC[1] - SCREEN.y - (9 * MB.h) / MB.w, 18, (18 * MB.h) / MB.w)}>
                <MarkArt />
              </span>
              <i
                className="bdm-sk"
                style={{
                  ...atq(5, 32.5, 19.6, 2.6),
                  background: "rgb(242 243 238/.75)",
                }}
              />
              <i
                className="bdm-sk"
                style={{
                  ...atq(8, 37.5, 13.6, 1.8),
                  background: "rgb(242 243 238/.28)",
                }}
              />
              <i
                className="bdm-sk"
                style={{
                  ...atq(4.6, 51, 20.4, 6.4),
                  background: "#c8f02e",
                  borderRadius: "1.6cqw",
                }}
              />
              <i className="bdm-abs bdm-notch" style={atq(SCREEN.w / 2 - 4.5, 1.8, 9, 2.4)} />
            </div>

            {/* the sign switches on */}
            <div className={`bdm-abs ${A("ap2")}`} style={at(TF.x, TF.y, TF.w, TF.h)}>
              <i className="bdm-abs bdm-halo" style={atq(6, 6, TF.w - 12, TF.h - 4)} />
              <i className="bdm-abs bdm-signl" style={atq(SIGN.x - TF.x, SIGN.y - TF.y, SIGN.w, SIGN.h)} />
              <span className="bdm-abs bdm-mk" style={atq(SIGN_MC[0] - TF.x - 13, SIGN_MC[1] - TF.y - (13 * MB.h) / MB.w, 26, (26 * MB.h) / MB.w)}>
                <MarkArt />
              </span>
              <i
                className="bdm-sk"
                style={{
                  ...atq(SIGN.x - TF.x + 40, SIGN.y - TF.y + 11, 54, 6.6),
                  background: "#f2f3ee",
                  borderRadius: "1cqw",
                }}
              />
              <i
                className="bdm-sk"
                style={{
                  ...atq(SIGN.x - TF.x + 40, SIGN.y - TF.y + 22, 34, 3.2),
                  background: "rgb(242 243 238/.45)",
                }}
              />
              <i
                className="bdm-sk"
                style={{
                  ...atq(SIGN.x - TF.x + 40, SIGN.y - TF.y + 28.5, 16, 1.8),
                  background: "#c8f02e",
                }}
              />
            </div>

            {/* ── kinetic headline (the tagline) ── */}
            <div className="bdm-title" style={fs < HL_FS0 ? { fontSize: cq(fs) } : undefined}>
              {lines.map((ln, l) => (
                <span key={l} className="bdm-ln">
                  {ln.map(({ g, i }, j) => (
                    <span
                      key={i}
                      className={`bdm-w ${A(`w${i}`)}`}
                      style={{
                        transformOrigin: origin(g),
                        ...(j ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null),
                      }}
                    >
                      <Tight s={g.text} />
                    </span>
                  ))}
                  {l === nLines - 1 && (
                    <>
                      <span
                        className={`bdm-w bdm-wL ${A("wL")}`}
                        style={{
                          transformOrigin: origin(climax),
                          ...(ln.length ? { marginLeft: `${f(SPACE_EM, 3)}em` } : null),
                        }}
                      >
                        <Tight s={climax.text} />
                        <span className={`bdm-hg ${A("hg")}`}>
                          <Tight s={climax.text} />
                        </span>
                      </span>
                      <i
                        className={`bdm-ul ${A("ul")}`}
                        style={{
                          left: cq(climax.x - HL_X),
                          width: cq(climax.w),
                        }}
                      />
                    </>
                  )}
                </span>
              ))}
            </div>

            {/* CTA: forged outline, white-hot pill, rising label */}
            <div className={`bdm-clip bdm-foc ${A("foo")}`} style={at(b.fo.x, b.fo.y, b.fo.w, b.fo.h)}>
              <div className={`bdm-z ${A("foi")}`}>
                <i
                  className="bdm-fo"
                  style={{
                    ...atq(FO_M, FO_M, b.fo.ow, CTA_H + SW_C),
                    borderRadius: `${cq(CR + SW_C / 2)} 0 0 ${cq(CR + SW_C / 2)}`,
                  }}
                />
              </div>
            </div>
            <div
              className={`bdm-cta ${A("cta")}`}
              style={{
                ...at(CTA_X, CTA_Y, ctaW, CTA_H),
                ...(cfs < CTA_FS0 ? { fontSize: cq(cfs) } : null),
              }}
            >
              <span className="bdm-ctal">
                <span className={`bdm-lbl ${A("lbl")}`}>
                  {label}
                  <svg className="bdm-ctaa" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h9.5M8.5 3.8 12.7 8l-4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>
            <i className={`bdm-abs bdm-ctah ${A("ctaH")}`} style={at(CTA_X, CTA_Y, ctaW, CTA_H)} />
            <div className={`bdm-chips ${A("chips")}`} style={{ left: P(chipX), top: P(CTA_Y + (CTA_H - 13.6) / 2) }}>
              {["SVG", "PNG", "PDF"].map((x) => (
                <span key={x} className="bdm-chip bdm-ex">
                  {x}
                </span>
              ))}
            </div>

            {/* ── tile A: the construction artboard (drawn big, then docked) ── */}
            <div className={`bdm-dock ${A("dk")}`}>
              <i className="bdm-abs bdm-tile bdm-tA" style={atB(TA)} />
              {/* the artboard's spec label (static: printed with the artboard) */}
              <span className="bdm-chip bdm-phi" style={{ left: P(TA.x + 7), top: P(TA.y + TA.h - 16) }}>
                φ 1.618
              </span>
              {/* the mark: each half is a disc inside a rotating half-plane window */}
              <div className="bdm-clip" style={at(CT[0] - R, CT[1] - R, 2 * R, R - GAP / 2)}>
                <div
                  className={`bdm-cw ${A("cwT")}`}
                  style={{
                    ...atq(-6, R, 2 * R + 12, R + 6),
                    transformOrigin: `${cq(R + 6)} 0`,
                    transform: "rotate(180deg)",
                  }}
                >
                  <i className="bdm-disc bdm-dT" style={atq(6, -R, 2 * R, 2 * R)} />
                </div>
              </div>
              <div className="bdm-clip" style={at(CB[0] - R, CB[1] + GAP / 2, 2 * R, R - GAP / 2)}>
                <div
                  className={`bdm-cw ${A("cwB")}`}
                  style={{
                    ...atq(-6, -R - 6 - GAP / 2, 2 * R + 12, R + 6),
                    transformOrigin: `${cq(R + 6)} ${cq(R + 6)}`,
                    transform: "rotate(180deg)",
                  }}
                >
                  <i className="bdm-disc bdm-dB" style={atq(6, 6, 2 * R, 2 * R)} />
                </div>
              </div>
              <span className={`bdm-abs bdm-mk bdm-mh ${A("mh")}`} style={at(MB.x, MB.y, MB.w, MB.h)}>
                <svg viewBox={`${f(MB.x, 3)} ${MB.y} ${f(MB.w, 3)} ${MB.h}`}>
                  <path d={HALF_T} fill="#fff" />
                  <path d={HALF_B} fill="#fff" />
                </svg>
              </span>
              <i className={`bdm-abs bdm-dot ${A("dot")}`} style={at(DOT[0] - RD, DOT[1] - RD, 2 * RD, 2 * RD)} />

              {/* construction grid, laid by the two scanners, and the traced circles */}
              <div className={`bdm-gd ${A("gd")}`}>
                <div className={`bdm-clip ${A("gho")}`} style={atB(GW)}>
                  <div className={`bdm-z ${A("ghi")}`}>
                    <svg className="bdm-svg" viewBox={`${GW.x} ${GW.y} ${GW.w} ${GW.h}`} style={atq(0, 0, GW.w, GW.h)} fill="none">
                      {H_LINES.map((y) => (
                        <path key={y} d={`M${TA.x} ${gx(y)}H${TA.x + TA.w}`} stroke={y === AC[1] ? "rgb(20 224 200 / .8)" : "rgb(242 243 238 / .34)"} strokeWidth=".55" />
                      ))}
                      {G_LINES.map((y) => (
                        <path key={y} d={`M${TA.x} ${gx(y)}H${TA.x + TA.w}`} stroke="rgb(200 240 46 / .7)" strokeWidth=".55" strokeDasharray="2 2" />
                      ))}
                      {[CT, CB].map((c) => (
                        <circle key={c[0]} cx={gx(c[0])} cy={c[1]} r={gx(R / PHI)} stroke="rgb(200 240 46 / .62)" strokeWidth=".55" strokeDasharray="2 2" />
                      ))}
                      <circle cx={gx(DOT[0])} cy={gx(DOT[1])} r={gx(RD * PHI)} stroke="rgb(242 243 238 / .45)" strokeWidth=".55" />
                    </svg>
                  </div>
                </div>
                <div className={`bdm-clip ${A("gvo")}`} style={atB(GW)}>
                  <div className={`bdm-z ${A("gvi")}`}>
                    <svg className="bdm-svg" viewBox={`${GW.x} ${GW.y} ${GW.w} ${GW.h}`} style={atq(0, 0, GW.w, GW.h)} fill="none">
                      <path
                        d={`M${TA.x} ${TA.y}L${TA.x + TA.w} ${TA.y + TA.h}M${TA.x + TA.w} ${TA.y}L${TA.x} ${TA.y + TA.h}`}
                        stroke="rgb(242 243 238 / .18)"
                        strokeWidth=".5"
                      />
                      {V_LINES.map((x) => (
                        <path key={x} d={`M${gx(x)} ${TA.y}V${TA.y + TA.h}`} stroke="rgb(242 243 238 / .34)" strokeWidth=".55" />
                      ))}
                      {V_KEY.map((x) => (
                        <path key={x} d={`M${gx(x)} ${TA.y}V${TA.y + TA.h}`} stroke="rgb(20 224 200 / .8)" strokeWidth=".55" />
                      ))}
                      <path d={`M${gx(AC[0])} ${TA.y}V${TA.y + TA.h}`} stroke="rgb(242 243 238 / .26)" strokeWidth=".5" strokeDasharray="1 2" />
                    </svg>
                  </div>
                </div>

                {/* the two circles of the mark, traced by the compass arms */}
                <TracedCircle c={CT} A={A} ids={["ctR", "ctL"]} />
                <TracedCircle c={CB} A={A} ids={["cbR", "cbL"]} />
              </div>
              {(
                [
                  ["armA", CT, "cyan"],
                  ["armB", CB, "lime"],
                ] as const
              ).map(([id, c, col]) => (
                <i key={id} className={`bdm-z bdm-c-${col}`} style={{ left: P(c[0]), top: P(c[1]) }}>
                  <i className={`bdm-arm bdm-c-${col} ${A(id)}`}>
                    <i className="bdm-armL" />
                    <i className="bdm-armT" />
                  </i>
                </i>
              ))}
            </div>

            <div className="bdm-glass" style={at(TA.x, TA.y, TF.x + TF.w - TA.x, TF.y + TF.h - TA.y)}>
              <i className={`bdm-sheen ${A("sheen")}`} />
            </div>
          </div>

          {/* ── front FX: printhead, rail heads, pools ── */}
          <div className="bdm-L">
            <div className={`bdm-scan ${A("scan")}`}>
              <i className="bdm-scanw" />
              <i className="bdm-scanl" />
              <i className="bdm-scanf" style={{ left: "8em" }} />
              <i className="bdm-scanf" style={{ left: "108em" }} />
            </div>
            {HEADS.map((h) => (
              <Fragment key={h.id}>
                <i className={`bdm-hb bdm-c-${h.c} ${A(`${h.id}b`)}`} />
                <div
                  className={`bdm-hd bdm-c-${h.c} ${A(`${h.id}p`)}`}
                  style={{
                    transform: `translate(${cq(h.home[0])},${cq(h.home[1])})`,
                  }}
                >
                  <i className="bdm-hc" />
                </div>
              </Fragment>
            ))}
            {b.pf.map((c, i) => (
              <i key={i} className={`bdm-pf bdm-c-${c || "lime"} ${A(`pf${i}`)}`} />
            ))}
            {b.ps.map((c, i) => (
              <i key={i} className={`bdm-ps bdm-c-${c || "lime"} ${A(`ps${i}`)}`}>
                <SparkArt />
              </i>
            ))}
          </div>

          <i className={`bdm-flash ${A("flash")}`} />
        </div>
      </div>
    </div>
  );
}
