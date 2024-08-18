import React from "react";
import { Section } from "@/app/lib/types";

interface TextBlockProps {
  section: Section;
}

const TextBlock: React.FC<TextBlockProps> = ({ section }) => {
  return <div className="whitespace-pre-wrap mb-6">{section.content}</div>;
};

export default TextBlock;
