import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiPhone } from "react-icons/fi";
import logo from "../../public/images/logo.png";
import NAV_ITEMS from "../../data/navigation";
import { company } from "../../data/companyData";

// Sticky paper bar with a hairline; it never hides, shrinks or recolours on
// scroll. Samenwerken is the button, so the nav lists the other pages; no phone
// number on desktop. Below 1024px: a phone icon and a text "Menu" toggle
// opening a full-height sheet.
const PAGES = NAV_ITEMS.filter((item) => item.href !== "/samenwerken");

export default function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  // asPath (the visible URL), so a nested page such as /realisaties/<slug>
  // still marks Realisaties.
  const path = (router.asPath || "/").split(/[?#]/)[0];
  const isCurrent = (href) => path === href || path.startsWith(`${href}/`);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    // preventScroll: the header is sticky, so a plain focus() would scroll
    // the document to "reveal" a control that is already on screen.
    if (returnFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // While the sheet is open: lock scroll, make the rest of the page inert,
  // move focus in, close on Escape and on navigation.
  useEffect(() => {
    if (!open) return undefined;
    const outside = ["skip-link", "inhoud", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    outside.forEach((el) => el.setAttribute("inert", ""));
    firstLinkRef.current?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const onRoute = () => close(false);
    // The sheet and its toggle only exist below 1024px; if the viewport
    // grows past that while it is open (rotation, resize), close it rather
    // than leave the page inert behind an invisible menu.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = (e) => {
      if (e.matches) close(false);
    };
    window.addEventListener("keydown", onKey);
    router.events.on("routeChangeStart", onRoute);
    wide.addEventListener("change", onWide);
    return () => {
      wide.removeEventListener("change", onWide);
      document.body.style.overflow = prevOverflow;
      outside.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      router.events.off("routeChangeStart", onRoute);
    };
  }, [open, close, router.events]);

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-rule">
      <div className="container mx-auto flex h-16 items-center justify-between lg:h-[72px]">
        <Link
          href="/"
          aria-label="H16 Vastgoedontwikkeling, naar de startpagina"
          className="focus-ring"
        >
          <Image
            src={logo}
            alt="H16 Vastgoedontwikkeling"
            priority
            sizes="112px"
            className="h-auto w-[88px] lg:w-[112px]"
          />
        </Link>

        {/* 1024 and up */}
        <div className="hidden items-center lg:flex">
          <nav aria-label="Hoofdnavigatie">
            <ul className="flex gap-7">
              {PAGES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={`py-2 text-ui text-primary decoration-1 underline-offset-[6px] hover:underline focus-ring ${
                      isCurrent(item.href) ? "underline" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/samenwerken"
            data-track="header-samenwerken"
            className="ml-8 inline-flex h-10 items-center bg-primary px-4 text-ui text-white underline-offset-4 transition-colors duration-150 hover:bg-primary-deep hover:underline active:translate-y-px focus-ring"
          >
            Samenwerken
          </Link>
        </div>

        {/* Below 1024 */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={company.phoneHref}
            aria-label={`Bel ${company.phone}`}
            className="inline-flex h-11 w-11 items-center justify-center text-primary focus-ring"
          >
            <FiPhone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-sheet"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={() => (open ? close() : setOpen(true))}
            className="h-11 px-2 text-ui text-primary underline-offset-4 hover:underline focus-ring"
          >
            {open ? "Sluiten" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-sheet"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper motion-safe:animate-[sheet_120ms_ease-out] lg:hidden"
        >
          <div className="container mx-auto pb-10 pt-4">
            <nav aria-label="Hoofdnavigatie">
              <ul>
                {PAGES.map((item, i) => (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className="flex min-h-[56px] items-center py-2 font-display text-h1 font-normal text-primary focus-ring"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/samenwerken"
              data-track="header-samenwerken"
              className="mt-8 flex h-[52px] w-full items-center justify-center bg-primary text-ui text-white transition-colors duration-150 hover:bg-primary-deep active:translate-y-px focus-ring"
            >
              Samenwerken
            </Link>
            <p className="mt-4">
              <a
                href={company.phoneHref}
                className="inline-flex min-h-[44px] items-center text-ui text-primary underline decoration-1 underline-offset-4 focus-ring"
              >
                Bel {company.phone}
              </a>
            </p>
            <p>
              <a
                href={company.emailHref}
                className="inline-flex min-h-[44px] items-center text-ui text-primary underline decoration-1 underline-offset-4 focus-ring"
              >
                {company.email}
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
