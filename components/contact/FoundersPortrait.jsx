import Image from "next/image";

// STRUCTURE ONLY — waiting on the client's photograph.
//
// Why this slot exists: the right column of /contact measured 469px of empty
// space beside a filled form, at the exact moment a visitor decides whether to
// trust two people they have never met. The site promises "één duidelijk
// aanspreekpunt" and then shows no faces anywhere on any page.
//
// TO ACTIVATE: drop the photo at public/images/founders.jpg and flip this to
// true. Nothing else needs to change — the slot already reserves the right box,
// so adding the image cannot shift the layout.
const HAS_PORTRAIT = false;

// A fixed ratio and explicit dimensions mean any crop the client supplies drops
// in without reflow.
const FRAME = "relative aspect-[4/3] w-full overflow-hidden shadow-sm";

function FoundersPortrait({ className = "" }) {
  // Nothing renders until the photograph exists. The dashed placeholder was
  // useful while the slot was being designed; on a live page it reads as a
  // broken image to a visitor who has no idea one is coming.
  if (!HAS_PORTRAIT) return null;

  return (
    <figure className={`max-w-md ${className}`}>
      <div className={`${FRAME} bg-ternary-light`}>
        <Image
          src="/images/founders.jpg"
          alt="Gilles De Brabander en Elena Versyp"
          fill
          sizes="(min-width: 1024px) 28rem, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-4 text-meta text-ternary-dark">
        Gilles De Brabander &amp; Elena Versyp
      </figcaption>
    </figure>
  );
}

export default FoundersPortrait;
