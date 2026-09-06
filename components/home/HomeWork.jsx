import Link from "next/link";
import ProjectSingle from "../projects/ProjectSingle";
import HomeSection from "./HomeSection";

function HomeWork({ projects }) {
  const recent = (projects ?? []).slice(0, 3);
  // A heading promising "onze recentste realisaties" above an empty grid
  // reads as a firm that has built nothing.
  if (recent.length === 0) return null;

  return (
    <HomeSection
      label="Realisaties"
      title={
        <>
          Onze recentste <span className="text-accent">realisaties</span>
        </>
      }
      aside={
        <Link
          href="/projects"
          className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          Alles bekijken
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {recent.map((project) => (
          <ProjectSingle key={project.id} {...project} />
        ))}
      </div>
    </HomeSection>
  );
}

export default HomeWork;
