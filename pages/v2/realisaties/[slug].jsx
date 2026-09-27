import { useCallback, useRef, useState } from "react";
import PagesMetaHead from "../../../components/PagesMetaHead";
import V2Page from "../../../components/redesign/V2Page";
import BackCover from "../../../components/redesign/BackCover";
import Lightbox from "../../../components/projects/Lightbox";
import Opening from "../../../components/redesign/realisatie/Opening";
import Gallery from "../../../components/redesign/realisatie/Gallery";
import Offer from "../../../components/redesign/realisatie/Offer";
import Andere from "../../../components/redesign/realisatie/Andere";
import FotoJump from "../../../components/redesign/realisatie/FotoJump";
import {
  isOfferProject,
  metaZinFor,
  seoDescriptionFor,
  seoTitleFor,
} from "../../../components/redesign/realisatie/text";
import {
  displayPrice,
  roleMap,
  toPlates,
  toRelated,
} from "../../../components/redesign/realisatie/server";
import { toProjectDetail } from "../../../lib/api";
import {
  assetUrl,
  breadcrumbJsonLd,
  realEstateListingJsonLd,
} from "../../../lib/seo";
import { isProductionHost, v2fetch } from "../../../lib/staging";

// One realisatie, redesigned ("Monografie"), STAGING ONLY: next.config.js
// rewrites /realisaties/<slug> here on h16.peleman.io; on h16.be this page is
// a 404 and pages/realisaties/[slug].jsx stays live. Title, description,
// JSON-LD, #fotos and /contact?project=<naam> are those of the live page.
function Realisatie({ project, plates, rol, prijs, related, werkgebied }) {
  const isOffer = isOfferProject(project);
  const metaZin = metaZinFor(project);
  const pagePath = `/realisaties/${project.slug}`;
  // SEO keeps the live page's image: the `large` format of the first photo.
  const seoImage = project.afbeeldingen[0];

  // Index into `plates` of the photo open full-screen; null = closed. Focus
  // goes back to the plate that opened it when the viewer closes.
  const [open, setOpen] = useState(null);
  const opener = useRef(null);
  const openAt = useCallback(
    (index) => (event) => {
      opener.current = event.currentTarget;
      setOpen(index);
    },
    [],
  );
  const close = useCallback(() => {
    setOpen(null);
    const el = opener.current;
    if (el) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  return (
    <>
      <PagesMetaHead
        title={seoTitleFor(project)}
        description={seoDescriptionFor(project, metaZin)}
        image={seoImage ? assetUrl(seoImage.url) : undefined}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Realisaties", path: "/realisaties" },
            { name: project.naam, path: pagePath },
          ]),
          isOffer && realEstateListingJsonLd(project, pagePath),
        ]}
      />
      {/* Keyed by slug: moving from one project to another remounts the
          page, so the plate reveal re-arms and no state carries over. */}
      <V2Page key={project.slug}>
        <Opening
          project={project}
          hero={plates[0] || null}
          metaZin={metaZin}
          rol={rol}
          prijs={prijs}
          isOffer={isOffer}
          onOpen={openAt}
        />
        <Gallery naam={project.naam} plates={plates} onOpen={openAt}>
          {/* The enquiry once more, where a reader has seen every photo. */}
          {isOffer && (
            <Offer
              variant="row"
              project={project}
              prijs={prijs}
              className="mt-12 md:mt-group"
            />
          )}
        </Gallery>
        <Andere projects={related} firstN={plates.length + 1} />
        <BackCover werkgebied={werkgebied} track="realisatie-contact" />
        {plates.length > 1 && <FotoJump targetId="fotos" />}
        <Lightbox
          images={plates}
          index={open}
          onClose={close}
          onChange={setOpen}
          variant="v2"
        />
      </V2Page>
    </>
  );
}

Realisatie.ownLayout = true;
export default Realisatie;

export async function getServerSideProps({ req, res, params }) {
  if (isProductionHost(req)) return { notFound: true };
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=600",
  );

  const slug = String(params?.slug || "");
  const api = process.env.NEXT_PUBLIC_STRAPI_URL;
  // The one project (every relation, as the live page asks), and three other
  // projects for «Andere realisaties»: newest first, this one excluded.
  const [projectsResponse, relatedResponse] = await Promise.all([
    v2fetch(
      `${api}/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    ),
    v2fetch(
      `${api}/projects?filters[slug][$ne]=${encodeURIComponent(
        slug,
      )}&populate=thumbnail&sort=createdAt:desc&pagination[limit]=3`,
    ),
  ]);

  const entry = projectsResponse?.data?.[0];
  // A stale link (search result, email, printed QR code) gets the designed
  // 404, not a 500.
  if (!entry) return { notFound: true };

  // Server-only: the service copy (drafts and notes included) never ships to
  // the client; only the role and the werkgebied become props.
  const { DIENSTEN } = await import("../../../data/diensten");
  const rollen = roleMap(DIENSTEN);
  const regio =
    DIENSTEN.bouwcoordinatie.faq.find((q) => /regio/.test(q.vraag))?.antwoord ||
    "";

  const project = toProjectDetail(entry);

  return {
    props: {
      project,
      plates: toPlates(entry, project.naam),
      rol: rollen[project.slug] || null,
      prijs: displayPrice(entry, project),
      related: (relatedResponse?.data ?? [])
        .map((e) => toRelated(e, rollen))
        .filter((p) => p.slug),
      werkgebied: regio.replace(/^In\s+/, "").replace(/\.$/, ""),
    },
  };
}
