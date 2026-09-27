import { toHomeProject } from "../../../lib/api";
import { assetUrl } from "../../../lib/seo";
import { isProductionHost, v2fetch } from "../../../lib/staging";
import { SHOW_PRICE } from "../../../data/homeCuration";
import { SERVICE_CURATION } from "./serviceCuration";

// Server-side loader for the redesigned service pages (staging only).
//
// Unlike lib/servicePage.js this never looks at `ready`: the whole redesign
// is a 404 on the production host, and on staging a draft renders with only
// what is filled in — no "Tekst volgt" boxes. Every field in data/diensten.js
// may be null, so everything below is read defensively. Only the strings the
// page shows become props; the notes and questions for H16 stay here.

const arr = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);
const str = (v) => (typeof v === "string" ? v : "");

// Soft hyphens for the display-size h1 on narrow phones (only used below
// ~340px, where «Projectontwikkeling» is wider than the column).
const SOFT = [
  ["Bouwcoördinatie", "Bouw­coördinatie"],
  ["Projectontwikkeling", "Project­ontwikkeling"],
];
const softHyphens = (s) =>
  SOFT.reduce((out, [word, soft]) => out.split(word).join(soft), s);

// Headings in English get lang="en" so a screen reader switches voice.
const ENGLISH = [/^small is beautiful$/i];

