/**
 * Pre-generates every responsive variant of the site's images so that
 * production serves plain static files instead of going through Vercel's
 * Image Optimization (which is metered per transformation).
 *
 *   node scripts/build-images.mjs          # (also: npm run images:build)
 *
 * For each source under the listed public/ folders it writes
 *   public/_img/<folder>/<name>-<width>.webp
 * at every configured width smaller than the source, plus the source width,
 * and records the available widths in src/lib/image-variants.json. The custom
 * loader (src/lib/image-loader.ts, wired in next.config.ts) maps the widths
 * next/image asks for onto those files. Re-run after adding or changing an
 * image, and commit the output.
 *
 * Keep WIDTHS in sync with images.deviceSizes / images.imageSizes.
 */
import { readdirSync, mkdirSync, writeFileSync, statSync, existsSync } from "node:fs";
import { resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = resolve(root, "public");
const outRoot = resolve(pub, "_img");
const manifestPath = resolve(root, "src/lib/image-variants.json");

/** Widths next/image may request — deviceSizes ∪ imageSizes from next.config.ts. */
const WIDTHS = [48, 96, 192, 384, 640, 828, 1080, 1280, 1600, 1920, 2560];

/** Folders to process, with an optional cap on the largest variant. */
const SOURCES = [
  { dir: "hero" },
  { dir: "services" },
  { dir: "agence" },
  { dir: "approche" },
  { dir: "contact" },
  { dir: "cta" }, // final CTA banner background (all pages)
  { dir: "engagements", max: 828 }, // service pages "Nos engagements" cards (≤ 400 px wide)
  { dir: "quiz", max: 640 }, // intro brain + 5 level badges (≤ 128 px on screen, 2x on the certificate)
  { dir: "bandeaux" }, // FAQ / glossary opening banners
  { dir: "decor" }, // ambient texture (test page /page-test-ok)
  { dir: "news" }, // optional article cover photos (coverImage on an article) — folder may not exist yet
  { dir: "merci" },
  { dir: "portfolio" },
  { dir: "reviews", max: 192 }, // 40 px avatars, 3x screens at most
  { dir: "three", only: ["black-hole-disk.png"] }, // static poster fallback
];

const QUALITY = 75;
const exts = new Set([".webp", ".png", ".jpg", ".jpeg"]);

const manifest = {};
let written = 0;
let skipped = 0;

for (const { dir, max, only } of SOURCES) {
  const srcDir = resolve(pub, dir);
  if (!existsSync(srcDir)) continue;
  const files = readdirSync(srcDir).filter((f) => exts.has(extname(f).toLowerCase()) && (!only || only.includes(f)));
  for (const file of files) {
    const srcPath = resolve(srcDir, file);
    const meta = await sharp(srcPath).metadata();
    const cap = Math.min(meta.width, max ?? meta.width);
    const widths = [...new Set([...WIDTHS.filter((w) => w < cap), cap])].sort((a, b) => a - b);
    const name = basename(file, extname(file));
    const outDir = resolve(outRoot, dir);
    mkdirSync(outDir, { recursive: true });
    for (const w of widths) {
      const out = resolve(outDir, `${name}-${w}.webp`);
      // Skip up-to-date outputs so the script is cheap to re-run.
      if (existsSync(out) && statSync(out).mtimeMs >= statSync(srcPath).mtimeMs) {
        skipped++;
        continue;
      }
      await sharp(srcPath).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(out);
      written++;
    }
    manifest[`/${dir}/${file}`] = widths;
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`${Object.keys(manifest).length} images · ${written} variants written, ${skipped} up to date → public/_img + src/lib/image-variants.json`);
