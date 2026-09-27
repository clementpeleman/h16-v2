// Service landing pages: /bouwcoordinatie and /projectontwikkeling.
//
// Why they exist: "bouwcoördinatie Gent" is won today by thin one-city pages
// from micro-firms (some not even based in Gent), and /samenwerken spreads
// three services and two audiences over one 324-word page. A page per service,
// with H16's own realisaties as proof, is the realistic way to rank.
//
// DRAFTS. While `ready` is false a page is a 404 on the canonical host
// (h16.be) and only renders on h16.peleman.io and localhost, where every open
// question shows as a dashed "Tekst volgt" box so H16 can answer it (the Tack
// widget on staging takes the comments). Flip `ready` once every section and
// FAQ answer H16 wants to publish is filled in — sections and questions still
// left at `null` are then skipped, never shown.
//
// Copy rules: formal "u" (the site's client-facing register), no invented
// numbers or claims. Every sentence below comes from existing site copy; what
// only H16 can say is a `vraag` for them.
//
// Realisaties are proof only once H16 confirms its role on them
// (`realisatiesBevestigd`). Until then a draft asks, and a ready page hides
// the grid rather than publish an unconfirmed claim.
import { DIENST_ONDERWERP } from "./dienstOnderwerpen";

export const DIENSTEN = {
  bouwcoordinatie: {
    slug: "bouwcoordinatie",
    ready: false,
    naam: "Bouwcoördinatie",
    // <title> before the " | H16 Vastgoedontwikkeling" suffix.
    title: "Bouwcoördinatie in Gent en Oost-Vlaanderen",
    description:
      "H16 coördineert uw bouw- of renovatieproject in Gent en Oost-Vlaanderen: voorbereiding, planning, opvolging en budgetcontrole, met één aanspreekpunt.",
    h1: "Bouwcoördinatie in Gent en Oost-Vlaanderen",
    lead:
      "Staat u voor een bouwproject maar loopt u verloren? Wij analyseren graag samen uw specifieke vastgoedsituatie of vragen, en coördineren uw vastgoedproject met de grootste zorg.",
    secties: [
      {
        label: "Wat we doen",
        titel: "Wat H16 voor u doet",
        // Renders the four benefits from /samenwerken.
        voordelen: true,
        tekst: null,
      },
      {
        label: "Voor wie",
        titel: "Voor wie",
        tekst: null,
        vraag:
          "Voor wie is bouwcoördinatie door H16 bedoeld? Particulieren die bouwen of renoveren, eigenaars van een pand, investeerders? Welke projecten neemt H16 aan en welke niet (minimale omvang, nieuwbouw of renovatie)?",
      },
      {
        label: "Werkwijze",
        titel: "Zo werken we",
        tekst: null,
        vraag:
          "Welke stappen doorloopt een klant, van het eerste gesprek tot de oplevering? Wat doet H16 zelf (aanbestedingen, planning, werfopvolging, facturen) en wat blijft bij de architect en de aannemers?",
      },
    ],
    // From the project texts in Strapi: Voorhoutkaai names "de coördinatie en
    // planning", Nieuwland 28-40 was done for "onze klant", Belfortstraat was
    // "een opdracht". Still H16's call which ones show coördinatie best.
    realisaties: [
      "voorhoutkaai-25-gent",
      "nieuwland-28-40-gent",
      "belfortstraat-29-onderstraat-75-a-gent",
    ],
    realisatiesBevestigd: false,
    realisatiesVraag:
      "Tonen deze drie realisaties goed wat bouwcoördinatie door H16 inhoudt? Bevestig per project de rol van H16, of kies andere.",
    faq: [
      {
        vraag: "Wat kost bouwcoördinatie?",
        antwoord: null,
        notitie:
          "Hoe rekent H16: een percentage van de bouwkost, een vast bedrag, per uur? Geen enkele concurrent in Gent toont dit; een eerlijk antwoord onderscheidt H16.",
      },
      {
        vraag: "Wat is het verschil tussen een bouwcoördinator, een architect en een totaalaannemer?",
        antwoord: null,
        notitie: "In twee of drie zinnen, vanuit hoe H16 samenwerkt met architecten en aannemers.",
      },
      {
        vraag: "In welke regio werkt H16?",
        antwoord:
          "In Gent, Oosterzele, Merelbeke en de rest van Oost-Vlaanderen.",
      },
      {
        vraag: "Is een eerste gesprek vrijblijvend?",
        antwoord: null,
        notitie: "De homepage belooft 'vrijblijvend advies'. Klopt: eerste gesprek gratis en zonder verplichting?",
      },
    ],
    // Prefills the contact form's subject via /contact?dienst=<slug>.
    onderwerp: DIENST_ONDERWERP.bouwcoordinatie,
  },

  projectontwikkeling: {
    slug: "projectontwikkeling",
    ready: false,
    naam: "Projectontwikkeling",
    // "Gent en Oost-Vlaanderen" is the firm's stated werkgebied (llms.txt,
    // Organization areaServed); the acquisition area itself is a vraag below.
    title: "Projectontwikkeling in Gent en Oost-Vlaanderen",
    description:
      "H16 koopt gronden en panden aan om ze te ontwikkelen: nieuwbouw, totaalrenovatie en herbestemming. Bent u eigenaar en wilt u verkopen?",
    h1: "Projectontwikkeling in Gent en Oost-Vlaanderen",
    lead:
      "Bent u eigenaar en wilt u liever een grond of pand verkopen? Wij zijn ervaren en geïnteresseerd.",
    secties: [
      {
        label: "Wat we zoeken",
        titel: "Welke panden en gronden",
        tekst: null,
        vraag:
          "Wat zoekt H16 precies: gronden, herenhuizen, bedrijfspanden, panden om op te splitsen of te herbestemmen? In welke gemeenten van het werkgebied (Gent, Oosterzele, Merelbeke, Oost-Vlaanderen), en vanaf welke omvang? Pas zo nodig ook de titel aan.",
      },
      {
        label: "Werkwijze",
        titel: "Hoe een verkoop aan H16 verloopt",
        tekst: null,
        vraag:
          "Wat gebeurt er nadat een eigenaar contact opneemt: bezoek, bod, termijn? Wat maakt verkopen aan H16 anders dan via een makelaar?",
      },
      {
        label: "Aanpak",
        titel: "Small is beautiful",
        tekst: [
          "De kleinschaligheid van H16 doet ruimte ontstaan voor maatwerk, focus, reactiviteit en feilloze communicatie met één duidelijk aanspreekpunt.",
        ],
      },
    ],
    // None yet: every realisatie text in Strapi describes work for a client or
    // an investor, not a property H16 bought and developed itself.
    realisaties: [],
    realisatiesBevestigd: false,
    realisatiesVraag:
      "Welke realisaties heeft H16 zelf aangekocht en ontwikkeld? Volgens de projectteksten waren Voorhoutkaai 25 en Nieuwland 28-40 opdrachten voor een investeerder of klant. Tot dit bevestigd is, toont deze pagina geen realisaties.",
    faq: [
      {
        vraag: "Koopt H16 ook panden die gerenoveerd moeten worden?",
        antwoord: null,
        notitie: "Ja/nee, en welke staat is nog interessant?",
      },
    ],
    onderwerp: DIENST_ONDERWERP.projectontwikkeling,
  },
};

export const DIENST_LIST = Object.values(DIENSTEN);
