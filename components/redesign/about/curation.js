// Which photographs /about (redesign) shows, and how each is cropped.
//
// Same rules as data/homeCuration.js: paths are Strapi upload paths (the
// originals, not large_), checked against the project's gallery at request
// time. Unlike the homepage there is no thumbnail fallback — these are
// atmosphere plates, and a random crop with a name-only alt is worse than
// none — so a plate whose photo left the CMS is simply dropped and the
// numbering closes up. Crops are CSS object-position values (`sm` below
// 768px, `md` from 768px).
export const ABOUT_PLATES = {
  // Afb. 1, beside the title. A 2:3 photo in a 3:4 box: it only loses a
  // little floor at the bottom, so no horizontal overscan (sizes = box width).
  titel: {
    slug: "nieuwland-28-40-gent",
    image: {
      path: "/uploads/H16_Nieuwland_38_highq_06_a6b5425bf2.jpg",
      w: 5504,
      h: 8256,
      op: { sm: "50% 30%", md: "50% 30%" },
      alt: "Doorkijk naar een witte trap met lichte treden en zonlicht op de vloer, in een woning van het project Nieuwland 28-40 in Gent.",
    },
  },
  // Afb. 2, beside «uitsluitend met betrouwbare vakmannen». A 2:3 photo in a
  // square box: 50% 15% keeps the whole lever and its rosette (y 10–65%).
  meerwaarde: {
    slug: "belfortstraat-29-onderstraat-75-a-gent",
    image: {
      path: "/uploads/OS_75_A_1_14_48ff51b7ed.jpg",
      w: 5504,
      h: 8256,
      op: { sm: "50% 15%", md: "50% 15%" },
      alt: "Messing deurklink met ornamenten op een houten deur met glas, in het project Belfortstraat 29 – Onderstraat 75A in Gent.",
    },
  },
};
