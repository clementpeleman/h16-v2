import AboutClientSingle from "./AboutClientSingle";

export default function AboutClients(samenwerkings) {
  return (
    <div className="mt-10 sm:mt-32">
      <p className="font-general-medium text-2xl sm:text-3xl  text-center text-primary-dark dark:text-primary-light">
        Onze samenwerkingen:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 mt-10 sm:mt-14 gap-2">
        {samenwerkings.samenwerkings.samenwerkingen.data.map(
          (samenwerking, index) => (
            <AboutClientSingle
              title={samenwerking.attributes.Naam}
              image={
                process.env.NEXT_PUBLIC_STRAPI_ASSET_URL +
                `${samenwerking.attributes.Logo.data[0].attributes.url}`
              }
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
}
