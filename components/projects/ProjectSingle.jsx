import Image from "next/image";
import Link from "next/link";

// Takes a projected card (toProjectCard in lib/api), not a raw Strapi entry:
// the page used to serialise every field of every project into the HTML just
// to render this handful of values.
const ProjectSingle = ({
  slug,
  naam,
  korteBeschrijving,
  beschikbaarheid,
  thumbnail,
  priority = false,
  // /projects renders these directly under its h1, so an h3 there skips a
  // level; the homepage nests them under a section h2, where h3 is correct.
  headingLevel = 3,
}) => {
  if (!slug) return null;

  const Heading = `h${headingLevel}`;

  // An entry without a thumbnail would otherwise build a src of
  // "<asset-url>" + "" and render a broken image with no explanation.
  const imageSrc = thumbnail
    ? process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + thumbnail.url
    : null;

  return (
    <div className="enter-fade">
      <Link
        href={`/projects/${slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 rounded-sm"
      >
        <div className="cursor-pointer">
          {/* A fixed ratio so titles in one grid row share a baseline
              (intrinsic sizing spread them 85px). Portrait rather than
              landscape: most of the photographs are façades, and a 4:3 crop
              cut the roofline and the ground floor off a three-storey house. */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-ternary-light">
            {imageSrc ? (
              <Image
                src={imageSrc}
                className="object-cover"
                alt={naam || ""}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                // The first card is the LCP candidate on /projects; the rest
                // stay lazy so a phone does not fetch five photographs up front.
                priority={priority}
              />
            ) : null}
          </div>
          <div className="text-left pt-4">
            <Heading className="text-h3 text-ternary-dark [text-wrap:balance]">
              {naam}
            </Heading>
            {/* Availability is what a buyer scans a grid for. It only renders
                when the CMS actually has it. */}
            {beschikbaarheid && (
              <p className="text-meta text-accent-deep mt-2">
                {beschikbaarheid}
              </p>
            )}
            {korteBeschrijving && (
              <p className="text-body text-ternary-dark mt-2">{korteBeschrijving}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectSingle;
