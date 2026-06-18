# Relecture orthographique & rédactionnelle — 4 langues

> Audit linguistique des dictionnaires i18n du site vortx (orthographe, accents, grammaire, ponctuation, structure de phrases).
> Notation en ligne : `[-avant-]` est supprimé, `{+après+}` est ajouté.

- **tsc** : pass · **build prod** : exit 0 · double passe (relecture + QA adverse) par langue.
- Aucune faute d'accent/diacritique trouvée (les diacritiques étaient déjà corrects partout).
- Le diff ne touche que les 4 fichiers de dictionnaire i18n.

## Récapitulatif

| Langue | Corrections |
|---|---|
| 🇫🇷 Français | 4 |
| 🇬🇧 English | 9 |
| 🇩🇪 Deutsch | 25 |
| 🇪🇸 Español | 12 |
| **Total** | **50** |

## 🇫🇷 Français — 4 ligne(s) corrigée(s)

`src/i18n/dictionaries/fr.ts`

**1.** `note`

```diff
note: "Réponse rapide · Audit offert · Sans engagement · [-100%-]{+100 %+} sur-mesure",
```

**2.** `title`

```diff
title: [-"L'adn Marketing,-]{+"L'ADN marketing,+} zéro mauvaise surprise.",
```

**3.** `madeWith`

```diff
madeWith: "Conçu avec amour et beaucoup [-d'AI.",-]{+d'IA.",+}
```

**4.** `q`

```diff
{ q: "Le multilingue pénalise-t-il le SEO ?", a: "Au contraire, bien [-fait-]{+fait,+} il le renforce : chaque langue capte ses propres recherches. La clé est un balisage hreflang correct et des contenus distincts — exactement ce qu'on met en place." },
```

## 🇬🇧 English — 9 ligne(s) corrigée(s)

`src/i18n/dictionaries/en.ts`

**1.** `value`

```diff
{ value: [-"100 %",-]{+"100%",+} label: "Built bespoke" },
```

**2.** `lead`

```diff
lead: "Six [-expertises-]{+areas of expertise+} that lock together. Pick one, or let us orchestrate [-the whole.",-]{+them all.",+}
```

**3.** `lead`

```diff
lead: "Search is changing. Your clients [-ask-]{+put+} their questions to AI assistants. We optimise so that vortx — and you — are the source that gets cited.",
```

**4.** `value`

```diff
{ value: [-"100 %",-]{+"100%",+} label: "Bespoke, never a template" },
```

**5.** `q`

```diff
{ q: "What does \"built with AI\" mean?", a: "We use AI to accelerate design, code and content. The result: a higher-quality site, delivered faster and [-at a-]{+with+} better [-value-for-money-]{+value for money+} — reviewed and finalised by humans." },
```

**6.** `subServicesLead`

```diff
subServicesLead: "This service breaks down into focused [-expertises.-]{+areas of expertise.+} Take the one that fits your need — or combine them to cover the whole field.",
```

**7.** `title`

```diff
{ icon: "webapp", title: "Fully bespoke", desc: "An application built for your precise process — not[-a-] generic software you have to put up with." },
```

**8.** `q`

```diff
{ q: "Is it true your sites are \"built with AI\"?", a: "Yes. We use AI to accelerate design, code and content. The result: a higher-quality site, delivered faster and [-at a-]{+with+} better [-value-for-money-]{+value for money+} — always reviewed and finalised by humans." },
```

**9.** `q`

```diff
{ q: "Is GEO real or just a fad?", a: "It's very real: more and more decision-makers [-ask-]{+put+} their questions to an AI rather than {+to+} Google. If you don't appear in the answer, you don't exist in the decision. We structure your content to be cited as a source." },
```

## 🇩🇪 Deutsch — 25 ligne(s) corrigée(s)

`src/i18n/dictionaries/de.ts`

**1.** `text`

