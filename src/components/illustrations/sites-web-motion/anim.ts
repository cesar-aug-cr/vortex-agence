/**
 * Keyframe toolkit of the laser scene (SitesWebMotion.tsx). It runs on the server, once per
 * localized string set, and outputs plain CSS @keyframes.
 *
 *  kf()     one @keyframes from declaration stops (one easing per stop).
 *  anim()   one @keyframes from independent numeric tracks — opacity and the
 *           arguments of an ordered transform list — each with its own easings.
 *           Tracks are merged exactly (cubic-bezier slicing); only where two
 *           transform tracks move at once with different easings is the overlap
 *           sampled (linear keys, simplified to a tolerance).
 *  frames() one @keyframes from full frames (every value at every stop).
 *  pool()   a few sprite elements play many one-shot events (flares, spark
 *           bursts, weld tips, beam legs, comets) at different places and times:
 *           each instance jumps, invisible, from one event to the next. That is
 *           one running animation per instance instead of one per event — the
 *           per-frame restyle cost of CSS animations scales with their count.
 *
 * Every generated name is prefixed with a namespace hashed from the strings
 * (two instances with different copy can share a page); a name defined twice
 * throws.
 */

export const T = 14000;

/* ───────────────────────────── numbers ───────────────────────────── */

/** compact CSS number (no leading zero, no "-0") */
export const f = (v: number, d = 2): string => {
  const k = 10 ** d;
  const r = Math.round(v * k) / k;
  return String(r === 0 ? 0 : r).replace(/^(-?)0\./, "$1.");
};
/** keyframe offset of a time (ms), 0.01 % resolution (1.4 ms) */
const off = (t: number) => Math.round((Math.min(T, Math.max(0, t)) / T) * 10000);
const offStr = (o: number) => `${f(o / 100, 2)}%`;

/** FNV-1a, base 36 (5 chars) */
export function hash(s: string): string {
  let h = 2166136261;
  for (const c of s) {
    h ^= c.codePointAt(0) ?? 0;
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36).padStart(5, "0").slice(-5);
}

/* ───────────────────────────── easing math ───────────────────────────── */

export const OUT = "cubic-bezier(.16,1,.3,1)";
export const IN = "cubic-bezier(.6,0,.9,.45)";
export const IO = "cubic-bezier(.65,0,.35,1)";
export const IOS = "cubic-bezier(.45,0,.55,1)";
export const EO = "cubic-bezier(.2,.85,.3,1)";
export const BACK = "cubic-bezier(.3,1.65,.55,1)";
export const BACK2 = "cubic-bezier(.34,1.35,.64,1)";
export const COOL = "cubic-bezier(.3,0,.6,1)";
export const STEP = "steps(1,end)";
export const LIN = "linear";

type Bez = [number, number, number, number];
const NAMED: Record<string, Bez> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};
function bez(e?: string): Bez | "step" {
  if (!e) return NAMED.linear;
  if (e.startsWith("steps(")) {
    if (e !== STEP) throw new Error(`swb: only ${STEP} is supported`);
    return "step";
  }
  const m = /^cubic-bezier\(([^)]*)\)$/.exec(e);
  if (m) return m[1].split(",").map(Number) as Bez;
  const n = NAMED[e];
  if (!n) throw new Error(`swb: unknown easing ${e}`);
  return n;
}
const cub = (p1: number, p2: number, s: number) => 3 * p1 * s * (1 - s) ** 2 + 3 * p2 * s * s * (1 - s) + s ** 3;
function sOfX(b: Bez, x: number): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 48; i++) {
    const m = (lo + hi) / 2;
    if (cub(b[0], b[2], m) < x) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}
