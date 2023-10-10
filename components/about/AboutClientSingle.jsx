import Image from "next/image";

function AboutClientSingle({ title, image }) {
  return (
    <div className="py-5 px-10 border h-48 sm:h-24 md:h-32 lg:h-64 bg-secondary-light border-ternary-light dark:border-ternary-dark flex justify-center grayscale  shadow-sm rounded-lg mb-5 cursor-pointer">
      <Image
        src={image}
        fill={true}
        sizes="100vw"
        style={{ objectFit: "contain", filter: "opacity(0.9)" }}
      />
    </div>
  );
}

export default AboutClientSingle;
