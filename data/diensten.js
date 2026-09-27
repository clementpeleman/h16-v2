// Service landing pages: /bouwcoordinatie and /projectontwikkeling.
//
// Why they exist: "bouwcoördinatie Gent" is won today by thin one-city pages
// from micro-firms (some not even based in Gent), and /samenwerken spreads
// three services and two audiences over one 324-word page. A page per service,
// with H16's own realisaties as proof, is the realistic way to rank.
//
// DRAFTS. While `ready` (set in data/dienstMeta.js) is false a page is a 404 on the canonical host
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
import { DIENST_META } from "./dienstMeta";

export const DIENSTEN = {
  bouwcoordinatie: {
    slug: "bouwcoordinatie",
    // Publish switch lives in data/dienstMeta.js.
    ready: DIENST_META.bouwcoordinatie.ready,
    naam: DIENST_META.bouwcoordinatie.naam,
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
        label: "Uw voordeel",
        titel: "Wat H16 voor u doet",
        // [site] the four benefits from /samenwerken.
        voordelen: true,
      },
      {
        label: "Voor wie",
        titel: "Uw bouwproject onder onze vleugels",
        tekst: [
          // [site] ColabBenefits, verbatim
          "Elke dag van het bouwproces brengt nieuwe uitdagingen met zich mee. Het opvolgen ervan vraagt de juiste kennis, expertise en betrokkenheid. Voor velen is het realiseren van een bouwproject geen dagelijkse kost, voor H16 is het dat wel.",
          // [2023] Bouwcoördinatie, verbatim (je -> u)
          "Op zoek naar een zeer concrete hulp bij de effectieve uitvoering? Wij coördineren uw vastgoedproject met de grootste zorg:",
        ],
        // [2023] the list that followed (interieuradvies left out: it was
        // dropped from the site in 2024).
        punten: [
          "Nieuwbouw en renovatie",
          "Klein en groot",
          "Van A tot Z of van A naar B",
          "Zowel residentiële als commerciële projecten",
          "Zowel werken met als zonder architect",
        ],
      },
      {
        label: "Werkwijze",
        // The homepage's "Bekijk onze werkwijze" lands here (#werkwijze).
        id: "werkwijze",
        titel: "Onze werkwijze",
        tekst: [
          // [site] AboutPeople + AboutValue, verbatim
          "Met een betrokkenheid op élke dag van het bouwproces zorgen we voor kwaliteit in uitvoering, controle van het budget en de uitvoeringstermijn. De kleinschaligheid van H16 doet ruimte ontstaan voor maatwerk, focus, reactiviteit en feilloze communicatie met één duidelijk aanspreekpunt.",
        ],
        // The order is the natural one; the step texts are the [2023]
        // benefit texts, verbatim, which name every activity.
        stappen: [
          {
            titel: "Bepalen juiste doelstelling",
            // [2023]
            tekst:
              "Het realiseren van een droomhuis of het neerzetten van een rendabele vastgoedinvestering? Twee aparte werelden! Door vanaf het begin de focus juist te zetten, kan het gewenste doel bereikt worden.",
          },
          {
            titel: "Voorbereiding en planning",
            // [2023] Snelheid
            tekst:
              "Door degelijk voorbereidingswerk, een accurate opvolging van de planning en consequente communicatie wordt het bouwproces gestroomlijnd. Werken volgen elkaar mooi en in een logische volgorde op.",
          },
          {
            titel: "Opvolging op de werf",
            // [2023] Kwaliteit
            tekst:
              "Met een doenersmentaliteit zorgt H16 ervoor dat alles gedaan wordt én dat dit ook op een degelijke manier gebeurt. Dagelijkse opvolging en controle op de site zelf zijn onmisbaar.",
          },
          {
            titel: "Budgetcontrole",
            // [2023] Budgetcontrole
            tekst:
              "Controle van élke factuur en constante opvolging van het budget zorgen voor het bereiken van de gewenste doelstelling.",
          },
        ],
      },
    ],
    // H16 did the bouwcoördinatie on all three (Voorhoutkaai says so in the
    // CMS; Nieuwland 28-40 and Belfortstraat confirmed by Clement 2026-09-27).
    realisaties: [
      "voorhoutkaai-25-gent",
      "nieuwland-28-40-gent",
      "belfortstraat-29-onderstraat-75-a-gent",
    ],
    realisatiesBevestigd: true,
    faq: [
      {
        vraag: "Wat kost bouwcoördinatie?",
        // [2023] Budgetcontrole (both versions), near-verbatim
        antwoord:
          "De coördinatiekost van H16 is geïntegreerd over het volledige project. Succesvolle samenwerkingen met aannemers herhalen zich onder de vleugels van H16, wat onderhandelingsmarge over prijzen met zich meebrengt. Bovendien is de coördinatie van H16 aangenaam voor de aannemer die uitvoert op de site zelf, waardoor zijn coördinatiekost daalt. Zo levert de expertise van H16 de klant financieel voordeel op.",
      },
      {
        vraag: "Werkt H16 met of zonder architect?",
        // [2023] "Zowel werken met als zonder architect"; [site] ColabPeers
        antwoord:
          "Allebei. Een bouwproces is intensief en tijdrovend. Wil de architect zich focussen op ontwerp? Dan nemen wij graag een deel van het uitvoerend werk uit handen. Met kwalitatieve aannemers slaan we graag de handen in elkaar, voor een duurzame relatie waarbij klantgerichtheid en kwaliteit centraal staan.",
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
    onderwerp: DIENST_META.bouwcoordinatie.onderwerp,
  },

  projectontwikkeling: {
    slug: "projectontwikkeling",
    ready: DIENST_META.projectontwikkeling.ready,
    naam: DIENST_META.projectontwikkeling.naam,
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
          // [2023] old hero + [site] AboutIntro, verbatim
          "Wij geven een nieuwe invulling aan huizen en gronden. H16 is een jong bedrijf met familiale wortels dat ontstaan is uit passie voor vastgoed. Deze passie, doorgegeven van generatie op generatie, is binnen H16 de drijvende kracht van élke dag.",
          // [cms] wording from the realisatie texts — framed as experience,
          // not as H16's own developments.
          "Twee statige herenwoningen in de Belfortstraat werden vijf high-end appartementen en een prachtige wijnbar. Een 18e-eeuwse leerlooierij aan het Nieuwland transformeerde tot zeven splinternieuwe woonentiteiten. Een oude schrijnwerkerij aan de Voorhoutkaai werd een nieuwe prachtige werkplek.",
        ],
      },
      // A "Werkwijze" section (how a sale to H16 goes: visit, offer, term)
      // was taken out for now at Clement's request, 2026-09-27; add it back
      // here once H16 describes the process.
      {
        label: "Aanpak",
        titel: "Small is beautiful",
        tekst: [
          // [site] AboutPeople + AboutValue, verbatim
          "H16 wordt geleid door Gilles De Brabander en Elena Versyp. Door onze complementaire capaciteiten in ons klein bedrijf te bundelen, slagen we erin om zeer persoonlijk en gefocust te werken. De kleinschaligheid van H16 doet ruimte ontstaan voor maatwerk, focus, reactiviteit en feilloze communicatie met één duidelijk aanspreekpunt.",
        ],
      },
    ],
    // Annonciadenstraat is H16's own development (confirmed by Clement,
    // 2026-09-27).
    realisaties: ["annonciadenstraat-21-stoppelstraat-6"],
    realisatiesBevestigd: true,
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
        // Confirmed by H16 via Clement, 2026-09-27.
        antwoord:
          "Ja. Wij geven graag een nieuwe invulling aan huizen en gronden, ook wanneer er een grondige renovatie nodig is.",
      },
    ],
    onderwerp: DIENST_META.projectontwikkeling.onderwerp,
  },
};

export const DIENST_LIST = Object.values(DIENSTEN);
