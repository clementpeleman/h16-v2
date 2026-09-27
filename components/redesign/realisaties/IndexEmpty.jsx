import { TextLink } from "../ui";
import { company } from "../../../data/companyData";

// What /realisaties shows when the CMS returns nothing (down, locked, empty):
// an empty page must still carry the visitor somewhere, so it says so and
// offers the phone and the mail. tel:/mailto: carry no data-track (Analytics
// names them itself).
export default function IndexEmpty({ className = "" }) {
  return (
    <div
      className={`border-t border-rule pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6 ${className}`}
    >
      <p className="max-w-[44ch] text-lead text-ink lg:col-span-7">
        Onze realisaties zijn op dit moment niet beschikbaar. Bel of mail ons
        gerust, dan vertellen we u waar we mee bezig zijn.
      </p>
      <p className="mt-6 flex flex-col text-ui md:flex-row md:flex-wrap md:items-baseline md:gap-x-6 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex-col lg:items-start">
        <TextLink
          href={company.phoneHref}
          className="inline-flex min-h-[44px] items-center md:min-h-0 lg:mt-1"
        >
          {company.phone}
        </TextLink>
        <TextLink
          href={company.emailHref}
          className="inline-flex min-h-[44px] items-center break-all md:min-h-0 lg:mt-3"
        >
          {company.email}
        </TextLink>
      </p>
    </div>
  );
}
