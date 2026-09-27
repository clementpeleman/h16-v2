import { SECTIES } from "./sections";

// The title page of /samenwerken: the question the page answers, and — in
// the first viewport on every screen — a way straight down to the
// professionals. The client said architects and contractors get lost on the
// homepage; here they never have to scroll past the client chapters to find
// out whether the page is for them. (Only this one pointer: the services
// follow directly, so a full contents list would repeat the next heading.)
export default function Titel() {
  const pro = SECTIES.professionals;
  return (
    <section
      aria-labelledby="titel"
      className="container mx-auto pt-6 md:pt-10 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-14"
    >
      <div className="lg:col-span-7">
        <h1
          id="titel"
          className="font-display text-display font-normal text-primary"
        >
          Samenwerken
        </h1>
        <p className="mt-5 max-w-[36ch] text-lead text-ink md:mt-6">
          Wat kan H16 voor u betekenen?
        </p>
      </div>

      <p className="mt-10 border-y border-rule md:mt-12 md:max-w-[368px] lg:col-span-5 lg:col-start-8 lg:mt-0 lg:max-w-none lg:self-end xl:col-span-4 xl:col-start-9">
        <a
          href={`#${pro.id}`}
          className="group/link flex min-h-[44px] flex-col py-4 focus-ring"
        >
          <span className="text-meta text-primary-muted">{pro.label}</span>
          <span className="mt-1 font-display text-h3 font-normal text-primary decoration-1 underline-offset-4 group-hover/link:underline">
            {pro.titel}
            {"\u00A0"}
            <span
              aria-hidden="true"
              className="relative top-0 font-sans motion-safe:transition-[top] motion-safe:duration-150 group-hover/link:top-[3px]"
            >
              ↓
            </span>
          </span>
        </a>
      </p>
    </section>
  );
}
