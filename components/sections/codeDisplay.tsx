"use client";

import { Section } from "@/app/lib/types";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeBlockSection extends Section {
  code: string;
  language: string;
  showLineNumbers: boolean;
}

interface CodeBlockProps {
  section: CodeBlockSection;
}

const CodeDisplay: React.FC<CodeBlockProps> = ({ section }) => {
  return (
    <div className="mb-12">
      <CopyBlock text={section?.code} language={section?.language} showLineNumbers={section?.showLineNumbers} theme={dracula} codeBlock />
    </div>
  );
};

export default CodeDisplay;