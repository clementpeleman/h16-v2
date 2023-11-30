import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import HireMeModal from "../HireMeModal";
import logo from "../../public/images/logo.png";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTheme, setTheme] = useThemeSwitcher();

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  function showHireMeModal() {
    if (!showModal) {
      document
        .getElementsByTagName("html")[0]
        .classList.add("overflow-y-hidden");
      setShowModal(true);
    } else {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("overflow-y-hidden");
      setShowModal(false);
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
      className="lg:container lg:mx-auto"
    >
      {/* Header */}
      <div className="z-10 max-w-screen-2xl xl:max-w-screen-2xl block lg:flex  lg:items-center py-6">
        {/* Header menu links and small screen hamburger menu */}
        <div className="flex justify-between items-center px-4 lg:px-0">
          <div>
            <Link href="/">
              {activeTheme === "dark" ? (
                <Image
                  src={logo}
                  className="w-36 cursor-pointer"
                  alt="Dark Logo"
                  width={150}
                  height={130}
                  priority
                />
              ) : (
                <Image
                  src={logo}
                  className="w-36 cursor-pointer"
                  alt="Dark Logo"
                  width={150}
                  height={130}
                />
              )}
            </Link>
          </div>

          {/* Theme switcher small screen */}
          {/* <div
						onClick={() => setTheme(activeTheme)}
						aria-label="Theme Switcher"
						className="block lg:hidden ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
					>
						{activeTheme === 'dark' ? (
							<FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
						) : (
							<FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
						)}
					</div> */}

          {/* Small screen hamburger menu */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none"
              aria-label="Hamburger Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
              >
                {showMenu ? (
                  <FiX className="text-3xl" />
                ) : (
                  <FiMenu className="text-3xl" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Header links small screen */}
        <div
          className={
            showMenu
              ? "block m-0 lg:ml-4 lg:mt-3 md:flex px-5 py-3 lg:p-0 justify-between items-center shadow-lg lg:shadow-none"
              : "hidden"
          }
        >
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2 my-8">
            <Link onClick={toggleMenu} href="/projects" aria-label="Projects">
              Projecten
            </Link>
          </div>
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2 border-t-2 pt-3 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
            <Link onClick={toggleMenu} href="/about" aria-label="About Me">
              Over ons
            </Link>
          </div>
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2 border-t-2 pt-3 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
            <Link onClick={toggleMenu} href="/gallery" aria-label="Galerij">
              Galerij
            </Link>
          </div>
          <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2 border-t-2 pt-3 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
            <Link onClick={toggleMenu} href="/contact" aria-label="Samenwerken">
              Samenwerken
            </Link>
          </div>
          <div className="border-t-2 pt-3 lg:pt-0 lg:border-t-0 border-primary-light dark:border-secondary-dark">
            <button
              onClick={showHireMeModal}
              className="font-general-medium lg:hidden block text-left text-md border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300 w-34"
              aria-label="Hire Me Button"
            >
              Contacteer ons
            </button>
          </div>
        </div>

        {/* Header links large screen */}
        <div className="font-general-medium hidden m-0 lg:ml-16 mt-5 lg:mt-5 lg:flex p-5 lg:p-0 justify-center items-center shadow-lg lg:shadow-none">
          <div
            className="block text-left text-xl font-medium text-black dark:text-ternary-light hover:text-primary dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2"
            aria-label="Projects"
          >
            <Link href="/projects">Projecten</Link>
          </div>
          <div
            className="block text-left text-xl font-medium text-black dark:text-ternary-light hover:text-primary dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2"
            aria-label="About Me"
          >
            <Link href="/about">Over ons</Link>
          </div>

          <div
            className="block text-left text-xl font-medium text-black dark:text-ternary-light hover:text-primary dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2"
            aria-label="Galerij"
          >
            <Link href="/gallery">Galerij</Link>
          </div>
          <div
            className="block text-left text-xl font-medium text-black dark:text-ternary-light hover:text-primary dark:hover:text-secondary-light  lg:mx-4 mb-2 lg:py-2"
            aria-label="Samenwerken"
          >
            <Link href="/contact">Samenwerken</Link>
          </div>
        </div>

        {/* Header right section buttons */}
        <div className="hidden lg:flex justify-between items-center flex-col md:flex-row ml-auto">
          <div className="hidden md:flex">
            <button
              onClick={showHireMeModal}
              className="text-lg font-general-medium border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm  px-6 py-3 duration-300"
              aria-label="Contact us"
            >
              Contacteer ons
            </button>
          </div>

          {/* Theme switcher large screen */}
          {/* <div
						onClick={() => setTheme(activeTheme)}
						aria-label="Theme Switcher"
						className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
					>
						{activeTheme === 'dark' ? (
							<FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
						) : (
							<FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
						)}
					</div> */}
        </div>
      </div>
      <div>
        {showModal ? (
          <HireMeModal onClose={showHireMeModal} onRequest={showHireMeModal} />
        ) : null}
        {showModal ? showHireMeModal : null}
      </div>
    </motion.nav>
  );
}

export default AppHeader;
