import { FiArrowRight } from "react-icons/fi";

function AboutCounter() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40 py-16 sm:py-24 bg-primary-light shadow-sm">
      <div className="container mx-auto">
        <div className="max-w-[60ch]">
          <h2 className="text-h2 mb-5 text-left text-black">
            Wie is wie?
          </h2>

          <p className="max-w-[60ch] text-lead text-gray-600">
            H16 wordt geleid door{" "}
            <span className="text-black font-strong">Gilles De Brabander</span> en{" "}
            <span className="text-black font-strong">Elena Versyp</span>. Naast
            professionele partners vormen Gilles en Elena ook in het dagelijks
            leven een sterke tandem:
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-14 sm:mt-20 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="text-h3 text-black">Gilles</h3>
          <p className="text-ui text-primary mt-1">Construction manager</p>
          <ul className="mt-4 list-none text-body">
            <li className="mt-2">Technisch</li>
            <li className="mt-2">Planmatig</li>
            <li className="mt-2">Constructief</li>
          </ul>
        </div>

        <div>
          <h3 className="text-h3 text-black">Elena</h3>
          <p className="text-ui text-accent mt-1">Office manager</p>
          <ul className="mt-4 list-none text-body">
            <li className="mt-2">Praktisch</li>
            <li className="mt-2">Creatief</li>
            <li className="mt-2">Communicatief</li>
          </ul>
        </div>
      </div>
      <div className="my-12 sm:my-16 mx-auto max-w-2xl border-t-2 border-slate-200"></div>
      <div className="w-full text-left text-ternary-dark flex justify-center text-lead">
        <blockquote className="mx-auto max-w-[60ch]">
          &quot;Door onze complementaire capaciteiten in ons klein bedrijf te
          bundelen, slagen we erin om zeer persoonlijk en gefocust te werken,
          zodat onze realisaties volledig aansluiten op de wensen van de
          opdrachtgever. Met een betrokkenheid op élke dag van het bouwproces
          zorgen we voor kwaliteit in uitvoering, controle van het budget en de
          uitvoeringstermijn.&quot;
        </blockquote>
      </div>
    </div>
  );
}

export default AboutCounter;
