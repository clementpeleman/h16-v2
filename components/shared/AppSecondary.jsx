import Link from "next/link";
import React, { Component } from "react";

export class AppSecondary extends Component {
  render() {
    return (
      <div className=" text-md md:text-xl">
        <div className="hidden sm:block my-40 text-right">
          <p className="font-general-medium italic text-2xl sm:text-3xl mb-5 text-black dark:text-ternary-light font-opensans">
            De kolibrie als symbool van H16
          </p>
          <div className="max-w-[620px] md:max-w-[1060px] text-justify ml-auto text-gray-500">
            <span className="">
              Door zijn compact formaat en priemvormige snavel is de kolibrie
              een zeer fascinerend en herkenbaar vogeltje dat zich laat
              onderscheiden door zijn{" "}
            </span>
            <span className=" decoration-1 cursor-pointer transition-all text-primary hover:text-4xl font-normal font-opensans">
              uitstekend vliegvermogen
            </span>
            <span className="">
              . Hij is in vele opzichten uniek in zijn soort en heeft talenten
              die andere vogels niet hebben. Hij vliegt in alle richtingen, maar
              ook ter plaatse én achterwaarts. Hij is razendsnel en komt uit
              volle vlucht meteen tot stilstand. Met het flapperen van zijn
              vleugels worden
            </span>
            <span className="text-black  font-normal"> </span>
            <span className=" decoration-1 cursor-pointer transition-all text-primary hover:text-4xl font-normal font-opensans">
              ongeziene frequenties
            </span>
            <span className="text-blackfont-normal"> </span>
            <span className="">
              bereikt. Daarnaast bestaat er een eeuwenoude symboliek rond dit
              vogeltje: in vele culturen werd hij steeds gezien als de
              boodschapper van{" "}
            </span>
            <span className=" decoration-1 cursor-pointer transition-all text-primary  hover:text-4xl font-normal font-opensans">
              liefde en vreugde
            </span>
            <span className="">
              . De kolibrie benut al deze unieke gaven en weet zijn talenten te
              gebruiken om zijn doelen te bereiken, net als H16.
            </span>
          </div>
        </div>
        <div className="sm:pt-30 mt-20 border-t-2 border-gray-200 dark:border-secondary-dark"></div>
        <div className="mt-12 sm:mt-20 mx-4 sm:mx-0 mb-12 sm:mb-8 flex flex-col sm:flex-row place-content-between">
          <p className="font-general-medium  text-2xl sm:text-4xl sm:mb-2 text-black dark:text-ternary-light">
            Jouw <span className="text-accent">bouwproject</span> onder onze
            kolibrie-vleugels?
          </p>

          <Link
            href="/about"
            className="font-general-medium inline-block self-center sm:self-auto text-lg text-center max-h-14 xl:max-h-24 border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm mt-10 sm:mt-0 sm:mr-4 lg:mr-16 px-0 sm:px-4 py-3 duration-300 w-48"
            aria-label="Hire Me Button"
          >
            Ontdek meer
          </Link>
        </div>
        <p className="hidden sm:block max-w-[620px] md:max-w-[1060px] text-justify text-gray-500 text-xl">
          Gedreven door passie voor vastgoed en middels degelijke samenwerkingen{" "}
          {/* <span className="text-accent font-opensans"> */}
          neemt H16 uw vastgoedproject onder de vleugels
          {/* </span> */}. Onze kracht is
          <span className="text-accent font-opensans">
            {" "}
            flexibiliteit
          </span> en{" "}
          <span className="text-accent font-opensans">wendbaarheid</span>, net
          als de kolibrie in zijn soepele vlucht. Elk perspectief wordt ten
          gronde bekeken, veranderen van perspectief gebeurt snel en levert{" "}
          <span className="text-accent font-opensans">nieuwe inzichten</span>{" "}
          op. Wij houden de{" "}
          <span className="text-accent font-opensans">focus op het doel</span>{" "}
          tot zolang het bereikt is. Met een persoonlijke aanpak binnen ons
          klein bedrijf wordt de opdrachtgever totaal ontzorgd in het realiseren
          van een uniek eindresultaat.
        </p>

        <div className=" sm:pt-30 sm:mt-20 mt-12 border-t-2 border-gray-200 dark:border-secondary-dark"></div>
      </div>
    );
  }
}

export default AppSecondary;
