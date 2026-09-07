/**
 * Browser-side error reporting used by the error boundaries. Fire-and-forget:
 * sendBeacon survives page unload and never throws into the boundary.
 */
export function reportClientError(
  error: Error & { digest?: string },
  scope: string
): void {
  try {
    const body = JSON.stringify({
      kind: "client.error",
      scope,
      message: String(error?.message ?? error).slice(0, 500),
      stack: String(error?.stack ?? "").slice(0, 2000),
      digest: error?.digest,
      url: location.href,
      ua: navigator.userAgent.slice(0, 200),
    });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/report", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Reporting is best-effort.
  }
}
