"use client";
import dynamic from "next/dynamic";

import { Hero } from "@/component/Hero";
import CTA from "@/component/CTA";
import HomeBlog from "@/component/HomeBlog";
import Footer from "@/component/Footer";
const AnimatedTestimonials = dynamic(
  () => import("@/components/ui/animated-testimonials"),
  { ssr: false }
);

const EmblaCarousel = dynamic(() => import("@/component/Carousel"));

const categoriesItems = [
  {
    id: 1,
    image: "https://ik.imagekit.io/kunksthhw/1.webp?updatedAt=1753036148212",
    title: "Life at Microsoft India",
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/kunksthhw/2.webp?updatedAt=1753036147275",
    title: "My Day at Accenture",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/kunksthhw/3.webp?updatedAt=1753036147252",
    title: "Inside Deloitte Office Culture",
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/kunksthhw/4.webp?updatedAt=1753036147302",
    title: "TCS Work Culture Review",
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/kunksthhw/5.webp?updatedAt=1753036144607",
    title: "Lunch Scenes at Wipro",
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/kunksthhw/6.webp?updatedAt=1753036144314",
    title: "HCL Office View Tour",
  },
  {
    id: 7,
    image: "https://ik.imagekit.io/kunksthhw/7.webp?updatedAt=1753036691404",
    title: "Capgemini Team Life Insights",
  },
  {
    id: 8,
    image: "https://ik.imagekit.io/kunksthhw/8.webp?updatedAt=1753036144352",
    title: "Tech Life at Infosys",
  },
  {
    id: 9,
    image: "https://ik.imagekit.io/kunksthhw/9.webp?updatedAt=1753036671412",
    title: "Remote Work at Cognizant",
  },
  {
    id: 10,
    image: "https://ik.imagekit.io/kunksthhw/10.webp?updatedAt=1753036144506",
    title: "Hybrid Life at Microsoft",
  },
  {
    id: 11,
    image: "https://ik.imagekit.io/kunksthhw/11.webp?updatedAt=1753036144544",
    title: "Accenture Canteen Food Review",
  },
  {
    id: 12,
    image: "https://ik.imagekit.io/kunksthhw/12.webp?updatedAt=1753036144558",
    title: "First Day at TCS",
  },
  {
    id: 13,
    image: "https://ik.imagekit.io/kunksthhw/13.webp?updatedAt=1753036144355",
    title: "My Desk at Deloitte",
  },
  {
    id: 14,
    image: "https://ik.imagekit.io/kunksthhw/14.webp?updatedAt=1753036144337",
    title: "Office Walkthrough: HCL Tech",
  },
];

// const testimonials: Array<{
//   quote: string;
//   name: string;
//   designation: string;
//   src: string;
// }> = [
//   {
//     quote:
//       "As a developer, I appreciate platforms that blend technical insight with storytelling — and this one nails it.",
//     name: "Rt Kush",
//     designation: "Founder @RealTime ChatApp",
//     src: "https://ik.imagekit.io/kunksthhw/kush_sOvNe-UGU?updatedAt=1753291399827",
//   },

//   {
//     quote:
//       "This platform helped me connect with like-minded developers and learn how people in other companies tackle real-world tech challenges.",
//     name: "Rt Lav",
//     designation: "Founder @NIT DRIVE",
//     src: "https://ik.imagekit.io/kunksthhw/lav_1Vx0Qp_wG?updatedAt=1753290475875",
//   },
//   {
//     quote:
//       "Reading blogs here gave me deep insights into company work cultures. It helped me prepare better for interviews and understand what tech stacks are in demand.",
//     name: "Vishal Jain",
//     designation: "Founder @AI DSA Tracker",
//     src: "https://ik.imagekit.io/kunksthhw/vishal_4H01nPvtY?updatedAt=1753291685095",
//   },
//   {
//     quote:
//       "Thanks to this platform, I now understand how different tech roles function in a team — from frontend devs to DevOps engineers.",
//     name: "Pradeep Solanki",
//     designation: "Founder @E-Store",
//     src: "https://ik.imagekit.io/kunksthhw/pra_6978aee6u?updatedAt=1753291360340",
//   },
//   {
//     quote:
//       "This site guided me through my first open-source contribution journey. I got to read success stories and challenges faced by other contributors.",
//     name: "Praveer",
//     designation: "Founder @Easy Rent",
//     src: "https://ik.imagekit.io/kunksthhw/Screenshot%202025-07-23%20223359.png?updatedAt=1753290434822",
//   },
//   {
//     quote:
//       "The platform is more than a blog — it’s like a tech diary space where I share my experiences and learn from others. Super motivating!",
//     name: "Harshit Mishra",
//     designation: "Founder @AI Resume Builder",
//     src: "https://ik.imagekit.io/kunksthhw/har_PnDbzjGC3?updatedAt=1753290552224",
//   },

//   {
//     quote:
//       "Reading honest workplace reviews and project experiences helped me choose the right company culture and avoid toxic environments.",
//     name: "Kush Gupta",
//     designation: "Founder @FoodHub",
//     src: "https://ik.imagekit.io/kunksthhw/Screenshot%202025-07-23%20230410.png?updatedAt=1753292121861",
//   },
//   {
//     quote:
//       "I always look forward to the real-world case studies posted here. They go beyond theory and show how tech is used to solve actual business problems.",
//     name: "Umang",
//     designation: "Founder @---",
//     src: "https://ik.imagekit.io/kunksthhw/um_2mzR97R4j?updatedAt=1753290511171",
//   },
// ];

export default function Home() {
  return (
    <>
      <Hero />

      <HomeBlog />

      {/* CTA */}
      <CTA />

      {/* Blog categories:  */}
      <div>
        <EmblaCarousel
          items={categoriesItems}
          title="Top Blogs Hope You Will Love it!"
        />{" "}
      </div>

      {/* Testimonial-When You Want to Show User's FeedBack then UnComment From here Below Line */}
      {/* <AnimatedTestimonials testimonials={testimonials} /> */}
      {/* Separator */}
      <div className="w-fit mx-auto mt-16 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <Footer />
    </>
  );
}
