import { getAuthors } from "@/app/lib/api";
import * as utils from "@/app/lib/utils";
import Image from "next/image";
import React from "react";
import { Section } from "@/app/lib/types";

interface PageHeaderSection extends Section {
  content: {
    introduction: string | undefined;
    authorSelect: string;
    parent: string | undefined;
    created: string | undefined;
    title: string | undefined;
  };
}

interface PageHeaderProps {
  section: PageHeaderSection;
  instanceId: string;
}

const PageHeader: React.FC<PageHeaderProps> = async ({ section, instanceId }) => {
  const { introduction, authorSelect, parent, title, created } = section?.content || {};
  const authors = await getAuthors(instanceId);
  const author = authors?.result?.find((a) => a.cid === authorSelect);

  return (
    <header className="mb-8">
      <p className="font-display text-sm font-semibold text-sky-500 mb-1">{parent}</p>
      <h1 className="font-display text-3xl tracking-tight text-slate-900 font-semibold">{title}</h1>
      <div className="flex space-x-4 mt-4">
        <div className="flex-none">{author?.content?.image?.url ? <Image className="rounded-full" src={author.content.image.url} alt={author.content.name || "Author"} width={40} height={40} /> : <Image className="rounded-full" src="/user.png" alt="Author" width={40} height={40} />}</div>
        <div className="flex-1">
          <p className="font-display font-semibold text-sm text-slate-900">{author?.content?.name}</p>
          <p className="text-sm text-slate-500">Created: {utils.dateToYMD(created)}</p>
        </div>
      </div>
      <p className="text-md text-slate-600 mt-9 whitespace-pre-wrap">{introduction}</p>
    </header>
  );
};

export default PageHeader;
