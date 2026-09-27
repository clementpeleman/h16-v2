import Plate, { PlateLine } from "../Plate";
import { SectionHead } from "../ui";
import { SECTIES } from "./sections";

// The four voordelen, each proven by a numbered plate from a real job (the
// idea of the old ColabBenefits, drawn as the monograph's plates). From 768px
// the four sit in a staggered spread: landscape | portrait (dropped), then
// portrait | landscape (dropped) — a diagonal zig-zag. On phones they stack,
// the landscapes full-bleed and the portraits flush to alternate edges.
//
// Widths per breakpoint (for `sizes`): 7 cols = 811/662/541/410px at
// 1536/1280/1024/768; portrait cols = 453/368/299/286px (4 cols from 1024,
// 5 cols at 768).
const LANDSCAPE_SIZES = (phone) =>
  `(min-width:1536px) 811px, (min-width:1280px) 662px, (min-width:1024px) 541px, (min-width:768px) 410px, ${phone}`;
const PORTRAIT_SIZES =
  "(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 299px, (min-width:768px) 286px, 80vw";

const LAYOUT = [
  {
    // 1: landscape, left, top of the row.
    li: "md:col-span-7 md:mt-0",
    figure: "-mx-4 sm:-mx-6 md:mx-0",
    caption: "px-4 sm:px-6 md:px-0",
    ratio: "aspect-[4/3] md:aspect-[3/2]",
    // A 3:2 photo in the 4:3 phone box renders 1.125× the box width.
    sizes: LANDSCAPE_SIZES("113vw"),
  },
  {
    // 2: portrait, right, dropped.
    li: "md:col-span-5 md:col-start-8 md:mt-24 lg:col-span-4 lg:col-start-9 lg:mt-32",
    figure: "-mr-4 ml-auto w-4/5 sm:-mr-6 md:mr-0 md:w-auto",
    caption: "pr-4 sm:pr-6 md:pr-0",
    ratio: "aspect-[4/5]",
    sizes: PORTRAIT_SIZES,
  },
  {
    // 3: portrait, left, top of the row.
    li: "md:col-span-5 md:mt-0 lg:col-span-4",
    figure: "-ml-4 w-4/5 sm:-ml-6 md:ml-0 md:w-auto",
    caption: "pl-4 sm:pl-6 md:pl-0",
    ratio: "aspect-[4/5]",
    sizes: PORTRAIT_SIZES,
  },
  {
    // 4: landscape, right, dropped.
    li: "md:col-span-7 md:col-start-6 md:mt-24 lg:mt-32",
    figure: "-mx-4 sm:-mx-6 md:mx-0",
    caption: "px-4 sm:px-6 md:px-0",
    ratio: "aspect-[4/3] md:aspect-[3/2]",
    // A 4:3 photo: exact in the phone box, width-limited in the 3:2 box.
    sizes: LANDSCAPE_SIZES("100vw"),
  },
];

export default function Voordelen({ voordelen = [] }) {
  if (!voordelen.length) return null;
  const s = SECTIES.voordelen;

  // «Afb. n» counts only the plates that render, in DOM order.
  let n = 0;
  const items = voordelen.map((v) => ({
    ...v,
    n: v.plate ? ++n : null,
  }));

  return (
    <section
      id={s.id}
      aria-labelledby="voordelen-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <SectionHead
        label={s.label}
        title={s.titel}
        id="voordelen-titel"
        className="lg:col-span-5"
      />
      {/* Verbatim from components/colab/ColabBenefits.jsx. */}
      <p className="mt-6 max-w-[46ch] text-lead text-ink lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end">
        Elke dag van het bouwproces brengt nieuwe uitdagingen met zich mee. Het
        opvolgen ervan vraagt de juiste kennis, expertise en betrokkenheid. Voor
        velen is het realiseren van een bouwproject geen dagelijkse kost, voor
        H16 is het dat wel.
      </p>

      <ul className="mt-12 md:mt-group md:grid md:grid-cols-12 md:items-start md:gap-x-6 md:gap-y-group lg:col-span-12">
        {items.map((v, i) => {
          const L = LAYOUT[i % LAYOUT.length];
          const project = v.plate?.project;
          const href = project ? `/realisaties/${project.slug}` : undefined;
          return (
            <li key={v.naam} className={`mt-16 first:mt-0 ${L.li}`}>
              {v.plate && (
                <Plate
                  image={v.plate.image}
                  href={href}
                  ratio={L.ratio}
                  sizes={L.sizes}
                  reveal
                  className={L.figure}
                >
                  <PlateLine
                    n={v.n}
                    naam={project.naam}
                    href={href}
                    meta={project.meta}
                    className={L.caption}
                  />
                </Plate>
              )}
              <h3
                className={`${v.plate ? "mt-6" : ""} font-display text-h3 font-normal text-primary`}
              >
                {v.naam}
              </h3>
              <p className="mt-3 max-w-[52ch] text-body text-ink hyphens-auto">
                {v.tekst}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
