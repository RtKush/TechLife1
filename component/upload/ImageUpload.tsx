"use client";

import React, { useState, useRef } from "react";
import FileUploadBase from "./FileUploadBase";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onSuccess: (res: any) => void;
}

export default function ImageUpload({ onSuccess }: ImageUploadProps) {
  // State for selected file, preview image URL, upload state, upload progress, and error messages
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Ref to trigger file input programmatically if needed
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * 📦 Handle image file selection
   */
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB.");
      return;
    }

    // Set file, preview URL and state flags
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setUploading(true);
    setError(null);
    toast("Image upload started..");
  };

  /**
   * 📦 Remove selected image and reset all states
   */
  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploading(false);
    setProgress(0);
    setError(null);
    toast("Image removed ❌");
  };

  /**
   * 📦 Callback on successful upload
   */
  const handleSuccess = (res: any) => {
    onSuccess(res);
    setUploading(false);
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    toast.success("Image uploaded successfully..");
  };

  /**
   * 📦 Track upload progress percentage
   */
  const handleProgress = (value: number) => {
    setProgress(value);

    // Optional toast when nearing completion
    if (value === 100) {
      toast("Processing uploaded Image...");
    }
  };

  /**
   * 📦 Upload UI container
   */
  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-gray-400 transition">
      {/* Show preview image and remove button if a file is selected */}
      {previewUrl ? (
        <div className="relative w-full overflow-hidden rounded-lg">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full text-white hover:bg-gray-700"
          >
            <X size={18} />
          </button>

          {/* Show uploading indicator over image */}
          {uploading && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1">
              Uploading... {progress}%
            </div>
          )}
        </div>
      ) : (
        // 📦 Show upload prompt if no file selected
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Upload size={32} />
          <p className="text-sm">Drag & Drop or Click to Upload</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      )}

      {/* 📦 Show progress bar when uploading */}
      {uploading && (
        <div className="w-full max-w-xs flex flex-col gap-2 mt-2">
          <p className="text-sm text-gray-700">Uploading: {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 📦 Show error message if upload failed */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* 📦 Trigger actual upload with FileUploadBase */}
      {file && (
        <FileUploadBase
          file={file}
          onSuccess={handleSuccess}
          onProgress={handleProgress}
        />
      )}
    </label>
  );
}

/********************* FILE UPLOADING FLOW ********************
User selects file → handleChange() → calls FileUploadBase()
                    ↳ FileUploadBase starts upload
                      ↳ ImageKit calls onProgress()
                          ↳ You get % updates in your UI
                      ↳ When upload is done → onSuccess(res) is called

*/

/**
 * ✅ Why we pass `onSuccess` and `onProgress` to FileUploadBase?
 * 
 * - FileUploadBase doesn't return values — it runs upload logic and calls our
 *   `onSuccess` and `onProgress` functions during the process.
 * 
 * - This is called a "callback" pattern: we tell it "what to do when done".
 * 
 *   🔁 onProgress(progress: number) gets called continuously during upload
 *   ✅ onSuccess(res: any) gets called when upload is finished
 * 
 * - These functions are passed as props, not values.
 *   We're NOT passing the upload result — we're passing what to do when the result arrives.
 *
 * 💡 This makes FileUploadBase reusable for images, videos, forms, etc.
 * 
 A callback is a function you pass to another function/component so that it can call it later — typically when some async work (like upload) is done.
 */
