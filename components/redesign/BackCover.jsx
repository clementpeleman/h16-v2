import Link from "next/link";
import { company } from "../../data/companyData";

const onBlueLink =
  "text-white underline decoration-aqua-light decoration-1 hover:decoration-2 focus-ring-inverse";

// The blue "back cover": the contact band, then the footer — one
// uninterrupted ground to the end of the page. No photo here; the phone
// number is the first contact fact, set large.
export default function BackCover({ werkgebied }) {
  const rows = [
    {
      dt: "Telefoon",
      dd: (
        <a
          href={company.phoneHref}
          className={`${onBlueLink} inline-flex min-h-[44px] items-center font-display text-h2 font-normal underline-offset-[6px] md:min-h-0`}
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
          className={`${onBlueLink} inline-flex min-h-[44px] items-center text-ui underline-offset-4 md:min-h-0`}
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
          className={`${onBlueLink} inline-flex min-h-[44px] items-center text-ui underline-offset-4 md:min-h-0`}
        >
          {company.street}, {company.postalCity}
          <span className="sr-only"> (opent Google Maps)</span>
        </a>
      ),
    },
    {
      dt: "Werkgebied",
      dd: <span className="text-ui text-aqua-pale">{werkgebied}</span>,
    },
  ];

  return (
    <>
      <section
        aria-labelledby="contact-titel"
        className="mt-[4.5rem] bg-primary md:mt-section"
      >
        <div className="container mx-auto pb-group pt-[4.5rem] md:pt-section lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <h2
              id="contact-titel"
              className="font-display text-display font-normal text-white [text-wrap:balance]"
            >
              Jouw bouwproject onder onze vleugels?
            </h2>
            <p className="mt-6 max-w-[44ch] text-lead text-aqua-pale">
              Vraag vrijblijvend meer informatie over onze manier van werken en
              wat wij voor u kunnen betekenen.
            </p>
            <Link
              href="/contact"
              data-track="home-contact"
              className="mt-10 inline-flex h-[52px] w-full items-center justify-center border border-paper bg-paper px-7 text-ui text-primary transition-colors duration-150 hover:border-white hover:bg-transparent hover:text-white active:translate-y-px focus-ring-inverse md:w-auto"
            >
              Neem contact op
            </Link>
            <p className="mt-4 text-meta text-aqua-light">
              Gilles of Elena antwoordt u zo snel mogelijk.
            </p>
          </div>

          <dl className="mt-12 max-w-[480px] md:mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none xl:col-span-4 xl:col-start-9">
            {rows.map((r) => (
              <div
                key={r.dt}
                className="border-t border-rule-blue py-4 last:border-b"
              >
                <dt className="text-meta text-aqua-light">{r.dt}</dt>
                <dd className="mt-1">{r.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
