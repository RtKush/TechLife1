"use client";

import { useLikeBlogMutation } from "@/features/blogs/blogsApi";
import { useAuth } from "@/hooks/userAuth";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

type Props = {
  slug: string;
  likes: number;
  liked: boolean;
};

export default function LikeButton({ slug, likes, liked }: Props) {
  const { isAuthenticated } = useAuth();

  const [likeBlog, { isLoading }] = useLikeBlogMutation();

  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    setLikeCount(likes);
    setIsLiked(liked);
  }, [likes, liked]);

  const toggleLike = async () => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to like this post.");

      return;
    }

    try {
      await likeBlog(slug).unwrap();
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Failed to toggle like: ", err);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={isLoading}
      className="flex items-center gap-1 px-3 py-2 rounded-full transition duration-200"
    >
      <div
        className={`p-1 rounded-full transition-colors duration-200 ${
          isLiked ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"
        }`}
      >
        <Heart
          size={20}
          fill={isLiked ? "#f43f5e" : "none"} // this fills actual icon background
          className="transition duration-200"
        />
      </div>

      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          isLiked ? "text-red-500" : "text-gray-600"
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
}
