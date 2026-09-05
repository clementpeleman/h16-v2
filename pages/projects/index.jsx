import Link from "next/link";
import PagesMetaHead from "../../components/PagesMetaHead";
import ProjectsGrid from "../../components/projects/ProjectsGrid";
import { fetcher, toProjectCard } from "../../lib/api";
import ProjectSingle from "../../components/projects/ProjectSingle";
import UseScrollToTop from "../../hooks/useScrollToTop";
import AboutCTA from "../../components/about/AboutCTA";

function index({ projects }) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title="Realisaties"
        description="De projecten die H16 Vastgoedontwikkeling realiseerde en begeleidde."
      />

      <section className="mt-16 sm:mt-24">
        <div className="text-left">
          <h1 className="font-display text-h1 mb-12 text-black [text-wrap:balance]">
            Onze realisaties
          </h1>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ProjectSingle
                key={project.id}
                {...project}
                priority={index === 0}
                headingLevel={2}
              />
            ))}
          </div>
        ) : (
          // An empty page must still carry the visitor somewhere. This is what
          // shows if the CMS is unreachable at build time.
          <div className="max-w-xl py-16 sm:py-24">
            <p className="text-lead text-ternary-dark mb-8">
              Onze realisaties zijn op dit moment niet beschikbaar. Bel of mail
              ons gerust — we vertellen u met plezier waar we mee bezig zijn.
            </p>
            <p className="text-body text-ternary-dark">
              <a
                href="tel:+32474042279"
                className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
              >
                +32 474 04 22 79
              </a>{" "}
              ·{" "}
              <a
                href="mailto:info@h16.be"
                className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm break-all duration-200"
              >
                info@h16.be
              </a>
            </p>
          </div>
        )}
      </section>

      <AboutCTA />

      <UseScrollToTop />
    </div>
  );
}

export default index;

export async function getStaticProps() {
  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=thumbnail`
  );
  return {
    revalidate: 1,
    props: {
      // A CMS outage should render the empty state, not fail the build.
      projects: [...(projectsResponse?.data ?? [])].reverse().map(toProjectCard),
    },
  };
}
