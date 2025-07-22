"use client";

import { useRef } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateReelMutation } from "@/features/reels/reelsApi";
import VideoUpload from "../upload/VideoUpload";
import { isRTKError } from "@/types/rtkError.types";

type UploadFormValues = {
  title: string;
  description: string;
  tags: string[];
  url: string;
};

export default function UploadReelForm() {
  const [createReel, { isLoading }] = useCreateReelMutation();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<UploadFormValues>({
      defaultValues: {
        title: "",
        description: "",
        tags: [],
        url: "",
      },
    });

  const tags = watch("tags");
  const videoUrl = watch("url");

  const onSubmit = async (data: UploadFormValues) => {
    try {
      const res = await createReel({
        title: data.title,
        tags: data.tags,
        description: data.description,
        videoUrl: data.url,
      }).unwrap();

      toast.success("🎉 Reel uploaded successfully!");
      reset();
      router.push("/reels");
    } catch (error: unknown) {
      console.log("error: ", error);

      if (isRTKError(error)) toast.error(error.data.error);
      else toast.error("Something went wrong");
    }
  };

  const onError = (errors: FieldErrors<UploadFormValues>) => {
    if (errors.title) toast.error("📝 Title is required!");
    if (errors.url) toast.error("📹 Video is required!");
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (tags.includes(newTag)) {
        toast.error("Duplicate tags not allowed");
        return;
      }
      setValue("tags", [...tags, newTag]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="w-full max-w-lg mx-auto p-6 bg-gray-50 rounded-2xl border border-gray-300 shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        📤 Upload New Reel
      </h2>

      {/* Video Upload */}
      <VideoUpload onSuccess={(res) => setValue("url", res.url)} />

      {/* Title */}
      <div>
        <label className="text-gray-800 text-sm mb-1 block">Title</label>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Enter title"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-gray-800 text-sm mb-1 block">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Add a short description..."
          maxLength={300}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
        />
        <div className="text-right text-gray-600 text-xs mt-1">
          {watch("description")?.length || 0}/300
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="text-gray-800 text-sm mb-1 block">
          🏷️ Tags (press Enter to add)
        </label>
        <input
          type="text"
          onKeyDown={handleTagInput}
          placeholder="Add tags like fitness, tutorial..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 transition"
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center bg-gray-200 text-sm px-3 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-600 hover:text-red-500"
                >
                  ✖
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full ${
          videoUrl
            ? "bg-cyan-600 hover:bg-cyan-700"
            : "bg-cyan-300 cursor-not-allowed"
        } text-white font-medium py-3 rounded-lg transition`}
        disabled={!videoUrl}
      >
        {isLoading ? "Uploading..." : "Upload Reel"}
      </button>
    </form>
  );
}
