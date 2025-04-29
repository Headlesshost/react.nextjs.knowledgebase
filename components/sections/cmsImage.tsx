import Image from "next/image";
import { Section, ImageDetails } from "@/app/lib/types";

interface CmsImageSection extends Section {
  content: {
    title: string;
    image: ImageDetails;
  };
}

interface CmsImageProps {
  section: CmsImageSection;
}

const CmsImage: React.FC<CmsImageProps> = ({ section }) => {
  const { title = "Knowledgebase", image = { url: "", alt: "", width: 0, height: 0 } } = section?.content || {};
  return (
    <div className="mb-14">
      <Image src={image.url} alt={title} width={image.width} height={image.height} className="rounded-md border" />
    </div>
  );
};

export default CmsImage;
