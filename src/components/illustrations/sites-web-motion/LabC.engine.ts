/**
 * Tiny keyframe "motion engine" for SitesWebMotionC (variant C, "Laser Drones").
 *
 * Pure, deterministic helpers that turn a choreography (waypoints, follow
 * functions, firing windows) into CSS @keyframes, so the whole motion graphic
 * runs on the compositor/CSS engine with zero client JS. Everything is driven
 * by ONE master loop of T ms; every keyframe time is a percentage of T.
 *
 * Coordinates are SVG user units of a 400×400 viewBox (1 unit = 0.25cqw).
 */

export const T = 15000;

export type P = { x: number; y: number };

/** Number → compact CSS string (fixed decimals, trailing zeros dropped). */
export const fmt = (v: number, d = 2): string => {
  const k = 10 ** d;
  const r = Math.round(v * k) / k;
  return r === 0 ? "0" : String(r);
};

/** compact number for timing-function params: 2 decimals, no leading zero */
export const short = (v: number): string => fmt(v, 2).replace(/^(-?)0\./, "$1.");

/** ms → keyframe selector (percentage of T, 3 decimals = 0.15 ms resolution). */
export const pc = (t: number): string => `${fmt((t / T) * 100, 3)}%`;

/** Wrap any (possibly negative / > T) time into [0, T). */
export const wrap = (t: number): number => ((t % T) + T) % T;

/** One keyframe: time (ms), declarations, optional timing function for the
 *  segment that STARTS at this stop. */
export type Stop = { t: number; d: string; e?: string };

export const EASE = {
  out: "cubic-bezier(.22,1,.36,1)",
  outSoft: "cubic-bezier(.33,1,.68,1)",
  in: "cubic-bezier(.55,0,.75,.2)",
  inOut: "cubic-bezier(.65,0,.35,1)",
  inOutSoft: "cubic-bezier(.45,0,.55,1)",
  back: "cubic-bezier(.34,1.56,.64,1)",
  step: "steps(1,end)",
} as const;

/**
 * Builds one @keyframes block. Stops are clamped into [0, T] and sorted; a 0%
 * stop (first value) and a 100% stop (last value) are added when missing —
 * callers make the first and last states equal so the loop seam is invisible.
 */
export function keyframes(name: string, stops: Stop[]): string {
  const s = stops
    .map((x) => ({ ...x, t: Math.min(T, Math.max(0, x.t)) }))
    .sort((a, b) => a.t - b.t);
  if (!s.length) return "";
  if (s[0].t > 0) s.unshift({ t: 0, d: s[0].d });
  if (s[s.length - 1].t < T) s.push({ t: T, d: s[s.length - 1].d });
  const out: string[] = [];
  let last = -1;
  s.forEach((x, i) => {
    const final = i === s.length - 1;
    let v = final ? 100 : i === 0 ? 0 : Math.round((x.t / T) * 10000) / 100;
    // stops closer than the 0.01% grid are nudged forward (never merged)
    if (v <= last) v = Math.round((last + 0.01) * 100) / 100;
    if (!final && v >= 100) return;
    last = v;
    out.push(`${v}%{${x.d}${x.e ? `;animation-timing-function:${x.e}` : ""}}`);
  });
  return `@keyframes ${name}{${out.join("")}}`;
}

/* ------------------------------------------------------------------ */
/* Ramer–Douglas–Peucker on time-parameterized samples                 */
/* ------------------------------------------------------------------ */

export type Sample = { t: number; v: number[] };

/**
 * Keeps the minimal subset of samples such that linear interpolation (in time)
 * between kept samples stays within `err(sample, interpolated) <= 1`.
 */
export function simplify(
  samples: Sample[],
  err: (s: Sample, interp: number[]) => number
): Sample[] {
  const n = samples.length;
  if (n <= 2) return samples.slice();
  const keep = new Uint8Array(n);
  keep[0] = 1;
  keep[n - 1] = 1;
  const stack: [number, number][] = [[0, n - 1]];
  while (stack.length) {
    const [a, b] = stack.pop()!;
    if (b - a < 2) continue;
    const A = samples[a];
    const B = samples[b];
    let worst = -1;
    let wi = -1;
    for (let i = a + 1; i < b; i++) {
      const s = samples[i];
      const u = (s.t - A.t) / (B.t - A.t);
      const iv = A.v.map((av, k) => av + (B.v[k] - av) * u);
      const e = err(s, iv);
      if (e > worst) {
        worst = e;
        wi = i;
      }
    }
    if (worst > 1) {
      keep[wi] = 1;
      stack.push([a, wi], [wi, b]);
    }
  }
  return samples.filter((_, i) => keep[i]);
}

