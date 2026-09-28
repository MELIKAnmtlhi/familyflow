import type { NextConfig } from "next";
// import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
   remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '',
      pathname: '/**'
    }
   ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  turbopack: {
    // root: path.join(import.meta.dirname, '..')
  }
};

export default nextConfig;
