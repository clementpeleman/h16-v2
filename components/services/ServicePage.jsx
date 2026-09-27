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

function Paragraphs({ tekst }) {
  return (
    <div className="max-w-[62ch] text-body text-ternary-dark space-y-5">
      {tekst.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

// One page per service, on the same frame as /samenwerken: an intro, then
// alternating HomeSection blocks, proof from real realisaties, the answered
// questions, and a contact block that pre-fills the form's subject.
function ServicePage({ dienst, realisaties }) {
  const draft = !dienst.ready;
  const path = `/${dienst.slug}`;
  const answered = dienst.faq.filter((q) => q.antwoord);
  const openQuestions = draft ? dienst.faq.filter((q) => !q.antwoord) : [];
  const secties = dienst.secties.filter((s) => s.voordelen || s.tekst || draft);

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
        <HomeSection key={s.titel} label={s.label} title={s.titel} flip={i % 2 === 1}>
          {s.voordelen ? (
            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {VOORDELEN.map((v) => (
                <li key={v.naam}>
                  <h3 className="font-display text-h3 text-black">{v.naam}</h3>
                  <p className="mt-4 text-body text-ternary-dark">{v.tekst}</p>
                </li>
              ))}
            </ul>
          ) : s.tekst ? (
            <Paragraphs tekst={s.tekst} />
          ) : (
            <Todo>{s.vraag}</Todo>
          )}
        </HomeSection>
      ))}

      {/* A realisatie is proof of a service only once H16 has confirmed its
          role on it: a draft asks, a ready page hides an unconfirmed grid. */}
      {(draft || (dienst.realisatiesBevestigd && realisaties.length > 0)) && (
        <HomeSection label="Realisaties" title="Zo ziet dat eruit" flip={secties.length % 2 === 1}>
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
        <HomeSection label="Veelgestelde vragen" title="Vragen en antwoorden">
          <dl className="max-w-[62ch] space-y-10">
            {answered.map((q) => (
              <div key={q.vraag}>
                <dt className="font-display text-h3 text-black">{q.vraag}</dt>
                <dd className="mt-4 text-body text-ternary-dark">{q.antwoord}</dd>
              </div>
            ))}
            {openQuestions.map((q) => (
              <div key={q.vraag}>
                <dt className="font-display text-h3 text-black">{q.vraag}</dt>
                <dd className="mt-4">
                  <Todo>{q.notitie}</Todo>
                </dd>
              </div>
            ))}
          </dl>
        </HomeSection>
      )}

      <HomeContact href={`/contact?dienst=${dienst.slug}`} />
    </div>
  );
}

export default ServicePage;
