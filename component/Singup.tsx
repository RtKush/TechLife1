"use client";

import { Eye, EyeOff, Loader2, LogIn, Mail, Lock } from "lucide-react";

import { useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/features/auth/authApi";
import SigninFormSkelton from "./skelton/SigninFormSkelton";
import { isRTKError } from "@/types/rtkError.types";

interface signupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const { register, reset, handleSubmit, watch } = useForm<signupForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const siginData: SubmitHandler<signupForm> = async (data) => {
    try {
      const res = await registerUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Registered successfully!");
      reset();
      router.push("/auth/login");
    } catch (error) {
      console.log("error: ", error);

      if (isRTKError(error)) toast.error(error.data.error);
      else toast.error("Something went wrong");
    }
  };

  const onError = async (errors: FieldErrors<signupForm>) => {
    if (errors.email?.message) toast.error(errors.email?.message);
    if (errors.password?.message) toast.error(errors.password?.message);
    if (errors.confirmPassword?.message)
      toast.error(errors.confirmPassword?.message);
  };

  const passwordValue = watch("password");

  if (isLoading) return <SigninFormSkelton />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-sm text-gray-500">Welcome to TechLife..</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(siginData, onError)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <Mail className="h-5 w-5 mx-3 text-gray-400" />
              <input
                type="email"
                placeholder="techlife@example.com"
                className="w-full p-3 outline-none"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <Lock className="h-5 w-5 mx-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full p-3 outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg overflow-hidden">
              <Lock className="h-5 w-5 mx-3 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-Enter Password"
                className="w-full p-3 outline-none"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="px-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-400 text-white py-3 rounded-lg hover:bg-cyan-700 transition"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogIn className="h-5 w-5" />
            )}
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-2 text-orange-600 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>

          {/* Google */}
          {/* <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <FaGoogle className="h-5 w-5" />
            Continue with Google
          </button> */}
        </form>

        {/* Already have account */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?   {" "}
          <a
            href="/auth/login"
            className="text-blue-900 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
