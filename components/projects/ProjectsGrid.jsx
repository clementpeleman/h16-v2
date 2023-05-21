import { useState } from 'react';
import ProjectSingle from './ProjectSingle';
import { projectsData } from '../../data/projectsData';
import ProjectsFilter from './ProjectsFilter';
import Link from 'next/link';

function ProjectsGrid({projects}) {
	const [selectProject, setSelectProject] = useState();

	const selectProjectsByCategory = projectsData.filter((item) => {
		let category =
			item.category.charAt(0).toUpperCase() + item.category.slice(1);
		return category.includes(selectProject);
	});

	return (
		<section className="py-5 sm:py-10 mt-15 sm:mt-20">
			<div className="text-left">
				<p className="font-general-medium text-3xl sm:text-4xl -mb-5 text-black dark:text-ternary-light">
					Onze Recente Realisaties
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
				<div
					className=" 
                        text-right
                        justify-between
                        pb-10
                        gap-3
						md:underline underline-offset-4 decoration-1
						hover:decoration-accent
                        "
				>
                    <Link
					href="/projects"
					className="
                        font-general-medium 
                        text-right text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-lg
                        mb-3
						hover:text-primary
						cursor-pointer
                        "
				    >
					 See All
				    </Link>
			    </div>
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
	);
}

export default ProjectsGrid;

