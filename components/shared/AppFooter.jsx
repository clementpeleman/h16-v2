import { FiInstagram, FiFacebook } from "react-icons/fi";
import AppFooterCopyright from "./AppFooterCopyright";
import AppFooterLegal from "./AppFooterLegal";

const socialLinks = [
  {
    id: 1,
    icon: <FiFacebook />,
    url: "https://www.facebook.com/H16.be/",
    // Icon-only links had no accessible name at all — a screen reader
    // announced two unlabelled links.
    label: "H16 op Facebook",
  },
  {
    id: 2,
    icon: <FiInstagram />,
    url: "https://www.instagram.com/h16.be/",
    label: "H16 op Instagram",
  },
];

function AppFooter() {
  return (
    <div className="container mx-auto">
      <div className="pt-20 sm:pt-28 pb-14 mt-32 sm:mt-40 lg:mt-48 border-t-2 border-gray-200">
        {/* Footer social links */}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-h3 text-primary-dark mb-5">
            Volg ons op:
          </h2>
          <ul className="flex gap-4 sm:gap-8">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="block p-3 rounded-md text-ternary-dark hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 duration-300"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl" aria-hidden="true">
                    {link.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <AppFooterLegal />

        <div className="mt-12">
          <AppFooterCopyright />
        </div>
      </div>
    </div>
  );
}

export default AppFooter;
