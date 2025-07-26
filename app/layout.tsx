import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/global.scss";
import Navbar from "@/component/Navbar";
import AppProviders from "./providers/AppProviders";
import ClientLayout from "./ClientLayout";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechLife",
  description:
    "Discover, learn and create on TechLife — a community-driven platform for blogs, and creative stories. Share your ideas, explore new content, and grow together.",
  keywords: [
    "blog platform",
    // "video reels",
    "blog",
    "next.js",
    "react",
    "mongodb",
    "mongoose",
    "Imagekit",
    "content creation",
    "creative community",
    "learning platform",
    "Next.js blog app",
    // "Next.js video reels",
    "ImageKit hosting",
    "open blogging platform",
    "collaborative learning",
  ],
  authors: [{ name: "Rt Kush", url: "https://contentbanao.vercel.app/" }], // replace here
  creator: "Rt Kush",
  openGraph: {
    type: "website",
    url: "https://contentbanao.vercel.app/",
    title: "TechLife",
    description:
      "Create, discover and learn with TechLife — where blogs, and ideas meet for everyone.",
    images: [
      {
    url: "https://ik.imagekit.io/shs47vfch/ogopengraph_LgzDvH4XMP.jpg", 
    width: 1200,
    height: 630,
    alt: "TechLife",
  },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rtkush",
    creator: "@rtkush",
    title: "TechLife",
    description:
      "Create, share and explore blogs with TechLife — a platform for creators and learners alike.",
    images: ["https://ik.imagekit.io/shs47vfch/ogopengraph_LgzDvH4XMP.jpg"], // here replace
  },
  other: {
    
    "linkedin:site": "#",
    "github:site": "https://github.com/rtkush",
  },
  metadataBase: new URL("https://contentbanao.vercel.app"), // replace here 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap children in StoreProvider */}
        <Toaster richColors position="top-center" />

        <AppProviders>
          <ClientLayout>
            <Navbar />
            {children}
            <SpeedInsights />
          </ClientLayout>
        </AppProviders>
      </body>
    </html>
  );
}
