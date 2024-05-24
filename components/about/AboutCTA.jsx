import Link from "next/link";
import React, { Component } from "react";
import { FiArrowRight } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

export class AboutCTA extends Component {
  render() {
    return (
      <div className="container flex justify-center text-md md:text-xl">
        <div>
          <div className="mt-20 sm:mt-32 mx-4 sm:mx mb-4 sm:mb-4 flex flex-col sm:flex-row place-content-between">
            <p className="font-general-medium text-2xl sm:text-3xl lg:text-4xl text-black dark:text-ternary-light">
              Vraag <span className="text-accent">vrijblijvend</span> meer
              informatie!
            </p>
          </div>
          <div className="block sm:mb-20 mx-4 max-w-[300px] sm:max-w-[620px] md:max-w-[1060px] text-justify text-gray-500 text-lg sm:text-lg lg:text-xl">
            over onze manier van werken en wat wij voor u kunnen betekenen.
            <br />
            <br />
            <div className="flex sm:mt-4 items-center">
              <FiArrowRight
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 10,
                  color: "silver",
                }}
              />
              <Link
                href="/contact"
                className="font-general-medium inline-block self-center sm:self-auto text-md md:text-lg text-center max-h-14 xl:max-h-24 border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm rounded-sm sm:mt-0 sm:mr-4 lg:mr-16 px-0 sm:px-4 py-3 duration-300 w-48"
                aria-label="Hire Me Button"
              >
                Ontdek meer
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCTA;
