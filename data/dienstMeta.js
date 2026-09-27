// The small, public facts about each service page: its name, whether it is
// published, and the contact-form subject it pre-fills.
//
// Deliberately separate from data/diensten.js. The header, footer and contact
// form are client code on every page; importing diensten.js there would ship
// every draft sentence and every note for H16 to h16.be. Anything the client
// needs about a service lives here.
//
// `ready` is THE publish switch: it makes the page render on h16.be (not a
// 404), adds it to the sitemap and llms.txt, and puts it in the header.
export const DIENST_META = {
  bouwcoordinatie: {
    naam: "Bouwcoördinatie",
    ready: true,
    onderwerp: "Vraag over bouwcoördinatie",
  },
  projectontwikkeling: {
    naam: "Projectontwikkeling",
    ready: true,
    onderwerp: "Pand of grond te koop aangeboden",
  },
};

export const LIVE_DIENSTEN = Object.entries(DIENST_META)
  .filter(([, d]) => d.ready)
  .map(([slug, d]) => ({ slug, ...d }));
