// `sizes` for a plate, computed rather than hand-tuned per photo: an
// object-cover image renders wider than its box whenever the photo is wider
// than the box (a 3:2 photo in a 4:5 box renders 1.875× the box width), and
// next/image must request that width or the crop is soft.
//
// `widths`: box width per breakpoint, widest first, as [minViewport, px] or
// [0, "75vw"] for the phone fallback. `box`: box aspect (w/h) below and from
// 768px. `ratio`: the photo's aspect (w/h); unknown means no overscan.
export function coverSizes(widths, box, ratio) {
  return widths
    .map(([min, w]) => {
      const boxRatio = min >= 768 ? box.md : box.sm;
      const k = ratio && boxRatio ? Math.max(1, ratio / boxRatio) : 1;
      const value =
        typeof w === "number"
          ? `${Math.ceil(w * k)}px`
          : `${Math.ceil(parseFloat(w) * k)}vw`;
      return min ? `(min-width:${min}px) ${value}` : value;
    })
    .join(", ");
}

// Box widths of the service template's plates (container 1408 / 1152 / 944 /
// 720 content px at 1536 / 1280 / 1024 / 768; a column n wide is
// 119.33n−24 / 98n−24 / 80.67n−24 px).
export const WIDTHS = {
  // Title-page plate: 4 columns from 1024, 45% at 768, 3/4 on phones.
  opener: [
    [1536, 453],
    [1280, 368],
    [1024, 299],
    [768, 324],
    [0, "75vw"],
  ],
  // Realisaties A: 8 columns, full width at 768, full bleed on phones.
  large: [
    [1536, 931],
    [1280, 760],
    [1024, 621],
    [768, 720],
    [0, "100vw"],
  ],
  // Portrait beside a landscape: 5 columns, 80% on phones.
  portrait: [
    [1536, 573],
    [1280, 466],
    [1024, 379],
    [768, 286],
    [0, "80vw"],
  ],
  // Portrait alone in its row: 6 columns.
  portraitWide: [
    [1536, 692],
    [1280, 564],
    [1024, 460],
    [768, 372],
    [0, "80vw"],
  ],
  // Landscape beside a portrait: 6 columns, full bleed on phones.
  landscape: [
    [1536, 692],
    [1280, 564],
    [1024, 460],
    [768, 372],
    [0, "100vw"],
  ],
  // The single realisatie: 5 columns from 1024, 6 at 768, 80% on phones.
  single: [
    [1536, 573],
    [1280, 466],
    [1024, 379],
    [768, 372],
    [0, "80vw"],
  ],
};

export const BOX = {
  portrait: { sm: 4 / 5, md: 4 / 5 },
  landscape: { sm: 4 / 3, md: 3 / 2 },
};
