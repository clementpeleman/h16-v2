import { company } from "../../../data/companyData";
import { ButtonLink, SectionHead, TextLink } from "../ui";
import { BODY } from "./text";

// The answered questions as a native <details> accordion (the client likes
// it): no script, keyboard and screen-reader support for free, and every
// answer stays in the HTML, matching the FAQPage JSON-LD. The section ends on
// the service's own contact button, which pre-fills the form's subject.

// The phone number inside an answer becomes a tel: link (no data-track:
// Analytics counts tel: links by itself).
function Antwoord({ text }) {
  const parts = text.split(company.phone);
  return (
    <p className={`max-w-[62ch] ${BODY}`}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <TextLink href={company.phoneHref} className="whitespace-nowrap">
              {company.phone}
            </TextLink>
          )}
        </span>
      ))}
    </p>
  );
}

export default function ServiceVragen({ faq, slug, naam, contactHref }) {
  if (!faq?.length) return null;
  return (
    <section
      aria-labelledby="vragen-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <SectionHead
        label="Vragen"
        title="Veelgestelde vragen"
        id="vragen-titel"
        className="lg:col-span-4"
      />
      <div className="mt-8 md:mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
        <div className="border-b border-rule">
          {faq.map((q) => (
            <details key={q.vraag} className="group border-t border-rule">
              <summary className="group/q flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-6 py-5 focus-ring [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-h3 font-normal text-primary decoration-1 underline-offset-4 group-hover/q:underline">
                  {q.vraag}
                </h3>
                {/* «+» turns into «×» when open. */}
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-display text-h2 font-normal leading-none text-primary group-open:rotate-45 motion-safe:transition-transform motion-safe:duration-200"
                >
                  +
                </span>
              </summary>
              <div className="pb-6">
                <Antwoord text={q.antwoord} />
              </div>
            </details>
          ))}
        </div>

        <p className="mt-10">
          <ButtonLink href={contactHref} data-track={`${slug}-vragen-contact`}>
            Neem contact op
            <span className="sr-only"> over {naam.toLowerCase()}</span>
          </ButtonLink>
        </p>
      </div>
    </section>
  );
}