```diff
text: "Zwanzig Jahre lang bedeutete „online sichtbar [-sein\"-]{+sein“+} eine Sache: in den Google-Ergebnissen nach oben zu kommen. Heute tippt ein wachsender Teil Ihrer Kunden keine Suchanfrage mehr in eine Suchmaschine — sie stellen einer KI eine Frage. ChatGPT, Perplexity, Google AI Overviews oder Copilot antworten direkt, zitieren einige Quellen, und der Nutzer klickt manchmal auf gar keinen Link. Die Frage ist also nicht mehr nur „Bin ich bei Google auf Platz [-eins?\",-]{+eins?“,+} sondern „Zitiert mich die KI als [-Antwort?\".",-]{+Antwort?“.",+}
```

**2.** `text`

```diff
text: "Weil sich das Suchverhalten schnell verschiebt, besonders im B2B. Ein Entscheider, der einen Kauf vorbereitet, fragt zunehmend eine KI „Welche sind die besten Marketing-Agenturen in [-Luxemburg?\"-]{+Luxemburg?“+} statt Google. Wenn Ihr Unternehmen in der Antwort nicht auftaucht, existieren Sie in dieser Entscheidung nicht — selbst wenn Sie bei Google Dritter sind.",
```

**3.** `text`

```diff
text: "Die Modelle mögen klare Antworten. Eine Seite, die eine Frage in der Überschrift (H2/H3) stellt und direkt darunter in zwei klaren Sätzen beantwortet, hat viel bessere Chancen, aufgegriffen zu werden, als ein langer, verschachtelter Absatz. Denken Sie „Definition, dann [-Detail\".",-]{+Detail“.",+}
```

**4.** `text`

```diff
text: "Ein nachprüfbarer und präziser Inhalt (Zahlen, Daten, Orte — hier der Luxemburger Markt, die Mehrsprachigkeit FR/DE/EN, die DSGVO) ist [-„zitierbarer\".-]{+„zitierbarer“.+} Allgemeinplätze werden ignoriert; verankerte Fakten werden aufgegriffen.",
```

**5.**

```diff
"Sollten Sie dafür bezahlen, oben bei Google zu erscheinen, oder lieber an Ihrer organischen Sichtbarkeit arbeiten? Die eigentliche Frage ist nicht „das eine oder das [-andere\",-]{+andere“,+} sondern „welches, wann und für welches [-Ziel\".-]{+Ziel“.+} Wir entwirren das Ganze — mit Zahlen und gesundem Menschenverstand.",
```

**6.** `text`

```diff
text: "Soll man in Google Ads oder in SEO investieren? Die Antwort hängt von Ihrem Ziel und Ihrem Zeithorizont ab. Der Artikel stellt das [-„Mieten\"-]{+„Mieten“+} (Ads, sofort) dem [-„Besitzen\"-]{+„Besitzen“+} (SEO, dauerhaft) gegenüber und zeigt, wie Sie beide je nach Situation kombinieren.",
```

**7.** `text`

```diff
text: "Es ist eine der Fragen, die man uns am häufigsten stellt: „Soll ich mein Budget in Werbung oder in SEO [-stecken?\".-]{+stecken?“.+} Ehrliche Antwort: Das hängt von Ihrem Ziel, Ihrem Zeithorizont und Ihrem Markt ab. Beide bringen Kunden über Google, aber sie funktionieren nicht gleich — und vor allem ersetzen sie sich nicht, sie ergänzen sich.",
```

**8.**

```diff
"Sinkende Kosten: Die Anfangsinvestition amortisiert sich, der Klick ist [-„gratis\".",-]{+„gratis“.",+}
```

**9.** `text`

```diff
text: "Denken Sie nicht „Ads ODER [-SEO\",-]{+SEO“,+} sondern „Ads UND [-SEO\",-]{+SEO“,+} dosiert nach Ihrem Zeithorizont und Budget. Werbung für die Geschwindigkeit, SEO für die Dauer — und beide verstärken sich gegenseitig.",
```

**10.** `text`

