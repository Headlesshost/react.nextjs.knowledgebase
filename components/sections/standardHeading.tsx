import React from "react";
import { Heading, Section } from "@/app/lib/types";

interface StandardHeadingSection extends Section {
  content: {
    heading: Heading;
  };
}

interface StandardHeadingProps {
  section: StandardHeadingSection;
}

const StandardHeading: React.FC<StandardHeadingProps> = ({ section }) => {
  const { heading } = section?.content || {};
  const { headingType, title } = heading || {};
  const className = `text-${headingType === "h1" ? "3xl" : headingType === "h2" ? "2xl" : headingType === "h3" ? "xl" : headingType === "h4" ? "lg" : "base"}`;

  return (
    <div className={`${className} font-bold mb-8`} id={section.id}>
      {title}
    </div>
  );
};

export default StandardHeading;
