import Link from "next/link";
import Plate, { SaleChip } from "../Plate";

// The /realisaties index: every project as a numbered plate with a factual
// caption, set in rows like the pages of a monograph rather than a uniform
// card grid. The rows cycle lead → pair → pair:
//   lead  one plate across 8 columns, its caption flanking the bottom edge
//         (a lone last project becomes a mirrored lead);
//   pair  two plates of different widths, the more portrait photo in the
//         narrow slot, one of the two dropped so their tops stagger.
// Reading order is DOM order is visual order (left → right, top → bottom).
// Below 768px everything stacks; landscape and square plates run full-bleed,
// portrait plates sit inset, alternately flush right and left.

const GAP = 24;
// Container content width per breakpoint (tailwind container + padding).
const CONTENT = [
  ["(min-width:1536px)", 1408],
  ["(min-width:1280px)", 1152],
  ["(min-width:1024px)", 944],
];
const MD_CONTENT = 720;
const span = (content, n) => ((content - 11 * GAP) / 12) * n + GAP * (n - 1);

// Box ratio per shape (see IndexCuration.js): below 768px / from 768px.
const RATIO = {
  landscape: { cls: "aspect-[4/3] md:aspect-[3/2]", sm: 4 / 3, md: 3 / 2 },
  square: { cls: "aspect-[4/5] md:aspect-square", sm: 4 / 5, md: 1 },
  portrait: { cls: "aspect-[4/5]", sm: 4 / 5, md: 4 / 5 },
  portrait34: { cls: "aspect-[3/4]", sm: 3 / 4, md: 3 / 4 },
};
const isPortrait = (shape) => shape === "portrait" || shape === "portrait34";
const CAP = { 466: "max-w-[466px]", 491: "max-w-[491px]" };

// `sizes` for next/image: the box width at each breakpoint times the
// object-cover overscan (a 3:2 photo in a 1:1 box renders 1.5× its width),
// capped where the source is small.
function sizesFor(image, { lg, md, vw }) {
  const r = RATIO[image.shape];
  const ar = image.w && image.h ? image.w / image.h : r.md;
  const over = (box) => Math.max(1, ar / box);
  const cap = (px) => (image.maxW ? Math.min(px, image.maxW) : px);
  return [
    ...CONTENT.map(
      ([mq, c]) => `${mq} ${Math.round(cap(span(c, lg)) * over(r.md))}px`,
    ),
    `(min-width:768px) ${Math.round(cap(md) * over(r.md))}px`,
    `${Math.round(vw * over(r.sm))}vw`,
  ].join(", ");
}

// Phone placement per plate. `side` alternates over the portrait plates.
function phone(shape, side) {
  if (!isPortrait(shape)) {
    // Only the box bleeds; the caption stays on the text edge.
    return { article: "", box: "-mx-4 sm:-mx-6 md:mx-0", caption: "", vw: 100 };
  }
  return side === "right"
    ? {
        article: "ml-auto w-3/4 -mr-4 sm:-mr-6 md:mx-0",
        box: "",
        caption: "pr-4 sm:pr-6 md:pr-0",
        vw: 78,
      }
    : { article: "w-4/5", box: "", caption: "", vw: 80 };
}

function meta(p) {
  return [p.rol, p.aard, p.jaar, p.beschikbaarheid].filter(Boolean).join(" · ");
}

function chipFor(p) {
  return /te koop|te huur/i.test(p.beschikbaarheid) ? (
    <SaleChip label={p.beschikbaarheid} />
  ) : null;
}

