"use server";
import { revalidateTag } from "next/cache";
import { Author, PagedResponse, ProductionSlug } from "./types";

export async function getClientConfig(): Promise<{ siteId: string }> {
  return {
    siteId: process.env.HEADLESSHOST_SITEID || "",
  };
}

async function getInstanceUrl(instanceId: string) {
  const siteInstance = instanceId && instanceId !== ProductionSlug ? `/instance/${instanceId}` : "";
  return `https://api.headlesshost.com/sites/${process.env.HEADLESSHOST_SITEID}${siteInstance}`;
}

function draftSiteExt(instanceId: string) {
  return instanceId === ProductionSlug && process.env.NODE_ENV !== "production" ? "/draft" : "";
}

export async function getAuthors(instanceId: string): Promise<PagedResponse<Author>> {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/catalogs/AUTHORS${draftSiteExt(instanceId)}`, { next: { tags: ["site", "catalogs", "authors"] } });
  if (res.status !== 200) throw new Error("Failed to fetch authors");
  return res.json();
}

export async function getGuide(instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/guide${draftSiteExt(instanceId)}`, { next: { tags: ["site", "guide"] } });
  if (res.status !== 200) throw new Error("Failed to fetch guide");
  return res.json();
}

export async function getMap(instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/map${draftSiteExt(instanceId)}`, { next: { tags: ["site", "map"] } });
  console.log(res);
  if (res.status !== 200) throw new Error("Failed to fetch map");
  return res.json();
}

export async function getCommon(instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/common${draftSiteExt(instanceId)}`, { next: { tags: ["site", "common"] } });
  if (res.status !== 200) throw new Error("Failed to fetch common");
  return res.json();
}

export async function getPage(page: string, instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/pages/${page}${draftSiteExt(instanceId)}`, { next: { tags: ["site", "pages", page] } });
  if (res.status !== 200) throw new Error("Failed to fetch page");
  return res.json();
}

export async function getSearchResults(term: string, instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/search${draftSiteExt(instanceId)}?text=${encodeURIComponent(term)}`, { cache: "no-store" });
  if (res.status !== 200) throw new Error("Failed to execute search");
  return res.json();
}

export async function clearCache(tag: string) {
  revalidateTag(tag);
}
