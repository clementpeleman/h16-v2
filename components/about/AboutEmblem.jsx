import Image from "next/image";
import HomeSection from "../home/HomeSection";

// Closes /about, after the founders. Used to be one 120-word paragraph with three phrases
// picked out in blue. Those three phrases are the story; they become the
// structure — set in the display face, the way the hero sets the firm's
// name — each with the one sentence that explains it.
const TRAITS = [
  {
    naam: "Liefde en vreugde",
    tekst:
      "In vele culturen werd de kolibrie steeds gezien als de boodschapper van liefde en vreugde.",
  },
  {
    naam: "In alle richtingen",
    tekst:
      "Hij vliegt in alle richtingen, ook ter plaatse en achterwaarts. Zo vlot verandert hij van perspectief.",
  },
  {
    naam: "Ongeziene frequenties",
    tekst:
      "Hij is razendsnel en reageert meteen. Met het flapperen van zijn vleugels bereikt hij ongeziene frequenties.",
  },
];

function AboutEmblem() {
  return (
    <HomeSection
      label="Het symbool"

      title="De kolibrie als symbool van H16"
      aside={
        <div className="hidden lg:block w-40">
          <Image
            src="/images/H16_EMBLEEM_BLAUW.png"
            width={160}
            height={160}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      }
    >
      <p className="text-lead text-gray-700 max-w-[46ch]">
        Een klein vogeltje met unieke gaven, dat zijn talenten gebruikt om zijn
        doel te bereiken. Net als H16.
      </p>
      <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-10">
        {TRAITS.map((t) => (
          <li key={t.naam} className="border-t border-gray-200 pt-6">
            <h3 className="font-display text-h3 text-primary">{t.naam}</h3>
            <p className="mt-4 text-body text-ternary-dark">{t.tekst}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

export default AboutEmblem;
