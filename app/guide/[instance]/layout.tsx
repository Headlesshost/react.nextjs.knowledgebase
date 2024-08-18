import SiteFooter from "../../[instance]/siteFooter";
import SiteHeader from "../../[instance]/siteHeader";
import LeftNav from "@/components/leftNav";
import { getCommon, getClientConfig } from "../../lib/api";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { instance: string } }) {
  const common = await getCommon(params.instance);
  const clientConfig = await getClientConfig();
  return (
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
  );
}
