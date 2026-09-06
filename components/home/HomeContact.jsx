import Link from "next/link";
import { company } from "../../data/companyData";
import HomeSection from "./HomeSection";

function HomeContact() {
  return (
    <HomeSection
      label="Contact"
      flip
      title={
        <>
          Vraag <span className="text-accent">vrijblijvend</span> meer
          informatie
        </>
      }
    >
      <p className="text-lead text-gray-700 max-w-[46ch]">
        Over onze manier van werken en wat wij voor u kunnen betekenen.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/contact"
          className="text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
        >
          Neem contact op
        </Link>
        <a
          href={company.phoneHref}
          className="text-ui text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
        >
          Bel {company.phone}
        </a>
      </div>
    </HomeSection>
  );
}

export default HomeContact;
