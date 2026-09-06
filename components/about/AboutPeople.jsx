import HomeSection from "../home/HomeSection";

const PEOPLE = [
  {
    naam: "Gilles De Brabander",
    rol: "Construction manager",
    kleur: "text-primary",
    eigenschappen: "Technisch, planmatig, constructief.",
  },
  {
    naam: "Elena Versyp",
    rol: "Office manager",
    kleur: "text-accent",
    eigenschappen: "Praktisch, creatief, communicatief.",
  },
];

function AboutPeople() {
  return (
    <HomeSection flip label="De mensen" title="Wie is wie?">
      <p className="text-lead text-gray-700 max-w-[52ch]">
        H16 wordt geleid door Gilles De Brabander en Elena Versyp. Naast
        professionele partners vormen Gilles en Elena ook in het dagelijks
        leven een sterke tandem.
      </p>
      <p className="mt-6 max-w-[62ch] text-body text-ternary-dark">
        Door onze complementaire capaciteiten in ons klein bedrijf te bundelen,
        slagen we erin om zeer persoonlijk en gefocust te werken, zodat onze
        realisaties volledig aansluiten op de wensen van de opdrachtgever. Met
        een betrokkenheid op élke dag van het bouwproces zorgen we voor
        kwaliteit in uitvoering, controle van het budget en de
        uitvoeringstermijn.
      </p>

      {/* Same device as the three traits in the emblem section: a hairline,
          a name in the display face, one line. */}
      <ul className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-10 max-w-[62ch]">
        {PEOPLE.map((p) => (
          <li key={p.naam} className="border-t border-gray-200 pt-6">
            <h3 className="font-display text-h3 text-black">{p.naam}</h3>
            <p className={`mt-2 text-ui ${p.kleur}`}>{p.rol}</p>
            <p className="mt-4 text-body text-ternary-dark">{p.eigenschappen}</p>
          </li>
        ))}
      </ul>

    </HomeSection>
  );
}

export default AboutPeople;
