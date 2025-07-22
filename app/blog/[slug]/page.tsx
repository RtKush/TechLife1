"use client";

import BlogPage from "@/component/blog/BlogPage";
import RecentPosts from "@/component/blog/BlogRecent";
import { useParams } from "next/navigation";

export default function Page() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <BlogPage slug={slug} />
      <RecentPosts />
    </div>
  );
}
