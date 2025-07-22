"use client";

import { useState, useEffect, useRef } from "react";
import { useGetReelQuery } from "@/features/reels/reelsApi";
import ReelLoader from "@/component/skelton/ReelLoader";
import NoReelFound from "@/component/reel/NoReelFound";
import ReelList from "@/component/reel/ReeList";
import { IVideo } from "@/types/Video.types";

export default function ReelFeed() {
  const [page, setPage] = useState(1);
  const [reels, setReels] = useState<IVideo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, isFetching } = useGetReelQuery({
    page,
    limit: 5,
  });

  // append new data when page changes
  useEffect(() => {
    if (data?.data) {
      setReels((prev) => [...prev, ...data.data]);
      setHasMore(data.hasMore);
    }
  }, [data]);

  // infinite scroll inside scrollable div
  useEffect(() => {
    const handleScroll = () => {
      if (
        feedRef.current &&
        feedRef.current.scrollTop + feedRef.current.clientHeight >=
          feedRef.current.scrollHeight - 500 &&
        !isFetching &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    const feedEl = feedRef.current;
    if (feedEl) {
      feedEl.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (feedEl) {
        feedEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isFetching, hasMore]);

  if (isLoading) return <ReelLoader />;
  if (isError) return <NoReelFound />;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div
        ref={feedRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        <ReelList reels={reels} />
        {isFetching && <ReelLoader />}
        {!hasMore && (
          <div className="text-gray-500 text-center py-6 text-sm">
            🚀 You’ve reached the end.
          </div>
        )}
      </div>
    </div>
  );
}
