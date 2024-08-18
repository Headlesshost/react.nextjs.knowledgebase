import type { Metadata } from "next";
import OnThisPage from "@/components/onThisPage";
import PageFoot from "@/components/pageFoot";
import Section from "@/components/section";
import { getPage } from "@/app/lib/api";

export default async function Body({ params }: IBody) {
  const page = await getPage(params.slug, params.instance);
  const { sections = [] } = page;

  return (
    <>
      <main className="w-full lg:w-3/4 xl:w-2/3 py-4 px-8">
        <article>
          {sections.map((section: any) => (
            <Section section={section} instanceId={params.instance} key={section.id} />
          ))}
        </article>
        <PageFoot pageIdentifier={params.slug} instanceId={params.instance} />
      </main>
      <aside className="hidden xl:block xl:w-1/6 p-4">
        <OnThisPage page={page} />
      </aside>
    </>
  );
}

export const metadata: Metadata = {
  description: "Custom Description",
};

type IBody = { params: { slug: string; instance: string } };