/** eased progress of a CSS timing function at u ∈ [0, 1] */
export function ease(e: string | undefined, u: number): number {
  const b = bez(e);
  if (b === "step") return u >= 1 ? 1 : 0;
  if (u <= 0) return 0;
  if (u >= 1) return 1;
  return cub(b[1], b[3], sOfX(b, u));
}
type P2 = [number, number];
const lerp2 = (a: P2, b: P2, s: number): P2 => [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s];
function split(p: P2[], s: number): [P2[], P2[]] {
  const a = lerp2(p[0], p[1], s);
  const b = lerp2(p[1], p[2], s);
  const c = lerp2(p[2], p[3], s);
  const d = lerp2(a, b, s);
  const e = lerp2(b, c, s);
  const m = lerp2(d, e, s);
  return [
    [p[0], a, d, m],
    [m, e, c, p[3]],
  ];
}
/**
 * The CSS timing function of the slice [u0, u1] of `e` (exact: a sub-curve of
 * a cubic Bézier is a cubic Bézier). null when the slice starts and ends at the
 * same value but moves in between (cannot be normalized).
 */
function slice(e: string | undefined, u0: number, u1: number): string | null {
  if (u0 <= 1e-9 && u1 >= 1 - 1e-9) return e ?? LIN;
  const b = bez(e);
  if (b === "step") return u1 >= 1 - 1e-9 ? STEP : LIN;
  if (e === LIN || !e) return LIN;
  const s0 = u0 <= 0 ? 0 : sOfX(b, u0);
  const s1 = u1 >= 1 ? 1 : sOfX(b, u1);
  const [left] = split([[0, 0], [b[0], b[1]], [b[2], b[3]], [1, 1]], s1);
  const [, q] = split(left, s1 > 0 ? s0 / s1 : 0);
  const dx = q[3][0] - q[0][0];
  const dy = q[3][1] - q[0][1];
  if (Math.abs(dy) < 1e-7) {
    for (let i = 1; i < 8; i++) {
      const y = cub(q[1][1] - q[0][1], q[2][1] - q[0][1], i / 8);
      if (Math.abs(y) > 2e-3) return null;
    }
    return LIN;
  }
  const n = (p: P2) => [(p[0] - q[0][0]) / dx, (p[1] - q[0][1]) / dy];
  const c1 = n(q[1]);
  const c2 = n(q[2]);
  const x1 = Math.min(1, Math.max(0, c1[0]));
  const x2 = Math.min(1, Math.max(0, c2[0]));
  return `cubic-bezier(${f(x1, 3)},${f(c1[1], 3)},${f(x2, 3)},${f(c2[1], 3)})`;
}

/* ───────────────────────────── registry ───────────────────────────── */

let RULES: string[] = [];
let TAKEN = new Set<string>();
let NS = "swb-";
/** start a sheet; names are prefixed with `ns` */
export function begin(ns: string): void {
  RULES = [];
  TAKEN = new Set();
  NS = ns;
}
/** the generated rules of the current sheet */
export function end(): string {
  const css = RULES.join("");
  RULES = [];
  return css;
}

type Block = { o: number; body: string; e?: string; rel: boolean };
/**
 * Write one @keyframes + its class (`.<ns><name>` sets animation-name). If every
 * relevant easing is the same it is set once on the class.
 */
function emit(name: string, blocks: Block[]): void {
  if (TAKEN.has(name)) throw new Error(`swb keyframes "${name}" defined twice`);
  TAKEN.add(name);
  const eases = new Set<string>();
  for (const b of blocks) if (b.rel) eases.add(b.e ?? LIN);
  const uniform = eases.size === 1 ? [...eases][0] : null;
  const groups = new Map<string, string[]>();
  for (const b of blocks) {
    const key = b.e && b.e !== LIN && !uniform && b.rel ? `${b.body};animation-timing-function:${b.e}` : b.body;
    const g = groups.get(key);
    if (g) g.push(offStr(b.o));
    else groups.set(key, [offStr(b.o)]);
  }
  let body = "";
  for (const [d, ks] of groups) body += `${ks.join(",")}{${d}}`;
  const tf = uniform && uniform !== LIN ? `;animation-timing-function:${uniform}` : "";
  RULES.push(`@keyframes ${NS}${name}{${body}}.${NS}${name}{animation-name:${NS}${name}${tf}}`);
}

