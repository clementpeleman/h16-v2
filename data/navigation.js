// The site's primary navigation, read by the header and the footer so the
// two can never list different pages. Paths are Dutch since the 2026-09
// rename (/projects -> /realisaties, /colab -> /samenwerken); next.config.js
// carries permanent redirects from the old paths.
export const NAV_ITEMS = [
  { href: "/realisaties", label: "Realisaties" },
  { href: "/about", label: "Over ons" },
  { href: "/samenwerken", label: "Samenwerken" },
  { href: "/contact", label: "Contact" },
];

export default NAV_ITEMS;
