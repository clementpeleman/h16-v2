import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Full-screen viewer for a project's photographs. No library: one overlay,
// arrow keys and Escape, swipe on touch, the page behind it locked.
function Lightbox({ images, index, onClose, onChange }) {
  const open = index !== null && index >= 0 && index < images.length;
  const touchStart = useRef(null);
  const closeRef = useRef(null);
  const [counter, setCounter] = useState(false);

  const prev = useCallback(
    () => onChange((index - 1 + images.length) % images.length),
    [index, images.length, onChange]
  );
  const next = useCallback(
    () => onChange((index + 1) % images.length),
    [index, images.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    setCounter(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, prev, next]);

  if (!open) return null;
  const beeld = images[index];

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) < 40) return;
    dx > 0 ? prev() : next();
  };

  const btn =
    "absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 duration-200";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} van ${images.length}`}
      className="fixed inset-0 z-50 bg-black/95 select-none"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="absolute inset-0 m-4 sm:m-10 lg:m-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={beeld.url}
          src={process.env.NEXT_PUBLIC_STRAPI_ASSET_URL + beeld.url}
          alt={beeld.alt || ""}
          fill
          sizes="100vw"
          priority
          className="object-contain"
          draggable={false}
        />
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Sluiten"
        className={`${btn} top-4 right-4`}
      >
        <FiX className="h-6 w-6" aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Vorige foto"
            className={`${btn} left-3 sm:left-6 top-1/2 -translate-y-1/2`}
          >
            <FiChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Volgende foto"
            className={`${btn} right-3 sm:right-6 top-1/2 -translate-y-1/2`}
          >
            <FiChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
          {counter && (
            <p className="absolute bottom-4 left-0 right-0 text-center text-meta text-white/70 tabular-nums">
              {index + 1} / {images.length}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Lightbox;