// Number, linked name (the real link; h2, since the names sit directly under
// the page h1 as they do today), short description, meta line, price.
function IndexCaption({ n, project, id, top = "mt-3", className = "" }) {
  const line = meta(project);
  return (
    <div className={`${top} ${className}`}>
      {n ? (
        <p
          aria-hidden="true"
          className="text-meta tabular-nums text-primary-muted"
        >
          Afb. {n}
        </p>
      ) : null}
      <h2
        id={id}
        className={`${n ? "mt-2" : ""} font-display text-h3 font-normal text-primary [text-wrap:balance]`}
      >
        <Link
          href={`/realisaties/${project.slug}`}
          // Inline padding: a 44px tap target below 1024px without moving
          // the line (the caption's 8px gaps absorb it).
          className="py-2 decoration-1 underline-offset-4 hover:underline group-hover/plate:underline focus-ring lg:py-0"
        >
          {project.naam}
        </Link>
      </h2>
      {project.korte && (
        <p className="mt-2 max-w-[52ch] text-body text-ink hyphens-auto">
          {project.korte}
        </p>
      )}
      {line && <p className="mt-2 text-meta text-primary-muted">{line}</p>}
      {project.prijs && (
        <p className="mt-1 text-meta text-primary">{project.prijs}</p>
      )}
    </div>
  );
}

const captionId = (p) => `realisatie-${p.slug}`;

// Lead row: the article is its own 12-column grid at 1024+, the plate box
// and caption are placed in it side by side (caption bottom-aligned).
const LEAD = {
  landscape: {
    box: "lg:col-span-8",
    cap: "lg:col-span-4 lg:col-start-9",
    lg: 8,
    md: MD_CONTENT,
  },
  square: {
    box: "lg:col-span-7",
    cap: "lg:col-span-4 lg:col-start-9",
    lg: 7,
    md: 540,
  },
  portrait: {
    box: "lg:col-span-5",
    cap: "lg:col-span-5 lg:col-start-7",
    lg: 5,
    md: 360,
  },
};
const LEAD_FLIP = {
  landscape: {
    box: "lg:col-span-8 lg:col-start-5",
    cap: "lg:col-span-4 lg:col-start-1",
  },
  square: {
    box: "lg:col-span-7 lg:col-start-6",
    cap: "lg:col-span-4 lg:col-start-1",
  },
  portrait: {
    box: "lg:col-span-5 lg:col-start-8",
    cap: "lg:col-span-5 lg:col-start-2",
  },
};
const MD_LEAD_WIDTH = {
  landscape: "",
  square: "md:w-3/4 lg:w-auto",
  portrait: "md:w-1/2 lg:w-auto",
};

function LeadRow({ item, flip, className }) {
  const { project, image, n, side, first } = item;
  const id = captionId(project);

  if (!image) {
    return (
      <article aria-labelledby={id} className={className}>
        <IndexCaption project={project} id={id} top="" className="lg:w-2/3" />
      </article>
    );
  }

  const layoutShape = isPortrait(image.shape) ? "portrait" : image.shape;
  const lead = LEAD[layoutShape];
  const place = flip ? LEAD_FLIP[layoutShape] : lead;
  const ph = phone(image.shape, side);

  return (
    <article
      aria-labelledby={id}
      className={`${className} ${ph.article} ${MD_LEAD_WIDTH[layoutShape]} lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-x-6`}
    >
      <Plate
        as="div"
        image={image}
        href={`/realisaties/${project.slug}`}
        ratio={RATIO[image.shape].cls}
        sizes={sizesFor(image, {
          lg: lead.lg,
          md: lead.md,
          vw: ph.vw,
        })}
        priority={first}
        reveal={!first}
        chip={chipFor(project)}
        className="lg:contents"
        boxClassName={`${ph.box} ${place.box} ${CAP[image.maxW] || ""} lg:row-start-1`}
      >
        <IndexCaption
          n={n}
          project={project}
          id={id}
          className={`${ph.caption} ${place.cap} lg:row-start-1 lg:mt-0 lg:self-end`}
        />
      </Plate>
    </article>
  );
}

// Pair row: narrow slot for the more portrait photo. A landscape in the wide
// slot takes 7 columns (narrow 4), anything else 6 (narrow 5); one empty
// column between. From 768 to 1023: 5 + 6 columns.
const PAIR = {
  n7: [
    "md:col-span-5 lg:col-span-4",
    "md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6",
  ],
  n6: ["md:col-span-5", "md:col-span-6 md:col-start-7"],
  w7: [
    "md:col-span-6 lg:col-span-7",
    "md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9",
  ],
  w6: ["md:col-span-6", "md:col-span-5 md:col-start-8"],
};
const DROP = "md:mt-16 lg:mt-24 xl:mt-32";
const arOf = (item) => (item.image ? RATIO[item.image.shape].md : 1);

