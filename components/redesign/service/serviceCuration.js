// Which photographs the two service pages show, and how each is cropped.
// Same shape as data/homeCuration.js (Strapi upload paths, intrinsic size,
// object-position per breakpoint: `sm` below 768px, `md` from 768px). The
// loader uses a curated image only while it is still in that project's
// gallery (or is its thumbnail), and falls back to the thumbnail otherwise.
//
// Alt texts are from the photo curation (scratchpad photo-picks.json) and
// data/homeCuration.js; they describe what is visible and name the project,
// never a material or a fact the CMS does not confirm.
import { PLATES, SPREAD } from "../../../data/homeCuration";

const plate = (slug) => PLATES.find((p) => p.slug === slug)?.image;

export const SERVICE_CURATION = {
  bouwcoordinatie: {
    // Afb. 1: execution quality in one frame — the historic panelling of the
    // Belfortstraat, kept and finished. Portrait 2:3 in a 4:5 box; 60% keeps
    // the frieze (y 50–80%) with a panel above and below it.
    opener: {
      slug: "belfortstraat-29-onderstraat-75-a-gent",
      image: {
        path: "/uploads/OS_75_A_1_6_13df4c506e.jpg",
        w: 5504,
        h: 8256,
        op: { sm: "50% 60%", md: "50% 60%" },
        alt: "Historische lambrisering met ornamentfries, groen geschilderd, in het gerenoveerde pand van het project Belfortstraat 29 – Onderstraat 75A in Gent.",
      },
    },
    // Realisaties, keyed by slug; the order is the one in data/diensten.js.
    realisaties: {
      "voorhoutkaai-25-gent": plate("voorhoutkaai-25-gent"),
      "nieuwland-28-40-gent": plate("nieuwland-28-40-gent"),
      // Not the homepage's living room (Afb. 1 there): that photo has a TV at
      // its right edge and may never sit in a box wider than 1:1, and this
      // plate is 3:2. The beams tell the renovation just as well.
      "belfortstraat-29-onderstraat-75-a-gent": {
        path: "/uploads/DSC_0372_85bf3abe42.jpg",
        w: 3000,
        h: 2000,
        op: { sm: "45% 50%", md: "50% 50%" },
        alt: "Leefruimte onder houten dakbalken met visgraatparket, in het project Belfortstraat 29 – Onderstraat 75A in Gent.",
      },
    },
  },

  projectontwikkeling: {
    // Afb. 1: the corner house itself, H16's own development. A 1200×1600
    // phone photo: never wider than ~490 CSS px (the opener is 368 at most
    // below 1536px). 3:4 in a 4:5 box: 80% trims the sky and keeps the
    // roofline (y≈8%) and the pavement (y≈90%).
    opener: {
      slug: SPREAD.projectontwikkeling.slug,
      image: {
        ...SPREAD.projectontwikkeling.image,
        op: { sm: "50% 80%", md: "50% 80%" },
      },
    },
    realisaties: {
      // The CMS thumbnail, an interior, so the opener's facade is not shown
      // twice on one page.
      "annonciadenstraat-21-stoppelstraat-6": {
        path: "/uploads/IMG_20240203_WA_0003_9123f2c27a.jpg",
        w: 1536,
        h: 2048,
        op: { sm: "50% 45%", md: "50% 45%" },
        alt: "Zolderverdieping met twee dakramen en een witte borstwering rond het trapgat, in het hoekpand Annonciadenstraat 21 - Stoppelstraat 6 in Gent.",
      },
    },
  },
};
