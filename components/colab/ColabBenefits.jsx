import Image from "next/image";
import Link from "next/link";
import HomeSection from "../home/HomeSection";

// Which project illustrates which benefit: defaults in project order. A
// benefit with no matching project renders without a photograph.
const VOORDELEN = [
  {
    naam: "Bepalen juiste doelstelling",
    tekst:
      "Het realiseren van een droomhuis of het neerzetten van een rendabele vastgoedinvestering? Twee aparte werelden. Zet de focus juist om het gewenste doel te bereiken.",
  },
  {
    naam: "Snelheid",
    tekst:
      "Voorbereiding, opvolging, planning en communicatie stroomlijnen uw bouwproces. Hierdoor treedt er tijdswinst op, die altijd gepaard gaat met financiële voordelen.",
  },
  {
    naam: "Kwaliteit",
    tekst:
      "Met een doenersmentaliteit zorgt H16 ervoor dat alles gedaan wordt én dat dit ook op een degelijke manier gebeurt. Langdurige samenwerkingen met aannemers maken het mogelijk om zekerheid over kwaliteit en nazorg in te bouwen.",
  },
  {
    naam: "Budgetcontrole",
    tekst:
      "H16 onderhandelt een goede prijs, élke factuur wordt gecontroleerd en het budget wordt opgevolgd. Zo wordt de gewenste doelstelling bereikt.",
  },
];

function ColabBenefits({ proof = [] }) {
  return (
    <HomeSection flip label="Waarom H16" title="Uw voordeel">
      <p className="text-lead text-gray-700 max-w-[52ch]">
        Elke dag van het bouwproces brengt nieuwe uitdagingen met zich mee. Het
        opvolgen ervan vraagt de juiste kennis, expertise en betrokkenheid.
        Voor velen is het realiseren van een bouwproject geen dagelijkse kost,
        voor H16 is het dat wel.
      </p>
      <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2">
        {VOORDELEN.map((v, i) => {
          const project = proof[i];
          return (
            <figure key={v.naam}>
              {project?.thumbnail && (
                <Link
                  href={`/realisaties/${project.slug}`}
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 rounded-sm"
                >
                  <span className="block relative aspect-[4/3] w-full overflow-hidden bg-ternary-light">
                    <Image
                      src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + project.thumbnail.url}
                      alt={project.naam || ""}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </span>
                  <figcaption className="mt-3 text-meta text-gray-500 group-hover:text-primary duration-200">
                    {project.naam}
                  </figcaption>
                </Link>
              )}
              <h3 className="mt-6 font-display text-h3 text-black">{v.naam}</h3>
              <p className="mt-4 text-body text-ternary-dark">{v.tekst}</p>
            </figure>
          );
        })}
      </div>
    </HomeSection>
  );
}

export default ColabBenefits;
