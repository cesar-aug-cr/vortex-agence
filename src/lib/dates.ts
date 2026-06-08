/**
 * Dynamic date helpers — single source of truth for any year/“X ans” copy.
 *
 * Computed at render time with `new Date()`. Pages that surface these values
 * set `export const revalidate = ...` so statically-generated HTML refreshes
 * on its own — the counters roll over on their own shortly after Jan 1, with
 * no redeploy needed.
 */

/** Year the team's experience is counted from (2016 → 10 ans in 2026). */
export const EXPERIENCE_SINCE = 2016;

/** The current calendar year. */
export function currentYear(): number {
  return new Date().getFullYear();
}

/** Whole years of experience since {@link EXPERIENCE_SINCE}. */
export function yearsOfExperience(): number {
  return currentYear() - EXPERIENCE_SINCE;
}
