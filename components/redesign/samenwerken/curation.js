// Which photograph proves which voordeel on /samenwerken (redesign), and how
// each is cropped. Keyed by the voordeel's name in components/colab/
// ColabBenefits.jsx (VOORDELEN), so a renamed or reordered voordeel loses its
// plate instead of showing the wrong one.
//
// All three projects are confirmed bouwcoördinatie realisaties
// (data/diensten.js). Paths are Strapi upload paths (the originals, not
// large_), checked against the project's gallery at request time; a photo
// that left the CMS drops its plate and the «Afb. n» numbering closes up —
// the voordeel itself still renders. Crops are CSS object-position values
// (`sm` below 768px, `md` from 768px).
//
// Deliberately none of the homepage's plates (Belfortstraat g12, Voorhoutkaai
// g06, Nieuwland g03/g15, terras6, the Annonciadenstraat corner) nor /about's
// (Nieuwland g16, Belfortstraat g02).
export const VOORDEEL_PLATES = {
  // Afb. 1, landscape. 3:2 photo: exact in the 3:2 box from 768px, 1.125×
  // wider than the 4:3 phone box (the crop takes the white partition on the
  // right first).
  "Bepalen juiste doelstelling": {
    slug: "belfortstraat-29-onderstraat-75-a-gent",
    image: {
      path: "/uploads/DSC_0372_85bf3abe42.jpg",
      w: 3000,
      h: 2000,
      op: { sm: "35% 50%", md: "50% 50%" },
      alt: "Leefruimte onder houten dakbalken met visgraatparket, in een van de vijf appartementen van het project Belfortstraat 29 – Onderstraat 75A in Gent.",
    },
  },
  // Afb. 2, portrait. A straight run from the trusses to the stair; 2:3 in a
  // 4:5 box keeps the trusses (top) and trims the floor.
  Snelheid: {
    slug: "voorhoutkaai-25-gent",
    image: {
      path: "/uploads/IMGP_2145_1_1_32eddc6057.jpg",
      w: 4341,
      h: 6593,
      op: { sm: "50% 30%", md: "50% 30%" },
      alt: "Smalle witte doorgang onder houten dakspanten, met zicht op een houten trap, in de tot kantoorruimte gerenoveerde schrijnwerkerij aan de Voorhoutkaai 25 in Gent.",
    },
  },
  // Afb. 3, portrait. The kept frieze (y 50–80%); 50% 70% shows y 12–95%.
  Kwaliteit: {
    slug: "belfortstraat-29-onderstraat-75-a-gent",
    image: {
      path: "/uploads/OS_75_A_1_6_13df4c506e.jpg",
      w: 5504,
      h: 8256,
      op: { sm: "50% 70%", md: "50% 70%" },
      alt: "Historische lambrisering met ornamentfries, groen geschilderd, in het gerenoveerde pand van het project Belfortstraat 29 – Onderstraat 75A in Gent.",
    },
  },
  // Afb. 4, landscape. 4:3 photo: exact on phones, width-limited in the 3:2
  // box (trims a little ceiling, keeps the pendant lamps).
  Budgetcontrole: {
    slug: "nieuwland-28-40-gent",
    image: {
      path: "/uploads/0002_DSF_5720_Melvinkobe_Photography_6562853128.jpg",
      w: 1800,
      h: 1350,
      op: { sm: "50% 50%", md: "50% 60%" },
      alt: "Eethoek met een ronde tafel en houten stoelen naast een zwarte kastenwand en een glazen pui naar buiten, in een woning van het project Nieuwland 28-40 in Gent.",
    },
  },
};
