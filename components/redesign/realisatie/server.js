// Server-side shaping for the project page (used in getServerSideProps only).
// data/diensten.js is passed in by the page, which imports it dynamically, so
// its drafts and notes never reach the client bundle.
import {
  SHOW_PRICE,
  SPREAD,
  PLATES,
  INTERLUDE,
} from "../../../data/homeCuration";

// The alt texts written for the homepage plates, by Strapi upload path, so a
// photo that also appears in a project's gallery keeps its description.
const CURATED_ALT = Object.fromEntries(
  [...Object.values(SPREAD), ...PLATES, INTERLUDE]
    .map((slot) => slot?.image)
    .filter((image) => image?.path && image?.alt)
    .map((image) => [image.path, image.alt]),
);

const attrs = (node) => node?.attributes || node || {};

// Every photograph of the project as a plate: the ORIGINAL upload (next/image
// resizes it) with its own width and height, which set the plate's
// orientation and proportions. Same order and filter as toProjectDetail, so
// index n here is index n of project.afbeeldingen.
export function toPlates(entry, naam) {
  const list = (attrs(entry).afbeeldingen?.data ?? [])
    .map((img) => {
      const a = attrs(img);
      return {
        id: img?.id ?? null,
        url: a.url || "",
        width: a.width || 1600,
        height: a.height || 1200,
        cmsAlt: (a.alternativeText || "").trim(),
      };
    })
    .filter((img) => img.url);
  return list.map(({ cmsAlt, ...img }, i) => ({
    ...img,
    alt:
      cmsAlt ||
      CURATED_ALT[img.url] ||
      `${naam}, foto ${i + 1} van ${list.length}`,
  }));
}

// H16's role on each realisatie, only where the service page confirms it.
export function roleMap(DIENSTEN) {
  const rol = {};
  ["bouwcoordinatie", "projectontwikkeling"].forEach((key) => {
    const dienst = DIENSTEN[key];
    if (!dienst?.realisatiesBevestigd) return;
    (dienst.realisaties || []).forEach((slug) => {
      rol[slug] = { naam: dienst.naam, href: `/${dienst.slug}` };
    });
  });
  return rol;
}

// The price shown beside the enquiry button. A CMS price field wins (as on
// the current page). Until one exists, a sale shows the «Vraagprijs: €…» line
// of the description, under the same switch as the homepage plate; a rental
// never shows a price taken from the text.
export function displayPrice(entry, project) {
  const own = String(project.prijs || "").trim();
  if (own) return own.replace(/^Vraagprijs:\s*/i, "");
  if (!SHOW_PRICE || !/^te koop$/i.test(project.beschikbaarheid || "")) {
    return "";
  }
  return (
    attrs(entry).beschrijving?.match(/Vraagprijs:\s*(€\s?[\d.]+)/)?.[1] || ""
  );
}

// "Andere realisaties": what a plate and its caption need.
export function toRelated(entry, rol) {
  const a = attrs(entry);
  const thumb = attrs(a.thumbnail?.data);
  return {
    slug: a.slug ?? null,
    naam: a.naam ?? "",
    korte: a.korte_beschrijving ?? "",
    aard: a.aard ?? "",
    jaar: a.jaar ? String(a.jaar).substring(0, 4) : "",
    beschikbaarheid: a.beschikbaarheid ?? "",
    rol: rol[a.slug]?.naam || "",
    image: thumb.url
      ? {
          path: thumb.url,
          width: thumb.width || null,
          height: thumb.height || null,
          alt:
            (thumb.alternativeText || "").trim() ||
            CURATED_ALT[thumb.url] ||
            a.naam ||
            "",
        }
      : null,
  };
}
