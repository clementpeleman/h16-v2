import Link from "next/link";
import PagesMetaHead from "../components/PagesMetaHead";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import AppBanner from "../components/shared/AppBanner";
import { fetcher, toProjectCard } from "../lib/api";
import AppSecondary from "../components/shared/AppSecondary";
import AboutCTA from "../components/about/AboutCTA";
import UseScrollToTop from "../hooks/useScrollToTop";

export default function Home({ projecten }) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title="H16 Vastgoedontwikkeling"
        description="Bouwcoördinatie en projectontwikkeling door een klein familiebedrijf uit Oosterzele. Uw bouwproject van begin tot eind opgevolgd."
      />

      <AppBanner />

      <AppSecondary />

      <ProjectsGrid projects={projecten} />

      <AboutCTA />

      <UseScrollToTop />
    </div>
  );
}

export async function getStaticProps() {
  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=thumbnail`
  );
  // Newest first, then three — the same ordering /projects uses. Only the
  // three that render are serialised into the page.
  const projecten = [...(projectsResponse?.data ?? [])]
    .reverse()
    .slice(0, 3)
    .map(toProjectCard);
  return {
    revalidate: 1,
    props: { projecten },
  };
}
