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
  // {
  //   id: 11,
  //   image: "https://ik.imagekit.io/kunksthhw/11.webp?updatedAt=1753036144544",
  //   title: "Accenture Canteen Food Review",
  // },
   {
    id: 11,
    image: "https://ik.imagekit.io/kunksthhw/14.webp?updatedAt=1753036144337",
    title: "Office Walkthrough: HCL Tech",
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


export default function Home() {
  return (
    <>
      <Hero />

      <HomeBlog />

      <CTA />

      {/* Blog categories:  */}
      <div>
        <EmblaCarousel
          items={categoriesItems}
          title="Top Blogs Hope You Will Love it!"
        />{" "}
      </div>

      <div className="w-fit mx-auto mt-16 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <Footer />
    </>
  );
}
