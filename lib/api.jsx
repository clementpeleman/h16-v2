// Strapi fetch helper.
//
// During the v4 -> v5 migration this layer does two jobs so the components
// (which were written for Strapi v4) keep working against either backend:
//   1. Attaches a server-side API token (STRAPI_TOKEN) when present, so a
//      permission-locked v5 API is readable from getStaticProps/Paths.
//   2. Normalizes a Strapi v5 (flattened) response back into the v4 shape
//      the components consume: { data: [{ id, attributes: {...} }], meta }.
//      v4 responses are detected and passed through untouched.
//
// STRAPI_TOKEN is intentionally NOT prefixed with NEXT_PUBLIC_, so it stays
// server-only and never ships in the client bundle.

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// A related entry or media file: has a numeric id plus a v5 documentId,
// a media url, or an already-v4 `attributes` bag.
function isEntityLike(v) {
  return (
    isPlainObject(v) &&
    "id" in v &&
    ("documentId" in v || "url" in v || "attributes" in v)
  );
}

function wrapEntity(entity) {
  if (isPlainObject(entity) && "attributes" in entity && "id" in entity) {
    return entity; // already v4-shaped
  }
  const { id, ...rest } = entity;
  return { id, attributes: wrapAttributes(rest) };
}

function wrapAttributes(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    out[key] = wrapField(value);
  }
  return out;
}

function wrapField(value) {
  if (Array.isArray(value)) {
    // to-many relation / multi-media (or empty) -> { data: [...] }
    if (value.length === 0) return { data: [] };
    if (value.every(isEntityLike)) return { data: value.map(wrapEntity) };
    return value; // plain array of scalars
  }
  if (isEntityLike(value)) {
    // to-one relation / single media -> { data: {...} }
    return { data: wrapEntity(value) };
  }
  return value; // scalar or plain object (component / json)
}

export function normalizeStrapi(response) {
  if (!response || typeof response !== "object") return response;
  const { data } = response;
  if (data == null) return response;
  const sample = Array.isArray(data) ? data[0] : data;
  if (isPlainObject(sample) && "attributes" in sample) return response; // v4 passthrough
  const normData = Array.isArray(data) ? data.map(wrapEntity) : wrapEntity(data);
  return { ...response, data: normData };
}

export async function fetcher(url, options = {}) {
  const token = process.env.STRAPI_TOKEN;
  const finalOptions = token
    ? {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      }
    : options;

  // A CMS that is down, permission-locked or misconfigured used to surface as
  // `data: undefined` deep inside a component. Degrade to an empty result set
  // instead, loudly, so the pages render their empty states and the cause is
  // still visible in the build/server log.
  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      console.error(
        `Strapi request failed: ${response.status} ${response.statusText} — ${url}`
      );
      return { data: [], meta: {} };
    }

    const data = await response.json();
    return normalizeStrapi(data);
  } catch (error) {
    console.error(`Strapi request threw for ${url}:`, error);
    return { data: [], meta: {} };
  }
}

// Pick the best pre-generated Strapi image size instead of shipping the
// multi-MB original, and return the format's intrinsic dimensions with it.
// `node` is a normalized media node ({ id, attributes: { url, formats } }) or
// its attributes object; falls back to the original when the requested format
// (or any smaller one) is unavailable (e.g. SVGs).
//
// next/image needs the real aspect ratio to reserve the right box. These are
// mostly portrait photographs, and the hardcoded 100x90 the components used
// reserved a landscape box, so every card and gallery tile jumped on load.
export function media(node, preferred = "large") {
  const empty = { url: "", width: undefined, height: undefined };
  if (!node) return empty;
  const a = node.attributes || node;
  const formats = a.formats || {};
  for (const key of [preferred, "large", "medium", "small"]) {
    const f = formats[key];
    if (f && f.url) return { url: f.url, width: f.width, height: f.height };
  }
  return a.url
    ? { url: a.url, width: a.width, height: a.height }
    : empty;
}

// Projections.
//
// getStaticProps used to hand the raw Strapi response straight to the page, so
// every project's full record — every field, every image, every generated
// format — was serialised into __NEXT_DATA__ and shipped to the browser.
// /projects was 134 KB of JSON to render five cards, and the detail page also
// carried a `related` copy of every OTHER project for a component that no
// longer exists. These shape the data down to what the components actually
// read. Values are never `undefined`: Next cannot serialise it.

export function toProjectCard(entry) {
  const a = entry?.attributes ?? {};
  const thumb = media(a.thumbnail?.data, "medium");
  return {
    id: entry?.id ?? null,
    slug: a.slug ?? null,
    naam: a.naam ?? "",
    korteBeschrijving: a.korte_beschrijving ?? "",
    beschikbaarheid: a.beschikbaarheid ?? "",
    thumbnail: thumb.url
      ? { url: thumb.url, width: thumb.width ?? null, height: thumb.height ?? null }
      : null,
  };
}

export function toProjectDetail(entry) {
  const a = entry?.attributes ?? {};
  return {
    id: entry?.id ?? null,
    slug: a.slug ?? null,
    naam: a.naam ?? "",
    korteBeschrijving: a.korte_beschrijving ?? "",
    adres: a.adres ?? "",
    aard: a.aard ?? "",
    fase: a.fase ?? "",
    beschikbaarheid: a.beschikbaarheid ?? "",
    jaar: a.jaar ? String(a.jaar).substring(0, 4) : "",
    externeLink: a.externe_link ?? "",
    // Not yet a field in Strapi. Projected defensively so the offer block on
    // the detail page lights up the moment it is added, instead of the price
    // continuing to live as the last line of a markdown paragraph.
    prijs: a.prijs ?? a.vraagprijs ?? "",
    beschrijving: a.beschrijving ?? "",
    samenwerkingen: (a.samenwerkings?.data ?? [])
      .map((s) => s.attributes?.Naam)
      .filter(Boolean),
    afbeeldingen: (a.afbeeldingen?.data ?? [])
      .map((img) => {
        const m = media(img, "large");
        return {
          id: img?.id ?? null,
          url: m.url,
          width: m.width ?? null,
          height: m.height ?? null,
          alt: img?.attributes?.alternativeText ?? "",
        };
      })
      .filter((img) => img.url),
  };
}
