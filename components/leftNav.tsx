"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globals } from "@/app/lib/types";

interface LeftNavProps {
  globals?: Globals;
  instanceId: string;
}

const LeftNav: React.FC<LeftNavProps> = ({ globals, instanceId }) => {
  const pathname = usePathname();

  const selectedCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-sky-500 before:bg-sky-500";
  const blankCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-900 hover:before:block";

  return (
    <div className="hidden lg:relative lg:block lg:flex-none">
      {globals?.content?.links && (
        <div className="sticky -ml-0.5 w-64 overflow-x-hidden pl-0.5">
          <nav className="text-sm">
            <ul className="space-y-9">
              {globals?.content?.links.map((item) => (
                <li key={item.group}>
                  <h2 className="font-display font-semibold text-slate-900">{item.group}</h2>
                  <ul className="mt-4 space-y-4 border-slate-200">
                    {item.links?.map((child) => (
                      <li className="relative" key={child.slug}>
                        <Link className={pathname.endsWith(child.slug ?? "") ? selectedCss : blankCss} href={`/${instanceId}/${child.slug}`}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LeftNav;
