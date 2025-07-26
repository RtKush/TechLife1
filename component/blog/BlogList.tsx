"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetBlogsQuery } from "@/features/blogs/blogsApi";
import { getValidImageSrc, handleNativeShare } from "@/lib/Backend-helperFn";
import { Share2 } from "lucide-react";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const { data, error, isLoading } = useGetBlogsQuery({
    page: currentPage,
    limit: postsPerPage,
  });

  const posts = data?.posts || [];
  const totalPages = data?.totalPages;
  const totalPosts = data?.totalPosts;

  return (
    <section className="bg-white py-5">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-orange-900">
            Explore TechLife World...
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-800">
            Explore a community-driven space where creators and thinkers share ideas, insights, and guides to inform, inspire, and ignite change.
          </p>
          <p className="text-sm text-blue-700 mt-2">
            Showing {posts?.length || 0} of {totalPosts} blogs
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: postsPerPage }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse space-y-4 rounded-lg border p-4"
              >
                <div className="h-48 bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 mt-8">Failed to load blogs</p>
        )}

        {/* Blog Grid */}
        {!isLoading && posts?.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-lg transition duration-300 bg-white"
              >
                <Link
                  href={`/blog/${encodeURIComponent(post.slug ?? "default")}`}
                  className="block relative h-60 overflow-hidden"
                >
                  <Image
                    src={getValidImageSrc(post.media?.[0]?.url)}
                    alt={post.title ?? "Blog image"}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="p-3 flex flex-col gap-0">
                  <div className="text-sm text-green-800 flex items-center justify-between">
                    <span>
                     
                     {post.createdAt && new Date(post.createdAt).toDateString()}

                    </span>
                    <span>By:-  @{post.authorId?.userName}</span>
                  </div>

                  <h3 className="p-1 text-2xl font-bold text-black-900 leading-snug">
                   <Link
                      href={`/blog/${encodeURIComponent(
                        post.slug ?? "default-slug"
                      )}`}
                      className="hover:text-blue-600 transition"
                    >
                      {post.title}
                    </Link>
                  </h3>

                   <p className="p-1 text-gray-700 text-[15px] leading-relaxed line-clamp-3">
                    : {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                   Tags:-  {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-300 px-3 py-1 text-xs font-medium text-blue-600"
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
                      className="text-green-500 font-semibold hover:text-blue-600 transition hover:scale-105"
                    >
                      Read more →
                    </Link>

                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-green-700 transition hover:scale-105"
                      onClick={() =>
                        handleNativeShare(
                          post.title ?? "Untitled Blog",
                          `${window.location.origin}/blog/${encodeURIComponent(
                            post.slug ?? "default-slug"
                          )}`
                        )
                      }
                    >
                      {" "}
                      <Share2 size={18} />
                      Share{" "}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && posts?.length > 0 && (
          <div className="flex flex-wrap justify-center mt-14 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-lg border border-gray-600 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
            >
              ← Previous
            </button>

            <span className="px-4 py-2 text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages ?? 1))
              }
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg border border-gray-600 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