const slugify = (s) =>
  str(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// toHomeProject plus the ORIGINAL thumbnail (it projects the "large" format),
// which is the fallback image when a curated one has left the gallery.
function toServiceProject(entry) {
  const p = toHomeProject(entry);
  const node = entry?.attributes?.thumbnail?.data;
  const t = node?.attributes || node || {};
  return {
    ...p,
    thumbOriginal: t.url
      ? { path: t.url, w: t.width || null, h: t.height || null }
      : null,
  };
}

const ratioOf = (w, h) => (w && h ? Math.round((w / h) * 1000) / 1000 : null);

function plateImage(img) {
  return {
    src: assetUrl(img.path),
    alt: str(img.alt),
    op: img.op || { sm: "50% 50%", md: "50% 50%" },
    ratio: ratioOf(img.w, img.h),
  };
}

// A curated image while it is still in the project's gallery (or is its
// thumbnail); otherwise the thumbnail, centred, with the project name as alt.
// An image already shown on the page is skipped when there is another one;
// a realisatie is never dropped just to avoid a repeat.
function resolveImage(curated, p, used) {
  if (!p) return null;
  const candidates = [];
  if (
    curated &&
    (p.galleryPaths.includes(curated.path) ||
      p.thumbOriginal?.path === curated.path)
  ) {
    candidates.push(curated);
  }
  const t = p.thumbOriginal;
  if (t) candidates.push({ path: t.path, w: t.w, h: t.h, alt: p.naam });
  const pick = candidates.find((c) => !used.has(c.path)) || candidates[0];
  if (!pick) return null;
  used.add(pick.path);
  return plateImage(pick);
}

export async function loadService(slug, { req, res }) {
  if (isProductionHost(req)) return { notFound: true };

  // Server-only imports: the service copy (drafts and notes included) and
  // the four benefits never ship to the client as modules.
  const [{ DIENSTEN }, { VOORDELEN }] = await Promise.all([
    import("../../../data/diensten"),
    import("../../colab/ColabBenefits"),
  ]);
  const dienst = DIENSTEN[slug];
  if (!dienst) return { notFound: true };

  res?.setHeader?.(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=600",
  );

  const curation = SERVICE_CURATION[slug] || {};
  const naam = str(dienst.naam);

  // Sections: only what is written. Each one gets a stable, unique key for
  // its heading id.
  const keys = new Set();
  const uniqueKey = (base) => {
    let key = base || "sectie";
    for (let i = 2; keys.has(key); i += 1) key = `${base}-${i}`;
    keys.add(key);
    return key;
  };
  const secties = arr(dienst.secties)
    .map((s) => {
      const voordelen = s.voordelen ? arr(VOORDELEN) : [];
      const tekst = arr(s.tekst).filter((t) => typeof t === "string");
      const punten = arr(s.punten).filter((t) => typeof t === "string");
      const stappen = arr(s.stappen)
        .filter((st) => st.titel)
        .map((st) => ({ titel: str(st.titel), tekst: str(st.tekst) }));
      return {
        key: uniqueKey(s.id || slugify(s.label || s.titel)),
        id: s.id || null,
        label: str(s.label),
        titel: str(s.titel),
        lang: ENGLISH.some((re) => re.test(str(s.titel))) ? "en" : null,
        variant: voordelen.length
          ? "voordelen"
          : stappen.length
            ? "stappen"
            : "tekst",
        voordelen: voordelen.map((v) => ({
          naam: str(v.naam),
          tekst: str(v.tekst),
        })),
        tekst,
        punten,
        stappen,
      };
    })
    .filter(
      (s) =>
        s.titel &&
        (s.voordelen.length ||
          s.tekst.length ||
          s.punten.length ||
          s.stappen.length),
    );

  // Proof before process (as on the homepage): the realisaties go just before
  // the first section with steps, or after the first section otherwise.
  const stappenAt = secties.findIndex((s) => s.variant === "stappen");
  const realisatiesAt =
    stappenAt >= 0 ? stappenAt : Math.min(1, secties.length);

  // Strapi: the confirmed realisaties plus the opener's project.
  const realisatieSlugs = dienst.realisatiesBevestigd
    ? arr(dienst.realisaties)
    : [];
  const wanted = [
    ...new Set([...realisatieSlugs, curation.opener?.slug].filter(Boolean)),
  ];
  const filters = wanted
    .map((s, i) => `filters[slug][$in][${i}]=${encodeURIComponent(s)}`)
    .join("&");
  const response = filters
    ? await v2fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?${filters}&populate[0]=thumbnail&populate[1]=afbeeldingen&pagination[limit]=100`,
      )
    : { data: [] };
  const bySlug = Object.fromEntries(
    (response?.data ?? [])
      .map(toServiceProject)
      .filter((p) => p.slug)
      .map((p) => [p.slug, p]),
  );

  const confirmed = new Set(realisatieSlugs);
  const publicProject = (p) => ({
    slug: p.slug,
    naam: p.naam,
    korte: p.korte,
    aard: p.aard,
    jaar: p.jaar,
    beschikbaarheid: p.beschikbaarheid,
    // H16's role, only where it is confirmed for this service.
    rol: confirmed.has(p.slug) ? naam : "",
    // The asking price only for a sale, never for a rental.
    prijs: SHOW_PRICE && /^te koop$/i.test(p.beschikbaarheid) ? p.prijs : "",
  });

  const used = new Set();
  const openerProject = curation.opener && bySlug[curation.opener.slug];
  const openerImage =
    openerProject && resolveImage(curation.opener.image, openerProject, used);
  const opener = openerImage
    ? { image: openerImage, project: publicProject(openerProject) }
    : null;

  // Keep the order chosen in data/diensten.js; drop a slug that no longer
  // exists (or has no image left) instead of rendering an empty plate.
  const realisaties = realisatieSlugs
    .map((s) => {
      const p = bySlug[s];
      const image = p && resolveImage(curation.realisaties?.[s], p, used);
      return image ? { image, project: publicProject(p) } : null;
    })
    .filter(Boolean);

  // Only answered questions — the same list feeds the FAQPage JSON-LD.
  const faq = arr(dienst.faq)
    .filter((q) => q.vraag && q.antwoord)
    .map((q) => ({ vraag: str(q.vraag), antwoord: str(q.antwoord) }));

  // Werkgebied for the back cover: the «In welke regio …» answer, as on the
  // homepage (this service's own first, then any other service's).
  const regio =
    [dienst, ...Object.values(DIENSTEN)]
      .flatMap((d) => arr(d.faq))
      .find((q) => /regio/i.test(str(q.vraag)) && q.antwoord)?.antwoord || "";

  const h1 = str(dienst.h1) || naam;

  return {
    props: {
      dienst: {
        slug,
        naam,
        title: str(dienst.title) || naam,
        description: str(dienst.description),
        h1,
        h1Display: softHyphens(h1),
        lead: str(dienst.lead),
      },
      secties,
      realisatiesAt,
      opener,
      realisaties,
      faq,
      werkgebied: str(regio)
        .replace(/^In\s+/, "")
        .replace(/\.$/, ""),
    },
  };
}
