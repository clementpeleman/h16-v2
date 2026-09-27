import { company } from "../../../data/companyData";

// Title of /contact: the h1 and the promise, with the faster channel before
// the form (ContactBanner's copy, unchanged). The number never breaks across
// lines.
export default function Intro() {
  return (
    <div>
      <h1
        id="titel"
        className="font-display text-display font-normal text-primary hyphens-manual"
      >
        Contacteer ons
      </h1>
      <p className="mt-5 max-w-[46ch] text-lead text-ink md:mt-6">
        Gilles of Elena antwoordt u zo snel mogelijk. Liever meteen iemand aan
        de lijn?{" "}
        <a
          href={company.phoneHref}
          className="whitespace-nowrap text-primary underline decoration-1 underline-offset-4 hover:decoration-2 focus-ring"
        >
          Bel {company.phone}
        </a>
        .
      </p>
    </div>
  );
}
