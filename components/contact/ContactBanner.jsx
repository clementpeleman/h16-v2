import React, { Component } from "react";
import { company } from "../../data/companyData";

export class ContactBanner extends Component {
  render() {
    return (
      <section className="mt-section">
        <h1 className="font-display text-h1 text-black [text-wrap:balance]">
          Contacteer ons
        </h1>
        {/* On a phone the form pushes the portrait, the phone number and the
            response promise 200-776px below the submit button. This puts the
            reassurance — and the faster channel — before the ask. */}
        <p className="mt-6 max-w-[52ch] text-lead text-gray-700">
          Gilles of Elena antwoordt u binnen twee werkdagen persoonlijk. Liever
          meteen iemand aan de lijn?{" "}
          <a
            href={company.phoneHref}
            className="text-primary underline underline-offset-4 decoration-1 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm duration-200"
          >
            Bel {company.phone}
          </a>
          .
        </p>
      </section>
    );
  }
}

export default ContactBanner;
