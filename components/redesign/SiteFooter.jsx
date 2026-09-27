import Image from "next/image";
import Link from "next/link";
import logoNegatief from "../../public/images/logo-negatief.png";
import { FOOTER_ITEMS } from "../../data/navigation";
import { company } from "../../data/companyData";

const link =
  "text-ui text-white underline decoration-aqua-light decoration-1 underline-offset-4 hover:decoration-2 focus-ring-inverse";

const SOCIALS = [
  { href: company.socials.facebook, label: "Facebook" },
  { href: company.socials.instagram, label: "Instagram" },
  { href: company.socials.linkedin, label: "LinkedIn" },
];

// Continues the blue back cover. White logo, the footer navigation, contact
// and socials as words, the legal identity, and the credit row.
// `divider={false}` drops the top hairline on pages that do not end with the
// blue BackCover (it would sit right on the paper→blue edge).
export default function SiteFooter({ divider = true }) {
  return (
    <footer id="site-footer" className="bg-primary">
      <div className="container mx-auto">
        <div
          className={`${divider ? "border-t border-rule-blue" : ""} pb-[max(2rem,env(safe-area-inset-bottom))] pt-group lg:grid lg:grid-cols-12 lg:gap-x-6`}
        >
          <div className="lg:col-span-3 xl:col-span-4">
            <Link
              href="/"
              aria-label="H16 Vastgoedontwikkeling, naar de startpagina"
              className="inline-block focus-ring-inverse"
            >
              <Image
                src={logoNegatief}
                alt="H16 Vastgoedontwikkeling"
                sizes="160px"
                className="h-auto w-[140px] lg:w-[160px]"
              />
            </Link>
          </div>

          <nav
            aria-label="Voettekst"
            className="mt-10 lg:col-span-3 lg:mt-0 xl:col-span-2"
          >
            <ul className="grid grid-cols-2 lg:grid-cols-1">
              {FOOTER_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-ui text-white underline-offset-4 hover:underline focus-ring-inverse lg:min-h-[36px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 lg:col-span-3 lg:mt-0">
            <ul className="space-y-1">
              <li>
                <a
                  href={company.phoneHref}
                  className={`${link} inline-flex min-h-[44px] items-center lg:min-h-[36px]`}
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className={`${link} inline-flex min-h-[44px] items-center lg:min-h-[36px]`}
                >
                  {company.email}
                </a>
              </li>
              <li className="flex flex-wrap gap-x-5 pt-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`H16 op ${s.label}`}
                    className={`${link} inline-flex min-h-[44px] items-center lg:min-h-[36px]`}
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>

          <address className="mt-8 not-italic text-meta text-aqua-pale lg:col-span-3 lg:mt-0">
            <span className="block font-medium">{company.legalName}</span>
            <span className="block">{company.registeredSeat}</span>
            <span className="mt-2 block">{company.vat}</span>
          </address>

          <p className="mt-group border-t border-rule-blue pt-6 text-meta uppercase tracking-[0.08em] text-aqua-light lg:col-span-12">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://h16.be"
              className="underline decoration-aqua-light underline-offset-4 hover:text-white focus-ring-inverse"
            >
              H16
            </a>{" "}
            | Design:{" "}
            <a
              href="mailto:clementpeleman@outlook.com"
              className="underline hover:text-white focus-ring-inverse"
            >
              Clement Peleman
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
