import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// CSS animations are covered by a media query in globals.css, but JS-driven
// motion — the typed word loop, the scroll-linked emblem rotation — is not.
// Both run indefinitely, and an infinite loop with no pause control is a
// WCAG 2.2.2 (Pause, Stop, Hide) failure.
//
// Starts `false` so the server and the first client render agree; the effect
// corrects it before paint on the browsers that matter.
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
