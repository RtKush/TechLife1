"use client";
import BlogForm, { BlogFormValues } from "@/component/blog/BlogForm";
import { useCreateBlogMutation } from "@/features/blogs/blogsApi";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function CreatePostPage() {
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const router = useRouter();

  const handleCreate = async (data: BlogFormValues) => {
    try {
      await createBlog(data).unwrap();
      localStorage.removeItem("blog-draft");
      toast.success("✅ Blog published!");
      setTimeout(() => {
        router.push("/blog");
      }, 1000);
    } catch {
      toast.error("❌ Failed to create blog");
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <BlogForm
          mode="create"
          onSubmit={handleCreate}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
}
