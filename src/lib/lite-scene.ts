/**
 * Should decorative WebGL scenes be replaced by a static poster on this
 * device? True when the visitor explicitly asked for less data (Data Saver),
 * is on a 2G-class connection, or runs a low-memory device where three.js
 * (~230 KB gzip + a full-screen render loop) costs more than it brings.
 * Client-only — call from an effect.
 */
export function prefersLiteScene(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return true;
  const type = nav.connection?.effectiveType;
  if (type === "slow-2g" || type === "2g") return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  return false;
}
