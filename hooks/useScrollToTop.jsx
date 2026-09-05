import { useEffect, useRef, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

// Despite the `use` name this is a component, rendered as <UseScrollToTop />.
//
// It used to call window.addEventListener in the render body, outside any
// effect and with a fresh closure each time, so every render leaked one more
// scroll listener that was never removed — measured at one per render, and the
// listener itself sets state, so scrolling compounded it. The subscription now
// lives in one effect with an empty dependency array, reads through a ref, and
// is coalesced into a single requestAnimationFrame per frame.
function UseScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);
  const showScrollRef = useRef(false);

  useEffect(() => {
    let frame = null;

    const evaluate = () => {
      frame = null;
      const past = window.pageYOffset > 400;
      if (past !== showScrollRef.current) {
        showScrollRef.current = past;
        setShowScroll(past);
      }
    };

    const onScroll = () => {
      // Many scroll events land per frame; only the last one matters.
      if (frame === null) frame = window.requestAnimationFrame(evaluate);
    };

    // passive: this handler never calls preventDefault, and saying so lets the
    // browser keep scrolling off the main thread.
    window.addEventListener("scroll", onScroll, { passive: true });
    evaluate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={backToTop}
      className="scrollToTop"
      aria-label="Terug naar boven"
      hidden={!showScroll}
    >
      <FiChevronUp aria-hidden="true" focusable="false" />
    </button>
  );
}

export default UseScrollToTop;
