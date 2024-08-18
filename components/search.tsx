"use client";

import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { debounce } from "@/app/lib/debounce";
import { getSearchResults } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { LinkGroup } from "@/app/lib/types";

interface SearchResult {
  sectionId: string;
  pageId: string;
  pageName: string;
  propertyTrimmed: string;
}

export default function Search({ instanceId, navigation }: { instanceId: string; navigation: LinkGroup[] }) {
  const router = useRouter();
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const pageIds = Array.from(new Set(searchResults.map((s) => s.pageId)));
  const pageGroups = navigation.filter((n) => pageIds.find((id) => n.links?.find((c) => c.slug === id)));

  const debouncedUpdate = useCallback(
    debounce((nextValue: string) => setDebouncedValue(nextValue), 500),
    []
  );

  useEffect(() => {
    if (debouncedValue.length > 3) {
      const fetchResults = async () => {
        const results = await getSearchResults(debouncedValue, instanceId);
        setSearchResults(results);
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [debouncedValue, instanceId]);

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debouncedUpdate(event.target.value);
  };

  const searchItemClicked = (searchResult: SearchResult) => {
    setSearchResults([]);
    setDebouncedValue("");
    setSearchValue("");
    router.push(`${searchResult.pageId}#${searchResult.sectionId}`);
  };

  return (
    <div className="w-full md:w-72 xl:w-[500px]">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input id="search" value={searchValue} onChange={handleChange} name="search" data-minchars="1" data-maxitems="30" className="block w-full rounded-md border-0 bg-white py-2.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-300 sm:text-sm sm:leading-6" placeholder="Search" type="search" />

          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 border border-slate-300 rounded-md shadow-lg bg-slate-300 overflow-y-auto max-h-[calc(100vh-100px)]">
              {pageGroups.map((pageGroup) => {
                const filteredPageIds = pageIds.filter((id) => pageGroup.links?.find((c) => c.slug === id));
                return (
                  <div className="p-6 rounded-lg bg-white m-2" key={pageGroup.group}>
                    <div className="font-display font-semibold text-slate-900">{pageGroup.group}</div>
                    <hr className="my-2 border-slate-300" />
                    {filteredPageIds.map((p) => {
                      const pageResults = searchResults.filter((r) => r.pageId === p);
                      return (
                        <React.Fragment key={p}>
                          <div className="font-display font-semibold text-slate-900 ms-3 pt-3">{pageResults.length > 0 && pageResults[0].pageName}</div>
                          <ul className="py-1">
                            {pageResults.map((item, i) => (
                              <li key={i} className="cursor-pointer px-4 py-1 text-slate-900 hover:bg-slate-100 sm:text-sm" onClick={() => searchItemClicked(item)} dangerouslySetInnerHTML={{ __html: item.propertyTrimmed }}></li>
                            ))}
                          </ul>
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
