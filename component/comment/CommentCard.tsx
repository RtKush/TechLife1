"use client";

import Image from "next/image";
import React from "react";

interface CommentCardProps {
  name: string;
  time: string;
  message: string;
  avatarUrl: string;
  likes: number;
  onDelete: () => void;
  canDelete: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  name,
  time,
  message,
  avatarUrl,
  likes,
  onDelete,
  canDelete,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-gray-100 shadow-sm p-2 bg-gray-100 flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 relative">
        {/* If you have image later */}
        <Image
          src={
            avatarUrl || "https://ik.imagekit.io/thissidemayur/a1_IQta-C5YP.jpg"
          }
          alt={"image not found"}
          className="object-cover"
          fill
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <time className="text-xs text-green-400">
            {new Date(time).toLocaleString()}
          </time>
        </div>

        <p className="text-black-700 text-sm mb-3 leading-relaxed">{message}</p>

        <div className="flex items-center gap-3 text-sm">
          {/* <button className="border px-3 py-1 rounded-lg text-gray-600 hover:border-gray-400 transition">
            Reply
          </button> */}

          {canDelete && (
            <button
              onClick={onDelete}
              className="border px-3 py-1 rounded-lg text-red-500 hover:border-red-300 transition"
            >
              Delete
            </button>
          )}

          {/* <button className="flex items-center gap-1 group text-gray-600 hover:text-red-500 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 p-0.5 rounded-full group-hover:bg-red-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {likes}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
