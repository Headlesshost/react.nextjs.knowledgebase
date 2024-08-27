import React from "react";
import { Heading, Section } from "@/app/lib/types";
import StandardHeading from "./standardHeading";

interface TextBlockWithHeaderSection extends Section {
  heading: Heading;
  content: string;
}

interface TextBlockWithHeaderProps {
  section: TextBlockWithHeaderSection;
}

const TextBlockWithHeader: React.FC<TextBlockWithHeaderProps> = ({ section }) => {
  const { content } = section;

  return (
    <div className="mb-14">
      <StandardHeading section={section} />
      <div className="text-md text-slate-600 whitespace-pre-wrap">{content}</div>
    </div>
  );
};

export default TextBlockWithHeader;
