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
      className="flex flex-col min-h-[80vh] sm:justify-between items-center sm:flex-row sm:my-10 sm:mb-20"
    >
      <div className="w-full sm:w-4/6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.7,
            delay: 0.3,
          }}
          className="font-balerno text-[9vw] sm:text-[5vw] md:text-[46px] lg:text-[68px] xl:text-[70px]  ml-3 w-5/6 w-full mt-24 md:-mt-5 lg:-mt-26 xl:-mt-24 sm:text-left leading-normal "
        >
          <Link
            href="/colab"
            className=" text-black font-balerno text-[10vw] sm:text-[5vw] md:text-[52px] lg:text-[72px] xl:text-[82px]  underline-offset-4 decoration-1 hover:text-accent cursor-pointer"
          >
            Bouwcoördinatie
          </Link>{" "}
          &{" "}
          <Link
            href="/colab"
            className="text-black font-balerno text-[10vw] sm:text-[5vw] md:text-[52px] lg:text-[72px] xl:text-[82px] underline-offset-4 decoration-1 hover:text-accent cursor-pointer"
          >
            Projectontwikkeling
          </Link>
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
            className="w-full mt-[15vh] sm:p-0 sm:pl-28 md:pl-12 lg:pl-20 2xl:pl-64 text-center float-center md:mt-0 "
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
