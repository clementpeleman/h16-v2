import Link from "next/link";
import PagesMetaHead from "../PagesMetaHead";
import HomeSection from "../home/HomeSection";
import HomeContact from "../home/HomeContact";
import ProjectSingle from "../projects/ProjectSingle";
import { VOORDELEN } from "../colab/ColabBenefits";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../../lib/seo";

// What H16 still has to write. Only ever visible on a draft (the page 404s on
// h16.be until the service is marked ready), so it can afford to be loud.
function Todo({ children }) {
  return (
    <div className="border-2 border-dashed border-accent/60 rounded-md p-6 text-body text-ternary-dark">
      <p className="text-meta uppercase tracking-[0.14em] text-accent">Tekst volgt (H16)</p>
      <p className="mt-3">{children}</p>
    </div>
  );
}

// A section's own copy: paragraphs, then an optional bullet list (punten)
// or numbered steps (stappen, each with a short title).
function SectionBody(props) {
  // Data uses null for "not written yet", which a default parameter ignores.
  const tekst = props.tekst || [];
  const punten = props.punten || [];
  const stappen = props.stappen || [];
  return (
    <div className="max-w-[62ch] text-body text-ternary-dark">
      {tekst.length > 0 && (
        <div className="space-y-5">
          {tekst.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
      {punten.length > 0 && (
        <ul className={`${tekst.length ? "mt-6" : ""} list-disc pl-5 space-y-2 marker:text-accent`}>
          {punten.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {stappen.length > 0 && (
        <ol className={`${tekst.length || punten.length ? "mt-10" : ""} space-y-8`}>
          {stappen.map((stap, i) => (
            <li key={stap.titel} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
              <span aria-hidden="true" className="font-display text-h3 text-accent leading-none">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-h3 text-black">{stap.titel}</h3>
                <p className="mt-3">{stap.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const hasBody = (s) => Boolean(s.tekst?.length || s.punten?.length || s.stappen?.length);

// One page per service, on the same frame as /samenwerken: an intro, then
// alternating HomeSection blocks, proof from real realisaties, the answered
// questions, and a contact block that pre-fills the form's subject.
function ServicePage({ dienst, realisaties }) {
  const draft = !dienst.ready;
  const path = `/${dienst.slug}`;
  const answered = dienst.faq.filter((q) => q.antwoord);
  const openQuestions = draft ? dienst.faq.filter((q) => !q.antwoord) : [];
  const secties = dienst.secties.filter((s) => s.voordelen || hasBody(s) || draft);

  return (
    <div className="enter-fade container mx-auto">
      <PagesMetaHead
        title={dienst.title}
        description={dienst.description}
        jsonLd={[
          serviceJsonLd(dienst, path),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: dienst.naam, path },
          ]),
          faqJsonLd(answered),
        ]}
      />

      <section className="mt-section grid gap-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-8">
          <h1 className="font-display text-h1 text-black [text-wrap:balance]">
            {dienst.h1}
          </h1>
          <p className="mt-8 max-w-[52ch] text-lead text-gray-700">{dienst.lead}</p>
        </div>
      </section>

      {secties.map((s, i) => (
        <HomeSection key={s.titel} id={s.id} label={s.label} title={s.titel} flip={i % 2 === 1}>
          {s.voordelen ? (
            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {VOORDELEN.map((v) => (
                <li key={v.naam}>
                  <h3 className="font-display text-h3 text-black">{v.naam}</h3>
                  <p className="mt-4 text-body text-ternary-dark">{v.tekst}</p>
                </li>
              ))}
            </ul>
          ) : hasBody(s) ? (
            <SectionBody tekst={s.tekst} punten={s.punten} stappen={s.stappen} />
          ) : (
            <Todo>{s.vraag}</Todo>
          )}
        </HomeSection>
      ))}

      {/* A realisatie is proof of a service only once H16 has confirmed its
          role on it: a draft asks, a ready page hides an unconfirmed grid. */}
      {(draft || (dienst.realisatiesBevestigd && realisaties.length > 0)) && (
        <HomeSection label="Realisaties" title="Onze realisaties" flip={secties.length % 2 === 1}>
          {draft && !dienst.realisatiesBevestigd && (
            <Todo>{dienst.realisatiesVraag}</Todo>
          )}
          {realisaties.length > 0 && (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ${
                draft && !dienst.realisatiesBevestigd ? "mt-10" : ""
              }`}
            >
              {realisaties.map((project) => (
                <ProjectSingle key={project.id} {...project} headingLevel={3} />
              ))}
            </div>
          )}
        </HomeSection>
      )}

      {(answered.length > 0 || openQuestions.length > 0) && (
        <HomeSection label="Vragen" title="Veelgestelde vragen">
          {/* A closed list of questions; the reader opens what matters to
              them. Native <details>: no script, keyboard and screen-reader
              support for free, and the answers stay in the HTML for Google
              and match the FAQPage JSON-LD. Drafts open their open
              questions so H16 sees what is missing. */}
          <div className="max-w-[62ch] border-b border-gray-200">
            {[...answered, ...openQuestions].map((q) => (
              <details
                key={q.vraag}
                open={!q.antwoord || undefined}
                className="group border-t border-gray-200"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">
                  <h3 className="font-display text-h3 text-black">{q.vraag}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-h3 leading-none text-primary duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-8 text-body text-ternary-dark">
                  {q.antwoord ? <p>{q.antwoord}</p> : <Todo>{q.notitie}</Todo>}
                </div>
              </details>
            ))}
          </div>
        </HomeSection>
      )}

      <HomeContact
        href={`/contact?dienst=${dienst.slug}`}
        aside={
          <p className="text-body text-ternary-dark">
            Bent u architect of aannemer?{" "}
            <Link
              href="/samenwerken"
              className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
            >
              Zo werken wij samen
            </Link>
          </p>
        }
      />
    </div>
  );
}

export default ServicePage;
