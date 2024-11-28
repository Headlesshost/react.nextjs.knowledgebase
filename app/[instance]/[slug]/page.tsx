import type { Metadata, ResolvingMetadata } from "next";
import OnThisPage from "@/components/onThisPage";
import PageFoot from "@/components/pageFoot";
import Section from "@/components/section";
import { getPage, getGuide } from "@/app/lib/api";

export default async function Body({ params }: IBody) {
  const isGuide = params.slug === "guide";
  const page = isGuide ? await getGuide(params.instance) : await getPage(params.slug, params.instance);
  const onThisPage = isGuide
    ? page?.content?.sections?.map((section: any) => ({
        heading: { headingType: "h2", title: section?._meta?.name },
        id: section.id,
      }))
    : page?.sections;

  return (
    <>
      <main className="w-full lg:w-3/4 xl:w-2/3 py-4 px-8">
        {isGuide ? (
          <article>
            <div className="text-3xl font-bold my-3">{page?.name}</div>
            <div className="whitespace-pre-wrap">{page?.notes}</div>
            <hr className="py-4 my-4" />
            {page?.content?.sections?.map((section: any) => (
              <div className="hh-guide" key={section.id} id={section.id}>
                <div className="flex">
                  <div className="text-sm my-3 mb-10 font-semibold mb-0 mr-1">{section?._meta?.name}</div>
                  <div className="text-sm my-3 mb-10 text-slate-500 mb-1 ">- {section?._meta?.description}</div>
                </div>
                <Section section={section} instanceId={params.instance} key={section.id} />
              </div>
            ))}
          </article>
        ) : (
          <article>
            {page?.sections.map((section: any) => (
              <Section section={section} instanceId={params.instance} key={section.id} />
            ))}
          </article>
        )}
        <PageFoot pageIdentifier={params.slug} instanceId={params.instance} />
      </main>
      <aside className="hidden xl:block xl:w-1/6 p-4">
        <OnThisPage page={{ sections: onThisPage }} />
      </aside>
    </>
  );
}

export interface NameValuePair {
  name: string;
  value: string;
}

export async function generateMetadata({ params }: IBody, parent: ResolvingMetadata): Promise<Metadata> {
  if (params.slug === "guide") return { title: "Guide", description: "Style Guide" };
  const page = await getPage(params.slug, params.instance);

  const parentMeta = await parent;
  const description = page?.content?.extendedProperties?.find((p: NameValuePair) => p.name === "description")?.value || parentMeta.description;
  const keywords = page?.content?.extendedProperties?.find((p: NameValuePair) => p.name === "keywords")?.value || parentMeta.keywords;
  const title = page?.content?.extendedProperties?.find((p: NameValuePair) => p.name === "title")?.value || page.title;
  const robots = page?.content?.extendedProperties?.find((p: NameValuePair) => p.name === "robots")?.value || "index, follow";

  return {
    title,
    description,
    keywords,
    robots,
  };
}

type IBody = { params: { slug: string; instance: string } };
