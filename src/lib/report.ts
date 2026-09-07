/**
 * Server-side event reporting. Every call writes one structured JSON line to
 * the server log (visible in the host's log stream); with `notify` it also
 * pushes to ALERT_WEBHOOK_URL when set — the payload carries both `text`
 * (Slack-style) and `content` (Discord-style) so either webhook works.
 * Never pass personal data in `details`.
 */
export async function reportServerEvent(
  kind: string,
  details: Record<string, unknown> = {},
  { notify = false }: { notify?: boolean } = {}
): Promise<void> {
  const entry = { kind, at: new Date().toISOString(), ...details };
  console.error(`[report] ${JSON.stringify(entry)}`);

  const hook = process.env.ALERT_WEBHOOK_URL;
  if (!notify || !hook) return;
  const text = `vortx.lu · ${kind}\n${JSON.stringify(details)}`;
  try {
    await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, content: text }),
    });
  } catch {
    // The alert channel must never take the request down with it.
  }
}
