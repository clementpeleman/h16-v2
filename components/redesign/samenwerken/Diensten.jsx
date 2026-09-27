import { ArrowLink, SectionHead, TextLink } from "../ui";
import { DIENST_META } from "../../../data/dienstMeta";
import { SECTIES } from "./sections";

// The two services, as a numbered pair on paper. Copy is verbatim from
// components/colab/ColabServices.jsx (not exported there).
// No photographs here: the homepage and both service pages already show these
// two doors with plates, and the proof on this page is the voordelen below.
const DIENSTEN = [
  {
    slug: "bouwcoordinatie",
    naam: "Bouwcoördinatie en adviesverlening",
    tekst:
      "Staat u voor een bouwproject maar loopt u verloren? Op zoek naar zeer concrete hulp bij de effectieve uitvoering? Wij analyseren graag samen uw specifieke vastgoedsituatie of vragen, en coördineren uw vastgoedproject met de grootste zorg.",
  },
  {
    slug: "projectontwikkeling",
    naam: "Projectontwikkeling",
    tekst:
      "Bent u eigenaar en wilt u liever een grond of pand verkopen? Wij zijn ervaren en geïnteresseerd.",
  },
];

export default function Diensten() {
  const s = SECTIES.diensten;
  return (
    <section
      id={s.id}
      aria-labelledby="diensten-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <SectionHead
        label={s.label}
        title={s.titel}
        id="diensten-titel"
        className="lg:col-span-12 xl:col-span-4"
        titleClassName="max-w-[16ch]"
      />

      <ul className="mt-10 grid gap-y-12 md:mt-12 md:grid-cols-2 md:gap-x-6 lg:col-span-12 xl:col-span-8 xl:mt-0">
        {DIENSTEN.map((d, i) => {
          const meta = DIENST_META[d.slug];
          const dienst = (meta?.naam || "").toLowerCase();
          return (
            <li
              key={d.slug}
              className="flex flex-col border-t border-rule pt-4"
            >
              <span
                aria-hidden="true"
                className="text-ui tabular-nums text-primary-muted"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-h2 font-normal text-primary [text-wrap:balance]">
                {d.naam}
              </h3>
              <p className="mt-4 max-w-[52ch] text-body text-ink hyphens-auto">
                {d.tekst}
              </p>
              {/* Pushed to the bottom from 768px, so both link rows share a
                  baseline whatever the length of the text above. */}
              <div className="mt-6 flex flex-col items-start md:mt-auto md:pt-8">
                {meta?.ready && (
                  <ArrowLink href={`/${d.slug}`}>Meer over {dienst}</ArrowLink>
                )}
                <TextLink
                  href={`/contact?dienst=${d.slug}`}
                  data-track={`samenwerken-dienst-${d.slug}`}
                  className="inline-flex min-h-[44px] items-center text-ui md:mt-3 md:min-h-0"
                >
                  Neem contact op
                  <span className="sr-only"> over {dienst}</span>
                </TextLink>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
