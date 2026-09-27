import PagesMetaHead from "../../PagesMetaHead";
import V2Page from "../V2Page";
import BackCover from "../BackCover";
import Plate, { PlateLine } from "../Plate";
import { ArrowLink, ButtonLink } from "../ui";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../../../lib/seo";
import ServiceSection from "./ServiceSection";
import ServiceRealisaties from "./ServiceRealisaties";
import ServiceVragen from "./ServiceVragen";
import { BOX, WIDTHS, coverSizes } from "./plateSizes";

// The redesigned service page (/bouwcoordinatie, /projectontwikkeling),
// STAGING ONLY — see components/redesign/README.md. One template for both:
// a title page with its plate, the service's sections in data order with the
// realisaties before the werkwijze (proof before process, as on the
// homepage), the questions, a door for professionals, the blue back cover.
// Props come from ./loadService.js; SEO (title, description, JSON-LD) is the
// same as the current components/services/ServicePage.jsx.

function TitlePage({ dienst, opener, contactHref }) {
  return (
    <section
      aria-labelledby="titel"
      className="container mx-auto pt-6 md:pt-10 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-14"
    >
      <div
        className={`lg:row-start-1 lg:flex lg:flex-col lg:justify-between ${
          opener ? "lg:col-span-7" : "lg:col-span-8"
        }`}
      >
        <div>
          <p className="text-meta text-primary-muted">Diensten</p>
          <h1
            id="titel"
            lang="nl"
            className="mt-5 font-display text-display font-normal text-primary hyphens-manual [text-wrap:balance]"
          >
            {/* «Oost-Vlaanderen» never splits at its hyphen from 640px up
                (it may on a 320px phone, where it would not fit whole). */}
            {dienst.h1Display.split(/(\S+-\S+)/).map((part, i) =>
              i % 2 ? (
                <span key={part} className="sm:whitespace-nowrap">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </h1>
        </div>
        <div className="mt-6 md:mt-8 lg:mt-12">
          {dienst.lead && (
            <p className="max-w-[46ch] text-lead text-ink [text-wrap:pretty]">
              {dienst.lead}
            </p>
          )}
          <p className={dienst.lead ? "mt-8" : ""}>
            <ButtonLink
              href={contactHref}
              data-track={`${dienst.slug}-contact`}
            >
              Neem contact op
              <span className="sr-only"> over {dienst.naam.toLowerCase()}</span>
            </ButtonLink>
          </p>
        </div>
      </div>

      {opener && (
        <Plate
          image={opener.image}
          ratio="aspect-[4/5]"
          sizes={coverSizes(WIDTHS.opener, BOX.portrait, opener.image.ratio)}
          priority
          // Phones: three quarters wide, bleeding off the right edge, like
          // the homepage's second service plate.
          className="-mr-4 ml-auto mt-12 w-3/4 sm:-mr-6 md:mr-0 md:mt-group md:w-[45%] lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:w-auto"
        >
          <PlateLine
            n={1}
            naam={opener.project.naam}
            href={`/realisaties/${opener.project.slug}`}
            meta={[opener.project.aard, opener.project.jaar]}
            className="pr-4 sm:pr-6 md:pr-0"
          />
        </Plate>
      )}
    </section>
  );
}

// Architects and contractors: one aqua panel in the body column, so they find
// their door before the back cover (the current page hid it in an aside).
function Professionals({ slug }) {
  return (
    <section
      aria-labelledby="pro-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="border-t-2 border-primary bg-aqua-pale p-6 md:p-8 lg:col-span-7 lg:col-start-6">
        <p className="text-meta text-primary-muted">Professionals</p>
        <h2
          id="pro-titel"
          className="mt-3 font-display text-h2 font-normal text-primary [text-wrap:balance]"
        >
          Bent u architect of aannemer?
        </h2>
        <p className="mt-4 md:mt-6">
          <ArrowLink
            href="/samenwerken#professionals"
            data-track={`${slug}-professionals`}
          >
            Zo werken wij samen
          </ArrowLink>
        </p>
      </div>
    </section>
  );
}

export default function ServicePage({
  dienst,
  secties,
  realisatiesAt,
  opener,
  realisaties,
  faq,
  werkgebied,
}) {
  const path = `/${dienst.slug}`;
  // Pre-fills the contact form's subject (components/contact/ContactForm.jsx).
  const contactHref = `/contact?dienst=${dienst.slug}`;

  // "Afb. n" restarts at 1 on every page, in DOM order: the title plate
  // first, then the realisaties.
  const blocks = secties.map((s) => <ServiceSection key={s.key} sectie={s} />);
  blocks.splice(
    Math.min(Math.max(realisatiesAt, 0), blocks.length),
    0,
    <ServiceRealisaties
      key="realisaties"
      plates={realisaties}
      firstN={opener ? 2 : 1}
      track={dienst.slug}
    />,
  );

  return (
    <>
      <PagesMetaHead
        title={dienst.title}
        description={dienst.description || undefined}
        jsonLd={[
          serviceJsonLd(dienst, path),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: dienst.naam, path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <V2Page>
        <TitlePage dienst={dienst} opener={opener} contactHref={contactHref} />
        {blocks}
        <ServiceVragen
          faq={faq}
          slug={dienst.slug}
          naam={dienst.naam}
          contactHref={contactHref}
        />
        <Professionals slug={dienst.slug} />
        <BackCover
          werkgebied={werkgebied}
          contactHref={contactHref}
          track={`${dienst.slug}-backcover`}
        />
      </V2Page>
    </>
  );
}
