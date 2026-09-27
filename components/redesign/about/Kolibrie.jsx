import Image from "next/image";
import { SectionHead } from "../ui";

// The kolibrie as H16's symbol, verbatim from components/about/AboutEmblem.jsx.
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

// The page's one calm band: the minimal emblem (the kolibrie abstracted to a
// single stroke — the client's preferred mark over the bird drawing) as the
// figure, the heading and lead beside it, the three traits beneath as a row
// of hairline columns. Decorative image: the heading carries the meaning.
export default function Kolibrie() {
  return (
    <section
      aria-labelledby="symbool-titel"
      className="mt-[4.5rem] bg-aqua-pale py-[4.5rem] md:mt-section md:py-group"
    >
      <div className="container mx-auto lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="w-32 md:w-40 lg:col-span-4 lg:row-start-1 lg:w-auto lg:self-start">
          <Image
            src="/images/H16_EMBLEEM_BLAUW.png"
            alt=""
            width={1152}
            height={850}
            sizes="(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 299px, 160px"
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 md:mt-10 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-0 xl:col-span-6 xl:col-start-7">
          <SectionHead
            label="Het symbool"
            title="De kolibrie als symbool van H16"
            id="symbool-titel"
          />
          <p className="mt-6 max-w-[46ch] text-lead text-ink">
            Een klein vogeltje met unieke gaven, dat zijn talenten gebruikt om
            zijn doel te bereiken. Net als H16.
          </p>
        </div>

        <ul className="mt-12 grid gap-y-8 md:grid-cols-3 md:gap-x-6 lg:col-span-12 lg:row-start-2 lg:mt-group">
          {TRAITS.map((t) => (
            <li key={t.naam} className="border-t border-rule-aqua pt-4">
              <h3 className="font-display text-h3 font-normal text-primary [text-wrap:balance]">
                {t.naam}
              </h3>
              <p className="mt-2 max-w-[40ch] text-body text-ink hyphens-auto">
                {t.tekst}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
