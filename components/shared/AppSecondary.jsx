import Link from "next/link";
import React, { Component } from "react";
import Image from "next/image";
import { ScrollRotate } from "react-scroll-rotate";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight } from "react-icons/fi";

export class AppSecondary extends Component {
  render() {
    return (
      <div className=" text-md md:text-xl">
        <div className="hidden sm:block mb-40 mt-24 text-right">
          <p className="text-2xl sm:text-4xl mb-5 text-black dark:text-ternary-light font-general-regular">
            De kolibrie als symbool van H16
          </p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex justify-center flex-grow mr-24">
              <ScrollRotate
                method={"perc"}
                throttle={0.1}
                animationDuration={0.3}
                from={300}
                to={850}
              >
                <Image
                  src="/images/H16_EMBLEEM_BLAUW.png"
                  width={100}
                  height={100}
                  alt="H16 Vogel"
                />
              </ScrollRotate>
            </div>
            <div className="max-w-[620px] md:max-w-[1115px] text-justify self-end text-gray-500">
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
                die andere vogels niet hebben. Hij vliegt in alle richtingen,
                maar ook ter plaatse én achterwaarts. Hij is razendsnel en komt
                uit volle vlucht meteen tot stilstand. Met het flapperen van
                zijn vleugels worden
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
                . De kolibrie benut al deze unieke gaven en weet zijn talenten
                te gebruiken om zijn doelen te bereiken, net als H16.
              </span>
            </div>
          </div>
        </div>
        <div className="sm:pt-30 mt-48 border-t-2 border-gray-200 dark:border-secondary-dark"></div>
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
        <div className="hidden sm:block max-w-[620px] md:max-w-[1060px] text-justify text-gray-500 text-xl">
          Gedreven door passie voor vastgoed en middels degelijke samenwerkingen
          neemt H16 uw vastgoedproject onder de vleugels.
          <br />
          <br />
          {/* <span className="font-general-medium text-3xl text-black">
            Onze krachten zijn:{" "}
          </span> */}
          {/* <ul className="list-none  list-inside">
            <li className="my-2">Flexibiliteit</li>
            <li className="my-2">Wendbaarheid</li>
            <li className="my-2">Nieuwe inzichten</li>
            <li className="my-2">Focus op doel</li>
            <li className="my-2">Persoonlijke aanpak</li>
            <li className="my-2">Uniek eindresultaat</li>
          </ul> */}
          <div className="flex items-center">
            <FiArrowRight
              style={{
                height: 30,
                width: 30,
                marginTop: 10,
                marginBottom: 10,
                marginRight: 10,
                color: "silver",
              }}
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Flexibiliteit",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Wendbaarheid",
                1000,
                "Nieuwe inzichten",
                1000,
                "Focus op doel",
                1000,
                "Persoonlijke aanpak",
                1000,
                "Uniek eindresultaat",
                1000,
              ]}
              wrapper="span"
              speed={50}
              className=" font-general-medium text-3xl text-accent"
              repeat={Infinity}
            />
          </div>
        </div>

        <div className=" sm:pt-30 sm:mt-20 mt-12 border-t-2 border-gray-200 dark:border-secondary-dark"></div>
      </div>
    );
  }
}

export default AppSecondary;
