import Head from "next/head";

function PagesMetaHead({ title, keywords, description }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      ></link>
      <title>{title}</title>
    </Head>
  );
}

PagesMetaHead.defaultProps = {
  title: "H16 Vastgoedontwikkeling",
  keywords:
    "vastgoed, Gent, Oosterzele, Bouwgrond, Merelbeke, Huizen, Huis, Appartement, Project, Werf",
  keywords: "Wij geven een nieuwe invulling aan huizen en gronden.",
};

export default PagesMetaHead;
