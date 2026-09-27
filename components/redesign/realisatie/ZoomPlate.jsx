import Image from "next/image";
import { assetUrl } from "../../../lib/seo";

// A numbered plate that opens the photograph full-screen (the page's
// Lightbox). Unlike the homepage plates it is never cropped: the box takes
// the photo's own proportions from its Strapi width and height, so portrait
// and landscape frames keep their roofline and floor. Same plate language as
// Plate.jsx: neutral ground while loading, «Afb. n» under it, a slow 1.025
// zoom on hover (motion-safe), the scroll reveal via data-plate.
//
// The button's name is the photo's alt text plus «(vergroten)»; «Afb. n» is
// decoration for sighted readers and hidden from assistive tech.
export default function ZoomPlate({
  image,
  n,
  sizes,
  onOpen,
  priority = false,
  reveal = true,
  className = "",
  captionClassName = "",
}) {
  return (
    <figure className={`group/plate ${className}`}>
      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-zoom-in text-left focus-ring"
      >
        <span
          className="relative block overflow-hidden bg-plate"
          {...(reveal ? { "data-plate": "" } : {})}
        >
          <Image
            src={assetUrl(image.url)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="block h-auto w-full motion-safe:transition-transform motion-safe:duration-[800ms] motion-safe:ease-plate motion-safe:group-hover/plate:scale-[1.025]"
          />
        </span>
        <span className="sr-only"> (vergroten)</span>
      </button>
      <p
        aria-hidden="true"
        className={`mt-3 text-meta tabular-nums text-primary-muted ${captionClassName}`}
      >
        Afb. {n}
      </p>
    </figure>
  );
}
