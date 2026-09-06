import Link from "next/link";
import NAV_ITEMS from "../../data/navigation";

// The footer had no way onward: only the legal block and a credit line. A
// second copy of the primary navigation gives every page a crawlable link to
// the four sections from the bottom of the page as well as the top, and it
// reads from the same list as the header so the two cannot drift.
function AppFooterNav() {
  return (
    <nav aria-label="Voettekst">
      <ul className="flex flex-wrap gap-x-8 gap-y-3 text-meta text-ternary-dark">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="underline underline-offset-4 decoration-1 decoration-gray-400 hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AppFooterNav;
