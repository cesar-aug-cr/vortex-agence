import { notFound } from "next/navigation";

/**
 * Catch-all for URLs that match no route under [lang] (e.g. /fr/blabla).
 * Without it, unmatched paths fall through to Next's unstyled default 404;
 * calling notFound() here routes them to the branded [lang]/not-found.tsx
 * boundary while keeping the proper 404 status code.
 */
export default function CatchAllNotFound() {
  notFound();
}
