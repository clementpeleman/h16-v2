import { useEffect, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

// A floating "Naar de foto's" bottom-right on the project page. It shows
// while the gallery is still below the fold and disappears once the gallery
// (or the footer) is on screen.
function GalleryJump({ targetId, label = "Naar de foto's" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Hidden once the gallery has scrolled into view or past it.
        const below = entry.boundingClientRect.top > window.innerHeight;
        setVisible(!entry.isIntersecting && below);
      },
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);

  // Stays mounted so it can fade and slide in and out instead of popping.
  // The scroll itself is smooth via the page's scroll-behavior (which is
  // already scoped to prefers-reduced-motion: no-preference).
  return (
    <a
      href={`#${targetId}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-ui text-white shadow-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:bottom-8 sm:right-8 group transition-[opacity,transform,background-color] duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {label}
      <FiArrowDown
        className="h-4 w-4 motion-safe:animate-nudge group-hover:translate-y-0.5 transition-transform"
        aria-hidden="true"
      />
    </a>
  );
}

export default GalleryJump;
