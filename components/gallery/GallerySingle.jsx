import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";

const imageStyle = { maxWidth: "100%", height: "auto" };

const GallerySingle = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, delay: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.7,
        delay: 0.15,
      }}
    >
      <div className="  cursor-pointer mb-10 sm:mb-0 dark:bg-ternary-dark">
        <div>
          <Image
            src={
              process.env.NEXT_PUBLIC_STRAPI_ASSET_URL +
              `${props.attributes.url}`
            }
            className=" border-none"
            alt="Gallerij afbeelding"
            layout="responsive"
            width={100}
            height={90}
          />
        </div>
        <div className="text-left pb-3 pt-2">
          <p className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light ">
            {props.attributes.naam}
          </p>
          <span className="text-lg text-ternary-dark dark:text-ternary-light">
            {props.attributes.korte_beschrijving}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GallerySingle;
