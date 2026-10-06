"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { QuizQuestion } from "@/lib/quiz/questions";
import { Check, ArrowRight } from "@/components/ui/icons";
import { renderCertificate, downloadCanvas, CERT_WIDTH, CERT_HEIGHT } from "@/components/quiz/certificate";

/**
 * Result-tier badges, by tier index (seed → compass → rocket → trophy → crown).
 * Promoted from /images-test-pour-voir (proposal 34): the emojis rendered
 * differently per OS and pixelated on the printed certificate; these 1:1
 * renders are served through the static variants (public/quiz, ≤ 640 px).
 */
const TIER_BADGES = [
  "/quiz/niveau-1.webp",
  "/quiz/niveau-2.webp",
  "/quiz/niveau-3.webp",
  "/quiz/niveau-4.webp",
  "/quiz/niveau-5.webp",
];

type QuizCopy = Dictionary["quiz"];

const PER_GAME = 10;

const DATE_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  de: "de-DE",
  es: "es-ES",
};

/** Fisher–Yates shuffle (client-only; runs on "start", so no SSR mismatch). */
function pickRandom(pool: QuizQuestion[], n: number): QuizQuestion[] {
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(n, a.length));
}

export function QuizGame({
  lang,
  copy,
}: {
  lang: Locale;
  copy: QuizCopy;
}) {
  const total = PER_GAME;
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [deck, setDeck] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const [starting, setStarting] = useState(false);

  // The 150-question pool (~65 KB, answers included) is no longer serialised
  // into the page: it is fetched as its own chunk the first time the visitor
  // presses "start", then 10 questions are drawn client-side as before.
  // Certificate state (rendered once the result is known — see below).
  const [certCanvas, setCertCanvas] = useState<HTMLCanvasElement | null>(null);
  const [certUrl, setCertUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const start = async () => {
    if (starting) return;
    setStarting(true);
    setCertCanvas(null);
    setCertUrl(null);
    try {
      const { getQuizQuestions } = await import("@/lib/quiz/questions");
      setDeck(pickRandom(getQuizQuestions(lang), total));
      setIndex(0);
      setPicked(null);
      setScore(0);
      setPhase("playing");
    } finally {
      setStarting(false);
    }
  };

  const current = deck[index];
  const answered = picked !== null;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (current && i === current.answer) setScore((s) => s + 1);
  };

  const advance = () => {
    if (index + 1 >= total) {
      setPhase("done");
    } else {
      setIndex((n) => n + 1);
      setPicked(null);
    }
  };

  const tier =
    copy.tiers.find((t) => score >= t.min && score <= t.max) ??
    copy.tiers[copy.tiers.length - 1];
  const tierBadge = TIER_BADGES[Math.max(0, copy.tiers.indexOf(tier))] ?? TIER_BADGES[TIER_BADGES.length - 1];

  const certDate =
    typeof window !== "undefined"
      ? new Date().toLocaleDateString(DATE_LOCALE[lang] ?? "fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  // Certificate: drawn on a canvas (badge, wordmark and copy baked in) once
  // the result is known; shown as a preview and downloaded as a PNG the
  // visitor prints at home. See ./certificate.ts.
  const certBadgeSrc = `/_img${tierBadge.replace(/.webp$/, "")}-640.webp`;
  useEffect(() => {
    if (phase !== "done") return;
    let cancelled = false;
    renderCertificate({
      badgeSrc: certBadgeSrc,
      heading: copy.cert.heading,
      subheading: copy.cert.subheading,
      awardedTo: copy.cert.awardedTo,
      scoreLabel: copy.cert.scoreLabel,
      score,
      total,
      verdict: tier.title,
      message: tier.message,
      dateLabel: copy.cert.dateLabel,
      date: certDate,
      footer: copy.cert.footer,
    })
      .then((canvas) => {
        if (cancelled) return;
        setCertCanvas(canvas);
        setCertUrl(canvas.toDataURL("image/png"));
      })
      .catch(() => {
        /* no certificate preview; the button stays disabled */
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-render only when the result changes
  }, [phase, score, total, tier, certBadgeSrc, lang]);

  const downloadCertificate = async () => {
    if (!certCanvas) return;
    setDownloading(true);
    try {
      await downloadCanvas(certCanvas, `certificat-qi-marketing-vortx-${score}-sur-${total}.png`);
    } finally {
      setDownloading(false);
    }
  };

  // ---- INTRO ----
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="card p-8 md:p-10">
          <Image
            src="/quiz/intro.webp"
            alt=""
            width={112}
            height={112}
            className="mx-auto h-28 w-28 rounded-2xl border border-border"
          />
          <p className="mt-6 text-lg leading-relaxed text-text-dim">{copy.intro}</p>
          <button type="button" onClick={start} disabled={starting} className="btn btn-primary mt-8 disabled:opacity-60">
            {copy.start}
            <ArrowRight width={18} height={18} />
          </button>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
            {total} {copy.questionLabel.toLowerCase()}s · /{total}
          </p>
        </div>
      </div>
    );
  }

  // ---- DONE ----
  if (phase === "done") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="card p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            {copy.scorePrefix}
          </p>
          <p className="mt-3 text-6xl font-bold text-text">
            {score}
            <span className="text-2xl text-text-muted"> / {total}</span>
          </p>
          <Image
            src={tierBadge}
            alt={tier.title}
            width={128}
            height={128}
            className="mx-auto mt-6 h-32 w-32 rounded-full border border-border"
          />
          <h2 className="mt-4 text-2xl font-bold text-text">{tier.title}</h2>
          <p className="mt-3 text-text-dim">{tier.message}</p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href={localized(lang, "/contact")} className="btn btn-primary w-full sm:w-auto">
              {tier.cta}
              <ArrowRight width={18} height={18} />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
              >
                {copy.replay}
              </button>
              <button
                type="button"
                onClick={downloadCertificate}
                disabled={!certCanvas || downloading}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent disabled:cursor-wait disabled:opacity-60"
              >
                {copy.certificate}
              </button>
            </div>
            <Link
              href={localized(lang, "/services")}
              className="mt-1 text-sm font-medium text-text-muted transition-colors hover:text-accent"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Certificate preview — the exact PNG the download button hands over */}
        <div className="card mt-6 overflow-hidden p-3 md:p-4">
          <div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-white"
            style={{ aspectRatio: `${CERT_WIDTH} / ${CERT_HEIGHT}` }}
          >
            {certUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URL generated client-side
              <img src={certUrl} alt={`${copy.cert.heading} ${copy.cert.subheading} — ${score}/${total}`} className="h-full w-full" />
            ) : (
              <div className="absolute inset-0 animate-pulse bg-surface" aria-hidden />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- PLAYING ----
  // The whole game board is a dark `.card` (in light mode the curated theme
  // turns cards dark + light text). This keeps the correct/incorrect/feedback
  // states on a single dark surface in BOTH themes — so the green/red signals
  // stay legible on the white page without per-state light overrides.
  return (
    <div className="mx-auto max-w-2xl">
      <div className="card p-6 md:p-8">
      {/* progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < index ? "bg-accent" : i === index ? "bg-accent/50" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-xs text-text-muted">
        {copy.questionLabel} {index + 1} / {total}
      </p>

      {current && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold leading-snug text-text md:text-2xl">
            {current.q}
          </h2>

          <div className="mt-6 grid gap-3">
            {current.options.map((opt, i) => {
              const isCorrect = i === current.answer;
              const isPicked = i === picked;
              let cls =
                "border-border text-text-dim hover:border-border-strong hover:text-text";
              if (answered) {
                if (isCorrect) cls = "border-green-500 bg-green-500/10 text-text";
                else if (isPicked) cls = "border-red-500 bg-red-500/10 text-text";
                else cls = "border-border text-text-muted opacity-60";
              }
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left text-sm transition-colors disabled:cursor-default ${cls}`}
                >
                  <span>{opt}</span>
                  {answered && isCorrect && (
                    <Check width={18} height={18} className="shrink-0 text-green-500" />
                  )}
                  {answered && isPicked && !isCorrect && (
                    <span aria-hidden className="shrink-0 text-red-500">
                      ✕
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* feedback + did-you-know */}
          {answered && (
            <div className="mt-5 animate-fade-in-up rounded-2xl border border-border bg-white/5 p-4">
              <p
                className={`text-sm font-semibold ${
                  picked === current.answer ? "text-green-500" : "text-red-400"
                }`}
              >
                {picked === current.answer ? copy.correct : copy.wrong}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">
                <span className="font-semibold text-accent">{copy.didYouKnow} </span>
                {current.tip.replace(/^Le saviez-vous\s*\?\s*/i, "")}
              </p>
              <button type="button" onClick={advance} className="btn btn-primary mt-4">
                {index + 1 >= total ? copy.finish : copy.next}
                <ArrowRight width={18} height={18} />
              </button>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
