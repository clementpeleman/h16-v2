import Plate, { PlateLine } from "../Plate";
import { ArrowLink, SectionHead } from "../ui";

// The five words the old page set in bold stay emphasised, in the reading
// ink and one weight step up — not in blue, which on this site means "link".
function Em({ children }) {
  return <strong className="font-medium">{children}</strong>;
}

// «Onze meerwaarde». Head and lead share a baseline row (as the homepage
// werkwijze does); below them a square detail plate — craftsmanship beside
// «uitsluitend met betrouwbare vakmannen» — sits in the left margin and the
// three paragraphs in the right-hand columns. On phones the plate hangs
// flush to the LEFT edge, answering the title plate flush right.
export default function Meerwaarde({ plate, n }) {
  return (
    <section
      aria-labelledby="meerwaarde-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <SectionHead
        label="Onze meerwaarde"
        title="Meerwaarde voor uw project"
        id="meerwaarde-titel"
        className="lg:col-span-5 lg:row-start-1"
      />
      <p className="mt-6 max-w-[46ch] text-lead text-ink md:mt-8 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:self-end">
        Met een uitgekiende <Em>planning</Em> en focus op <Em>efficiëntie</Em>{" "}
        worden de <Em>kwaliteit</Em>, het <Em>budget</Em> en de{" "}
        <Em>doorlooptijd</Em> van een bouwproject geoptimaliseerd.
      </p>

      {plate && (
        <Plate
          image={plate.image}
          ratio="aspect-square"
          // A 2:3 photo in a square box is cropped top/bottom only.
          sizes="(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 299px, (min-width:768px) 324px, 75vw"
          reveal
          className="-ml-4 mt-10 w-3/4 sm:-ml-6 md:ml-0 md:w-[45%] lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-group lg:w-auto lg:self-start"
        >
          <PlateLine
            n={n}
            naam={plate.project.naam}
            href={`/realisaties/${plate.project.slug}`}
            meta={plate.project.meta}
            className="pl-4 sm:pl-6 md:pl-0"
          />
        </Plate>
      )}

      <div className="mt-10 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-group">
        <div className="max-w-[62ch] text-body text-ink hyphens-auto">
          <p>
            Daarvoor werkt H16 uitsluitend met betrouwbare vakmannen. Duurzame
            professionele relaties waar zowel H16 als de vakmannen eer uithalen,
            zijn ons ultieme streefdoel. Dankzij de ervaring en realisaties uit
            het verleden zijn talrijke mooie wisselwerkingen ontstaan.
          </p>
          <p className="mt-4">
            Dit geheel wordt telkens specifiek op maat van de persoonlijke
            wensen van de klant/opdrachtgever en elk uniek project afgestemd. De
            kleinschaligheid van H16 doet ruimte ontstaan voor maatwerk, focus,
            reactiviteit en feilloze communicatie met één duidelijk
            aanspreekpunt.
          </p>
          <p className="mt-4">
            Met de grootste vrijheid en flexibiliteit gaan we samen tot het
            uiterste om de wensen van de opdrachtgever te detecteren, te
            realiseren en van elk project <Em>de best mogelijke versie</Em> te
            maken.
          </p>
        </div>
        <p className="mt-8 md:mt-10">
          <ArrowLink
            href="/bouwcoordinatie#werkwijze"
            data-track="about-werkwijze"
          >
            Bekijk onze werkwijze
          </ArrowLink>
        </p>
      </div>
    </section>
  );
}
