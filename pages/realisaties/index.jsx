import PagesMetaHead from "../../components/PagesMetaHead";
import V2Page from "../../components/redesign/V2Page";
import BackCover from "../../components/redesign/BackCover";
import { SectionHead } from "../../components/redesign/ui";
import IndexGrid from "../../components/redesign/realisaties/IndexGrid";
import IndexEmpty from "../../components/redesign/realisaties/IndexEmpty";
import {
  INDEX_IMAGES,
  shapeOf,
} from "../../components/redesign/realisaties/IndexCuration";
import { fetcher, toHomeProject } from "../../lib/api";
import { assetUrl } from "../../lib/seo";
import { SHOW_PRICE } from "../../data/homeCuration";

// /realisaties ("Monografie" redesign). Title, description and ordering are
// those of the previous page.

// "5 realisaties · 2023–2024": the count and the span of years, read from
// the projects themselves.
function colophon(projects) {
  if (!projects.length) return "Realisaties";
  const count =
    projects.length === 1 ? "1 realisatie" : `${projects.length} realisaties`;
  const years = [
    ...new Set(projects.map((p) => p.jaar).filter(Boolean)),
  ].sort();
  if (!years.length) return count;
  const span =
    years.length === 1 ? years[0] : `${years[0]}–${years[years.length - 1]}`;
  return `${count} · ${span}`;
}

function RealisatiesIndex({ projects }) {
  return (
    <>
      <PagesMetaHead
        title="Realisaties: renovatie en nieuwbouw in Gent"
        description="Nieuwbouw, totaalrenovatie en herbestemming in Gent en Oost-Vlaanderen. Vijf realisaties van H16, van ontwerp tot oplevering."
      />
      <V2Page>
        <section
          aria-labelledby="realisaties-titel"
          className="container mx-auto pt-6 md:pt-10 lg:pt-14"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
            <SectionHead
              as="h1"
              size="display"
              id="realisaties-titel"
              label={<span className="tabular-nums">{colophon(projects)}</span>}
              title="Onze realisaties in Gent en omgeving"
              className="lg:col-span-9 xl:col-span-8"
            />
          </div>

          {projects.length > 0 ? (
            <IndexGrid
              projects={projects}
              className="mt-10 md:mt-12 lg:mt-16"
            />
          ) : (
            <IndexEmpty className="mt-10 md:mt-12" />
          )}
        </section>

        <BackCover track="realisaties-contact" />
      </V2Page>
    </>
  );
}

RealisatiesIndex.ownLayout = true;
export default RealisatiesIndex;

export async function getStaticProps() {
  // Server-only: the service copy (drafts and notes included) never ships to
  // the client; only H16's role per project becomes props.
  const { DIENSTEN } = await import("../../data/diensten");
  const bc = DIENSTEN.bouwcoordinatie;
  const po = DIENSTEN.projectontwikkeling;
  const rol = {};
  (bc.realisaties || []).forEach((s) => (rol[s] = "Bouwcoördinatie"));
  (po.realisaties || []).forEach((s) => (rol[s] = "Projectontwikkeling"));

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate[0]=thumbnail&populate[1]=afbeeldingen&pagination[limit]=100`,
  );

  // Newest first, as the current page: the CMS order, reversed.
  const projects = [...(response?.data ?? [])]
    .reverse()
    .map((entry) => {
      const p = toHomeProject(entry);
      if (!p.slug) return null;

      // The thumbnail's original (not the 1000px "large" format), for the
      // fallback plate and to recognise a curated image that is the thumbnail.
      const t = entry?.attributes?.thumbnail?.data;
      const thumb = t ? t.attributes || t : null;

      // A curated image is used only while it is still in the project's
      // gallery (or is its thumbnail); otherwise the thumbnail stands in,
      // centred, cut to the shape of its own proportions.
      const cur = INDEX_IMAGES[p.slug];
      let image = null;
      if (
        cur &&
        (p.galleryPaths.includes(cur.path) || thumb?.url === cur.path)
      ) {
        image = {
          src: assetUrl(cur.path),
          alt: cur.alt,
          op: cur.op,
          w: cur.w,
          h: cur.h,
          shape: cur.shape,
          maxW: cur.maxW ?? null,
        };
      } else if (thumb?.url) {
        image = {
          src: assetUrl(thumb.url),
          alt: thumb.alternativeText || p.naam,
          op: { sm: "50% 50%", md: "50% 50%" },
          w: thumb.width ?? null,
          h: thumb.height ?? null,
          shape: shapeOf(thumb.width, thumb.height),
          maxW: null,
        };
      }

      return {
        slug: p.slug,
        naam: p.naam,
        korte: p.korte,
        rol: rol[p.slug] || "",
        aard: p.aard,
        jaar: p.jaar,
        beschikbaarheid: p.beschikbaarheid,
        // The asking price only for a sale, never for a rental.
        prijs:
          SHOW_PRICE && /^te koop$/i.test(p.beschikbaarheid) ? p.prijs : "",
        image,
      };
    })
    .filter(Boolean);

  return {
    revalidate: 60,
    props: {
      projects,
    },
  };
}
