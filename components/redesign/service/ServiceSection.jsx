import { SectionHead } from "../ui";
import { BODY } from "./text";

// One section of a service page, in the order of data/diensten.js. Three
// shapes, chosen by the loader from what the section holds:
//   voordelen — the four benefits (h3 + text) in a 2×2 grid;
//   tekst     — paragraphs (the first as lead) and an optional hairline list;
//   stappen   — the werkwijze: the page's one pale-aqua band, every step with
//               its full text (the homepage only lists the titles and links
//               here, to #werkwijze).
// Heading left (cols 1–4), body from col 6, so every body on the page shares
// one left edge from 1024px up.

function Paragraphs({ tekst, className = "" }) {
  return tekst.map((t, i) => (
    <p
      key={t}
      className={
        i === 0
          ? `max-w-[46ch] text-lead text-ink [text-wrap:pretty] ${className}`
          : `mt-6 max-w-[62ch] ${BODY}`
      }
    >
      {t}
    </p>
  ));
}

function Punten({ punten, className = "" }) {
  if (!punten.length) return null;
  return (
    <ul className={`md:grid md:grid-cols-2 md:gap-x-6 ${className}`}>
      {punten.map((p) => (
        <li key={p} className="border-t border-rule py-3 text-body text-ink">
          {p}
        </li>
      ))}
    </ul>
  );
}

function Voordelen({ items }) {
  return (
    // Two columns where they are wide enough to read (640–1023, 1280+).
    <ul className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1 xl:grid-cols-2">
      {items.map((v) => (
        <li key={v.naam} className="border-t border-rule pt-4">
          <h3 className="font-display text-h3 font-normal text-primary [text-wrap:balance]">
            {v.naam}
          </h3>
          {v.tekst && <p className={`mt-3 ${BODY}`}>{v.tekst}</p>}
        </li>
      ))}
    </ul>
  );
}

function Stappen({ sectie, titleId }) {
  const { tekst, punten, stappen } = sectie;
  const hasIntro = tekst.length > 0 || punten.length > 0;
  return (
    <section
      id={sectie.id || undefined}
      aria-labelledby={titleId}
      className="mt-[4.5rem] bg-aqua-pale py-[4.5rem] md:mt-section md:py-group"
    >
      <div className="container mx-auto lg:grid lg:grid-cols-12 lg:gap-x-6">
        <SectionHead
          label={sectie.label}
          title={sectie.titel}
          id={titleId}
          lang={sectie.lang || undefined}
          className="lg:col-span-6"
        />
        {hasIntro && (
          <div className="mt-4 lg:col-span-6 lg:col-start-7 lg:mt-0 xl:col-span-5 xl:col-start-8">
            <Paragraphs tekst={tekst} />
            <Punten punten={punten} className={tekst.length ? "mt-8" : ""} />
          </div>
        )}

        <ol className="mt-10 md:mt-group lg:col-span-12">
          {stappen.map((stap, i) => (
            <li
              key={stap.titel}
              className="border-t border-rule-aqua py-6 last:border-b md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 md:py-8"
            >
              {/* Phones: numeral and title on one line, the text indented
                  under the title. From 768: one 12-column row. */}
              <div className="flex items-baseline md:contents">
                <span
                  aria-hidden="true"
                  className="w-10 shrink-0 text-ui tabular-nums text-primary md:col-span-1 md:w-auto"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h2 font-normal text-primary [text-wrap:balance] md:col-span-5">
                  {stap.titel}
                </h3>
              </div>
              {stap.tekst && (
                <p
                  className={`mt-3 max-w-[46ch] pl-10 ${BODY} md:col-span-6 md:col-start-7 md:mt-0 md:pl-0 xl:col-span-5 xl:col-start-8`}
                >
                  {stap.tekst}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ServiceSection({ sectie }) {
  const titleId = `${sectie.key}-titel`;
  if (sectie.variant === "stappen") {
    return <Stappen sectie={sectie} titleId={titleId} />;
  }
  return (
    <section
      id={sectie.id || undefined}
      aria-labelledby={titleId}
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <SectionHead
        label={sectie.label}
        title={sectie.titel}
        id={titleId}
        lang={sectie.lang || undefined}
        className="lg:col-span-4"
      />
      <div className="mt-8 md:mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
        {sectie.variant === "voordelen" ? (
          <Voordelen items={sectie.voordelen} />
        ) : (
          <>
            <Paragraphs tekst={sectie.tekst} />
            <Punten
              punten={sectie.punten}
              className={sectie.tekst.length ? "mt-8" : ""}
            />
          </>
        )}
      </div>
    </section>
  );
}
