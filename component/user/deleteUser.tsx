"use client";

import { Lock, Trash2, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDeleteUserMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { isRTKError } from "@/types/rtkError.types";

type FormValues = {
  password: string;
};

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteAccount, { error, isLoading }] = useDeleteUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await deleteAccount({ password: data.password }).unwrap();
      reset();
      toast.success(res.message);
      dispatch(logout());
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.log("error: ", error);

      if (isRTKError(error)) toast.error(error.data.error);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-5">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Delete Account
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
            This action is{" "}
            <span className="font-semibold text-red-600">permanent</span> and
            cannot be undone. Please enter your password to confirm.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 transition">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Trash2 size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
            <p className="text-sm text-yellow-700 leading-relaxed">
              Deleting your account will permanently erase all your profile
              information, preferences, and associated data. This cannot be
              reversed.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 transition focus:ring-2 focus:ring-red-500 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Account"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
