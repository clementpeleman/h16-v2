import { motion } from "framer-motion";
import PagesMetaHead from "../components/PagesMetaHead";
import ColabBanner from "../components/colab/ColabBanner";

function colab() {
  return (
    <div>
      <PagesMetaHead title="Samenwerken" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
          delay: 0.1,
        }}
        className="container mx-auto"
      >
        <ColabBanner />
      </motion.div>
    </div>
  );
}

export default colab;
