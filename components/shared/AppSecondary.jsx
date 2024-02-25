import Link from "next/link";
import React, { Component } from "react";
import Image from "next/image";
import { ScrollRotate } from "react-scroll-rotate";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight } from "react-icons/fi";

export class AppSecondary extends Component {
  render() {
    return (
      <div className="text-md md:text-xl">
        <div className="mt-10 sm:mb-40 sm:mt-24">
          <div className="sm:pt-30 mt-32 border-t-2 border-gray-200 dark:border-secondary-dark"></div>
          <div className="mt-12 sm:mt-20 mx-4 sm:mx-0 mb-12 sm:mb-8 flex flex-col sm:flex-row place-content-between">
            <p className="font-general-medium  text-2xl sm:text-4xl sm:mb-2 text-black dark:text-ternary-light">
              Jouw <span className="text-accent">bouwproject</span> onder onze
              vleugels?
            </p>

            <Link
              href="/colab"
              className="font-general-medium inline-block self-center sm:self-auto text-lg text-center md:max-h-14 xl:max-h-24 border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm mt-10 sm:mt-0 sm:mr-4 lg:mr-16 px-0 sm:px-4 py-3 duration-300 w-48"
              aria-label="Hire Me Button"
            >
              Ontdek meer
            </Link>
          </div>
          <div className="hidden sm:block max-w-[620px] md:max-w-[1060px] text-justify text-gray-500 text-xl">
            Er bestaat een mooie symboliek rond dit bijzondere vogeltje: in
            eeuwenoude culturen werd hij gezien als de boodschapper van liefde
            en vreugde. Hij heeft speciale gaven die hij weet te gebruiken om
            zijn doelen te bereiken en onderscheidt zich daarmee van de rest.
            Zijn uitstekend vliegvermogen is uniek: hij beweegt in alle
            richtingen, vliegt ook ter plaatse én achterwaarts, is razendsnel en
            heeft een bijzonder reactievermogen. Met het flapperen van zijn
            vleugels worden ongeziene frequenties bereikt. Dit inspireert H16.
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

          <div className=" sm:pt-30 sm:mt-20 mb-40 sm:mb-52 mt-10 border-t-2 border-gray-200 dark:border-secondary-dark"></div>
          <div className="hidden sm:block mb-72">
            <p className="text-2xl sm:text-4xl mb-5 text-black dark:text-ternary-light text-right font-general-regular">
              De kolibrie als symbool van H16
            </p>
            <div className="flex flex-row items-center justify-between">
              <div className="hidden xl:block flex justify-center flex-grow mr-24">
                <Image
                  src="/images/H16_EMBLEEM_BLAUW.png"
                  width={120}
                  height={120}
                  alt="H16 Vogel"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div>
              <div className="max-w-[620px] md:max-w-[1115px] text-justify self-end text-gray-500">
                <span className="">
                  Er bestaat er een eeuwenoude symboliek rond dit bijzondere
                  vogeltje: in vele culturen werd hij steeds gezien als de
                  boodschapper van{" "}
                </span>
                <span className=" decoration-1 cursor-pointer transition-all text-primary hover:text-3xl font-normal font-opensans">
                  liefde en vreugde
                </span>
                <span className="">
                  . De kolibrie heeft unieke gaven en weet zijn talenten te
                  gebruiken om zijn doelen te bereiken, net als H16.
                </span>
                <span className="text-black  font-normal"> </span>
                <span className="text-blackfont-normal"> </span>
                <span className="">
                  Door zijn compact formaat en priemvormige snavel onderscheidt
                  de kolibrie zich van de rest. Zijn uitstekend vliegvermogen is
                  uniek en hij gebruikt zijn talent om
                  <span className=" decoration-1 cursor-pointer transition-all text-primary  hover:text-3xl font-normal font-opensans">
                    {" "}
                    in alle richtingen{" "}
                  </span>
                  te vliegen, waaronder ter plaatse én achterwaarts
                </span>

                <span className="">
                  . Hij is razendsnel en heeft een bijzonder reactievermogen.
                  Met het flapperen van zijn vleugels worden
                  <span className=" decoration-1 cursor-pointer transition-all text-primary  hover:text-3xl font-normal font-opensans">
                    {" "}
                    ongeziene frequenties{" "}
                  </span>
                  bereikt.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppSecondary;
