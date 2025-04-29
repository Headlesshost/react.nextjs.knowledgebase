"use client";

import { Section } from "@/app/lib/types";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeBlockSection extends Section {
  content: {
    code: string;
    language: string;
    showLineNumbers: boolean;
  };
}

interface CodeBlockProps {
  section: CodeBlockSection;
}

const CodeDisplay: React.FC<CodeBlockProps> = ({ section }) => {
  const { code = "", language = "javascript", showLineNumbers = false } = section?.content || {};
  return (
    <div className="mb-14">
      <CopyBlock text={code} language={language} showLineNumbers={showLineNumbers} theme={dracula} codeBlock={true} />
    </div>
  );
};

export default CodeDisplay;
