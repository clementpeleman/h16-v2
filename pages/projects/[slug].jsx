import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import PagesMetaHead from "../../components/PagesMetaHead";
import { fetcher, toProjectDetail } from "../../lib/api";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import UseScroll from "../../hooks/useScroll"; 

function Project({ project }) {
  // Aard / Fase / Beschikbaarheid come from the CMS and may each be empty.
  // Only rows with a real value are rendered — an empty "Fase:" label is worse
  // than no row at all.
  const specs = [
    { label: "Aard", value: project.aard },
    { label: "Fase", value: project.fase },
    { label: "Jaar", value: project.jaar },
    { label: "Samenwerking", value: project.samenwerkingen.join(", ") },
  ].filter((row) => row.value && String(row.value).trim());

  // A property that is for sale or for rent is an offer, not a portfolio
  // entry. The price and the way to enquire used to live as the last line of a
  // ~350-word markdown dump — along with a private individual's personal email
  // address. This block gives those facts somewhere structured to live so they
  // can never end up in prose again.
  const isOffer = /te koop|te huur/i.test(project.beschikbaarheid || "");

  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title={project.naam}
        description={project.korteBeschrijving || undefined}
      />

      {/* Header */}
      <div>
        <h1 className="font-display text-h1 text-left text-black mt-16 sm:mt-24 mb-4 max-w-[24ch] [text-wrap:balance]">
          {project.naam}
        </h1>

        {isOffer ? (
          <div className="mt-6 max-w-xl border-t-2 border-accent p-6 bg-secondary-light shadow-sm">
            <p className="text-h3 text-accent-deep">
              {project.beschikbaarheid}
            </p>
            {project.prijs && (
              <p className="mt-2 text-h2 text-primary-dark">{project.prijs}</p>
            )}
            <Link
              href={`/contact?project=${encodeURIComponent(project.naam || "")}`}
              className="mt-6 inline-block text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
            >
              Vraag een bezichtiging aan
            </Link>
          </div>
        ) : (
          project.beschikbaarheid && (
            <p className="text-meta text-accent-deep mb-7">
              {project.beschikbaarheid}
            </p>
          )
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col sm:flex-row gap-10 lg:gap-16 mt-12 sm:mt-16">
        <div className="w-full sm:w-1/3 text-left">
          {/* Single project client details */}
          <div className="mb-7">
            <h2 className="text-h2 text-primary-dark mb-2">
              Over het project
            </h2>
            {/* A spec list is a definition list. <dl> gives every label its
                value in the accessibility tree, which a run of <span>/<br />
                never did. */}
            <dl className="text-body text-ternary-dark">
              {project.adres && (
                <div className="mb-1">
                  <dt className="font-strong inline">Adres: </dt>
                  <dd className="inline">
                    <a
                      href={
                        "https://maps.google.com/?q=" +
                        encodeURIComponent(project.adres)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline hover:underline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm cursor-pointer duration-300"
                    >
                      {project.adres}
                      <FaExternalLinkAlt
                        className="inline-block ml-2 mb-1"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opent Google Maps)</span>
                    </a>
                  </dd>
                </div>
              )}

              {specs.map((row) => (
                <div className="mb-1" key={row.label}>
                  <dt className="font-strong inline">{row.label}: </dt>
                  <dd className="inline break-words">{row.value}</dd>
                </div>
              ))}
            </dl>

            {specs.length === 0 && !project.adres && (
              <p className="text-body text-ternary-dark">
                De projectgegevens worden nog aangevuld.
              </p>
            )}
          </div>

          <div>
            {project.externeLink ? (
              <div>
                <h2 className="text-h2 text-primary-dark mt-2">
                  Externe link
                </h2>
                <div className="flex items-center whitespace-initial break-all gap-3 mt-5">
                  <Link
                    href={project.externeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref={true}
                    className="bg-ternary-light text-ternary-dark hover:text-primary p-2 rounded-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 duration-300"
                  >
                    {project.externeLink}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/*  Single project right section details */}
        <div className="w-full sm:w-2/3 text-left">
          <h2 className="text-primary-dark text-h2 mb-2">
            Beschrijving
          </h2>
          <section id="markdown" className="text-body">
            {project.beschrijving ? (
              <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {project.beschrijving}
              </Markdown>
            ) : (
              <p className="text-ternary-dark">
                De beschrijving van dit project volgt binnenkort. Wilt u er nu
                al meer over weten?{" "}
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
        </div>
      </div>

      {/* Gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-10 mt-16 sm:mt-24">
        {project.afbeeldingen.map((beeld, index) => (
          <div className="mb-6 lg:mb-10 overflow-hidden" key={beeld.id ?? index}>
            <Image
              src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + beeld.url}
              className="sm:hover:scale-[1.06] transition-transform ease-in-out duration-300 shadow-lg"
              alt={beeld.alt || project.naam}
              width={beeld.width || 1000}
              height={beeld.height || 750}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              // A gallery can run to twenty-odd photographs; only the first is
              // ever above the fold.
              priority={index === 0}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        ))}
      </div>

      {/* Without this a visitor who landed here from a search result has no
          route deeper into the site than the browser's back button. */}
      <div className="mt-16 sm:mt-24 mb-24 sm:mb-32">
        <Link
          href="/projects"
          className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          ← Alle realisaties
        </Link>
      </div>

      <UseScroll/>
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
    revalidate: 1,
    props: {
      project: toProjectDetail(projectFilter),
    },
  };
}

export default Project;
