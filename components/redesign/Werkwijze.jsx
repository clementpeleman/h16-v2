import Link from "next/link";

// The werkwijze of /bouwcoordinatie, set as a typographic insert on the brand
// guide's pale aqua. The steps are the content, so they are not collapsed.
// Copy arrives as props (read from data/diensten.js on the server).
export default function Werkwijze({ intro, stappen }) {
  if (!stappen?.length) return null;
  return (
    <section
      aria-labelledby="werkwijze-titel"
      className="mt-[4.5rem] bg-aqua-pale py-[4.5rem] md:mt-section md:py-section"
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
          <p className="mt-4 max-w-[52ch] text-body text-ink hyphens-auto lg:col-span-6 lg:col-start-7 lg:mt-0 xl:col-span-5 xl:col-start-8">
            {intro}
          </p>
        )}

        <ol className="mt-10 md:mt-group lg:col-span-12">
          {stappen.map((stap, i) => (
            <li
              key={stap.titel}
              className="border-t border-rule-aqua py-6 last:border-b md:grid md:grid-cols-12 md:items-baseline md:gap-x-6 md:py-7 xl:py-8"
            >
              <div className="flex items-baseline md:col-span-6 md:contents">
                <span
                  aria-hidden="true"
                  className="w-8 shrink-0 text-ui tabular-nums text-primary md:col-span-1 md:w-auto"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h2 font-normal text-primary md:col-span-5">
                  {stap.titel}
                </h3>
              </div>
              <p className="mt-3 max-w-[46ch] pl-8 text-body text-ink hyphens-auto md:col-span-6 md:col-start-7 md:mt-0 md:pl-0 xl:col-span-5 xl:col-start-8">
                {stap.tekst}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 md:mt-10 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <Link
            href="/bouwcoordinatie#werkwijze"
            data-track="home-werkwijze"
            className="group/link inline-block py-3 text-lead font-medium text-primary underline decoration-1 underline-offset-[6px] hover:decoration-2 focus-ring md:py-0"
          >
            Bekijk onze werkwijze{"\u00A0"}
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
