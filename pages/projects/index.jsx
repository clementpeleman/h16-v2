import Link from 'next/link';
import PagesMetaHead from '../../components/PagesMetaHead';
import ProjectsGrid from '../../components/projects/ProjectsGrid';
import { fetcher } from '../../lib/api';
import ProjectSingle from '../../components/projects/ProjectSingle';

function index({projects}) {
	return (
		<div className="container mx-auto">
			<PagesMetaHead title="Projects" />

			<section className="py-5 mx-3 sm:py-10 mt-6 sm:mt-0">
			<div className="max-w-[70%] text-left">
				<p className=" font-general-medium text-2xl sm:text-4xl mb-12 text-black dark:text-ternary-light underline">
					Onze realisaties
				</p>
			</div>

			<div className="mt-5 mb-5 sm:mb-16">
				{/* <h3
					className="
                        font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-xl
                        mb-3
                        "
				>
					Onze voltooide projecten
				</h3> */}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
				{/* {selectProject
					? selectProjectsByCategory.map((project, index) => {
							return <ProjectSingle key={index} {...project} />;
					  })
					: projectsData.map((project, index) => (
							<ProjectSingle key={index} {...project} />
					  ))} */}
				{projects &&
					projects.data.map((project, index) => {
						return (
							<ProjectSingle key={index} {...project} />
					)
				})}
			</div>
		</section>
		</div>
	);
}

export default index;

export async function getServerSideProps() {
	const projectsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`);
	return {
		props: {
			projects: projectsResponse
		}
	}
}