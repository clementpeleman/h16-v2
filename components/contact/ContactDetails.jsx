import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";
import { company } from "../../data/companyData";
import FoundersPortrait from "./FoundersPortrait";

// `href` is what makes each of these actionable — a phone number a visitor
// cannot tap is the most expensive dead element on a building firm's site.
// The values come from data/companyData so the footer's legal block and this
// list cannot drift apart.
const contacts = [
  {
    id: 1,
    name: `${company.street}, ${company.postalCity}`,
    href: company.mapsHref,
    icon: <FiMapPin />,
    external: true,
  },
  {
    id: 2,
    name: company.email,
    href: company.emailHref,
    icon: <FiMail />,
  },
  {
    id: 3,
    name: company.phone,
    href: company.phoneHref,
    icon: <FiPhone />,
  },
];

const linkClasses =
  "text-body text-ternary-dark break-words underline underline-offset-4 decoration-1 decoration-gray-400 " +
  "hover:text-primary hover:decoration-primary " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200";

function ContactDetails() {
  return (
    <div>
      {/* This column measured 469px of empty space beside a filled form. The
          portrait fills it with the one thing the site never showed: the two
          people the visitor is about to trust with a building project. */}
      <FoundersPortrait className="mb-12" />

      <div className="text-left max-w-xl">
        <p className="mb-6 text-meta uppercase tracking-[0.08em] text-ternary-dark">Contactgegevens</p>
        <ul>
          {contacts.map((contact) => (
            <li className="flex gap-4 mb-6" key={contact.id}>
              <span
                className="text-2xl text-neutral-600 mt-1 shrink-0"
                aria-hidden="true"
              >
                {contact.icon}
              </span>
              <a
                className={linkClasses}
                href={contact.href}
                {...(contact.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {contact.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactDetails;
