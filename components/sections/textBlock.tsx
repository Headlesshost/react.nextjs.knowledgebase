import React from "react";
import { Section } from "@/app/lib/types";

interface TextBlockProps {
  section: Section;
}

const TextBlock: React.FC<TextBlockProps> = ({ section }) => {
  return <div className="text-md text-slate-600 whitespace-pre-wrap mb-14">{section.content}</div>;
};

export default TextBlock;
