import Image from "next/image";
import Plate, { PlateLine } from "../Plate";
import { company } from "../../../data/companyData";
import { HAS_PORTRAIT } from "../../contact/FoundersPortrait";

// Links on the aqua card: primary is 7.82:1 on aqua-pale. 44px rows below
// 768px, natural height above.
const onAqua =
  "inline-flex min-h-[44px] items-center text-primary underline decoration-1 hover:decoration-2 focus-ring md:min-h-0";

// The direct channels as one pale-aqua card (phone first, set large), then
// one small numbered plate — or, once it exists, the founders' portrait.
// Below 768px the card is a full-bleed band and the plate is left out, so
// the phone page stays a short task page.
export default function Gegevens({ werkgebied, plate, className = "" }) {
  const rows = [
    {
      dt: "Telefoon",
      dd: (
        <a
          href={company.phoneHref}
          className={`${onAqua} whitespace-nowrap font-display text-h2 font-normal underline-offset-[6px]`}
        >
          {company.phone}
        </a>
      ),
    },
    {
      dt: "Email",
      dd: (
        <a
          href={company.emailHref}
          className={`${onAqua} break-all text-ui underline-offset-4`}
        >
          {company.email}
        </a>
      ),
    },
    {
      dt: "Adres",
      dd: (
        <a
          href={company.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${onAqua} text-ui underline-offset-4`}
        >
          {company.street}, {company.postalCity}
          <span className="sr-only"> (opent Google Maps)</span>
        </a>
      ),
    },
    werkgebied && {
      dt: "Werkgebied",
      dd: <span className="text-ui text-ink">{werkgebied}</span>,
    },
  ].filter(Boolean);

  // Same boxes at every width: 368 (xl), 453 (2xl), 379 (lg), 286 (md).
  // The 2:3 photographs fill a 4:5 box edge to edge, so no overscan factor.
  const sizes =
    "(min-width:1536px) 453px, (min-width:1280px) 368px, (min-width:1024px) 379px, (min-width:768px) 286px, 75vw";

  let figure = null;
  if (HAS_PORTRAIT) {
    figure = (
      <figure className="mt-10 w-3/4 md:col-span-5 md:mt-0 md:w-auto lg:mt-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-plate">
          <Image
            src="/images/founders.jpg"
            alt="Gilles De Brabander en Elena Versyp"
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
        <figcaption className="mt-3 text-ui text-primary">
          Gilles De Brabander &amp; Elena Versyp
        </figcaption>
      </figure>
    );
  } else if (plate) {
    figure = (
      <Plate
        image={plate.image}
        ratio="aspect-[4/5]"
        sizes={sizes}
        reveal
        className="hidden md:col-span-5 md:block lg:mt-10"
      >
        {plate.project && (
          <PlateLine
            n={1}
            naam={plate.project.naam}
            href={`/realisaties/${plate.project.slug}`}
            meta={[plate.project.aard, plate.project.jaar]}
          />
        )}
      </Plate>
    );
  }

  return (
    <section
      aria-labelledby="gegevens-titel"
      className={`md:grid md:grid-cols-12 md:gap-x-6 lg:block ${className}`}
    >
      <div className="-mx-4 bg-aqua-pale px-4 py-10 sm:-mx-6 sm:px-6 md:col-span-7 md:mx-0 md:self-start md:p-8">
        <h2 id="gegevens-titel" className="text-meta text-primary-muted">
          Contactgegevens
        </h2>
        <dl className="mt-6">
          {rows.map((r) => (
            <div
              key={r.dt}
              className="border-t border-rule-aqua py-4 last:border-b"
            >
              <dt className="text-meta text-primary-muted">{r.dt}</dt>
              <dd className="mt-1">{r.dd}</dd>
            </div>
          ))}
        </dl>
      </div>
      {figure}
    </section>
  );
}
