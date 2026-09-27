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
// widget on staging takes the comments). Flip `ready` once H16 has approved
// the copy — sections and questions still left at `null` are then skipped,
// never shown.
//
// Copy rules: formal "u" (the site's client-facing register), no invented
// numbers or claims. Sources, marked per block:
//   [site]  current site copy (components/*)
//   [cms]   the project texts in Strapi
//   [2023]  earlier H16 site copy, recovered from git history
//           (components/colab/ColabBanner.jsx before 961dcef / 0103e66) —
//           removed from the site since, so H16 must confirm it still holds.
// What only H16 can say is a `vraag` for them.
//
// Realisaties are proof only once H16 confirms its role on them
// (`realisatiesBevestigd`). Until then a draft asks, and a ready page hides
// the grid rather than publish an unconfirmed claim.
import { company } from "./companyData";
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
    // [site] ColabServices
    lead:
      "Staat u voor een bouwproject maar loopt u verloren? Wij analyseren graag samen uw specifieke vastgoedsituatie of vragen, en coördineren uw vastgoedproject met de grootste zorg.",
    secties: [
      {
        label: "Wat we doen",
        titel: "Wat H16 voor u doet",
        // [site] the four benefits from /samenwerken.
        voordelen: true,
      },
      {
        label: "Voor wie",
        titel: "Voor wie",
        tekst: [
          // [site] ColabServices + ColabBenefits
          "Voor wie een bouwproject wil realiseren en zeer concrete hulp zoekt bij de effectieve uitvoering. Het realiseren van een droomhuis of het neerzetten van een rendabele vastgoedinvestering: twee aparte werelden, en voor beide zet H16 van bij het begin de focus juist.",
        ],
        // [2023] "Wij coördineren uw vastgoedproject met de grootste zorg:"
        // (interieuradvies, also on that list, is left out: it was dropped
        // from the site in 2024).
        punten: [
          "Nieuwbouw en renovatie",
          "Kleine en grote projecten",
          "Residentiële en commerciële projecten",
          "Zowel met als zonder architect",
          "Van A tot Z, of van A naar B",
        ],
      },
      {
        label: "Werkwijze",
        titel: "Zo werken we",
        tekst: [
          // [site] AboutPeople + AboutValue
          "Gilles De Brabander (construction manager) en Elena Versyp (office manager) volgen uw project persoonlijk op, met een betrokkenheid op élke dag van het bouwproces. U heeft één duidelijk aanspreekpunt.",
        ],
        // The order is the natural one; every activity is named in the copy.
        stappen: [
          {
            titel: "Analyse en doelstelling",
            // [site] ColabServices + ColabBenefits
            tekst:
              "We analyseren samen uw vastgoedsituatie en uw vragen, en bepalen de juiste doelstelling.",
          },
          {
            titel: "Voorbereiding en planning",
            // [2023] Snelheid
            tekst:
              "Door degelijk voorbereidingswerk en een accurate planning volgen de werken elkaar mooi en in een logische volgorde op.",
          },
          {
            titel: "Aannemers en prijzen",
            // [site] Budgetcontrole, AboutValue; [2023] Budgetcontrole
            tekst:
              "H16 werkt uitsluitend met betrouwbare vakmannen en onderhandelt met de aannemers een goede prijs.",
          },
          {
            titel: "Opvolging op de werf",
            // [2023] Kwaliteit; [site] Kwaliteit
            tekst:
              "Dagelijkse opvolging en controle op de site zelf zijn onmisbaar. Met een doenersmentaliteit zorgt H16 ervoor dat alles gedaan wordt, en op een degelijke manier.",
          },
          {
            titel: "Budget tot de oplevering",
            // [site] Budgetcontrole + HomeHero ("van begin tot eind")
            tekst:
              "Élke factuur wordt gecontroleerd en het budget wordt constant opgevolgd, van begin tot eind.",
          },
        ],
      },
    ],
    // [cms] Voorhoutkaai: "Naast de coördinatie en planning namen wij het
    // technisch tekenwerk voor onze rekening." Nieuwland 28-40 was done for
    // "onze klant", Belfortstraat was "een opdracht" — H16's role there is
    // not spelled out, hence the question.
    realisaties: [
      "voorhoutkaai-25-gent",
      "nieuwland-28-40-gent",
      "belfortstraat-29-onderstraat-75-a-gent",
    ],
    realisatiesBevestigd: false,
    realisatiesVraag:
      "Voorhoutkaai 25 noemt de coördinatie en planning uitdrukkelijk. Deed H16 ook op Nieuwland 28-40 en Belfortstraat 29 de bouwcoördinatie? Dan mag dit blok zo online.",
    faq: [
      {
        vraag: "Wat kost bouwcoördinatie?",
        // [2023] Budgetcontrole (both versions)
        antwoord:
          "De coördinatiekost van H16 wordt geïntegreerd over het volledige project. Daar staat een besparing tegenover: H16 onderhandelt met de aannemers een goede prijs, en omdat H16 de coördinatie op zich neemt, wordt de opdracht voor de aannemer eenvoudiger en daalt zijn eigen coördinatiekost. Vraag vrijblijvend meer informatie over uw project.",
      },
      {
        vraag: "Wat is het verschil tussen een bouwcoördinator, een architect en een aannemer?",
        // [site] ColabPeers, VOORDELEN; [2023] "Zowel werken met als zonder architect"
        antwoord:
          "De architect ontwerpt, de aannemers voeren de werken uit, en H16 coördineert: voorbereiding, planning, prijsonderhandeling, opvolging op de werf en controle van het budget. H16 werkt zowel met als zonder architect. Wil een architect zich op het ontwerp focussen, dan nemen wij graag een deel van het uitvoerend werk uit handen.",
      },
      {
        vraag: "In welke regio werkt H16?",
        // [site] werkgebied (llms.txt, Organization areaServed)
        antwoord: "In Gent, Oosterzele, Merelbeke en de rest van Oost-Vlaanderen.",
      },
      {
        vraag: "Kost het iets om mijn vraag voor te leggen?",
        // [site] ContactForm ("Vrijblijvend en gratis") + ContactBanner
        antwoord: `Nee, dat is vrijblijvend en gratis. Gilles of Elena antwoordt u zo snel mogelijk. Liever meteen iemand aan de lijn? Bel ${company.phone}.`,
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
    // Organization areaServed).
    title: "Projectontwikkeling in Gent en Oost-Vlaanderen",
    description:
      "H16 geeft een nieuwe invulling aan huizen en gronden in Gent en Oost-Vlaanderen. Bent u eigenaar en wilt u een grond of pand verkopen?",
    h1: "Projectontwikkeling in Gent en Oost-Vlaanderen",
    // [site] ColabServices
    lead:
      "Bent u eigenaar en wilt u liever een grond of pand verkopen? Wij zijn ervaren en geïnteresseerd.",
    secties: [
      {
        label: "Wat we doen",
        titel: "Een nieuwe invulling voor huizen en gronden",
        tekst: [
          // [2023] old hero "Wij geven een nieuwe invulling aan huizen en gronden."
          // + [site] AboutIntro
          "H16 geeft een nieuwe invulling aan huizen en gronden. Het is een jong bedrijf met familiale wortels, ontstaan uit passie voor vastgoed; een passie die van generatie op generatie is doorgegeven.",
          // [cms] the realisatie texts — framed as experience with the
          // building types, not as H16's own developments.
          "Die ervaring komt uit heel verschillende panden: twee statige herenwoningen in de Belfortstraat werden vijf appartementen en een wijnbar, een 18e-eeuwse leerlooierij aan het Nieuwland werd zeven woonentiteiten, en een oude schrijnwerkerij aan de Voorhoutkaai werd een kantoorruimte.",
        ],
      },
      {
        label: "Werkwijze",
        titel: "Hoe een verkoop aan H16 verloopt",
        // Nothing on the site or in the CMS says this; stays a question and
        // is left out of the published page if unanswered.
        tekst: null,
        vraag:
          "Wat gebeurt er nadat een eigenaar contact opneemt: bezoek, bod, termijn? Welke gronden en panden zoekt H16, en vanaf welke omvang?",
      },
      {
        label: "Aanpak",
        titel: "Small is beautiful",
        tekst: [
          // [site] AboutValue + AboutPeople
          "De kleinschaligheid van H16 doet ruimte ontstaan voor maatwerk, focus, reactiviteit en feilloze communicatie met één duidelijk aanspreekpunt. Gilles De Brabander en Elena Versyp leiden het bedrijf zelf en werken zeer persoonlijk en gefocust.",
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
        vraag: "In welke regio zoekt H16 gronden en panden?",
        // [site] werkgebied
        antwoord: "In Gent, Oosterzele, Merelbeke en de rest van Oost-Vlaanderen.",
      },
      {
        vraag: "Kost het iets om mijn pand of grond voor te stellen?",
        // [site] ContactForm ("Vrijblijvend en gratis")
        antwoord: `Nee, dat is vrijblijvend en gratis. Stuur ons een bericht of bel ${company.phone}.`,
      },
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