/* ───────────────────────────── kf: declaration stops ───────────────────────────── */

export type Stop = [t: number, decl: string, ease?: string];
/**
 * One @keyframes from declaration stops (each stop's easing runs to the next
 * stop). 0 % / 100 % are filled from the first / last stop; stops landing on
 * the same offset keep the later one.
 */
export function kf(name: string, stops: Stop[]): void {
  const s = [...stops].sort((a, b) => a[0] - b[0]);
  if (s[0][0] > 0) s.unshift([0, s[0][1]]);
  if (s[s.length - 1][0] < T) s.push([T, s[s.length - 1][1]]);
  const at = new Map<number, Stop>();
  for (const x of s) {
    const p = at.get(off(x[0]));
    at.set(off(x[0]), p ? [x[0], x[1], x[2] ?? p[2]] : x);
  }
  const list = [...at.entries()];
  emit(
    name,
    list.map(([o, [, d, e]], i) => ({ o, body: d, e, rel: i < list.length - 1 && list[i + 1][1][1] !== d })),
  );
}

/* ───────────────────────────── frames ───────────────────────────── */

export type Frame = [t: number, v: number[], ease?: string];
/** one @keyframes from full frames; `fmt` turns the values into declarations */
export function frames(name: string, fr: Frame[], fmt: (v: number[]) => string): void {
  kf(
    name,
    fr.map(([t, v, e]): Stop => [t, fmt(v), e]),
  );
}

/* ───────────────────────────── anim: numeric tracks ───────────────────────────── */

export type Key = [t: number, v: number, ease?: string];
export type Arg = Key[] | number;
/** one transform function: [name, unit, decimals, ...one track per argument] */
export type Fn = [name: string, unit: string, d: number, ...args: Arg[]];

function track(a: Arg): Key[] {
  if (typeof a === "number") return [
    [0, a],
    [T, a],
  ];
  const s = [...a].sort((p, q) => p[0] - q[0]);
  const out: Key[] = [];
  for (const k of s) {
    const t = Math.min(T, Math.max(0, k[0]));
    if (out.length && Math.abs(out[out.length - 1][0] - t) < 0.01) out[out.length - 1] = [t, k[1], k[2]];
    else out.push([t, k[1], k[2]]);
  }
  if (out[0][0] > 0) out.unshift([0, out[0][1]]);
  if (out[out.length - 1][0] < T) out.push([T, out[out.length - 1][1]]);
  return out;
}
const segAt = (ch: Key[], t: number) => {
  let i = 0;
  while (i < ch.length - 2 && ch[i + 1][0] <= t) i++;
  return i;
};
/** value of a normalized track at t */
export function valueAt(ch: Key[], t: number): number {
  const i = segAt(ch, t);
  const [a, va, e] = ch[i];
  const [b, vb] = ch[i + 1];
  if (b <= a || t <= a) return t >= b ? vb : va;
  if (t >= b) return vb;
  return va + (vb - va) * ease(e, (t - a) / (b - a));
}
const TOL: Record<string, number> = { cqw: 0.03, "%": 0.15, deg: 0.25, "": 0.003 };

type TK = { t: number; v: number[]; e?: string };
/** simplify runs of linear keys (Ramer–Douglas–Peucker, per-argument tolerances) */
function simplify(ks: TK[], tol: number[]): TK[] {
  const keep = ks.map((k, i) => i === 0 || i === ks.length - 1 || (k.e !== undefined && k.e !== LIN) || (ks[i - 1].e !== undefined && ks[i - 1].e !== LIN));
  const rdp = (i: number, j: number) => {
    let worst = 1;
    let w = -1;
    for (let k = i + 1; k < j; k++) {
      const u = (ks[k].t - ks[i].t) / (ks[j].t - ks[i].t);
      for (let c = 0; c < tol.length; c++) {
        const err = Math.abs(ks[i].v[c] + (ks[j].v[c] - ks[i].v[c]) * u - ks[k].v[c]) / tol[c];
        if (err > worst) {
          worst = err;
          w = k;
        }
      }
    }
    if (w > 0) {
      keep[w] = true;
      rdp(i, w);
      rdp(w, j);
    }
  };
  let s = 0;
  for (let i = 1; i < ks.length; i++)
    if (keep[i]) {
      rdp(s, i);
      s = i;
    }
  return ks.filter((_, i) => keep[i]);
}

