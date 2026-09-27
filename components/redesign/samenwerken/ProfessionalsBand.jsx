import { PEERS } from "../../../data/peers";
import { ArrowLink, SectionHead } from "../ui";
import { SECTIES } from "./sections";

// Architects and contractors: the page's one pale-aqua band, a display-size
// heading and their copy at lead size — the weight the homepage teaser (two
// small panels) cannot give them. The homepage's «Zo werken wij samen →»
// lands here (#professionals). Copy from data/peers.js, in the informal
// register that is theirs; the contact link is a text link because the blue
// back cover's button follows directly.
export default function ProfessionalsBand() {
  const s = SECTIES.professionals;
  return (
    <section
      id={s.id}
      aria-labelledby="professionals-titel"
      className="mt-[4.5rem] bg-aqua-pale py-[4.5rem] md:mt-section md:py-group"
    >
      <div className="container mx-auto lg:grid lg:grid-cols-12 lg:gap-x-6">
        <SectionHead
          label={s.label}
          title={s.titel}
          id="professionals-titel"
          size="display"
          className="lg:col-span-8"
        />

        <ul className="mt-10 grid gap-y-10 md:mt-12 md:grid-cols-12 md:gap-x-6 lg:col-span-12 lg:mt-group">
          {PEERS.map((p, i) => (
            <li
              key={p.naam}
              className={`border-t-2 border-primary pt-6 md:col-span-6 lg:col-span-5 ${
                i % 2 ? "lg:col-start-7" : ""
              }`}
            >
              <h3 className="font-display text-h2 font-normal text-primary">
                {p.naam}
              </h3>
              <p className="mt-4 max-w-[40ch] text-lead text-ink">{p.tekst}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 md:mt-12 lg:col-span-12">
          <ArrowLink href="/contact" data-track="samenwerken-professionals">
            Neem contact op
          </ArrowLink>
        </p>
      </div>
    </section>
  );
}
