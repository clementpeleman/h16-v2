import Link from "next/link";
import Plate, { SaleChip } from "../Plate";
import { ArrowLink, SectionHead } from "../ui";
import { assetUrl } from "../../../lib/seo";

const meta = (p) =>
  [p.rol, p.aard, p.jaar, p.beschikbaarheid].filter(Boolean).join(" · ");

// Rendered box widths (4 of 12 columns from 768px; 4/5 of the column on
// phones). A photo wider than the 4:5 box is cropped at the sides and
// renders wider than the box by (its ratio / 0.8), which `sizes` declares.
function sizesFor(image) {
  const ratio = image.width && image.height ? image.width / image.height : 0.8;
  const f = Math.max(1, ratio / 0.8);
  const px = (w) => `${Math.round(w * f)}px`;
  return `(min-width:1536px) ${px(453)}, (min-width:1280px) ${px(368)}, (min-width:1024px) ${px(299)}, (min-width:768px) ${px(224)}, ${Math.round(80 * f)}vw`;
}

function Caption({ n, project }) {
  return (
    <div className="mt-3">
      {n && (
        <p
          aria-hidden="true"
          className="text-meta tabular-nums text-primary-muted"
        >
          Afb. {n}
        </p>
      )}
      <h3
        className={`${n ? "mt-2" : ""} font-display text-h3 font-normal text-primary`}
      >
        <Link
          href={`/realisaties/${project.slug}`}
          className="py-2 underline-offset-4 decoration-1 hover:underline group-hover/plate:underline focus-ring lg:py-0"
        >
          {project.naam}
        </Link>
      </h3>
      {project.korte && (
        <p className="mt-2 max-w-[52ch] text-body text-ink hyphens-auto">
          {project.korte}
        </p>
      )}
      {meta(project) && (
        <p className="mt-2 text-meta text-primary-muted">{meta(project)}</p>
      )}
    </div>
  );
}

// «Andere realisaties»: three other entries, so a project page is never a
// dead end. Plates continue the page's «Afb.» count.
export default function Andere({ projects, firstN }) {
  if (!projects.length) return null;
  let n = firstN;

  return (
    <section
      aria-labelledby="andere-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section"
    >
      <div className="md:flex md:items-end md:justify-between md:gap-x-6">
        <SectionHead
          id="andere-titel"
          label="Realisaties"
          title="Andere realisaties"
        />
        <p className="mt-4 md:mt-0 md:shrink-0 md:pb-1">
          <ArrowLink href="/realisaties" size="ui">
            Alle realisaties
          </ArrowLink>
        </p>
      </div>

      <ul className="mt-10 md:mt-12 md:grid md:grid-cols-12 md:gap-x-6">
        {projects.map((project, i) => {
          const number = project.image ? n++ : null;
          return (
            <li
              key={project.slug}
              className={`w-4/5 md:col-span-4 md:w-auto ${i > 0 ? "mt-12 md:mt-0" : ""} ${
                i === 1 ? "ml-auto md:ml-0" : ""
              }`}
            >
              {project.image ? (
                <Plate
                  image={{
                    src: assetUrl(project.image.path),
                    alt: project.image.alt,
                  }}
                  href={`/realisaties/${project.slug}`}
                  ratio="aspect-[4/5]"
                  sizes={sizesFor(project.image)}
                  reveal
                  chip={
                    /te koop|te huur/i.test(project.beschikbaarheid) ? (
                      <SaleChip label={project.beschikbaarheid} />
                    ) : null
                  }
                >
                  <Caption n={number} project={project} />
                </Plate>
              ) : (
                <Caption project={project} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
