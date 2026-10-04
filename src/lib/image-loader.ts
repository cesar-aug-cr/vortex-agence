import type { ImageLoaderProps } from "next/image";
import variants from "./image-variants.json";

/**
 * Custom next/image loader: serves the pre-generated static variants written
 * by scripts/build-images.mjs (public/_img/…-<width>.webp) instead of the
 * on-demand optimizer, so Vercel counts zero image transformations.
 *
 * For a width that was not generated, the next larger variant is used, or the
 * largest one when the request exceeds the source size. Images missing from
 * the manifest (anything not run through the script) fall back to their
 * original file, unresized.
 */
const VARIANTS: Record<string, number[]> = variants;

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const widths = VARIANTS[src];
  if (!widths) return src;
  const w = widths.find((x) => x >= width) ?? widths[widths.length - 1];
  const base = src.replace(/\.(png|jpe?g|webp)$/i, "");
  return `/_img${base}-${w}.webp`;
}
