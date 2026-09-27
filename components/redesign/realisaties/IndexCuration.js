import { PLATES, SPREAD } from "../../../data/homeCuration";

// Which photograph each project gets on the /realisaties index, and the plate
// shape it is cut to. The images and crops are the homepage's (one curated
// frame per project, checked by eye); this file only adds the shape, because
// a crop is valid for one box ratio and the index must not invent new ones.
//
//   landscape   4:3 below 768px, 3:2 from 768px
//   square      4:5 below 768px, 1:1 from 768px — never wider than 1:1
//   portrait    4:5
//   portrait34  3:4 (native ratio of a phone photo)
//
// `maxW` caps the box in CSS px where the source is small (1200 and 1800 px
// wide originals), so it is never enlarged past what it holds at 2× DPR.
//
// Read by getStaticProps only; the page checks each path against the
// project's gallery at request time and falls back to the CMS thumbnail.

const curated = Object.fromEntries(
  [...Object.values(SPREAD), ...PLATES].map((c) => [c.slug, c.image]),
);

const SHAPES = {
  "te-koop-nieuwland-28": { shape: "landscape" },
  "annonciadenstraat-21-stoppelstraat-6": { shape: "portrait34", maxW: 491 },
  "voorhoutkaai-25-gent": { shape: "landscape" },
  // 4:3 original cut to 4:5, as on the homepage.
  "nieuwland-28-40-gent": { shape: "portrait", maxW: 466 },
  // A TV sits at x 75–93% of this photo: square at most (8% 50% keeps it out).
  "belfortstraat-29-onderstraat-75-a-gent": { shape: "square" },
};

export const INDEX_IMAGES = Object.fromEntries(
  Object.entries(SHAPES)
    .filter(([slug]) => curated[slug])
    .map(([slug, s]) => [slug, { ...curated[slug], ...s }]),
);

// Shape for an uncurated photo (a CMS thumbnail), from its own proportions.
export function shapeOf(w, h) {
  if (!w || !h) return "portrait";
  const ar = w / h;
  if (ar > 1.15) return "landscape";
  if (ar < 0.87) return "portrait";
  return "square";
}
