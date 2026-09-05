import Link from "next/link";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const TYPED_WORDS = [
  "Flexibiliteit",
  "Wendbaarheid",
  "Nieuwe inzichten",
  "Focus op doel",
  "Persoonlijke aanpak",
  "Uniek eindresultaat",
];

function AppSecondary() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    // The typed words used to trail an eight-line paragraph as a loose h3 —
    // a moving element with no place of its own. They are the distilled
    // version of the paragraph, so they get the same stage the emblem gets in
    // the banner: a second column, in the display face, at heading size.
    <section className="mt-section grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:items-center">
      <div>
        <h2 className="text-h2 text-black max-w-[24ch]">
          Jouw <span className="text-accent">bouwproject</span> onder onze
          vleugels?
        </h2>
        <p className="mt-6 text-lead text-gray-700 max-w-[52ch]">
          Gedreven door passie voor vastgoed en met degelijke samenwerkingen
          nemen wij uw vastgoedproject onder de vleugels. Elk perspectief wordt
          ten gronde bekeken, en wij houden de focus op het doel tot het bereikt
          is. Binnen ons klein bedrijf wordt u persoonlijk begeleid en volledig
          ontzorgd, tot een uniek eindresultaat.
        </p>
        <p className="mt-8">
          <Link
            href="/colab"
            className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
          >
            Bekijk onze werkwijze
          </Link>
        </p>
      </div>

      <div className="lg:border-l lg:border-gray-200 lg:pl-16">
        <p className="text-meta uppercase tracking-[0.08em] text-ternary-dark">
          Onze kracht
        </p>
        {/* Fixed height for two lines so the loop never shifts the section.
            An infinite type-and-delete loop with no pause control is a
            WCAG 2.2.2 failure; reduced motion gets the six words at rest. */}
        <div className="mt-4 min-h-[2.5em] font-display text-h1 text-accent [text-wrap:balance]">
          {reducedMotion ? (
            <span>{TYPED_WORDS.join(", ")}</span>
          ) : (
            <TypeAnimation
              sequence={TYPED_WORDS.flatMap((w) => [w, 1200])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default AppSecondary;
