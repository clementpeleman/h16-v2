import Image from "next/image";
import Link from "next/link";

// One photograph on the page: a fixed-ratio box, cropped per breakpoint with
// CSS variables (--op-sm below 768px, --op-md above), on a neutral plate
// colour while it loads. No text ever sits on the photo.
//
// `href` makes the photo clickable through a duplicate link that is hidden
// from assistive tech and the tab order — the caption holds the real link.
// `reveal` opts the plate into the scroll reveal (hooks/useReveal.js).
// `as="div"` + a `contents` class lets a section grid place the box and the
// caption separately (a <figure> with display:contents is unsafe for AT).
export default function Plate({
  image,
  ratio,
  sizes,
  priority = false,
  eager = false,
  href,
  chip = null,
  reveal = false,
  as = "figure",
  className = "",
  boxClassName = "",
  children,
}) {
  const Wrapper = as;
  const style = {
    "--op-sm": image.op?.sm || "50% 50%",
    "--op-md": image.op?.md || image.op?.sm || "50% 50%",
  };

  const box = (
    <span
      className={`relative block overflow-hidden bg-plate ${ratio}`}
      style={style}
      {...(reveal ? { "data-plate": "" } : {})}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : eager ? "eager" : "lazy"}
        className={[
          "object-cover [object-position:var(--op-sm)] md:[object-position:var(--op-md)]",
          href
            ? "motion-safe:transition-transform motion-safe:duration-[800ms] motion-safe:ease-plate motion-safe:group-hover/plate:scale-[1.025]"
            : "",
        ].join(" ")}
      />
      {chip}
    </span>
  );

  return (
    <Wrapper className={`group/plate ${className}`}>
      {href ? (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`block ${boxClassName}`}
        >
          {box}
        </Link>
      ) : (
        <div className={boxClassName}>{box}</div>
      )}
      {children}
    </Wrapper>
  );
}

// The caption under a spread or interlude plate: "Afb. n" and the linked
// project name on the first line, the meta line under it. Two lines rather
// than one wrapping row, so a separator dot or the arrow is never left alone
// at the end of a line in a narrow column. The number is decoration
// (aria-hidden); the name is the link to the realisatie.
export function PlateLine({ n, naam, href, meta = [], className = "" }) {
  const parts = meta.filter(Boolean);
  return (
    <div className={`mt-3 ${className}`}>
      <p className="text-meta text-primary-muted">
        <span
          aria-hidden="true"
          className="mr-3 whitespace-nowrap tabular-nums"
        >
          Afb. {n}
        </span>
        {naam && (
          <Link
            href={href}
            className="group/link py-3 text-ui text-primary underline-offset-4 decoration-1 hover:underline focus-ring lg:py-0"
          >
            {naam}
            {"\u00A0"}
            <span
              aria-hidden="true"
              className="relative left-0 top-0 motion-safe:transition-[left,top] motion-safe:duration-150 group-hover/link:left-0.5 group-hover/link:-top-0.5"
            >
              ↗
            </span>
          </Link>
        )}
      </p>
      {parts.length > 0 && (
        <p className="mt-1 text-meta text-primary-muted">
          {parts.map((part, i) => (
            <span key={part}>
              {i > 0 && " "}
              <span className="whitespace-nowrap">
                {i > 0 && "· "}
                {part}
              </span>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

// The «Te koop» chip on a plate: solid paper fill, so its contrast never
// depends on the photograph. The dot is the only terracotta on the page.
export function SaleChip({ label }) {
  return (
    <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-paper px-2.5 py-1 text-meta text-primary">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
      {label}
    </span>
  );
}
