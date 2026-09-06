import PagesMetaHead from "../components/PagesMetaHead";
import AboutIntro from "../components/about/AboutIntro";
import AboutValue from "../components/about/AboutValue";
import AboutPeople from "../components/about/AboutPeople";
import AboutEmblem from "../components/about/AboutEmblem";
import HomeContact from "../components/home/HomeContact";

function about() {
  return (
    <div>
      <PagesMetaHead
        title="Over ons"
        description="H16 is een jong familiebedrijf met wortels in het vastgoed. Maak kennis met Gilles en Elena en met onze manier van werken."
      />

      <div className="enter-fade container mx-auto">
        <AboutIntro />
        <AboutValue />
        <AboutPeople />
        <AboutEmblem />
        <HomeContact />
      </div>
    </div>
  );
}

export default about;
