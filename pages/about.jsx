import AboutCounter from "../components/about/AboutCounter";
import AboutMeBio from "../components/about/AboutMeBio";
import PagesMetaHead from "../components/PagesMetaHead";
import AboutCTA from "../components/about/AboutCTA";
import AboutEmblem from "../components/about/AboutEmblem";

function about() {
  return (
    <div>
      <PagesMetaHead
        title="Over ons"
        description="H16 is een jong familiebedrijf met wortels in het vastgoed. Maak kennis met Gilles en Elena en met onze manier van werken."
      />

      <div className="enter-fade container mx-auto">
        <AboutMeBio />
        <AboutCounter />
        <AboutEmblem />
        <AboutCTA />
      </div>
    </div>
  );
}

export default about;
