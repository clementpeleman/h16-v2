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

function ColabPeers() {
  return (
    <HomeSection label="Professionals" title="Voor architecten en aannemers">
      <ul className="grid gap-10 sm:grid-cols-2 sm:gap-10">
        {PEERS.map((p) => (
          <li key={p.naam} className="border-t border-gray-200 pt-6">
            <h3 className="font-display text-h3 text-black">{p.naam}</h3>
            <p className="mt-4 text-body text-ternary-dark">{p.tekst}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

export default ColabPeers;
