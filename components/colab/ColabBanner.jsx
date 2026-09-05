import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";

// Which project illustrates which benefit. These are DEFAULTS in project
// order — set them deliberately once you know which job best demonstrates
// each point. A benefit with no matching project simply renders without an
// image; nothing breaks and no claim is invented.
const VOORDELEN = [
  {
    title: "Bepalen juiste doelstelling",
    body: [
      "Het realiseren van een droomhuis of het neerzetten van een rendabele vastgoedinvestering?",
      "Twee aparte werelden. Zet de focus juist om het gewenste doel te bereiken.",
    ],
  },
  {
    title: "Snelheid",
    body: [
      "Voorbereiding, opvolging, planning en communicatie stroomlijnen uw bouwproces.",
      "Hierdoor treedt er tijdswinst op, die altijd gepaard gaat met financiële voordelen.",
    ],
  },
  {
    title: "Kwaliteit",
    body: [
      "Met een doenersmentaliteit zorgt H16 ervoor dat alles gedaan wordt én dat dit ook op een degelijke manier gebeurt.",
      "Langdurige samenwerkingen met aannemers maken het mogelijk om zekerheid over kwaliteit en nazorg in te bouwen.",
    ],
  },
  {
    title: "Budgetcontrole",
    body: [
      "H16 onderhandelt een goede prijs, élke factuur wordt gecontroleerd en het budget wordt opgevolgd.",
      "Zo wordt de gewenste doelstelling bereikt.",
    ],
  },
];

export class ColabBanner extends Component {
  render() {
    const proof = this.props.proof ?? [];
    return (
      <section className="mt-section">
        <h1 className="font-display text-h1 text-black [text-wrap:balance]">
          Samenwerken
        </h1>
        <p className="mt-6 max-w-[52ch] text-lead text-gray-700">
          Wat kan H16 voor u betekenen? Twee manieren om samen te werken, en
          vier redenen waarom dat loont.
        </p>

        {/* Two peer offers, plain proximity. They were white cards with a
            hover scale on a non-interactive element — the box was decorative,
            and the 40px gutter already outweighs the 24px heading-to-body gap. */}
        <ul className="mt-group grid gap-x-10 gap-y-14 lg:gap-x-16 sm:grid-cols-2 list-none">
          <li>
            <h2 className="text-h3 text-black">Bouwcoördinatie en Adviesverlening</h2>
            <p className="mt-4 text-body text-ternary-dark">
              Staat u voor een bouwproject maar loopt u verloren? Op zoek naar
              zeer concrete hulp bij de effectieve uitvoering? Wij analyseren
              graag samen uw specifieke vastgoedsituatie of vragen, en
              coördineren uw vastgoedproject met de grootste zorg.
            </p>
          </li>
          <li>
            <h2 className="text-h3 text-black">Projectontwikkeling</h2>
            <p className="mt-4 text-body text-ternary-dark">
              Bent u eigenaar en wilt u liever een grond of pand verkopen? Wij
              zijn ervaren en geïnteresseerd.
            </p>
          </li>
        </ul>

        {/* The four advantages, proven by real work. The photograph is the
            frame — no white box, no duplicate "Bekijk" link; the image and its
            caption are the link. */}
        <div id="voordeel" className="mt-section">
          <h2 className="text-h2 text-black">Uw voordeel</h2>
          <p className="mt-6 max-w-[65ch] text-body text-ternary-dark">
            Elke dag van het bouwproces brengt nieuwe uitdagingen met zich mee.
            Het opvolgen ervan vraagt de juiste kennis, expertise en
            betrokkenheid. Voor velen is het realiseren van een bouwproject geen
            dagelijkse kost, voor H16 is het dat wel.
          </p>

          <div className="mt-group grid gap-x-10 gap-y-14 lg:gap-x-16 sm:grid-cols-2">
            {VOORDELEN.map((v, i) => {
              const project = proof[i];
              return (
                <figure key={v.title}>
                  {project?.thumbnail && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 rounded-sm"
                    >
                      <span className="block relative aspect-[4/3] w-full overflow-hidden bg-ternary-light">
                        <Image
                          src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + project.thumbnail.url}
                          alt={project.naam || ""}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </span>
                      <figcaption className="mt-3 text-meta text-ternary-dark group-hover:text-primary duration-200">
                        {project.naam}
                      </figcaption>
                    </Link>
                  )}
                  <h3 className="mt-5 text-h3 text-accent">{v.title}</h3>
                  {v.body.map((line) => (
                    <p key={line} className="mt-3 text-body text-ternary-dark">
                      {line}
                    </p>
                  ))}
                </figure>
              );
            })}
          </div>
        </div>

        {/* Professionals are the minority audience; they read last, quieter,
            and in the informal register that is theirs. */}
        <div className="mt-section">
          <h2 className="text-h2 text-black">Voor architecten en aannemers</h2>
          <ul className="mt-group grid gap-x-10 gap-y-12 lg:gap-x-16 sm:grid-cols-2 list-none">
            <li>
              <h3 className="text-h3 text-black">Ben je architect?</h3>
              <p className="mt-4 text-body text-ternary-dark">
                Een bouwproces is intensief en tijdrovend. Wil je je als
                architect focussen op ontwerp? Dan nemen wij graag een deel van
                het uitvoerend werk uit handen.
              </p>
            </li>
            <li>
              <h3 className="text-h3 text-black">Ben je aannemer?</h3>
              <p className="mt-4 text-body text-ternary-dark">
                We slaan graag de handen in elkaar met kwalitatieve aannemers
                voor een duurzame relatie waarbij klantgerichtheid en kwaliteit
                centraal staan.
              </p>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default ColabBanner;
