import { useState } from "react";
import Image from "next/image";
import Lightbox from "../../components/projects/Lightbox";
import GalleryJump from "../../components/projects/GalleryJump";
import { FaExternalLinkAlt } from "react-icons/fa";
import PagesMetaHead from "../../components/PagesMetaHead";
import { fetcher, toProjectDetail, toProjectCard } from "../../lib/api";
import ProjectSingle from "../../components/projects/ProjectSingle";
import { breadcrumbJsonLd, realEstateListingJsonLd, assetUrl } from "../../lib/seo";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

function Project({ project, related = [] }) {
  // The facts about a property are a sentence, not a form. Aard, fase, jaar
  // and plaats used to be a labelled list ("Aard: Nieuwbouw / Fase:
  // Opgeleverd / Jaar: 2024"), then a dot-separated strip — both read as data.
  // This composes them the way the rest of the site talks:
  //   "Nieuwbouw in Gent, opgeleverd in 2024."
  // Last comma-part of the address, postcode stripped, first letter capitalised
  // (one CMS entry has "gent" in lowercase).
  const rawPlaats =
    (project.adres || "").split(",").pop()?.trim().replace(/^\d{4}\s*/, "") ||
    "";
  const plaats = rawPlaats
    ? rawPlaats.charAt(0).toUpperCase() + rawPlaats.slice(1)
    : "";
  // With an aard: "Nieuwbouw in Gent". Without one, the place leads on its
  // own — "Gent, opgeleverd in 2023" — rather than a subjectless "In Gent, …".
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
  const metaZin = zin ? zin.charAt(0).toUpperCase() + zin.slice(1) + "." : "";

  // A property that is for sale or for rent is an offer, not a portfolio
  // entry. The price and the way to enquire used to live as the last line of a
  // ~350-word markdown dump — along with a private individual's personal email
  // address. Availability leads the metaline in terracotta; the enquiry button
  // sits once, after the description, where a reader has decided.
  const isOffer = /te koop|te huur/i.test(project.beschikbaarheid || "");
  const [hero, ...rest] = project.afbeeldingen;
  const pagePath = `/realisaties/${project.slug}`;

  // Two projects share a street name (Nieuwland 28 and Nieuwland 28-40), so a
  // bare address as <title> made them compete for the same query. The aard
  // and the availability tell them apart and carry the search terms a
  // comparing homeowner types: "Nieuwland 28 – Nieuwbouw te koop".
  const seoTitle = [
    project.naam,
    [project.aard, isOffer ? project.beschikbaarheid.toLowerCase() : ""]
      .filter(Boolean)
      .join(" "),
  ]
    .filter(Boolean)
    .join(" – ");
  // Strapi's korte_beschrijving is 50-70 characters; the metaline brings it
  // to the length a SERP snippet shows, and stands in when it is empty.
  const kort = (project.korteBeschrijving || "").trim();
  // CMS text does not always end in punctuation; without it the two
  // sentences run together ("...kantoorruimte Gent, opgeleverd in 2023").
  const kortZin = kort && !/[.!?]$/.test(kort) ? `${kort}.` : kort;
  const seoDescription =
    kort && kort.length >= 110
      ? kort
      : [kortZin, metaZin].filter(Boolean).join(" ") || undefined;
  // Index into project.afbeeldingen of the photo open full-screen; null = closed.
  const [open, setOpen] = useState(null);
  const zoomBtn =
    "block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 rounded-sm cursor-zoom-in";

  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title={seoTitle}
        description={seoDescription}
        image={hero ? assetUrl(hero.url) : undefined}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Realisaties", path: "/realisaties" },
            { name: project.naam, path: pagePath },
          ]),
          isOffer && realEstateListingJsonLd(project, pagePath),
        ]}
      />

      {/* Title + metaline */}
      <header className="mt-section max-w-4xl">
        <Link
          href="/realisaties"
          className="inline-block mb-8 text-meta text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          ← Alle realisaties
        </Link>
        <h1 className="font-display text-h1 text-black max-w-[24ch] [text-wrap:balance]">
          {project.naam}
        </h1>

        {project.beschikbaarheid && (
          <p
            className={`mt-5 text-ui ${
              isOffer ? "text-accent-deep" : "text-ternary-dark"
            }`}
          >
            {project.beschikbaarheid}
          </p>
        )}
        {metaZin && (
          <p className="mt-4 text-lead text-gray-700 max-w-[46ch]">{metaZin}</p>
        )}
      </header>

      {/* The building leads. The gallery used to sit after the text; a
          property page that opens on a spec list has its priorities inverted. */}
      {hero && (
        // Shown at its own proportions, not cropped to a fixed 16:10 — a
        // cover crop took the roofline off every façade. Capped in width so
        // it reads as the opening photograph, not a billboard; portrait
        // photographs narrower still.
        <div
          className={`mt-group ${
            hero.height > hero.width ? "max-w-lg" : "max-w-4xl"
          }`}
        >
          <button type="button" onClick={() => setOpen(0)} className={zoomBtn} aria-label="Foto vergroten">
            <Image
              src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + hero.url}
              alt={hero.alt || project.naam}
              width={hero.width || 1600}
              height={hero.height || 1000}
              sizes="(min-width: 1536px) 1408px, (min-width: 1024px) calc(100vw - 5rem), 100vw"
              priority
              style={{ width: "100%", height: "auto" }}
              className="bg-ternary-light"
            />
          </button>
        </div>
      )}

      {/* Description: one prose column, not two competing ones. */}
      <div className="mt-section max-w-[70ch]">
        <h2 className="text-h2 text-black">Over het project</h2>
        <section id="markdown" className="mt-8 text-body text-ternary-dark">
          {project.beschrijving ? (
            <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {project.beschrijving}
            </Markdown>
          ) : (
            <p>
              De beschrijving van dit project volgt binnenkort. Wilt u er nu al
              meer over weten?{" "}
              <a
                href="tel:+32474042279"
                className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
              >
                Bel ons op +32 474 04 22 79
              </a>
              .
            </p>
          )}
        </section>

        {/* Collaboration and address as sentences, in the same column, under
            the story they belong to. */}
        {(project.samenwerkingen.length > 0 || project.adres || project.externeLink) && (
          <p className="mt-10 text-body text-ternary-dark">
            {project.samenwerkingen.length > 0 && (
              <>
                In samenwerking met{" "}
                <span className="font-strong text-black">
                  {project.samenwerkingen.join(" en ")}
                </span>
                .{" "}
              </>
            )}
            {project.adres && (
              <>
                Gelegen aan{" "}
                <a
                  href={"https://maps.google.com/?q=" + encodeURIComponent(project.adres)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
                >
                  {project.adres}
                  <span className="sr-only"> (opent Google Maps)</span>
                </a>
                .{" "}
              </>
            )}
            {project.externeLink && (
              <a
                href={project.externeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm break-all duration-200"
              >
                Meer over dit project
                <FaExternalLinkAlt className="inline-block ml-2 mb-1 h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </p>
        )}

        {isOffer && (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {project.prijs && (
              <span className="text-h3 text-black">{project.prijs}</span>
            )}
            <Link
              href={`/contact?project=${encodeURIComponent(project.naam || "")}`}
              className="inline-block text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
            >
              Vraag een bezichtiging aan
            </Link>
          </div>
        )}
      </div>

      {/* The rest of the photographs. Twenty-odd full-width images ran to
          8.7k px on a phone; the first nine show inline, the rest open on
          request. Photographs on cream need neither shadow nor a hover zoom. */}
      {rest.length > 0 && (
        <div id="fotos" className="mt-section scroll-mt-8">
          <h2 className="text-h2 text-black">Foto&apos;s</h2>
          <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6">
            {rest.slice(0, 9).map((beeld, index) => (
              <div className="mb-4 lg:mb-6" key={beeld.id ?? index}>
                <button type="button" onClick={() => setOpen(index + 1)} className={zoomBtn} aria-label="Foto vergroten">
                  <Image
                    src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + beeld.url}
                    alt={beeld.alt || project.naam}
                    width={beeld.width || 1000}
                    height={beeld.height || 750}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </button>
              </div>
            ))}
          </div>
          {rest.length > 9 && (
            <details className="mt-6 group">
              <summary className="cursor-pointer list-none text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200">
                <span className="group-open:hidden">Alle foto&apos;s ({rest.length})</span>
                <span className="hidden group-open:inline">Minder foto&apos;s</span>
              </summary>
              <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6">
                {rest.slice(9).map((beeld, index) => (
                  <div className="mb-4 lg:mb-6" key={beeld.id ?? `x${index}`}>
                    <button type="button" onClick={() => setOpen(index + 10)} className={zoomBtn} aria-label="Foto vergroten">
                      <Image
                        src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + beeld.url}
                        alt={beeld.alt || project.naam}
                        width={beeld.width || 1000}
                        height={beeld.height || 750}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* The only conversion on the page sat above 3-9k px of gallery and
              was never repeated. Once more, at the point a reader has seen it all. */}
          {isOffer && (
            <div className="mt-group flex flex-wrap items-center gap-x-8 gap-y-4">
              {project.prijs && <span className="text-h3 text-black">{project.prijs}</span>}
              <Link
                href={`/contact?project=${encodeURIComponent(project.naam || "")}`}
                className="inline-block text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
              >
                Vraag een bezichtiging aan
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Every project page used to be a dead end: the only way onward was
          the back link at the top. Three other realisations keep a reader on
          the work and give Google a path between the five project pages. */}
      {related.length > 0 && (
        <section className="mt-chapter border-t border-gray-200 pt-12 lg:pt-16">
          <h2 className="text-h2 text-black">Andere realisaties</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectSingle key={p.id ?? p.slug} {...p} headingLevel={3} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && <GalleryJump targetId="fotos" />}
      <Lightbox
        images={project.afbeeldingen}
        index={open}
        onClose={() => setOpen(null)}
        onChange={setOpen}
      />
    </div>
  );
}

export async function getStaticPaths() {
  // Use the shared fetcher so the response is auth'd (STRAPI_TOKEN) and
  // normalized to the v4 shape this code reads (post.attributes.slug).
  const posts = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?fields[0]=slug`
  );

  // A CMS outage at build time must not fail the build: with fallback
  // "blocking", an empty path list just means every page renders on demand.
  const paths = (posts?.data ?? [])
    .filter((post) => post?.attributes?.slug)
    .map((post) => ({
      params: { slug: post.attributes.slug },
    }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;

  // Ask the CMS for the one project instead of pulling every project with
  // every image and filtering in memory, once per page, at build time.
  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*`
  );

  const projectFilter = projectsResponse?.data?.[0];

  // Three other projects for the "Andere realisaties" block: card fields
  // only, newest first, the current one excluded server-side.
  const relatedResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?filters[slug][$ne]=${encodeURIComponent(
      slug
    )}&populate=thumbnail&sort=createdAt:desc&pagination[limit]=3`
  );

  // fallback: "blocking" means any slug reaches this function. Returning
  // `project: undefined` used to throw a serialization error and serve a blank
  // 500 — a stale link from a search result, an email or a printed QR code
  // dead-ended there. Hand those to the designed 404 instead.
  if (!projectFilter) {
    return { notFound: true, revalidate: 60 };
  }

  // `related` used to ship a fully-populated copy of every OTHER project into
  // this page for a RelatedProjects component that no longer exists.
  return {
    revalidate: 60,
    props: {
      project: toProjectDetail(projectFilter),
      related: (relatedResponse?.data ?? []).map(toProjectCard),
    },
  };
}

export default Project;
