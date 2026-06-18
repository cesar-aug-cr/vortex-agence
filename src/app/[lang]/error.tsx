"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Segment error boundary — catches render/runtime errors in any page under
 * /[lang] so users see a branded recovery screen instead of a white page.
 * Rendered inside the locale layout (theme + fonts apply). It's a client
 * component with no access to the dictionary, so the few strings are localized
 * from a small inline table keyed by the locale read from the URL.
 */
const COPY = {
  fr: { eyebrow: "Erreur", title: "Quelque chose s'est mal passé.", body: "Une erreur inattendue est survenue. Réessayez, ou revenez à l'accueil.", retry: "Réessayer", home: "Accueil" },
  en: { eyebrow: "Error", title: "Something went wrong.", body: "An unexpected error occurred. Try again, or go back home.", retry: "Try again", home: "Home" },
  de: { eyebrow: "Fehler", title: "Etwas ist schiefgelaufen.", body: "Ein unerwarteter Fehler ist aufgetreten. Versuchen Sie es erneut oder kehren Sie zur Startseite zurück.", retry: "Erneut versuchen", home: "Startseite" },
  es: { eyebrow: "Error", title: "Algo salió mal.", body: "Se ha producido un error inesperado. Vuelva a intentarlo o regrese al inicio.", retry: "Reintentar", home: "Inicio" },
} as const;

type Loc = keyof typeof COPY;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const pathname = usePathname();
  const seg = (pathname?.split("/")[1] ?? "fr") as Loc;
  const t = COPY[seg] ?? COPY.fr;
  const home = `/${COPY[seg] ? seg : "fr"}`;

  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center bg-bg px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-strong">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 text-3xl font-bold text-text md:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-md text-text-dim">{t.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button type="button" onClick={reset} className="btn btn-primary">
          {t.retry}
        </button>
        <a
          href={home}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 font-semibold text-text transition-colors hover:border-accent hover:text-accent"
        >
          {t.home}
        </a>
      </div>
    </main>
  );
}
