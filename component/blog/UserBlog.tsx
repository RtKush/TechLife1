"use client";
import { responseBlog, useGetUserBlogsQuery } from "@/features/blogs/blogsApi"; // your RTK query
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useAuth } from "@/hooks/userAuth";
import { isRTKError } from "@/types/rtkError.types";

const UserPosts = ({ id }: { id: string }) => {
  const { userAuth } = useAuth();

  const { data, isLoading, isError, error } = useGetUserBlogsQuery(id);

  const blogs = data?.data.blogs;
  const hasBlogs = blogs && blogs.length > 0;

  return (
    <div className=" bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-orange-600 mb-6">
          Your Posts....
        </h3>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-lg shadow border border-gray-100 p-4 space-y-4"
              >
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-lg"></div>

                {/* Title Placeholder */}
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* //Error State */}
        {isError && (
          <div className="min-h-1/2 flex items-center justify-center bg-gray-50">
            <p className="text-red-500 text-lg">
              {isRTKError(error) ? error.data.error : "Something went wrong"}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && !blogs?.length && (
          <p className="text-center text-gray-500">No posts available.</p>
        )}

        {/* Posts Grid */}
        {!isLoading && !isError && hasBlogs && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs?.map((post: responseBlog) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group relative rounded-xl overflow-hidden shadow border border-gray-200 hover:scale-[1.02] transition duration-200"
              >
                {/* Image */}
                {post.media?.[0].url ? (
                  <Image
                    src={post.media?.[0].url}
                    alt={post.title || "alt"}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}

                {/* Title */}
                <div className="p-4">
                  <p className="text-gray-800 font-semibold text-lg">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
