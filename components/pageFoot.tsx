import React from "react";
import Link from "next/link";
import { getCommon } from "@/app/lib/api";

interface NavigationItem {
  slug: string;
  title: string;
  children?: NavigationItem[];
}

interface PageFootProps {
  pageIdentifier: string;
  instanceId: string;
}

async function PageFoot({ pageIdentifier, instanceId }: PageFootProps) {
  const common = await getCommon(instanceId);
  const { globals = {} } = common;

  const { navigation = [] } = globals;

  let nextLink: NavigationItem | undefined;
  let prevLink: NavigationItem | undefined;

  navigation.some((section: { children?: NavigationItem[] | undefined }, i: number) => {
    const { children = [] } = section;

    const index = children.findIndex((child) => child.slug === pageIdentifier);
    if (index !== -1) {
      prevLink = children[index - 1] ?? navigation[i - 1]?.children?.slice(-1)[0];
      nextLink = children[index + 1] ?? navigation[i + 1]?.children?.[0];
      return true; // Break out of the loop
    }
    return false;
  });

  return (
    <>
      <dl className="mt-12 flex">
        {prevLink && (
          <div>
            <dt className="font-display text-sm font-semibold text-slate-900">Previous</dt>
            <dd className="mt-1">
              <Link className="text-sm text-slate-600 hover:text-slate-900" href={prevLink.slug}>
                <span aria-hidden="true">←</span> {prevLink.title}
              </Link>
            </dd>
          </div>
        )}
        {nextLink && (
          <div className="ml-auto text-right">
            <dt className="font-display text-sm font-semibold text-slate-900">Next</dt>
            <dd className="mt-1">
              <Link className="text-sm text-slate-600 hover:text-slate-900" href={nextLink.slug}>
                {nextLink.title} <span aria-hidden="true">→</span>
              </Link>
            </dd>
          </div>
        )}
      </dl>
      <div className="mt-12 flex flex-col items-center space-y-6 border-t border-slate-200 pt-10">
        <p className="text-slate-700 text-sm">
          Have more questions?{" "}
          <a className="underline hover:text-sky-500" href="https://headlesshost.com/contact">
            Submit a request.
          </a>
        </p>
      </div>
    </>
  );
}

export default PageFoot;
