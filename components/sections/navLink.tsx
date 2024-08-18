import { Section } from "@/app/lib/types";
import Link from "next/link";

interface NavLinkSection extends Section {
  to: string | undefined;
  target: string | undefined;
}

interface NavLinkProps {
  section: NavLinkSection;
}

const NavLink: React.FC<NavLinkProps> = ({ section }) => {
  if (!section) return null;
  const { to, target, title } = section;
  return to ? (
    <div className="mb-6">
      <Link href={to} className="font-display hover:underline decoration-1 text-sky-500" target={target}>
        {title}
      </Link>
    </div>
  ) : null;
};

export default NavLink;
