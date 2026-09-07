import { describe, expect, it } from "vitest";
import { i18n } from "./config";
import { canonicalizePath, localizePath, routeSlugs } from "./routes";
import { localized } from "@/lib/locale";

/**
 * The localized-slug mapping is the heart of the 4-locale SEO routing (proxy
 * redirects + rewrites, sitemap, hreflang). A broken entry here turns into a
 * redirect loop or a 404 on a whole language.
 */
describe("localizePath / canonicalizePath", () => {
  it("round-trips every canonical segment in every locale", () => {
    for (const canonical of Object.keys(routeSlugs)) {
      for (const lang of i18n.locales) {
        const pub = localizePath(lang, `/${canonical}`);
        expect(pub).toBe(`/${routeSlugs[canonical][lang]}`);
        expect(canonicalizePath(lang, pub)).toBe(`/${canonical}`);
      }
    }
  });

  it("only translates the first segment", () => {
    expect(localizePath("de", "/services/sites-web")).toBe("/leistungen/sites-web");
    expect(canonicalizePath("es", "/servicios/seo-geo/seo-local")).toBe("/services/seo-geo/seo-local");
  });

  it("passes unknown segments through unchanged", () => {
    expect(localizePath("en", "/quiz")).toBe("/quiz");
    expect(canonicalizePath("de", "/unbekannt/x")).toBe("/unbekannt/x");
  });

  it("keeps the root path as-is", () => {
    expect(localizePath("fr", "/")).toBe("/");
    expect(canonicalizePath("en", "")).toBe("");
  });

  it("has a public slug for every locale on every canonical route", () => {
    for (const [canonical, map] of Object.entries(routeSlugs)) {
      for (const lang of i18n.locales) {
        expect(map[lang], `${canonical}.${lang}`).toBeTruthy();
      }
    }
  });

  it("never maps two canonical routes to the same public slug in a locale", () => {
    for (const lang of i18n.locales) {
      const slugs = Object.values(routeSlugs).map((m) => m[lang]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("localized()", () => {
  it("builds locale-prefixed public URLs", () => {
    expect(localized("fr", "/")).toBe("/fr");
    expect(localized("es", "/agence")).toBe("/es/agencia");
    expect(localized("de", "services/sites-web")).toBe("/de/leistungen/sites-web");
  });
});
