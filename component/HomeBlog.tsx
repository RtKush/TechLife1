"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getValidImageSrc, handleNativeShare } from "@/lib/Backend-helperFn";
import { useGetBlogByIDQuery } from "@/features/blogs/blogsApi";
import { Share2 } from "lucide-react";

interface imageDetail {
  type: string;
  url: string;
}
interface responseBlog {
  _id: string;
  title?: string;
  isPublished?: Boolean;
  summary?: string;
  authorId?: { userName?: string; _id?: string };
  slug?: string;
  media?: imageDetail[] | []; // for image only
  tags?: string[] | [];
  createdAt?: string;
  updatedAt?: string;
}
const HomeBlog = () => {
  const [posts, setPosts] = useState<responseBlog[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: blog1, isLoading: isLoading1 } = useGetBlogByIDQuery(
    "silent-chains-a-simple-look-at-womens-struggle-and-strength-sf9b"
  );
  const { data: blog3, isLoading: isLoading3 } = useGetBlogByIDQuery(
    "what-is-tor-browser-a-beginners-guide-to-online-anonymity-an-tgud"
  );
  const { data: blog2, isLoading: isLoading2 } = useGetBlogByIDQuery(
    "Men's-Mental-Health%3A-Battling-Loneliness-and-Silence-elhw"
  );

  const { data: blog4, isLoading: isLoading4 } = useGetBlogByIDQuery(
    "blind-followers-fake-saints-and-the-lost-essence-of-humanity-v5hm"
  );

  useEffect(() => {
    if (blog1?.data && blog2?.data && blog3?.data && blog4?.data) {
      setPosts([blog1?.data, blog3?.data, blog4?.data, blog2?.data]);
      setLoading(false);
    }
  }, [blog1, blog2, blog3, blog4]);

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4)
    return <p className="text-center text-gray-500 mt-8">Loading posts...</p>;
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-0">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Heading */}
        <div className="mb-1 text-center">
          <h2 className="text-3xl font-extrabold text-cyan-500 md:text-4xl">
            Join Community with TechLife.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-900 text-lg">
           Never Miss the Opportunity Stay Connected with People who is in Tech Field.
          </p>
        </div>

        {/* Posts Grid */}
        {!loading && (
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-2">
            {posts?.map((post: responseBlog) => (
              <article
                key={post._id}
                className="group flex flex-col rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300"
              >
                <Link
                  href={`/blog/${encodeURIComponent(post.slug || "")}`}
                  className="relative h-64 w-full"
                >
                  <Image
                    src={getValidImageSrc(post.media?.[0]?.url)}
                    alt={post?.title || "Blog image"}
                    fill
                    priority
                    className="object-cover object-center transition duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{new Date(post.createdAt || "").toDateString()}</span>
                    <span>By {post.authorId?.userName}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 leading-snug">
                    <Link
                      href={`/blog/${encodeURIComponent(post.slug ?? "")}`}
                      className="hover:text-rose-500 transition"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 line-clamp-3">{post.summary}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Link
                      href={`/blog/${encodeURIComponent(
                        post.slug ?? "default-slug"
                      )}`}
                      className="text-rose-500 font-semibold hover:text-rose-600 transition hover:scale-105"
                    >
                      Read more →
                    </Link>

                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition hover:scale-105"
                      onClick={() =>
                        handleNativeShare(
                          post.title ?? "Untitled Blog",
                          `${window.location.origin}/blog/${encodeURIComponent(
                            post.slug ?? "default-slug"
                          )}`
                        )
                      }
                    >
                      <Share2 size={18} />
                      Share{" "}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBlog;
