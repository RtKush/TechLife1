"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("blog");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!query) return;

    const res = await axios.get(`/api/search?q=${query}&type=${type}`);
    setResults(res.data.data);
    setShowResults(true);
  };
  console.log("API response ✅", results);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close results dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchRef}
      className="bg-white p-2  rounded-xl border border-gray-200 shadow-sm"
    >
      {/* Search input + type selector + button */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            // placeholder={`Search ${type}s...`}
             placeholder={`Search...`}
            className="w-full pl-10 pr-4 py-2.5 border border-orange-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-800"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded-lg py-2.5 px-3 text-gray-800 text-sm focus:ring-2 focus:ring-cyan-500"
        >
          <option className="text-sm" value="blog">
            Blogs
          </option>
          <option className="text-sm" value="user">
            User
          </option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg transition md:block hidden"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="mt-4 space-y-3 max-h-72 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-gray-500 text-center">No results found.</p>
          ) : (
            results.map((item: any) =>
              type === "blog" ? (
                <Link
                  key={item._id}
                  href={`/blog/${item.slug}`}
                  className="block border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 border">
                    {item.media &&
                    item.media.length > 0 &&
                    item.media[0].url ? (
                      <Image
                        width={8}
                        height={8}
                        alt="blog"
                        src={item.media[0].url}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <Image
                        width={8}
                        height={8}
                        alt="blog"
                        src="/default-image.png"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    )}
                    <p className="font-semibold text-sm text-gray-800">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{item.summary}</p>
                </Link>
              ) : (
                <Link
                  key={item._id}
                  href={`/profile/${item.userName}`}
                  className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  {item.avatar ? (
                    <Image
                      width={8}
                      height={8}
                      alt="blog"
                      src={item.avatar}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  ) : (
                    <Image
                      width={8}
                      height={8}
                      alt="blog"
                      src={item.userName || "unknown"}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  <p className="text-gray-800 font-medium">{item.userName}</p>
                </Link>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}
