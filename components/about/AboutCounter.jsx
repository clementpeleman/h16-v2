function AboutCounter() {
  return (
    <div className="mt-20 sm:mt-32 bg-primary-light dark:bg-ternary-dark shadow-sm pb-24">
      <div className="font-general-medium container text-3xl mx-auto py-20 block sm:flex justify-around">
        <div className="  ml-8 sm:ml-0">
          Gilles
          <br />
          <span className="text-xl font-general-normal text-primary">
            Construction manager
          </span>
          <ul className="ml-8 mt-4 list-none font-general-regular text-xl list-inside">
            <li className="my-2">Technisch</li>
            <li className="my-2">Planmatig</li>
            <li className="my-2">Constructief</li>
          </ul>
        </div>

        <div className="  mt-20 sm:mt-0 ml-8 sm:ml-0">
          Elena
          <br />
          <span className="text-xl font-general-normal text-accent">
            Office manager
          </span>
          <ul className="ml-8 mt-4 list-none font-general-regular text-xl list-inside">
            <li className="my-2">Praktisch</li>
            <li className="my-2">Creatief</li>
            <li className="my-2">Communicatief</li>
          </ul>
        </div>
      </div>
      <div className="sm:pt-30 sm:mb-20 mb-12 mx-32 border-t-2 border-slate-200"></div>
      <div className="w-full text-justify text-ternary-dark flex justify-center italic text-lg sm:text-xl">
        <p className="sm:w-1/2 mx-8 sm:mx-0 ">
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
