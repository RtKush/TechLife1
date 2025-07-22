// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   transpilePackages: ['framer-motion'],
//   images: {
//     domains: ['ik.imagekit.io',]
//   }

// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['framer-motion'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '**', // matches any image path
      },
    ],
  },
};

export default nextConfig;
