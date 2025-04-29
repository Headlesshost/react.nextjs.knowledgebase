import { NavigationLink, Section } from "@/app/lib/types";
import Link from "next/link";

interface NavLinkSection extends Section {
  content: {
    link: NavigationLink;
  };
}

interface NavLinkProps {
  section: NavLinkSection;
}

const NavLink: React.FC<NavLinkProps> = ({ section }) => {
  if (!section) return null;
  const { link } = section?.content || {};
  const { title, slug, target } = link;
  return (
    <div className="mb-6">
      <Link href={slug} className="font-display hover:underline decoration-1 text-sky-500" target={target}>
        {title}
      </Link>
    </div>
  );
};

export default NavLink;
