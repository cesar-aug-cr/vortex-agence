"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { QuizQuestion } from "@/lib/quiz/questions";
import { Check, ArrowRight } from "@/components/ui/icons";
import { LogoMark } from "@/components/brand/LogoMark";

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
  questions,
}: {
  lang: Locale;
  copy: QuizCopy;
  questions: QuizQuestion[];
}) {
  const total = Math.min(PER_GAME, questions.length);
  const [phase, setPhase] = useState<"intro" | "playing" | "done">("intro");
  const [deck, setDeck] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const start = () => {
    setDeck(pickRandom(questions, total));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setPhase("playing");
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

  // Print a one-page certificate (the browser's print dialog lets the user
  // "Save as PDF"). A body class + scoped @media print CSS isolates the
  // certificate so only it appears on the printed page.
  const printCertificate = () => {
    if (typeof window === "undefined") return;
    document.body.classList.add("printing-cert");
    const cleanup = () => {
      document.body.classList.remove("printing-cert");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    // Safety net if afterprint never fires (some browsers).
    setTimeout(cleanup, 1500);
  };

  const certDate =
    typeof window !== "undefined"
      ? new Date().toLocaleDateString(DATE_LOCALE[lang] ?? "fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  // ---- INTRO ----
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="card p-8 md:p-10">
          <span className="text-5xl" aria-hidden>
            🧠
          </span>
          <p className="mt-6 text-lg leading-relaxed text-text-dim">{copy.intro}</p>
          <button type="button" onClick={start} className="btn btn-primary mt-8">
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
          <span className="mt-6 block text-5xl" aria-hidden>
            {tier.emoji}
          </span>
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
                onClick={printCertificate}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
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

        {/* Printable certificate — hidden on screen, isolated for print/PDF */}
        {typeof document !== "undefined" &&
          createPortal(
            <div id="quiz-cert" aria-hidden>
              <div className="quiz-cert-frame">
                <LogoMark animated={false} className="quiz-cert-logo" title="vortx" />
                <p className="quiz-cert-eyebrow">{copy.cert.heading}</p>
                <p className="quiz-cert-sub">{copy.cert.subheading}</p>
                <div className="quiz-cert-rule" />
                <p className="quiz-cert-awarded">{copy.cert.awardedTo}</p>
                <p className="quiz-cert-name">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</p>
                <p className="quiz-cert-scorelabel">{copy.cert.scoreLabel}</p>
                <p className="quiz-cert-score">
                  {score} <span>/ {total}</span>
                </p>
                <p className="quiz-cert-verdict">
                  {tier.emoji} {tier.title}
                </p>
                <p className="quiz-cert-message">{tier.message}</p>
                <div className="quiz-cert-foot">
                  <span>
                    {copy.cert.dateLabel} {certDate}
                  </span>
                  <span>{copy.cert.footer}</span>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }

  // ---- PLAYING ----
  return (
    <div className="mx-auto max-w-2xl">
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
            <div className="mt-5 animate-fade-in-up rounded-2xl border border-border bg-bg-elevated p-4">
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
  );
}
