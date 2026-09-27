// The sentences and SEO strings of a project page. The logic is copied as is
// from pages/realisaties/[slug].jsx (production), so the staging page carries
// the same <title>, description and meta sentence.

export const isOfferProject = (project) =>
  /te koop|te huur/i.test(project?.beschikbaarheid || "");

// "Nieuwbouw in Gent, opgeleverd in 2024." — aard, plaats, fase and jaar as
// one sentence rather than a labelled list.
export function metaZinFor(project) {
  // Last comma-part of the address, postcode stripped, first letter
  // capitalised (one CMS entry has "gent" in lowercase).
  const rawPlaats =
    (project.adres || "")
      .split(",")
      .pop()
      ?.trim()
      .replace(/^\d{4}\s*/, "") || "";
  const plaats = rawPlaats
    ? rawPlaats.charAt(0).toUpperCase() + rawPlaats.slice(1)
    : "";
  // With an aard: "Nieuwbouw in Gent". Without one, the place leads on its
  // own: "Gent, opgeleverd in 2023".
  const wat = project.aard
    ? [project.aard, plaats && `in ${plaats}`].filter(Boolean).join(" ")
    : plaats;
  const fase = (project.fase || "").trim();
  const wanneer = /opgeleverd/i.test(fase)
    ? project.jaar
      ? `opgeleverd in ${project.jaar}`
      : "opgeleverd"
    : fase && project.jaar
      ? `${fase.toLowerCase()} sinds ${project.jaar}`
      : fase
        ? fase.toLowerCase()
        : project.jaar || "";
  const zin = [wat, wanneer].filter(Boolean).join(", ");
  return zin ? zin.charAt(0).toUpperCase() + zin.slice(1) + "." : "";
}

// "Nieuwland 28 – Nieuwbouw te koop": two projects share a street name, so
// the aard and the availability tell them apart in search results.
export function seoTitleFor(project) {
  const isOffer = isOfferProject(project);
  return [
    project.naam,
    [project.aard, isOffer ? project.beschikbaarheid.toLowerCase() : ""]
      .filter(Boolean)
      .join(" "),
  ]
    .filter(Boolean)
    .join(" – ");
}

// korte_beschrijving is 50-70 characters; the meta sentence brings it to the
// length a SERP snippet shows, and stands in when it is empty.
export function seoDescriptionFor(project, metaZin) {
  const kort = (project.korteBeschrijving || "").trim();
  const kortZin = kort && !/[.!?]$/.test(kort) ? `${kort}.` : kort;
  return kort && kort.length >= 110
    ? kort
    : [kortZin, metaZin].filter(Boolean).join(" ") || undefined;
}
