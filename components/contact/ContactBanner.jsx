import React, { Component } from "react";

export class ContactBanner extends Component {
  render() {
    return <div>      
      <section className="pt-5 sm:pt-10 mt-6 sm:mt-8">
        <div className="max-w-[70%] text-left">
          <p className=" font-general-medium text-2xl sm:text-4xl text-black dark:text-ternary-light ">
            Samenwerken
          </p>
    </div>
    <div className="mt-8 text-xl">Wat kan H16 voor jou betekenen?</div>
    <br/>
    <div>
      <ol className="list-decimal list-inside ">
        <li className="font-general-medium text-xl">Adviesverlening</li>
        <li className="font-general-medium text-xl">Bouwcoördinatie</li>
        <li className="font-general-medium text-xl">Projectontwikkeling</li>
        <li className="font-general-medium text-xl">Ben je architect?</li>
        <li className="font-general-medium text-xl">Ben je aannemer?</li>
      </ol>
    </div>
    </section></div>;
  }
}

export default ContactBanner;