/* ------------------------------------------------------------------ */
/* Drone flight paths                                                  */
/* ------------------------------------------------------------------ */

/** Path keys (times may be negative or > T; the path is cyclic over T). */
export type Key =
  | { at: number; p: P; v?: P } // pass through p (velocity auto = Catmull-Rom)
  | { hold: [number, number]; p: P } // hover
  | { fn: [number, number]; f: (t: number) => P }; // follow a function

type HSeg = { k: "h"; t0: number; t1: number; p0: P; p1: P; m0: P; m1: P };
type FSeg = { k: "f"; t0: number; t1: number; f: (t: number) => P };
export type Seg = HSeg | FSeg;

const hermite = (s: HSeg, t: number): P => {
  const D = s.t1 - s.t0;
  const u = D > 0 ? (t - s.t0) / D : 0;
  const u2 = u * u;
  const u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;
  return {
    x: h00 * s.p0.x + h10 * D * s.m0.x + h01 * s.p1.x + h11 * D * s.m1.x,
    y: h00 * s.p0.y + h10 * D * s.m0.y + h01 * s.p1.y + h11 * D * s.m1.y,
  };
};

const hermiteVel = (s: HSeg, t: number): P => {
  const D = s.t1 - s.t0;
  const u = D > 0 ? (t - s.t0) / D : 0;
  const u2 = u * u;
  const d00 = (6 * u2 - 6 * u) / D;
  const d10 = 3 * u2 - 4 * u + 1;
  const d01 = (-6 * u2 + 6 * u) / D;
  const d11 = 3 * u2 - 2 * u;
  return {
    x: d00 * s.p0.x + d10 * s.m0.x + d01 * s.p1.x + d11 * s.m1.x,
    y: d00 * s.p0.y + d10 * s.m0.y + d01 * s.p1.y + d11 * s.m1.y,
  };
};

const deriv = (f: (t: number) => P, t: number): P => {
  const a = f(t - 0.5);
  const b = f(t + 0.5);
  return { x: b.x - a.x, y: b.y - a.y };
};

export class Path {
  readonly segs: Seg[];
  readonly S: number;
  constructor(segs: Seg[], S: number) {
    this.segs = segs;
    this.S = S;
  }
  private find(t: number): { s: Seg; t: number } {
    const tt = this.S + ((((t - this.S) % T) + T) % T);
    for (const s of this.segs) if (tt >= s.t0 && tt <= s.t1) return { s, t: tt };
    return { s: this.segs[this.segs.length - 1], t: tt };
  }
  pos(t: number): P {
    const { s, t: tt } = this.find(t);
    return s.k === "h" ? hermite(s, tt) : s.f(tt);
  }
  /** velocity in units/ms */
  vel(t: number): P {
    const { s, t: tt } = this.find(t);
    return s.k === "h" ? hermiteVel(s, tt) : deriv(s.f, tt);
  }
}

type Item = { t0: number; t1: number; p0: P; p1: P; v0?: P; v1?: P; seg?: Seg; segs?: Seg[] };

/** One-sided velocity inside [a, b] (follow functions clamp at their ends). */
const velIn = (f: (t: number) => P, t: number, a: number, b: number): P => {
  const lo = Math.max(a, t - 0.5);
  const hi = Math.min(b, t + 0.5);
  const p = f(lo);
  const q = f(hi);
  const d = hi - lo || 1;
  return { x: (q.x - p.x) / d, y: (q.y - p.y) / d };
};

