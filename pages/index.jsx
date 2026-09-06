import PagesMetaHead from "../components/PagesMetaHead";
import HomeHero from "../components/home/HomeHero";
import HomeApproach from "../components/home/HomeApproach";
import HomeWork from "../components/home/HomeWork";
import HomeContact from "../components/home/HomeContact";
import { fetcher, toProjectCard } from "../lib/api";

export default function Home({ projecten }) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title="H16 | Bouwcoördinatie en projectontwikkeling in Gent"
        titleTemplate={false}
        description="Bouwcoördinatie en projectontwikkeling door een klein familiebedrijf uit Oosterzele. Uw bouwproject van begin tot eind opgevolgd."
      />

      <HomeHero />
      <HomeApproach />
      <HomeWork projects={projecten} />
      <HomeContact />
    </div>
  );
}

export async function getStaticProps() {
  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=thumbnail`
  );
  // Newest first, then three — the same ordering /realisaties uses. Only the
  // three that render are serialised into the page.
  const projecten = [...(projectsResponse?.data ?? [])]
    .reverse()
    .slice(0, 3)
    .map(toProjectCard);
  return {
    revalidate: 60,
    props: { projecten },
  };
}
