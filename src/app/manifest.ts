import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Agence marketing & web Luxembourg`,
    short_name: site.name,
    description: site.description,
    start_url: `/${site.defaultLocale}`,
    display: "standalone",
    background_color: "#09090c",
    theme_color: "#09090c",
    lang: site.defaultLocale,
    icons: [
      { src: "/icon", sizes: "any", type: "image/png" },
    ],
  };
}
