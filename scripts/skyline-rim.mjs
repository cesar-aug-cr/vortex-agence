/**
 * Draws a lime (#c8f02e) rim along the boundary between a pure-black sky and
 * everything below it (rooftops, trees, mist). Used for the hero cut-out
 * candidates on /fr/images-test-pour-voir (manifest entry hero-accueil-ville-5).
 *
 *   node scripts/skyline-rim.mjs <in.png> <outBase> [solidPx=3] [glowPx=10] [neckPx=5]
 *
 * Writes <outBase>.png and <outBase>.webp. The sky is the exact-black region
 * connected to the top row (pixels <= 6/255 are snapped to 0 first); leaks
 * into foliage whose neck is narrower than 2*neckPx are discarded. Needs the
 * `sharp` that ships with Next.
 */
import { readFileSync } from "node:fs";
const sharp = (await import("sharp")).default;
const [, , inPath, outBase, solidArg = "3", glowArg = "10", rArg = "5"] = process.argv;
const SOLID = +solidArg, D = +glowArg, R = +rArg;
const { data, info } = await sharp(readFileSync(inPath)).raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, C = info.channels, N = W * H;
for (let i = 0; i < N; i++) { const o = i * C; if (data[o] <= 6 && data[o + 1] <= 6 && data[o + 2] <= 6) data[o] = data[o + 1] = data[o + 2] = 0; }
const black = new Uint8Array(N);
for (let i = 0; i < N; i++) { const o = i * C; black[i] = (data[o] | data[o + 1] | data[o + 2]) === 0 ? 1 : 0; }

function flood(mask) {
  const out = new Uint8Array(N); const q = new Int32Array(N); let qh = 0, qt = 0;
  for (let x = 0; x < W; x++) if (mask[x]) { out[x] = 1; q[qt++] = x; }
  while (qh < qt) {
    const p = q[qh++]; const x = p % W, y = (p - x) / W;
    if (x > 0 && mask[p - 1] && !out[p - 1]) { out[p - 1] = 1; q[qt++] = p - 1; }
    if (x < W - 1 && mask[p + 1] && !out[p + 1]) { out[p + 1] = 1; q[qt++] = p + 1; }
    if (y > 0 && mask[p - W] && !out[p - W]) { out[p - W] = 1; q[qt++] = p - W; }
    if (y < H - 1 && mask[p + W] && !out[p + W]) { out[p + W] = 1; q[qt++] = p + W; }
  }
  return out;
}
function filt(src, r, isMin) {
  const tmp = new Uint8Array(N), out = new Uint8Array(N);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = isMin ? 1 : 0;
    for (let k = -r; k <= r; k++) { const xx = x + k; if (xx < 0 || xx >= W) continue; const s = src[y * W + xx]; v = isMin ? (s < v ? s : v) : (s > v ? s : v); }
    tmp[y * W + x] = v;
  }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = isMin ? 1 : 0;
    for (let k = -r; k <= r; k++) { const yy = y + k; if (yy < 0 || yy >= H) continue; const s = tmp[yy * W + x]; v = isMin ? (s < v ? s : v) : (s > v ? s : v); }
    out[y * W + x] = v;
  }
  return out;
}

const rawSky = flood(black);
const core = flood(filt(rawSky, R, true));
const grown = filt(core, R, false);
const sky = new Uint8Array(N); let kept = 0, dropped = 0;
for (let i = 0; i < N; i++) { sky[i] = rawSky[i] & grown[i]; if (sky[i]) kept++; else if (rawSky[i]) dropped++; }

// Chamfer 3-4 distance from non-sky into sky (units of 1/3 px), two passes.
const INF = 1 << 29; const dist = new Int32Array(N);
for (let i = 0; i < N; i++) dist[i] = sky[i] ? INF : 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const p = y * W + x; if (!dist[p]) continue; let v = dist[p];
  if (x > 0) v = Math.min(v, dist[p - 1] + 3);
  if (y > 0) { v = Math.min(v, dist[p - W] + 3); if (x > 0) v = Math.min(v, dist[p - W - 1] + 4); if (x < W - 1) v = Math.min(v, dist[p - W + 1] + 4); }
  dist[p] = v;
}
for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
  const p = y * W + x; if (!dist[p]) continue; let v = dist[p];
  if (x < W - 1) v = Math.min(v, dist[p + 1] + 3);
  if (y < H - 1) { v = Math.min(v, dist[p + W] + 3); if (x < W - 1) v = Math.min(v, dist[p + W + 1] + 4); if (x > 0) v = Math.min(v, dist[p + W - 1] + 4); }
  dist[p] = v;
}
const LIME = [200, 240, 46]; let painted = 0;
for (let i = 0; i < N; i++) {
  if (!sky[i]) continue; const d = dist[i] / 3; if (d > D) continue; const o = i * C;
  const a = d <= SOLID ? 1 : Math.pow(Math.max(0, 1 - (d - SOLID) / (D - SOLID)), 1.6);
  data[o] = Math.round(LIME[0] * a); data[o + 1] = Math.round(LIME[1] * a); data[o + 2] = Math.round(LIME[2] * a); painted++;
}
await sharp(data, { raw: { width: W, height: H, channels: C } }).png({ compressionLevel: 9 }).toFile(`${outBase}.png`);
const o = await sharp(`${outBase}.png`).webp({ quality: 85, effort: 6 }).toFile(`${outBase}.webp`);
console.log(`rim ok: sky kept ${kept}, leak px dropped ${dropped}, rim px ${painted}; webp ${(o.size / 1024).toFixed(0)}KB`);
