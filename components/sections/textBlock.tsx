import React from "react";
import { Section } from "@/app/lib/types";

interface TextBlockSection extends Section {
  content: {
    content: string;
  };
}

interface TextBlockSectionProps {
  section: TextBlockSection;
}

const TextBlock: React.FC<TextBlockSectionProps> = ({ section }) => {
  return (
    <div className="text-md text-slate-600 whitespace-pre-wrap mb-14 scroll-mt-20" id={section.id}>
      {section?.content?.content}
    </div>
  );
};

export default TextBlock;
