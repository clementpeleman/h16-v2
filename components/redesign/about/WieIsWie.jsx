import Image from "next/image";
import { PEOPLE } from "../../../data/people";
import { HAS_PORTRAIT } from "../../contact/FoundersPortrait";
import { SectionHead } from "../ui";

// «Wie is wie?». The text on the left; the right-hand columns hold the cast:
// the two people (names as h3, so each is a heading to jump to) and — once
// public/images/founders.jpg exists and HAS_PORTRAIT is flipped in
// components/contact/FoundersPortrait.jsx — their portrait above them, the
// same swap the homepage's Mensen section makes. The portrait is not a
// numbered plate: it is not a photograph of work.
export default function WieIsWie() {
  return (
    <section
      aria-labelledby="mensen-titel"
      // Row 2 is the flexible one: a portrait spanning rows 1–2 grows row 2,
      // never the heading row, so the lead stays close under «Wie is wie?».
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:gap-x-6"
    >
      <SectionHead
        label="De mensen"
        title="Wie is wie?"
        id="mensen-titel"
        className="lg:col-span-7 lg:row-start-1"
      />

      {HAS_PORTRAIT && (
        <figure className="mt-8 w-3/4 md:w-1/2 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:w-auto lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-plate">
            <Image
              src="/images/founders.jpg"
              alt="Gilles De Brabander en Elena Versyp"
              fill
              sizes="(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 299px, (min-width:768px) 360px, 75vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-ui text-primary">
            Gilles De Brabander &amp; Elena Versyp
          </figcaption>
        </figure>
      )}

      <div className="mt-8 lg:col-span-7 lg:row-start-2">
        <p className="max-w-[46ch] text-lead text-ink">
          H16 wordt geleid door Gilles De Brabander en Elena Versyp. Naast
          professionele partners vormen Gilles en Elena ook in het dagelijks
          leven een sterke tandem.
        </p>
        <p className="mt-4 max-w-[58ch] text-body text-ink hyphens-auto">
          Door onze complementaire capaciteiten in ons klein bedrijf te
          bundelen, slagen we erin om zeer persoonlijk en gefocust te werken,
          zodat onze realisaties volledig aansluiten op de wensen van de
          opdrachtgever. Met een betrokkenheid op élke dag van het bouwproces
          zorgen we voor kwaliteit in uitvoering, controle van het budget en de
          uitvoeringstermijn.
        </p>
      </div>

      <ul
        className={`mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:self-start ${
          HAS_PORTRAIT ? "lg:row-start-3" : "lg:row-start-2 lg:mt-8"
        }`}
      >
        {PEOPLE.map((p) => (
          <li key={p.naam} className="border-t border-rule pt-4">
            <h3 className="font-display text-h3 font-normal text-primary">
              {p.naam}
            </h3>
            <p lang="en" className="mt-1 text-meta text-primary-muted">
              {p.rol}
            </p>
            <p className="mt-2 text-body text-ink">{p.eigenschappen}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
