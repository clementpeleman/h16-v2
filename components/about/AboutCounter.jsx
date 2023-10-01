function AboutCounter() {
  return (
    <div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
      <div className="font-general-medium container text-3xl mx-auto py-20 block sm:flex justify-around">
        <div className="w-1/4 text-center">
          Gilles
          <ul className="ml-8 list-none font-general-regular text-xl list-inside">
            <li className="my-2">Gilles 1</li>
            <li className="my-2">Gilles 2</li>
          </ul>
        </div>

        <div className="w-1/4 text-center">
          Elena
          <ul className="ml-8 list-none font-general-regular text-xl list-inside">
            <li className="my-2">Elena 1</li>
            <li className="my-2">Elena 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutCounter;
