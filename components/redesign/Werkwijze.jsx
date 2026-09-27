import Link from "next/link";

// The werkwijze in short: the full steps live on /bouwcoordinatie#werkwijze,
// so the homepage shows one sentence and the four step titles, numbered, on
// the brand guide's pale aqua, with a link to the rest. Copy arrives as props
// (read from data/diensten.js on the server).
export default function Werkwijze({ intro, stappen }) {
  if (!stappen?.length) return null;
  return (
    <section
      aria-labelledby="werkwijze-titel"
      className="mt-[4.5rem] bg-aqua-pale py-[4.5rem] md:mt-section md:py-group"
    >
      <div className="container mx-auto lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6">
          <p className="text-meta text-primary-muted">Bouwcoördinatie</p>
          <h2
            id="werkwijze-titel"
            className="mt-3 font-display text-h1 font-normal text-primary"
          >
            Onze werkwijze
          </h2>
        </div>
        {intro && (
          <p className="mt-4 max-w-[46ch] text-lead text-ink lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end xl:col-span-5 xl:col-start-8">
            {intro}
          </p>
        )}

        <ol className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-12 lg:col-span-12 lg:grid-cols-4">
          {stappen.map((stap, i) => (
            <li key={stap.titel} className="border-t border-rule-aqua pt-4">
              <span
                aria-hidden="true"
                className="text-ui tabular-nums text-primary-muted"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-h3 font-normal text-primary">
                {stap.titel}
              </h3>
            </li>
          ))}
        </ol>

        <p className="mt-8 md:mt-10 lg:col-span-12">
          <Link
            href="/bouwcoordinatie#werkwijze"
            data-track="home-werkwijze"
            className="group/link inline-block py-3 text-lead font-medium text-primary underline decoration-1 underline-offset-[6px] hover:decoration-2 focus-ring md:py-0"
          >
            Bekijk onze werkwijze{" "}
            <span
              aria-hidden="true"
              className="relative left-0 motion-safe:transition-[left] motion-safe:duration-150 group-hover/link:left-[3px]"
            >
              →
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}
