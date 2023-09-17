import Image from "next/image";
import { useState } from "react";
import { aboutMeData } from "../../data/aboutMeData";

function AboutMeBio() {
  const [aboutMe, setAboutMe] = useState(aboutMeData);
  return (
    <div className="block sm:flex sm:gap-10 mt-10 sm:mt-32">
      <div className="w-full sm:w-1/4 mb-7 sm:mb-0">
        <Image
          src="/images/"
          width={200}
          height={200}
          className="rounded-sm"
          alt="Foto H16 Sfeer"
        />
      </div>

      <div className="font-regular mx-4 sm:mx-0 sm:text-justify  sm:w-3/4 text-left">
        {aboutMe.map((bio) => (
          <p
            className="mb-4 text-ternary-dark dark:text-ternary-light text-lg"
            key={bio.id}
          >
            {bio.bio}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AboutMeBio;
