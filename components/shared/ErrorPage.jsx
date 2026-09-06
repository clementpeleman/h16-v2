import Link from "next/link";

// Shared body for 404 and 500. Both render inside DefaultLayout, so the header
// and footer come along and the visitor is never stranded on a bare page.
// Every route out is on this screen: the work, the offer, and the phone.
function ErrorPage({ title, body }) {
  return (
    <div className="container mx-auto">
      <section className="py-16 sm:py-24 max-w-2xl text-left">
        <h1 className="font-display text-display text-black [text-wrap:balance] mb-8">
          {title}
        </h1>

        <p className="text-lead text-ternary-dark mb-12">
          {body}
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <Link
            href="/realisaties"
            className="text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
          >
            Bekijk onze realisaties
          </Link>
          <Link
            href="/"
            className="text-ui px-7 py-4 text-primary border border-primary text-center tracking-wider rounded-lg hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
          >
            Naar de startpagina
          </Link>
        </div>

        <p className="text-body text-ternary-dark">
          Zoekt u iets bepaalds? Bel ons op{" "}
          <a
            href="tel:+32474042279"
            className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
          >
            +32 474 04 22 79
          </a>{" "}
          of mail naar{" "}
          <a
            href="mailto:info@h16.be"
            className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm break-all duration-200"
          >
            info@h16.be
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default ErrorPage;
