import Link from "next/link";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { FiArrowRight } from "react-icons/fi";

const TYPED_WORDS = [
  "Flexibiliteit",
  "Wendbaarheid",
  "Nieuwe inzichten",
  "Focus op doel",
  "Persoonlijke aanpak",
  "Uniek eindresultaat",
];

function AppSecondary() {
  const reducedMotion = usePrefersReducedMotion();
  return (
      <div>
        <div>
          <div className="mt-16 sm:mt-24 border-t-2 border-gray-200"></div>

          <div className="mt-16 sm:mt-24 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <h2 className="text-h2 text-black">
              Jouw <span className="text-accent">bouwproject</span> onder onze
              vleugels?
            </h2>

            <Link
              href="/colab"
              className="text-ui shrink-0 self-start sm:self-auto inline-block text-center border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm px-6 py-3 duration-300"
            >
              Bekijk onze werkwijze
            </Link>
          </div>

          <div className="mt-8 max-w-[65ch]">
            <p className="text-gray-700 text-lead">
            Gedreven door passie voor vastgoed en middels degelijke
            samenwerkingen neemt H16 uw vastgoedproject onder de vleugels. Onze
            kracht is flexibiliteit en wendbaarheid, net als de kolibrie in zijn
            soepele vlucht. Elk perspectief wordt ten gronde bekeken, veranderen
            van perspectief gebeurt snel en levert nieuwe inzichten op. Wij
            houden de focus op het doel tot zolang het bereikt is. Met een
            persoonlijke aanpak binnen ons klein bedrijf wordt de opdrachtgever
            totaal ontzorgd in het realiseren van een uniek eindresultaat.
            </p>
            <div className="flex items-center mt-8">
              <FiArrowRight
                aria-hidden="true"
                className="h-7 w-7 mr-3 shrink-0 text-primary"
              />
              {/* An infinite type-and-delete loop with no pause control is a
                  WCAG 2.2.2 (Pause, Stop, Hide) failure for anything moving
                  longer than five seconds. Reduced motion gets the same six
                  words, at rest. */}
              {reducedMotion ? (
                <span className="text-h3 text-accent">
                  {TYPED_WORDS.join(" · ")}
                </span>
              ) : (
                <TypeAnimation
                  sequence={TYPED_WORDS.flatMap((w) => [w, 1000])}
                  wrapper="span"
                  speed={50}
                  className="text-h3 text-accent"
                  repeat={Infinity}
                />
              )}
            </div>
          </div>

          <div className="mt-16 sm:mt-24 border-t-2 border-gray-200"></div>

          <div className="mt-16 sm:mt-24">
            <h2 className="text-h2 mb-8 text-black text-left">
              De kolibrie als symbool van H16
            </h2>
            <div className="flex flex-row items-center gap-16">
              <div className="hidden xl:block shrink-0">
                <Image
                  src="/images/H16_EMBLEEM_BLAUW.png"
                  width={120}
                  height={120}
                  alt="Het kolibrie-embleem van H16"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <p className="max-w-[68ch] text-gray-700 text-body">
                Er bestaat een eeuwenoude symboliek rond dit bijzondere
                vogeltje: in vele culturen werd hij steeds gezien als de
                boodschapper van{" "}
                <span className="text-primary font-strong">
                  liefde en vreugde
                </span>
                . De kolibrie heeft unieke gaven en weet zijn talenten te
                gebruiken om zijn doelen te bereiken, net als H16. Door zijn
                compact formaat en priemvormige snavel onderscheidt de kolibrie
                zich van de rest. Zijn uitstekend vliegvermogen is uniek en hij
                gebruikt zijn talent om{" "}
                <span className="text-primary font-strong">
                  in alle richtingen
                </span>{" "}
                te vliegen, waaronder ter plaatse én achterwaarts. Hij is
                razendsnel en heeft een bijzonder reactievermogen. Met het
                flapperen van zijn vleugels worden{" "}
                <span className="text-primary font-strong">
                  ongeziene frequenties
                </span>{" "}
                bereikt.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AppSecondary;
