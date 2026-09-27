import Link from "next/link";

// The blue "back cover": the contact band, then the footer — one
// uninterrupted ground to the end of the page. Just the question, one line
// and the button; the phone, e-mail and address live in the footer below.
// `contactHref` lets a service page pre-fill the form (/contact?dienst=…);
// `track` names the page in Umami instead of counting every click as home.
export default function BackCover({
  contactHref = "/contact",
  track = "home-contact",
}) {
  return (
    <section
      aria-labelledby="contact-titel"
      className="mt-[4.5rem] bg-primary md:mt-section"
    >
      <div className="container mx-auto pb-group pt-[4.5rem] md:pt-section lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-8">
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
            href={contactHref}
            data-track={track}
            className="mt-10 inline-flex h-[52px] w-full items-center justify-center border border-paper bg-paper px-7 text-ui text-primary transition-colors duration-150 hover:border-white hover:bg-transparent hover:text-white active:translate-y-px focus-ring-inverse md:w-auto"
          >
            Neem contact op
          </Link>
          <p className="mt-4 text-meta text-aqua-light">
            Gilles of Elena antwoordt u zo snel mogelijk.
          </p>
        </div>
      </div>
    </section>
  );
}
