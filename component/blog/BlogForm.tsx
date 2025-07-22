"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import React, { useEffect } from "react";
import ImageUpload from "@/component/upload/ImageUpload";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { responseBlog } from "@/features/blogs/blogsApi";

export interface BlogFormValues {
  title: string;
  summary: string;
  content: string;
  tags: string[];
  image: string;
}

interface prop {
  mode: "create" | "edit";
  initialData?: responseBlog;
  isSubmitting?: boolean;
  onSubmit: (data: BlogFormValues) => void;
}

export default function BlogForm({
  mode,
  initialData,
  isSubmitting,
  onSubmit,
}: prop) {
  const { register, handleSubmit, setValue, watch, getValues, control, reset } =
    useForm<BlogFormValues>({
      defaultValues: {
        title: "",
        summary: "",
        content: "",
        tags: [],
        image: "",
      },
    });

  // ✅ Restore from localStorage for create
  useEffect(() => {
    if (mode === "create") {
      const storedDraft = localStorage.getItem("blog-draft");
      if (storedDraft) {
        const parsed = JSON.parse(storedDraft);
        reset(parsed);
      }
    }
  }, [mode, reset]);

  // ✅ Set initial data for edit
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData);
    }
  }, [mode, reset, initialData]);

  const saveDraft = () => {
    const data = getValues();
    if (data) {
      localStorage.setItem("blog-draft", JSON.stringify(data));
      toast.success("💾 Draft saved successfully!");
    }
  };

  const tags = watch("tags");

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (tags.includes(newTag)) {
        toast.error("Duplicate tags not allowed");
        return;
      }
      const updatedTags = [...(tags || []), newTag];
      setValue("tags", updatedTags);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = (tags || []).filter((tag) => tag !== tagToRemove);
    setValue("tags", updatedTags);
  };

  const onError = (errors: FieldErrors) => {
    if (errors.title) toast.error("Title is required!");
    if (errors.summary) toast.error("Summary is required!");
    if (errors.content) toast.error("Content cannot be empty.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="w-full max-w-7xl mx-auto bg-gray-50 flex flex-col md:flex-row p-4 md:p-6 gap-8">
        {/* Left Content Area */}
        
        <div className="w-full max-w-7xl mx-auto md:w-3/4 space-y-8">
          {/* Title */}
          <div>
             <label
               htmlFor="title"
               className="block text-3xl font-semibold text-cyan-700 mb-5 text-center mx-auto"
>
                Fill Below Details CareFully...
                </label>

            
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-800 mb-2 ml-2"
>
              Post Title
               </label>

            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter your blog post title"
              className="w-full max-w-7xl mx-auto border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 transition"
            />
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="summary"
              className="block text-lg font-semibold text-gray-800 mb-2 ml-2"
            >
              Short Summary
            </label>
            <input
              id="summary"
              type="text"
              {...register("summary", { required: true })}
              placeholder="A quick description for your post"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-lg font-semibold text-gray-800 mb-2 ml-2"
            >
              Tags (Press Enter to add more)
            </label>
            <input
              id="tags"
              type="text"
              onKeyDown={handleTagInput}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 transition"
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

          {/* Rich Text Editor */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2 ml-2">
              Post Content
            </label>
            <div className="border border-gray-300 rounded-lg p-2 bg-white max-h-[300px] overflow-y-auto">
              <Controller
                control={control}
                name="content"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <SimpleEditor
                    value={value}
                    onChange={(html) => {
                      onChange(html); // <-- updates RHF value live
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full max-w-7xl mx-auto md:w-1/4 space-y-8 mt-22">
          <div className="border border-dashed border-neutral-300 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              🖼️ Upload Cover Image
            </h3>
            <ImageUpload onSuccess={(res) => setValue("image", res.url)} />
            {watch("image") && (
              <div className="w-full max-w-7xl mx-auto mt-4">
                <img
                  src={watch("image")}
                  alt="Uploaded"
                  className="rounded shadow w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-1 right-80 bg-white border-t border-gray-200 z-50">
  <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:justify-center items-center p-4 gap-4 shadow-sm text-center">
    <div className="flex gap-3 md:w-auto">
      <button
        type="button"
        onClick={saveDraft}
        className="flex-1 md:flex-none bg-gray-300 text-gray-800 font-medium py-2 px-5 rounded-lg hover:bg-gray-200 transition"
      >
        💾 Save as Draft
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex-1 md:flex-none ${
          isSubmitting
            ? "bg-cyan-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-cyan-300"
        } text-white font-medium py-2 px-5 rounded-lg transition`}
      >
        {mode === "create" ? "Publish" : "Update"}
      </button>
    </div>
  </div>
</div>
    </form>
  );
}
