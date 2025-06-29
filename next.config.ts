import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    //Contentful host de afbeeldingen extern, dus Next.js moet dat domein vertrouwen.
  images: {
    domains: ["images.ctfassets.net"],
  },
};

export default nextConfig;
