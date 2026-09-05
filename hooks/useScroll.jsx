import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Despite the `use` name this is a component, rendered as <UseScroll />.
//
// Same leak as UseScrollToTop: the subscription was in the render body with a
// fresh closure per render and no removal, and the effect beside it re-ran on
// every render because `prevScrollPos` was a dependency. Scroll position is a
// ref now — it changes many times a second and nothing renders from it — so
// the listener is attached exactly once and coalesced per frame.
function UseScroll() {
  const [showScroll, setShowScroll] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  const prevScrollPos = useRef(0);
  const shownRef = useRef(false);
  const directionRef = useRef("up");

  useEffect(() => {
    let frame = null;
    prevScrollPos.current = window.pageYOffset;

    const evaluate = () => {
      frame = null;
      const current = window.pageYOffset;
      if (Math.abs(current - prevScrollPos.current) <= 400) return;

      const nextDirection =
        current > prevScrollPos.current && current > 400 ? "down" : "up";

      if (!shownRef.current) {
        shownRef.current = true;
        setShowScroll(true);
      }
      if (nextDirection !== directionRef.current) {
        directionRef.current = nextDirection;
        setScrollDirection(nextDirection);
      }
      prevScrollPos.current = current;
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (top) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  const backToTop = () => scrollTo(0);

  const scrollToBottom = () => {
    const isMobile = window.innerWidth <= 768;
    scrollTo(
      document.body.scrollHeight - window.innerHeight - (isMobile ? 550 : 400)
    );
  };

  if (scrollDirection === "up") {
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

  return (
    <button
      type="button"
      onClick={scrollToBottom}
      className="moreInfoButton"
      hidden={!showScroll}
    >
      Naar de beschrijving
      <FiChevronDown aria-hidden="true" focusable="false" />
    </button>
  );
}

export default UseScroll;
