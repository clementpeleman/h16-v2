import { useEffect, useState } from "react";

// «Naar de foto's»: the floating jump to the gallery, in the redesign's
// language (square, primary, no shadow, no looping nudge). Behaviour as
// components/projects/GalleryJump.jsx: shown while the gallery is still below
// the fold, gone once it (or anything after it) is on screen. It stays
// mounted so it can fade instead of pop; hidden, it leaves the tab order.
export default function FotoJump({ targetId, label = "Naar de foto's" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        const below = entry.boundingClientRect.top > window.innerHeight;
        setVisible(!entry.isIntersecting && below);
      },
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group/link fixed bottom-4 right-4 z-30 inline-flex h-12 items-center bg-primary px-5 text-ui text-white underline-offset-4 hover:bg-primary-deep hover:underline focus-ring sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-300 motion-safe:ease-plate ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {label}
      {"\u00A0"}
      <span
        aria-hidden="true"
        className="relative top-0 motion-safe:transition-[top] motion-safe:duration-150 group-hover/link:top-[3px]"
      >
        ↓
      </span>
    </a>
  );
}
