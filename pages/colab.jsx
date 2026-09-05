import PagesMetaHead from "../components/PagesMetaHead";
import ColabBanner from "../components/colab/ColabBanner";
import AboutCTA from "../components/about/AboutCTA";
import { fetcher, toProjectCard } from "../lib/api";

function colab({ proof }) {
  return (
    <div>
      <PagesMetaHead
        title="Samenwerken"
        description="Bouwcoördinatie, adviesverlening en projectontwikkeling — en samenwerking met architecten en aannemers."
      />

      <div className="enter-fade container mx-auto">
        <ColabBanner proof={proof} />
        <AboutCTA />
      </div>


    </div>
  );
}

export default colab;

export async function getStaticProps() {
  // /colab is the page the homepage links to most, and it was the only page on
  // the site with no photograph on it — eight identical white cards arguing in
  // the abstract. Each "voordeel" now carries proof from a real job.
  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=thumbnail`
  );
  const proof = [...(projectsResponse?.data ?? [])]
    .reverse()
    .slice(0, 4)
    .map(toProjectCard);
  return {
    revalidate: 60,
    props: { proof },
  };
}
