import React, { Component } from "react";
import PagesMetaHead from "../components/PagesMetaHead";
import { fetcher } from "../lib/api";
import GallerySingle from "../components/gallery/GallerySingle";

export default function gallery({ Galerij }) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead title="Galerij" />

      <section className="py-5 mx-3 sm:pt-10 mt-6 sm:mt-8">
        <div className="max-w-[70%] text-left">
          <p className=" font-general-medium text-2xl sm:text-4xl mb-8 text-black dark:text-ternary-light ">
            Galerij
          </p>
        </div>

        <div className="mt-5 mb-5 sm:mb-5">
          {/* <h3
					className="
                        font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-xl
                        mb-3
                        "
				>
					Onze voltooide projecten
				</h3> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3  sm:gap-10">
          {Galerij.data.attributes.gallery.data.map((afbeelding, index) => {
            return <GallerySingle key={index} {...afbeelding} />;
          })}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const galleryResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/gallerij?populate=*`
  );
  return {
    props: {
      Galerij: galleryResponse,
    },
  };
}