```diff
text: "Sie haben Traffic, aber wenige Anfragen? Das Problem ist fast nie die Zahl der Besucher — es ist das, was zwischen ihrer Ankunft und ihrer Entscheidung passiert. Dieser Weg hat einen Namen: der Conversion-Funnel. Ihn zu verstehen heißt, mit dem bloßen „Leute [-herbringen\"-]{+herbringen“+} aufzuhören und anzufangen, diese Leute in Kunden zu verwandeln.",
```

**11.** `text`

```diff
text: "Bei vortx gestalten wir jede Website als Funnel, der zum Konvertieren gebaut ist, und optimieren ihn laufend. Wollen Sie wissen, wo [-Ihrer-]{+er Ihre+} Kunden verliert? Wir schenken Ihnen ein kostenloses Audit Ihres Funnels.",
```

**12.** `text`

```diff
text: "„KI ist etwas für [-Großkonzerne\"",-]{+Großkonzerne“",+}
```

**13.** `text`

```diff
text: "„Man braucht einen Entwickler und ein großes [-Budget\"",-]{+Budget“",+}
```

**14.** `text`

```diff
text: "„Die KI wird mein Team [-ersetzen\"",-]{+ersetzen“",+}
```

**15.** `text`

```diff
text: "Dieser Ansatz in kleinen Schritten vermeidet den Effekt des „großen [-KI-Projekts\",-]{+KI-Projekts“,+} das im Sande verläuft. Sie sammeln konkrete Erfolge, Ihr Team gewinnt an Vertrauen, und Sie investieren nur dort, wo der Wert bewiesen ist.",
```

**16.** `text`

```diff
text: "Die richtige Frage lautet nicht „Muss ich KI [-machen?\",-]{+machen?“,+} sondern „Welche Aufgabe kostet mich jede Woche [-Zeit?\".",-]{+Zeit?“.",+}
```

**17.** `def`

```diff
def: "Element (Button, Link), das den Besucher zum nächsten Schritt bewegt: „Gespräch [-buchen\",-]{+buchen“,+} „Angebot [-erhalten\".-]{+erhalten“.+} Seine Klarheit und Sichtbarkeit beeinflussen die Conversion stark.",
```

**18.** `def`

```diff
def: "Person oder Unternehmen, das Interesse gezeigt hat (Formular, Anruf, Angebotsanfrage) und Kunde werden könnte. Ein [-„qualifizierter\"-]{+„qualifizierter“+} Lead passt gut zu Ihrer Zielgruppe.",
```

**19.** `q`

```diff
{ q: "Was bedeutet „mit KI [-gemacht\"?",-]{+gemacht“?",+} a: "Wir nutzen KI, um Konzeption, Code und Inhalte zu beschleunigen. Ergebnis: eine Website von besserer Qualität, schneller geliefert und mit einem besseren Preis-Leistungs-Verhältnis — von Menschen geprüft und finalisiert." },
```

**20.**

```diff
"Wir strukturieren Ihre Inhalte so, dass sie [-„zitierbar\"-]{+„zitierbar“+} sind (klare Antworten, nachprüfbare Fakten, lokaler Kontext), und machen Ihre Website für Maschinen lesbar: strukturierte Daten, llms.txt, saubere Architektur.",
```

**21.** `tagline`

```diff
tagline: "Dominieren Sie die „in meiner [-Nähe\"-Suchen-]{+Nähe“-Suchen+} in Luxemburg.",
```

**22.**

```diff
"Lokale Suchmaschinenoptimierung in Luxemburg: Optimierung des Google Business Profile, Citations, Kundenbewertungen und lokale Seiten. Erfassen Sie „in meiner [-Nähe\"-Suchen-]{+Nähe“-Suchen+} in der Großregion.",
```

**23.**

```diff
"Wenn ein Kunde nach „Klempner [-Luxemburg\"-]{+Luxemburg“+} oder „Agentur in meiner [-Nähe\"-]{+Nähe“+} sucht, zeigt Google zuerst eine Karte und drei Einträge. Wenn Sie nicht dabei sind, sind Sie unsichtbar — selbst wenn Sie in den klassischen Ergebnissen Erster sind.",
```

