"use client";

import { openConsentPreferences } from "@/lib/consent";

/** Re-opens the cookie consent banner (preferences view). */
export function ConsentSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className="btn btn-primary">
      {label}
    </button>
  );
}
