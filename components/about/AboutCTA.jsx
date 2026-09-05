import Link from "next/link";
import React, { Component } from "react";
import { FiArrowRight } from "react-icons/fi";

export class AboutCTA extends Component {
  render() {
    // `container flex justify-center` had no `mx-auto`, so this block sat
    // flush to the window at x=0 and centred its own contents inside — which
    // put the primary CTA 110px off the page's content grid on two pages.
    return (
      <div className="container mx-auto mt-24 sm:mt-32 lg:mt-40">
        <h2 className="text-h2 text-black [text-wrap:balance]">
          Vraag <span className="text-accent">vrijblijvend</span> meer informatie
        </h2>
        <div className="mt-4 max-w-[65ch] text-left text-gray-700 text-lead">
          <p>over onze manier van werken en wat wij voor u kunnen betekenen.</p>
          <div className="mt-8 flex items-center gap-3">
            <FiArrowRight
              aria-hidden="true"
              className="h-7 w-7 shrink-0 text-primary"
            />
            <Link
              href="/contact"
              className="text-ui inline-block text-center border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 duration-300"
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
