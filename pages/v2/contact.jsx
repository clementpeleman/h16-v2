import PagesMetaHead from "../../components/PagesMetaHead";
import V2Page from "../../components/redesign/V2Page";
import ContactForm from "../../components/contact/ContactForm";
import Intro from "../../components/redesign/contact/Intro";
import Gegevens from "../../components/redesign/contact/Gegevens";
import { CONTACT_PLATE } from "../../components/redesign/contact/curation";
import { fetcher, toHomeProject } from "../../lib/api";
import { assetUrl } from "../../lib/seo";
import { isProductionHost } from "../../lib/staging";

// /contact redesign, STAGING ONLY (next.config.js rewrites /contact here on
// h16.peleman.io; on h16.be this is a 404 and pages/contact.jsx stays live).
// The one page that does not end on the blue back cover — it is where the
// back cover leads. The form is the production form (same validation,
// ?project= / ?dienst= prefill, POST /api/contact, Umami events), drawn in
// the redesign's look through its `variant="v2"`.
function Contact({ werkgebied, plate }) {
  return (
    <>
      <PagesMetaHead
        title="Contact: bouwcoördinatie in Gent en Oosterzele"
        description="Contacteer H16 Vastgoedontwikkeling voor uw bouwproject. We antwoorden binnen twee werkdagen."
      />
      <V2Page footerDivider={false}>
        {/* Two independent columns from 1024px (no shared grid rows, so the
            aside can never stretch the gap between title and form). Bottom
            padding, not a margin on the shared footer, keeps paper between
            the page and the blue. */}
        <div className="container mx-auto pb-[4.5rem] pt-6 md:pb-section md:pt-10 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:pt-14">
          <div className="lg:col-span-7">
            <Intro />
            <section
              aria-labelledby="formulier-titel"
              className="mt-group md:max-w-xl lg:max-w-none"
            >
              <ContactForm variant="v2" titleId="formulier-titel" />
            </section>
          </div>

          <Gegevens
            werkgebied={werkgebied}
            plate={plate}
            className="mt-group lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-start xl:col-span-4 xl:col-start-9"
          />
        </div>
      </V2Page>
    </>
  );
}

Contact.ownLayout = true;
export default Contact;

export async function getServerSideProps({ req, res }) {
  if (isProductionHost(req)) return { notFound: true };
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=600",
  );

  // Server-only: the service copy (drafts and notes included) never ships to
  // the client. The werkgebied line is the bouwcoördinatie FAQ answer, derived
  // exactly as on the homepage.
  const { DIENSTEN } = await import("../../data/diensten");
  const regio =
    DIENSTEN.bouwcoordinatie.faq.find((q) => /regio/.test(q.vraag))?.antwoord ||
    "";

  // The plate is decoration on a conversion page: one project, a short
  // timeout, and any failure (CMS down, photo removed from the gallery)
  // simply renders the page without it. The form never waits on Strapi
  // for longer than this.
  const timeout =
    typeof AbortSignal !== "undefined" && AbortSignal.timeout
      ? { signal: AbortSignal.timeout(3000) }
      : {};
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?filters[slug][$eq]=${encodeURIComponent(CONTACT_PLATE.slug)}&populate[0]=afbeeldingen`,
    timeout,
  );
  const project = (response?.data ?? [])
    .map(toHomeProject)
    .find((p) => p.slug === CONTACT_PLATE.slug);

  const plate =
    project && project.galleryPaths.includes(CONTACT_PLATE.image.path)
      ? {
          image: {
            src: assetUrl(CONTACT_PLATE.image.path),
            alt: CONTACT_PLATE.image.alt,
            op: CONTACT_PLATE.image.op,
          },
          project: {
            slug: project.slug,
            naam: project.naam,
            aard: project.aard,
            jaar: project.jaar,
          },
        }
      : null;

  return {
    props: {
      werkgebied: regio.replace(/^In\s+/, "").replace(/\.$/, ""),
      plate,
    },
  };
}
