import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * Native flat config (ESLint 9 / eslint-config-next 16). The previous
 * FlatCompat wrapper crashed against Next 16's flat presets and `next lint`
 * no longer exists, so the project had no lint coverage at all.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      // The "read localStorage / matchMedia then setState in an effect" pattern
      // is used by ~10 hydration-sensitive widgets. It is a known trade-off,
      // tracked as a warning so new occurrences stay visible without blocking CI.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // Imperative three.js scenes: geometry is seeded with Math.random inside
    // useMemo and uniforms are mutated in useFrame by design. The React
    // Compiler purity rules do not apply to this WebGL code.
    files: ["src/components/three/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".next-*/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "screenshots/**",
    "index.html",
  ]),
]);
