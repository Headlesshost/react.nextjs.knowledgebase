import React from "react";
import { Heading, Section } from "@/app/lib/types";

interface TextBlockWithHeaderSection extends Section {
  heading: Heading;
  content: string;
}

interface TextBlockWithHeaderProps {
  section: TextBlockWithHeaderSection;
}

const TextBlockWithHeader: React.FC<TextBlockWithHeaderProps> = ({ section }) => {
  const { id, heading, content } = section;
  const { headingType, title } = heading;
  const className = headingType === "h1" ? "text-3xl" : headingType === "h2" ? "text-2xl" : headingType === "h3" ? "text-xl" : headingType === "h4" ? "text-lg" : "text-base";

  return (
    <div className="mb-10">
      <div className={`${className} font-bold my-3`} id={id}>
        {title}
      </div>
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
};

export default TextBlockWithHeader;
