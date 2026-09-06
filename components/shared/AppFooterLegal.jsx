import { FiInstagram, FiFacebook } from "react-icons/fi";
import { company } from "../../data/companyData";

// The footer carried two social icons and a credit line — 393px tall for 114px
// of content, and no legal identity at all. In Belgium the address, VAT number
// and ondernemingsnummer are among the first things a homeowner checks before
// handing over a building project.
//
// Deliberately the only left-aligned block in a centred footer: this is
// reference data, not a message, and centring it would make it read as one.
const linkClasses =
  "underline underline-offset-4 decoration-1 decoration-gray-400 " +
  "hover:text-primary hover:decoration-primary " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200";

function AppFooterLegal() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-meta text-ternary-dark text-left">
      <address className="not-italic">
        <span className="block font-strong">{company.legalName}</span>
        {company.registeredSeat}
      </address>

      <div>
        <a className={linkClasses} href={company.phoneHref}>
          {company.phone}
        </a>
        <br />
        <a className={`${linkClasses} break-all`} href={company.emailHref}>
          {company.email}
        </a>
      </div>

      <div>{company.vat}</div>

      <ul className="flex gap-4">
        <li>
          <a href={company.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="H16 op Facebook" className="block p-1 -m-1 text-ternary-dark hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200">
            <FiFacebook className="h-6 w-6" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href={company.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="H16 op Instagram" className="block p-1 -m-1 text-ternary-dark hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200">
            <FiInstagram className="h-6 w-6" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AppFooterLegal;
