// "use client";

// import {
//   PlayCircle,
//   Mail,
//   Phone,
//   Instagram,
//   Github,
//   Linkedin,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 space-y-24">
//       {/* Cover Section */}
//       <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         {/* Left Image */}
//         <div className="rounded-3xl overflow-hidden shadow-lg">
//           <Image
//             src="/mayur-placeholder.jpg"
//             alt="Mayur Pal"
//             width={700}
//             height={800}
//             className="object-cover w-full h-full"
//           />
//         </div>

//         {/* Right Content */}
//         <div>
//           <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
//             Hello Coders <span className="text-cyan-600">I'm Rt Kush</span>
//           </h1>
//           <p className="text-lg text-gray-600 mb-8">
//             Full Stack Developer | DSA Enthusiast | NITian.
//             <br />
//             Available for new Opportunity.
//           </p>

//           {/* Socials */}
//           <div className="flex flex-wrap gap-4 mb-6">
//             <Link
//               href="mailto:thissidemayur@gmail.com"
//               target="_blank"
//               className="flex items-center gap-2 text-cyan-600 font-medium hover:underline"
//             >
//               <Mail /> kush22aur@gmail.com
//             </Link>
//             <Link
//               href="tel:+916283750133"
//               className="flex items-center gap-2 text-cyan-600 font-medium hover:underline"
//             >
//               <Phone /> 6207259544
//             </Link>
           
//             <Link
//               href="https://github.com/RtKush"
//               target="_blank"
//               className="flex items-center gap-2 text-cyan-600 font-medium hover:underline"
//             >
//               <Github /> GitHub
//             </Link>
//             <Link
//               href="https://www.linkedin.com/in/kush-kumar-505477202/"
//               target="_blank"
//               className="flex items-center gap-2 text-cyan-600 font-medium hover:underline"
//             >
//               <Linkedin /> LinkedIn
//             </Link>
//           </div>
//           {/* Call to Action */}
//           <a
//             href="mailto:kush22aur@gmail.com"
//             className="mt-8 inline-block bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-700 transition font-medium"
//           >
//             Hire Me 📧
//           </a>
//         </div>
//       </div>

//       {/* Skills and Projects Section */}
//       <div className="max-w-7xl w-full">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">
//           Skills & Projects
//         </h2>

//         {/* Skills */}
//         <div className="flex flex-wrap gap-3 mb-12">
//           {[
//             "Next.js",
//             "React",
//             "Tailwind CSS",
//             "Docker",
//             "Golang",
//             "MERN Stack",
//             "Linux",
//             "RTK Query",
//             "C++",
//             "Shell Scripting",
//             "GitHub",
//           ].map((skill) => (
//             <span
//               key={skill}
//               className="text-sm bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:scale-105 transition cursor-pointer"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>

//         {/* Projects */}
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="p-6 bg-white rounded-xl border shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               E-commerce Website
//             </h3>
//             <p className="text-gray-600 mb-3">
//               MERN stack application with integrated payment gateway.
//             </p>
//             <Link
//               href="https://github.com/thissidemayur/ecommerce-mern"
//               target="_blank"
//               className="text-cyan-600 hover:underline"
//             >
//               View Repository ↗
//             </Link>
//           </div>

//           <div className="p-6 bg-white rounded-xl border shadow hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Blog + Reel App
//             </h3>
//             <p className="text-gray-600 mb-3">
//               Next.js & MongoDB powered platform to post blogs and reels with a
//               modern UI.
//             </p>
//             <Link
//               href="https://github.com/thissidemayur/blog+reel-NEXTJS"
//               target="_blank"
//               className="text-cyan-600 hover:underline"
//             >
//               View Repository ↗
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
