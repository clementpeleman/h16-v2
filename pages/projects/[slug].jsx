import Image from "next/image";
import { FiClock, FiTag } from "react-icons/fi";
import PagesMetaHead from "../../components/PagesMetaHead";
import { projectsData } from "../../data/projectsData";
import RelatedProjects from "../../components/projects/RelatedProjects";
import { fetcher } from "../../lib/api";
import Link from "next/link";
import AboutClientSingle from "../../components/about/AboutClientSingle";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

function Project(props) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead title={props.project.attributes.naam} />

      {/* Header */}
      <div>
        <p className="font-general-medium text-left text-3xl sm:text-4xl  text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
          {props.project.attributes.naam}
        </p>
      </div>

      {/* Gallery */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12"> */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-0 sm:gap-10 mt-12">
        {props.project.attributes.afbeeldingen.data.map((project) => {
          return (
            <div className="mb-6 sm:mb-10" key={project.id}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_STRAPI_ASSET_URL +
                  project.attributes.url
                }
                className="sm:hover:scale-[1.4] transistion ease-in-out delay-150 duration-300 shadow-lg"
                alt={project.name}
                key={project.id}
                width={100}
                height={90}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto"
                }} />
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="block sm:flex gap-0 sm:gap-10 mt-2 sm:mt-14">
        <div className="w-full sm:w-1/3 text-left">
          {/* Single project client details */}
          <div className="mb-7">
            <p className="font-general-medium text-2xl sm:text-3xl  text-primary-dark dark:text-primary-light mb-2">
              Over Project
            </p>
            <ul className="leading-loose">
              <li
                className="font-general-regular text-ternary-dark dark:text-ternary-light"
                key={props.project.attributes.naam}
              >
                <span className="font-general-medium">Adres: </span>
                <a
                  href={
                    "http://maps.google.com/?q=" +
                    props.project.attributes.adres
                  }
                  className={
                    "hover:underline hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer duration-300"
                  }
                  aria-label="Project Website and Phone"
                >
                  {props.project.attributes.naam}
                </a>
                <br />
                <span className="font-general-medium">Status: </span>
                {props.project.attributes.status.data.length > 0
                  ? props.project.attributes.status.data[0].attributes.Type
                  : "-"}

                <br />
                <span className="font-general-medium">Jaar: </span>
                {props.project.attributes.publishedAt
                  ? props.project.attributes.publishedAt.substring(0, 4)
                  : "-"}
                <br />
                <span className="font-general-medium">Samenwerking: </span>
                {props.project.attributes.samenwerkings.data.length > 0
                  ? props.project.attributes.samenwerkings.data
                      .map((item) => item.attributes.Naam)
                      .join(", ")
                  : "Geen samenwerkingen beschikbaar"}
              </li>
            </ul>
          </div>

          <div>
            {props.project.attributes.externe_link ? (
              <div>
                <p className="font-general-regular text-2xl sm:text-3xl font-semibold text-primary-dark mt-2">
                  Externe link
                </p>
                <div className="flex items-center inline whitespace-initial break-all gap-3 mt-5">
                  <Link
                    key={props.project.id}
                    href={props.project.attributes.externe_link}
                    target="__blank"
                    passHref={true}
                    aria-label="Share Project"
                    className="bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm duration-500"
                  >
                    {props.project.attributes.externe_link}
                  </Link>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/*  Single project right section details */}
        <div className="w-full sm:w-2/3 text-left mt-10 sm:mt-0 text-justify">
          <p className="text-primary-dark dark:text-primary-light text-2xl sm:text-3xl font-general-medium mb-2">
            Beschrijving
          </p>
          <section className="font-general-regular">
              <Markdown children={props.project.attributes.beschrijving} remarkPlugins={[remarkGfm, remarkBreaks]} />
          </section>          
        </div>
      </div>

      {/* <div className="mt-10 sm:mt-20">
			<p className="font-general-medium text-2xl sm:text-3xl  text-left text-primary-dark dark:text-primary-light">
				Samenwerkingen
			</p>
			<div className="grid grid-cols-2 sm:grid-cols-4 mt-10 sm:mt-14 gap-2">
				{props.project.attributes.samenwerkings.data.map((samenwerking) => (
					<AboutClientSingle
						title={samenwerking.naam}
						image={samenwerking.img}
						key={samenwerking.id}
					/>
				))}
			</div>
		</div> */}

      {/* <RelatedProjects props={props.related} /> */}
    </div>
  );
}

function removeObjectWithId(arr, id) {
  // Making a copy with the Array from() method
  const arrCopy = Array.from(arr);
  const objWithIdIndex = arrCopy.findIndex((obj) => obj.id == id);
  arrCopy.splice(objWithIdIndex, 1);
  return arrCopy;
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.data.map((post) => ({
    params: { slug: post.attributes.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;

  const projectsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`
  );

  console.log(projectsResponse);

  const projectFilter = projectsResponse.data.filter(
    (project) => project.attributes.slug === slug
  )[0];

  const negprojectFilter = removeObjectWithId(projectsResponse.data, slug);

  return {
    revalidate: 1,
    props: {
      project: projectFilter,
      related: negprojectFilter,
    },
  };
}

export default Project;
