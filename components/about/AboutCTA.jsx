import Link from "next/link";
import React, { Component } from "react";

export class AboutCTA extends Component {
  render() {
    // `container flex justify-center` had no `mx-auto`, so this block sat
    // flush to the window at x=0 and centred its own contents inside — which
    // put the primary CTA 110px off the page's content grid on two pages.
    return (
      <div className="mt-section">
        <h2 className="text-h2 text-black [text-wrap:balance]">
          Vraag <span className="text-accent">vrijblijvend</span> meer informatie
        </h2>
        <div className="mt-4 max-w-[65ch] text-left text-gray-700 text-lead">
          <p>over onze manier van werken en wat wij voor u kunnen betekenen.</p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block text-ui px-7 py-4 bg-primary text-white text-center tracking-wider rounded-lg hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCTA;