/** Approximates a follow function by C1 Hermite pieces (max error `tol` units). */
function fnToHermite(f: (t: number) => P, a: number, b: number, tol = 1.4): HSeg[] {
  const out: HSeg[] = [];
  const rec = (t0: number, t1: number, depth: number) => {
    const seg: HSeg = { k: "h", t0, t1, p0: f(t0), p1: f(t1), m0: velIn(f, t0, a, b), m1: velIn(f, t1, a, b) };
    let err = 0;
    for (let i = 1; i < 8; i++) {
      const t = t0 + ((t1 - t0) * i) / 8;
      const h = hermite(seg, t);
      const g = f(t);
      err = Math.max(err, Math.hypot(h.x - g.x, h.y - g.y));
    }
    if (err <= tol || depth > 9 || t1 - t0 < 16) out.push(seg);
    else {
      const tm = (t0 + t1) / 2;
      rec(t0, tm, depth + 1);
      rec(tm, t1, depth + 1);
    }
  };
  rec(a, b, 0);
  // greedy merge of neighbours that one cubic can still represent
  const errOf = (seg: HSeg) => {
    let e = 0;
    for (let i = 1; i < 12; i++) {
      const t = seg.t0 + ((seg.t1 - seg.t0) * i) / 12;
      const h = hermite(seg, t);
      const g = f(t);
      e = Math.max(e, Math.hypot(h.x - g.x, h.y - g.y));
    }
    return e;
  };
  const merged: HSeg[] = [];
  for (const seg of out) {
    const prev = merged[merged.length - 1];
    if (prev) {
      const cand: HSeg = { k: "h", t0: prev.t0, t1: seg.t1, p0: prev.p0, p1: seg.p1, m0: prev.m0, m1: seg.m1 };
      if (errOf(cand) <= tol) {
        merged[merged.length - 1] = cand;
        continue;
      }
    }
    merged.push(seg);
  }
  return merged;
}

export function buildPath(keys: Key[], tension = 1): Path {
  const items: Item[] = keys
    .map((k): Item => {
      if ("at" in k) return { t0: k.at, t1: k.at, p0: k.p, p1: k.p, v0: k.v, v1: k.v };
      if ("hold" in k) {
        const Z = { x: 0, y: 0 };
        return {
          t0: k.hold[0],
          t1: k.hold[1],
          p0: k.p,
          p1: k.p,
          v0: Z,
          v1: Z,
          seg: { k: "h", t0: k.hold[0], t1: k.hold[1], p0: k.p, p1: k.p, m0: Z, m1: Z },
        };
      }
      const [a, b] = k.fn;
      const hs = fnToHermite(k.f, a, b);
      return {
        t0: a,
        t1: b,
        p0: k.f(a),
        p1: k.f(b),
        v0: hs[0].m0,
        v1: hs[hs.length - 1].m1,
        segs: hs,
      };
    })
    .sort((a, b) => a.t0 - b.t0);
  const n = items.length;
  const S = items[0].t0;
  for (let i = 0; i < n; i++) {
    const it = items[i];
    if (it.v0) continue;
    const prev = items[(i - 1 + n) % n];
    const next = items[(i + 1) % n];
    const tp = i === 0 ? prev.t1 - T : prev.t1;
    const tn = i === n - 1 ? next.t0 + T : next.t0;
    const v = {
      x: ((next.p0.x - prev.p1.x) / (tn - tp)) * tension,
      y: ((next.p0.y - prev.p1.y) / (tn - tp)) * tension,
    };
    it.v0 = v;
    it.v1 = v;
  }
  const segs: Seg[] = [];
  for (let i = 0; i < n; i++) {
    const it = items[i];
    if (it.seg) segs.push(it.seg);
    if (it.segs) segs.push(...it.segs);
    const next = items[(i + 1) % n];
    const tn = i === n - 1 ? next.t0 + T : next.t0;
    if (tn > it.t1 + 1e-6)
      segs.push({ k: "h", t0: it.t1, t1: tn, p0: it.p1, p1: next.p0, m0: it.v1!, m1: next.v0! });
  }
  return new Path(segs, S);
}

/** Splits a Hermite segment at time t (exact: sub-segments stay cubic). */
const splitH = (s: HSeg, t: number): [HSeg, HSeg] => {
  const p = hermite(s, t);
  const v = hermiteVel(s, t);
  return [
    { k: "h", t0: s.t0, t1: t, p0: s.p0, p1: p, m0: s.m0, m1: v },
    { k: "h", t0: t, t1: s.t1, p0: p, p1: s.p1, m0: v, m1: s.m1 },
  ];
};

/** Segments of a path re-cut at the loop seam and mapped into [0, T]. */
function seamSegments(path: Path): Seg[] {
  const out: Seg[] = [];
  for (const s of path.segs) {
    const k0 = Math.floor(s.t0 / T);
    const k1 = Math.floor((s.t1 - 1e-6) / T);
    const pieces: Seg[] = [];
    if (k0 !== k1) {
      const cut = k1 * T;
      if (s.k === "h") pieces.push(...splitH(s, cut));
      else pieces.push({ ...s, t1: cut }, { ...s, t0: cut });
    } else pieces.push(s);
    for (const pce of pieces) {
      const k = Math.floor((pce.t0 + 1e-6) / T);
      const off = -k * T;
      if (pce.k === "h") out.push({ ...pce, t0: pce.t0 + off, t1: pce.t1 + off });
      else {
        const f = pce.f;
        out.push({ k: "f", t0: pce.t0 + off, t1: pce.t1 + off, f: (t: number) => f(t - off) });
      }
    }
  }
  return out.sort((a, b) => a.t0 - b.t0);
}

