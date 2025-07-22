"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
} from "@/features/auth/authApi";
import { User, Mail, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/userAuth";
import Image from "next/image";
import ImageUpload from "../upload/ImageUpload";
import { setUser } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { isRTKError } from "@/types/rtkError.types";

interface formData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  bio: string;
  avatar: string;
}

export default function UpdateProfile() {
  const router = useRouter();
  const { userAuth } = useAuth();
  const shouldFetch = Boolean(userAuth?.id);
  const { update } = useSession();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const {
    data,
    isLoading,
    refetch: refetchUser,
  } = useGetUserByIdQuery(userAuth?.userName || "", {
    skip: !shouldFetch,
    refetchOnMountOrArgChange: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      bio: "",
      avatar: "",
    },
  });

  // Load initial user data into form
  useEffect(() => {
    if (data) {
      reset({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        userName: data.data.userName,
        bio: data.data.bio,
        avatar: data.data.avatar,
      });
    }
  }, [data, reset]);

  const dispatch = useDispatch();

  const submitFormData = async (formData: formData) => {
    try {
      const res = await updateProfile(formData).unwrap();
      // Immediately refetch the latest user profile after update
      const latestUser = await refetchUser().unwrap();
      const latestUserData = latestUser?.data;
      if (!latestUserData?._id) throw new Error("Missing user id");
      // Update NextAuth session JWT values too
      await update({
        userName: latestUserData.userName,
        avatar: latestUserData.avatar,
        bio: latestUserData.bio,
      });
      dispatch(
        setUser({
          id: latestUserData?._id?.toString(),
          userName: latestUserData.userName,
          email: latestUserData.email,
          avatar: latestUserData.avatar,
          bio: latestUserData.bio,
        })
      );
      toast.success(res.message);
      setTimeout(() => {
        router.push(`/profile/${formData.userName}`);
      }, 1000);
    } catch (error) {
      console.log("error: ", error);

      if (isRTKError(error)) toast.error(error.data.error);
      else toast.error("Something went wrong");
    }
  };

  if (!shouldFetch)
    return <p className="text-center mt-10">Loading user info...</p>;
  if (isLoading)
    return <p className="text-center mt-10">Fetching profile data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>

        <form
          onSubmit={handleSubmit(submitFormData)}
          className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Profile Image Upload */}
          <div className="flex items-center gap-5">
            {data?.data?.avatar ? (
              <div className="relative w-28 h-28">
                <Image
                  src={data.data.avatar}
                  alt="Profile Preview"
                  fill
                  className="rounded-full object-cover border border-gray-300"
                />
              </div>
            ) : (
              <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-full border border-gray-300">
                <User size={40} className="text-gray-400" />
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-700">
                Change Profile Image
              </p>
              <ImageUpload
                onSuccess={(url: string) => setValue("avatar", url)} // just URL
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputWithIcon
              icon={<User size={18} className="text-gray-500" />}
              placeholder="First Name"
              register={register("firstName")}
            />
            <InputWithIcon
              icon={<User size={18} className="text-gray-500" />}
              placeholder="Last Name"
              register={register("lastName")}
              error={errors.lastName}
            />
            <InputWithIcon
              icon={<Mail size={18} className="text-gray-500" />}
              placeholder="Email"
              register={register("email")}
            />
            <InputWithIcon
              icon={<UserCircle size={18} className="text-gray-500" />}
              placeholder="Username"
              register={register("userName")}
            />
          </div>

          <TextareaWithLabel
            label="Bio"
            register={register("bio")}
            error={errors.bio}
            placeholder="Write a short bio about yourself..."
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-green-900 text-white hover:bg-black/90 transition disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputWithIcon = ({
  icon,
  placeholder,
  type = "text",
  register,
  error,
}: any) => (
  <div className="flex flex-col">
    <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-black">
      {icon}
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none ml-2"
      />
    </div>
    {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
  </div>
);

const TextareaWithLabel = ({
  label,
  register,
  error,
  rows = 4,
  placeholder,
}: any) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      {...register}
      rows={rows}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black text-gray-800 placeholder-gray-400 text-sm resize-none"
    />
    {error && <p className="text-xs text-red-600 mt-1">{error.message}</p>}
  </div>
);
