import React, { Component } from "react";
import { FiArrowRight } from "react-icons/fi";

export class ColabBanner extends Component {
  render() {
    return (
      <div className="mx-4 sm:mx-0">
        <section className="pt-5 sm:pt-10 mt-6 sm:mt-8">
          <div className="max-w-[70%] text-left">
            <p className=" font-general-medium text-2xl sm:text-4xl text-black dark:text-ternary-light ">
              Samenwerken
            </p>
          </div>
          <div className="mt-4 sm:mb-12 text-xl text-black font-general-medium">
            Wat kan H16 voor jou betekenen?
          </div>
          <br />
          <br />
          <div>
            <ol className="list-none list-inside space-y-8 ">
              <div className="grid sm:grid-cols-2 gap-4 items-start">
                <li className="font-general-medium hover:z-50 row-span-2 text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-primary bg-opacity-95 text-white dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm">
                  Bouwcoördinatie
                  <div className=" font-general-regular text-white text-lg mt-2 ml-4">
                    Op zoek naar een zeer concrete hulp bij de effectieve
                    uitvoering? <br />
                    Wij coördineren uw vastgoedproject met de grootste zorg:
                    <ol className="  list-inside mt-4">
                      <li>- Nieuwbouw en renovatie</li>
                      <li>- Klein en groot</li>
                      <li>- Van A tot Z of van A naar B</li>
                      <li>- Zowel residentiële als commerciële projecten</li>
                      <li>- Zowel werken met als zonder architect</li>
                      <li>- Interieuradvies</li>
                    </ol>
                  </div>
                </li>
                <li className="font-general-medium hover:z-50  text-xl hover:text-accent max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-200 shadow-sm ">
                  Adviesverlening{" "}
                  <p className=" font-general-regular text-black text-lg mt-2 ml-4">
                    Sta je voor een bouwproject maar loop je verloren? Wij
                    analyseren graag samen uw specifieke vastgoed gerelateerde
                    situatie of vragen.
                  </p>
                </li>

                <li className="font-general-medium hover:z-50  hover:text-accent text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm">
                  Projectontwikkeling
                  <p className=" font-general-regular text-black text-lg mt-2 ml-4">
                    Ben je eigenaar en wil je liever een grond of pand verkopen?
                    Wij zijn ervaren en geïnteresseerd.
                  </p>
                </li>
              </div>
            </ol>
          </div>
          {/* <div className="sm:pt-30 sm:mb-28 mt-24 sm:mt-32 mx-32 border-t-2 border-gray-200"></div> */}
          <div className="sm:mb-32 sm:mt-36">
            <p className=" font-general-medium flex text-2xl sm:text-4xl mt-20 sm:mt-24 text-black dark:text-ternary-light ">
              <FiArrowRight
                style={{
                  height: 40,
                  width: 40,
                  marginTop: 0,
                  marginBottom: 10,
                  marginRight: 10,
                  color: "grey",
                }}
              />
              Uw voordeel?
            </p>
            <p className="font-general-regular text-black sm:text-lg mt-2 sm:max-w-[50%]">
              Elke dag van het bouwproces brengt nieuwe uitdagingen met zich
              mee. Het opvolgen ervan vraagt de juiste kennis, expertise en
              betrokkenheid. Voor velen is het realiseren van een bouwproject
              geen dagelijkse kost, voor H16 is het dat wel.
              <br />
              <br />
              <span className="font-general-medium text-lg sm:text-xl">
                Door een deskundige opvolging op uw project los te laten, treden
                enkele belangrijke voordelen op:
              </span>
              <br />
              <br />
              <br />
              <br />
            </p>
            <ul className="list-none list-inside text-accent font-general-medium text-2xl sm:min-w-[115%] sm:ml-[-7%] grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-8">
              <li>
                <div className="sm:px-8 sm:py-6 p-4 bg-secondary-light shadow-sm">
                  Bepalen juiste doelstelling
                  <p className=" font-general-regular break-words text-black text-lg  mt-2 ">
                    Het realiseren van een droomhuis of het neerzetten van een
                    rendabele vastgoedinvestering? <br /> Twee aparte werelden!{" "}
                    <br /> <br />
                    Door vanaf het begin de focus juist te zetten, kan het
                    gewenste doel bereikt worden.
                  </p>
                </div>
              </li>
              <li>
                <div className="sm:px-8 sm:py-6 p-4 bg-secondary-light shadow-sm">
                  Snelheid
                  <p className=" font-general-regular break-words text-black text-lg  mt-2">
                    Door degelijk voorbereidingswerk, een accurate opvolging van
                    de planning en consequente communicatie wordt het bouwproces
                    gestroomlijnd. Werken volgen elkaar mooi en in een logische
                    volgorde op.
                    <br />
                    <br />
                    Hierdoor treedt er tijdswinst op, die altijd gepaard gaat
                    met financiële voordelen.
                  </p>
                </div>
              </li>
              <li>
                <div className="sm:px-8 sm:py-6 p-4 bg-secondary-light shadow-sm">
                  Kwaliteit
                  <p className=" font-general-regular break-words text-black text-lg  mt-2">
                    Met een doenersmentaliteit zorgt H16 ervoor dat alles gedaan
                    wordt én dat dit ook op een degelijke manier gebeurt.
                    Dagelijkse opvolging en controle op de site zelf zijn
                    onmisbaar. <br /> <br />
                    Langdurige samenwerkingen met aannemers maken het mogelijk
                    om zekerheid over kwaliteit en nazorg in te bouwen.
                  </p>
                </div>
              </li>
              <li>
                <div className="sm:px-8 sm:py-6 p-4 bg-secondary-light shadow-sm">
                  Budgetcontrole
                  <p className=" font-general-regular break-words text-black text-lg mt-2">
                    De expertise van H16 in prijsonderhandeling met aannemers
                    alsook het vereenvoudigen van de coördinatieopdracht voor de
                    aannemer zelf levert de klant financieel voordeel op.
                    <br />
                    <br />
                    Controle van élke factuur en constante opvolging van het
                    budget zorgen voor het bereiken van de gewenste
                    doelstelling.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="sm:mb-24 mb-24 mt-24 sm:mt-24  border-t-2 border-gray-200"></div>
          <div className=" flex justify-center">
            <ol className="list-none list-inside space-y-8 max-w-6xl mb-6">
              <div className="grid sm:grid-cols-2 gap-4 items-start">
                <li className="font-general-medium hover:text-accent text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm">
                  Ben je architect?
                  <p className=" font-general-regular text-black text-lg mt-2 ml-4">
                    Een bouwproces is intensief en tijdrovend. Wil je je als
                    architect focussen op ontwerp? Dan nemen wij graag een deel
                    van het uitvoerend werk uit handen.
                  </p>
                </li>
                <li className="font-general-medium hover:text-accent text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm ">
                  Ben je aannemer?
                  <p className=" font-general-regular text-black text-lg mt-2 ml-4">
                    We slaan graag de handen in elkaar met kwalitatieve
                    aannemers voor een duurzame relatie waarbij klantgerichtheid
                    en kwaliteit centraal staan.
                  </p>
                </li>
              </div>
            </ol>
          </div>
        </section>
      </div>
    );
  }
}

export default ColabBanner;
