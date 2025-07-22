"use client";

import React, { useState } from "react";
import FileUploadBase from "./FileUploadBase";
import { X, Upload } from "lucide-react";
import { toast } from "sonner"; // ✅ import toast

export default function VideoUpload({
  onSuccess,
}: {
  onSuccess: (res: any) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 🖼️ Preview + validation logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      toast.error("Please select a video file to upload");
      return;
    }

    if (!selectedFile.type.startsWith("video/")) {
      setError("Only video files are allowed.");
      toast.error("Only video files are allowed.");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      setError("Video must be less than 100MB.");
      toast.error("Video must be less than 100MB.");
      return;
    }

    // ✅ All good — start uploading
    setUploading(true);
    setError(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));

    // 📢 Notify user upload started
    toast("Video upload started 🚀");
  };

  // 📢 Called when upload finishes
  const handleSuccess = (res: any) => {
    onSuccess(res);
    setUploading(false);
    setProgress(0);
    setFile(null);
    toast.success("Video uploaded successfully ✅");
  };

  // 📢 Remove file / reset state
  const handleRemove = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
    setPreviewUrl(null);
    toast("Video removed ❌");
  };

  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-gray-400 transition">
      {/* If a video is selected — show preview */}
      {previewUrl ? (
        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg">
          <video
            src={previewUrl}
            muted
            controls
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full text-white hover:bg-gray-700"
          >
            <X size={18} />
          </button>

          {/* If uploading — show progress bar */}
          {uploading && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center text-xs py-1">
              Uploading... {progress}%
            </div>
          )}
        </div>
      ) : (
        // No file yet — show upload prompt
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Upload size={32} />
          <p className="text-sm">Drag & drop or click to upload</p>
          <input
            type="file"
            accept="video/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}

      {/* Upload component triggers actual upload */}
      {file && (
        <FileUploadBase
          file={file}
          onSuccess={handleSuccess}
          onProgress={(value: number) => {
            setProgress(value);

            // 📢 Optional: show progress at major milestones
            if (value === 100) {
              toast("Processing uploaded video...");
            }
          }}
        />
      )}

      {/* Show error message if any */}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </label>
  );
}
