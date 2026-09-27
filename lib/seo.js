// SEO helpers: absolute URLs and the JSON-LD blocks PagesMetaHead emits.
//
// Everything here reads from data/companyData.js so the structured data can
// never disagree with the footer or the contact page — Google matches the
// Organization's name, address and phone against the Business Profile, and a
// mismatch there costs local ranking.
import { company } from "../data/companyData";

// Absolute base for canonical, og:url and sitemap entries. Set per
// deployment; production is the apex https://h16.be (www.h16.be and the
// staging host h16.peleman.io are served by the same build).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(
  /\/$/,
  ""
);

function hostOf(url) {
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return "";
  }
}

// The one host Google may index. Because every host runs the same build, a
// build-time flag cannot tell them apart; anything that must differ per host
// (robots.txt, drafts) compares the request's host with this.
export const CANONICAL_HOST = hostOf(SITE_URL);

export function requestHost(req) {
  const raw = req?.headers?.["x-forwarded-host"] || req?.headers?.host || "";
  return String(raw).split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
}

export function isCanonicalHost(req) {
  return Boolean(CANONICAL_HOST) && requestHost(req) === CANONICAL_HOST;
}

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
    foundingDate: company.foundingDate,
    founder: company.founders.map((name) => ({ "@type": "Person", name })),
    sameAs: Object.values(company.socials),
  };
}

// Question-and-answer pairs from a service page. Only answered questions are
// passed in, so a draft question can never reach the structured data.
export function faqJsonLd(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  };
}

export function serviceJsonLd(service, path) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.naam,
    serviceType: service.naam,
    description: service.description,
    url: absoluteUrl(path),
    provider: { "@id": `${absoluteUrl("/")}/#organization` },
    areaServed: ["Gent", "Oosterzele", "Merelbeke", "Oost-Vlaanderen"],
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