const B13 = ".33";
const B23 = ".67";

/**
 * Keyframes for ONE axis of a path. Free-flight (Hermite) segments are emitted
 * EXACTLY as one keyframe each: with control-point x at 1/3 and 2/3 a CSS
 * cubic-bezier is linear in time, so its y is the segment's cubic polynomial.
 * Follow segments are sampled and simplified (linear between kept samples).
 */
export function axisStops(path: Path, axis: "x" | "y", fn: (v: number) => string, tol = 0.22): Stop[] {
  const raw: { t: number; v: number; e?: string }[] = [];
  const push = (t: number, v: number, e?: string) => raw.push({ t, v, e });
  const val = (p: P) => (axis === "x" ? p.x : p.y);
  const emitH = (s: HSeg, depth: number) => {
    const c0 = val(s.p0);
    const c1 = val(s.p1);
    const D = s.t1 - s.t0;
    const P1 = c0 + (val(s.m0) * D) / 3;
    const P2 = c1 - (val(s.m1) * D) / 3;
    const dc = c1 - c0;
    const flat = Math.abs(dc) < 1e-3 && Math.abs(P1 - c0) < 1e-3 && Math.abs(P2 - c0) < 1e-3;
    if (flat) {
      push(s.t0, c0);
      return;
    }
    const y1 = Math.abs(dc) > 1e-9 ? (P1 - c0) / dc : Infinity;
    const y2 = Math.abs(dc) > 1e-9 ? (P2 - c0) / dc : Infinity;
    if ((Math.abs(dc) < 0.05 || Math.abs(y1) > 14 || Math.abs(y2) > 14) && depth < 5 && D > 8) {
      const [a, b] = splitH(s, s.t0 + D / 2);
      emitH(a, depth + 1);
      emitH(b, depth + 1);
      return;
    }
    if (!Number.isFinite(y1) || !Number.isFinite(y2)) {
      push(s.t0, c0);
      return;
    }
    if (Math.abs(y1 - 1 / 3) < 0.004 && Math.abs(y2 - 2 / 3) < 0.004) push(s.t0, c0);
    else push(s.t0, c0, `cubic-bezier(${B13},${short(y1)},${B23},${short(y2)})`);
  };
  for (const s of seamSegments(path)) {
    if (s.k === "h") emitH(s, 0);
    else {
      const smp: Sample[] = [];
      const step = 6;
      for (let t = s.t0; t < s.t1; t += step) smp.push({ t, v: [val(s.f(t))] });
      smp.push({ t: s.t1, v: [val(s.f(s.t1))] });
      const kept = simplify(smp, (a, iv) => Math.abs(a.v[0] - iv[0]) / tol);
      kept.pop(); // the end belongs to the next segment
      for (const k of kept) push(k.t, k.v[0]);
    }
  }
  push(T, val(path.pos(T)));
  // drop interior stops of linear runs that lie on the line through their neighbours
  const out: typeof raw = [];
  for (let i = 0; i < raw.length; i++) {
    const cur = raw[i];
    const prev = out[out.length - 1];
    const next = raw[i + 1];
    if (prev && next && !prev.e && !cur.e && i < raw.length - 1) {
      const u = (cur.t - prev.t) / (next.t - prev.t || 1);
      if (Math.abs(prev.v + (next.v - prev.v) * u - cur.v) < 0.06) continue;
    }
    out.push(cur);
  }
  return out.map((x) => ({ t: x.t, d: fn(x.v), e: x.e }));
}

/* ------------------------------------------------------------------ */
/* Geometry: polylines with circular arcs (lengths + point at length)  */
/* ------------------------------------------------------------------ */

type GL = { kind: "L"; a: P; b: P; len: number };
type GA = { kind: "A"; c: P; r: number; a0: number; a1: number; len: number };
type GSeg = GL | GA;

const deg = Math.PI / 180;

