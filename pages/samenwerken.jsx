import PagesMetaHead from "../components/PagesMetaHead";
import ColabIntro from "../components/colab/ColabIntro";
import ColabServices from "../components/colab/ColabServices";
import ColabBenefits from "../components/colab/ColabBenefits";
import ColabPeers from "../components/colab/ColabPeers";
import HomeContact from "../components/home/HomeContact";
import { fetcher, toProjectCard } from "../lib/api";

function colab({ proof }) {
  return (
    <div>
      <PagesMetaHead
        title="Samenwerken met H16: advies, coördinatie, ontwikkeling"
        description="Bouwcoördinatie, adviesverlening en projectontwikkeling. Ook voor architecten en aannemers die werk uit handen willen geven."
      />

      <div className="enter-fade container mx-auto">
        <ColabIntro />
        <ColabServices />
        <ColabBenefits proof={proof} />
        <ColabPeers />
        <HomeContact />
      </div>


    </div>
  );
}

export default colab;

export async function getStaticProps() {
  // /samenwerken is the page the homepage links to most, and it was the only page on
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
