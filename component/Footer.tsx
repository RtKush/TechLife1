"use client";

import Link from "next/link";
import {
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-200 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Developer Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Developer Image */}
          <div className="flex-shrink-0">
            <Image
              src="https://ik.imagekit.io/kunksthhw/kush_sOvNe-UGU?updatedAt=1753291399827"
              alt="rt kush"
              
              width={160}   
              height={160}
              
              className="rounded-full object-cover object-center w-32 h-32 md:w-40 md:h-40 shadow-lg"
              priority
            />
          </div>
            
              

          {/* About Section */}
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-2xl font-extrabold text-orange-400 tracking-tight">
              Hey.. Coders I'm Rt Kush
            </h2>
             <p className="text-orange-600 text-sm max-w-sm leading-relaxed">
              Developer & Founder @TechLife
            </p>
            <p className="text-orange-200 text-sm max-w-sm leading-relaxed">
              MCA from NIT Raipur, Chaatisgarh. I love to Code. Passionate about building real-world solutions using full-stack development. Skilled in Java, React, Node.js, and
MongoDB with a focus on performance, simple design, and real-time features.
            </p>
           
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 flex-wrap justify-center md:justify-end">
          <Link
            href="https://github.com/RtKush"
            target="_blank"
            className="text-gray-500 hover:text-blue-300 transition-transform duration-300 hover:scale-110"
          >
            <FaGithub size={30} />
          </Link>
          
          <Link
            href="https://x.com/rtlavkush"
            target="_blank"
            className="text-gray-500 hover:text-blue-600 transition-transform duration-300 hover:scale-110"
          >
            <FaXTwitter size={30} />
          </Link>
          <Link
            href="mailto:kush22aur@email.com"
            className="text-gray-500 hover:text-green-600 transition-transform duration-300 hover:scale-110"
          >
            <MdEmail size={30} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/kush-kumar-505477202/"
            target="_blank"
            className="text-gray-500 hover:text-blue-500 transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedin size={30} />
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-4">
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
       All rights reserved By   © {new Date().getFullYear()} TechLife{" "}
         
        </p>
      </div>
    </footer>
  );
}
