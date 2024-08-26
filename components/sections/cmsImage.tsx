import Image from "next/image";
import { Section, ImageDetails } from "@/app/lib/types";

interface CmsImageSection extends Section {
  image: ImageDetails;
}

interface CmsImageProps {
  section: CmsImageSection;
}

const CmsImage: React.FC<CmsImageProps> = ({ section }) => {
  const { image = { url: "", alt: "", width: 0, height: 0 } } = section;
  return (
    <div className="mb-16">
      <Image src={image.url} alt={image.alt || "Knowledgebase"} width={image.width} height={image.height} className="rounded-md border" />
    </div>
  );
};

export default CmsImage;
