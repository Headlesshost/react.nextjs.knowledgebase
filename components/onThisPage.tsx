import Link from "next/link";
import { Heading, Section } from "@/app/lib/types";

interface HeadingSection extends Section {
  heading: Heading;
}

interface Page {
  sections?: HeadingSection[];
}

interface OnThisPageProps {
  page: Page;
}

const OnThisPage: React.FC<OnThisPageProps> = ({ page }) => {
  const links: { title: string; link: string; children: { title: string; link: string }[] }[] = [];
  const { sections = [] } = page;
  let parentHeading = { title: "", link: "", children: [] as { title: string; link: string }[] };

  for (const section of sections) {
    if (section.heading?.headingType === "h2") {
      parentHeading = { title: section.heading.title || "", link: section.id, children: [] };
      links.push(parentHeading);
    } else if (section.heading?.headingType === "h3" && parentHeading) {
      parentHeading.children.push({ title: section.heading.title ?? "", link: section.id });
    }
  }

  return (
    <div className="hidden xl:sticky xl:-mr-6 xl:block xl:flex-none xl:pr-6">
      <nav id="toc" aria-labelledby="on-this-page-title" className="w-56">
        {links.length > 0 && (
          <h2 id="on-this-page-title" className="font-display text-sm font-semibold text-slate-900">
            On this page
          </h2>
        )}
        <ol className="mt-4 space-y-3 text-sm">
          {links.map((link) => (
            <li key={link.link}>
              <Link className="font-normal text-slate-500 hover:text-slate-900" href={`#${link.link}`}>
                {link.title}
              </Link>
              {link.children.length > 0 && (
                <ol className="mt-2 space-y-3 pl-5 text-slate-500">
                  {link.children.map((child) => (
                    <li key={child.link}>
                      <Link className="hover:text-slate-900" href={`#${child.link}`}>
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default OnThisPage;
