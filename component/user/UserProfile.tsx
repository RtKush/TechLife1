"use client";

import { User, Edit, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetUserByIdQuery } from "@/features/auth/authApi";
import { isRTKError } from "@/types/rtkError.types";
import { handleNativeShare } from "@/lib/Backend-helperFn";

export default function UserProfile({ id }: { id: string }) {
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const user = data?.data;

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">
          {isRTKError(error) ? error.data.error : "Something went wrong"}
        </p>
      </div>
    );

  return (
    <div className=" bg-gray-50 py-4 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-8 space-y-8">
          {/* Top Row: Avatar + Username + Button */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg overflow-hidden">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <User size={56} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Username + Edit Button */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
                {user?.userName || "Unnamed User"}
              </h2>
              <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4  ">
                <Link
                  href="/profile/update-profile"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition text-center"
                >
                  <Edit size={16} />
                  Edit Profile
                </Link>

                <button
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border  text-gray-100 bg-gray-800 hover:bg-gray-200 hover:text-gray-800 transition text-center"
                  onClick={() =>
                    handleNativeShare(
                      user?.userName ?? "Untitled userName",
                      window.location.href
                    )
                  }
                >
                  {" "}
                  <Share2 size={18} />
                  Share{" "}
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <h4 className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Full Name
              </h4>
              <p className="text-gray-900 font-medium text-base">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Not Provided"}
              </p>
            </div>

            {/* Email */}
            <div>
              <h4 className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Email Address
              </h4>
              <p className="text-gray-800 text-sm">
                {user?.email || "Not Available"}
              </p>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Bio
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed break-words whitespace-pre-wrap">
                {user?.bio || "No bio added yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
