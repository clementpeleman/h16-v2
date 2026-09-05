import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import PagesMetaHead from "../../components/PagesMetaHead";
import { fetcher, toProjectDetail } from "../../lib/api";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import UseScrollToTop from "../../hooks/useScrollToTop";

function Project({ project }) {
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

  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title={project.naam}
        description={project.korteBeschrijving || undefined}
      />

      {/* Title + metaline */}
      <header className="mt-24 sm:mt-32 lg:mt-40 max-w-4xl">
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
          <p className="mt-3 text-lead text-gray-700 max-w-[46ch]">{metaZin}</p>
        )}
      </header>

      {/* The building leads. The gallery used to sit after the text; a
          property page that opens on a spec list has its priorities inverted. */}
      {hero && (
        <div className="relative mt-12 sm:mt-16 aspect-[16/10] w-full overflow-hidden bg-ternary-light shadow-sm">
          <Image
            src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + hero.url}
            alt={hero.alt || project.naam}
            fill
            sizes="(min-width: 1536px) 1408px, (min-width: 1024px) calc(100vw - 5rem), 100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Description: one prose column, not two competing ones. */}
      <div className="mt-16 sm:mt-24 max-w-[70ch]">
        <section id="markdown" className="text-body text-ternary-dark">
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

      {/* The rest of the photographs. */}
      {rest.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-10 mt-24 sm:mt-32 lg:mt-40">
          {rest.map((beeld, index) => (
            <div className="mb-6 lg:mb-10 overflow-hidden" key={beeld.id ?? index}>
              <Image
                src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + beeld.url}
                className="sm:hover:scale-[1.06] transition-transform ease-in-out duration-300 shadow-lg"
                alt={beeld.alt || project.naam}
                width={beeld.width || 1000}
                height={beeld.height || 750}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Without this a visitor who landed here from a search result has no
          route deeper into the site than the browser's back button. */}
      <div className="mt-24 sm:mt-32 lg:mt-40 mb-32 sm:mb-40">
        <Link
          href="/projects"
          className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          ← Alle realisaties
        </Link>
      </div>

      <UseScrollToTop />
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
    },
  };
}

export default Project;
