import type { Metadata } from "next";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { buildMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
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

  return (
    <PageShell dict={dict} lang={lang}>
      {/* No final CTA on this page: the quiz section itself sits on the CTA
          banner's photo — the light variant (public/cta/fond-clair.webp) on
          the white theme, the dark one (public/cta/fond.webp) on the dark
          theme — with the same glows as ContactCta so it reads as one family. */}
      <Section tone="base" className="overflow-hidden pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image src="/cta/fond-clair.webp" alt="" fill sizes="100vw" className="object-cover dark:hidden" />
          <Image src="/cta/fond.webp" alt="" fill sizes="100vw" className="hidden object-cover dark:block" />
          <div className="absolute inset-0 bg-bg/50 dark:bg-stage/60" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(60% 70% at 50% 0%, rgba(200,240,46,0.12), transparent 65%), radial-gradient(50% 50% at 85% 90%, rgba(20,224,200,0.10), transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10">
          {/* breadcrumbs inside the photo section: no seam between the page
              background and the photo under the header */}
          <Breadcrumbs
            lang={lang}
            homeLabel={dict.common.breadcrumbHome}
            items={[{ label: dict.nav.quiz }]}
            className=""
          />
          <SectionHeading
            level="h1"
            align="center"
            eyebrow={dict.quiz.eyebrow}
            title={dict.quiz.title}
            lead={dict.quiz.lead}
            className="mx-auto mt-10 md:mt-12"
          />
          <div className="mt-12">
            <QuizGame lang={lang} copy={dict.quiz} />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
