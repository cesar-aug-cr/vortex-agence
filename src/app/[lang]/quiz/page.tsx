import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { getQuizQuestions } from "@/lib/quiz/questions";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { QuizGame } from "@/components/quiz/QuizGame";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/quiz",
    title: dict.meta.quiz.title,
    description: dict.meta.quiz.description,
  });
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const questions = getQuizQuestions(lang);

  return (
    <PageShell dict={dict} lang={lang}>
      <Breadcrumbs
        lang={lang}
        homeLabel={dict.common.breadcrumbHome}
        items={[{ label: dict.nav.quiz }]}
      />

      <Section tone="base" className="pt-10 md:pt-12">
        <SectionHeading
          level="h1"
          align="center"
          eyebrow={dict.quiz.eyebrow}
          title={dict.quiz.title}
          lead={dict.quiz.lead}
          className="mx-auto"
        />
        <div className="mt-12">
          <QuizGame lang={lang} copy={dict.quiz} questions={questions} />
        </div>
      </Section>

      <ContactCta dict={dict} lang={lang} />
    </PageShell>
  );
}
