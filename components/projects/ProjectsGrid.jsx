import ProjectSingle from "./ProjectSingle";
import Link from "next/link";

function ProjectsGrid({ projects }) {
  // Newest first, then take three — the same ordering /projects uses.
  const recent = (projects ?? []).slice(0, 3);

  // If there is nothing to show, show nothing: a heading promising "onze
  // recentste realisaties" above an empty grid, with a link to an equally
  // empty page, reads as a firm that has built nothing.
  if (recent.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-24">
      {/* The heading and "Alles bekijken" used to be two block elements with
          the link pulled up by a fixed `-mb-8` to fake a shared row. It only
          lined up by accident and collapsed the moment the heading wrapped —
          confirmed at 375px. `items-baseline` gives the same alignment as a
          real relationship, and survives the wrap. */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h2 className="text-h2 text-black">Onze recentste realisaties</h2>
        <Link
          href="/projects"
          className="text-ui py-1 text-secondary-dark hover:text-primary underline underline-offset-4 decoration-1 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm cursor-pointer duration-200"
        >
          Alles bekijken
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {recent.map((project) => (
          <ProjectSingle key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsGrid;
