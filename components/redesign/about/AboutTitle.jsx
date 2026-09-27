import Plate, { PlateLine } from "../Plate";

// Title page of /about. Same device as the homepage title page: from 1024px
// the running line sits on the plate's top edge and the h1 + lead at the
// bottom, so the lead's last line lands on the plate's bottom edge (the plate
// BOX and its caption are placed separately in the grid via `lg:contents`).
// On phones the plate hangs flush to the right edge at three-quarter width,
// like the homepage's second plate.
export default function AboutTitle({ plate, n }) {
  return (
    <section
      aria-labelledby="titel"
      className="container mx-auto pt-6 md:pt-10 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-14"
    >
      <div className="lg:col-span-7 lg:row-start-1 lg:flex lg:flex-col lg:justify-between">
        <p className="text-meta text-primary-muted">
          Gilles De Brabander &amp; Elena Versyp
        </p>
        <div className="mt-5 lg:mt-16">
          <h1
            id="titel"
            className="font-display text-display font-normal text-primary"
          >
            Over ons
          </h1>
          <p className="mt-5 max-w-[36ch] text-lead text-ink md:mt-6 md:max-w-[46ch]">
            H16 is een jong bedrijf met familiale wortels dat ontstaan is uit
            passie voor vastgoed. Deze passie, doorgegeven van generatie op
            generatie, is binnen H16 de drijvende kracht van élke dag.
          </p>
        </div>
      </div>

      {plate && (
        <Plate
          as="div"
          image={plate.image}
          ratio="aspect-[3/4]"
          // A 2:3 photo in a 3:4 box is cropped top/bottom only, so it
          // renders at the box width.
          sizes="(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 299px, (min-width:768px) 324px, 75vw"
          priority
          className="-mr-4 ml-auto mt-10 w-3/4 sm:-mr-6 md:mr-0 md:w-[45%] lg:contents"
          boxClassName="lg:col-span-4 lg:col-start-9 lg:row-start-1"
        >
          <PlateLine
            n={n}
            naam={plate.project.naam}
            href={`/realisaties/${plate.project.slug}`}
            meta={plate.project.meta}
            className="pr-4 sm:pr-6 md:pr-0 lg:col-span-4 lg:col-start-9 lg:row-start-2"
          />
        </Plate>
      )}
    </section>
  );
}
