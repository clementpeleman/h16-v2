import { useEffect } from "react";

// Plate reveal for the homepage redesign. Arms only the plates that are below
// the fold when the page mounts, so nothing already on screen ever flashes;
// without JS, or with reduced motion, nothing is armed and nothing is hidden.
// The transition itself lives in globals.css ([data-reveal]).
export default function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const plates = [...document.querySelectorAll("[data-plate]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    if (!plates.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    plates.forEach((el) => {
      el.setAttribute("data-reveal", "armed");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}
