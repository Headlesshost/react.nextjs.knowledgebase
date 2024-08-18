import { HeaderLinkSection } from "@/app/lib/types";

interface HeaderLinkProps {
  section: HeaderLinkSection;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ section }) => {
  const { id, title, headingType } = section;
  const Tag = headingType !== "default" ? headingType : "h2";
  const className = headingType === "h1" ? "text-3xl" : headingType === "h2" ? "text-2xl" : headingType === "h3" ? "text-xl" : headingType === "h4" ? "text-lg" : "text-base";

  return (
    <div className={`${className} font-bold mb-5`} id={id}>
      {title}
    </div>
  );
};

export default HeaderLink;
