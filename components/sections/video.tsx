import { Section } from "@/app/lib/types";
import React from "react";

interface VideoSection extends Section {
  link: string;
}

interface VideoProps {
  section: VideoSection;
}

const Video: React.FC<VideoProps> = ({ section }) => {
  const { id, title, link } = section;
  return (
    <div id={id} className="py-2">
      <div id={title} className="aspect-w-16 aspect-h-9" style={{ height: "400px" }}>
        <iframe style={{ width: "100%", height: "100%" }} src={link} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Video;
