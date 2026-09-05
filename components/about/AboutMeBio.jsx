import Image from "next/image";
import { useState } from "react";
import { aboutMeData } from "../../data/aboutMeData";
import { ScrollRotate } from "react-scroll-rotate";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

function AboutMeBio() {
  const [aboutMe, setAboutMe] = useState(aboutMeData);
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div>

      <section className="mt-24 sm:mt-32 lg:mt-40">
        <div className="text-left">
          <h1 className="font-display text-h1 text-black [text-wrap:balance]">
            Over ons
          </h1>
        </div>
        <div className="block md:flex gap-10 lg:gap-16 mt-14 sm:mt-20">
          {/* `flex-grow` gave this column 436px to hold a 195px mark, so the
              emblem sat stranded in 241px of nothing. It is a margin mark: it
              gets exactly its own width and sits with the first heading. */}
          <div className="hidden lg:block shrink-0 w-[200px]">
            {reducedMotion ? (
              <Image
                src="/images/H16_EMBLEEM_BLAUW.png"
                width={175}
                height={175}
                className="rounded-sm"
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            ) : (
            <ScrollRotate
                method={"perc"}
                throttle={0.1}
                animationDuration={0.3}
                from={-10}
                to={55}
              >
                <Image
                  src="/images/H16_EMBLEEM_BLAUW.png"
                  width={175}
                  height={175}
                  className="rounded-sm"
                  alt=""
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </ScrollRotate>
            )}
          </div>

          <div className="flex flex-col text-left max-w-[70ch]">
            <h2 className="text-h2 mb-5 text-left text-black">
              Small is beautiful
            </h2>

            <p className="mb-6 text-black text-body">
              H16 is een jong bedrijf met familiale wortels dat ontstaan is uit
              passie voor vastgoed. Deze passie, doorgegeven van generatie op
              generatie, is binnen H16 de drijvende kracht van élke dag.
            </p>
            <h2 className="text-h2 mt-16 sm:mt-20 mb-5 text-left text-black">
              Meerwaarde voor uw project
            </h2>
            <p className="mb-4 text-black text-body">
              Met een uitgekiende <span className="font-strong">planning</span>{" "}
              en focus op <span className="font-strong">efficiëntie</span>{" "}
              worden de <span className="font-strong">kwaliteit</span>, het{" "}
              <span className="font-strong">budget</span> en de{" "}
              <span className="font-strong">doorlooptijd</span> van een
              bouwproject geoptimaliseerd.
            </p>
            <p className="mb-4 text-black text-body">
              Daarvoor werkt H16 uitsluitend met betrouwbare vakmannen. Duurzame
              professionele relaties waar zowel H16 als de vakmannen eer
              uithalen, zijn ons ultieme streefdoel. Dankzij de ervaring en
              realisaties uit het verleden zijn talrijke mooie wisselwerkingen
              ontstaan. Dit geheel wordt telkens specifiek op maat van de
              persoonlijke wensen van de klant/opdrachtgever en elk uniek
              project afgestemd. De kleinschaligheid van H16 doet ruimte
              ontstaan voor maatwerk, focus, reactiviteit en feilloze
              communicatie met één duidelijk aanspreekpunt. Met de grootste
              vrijheid en flexibiliteit gaan we samen tot het uiterste om de
              wensen van de opdrachtgever te detecteren, te realiseren en van
              elk project{" "}
              <span className="font-strong">de best mogelijke versie</span> te
              maken.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMeBio;
