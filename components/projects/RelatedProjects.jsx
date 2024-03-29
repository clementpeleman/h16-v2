import Image from "next/image";

function RelatedProjects({ props }) {
  return (
    <div className="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-gray-200 dark:border-secondary-dark">
      <p className="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left">
        Related Projects
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
        {props.map((project) => {
          return (
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_ASSET_URL +
                `${project.attributes.thumbnail.data.attributes.url}`
              }
              className=" cursor-pointer"
              width="400"
              height="400"
              alt={project.attributes.naam}
              key={project.id}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          );
        })}
      </div>
    </div>
  );
}

export default RelatedProjects;
