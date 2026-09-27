import { DIENST_META, LIVE_DIENSTEN } from "./dienstMeta";

// The site's navigation, read by the header and the footer. Paths are Dutch
// since the 2026-09 rename (/projects -> /realisaties, /colab -> /samenwerken);
// next.config.js carries permanent redirects from the old paths.
//
// The two service pages sit first in the header, one click from every page:
// that is where visitors (and Google) should land for "bouwcoördinatie".
// Each appears only once its page is published (`ready` in dienstMeta.js), so
// the header never links to a 404. /samenwerken — now mainly the page for
// architects and contractors — leaves the header once both services are live
// and stays in the footer.
const DIENSTEN = LIVE_DIENSTEN.map((d) => ({ href: `/${d.slug}`, label: d.naam }));
const ALL_LIVE = LIVE_DIENSTEN.length === Object.keys(DIENST_META).length;

const REALISATIES = { href: "/realisaties", label: "Realisaties" };
const OVER_ONS = { href: "/about", label: "Over ons" };
const SAMENWERKEN = { href: "/samenwerken", label: "Samenwerken" };
const CONTACT = { href: "/contact", label: "Contact" };

export const NAV_ITEMS = [
  ...DIENSTEN,
  REALISATIES,
  OVER_ONS,
  ...(ALL_LIVE ? [] : [SAMENWERKEN]),
  CONTACT,
];

export const FOOTER_ITEMS = [...DIENSTEN, REALISATIES, OVER_ONS, SAMENWERKEN, CONTACT];

export default NAV_ITEMS;
