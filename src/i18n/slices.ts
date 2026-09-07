import type { Dictionary } from "./getDictionary";
import { hiddenSubServices } from "@/lib/site";

/**
 * Typed slices of the dictionary for the CLIENT components that live on every
 * page (Header, StickyCta, ChatWidget). Server components can take the whole
 * `dict` for free, but every prop handed to a client component is serialised
 * into the HTML and the RSC payload: passing the full dictionary (~190 KB —
 * 64 KB of sub-service copy, 53 KB of articles, 17 KB of glossary…) three
 * times added ~200 KB to every page. These slices weigh a few KB.
 */

export type NavService = {
  slug: string;
  group: string;
  title: string;
  subs: { slug: string; title: string }[];
};

export type HeaderCopy = {
  nav: Dictionary["nav"];
  common: Pick<
    Dictionary["common"],
    "cta" | "toggleTheme" | "readMore" | "openMenu" | "close" | "breadcrumbHome"
  >;
  megaMenu: Dictionary["megaMenu"];
  a11y: Dictionary["a11y"];
  services: NavService[];
};

export function headerCopy(dict: Dictionary): HeaderCopy {
  const subServices = dict.subServices as Record<string, readonly { slug: string; title: string }[]>;
  return {
    nav: dict.nav,
    common: {
      cta: dict.common.cta,
      toggleTheme: dict.common.toggleTheme,
      readMore: dict.common.readMore,
      openMenu: dict.common.openMenu,
      close: dict.common.close,
      breadcrumbHome: dict.common.breadcrumbHome,
    },
    megaMenu: dict.megaMenu,
    a11y: dict.a11y,
    services: dict.services.map((s) => ({
      slug: s.slug,
      group: s.group,
      title: s.title,
      subs: (subServices[s.slug] ?? [])
        .filter((c) => !hiddenSubServices.has(c.slug))
        .map((c) => ({ slug: c.slug, title: c.title })),
    })),
  };
}

export type StickyCopy = {
  eyebrow: string;
  allServices: string;
  servicesShort: string;
  cta: string;
  consentManage: string;
  chatOpen: string;
  services: { slug: string; title: string }[];
};

export function stickyCopy(dict: Dictionary): StickyCopy {
  return {
    eyebrow: dict.servicesSection.eyebrow,
    allServices: dict.common.allServices,
    servicesShort: dict.common.servicesShort,
    cta: dict.common.cta,
    consentManage: dict.consent.manage,
    chatOpen: dict.chat.open,
    services: dict.services.map((s) => ({ slug: s.slug, title: s.title })),
  };
}

export type ChatCopy = {
  chat: Dictionary["chat"];
  form: Dictionary["contact"]["form"];
  services: { slug: string; title: string }[];
};

export function chatCopy(dict: Dictionary): ChatCopy {
  return {
    chat: dict.chat,
    form: dict.contact.form,
    services: dict.services.map((s) => ({ slug: s.slug, title: s.title })),
  };
}
