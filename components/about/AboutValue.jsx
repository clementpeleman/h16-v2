import HomeSection from "../home/HomeSection";

function AboutValue() {
  return (
    <HomeSection label="Onze meerwaarde" title="Meerwaarde voor uw project">
      <p className="text-lead text-gray-700 max-w-[52ch]">
        Met een uitgekiende <span className="font-strong text-black">planning</span>{" "}
        en focus op <span className="font-strong text-black">efficiëntie</span>{" "}
        worden de <span className="font-strong text-black">kwaliteit</span>, het{" "}
        <span className="font-strong text-black">budget</span> en de{" "}
        <span className="font-strong text-black">doorlooptijd</span> van een
        bouwproject geoptimaliseerd.
      </p>
      <div className="mt-8 max-w-[62ch] text-body text-ternary-dark space-y-5">
        <p>
          Daarvoor werkt H16 uitsluitend met betrouwbare vakmannen. Duurzame
          professionele relaties waar zowel H16 als de vakmannen eer uithalen,
          zijn ons ultieme streefdoel. Dankzij de ervaring en realisaties uit
          het verleden zijn talrijke mooie wisselwerkingen ontstaan.
        </p>
        <p>
          Dit geheel wordt telkens specifiek op maat van de persoonlijke wensen
          van de klant/opdrachtgever en elk uniek project afgestemd. De
          kleinschaligheid van H16 doet ruimte ontstaan voor maatwerk, focus,
          reactiviteit en feilloze communicatie met één duidelijk
          aanspreekpunt.
        </p>
        <p>
          Met de grootste vrijheid en flexibiliteit gaan we samen tot het
          uiterste om de wensen van de opdrachtgever te detecteren, te
          realiseren en van elk project{" "}
          <span className="font-strong text-black">de best mogelijke versie</span>{" "}
          te maken.
        </p>
      </div>
    </HomeSection>
  );
}

export default AboutValue;
