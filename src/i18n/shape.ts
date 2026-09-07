import type { fr } from "./dictionaries/fr";

/**
 * Structural shape of the source dictionary with every literal widened to its
 * primitive. `en`/`de`/`es` are declared `as const satisfies DictionaryShape`
 * so TypeScript reports a missing, extra or mistyped key at compile time —
 * previously the cast in getDictionary hid drift until a page rendered
 * `undefined` in three locales. `scripts/check-i18n.ts` is the runtime twin
 * (also covers array lengths, which a structural type deliberately does not).
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

export type DictionaryShape = Widen<typeof fr>;
