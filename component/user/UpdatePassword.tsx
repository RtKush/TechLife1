"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/userAuth";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { isRTKError } from "@/types/rtkError.types";

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

export default function UpdatePasswordForm() {
  const { userAuth } = useAuth();
  const userName = userAuth?.userName;

  const { register, handleSubmit, reset } = useForm<PasswordFormValues>();

  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation();

  const router = useRouter();

  const onSubmit = async (data: PasswordFormValues) => {
    if (!userName) return alert("User not authenticated!");

    try {
      const res = await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      reset();
      toast.success(res.message);
      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      reset();
      console.log("error: ", error);

      if (isRTKError(error)) toast.error(error.data.error);
      else toast.error("Something went wrong");
    }
  };

  const onError = (data: FieldErrors<PasswordFormValues>) => {
    if (data.newPassword?.message) toast.error(data.newPassword.message);

    if (data.oldPassword?.message) toast.error(data.oldPassword.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          🔐 Change Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 transition-all duration-300"
        >
          {/* Input Fields */}
          <div className="space-y-5">
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  placeholder="Enter your old password"
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message:
                        "New password must be at least 6 characters long",
                    },
                  })}
                  placeholder="Enter new password"
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-white bg-yellow-700 hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Change Password"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