**24.** `q`

```diff
{ q: "Ist lokales SEO nützlich, wenn ich kein Ladengeschäft habe?", a: "Ja, sobald Sie ein Einzugsgebiet haben: Handwerker, Dienstleistungen vor Ort, freie Berufe. Wir können einen Eintrag mit [-„Einzugsgebiet\"-]{+„Einzugsgebiet“+} ohne öffentliche Adresse einrichten." },
```

**25.** `q`

```diff
{ q: "Stimmt es, dass Ihre Websites „mit KI [-gemacht\"-]{+gemacht“+} sind?", a: "Ja. Wir nutzen KI, um Design, Code und Inhalte zu beschleunigen. Ergebnis: eine Website von besserer Qualität, schneller geliefert und mit einem besseren Preis-Leistungs-Verhältnis — stets von Menschen geprüft und finalisiert." },
```

## 🇪🇸 Español — 12 ligne(s) corrigée(s)

`src/i18n/dictionaries/es.ts`

**1.** `wrong`

```diff
wrong: [-"¡Fallaste!",-]{+"¡Incorrecto!",+}
```

**2.**

```diff
"Sitio rehecho [-de cero a fin,-]{+desde cero,+} rápido e impecable en móvil. El equipo lo automatizó todo para que dediquemos menos tiempo a lo administrativo. Una ganancia real en el día a día.",
```

**3.** `tipTitle`

```diff
tipTitle: "¿Por qué el doble círculo en la [-« o »?",-]{+«o»?",+}
```

**4.** `tip`

```diff
tip: "Dos razones. Primero, la legibilidad: sin él, la [-« o »-]{+«o»+} podría parecer un punto — [-« v•rtx »-]{+«v•rtx»+} en lugar de [-« vortx ».-]{+«vortx».+} El círculo ancla la letra y mantiene el nombre nítido.\n\nSegundo, el significado: del círculo grande al pequeño, la forma dibuja un embudo — un remolino (vórtice) que atrae a los prospectos y los convierte en clientes, hasta el corazón de la marca.",
```

**5.** `lead`

```diff
lead: "Independientemente del pack que [-elijas,-]{+elija,+} siempre [-disfrutarás-]{+disfrutará+} de estas características esenciales.",
```

**6.** `title`

```diff
{ icon: "responsive", title: [-"100%-]{+"100 %+} Responsive", desc: "Adaptación perfecta a todos los dispositivos para capturar leads desde móvil, tablet y escritorio." },
```

**7.** `title`

```diff
{ icon: "contact", title: "Formulario de Contacto", desc: [-"Recibe-]{+"Reciba+} mensajes directamente en [-tu-]{+su+} email (Landing Page & Site S)." },
```

**8.** `title`

```diff
{ icon: "smartforms", title: "Formularios inteligentes", desc: "Formularios de contacto y cotización [-multi-paso-]{+multipaso+} diseñados para maximizar las conversiones y capturar leads cualificados (Site M, L, XL & Custom)." },
```

**9.** `title`

```diff
{ icon: "ssl", title: "Certificado SSL", desc: "Conexión segura HTTPS para proteger a [-tus-]{+sus+} visitantes." },
```

**10.** `title`

```diff
{ icon: "speed", title: "Velocidad optimizada", desc: "Carga [-ultra-rápida-]{+ultrarrápida+} para mejorar la experiencia de usuario y el posicionamiento en buscadores." },
```

**11.** `moreText`

```diff
moreText: "Cada proyecto es único. Podemos añadir funcionalidades adicionales según [-tus-]{+sus+} necesidades: blog, galería, reservas online, integración con redes sociales y más.",
```

**12.** `ctaLabel`

```diff
ctaLabel: [-"Pregúntanos",-]{+"Pregúntenos",+}
```
