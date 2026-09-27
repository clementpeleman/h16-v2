import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import useReveal from "../../hooks/useReveal";

// The frame every page shares: paper ground, skip link,
// sticky header, <main id="inhoud">, blue footer, plate reveal. Pages render
// their own <PagesMetaHead> and set `Page.ownLayout = true` so _app does not
// wrap them in the old DefaultLayout.
export default function V2Page({ children, footerDivider = true }) {
  useReveal();
  return (
    <>
      <style jsx global>{`
        html,
        body {
          background-color: #f6f6f3;
        }
        #inhoud,
        #inhoud :where(a, button, input, textarea, select, [tabindex], [id]),
        #site-footer a {
          scroll-margin-top: 88px;
        }
      `}</style>

      <a
        id="skip-link"
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-3 focus:text-ui focus:text-primary focus-ring"
      >
        Naar de inhoud
      </a>
      <SiteHeader />
      <main id="inhoud" tabIndex={-1} className="text-ink outline-none">
        {children}
      </main>
      <SiteFooter divider={footerDivider} />
    </>
  );
}
