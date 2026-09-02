import { NotFoundContent } from "@/components/layout/NotFoundContent";

/**
 * Not-found boundary for the [lang] segment. Next renders it without route
 * params, and it must NOT touch request APIs (headers/cookies): a single
 * headers() call here used to opt every route of the site out of static
 * generation. The locale is derived from the URL inside the client component.
 *
 * No PageShell here: it needs the full dictionary, which requires the locale
 * server-side. The page carries its own rescue navigation instead.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