/**
 * One @keyframes from numeric tracks. `o`: opacity track. `tf`: an ordered
 * transform list whose every argument is a track (or a constant). Opacity and
 * transform get their own keyframes (properties absent from a keyframe
 * interpolate across it); two transform tracks moving at once with different
 * easings are sampled every 16 ms over the overlap.
 */
export function anim(name: string, o: Key[] | null, tf: Fn[] | null): void {
  const blocks = new Map<number, { o?: Block; t?: Block }>();
  const put = (which: "o" | "t", b: Block) => {
    const cur = blocks.get(b.o) ?? {};
    cur[which] = b;
    blocks.set(b.o, cur);
  };
  if (o) {
    const ch = track(o);
    ch.forEach(([t, v, e], i) => put("o", { o: off(t), body: `opacity:${f(v)}`, e, rel: i < ch.length - 1 && ch[i + 1][1] !== v }));
  }
  if (tf) {
    const chans: Key[][] = [];
    const tol: number[] = [];
    for (const [, u, , ...args] of tf)
      for (const a of args) {
        chans.push(track(a));
        tol.push(TOL[u] ?? 0.05);
      }
    const times = [...new Set(chans.flatMap((c) => c.map((k) => k[0])))].sort((a, b) => a - b);
    const vals = (t: number) => chans.map((c) => valueAt(c, t));
    const ks: TK[] = [];
    for (let i = 0; i < times.length - 1; i++) {
      const a = times[i];
      const b = times[i + 1];
      if (b - a < 0.01) continue;
      const segs = chans.map((c) => segAt(c, a + 1e-6));
      const moving = chans.map((c, k) => (c[segs[k]][1] !== c[segs[k] + 1][1] ? k : -1)).filter((k) => k >= 0);
      if (!moving.length) {
        ks.push({ t: a, v: vals(a) });
        continue;
      }
      const r = chans[moving[0]][segs[moving[0]]];
      const rb = chans[moving[0]][segs[moving[0]] + 1][0];
      const same = moving.every((k) => {
        const s = chans[k][segs[k]];
        return s[0] === r[0] && chans[k][segs[k] + 1][0] === rb && (s[2] ?? LIN) === (r[2] ?? LIN);
      });
      const sl = same ? slice(r[2], (a - r[0]) / (rb - r[0]), (b - r[0]) / (rb - r[0])) : null;
      if (sl !== null) {
        ks.push({ t: a, v: vals(a), e: sl });
        continue;
      }
      const n = Math.max(2, Math.ceil((b - a) / 16));
      for (let j = 0; j < n; j++) ks.push({ t: a + ((b - a) * j) / n, v: vals(a + ((b - a) * j) / n), e: LIN });
    }
    ks.push({ t: T, v: vals(T) });
    const fmt = (v: number[]) => {
      let i = 0;
      return tf
        .map(([fn, u, d, ...args]) => `${fn}(${args.map(() => {
          const x = f(v[i++], d);
          return x === "0" ? "0" : x + u;
        }).join(",")})`)
        .join(" ");
    };
    const list = simplify(ks, tol).map((k) => ({ ...k, s: fmt(k.v) }));
    list.forEach((k, i) => put("t", { o: off(k.t), body: `transform:${k.s}`, e: k.e, rel: i < list.length - 1 && list[i + 1].s !== k.s }));
  }
  // an opacity key sharing an offset with a transform key that needs another
  // easing moves one offset step (1.4 ms) later — or earlier — never past a
  // neighbouring opacity key
  const conflict = (x?: Block, y?: Block) => !!x && !!y && x.rel && y.rel && (x.e ?? LIN) !== (y.e ?? LIN);
  for (const o0 of [...blocks.keys()].sort((a, b) => a - b)) {
    const b = blocks.get(o0);
    if (!b || !conflict(b.o, b.t)) continue;
    const o1 = [o0 + 1, o0 - 1].find((x) => x > 0 && x < 10000 && !blocks.get(x)?.o && !conflict(b.o, blocks.get(x)?.t));
    if (o1 === undefined) throw new Error(`swb: cannot resolve the easing conflict of "${name}" at ${offStr(o0)}`);
    const ob = { ...(b.o as Block), o: o1 };
    delete b.o;
    put("o", ob);
  }
  const out: Block[] = [];
  for (const [o1, b] of [...blocks.entries()].sort((p, q) => p[0] - q[0])) {
    const parts = [b.o, b.t].filter((x): x is Block => !!x);
    const relB = parts.find((x) => x.rel);
    out.push({ o: o1, body: parts.map((x) => x.body).join(";"), e: relB?.e ?? parts[0].e, rel: !!relB });
  }
  emit(name, out);
}

