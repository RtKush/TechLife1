"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useAuth } from "@/hooks/userAuth";
import Link from "next/link";
import React from "react";

const people = [
  {
    id: 4,
    name: "Rt Kush",
    designation: "Developer",
    image: "https://ik.imagekit.io/kunksthhw/profile-pic.png?updatedAt=1753025214466",
  },
  {
    id: 5,
    name: "Rt Lav",
    designation: "Developer",
    image: "https://ik.imagekit.io/kunksthhw/IMG_20211116_192148.jpg?updatedAt=1753025246923",
  },
  {
    id: 1,
    name: "Vishal Jain",
    designation: "NIT Raipur",
    image: "https://ik.imagekit.io/kunksthhw/Screenshot_2019-07-28-15-31-05.png?updatedAt=1753025223533",
  },
  {
    id: 2,
    name: "Pradeep Solanki",
    designation: "NIT Raipur",
    image: "https://ik.imagekit.io/kunksthhw/IMG_20230905_145752.jpg?updatedAt=1753025219189",
  },
  {
    id: 3,
    name: "Praveer",
    designation: "MANIT Bhopal",
    image: "https://ik.imagekit.io/kunksthhw/IMG_20191117_105759.jpg?updatedAt=1753025189336",
  },

  {
    id: 6,
    name: "Harshit Mishra",
    designation: "NIT Raipur",
    image: "https://ik.imagekit.io/kunksthhw/IMG_142541804.jpg?updatedAt=1753025189246",
  },

  {
    id: 9,
    name: "Vicky Singh",
    designation: "NIT Raipur",
    image: "https://ik.imagekit.io/kunksthhw/IMG-20200122-WA0003.jpg?updatedAt=1753025189217",
  },
  // {
  //   id: 7,
  //   name: "Umang",
  //   designation: "NIT Raipur",
  //   image:
  //     "",
  // },
  //   {
  //   id: 8,
  //   name: "Kush Gupta",
  //   designation: "NIT Raipur",
  //   image:
  //     "",
  // },
  //   {
  //   id: 10,
  //   name: "Vashu Tauk",
  //   designation: "NIT Raipur",
  //   image:
  //     "",
  // },
  //   {
  //   id: 11,
  //   name: "Naman Patidar",
  //   designation: "NIT Raipur",
  //   image:
  //     "",
  // },
  //   {
  //   id: 12,
  //   name: "Kaushal Patel",
  //   designation: "NIT Raipur",
  //   image:
  //     "",
  // },
];

const CTA = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative py-16">
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-teal-500 to-black-400 dark:from-blue-700" />
      </div>
      <div className="blur-[106px] h-10 bg-gradient-to-r from-cyan-700 to-sky-800 dark:to-indigo-600" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="relative">
          {/* Avatar images */}
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>

          {/* Heading and buttons */}
          <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-center text-2xl font-bold text-cyan-9 00 dark:text-white md:text-5xl">
              People who have Joined with TechLife..
            </h1>
            <p className="text-center text-xl text-blue-900 dark:text-gray-300">
            A place where your words meet visuals share blogs with stunning pictures.
Express ideas, showcase creativity, and let your voice be heard online.
Our platform makes posting blogs easy, beautiful, and interactive.
Start writing, start sharing your digital journey begins here.
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
