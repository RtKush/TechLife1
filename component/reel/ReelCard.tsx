"use client";

import { useLikeReelMutation } from "@/features/reels/reelsApi";
import { getValidImageSrc, handleNativeShare } from "@/lib/Backend-helperFn";
import { Heart, Share2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  videoUrl: string;
  thumbnailUrl?: string;
  author: {
    avatar: string;
    userName: string;
  };
  title: string;
  description: string;
  likesCount?: number;
  commentsCount?: number;
  slug: string;
  likedByMe?: boolean;
};

export default function VideoCard({
  videoUrl,
  thumbnailUrl,
  author,
  title,
  description,
  likesCount = 0,
  commentsCount = 0,
  slug,
  likedByMe = false,
}: Props) {
  const [reelLike] = useLikeReelMutation();
  const [isLiked, setIsLiked] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleLike = async () => {
    try {
      console.log("slug: ", typeof slug);
      const res = await reelLike(slug?.toString()).unwrap();
      console.log("Like API response:", res);

      setIsLiked(res.liked);
      setLikeCount(res.likesCount);
    } catch (err) {
      console.log("Error liking reel:", err);
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center bg-black overflow-hidden h-screen">
      {/* Video Card */}
      <div className="relative h-[90vh] md:h-[80vh] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Right Action Buttons */}
        <div className="absolute right-3 top-1/2 flex flex-col items-center gap-6 -translate-y-1/2 z-10">
          <button
            onClick={handleLike}
            aria-label="Like"
            className="flex flex-col items-center text-white hover:scale-110 transition duration-200"
          >
            <Heart
              fill={isLiked ? "#ef4444" : "none"}
              className={`w-7 h-7 transition ${
                isLiked ? "text-red-500" : "text-white"
              }`}
            />
            <span className="text-xs">{likeCount}</span>
          </button>

          <button
            onClick={() =>
              handleNativeShare(
                title ?? "Untitled Reel",
                `${window.location.origin}/reels/${encodeURIComponent(
                  slug ?? "default-slug"
                )}`
              )
            }
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 text-zinc-100 hover:bg-blue-400 hover:scale-110 transition duration-300 shadow-sm"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Author Info & Description */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Image
              src={getValidImageSrc(author.avatar)}
              alt={`${author.userName} avatar`}
              width={42}
              height={42}
              className="rounded-full w-11 h-12 border border-white object-cover"
            />
            <Link
              href={`/profile/${author.userName}`}
              className="font-semibold text-white text-sm hover:underline"
            >
              {author.userName}
            </Link>
          </div>

          <p
            onClick={() => setShowOverlay(true)}
            className="text-white text-sm max-w-[240px] line-clamp-2 cursor-pointer hover:text-gray-200 transition"
          >
            {description}
          </p>
        </div>
      </div>

      {/* Overlay Description Drawer */}
      <div
        className={`absolute inset-x-0 bottom-0 w-full h-[60%] bg-black/90 backdrop-blur-lg rounded-t-2xl p-5 flex flex-col gap-5 overflow-hidden z-20 transition-all duration-300 ${
          showOverlay
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={getValidImageSrc(author.avatar)}
            alt={`${author.userName} avatar`}
            width={48}
            height={48}
            className="rounded-full h-12 border border-white object-cover w-12"
          />
          <Link
            href={`/profile/${author.userName}`}
            className="font-semibold text-white text-base truncate hover:underline"
          >
            {author.userName}
          </Link>
          <button
            onClick={() => setShowOverlay(false)}
            className="ml-auto text-gray-300 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 text-white text-sm">
          <h3 className="text-base font-medium mb-3 truncate">{title}</h3>
          <p className="whitespace-pre-wrap leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
