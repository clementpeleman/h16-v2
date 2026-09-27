import { SectionHead } from "../ui";
import ZoomPlate from "./ZoomPlate";
import { buildRows, rowLayout } from "./rows";

// About nine photographs show at once; the rest open on request, as on the
// current page (twenty-odd plates ran past 10,000px on a phone).
const VISIBLE = 9;
// Never fold away just one or two photographs.
const MIN_HIDDEN = 3;

function Rows({ rows, onOpen, first = false }) {
  return rows.map((row, r) => {
    const layout = rowLayout(row);
    return (
      <div
        key={row.items[0].index}
        className={`${first && r === 0 ? "mt-10 md:mt-12" : "mt-12 md:mt-group"} ${layout.row}`}
      >
        {row.items.map((item, j) => {
          const place = layout.plates[j];
          return (
            <ZoomPlate
              key={item.image.id ?? item.index}
              image={item.image}
              n={item.index + 1}
              sizes={place.sizes}
              onOpen={onOpen(item.index)}
              className={place.className}
              captionClassName={place.caption || ""}
            />
          );
        })}
      </div>
    );
  });
}

// «Foto's»: every photograph after the opening plate, as numbered plates
// (Afb. 2 onwards, continuing the page's count) in rows set by each photo's
// orientation. Each plate opens the Lightbox at its own index.
export default function Gallery({ naam, plates, onOpen, children }) {
  const items = plates.slice(1).map((image, i) => ({ image, index: i + 1 }));
  if (!items.length) return null;

  const rows = buildRows(items);
  let cut = rows.length;
  let shown = 0;
  for (let r = 0; r < rows.length; r += 1) {
    shown += rows[r].items.length;
    if (shown >= VISIBLE) {
      cut = r + 1;
      break;
    }
  }
  if (items.length - shown < MIN_HIDDEN) cut = rows.length;
  const visible = rows.slice(0, cut);
  const more = rows.slice(cut);

  return (
    <section
      id="fotos"
      aria-labelledby="fotos-titel"
      className="container mx-auto mt-[4.5rem] md:mt-section"
    >
      <SectionHead id="fotos-titel" label={naam} title="Foto's" />
      <Rows rows={visible} onOpen={onOpen} first />
      {more.length > 0 && (
        <details className="group/more mt-12 md:mt-group">
          <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-ui text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring lg:min-h-0 [&::-webkit-details-marker]:hidden">
            <span className="group-open/more:hidden">
              Alle foto&apos;s ({items.length})
            </span>
            <span className="hidden group-open/more:inline">
              Minder foto&apos;s
            </span>
          </summary>
          <Rows rows={more} onOpen={onOpen} />
        </details>
      )}
      {children}
    </section>
  );
}
