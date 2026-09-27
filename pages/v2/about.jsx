import PagesMetaHead from "../../components/PagesMetaHead";
import V2Page from "../../components/redesign/V2Page";
import BackCover from "../../components/redesign/BackCover";
import AboutTitle from "../../components/redesign/about/AboutTitle";
import Meerwaarde from "../../components/redesign/about/Meerwaarde";
import WieIsWie from "../../components/redesign/about/WieIsWie";
import Kolibrie from "../../components/redesign/about/Kolibrie";
import { ABOUT_PLATES } from "../../components/redesign/about/curation";
import { toHomeProject } from "../../lib/api";
import { assetUrl } from "../../lib/seo";
import { isProductionHost, v2fetch } from "../../lib/staging";

// /about redesign, STAGING ONLY. next.config.js rewrites "/about" to
// /v2/about on h16.peleman.io; on h16.be this page is a 404 and
// pages/about.jsx stays live until the client approves.
//
// Order: title page, meerwaarde, the kolibrie (the page's one aqua band, as
// the werkwijze is on the homepage), then the two people — so «Wie is wie?»
// leads straight into the blue back cover and its «Gilles of Elena antwoordt
// u zo snel mogelijk». Every piece of the current page's copy is kept; its
// closing «Vraag vrijblijvend meer informatie» block is the BackCover.
function About({ plates }) {
  // "Afb. n" restarts at 1 on every page, in DOM order; a plate whose photo
  // left the CMS is dropped and the numbering closes up.
  const titelN = plates.titel ? 1 : null;
  const meerwaardeN = plates.meerwaarde ? (plates.titel ? 2 : 1) : null;

  return (
    <>
      <PagesMetaHead
        title="Over ons: Gilles De Brabander en Elena Versyp"
        description="H16 is een jong familiebedrijf met wortels in het vastgoed. Maak kennis met Gilles en Elena en met onze manier van werken."
      />
      <V2Page>
        <AboutTitle plate={plates.titel} n={titelN} />
        <Meerwaarde plate={plates.meerwaarde} n={meerwaardeN} />
        <Kolibrie />
        <WieIsWie />
        <BackCover track="about-contact" />
      </V2Page>
    </>
  );
}

About.ownLayout = true;
export default About;

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

  // H16's confirmed role per realisatie, from the two service pages.
  const rol = {};
  (bc.realisaties || []).forEach((s) => (rol[s] = "Bouwcoördinatie"));
  (po.realisaties || []).forEach((s) => (rol[s] = "Projectontwikkeling"));

  const response = await v2fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate[0]=thumbnail&populate[1]=afbeeldingen&pagination[limit]=100`,
  );
  const bySlug = Object.fromEntries(
    (response?.data ?? [])
      .map(toHomeProject)
      .filter((p) => p.slug)
      .map((p) => [p.slug, p]),
  );

  // A curated photo is used only while it is still in that project's gallery
  // (or is its thumbnail). No thumbnail stand-in: see curation.js.
  const plate = ({ slug, image }) => {
    const p = bySlug[slug];
    const known =
      p &&
      (p.galleryPaths.includes(image.path) || p.thumbnail?.path === image.path);
    if (!known) return null;
    return {
      image: { src: assetUrl(image.path), alt: image.alt, op: image.op },
      project: {
        slug: p.slug,
        naam: p.naam,
        // H16's role (or the kind of work) and the year: two short items, so
        // the meta line never wraps to a lone "· 2023" in a 3/4-width
        // phone caption.
        meta: [rol[p.slug] || p.aard, p.jaar].filter(Boolean),
      },
    };
  };

  return {
    props: {
      plates: {
        titel: plate(ABOUT_PLATES.titel),
        meerwaarde: plate(ABOUT_PLATES.meerwaarde),
      },
    },
  };
}
