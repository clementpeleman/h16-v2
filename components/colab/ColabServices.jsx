import Link from "next/link";
import HomeSection from "../home/HomeSection";
import { DIENST_META } from "../../data/dienstMeta";

const DIENSTEN = [
  {
    naam: "Bouwcoördinatie en adviesverlening",
    slug: "bouwcoordinatie",
    tekst:
      "Staat u voor een bouwproject maar loopt u verloren? Op zoek naar zeer concrete hulp bij de effectieve uitvoering? Wij analyseren graag samen uw specifieke vastgoedsituatie of vragen, en coördineren uw vastgoedproject met de grootste zorg.",
  },
  {
    naam: "Projectontwikkeling",
    slug: "projectontwikkeling",
    tekst:
      "Bent u eigenaar en wilt u liever een grond of pand verkopen? Wij zijn ervaren en geïnteresseerd.",
  },
];

function ColabServices() {
  return (
    <HomeSection label="Diensten" title="Twee manieren om samen te werken">
      <ul className="grid gap-10 sm:grid-cols-2 sm:gap-10">
        {DIENSTEN.map((d) => (
          <li key={d.naam} className="border-t border-gray-200 pt-6">
            <h3 className="font-display text-h3 text-black">{d.naam}</h3>
            <p className="mt-4 text-body text-ternary-dark">{d.tekst}</p>
            {/* Each card leads on to its own page once that is published. */}
            {DIENST_META[d.slug]?.ready && (
              <p className="mt-6">
                <Link
                  href={`/${d.slug}`}
                  className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
                >
                  Meer over {DIENST_META[d.slug].naam.toLowerCase()}
                </Link>
              </p>
            )}
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

export default ColabServices;
