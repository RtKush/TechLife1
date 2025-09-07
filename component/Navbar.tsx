"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Menu,
  Home,
  FileText,
  Video,
  LogIn,
  UserPlus,
  Plus,
} from "lucide-react";
import AccountDropdown from "@/component/user/Accountdropdown";
import SearchBar from "./SearchBar";

export default function MainNavbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const authLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Blogs", path: "/blog", icon: FileText },
    // { label: "Reels", path: "/reels", icon: Video },
    { label: "Add Blog", path: "/create-blog", icon: Plus },
    // { label: "Add Reel", path: "/add-reel", icon: Plus },
  ];

  const guestLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Blogs", path: "/blog", icon: FileText },
    // { label: "Reels", path: "/reels", icon: Video },
    { label: "Login", path: "/auth/login", icon: LogIn },
    { label: "Register", path: "/auth/register", icon: UserPlus },
  ];

  const links = session ? authLinks : guestLinks;

  return (
    <nav className="bg-white border-b border-gray-200">
      {/* Top Nav */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://ik.imagekit.io/kunksthhw/techl_MTZziv0VS?updatedAt=1753023136425"
            alt="TechLife Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            Tech<span className="text-blue-600">Life</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map(({ label, path, icon: Icon }) => (
            <Link
              key={label}
              href={path}
              className="flex items-center  gap-2 text-gray-800 font-medium hover:text-blue-600 transition"
            >
              <Icon size={18} className="md:hidden" />
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {session && <AccountDropdown />}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-screen-xl mx-auto px-4 pb-4">
        <div className="relative">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4 pt-2 space-y-2 bg-white">
          {links.map(({ label, path, icon: Icon }) => (
            <Link
              key={label}
              href={path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 font-medium py-2 px-2 rounded hover:bg-gray-100 transition"
            >
              <Icon size={25} className="text-black" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

