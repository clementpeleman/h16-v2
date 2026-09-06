const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    listStyleType: {
      square: "square",
      circle: "circle",
      decimal: "decimal",
      disc: "disc",
    },
    extend: {
      fontFamily: {
        sans: [
          "GeneralSans",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
        display: ["Balerno", "Georgia", "Times New Roman", "serif"],
      },
      // The role scale. Every size is fluid, so there is no breakpoint where a
      // heading jumps 12px while the hero beside it scales continuously — the
      // old ladder stepped at 640px and produced exactly that. Roles are named
      // for the job, not the value, and each carries its own leading and
      // tracking so a heading can never inherit body leading by accident.
      //
      // Weights: headings sit at 500, not 600. The client read 600 as a heavier
      // voice than the Balerno h1 (400) and the light body — a different system.
      // Size carries the hierarchy; weight only needs to separate heading from
      // prose, and 500 does that without shouting.
      //
      // Ratio is roughly a major third (1.25) through the text roles, opening
      // to ~1.6 at the display end: on a Persuade surface the hero has to be
      // categorically different, not one notch up. Every adjacent pair differs
      // in size AND weight, which is what resolves the six 1.00-ratio
      // collisions the previous ladder had (h1 vs h2, h2 vs h3, label vs body).
      //
      // `display` and `h1` carry no weight: Balerno has a single weight, and
      // asking for 600 would make the browser synthesise a fake bold. `h1` also
      // sits a step larger than a pure ratio wants, because it is set in
      // Balerno at 400 against an h2 in GeneralSans at 500 — the serif needs
      // the extra size to out-rank a heavier sans directly beneath it.
      fontSize: {
        display: [
          "clamp(2.5rem, 2rem + 2.2vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        h1: [
          "clamp(2.25rem, 1.9rem + 1vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.015em" },
        ],
        h2: [
          "clamp(1.75rem, 1.5rem + 0.7vw, 2rem)",
          { lineHeight: "1.25", letterSpacing: "0", fontWeight: "500" },
        ],
        h3: [
          "clamp(1.375rem, 1.25rem + 0.35vw, 1.5rem)",
          { lineHeight: "1.35", fontWeight: "500" },
        ],
        lead: [
          "clamp(1.25rem, 1.125rem + 0.35vw, 1.375rem)",
          { lineHeight: "1.6" },
        ],
        // 1.65 leading, not Tailwind's 1.5: Dutch prose is full of long
        // compounds, and the extra leading is what keeps a wrapped
        // "vastgoedontwikkeling" from crowding the line below it.
        body: ["clamp(1.0625rem, 1rem + 0.15vw, 1.125rem)", { lineHeight: "1.65" }],
        // 16px exactly — also the floor below which iOS Safari force-zooms a
        // focused input, so form controls and UI labels share one value.
        ui: ["1rem", { lineHeight: "1.4", fontWeight: "500" }],
        meta: [
          "0.9375rem",
          { lineHeight: "1.45", letterSpacing: "0.02em", fontWeight: "500" },
        ],
      },
      fontWeight: {
        // A real axis value for inline emphasis, replacing the family swap.
        strong: "500",
      },
      keyframes: {
        nudge: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(3px)" },
        },
      },
      animation: {
        // A slow, small bob on the arrow of the "Naar de foto's" button.
        nudge: "nudge 1.8s ease-in-out infinite",
      },
      spacing: {
        // Two cadence values instead of the mt-24 sm:mt-32 lg:mt-40 /
        // mt-14 sm:mt-20 triplets repeated in every file. Always applied as a
        // TOP margin on the later element, never as a bottom margin on the
        // earlier one — seams used to stack two owners into 258-354px voids.
        section: "clamp(6rem, 5rem + 4vw, 10rem)",
        group: "clamp(3.5rem, 3rem + 2vw, 5rem)",
        // Homepage chapters: one step wider than `section`.
        chapter: "clamp(8rem, 6rem + 6vw, 14rem)",
      },
      colors: {
        primary: "#0E468C",
        secondary: "#E0EFF0",
        accent: "#D83415",
        // Darkened terracotta for error text: #D83415 only reaches ~4.4:1 on
        // the cream ground, under the 4.5:1 floor for the size errors ship at.
        "accent-deep": "#A62710",
        background: "#F1EDE8",

        // Light colors
        "primary-light": "#F7F8FC",
        "secondary-light": "#FFFFFF",
        "ternary-light": "#f6f7f8",

        // Dark colors
        "primary-dark": "#0D2438",
        "secondary-dark": "#102D44",
        // Body text. Was a navy (#1E3851) that read as a third brand colour
        // next to the blue headings; body copy is neutral now.
        "ternary-dark": "#262626",

        // Extended v3 color
        gray: colors.neutral,
      },
      container: {
        // `md` was missing, so 768-1023px inherited sm's 0.5rem and the page ran
        // essentially edge-to-edge, then jumped 56px at 1024. With a real ramp
        // here, components no longer need their own `mx-4 sm:mx-0` gutters —
        // which is what produced two and three competing left edges per page.
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          md: "1.5rem",
          lg: "2.5rem",
          xl: "4rem",
          "2xl": "4rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