export class Geo {
  readonly segs: GSeg[] = [];
  private cur: P;
  constructor(start: P) {
    this.cur = start;
  }
  get start(): P {
    const s = this.segs[0];
    return s.kind === "L" ? s.a : { x: s.c.x + s.r * Math.cos(s.a0), y: s.c.y + s.r * Math.sin(s.a0) };
  }
  line(x: number, y: number): this {
    const b = { x, y };
    this.segs.push({ kind: "L", a: this.cur, b, len: Math.hypot(b.x - this.cur.x, b.y - this.cur.y) });
    this.cur = b;
    return this;
  }
  /** arc around centre c (radius r) from angle a0 to a1 (degrees, y-down; increasing = clockwise) */
  arc(cx: number, cy: number, r: number, a0d: number, a1d: number): this {
    const a0 = a0d * deg;
    const a1 = a1d * deg;
    this.segs.push({ kind: "A", c: { x: cx, y: cy }, r, a0, a1, len: Math.abs(a1 - a0) * r });
    this.cur = { x: cx + r * Math.cos(a1), y: cy + r * Math.sin(a1) };
    return this;
  }
  get len(): number {
    return this.segs.reduce((a, s) => a + s.len, 0);
  }
  /** point at arc length s (clamped) */
  at(s: number): P {
    let rest = Math.max(0, Math.min(this.len, s));
    for (const g of this.segs) {
      if (rest <= g.len || g === this.segs[this.segs.length - 1]) {
        const u = g.len > 0 ? Math.min(1, rest / g.len) : 0;
        if (g.kind === "L") return { x: g.a.x + (g.b.x - g.a.x) * u, y: g.a.y + (g.b.y - g.a.y) * u };
        const a = g.a0 + (g.a1 - g.a0) * u;
        return { x: g.c.x + g.r * Math.cos(a), y: g.c.y + g.r * Math.sin(a) };
      }
      rest -= g.len;
    }
    return this.cur;
  }
  /** arc-length positions of segment boundaries (for exact linear keyframes) */
  breaks(): number[] {
    const out = [0];
    let acc = 0;
    for (const g of this.segs) {
      acc += g.len;
      out.push(acc);
    }
    return out;
  }
  d(): string {
    const p0 = this.start;
    let d = `M${fmt(p0.x)} ${fmt(p0.y)}`;
    for (const g of this.segs) {
      if (g.kind === "L") d += `L${fmt(g.b.x)} ${fmt(g.b.y)}`;
      else {
        const e = { x: g.c.x + g.r * Math.cos(g.a1), y: g.c.y + g.r * Math.sin(g.a1) };
        const large = Math.abs(g.a1 - g.a0) > Math.PI ? 1 : 0;
        const sweep = g.a1 > g.a0 ? 1 : 0;
        d += `A${fmt(g.r)} ${fmt(g.r)} 0 ${large} ${sweep} ${fmt(e.x)} ${fmt(e.y)}`;
      }
    }
    return d;
  }
}

/** Rounded rectangle, clockwise, starting right after the top-left corner. */
export const roundRect = (x0: number, y0: number, x1: number, y1: number, r: number): Geo =>
  new Geo({ x: x0 + r, y: y0 })
    .line(x1 - r, y0)
    .arc(x1 - r, y0 + r, r, 270, 360)
    .line(x1, y1 - r)
    .arc(x1 - r, y1 - r, r, 0, 90)
    .line(x0 + r, y1)
    .arc(x0 + r, y1 - r, r, 90, 180)
    .line(x0, y0 + r)
    .arc(x0 + r, y0 + r, r, 180, 270);

/** The exact CSS cubic-bezier() easing, evaluated in JS (so a moving laser tip
 *  computed here stays glued to a stroke drawn by the same CSS easing). */
export const cssEase = (x1: number, y1: number, x2: number, y2: number) => {
  const css = `cubic-bezier(${x1},${y1},${x2},${y2})`.replace(/(^|[(,])0\./g, "$1.");
  const f = (u: number): number => {
    if (u <= 0) return 0;
    if (u >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let s = u;
    for (let i = 0; i < 32; i++) {
      const x = 3 * (1 - s) * (1 - s) * s * x1 + 3 * (1 - s) * s * s * x2 + s * s * s;
      if (x < u) lo = s;
      else hi = s;
      s = (lo + hi) / 2;
    }
    return 3 * (1 - s) * (1 - s) * s * y1 + 3 * (1 - s) * s * s * y2 + s * s * s;
  };
  return { css, f };
};

export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const clamp01 = (u: number) => Math.max(0, Math.min(1, u));
export const smooth = (u: number) => {
  const x = clamp01(u);
  return x * x * (3 - 2 * x);
};
