import { fetcher } from "../lib/api";
import { absoluteUrl } from "../lib/seo";
import { company } from "../data/companyData";

// llms.txt (llmstxt.org): a plain-text overview for AI assistants such as
// ChatGPT, Claude and Perplexity. Google ignores it; the others read it.
// Every sentence here is taken from the site's own copy — no new claims. The
// project list comes from Strapi so it never goes stale.
export async function getServerSideProps({ res }) {
  const projects = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?fields[0]=slug&fields[1]=naam&fields[2]=korte_beschrijving&fields[3]=beschikbaarheid&pagination[limit]=100`
  );
  const lijst = [...(projects?.data ?? [])]
    .reverse()
    .filter((p) => p?.attributes?.slug)
    .map((p) => {
      const a = p.attributes;
      const status = a.beschikbaarheid ? ` (${a.beschikbaarheid})` : "";
      const kort = a.korte_beschrijving ? `: ${a.korte_beschrijving.trim()}` : "";
      return `- [${a.naam}${status}](${absoluteUrl(`/realisaties/${a.slug}`)})${kort}`;
    })
    .join("\n");

  const body = `# H16 Vastgoedontwikkeling

> Bouwcoördinatie en projectontwikkeling door een klein familiebedrijf uit Oosterzele, actief in Gent en Oost-Vlaanderen. Wij nemen uw bouwproject van begin tot eind onder onze vleugels.

H16 BV is opgericht in 2021 door Gilles De Brabander (construction manager) en Elena Versyp (office manager). Kernwaarde: "Small is beautiful" — een klein team dat elk project persoonlijk opvolgt. Het bedrijfssymbool is de kolibrie.

## Diensten

- Bouwcoördinatie en adviesverlening: voor eigenaars die voor een bouwproject staan en concrete hulp zoeken bij de effectieve uitvoering. H16 analyseert de vastgoedsituatie en coördineert het project van ontwerp tot oplevering.
- Projectontwikkeling: H16 koopt gronden en panden aan om ze te ontwikkelen (nieuwbouw, totaalrenovatie, herbestemming).
- Samenwerking met architecten en aannemers die de coördinatie of opvolging uit handen willen geven.

Waarom klanten voor H16 kiezen: de juiste doelstelling bepalen, snelheid, kwaliteit en budgetcontrole.

## Realisaties

${lijst || "- Zie " + absoluteUrl("/realisaties")}

## Pagina's

- [Home](${absoluteUrl("/")})
- [Realisaties](${absoluteUrl("/realisaties")})
- [Samenwerken](${absoluteUrl("/samenwerken")}): diensten, voordelen, en het aanbod voor architecten en aannemers
- [Over ons](${absoluteUrl("/about")}): het team en de kolibrie als symbool
- [Contact](${absoluteUrl("/contact")}): antwoord binnen twee werkdagen

## Contact

- Adres: ${company.street}, ${company.postalCity}, België
- Telefoon: ${company.phone}
- E-mail: ${company.email}
- Rechtspersoon: ${company.legalName}, ${company.vat}
- Facebook: ${company.socials.facebook}
- Instagram: ${company.socials.instagram}
- Werkgebied: Gent, Oosterzele, Merelbeke en de rest van Oost-Vlaanderen
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(body);
  res.end();
  return { props: {} };
}

export default function Llms() {
  return null;
}
