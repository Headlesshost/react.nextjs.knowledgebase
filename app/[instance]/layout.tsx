import type { Metadata } from "next";
import LeftNav from "@/components/leftNav";
import SiteHeader from "./siteHeader";
import SiteFooter from "./siteFooter";
import { getMap, getCommon, getClientConfig } from "@/app/lib/api";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { instance: string } }) {
  const common = await getCommon(params.instance);
  const map = await getMap(params.instance);
  const clientConfig = await getClientConfig();

  return map?.content?.pages?.length > 0 ? (
    <>
      <SiteHeader common={common} instanceId={params.instance} clientConfig={clientConfig} />
      <div className="container mx-auto flex flex-wrap max-w-7xl justify-center px-4 pt-6">
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/6">
          <LeftNav globals={common?.globals} instanceId={params.instance} />
        </aside>
        {children}
      </div>
      <SiteFooter />
    </>
  ) : (
    <div className="m-12">
      <div className={`rounded-2xl p-6 bg-blue-50`}>
        <p className="font-display text-xl text-yellow-900 mt-0 mb-2.5">Connection Successful</p>
        <div className={`text-black-800`}>
          <p className="whitespace-pre-wrap">You have connected to the content site successfully but there are no pages. Add a page in Headlesshost and then refresh this page.</p>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Knowledgebase",
  description: "Knowledgebase",
};
