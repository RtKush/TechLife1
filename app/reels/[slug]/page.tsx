"use client";

import React from "react";
import { isAuthor } from "@/model/reels.model";
import { useParams } from "next/navigation";
import { useGetReelByIdQuery } from "@/features/reels/reelsApi";
import VideoCard from "@/component/reel/ReelCard";

export default function ReelPage() {
  const { slug } = useParams<{ slug: string }>();

  console.log("Slug: ", slug);

  const { data: reel, isLoading, error } = useGetReelByIdQuery(slug);
  console.log("Reels: ", reel);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Loading Reel...
      </div>
    );
  }

  if (error || !reel) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Reel not found.
      </div>
    );
  }
  const reelData = reel.data;

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden px-4 pb-10">
        <div className="w-full max-w-md">
          <VideoCard
            videoUrl={reelData.media?.url ?? ""}
            author={{
              avatar: isAuthor(reelData.authorId)
                ? reelData.authorId.avatar
                : "",
              userName: isAuthor(reelData.authorId)
                ? reelData.authorId.userName
                : "",
            }}
            title={reelData.title || ""}
            description={reelData.description ?? ""}
            likesCount={reelData.likes?.length ?? 0}
            slug={reelData._id?.toString()}
            // likedByMe={} // you can enhance this with your own current user logic
          />
        </div>
      </div>
    </div>
  );
}
