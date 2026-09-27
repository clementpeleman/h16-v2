import Link from "next/link";
import { PEERS } from "../../data/peers";

// Architects and contractors get their own section on the paper ground, just
// before the blue back cover — sharing the blue with the contact band made it
// read as part of the footer. Two aqua panels, one link to the full offer.
export default function Professionals() {
  return (
    <section
      aria-labelledby="pro-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="lg:col-span-4">
        <p className="text-meta text-primary-muted">Professionals</p>
        <h2
          id="pro-titel"
          className="mt-3 font-display text-h1 font-normal text-primary [text-wrap:balance]"
        >
          Voor architecten en aannemers
        </h2>
        <p className="mt-6">
          <Link
            href="/samenwerken#professionals"
            data-track="home-professionals"
            className="group/link inline-block py-3 text-lead font-medium text-primary underline decoration-1 underline-offset-[6px] hover:decoration-2 focus-ring md:py-0"
          >
            Zo werken wij samen{" "}
            <span
              aria-hidden="true"
              className="relative left-0 motion-safe:transition-[left] motion-safe:duration-150 group-hover/link:left-[3px]"
            >
              →
            </span>
          </Link>
        </p>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:col-span-8 lg:mt-0">
        {PEERS.map((p) => (
          <li
            key={p.naam}
            className="border-t-2 border-primary bg-aqua-pale p-6 md:p-8"
          >
            <h3 className="font-display text-h2 font-normal text-primary">
              {p.naam}
            </h3>
            <p className="mt-4 max-w-[46ch] text-body text-ink hyphens-auto">
              {p.tekst}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
