// The rhythm of the gallery: photographs are laid out in rows by their own
// orientation (Strapi width/height), never cropped. Pure functions, so the
// layout is the same on the server and the client.

export const isLandscape = (img) => img.width > img.height * 1.05;

// Rendered widths per column span at md / lg / xl / 2xl (container 720 /
// 944 / 1152 / 1408, 12 columns, 24px gutter). Plates keep their proportions, so there is
// no object-cover overscan to account for.
const WIDTHS = {
  4: [224, 299, 368, 453],
  5: [286, 379, 466, 573],
  6: [348, 460, 564, 692],
  7: [410, 541, 662, 811],
  10: [596, 783, 956, 1169],
};

const sizes = (cols, phone) => {
  const [md, lg, xl, xxl] = WIDTHS[cols];
  return `(min-width:1536px) ${xxl}px, (min-width:1280px) ${xl}px, (min-width:1024px) ${lg}px, (min-width:768px) ${md}px, ${phone}`;
};

// Full-bleed on phones: the plate runs to the screen edges, its caption keeps
// the gutter.
const BLEED = "-mx-4 sm:-mx-6 md:mx-0";
const BLEED_CAPTION = "px-4 sm:px-6 md:px-0";
// Bleeds off the right edge only (a smaller plate set against the edge).
const BLEED_RIGHT = "ml-auto -mr-4 sm:-mr-6 md:ml-0 md:mr-0";

// Row types:
//   wide   one landscape, 10 columns, alternately from the left or the right
//   pp     two portraits, two-up on phones; three variants in turn so a run
//          of portraits does not repeat one figure: 5 + 5 with the second
//          dropped (a stagger), 6 + 4 and 4 + 6 with the bottoms aligned
//   lp/pl  a landscape (7) and a portrait (4) in reading order, bottoms aligned
//   ll     two landscapes, 7 + 5 or 5 + 7, tops aligned
//   single a lone last portrait, 5 columns, centred
// Every third row opens on a single landscape when there is one, so the
// pairs are regularly broken by a wide, calm frame.
export function buildRows(items) {
  const rows = [];
  let i = 0;
  let k = 0;
  let pp = 0;
  while (i < items.length) {
    const a = items[i];
    const b = items[i + 1];
    const aL = isLandscape(a.image);
    const bL = b ? isLandscape(b.image) : false;
    let type;
    if (!b) type = aL ? "wide" : "single";
    else if (aL && k % 3 === 0) type = "wide";
    else if (aL && bL) type = "ll";
    else if (!aL && !bL) type = "pp";
    else type = aL ? "lp" : "pl";
    const take = type === "wide" || type === "single" ? 1 : 2;
    const variant = type === "pp" ? pp++ % 3 : 0;
    rows.push({
      type,
      variant,
      flip: k % 2 === 1,
      items: items.slice(i, i + take),
    });
    i += take;
    k += 1;
  }
  return rows;
}

// Portrait pairs with their bottoms aligned: [placement, columns] per plate.
const PAIRS = {
  1: [
    ["md:col-span-6", 6],
    ["md:col-span-4 md:col-start-9", 4],
  ],
  2: [
    ["md:col-span-4 md:col-start-2", 4],
    ["md:col-span-6 md:col-start-7", 6],
  ],
};

// Classes for the row box and for each plate in it: `className` places the
// figure, `caption` pads «Afb. n», `sizes` is the rendered width.
export function rowLayout({ type, flip, variant = 0 }) {
  switch (type) {
    case "wide":
      return {
        row: "md:grid md:grid-cols-12 md:gap-x-6",
        plates: [
          {
            className: `${BLEED} md:col-span-10 ${flip ? "md:col-start-3" : ""}`,
            caption: BLEED_CAPTION,
            sizes: sizes(10, "100vw"),
          },
        ],
      };
    case "pp":
      if (PAIRS[variant]) {
        return {
          row: "grid grid-cols-2 items-end gap-x-4 sm:gap-x-6 md:grid-cols-12",
          plates: PAIRS[variant].map(([className, cols]) => ({
            className,
            sizes: sizes(cols, "50vw"),
          })),
        };
      }
      return {
        row: "grid grid-cols-2 items-start gap-x-4 sm:gap-x-6 md:grid-cols-12",
        plates: [
          {
            className: `md:col-span-5 ${flip ? "md:col-start-2" : ""}`,
            sizes: sizes(5, "50vw"),
          },
          {
            className: "mt-12 md:col-span-5 md:col-start-8 md:mt-24 lg:mt-32",
            sizes: sizes(5, "50vw"),
          },
        ],
      };
    case "lp":
      return {
        row: "md:grid md:grid-cols-12 md:items-end md:gap-x-6",
        plates: [
          {
            className: `${BLEED} md:col-span-7`,
            caption: BLEED_CAPTION,
            sizes: sizes(7, "100vw"),
          },
          {
            className: `mt-12 w-2/3 ${BLEED_RIGHT} md:col-span-4 md:col-start-9 md:mt-0 md:w-auto`,
            sizes: sizes(4, "67vw"),
          },
        ],
      };
    case "pl":
      return {
        row: "md:grid md:grid-cols-12 md:items-end md:gap-x-6",
        plates: [
          {
            className: "w-2/3 md:col-span-4 md:w-auto",
            sizes: sizes(4, "67vw"),
          },
          {
            className: `mt-12 ${BLEED} md:col-span-7 md:col-start-6 md:mt-0`,
            caption: BLEED_CAPTION,
            sizes: sizes(7, "100vw"),
          },
        ],
      };
    case "ll":
      return {
        row: "md:grid md:grid-cols-12 md:items-start md:gap-x-6",
        plates: flip
          ? [
              {
                className: `${BLEED} md:col-span-5`,
                caption: BLEED_CAPTION,
                sizes: sizes(5, "100vw"),
              },
              {
                className: `mt-12 w-4/5 ${BLEED_RIGHT} md:col-span-7 md:col-start-6 md:mt-0 md:w-auto`,
                sizes: sizes(7, "80vw"),
              },
            ]
          : [
              {
                className: `${BLEED} md:col-span-7`,
                caption: BLEED_CAPTION,
                sizes: sizes(7, "100vw"),
              },
              {
                className: `mt-12 w-4/5 ${BLEED_RIGHT} md:col-span-5 md:col-start-8 md:mt-0 md:w-auto`,
                sizes: sizes(5, "80vw"),
              },
            ],
      };
    default:
      // single
      return {
        row: "md:grid md:grid-cols-12 md:gap-x-6",
        plates: [
          {
            className: `w-4/5 md:col-span-5 md:col-start-4 md:w-auto ${
              flip ? "ml-auto md:ml-0" : ""
            }`,
            sizes: sizes(5, "80vw"),
          },
        ],
      };
  }
}
