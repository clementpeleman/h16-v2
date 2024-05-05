import { FiArrowRight } from "react-icons/fi";

function AboutCounter() {
  return (
    <div className="sm:px-0 px-4 mt-24 sm:mt-32 bg-primary-light dark:bg-ternary-dark shadow-sm pb-24">
      <div className="container mx-auto sm:w-full text-md md:text-xl flex">
        <div className=" w-full mx-4 lg:w-1/2 mt-24 lg:mb-4">
          
          <div className="text-4xl flex mb-2 text-left text-black font-general-medium">
          <FiArrowRight
                style={{
                  height: 40,
                  width: 40,
                  marginTop: 0,
                  marginBottom: 10,
                  marginRight: 10,
                  color: "silver",
                }}
              />
            Wie is wie?
          </div>

          <p className="sm:mb-4 text-lg text-gray-200 sm:text-xl">
            H16 wordt geleid door{" "}
            <span className="text-black font-medium">Gilles De Brabander</span> en{" "}
            <span className="text-black font-medium">Elena Versyp</span>. Naast
            professionele partners vormen Gilles en Elena ook in het dagelijks
            leven een sterke tandem:
          </p>
        </div>
      </div>
      <div className="font-general-medium container text-3xl mx-auto pt-20 sm:py-20 block sm:flex justify-around">
        <div className="mb-2 ml-8 sm:ml-0">
          Gilles
          <p className=" text-xl font-general-normal text-primary">
            Construction manager
          </p>
          <ul className="ml-8 mt-4 list-none font-general-regular text-xl list-inside">
            <li className="my-2">Technisch</li>
            <li className="my-2">Planmatig</li>
            <li className="my-2">Constructief</li>
          </ul>
        </div>

        <div className="mb-2 mt-20 sm:mt-0 ml-8 sm:ml-0">
          Elena
          <br />
          <p className="text-xl font-general-normal text-accent">
            Office manager
          </p>
          <ul className="ml-8 mt-4 list-none font-general-regular text-xl list-inside">
            <li className="my-2">Praktisch</li>
            <li className="my-2">Creatief</li>
            <li className="my-2">Communicatief</li>
          </ul>
        </div>
      </div>
      <div className="sm:pt-30 sm:mb-20 mb-12 mx-64 border-t-2 border-slate-200"></div>
      <div className="w-full text-justify text-ternary-dark flex justify-center italic text-lg sm:text-xl">
        <p className="lg:w-1/2 mx-16  sm:my-16 mt-16 ">
          &quot;Door onze complementaire capaciteiten in ons klein bedrijf te
          bundelen, slagen we erin om zeer persoonlijk en gefocust te werken,
          zodat onze realisaties volledig aansluiten op de wensen van de
          opdrachtgever. Met een betrokkenheid op élke dag van het bouwproces
          zorgen we voor kwaliteit in uitvoering, controle van het budget en de
          uitvoeringstermijn.&quot;
        </p>
      </div>
    </div>
  );
}

export default AboutCounter;
