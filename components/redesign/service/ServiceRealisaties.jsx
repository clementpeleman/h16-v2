import Link from "next/link";
import Plate, { SaleChip } from "../Plate";
import { ArrowLink } from "../ui";
import { BOX, WIDTHS, coverSizes } from "./plateSizes";
import { BODY } from "./text";

// The service's confirmed realisaties as numbered plates, in the homepage's
// visual language: "Afb. n" (continuing the page's numbering), the linked
// name, the CMS description, then «rol · aard · jaar · beschikbaarheid».
// The arrangement follows the count: one plate stands alone, three take the
// homepage's large + portrait + landscape layout, other counts pair up.

const meta = (p) =>
  [p.rol, p.aard, p.jaar, p.beschikbaarheid].filter(Boolean).join(" · ");

function Caption({ n, project, className = "" }) {
  return (
    <div className={`mt-3 ${className}`}>
      <p
        aria-hidden="true"
        className="text-meta tabular-nums text-primary-muted"
      >
        Afb. {n}
      </p>
      <h3 className="mt-2 font-display text-h3 font-normal text-primary [text-wrap:balance]">
        <Link
          href={`/realisaties/${project.slug}`}
          className="py-2 underline-offset-4 decoration-1 hover:underline group-hover/plate:underline focus-ring lg:py-0"
        >
          {project.naam}
        </Link>
      </h3>
      {project.korte && (
        <p className={`mt-2 max-w-[52ch] ${BODY}`}>{project.korte}</p>
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

const chipFor = (project) =>
  /te koop|te huur/i.test(project.beschikbaarheid) ? (
    <SaleChip label={project.beschikbaarheid} />
  ) : null;

const href = (plate) => `/realisaties/${plate.project.slug}`;

function Head({ track, className, linkClassName }) {
  return (
    <div className={className}>
      <div>
        <p className="text-meta text-primary-muted">Realisaties</p>
        <h2
          id="realisaties-titel"
          className="mt-3 font-display text-h1 font-normal text-primary [text-wrap:balance]"
        >
          Onze realisaties
        </h2>
      </div>
      <p className={linkClassName}>
        <ArrowLink
          href="/realisaties"
          size="ui"
          data-track={`${track}-realisaties`}
        >
          Alles bekijken
        </ArrowLink>
      </p>
    </div>
  );
}

// One realisatie: a portrait plate on the left, the heading flanking its top
// and the caption its bottom (768 and up); stacked on phones.
function Single({ plate, n, track }) {
  return (
    <section
      aria-labelledby="realisaties-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section md:grid md:grid-cols-12 md:gap-x-6"
    >
      <Head
        track={track}
        className="md:col-span-6 md:col-start-7 md:row-start-1 md:self-start lg:col-span-5 lg:col-start-8"
        linkClassName="mt-6"
      />
      <Plate
        as="div"
        image={plate.image}
        href={href(plate)}
        ratio="aspect-[4/5]"
        sizes={coverSizes(WIDTHS.single, BOX.portrait, plate.image.ratio)}
        chip={chipFor(plate.project)}
        reveal
        className="mt-10 md:contents"
        boxClassName="w-4/5 md:col-span-6 md:col-start-1 md:row-span-2 md:row-start-1 md:mt-0 md:w-auto lg:col-span-5"
      >
        <Caption
          n={n}
          project={plate.project}
          className="md:col-span-6 md:col-start-7 md:row-start-2 md:mt-0 md:self-end lg:col-span-5 lg:col-start-8"
        />
      </Plate>
    </section>
  );
}

// A row of two (portrait left, landscape right), or one portrait alone.
function Pair({ pair, n, className = "" }) {
  const [b, c] = pair;
  return (
    <div
      className={`mt-12 md:mt-group md:grid md:grid-cols-12 md:items-start md:gap-x-6 lg:col-span-12 ${className}`}
    >
      {b && (
        <Plate
          image={b.image}
          href={href(b)}
          ratio="aspect-[4/5]"
          sizes={coverSizes(
            c ? WIDTHS.portrait : WIDTHS.portraitWide,
            BOX.portrait,
            b.image.ratio,
          )}
          chip={chipFor(b.project)}
          reveal
          className={`w-4/5 md:w-auto ${c ? "md:col-span-5" : "md:col-span-6"}`}
        >
          <Caption n={n} project={b.project} />
        </Plate>
      )}
      {c && (
        <Plate
          image={c.image}
          href={href(c)}
          ratio="aspect-[4/3] md:aspect-[3/2]"
          sizes={coverSizes(WIDTHS.landscape, BOX.landscape, c.image.ratio)}
          chip={chipFor(c.project)}
          reveal
          className="mt-12 md:col-span-6 md:col-start-7 md:mt-0"
          boxClassName="-mx-4 sm:-mx-6 md:mx-0"
        >
          <Caption
            n={n + 1}
            project={c.project}
            className="px-4 sm:px-6 md:px-0"
          />
        </Plate>
      )}
    </div>
  );
}

export default function ServiceRealisaties({ plates, firstN, track }) {
  if (!plates?.length) return null;
  if (plates.length === 1) {
    return <Single plate={plates[0]} n={firstN} track={track} />;
  }

  // Three or more: the first is the large plate; the rest pair up.
  const a = plates.length >= 3 ? plates[0] : null;
  const rest = a ? plates.slice(1) : plates;
  const pairs = [];
  for (let i = 0; i < rest.length; i += 2) pairs.push(rest.slice(i, i + 2));
  const restN = firstN + (a ? 1 : 0);

  return (
    <section
      aria-labelledby="realisaties-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <Head
        track={track}
        className={
          a
            ? "lg:col-span-12 lg:row-start-1 lg:flex lg:items-end lg:justify-between xl:col-span-4 xl:col-start-9 xl:block xl:self-start"
            : "lg:col-span-12 lg:flex lg:items-end lg:justify-between"
        }
        linkClassName={a ? "mt-6 lg:mt-0 xl:mt-6" : "mt-6 lg:mt-0"}
      />

      {/* The large plate: box and caption placed separately in the grid, so
          at 1280+ the heading flanks the top of the photo and the caption
          its bottom (as on the homepage). */}
      {a && (
        <Plate
          as="div"
          image={a.image}
          href={href(a)}
          ratio="aspect-[4/3] md:aspect-[3/2]"
          sizes={coverSizes(WIDTHS.large, BOX.landscape, a.image.ratio)}
          chip={chipFor(a.project)}
          reveal
          className="mt-10 lg:contents"
          boxClassName="-mx-4 sm:-mx-6 md:mx-0 lg:col-span-8 lg:row-start-2 lg:mt-12 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:mt-0"
        >
          <Caption
            n={firstN}
            project={a.project}
            className="px-4 sm:px-6 md:px-0 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-0 lg:self-end xl:row-start-2"
          />
        </Plate>
      )}

      {pairs.map((pair, i) => (
        <Pair
          key={pair[0].project.slug}
          pair={pair}
          n={restN + i * 2}
          className={a && i === 0 ? "lg:row-start-3" : ""}
        />
      ))}
    </section>
  );
}
