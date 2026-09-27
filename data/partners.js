// Websites of the partners credited on the realisaties, keyed by their name
// in Strapi. The samenwerking content type only has a Naam (and an unused
// Logo), and Strapi runs in production mode, so a URL field cannot be added
// from the admin. A Strapi `Website` field, if one is added later, wins over
// this map (see toProjectDetail in lib/api.jsx).
//
// Linking the partners is half of a trade: H16 credits them, and they are
// asked to credit H16 back from their own project pages.
export const PARTNER_LINKS = {
  "Element Architecten": "https://www.elementarchitecten.be/",
  "Marie-José Van Hee": "https://www.mjvanhee.be/",
  Yure: "https://www.yure.be/",
};
