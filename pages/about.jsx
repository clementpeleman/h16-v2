import AboutCounter from "../components/about/AboutCounter";
import AboutMeBio from "../components/about/AboutMeBio";
import PagesMetaHead from "../components/PagesMetaHead";
import AboutCTA from "../components/about/AboutCTA";
import UseScrollToTop from "../hooks/useScrollToTop";

function about() {
  return (
    <div>
      <PagesMetaHead
        title="Over ons"
        description="H16 is een jong familiebedrijf met wortels in het vastgoed. Maak kennis met Gilles en Elena en met onze manier van werken."
      />

      <div
      className="enter-fade container mx-auto"
    >
        <AboutMeBio />
      </div>

      {/** Counter without paddings */}
      <div
      className="enter-fade"
    >
        <AboutCounter />
        <AboutCTA />
      </div>


      <UseScrollToTop />
    </div>
  );
}

export default about;
