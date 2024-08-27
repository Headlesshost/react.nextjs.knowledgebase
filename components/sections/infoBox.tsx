import { Section } from "@/app/lib/types";
import React from "react";

interface InfoBoxSection extends Section {
  colour: string;
}

interface InfoBoxProps {
  section: InfoBoxSection;
}

const InfoBox: React.FC<InfoBoxProps> = ({ section }) => {
  const { id, title, content, colour } = section;
  return (
    <div className="mb-14">
      <div className={`rounded-2xl p-6 bg-${colour}-50`} id={id}>
        <p className="font-display text-xl text-yellow-900 mt-0 mb-2.5">{title}</p>
        <div className={`text-${colour}-800`}>
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
