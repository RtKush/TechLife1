"use client";
import {
  useGetBlogByIDQuery,
  useDeleteBlogMutation,
} from "@/features/blogs/blogsApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { useAuth } from "@/hooks/userAuth";
import LikeButton from "../LikeButton";
import CommentForm from "../comment/CommentForm";
import { toast } from "sonner";
import { getValidImageSrc, handleNativeShare } from "@/lib/Backend-helperFn";
import CommentList from "../comment/CommentList";
import { Share2 } from "lucide-react";

interface Props {
  slug: string;
}

export default function BlogPage({ slug }: Props) {
  const { userAuth, isAuthenticated } = useAuth();

  const router = useRouter();
  const decodedSlug = decodeURIComponent(slug);
  const { data: post, error, isLoading } = useGetBlogByIDQuery(decodedSlug);
  const [deleteBlog] = useDeleteBlogMutation();

  if (isLoading)
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;

  if (error) {
    console.log("error: ", error);
    return (
      <p className="text-center text-red-500 mt-20">Blog is not Present</p>
    );
  }

  if (!post) {
    // Client redirect to 404 or show message
    router.push("/404");
    return null;
  }

  const blog = post.data;
  const sanitizedContent = sanitizeHtml(blog.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "u",
    ]),
    allowedAttributes: {
      a: ["href", "name", "target"],
      img: ["src", "alt", "width", "height"],
    },
  });

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      if (userAuth?.id === blog.authorId?._id) {
        if (!blog.slug) return;

        await deleteBlog(blog.slug);
        toast.success("Post deleted successfully 🗑️");

        router.push("/blog"); // or home
      } else {
        toast("Delete cancelled ❌", {
          action: {
            label: "undo",
            onClick: () => toast("Deletion undo not supported yet"),
          },
        });
      }
    }
  };

  const handleCommentAdded = () => {};
  const handleEdit = () => {
    toast("Edit mode enabled ✏️", {
      description: "You can now make changes to your post.",
    });
    router.push(`/edit-blog?id=${blog.slug}`);
  };

  const userId = userAuth?.id;
  const blogId = post?.data._id;

  // const hasLiked = post?.data.likes?.includes(userId);

  if (!post?.data?._id) return <p>Blog not found</p>;

  return (
    <main className="bg-white min-h-screen pt-28 pb-16">
      <article className="mx-auto max-w-4xl px-6">
        {/* Meta */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
          
            {blog.createdAt &&
  new Date(blog.createdAt).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  })}

          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl leading-tight">
            {blog.title}
          </h1>

          {/* Top Action Buttons */}
          <div className="max-w-4xl mx-auto md:px-6 flex justify-between  pt-8">
            <button
              className="flex items-center gap-2 px-1.5  md:px-3 md:py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition hover:scale-105"
              onClick={() =>
                handleNativeShare(
                  blog.title ?? "Untitled Blog",
                  window.location.href
                )
              }
            >
              {" "}
              <Share2 size={18} />
              Share{" "}
            </button>

            <div className="flex gap-3 justify-end">
              <p className="mt-4 text-base text-gray-600 italic">
                by {blog.authorId?.userName}
                <span className="font-medium text-gray-800"></span>
              </p>

              {/* Like Button */}
              <LikeButton
                slug={blog.slug ?? ""}
                likes={post?.data.likes?.length ?? 0}
                liked={
                  userId
                    ? (post?.data.likes as string[])?.includes(userId)
                    : false
                }
              />

              {/* Show Edit + Delete only for author */}
              {userAuth?.id === blog.authorId?._id && (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 bg-gray-100 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-1 bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition"
                  >
                    🗑️ Delete
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            {blog.summary}
          </p>

          {/* Tags */}
          {blog.tags && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image */}

        <div className="mt-10 w-full relative h-64 sm:h-80 md:h-[400px]">
          <Image
            src={getValidImageSrc(blog.media?.[0].url)}
            alt={blog.title || "Blog image"}
            fill
            priority
            className="object-cover rounded-xl shadow-m"
          />
        </div>

        {/* Content */}
        <div
          className="mt-12 prose prose-neutral max-w-none text-lg leading-loose text-gray-800 font-serif"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>

      {/* Separator */}
      <div className="w-fit mx-auto mt-16 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      {/* comments */}
      <div>
        <CommentForm blogId={blogId} onCommentAdded={handleCommentAdded} />
        <CommentList blogId={blogId} />
      </div>
    </main>
  );
}
