import { Section } from "@/app/lib/types";

interface CodeBlockSection extends Section {
  code: string;
}

interface CodeBlockProps {
  section: CodeBlockSection;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ section }) => {
  return (
    <div className="mb-12">
      <div className="bg-gray-900 text-gray-300 font-mono p-4 rounded-xl overflow-auto text-sm">
        <pre>
          <code>{section?.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
