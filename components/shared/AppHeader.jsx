import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiX, FiMenu } from "react-icons/fi";
import logo from "../../public/images/logo.png";

const NAV_ITEMS = [
  { href: "/projects", label: "Projecten" },
  { href: "/about", label: "Over ons" },
  { href: "/colab", label: "Samenwerken" },
  { href: "/contact", label: "Contact" },
];

function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  // The visitor had no way of telling which page they were on. A route is
  // "current" for its own page and for anything nested under it, so a project
  // detail page still marks Projecten.
  const isCurrent = (href) =>
    router.pathname === href || router.pathname.startsWith(`${href}/`);

  const toggleMenu = () => setShowMenu((open) => !open);
  const closeMenu = () => setShowMenu(false);

  // Escape is the expected way out of anything that covers the page.
  useEffect(() => {
    if (!showMenu) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showMenu]);

  const linkClasses = (href) =>
    [
      "block text-left text-ui py-3 transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm",
      isCurrent(href)
        ? "text-primary underline underline-offset-8 decoration-2 decoration-primary"
        : "text-black hover:text-primary",
    ].join(" ");

  return (
    <nav id="nav" className="enter-fade container mx-auto">
      <div className="z-10 block lg:flex lg:items-center py-6">
        {/* Logo and small-screen menu toggle */}
        <div className="flex justify-between items-center">
          <Link
            href="/"
            aria-label="H16 Vastgoedontwikkeling, naar de startpagina"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
          >
            <Image
              src={logo}
              className="w-36 cursor-pointer"
              alt="H16 Vastgoedontwikkeling"
              width={150}
              height={130}
              priority
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 -mr-2 text-secondary-dark hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
              aria-label={showMenu ? "Menu sluiten" : "Menu openen"}
              aria-expanded={showMenu}
              aria-controls="mobile-menu"
            >
              {showMenu ? (
                <FiX className="h-7 w-7" aria-hidden="true" />
              ) : (
                <FiMenu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Small screen */}
        <div
          id="mobile-menu"
          className={
            showMenu
              ? "block lg:hidden -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background shadow-lg"
              : "hidden"
          }
        >
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.href}
              className="border-t border-primary-light first:border-t-0"
            >
              <Link
                onClick={closeMenu}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={linkClasses(item.href)}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <div className="border-t border-primary-light pt-4 pb-2">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block text-left text-ui border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm px-4 py-2 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300 w-fit"
            >
              Contacteer ons
            </Link>
          </div>
        </div>

        {/* Large screen */}
        <div className="hidden lg:flex lg:ml-12 items-center">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.href}
              className="mx-4"
            >
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={linkClasses(item.href)}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden lg:block ml-auto">
          <div>
            <Link
              href="/contact"
              className="text-ui border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
            >
              Contacteer ons
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
