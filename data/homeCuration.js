// Which photographs the homepage redesign shows, and how each is cropped.
//
// Paths are Strapi upload paths (content-hashed, so stable); the page checks
// each one against the project's gallery at request time and falls back to
// the project thumbnail if an image was removed in the CMS. Crops are CSS
// object-position values per breakpoint (`sm` below 768px, `md` from 768px).

// Show "Vraagprijs: €…" on the for-sale plate. On for staging so the client
// sees it and decides; the price itself comes from the CMS.
export const SHOW_PRICE = true;

export const SPREAD = {
  bouwcoordinatie: {
    slug: "belfortstraat-29-onderstraat-75-a-gent",
    image: {
      path: "/uploads/OS_75_A_5_22_90e5a7b5f3.jpg",
      w: 8256,
      h: 5504,
      // Afb. 1: this box must NEVER be wider than 1:1 — a TV sits at
      // x 75–93% of this photo, and 8% 50% on a square keeps it out.
      op: { sm: "16% 50%", md: "8% 50%" },
      alt: "Woonkamer met houten plankenvloer en zicht op kerktorens, in een appartement van het project Belfortstraat 29 – Onderstraat 75A in Gent.",
    },
  },
  projectontwikkeling: {
    slug: "annonciadenstraat-21-stoppelstraat-6",
    image: {
      // A 1200×1600 phone photo: never render it wider than ~490 CSS px.
      path: "/uploads/IMG_20240213_WA_0030_9a89541dbb.jpg",
      w: 1200,
      h: 1600,
      op: { sm: "50% 50%", md: "50% 50%" },
      alt: "Wit gerenoveerd hoekpand met erker op de hoek van de Annonciadenstraat en de Stoppelstraat in Gent.",
    },
  },
};

// Realisaties plates, in order A (large), B (portrait), C (landscape).
export const PLATES = [
  {
    slug: "voorhoutkaai-25-gent",
    size: "A",
    image: {
      path: "/uploads/IMGP_2151_1_1_8ee2c4e2a1.jpg",
      w: 6767,
      h: 4386,
      op: { sm: "60% 50%", md: "50% 35%" },
      alt: "Zolderverdieping met houten dakspanten, een dakraam en ingebouwde kasten in de tot kantoor verbouwde schrijnwerkerij aan de Voorhoutkaai 25 in Gent.",
    },
  },
  {
    slug: "nieuwland-28-40-gent",
    size: "B",
    image: {
      path: "/uploads/0004_DSCF_6882_Melvinkobe_Photography_38f29cf980.jpg",
      w: 1800,
      h: 1350,
      op: { sm: "58% 50%", md: "58% 50%" },
      alt: "Leef- en eetruimte met zichtbetonbalken en ingebouwde kasten in een woning van het project Nieuwland 28-40 in Gent.",
    },
  },
  {
    slug: "te-koop-nieuwland-28",
    size: "C",
    image: {
      path: "/uploads/terras6_d66e9047a1.jpg",
      w: 4915,
      h: 3221,
      op: { sm: "62% 35%", md: "65% 30%" },
      alt: "Zonnig terras met tuintafel voor de hoge glasgevel van de nieuwbouwwoning Nieuwland 28 in Gent.",
    },
  },
];

// Full-bleed plate between the werkwijze and the people (768px and up only).
export const INTERLUDE = {
  slug: "nieuwland-28-40-gent",
  image: {
    path: "/uploads/H16_Nieuwland_38_highq_20_c1986e0e84.jpg",
    w: 8256,
    h: 5504,
    op: { sm: "50% 55%", md: "50% 55%" },
    alt: "Trappenhuis met beige treden en een witte borstwering, van bovenaf gezien, in het project Nieuwland 28-40 in Gent.",
  },
};
