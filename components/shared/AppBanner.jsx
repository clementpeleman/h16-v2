import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowDownCircle } from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

function AppBanner() {
  const [activeTheme] = useThemeSwitcher();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="flex flex-col min-h-[80vh] sm:justify-between items-center sm:flex-row md:my-10 md:mb-20"
    >
      <div className="w-full sm:w-1/2 break-words text-left">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.7,
            delay: 0.3,
          }}
          className="md:font-general-regular ml-3 w-5/6 sm:w-full mt-20 md:-mt-5 lg:-mt-26 xl:-mt-32 text-4xl md:text-4xl lg:text-5xl xl:text-7xl text-left sm:text-left leading-normal text-gray-800 dark:text-gray-200"
        >
          <span className=" text-black font-balerno text-[40px] lg:text-[60px] xl:text-[82px]  underline-offset-4 decoration-1 hover:text-accent cursor-pointer">
            bouwcoördinatie
          </span>{" "}
          &{" "}
          <span className="text-black font-balerno text-[40px] lg:text-[60px] xl:text-[82px]  underline-offset-4 decoration-1 sm: hover:text-accent cursor-pointer">
            project-ontwikkeling
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.9,
            delay: 0.1,
          }}
          className="flex justify-center sm:block"
        ></motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -130 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.1 }}
        className="w-full md:w-3/5 text-right float-right mt-10 md:mt-2"
      >
        <img layout="responsive" src={"/images/kolibri.png"} alt="Kolibri" />
      </motion.div>
    </motion.section>
  );
}

export default AppBanner;
