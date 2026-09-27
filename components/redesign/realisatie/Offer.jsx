import { ButtonLink } from "../ui";

// «● Te koop»: the 8px terracotta dot is the only accent colour on the page;
// the word itself is primary text, so the status never rests on colour alone.
// Inline (not flex), so it can also sit inside a running meta line.
export function Beschikbaarheid({ label, className = "" }) {
  return (
    <span className={`text-meta text-primary ${className}`}>
      <span
        aria-hidden="true"
        className="mr-2 inline-block h-2 w-2 rounded-full bg-accent align-middle"
      />
      {label}
    </span>
  );
}

function Prijs({ prijs, koop, className = "" }) {
  if (!prijs) return null;
  return (
    <p className={className}>
      {koop && (
        <span className="block text-meta text-primary-muted">Vraagprijs</span>
      )}
      <span className="block font-display text-h2 font-normal tabular-nums text-primary">
        {prijs}
      </span>
    </p>
  );
}

// The offer of a property that is for sale or for rent: availability, price,
// and the enquiry. Once after the description (the pale-aqua panel), once
// after the photographs (a hairline row), as on the current page.
export default function Offer({
  project,
  prijs,
  variant = "panel",
  className = "",
}) {
  const href = `/contact?project=${encodeURIComponent(project.naam || "")}`;
  const koop = /te koop/i.test(project.beschikbaarheid || "");
  const button = (
    <ButtonLink href={href} data-track="bezichtiging">
      Vraag een bezichtiging aan
    </ButtonLink>
  );

  if (variant === "row") {
    return (
      <div
        className={`border-t border-rule pt-8 md:flex md:items-end md:justify-between md:gap-x-8 ${className}`}
      >
        <div>
          <Beschikbaarheid label={project.beschikbaarheid} />
          <Prijs prijs={prijs} koop={koop} className="mt-3" />
        </div>
        <div className="mt-6 md:mt-0 md:shrink-0">{button}</div>
      </div>
    );
  }

  return (
    <div className={`bg-aqua-pale px-6 py-7 md:px-8 md:py-8 ${className}`}>
      <Beschikbaarheid label={project.beschikbaarheid} />
      <Prijs prijs={prijs} koop={koop} className="mt-4" />
      <div className="mt-6">{button}</div>
    </div>
  );
}
