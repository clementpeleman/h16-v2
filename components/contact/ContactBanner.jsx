import React, { Component } from "react";

export class ContactBanner extends Component {
  render() {
    return (
      <div className="mx-4 sm:mx-0">
        <section className="pt-5 sm:pt-10 mt-6 sm:mt-8">
          <div className="">
            <p className=" font-general-medium text-2xl sm:text-4xl text-black dark:text-ternary-light ">
              Contacteer ons
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default ContactBanner;
