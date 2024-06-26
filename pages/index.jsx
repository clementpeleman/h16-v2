import Link from "next/link";
import PagesMetaHead from "../components/PagesMetaHead";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import Button from "../components/reusable/Button";
import AppBanner from "../components/shared/AppBanner";
import { fetcher } from "../lib/api";
import AppSecondary from "../components/shared/AppSecondary";
import UseScrollToTop from "../hooks/useScrollToTop";

export default function Home({ projecten }) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead title="H16 Vastgoedontwikkeling" />

      <AppBanner />

      <AppSecondary />

      <ProjectsGrid projects={projecten} />
      
      <UseScrollToTop />
    </div>
  );
}

export async function getStaticProps() {
  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`
  );
  return {
    revalidate: 1,
    props: {
      projecten: projectsResponse,
    },
  };
}
