import Link from "next/link";
import Plate, { SaleChip } from "./Plate";

const meta = (p) =>
  [p.rol, p.aard, p.jaar, p.beschikbaarheid].filter(Boolean).join(" · ");

// Caption under a Realisaties plate: number, linked name (the real link),
// short description, meta line, and the asking price where the page shows it.
function PlateCaption({ n, project, className = "" }) {
  return (
    <div className={`mt-3 ${className}`}>
      <p
        aria-hidden="true"
        className="text-meta tabular-nums text-primary-muted"
      >
        Afb. {n}
      </p>
      <h3 className="mt-2 font-display text-h3 font-normal text-primary">
        <Link
          href={`/realisaties/${project.slug}`}
          className="underline-offset-4 decoration-1 hover:underline group-hover/plate:underline focus-ring"
        >
          {project.naam}
        </Link>
      </h3>
      {project.korte && (
        <p className="mt-2 max-w-[52ch] text-body text-ink hyphens-auto">
          {project.korte}
        </p>
      )}
      {meta(project) && (
        <p className="mt-2 text-meta text-primary-muted">{meta(project)}</p>
      )}
      {project.prijs && (
        <p className="mt-1 text-meta text-primary">{project.prijs}</p>
      )}
    </div>
  );
}

function chipFor(project) {
  return /te koop|te huur/i.test(project.beschikbaarheid) ? (
    <SaleChip label={project.beschikbaarheid} />
  ) : null;
}

// ≥768 only: every project as a row — name, dienst, year, and the «Te koop»
// marker. The whole row is one link (stretched ::after), the only one in it.
function WorksList({ works }) {
  return (
    <div className="mt-group hidden md:block lg:col-span-12">
      <div
        aria-hidden="true"
        className="grid grid-cols-12 gap-x-6 pb-3 text-meta text-primary-muted"
      >
        <span className="col-span-6">Project</span>
        <span className="col-span-3">Dienst</span>
        <span>Jaar</span>
      </div>
      <ul>
        {works.map((p) => (
          <li
            key={p.slug}
            className="group/row relative grid min-h-[64px] grid-cols-12 items-baseline gap-x-6 border-t border-rule py-4 last:border-b"
          >
            <span className="col-span-6 font-display text-h3 font-normal text-primary">
              <Link
                href={`/realisaties/${p.slug}`}
                className="decoration-1 underline-offset-4 after:absolute after:inset-0 group-hover/row:underline focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-primary"
              >
                {p.naam}
              </Link>
            </span>
            <span className="col-span-3 text-body text-ink">{p.rol}</span>
            <span className="text-body tabular-nums text-ink">{p.jaar}</span>
            <span className="col-span-2 flex items-baseline justify-end gap-3 text-right">
              {/te koop|te huur/i.test(p.beschikbaarheid) && (
                <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-meta text-primary">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-accent"
                  />
                  {p.beschikbaarheid}
                </span>
              )}
              <span
                aria-hidden="true"
                className="text-primary motion-safe:transition-transform motion-safe:duration-150 group-hover/row:translate-x-1"
              >
                →
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Realisaties({ plates, works, firstN }) {
  if (!plates.length && !works.length) return null;
  const [a, b, c] = ["A", "B", "C"].map((size) =>
    plates.find((p) => p.size === size),
  );
  let n = firstN;
  const num = {};
  [a, b, c].forEach((p) => {
    if (p) num[p.size] = n++;
  });

  return (
    <section
      aria-labelledby="realisaties-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="lg:col-span-12 lg:row-start-1 lg:flex lg:items-end lg:justify-between xl:col-span-4 xl:col-start-9 xl:block xl:self-start">
        <div>
          <p className="text-meta text-primary-muted">Realisaties</p>
          <h2
            id="realisaties-titel"
            className="mt-3 font-display text-h1 font-normal text-primary [text-wrap:balance]"
          >
            Onze realisaties in Gent en omgeving
          </h2>
        </div>
        <p className="mt-6 lg:mt-0 xl:mt-6">
          <Link
            href="/realisaties"
            data-track="home-realisaties"
            className="group/link inline-block py-3 text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring md:py-0"
          >
            Alles bekijken{"\u00A0"}
            <span
              aria-hidden="true"
              className="relative left-0 motion-safe:transition-[left] motion-safe:duration-150 group-hover/link:left-[3px]"
            >
              →
            </span>
          </Link>
        </p>
      </div>

      {/* Plate A: its box and caption are placed separately in the grid, so
          the heading flanks the top of the photo and the caption its bottom. */}
      {a && (
        <Plate
          as="div"
          image={a.image}
          href={`/realisaties/${a.project.slug}`}
          ratio="aspect-[4/3] md:aspect-[3/2]"
          sizes="(min-width:1536px) 931px, (min-width:1280px) 760px, (min-width:1024px) 621px, (min-width:768px) 720px, 116vw"
          reveal
          className="mt-10 lg:contents"
          boxClassName="-mx-4 sm:-mx-6 md:mx-0 lg:col-span-8 lg:row-start-2 lg:mt-12 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:mt-0"
        >
          <PlateCaption
            n={num.A}
            project={a.project}
            className="px-4 sm:px-6 md:px-0 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-0 lg:self-end xl:row-start-2"
          />
        </Plate>
      )}

      {(b || c) && (
        <div className="mt-12 md:mt-group md:grid md:grid-cols-12 md:items-start md:gap-x-6 lg:col-span-12 lg:row-start-3">
          {b && (
            <Plate
              image={b.image}
              href={`/realisaties/${b.project.slug}`}
              ratio="aspect-[4/5]"
              // 4:3 photo in a 4:5 box renders 1.667× the box width.
              sizes="(min-width:1536px) 955px, (min-width:1280px) 777px, (min-width:1024px) 632px, (min-width:768px) 477px, 133vw"
              reveal
              className={`w-4/5 md:w-auto ${c ? "md:col-span-5" : "md:col-span-6"}`}
            >
              <PlateCaption n={num.B} project={b.project} />
            </Plate>
          )}
          {c && (
            <Plate
              image={c.image}
              href={`/realisaties/${c.project.slug}`}
              ratio="aspect-[4/3] md:aspect-[3/2]"
              sizes="(min-width:1536px) 692px, (min-width:1280px) 564px, (min-width:1024px) 460px, (min-width:768px) 372px, 116vw"
              reveal
              chip={chipFor(c.project)}
              className="mt-12 md:col-span-6 md:col-start-7 md:mt-0"
              boxClassName="-mx-4 sm:-mx-6 md:mx-0"
            >
              <PlateCaption
                n={num.C}
                project={c.project}
                className="px-4 sm:px-6 md:px-0"
              />
            </Plate>
          )}
        </div>
      )}

      {works.length > 0 && <WorksList works={works} />}
    </section>
  );
}
