"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout as logoutDis } from "@/features/auth/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await signOut();

    toast.success("Logout successful");

    dispatch(logoutDis());

    setTimeout(() => {
      router.push("/");
    }, 800); // small delay to let toast render
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
    >
      Logout
    </button>
  );
}
