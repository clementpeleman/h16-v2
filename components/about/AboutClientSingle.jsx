import Image from "next/image";

function AboutClientSingle({ title, image }) {
  return (
    <div className="py-5 px-10 border h-48 sm:h-24 md:h-32 relative lg:h-64 bg-secondary-light border-ternary-light dark:border-ternary-dark flex justify-center grayscale  shadow-sm rounded-lg mb-5 cursor-pointer">
      <Image
        src={image}
        fill={true}
        sizes="100%"
        style={{
          objectFit: "scale-down",
          filter: "opacity(0.9)",
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  );
}

export default AboutClientSingle;
