# SEO-optimalisatieplan — H16 Vastgoedontwikkeling

Datum: 5 september 2026. Basis: code-audit van `h16-v2`, live check van
https://h16.peleman.io (nieuwe site, staging) en https://www.h16.be (oude site,
nog live op Vercel).

## Samenvatting

De nieuwe site is technisch al veel beter dan de oude (unieke titels en
beschrijvingen, `lang="nl"`, canonical, og-tags, lichte pagina's, ISR). Wat
ontbreekt is alles wat Google nodig heeft om de site te *vinden en te
begrijpen*: een sitemap, structured data, een og:image, zoekwoordgerichte
titels, en vooral lokale signalen (Google Business Profile). De grootste
SEO-gebeurtenis is de domeinverhuis naar h16.be. Die moet in één keer goed.

De oude site op www.h16.be heeft vandaag: een LEGE meta description, de
beschrijving in de keywords-tag, geen robots.txt, geen sitemap, geen canonical.
Er is dus weinig ranking te verliezen en veel te winnen. De project-slugs zijn
op oud en nieuw identiek, dus de verhuis vraagt geen URL-redirects behalve het
domein zelf.

Top 5 prioriteiten:

1. Domeinverhuis h16.be zonder indexverlies (fase 0).
2. Sitemap, dynamische robots.txt, JSON-LD, og:image (fase 1, ~1 dag code).
3. Titels en h1's met zoekwoord + plaats (fase 2).
4. Google Business Profile + consistente NAP (fase 3, grootste hefboom voor een
   lokale bouwfirma).
5. Aparte dienstpagina's in plaats van één /colab-pagina (fase 4).

## Zoekwoordfocus

Klein lokaal bedrijf, vijf realisaties, werkgebied Gent en Oost-Vlaanderen.
Ranken op "projectontwikkelaar" nationaal is onrealistisch; ranken op
dienst + plaats is dat wel.

| Cluster | Zoekwoorden (NL) | Doelpagina |
|---|---|---|
| Merk | h16, h16 vastgoed, h16 oosterzele | / |
| Bouwcoördinatie | bouwcoördinatie gent, bouwcoördinator gent, bouwbegeleiding oost-vlaanderen, bouwadvies gent | /bouwcoordinatie (nieuw) |
| Projectontwikkeling | projectontwikkelaar gent, kleinschalige projectontwikkeling, herbestemming pand gent | /projectontwikkeling (nieuw) |
| Renovatie | totaalrenovatie gent, renovatie coördinatie gent | realisaties + dienstpagina |
| Te koop | nieuwbouw te koop gent, [straatnaam] gent te koop | /projects/[slug] |
| Partners | samenwerking architect aannemer bouwcoördinator | /colab |

Zoekvolumes controleren met Google Keyword Planner of Ahrefs voor de definitieve
keuze; de clusters zelf staan vast.

## Fase 0 — Domeinverhuis naar h16.be (blokkeert al het andere)

De site staat nu op h16.peleman.io met `noindex` en `Disallow: /`. Correct,
dat mag zo blijven tot de verhuis. Volgorde:

1. **Kies www of apex.** De oude site 301't h16.be naar www.h16.be, dus Google
   kent www. Aanbeveling: behoud `https://www.h16.be` als canonical en laat de
   apex 301'en naar www. Zo blijft de bestaande indexatie geldig. Zet
   `NEXT_PUBLIC_SITE_URL=https://www.h16.be`.
2. **Voor de switch**: Search Console aanmaken als *domein-property* `h16.be`
   (dekt www, apex, http en https). Noteer welke URL's vandaag geïndexeerd zijn
   (`site:h16.be` en het dekkingsrapport).
3. **Op de switch-dag**: DNS naar Coolify, Traefik-cert, `NEXT_PUBLIC_ALLOW_INDEXING=true`,
   robots.txt met `Allow: /` en sitemap-regel (of dynamisch, zie fase 1),
   rebuild. Controleer daarna `curl -sI https://www.h16.be` (200, geen
   noindex) en één projectpagina.
4. **Na de switch**: sitemap indienen in Search Console, "URL-inspectie" op de
   homepage en op de te-koop-pagina, indexering aanvragen. Bing Webmaster
   Tools importeren vanuit Search Console (één klik).
5. **h16.peleman.io**: laat noindex staan, of 301 naar www.h16.be zodra de
   verhuis klopt. Nooit beide hosts indexeerbaar.
6. Slugs blijven identiek (gecontroleerd: alle 5 projecten). Verandert een
   slug later in Strapi, dan hoort daar een 301 bij in `next.config.js`.

## Fase 1 — Technische basis (code, ongeveer één dag)

| # | Wat | Waarom | Waar |
|---|---|---|---|
| 1.1 | **Dynamische sitemap** `pages/sitemap.xml.js`: vaste pagina's + project-slugs uit Strapi (`?fields[0]=slug&fields[1]=updatedAt`), met `lastmod`. ISR 1 uur. | Er is geen sitemap. Vijf projectpagina's zijn enkel via de grid bereikbaar. | nieuw bestand |
| 1.2 | **Dynamische robots.txt** `pages/robots.txt.js` op basis van `NEXT_PUBLIC_ALLOW_INDEXING`. | Nu een statisch bestand dat manueel vervangen moet worden op switch-dag. Eén env-var stuurt dan meta-robots én robots.txt, ze kunnen niet uit elkaar lopen. | vervangt `public/robots.txt` |
| 1.3 | **JSON-LD Organization/LocalBusiness** op elke pagina (type `GeneralContractor`, met `name`, `legalName`, `vatID`, `address`, `telephone`, `email`, `areaServed`, `sameAs` Facebook + Instagram, `logo`). Bron: `data/companyData.js`. | Google koppelt de site aan het Business Profile via exact dezelfde NAP. | `PagesMetaHead` of `DefaultLayout` |
| 1.4 | **JSON-LD BreadcrumbList** op projectpagina's (Home › Realisaties › Project). | Broodkruimels in de SERP, duidelijke hiërarchie. | `pages/projects/[slug].jsx` |
| 1.5 | **JSON-LD voor te-koop-projecten**: `RealEstateListing` (of `Product` + `Offer`) met prijs zodra het `prijs`-veld in Strapi bestaat, plus `ImageObject`s. | Vastgoedaanbod krijgt rich results. | idem, achter `isOffer` |
| 1.6 | **og:image**: standaard merkbeeld 1200×630 in `public/images/og-default.jpg`; op projectpagina's de thumbnail. `twitter:card=summary_large_image` staat er al maar zonder afbeelding is dat een lege kaart. | Elke deling op Facebook/Instagram/WhatsApp toont nu een tekstblok zonder beeld. | `PagesMetaHead` (prop `image`, met `key`) |
| 1.7 | **Titel-template** `${title} \| H16 Vastgoedontwikkeling` in `PagesMetaHead`; homepage zonder suffix. | Nu zijn de titels "Contact", "Over ons", "Realisaties": zonder merk en zonder zoekwoord. | `PagesMetaHead` |
| 1.8 | **Fallback description voor projecten**: als `korteBeschrijving` leeg is, gebruik de samengestelde metazin ("Nieuwbouw in Gent, opgeleverd in 2024."). | Anders valt de pagina terug op de site-standaard en krijgen meerdere projecten dezelfde description. | `[slug].jsx` |
| 1.9 | **Verwijder `meta keywords`** (en de defaultProps-lijst). | Google negeert het sinds 2009; het lekt enkel de zoekwoordstrategie naar concurrenten. | `PagesMetaHead` |
| 1.10 | **Alt-teksten uit Strapi**: de code leest al `beeld.alt \|\| project.naam`. Vul in de Strapi media library het veld *Alternative text* per foto in ("Gerenoveerde voorgevel Nieuwland 28, Gent"). | Nu heeft elke galerijfoto dezelfde alt (de projectnaam). | Strapi, geen code |
| 1.11 | **Core Web Vitals meten** met PageSpeed Insights zodra h16.be live is; verwacht groen (TTFB 0,48 s, fonts 99 KB, next/image met AVIF/WebP, hero met `priority`). Controleer specifiek LCP op `/projects/[slug]` (hero-foto uit Strapi) en CLS op de galerij. | Meten na verhuis, niet ervoor: het staging-domein heeft geen veldgegevens. | PSI, Search Console CWV-rapport |

## Fase 2 — On-page (titels, koppen, interne links)

**Titels en h1's per pagina** (voorstel, in de bestaande toon):

| Pagina | Title (≤ 60 tekens vóór suffix) | H1 |
|---|---|---|
| / | H16 \| Bouwcoördinatie en projectontwikkeling in Gent | Bouwcoördinatie & projectontwikkeling in Gent en Oost-Vlaanderen |
| /colab | Samenwerken met H16: advies, coördinatie, ontwikkeling | Samenwerken (ongewijzigd) |
| /projects | Realisaties: renovatie en nieuwbouw in Gent | Onze realisaties in Gent en omgeving |
| /about | Over ons: Gilles De Brabander en Elena Versyp | Over ons |
| /contact | Contact: bouwadvies in Oosterzele en Gent | Contacteer ons |
| /projects/[slug] | `${naam}` + ` – ${beschikbaarheid}` als te koop/te huur | projectnaam (ongewijzigd) |

De project-h1 is een straatnaam. Dat is goed voor "te koop"-zoekopdrachten op
adres, maar zegt Google niets over de dienst. De metazin eronder ("Nieuwbouw
in Gent, opgeleverd in 2024") vangt dat op; zorg dat elk project in Strapi
`aard`, `fase`, `jaar` én een adres met plaatsnaam heeft.

**Interne links**

- Projectpagina's linken enkel terug naar `/projects`. Voeg onderaan twee tot
  drie "Andere realisaties" toe (kaarten, geen nieuwe fetch nodig als de
  getStaticProps drie extra slugs meegeeft).
- Voeg in de footer links naar de dienstpagina's (fase 4) en naar
  `/projects` toe. De footer heeft nu enkel sociale links en de legal-blok.
- Projectkaarten dragen nog geen jaar, plaats of rol van H16. Die drie
  woorden per kaart zijn ook de zoekwoorden ("totaalrenovatie · Gent · 2023").

**URL's**: `/colab` en `/projects` zijn Engelstalig op een Nederlandstalige
site. Hernoemen naar `/samenwerken` en `/realisaties` is beter, maar alleen
zinvol *op de dag van de domeinverhuis* met permanente redirects; daarna niet
meer aanraken. Beslissing voor de klant.

## Fase 3 — Lokale SEO (grootste hefboom, geen code)

1. **Google Business Profile** aanmaken of claimen voor H16 BV, Dorp 28,
   9860 Oosterzele. Categorie: "Bouwbedrijf" primair, "Projectontwikkelaar"
   en "Bouwadviesbureau" secundair. Werkgebied: Gent, Oosterzele, Merelbeke,
   Oost-Vlaanderen. Telefoon `+32 474 04 22 79`, website `https://www.h16.be`,
   openingsuren, 10 tot 20 projectfoto's. Gebruik *exact* de NAP uit
   `data/companyData.js`; de JSON-LD van 1.3 herhaalt dezelfde gegevens.
2. **Reviews**: vraag de eigenaars van de vijf realisaties en de vier
   samenwerkingspartners om een Google-review. Vijf reviews maken al het
   verschil in de local pack.
3. **Vermeldingen** (citations) met dezelfde NAP: Gouden Gids, Trustoo,
   Bouwinfo, Livios, Bouwunie of Embuild als ze lid zijn, KBO is er al.
4. **Te-koop-panden** ook op Immoweb/Zimmo plaatsen met link naar de
   projectpagina op h16.be. Dat zijn de weinige betrouwbare backlinks die een
   kleine ontwikkelaar gratis krijgt.
5. **Partners** (samenwerkingen: architecten, aannemers): vraag een link vanaf
   hun "partners"-pagina en link terug vanaf de geplande logo-sectie.

## Fase 4 — Content en site-structuur

1. **Splits /colab in dienstpagina's.** Eén pagina target nu drie intenties
   (bouwcoördinatie, adviesverlening, projectontwikkeling) én twee doelgroepen
   (eigenaars, architecten/aannemers). Maak `/bouwcoordinatie`,
   `/projectontwikkeling` en eventueel `/bouwadvies`, elk 400 tot 700 woorden:
   wat het inhoudt, voor wie, hoe H16 werkt, welke realisatie het illustreert,
   CTA naar contact. `/colab` blijft de partnerpagina voor architecten en
   aannemers.
2. **Realisaties als casestudy.** Elke projectpagina krijgt drie vaste
   blokken in Strapi: *de opdracht*, *de rol van H16*, *het resultaat*. Dat is
   de E-E-A-T-inhoud die een vergelijkende bouwheer leest, en het is uniek
   materiaal dat geen concurrent heeft.
3. **Kennisartikelen**, haalbaar tempo: één per twee maanden. Onderwerpen met
   lokale zoekintentie: "Wat doet een bouwcoördinator en wat kost het?",
   "Renovatie of nieuwbouw in Gent: hoe beslis je?", "Omgevingsvergunning
   aanvragen in Gent: de stappen", "Een pand herbestemmen: waar op letten".
   Vraagt een `articles`-collectie in Strapi (de lege blog-starter-types
   bestaan al) en een `/inzichten`-route.
4. **Privacy- en cookiepagina** is een verplichting, geen SEO-taak, maar hoort
   in dezelfde sprint: het formulier belooft "we delen ze met niemand" en
   fase 5 voegt analytics toe.

## Fase 5 — Meten

- **Search Console** (fase 0) is de bron van waarheid. Maandelijks:
  vertoningen en klikken merk vs. niet-merk, posities per cluster,
  dekkingsfouten, CWV.
- **Analytics**: de site heeft er sinds de Vercel-verwijdering geen. Zelfhost
  **Plausible** of **Umami** op Coolify (cookieloos, geen banner nodig).
  Eén doel: formulierverzending, te meten in `pages/api/contact.js` bij
  succes of client-side na de 200.
- **KPI's voor de eerste zes maanden**: geïndexeerde pagina's = sitemap;
  top-10 positie voor "bouwcoördinatie gent" en "projectontwikkelaar gent";
  Business Profile-weergaven en routeaanvragen; aantal formulierverzendingen
  per maand.

## Actielijst op volgorde

| Prio | Actie | Wie | Inspanning |
|---|---|---|---|
| 1 | Search Console domein-property h16.be, baseline noteren | Clement | 30 min |
| 2 | Fase 1 code: sitemap, robots, JSON-LD, og:image, titel-template, description-fallback, keywords weg | Clement | 1 dag |
| 3 | Domeinverhuis h16.be (fase 0), sitemap indienen | Clement | halve dag + DNS |
| 4 | Google Business Profile + reviews vragen | H16 | 2 uur + opvolging |
| 5 | Alt-teksten, aard/fase/jaar/adres invullen in Strapi | H16 | 2 uur |
| 6 | Titels en h1's (fase 2), kaartmetadata, gerelateerde projecten, footer-links | Clement | halve dag |
| 7 | Dienstpagina's (fase 4.1): copy door H16, bouw door Clement | beiden | 2 dagen |
| 8 | Plausible/Umami op Coolify + privacypagina | Clement | halve dag |
| 9 | Casestudy-blokken en kennisartikelen | H16, tempo 1 per 2 maanden | doorlopend |

Punten 1 tot 3 en 6 kan ik meteen uitvoeren in de codebase.

---

## Herscan 6 september 2026 (na de layout-herbouw, ongecommit)

Gescand op de lokale productiebuild van 11:50 (poort 3100), die de huidige
werkboom weerspiegelt. h16.peleman.io draait nog de vorige commit.

**Wat verbeterd is**

- /about en /colab hebben nu een echte kopstructuur (h1 › h2 › h3) in plaats
  van losse h3's; "Twee manieren om samen te werken" en "Vier redenen waarom
  dat loont" zijn bruikbare h2's.
- Homepage: elke sectie is een h2, geen verweesde koppen meer; drie
  projectkaarten als h3 onder de sectie-h2.
- Alle afbeeldingen hebben een alt-attribuut; decoratieve emblemen alt="".
- Interne links: de homepage linkt nu 4× naar /contact en 4× naar /projects;
  /colab linkt naar vier projectpagina's.
- Adres in `companyData` is Hoek ter Hulst 25 (verhuisd van Dorp 28).

**Nieuwe aandachtspunten**

| # | Bevinding | Impact | Fix |
|---|---|---|---|
| A | **NAP-conflict**: de site zegt Hoek ter Hulst 25, de KBO zegt (nog) Dorp 28 bus 0002. Google Business Profile, JSON-LD en KBO moeten hetzelfde adres dragen. | Hoog voor lokale SEO | Zetelverplaatsing laten publiceren in het Belgisch Staatsblad vóór het Business Profile wordt aangemaakt; tot dan géén citations aanmaken. `registeredSeat` heeft al een verify-commentaar. |
| B | Homepage h1 rendert als tekst `Bouwcoördinatie&Projectontwikkeling` zonder spaties (de `&` is aria-hidden, maar Google leest de tekstnode). | Laag-middel | `{" "}` rond het ampersand-span, of `&` als `aria-hidden` mét spaties. |
| C | Projectpagina's hebben **geen enkele h2**: na de h1 volgt platte markdown en een fotosectie zonder kop. | Middel | Vaste h2's "Over het project", "Details", "Foto's" (die laatste als zichtbare kop op `#fotos`). Casestudy-blokken uit fase 4 vullen ze. |
| D | Twee projecten op dezelfde straat: `/projects/te-koop-nieuwland-28` (title "Nieuwland 28") en `/projects/nieuwland-28-40-gent`. Kannibalisatie voor "Nieuwland 28 Gent". | Middel | Titles onderscheiden via beschikbaarheid + aard: "Nieuwland 28 Gent – Nieuwbouwwoning te koop" vs "Nieuwland 28-40 Gent – Projectontwikkeling". Fix 1.8/2 dekt dit. |
| E | Project-descriptions komen rechtstreeks uit `korte_beschrijving` en zijn 50-70 tekens ("Luxueuze high-end nieuwbouw woning in hartje Gent!"). | Laag | In Strapi 120-155 tekens schrijven, of de metazin (aard, plaats, jaar) eraan plakken in code. |
| F | /projects description is 68 tekens en zegt niets over plaats of type. | Laag | "Nieuwbouw, totaalrenovatie en herbestemming in Gent en Oost-Vlaanderen. Vijf realisaties van H16, van ontwerp tot oplevering." |
| G | Nog steeds geen sitemap (404), geen JSON-LD, geen og:image, titels zonder merk. | Hoog | Fase 1 ongewijzigd; niets ervan is door de herbouw al gedaan. |
| H | `public/images/kolibri.png` (690 KB) wordt nergens meer gebruikt. | Geen (niet geladen) | Verwijderen, houdt het Docker-image klein. |

**Onveranderd sinds 5 september**: fase 0 (verhuis), fase 1 (techniek), fase 3
(lokaal), fase 5 (meten). Het actieplan blijft geldig; punt A komt erbij als
voorwaarde voor fase 3.

---

## Status 6 september 2026, na implementatie

**Gedaan in code** (commit "changed domain" + werkboom):

- URL's hernoemd: `/projects` → `/realisaties`, `/colab` → `/samenwerken`, permanente redirects in `next.config.js`. Header en footer lezen dezelfde lijst uit `data/navigation.js`; de footer heeft nu een navigatie.
- `components/PagesMetaHead.jsx`: titel-template `… | H16 Vastgoedontwikkeling`, og:image (`public/images/og-default.jpg`, 1200×630) + twitter:image, meta keywords weg, één JSON-LD-script per pagina (Organization altijd; projectpagina's + BreadcrumbList; te koop/te huur + RealEstateListing). Helpers in `lib/seo.js`.
- `pages/sitemap.xml.js` en `pages/robots.txt.js`: dynamisch, gestuurd door `NEXT_PUBLIC_ALLOW_INDEXING` en `NEXT_PUBLIC_SITE_URL`. Statische `public/robots.txt` verwijderd.
- Titels en descriptions per pagina (fase 2). Project-title = naam – aard + beschikbaarheid ("Nieuwland 28 – Nieuwbouw te koop"), description = korte beschrijving + metazin.
- Projectpagina: h2's "Over het project", "Foto's", "Andere realisaties" (drie kaarten, nieuwste eerst, huidige uitgesloten).
- Hero-h1 leest nu "Bouwcoördinatie & Projectontwikkeling" met spaties.
- `sharp` toegevoegd (de standalone-container logde "sharp is required … for image optimization").
- `kolibri.png` (690 KB, ongebruikt) verwijderd.

**Gezien op Coolify (6 sep, 14:35 UTC):** de h16-app heeft FQDN `h16.be, www.h16.be, h16.peleman.io`; env `NEXT_PUBLIC_SITE_URL=https://h16.be`, `NEXT_PUBLIC_ALLOW_INDEXING=true`, Strapi op `h16.strapi.peleman.io`. `https://h16.be` serveert de nieuwe code maar **nog met `noindex` en `Disallow: /`**: de laatste deploy dateert van vóór de env-wijziging. Een redeploy neemt de vlag mee.

**Open beslissing:** canonical is nu de apex (`https://h16.be`), niet `www` zoals afgesproken. `www.h16.be` wijst naar Coolify maar heeft nog geen TLS-certificaat. Kies: (a) apex houden en `www` → apex laten redirecten in Traefik, of (b) `NEXT_PUBLIC_SITE_URL=https://www.h16.be` zetten zodra het certificaat er is. Eén van beide, niet allebei bereikbaar zonder redirect.

**Nog te doen, geen code:** Search Console domein-property + sitemap indienen na de redeploy; Business Profile pas na de KBO-adreswijziging (Hoek ter Hulst 25); alt-teksten en aard/fase/jaar in Strapi; `prijs`-veld in Strapi voor het te-koop-project.
