import HomeSection from "../home/HomeSection";

const DIENSTEN = [
  {
    naam: "Bouwcoördinatie en adviesverlening",
    tekst:
      "Staat u voor een bouwproject maar loopt u verloren? Op zoek naar zeer concrete hulp bij de effectieve uitvoering? Wij analyseren graag samen uw specifieke vastgoedsituatie of vragen, en coördineren uw vastgoedproject met de grootste zorg.",
  },
  {
    naam: "Projectontwikkeling",
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
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

export default ColabServices;
