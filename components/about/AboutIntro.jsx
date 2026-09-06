// The page opens the way the homepage does: title and one lead sentence in
// the left seven columns of the same twelve-column grid, with air around them.
function AboutIntro() {
  return (
    <section className="mt-section grid gap-10 lg:grid-cols-12 lg:gap-x-16">
      <div className="lg:col-span-7">
        <h1 className="font-display text-h1 text-black [text-wrap:balance]">
          Over ons
        </h1>
        <p className="mt-8 max-w-[46ch] text-lead text-gray-700">
          H16 is een jong bedrijf met familiale wortels dat ontstaan is uit
          passie voor vastgoed. Deze passie, doorgegeven van generatie op
          generatie, is binnen H16 de drijvende kracht van élke dag.
        </p>
      </div>
    </section>
  );
}

export default AboutIntro;
