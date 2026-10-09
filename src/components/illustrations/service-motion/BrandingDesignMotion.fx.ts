import { anim, ease, f, IO, kf, OUT, type Frame, type Key, type PoolEvent, type Stop } from "../sites-web-motion/anim";

/**
 * Geometry, sprite formats and the rail-head laser rig of the branding scene
 * (BrandingDesignMotion.tsx). Same family as the sites-web rig
 * (sites-web-motion/SitesWebMotion.tsx), plus one shot kind: a SWEEP, where the
 * head glides along its rail while firing a beam of fixed angle and length
 * (the construction-grid scanners). Units: the scene viewBox, 400 = 100cqw.
 */

export type Pt = [number, number];

export const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
export const plen = (p: Pt[]) => p.reduce((s, q, i) => (i ? s + dist(p[i - 1], q) : 0), 0);
export const lerp = (a: Pt, b: Pt, u: number): Pt => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
export const angle = (a: Pt, b: Pt) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
/** point at distance d along a polyline */
export function pat(p: Pt[], d: number): Pt {
  for (let i = 1; i < p.length; i++) {
    const l = dist(p[i - 1], p[i]);
    if (d <= l || i === p.length - 1) {
      const u = l ? clamp(d / l, 0, 1) : 0;
      return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * u, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * u];
    }
    d -= l;
  }
  return p[p.length - 1];
}
/** n points of a circular arc (a0 excluded, a1 included), degrees */
export const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 3): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * (i + 1)) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });
/** point at angle a (deg) on the circle (c, r) */
export const onCircle = (c: Pt, r: number, a: number): Pt => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] + r * Math.sin((a * Math.PI) / 180)];
/** rotate p about c by a degrees */
export function rot(p: Pt, c: Pt, a: number): Pt {
  const r = (a * Math.PI) / 180;
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(r) - dy * Math.sin(r), c[1] + dx * Math.sin(r) + dy * Math.cos(r)];
}
/** inverse of a monotone easing on [0, 1] */
export function inv(e: (u: number) => number, v: number) {
  let a = 0;
  let b = 1;
  for (let i = 0; i < 40; i++) {
    const m = (a + b) / 2;
    if (e(m) < v) a = m;
    else b = m;
  }
  return (a + b) / 2;
}
/** the CSS easing `e` as a JS function */
export const js = (e: string) => (u: number) => ease(e, u);

/** viewBox units → % of the (square) root */
export const P = (u: number) => `${f(u / 4, 3)}%`;
/** viewBox units → cqw */
export const cq = (u: number) => `${f(u / 4, 3)}cqw`;
/** translate() of a point in units, 0.1cqw precision */
export const tr2 = (x: number, y: number) => `translate(${f(x / 4, 1)}cqw,${f(y / 4, 1)}cqw)`;

/** linear keys of fn over [t0, t1] every `step` ms (anim() simplifies them) */
export function sampled(t0: number, t1: number, fn: (t: number) => number, step = 16): Key[] {
  const n = Math.max(2, Math.ceil((t1 - t0) / step));
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = t0 + ((t1 - t0) * i) / n;
    return [t, fn(t)] as Key;
  });
}

/* ───────────────────────────── pooled sprites ───────────────────────────── */

