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
      className="flex flex-col min-h-[80vh] sm:justify-between items-center sm:flex-row md:my-10 md:mb-20"
    >
      <div className="w-full sm:w-4/6  text-left">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.7,
            delay: 0.3,
          }}
          className="font-balerno text-[38px] sm:text-[36px] md:text-[46px] lg:text-[60px] xl:text-[76px]  ml-3 w-5/6 sm:w-full mt-32 md:-mt-5 lg:-mt-26 xl:-mt-24  text-left sm:text-left leading-normal "
        >
          <Link
            href="/colab"
            className=" text-black font-balerno text-[38px] sm:text-[36px] md:text-[46px] lg:text-[60px] xl:text-[76px]  underline-offset-4 decoration-1 hover:text-accent cursor-pointer"
          >
            Bouwcoördinatie
          </Link>{" "}
          &{" "}
          <Link
            href="/colab"
            className="text-black font-balerno text-[38px] sm:text-[36px] md:text-[46px] lg:text-[60px] xl:text-[76px]  underline-offset-4 decoration-1 sm: hover:text-accent cursor-pointer"
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
      <ScrollRotate
        method={"perc"}
        throttle={0.1}
        animationDuration={0.3}
        from={3}
        to={-45}
      >
        <motion.div
          initial={{ opacity: 0, y: -130 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.1 }}
          className="w-full mt-20 p-10 sm:p-0 sm:pl-28 md:pl-12 lg:pl-20 2xl:pl-64 text-right float-right mt-10 md:mt-0 "
        >
          <img
            layout="responsive"
            src={"/images/H16_EMBLEEM_BLAUW.png"}
            alt="Kolibri"
          />
        </motion.div>
      </ScrollRotate>
    </motion.section>
  );
}

export default AppBanner;
