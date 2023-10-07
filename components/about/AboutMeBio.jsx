import Image from "next/image";
import { useState } from "react";
import { aboutMeData } from "../../data/aboutMeData";
import { ScrollRotate } from "react-scroll-rotate";
import PagesMetaHead from "../PagesMetaHead";

function AboutMeBio() {
  const [aboutMe, setAboutMe] = useState(aboutMeData);
  return (
    <div className="container px-0">
      <PagesMetaHead title="Over ons" />

      <section className="pt-5 sm:pt-10 mt-6 sm:mt-8">
        <div className="max-w-[70%] text-left">
          <p className=" font-general-medium text-2xl sm:text-4xl text-black dark:text-ternary-light ">
            Over ons
          </p>
        </div>
        <div className="block sm:flex sm:gap-10 sm:mt-12 items-center justify-between">
          <div className="mb-7 sm:mb-0 flex-grow">
            <ScrollRotate
              method={"perc"}
              throttle={0.1}
              animationDuration={0.3}
              from={-10}
              to={75}
            >
              <Image
                src="/images/H16_EMBLEEM_BLAUW.png"
                width={175}
                height={175}
                className="hidden sm:block rounded-sm"
                alt="Foto H16 Sfeer"
              />
            </ScrollRotate>
          </div>

          <div className="font-regular  mx-4 sm:mx-0 text-justify sm:w-3/4 text-left">
            <p className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
              H16 is een jong bedrijf met familiale wortels dat ontstaan is uit
              passie voor vastgoed. Deze passie, doorgegeven van generatie op
              generatie, wordt binnen H16 in de{" "}
              <span className="font-medium">praktijk</span> ingezet om het
              bouwproces{" "}
              <span className="font-medium">
                te stroomlijnen en te coördineren
              </span>
              .
            </p>
            <p className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
              Met een uitgekiende <span className="font-medium">planning</span>{" "}
              en focus op <span className="font-medium">efficiëntie</span>{" "}
              worden de <span className="font-medium">kwaliteit</span>, het{" "}
              <span className="font-medium">budget</span> en de{" "}
              <span className="font-medium">doorlooptijd</span> van een
              bouwproject geoptimaliseerd.
            </p>
            <p className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
              Daarvoor werkt H16 uitsluitend met betrouwbare vakmannen. Duurzame
              professionele relaties waar zowel H16 als de vakmannen eer
              uithalen, zijn ons ultieme streefdoel. Dankzij de ervaring en
              realisaties uit het verleden zijn talrijke mooie wisselwerkingen
              ontstaan. Dit geheel wordt telkens specifiek op maat van de
              persoonlijke wensen van de klant/opdrachtgever en elk uniek
              project afgestemd. De kleinschaligheid van H16 doet ruimte
              ontstaan voor{" "}
              <span className="font-medium">
                maatwerk, focus, reactiviteit en feilloze communicatie
              </span>{" "}
              met{" "}
              <span className="font-medium">één duidelijk aanspreekpunt</span>.
              Met de grootste vrijheid en flexibiliteit gaan we samen tot het
              uiterste om de wensen van de opdrachtgever te detecteren, te
              realiseren en van elk project{" "}
              <span className="font-medium">de best mogelijke versie</span> te
              maken.
            </p>
            <br />
            <p className="mb-4 text-ternary-dark dark:text-ternary-light text-lg">
              H16 wordt geleid door{" "}
              <span className="font-medium">Gilles De Brabander</span> en{" "}
              <span className="font-medium">Elena Versyp</span>. Naast
              professionele partners vormen Gilles en Elena ook in het dagelijks
              leven een sterke tandem.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMeBio;
