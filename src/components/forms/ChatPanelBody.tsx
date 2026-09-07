"use client";

import type { Locale } from "@/i18n/config";
import type { ChatCopy } from "@/i18n/slices";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * Body of the chat panel (greeting + the multi-step contact form). Loaded with
 * next/dynamic by ChatWidget the first time the panel opens, so ContactForm and
 * its WebGL HyperspaceWarp stay out of the initial bundle of every page.
 */
export default function ChatPanelBody({
  lang,
  greeting,
  form,
  services,
}: {
  lang: Locale;
  greeting: string;
  form: ChatCopy["form"];
  services: ChatCopy["services"];
}) {
  return (
    <>
      <p className="mb-5 max-w-[85%] rounded-2xl rounded-tl-sm bg-bg-elevated p-3 text-sm leading-relaxed text-text-dim">
        {greeting}
      </p>
      <ContactForm lang={lang} form={form} services={services} />
    </>
  );
}