/* ───────────────────────────── pool ───────────────────────────── */

export type PoolEvent = {
  /** frames of the event; the first and the last must be invisible */
  fr: Frame[];
  /** 2 = must play (throws if the pool is full), lower = dropped if no room */
  pri: number;
  /** the instance kind it needs (e.g. a colour) */
  tag?: string;
};
/**
 * Plays `events` on at most `max` sprite instances named `${prefix}${i}`.
 * Returns the tag of each instance (its first event's tag).
 * `strict`: a tagged event only ever plays on an instance of its own tag (a
 * colour never shows in another hue); priority-0 events never add an instance
 * and are dropped when no instance of their tag is free. Otherwise the tag is
 * only a preference.
 */
export function pool(prefix: string, events: PoolEvent[], max: number, fmt: (v: number[]) => string, strict = false, gap = 8): string[] {
  type E = PoolEvent & { a: number; z: number };
  const evs: E[] = events
    .map((e) => ({ ...e, a: e.fr[0][0], z: e.fr[e.fr.length - 1][0] }))
    .sort((p, q) => q.pri - p.pri || p.a - q.a);
  const inst: { tag?: string; evs: E[] }[] = [];
  const free = (I: { evs: E[] }, e: E) => I.evs.every((x) => e.z + gap <= x.a || x.z + gap <= e.a);
  for (const e of evs) {
    if (e.a < gap || e.z > T) throw new Error(`swb pool "${prefix}": event outside the loop (${e.a}–${e.z})`);
    let I = inst.find((x) => x.tag === e.tag && free(x, e)) ?? (strict ? undefined : inst.find((x) => free(x, e)));
    if (!I && inst.length < max && (!strict || e.pri >= 1)) inst.push((I = { tag: e.tag, evs: [] }));
    if (!I) {
      if (e.pri >= 2) throw new Error(`swb pool "${prefix}" is full at ${e.a} ms`);
      continue;
    }
    I.evs.push(e);
  }
  inst.forEach((I, i) => {
    const list = I.evs.sort((p, q) => p.a - q.a);
    const fr: Frame[] = [[0, list[0].fr[0][1]]];
    list.forEach((e, k) => {
      if (k) fr.push([e.a - 4, list[k - 1].fr[list[k - 1].fr.length - 1][1]]);
      fr.push(...e.fr);
    });
    fr.push([T, list[list.length - 1].fr[list[list.length - 1].fr.length - 1][1]]);
    frames(`${prefix}${i}`, fr, fmt);
  });
  return inst.map((I) => I.tag ?? "");
}
