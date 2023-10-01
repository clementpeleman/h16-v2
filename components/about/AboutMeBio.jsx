import Image from "next/image";
import { useState } from "react";
import { aboutMeData } from "../../data/aboutMeData";
import { ScrollRotate } from "react-scroll-rotate";

function AboutMeBio() {
  const [aboutMe, setAboutMe] = useState(aboutMeData);
  return (
    <div className="block sm:flex sm:gap-10 mt-10 sm:mt-32 items-center justify-between">
      <div className=" mb-7 sm:mb-0 flex-grow">
        <ScrollRotate
          method={"perc"}
          throttle={0.1}
          animationDuration={0.3}
          from={-10}
          to={75}
        >
          <Image
            src="/images/H16_EMBLEEM_BLAUW.png"
            width={200}
            height={200}
            className="rounded-sm"
            alt="Foto H16 Sfeer"
          />
        </ScrollRotate>
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
