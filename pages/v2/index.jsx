import PagesMetaHead from "../../components/PagesMetaHead";
import Spread from "../../components/redesign/Spread";
import Realisaties from "../../components/redesign/Realisaties";
import Werkwijze from "../../components/redesign/Werkwijze";
import Interlude from "../../components/redesign/Interlude";
import Mensen from "../../components/redesign/Mensen";
import Professionals from "../../components/redesign/Professionals";
import BackCover from "../../components/redesign/BackCover";
import V2Page from "../../components/redesign/V2Page";
import { toHomeProject } from "../../lib/api";
import { assetUrl } from "../../lib/seo";
import { isProductionHost, v2fetch } from "../../lib/staging";
import { INTERLUDE, PLATES, SHOW_PRICE, SPREAD } from "../../data/homeCuration";

// Homepage redesign, STAGING ONLY. next.config.js rewrites "/" to /v2 on
// h16.peleman.io; on h16.be every /v2 page is a 404, so production keeps
// pages/index.jsx until the client approves. V2Page brings the new header
// and footer.
function Redesign({
  spread,
  plates,
  interlude,
  werkwijze,
  mensen,
  werkgebied,
}) {
  const firstPlateN = 3;
  const interludeN = firstPlateN + plates.length;

  return (
    <>
      <PagesMetaHead
        title="H16 | Bouwcoördinatie en projectontwikkeling in Gent"
        titleTemplate={false}
        description="Bouwcoördinatie en projectontwikkeling door een klein familiebedrijf uit Oosterzele. Uw bouwproject van begin tot eind opgevolgd."
      />
      <V2Page>
        <Spread werkgebied={werkgebied} {...spread} />
        <Realisaties plates={plates} firstN={firstPlateN} />
        <Werkwijze {...werkwijze} />
        <Interlude plate={interlude} n={interludeN} />
        <Mensen body={mensen.body} />
        <Professionals />
        <BackCover />
      </V2Page>
    </>
  );
}

Redesign.ownLayout = true;
export default Redesign;

export async function getServerSideProps({ req, res }) {
  if (isProductionHost(req)) return { notFound: true };
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=600",
  );

  // Server-only: the service copy (drafts and notes included) never ships to
  // the client; only the strings used below become props.
  const { DIENSTEN } = await import("../../data/diensten");
  const bc = DIENSTEN.bouwcoordinatie;
  const po = DIENSTEN.projectontwikkeling;

  const response = await v2fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate[0]=thumbnail&populate[1]=afbeeldingen&pagination[limit]=100`,
  );
  const bySlug = Object.fromEntries(
    (response?.data ?? [])
      .map(toHomeProject)
      .filter((p) => p.slug)
      .map((p) => [p.slug, p]),
  );

  // H16's confirmed role per realisatie, from the two service pages.
  const rol = {};
  (bc.realisaties || []).forEach((s) => (rol[s] = "Bouwcoördinatie"));
  (po.realisaties || []).forEach((s) => (rol[s] = "Projectontwikkeling"));

  const publicProject = (p) =>
    p && {
      slug: p.slug,
      naam: p.naam,
      korte: p.korte,
      aard: p.aard,
      jaar: p.jaar,
      beschikbaarheid: p.beschikbaarheid,
      rol: rol[p.slug] || "",
      // The asking price only for a sale, never for a rental.
      prijs: SHOW_PRICE && /^te koop$/i.test(p.beschikbaarheid) ? p.prijs : "",
    };

  // A curated image is used only if it is still in that project's gallery (or
  // is its thumbnail); otherwise the thumbnail stands in, centred.
  const resolveImage = (curated, p, { always = false } = {}) => {
    const known =
      p &&
      (p.galleryPaths.includes(curated.path) ||
        p.thumbnail?.path === curated.path);
    if (known || (always && !p?.thumbnail)) {
      return { src: assetUrl(curated.path), alt: curated.alt, op: curated.op };
    }
    if (p?.thumbnail) {
      return {
        src: assetUrl(p.thumbnail.path),
        alt: p.naam,
        op: { sm: "50% 50%", md: "50% 50%" },
      };
    }
    return always
      ? { src: assetUrl(curated.path), alt: curated.alt, op: curated.op }
      : null;
  };

  const voorWie = bc.secties.find((s) => s.label === "Voor wie")?.punten || [];
  const renovatie =
    po.faq.find((q) => /gerenoveerd/.test(q.vraag))?.antwoord || "";
  const regio = bc.faq.find((q) => /regio/.test(q.vraag))?.antwoord || "";
  const werkwijzeSectie = bc.secties.find((s) => s.id === "werkwijze");
  const aanpak = po.secties.find((s) => s.label === "Aanpak")?.tekst?.[0] || "";

  const spreadPlate = (key) => {
    const cur = SPREAD[key];
    const p = bySlug[cur.slug];
    return {
      image: resolveImage(cur.image, p, { always: true }),
      project: publicProject(p) || null,
    };
  };

  const plates = PLATES.map((cur) => {
    const p = bySlug[cur.slug];
    const image = p && resolveImage(cur.image, p);
    return image ? { size: cur.size, image, project: publicProject(p) } : null;
  }).filter(Boolean);

  const interludeProject = bySlug[INTERLUDE.slug];
  const interludeImage =
    interludeProject && resolveImage(INTERLUDE.image, interludeProject);

  return {
    props: {
      werkgebied: regio.replace(/^In\s+/, "").replace(/\.$/, ""),
      spread: {
        bouwcoordinatie: {
          plate: spreadPlate("bouwcoordinatie"),
          lead: bc.lead,
          // Scope list minus «Van A tot Z of van A naar B», which reads as
          // jargon out of the service page's context.
          punten: voorWie.filter((_, i) => i !== 2),
        },
        projectontwikkeling: {
          plate: spreadPlate("projectontwikkeling"),
          teksten: [po.lead, renovatie.replace(/^Ja\.\s*/, "")].filter(Boolean),
        },
      },
      plates,
      interlude: interludeImage
        ? { image: interludeImage, project: publicProject(interludeProject) }
        : null,
      werkwijze: {
        // Homepage: the first sentence only; the full text is on
        // /bouwcoordinatie#werkwijze.
        intro: werkwijzeSectie?.tekst?.[0]?.match(/^[^.]*\./)?.[0] || "",
        stappen: werkwijzeSectie?.stappen || [],
      },
      mensen: {
        body: aanpak.match(/Door onze complementaire[^.]*\./)?.[0] || "",
      },
    },
  };
}
