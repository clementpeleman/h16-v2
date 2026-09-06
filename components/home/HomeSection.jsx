// Every block below the hero shares this one frame: a hairline on top, a
// heading in one third, the content in the other two.
// The narrow column alternates sides per section so the page reads as a
// sequence rather than a stack of identical rows.
function HomeSection({ label, title, aside, children, flip = false }) {
  return (
    <section className="mt-chapter grid gap-12 border-t border-gray-200 pt-12 lg:grid-cols-12 lg:gap-x-16 lg:pt-16">
      <div className={`lg:col-span-4 ${flip ? "lg:col-start-9 lg:order-2" : ""}`}>
        {label && (
          <p className="mb-5 text-[0.7rem] uppercase tracking-[0.14em] text-gray-500">
            {label}
          </p>
        )}
        <h2 className="text-h2 text-black max-w-[20ch] [text-wrap:balance]">
          {title}
        </h2>
        {aside && <div className="mt-8">{aside}</div>}
      </div>
      <div className={`lg:col-span-8 ${flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-5"}`}>
        {children}
      </div>
    </section>
  );
}

export default HomeSection;
