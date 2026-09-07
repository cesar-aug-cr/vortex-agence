/**
 * Dictionary parity check — fails (exit 1) when en/de/es do not carry exactly
 * the same key paths as the French source. Runs on plain Node ≥ 22.18 (type
 * stripping), no build step: `npm run check:i18n`.
 */
import { fr } from "../src/i18n/dictionaries/fr.ts";
import { en } from "../src/i18n/dictionaries/en.ts";
import { de } from "../src/i18n/dictionaries/de.ts";
import { es } from "../src/i18n/dictionaries/es.ts";
import { diffKeyPaths } from "../src/i18n/keyPaths.ts";

let failed = false;
for (const [locale, dict] of Object.entries({ en, de, es })) {
  const { missing, extra, total } = diffKeyPaths(fr, dict);
  if (missing.length === 0 && extra.length === 0) {
    console.log(`✓ ${locale}: ${total} key paths, aligned with fr`);
    continue;
  }
  failed = true;
  console.error(`✗ ${locale}: ${missing.length} missing, ${extra.length} extra (fr has ${total})`);
  for (const p of missing.slice(0, 40)) console.error(`    missing  ${p}`);
  for (const p of extra.slice(0, 40)) console.error(`    extra    ${p}`);
  if (missing.length + extra.length > 80) console.error("    …");
}
process.exit(failed ? 1 : 0);
