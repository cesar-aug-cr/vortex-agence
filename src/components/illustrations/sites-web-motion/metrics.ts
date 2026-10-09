/**
 * Advance widths (em) of the fonts the laser scene lays out in TypeScript, so the
 * lasers can aim at words, trace the CTA pill and fit the copy before the
 * browser lays it out. Measured in Chrome on the live site (1000 px,
 * letter-spacing 0, font-kerning none). Letters are rendered as inline-blocks /
 * without kerning, so these per-glyph advances are exactly what the page
 * renders; for kerned running text (the tagline) they are a safe upper bound.
 */
const table = (src: Record<number, string>) => {
  const m = new Map<string, number>();
  for (const [w, cs] of Object.entries(src)) for (const c of cs) m.set(c, Number(w) / 1000);
  return m;
};

/** Plus Jakarta Sans 800 (headline). */
export const JAKARTA_800 = table({
  180: " ", 238: "íìîï", 260: "ijl", 287: "IÍÌÎÏ", 333: "'", 386: "r,’", 396: "J", 400: "!¡", 407: "()",
  408: ".:·", 410: "f", 413: "1", 421: "t", 428: ";", 492: "z", 515: "s", 532: "\"/", 547: "L", 552: "T",
  564: "7", 567: "Z", 582: "vx", 583: "aàâäáãå", 586: "k", 587: "F", 589: "EÉÈÊË", 596: "2",
  599: "hnuñúùûü", 602: "yýÿ", 604: "69", 611: "ce?çéèêë¿", 612: "3", 614: "5", 633: "8", 634: "-",
  647: "S", 648: "g", 649: "P", 651: "oóòôöõø", 654: "ß", 662: "4", 667: "R", 672: "YÝ", 673: "bdpq",
  678: "+", 682: "X", 684: "–", 687: "K", 690: "B", 700: "0", 712: "V", 718: "«»", 724: "UÚÙÛÜ",
  732: "AHÀÂÄÁÃÅ", 739: "D", 742: "NÑ", 772: "CÇ", 804: "G", 813: "&", 878: "OQÓÒÔÖÕØ", 912: "wM",
  929: "m", 961: "æ", 993: "Æ", 1014: "—", 1032: "W", 1045: "œ", 1070: "%", 1207: "Œ", 1294: "ẞ",
});

/** Inter Tight 700 (CTA label). */
export const INTER_700 = table({
  199: " ", 240: "ijlíìîï", 247: "IÍÌÎÏ", 305: ".:·", 308: "¡", 309: "'", 313: ";!", 320: ",", 322: "’",
  344: "()", 355: "ft", 357: "/", 376: "r", 399: "1", 436: "-", 500: "–", 527: "\"", 529: "s", 530: "?¿",
  535: "L", 537: "J", 539: "z", 541: "x", 549: "k", 551: "7aàâäáãå", 552: "F", 553: "vyýÿ", 555: "cç",
  563: "eéèêë", 580: "EÉÈÊË", 581: "oóòôöõø", 589: "uúùûü", 591: "nñ", 594: "h", 597: "2", 598: "bdpq",
  600: "g", 606: "«", 607: "»", 614: "5", 615: "P", 622: "S", 624: "R", 626: "ß", 627: "3", 628: "B",
  630: "69", 631: "8", 634: "Z", 636: "T", 640: "&", 645: "4", 647: "+", 655: "0", 657: "K", 677: "ẞ",
  682: "X", 692: "YÝ", 694: "D", 697: "UÚÙÛÜ", 702: "NÑ", 713: "H", 714: "AVÀÂÄÁÃÅ", 719: "CÇ",
  728: "G", 749: "OÓÒÔÖÕØ", 750: "Q", 817: "w", 827: "%", 879: "æ", 881: "m", 883: "M", 957: "œ",
  994: "Œ", 997: "Æ", 1000: "—", 1003: "W",
});

/** Inter Tight 500 (tagline). */
export const INTER_500 = table({
  207: "íìîïijl", 223: " ", 227: "IÍÌÎÏ", 260: ".:·", 269: "'¡", 271: "!;", 273: "’", 274: ",", 324: "()",
  325: "/", 327: "f", 330: "t", 342: "r", 370: "1", 420: "-", 452: "\"", 483: "?¿", 493: "s", 500: "–",
  509: "Jzx", 514: "k", 522: "L", 524: "vyýÿ", 527: "7", 528: "cç", 529: "aàâäáãå", 543: "eéèêë",
  544: "F", 549: "«", 550: "»", 553: "uúùûü", 557: "nñ", 560: "oóòôöõø", 561: "EÉÈÊËh", 571: "2",
  574: "bdpq", 575: "5g", 584: "ß", 588: "8", 589: "69", 597: "ZP", 601: "S", 602: "3", 603: "R",
  604: "0", 608: "T&", 611: "4", 612: "B", 623: "K", 624: "+X", 643: "YÝ", 657: "VAÀÂÄÁÃÅ", 677: "ẞ",
  679: "D", 693: "CÇ", 695: "UÚÙÛÜ", 699: "H", 706: "NÑ", 707: "G", 726: "OÓÒÔÖÕØ", 727: "Q", 783: "w",
  786: "%", 843: "m", 858: "M", 877: "æ", 940: "W", 952: "œ", 961: "Æ", 964: "Œ", 1000: "—",
});

/** Width (em) of `s` set in `m`, with `ls` em of letter-spacing after every glyph. */
export function textWidth(s: string, m: Map<string, number>, ls = 0, fallback = 0.62): number {
  let w = 0;
  for (const c of s) w += (m.get(c) ?? fallback) + ls;
  return w;
}
