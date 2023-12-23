import React, { Component } from "react";

export class ContactBanner extends Component {
  render() {
    return (
      <div className="mx-4 sm:mx-0">
        <section className="lg:pt-5 mt-6 ">
          <div className="">
            <p className="hidden lg:block font-general-medium text-2xl sm:text-4xl text-black dark:text-ternary-light ">
              Contacteer ons
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default ContactBanner;
