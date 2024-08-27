import React from "react";
import { Heading, Section } from "@/app/lib/types";

interface StandardHeadingSection extends Section {
  heading: Heading;
}

interface StandardHeadingProps {
  section: StandardHeadingSection;
}

const StandardHeading: React.FC<StandardHeadingProps> = ({ section }) => {
  const { id, heading } = section;
  const { headingType, title } = heading;
  const className = headingType === "h1" ? "text-3xl" : headingType === "h2" ? "text-2xl" : headingType === "h3" ? "text-xl" : headingType === "h4" ? "text-lg" : "text-base";

  return (
    <div className={`${className} font-bold mb-8`} id={id}>
      {title}
    </div>
  );
};

export default StandardHeading;
