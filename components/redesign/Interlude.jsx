import Plate, { PlateLine } from "./Plate";

// One full-bleed plate between the werkwijze and the people, 768px and up.
// Hidden on phones to save ~400px of scroll; it is the last numbered plate,
// so the numbering on phones has no gap.
export default function Interlude({ plate, n }) {
  if (!plate) return null;
  return (
    <Plate
      image={plate.image}
      ratio="aspect-[21/9] max-h-[80svh] w-full"
      sizes="100vw"
      reveal
      className="mt-section hidden md:block"
    >
      <div className="container mx-auto">
        <PlateLine
          n={n}
          naam={plate.project?.naam}
          href={
            plate.project ? `/realisaties/${plate.project.slug}` : undefined
          }
          meta={[plate.project?.jaar]}
        />
      </div>
    </Plate>
  );
}
