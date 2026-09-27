import Link from "next/link";
import { Arrow } from "../ui";

// Link on paper; a 44px tap row below 1024px through padding (an inline-block,
// not a flex box, so the arrow stays glued to the last word).
const value =
  "group/link inline-block py-3 text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring lg:py-0";

// "Belfortstraat 29,gent" (as typed in Strapi) reads "Belfortstraat 29,
// Gent"; the maps link keeps the CMS value.
const leesbaar = (adres) =>
  adres
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(", ");

// The facts that are links, as a colophon under the text: H16's role (only
// where the service page confirms it), the partners, the address. Hairline
// rows like the contact facts on the back cover. The aard, place and year
// stay the sentence under the title.
export default function Colophon({ project, rol, className = "" }) {
  const rows = [];

  if (rol) {
    rows.push({
      dt: "Rol van H16",
      dd: (
        <Link href={rol.href} className={value}>
          {rol.naam}
          <Arrow />
        </Link>
      ),
    });
  }

  if (project.samenwerkingen.length > 0) {
    rows.push({
      dt: "In samenwerking met",
      dd: (
        <ul>
          {project.samenwerkingen.map((partner) => (
            <li key={partner.naam}>
              {partner.url ? (
                // Followed, and with a referrer: crediting partners is the
                // ask that comes with requesting a link back from them.
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener"
                  className={value}
                >
                  {partner.naam}
                  <Arrow up />
                  <span className="sr-only"> (opent in een nieuw venster)</span>
                </a>
              ) : (
                <span className="inline-block py-3 text-ui text-ink lg:py-0">
                  {partner.naam}
                </span>
              )}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (project.adres) {
    rows.push({
      dt: "Adres",
      dd: (
        <a
          href={
            "https://maps.google.com/?q=" + encodeURIComponent(project.adres)
          }
          target="_blank"
          rel="noopener noreferrer"
          className={value}
        >
          {leesbaar(project.adres)}
          <span className="sr-only"> (opent Google Maps)</span>
        </a>
      ),
    });
  }

  if (!rows.length && !project.externeLink) return null;

  return (
    <div className={className}>
      {rows.length > 0 && (
        <dl>
          {rows.map((row) => (
            <div
              key={row.dt}
              className="border-t border-rule py-3 last:border-b lg:py-4"
            >
              <dt className="text-meta text-primary-muted">{row.dt}</dt>
              <dd className="lg:mt-1">{row.dd}</dd>
            </div>
          ))}
        </dl>
      )}
      {project.externeLink && (
        <p className={rows.length ? "mt-4 lg:mt-6" : ""}>
          <a
            href={project.externeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${value} break-words`}
          >
            Meer over dit project
            <Arrow up />
            <span className="sr-only"> (opent in een nieuw venster)</span>
          </a>
        </p>
      )}
    </div>
  );
}
