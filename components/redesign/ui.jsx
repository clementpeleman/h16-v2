import Link from "next/link";

// Small shared primitives of the redesign, so every page draws links,
// buttons and section heads the same way. The rules behind them are in
// components/redesign/README.md.

// → glued to the last word (NBSP + an inline, not inline-block, arrow: an
// inline-block is a line-break opportunity and would orphan the arrow).
export function Arrow({ up = false }) {
  return (
    <>
      {" "}
      <span
        aria-hidden="true"
        className={
          up
            ? "relative left-0 top-0 motion-safe:transition-[left,top] motion-safe:duration-150 group-hover/link:left-0.5 group-hover/link:-top-0.5"
            : "relative left-0 motion-safe:transition-[left] motion-safe:duration-150 group-hover/link:left-[3px]"
        }
      >
        {up ? "↗" : "→"}
      </span>
    </>
  );
}

const LINK_TONES = {
  light: "text-primary underline decoration-1 hover:decoration-2 focus-ring",
  blue: "text-white underline decoration-aqua-light decoration-1 hover:decoration-2 focus-ring-inverse",
};

// A text link with an arrow. size "lead" for the big section links,
// "ui" for secondary ones. 44px tap target below 768px via padding.
export function ArrowLink({
  href,
  children,
  size = "lead",
  tone = "light",
  className = "",
  ...rest
}) {
  const sizeClass =
    size === "lead"
      ? "text-lead font-medium underline-offset-[6px]"
      : "text-ui underline-offset-4";
  return (
    <Link
      href={href}
      className={`group/link inline-block py-3 md:py-0 ${sizeClass} ${LINK_TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
      <Arrow />
    </Link>
  );
}

// A plain inline text link (no arrow), for links inside prose.
export function TextLink({
  href,
  children,
  tone = "light",
  className = "",
  ...rest
}) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  const cls = `underline-offset-4 ${LINK_TONES[tone]} ${className}`;
  return external ? (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

// The square button. "primary" on paper/aqua, "inverse" on the blue ground.
// Full width below 768px unless `inline`.
export function ButtonLink({
  href,
  children,
  variant = "primary",
  inline = false,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex h-[52px] items-center justify-center px-7 text-ui transition-colors duration-150 active:translate-y-px";
  const width = inline ? "" : "w-full md:w-auto";
  const look =
    variant === "inverse"
      ? "border border-paper bg-paper text-primary hover:border-white hover:bg-transparent hover:text-white focus-ring-inverse"
      : "bg-primary text-white underline-offset-4 hover:bg-primary-deep hover:underline focus-ring";
  return (
    <Link
      href={href}
      className={`${base} ${width} ${look} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

// Eyebrow label + heading. `as` sets the heading level; `size` picks the role
// (display for page titles, h1 for section titles, h2 for sub-sections).
export function SectionHead({
  label,
  title,
  id,
  as = "h2",
  size = "h1",
  tone = "light",
  className = "",
  titleClassName = "",
  lang,
}) {
  const Heading = as;
  const sizeClass = { display: "text-display", h1: "text-h1", h2: "text-h2" }[
    size
  ];
  const color = tone === "blue" ? "text-white" : "text-primary";
  const labelColor = tone === "blue" ? "text-aqua-light" : "text-primary-muted";
  return (
    <div className={className}>
      {label && <p className={`text-meta ${labelColor}`}>{label}</p>}
      <Heading
        id={id}
        lang={lang}
        className={`${label ? "mt-3" : ""} font-display font-normal ${sizeClass} ${color} [text-wrap:balance] ${titleClassName}`}
      >
        {title}
      </Heading>
    </div>
  );
}
