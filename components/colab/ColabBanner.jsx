import React, { Component } from "react";
import { FiArrowRight,FiArrowDown } from "react-icons/fi";

export class ColabBanner extends Component {
  render() {
    return (
      <div className="mx-4 sm:mx-0">
        <section className="pt-5 sm:pt-10 mt-6 sm:mt-8 sm:-mb-16">
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
            <ol className="flex justify-between items-start list-none list-inside max-w-8xl ">
              <div className="grid sm:grid-cols-1 gap-4 items-start">
                <li className="font-general-medium  space-y-8 hover:z-50  text-xl hover:text-accent max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-200 shadow-sm ">
                  Bouwcoördinatie en Adviesverlening
                  <div className=" font-general-regular text-black text-lg mt-2">
                    Sta je voor een bouwproject maar loop je verloren? Op zoek naar een zeer concrete hulp bij de effectieve uitvoering?
                    Wij analyseren graag samen uw specifieke vastgoed gerelateerde situatie of vragen en coördineren uw vastgoedproject met de grootste zorg.
                  </div>
                </li>

                <li className="font-general-medium space-y-8 hover:z-50  hover:text-accent text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm">
                  Projectontwikkeling
                  <p className=" font-general-regular text-black text-lg mt-2">
                    Ben je eigenaar en wil je liever een grond of pand verkopen?
                    Wij zijn ervaren en geïnteresseerd.
                  </p>
                </li>
              </div>
              <a href="#voordeel" className="hidden xl:flex hover:text-accent text-4xl font-balerno  decoration-1 underline-offset-2">
                <FiArrowDown style={{color: "#0E468C"}}/>
                Colab
              </a>
            </ol>
            <div className="sm:mb-24 sm:mb-24 mt-16 sm:mt-24 "></div>
            <div className="sm:pt-30 sm:mb-20 sm:mb-12 mb-16 sm:mx-64 border-t-2 border-slate-200"></div>
            <div className=" flex">
              <ol className="list-none list-inside space-y-8 max-w-8xl mb-6">
                <div className="grid sm:grid-cols-2 gap-4 items-start">
                  <li className="font-general-medium hover:text-accent text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm">
                    Ben je architect?
                    <p className=" font-general-regular text-black text-lg mt-2">
                      Een bouwproces is intensief en tijdrovend. Wil je je als
                      architect focussen op ontwerp? Dan nemen wij graag een
                      deel van het uitvoerend werk uit handen.
                    </p>
                  </li>
                  <li className="font-general-medium hover:text-accent text-xl max-w-3xl p-4 sm:px-10 sm:py-8 bg-secondary-light dark:bg-secondary-dark hover:scale-105 transform transition-transform duration-20 shadow-sm ">
                    Ben je aannemer?
                    <p className=" font-general-regular text-black text-lg mt-2">
                      We slaan graag de handen in elkaar met kwalitatieve
                      aannemers voor een duurzame relatie waarbij
                      klantgerichtheid en kwaliteit centraal staan.
                    </p>
                  </li>
                </div>
              </ol>
            </div>
          </div>
          {/* <div className="sm:pt-30 sm:mb-28 mt-24 sm:mt-32 mx-32 border-t-2 border-gray-200"></div> */}
          <div id="voordeel" className="sm:mb-32 sm:pt-[1px] sm:mt-24">
            <p className=" font-general-medium flex text-3xl sm:text-4xl mt-20 sm:mt-24 text-black dark:text-ternary-light ">
              <FiArrowRight
                style={{
                  height: 40,
                  width: 40,
                  marginTop: 0,
                  marginBottom: 10,
                  marginRight: 10,
                  color: "#0E468C",
                }}
              />
              Uw voordeel?
            </p>
            <p className="font-general-regular text-black sm:text-lg mt-2 sm:max-w-[55%]">
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
            </p>
            <div className="grid sm:grid-cols-2 list-inside text-accent font-general-medium text-3xl">
              <div className="">
                <div className="sm:px-8 sm:py-6 p-4 my-4 sm:mr-4 bg-secondary-light shadow-sm">
                  Bepalen juiste doelstelling
                  <p className=" font-general-regular break-words text-black text-lg  mt-2 ">
                  Het realiseren van een droomhuis of het neerzetten van een rendabele vastgoedinvestering?<br/><br/>
                  Twee aparte werelden! Zet de focus juist om het gewenste doel te bereiken!
                  </p>
                </div>
              </div>

              <div>
                <div className="sm:px-8 sm:py-6 p-4 my-4 sm:ml-4 bg-secondary-light shadow-sm">
                  Snelheid
                  <p className=" font-general-regular break-words text-black text-lg  mt-2">
                  Voorbereiding, opvolging, planning en communicatie stroomlijnen uw bouwproces.<br/><br/>
                  Hierdoor treedt er tijdswinst op, die altijd gepaard gaat met financiële voordelen
                  </p>
                </div>
              </div>

              <div>
                <div className="sm:px-8 sm:py-6 p-4 my-4 sm:mr-4 bg-secondary-light shadow-sm">
                  Kwaliteit
                  <p className=" font-general-regular break-words text-black text-lg  mt-2">
                  Met een doenersmentaliteit zorgt H16 ervoor dat alles gedaan wordt én dat dit ook op een degelijke manier gebeurt.<br/><br/>
                  Langdurige samenwerkingen met aannemers maken het mogelijk om zekerheid over kwaliteit en nazorg in te bouwen.
                  </p>
                </div>
              </div>

              <div>
                <div className="sm:px-8 sm:py-6 p-4 my-4 sm:ml-4 bg-secondary-light shadow-sm">
                  Budgetcontrole
                  <p className=" font-general-regular break-words text-black text-lg mt-2">
                  H16 onderhandelt een goede prijs, élke factuur wordt gecontroleerd en het budget wordt opgevolgd.<br/><br/>
                  Zo wordt de gewenste doelstelling bereikt!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ColabBanner;
