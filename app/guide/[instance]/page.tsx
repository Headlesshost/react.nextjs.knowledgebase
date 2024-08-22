import Section from "@/components/section";
import { getGuide } from "@/app/lib/api";
import OnThisPage from "@/components/onThisPage";

export default async function Guide({ params }: { params: { instance: string } }) {
  const guide = await getGuide(params.instance);
  const onThisPage = guide?.content?.sections?.map((section: any) => ({
    title: section?._meta?.name,
    headingType: "h2",
    id: section.id,
  }));

  return (
    <>
      <main className="w-full lg:w-3/4 xl:w-2/3 py-4 px-8">
        <article>
          <div className="text-3xl font-bold my-3">{guide?.name}</div>
          <div className="whitespace-pre-wrap">{guide?.notes}</div>
          <hr className="py-4 my-4" />
          {guide?.content?.sections?.map((section: any) => (
            <div className="hh-guide" key={section.id} id={section.id}>
              <div className="flex">
                <div className="text-sm my-3 mb-10 font-semibold mb-0 mr-1">{section?._meta?.name}</div>
                <div className="text-sm my-3 mb-10 text-slate-500 mb-1 ">- {section?._meta?.description}</div>
              </div>
              <Section section={section} instanceId={params.instance} key={section.id} />
            </div>
          ))}
        </article>
      </main>
      <aside className="hidden xl:block xl:w-1/6 p-4">
        <OnThisPage page={{ sections: onThisPage }} />
      </aside>
    </>
  );
}
