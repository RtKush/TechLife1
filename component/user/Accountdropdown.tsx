"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  User,
  CircleUserRound,
  KeyRound,
  Package,
  LogOut,
  UserX,
  Image as ImageIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import Link from "next/link";
import { AppDispatch } from "@/lib/store";
import { signOut } from "next-auth/react";
import { useAuth } from "@/hooks/userAuth";
import Image from "next/image";
import { getValidImageSrc } from "@/lib/Backend-helperFn";
interface AccountDropdownProps {
  identifier?: string;
  userName?: string;
  userImg?: string | null;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

export default function AccountDropdown({
  identifier = "user@example.com",
  userName = "User",
  userImg = null,
}: AccountDropdownProps) {
  const { userAuth } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!dropdown.current || !trigger.current) return;

      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  // Close if Esc is pressed
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!dropdownOpen || e.key !== "Escape") return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  const menuItems: MenuSection[] = [
    {
      section: "Profile",
      items: [
        {
          icon: CircleUserRound,
          label: "View Profile",
          path: `/profile/${userAuth?.userName}`,
        },
        {
          icon: KeyRound,
          label: "Update Password",
          path: "/profile/update-password",
        },
      ],
    },
    {
      section: "User Resource",
      items: [
        { icon: Package, label: "All-Blogs", path: "/blog" },
        // { icon: Package, label: "All-Reels", path: "/reels" },
      ],
    },
    {
      section: "Account Settings",
      items: [
        {
          icon: ImageIcon,
          label: "Update Profile",
          path: "/profile/update-profile",
        },
        {
          icon: UserX,
          label: "Delete Account",
          path: "/profile/delete-account",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await signOut({ callbackUrl: "/" }); // clear NextAuth JWT session and redirect to homepage
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      >
        {userAuth?.avatar ? (
          <Image
            width={36}
            height={36}
            src={getValidImageSrc(userAuth?.avatar)}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <User size={24} className="text-gray-800" />
        )}
        <span className="hidden md:block text-sm font-medium">{"Profile"}</span>
        <svg
          className={`transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2 5L8 11L14 5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        ref={dropdown}
        className={`absolute right-0 mt-3 w-72 max-w-[90vw] md:w-72 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden transition-all duration-200 z-50 ${
          dropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Profile Info */}
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-300">
              {userAuth?.avatar ? (
                <img
                  src={userAuth.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} className="text-gray-400" />
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {userAuth?.userName}
              </p>
              <p className="text-xs text-gray-600">{userAuth?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        {menuItems.map((section, index) => (
          <div
            key={index}
            className="border-b border-gray-200 last:border-none"
          >
            <div className="px-5 py-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
              {section.section}
            </div>
            {section.items.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center gap-3 px-5 py-3 text-[14px] text-gray-800 hover:bg-gray-50 transition"
                onClick={() => setDropdownOpen(false)}
              >
                {item.icon && <item.icon size={16} className="text-gray-700" />}
                {item.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Sign Out */}
        <div className="border-t border-gray-200">
          <button
            className="w-full flex items-center gap-3 px-5 py-3 text-[14px] text-red-600 hover:bg-red-50 transition"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
