import Link from "next/link";
import Plate, { PlateLine } from "./Plate";
import { company } from "../../data/companyData";

const largeLink =
  "group/link text-lead font-medium text-primary underline decoration-1 underline-offset-[6px] hover:decoration-2 focus-ring";
const smallLink =
  "text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring";

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="relative left-0 motion-safe:transition-[left] motion-safe:duration-150 group-hover/link:left-[3px]"
    >
      →
    </span>
  );
}

// One service "door": its plate, caption, then its heading, copy and two
// links. At 1024+ the article joins the section's rows through a subgrid with
// three rows — plate / caption / text — and the plate wrapper dissolves
// (display: contents), so the two plate BOXES share a bottom edge (not plate
// plus a caption of differing height) while their tops stagger.
function Door({
  id,
  plate,
  n,
  title,
  children,
  moreHref,
  contactHref,
  track,
  contactLabel,
  className,
  figureClass,
  plateClass,
  alignEnd = false,
  captionClass = "",
  ratio,
  sizes,
  priority,
  eager,
}) {
  return (
    <article
      aria-labelledby={id}
      className={`lg:row-span-3 lg:row-start-2 lg:grid lg:[grid-template-rows:subgrid] ${className}`}
    >
      <Plate
        image={plate.image}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        eager={eager}
        as="div"
        className={`${figureClass} lg:contents`}
        boxClassName={`${plateClass} lg:mt-12 ${alignEnd ? "lg:self-end" : ""}`}
      >
        {plate.project && (
          <PlateLine
            n={n}
            naam={plate.project.naam}
            href={`/realisaties/${plate.project.slug}`}
            meta={[plate.project.aard, plate.project.jaar]}
            className={captionClass}
          />
        )}
      </Plate>
      <div className="mt-10">
        <h2 id={id} className="font-display text-h2 font-normal text-primary">
          {title}
        </h2>
        {children}
        <div className="mt-8 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-baseline md:gap-x-6">
          <Link
            href={moreHref}
            className={`${largeLink} inline-block py-3 md:inline md:py-0`}
          >
            Meer over {title.toLowerCase()}
            {"\u00A0"}
            <Arrow />
          </Link>
          <Link
            href={contactHref}
            data-track={track}
            className={`${smallLink} inline-flex min-h-[44px] items-center md:inline md:min-h-0`}
          >
            {contactLabel}
            <span className="sr-only"> over {title.toLowerCase()}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Spread({
  werkgebied,
  bouwcoordinatie,
  projectontwikkeling,
}) {
  return (
    <section
      aria-labelledby="titel"
      className="container mx-auto pt-6 md:pt-10 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-14"
    >
      {/* Title page */}
      <div className="lg:col-span-7 lg:row-start-1 lg:flex lg:flex-col lg:justify-between">
        <p className="text-meta text-primary-muted">{werkgebied}</p>
        <h1
          id="titel"
          lang="nl"
          className="mt-5 font-display text-display font-normal text-primary hyphens-manual lg:mt-[110px]"
        >
          <span className="block">
            Bouw{"­"}coördinatie{" "}
            <span className="text-primary-muted">&amp;</span>
          </span>{" "}
          <span className="block">Project{"­"}ontwikkeling</span>
        </h1>
      </div>

      <div className="mt-5 md:mt-8 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 lg:self-start xl:col-span-4 xl:col-start-9">
        <p className="max-w-[36ch] text-lead text-ink md:max-w-[46ch] lg:max-w-[36ch]">
          Een klein familiebedrijf uit Oosterzele. Wij nemen uw bouwproject van
          begin tot eind onder onze vleugels.
        </p>
        <div className="mt-6 flex flex-col md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-x-6 lg:flex-col lg:items-start">
          <Link
            href="/contact"
            data-track="hero-advies"
            className="inline-flex h-[52px] w-full items-center justify-center bg-primary px-7 text-ui text-white underline-offset-4 transition-colors duration-150 hover:bg-primary-deep hover:underline active:translate-y-px focus-ring md:w-auto"
          >
            Vraag vrijblijvend advies
          </Link>
          <a
            href={company.phoneHref}
            className={`${smallLink} mt-2 inline-flex min-h-[44px] items-center md:mt-0 lg:mt-4 lg:min-h-0`}
          >
            Bel {company.phone}
          </a>
        </div>
      </div>

      {/* Door 1: bouwcoördinatie, the large square plate */}
      <Door
        id="dienst-bouwcoordinatie"
        n={1}
        plate={bouwcoordinatie.plate}
        captionClass="px-4 sm:px-6 md:px-0"
        title="Bouwcoördinatie"
        moreHref="/bouwcoordinatie"
        contactHref="/contact?dienst=bouwcoordinatie"
        contactLabel="Neem contact op"
        track="home-dienst-bouwcoordinatie"
        className="mt-8 lg:col-span-7 lg:col-start-1 lg:mt-0"
        figureClass="-mx-4 sm:-mx-6 md:mx-0"
        plateClass="md:w-3/4 lg:w-full"
        ratio="aspect-[4/5] md:aspect-square"
        // The 3:2 photo is cropped into a square (4:5 on phones), so it
        // renders 1.5× (1.875×) wider than its box — sizes declares that.
        sizes="(min-width:1536px) 1217px, (min-width:1280px) 993px, (min-width:1024px) 812px, (min-width:768px) 810px, 188vw"
        priority
      >
        <p className="mt-4 max-w-[62ch] text-body text-ink hyphens-auto lg:max-w-none lg:w-[85%]">
          {bouwcoordinatie.lead}
        </p>
        <ul className="mt-6 grid lg:w-[85%] xl:grid-cols-2 xl:gap-x-6">
          {bouwcoordinatie.punten.map((p) => (
            <li
              key={p}
              className="border-t border-rule pb-4 pt-3 text-body text-ink"
            >
              {p}
            </li>
          ))}
        </ul>
      </Door>

      {/* Door 2: projectontwikkeling, the smaller portrait plate */}
      <Door
        id="dienst-projectontwikkeling"
        n={2}
        plate={projectontwikkeling.plate}
        captionClass="pr-4 sm:pr-6 md:pr-0"
        title="Projectontwikkeling"
        moreHref="/projectontwikkeling"
        contactHref="/contact?dienst=projectontwikkeling"
        contactLabel="Neem contact op"
        track="home-dienst-projectontwikkeling"
        className="mt-[4.5rem] md:mt-group lg:col-span-4 lg:col-start-9 lg:mt-0"
        figureClass="ml-auto w-3/4 -mr-4 sm:-mr-6 md:mr-0 md:w-[45%]"
        plateClass=""
        alignEnd
        ratio="aspect-[3/4]"
        sizes="(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 299px, (min-width:768px) 324px, 75vw"
        eager
      >
        {projectontwikkeling.teksten.map((t) => (
          <p
            key={t}
            className="mt-4 max-w-[62ch] text-body text-ink hyphens-auto"
          >
            {t}
          </p>
        ))}
      </Door>
    </section>
  );
}
