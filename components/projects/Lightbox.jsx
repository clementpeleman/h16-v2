import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Full-screen viewer for a project's photographs. No library: one overlay,
// arrow keys and Escape, swipe on touch, the page behind it locked.
//
// It is a real modal: rendered in a portal on <body>, with the whole app
// (#__next) made inert while it is open, so Tab can never reach the page
// behind it. Focus moves to «Sluiten» only when the viewer OPENS (not on
// every photo change — that used to send focus back to «Sluiten» after
// «Volgende foto», so the next Enter closed the viewer) and returns to
// whatever had focus before when it closes.
//
// variant "classic" is the production look; "v2" follows the redesign
// (square paper buttons on an ink ground, no black, no rounding).
function Lightbox({ images, index, onClose, onChange, variant = "classic" }) {
  const open = index !== null && index >= 0 && index < images.length;
  const touchStart = useRef(null);
  const closeRef = useRef(null);
  const [counter, setCounter] = useState(false);

  const prev = useCallback(
    () => onChange((index - 1 + images.length) % images.length),
    [index, images.length, onChange],
  );
  const next = useCallback(
    () => onChange((index + 1) % images.length),
    [index, images.length, onChange],
  );

  // Open/close only: scroll lock, inert app, focus in and back out.
  useEffect(() => {
    if (!open) return undefined;
    const returnTo = document.activeElement;
    const app = document.getElementById("__next");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    app?.setAttribute("inert", "");
    closeRef.current?.focus({ preventScroll: true });
    setCounter(true);
    return () => {
      document.body.style.overflow = prevOverflow;
      app?.removeAttribute("inert");
      if (returnTo && typeof returnTo.focus === "function") {
        returnTo.focus({ preventScroll: true });
      }
    };
  }, [open]);

  // Keys, re-bound when the photo changes; never moves focus.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, prev, next]);

  if (!open || typeof document === "undefined") return null;
  const beeld = images[index];
  const v2 = variant === "v2";

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

  const btn = v2
    ? "absolute z-10 flex h-12 w-12 items-center justify-center bg-paper text-primary hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white duration-150"
    : "absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 duration-200";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} van ${images.length}`}
      className={`fixed inset-0 z-50 select-none ${v2 ? "bg-ink/95" : "bg-black/95"}`}
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
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Vorige foto"
            className={`${btn} left-3 sm:left-6 top-1/2 -translate-y-1/2`}
          >
            <FiChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Volgende foto"
            className={`${btn} right-3 sm:right-6 top-1/2 -translate-y-1/2`}
          >
            <FiChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
          {counter && (
            <p
              className={`absolute bottom-4 left-0 right-0 text-center text-meta tabular-nums ${
                v2 ? "text-aqua-pale" : "text-white/70"
              }`}
            >
              {index + 1} / {images.length}
            </p>
          )}
        </>
      )}
    </div>,
    document.body,
  );
}

export default Lightbox;
