import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Agence marketing & web Luxembourg`,
    short_name: site.name,
    description: site.description,
    start_url: `/${site.defaultLocale}`,
    display: "standalone",
    // Matches the light theme --bg token (the site-wide default theme).
    background_color: "#f7f8f4",
    theme_color: "#f7f8f4",
    lang: site.defaultLocale,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
