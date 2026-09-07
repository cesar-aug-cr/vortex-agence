/**
 * Generates the candidate visuals for /fr/images-test-pour-voir with OpenAI
 * gpt-image-2 and writes them to public/images-test/<id>.webp.
 *
 *   node scripts/gen-images.mjs            # generate missing images
 *   node scripts/gen-images.mjs --force    # regenerate everything
 *   node scripts/gen-images.mjs hero-accueil services-seo-geo   # only these ids
 *
 * Reads OPENAI_API_KEY from .env.local (or the environment). Never run by the
 * site itself — this is a one-off content tool.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { MANIFEST } from "./images-manifest.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/images-test");
mkdirSync(outDir, { recursive: true });

function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const env = resolve(root, ".env.local");
  if (existsSync(env)) {
    const m = readFileSync(env, "utf8").match(/^OPENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  throw new Error("OPENAI_API_KEY missing (env or .env.local)");
}
const KEY = loadKey();

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = new Set(args.filter((a) => !a.startsWith("--")));

const STYLE =
  "Premium, cinematic, high-end marketing agency aesthetic. Near-black background with subtle lime green (#c8f02e) and cyan (#14e0c8) accent lighting. Photorealistic rendering, shallow depth of field. Absolutely no text, no letters, no numbers, no logos, no watermarks.";

async function generate(item, attempt = 1) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: `${item.prompt} ${STYLE}`,
      n: 1,
      size: item.size,
      quality: item.quality,
      output_format: "webp",
      output_compression: 85,
    }),
  });
  const json = await res.json();
  if (!res.ok || json.error) {
    const msg = json.error?.message ?? `${res.status}`;
    if (attempt < 6 && (res.status >= 500 || res.status === 429)) {
      await new Promise((r) => setTimeout(r, 15000 * attempt));
      return generate(item, attempt + 1);
    }
    throw new Error(msg);
  }
  return Buffer.from(json.data[0].b64_json, "base64");
}

const queue = MANIFEST.filter((m) => (only.size ? only.has(m.id) : true));
let ok = 0;
let failed = 0;
const CONCURRENCY = 2;

async function worker() {
  while (queue.length) {
    const item = queue.shift();
    const file = resolve(outDir, `${item.id}.webp`);
    if (!force && existsSync(file)) {
      console.log(`· ${item.id} (exists, skipped)`);
      continue;
    }
    const t0 = Date.now();
    try {
      const buf = await generate(item);
      writeFileSync(file, buf);
      ok++;
      console.log(`✓ ${item.id} ${(buf.length / 1024).toFixed(0)} KB in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    } catch (e) {
      failed++;
      console.error(`✗ ${item.id}: ${e.message}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`done — ${ok} generated, ${failed} failed`);
process.exit(failed ? 1 : 0);
