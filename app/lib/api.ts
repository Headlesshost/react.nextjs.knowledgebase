"use server";
import { revalidateTag } from "next/cache";
import { Author, PagedResponse, ProductionSlug } from "./types";

export async function getClientConfig(): Promise<{ siteId: string }> {
  return {
    siteId: process.env.HEADLESSHOST_SITEID || "",
  };
}

async function getInstanceUrl(instanceId: string) {
  const res = await fetch(`https://api.headlesshost.com/sites/${process.env.HEADLESSHOST_SITEID}/list`, { next: { tags: [instanceId, "list"] } });
  if (res.status !== 200) throw new Error("Failed to fetch site list");
  const siteList = await res.json();

  if (!siteList.publishedSites || !siteList.stagingSites) {
    throw new Error("Invalid site list response", siteList);
  }

  if (instanceId === ProductionSlug && siteList?.publishedSites?.length > 0) {
    return `https://api.headlesshost.com/sites/${process.env.HEADLESSHOST_SITEID}`;
  }

  const siteIds = [...siteList?.publishedSites?.map((site: any) => site.id), ...siteList?.stagingSites?.map((site: any) => site.id)];

  if (siteIds.includes(instanceId)) {
    return `https://api.headlesshost.com/sites/${process.env.HEADLESSHOST_SITEID}/instance/${instanceId}`;
  }

  const headStaging = siteList?.stagingSites?.find((site: any) => site.isHead);
  return `https://api.headlesshost.com/sites/${process.env.HEADLESSHOST_SITEID}/instance/${headStaging.id}`;
}

export async function getAuthors(instanceId: string): Promise<PagedResponse<Author>> {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/catalogs/AUTHORS`, { next: { tags: [instanceId, "catalogs", "authors"] } });
  if (res.status !== 200) throw new Error("Failed to fetch authors");
  return res.json();
}

export async function getGuide(instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/guide`, { next: { tags: [instanceId, "guide"] } });
  if (res.status !== 200) throw new Error("Failed to fetch guide");
  return res.json();
}

export async function getMap(instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/map`, { next: { tags: [instanceId, "map"] } });
  if (res.status !== 200) throw new Error("Failed to fetch map");
  return res.json();
}

export async function getCommon(instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/common`, { next: { tags: [instanceId, "common"] } });
  if (res.status !== 200) throw new Error("Failed to fetch common");
  return res.json();
}

export async function getPage(page: string, instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/pages/${page}`, { next: { tags: [instanceId, "pages", page] } });
  if (res.status !== 200) throw new Error("Failed to fetch page");
  return res.json();
}

export async function getSearchResults(term: string, instanceId: string) {
  const res = await fetch(`${await getInstanceUrl(instanceId)}/search?text=${encodeURIComponent(term)}`, { cache: "no-store" });
  if (res.status !== 200) throw new Error("Failed to execute search");
  return res.json();
}

export async function clearCache(tag: string) {
  revalidateTag(tag);
}
