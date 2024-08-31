import { getMap } from "@/app/lib/api";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { instance: string } }) {
  const map = await getMap(params.instance);
  const hasPages = map?.content?.pages?.length > 0;
  if (hasPages) {
    redirect(`${params.instance}/${map.content?.pages[0]?.identifier}`);
  }
  return <div>There are currently no pages in this site.</div>;
}
