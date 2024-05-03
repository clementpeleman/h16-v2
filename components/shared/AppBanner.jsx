import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowDownCircle } from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { ScrollRotate } from "react-scroll-rotate";
import Link from "next/link";

function AppBanner() {
  const [activeTheme] = useThemeSwitcher();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      className="flex flex-col min-h-[80vh] sm:justify-between items-center sm:flex-row my-0 lg:my-10 sm:mb-20"
    >
      <div className="w-full sm:w-4/6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.7,
            delay: 0.3,
          }}
          className="font-balerno text-[9vw] sm:text-[38px] md:text-[46px] lg:text-[56px] xl:text-[62px] w-5/6  mt-16 md:-mt-5 lg:-mt-26 xl:-mt-24 text-center leading-normal "
        >
          <div className="flex items-center">
            <div>
          <Link
            href="/colab"
            className=" text-black font-balerno text-[10vw] sm:text-[42px] md:text-[52px] lg:text-[60px] xl:text-[68px]  underline-offset-4 decoration-1 hover:text-accent cursor-pointer"
          >
            Bouwcoördinatie
          </Link></div>{" "}<div className="mt-2 ml-4">
          &{" "}</div></div>
          <Link
            href="/colab"
            className="text-black font-balerno text-[10vw] sm:text-[42px] md:text-[52px] lg:text-[60px] xl:text-[68px] underline-offset-4 decoration-1 hover:text-accent cursor-pointer"
          >
            Projectontwikkeling
          </Link>
        </motion.div>
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
      <div className="w-3/4">
        <ScrollRotate
          method={"perc"}
          throttle={0}
          animationDuration={0.3}
          from={0}
          to={-45}
        >
          <motion.div
            initial={{ opacity: 0, y: 130 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.9, delay: 0.1 }}
            className="w-full mt-[10vh] sm:p-0 sm:pl-16 md:pl-12 lg:pl-28 xl:pl-32 2xl:pl-64 text-center float-center md:mt-0 "
          >
            <img
              layout="responsive"
              src={"/images/H16_EMBLEEM_BLAUW.png"}
              alt="Kolibri"
            />
          </motion.div>
        </ScrollRotate>
      </div>
    </motion.section>
  );
}

export default AppBanner;