import { useState } from "react";
import ProjectSingle from "./ProjectSingle";
import { projectsData } from "../../data/projectsData";
import ProjectsFilter from "./ProjectsFilter";
import Link from "next/link";

function ProjectsGrid({ projects }) {
  const [selectProject, setSelectProject] = useState();

  const selectProjectsByCategory = projectsData.filter((item) => {
    let category =
      item.category.charAt(0).toUpperCase() + item.category.slice(1);
    return category.includes(selectProject);
  });

  return (
    <div className="mx-4 sm:mx-0">
      <section className="pt-5 sm:pt-10 mt-6 sm:mt-8">
        <div className="max-w-[70%] text-left">
          <p className=" font-general-medium text-3xl sm:text-4xl -mb-8  text-black dark:text-ternary-light">
            Onze recentste realisaties
          </p>
        </div>

        <div className="mt-5 sm:mt-0 mb-5 sm:mb-8">
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
						pb-6
                        md:pb-10
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
                        text-xl
                        sm:text-lg
                        sm:mb-3
						pr-6
						pb-0
						hover:text-primary
						cursor-pointer
                        "
            >
              Alles bekijken
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          {projects &&
            projects.data
              .slice(-3) // This will take the last three projects
              .reverse()
              .map((project, index) => {
                return <ProjectSingle key={index} {...project} />;
              })}
        </div>
      </section>
    </div>
  );
}

export default ProjectsGrid;
