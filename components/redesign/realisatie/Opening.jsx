import Link from "next/link";
import ZoomPlate from "./ZoomPlate";
import Beschrijving from "./Beschrijving";
import Colophon from "./Colophon";
import Offer, { Beschikbaarheid } from "./Offer";
import { isLandscape } from "./rows";

// The opening plate is never cropped; `sizes` is its rendered width.
const SIZES_LANDSCAPE =
  "(min-width:1536px) 1408px, (min-width:1280px) 1152px, (min-width:1024px) 944px, (min-width:768px) 720px, 100vw";
const SIZES_PORTRAIT =
  "(min-width:1536px) 692px, (min-width:1280px) 564px, (min-width:1024px) 460px, (min-width:768px) 480px, 100vw";

// The title page of one realisatie and the opening spread: back link, name,
// meta line (H16's role where confirmed, the availability) and the meta
// sentence; then Afb. 1 with «Over het project» beside it (a portrait) or
// under it (a landscape), the colophon and, for a property on offer, the
// enquiry.
export default function Opening({
  project,
  hero,
  metaZin,
  rol,
  prijs,
  isOffer,
  onOpen,
}) {
  const landscape = !hero || isLandscape(hero);
  const hasMeta = Boolean(rol || project.beschikbaarheid);

  return (
    <section
      aria-labelledby="titel"
      className="container mx-auto pt-3 md:pt-7 lg:pt-14"
    >
      <p>
        <Link
          href="/realisaties"
          className="group/link inline-block py-3 text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring lg:py-0"
        >
          <span
            aria-hidden="true"
            className="relative right-0 motion-safe:transition-[right] motion-safe:duration-150 group-hover/link:right-[3px]"
          >
            ←
          </span>
          {"\u00A0"}Alle realisaties
        </Link>
      </p>

      <div className="mt-3 md:mt-4 lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <h1
          id="titel"
          className="break-words font-display text-display font-normal text-primary hyphens-auto [text-wrap:balance] lg:col-span-7"
        >
          {project.naam}
        </h1>
        {(hasMeta || metaZin) && (
          <div className="mt-5 md:mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end xl:col-span-4 xl:col-start-9">
            {hasMeta && (
              <p className="text-meta text-primary-muted">
                {rol?.naam}
                {rol && project.beschikbaarheid && " · "}
                {project.beschikbaarheid &&
                  (isOffer ? (
                    <Beschikbaarheid label={project.beschikbaarheid} />
                  ) : (
                    project.beschikbaarheid
                  ))}
              </p>
            )}
            {metaZin && (
              <p
                className={`max-w-[36ch] text-lead text-ink ${hasMeta ? "mt-2" : ""}`}
              >
                {metaZin}
              </p>
            )}
          </div>
        )}
      </div>

      <div
        className={`mt-8 md:mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-6 ${
          landscape ? "" : "lg:grid-rows-[auto_1fr]"
        }`}
      >
        {hero && (
          <ZoomPlate
            image={hero}
            n={1}
            priority
            reveal={false}
            onOpen={onOpen(0)}
            sizes={landscape ? SIZES_LANDSCAPE : SIZES_PORTRAIT}
            className={
              landscape
                ? "-mx-4 sm:-mx-6 md:mx-0 lg:col-span-12"
                : "-mx-4 sm:-mx-6 md:mx-0 md:w-2/3 lg:col-span-6 lg:row-span-2 lg:row-start-1 lg:w-auto lg:self-start"
            }
            captionClassName="px-4 sm:px-6 md:px-0"
          />
        )}

        <h2
          id="over-titel"
          className={`font-display text-h1 font-normal text-primary [text-wrap:balance] ${
            !hero
              ? "lg:col-span-4"
              : landscape
                ? "mt-12 md:mt-group lg:col-span-4"
                : "mt-12 md:mt-group lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 xl:col-span-5 xl:col-start-8"
          }`}
        >
          Over het project
        </h2>

        <div
          className={`mt-6 ${
            !hero
              ? "lg:col-span-7 lg:col-start-6 lg:mt-0"
              : landscape
                ? "lg:col-span-7 lg:col-start-6 lg:mt-group xl:col-span-6"
                : "lg:col-span-6 lg:col-start-7 lg:row-start-2 xl:col-span-5 xl:col-start-8"
          }`}
        >
          <Beschrijving text={project.beschrijving} />
          <Colophon
            project={project}
            rol={rol}
            className="mt-10 max-w-[62ch]"
          />
          {isOffer && (
            <Offer
              project={project}
              prijs={prijs}
              className="mt-10 max-w-[62ch]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
