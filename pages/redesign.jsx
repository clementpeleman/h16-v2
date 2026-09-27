import PagesMetaHead from "../components/PagesMetaHead";
import SiteHeader from "../components/redesign/SiteHeader";
import Spread from "../components/redesign/Spread";
import Realisaties from "../components/redesign/Realisaties";
import Werkwijze from "../components/redesign/Werkwijze";
import Interlude from "../components/redesign/Interlude";
import Mensen from "../components/redesign/Mensen";
import BackCover from "../components/redesign/BackCover";
import SiteFooter from "../components/redesign/SiteFooter";
import useReveal from "../hooks/useReveal";
import { fetcher, toHomeProject } from "../lib/api";
import { assetUrl, isCanonicalHost } from "../lib/seo";
import {
  INTERLUDE,
  PLATES,
  SHOW_PRICE,
  SPREAD,
  WORKS_ORDER,
} from "../data/homeCuration";

// Homepage redesign, STAGING ONLY. next.config.js rewrites "/" to this page on
// h16.peleman.io; on h16.be it is a 404, so production keeps pages/index.jsx
// until the client approves. It brings its own header and footer.
function Redesign({ spread, plates, works, interlude, werkwijze, mensen, werkgebied }) {
  useReveal();
  const firstPlateN = 3;
  const interludeN = firstPlateN + plates.length;

  return (
    <>
      <PagesMetaHead
        title="H16 | Bouwcoördinatie en projectontwikkeling in Gent"
        titleTemplate={false}
        description="Bouwcoördinatie en projectontwikkeling door een klein familiebedrijf uit Oosterzele. Uw bouwproject van begin tot eind opgevolgd."
      />
      <style jsx global>{`
        html,
        body {
          background-color: #f6f6f3;
        }
        #inhoud :where(a, button, [tabindex], [id]),
        #site-footer a {
          scroll-margin-top: 88px;
        }
      `}</style>

      <a
        id="skip-link"
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-3 focus:text-ui focus:text-primary focus-ring"
      >
        Naar de inhoud
      </a>
      <SiteHeader />

      <main id="inhoud" tabIndex={-1} className="text-ink outline-none">
        <Spread werkgebied={werkgebied} {...spread} />
        <Realisaties plates={plates} works={works} firstN={firstPlateN} />
        <Werkwijze {...werkwijze} />
        <Interlude plate={interlude} n={interludeN} />
        <Mensen body={mensen.body} />
        <BackCover werkgebied={werkgebied} />
      </main>

      <SiteFooter />
    </>
  );
}

Redesign.ownLayout = true;
export default Redesign;

export async function getServerSideProps({ req, res }) {
  if (isCanonicalHost(req)) return { notFound: true };
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");

  // Server-only: the service copy (drafts and notes included) never ships to
  // the client; only the strings used below become props.
  const { DIENSTEN } = await import("../data/diensten");
  const bc = DIENSTEN.bouwcoordinatie;
  const po = DIENSTEN.projectontwikkeling;

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate[0]=thumbnail&populate[1]=afbeeldingen&pagination[limit]=100`
  );
  const bySlug = Object.fromEntries(
    (response?.data ?? []).map(toHomeProject).filter((p) => p.slug).map((p) => [p.slug, p])
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
      p && (p.galleryPaths.includes(curated.path) || p.thumbnail?.path === curated.path);
    if (known || (always && !p?.thumbnail)) {
      return { src: assetUrl(curated.path), alt: curated.alt, op: curated.op };
    }
    if (p?.thumbnail) {
      return { src: assetUrl(p.thumbnail.path), alt: p.naam, op: { sm: "50% 50%", md: "50% 50%" } };
    }
    return always ? { src: assetUrl(curated.path), alt: curated.alt, op: curated.op } : null;
  };

  const voorWie = bc.secties.find((s) => s.label === "Voor wie")?.punten || [];
  const renovatie = po.faq.find((q) => /gerenoveerd/.test(q.vraag))?.antwoord || "";
  const regio = bc.faq.find((q) => /regio/.test(q.vraag))?.antwoord || "";
  const werkwijzeSectie = bc.secties.find((s) => s.id === "werkwijze");
  const aanpak = po.secties.find((s) => s.label === "Aanpak")?.tekst?.[0] || "";

  const spreadPlate = (key) => {
    const cur = SPREAD[key];
    const p = bySlug[cur.slug];
    return { image: resolveImage(cur.image, p, { always: true }), project: publicProject(p) || null };
  };

  const plates = PLATES.map((cur) => {
    const p = bySlug[cur.slug];
    const image = p && resolveImage(cur.image, p);
    return image ? { size: cur.size, image, project: publicProject(p) } : null;
  }).filter(Boolean);

  const works = WORKS_ORDER.map((s) => bySlug[s])
    .filter(Boolean)
    .map((p) => {
      const pub = publicProject(p);
      return { slug: pub.slug, naam: pub.naam, rol: pub.rol, jaar: pub.jaar, beschikbaarheid: pub.beschikbaarheid };
    });

  const interludeProject = bySlug[INTERLUDE.slug];
  const interludeImage = interludeProject && resolveImage(INTERLUDE.image, interludeProject);

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
      works,
      interlude: interludeImage
        ? { image: interludeImage, project: publicProject(interludeProject) }
        : null,
      werkwijze: {
        intro: werkwijzeSectie?.tekst?.[0] || "",
        stappen: werkwijzeSectie?.stappen || [],
      },
      mensen: {
        body: aanpak.match(/Door onze complementaire[^.]*\./)?.[0] || "",
      },
    },
  };
}
