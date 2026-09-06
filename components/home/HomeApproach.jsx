import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import HomeSection from "./HomeSection";

const TYPED_WORDS = [
  "Flexibiliteit",
  "Wendbaarheid",
  "Nieuwe inzichten",
  "Focus op doel",
  "Persoonlijke aanpak",
  "Uniek eindresultaat",
];

function HomeApproach() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <HomeSection
      label="Onze aanpak"
      title={
        <>
          Jouw <span className="text-accent">bouwproject</span> onder onze
          vleugels?
        </>
      }
    >
      <p className="text-lead text-gray-700 max-w-[52ch]">
        Gedreven door passie voor vastgoed en middels degelijke samenwerkingen
        neemt H16 uw vastgoedproject onder de vleugels. Onze kracht is
        flexibiliteit en wendbaarheid, net als de kolibrie in zijn soepele
        vlucht. Elk perspectief wordt ten gronde bekeken, veranderen van
        perspectief gebeurt snel en levert nieuwe inzichten op. Wij houden de
        focus op het doel tot zolang het bereikt is. Met een persoonlijke
        aanpak binnen ons klein bedrijf wordt de opdrachtgever totaal ontzorgd
        in het realiseren van een uniek eindresultaat.
      </p>

      {/* The distilled version of the paragraph, in the display face. Fixed
          two-line height so the loop never shifts the section; reduced motion
          gets the six words at rest (WCAG 2.2.2). */}
      <div className="mt-14">
        <div className="min-h-[2.5em] font-display text-h1 text-black [text-wrap:balance]">
          {reducedMotion ? (
            <span>{TYPED_WORDS.join(", ")}</span>
          ) : (
            <TypeAnimation
              sequence={TYPED_WORDS.flatMap((w) => [w, 1200])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          )}
        </div>
      </div>

      <p className="mt-14">
        <Link
          href="/samenwerken"
          className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          Bekijk onze werkwijze
        </Link>
      </p>
    </HomeSection>
  );
}

export default HomeApproach;
