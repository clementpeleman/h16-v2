import { ScrollRotate } from "react-scroll-rotate";
import Link from "next/link";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

function AppBanner() {
  const reducedMotion = usePrefersReducedMotion();

  const emblem = (
    <img
      src={"/images/H16_EMBLEEM_BLAUW.png"}
      alt=""
      className="w-full h-auto"
    />
  );

  return (
    <section
      style={{ "--enter-delay": "0.2s" }}
      className="enter-fade flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 mt-group lg:mt-24"
    >
      <div className="w-full lg:w-3/5">
        {/* The h1 used to be two links to /colab, which spent the hero's entire
            click budget on a secondary page and left the homepage with no
            contact affordance at any scroll depth. The title is a title now;
            the buttons below carry the intent. */}
        <h1
          style={{ "--enter-delay": "0.3s" }}
          className="enter-fade font-display text-black [text-wrap:balance] text-left"
        >
          <span
            lang="nl"
            className="block break-words hyphens-auto text-display"
          >
            Bouwcoördinatie
          </span>
          <span
            aria-hidden="true"
            className="block text-[clamp(1.5rem,4vw,2.25rem)] text-primary my-1 lg:my-2"
          >
            &amp;
          </span>
          <span
            lang="nl"
            className="block break-words hyphens-auto text-display"
          >
            Projectontwikkeling
          </span>
        </h1>

        <p
          style={{ "--enter-delay": "0.4s" }}
          className="enter-fade mt-8 max-w-[46ch] text-lead text-gray-700 text-left"
        >
          Een klein familiebedrijf uit Oosterzele. Wij nemen uw bouwproject
          van begin tot eind onder onze vleugels.
        </p>

        <div
          style={{ "--enter-delay": "0.5s" }}
          className="enter-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 justify-start"
        >
          <Link
            href="/contact"
            className="text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
          >
            Vraag vrijblijvend advies
          </Link>
          <Link
            href="/realisaties"
            className="inline-flex items-center self-center text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
          >
            Bekijk onze realisaties
          </Link>
        </div>
      </div>

      <div className="hidden lg:block lg:w-2/5">
        {/* Scroll-linked rotation is motion the visitor did not ask for. */}
        {reducedMotion ? (
          <div className="w-full text-center">{emblem}</div>
        ) : (
          <ScrollRotate
            method={"perc"}
            throttle={0}
            animationDuration={0.3}
            from={0}
            to={-45}
          >
            <div
              style={{ "--enter-delay": "0.1s" }}
              className="enter-fade w-full text-center"
            >
              {emblem}
            </div>
          </ScrollRotate>
        )}
      </div>
    </section>
  );
}

export default AppBanner;
