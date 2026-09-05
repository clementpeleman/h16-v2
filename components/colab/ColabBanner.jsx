import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";

// One card spec for all three families. They used to have three: padding
// 32/40 vs 32/40 vs 24/32, heading-to-body gaps of 32 / 8 / 8, and gutters of
// 16 / 16 / 32 — the last one faked with per-child margins instead of a grid
// gap, which left the outer edges inset by 16 while the inner gutter was 32.
const cardClasses =
  "p-8 sm:p-10 bg-secondary-light shadow-sm transform transition-transform duration-200 hover:scale-[1.02]";

// Two peer offers are a comparison, not a list. Gutter (24/40) is now larger
// than the card's own padding (24/32), so the boundary between two cards is
// stronger than the space inside one — which is what makes them read as two.
const gridClasses = "grid gap-6 lg:gap-10 sm:grid-cols-2 list-none";

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
      <section className="mt-24 sm:mt-32 lg:mt-40">
        <h1 className="font-display text-h1 text-black [text-wrap:balance]">
          Samenwerken
        </h1>

        <h2 className="mt-8 sm:mt-10 text-h2 text-black">Wat kan H16 voor u betekenen?</h2>

        {/* The jump link used to sit inside the card row, where `justify-between`
            parked it at the far edge and left 196px of nothing beside the
            cards. It was also `hidden xl:flex`, so it only existed above
            1280px. It is a standalone link under the heading now, at every
            width, and it names its destination. */}
        <a
          href="#voordeel"
          className="mt-6 inline-flex items-center gap-2 text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          <FiArrowDown aria-hidden="true" className="h-5 w-5 shrink-0" />
          Uw voordeel
        </a>

        <ul className={`${gridClasses} mt-14 sm:mt-20`}>
          <li className={cardClasses}>
            <h3 className="text-h3">Bouwcoördinatie en Adviesverlening</h3>
            <p className="mt-6 text-black text-body">
              Staat u voor een bouwproject maar loopt u verloren? Op zoek naar
              zeer concrete hulp bij de effectieve uitvoering? Wij analyseren
              graag samen uw specifieke vastgoedsituatie of vragen, en
              coördineren uw vastgoedproject met de grootste zorg.
            </p>
          </li>

          <li className={cardClasses}>
            <h3 className="text-h3">Projectontwikkeling</h3>
            <p className="mt-6 text-black text-body">
              Bent u eigenaar en wilt u liever een grond of pand verkopen? Wij
              zijn ervaren en geïnteresseerd.
            </p>
          </li>
        </ul>

        <div className="my-24 sm:my-32 mx-auto max-w-2xl border-t-2 border-slate-200"></div>

        {/* This group addresses professional peers rather than clients, which
            is why its copy stays informal. The heading makes that deliberate. */}
        <h2 className="text-h2 text-black">Voor architecten en aannemers</h2>

        <ul className={`${gridClasses} mt-14 sm:mt-20`}>
          <li className={cardClasses}>
            <h3 className="text-h3">Ben je architect?</h3>
            <p className="mt-6 text-black text-body">
              Een bouwproces is intensief en tijdrovend. Wil je je als architect
              focussen op ontwerp? Dan nemen wij graag een deel van het
              uitvoerend werk uit handen.
            </p>
          </li>
          <li className={cardClasses}>
            <h3 className="text-h3">Ben je aannemer?</h3>
            <p className="mt-6 text-black text-body">
              We slaan graag de handen in elkaar met kwalitatieve aannemers voor
              een duurzame relatie waarbij klantgerichtheid en kwaliteit
              centraal staan.
            </p>
          </li>
        </ul>

        {/* `sm:pt-[1px]` used to live here purely to stop this element's top
            margin collapsing with its child heading's — two 96px margins held
            apart by a 1px hack, for a 217px gap nobody chose. The heading no
            longer carries its own margin, so the section owns the gap. */}
        <div id="voordeel" className="mt-24 sm:mt-32 lg:mt-40 scroll-mt-8">
          <h2 className="flex items-center text-h2 text-black">
            <FiArrowRight
              aria-hidden="true"
              className="h-8 w-8 mr-3 shrink-0 text-primary"
            />
            Uw voordeel?
          </h2>

          <p className="mt-6 text-black text-body max-w-[65ch]">
            Elke dag van het bouwproces brengt nieuwe uitdagingen met zich mee.
            Het opvolgen ervan vraagt de juiste kennis, expertise en
            betrokkenheid. Voor velen is het realiseren van een bouwproject geen
            dagelijkse kost, voor H16 is het dat wel.
          </p>

          <p className="mt-8 text-black text-lead font-strong max-w-[65ch]">
            Door een deskundige opvolging op uw project los te laten, treden
            enkele belangrijke voordelen op:
          </p>

          <div className={`${gridClasses} mt-14 sm:mt-20`}>
            {VOORDELEN.map((v, i) => {
              const project = proof[i];
              return (
                <div key={v.title} className={cardClasses}>
                  {project?.thumbnail && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block relative aspect-[4/3] w-full overflow-hidden bg-ternary-light mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 rounded-sm"
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_STRAPI_ASSET_URL +
                          project.thumbnail.url
                        }
                        alt={project.naam || ""}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </Link>
                  )}
                  <h3 className="text-h3 text-accent">{v.title}</h3>
                  {v.body.map((line) => (
                    <p key={line} className="mt-4 break-words text-black text-body">
                      {line}
                    </p>
                  ))}
                  {project?.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mt-4 inline-block text-meta text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
                    >
                      Bekijk {project.naam}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default ColabBanner;
