import Link from "next/link";
import { ScrollRotate } from "react-scroll-rotate";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

// The first screen is the hero and nothing else: it takes most of the
// viewport height so the title, one sentence and one button have air around
// them, and the emblem sits in the right third of the same twelve-column grid
// the sections below use.
function HomeHero() {
  const reducedMotion = usePrefersReducedMotion();

  const emblem = (
    <img src="/images/H16_EMBLEEM_BLAUW.png" alt="" className="w-full h-auto" />
  );

  return (
    <section
      style={{ "--enter-delay": "0.2s" }}
      className="enter-fade grid gap-10 pt-12 sm:pt-16 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:pt-0"
    >
      <div className="lg:col-span-7">
        <h1
          style={{ "--enter-delay": "0.3s" }}
          className="enter-fade font-display text-black [text-wrap:balance]"
        >
          <span lang="nl" className="block break-words hyphens-auto text-display">
            Bouwcoördinatie
          </span>
          <span
            aria-hidden="true"
            className="block text-[clamp(1.5rem,4vw,2.25rem)] text-primary my-1 lg:my-2"
          >
            &amp;
          </span>
          <span lang="nl" className="block break-words hyphens-auto text-display">
            Projectontwikkeling
          </span>
        </h1>

        <p
          style={{ "--enter-delay": "0.4s" }}
          className="enter-fade mt-10 max-w-[42ch] text-lead text-gray-700"
        >
          Een klein familiebedrijf uit Oosterzele. Wij nemen uw bouwproject
          van begin tot eind onder onze vleugels.
        </p>

        <div
          style={{ "--enter-delay": "0.5s" }}
          className="enter-fade mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Link
            href="/contact"
            className="text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
          >
            Vraag vrijblijvend advies
          </Link>
          <Link
            href="/projects"
            className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
          >
            Bekijk onze realisaties
          </Link>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
        {reducedMotion ? (
          <div className="w-full">{emblem}</div>
        ) : (
          <ScrollRotate method="perc" throttle={0} animationDuration={0.3} from={0} to={-45}>
            <div style={{ "--enter-delay": "0.1s" }} className="enter-fade w-full">
              {emblem}
            </div>
          </ScrollRotate>
        )}
      </div>
    </section>
  );
}

export default HomeHero;
