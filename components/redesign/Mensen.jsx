import Image from "next/image";
import Link from "next/link";
import { PEOPLE } from "../../data/people";
import { HAS_PORTRAIT } from "../contact/FoundersPortrait";

// "Small is beautiful": the two people, with the minimal H16 emblem (the
// kolibrie abstracted, as on /about) as their figure
// until a portrait exists (drop public/images/founders.jpg and flip
// HAS_PORTRAIT in FoundersPortrait.jsx — this section follows).
export default function Mensen({ body }) {
  return (
    <section
      aria-labelledby="mensen-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section lg:grid lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="lg:col-span-7 lg:row-start-1 xl:col-span-6">
        {HAS_PORTRAIT && (
          <Image
            src="/images/H16_EMBLEEM_BLAUW.png"
            alt=""
            width={1152}
            height={850}
            className="mb-4 h-auto w-14"
          />
        )}
        <p className="text-meta text-primary-muted">De mensen</p>
        <h2
          id="mensen-titel"
          lang="en"
          className="mt-3 font-display text-display font-normal text-primary"
        >
          Small is beautiful
        </h2>
      </div>

      <figure className="mt-8 w-3/5 md:w-1/2 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:w-auto lg:self-start">
        {HAS_PORTRAIT ? (
          <>
            <div className="relative aspect-[4/5] overflow-hidden bg-plate">
              <Image
                src="/images/founders.jpg"
                alt="Gilles De Brabander en Elena Versyp"
                fill
                sizes="(min-width:1280px) 368px, (min-width:1024px) 299px, 60vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-ui text-primary">
              Gilles De Brabander &amp; Elena Versyp
            </figcaption>
          </>
        ) : (
          <>
            <Image
              src="/images/H16_EMBLEEM_BLAUW.png"
              alt=""
              width={1152}
              height={850}
              sizes="(min-width:1280px) 368px, (min-width:1024px) 299px, 60vw"
              className="h-auto w-full"
            />
            <figcaption className="mt-6">
              <span className="block text-ui text-primary">
                De kolibrie als symbool van H16
              </span>
              <span className="mt-1 block max-w-[34ch] text-meta text-ink">
                Een klein vogeltje met unieke gaven, dat zijn talenten gebruikt
                om zijn doel te bereiken. Net als H16.
              </span>
            </figcaption>
          </>
        )}
      </figure>

      <div className="mt-10 lg:col-span-7 lg:row-start-2 lg:mt-8 xl:col-span-6">
        <p className="max-w-[46ch] text-lead text-ink">
          H16 wordt geleid door Gilles De Brabander en Elena Versyp. Naast
          professionele partners vormen Gilles en Elena ook in het dagelijks
          leven een sterke tandem.
        </p>
        {body && (
          <p className="mt-4 max-w-[58ch] text-body text-ink hyphens-auto">
            {body}
          </p>
        )}
        <dl className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2">
          {PEOPLE.map((p) => (
            <div key={p.naam} className="border-t border-rule pt-4">
              <dt className="font-display text-h3 font-normal text-primary">
                {p.naam}
              </dt>
              <dd lang="en" className="mt-1 text-meta text-primary-muted">
                {p.rol}
              </dd>
              <dd className="mt-2 text-body text-ink">{p.eigenschappen}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10">
          <Link
            href="/about"
            data-track="home-over-ons"
            className="group/link inline-block py-3 text-lead font-medium text-primary underline decoration-1 underline-offset-[6px] hover:decoration-2 focus-ring md:py-0"
          >
            Over ons{"\u00A0"}
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
