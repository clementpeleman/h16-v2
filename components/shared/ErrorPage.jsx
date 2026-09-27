import V2Page from "../redesign/V2Page";
import { ArrowLink, ButtonLink, TextLink } from "../redesign/ui";
import { company } from "../../data/companyData";

// Shared body for 404 and 500, in the site's frame (header, footer), so the
// visitor is never stranded on a bare page. Every route out is on this
// screen: the work, the start page, and the phone.
function ErrorPage({ title, body }) {
  return (
    <V2Page>
      <section
        aria-labelledby="fout-titel"
        className="container mx-auto pb-group pt-6 md:pt-10 lg:pt-14"
      >
        <div className="max-w-[46rem]">
          <h1
            id="fout-titel"
            className="font-display text-display font-normal text-primary [text-wrap:balance]"
          >
            {title}
          </h1>
          <p className="mt-8 max-w-[46ch] text-lead text-ink">{body}</p>
          <div className="mt-10 flex flex-col gap-2 md:flex-row md:items-center md:gap-x-8">
            <ButtonLink href="/realisaties">Bekijk onze realisaties</ButtonLink>
            <ArrowLink href="/" size="ui">
              Naar de startpagina
            </ArrowLink>
          </div>
          <p className="mt-12 text-body text-ink">
            Zoekt u iets bepaalds? Bel ons op{" "}
            <TextLink href={company.phoneHref}>{company.phone}</TextLink> of
            mail naar{" "}
            <TextLink href={company.emailHref} className="break-all">
              {company.email}
            </TextLink>
            .
          </p>
        </div>
      </section>
    </V2Page>
  );
}

export default ErrorPage;
