import { motion } from "framer-motion";
import AboutClients from "../components/about/AboutClients";
import AboutCounter from "../components/about/AboutCounter";
import AboutMeBio from "../components/about/AboutMeBio";
import PagesMetaHead from "../components/PagesMetaHead";
import { fetcher } from "../lib/api";
import AboutCTA from "../components/about/AboutCTA";

function about(samenwerkingen) {
  return (
    <div>
      <PagesMetaHead title="Over ons" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, delay: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto"
      >
        <AboutMeBio />
      </motion.div>

      {/** Counter without paddings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, delay: 1 }}
        exit={{ opacity: 0 }}
      >
        <AboutCounter />
        <AboutCTA />
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, delay: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto"
      >
        <AboutClients samenwerkings={samenwerkingen} />
      </motion.div> */}
    </div>
  );
}

export default about;

export async function getStaticProps() {
  const samenwerkingResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/samenwerkingen?populate=*`
  );
  return {
    revalidate: 10,
    props: {
      samenwerkingen: samenwerkingResponse,
    },
  };
}