/* values: F [x, y, sx, sy, o] · S [x, y, rot, s, o] */
export const fmtF = ([x, y, sx, sy, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} scale(${f(sx)},${f(sy)})`;
export const fmtS = ([x, y, r, s, o]: number[]) => `opacity:${f(o)};transform:${tr2(x, y)} rotate(${f(r, 0)}deg) scale(${f(s)})`;
/** flare: blooms to `peak` (× the 14cqw sprite) and fades over `life` */
export const flareEv = (p: Pt, t: number, peak: number, life: number, pri: number, tag: string): PoolEvent => ({
  pri,
  tag,
  fr: [
    [t - 22, [p[0], p[1], 0.3, 0.3, 0], OUT],
    [t, [p[0], p[1], peak, peak, 1], OUT],
    [t + life, [p[0], p[1], peak * 0.45, peak * 0.45, 0]],
  ],
});
/** a flare riding a moving point (sampled every 30 ms) */
export function rideEv(at: (t: number) => Pt, a: number, b: number, s: number, pri: number, tag: string, fade = 160): PoolEvent {
  const p0 = at(a);
  const fr: Frame[] = [[a - 30, [p0[0], p0[1], s * 0.4, s * 0.4, 0], OUT]];
  for (let t = a, n = Math.max(1, Math.ceil((b - a) / 30)), i = 0; i <= n; i++, t = a + ((b - a) * i) / n) {
    const p = at(t);
    fr.push([t, [p[0], p[1], s, s, 1]]);
  }
  const z = at(b);
  fr[fr.length - 1][2] = OUT;
  fr.push([b + fade, [z[0], z[1], s * 0.45, s * 0.45, 0]]);
  return { pri, tag, fr };
}
/** spark burst: a fan of streaks (opening up at rot 0) flies out, falls, cools */
export const sparkEv = (p: Pt, t: number, rot: number, size: number, life: number, pri: number, tag = "lime"): PoolEvent => ({
  pri,
  tag,
  fr: [
    [t - 2, [p[0], p[1], rot, 0.25 * size, 0], OUT],
    [t + 18, [p[0], p[1], rot, 0.55 * size, 1], OUT],
    [t + life * 0.45, [p[0], p[1] + 4 * size, rot, size, 0.85]],
    [t + life, [p[0], p[1] + 14 * size, rot, 1.12 * size, 0]],
  ],
});

/** spark sprite art: [angle°, inner radius, outer radius, half-width] streaks + embers */
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
export const SPARK_TAILS = STREAKS.map(([a, r0, r1, w]) =>
  rotPoly(a, [
    [r0, 0],
    [r1 - 8, -w],
    [r1, 0],
    [r1 - 8, w],
  ]),
).join("");
export const SPARK_HEADS = STREAKS.map(([a, , r1, w]) =>
  rotPoly(a, [
    [r1 - 10, 0],
    [r1 - 3, -w / 2],
    [r1, 0],
    [r1 - 3, w / 2],
  ]),
).join("");
export const SPARK_EMBERS = EMBERS.map(([a, r, s]) => {
  const x = r * Math.cos((a * Math.PI) / 180);
  const y = r * Math.sin((a * Math.PI) / 180);
  return `M${f(x - s, 1)} ${f(y, 1)}a${s} ${s} 0 1 0 ${f(2 * s, 1)} 0a${s} ${s} 0 1 0 ${f(-2 * s, 1)} 0`;
}).join("");

/* ───────────────────────────── rail heads ───────────────────────────── */

/** a glide along the head's rail: [t0, t1, to, easing (IO)] */
export type Glide = [t0: number, t1: number, to: Pt, ease?: string];
export type Head = { id: string; c: string; home: Pt; plan: Glide[] };

/** where head h is at time t (exact CSS easing) */
export function headAt(h: Head, t: number): Pt {
  let p = h.home;
  for (const [t0, t1, to, e] of h.plan) {
    if (t >= t1) p = to;
    else if (t > t0) return lerp(p, to, ease(e ?? IO, (t - t0) / (t1 - t0)));
    else break;
  }
  return p;
}

export type Shot =
  /** charge → the beam shoots out, lands on `to` at `land`, burns, fades */
  | { k: "hit"; land: number; to: Pt; travel: number }
  /** the beam locks onto a moving point over [a, b] */
  | { k: "track"; a: number; b: number; at: (t: number) => Pt; travel: number }
  /** the head glides over [a, b] (one IO glide of its plan) firing a beam of
   *  fixed angle g and length len: a scanner */
  | { k: "sweep"; a: number; b: number; g: number; len: number };
const GROW_MS = 80;
const shotStart = (s: Shot) => (s.k === "hit" ? s.land - s.travel : s.k === "track" ? s.a - s.travel : s.a - GROW_MS);
const shotEnd = (s: Shot) => (s.k === "hit" ? s.land + 167 : s.k === "track" ? s.b + 152 : s.b + 162);

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
 * charges: translate + scale) and its beam (translate to the head, rotate ·
 * scaleX, fades out at full length once its energy is delivered).
 */
export function headKF(h: Head, list: Shot[]) {
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
  let last = -1;
  for (const s of sorted) {
    const t0 = shotStart(s);
    if (t0 < last + 8) throw new Error(`bdm: head ${h.id} fires again at ${t0} ms before its beam is out`);
    last = shotEnd(s);
    const o = headAt(h, t0);
    const push = (t: number, p: Pt, g: number, sx: number, op = 1, e?: string) => fr.push([t, [p[0], p[1], g, sx, op], e]);
    if (s.k === "sweep") {
      const gl = h.plan.find(([a, b]) => a === s.a && b === s.b);
      if (!gl || (gl[3] && gl[3] !== IO)) throw new Error(`bdm: head ${h.id} sweep ${s.a}–${s.b} needs its own IO glide`);
      const z = headAt(h, s.b);
      if (dist(headAt(h, s.b + 162), z) > 0.01) throw new Error(`bdm: head ${h.id} moves after its sweep`);
      const g = un(s.g);
      const L = s.len / 400;
      push(t0 - 4, o, g, 0);
      push(t0, o, g, 0, 1, GROW);
      push(s.a, o, g, L, 1, IO);
      push(s.b, z, g, L);
      push(s.b + 40, z, g, L, 1, TAIL);
      push(s.b + 160, z, g, L, 0);
      push(s.b + 162, z, g, 0, 0);
      fires.push([t0, s.b]);
      continue;
    }
    if (dist(o, headAt(h, shotEnd(s))) > 0.01) throw new Error(`bdm: head ${h.id} moves while firing at ${t0} ms`);
    if (s.k === "hit") {
      const g = un(angle(o, s.to));
      const len = dist(o, s.to) / 400;
      push(t0 - 4, o, g, 0);
      push(t0, o, g, 0, 1, GROW);
      push(s.land, o, g, len);
      push(s.land + 45, o, g, len, 1, TAIL);
      push(s.land + 165, o, g, len, 0);
      push(s.land + 167, o, g, 0, 0);
      fires.push([t0, t0]);
    } else {
      const ss: PS[] = [];
      for (let i = 0, n = Math.ceil((s.b - s.a) / 8); i <= n; i++) {
        const t = s.a + ((s.b - s.a) * i) / n;
        const p = s.at(t);
        ss.push({ t, g: un(angle(o, p)), r: dist(o, p), p });
      }
      push(t0 - 4, o, ss[0].g, 0);
      push(t0, o, ss[0].g, 0, 1, GROW);
      for (const q of rdpPolar(o, ss, 0.9)) push(q.t, o, q.g, q.r / 400);
      const z = ss[ss.length - 1];
      push(s.b + 20, o, z.g, z.r / 400, 1, TAIL);
      push(s.b + 150, o, z.g, z.r / 400, 0);
      push(s.b + 152, o, z.g, 0, 0);
      fires.push([t0, s.b]);
    }
  }
  kf(
    `${h.id}b`,
    fr.map(([t, [x, y, g, sx, op], e]): Stop => [t, `opacity:${f(op)};transform:${tr2(x, y)} rotate(${f(g, 1)}deg) scaleX(${f(sx, 3)})`, e]),
  );
  // body: glides (translate) + charge swell before each shot
  const xs: Key[] = [[0, h.home[0] / 4]];
  const ys: Key[] = [[0, h.home[1] / 4]];
  let p = h.home;
  for (const [t0, t1, to, e] of h.plan) {
    xs.push([t0, p[0] / 4, e ?? IO], [t1, to[0] / 4]);
    ys.push([t0, p[1] / 4, e ?? IO], [t1, to[1] / 4]);
    p = to;
  }
  if (dist(p, h.home) > 0.01) throw new Error(`bdm: head ${h.id} does not end at home`);
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
