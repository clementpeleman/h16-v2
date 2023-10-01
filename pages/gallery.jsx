import React, { Component } from "react";
import PagesMetaHead from "../components/PagesMetaHead";

export class gallery extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <PagesMetaHead title="Projects" />
        <section className="py-5 mx-3 sm:pt-10 mt-6 sm:mt-8">
          <div className="mt-5 mb-5 sm:mb-5">gallery</div>
        </section>
      </div>
    );
  }
}

export default gallery;
