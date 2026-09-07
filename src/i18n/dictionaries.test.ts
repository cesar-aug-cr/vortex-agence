import { describe, expect, it } from "vitest";
import { fr } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { es } from "./dictionaries/es";
import { diffKeyPaths } from "./keyPaths";

/**
 * Runtime twin of the DictionaryShape type constraint: every translation must
 * carry exactly the French key paths (array items included). A drift shows up
 * as `undefined` copy on three locales, so it fails the build here instead.
 */
describe("dictionary parity", () => {
  for (const [locale, dict] of Object.entries({ en, de, es })) {
    it(`${locale} mirrors fr key for key`, () => {
      const { missing, extra } = diffKeyPaths(fr, dict);
      expect(missing, `missing in ${locale}`).toEqual([]);
      expect(extra, `extra in ${locale}`).toEqual([]);
    });
  }
});
