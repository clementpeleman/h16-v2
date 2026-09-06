// SEO helpers: absolute URLs and the JSON-LD blocks PagesMetaHead emits.
//
// Everything here reads from data/companyData.js so the structured data can
// never disagree with the footer or the contact page — Google matches the
// Organization's name, address and phone against the Business Profile, and a
// mismatch there costs local ranking.
import { company } from "../data/companyData";

// Absolute base for canonical, og:url and sitemap entries. Set per
// deployment; production is https://www.h16.be.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(
  /\/$/,
  ""
);

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.split(/[?#]/)[0];
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
}

// Strapi media URLs are root-relative to the asset host.
export function assetUrl(path = "") {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_STRAPI_ASSET_URL || ""}${path}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "Organization"],
    "@id": `${absoluteUrl("/")}/#organization`,
    name: company.name,
    legalName: company.legalName,
    vatID: company.vat.replace(/^BTW\s*/, ""),
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo.png"),
    image: absoluteUrl("/images/og-default.jpg"),
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCity.split(" ")[0],
      addressLocality: company.postalCity.split(" ").slice(1).join(" "),
      addressRegion: "Oost-Vlaanderen",
      addressCountry: "BE",
    },
    areaServed: ["Gent", "Oosterzele", "Merelbeke", "Oost-Vlaanderen"],
    sameAs: Object.values(company.socials),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// Only for a project whose beschikbaarheid is "Te koop" / "Te huur": a
// property on offer is a listing, not a portfolio entry.
export function realEstateListingJsonLd(project, path) {
  const isRent = /te huur/i.test(project.beschikbaarheid || "");
  const listing = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.naam,
    url: absoluteUrl(path),
    description: project.korteBeschrijving || undefined,
    image: (project.afbeeldingen || []).slice(0, 6).map((b) => assetUrl(b.url)),
    datePosted: project.jaar ? `${project.jaar}-01-01` : undefined,
    provider: { "@id": `${absoluteUrl("/")}/#organization` },
  };
  if (project.adres) {
    listing.spatialCoverage = {
      "@type": "Place",
      address: { "@type": "PostalAddress", streetAddress: project.adres, addressCountry: "BE" },
    };
  }
  if (project.prijs) {
    listing.offers = {
      "@type": "Offer",
      price: String(project.prijs).replace(/[^\d.,]/g, "").replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      businessFunction: isRent
        ? "http://purl.org/goodrelations/v1#LeaseOut"
        : "http://purl.org/goodrelations/v1#Sell",
    };
  }
  return listing;
}
