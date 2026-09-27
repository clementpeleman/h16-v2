import Link from "next/link";
import HomeSection from "../home/HomeSection";

// Professionals are the minority audience; they read last and in the
// informal register that is theirs.
const PEERS = [
  {
    naam: "Ben je architect?",
    tekst:
      "Een bouwproces is intensief en tijdrovend. Wil je je als architect focussen op ontwerp? Dan nemen wij graag een deel van het uitvoerend werk uit handen.",
  },
  {
    naam: "Ben je aannemer?",
    tekst:
      "We slaan graag de handen in elkaar met kwalitatieve aannemers voor een duurzame relatie waarbij klantgerichtheid en kwaliteit centraal staan.",
  },
];

// One component for both places the professionals are addressed, so the copy
// cannot drift: on /samenwerken it is the target (#professionals), on the
// homepage it is a teaser (headings only) that links there.
function ColabPeers({ id, link = false }) {
  return (
    <HomeSection id={id} label="Professionals" title="Voor architecten en aannemers">
      <ul className="grid gap-10 sm:grid-cols-2 sm:gap-10">
        {PEERS.map((p) => (
          <li key={p.naam} className="border-t border-gray-200 pt-6">
            <h3 className="font-display text-h3 text-black">{p.naam}</h3>
            {!link && <p className="mt-4 text-body text-ternary-dark">{p.tekst}</p>}
          </li>
        ))}
      </ul>
      {link && (
        <p className="mt-10">
          <Link
            href="/samenwerken#professionals"
            className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
          >
            Zo werken wij samen
          </Link>
        </p>
      )}
    </HomeSection>
  );
}

export default ColabPeers;
