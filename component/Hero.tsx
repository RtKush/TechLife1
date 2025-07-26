"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const images = [
    
  "https://ik.imagekit.io/kunksthhw/Screenshot__716__J_AcMvIvFX.png?updatedAt=1753532394230",
    "https://ik.imagekit.io/kunksthhw/13.webp?updatedAt=1753036144355",
  "https://ik.imagekit.io/kunksthhw/3.webp?updatedAt=1753036147252",
  "https://ik.imagekit.io/kunksthhw/IMG_20230905_145752.jpg?updatedAt=1753025219189",
  "https://ik.imagekit.io/kunksthhw/Screenshot__624__kHlhCxdwC.png?updatedAt=1753544538588",
  "https://ik.imagekit.io/kunksthhw/1.webp?updatedAt=1753036148212",
  "https://ik.imagekit.io/kunksthhw/9.webp?updatedAt=1753036671412",
  "https://ik.imagekit.io/kunksthhw/11.webp?updatedAt=1753036144544",
  "https://ik.imagekit.io/kunksthhw/12.webp?updatedAt=1753036144558",
  "https://ik.imagekit.io/kunksthhw/8.webp?updatedAt=1753036144352",
  "https://ik.imagekit.io/kunksthhw/7.webp?updatedAt=1753036691404",
  "https://ik.imagekit.io/kunksthhw/10.webp?updatedAt=1753036144506",
  "https://ik.imagekit.io/kunksthhw/IMG_20191117_105759.jpg?updatedAt=1753025189336",
  "https://ik.imagekit.io/kunksthhw/2.webp?updatedAt=1753036147275",
  "https://ik.imagekit.io/kunksthhw/5.webp?updatedAt=1753036144607",
  "https://ik.imagekit.io/kunksthhw/14.webp?updatedAt=1753036144337",
  "https://ik.imagekit.io/kunksthhw/techl_MTZziv0VS?updatedAt=1753023136425",
    "https://ik.imagekit.io/kunksthhw/6.webp?updatedAt=1753036144314",
  "https://ik.imagekit.io/kunksthhw/IMG-20200122-WA0003.jpg?updatedAt=1753025189217",
  "https://ik.imagekit.io/kunksthhw/13.webp?updatedAt=1753036144355",
  "https://ik.imagekit.io/kunksthhw/3.webp?updatedAt=1753036147252",
  "https://ik.imagekit.io/kunksthhw/1.webp?updatedAt=1753036148212",
  "https://ik.imagekit.io/kunksthhw/9.webp?updatedAt=1753036671412",
  "https://ik.imagekit.io/kunksthhw/profile-pic.png?updatedAt=1753025214466",
  "https://ik.imagekit.io/kunksthhw/4.webp?updatedAt=1753036147302",
  "https://ik.imagekit.io/kunksthhw/11.webp?updatedAt=1753036144544",
  "https://ik.imagekit.io/kunksthhw/12.webp?updatedAt=1753036144558",
  "https://ik.imagekit.io/kunksthhw/IMG_20211116_192148.jpg?updatedAt=1753025246923",
  "https://ik.imagekit.io/kunksthhw/8.webp?updatedAt=1753036144352",
  "https://ik.imagekit.io/kunksthhw/7.webp?updatedAt=1753036691404",
  "https://ik.imagekit.io/kunksthhw/10.webp?updatedAt=1753036144506",
  "https://ik.imagekit.io/kunksthhw/IMG_20191117_105759.jpg?updatedAt=1753025189336",
  "https://ik.imagekit.io/kunksthhw/2.webp?updatedAt=1753036147275",
  "https://ik.imagekit.io/kunksthhw/5.webp?updatedAt=1753036144607",
  "https://ik.imagekit.io/kunksthhw/14.webp?updatedAt=1753036144337",
  "https://ik.imagekit.io/kunksthhw/techl_MTZziv0VS?updatedAt=1753023136425",
  "https://ik.imagekit.io/kunksthhw/IMG_142541804.jpg?updatedAt=1753025189246",

  ];

  return (
    <div className="relative mx-auto my-1 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-40xl text-center text-2xl font-bold text-balance text-orange-600 md:text-4xl lg:text-6xl">
        Share Your Tech Stories {" "}
        <span className="relative z-20 inline-block rounded-xl  px-4 py-1 text-cyan-300 underline decoration-sky-500">
          on TechLife
        </span>{" "}
        Inspire, Connect, and Grow Together.
      </h2>

      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        Publish blogs and engage your audience — at TechLife
        Plateform.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          onClick={() => router.push("/blog")}
        >
          Explore Blogs
        </button>
       
      </div>

      <div className="absolute inset-0 z-10 h-145 w-full bg-black/80 dark:bg-black/10" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-145 w-full"
        images={images}
      />
    </div>
  );
}


