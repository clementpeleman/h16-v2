import PagesMetaHead from "../components/PagesMetaHead";
import V2Page from "../components/redesign/V2Page";
import BackCover from "../components/redesign/BackCover";
import Titel from "../components/redesign/samenwerken/Titel";
import Diensten from "../components/redesign/samenwerken/Diensten";
import Voordelen from "../components/redesign/samenwerken/Voordelen";
import ProfessionalsBand from "../components/redesign/samenwerken/ProfessionalsBand";
// Both only used in getStaticProps, so Next strips them from the client
// bundle; the voordelen reach the page as plain strings.
import { VOORDEEL_PLATES } from "../components/redesign/samenwerken/curation";
import { VOORDELEN } from "../components/colab/ColabBenefits";
import { fetcher, toHomeProject } from "../lib/api";
import { assetUrl } from "../lib/seo";

// /samenwerken ("Monografie" redesign).
//
// Title page with the page's contents → the two services → the four
// voordelen as numbered plates → the professionals on the pale-aqua band
// (#professionals, the homepage's link target) → the blue back cover, which
// takes over HomeContact's «Vraag vrijblijvend meer informatie».
function Samenwerken({ voordelen }) {
  return (
    <>
      <PagesMetaHead
        title="Samenwerken met H16: advies, coördinatie, ontwikkeling"
        description="Bouwcoördinatie, adviesverlening en projectontwikkeling. Ook voor architecten en aannemers die werk uit handen willen geven."
      />
      <V2Page>
        <Titel />
        <Diensten />
        <Voordelen voordelen={voordelen} />
        <ProfessionalsBand />
        <BackCover track="samenwerken-contact" />
      </V2Page>
    </>
  );
}

Samenwerken.ownLayout = true;
export default Samenwerken;

export async function getStaticProps() {
  // Server-only: the service copy (drafts and notes included) never ships to
  // the client; only H16's confirmed roles become props.
  const { DIENSTEN } = await import("../data/diensten");
  const bc = DIENSTEN.bouwcoordinatie;
  const po = DIENSTEN.projectontwikkeling;

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate[0]=thumbnail&populate[1]=afbeeldingen&pagination[limit]=100`,
  );
  const bySlug = Object.fromEntries(
    (response?.data ?? [])
      .map(toHomeProject)
      .filter((p) => p.slug)
      .map((p) => [p.slug, p]),
  );

  // H16's role per realisatie, only where the service page confirms it.
  const rol = {};
  if (bc.realisatiesBevestigd) {
    (bc.realisaties || []).forEach((slug) => (rol[slug] = "Bouwcoördinatie"));
  }
  if (po.realisatiesBevestigd) {
    (po.realisaties || []).forEach(
      (slug) => (rol[slug] = "Projectontwikkeling"),
    );
  }

  // A curated photo is shown only while it is still in that project's
  // gallery (or is its thumbnail). Otherwise the voordeel keeps its text and
  // loses its plate: a random thumbnail crop with a name-only alt would be
  // worse than none.
  const plateFor = (naam) => {
    const cur = VOORDEEL_PLATES[naam];
    const p = cur && bySlug[cur.slug];
    if (!p) return null;
    const known =
      p.galleryPaths.includes(cur.image.path) ||
      p.thumbnail?.path === cur.image.path;
    if (!known) return null;
    return {
      image: {
        src: assetUrl(cur.image.path),
        alt: cur.image.alt,
        op: cur.image.op,
      },
      project: {
        slug: p.slug,
        naam: p.naam,
        meta: [rol[p.slug], p.aard, p.jaar].filter(Boolean),
      },
    };
  };

  return {
    revalidate: 60,
    props: {
      voordelen: VOORDELEN.map((v) => ({
        naam: v.naam,
        tekst: v.tekst,
        plate: plateFor(v.naam),
      })),
    },
  };
}