function PairItem({ item, place, lg, md, dropped, second }) {
  const { project, image, n, side } = item;
  const id = captionId(project);
  const ph = image ? phone(image.shape, side) : phone("landscape");
  const top = [second ? "mt-14" : "", dropped ? DROP : second ? "md:mt-0" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      aria-labelledby={id}
      className={`${ph.article} ${place} ${top} ${image ? CAP[image.maxW] || "" : ""} md:w-auto`}
    >
      {image ? (
        <Plate
          as="div"
          image={image}
          href={`/realisaties/${project.slug}`}
          ratio={RATIO[image.shape].cls}
          sizes={sizesFor(image, { lg, md, vw: ph.vw })}
          reveal
          chip={chipFor(project)}
          boxClassName={ph.box}
        >
          <IndexCaption
            n={n}
            project={project}
            id={id}
            className={ph.caption}
          />
        </Plate>
      ) : (
        <IndexCaption project={project} id={id} top="" />
      )}
    </article>
  );
}

function PairRow({ items, dropFirst, className }) {
  const [a, b] = items;
  const narrowFirst = arOf(a) <= arOf(b);
  const wide = narrowFirst ? b : a;
  const wideSpan = wide.image?.shape === "landscape" ? 7 : 6;
  const place = PAIR[`${narrowFirst ? "n" : "w"}${wideSpan}`];
  const spans = narrowFirst
    ? [11 - wideSpan, wideSpan]
    : [wideSpan, 11 - wideSpan];
  const mdSpans = (narrowFirst ? [5, 6] : [6, 5]).map((c) =>
    span(MD_CONTENT, c),
  );

  return (
    <div
      className={`${className} md:grid md:grid-cols-12 md:items-start md:gap-x-6`}
    >
      {[a, b].map((item, i) => (
        <PairItem
          key={item.project.slug}
          item={item}
          place={place[i]}
          lg={spans[i]}
          md={mdSpans[i]}
          second={i === 1}
          dropped={dropFirst ? i === 0 : i === 1}
        />
      ))}
    </div>
  );
}

// lead, pair, pair, lead (mirrored), …; a pair slot with one project left
// becomes a mirrored lead.
function buildRows(items) {
  const rows = [];
  let i = 0;
  let leads = 0;
  let pairs = 0;
  while (i < items.length) {
    if (rows.length % 3 === 0 || i === items.length - 1) {
      rows.push({ kind: "lead", items: [items[i]], flip: leads % 2 === 1 });
      leads += 1;
      i += 1;
    } else {
      rows.push({
        kind: "pair",
        items: [items[i], items[i + 1]],
        dropFirst: pairs % 2 === 1,
      });
      pairs += 1;
      i += 2;
    }
  }
  return rows;
}

export default function IndexGrid({ projects, className = "" }) {
  // "Afb. n" in DOM order over the projects that have a photograph;
  // portrait plates alternate right/left on phones.
  let n = 0;
  let portraits = 0;
  const items = projects.map((p, i) => {
    const item = { project: p, image: p.image, first: i === 0 };
    if (p.image) {
      n += 1;
      item.n = n;
      if (isPortrait(p.image.shape)) {
        item.side = portraits % 2 === 0 ? "right" : "left";
        portraits += 1;
      }
    }
    return item;
  });

  return (
    <div className={className}>
      {buildRows(items).map((row, r) => {
        const spacing = r === 0 ? "" : "mt-14 md:mt-group";
        return row.kind === "lead" ? (
          <LeadRow
            key={row.items[0].project.slug}
            item={row.items[0]}
            flip={row.flip}
            className={spacing}
          />
        ) : (
          <PairRow
            key={row.items[0].project.slug}
            items={row.items}
            dropFirst={row.dropFirst}
            className={spacing}
          />
        );
      })}
    </div>
  );
}
