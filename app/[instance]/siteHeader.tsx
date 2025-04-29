"use client";

import { useState, useEffect } from "react";
import Search from "@/components/search";
import Image from "next/image";
import { Globals, Header, ProductionSlug } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { io } from "socket.io-client";
import { clearCache } from "../lib/api";

interface Common {
  globals: Globals;
  header: Header;
}

interface HeaderProps {
  common: Common;
  instanceId: string;
  clientConfig: { siteId: string };
}

const socket = io("https://api.headlesshost.com");

export default function SiteHeader({ common, instanceId, clientConfig }: HeaderProps) {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { globals, header } = common;
  const { links = [] } = globals?.content || {};
  const { smallLogo, largeLogo, links: headerLinks = [] } = header?.content || {};

  useEffect(() => {
    function onStageUpdated(values: any) {
      console.log("CMS Updated", values);
      if (values?.instanceId !== instanceId) {
        // Ignore updates from other instances
        return;
      }
      console.log("CMS Updated - clearing cache");
      if (values?.pageId) {
        clearCache(values.pageId);
      } else {
        clearCache(instanceId);
      }
    }
    function onPublish(values: any) {
      console.log("Site Published", values);
      if (instanceId === ProductionSlug) {
        console.log("Published - Clearing cache");
        clearCache(instanceId);
      }
    }
    socket.emit("ContentSite-Join", clientConfig.siteId);
    socket.on("StageUpdated", onStageUpdated);
    socket.on("Publish", onPublish);

    return () => {
      socket.emit("ContentSite-Leave", clientConfig.siteId);
      socket.off(clientConfig.siteId, onStageUpdated);
      socket.off(clientConfig.siteId, onPublish);
    };
  }, [clientConfig.siteId, instanceId]);

  const selectedCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-sky-500 before:bg-sky-500";
  const blankCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:left-0.5 before:top-1/2 before:h-0.5 before:w-1.5 before:-translate-y-1/2 text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-900 hover:before:block";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md shadow-slate-900/5 transition duration-500">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center space-x-8 justify-between px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button type="button" className="relative lg:hidden mr-3" aria-label="Open navigation" onClick={() => setShowNav(true)}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" className="h-6 w-6 stroke-slate-500">
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </button>
            <a aria-label="Home page" href="/">
              {largeLogo && largeLogo.url ? <Image className="h-7 hidden sm:block" src={largeLogo.url} alt={"Knowledgebase"} priority width={largeLogo.width} height={largeLogo.height} /> : <Image className="h-7 hidden sm:block" src="/logo.png" alt="Knowledgebase" priority width={257} height={30} />}
              {smallLogo && smallLogo.url ? <Image className="h-7 sm:hidden" src={smallLogo.url} alt={"Knowledgebase"} priority width={smallLogo.width} height={smallLogo.height} /> : <Image className="h-7 sm:hidden" src="/logo-sm.png" alt="Knowledgebase" priority width={30} height={22} />}
            </a>
            <nav className="hidden lg:flex lg:space-x-8 lg:ml-12 xl:ml-16">
              {headerLinks.map((link) =>
                link.slug?.startsWith("http") ? (
                  <a key={link.title} href={link.slug}>
                    {link.title}
                  </a>
                ) : (
                  <Link key={link.title} href={link.slug ?? ""} className="text-sm hover:text-sky-500 py-2.5 text-slate-900 font-display font-semibold">
                    {link.title}
                  </Link>
                )
              )}
            </nav>
          </div>
          <div className="flex items-center flex-1 justify-end">
            <Search instanceId={instanceId} navigation={links} />
          </div>
        </div>
      </header>

      {showNav && (
        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-slate-900/20 backdrop-blur z-50 transform transition">
          <div className="min-h-full w-full bg-white max-w-xs pt-7 pb-16 px-6 xl:pr-16">
            <div className="flex justify-end">
              <button type="button" className="inline-flex items-center justify-center text-slate-500 hover:text-sky-500 focus:outline-none" aria-expanded="false" onClick={() => setShowNav(false)}>
                <span className="sr-only">Toggle main menu</span>
                <svg className="hh-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentcolor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-9">
                {links.map((item) => (
                  <li key={item.group}>
                    <h2 className="font-display font-semibold text-slate-900">{item.group}</h2>
                    <ul className="mt-3 space-y-3">
                      {item.links?.map((child) => (
                        <li className="relative" key={child.slug}>
                          <Link className={pathname.endsWith(child.slug ?? "") ? selectedCss : blankCss} onClick={() => setShowNav(false)} href={`${child.slug}`}>
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
        </div>
      )}
    </>
  );
}
